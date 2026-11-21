"""
Unit tests for the Derivation Receipt v1.0 engine:
HMAC signing, hash verification, tamper detection, and cross-install handling.
"""

import json
import os
import sys
import unittest

src_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src"))
if src_dir not in sys.path:
    sys.path.insert(0, src_dir)

import derivation_receipt as dr


class TestDerivationReceipt(unittest.TestCase):
    def _receipt(self):
        return dr.generate_derivation_receipt(
            question="integrate sin(x)/x from 0 to infinity",
            expression="integrate(sin(x)/x, (x, 0, oo))",
            exact_result="pi/2",
            latex_result="\\frac{\\pi}{2}",
            numeric_approx=1.5707963268,
            op="integrate",
            planner_model="gemma:4b",
        )

    def test_receipt_is_signed_and_hashed(self):
        r = self._receipt()
        self.assertTrue(r["id"].startswith("sha256:"))
        self.assertIn("signature", r)
        self.assertEqual(r["signature"]["algorithm"], "HMAC-SHA256")
        self.assertTrue(len(r["signature"]["value"]) == 64)

    def test_verify_passes_on_honest_receipt(self):
        r = self._receipt()
        ok, msg, audit = dr.verify_derivation_receipt(r)
        self.assertTrue(ok, msg)
        self.assertIn("HMAC signature verified", msg)
        self.assertIn("signature_status", audit)

    def test_tampered_content_rejected(self):
        r = self._receipt()
        r["question"] = "changed question after signing"
        ok, msg, _ = dr.verify_derivation_receipt(r)
        self.assertFalse(ok)
        # Tampering changes canonical bytes -> hash mismatch (fail on either check)
        self.assertTrue("mismatch" in msg.lower() or "modified" in msg.lower())

    def test_signature_tamper_rejected_without_hash_change(self):
        r = self._receipt()
        r["signature"]["value"] = "0" * 64
        ok, msg, _ = dr.verify_derivation_receipt(r)
        # A forged signature alone must not validate (key_id matches, HMAC fails)
        if r["signature"]["key_id"] == dr.get_or_create_signing_key()["key_id"]:
            self.assertFalse(ok, "forged HMAC accepted")
            self.assertIn("modified", msg)

    def test_cross_install_key_is_unverifiable_not_failed(self):
        r = self._receipt()
        saved = dr.get_or_create_signing_key()
        # Simulate another installation's key
        dr.get_or_create_signing_key.__globals__["get_or_create_signing_key"] = lambda: {
            "algorithm": "HMAC-SHA256",
            "key": "ab" * 32,
            "key_id": "zzzzzzzz",
        }
        try:
            ok, msg, audit = dr.verify_derivation_receipt(r)
            self.assertTrue(ok)
            self.assertIn("different install key", msg)
        finally:
            dr.get_or_create_signing_key.__globals__["get_or_create_signing_key"] = lambda: saved

    def test_unsigned_legacy_receipt_still_verifies(self):
        r = self._receipt()
        r.pop("signature", None)
        ok, msg, audit = dr.verify_derivation_receipt(r)
        self.assertTrue(ok)
        self.assertEqual(audit.get("signature_status"), "No HMAC signature (unsigned legacy receipt)")

    def test_receipt_file_roundtrip(self):
        r = self._receipt()
        blob = json.dumps(r)
        loaded = json.loads(blob)
        ok, _, _ = dr.verify_derivation_receipt(loaded)
        self.assertTrue(ok)


if __name__ == "__main__":
    unittest.main()
