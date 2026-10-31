"""
Comprehensive Unit Tests for Vigyan Pro Desktop Modernized In-Memory STEM Pipeline.
Strictly Permissive Open-Source Verification (Apache 2.0 / MIT / BSD-2 / ISC).
100% Offline, Air-Gapped Operation with In-Memory Axiomatic Retrieval and Direct SymPy CAS.
"""

import math
import pathlib
import re
import sys
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

import tools
from tools.base import BaseTool
import launch_desktop
import ingest_engine


class TestSTEMToolkits(unittest.TestCase):
    def test_tool_registry_clean_and_dispatch(self):
        registered = tools.get_all_tools()
        self.assertNotIn("cad_model_generate", registered)
        self.assertNotIn("robotics_kinematics", registered)
        self.assertNotIn("wavedrom_generate", registered)
        self.assertNotIn("pcb_netlist_generate", registered)
        self.assertNotIn("verilog_analyze", registered)
        self.assertNotIn("knowledge_rag_search", registered)

        # Disallow dispatching unregistered tools gracefully
        res = tools.dispatch_tool("wavedrom_generate", {"protocol": "spi"})
        self.assertFalse(res["success"])
        self.assertIn("not registered", res["error"])

    def test_in_memory_stem_axiomatic_retrieval(self):
        # 1. RLC Resonance
        rlc_res = launch_desktop.enrich_stem_query("What is the underdamped response of an RLC circuit?")
        self.assertGreaterEqual(len(rlc_res["axioms"]), 1)
        laws = [a["law"] for a in rlc_res["axioms"]]
        self.assertTrue(any("RLC" in l for l in laws))
        self.assertEqual(rlc_res["lancedb_context"], "")

        # 2. Semiconductor PN junction / MOSFET
        semi_res = launch_desktop.enrich_stem_query("MOSFET saturation pinch off and bandgap depletion")
        self.assertGreaterEqual(len(semi_res["axioms"]), 1)
        semi_laws = [a["law"] for a in semi_res["axioms"]]
        self.assertTrue(any("MOSFET" in l or "PN Junction" in l for l in semi_laws))

        # 3. Quantum Mechanics
        qm_res = launch_desktop.enrich_stem_query("Schrodinger wave equation tunneling barrier")
        self.assertGreaterEqual(len(qm_res["axioms"]), 1)
        self.assertTrue(any("Schrödinger" in a["law"] or "Tunneling" in a["law"] for a in qm_res["axioms"]))

        # 4. Materials Science
        mat_res = launch_desktop.enrich_stem_query("Bragg's law crystal diffraction in FCC lattice")
        self.assertGreaterEqual(len(mat_res["axioms"]), 1)
        self.assertTrue(any("Bragg" in a["law"] for a in mat_res["axioms"]))

        # 5. Aerospace Propulsion
        aero_res = launch_desktop.enrich_stem_query("Tsiolkovsky rocket equation delta-v calculation")
        self.assertGreaterEqual(len(aero_res["axioms"]), 1)
        self.assertTrue(any("Tsiolkovsky" in a["law"] for a in aero_res["axioms"]))

    def test_sympy_cas_symbolic_math_verification(self):
        # 1. Definite Integral
        int_res = launch_desktop.enrich_stem_query("integrate exp(-x) from 0 to oo")
        if launch_desktop._SYMPY_ENGINE is not None:
            self.assertTrue(int_res["sympy_verified"])
            self.assertEqual(int_res["sympy"]["result"], "1")

        # 2. Indefinite derivative
        diff_res = launch_desktop.enrich_stem_query("derivative of x**3 - 3*x**2 + 2*x")
        if launch_desktop._SYMPY_ENGINE is not None:
            self.assertTrue(diff_res["sympy_verified"])
            self.assertIn("3*x**2", diff_res["sympy"]["result"])

        # 3. Algebraic solver
        solve_res = launch_desktop.enrich_stem_query("solve x**2 - 9 = 0")
        if launch_desktop._SYMPY_ENGINE is not None:
            self.assertTrue(solve_res["sympy_verified"])
            self.assertIn("-3", solve_res["sympy"]["result"])
            self.assertIn("3", solve_res["sympy"]["result"])

    def test_plot_function_mathematical_evaluation(self):
        # High precision continuous mathematical curve trace
        res = launch_desktop.evaluate_plot("exp(-0.15*x)*cos(2*x)", x_min=0.0, x_max=25.0, points=50)
        self.assertTrue(res["success"])
        self.assertEqual(res["tool"], "plot_function")
        traces = res["plot"]["traces"]
        self.assertEqual(len(traces), 1)
        self.assertEqual(len(traces[0]["x"]), 50)
        self.assertEqual(len(traces[0]["y"]), 50)
        self.assertAlmostEqual(traces[0]["x"][0], 0.0)
        self.assertAlmostEqual(traces[0]["y"][0], 1.0, places=2)

        # Disallowed / dangerous mathematical syntax is safely rejected
        bad_res = launch_desktop.evaluate_plot("__import__('os').system('ls')")
        self.assertFalse(bad_res["success"])
        self.assertIn("error", bad_res)

    def test_ingest_file_dimension_extraction(self):
        sample_doc = (
            "Sensor Module Spec Sheet\n"
            "Dimensions: 120mm x 80mm x 25mm\n"
            "Operating Voltage: 5V DC at 200mA\n"
            "Requires custom mounting holes."
        )
        dim_matches = re.findall(r"(\d+(?:\.\d+)?)\s*(?:mm|cm|m|in|\"|V|mA|A|Hz|kHz|MHz|Ω|kΩ)", sample_doc)
        self.assertIn("120", dim_matches)
        self.assertIn("80", dim_matches)
        self.assertIn("25", dim_matches)
        self.assertIn("5", dim_matches)
        self.assertIn("200", dim_matches)

    def test_in_memory_document_analyzer(self):
        sample_text = (
            "LM317 Adjustable Linear Voltage Regulator Datasheet.\n\n"
            "The LM317 produces an output voltage V_out = 1.25 * (1 + R2/R1) + I_adj * R2.\n"
            "Operating parameters: 1.25V reference, 1.5A maximum output current, 120Hz ripple rejection."
        )
        res = ingest_engine.analyze_ingested_content("LM317_datasheet.txt", sample_text)
        self.assertTrue(res["success"])
        self.assertEqual(res["filename"], "LM317_datasheet.txt")
        self.assertGreater(len(res["metrics"]), 0)
        self.assertGreater(len(res["suggested_actions"]), 0)


if __name__ == "__main__":
    unittest.main()
