import os
import tempfile
from typer.testing import CliRunner
from vigyan.cli import app

runner = CliRunner()

def test_cli_help():
    result = runner.invoke(app, ["--help"])
    assert result.exit_code == 0
    assert "Vigyan Pro" in result.stdout
    assert "math" in result.stdout
    assert "cad" in result.stdout
    assert "rtl" in result.stdout
    assert "run" in result.stdout
    assert "list" in result.stdout

def test_cli_math_command():
    result = runner.invoke(app, ["math", "diff(x**4, x)"])
    assert result.exit_code == 0
    assert "4*x**3" in result.stdout
    assert "SymPy CAS Analytical Derivation" in result.stdout

def test_cli_status_command():
    result = runner.invoke(app, ["status"])
    assert result.exit_code == 0
    assert "Vigyan Sovereign Runtime Status" in result.stdout
    assert "SymPy CAS Engine" in result.stdout

def test_cli_cad_command():
    with tempfile.TemporaryDirectory() as tmpdir:
        out_path = os.path.join(tmpdir, "cli_part.scad")
        result = runner.invoke(app, ["cad", "rectangular box", "-o", out_path])
        assert result.exit_code == 0
        assert os.path.isfile(out_path)
        assert "Vigyan CAD Engine" in result.stdout

def test_cli_rtl_command():
    with tempfile.TemporaryDirectory() as tmpdir:
        out_path = os.path.join(tmpdir, "cli_module.v")
        result = runner.invoke(app, ["rtl", "simple buffer", "-o", out_path, "--no-verify"])
        assert result.exit_code == 0
        assert os.path.isfile(out_path)
        assert "Vigyan Silicon EDA Engine" in result.stdout

def test_cli_list_command():
    result = runner.invoke(app, ["list"])
    assert result.exit_code == 0
    assert "Registered Vigyan STEM Tools" in result.stdout
    assert "math" in result.stdout
    assert "cad" in result.stdout
    assert "rtl" in result.stdout

def test_cli_run_command():
    result = runner.invoke(app, ["run", "math", "diff(x**2, x)"])
    assert result.exit_code == 0
    assert "2*x" in result.stdout
