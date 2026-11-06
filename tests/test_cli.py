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

def test_cli_list_command():
    result = runner.invoke(app, ["list"])
    assert result.exit_code == 0
    assert "Registered Vigyan STEM Tools" in result.stdout
    assert "math" in result.stdout

def test_cli_run_command():
    result = runner.invoke(app, ["run", "math", "diff(x**2, x)"])
    assert result.exit_code == 0
    assert "2*x" in result.stdout

def test_cli_math_json():
    import json
    result = runner.invoke(app, ["math", "diff(x**2, x)", "--json"])
    assert result.exit_code == 0
    data = json.loads(result.stdout)
    assert data["status"] == "success"
    assert data["solution"] == "2*x"

def test_cli_const_command():
    import json
    result = runner.invoke(app, ["const", "c", "--json"])
    assert result.exit_code == 0
    data = json.loads(result.stdout)
    assert data["value"] == 299792458

def test_cli_axiom_command():
    import json
    result = runner.invoke(app, ["axiom", "rc", "--json"])
    assert result.exit_code == 0
    data = json.loads(result.stdout)
    assert len(data) > 0
    assert any("RC" in item["law"] for item in data)

def test_cli_learn_and_undo_commands():
    import json
    # Learn
    learn_res = runner.invoke(app, ["learn", "Always declare $fn=80 for precision gears", "-c", "cad", "--json"])
    assert learn_res.exit_code == 0
    learn_data = json.loads(learn_res.stdout)
    assert learn_data["success"] is True
    rule_id = learn_data["rule"]["id"]

    # Ledger
    ledger_res = runner.invoke(app, ["ledger", "--json"])
    assert ledger_res.exit_code == 0
    ledger_data = json.loads(ledger_res.stdout)
    assert any(r["id"] == rule_id for r in ledger_data["rules"])

    # Undo
    undo_res = runner.invoke(app, ["undo", rule_id, "--json"])
    assert undo_res.exit_code == 0
    undo_data = json.loads(undo_res.stdout)
    assert undo_data["success"] is True

def test_cli_ask_and_chat_help():
    ask_res = runner.invoke(app, ["ask", "--help"])
    assert ask_res.exit_code == 0
    assert "Ask Vigyan" in ask_res.stdout

    chat_res = runner.invoke(app, ["chat", "--help"])
    assert chat_res.exit_code == 0
    assert "Start an interactive" in chat_res.stdout

def test_cli_stop_command():
    stop_res = runner.invoke(app, ["stop"])
    assert stop_res.exit_code == 0
    assert "inference engine" in stop_res.stdout.lower()




