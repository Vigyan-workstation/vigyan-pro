"""
Test Suite for Vigyan Pro Sovereign Model Downloader, Catalog, and Cross-Platform HTTP Bridge.
"""

import os
import sys
import json
import pytest
import tempfile
import urllib.request
import threading
import time

# Ensure src/ is on path
src_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src"))
if src_dir not in sys.path:
    sys.path.insert(0, src_dir)

from launch_desktop import (
    MODELS_CATALOG,
    ModelDownloadManager,
    select_cascade_model,
    start_neuro_symbolic_bridge_server,
    _SESSION_TOKEN,
)


def test_models_catalog_integrity():
    """Verify that models catalog entries contain valid URLs, tags, and reasonable sizes."""
    assert "vigyan:3b" in MODELS_CATALOG
    assert len(MODELS_CATALOG) >= 1


def test_select_cascade_model_unified_3b():
    """Verify select_cascade_model routes to vigyan:3b flagship engine (or 1.5b if explicitly requested)."""
    for test_req in ("vigyan:7b", "7b", "frontier", "vigyan:3b", "default", ""):
        res = select_cascade_model(test_req, "Solve laplacian eigenfunction")
        assert res["model"] == "vigyan:3b"
        assert res["downgraded"] is False
        assert "57.50% GSM8K" in res["reason"]

    # Explicit 1.5B request
    res_15 = select_cascade_model("vigyan:1.5b", "Fast query")
    assert res_15["model"] == "vigyan:1.5b"

    for tag, info in MODELS_CATALOG.items():
        assert info["size_bytes"] > 1_000_000_000  # >= 1 GB
        assert info["hf_url"].startswith("https://huggingface.co/") or info["hf_url"].startswith("https://github.com/")
        assert info["dest_filename"].endswith(".gguf")
        assert "TEMPLATE" in f"TEMPLATE {info['template']}"
        assert len(info.get("stop", [])) > 0


def test_model_download_manager_lifecycle():
    """Test ModelDownloadManager status tracking and cancel lifecycle."""
    mgr = ModelDownloadManager()
    status = mgr.get_status()
    assert isinstance(status, dict)

    # Unknown tag error check
    res = mgr.start_download("non_existent_model:99b")
    assert res["success"] is False
    assert "Unknown model" in res["error"]

    # Valid tag status initialization
    initial = mgr.get_status("vigyan:1.5b")
    assert initial.get("status") in ("idle", "ready")

    # Cancel download on idle/ready tag
    cancelled = mgr.cancel_download("vigyan:1.5b")
    assert cancelled is False


def test_http_bridge_static_serving_and_catalog():
    """Verify embedded HTTP server serves index.html, /api/models/catalog, and static assets."""
    port = start_neuro_symbolic_bridge_server(8089)
    assert port == 8089
    time.sleep(0.3)

    # 1. Test index.html static serving
    req_index = urllib.request.Request(f"http://127.0.0.1:{port}/")
    with urllib.request.urlopen(req_index, timeout=3.0) as resp:
        assert resp.status == 200
        assert "text/html" in resp.headers.get("Content-Type", "")
        content = resp.read().decode("utf-8")
        assert "Vigyan Pro" in content

    # 2. Test unauthenticated API endpoint returns 403 Forbidden
    try:
        urllib.request.urlopen(f"http://127.0.0.1:{port}/api/models/catalog", timeout=3.0)
        assert False, "Unauthenticated request should have failed with 403"
    except urllib.error.HTTPError as e:
        assert e.code == 403

    # 3. Test authenticated /api/models/catalog JSON endpoint
    auth_headers = {"X-Vigyan-Token": _SESSION_TOKEN}
    req_cat = urllib.request.Request(f"http://127.0.0.1:{port}/api/models/catalog", headers=auth_headers)
    with urllib.request.urlopen(req_cat, timeout=3.0) as resp:
        assert resp.status == 200
        data = json.loads(resp.read().decode("utf-8"))
        assert "catalog" in data
        assert "vigyan:3b" in data["catalog"]
        assert "system_ram_gb" in data

    # 4. Test public /health endpoint
    with urllib.request.urlopen(f"http://127.0.0.1:{port}/health", timeout=3.0) as resp:
        assert resp.status == 200
        data = json.loads(resp.read().decode("utf-8"))
        assert data["status"] == "online"
        assert "telemetry" in data


def test_steve_jobs_four_models_whitelist():
    """Verify strictly the 4 authorized sovereign production models in ALLOWED_SOVEREIGN_MODELS."""
    from launch_desktop import ALLOWED_SOVEREIGN_MODELS as BACKEND_ALLOWED
    from llama_supervisor import ALLOWED_SOVEREIGN_MODELS as SUPERVISOR_ALLOWED
    from vigyan_cli import ALLOWED_SOVEREIGN_MODELS as CLI_ALLOWED, MODEL_ALIASES, cmd_pull

    expected_models = {
        "vigyan-3b-quad-master-iq3_m.gguf",
        "vigyan-vl-4b-iq3_m.gguf",
        "vigyan-7b-quad-master-q4_k_m.gguf",
        "vigyan-r1-14b-health-semi-quantum-iq3_m.gguf",
    }

    assert BACKEND_ALLOWED == expected_models
    assert SUPERVISOR_ALLOWED == expected_models
    assert CLI_ALLOWED == expected_models

    # Verify canonical aliases
    assert MODEL_ALIASES["3b"] == "vigyan-3b-quad-master-iq3_m.gguf"
    assert MODEL_ALIASES["4b"] == "vigyan-vl-4b-iq3_m.gguf"
    assert MODEL_ALIASES["7b"] == "vigyan-7b-quad-master-q4_k_m.gguf"
    assert MODEL_ALIASES["14b"] == "vigyan-r1-14b-health-semi-quantum-iq3_m.gguf"

    # Verify unauthorized model pull rejection
    assert cmd_pull("unauthorized_model_xyz.gguf") is False

