import os
import tempfile
import pytest
from vigyan.tools.rtl import generate_rtl

def test_rtl_module_generation():
    with tempfile.TemporaryDirectory() as tmpdir:
        out_file = os.path.join(tmpdir, "test_core.v")
        res = generate_rtl("8-bit streaming register with valid handshake", output_path=out_file, verify=False)

        assert res.status == "success"
        assert res.tool_name == "eda_verilog"
        assert os.path.isfile(out_file)
        assert len(res.artifacts) == 1
        assert res.artifacts[0].file_type == "v"
        assert "module" in res.code
        assert "endmodule" in res.code

def test_rtl_verification_flag():
    with tempfile.TemporaryDirectory() as tmpdir:
        out_file = os.path.join(tmpdir, "counter.v")
        res = generate_rtl("4-bit synchronous up-counter", output_path=out_file, verify=True)

        assert res.status == "success"
        assert os.path.isfile(out_file)
        assert "module" in res.code
        assert "iverilog" in res.stdout.lower() or "simulation" in res.stdout.lower() or "pass" in res.stdout.lower()
