"""receipt_pdf.py — Standard-library-only PDF export for derivation receipts.

Renders a receipt dict as a paginated, text-mono PDF (base-14 Courier fonts,
no embedded fonts, no external dependencies) suitable for offline archiving
of a verification result. Text is escaped per PDF string rules and clamped
to Latin-1; everything outside Latin-1 is transliterated to '?'.
"""

import hashlib
from typing import Any, Dict, List

_CHAR_W = 5.06          # Courier 9.5pt advance width (600/1000 * 9.5 * 0.25mm fudge) in points
_LINE_H = 14.0
_MARGIN = 54.0
_PAGE_W = 612.0         # US Letter
_PAGE_H = 792.0
_MAX_COLS = int((_PAGE_W - 2 * _MARGIN) / _CHAR_W)
_MAX_ROWS = int((_PAGE_H - 2 * _MARGIN) / _LINE_H)


def _latin1(s: Any) -> str:
    if s is None:
        return ""
    if not isinstance(s, str):
        s = str(s)
    return s.encode("latin-1", errors="replace").decode("latin-1")


def _escape(s: str) -> str:
    out = []
    for ch in s:
        if ch in "()\\":
            out.append("\\" + ch)
        elif 32 <= ord(ch) < 127:
            out.append(ch)
        else:
            out.append("?")
    return "".join(out)


def _wrap(text: str, width: int = _MAX_COLS) -> List[str]:
    lines: List[str] = []
    for raw in text.split("\n") or [""]:
        if not raw:
            lines.append("")
            continue
        cur = ""
        for word in raw.split(" "):
            candidate = (cur + " " + word) if cur else word
            while len(candidate) > width:
                if cur:
                    lines.append(cur)
                    cur = ""
                chunk = candidate[:width]
                candidate = candidate[width:]
                cur = chunk
            cur = candidate
        if cur or not lines:
            lines.append(cur)
    return lines


def _kv(label: str, value: Any) -> str:
    return f"{label:<22}{value}"


def receipt_lines(receipt: Dict[str, Any], source_path: str = "") -> List[str]:
    """Flatten a receipt dict into display lines (pre-wrap)."""
    hw_lines: List[str] = []
    hw_lines.append("VIGYAN PRO - DERIVATION RECEIPT")
    hw_lines.append("Non-Commercial Free Tier - 100% local computation")
    hw_lines.append("")

    rid = str(receipt.get("id", ""))
    hw_lines.append(_kv("Receipt ID", rid))
    hw_lines.append(_kv("Created", receipt.get("created_at", "")))
    if source_path:
        hw_lines.append(_kv("File", source_path))

    question = str(receipt.get("question", ""))
    if question:
        hw_lines.append("")
        hw_lines.append("Question:")
        hw_lines.extend(_wrap(question))
        hw_lines.append("")

    planner = receipt.get("planner", {}) or {}
    toolchain = receipt.get("toolchain", {}) or {}
    hw_lines.append(_kv("Model", planner.get("model", "")))
    hw_lines.append(_kv("Quant", planner.get("quant", "")))
    hw_lines.append(_kv("SymPy", toolchain.get("sympy", "")))

    derivation = receipt.get("derivation", []) or []
    hw_lines.append("")
    hw_lines.append(f"Derivation ({len(derivation)} step(s)):")
    for step in derivation:
        num = step.get("step", 0)
        hw_lines.append(f"  Step {num}: {step.get('expression', '')}")
        exact = str(step.get("exact_analytical", ""))
        hw_lines.append(f"    = {exact}")
        latex = str(step.get("latex", ""))
        if latex and latex != exact:
            hw_lines.append(f"    LaTeX: {latex}")
        na = step.get("numeric_approx")
        if na is not None:
            hw_lines.append(f"    Numeric: {na}")
        hw_lines.append("")

    verification = receipt.get("verification", {}) or {}
    hw_lines.append(_kv("Status", verification.get("status", "")))
    hw_lines.append(_kv("Residual Error", verification.get("residual_error", "")))

    signature = receipt.get("signature", {}) or {}
    if signature.get("value"):
        hw_lines.append(_kv("Signature", str(signature.get("value", ""))[:80]))
        hw_lines.append(_kv("Signed At", signature.get("signed_at", "")))
    else:
        hw_lines.append(_kv("Signature", "(unsigned receipt)"))

    return hw_lines


def build_pdf(lines: List[str], title: str = "Vigyan Pro - Derivation Receipt") -> bytes:
    """Assemble a minimal multi-page PDF out of pre-wrapped lines."""
    pages: List[List[str]] = []
    for i in range(0, max(len(lines), 1), _MAX_ROWS):
        pages.append(lines[i:i + _MAX_ROWS])

    objs: Dict[int, bytes] = {}
    n_pages = len(pages)
    page_ids = [4 + i * 2 for i in range(n_pages)]           # page obj, content obj pairs
    kids = " ".join(f"{pid} 0 R" for pid in page_ids)

    objs[1] = b"<< /Type /Catalog /Pages 2 0 R >>"
    objs[2] = f"<< /Type /Pages /Count {n_pages} /Kids [{kids}] >>".encode("latin-1")
    objs[3] = (b"<< /Type /Font /Subtype /Type1 /BaseFont /Courier "
               b"/Encoding /WinAnsiEncoding >>")

    for idx, page_lines in enumerate(pages):
        pid = page_ids[idx]
        cid = pid + 1
        content = _content_stream(page_lines)
        objs[pid] = (
            f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {_PAGE_W} {_PAGE_H}] "
            f"/Resources << /Font << /F1 3 0 R >> >> /Contents {cid} 0 R >>"
        ).encode("latin-1")
        objs[cid] = f"<< /Length {len(content)} >>\nstream\n".encode("latin-1") + content + b"\nendstream"

    # Metadata via Info dict
    info_id = max(objs) + 1
    truncated_title = "".join(ch if 32 <= ord(ch) < 127 else "?" for ch in title)
    objs[info_id] = (
        f"<< /Producer (receipt_pdf) /Title ({_escape(truncated_title)}) >>"
    ).encode("latin-1")

    out = bytearray()
    out += b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n"
    offsets: Dict[int, int] = {}
    for oid in sorted(objs):
        offsets[oid] = len(out)
        out += f"{oid} 0 obj\n".encode("latin-1") + objs[oid] + b"\nendobj\n"

    xref_pos = len(out)
    total = max(objs) + 1
    out += f"xref\n0 {total}\n".encode("latin-1")
    out += b"0000000000 65535 f \n"
    for oid in range(1, total):
        out += f"{offsets[oid]:010d} 00000 n \n".encode("latin-1")
    out += (
        f"trailer\n<< /Size {total} /Root 1 0 R /Info {info_id} 0 R >>\n"
        f"startxref\n{xref_pos}\n%%EOF\n"
    ).encode("latin-1")
    return bytes(out)


def _content_stream(page_lines: List[str]) -> bytes:
    parts = ["BT /F1 9.5 Tf 14 TL"]
    y = _PAGE_H - _MARGIN - 9.5
    for line in page_lines:
        parts.append(f"1 0 0 1 {_MARGIN} {y:.1f} Tm ({_escape(_latin1(line))}) Tj")
        y -= _LINE_H
    parts.append("ET")
    return "\n".join(parts).encode("latin-1")


def receipt_to_pdf(receipt: Dict[str, Any], source_path: str = "") -> bytes:
    """Full pipeline: receipt dict -> display lines -> PDF bytes.

    Large fields (question, expressions) are wrapped; the printable surface
    is a deterministic function of the receipt content.
    """
    return build_pdf(receipt_lines(receipt, source_path))


def pdf_suggested_filename(receipt: Dict[str, Any]) -> str:
    rid = str(receipt.get("id", ""))
    raw = rid.replace("sha256:", "")[:12]
    if not raw:
        raw = hashlib.sha256(repr(receipt)[:1024].encode("utf-8", "replace")).hexdigest()[:12]
    return f"receipt-{raw}.pdf"
