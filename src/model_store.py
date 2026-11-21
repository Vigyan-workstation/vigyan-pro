"""
Vigyan Pro Workstation — Model Catalog, Config & Download Manager (v5.0.8)
Split from launch_desktop.py: the sovereign model vault (catalog, resolver,
downloader with host whitelist), user config, and storage statistics.
"""

import os
import re
import io
import sys
import json
import time
import shutil
import threading
import logging
import urllib.request
import urllib.parse
import urllib.error
from typing import Dict, Any, List, Optional

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("vigyan.desktop")

import runtime

# ---- Sovereign production model registry (moved from launch_desktop) ----
# v5.0.8 Free Tier fleet: three Apache 2.0 models, downloaded directly from
# Hugging Face. Update hf_url/hf_repo to the final publishing repos.
SOVEREIGN_PRODUCTION_MODELS = [
    {
        "id": "gemma-4-e4b",
        "name": "Gemma 4 E4B Daily",
        "tag": "gemma:4b",
        "short_label": "4B Daily",
        "filename": "gemma-4-e4b-qat-q4-0.gguf",
        "dest_filename": "gemma-4-e4b-qat-q4-0.gguf",
        "size_bytes": 2684354560,
        "size_formatted": "2.5 GB",
        "ram_required_gb": 5.0,
        "ctx_size": 131072,
        "domain": "Fast STEM, Calculus & Exact Symbolic Mathematics",
        "hf_url": "https://huggingface.co/Experimentlab/Vigyan-Models-GGUF/resolve/main/gemma-4-e4b-qat-q4-0.gguf?download=true",
        "hf_repo": "Experimentlab/Vigyan-Models-GGUF",
        "template": "gemma4",
        "stop": ["<end_of_turn>"]
    },
    {
        "id": "vigyan-7b",
        "name": "Vigyan-7B Quad-Master",
        "tag": "vigyan:7b",
        "short_label": "7B Production",
        "filename": "vigyan-7b-quad-master-q4_k_m.gguf",
        "dest_filename": "vigyan-7b-quad-master-q4_k_m.gguf",
        "size_bytes": 4467000000,
        "size_formatted": "4.16 GB",
        "ram_required_gb": 8.0,
        "ctx_size": 4096,
        "domain": "Doctoral Proofs, Complex Engineering & Physical Science",
        "hf_url": "https://huggingface.co/Experimentlab/Vigyan-Models-GGUF/resolve/main/vigyan-7b-quad-master-q4_k_m.gguf?download=true",
        "hf_repo": "Experimentlab/Vigyan-Models-GGUF",
        "template": "olmo2",
        "stop": ["<|im_end|>"]
    },
    {
        "id": "gemma-4-12b",
        "name": "Gemma 4 12B Advanced",
        "tag": "gemma:12b",
        "short_label": "12B Advanced",
        "filename": "gemma-4-12b-qat-q4-0.gguf",
        "dest_filename": "gemma-4-12b-qat-q4-0.gguf",
        "size_bytes": 7193182208,
        "size_formatted": "6.7 GB",
        "ram_required_gb": 13.4,
        "ctx_size": 262144,
        "domain": "Frontier Step-by-Step Reasoning & Quantum Physics",
        "hf_url": "https://huggingface.co/Experimentlab/Vigyan-Models-GGUF/resolve/main/gemma-4-12b-qat-q4-0.gguf?download=true",
        "hf_repo": "Experimentlab/Vigyan-Models-GGUF",
        "template": "gemma4",
        "stop": ["<end_of_turn>"]
    }
]

VERIFIED_EXPERIMENTLAB_MODELS = SOVEREIGN_PRODUCTION_MODELS

# Gemma chat format (applied when model_info["template"] == "gemma4")
GEMMA4_TEMPLATE = (
    "<bos><start_of_turn>user\n{system}\n\n{prompt}<end_of_turn>\n"
    "<start_of_turn>model\n"
)
GEMMA4_STOP = ["<end_of_turn>"]
# ---- Sovereign production model registry (moved from launch_desktop) ----



def get_hf_auth_token() -> Optional[str]:
    """Discover user's Hugging Face auth token from environment, config, or cache."""
    env_token = os.environ.get("HF_TOKEN") or os.environ.get("HUGGING_FACE_HUB_TOKEN")
    if env_token and env_token.strip():
        return env_token.strip()

    try:
        cfg = load_user_config()
        if cfg.get("hf_token"):
            return str(cfg["hf_token"]).strip()
    except Exception:
        pass

    try:
        from huggingface_hub import get_token
        hub_token = get_token()
        if hub_token and hub_token.strip():
            return hub_token.strip()
    except Exception:
        pass

    token_path = os.path.expanduser("~/.cache/huggingface/token")
    if os.path.isfile(token_path):
        try:
            with open(token_path, "r", encoding="utf-8") as f:
                content = f.read().strip()
                if content:
                    return content
        except Exception:
            pass

    return None
# ==============================================================================
# 3.1 VIGYAN AI SOVEREIGN MODEL REGISTRY & DOWNLOAD MANAGER
# ==============================================================================
def get_platform_model_dirs() -> List[str]:
    """Returns platform-aware candidate directories for sovereign model weights."""
    dirs = []
    base_dir = os.path.dirname(os.path.abspath(__file__))
    dirs.append(os.path.join(base_dir, "..", "models"))
    dirs.append(os.path.join(base_dir, "models"))
    if sys.platform == "win32":
        local_app = os.environ.get("LOCALAPPDATA", os.path.expanduser("~/AppData/Local"))
        dirs.append(os.path.join(local_app, "vigyan", "models"))
    elif sys.platform == "darwin":
        dirs.append(os.path.expanduser("~/Library/Application Support/vigyan/models"))
    else:
        xdg_data = os.environ.get("XDG_DATA_HOME", os.path.expanduser("~/.local/share"))
        dirs.append(os.path.join(xdg_data, "vigyan", "models"))
    dirs.append(os.path.expanduser("~/.vigyan/models"))
    dirs.append(os.path.expanduser("~/models"))
    dirs.append(os.path.expanduser("~/Downloads"))
    return [d for d in dirs if d]
def _build_model_candidates(filename: str) -> List[str]:
    cands = []
    for d in get_platform_model_dirs():
        p = os.path.join(d, filename)
        if p not in cands:
            cands.append(p)
    return cands
ALLOWED_SOVEREIGN_MODELS = {
    "gemma-4-e4b-qat-q4-0.gguf",           # 4B Daily (Gemma 4 E4B)
    "vigyan-7b-quad-master-q4_k_m.gguf",    # 7B Production
    "gemma-4-12b-qat-q4-0.gguf"             # 12B Advanced
}
MODELS_CATALOG = {
    "gemma:4b": SOVEREIGN_PRODUCTION_MODELS[0],
    "gemma4": SOVEREIGN_PRODUCTION_MODELS[0],
    "4b": SOVEREIGN_PRODUCTION_MODELS[0],
    "gemma-4-e4b": SOVEREIGN_PRODUCTION_MODELS[0],
    "gemma-4-e4b-qat-q4-0.gguf": SOVEREIGN_PRODUCTION_MODELS[0],
    "vigyan:7b": SOVEREIGN_PRODUCTION_MODELS[1],
    "7b": SOVEREIGN_PRODUCTION_MODELS[1],
    "vigyan-7b": SOVEREIGN_PRODUCTION_MODELS[1],
    "vigyan-7b-quad-master-q4_k_m": SOVEREIGN_PRODUCTION_MODELS[1],
    "gemma:12b": SOVEREIGN_PRODUCTION_MODELS[2],
    "gemma4:12b": SOVEREIGN_PRODUCTION_MODELS[2],
    "12b": SOVEREIGN_PRODUCTION_MODELS[2],
    "gemma-4-12b": SOVEREIGN_PRODUCTION_MODELS[2],
    "gemma-4-12b-qat-q4-0.gguf": SOVEREIGN_PRODUCTION_MODELS[2],
}
class ModelDownloadManager:
    """Resumable chunked model downloader with pause, resume, cancel, speed tracking, and GGUF header verification."""
    def __init__(self):
        self.active_downloads: Dict[str, Dict[str, Any]] = {}
        self._lock = threading.Lock()

    def get_status(self, tag: Optional[str] = None) -> Dict[str, Any]:
        with self._lock:
            if tag:
                for k in (tag, tag.replace(":", "-"), tag.replace("-", ":")):
                    if k in self.active_downloads:
                        return self.active_downloads[k]
                return {"status": "idle"}
            return dict(self.active_downloads)

    def start_download(self, item: Any) -> Dict[str, Any]:
        if isinstance(item, str):
            clean_str = item.strip()
            if clean_str in MODELS_CATALOG:
                item = dict(MODELS_CATALOG[clean_str])
            else:
                found = None
                for m in VERIFIED_EXPERIMENTLAB_MODELS:
                    if clean_str.lower() in (m["id"].lower(), m["tag"].lower(), m["filename"].lower(), m["name"].lower()):
                        found = dict(m)
                        break
                if found:
                    item = found
                elif clean_str.endswith(".gguf"):
                    item = {"filename": clean_str, "tag": clean_str.replace(".gguf", "")}
                else:
                    return {"success": False, "error": f"Unknown model tag: {clean_str}"}

        tag = item.get("filename") or item.get("tag") or item.get("id") or "model.gguf"
        dest_filename = os.path.basename(item.get("filename") or item.get("dest_filename") or f"{tag}.gguf")
        if not dest_filename.endswith(".gguf"):
            dest_filename += ".gguf"

        hf_url = item.get("hf_url") or f"https://huggingface.co/Experimentlab/Vigyan-Models-GGUF/resolve/main/{dest_filename}?download=true"

        # Only allow model downloads from trusted hosts; the HF auth token must
        # never be sent to an arbitrary URL supplied by a client.
        allowed_hosts = {"huggingface.co", "cas-bridge.xethub.hf.co"}
        hf_host = urllib.parse.urlparse(hf_url).hostname or ""
        if hf_host not in allowed_hosts:
            logger.warning("Rejected model download from untrusted host: %s", hf_host)
            return {"success": False, "error": f"Download host not allowed: {hf_host}"}

        with self._lock:
            existing_dl = self.active_downloads.get(tag, {})
            if existing_dl.get("status") == "downloading":
                return {"success": True, "message": "Already downloading", "status": existing_dl}

            self.active_downloads[tag] = {
                "tag": tag,
                "name": item.get("name", dest_filename),
                "filename": dest_filename,
                "status": "starting",
                "progress_pct": existing_dl.get("progress_pct", 0.0),
                "downloaded_bytes": existing_dl.get("downloaded_bytes", 0),
                "total_bytes": item.get("size_bytes", 1_400_000_000),
                "speed_mbps": 0.0,
                "eta_seconds": 0,
                "eta_formatted": "--:--",
                "error": None,
                "item": item
            }

        def _download_thread():
            target_dir = os.path.expanduser("~/.vigyan/models")
            os.makedirs(target_dir, exist_ok=True)
            dest_file = os.path.join(target_dir, dest_filename)
            part_file = dest_file + ".part"
            total_req = item.get("size_bytes", 1_400_000_000)

            # Auto-Heal Check 1: If model already exists on disk and is a valid GGUF file
            if os.path.isfile(dest_file) and os.path.getsize(dest_file) >= 2_000_000:
                try:
                    with open(dest_file, "rb") as cf:
                        if cf.read(4) == b"GGUF":
                            logger.info("Auto-Heal: %s already verified and complete on disk", dest_filename)
                            with self._lock:
                                self.active_downloads[tag]["status"] = "ready"
                                self.active_downloads[tag]["progress_pct"] = 100.0
                                self.active_downloads[tag]["speed_mbps"] = 0.0
                                self.active_downloads[tag]["eta_formatted"] = "Ready"
                            return
                except Exception:
                    pass

            # Auto-Heal Check 2: If .part file already downloaded and verified
            if os.path.isfile(part_file) and os.path.getsize(part_file) >= 2_000_000:
                try:
                    p_sz = os.path.getsize(part_file)
                    with open(part_file, "rb") as cf:
                        if cf.read(4) == b"GGUF" and p_sz >= total_req - 2048:
                            logger.info("Auto-Heal: Finalizing completed %s (%d bytes)", dest_filename, p_sz)
                            os.replace(part_file, dest_file)
                            with self._lock:
                                self.active_downloads[tag]["status"] = "ready"
                                self.active_downloads[tag]["progress_pct"] = 100.0
                                self.active_downloads[tag]["speed_mbps"] = 0.0
                                self.active_downloads[tag]["eta_formatted"] = "Ready"
                            return
                except Exception:
                    pass

            try:
                import shutil
                free_disk = shutil.disk_usage(target_dir).free
                if free_disk < total_req + 100_000_000:
                    req_mb = int(total_req // (1024 * 1024) + 100)
                    free_mb = int(free_disk // (1024 * 1024))
                    with self._lock:
                        self.active_downloads[tag]["status"] = "error"
                        self.active_downloads[tag]["error"] = f"Insufficient disk space (requires ~{req_mb}MB free, only {free_mb}MB available)"
                    return
            except Exception:
                pass

            existing_bytes = os.path.getsize(part_file) if os.path.exists(part_file) else 0
            headers = {"User-Agent": "Vigyan-Pro-Sovereign-Downloader/5.0"}
            auth_token = get_hf_auth_token()
            if auth_token:
                headers["Authorization"] = f"Bearer {auth_token}"
            if existing_bytes > 0:
                headers["Range"] = f"bytes={existing_bytes}-"

            try:
                with self._lock:
                    self.active_downloads[tag]["status"] = "downloading"
                    self.active_downloads[tag]["downloaded_bytes"] = existing_bytes

                req = urllib.request.Request(hf_url, headers=headers)
                start_time = time.time()
                bytes_this_session = 0

                try:
                    resp = urllib.request.urlopen(req, timeout=30)
                except urllib.error.HTTPError as http_err:
                    if http_err.code == 416 and existing_bytes > 0:
                        # Auto-heal on 416: check if the existing file is complete and valid
                        if os.path.isfile(part_file) and os.path.getsize(part_file) >= 2_000_000:
                            try:
                                with open(part_file, "rb") as cf:
                                    if cf.read(4) == b"GGUF" and existing_bytes >= total_req - 2048:
                                        logger.info("HTTP 416 Auto-Heal: %s is complete (%d bytes). Finalizing.", dest_filename, existing_bytes)
                                        os.replace(part_file, dest_file)
                                        with self._lock:
                                            self.active_downloads[tag]["status"] = "ready"
                                            self.active_downloads[tag]["progress_pct"] = 100.0
                                            self.active_downloads[tag]["speed_mbps"] = 0.0
                                            self.active_downloads[tag]["eta_formatted"] = "Ready"
                                        return
                            except Exception as heal_err:
                                logger.warning("Could not finalize 416 file: %s", heal_err)

                        logger.warning("HTTP 416 for %s. Resetting stale .part file from byte 0", tag)
                        if os.path.exists(part_file):
                            try:
                                os.remove(part_file)
                            except Exception:
                                pass
                        existing_bytes = 0
                        headers.pop("Range", None)
                        req = urllib.request.Request(hf_url, headers=headers)
                        resp = urllib.request.urlopen(req, timeout=30)
                    else:
                        raise

                with resp:
                    total = total_req
                    cr = resp.headers.get("Content-Range")
                    if cr and "/" in cr:
                        try:
                            total = int(cr.split("/")[-1])
                        except Exception:
                            pass
                    elif resp.headers.get("Content-Length") and existing_bytes == 0:
                        total = int(resp.headers.get("Content-Length"))

                    # If server returned HTTP 200 instead of 206 Partial Content, reset from offset 0
                    if getattr(resp, "status", 200) == 200 and existing_bytes > 0:
                        existing_bytes = 0

                    mode = "ab" if existing_bytes > 0 else "wb"
                    with open(part_file, mode) as f:
                        while True:
                            with self._lock:
                                st = self.active_downloads.get(tag, {}).get("status")
                                if st == "cancelled":
                                    return
                                if st == "paused":
                                    self.active_downloads[tag]["speed_mbps"] = 0.0
                                    self.active_downloads[tag]["eta_formatted"] = "Paused"
                                    return

                            chunk = resp.read(1024 * 256)
                            if not chunk:
                                break
                            f.write(chunk)
                            bytes_this_session += len(chunk)
                            current_total = existing_bytes + bytes_this_session
                            elapsed = max(0.1, time.time() - start_time)
                            speed_bytes_sec = bytes_this_session / elapsed
                            speed_mbps = speed_bytes_sec / (1024 * 1024)
                            pct = min(99.0, round((current_total / max(1, total)) * 100, 1))

                            remaining_bytes = max(0, total - current_total)
                            eta_sec = int(remaining_bytes / max(1000, speed_bytes_sec))
                            if eta_sec >= 3600:
                                eta_fmt = f"{eta_sec // 3600}h {(eta_sec % 3600) // 60}m"
                            elif eta_sec >= 60:
                                eta_fmt = f"{eta_sec // 60}m {eta_sec % 60}s"
                            else:
                                eta_fmt = f"{eta_sec}s"

                            with self._lock:
                                self.active_downloads[tag]["downloaded_bytes"] = current_total
                                self.active_downloads[tag]["total_bytes"] = total
                                self.active_downloads[tag]["progress_pct"] = pct
                                self.active_downloads[tag]["speed_mbps"] = round(speed_mbps, 1)
                                self.active_downloads[tag]["eta_seconds"] = eta_sec
                                self.active_downloads[tag]["eta_formatted"] = eta_fmt

                # Check if paused before validation
                with self._lock:
                    if self.active_downloads.get(tag, {}).get("status") in ("paused", "cancelled"):
                        return

                # Validate binary integrity
                part_size = os.path.getsize(part_file)
                if part_size < 2_000_000:
                    raise ValueError(f"Downloaded file is suspiciously small ({part_size} bytes < 2MB); check URL")

                with open(part_file, "rb") as check_f:
                    magic = check_f.read(4)
                    if magic != b"GGUF":
                        if os.path.exists(part_file):
                            try:
                                os.remove(part_file)
                            except Exception:
                                pass
                        raise ValueError(f"Corrupted binary: invalid GGUF magic header ({magic!r})")

                # Atomic replace with retry for Windows file locks
                pass  # singleton managed via runtime module attribute
                was_active = False
                if runtime.LLAMA_SUPERVISOR and runtime.LLAMA_SUPERVISOR.is_alive():
                    try:
                        if os.path.abspath(runtime.LLAMA_SUPERVISOR.model_path or "") == os.path.abspath(dest_file):
                            runtime.LLAMA_SUPERVISOR.stop()
                            was_active = True
                    except Exception:
                        pass

                replaced = False
                for attempt in range(5):
                    try:
                        if os.path.exists(dest_file):
                            try:
                                os.remove(dest_file)
                            except Exception:
                                pass
                        os.replace(part_file, dest_file)
                        replaced = True
                        break
                    except Exception:
                        time.sleep(0.2)

                if not replaced:
                    os.rename(part_file, dest_file)

                # Check companion mmproj download for Vision models
                mmproj_url = item.get("mmproj_url")
                mmproj_filename = item.get("mmproj_filename")
                if mmproj_url and mmproj_filename:
                    vl_dir = os.path.join(target_dir, "vl4b")
                    os.makedirs(vl_dir, exist_ok=True)
                    target_mmproj = os.path.join(vl_dir, mmproj_filename)
                    if not (os.path.isfile(target_mmproj) and os.path.getsize(target_mmproj) > 100_000_000):
                        try:
                            logger.info("Downloading companion vision projector: %s", mmproj_filename)
                            mmproj_req = urllib.request.Request(mmproj_url, headers={"User-Agent": "Vigyan-Pro-Sovereign-Downloader/5.0"})
                            if auth_token:
                                mmproj_req.add_header("Authorization", f"Bearer {auth_token}")
                            with urllib.request.urlopen(mmproj_req, timeout=120) as m_resp, open(target_mmproj + ".part", "wb") as m_f:
                                while True:
                                    m_chunk = m_resp.read(1024 * 256)
                                    if not m_chunk:
                                        break
                                    m_f.write(m_chunk)
                            os.replace(target_mmproj + ".part", target_mmproj)
                        except Exception as mmproj_err:
                            logger.warning("Companion mmproj download error: %s", mmproj_err)
                    else:
                        logger.info("Companion vision projector %s already present (%d bytes)", mmproj_filename, os.path.getsize(target_mmproj))

                if was_active and runtime.LLAMA_SUPERVISOR:
                    try:
                        runtime.LLAMA_SUPERVISOR.start()
                    except Exception:
                        pass

                with self._lock:
                    self.active_downloads[tag]["status"] = "ready"
                    self.active_downloads[tag]["progress_pct"] = 100.0
                    self.active_downloads[tag]["speed_mbps"] = 0.0
                    self.active_downloads[tag]["eta_formatted"] = "Ready"

            except Exception as exc:
                logger.exception("Download thread failure for %s: %s", tag, exc)
                with self._lock:
                    st = self.active_downloads.get(tag, {}).get("status")
                    if st not in ("paused", "cancelled"):
                        self.active_downloads[tag]["status"] = "error"
                        self.active_downloads[tag]["error"] = str(exc)

        threading.Thread(target=_download_thread, daemon=True).start()
        return {"success": True, "message": "Download started", "tag": tag}

    def pause_download(self, tag: str) -> bool:
        with self._lock:
            for k in (tag, tag.replace(".gguf", ""), tag + ".gguf"):
                if k in self.active_downloads and self.active_downloads[k]["status"] in ("downloading", "starting"):
                    self.active_downloads[k]["status"] = "paused"
                    self.active_downloads[k]["speed_mbps"] = 0.0
                    self.active_downloads[k]["eta_formatted"] = "Paused"
                    return True
        return False

    def resume_download(self, tag: str) -> bool:
        with self._lock:
            target_key = None
            for k in (tag, tag.replace(".gguf", ""), tag + ".gguf"):
                if k in self.active_downloads and self.active_downloads[k]["status"] == "paused":
                    target_key = k
                    break
            if not target_key:
                return False
            item = self.active_downloads[target_key].get("item") or {
                "filename": self.active_downloads[target_key]["filename"],
                "name": self.active_downloads[target_key]["name"],
                "size_bytes": self.active_downloads[target_key]["total_bytes"],
            }
        return self.start_download(item).get("success", False)

    def cancel_download(self, tag: str, remove_part: bool = True) -> bool:
        with self._lock:
            target_key = None
            for k in (tag, tag.replace(".gguf", ""), tag + ".gguf"):
                if k in self.active_downloads:
                    target_key = k
                    break
            if not target_key:
                return False
            if self.active_downloads[target_key].get("status") in ("idle", "ready", "completed"):
                return False
            self.active_downloads[target_key]["status"] = "cancelled"
            fname = self.active_downloads[target_key].get("filename") or tag
            if remove_part:
                part_path = os.path.join(os.path.expanduser("~/.vigyan/models"), fname + ".part")
                if os.path.exists(part_path):
                    try:
                        os.remove(part_path)
                    except Exception:
                        pass
            return True
_DOWNLOAD_MGR = ModelDownloadManager()
def _format_clean_model_name(filename: str, repo_id: str) -> str:
    clean = filename.replace(".gguf", "")
    for ext in [".Q4_K_M", "-q4_k_m", "-q8_0", ".q8_0", "-iq3_m", "-f16", ".f16"]:
        clean = re.sub(re.escape(ext) + "$", "", clean, flags=re.IGNORECASE)
    parts = clean.split("-")
    title_parts = [p.capitalize() for p in parts]
    return " ".join(title_parts)
def _infer_model_domain(filename: str, repo_id: str) -> str:
    lower = (filename + " " + repo_id).lower()
    if "quad-master" in lower:
        return "Flagship STEM, Calculus & Exact CAS"
    if "stem" in lower:
        return "Comprehensive STEM & Applied Sciences"
    if "reason" in lower:
        return "Deterministic Logic & Multi-Step Reasoning"
    if "moe" in lower:
        return "High-Velocity Sparse Mixture-of-Experts"
    if "math" in lower:
        return "Doctoral Proofs & Abstract Analysis"
    if "chem" in lower or "biomed" in lower:
        return "Bio-Molecular Alignment & Pharmacology"
    if "vl" in lower or "vision" in lower:
        return "Vision-Language, Diagrams & Circuit Schematics"
    if "rtl" in lower or "silicon" in lower:
        return "Verilog RTL & VLSI Circuit Design"
    return "Sovereign Engineering Intelligence Engine"
def _scan_and_cache_hf_repos(cache_file: str) -> List[Dict[str, Any]]:
    """Internal helper to scan public Hugging Face repos and update cache."""
    import concurrent.futures
    now = time.time()
    discovered = []
    seen_filenames = set()
    authors = ["Experimentlab", "shreyansh12183"]
    all_repos = []

    for author in authors:
        try:
            req = urllib.request.Request(
                f"https://huggingface.co/api/models?author={author}",
                headers={"User-Agent": "Vigyan-Pro-Discovery/5.0"}
            )
            with urllib.request.urlopen(req, timeout=5) as r:
                r_list = json.loads(r.read())
                for repo in r_list:
                    if repo.get("private", False):
                        continue
                    repo_id = repo.get("id")
                    if repo_id and not repo_id.endswith("/README"):
                        all_repos.append(repo_id)
        except Exception:
            pass

    def scan_repo_tree(repo_id: str) -> List[Dict[str, Any]]:
        repo_discovered = []
        try:
            tree_url = f"https://huggingface.co/api/models/{repo_id}/tree/main?recursive=True"
            treq = urllib.request.Request(tree_url, headers={"User-Agent": "Vigyan-Pro-Discovery/5.0"})
            with urllib.request.urlopen(treq, timeout=4) as tr:
                tree = json.loads(tr.read())
                for f in tree:
                    path = f.get("path", "")
                    if path.endswith(".gguf") and not os.path.basename(path).startswith("mmproj"):
                        fname = os.path.basename(path)
                        size_bytes = f.get("size", 0)
                        size_gb = round(size_bytes / (1024 ** 3), 2)
                        ram_req = max(2.0, round(size_gb * 1.4 + 0.8, 1))
                        hf_url = f"https://huggingface.co/{repo_id}/resolve/main/{path}?download=true"

                        repo_discovered.append({
                            "id": fname.replace(".gguf", "").lower(),
                            "name": _format_clean_model_name(fname, repo_id),
                            "tag": fname.replace(".gguf", "").lower(),
                            "filename": fname,
                            "rel_path": path,
                            "size_bytes": size_bytes,
                            "size_formatted": f"{size_gb} GB",
                            "ram_required_gb": ram_req,
                            "domain": _infer_model_domain(fname, repo_id),
                            "hf_url": hf_url,
                            "hf_repo": repo_id
                        })
        except Exception:
            pass
        return repo_discovered

    if all_repos:
        with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
            futures = [executor.submit(scan_repo_tree, r_id) for r_id in all_repos]
            for future in concurrent.futures.as_completed(futures):
                try:
                    res = future.result()
                    for item in res:
                        fname = item["filename"]
                        if fname not in seen_filenames:
                            seen_filenames.add(fname)
                            discovered.append(item)
                except Exception:
                    pass

    if discovered:
        discovered.sort(key=lambda m: (
            0 if "gemma-4-e4b" in m["filename"] else
            1 if "vigyan-7b" in m["filename"] else
            2 if "gemma-4-12b" in m["filename"] else 3,
            m["size_bytes"]
        ))
        os.makedirs(os.path.dirname(cache_file), exist_ok=True)
        try:
            with open(cache_file, "w") as f:
                json.dump({"timestamp": now, "models": discovered}, f, indent=2)
        except Exception:
            pass
        return discovered

    return []
def fetch_dynamic_hf_catalog(force_refresh: bool = False) -> List[Dict[str, Any]]:
    """Return strictly the authorized sovereign production models (100% offline)."""
    return list(SOVEREIGN_PRODUCTION_MODELS)
def get_models_catalog(force_refresh: bool = False) -> Dict[str, Any]:
    """Dynamically discover models from the authorized production registry and local ~/.vigyan/models/."""
    from llama_supervisor import detect_hardware_profile
    hw = detect_hardware_profile()
    avail_ram = hw.get("avail_ram_gb", 4.0)
    total_ram = hw.get("total_ram_gb", 8.0)

    target_dir = os.path.expanduser("~/.vigyan/models")
    os.makedirs(target_dir, exist_ok=True)

    local_files = {}
    try:
        for entry in os.scandir(target_dir):
            if entry.is_file() and entry.name.endswith(".gguf") and not entry.name.startswith("mmproj"):
                local_files[entry.name] = entry.stat().st_size
        vl_dir = os.path.join(target_dir, "vl4b")
        if os.path.isdir(vl_dir):
            for entry in os.scandir(vl_dir):
                if entry.is_file() and entry.name.endswith(".gguf") and not entry.name.startswith("mmproj"):
                    local_files[entry.name] = entry.stat().st_size
    except Exception:
        pass

    active_path = runtime.LLAMA_SUPERVISOR.model_path or ""
    active_filename = os.path.basename(active_path) if active_path else ""

    result_models = []
    seen_filenames = set()

    for m in SOVEREIGN_PRODUCTION_MODELS:
        fname = m["filename"]
        seen_filenames.add(fname)
        is_installed = fname in local_files
        is_active = is_installed and (fname == active_filename)
        actual_size = local_files.get(fname, m["size_bytes"])

        req_ram = m.get("ram_required_gb", 4.0)
        if avail_ram >= req_ram:
            comp = "verified"
            badge = f"Verified for your {total_ram}GB RAM"
        elif total_ram >= req_ram:
            comp = "tight"
            badge = "Tight RAM (Runs on CPU)"
        else:
            comp = "incompatible"
            badge = f"Requires {req_ram}GB RAM"

        item = dict(m)
        item.update({
            "is_installed": is_installed,
            "is_active": is_active,
            "actual_size_bytes": actual_size,
            "compatibility": comp,
            "compatibility_badge": badge,
        })
        result_models.append(item)

    for fname, size in local_files.items():
        if fname in ALLOWED_SOVEREIGN_MODELS and fname not in seen_filenames:
            is_active = (fname == active_filename)
            size_gb = round(size / (1024 ** 3), 2)
            result_models.append({
                "id": fname.replace(".gguf", ""),
                "name": fname.replace(".gguf", "").replace("-", " ").title(),
                "tag": fname.replace(".gguf", ""),
                "filename": fname,
                "size_bytes": size,
                "size_formatted": f"{size_gb} GB",
                "ram_required_gb": max(2.0, round(size_gb * 1.5, 1)),
                "domain": "Local Sovereign Engine",
                "hf_url": "",
                "hf_repo": "local",
                "is_installed": True,
                "is_active": is_active,
                "actual_size_bytes": size,
                "compatibility": "verified",
                "compatibility_badge": "Local Custom Engine",
            })

    installed_count = sum(1 for m in result_models if m.get("is_installed"))
    rec_model = "gemma-4-e4b-qat-q4-0.gguf"

    legacy_catalog = {
        m.get("tag", m["filename"]): {
            **m,
            "dest_filename": m["filename"],
        }
        for m in result_models
    }
    for m in result_models:
        tag = m.get("tag", "")
        if "-" in tag:
            colon_tag = tag.replace("-", ":", 1)
            legacy_catalog[colon_tag] = {**m, "dest_filename": m["filename"]}

    # Guarantee canonical alias tags (gemma:4b, vigyan:7b, gemma:12b) are always present
    for canon_tag, canon_item in MODELS_CATALOG.items():
        if canon_tag not in legacy_catalog:
            legacy_catalog[canon_tag] = dict(canon_item)

    return {
        "models": result_models,
        "catalog": legacy_catalog,
        "system_ram_gb": hw.get("total_ram_gb", 8.0),
        "installed_count": installed_count,
        "recommended_filename": rec_model,
        "active_filename": active_filename,
        "hardware": hw,
        "downloads": _DOWNLOAD_MGR.get_status(),
    }
CONFIG_FILE = os.path.expanduser("~/.vigyan/config.json")

DEFAULT_CONFIG: Dict[str, Any] = {
    "temperature": 0.0,
    "cpu_threads": max(1, min(4, (os.cpu_count() or 4) - 1)),
    "context_window": 2048,
    "font_size": "md",
    "auto_open_canvas": True,
    "hf_token": "",
    "licence_accepted": False,
    "accepted_at": "",
}


def load_user_config() -> Dict[str, Any]:
    try:
        os.makedirs(os.path.expanduser("~/.vigyan"), exist_ok=True)
    except OSError:
        pass
    cfg = dict(DEFAULT_CONFIG)
    if os.path.isfile(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                if isinstance(data, dict):
                    cfg.update(data)
        except Exception:
            pass
    return cfg
def save_user_config(updates: Dict[str, Any]) -> Dict[str, Any]:
    try:
        os.makedirs(os.path.expanduser("~/.vigyan"), exist_ok=True)
    except OSError:
        pass
    cfg = load_user_config()
    for k, v in updates.items():
        if k in DEFAULT_CONFIG:
            cfg[k] = v
    try:
        with open(CONFIG_FILE, "w", encoding="utf-8") as f:
            json.dump(cfg, f, indent=2)
    except Exception as exc:
        print(f"[Warning] Failed to persist config to {CONFIG_FILE}: {exc}", file=sys.stderr)
    return cfg
def get_storage_stats() -> Dict[str, Any]:
    models_dir = os.path.expanduser("~/.vigyan/models")
    total_model_bytes = 0
    if os.path.isdir(models_dir):
        for root, _, files in os.walk(models_dir):
            for file in files:
                try:
                    total_model_bytes += os.path.getsize(os.path.join(root, file))
                except OSError:
                    pass

    total_disk_bytes, used_disk_bytes, free_disk_bytes = 0, 0, 0
    try:
        usage = shutil.disk_usage(models_dir if os.path.isdir(models_dir) else os.path.expanduser("~"))
        total_disk_bytes = usage.total
        free_disk_bytes = usage.free
        used_disk_bytes = usage.used
    except Exception:
        pass

    def _fmt(b: int) -> str:
        if b >= 1024**3:
            return f"{b / (1024**3):.2f} GB"
        if b >= 1024**2:
            return f"{b / (1024**2):.1f} MB"
        return f"{b / 1024:.0f} KB"

    return {
        "models_dir": models_dir,
        "models_bytes": total_model_bytes,
        "models_formatted": _fmt(total_model_bytes),
        "free_bytes": free_disk_bytes,
        "free_formatted": _fmt(free_disk_bytes),
        "total_bytes": total_disk_bytes,
        "total_formatted": _fmt(total_disk_bytes),
        "disk_percent": round((used_disk_bytes / total_disk_bytes * 100), 1) if total_disk_bytes > 0 else 0
    }
# ==============================================================================
# 4. OLLAMA DAEMON SUPERVISOR & WEBKITGTK WORKSTATION SHELL
# ==============================================================================
