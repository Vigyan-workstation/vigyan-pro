"""Tests for receipt PDF export (stdlib-only writer) and swap context governance."""
from __future__ import annotations

import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

SRC_DIR = Path(__file__).resolve().parents[1] / "src"
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

import receipt_pdf  # noqa: F401  (module importability check)
from receipt_pdf import build_pdf, receipt_lines, receipt_to_pdf, pdf_suggested_filename


def _sample_receipt() -> dict:
    return {
        "id": "sha256:" + "ab" * 32,
        "created_at": "2026-01-01T00:00:00+05:30",
        "question": "What is int(x**2 + 1)?",
        "planner": {"model": "gemma-4-e4b-it", "quant": "Q4_K_M"},
        "toolchain": {"sympy": "1.14.0"},
        "derivation": [
            {"step": 0, "expression": "x**2 + 1", "exact_analytical": "x**3/3 + x",
             "latex": "frac", "numeric_approx": None},
            {"step": 1, "expression": "simplify", "exact_analytical": "x**3/3 + x",
             "latex": "", "numeric_approx": 1.5},
        ],
        "verification": {"status": "PASSED", "residual_error": "0.000e+00"},
        "signature": {"value": "deadbeef", "signed_at": "2026-01-01T00:00:01+05:30"},
    }


class TestReceiptPdf(unittest.TestCase):
    def test_valid_pdf_structure(self):
        data = receipt_to_pdf(_sample_receipt())
        self.assertTrue(data.startswith(b"%PDF-1.4"))
        self.assertTrue(data.rstrip().endswith(b"%%EOF"))
        # xref offsets must land on "<oid> 0 obj" for every object
        lines = data.split(b"\n")
        xref_i = lines.index(b"xref")
        total = int(lines[xref_i + 1].split()[1])
        for i in range(1, total):
            off = int(lines[xref_i + 2 + i][:10])
            expected = b"%d 0 obj" % i
            self.assertTrue(
                data[off:].startswith(expected),
                f"obj {i} offset wrong",
            )

    def test_text_extraction_requires_no_parens_breakage(self):
        r = _sample_receipt()
        r["question"] = 'Has (parens) and back\\slash'
        pdf = receipt_to_pdf(r)
        # escaped forms present in the content stream
        self.assertIn(b"\\(", pdf)
        self.assertIn(b"\\)", pdf)

    def test_non_latin_clamped(self):
        r = _sample_receipt()
        r["question"] = "Math \u03a9 \u0928\u093f\u0936\u094d\u0936\u0947\u0937 x"
        pdf = receipt_to_pdf(r)  # must not raise
        self.assertTrue(pdf.startswith(b"%PDF-1.4"))
        self.assertNotIn("\u03a9".encode("utf-8"), pdf)

    def test_multipage_pagination(self):
        r = _sample_receipt()
        r["derivation"] = [
            {"step": i, "expression": "x**2", "exact_analytical": "x**2", "latex": "", "numeric_approx": None}
            for i in range(200)
        ]
        pdf = receipt_to_pdf(r)
        self.assertGreaterEqual(pdf.count(b"/Type /Page "), 2)

    def test_line_width_and_suggested_name(self):
        lines = receipt_lines(_sample_receipt(), source_path="/home/u/x/very-long-name.rcpt.json")
        for ln in lines:
            self.assertLessEqual(len(ln), 94)
        self.assertEqual(pdf_suggested_filename(_sample_receipt()), "receipt-" + "ab" * 6 + ".pdf")

    def test_missing_fields_do_not_crash(self):
        pdf = receipt_to_pdf({"id": "", "derivation": []})
        self.assertTrue(pdf.startswith(b"%PDF-1.4"))


class TestSwapContextGovernance(unittest.TestCase):
    def _make_sup(self):
        from llama_supervisor import LlamaServerSupervisor
        return LlamaServerSupervisor(
            server_bin=[sys.executable, "-c", "pass"],
            ctx_size=4096,
            threads=1,
        )

    def test_host_ctx_ceiling_scales_with_ram(self):
        from llama_supervisor import LlamaServerSupervisor as Sup
        self.assertEqual(Sup._host_ctx_ceiling({"tier": "cpu_budget", "avail_ram_gb": 2.0}), 8192)
        self.assertEqual(Sup._host_ctx_ceiling({"tier": "cpu_budget", "avail_ram_gb": 6.5}), 32768)
        self.assertEqual(Sup._host_ctx_ceiling({"tier": "cpu_budget", "avail_ram_gb": 16.0}), 131072)
        self.assertEqual(Sup._host_ctx_ceiling({"tier": "cpu_budget", "avail_ram_gb": 32.0}), 262144)

    def test_swap_applies_catalog_ctx_clamped_by_host(self):
        sup = self._make_sup()
        with tempfile.NamedTemporaryFile(suffix=".gguf", delete=False) as tmp:
            tmp.write(b"gguf-test"); gguf_path = tmp.name
        try:
            with patch.object(type(sup), "stop", lambda self: None), \
                 patch.object(type(sup), "start", lambda self: True), \
                 patch.object(type(sup), "wait_until_ready", lambda self, timeout: None), \
                 patch.object(type(sup), "is_healthy", lambda self: False), \
                 patch("llama_supervisor.get_available_memory_gb", return_value=32.0), \
                 patch("llama_supervisor.detect_hardware_profile",
                       return_value={"tier": "cpu_budget", "avail_ram_gb": 32.0, "threads": 2,
                                     "context_size": 2048, "recommended_ngl": 0}):
                ok = sup.swap_model(gguf_path, ctx_size=262144)
                self.assertTrue(ok)
                self.assertEqual(sup._ctx_size, 262144)

                # Low-RAM host: 262k clamped down to the 8192 ceiling
                with patch("llama_supervisor.get_available_memory_gb", return_value=2.0), \
                     patch("llama_supervisor.detect_hardware_profile",
                           return_value={"tier": "cpu_budget", "avail_ram_gb": 2.0, "threads": 2,
                                         "context_size": 1024, "recommended_ngl": 0}):
                    ok = sup.swap_model(gguf_path, ctx_size=262144)
                    self.assertTrue(ok)
                    self.assertEqual(sup._ctx_size, 8192)
        finally:
            os.unlink(gguf_path)

    def test_swap_blocked_when_estimated_requirement_exceeds_85pct_avail(self):
        sup = self._make_sup()
        with tempfile.NamedTemporaryFile(suffix=".gguf", delete=False) as tmp:
            tmp.write(b"gguf-test"); gguf_path = tmp.name
        try:
            with patch.object(type(sup), "stop", lambda self: None), \
                 patch.object(type(sup), "start", lambda self: True), \
                 patch.object(type(sup), "_catalog_ram_required", return_value=3.0) as req_mock, \
                 patch("llama_supervisor.get_available_memory_gb", return_value=2.0), \
                 patch("llama_supervisor.detect_hardware_profile",
                       return_value={"tier": "cpu_budget", "avail_ram_gb": 2.0, "threads": 1,
                                     "context_size": 1024, "recommended_ngl": 0}):
                # requirement 3 GB > avail*0.85 (1.7 GB) -> Sentinel must block
                ok = sup.swap_model(gguf_path)
                self.assertFalse(ok)
                req_mock.assert_called_once()
        finally:
            os.unlink(gguf_path)

    def test_catalog_ram_required_prefers_catalog_entry(self):
        sup = self._make_sup()
        req = sup._catalog_ram_required("gemma-4-12b-qat-q4-0.gguf", 6.7)
        self.assertEqual(req, 13.4)
        req = sup._catalog_ram_required("some-unknown-model.gguf", 4.0)
        self.assertEqual(req, 6.0)
