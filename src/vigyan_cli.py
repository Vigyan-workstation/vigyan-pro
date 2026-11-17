#!/usr/bin/env python3
"""
vigyan_cli.py
Vigyan Sovereign Offline CLI Interface v4.2.
100% Offline, Zero Cloud Egress, Air-Gapped Physical Engineering Intelligence.

Subcommands:
  vigyan models / ls        List local installed models and available Hugging Face models
  vigyan pull <model>       Download GGUF model directly from huggingface.co/Experimentlab
  vigyan rm <model>         Delete local model to reclaim disk space
  vigyan run [model]        Enter interactive STEM REPL chat
  vigyan "prompt"           One-shot query or UNIX pipe (e.g. cat script.py | vigyan)
"""

import os
import sys
import json
import time
import shutil
import urllib.request
import urllib.error
import subprocess
from typing import Optional, List, Dict, Any

DEFAULT_HOST = "http://127.0.0.1:8086"
MODELS_DIR = os.path.expanduser("~/.vigyan/models")

ALLOWED_SOVEREIGN_MODELS = {
    "vigyan-3b-quad-master-iq3_m.gguf",        # Daily STEM (3B)
    "vigyan-7b-quad-master-q4_k_m.gguf",        # Doctoral STEM (7B)
    "DeepSeek-R1-Distill-Qwen-14B-IQ3_M.gguf"  # Deep Reasoning (14B)
}

SOVEREIGN_PRODUCTION_MODELS = [
    {
        "id": "vigyan-3b-quad-master-iq3_m",
        "name": "Vigyan-3B Quad-Master",
        "tag": "vigyan:3b",
        "short_label": "3B Daily",
        "filename": "vigyan-3b-quad-master-iq3_m.gguf",
        "size_bytes": 1496924256,
        "size_formatted": "1.39 GB",
        "ram_required_gb": 3.5,
        "domain": "Fast STEM, Calculus & Exact Symbolic Mathematics",
        "hf_url": "https://huggingface.co/shreyansh12183/vigyan-3b-quad-master/resolve/main/vigyan-3b-quad-master-iq3_m.gguf?download=true",
        "hf_repo": "shreyansh12183/vigyan-3b-quad-master",
    },
    {
        "id": "vigyan-7b-quad-master-q4_k_m",
        "name": "Vigyan-7B Quad-Master",
        "tag": "vigyan:7b",
        "short_label": "7B Doctoral",
        "filename": "vigyan-7b-quad-master-q4_k_m.gguf",
        "size_bytes": 4467000000,
        "size_formatted": "4.16 GB",
        "ram_required_gb": 8.0,
        "domain": "Doctoral Proofs, Complex Engineering & Physical Science",
        "hf_url": "https://huggingface.co/shreyansh12183/vigyan-olmo2-7b-quad-master/resolve/main/vigyan-7b-quad-master-q4_k_m.gguf?download=true",
        "hf_repo": "shreyansh12183/vigyan-olmo2-7b-quad-master",
    },
    {
        "id": "deepseek-r1-14b-iq3_m",
        "name": "DeepSeek-R1 14B Reasoning",
        "tag": "deepseek:14b",
        "short_label": "14B Reasoning",
        "filename": "DeepSeek-R1-Distill-Qwen-14B-IQ3_M.gguf",
        "size_bytes": 6916537760,
        "size_formatted": "6.44 GB",
        "ram_required_gb": 10.0,
        "domain": "Frontier Step-by-Step Chain-of-Thought & Quantum Physics",
        "hf_url": "https://huggingface.co/bartowski/DeepSeek-R1-Distill-Qwen-14B-GGUF/resolve/main/DeepSeek-R1-Distill-Qwen-14B-IQ3_M.gguf?download=true",
        "hf_repo": "bartowski/DeepSeek-R1-Distill-Qwen-14B-GGUF",
    }
]

VERIFIED_EXPERIMENTLAB_MODELS = SOVEREIGN_PRODUCTION_MODELS


MODEL_ALIASES = {
    "3b": "vigyan-3b-quad-master-iq3_m.gguf",
    "vigyan:3b": "vigyan-3b-quad-master-iq3_m.gguf",
    "vigyan-3b": "vigyan-3b-quad-master-iq3_m.gguf",
    "7b": "vigyan-7b-quad-master-q4_k_m.gguf",
    "vigyan:7b": "vigyan-7b-quad-master-q4_k_m.gguf",
    "vigyan-7b": "vigyan-7b-quad-master-q4_k_m.gguf",
    "14b": "DeepSeek-R1-Distill-Qwen-14B-IQ3_M.gguf",
    "deepseek:14b": "DeepSeek-R1-Distill-Qwen-14B-IQ3_M.gguf",
    "deepseek-14b": "DeepSeek-R1-Distill-Qwen-14B-IQ3_M.gguf",
    "r1": "DeepSeek-R1-Distill-Qwen-14B-IQ3_M.gguf",
    "deepseek": "DeepSeek-R1-Distill-Qwen-14B-IQ3_M.gguf",
}


def get_local_models() -> List[str]:
    """Scan ~/.vigyan/models/ for authorized GGUF weights."""
    if not os.path.isdir(MODELS_DIR):
        return []
    models = []
    for f in os.listdir(MODELS_DIR):
        if f.endswith(".gguf") and not f.startswith("mmproj"):
            if f in ALLOWED_SOVEREIGN_MODELS:
                models.append(f)
    vl_dir = os.path.join(MODELS_DIR, "vl4b")
    if os.path.isdir(vl_dir):
        for f in os.listdir(vl_dir):
            if f.endswith(".gguf") and not f.startswith("mmproj"):
                if f in ALLOWED_SOVEREIGN_MODELS:
                    models.append(os.path.join("vl4b", f))
    return sorted(models)


def find_model_file(name_or_tag: str) -> Optional[str]:
    """Resolve a user-supplied model identifier or alias to an absolute path."""
    clean = name_or_tag.strip().lower()
    if os.path.isfile(name_or_tag.strip()):
        return os.path.abspath(name_or_tag.strip())

    resolved_fname = MODEL_ALIASES.get(clean, clean)
    if not resolved_fname.endswith(".gguf"):
        resolved_fname = f"{resolved_fname}.gguf"

    # Check direct in MODELS_DIR
    cand = os.path.join(MODELS_DIR, resolved_fname)
    if os.path.isfile(cand):
        return cand

    # Check in MODELS_DIR/vl4b
    cand_vl = os.path.join(MODELS_DIR, "vl4b", resolved_fname)
    if os.path.isfile(cand_vl):
        return cand_vl

    local = get_local_models()
    for m in local:
        if resolved_fname.lower() in m.lower():
            return os.path.join(MODELS_DIR, m)

    return None


def get_dynamic_catalog(refresh: bool = False) -> List[Dict[str, Any]]:
    """Return the 4 sovereign production models (queried from local bridge if running)."""
    try:
        url = f"{DEFAULT_HOST}/api/models/catalog"
        req = urllib.request.Request(url, headers={"User-Agent": "Vigyan-CLI/5.0"})
        with urllib.request.urlopen(req, timeout=1.0) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data and "models" in data:
                return data["models"]
    except Exception:
        pass
    return list(SOVEREIGN_PRODUCTION_MODELS)


def cmd_models(refresh: bool = False):
    """List the 4 authorized sovereign models with hardware compatibility."""
    from llama_supervisor import detect_hardware_profile
    hw = detect_hardware_profile()
    total_ram = hw.get("total_ram_gb", 8.0)
    avail_ram = hw.get("avail_ram_gb", 4.0)
    tier = hw.get("tier", "cpu")

    catalog = get_dynamic_catalog(refresh=False)
    local = get_local_models()

    print("┌────────────────────────────────────────────────────────────────────────────────────────┐")
    print("│  VIGYAN SOVEREIGN MATRIX • 3 Authorized Scientific Engines                             │")
    print(f"│  Host: {total_ram:.1f} GB RAM ({avail_ram:.1f} GB available) • Compute: {tier:<38} │")
    print("├─────────────┬─────────────┬──────────────────────────┬──────────┬──────────────┬───────┤")
    print(f"│ {'STATUS':<11} │ {'ALIAS':<11} │ {'MODEL NAME':<24} │ {'SIZE':<8} │ {'MEMORY':<12} │ {'TIER':<5} │")
    print("├─────────────┼─────────────┼──────────────────────────┼──────────┼──────────────┼───────┤")

    tier_labels = {
        "vigyan-3b-quad-master-iq3_m.gguf": "Daily",
        "vigyan-7b-quad-master-q4_k_m.gguf": "Doct.",
        "DeepSeek-R1-Distill-Qwen-14B-IQ3_M.gguf": "Reason"
    }

    alias_display = {
        "vigyan-3b-quad-master-iq3_m.gguf": "vigyan:3b",
        "vigyan-7b-quad-master-q4_k_m.gguf": "vigyan:7b",
        "DeepSeek-R1-Distill-Qwen-14B-IQ3_M.gguf": "deepseek:14b"
    }

    seen = set()
    for m in catalog:
        fname = m.get("filename", "")
        if not fname or fname in seen:
            continue
        seen.add(fname)
        is_inst = fname in local or os.path.join("vl4b", fname) in local
        status = "● INSTALLED" if is_inst else "○ AVAILABLE"

        req = m.get("ram_required_gb", 4.0)
        if avail_ram >= req:
            badge = "🟢 Verified"
        elif total_ram >= req:
            badge = "🟡 Tight RAM"
        else:
            badge = "🔴 Recom 16G"

        alias = alias_display.get(fname, m.get("tag", "vigyan"))
        name_display = m.get("name", fname)[:24]
        size_display = m.get("size_formatted", "~1.4 GB")[:8]
        t_label = tier_labels.get(fname, "STEM")
        print(f"│ {status:<11} │ {alias:<11} │ {name_display:<24} │ {size_display:<8} │ {badge:<12} │ {t_label:<5} │")

    print("└─────────────┴─────────────┴──────────────────────────┴──────────┴──────────────┴───────┘")
    print("Commands: vigyan pull <alias>  │  vigyan run [alias]  │  vigyan rm <alias>")
    print()


def get_hf_auth_token() -> Optional[str]:
    """Discover user's Hugging Face auth token from environment, config, or cache."""
    env_token = os.environ.get("HF_TOKEN") or os.environ.get("HUGGING_FACE_HUB_TOKEN")
    if env_token and env_token.strip():
        return env_token.strip()

    try:
        cfg_path = os.path.expanduser("~/.vigyan/config.json")
        if os.path.isfile(cfg_path):
            with open(cfg_path, "r", encoding="utf-8") as f:
                cfg = json.load(f)
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


def cmd_pull(model_name: str) -> bool:
    """Download model with terminal progress bar, ETA, and GGUF header verification."""
    clean = model_name.strip().lower()
    target_info = None

    # Resolve alias
    resolved_fname = MODEL_ALIASES.get(clean, clean)
    if not resolved_fname.endswith(".gguf"):
        resolved_fname = f"{resolved_fname}.gguf"

    if resolved_fname not in ALLOWED_SOVEREIGN_MODELS:
        print(f"[Error] '{model_name}' is not an authorized sovereign model.", file=sys.stderr)
        print("Authorized models: 3b, 4b, 7b, 14b (or vigyan:3b, vigyan:4b, vigyan:7b, vigyan:14b)", file=sys.stderr)
        return False

    for m in SOVEREIGN_PRODUCTION_MODELS:
        if m["filename"] == resolved_fname:
            target_info = m
            break

    if not target_info:
        print(f"[Error] Metadata not found for {resolved_fname}", file=sys.stderr)
        return False

    # Check RAM advisory
    try:
        from llama_supervisor import detect_hardware_profile
        hw = detect_hardware_profile()
        avail_ram = hw.get("avail_ram_gb", 4.0)
        req_ram = target_info.get("ram_required_gb", 4.0)
        if avail_ram < req_ram:
            print(f"[RAM Notice] {target_info['name']} requires ~{req_ram:.1f} GB RAM. Your system has {avail_ram:.1f} GB available.")
            print("  (Execution may be slow or restricted to conserve memory.)")
    except Exception:
        pass

    os.makedirs(MODELS_DIR, exist_ok=True)
    dest_file = os.path.join(MODELS_DIR, target_info["filename"])
    part_file = dest_file + ".part"

    if os.path.isfile(dest_file):
        print(f"[Notice] Model '{target_info['filename']}' is already installed at: {dest_file}")
        return True

    # Pre-flight disk space check
    try:
        free_space = shutil.disk_usage(MODELS_DIR).free
        total_req = target_info.get("size_bytes", 1_400_000_000)
        if free_space < total_req + 100_000_000:
            req_mb = int(total_req // (1024 * 1024) + 100)
            free_mb = int(free_space // (1024 * 1024))
            print(f"[Error] Insufficient disk space in ~/.vigyan/models/. Needs ~{req_mb} MB free, only {free_mb} MB available.", file=sys.stderr)
            return False
    except Exception:
        pass

    print(f"Connecting to Hugging Face CDN ({target_info['hf_url']})...")
    existing_bytes = os.path.getsize(part_file) if os.path.exists(part_file) else 0
    headers = {"User-Agent": "Vigyan-CLI-Sovereign-Downloader/5.0"}
    auth_token = get_hf_auth_token()
    if auth_token:
        headers["Authorization"] = f"Bearer {auth_token}"
    if existing_bytes > 0:
        headers["Range"] = f"bytes={existing_bytes}-"
        print(f"Resuming download from byte offset {existing_bytes}...")

    req = urllib.request.Request(target_info["hf_url"], headers=headers)
    start_time = time.time()
    bytes_this_session = 0

    try:
        try:
            resp = urllib.request.urlopen(req, timeout=30)
        except urllib.error.HTTPError as http_err:
            if http_err.code == 416 and existing_bytes > 0:
                print("\n[Notice] Stale download offset detected. Resetting partial file...", file=sys.stderr)
                if os.path.exists(part_file):
                    try:
                        os.remove(part_file)
                    except Exception:
                        pass
                existing_bytes = 0
                headers.pop("Range", None)
                req = urllib.request.Request(target_info["hf_url"], headers=headers)
                resp = urllib.request.urlopen(req, timeout=30)
            else:
                raise

        with resp:
            total = target_info.get("size_bytes", 1_400_000_000)
            cr = resp.headers.get("Content-Range")
            if cr and "/" in cr:
                try:
                    total = int(cr.split("/")[-1])
                except Exception:
                    pass
            elif resp.headers.get("Content-Length") and existing_bytes == 0:
                total = int(resp.headers.get("Content-Length"))

            mode = "ab" if existing_bytes > 0 else "wb"
            bar_width = 26

            with open(part_file, mode) as f:
                while True:
                    chunk = resp.read(1024 * 256)
                    if not chunk:
                        break
                    f.write(chunk)
                    bytes_this_session += len(chunk)
                    current_total = existing_bytes + bytes_this_session
                    elapsed = max(0.01, time.time() - start_time)
                    speed_bytes_sec = bytes_this_session / elapsed
                    speed_mbps = speed_bytes_sec / (1024 * 1024)
                    pct = min(100.0, (current_total / max(1, total)) * 100)
                    filled = int(bar_width * (pct / 100.0))
                    bar = "█" * filled + "░" * (bar_width - filled)
                    mb_done = round(current_total / (1024 * 1024), 1)
                    mb_tot = round(total / (1024 * 1024), 1)

                    rem_bytes = max(0, total - current_total)
                    eta_sec = int(rem_bytes / max(1000, speed_bytes_sec))
                    if eta_sec >= 3600:
                        eta_str = f"{eta_sec // 3600}h {(eta_sec % 3600) // 60}m"
                    elif eta_sec >= 60:
                        eta_str = f"{eta_sec // 60}m {eta_sec % 60}s"
                    else:
                        eta_str = f"{eta_sec}s"

                    sys.stdout.write(f"\r  [{bar}] {pct:>5.1f}% • {mb_done:>6.1f}/{mb_tot}MB ({speed_mbps:>4.1f}MB/s) • ETA: {eta_str:<7}")
                    sys.stdout.flush()

        print()
        # Verify binary size and GGUF magic header
        part_size = os.path.getsize(part_file)
        if part_size < 2_000_000:
            raise ValueError(f"Downloaded binary suspiciously small ({part_size} bytes < 2MB); verify URL")

        with open(part_file, "rb") as check_f:
            magic = check_f.read(4)
            if magic != b"GGUF":
                raise ValueError(f"Corrupted binary: invalid GGUF header ({magic!r})")

        replaced = False
        for _ in range(5):
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

        # Companion mmproj download for Vision models
        mmproj_url = target_info.get("mmproj_url")
        mmproj_filename = target_info.get("mmproj_filename")
        if mmproj_url and mmproj_filename:
            vl_dir = os.path.join(MODELS_DIR, "vl4b")
            os.makedirs(vl_dir, exist_ok=True)
            target_mmproj = os.path.join(vl_dir, mmproj_filename)
            if not os.path.isfile(target_mmproj):
                print(f"Downloading companion vision projector ({mmproj_filename})...")
                m_req = urllib.request.Request(mmproj_url, headers={"User-Agent": "Vigyan-CLI-Sovereign-Downloader/5.0"})
                if auth_token:
                    m_req.add_header("Authorization", f"Bearer {auth_token}")
                try:
                    with urllib.request.urlopen(m_req, timeout=120) as m_resp, open(target_mmproj + ".part", "wb") as m_f:
                        while True:
                            m_chunk = m_resp.read(1024 * 256)
                            if not m_chunk:
                                break
                            m_f.write(m_chunk)
                    os.replace(target_mmproj + ".part", target_mmproj)
                    print(f"✓ Companion vision projector installed: {target_mmproj}")
                except Exception as m_err:
                    print(f"[Warning] Failed to download companion mmproj: {m_err}", file=sys.stderr)

        print(f"✓ Successfully installed {target_info['filename']} to ~/.vigyan/models/")
        return True

    except KeyboardInterrupt:
        print("\n\n[Download paused by user — run 'vigyan pull' again to resume]", file=sys.stderr)
        return False
    except Exception as exc:
        print()
        print(f"[Error] Download failed: {exc}", file=sys.stderr)
        return False


def cmd_rm(model_name: str) -> bool:
    """Delete model from local ~/.vigyan/models/."""
    clean = model_name.strip().lower()

    # Total purge support: vigyan rm --all / vigyan purge
    if clean in ("--all", "all", "purge"):
        if not os.path.isdir(MODELS_DIR):
            print("No models installed in ~/.vigyan/models/.")
            return True
        reclaimed_bytes = 0
        deleted_count = 0
        for root, dirs, files in os.walk(MODELS_DIR, topdown=False):
            for f in files:
                if f.endswith(".gguf") or f.endswith(".part"):
                    fpath = os.path.join(root, f)
                    try:
                        sz = os.path.getsize(fpath)
                        os.remove(fpath)
                        reclaimed_bytes += sz
                        deleted_count += 1
                    except Exception:
                        pass
            for d in dirs:
                dpath = os.path.join(root, d)
                try:
                    if not os.listdir(dpath):
                        os.rmdir(dpath)
                except Exception:
                    pass
        size_gb = round(reclaimed_bytes / (1024 ** 3), 2)
        print(f"✓ Sovereign Purge: Removed {deleted_count} model binaries. Reclaimed {size_gb} GB disk space.")
        return True

    target_path = find_model_file(clean)
    part_path = None
    if not target_path:
        resolved = MODEL_ALIASES.get(clean, clean)
        fname = resolved if resolved.endswith(".gguf") else f"{resolved}.gguf"
        candidate_part = os.path.join(MODELS_DIR, fname + ".part")
        if os.path.isfile(candidate_part):
            part_path = candidate_part
    else:
        part_candidate = target_path + ".part"
        if os.path.isfile(part_candidate):
            part_path = part_candidate

    if not target_path and not part_path:
        print(f"[Error] Model '{model_name}' not found in ~/.vigyan/models/.")
        return False

    reclaimed_bytes = 0
    if target_path and os.path.isfile(target_path):
        reclaimed_bytes += os.path.getsize(target_path)
        for _ in range(5):
            try:
                os.remove(target_path)
                break
            except Exception:
                time.sleep(0.2)

    if part_path and os.path.isfile(part_path):
        reclaimed_bytes += os.path.getsize(part_path)
        for _ in range(5):
            try:
                os.remove(part_path)
                break
            except Exception:
                time.sleep(0.2)

    # Clean companion mmproj if removing vision model
    if any(k in clean for k in ("vl", "4b", "vision")):
        vl_proj = os.path.join(MODELS_DIR, "vl4b", "mmproj-vigyan-vl-4b-f16.gguf")
        if os.path.isfile(vl_proj):
            try:
                reclaimed_bytes += os.path.getsize(vl_proj)
                os.remove(vl_proj)
            except Exception:
                pass
        vl_dir = os.path.join(MODELS_DIR, "vl4b")
        if os.path.isdir(vl_dir) and not os.listdir(vl_dir):
            try:
                os.rmdir(vl_dir)
            except Exception:
                pass

    size_mb = round(reclaimed_bytes / (1024 ** 2), 1)
    display_name = os.path.basename(target_path or part_path)
    print(f"✓ Removed {display_name} (Reclaimed {size_mb} MB).")
    return True


def ensure_first_run_interactive() -> Optional[str]:
    """If no models are installed locally, prompt user with clean 4-model selection."""
    local = get_local_models()
    if local:
        preferred = ["vigyan-3b-quad-master-iq3_m.gguf", "vigyan-vl-4b-iq3_m.gguf", "vigyan-7b-quad-master-q4_k_m.gguf"]
        for p in preferred:
            for m in local:
                if p in m:
                    return os.path.join(MODELS_DIR, m)
        return os.path.join(MODELS_DIR, local[0])

    if not sys.stdin.isatty():
        print("[Error] No model installed. Run 'vigyan pull 3b' to download the flagship engine.", file=sys.stderr)
        sys.exit(1)

    print("┌────────────────────────────────────────────────────────────────────────┐")
    print("│  VIGYAN PRO • SOVEREIGN PHYSICAL INTELLIGENCE (100% Offline)           │")
    print("│  No local models found in ~/.vigyan/models/.                          │")
    print("├────────────────────────────────────────────────────────────────────────┤")
    print("│  Select a sovereign engine to download:                                │")
    print("│    [1] 3B Daily Driver  (1.39 GB) - STEM, Calculus & CAS [Recommended] │")
    print("│    [2] 7B Doctoral      (4.16 GB) - Advanced Physics & Engineering     │")
    print("│    [3] 14B DeepSeek     (6.44 GB) - Deep Chain-of-Thought Reasoning    │")
    print("│    [4] View Model Matrix                                               │")
    print("│    [q] Quit                                                            │")
    print("└────────────────────────────────────────────────────────────────────────┘")

    try:
        choice = input("Enter selection [1-4]: ").strip().lower()
    except (KeyboardInterrupt, EOFError):
        print()
        sys.exit(0)

    if choice == "1":
        if cmd_pull("3b"):
            return os.path.join(MODELS_DIR, "vigyan-3b-quad-master-iq3_m.gguf")
    elif choice == "2":
        if cmd_pull("7b"):
            return os.path.join(MODELS_DIR, "vigyan-7b-quad-master-q4_k_m.gguf")
    elif choice == "3":
        if cmd_pull("14b"):
            return os.path.join(MODELS_DIR, "DeepSeek-R1-Distill-Qwen-14B-IQ3_M.gguf")
    elif choice == "4":
        cmd_models()
        sys.exit(0)
    else:
        sys.exit(0)
    return None


def load_cli_config() -> Dict[str, Any]:
    """Read ~/.vigyan/config.json if available to synchronize CLI and GUI preferences."""
    cfg_file = os.path.expanduser("~/.vigyan/config.json")
    if os.path.isfile(cfg_file):
        try:
            with open(cfg_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                if isinstance(data, dict):
                    return data
        except Exception:
            pass
    return {}


def query_local_server(prompt: str, host: str = DEFAULT_HOST, stream: bool = True) -> bool:
    """Stream inference from running llama-server on loopback."""
    cfg = load_cli_config()
    temp = cfg.get("temperature", 0.0)
    ctx = cfg.get("context_window", 2048)

    url = f"{host}/v1/chat/completions"
    payload = json.dumps({
        "messages": [
            {"role": "system", "content": "You are Vigyan, an air-gapped sovereign AI assistant for STEM, mathematical proof, physics simulation, and engineering intelligence."},
            {"role": "user", "content": prompt}
        ],
        "temperature": temp,
        "max_tokens": ctx,
        "stop": ["<|im_end|>", "<|endoftext|>", "<|im_start|>", "User:", "\n\nUser"],
        "stream": stream
    }).encode("utf-8")

    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            for raw_line in resp:
                line = raw_line.decode("utf-8", errors="replace").strip()
                if line.startswith("data: "):
                    data_str = line[6:]
                    if data_str == "[DONE]":
                        break
                    try:
                        chunk = json.loads(data_str)
                        delta = chunk.get("choices", [{}])[0].get("delta", {}).get("content") or ""
                        if delta:
                            clean_delta = delta.replace("</sstream>", "").replace("<solution>", "").replace("</solution>", "")
                            sys.stdout.write(clean_delta)
                            sys.stdout.flush()
                    except Exception:
                        pass
            print()
            return True
    except KeyboardInterrupt:
        sys.stdout.write("\n\n[Generation stopped by user]\n")
        sys.stdout.flush()
        return True
    except (urllib.error.URLError, ConnectionRefusedError):
        return False


def print_usage():
    print("""
Vigyan Pro Sovereign CLI v5.0.7 [100% Offline • Air-Gapped STEM Workstation]
Usage:
  vigyan                                Launch interactive scientific REPL
  vigyan run [3b|7b|14b]                Launch REPL with a specific model
  vigyan models | ls                    List 3 authorized models with hardware compatibility
  vigyan pull <3b|7b|14b>               Download model directly to ~/.vigyan/models/
  vigyan rm <3b|7b|14b>                 Delete local model and reclaim disk space
  vigyan serve [--port 8086]            Start OpenAI-compatible API server for VS Code
  vigyan purge | uninstall             Clean uninstall and disk space reclamation
  vigyan --version | -v                 Display version specification
  vigyan "<query>"                      One-shot CLI evaluation with streaming answer
  echo "<query>" | vigyan               Piped evaluation for bash scripts and VS Code tasks
  cat file.py | vigyan "<query>"        Analyze piped code with instructions

Authorized Sovereign Models:
  3b   • Vigyan-3B Quad-Master    (1.39 GB)  Fast Daily STEM, Calculus & Exact Symbolic CAS
  7b   • Vigyan-7B Quad-Master    (4.16 GB)  Doctoral Physics, Proofs & Engineering
  14b  • DeepSeek-R1 14B          (6.44 GB)  Frontier Step-by-Step Chain-of-Thought

Examples:
  vigyan models
  vigyan pull 3b
  vigyan "Solve d^2y/dx^2 + 4y = 0"
  cat main.py | vigyan "Explain any numerical instability"
  vigyan serve --port 8086
""")


def start_supervisor_for_model(model_path: str):
    """Ensure llama_supervisor micro-daemon is running with the specified model."""
    global DEFAULT_HOST
    try:
        from llama_supervisor import LlamaServerSupervisor
        cfg = load_cli_config()
        threads = cfg.get("cpu_threads")
        ctx_size = cfg.get("context_window", 2048)
        sup = LlamaServerSupervisor(model_path=model_path, port=8086, threads=threads, ctx_size=ctx_size)
        if sup.is_healthy():
            return sup
        print(f"Starting engine ({os.path.basename(model_path)})...", file=sys.stderr)
        sup.start()
        ready = sup.wait_until_ready(timeout=15.0)
        if not ready and not sup.is_healthy():
            from llama_supervisor import find_available_port
            dyn_port = find_available_port(8087, 8100)
            sup = LlamaServerSupervisor(model_path=model_path, port=dyn_port, threads=threads, ctx_size=ctx_size)
            sup.start()
            sup.wait_until_ready(timeout=15.0)
            DEFAULT_HOST = f"http://127.0.0.1:{dyn_port}"
        return sup
    except Exception as exc:
        print(f"[Warning] Supervisor boot notice: {exc}", file=sys.stderr)
        return None


def run_repl(model_path: Optional[str] = None):
    """Interactive terminal REPL."""
    actual_model = model_path or ensure_first_run_interactive()
    if not actual_model:
        return

    sup = start_supervisor_for_model(actual_model)
    print("┌────────────────────────────────────────────────────────────────────────┐")
    print("│  Vigyan Pro Sovereign STEM REPL v4.2 [100% Offline • Private]          │")
    print(f"│  Active Engine: {os.path.basename(actual_model):<54} │")
    print("│  Commands: /swap <model>, /clear, /exit                                │")
    print("└────────────────────────────────────────────────────────────────────────┘")

    while True:
        try:
            prompt = input("\nVigyan › ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\nExiting Vigyan Pro.")
            break

        if not prompt:
            continue
        if prompt.lower() in ("/exit", "/quit", "exit", "quit"):
            break
        if prompt.lower() in ("/clear", "clear"):
            os.system("clear" if os.name != "nt" else "cls")
            continue
        if prompt.lower().startswith("/swap"):
            parts = prompt.split(maxsplit=1)
            if len(parts) > 1:
                new_file = find_model_file(parts[1])
                if new_file:
                    actual_model = new_file
                    if sup:
                        sup.swap_model(new_file)
                    print(f"✓ Swapped active engine to: {os.path.basename(new_file)}")
                else:
                    print(f"Model '{parts[1]}' not found locally. Run 'vigyan models' to check available engines.")
            continue

        if not query_local_server(prompt):
            if sup and not sup.is_healthy():
                sup.start()
                sup.wait_until_ready(timeout=8.0)
            if not query_local_server(prompt):
                print("[Error] Could not connect to local inference engine.", file=sys.stderr)



def cmd_serve(model_name: Optional[str] = None, host: str = "127.0.0.1", port: int = 8086):
    """Start sovereign OpenAI-compatible HTTP inference server in foreground for VS Code / tools."""
    actual_model = (find_model_file(model_name) if model_name else None) or ensure_first_run_interactive()
    if not actual_model:
        print("[Error] No model found to serve. Run 'vigyan pull 3b' first.", file=sys.stderr)
        return False

    from llama_supervisor import LlamaServerSupervisor
    cfg = load_cli_config()
    threads = cfg.get("cpu_threads")
    ctx_size = cfg.get("context_window", 2048)

    sup = LlamaServerSupervisor(
        model_path=actual_model,
        host=host,
        port=port,
        threads=threads,
        ctx_size=ctx_size,
        die_with_parent=True
    )
    print("┌────────────────────────────────────────────────────────────────────────┐")
    print("│  VIGYAN SOVEREIGN INFERENCE SERVER                                     │")
    print(f"│  OpenAI-Compatible Endpoint: http://{host}:{port}/v1                     │")
    print(f"│  Active Engine: {os.path.basename(actual_model):<54} │")
    print("│  Ready for VS Code (Continue, Cline, Roo Code) and STEM Toolchains     │")
    print("│  Press Ctrl+C to terminate.                                            │")
    print("└────────────────────────────────────────────────────────────────────────┘")

    if not sup.is_healthy():
        sup.start()
        sup.wait_until_ready(timeout=15.0)

    try:
        while True:
            time.sleep(1.0)
            if not sup.is_healthy():
                sup.check()
    except KeyboardInterrupt:
        print("\nStopping Vigyan inference server...", file=sys.stderr)
        sup.stop()
        print("✓ Server stopped cleanly.")
        return True


def cmd_uninstall(yes: bool = False):
    """Cleanly uninstall vigyan binary, shell configuration, and optionally reclaim disk space."""
    print("┌────────────────────────────────────────────────────────────────────────┐")
    print("│  VIGYAN SOVEREIGN UNINSTALLER                                          │")
    print("│  Clean removal of CLI binary, PATH environment, and cached weights.    │")
    print("└────────────────────────────────────────────────────────────────────────┘")

    if not yes:
        try:
            confirm = input("Are you sure you want to uninstall Vigyan CLI? [y/N]: ").strip().lower()
            if confirm not in ("y", "yes"):
                print("Uninstall cancelled.")
                return
        except (KeyboardInterrupt, EOFError):
            print("\nUninstall cancelled.")
            return

    # 1. Remove binary candidates
    bin_candidates = [
        os.path.expanduser("~/.local/bin/vigyan"),
        os.path.expanduser("~/bin/vigyan"),
        "/usr/local/bin/vigyan",
        os.path.expandvars(r"%LOCALAPPDATA%\vigyan\bin\vigyan.exe"),
        os.path.expandvars(r"%LOCALAPPDATA%\vigyan\bin\vigyan.cmd"),
    ]
    removed_bins = 0
    for b in bin_candidates:
        if os.path.isfile(b):
            try:
                os.remove(b)
                removed_bins += 1
                print(f"✓ Removed binary: {b}")
            except Exception as e:
                print(f"[Warning] Could not remove {b}: {e}", file=sys.stderr)

    # 2. Clean shell profile PATH exports
    shell_rcs = [
        os.path.expanduser("~/.bashrc"),
        os.path.expanduser("~/.zshrc"),
        os.path.expanduser("~/.profile"),
    ]
    for rc in shell_rcs:
        if os.path.isfile(rc):
            try:
                with open(rc, "r", encoding="utf-8") as f:
                    content = f.read()
                cleaned = "\n".join(
                    line for line in content.splitlines()
                    if "# Vigyan CLI PATH" not in line and "vigyan" not in line.lower()
                )
                if cleaned != content:
                    with open(rc, "w", encoding="utf-8") as f:
                        f.write(cleaned)
                    print(f"✓ Cleaned PATH export from {rc}")
            except Exception:
                pass

    # 3. Optional Model Reclaim
    purge_models = False
    if yes:
        purge_models = True
    else:
        try:
            m_confirm = input("\nDo you also want to delete all downloaded model weights (~/.vigyan/models/) to reclaim disk space? [y/N]: ").strip().lower()
            purge_models = m_confirm in ("y", "yes")
        except (KeyboardInterrupt, EOFError):
            pass

    if purge_models:
        cmd_rm("--all")

    print("\n✓ Vigyan CLI uninstallation complete. System is clean.")


def main():
    args = sys.argv[1:]

    # Version flag
    if args and args[0] in ("--version", "-v", "version"):
        try:
            from version import __version__
        except Exception:
            __version__ = "5.0.7"
        print(f"Vigyan Pro v{__version__} [Sovereign Offline Intelligence]")
        return

    # Help flag
    if args and args[0] in ("--help", "-h", "help"):
        print_usage()
        return

    # Subcommand: models / ls
    if args and args[0] in ("models", "ls", "list"):
        refresh = any(flag in args for flag in ("--refresh", "-r", "refresh"))
        cmd_models(refresh=refresh)
        return

    # Subcommand: pull / download
    if args and args[0] in ("pull", "download"):
        if len(args) < 2:
            print("Usage: vigyan pull <3b|7b|14b>")
            sys.exit(1)
        cmd_pull(args[1])
        return

    # Subcommand: rm / delete
    if args and args[0] in ("rm", "delete", "remove"):
        if len(args) < 2:
            print("Usage: vigyan rm <3b|7b|14b|--all>")
            sys.exit(1)
        cmd_rm(args[1])
        return

    # Subcommand: serve
    if args and args[0] == "serve":
        port = 8086
        model_arg = None
        for i, a in enumerate(args[1:], start=1):
            if a in ("--port", "-p") and i + 1 < len(args):
                try:
                    port = int(args[i + 1])
                except ValueError:
                    pass
            elif not a.startswith("-") and not model_arg:
                model_arg = a
        cmd_serve(model_name=model_arg, port=port)
        return

    # Subcommand: purge / uninstall
    if args and args[0] in ("purge", "uninstall", "clean"):
        yes_flag = any(f in args for f in ("-y", "--yes"))
        if args[0] == "uninstall":
            cmd_uninstall(yes=yes_flag)
        else:
            cmd_rm("--all")
        return

    # Subcommand: run
    if args and args[0] == "run":
        target = args[1] if len(args) > 1 else None
        target_path = find_model_file(target) if target else None
        run_repl(target_path)
        return

    # Handle Stdin Pipe + Prompt Integration
    # e.g.: cat file.py | vigyan "Explain this code"
    piped_data = ""
    if not sys.stdin.isatty():
        try:
            piped_data = sys.stdin.read().strip()
        except Exception:
            piped_data = ""

    # Parse remaining prompt flags
    prompt_words = [a for a in args if not a.startswith("--raw") and not a.startswith("-r")]
    prompt_text = " ".join(prompt_words).strip()

    if piped_data:
        if prompt_text:
            combined_prompt = f"{piped_data}\n\n[User Instruction]: {prompt_text}"
        else:
            combined_prompt = f"{piped_data}\n\n[User Instruction]: Analyze the above code or mathematical data in detail."
    else:
        combined_prompt = prompt_text

    if not combined_prompt:
        run_repl()
        return

    model_path = ensure_first_run_interactive()
    if not model_path:
        return
    sup = start_supervisor_for_model(model_path)
    if not query_local_server(combined_prompt):
        if sup and not sup.is_healthy():
            sup.start()
            sup.wait_until_ready(timeout=8.0)
        query_local_server(combined_prompt)


if __name__ == "__main__":
    main()
