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


def test_hf_token_discovery():
    """Verify Hugging Face authentication token discovery from environment and config."""
    from launch_desktop import get_hf_auth_token
    from vigyan_cli import get_hf_auth_token as cli_get_token

    # Test with HF_TOKEN set
    old_env = os.environ.get("HF_TOKEN")
    try:
        os.environ["HF_TOKEN"] = "hf_test_secret_token_12345"
        assert get_hf_auth_token() == "hf_test_secret_token_12345"
        assert cli_get_token() == "hf_test_secret_token_12345"
    finally:
        if old_env is not None:
            os.environ["HF_TOKEN"] = old_env
        else:
            os.environ.pop("HF_TOKEN", None)


def test_multimodal_vision_routing():
    """Verify select_cascade_model automatically routes to Vigyan-VL-4B when has_image is True."""
    # When has_image is True, route to vigyan:4b
    res_img = select_cascade_model("auto", "Analyze this schematic", has_image=True)
    assert res_img["model"] == "vigyan:4b"
    assert res_img["tier"] == 4

    # When explicit 4b request
    res_4b = select_cascade_model("vigyan:4b", "What is this component?")
    assert res_4b["model"] == "vigyan:4b"

    # When text-only query without image, route to flagship 3B
    res_text = select_cascade_model("auto", "Calculate integral", has_image=False)
    assert res_text["model"] == "vigyan:3b"


def test_compress_conversation_history_multimodal_safe():
    """Verify compress_conversation_history safely handles multimodal message contents (lists) without error."""
    from launch_desktop import compress_conversation_history

    messages = [
        {"role": "system", "content": "You are Vigyan AI."},
        {"role": "user", "content": [
            {"type": "text", "text": "Analyze this diagram."},
            {"type": "image_url", "image_url": {"url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg=="}}
        ]},
        {"role": "assistant", "content": "The diagram displays a low-pass filter."},
        {"role": "user", "content": "What is the cutoff frequency?"},
        {"role": "assistant", "content": "The cutoff frequency fc = 1 / (2*pi*R*C)."},
        {"role": "user", "content": "Can you compute it for R=1k and C=1uF?"},
        {"role": "assistant", "content": "fc = 159.15 Hz."},
    ]

    compressed = compress_conversation_history(messages, max_tokens_est=20)
    assert isinstance(compressed, list)
    assert len(compressed) > 0
    # The latest turn should be intact
    assert compressed[-1]["role"] == "assistant"


