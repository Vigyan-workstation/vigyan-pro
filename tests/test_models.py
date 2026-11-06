import os
import json
from typer.testing import CliRunner
from vigyan.cli import app
from vigyan.models import list_local_models, get_models_dir

runner = CliRunner()

def test_list_local_models():
    models = list_local_models()
    assert isinstance(models, list)
    if models:
        first = models[0]
        assert "name" in first
        assert "path" in first
        assert "size_bytes" in first
        assert "quantization" in first
        assert first["name"].endswith(".gguf")

def test_cli_model_status():
    res = runner.invoke(app, ["model", "status", "--json"])
    assert res.exit_code == 0
    data = json.loads(res.stdout)
    assert "models_dir" in data
    assert "local_models" in data
    assert isinstance(data["local_models"], list)

def test_cli_model_list():
    res = runner.invoke(app, ["model", "list", "--json"])
    assert res.exit_code == 0
    data = json.loads(res.stdout)
    assert "local_models" in data
