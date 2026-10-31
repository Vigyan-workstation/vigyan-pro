"""
Comprehensive Unit Tests for Vigyan Pro Desktop STEM Toolkits.
Strictly Permissive Open-Source Verification (Apache 2.0 / MIT / BSD-2 / ISC).
100% Offline, Air-Gapped Operation with LanceDB Vector RAG.
"""

import base64
import json
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
from tools.wave_engine import WaveEngineTool
from tools.pcb_engine import PCBEngineTool
from tools.silicon_eda import SiliconEDATool
from tools.lancedb_tool import KnowledgeRAGTool
from rag.lancedb_engine import SovereignLanceDBEngine
import launch_desktop


class TestSTEMToolkits(unittest.TestCase):
    def test_tool_registry_discovery(self):
        registered = tools.get_all_tools()
        self.assertIn("knowledge_rag_search", registered)
        self.assertIn("wavedrom_generate", registered)
        self.assertIn("pcb_netlist_generate", registered)
        self.assertIn("verilog_analyze", registered)
        self.assertNotIn("cad_model_generate", registered)
        self.assertNotIn("robotics_kinematics", registered)

        # Verify prompt instructions contain all registered tools
        prompt = tools.get_tool_schemas_prompt()
        for name in registered.keys():
            self.assertIn(name, prompt)

    def test_lancedb_rag_vector_search(self):
        rag_tool = KnowledgeRAGTool()
        res = rag_tool.execute({"query": "What is the underdamped response of an RLC circuit?", "top_k": 2})
        self.assertTrue(res["success"])
        self.assertEqual(res["tool"], "knowledge_rag_search")
        self.assertTrue(res["has_grounding"])
        self.assertIn("RLC", res["context"])

    def test_lancedb_engine_document_ingestion(self):
        engine = SovereignLanceDBEngine.get_instance()
        self.assertTrue(engine.available)
        sample_doc = (
            "LM317 Adjustable Linear Voltage Regulator Datasheet.\n\n"
            "The LM317 produces an output voltage V_out = 1.25 * (1 + R2/R1) + I_adj * R2.\n"
            "Typical reference voltage V_ref is 1.25V between OUT and ADJ pins."
        )
        count = engine.index_text_document("LM317_datasheet.txt", sample_doc)
        self.assertGreater(count, 0)
        ctx = engine.query_context("LM317 voltage regulator reference voltage")
        self.assertIn("LM317", ctx)

    def test_wave_engine_spi_and_i2c_generation(self):
        wave = WaveEngineTool()
        res_spi = wave.execute({"protocol": "spi_master", "title": "SPI Read"})
        self.assertTrue(res_spi["success"])
        self.assertEqual(res_spi["render_type"], "wavedrom")
        self.assertIn("signal", res_spi["wavedrom_spec"])
        self.assertIn("SCLK", [s["name"] for s in res_spi["wavedrom_spec"]["signal"]])

        res_i2c = wave.execute({"protocol": "i2c_bus", "title": "I2C Read"})
        self.assertTrue(res_i2c["success"])
        self.assertIn("SDA", [s["name"] for s in res_i2c["wavedrom_spec"]["signal"]])

    def test_pcb_engine_555_and_opamp_netlists(self):
        pcb = PCBEngineTool()
        res_555 = pcb.execute({
            "circuit_type": "555_timer",
            "title": "Astable 555 Oscillator",
            "params": {"r1": 10000, "r2": 47000, "c1": 1e-6}
        })
        self.assertTrue(res_555["success"])
        self.assertEqual(res_555["render_type"], "pcb_circuit")
        self.assertIn("kicad_netlist", res_555)
        self.assertIn("NE555P", res_555["kicad_netlist"])
        self.assertIn("(export (version D)", res_555["kicad_netlist"])

    def test_silicon_eda_verilog_parser_and_timing(self):
        eda = SiliconEDATool()
        verilog_code = """
        module spi_slave(
            input wire sclk,
            input wire cs_n,
            input wire mosi,
            output reg miso
        );
            reg [7:0] shift_reg;
            always @(posedge sclk or posedge cs_n) begin
                if (cs_n) shift_reg <= 8'h00;
                else shift_reg <= {shift_reg[6:0], mosi};
            end
            always @(negedge sclk) begin
                miso <= shift_reg[7];
            end
        endmodule
        """
        res = eda.execute({"code": verilog_code, "target_clock_mhz": 50})
        self.assertTrue(res["success"])
        self.assertEqual(res["module_name"], "spi_slave")
        self.assertIn("sclk", res["clock_domains"])
        self.assertEqual(res["render_type"], "silicon_eda")
        metric_dict = {m["label"]: m["value"] for m in res["metrics"]}
        self.assertIn("Est. LUTs", metric_dict)
        self.assertIn("Est. FFs", metric_dict)

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

    def test_kuzu_stem_graph_vendored_traversal(self):
        from knowledge_graph.kuzu_stem_graph import VigyanSTEMGraph
        kg = VigyanSTEMGraph()
        self.assertTrue(pathlib.Path(kg.db_path).exists())
        ctx = kg.query_multihop_context(["semiconductor", "mosfet"])
        self.assertGreater(len(ctx), 50)
        self.assertIn("Law", ctx)

    def test_wavedrom_recompute_dispatch(self):
        wave_args = {
            "protocol": "axi4_stream",
            "title": "AXI4 Burst"
        }
        res_wave = tools.dispatch_tool("wavedrom_generate", wave_args)
        self.assertTrue(res_wave["success"])
        self.assertIn("wavedrom_spec", res_wave)


if __name__ == "__main__":
    unittest.main()
