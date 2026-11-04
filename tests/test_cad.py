import os
import tempfile
import pytest
from vigyan.tools.cad import synthesize_cad

def test_cad_scad_generation():
    with tempfile.TemporaryDirectory() as tmpdir:
        out_file = os.path.join(tmpdir, "test_part.scad")
        res = synthesize_cad("Mounting bracket with 4 M3 holes", output_path=out_file, render_stl=False)

        assert res.status == "success"
        assert res.tool_name == "cad_openscad"
        assert os.path.isfile(out_file)
        assert len(res.artifacts) == 1
        assert res.artifacts[0].file_type == "scad"
        assert "$fn" in res.code
        assert "cube" in res.code or "cylinder" in res.code

def test_cad_stl_flag_fallback():
    with tempfile.TemporaryDirectory() as tmpdir:
        out_file = os.path.join(tmpdir, "bracket.scad")
        res = synthesize_cad("Hexagonal spacer height 10", output_path=out_file, render_stl=True)

        assert res.status == "success"
        assert os.path.isfile(out_file)
        assert "openscad" in res.stdout.lower() or any(a.file_type == "stl" for a in res.artifacts)
