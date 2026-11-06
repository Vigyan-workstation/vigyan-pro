"""
Vigyan Pro: Sovereign Model Management Engine
Provides discovery, inspection, and retrieval of quantized GGUF weights
from local directories and the official Experimentlab Hugging Face repository.
"""

import os
import sys
from typing import List, Dict, Any, Optional

OFFICIAL_HF_REPO = "Experimentlab/Vigyan-Models-GGUF"

def get_models_dir() -> str:
    """Return the primary local model storage directory (~/.vigyan/models)."""
    vigyan_dir = os.path.expanduser("~/.vigyan")
    models_dir = os.path.join(vigyan_dir, "models")
    os.makedirs(models_dir, exist_ok=True)
    return models_dir

def get_available_memory_gb() -> float:
    """Returns available host RAM in gigabytes using psutil or /proc/meminfo fallback."""
    try:
        import psutil
        return float(psutil.virtual_memory().available / (1024 ** 3))
    except Exception:
        pass
    try:
        meminfo = {}
        with open("/proc/meminfo", "r") as f:
            for line in f:
                parts = line.split(":")
                if len(parts) == 2:
                    meminfo[parts[0].strip()] = int(parts[1].split()[0])
        avail_kb = meminfo.get("MemAvailable", meminfo.get("MemFree", 0))
        if avail_kb > 0:
            return float(avail_kb / (1024 ** 2))
    except Exception:
        pass
    return 8.0  # Safe default if undetectable

def list_local_models() -> List[Dict[str, Any]]:
    """Scan local search directories for GGUF model artifacts."""
    search_dirs = [
        get_models_dir(),
        os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "models"),
        "/opt/vigyan-pro/models",
    ]

    found = []
    seen_paths = set()

    for d in search_dirs:
        if not os.path.isdir(d):
            continue
        try:
            for entry in os.scandir(d):
                if entry.is_file() and entry.name.endswith(".gguf"):
                    real_path = os.path.realpath(entry.path)
                    if real_path in seen_paths:
                        continue
                    seen_paths.add(real_path)

                    stat = entry.stat()
                    size_bytes = stat.st_size
                    size_gb = round(size_bytes / (1024 ** 3), 2)

                    # Extract quantization tag if present
                    parts = entry.name.replace(".gguf", "").split("-")
                    quant = parts[-1].upper() if len(parts) > 1 and parts[-1].lower().startswith(("q", "iq")) else "UNKNOWN"

                    found.append({
                        "name": entry.name,
                        "path": real_path,
                        "size_bytes": size_bytes,
                        "size_gb": size_gb,
                        "quantization": quant,
                        "directory": d,
                        "modified_at": stat.st_mtime,
                    })
        except Exception:
            continue

    return sorted(found, key=lambda m: m["size_bytes"], reverse=True)

def find_model_path(preferred_path: Optional[str] = None) -> Optional[str]:
    """Discover bundled or local sovereign model weights:

    1. preferred_path argument or VIGYAN_MODEL_PATH env
    2. ~/.vigyan/models/vigyan-3b-quad-master-iq3_m.gguf
    3. models/vigyan-3b-quad-master-iq3_m.gguf (relative to repo root)
    4. /opt/vigyan-pro/models/vigyan-3b-quad-master-iq3_m.gguf
    5. Fallback: Any available local GGUF artifact
    """
    env_override = os.environ.get("VIGYAN_MODEL_PATH")
    if env_override and os.path.isfile(os.path.expanduser(env_override)):
        return os.path.abspath(os.path.expanduser(env_override))

    if preferred_path and os.path.isfile(os.path.expanduser(preferred_path)):
        return os.path.abspath(os.path.expanduser(preferred_path))

    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    models_dir = get_models_dir()

    candidates = [
        os.path.join(models_dir, "vigyan-3b-quad-master-iq3_m.gguf"),
        os.path.join(project_root, "models", "vigyan-3b-quad-master-iq3_m.gguf"),
        "/opt/vigyan-pro/models/vigyan-3b-quad-master-iq3_m.gguf",
        os.path.join(models_dir, "vigyan-1.5b-quad-master-q4_k_m.gguf"),
        os.path.join(models_dir, "vigyan-4th-gen-7b-IQ3_M.gguf"),
    ]

    for cand in candidates:
        if os.path.isfile(cand):
            return os.path.abspath(cand)

    local_list = list_local_models()
    if local_list:
        return local_list[0]["path"]

    return None

def list_remote_models(repo_id: str = OFFICIAL_HF_REPO, token: Optional[str] = None) -> List[Dict[str, Any]]:
    """Query Hugging Face Hub for available GGUF models in the specified repository."""
    try:
        from huggingface_hub import HfApi, get_token
    except ImportError:
        raise ImportError("huggingface_hub is required to list remote models. Install via pip install huggingface_hub.")

    auth_token = token or get_token()
    api = HfApi(token=auth_token)

    try:
        files = api.list_repo_files(repo_id=repo_id)
        gguf_files = [f for f in files if f.endswith(".gguf")]
    except Exception as e:
        raise RuntimeError(f"Failed to access Hugging Face repository '{repo_id}': {e}")

    results = []
    for fname in gguf_files:
        parts = fname.replace(".gguf", "").split("-")
        quant = parts[-1].upper() if len(parts) > 1 and parts[-1].lower().startswith(("q", "iq")) else "UNKNOWN"
        results.append({
            "name": fname,
            "repo_id": repo_id,
            "quantization": quant,
            "is_gated": False,
        })

    return results

def pull_model(
    filename: str,
    repo_id: str = OFFICIAL_HF_REPO,
    token: Optional[str] = None,
    target_dir: Optional[str] = None
) -> str:
    """Download a GGUF model artifact from Hugging Face Hub into local models directory."""
    try:
        from huggingface_hub import hf_hub_download, get_token
    except ImportError:
        raise ImportError("huggingface_hub is required to download models. Install via pip install huggingface_hub.")

    auth_token = token or get_token()
    dest_dir = target_dir or get_models_dir()
    os.makedirs(dest_dir, exist_ok=True)

    clean_filename = filename.strip()
    if not clean_filename.endswith(".gguf"):
        clean_filename = f"{clean_filename}.gguf"

    downloaded_path = hf_hub_download(
        repo_id=repo_id,
        filename=clean_filename,
        token=auth_token,
        local_dir=dest_dir,
        local_dir_use_symlinks=False,
    )

    return downloaded_path
