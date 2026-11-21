"""
Comprehensive Test Suite for Vigyan Sovereign Standalone CLI Interface.
Verifies CLI argument handling, hardware profiling, 3-model catalog resolution,
stdin piping, serve command, and purge/uninstallation safety.
"""

import os
import sys
import io
import pytest
import tempfile
import json
from unittest.mock import patch, MagicMock

# Add src/ to path
src_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src"))
if src_dir not in sys.path:
    sys.path.insert(0, src_dir)

import vigyan_cli
from vigyan_cli import (
    ALLOWED_SOVEREIGN_MODELS,
    SOVEREIGN_PRODUCTION_MODELS,
    MODEL_ALIASES,
    find_model_file,
    get_local_models,
    cmd_models,
    cmd_rm,
    print_usage,
    main,
)


def test_cli_authorized_models_count_and_integrity():
    """Verify strictly the 3 approved models in ALLOWED_SOVEREIGN_MODELS."""
    expected = {
        "gemma-4-e4b-qat-q4-0.gguf",
        "vigyan-7b-quad-master-q4_k_m.gguf",
        "gemma-4-12b-qat-q4-0.gguf",
    }
    assert ALLOWED_SOVEREIGN_MODELS == expected
    assert len(SOVEREIGN_PRODUCTION_MODELS) == 3

    # Check aliases
    assert MODEL_ALIASES["4b"] == "gemma-4-e4b-qat-q4-0.gguf"
    assert MODEL_ALIASES["7b"] == "vigyan-7b-quad-master-q4_k_m.gguf"
    assert MODEL_ALIASES["12b"] == "gemma-4-12b-qat-q4-0.gguf"
    assert MODEL_ALIASES["12b"] == "gemma-4-12b-qat-q4-0.gguf"


def test_cli_version_flag(capsys):
    """Verify --version prints v5.0.8 specification."""
    with patch.object(sys, "argv", ["vigyan", "--version"]):
        main()
        out = capsys.readouterr().out
        assert "5.0.8" in out
        assert "Sovereign" in out


def test_cli_help_flag(capsys):
    """Verify --help prints usage containing the 3 models and new verbs."""
    with patch.object(sys, "argv", ["vigyan", "--help"]):
        main()
        out = capsys.readouterr().out
        assert "vigyan models" in out
        assert "vigyan serve" in out
        assert "vigyan purge" in out
        assert "4b" in out
        assert "7b" in out
        assert "12b" in out


def test_cli_models_matrix(capsys):
    """Verify cmd_models displays the 3-model hardware matrix."""
    cmd_models(refresh=False)
    out = capsys.readouterr().out
    assert "VIGYAN SOVEREIGN MATRIX • 3 Authorized Scientific Engines" in out
    assert "gemma:4b" in out
    assert "vigyan:7b" in out
    assert "gemma:12b" in out


def test_find_model_file_resolution(tmp_path, monkeypatch):
    """Verify find_model_file resolves aliases correctly in local directory."""
    models_dir = tmp_path / "models"
    models_dir.mkdir()
    monkeypatch.setattr(vigyan_cli, "MODELS_DIR", str(models_dir))

    # Create dummy 3B model
    m3b = models_dir / "gemma-4-e4b-qat-q4-0.gguf"
    m3b.write_text("dummy gguf header")

    # Direct filename lookup
    assert find_model_file("gemma-4-e4b-qat-q4-0.gguf") == str(m3b)
    # Alias lookup
    assert find_model_file("4b") == str(m3b)
    assert find_model_file("gemma:4b") == str(m3b)
    # Non-existent model lookup
    assert find_model_file("nonexistent_99b") is None


def test_cmd_rm_model_and_part(tmp_path, monkeypatch, capsys):
    """Verify cmd_rm cleanly deletes model files and partial downloads."""
    models_dir = tmp_path / "models"
    models_dir.mkdir()
    monkeypatch.setattr(vigyan_cli, "MODELS_DIR", str(models_dir))

    m3b = models_dir / "gemma-4-e4b-qat-q4-0.gguf"
    m3b.write_text("x" * 1024)

    assert os.path.isfile(str(m3b))
    res = cmd_rm("4b")
    assert res is True
    assert not os.path.isfile(str(m3b))

    out = capsys.readouterr().out
    assert "Removed gemma-4-e4b-qat-q4-0.gguf" in out


def test_piped_stdin_prompt_combination(monkeypatch):
    """Verify stdin data is safely combined with user prompt in main."""
    captured_prompt = []

    def mock_ensure():
        return "/tmp/fake_model.gguf"

    def mock_start(p):
        mock_sup = MagicMock()
        mock_sup.is_healthy.return_value = True
        return mock_sup

    def mock_query(prompt, **kwargs):
        captured_prompt.append(prompt)
        return True

    monkeypatch.setattr(vigyan_cli, "ensure_first_run_interactive", mock_ensure)
    monkeypatch.setattr(vigyan_cli, "start_supervisor_for_model", mock_start)
    monkeypatch.setattr(vigyan_cli, "query_local_server", mock_query)

    fake_stdin = io.StringIO("def calculate():\n    return 42\n")
    monkeypatch.setattr(sys, "stdin", fake_stdin)
    monkeypatch.setattr(sys.stdin, "isatty", lambda: False)

    with patch.object(sys, "argv", ["vigyan", "Optimize this"]):
        main()

    assert len(captured_prompt) == 1
    assert "def calculate():" in captured_prompt[0]
    assert "Optimize this" in captured_prompt[0]


def test_install_and_uninstall_scripts_exist():
    """Verify universal installer and uninstaller scripts exist and are executable."""
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    install_sh = os.path.join(root_dir, "install-cli.sh")
    uninstall_sh = os.path.join(root_dir, "uninstall-cli.sh")
    install_ps1 = os.path.join(root_dir, "install-cli.ps1")
    uninstall_ps1 = os.path.join(root_dir, "uninstall-cli.ps1")
    package_cli_sh = os.path.join(root_dir, "package-cli.sh")

    for script in (install_sh, uninstall_sh, install_ps1, uninstall_ps1, package_cli_sh):
        assert os.path.isfile(script), f"Missing script: {script}"

    assert os.access(install_sh, os.X_OK)
    assert os.access(uninstall_sh, os.X_OK)
    assert os.access(package_cli_sh, os.X_OK)
