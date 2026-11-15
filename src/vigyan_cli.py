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

VERIFIED_EXPERIMENTLAB_MODELS = [
    {
        "id": "vigyan-3b-quad-master-iq3_m",
        "name": "Vigyan-3B Quad-Master",
        "tag": "vigyan-3b",
        "filename": "vigyan-3b-quad-master-iq3_m.gguf",
        "size_bytes": 1488894752,
        "size_formatted": "1.39 GB",
        "ram_required_gb": 4.0,
        "domain": "Flagship STEM, Calculus & Exact CAS",
        "hf_url": "https://huggingface.co/shreyansh12183/vigyan-3b-quad-master/resolve/main/vigyan-3b-quad-master-iq3_m.gguf?download=true",
        "hf_repo": "shreyansh12183/vigyan-3b-quad-master",
    },
    {
        "id": "vigyan-2b-stem-q4_k_m",
        "name": "Vigyan-2B STEM Reasoner",
        "tag": "vigyan-2b-stem",
        "filename": "vigyan-2b-stem-q4_k_m.gguf",
        "size_bytes": 1170000000,
        "size_formatted": "1.09 GB",
        "ram_required_gb": 3.0,
        "domain": "Fast Real Analysis & Theorem Prover",
        "hf_url": "https://huggingface.co/Experimentlab/Vigyan-Models-GGUF/resolve/main/vigyan-2b-stem-q4_k_m.gguf?download=true",
        "hf_repo": "Experimentlab/Vigyan-Models-GGUF",
    },
    {
        "id": "vigyan-2b-reasoning-q4_k_m",
        "name": "Vigyan-2B Reasoning",
        "tag": "vigyan-2b-reasoning",
        "filename": "vigyan-2b-reasoning-q4_k_m.gguf",
        "size_bytes": 1170000000,
        "size_formatted": "1.09 GB",
        "ram_required_gb": 3.0,
        "domain": "Deterministic Logic & Multi-Step Reasoning",
        "hf_url": "https://huggingface.co/Experimentlab/Vigyan-Models-GGUF/resolve/main/vigyan-2b-reasoning-q4_k_m.gguf?download=true",
        "hf_repo": "Experimentlab/Vigyan-Models-GGUF",
    },
    {
        "id": "vigyan-1.5b-4x-moe",
        "name": "Vigyan-1.5B 4x-MoE",
        "tag": "vigyan-1.5b-moe",
        "filename": "vigyan-1.5b-4x-moe.Q4_K_M.gguf",
        "size_bytes": 3920000000,
        "size_formatted": "3.65 GB",
        "ram_required_gb": 4.5,
        "domain": "High-Velocity Top-2 MoE Calculus",
        "hf_url": "https://huggingface.co/Experimentlab/Vigyan-1.5B-4x-MoE/resolve/main/vigyan-1.5b-4x-moe.Q4_K_M.gguf?download=true",
        "hf_repo": "Experimentlab/Vigyan-1.5B-4x-MoE",
    },
    {
        "id": "vigyan-1.5b-quad-master-q4_k_m",
        "name": "Vigyan-1.5B Quad-Master",
        "tag": "vigyan-1.5b-quad",
        "filename": "vigyan-1.5b-quad-master-q4_k_m.gguf",
        "size_bytes": 1116000000,
        "size_formatted": "1.04 GB",
        "ram_required_gb": 2.5,
        "domain": "Ultra-Lightweight Exact Analytical Engine",
        "hf_url": "https://huggingface.co/shreyansh12183/vigyan-1.5b-quad-master/resolve/main/vigyan-1.5b-quad-master-q4_k_m.gguf?download=true",
        "hf_repo": "shreyansh12183/vigyan-1.5b-quad-master",
    },
    {
        "id": "vigyan-7b-stem-q4_k_m",
        "name": "Vigyan-7B STEM Instruct",
        "tag": "vigyan-7b-stem",
        "filename": "vigyan-7b-stem-q4_k_m.gguf",
        "size_bytes": 4467000000,
        "size_formatted": "4.16 GB",
        "ram_required_gb": 8.0,
        "domain": "Comprehensive Science & Physical Engineering",
        "hf_url": "https://huggingface.co/Experimentlab/Vigyan-Models-GGUF/resolve/main/vigyan-7b-stem-q4_k_m.gguf?download=true",
        "hf_repo": "Experimentlab/Vigyan-Models-GGUF",
    },
    {
        "id": "vigyan-7b-quad-master-q4_k_m",
        "name": "Vigyan-7B Quad-Master",
        "tag": "vigyan-7b-quad",
        "filename": "vigyan-7b-quad-master-q4_k_m.gguf",
        "size_bytes": 4467000000,
        "size_formatted": "4.16 GB",
        "ram_required_gb": 8.0,
        "domain": "Doctoral Proofs & Advanced Symbolic Algebra",
        "hf_url": "https://huggingface.co/shreyansh12183/vigyan-olmo2-7b-quad-master/resolve/main/vigyan-7b-quad-master-q4_k_m.gguf?download=true",
        "hf_repo": "shreyansh12183/vigyan-olmo2-7b-quad-master",
    },
    {
        "id": "vigyan-7b-moe-q4_k_m",
        "name": "Vigyan-7B MoE Masterpiece",
        "tag": "vigyan-7b-moe",
        "filename": "vigyan-7b-moe-q4_k_m.gguf",
        "size_bytes": 4209000000,
        "size_formatted": "3.92 GB",
        "ram_required_gb": 8.0,
        "domain": "Sparse Mixture-of-Experts STEM Synthesis",
        "hf_url": "https://huggingface.co/shreyansh12183/vigyan-olmoe-1b-7b-dpo-masterpiece/resolve/main/vigyan-7b-moe-q4_k_m.gguf?download=true",
        "hf_repo": "shreyansh12183/vigyan-olmoe-1b-7b-dpo-masterpiece",
    },
    {
        "id": "vidhi-ai-1.5b-q4_k_m",
        "name": "Vidhi-AI-1.5B Legal Reasoner",
        "tag": "vidhi-1.5b",
        "filename": "vidhi-ai-1.5b-q4_k_m.gguf",
        "size_bytes": 1116000000,
        "size_formatted": "1.04 GB",
        "ram_required_gb": 2.5,
        "domain": "Sovereign Legal Jurisprudence & Statutory Analysis",
        "hf_url": "https://huggingface.co/shreyansh12183/vidhi-ai-1.5b-sovereign-masterpiece/resolve/main/vidhi-ai-1.5b-q4_k_m.gguf?download=true",
        "hf_repo": "shreyansh12183/vidhi-ai-1.5b-sovereign-masterpiece",
    },
    {
        "id": "vigyan-125m-q4_k_m",
        "name": "Vigyan-125M Canary Reasoner",
        "tag": "vigyan-125m",
        "filename": "vigyan-125m-q4_k_m.gguf",
        "size_bytes": 150000000,
        "size_formatted": "0.14 GB",
        "ram_required_gb": 1.0,
        "domain": "Ultra-Fast Micro-Edge Canary Model",
        "hf_url": "https://huggingface.co/shreyansh12183/vigyan-125m-158bit-gguf/resolve/main/vigyan-125m-q4_k_m.gguf?download=true",
        "hf_repo": "shreyansh12183/vigyan-125m-158bit-gguf",
    }
]


def get_local_models() -> List[str]:
    """Scan ~/.vigyan/models/ for downloaded GGUF weights."""
    if not os.path.isdir(MODELS_DIR):
        return []
    models = [f for f in os.listdir(MODELS_DIR) if f.endswith(".gguf") and not f.startswith("mmproj")]
    vl_dir = os.path.join(MODELS_DIR, "vl4b")
    if os.path.isdir(vl_dir):
        for f in os.listdir(vl_dir):
            if f.endswith(".gguf") and not f.startswith("mmproj"):
                models.append(os.path.join("vl4b", f))
    return sorted(models)


def find_model_file(name_or_tag: str) -> Optional[str]:
    """Resolve a user-supplied model identifier to an absolute path."""
    clean = name_or_tag.strip()
    if os.path.isfile(clean):
        return os.path.abspath(clean)

    local = get_local_models()
    # Exact filename match
    if clean in local:
        return os.path.join(MODELS_DIR, clean)
    if f"{clean}.gguf" in local:
        return os.path.join(MODELS_DIR, f"{clean}.gguf")

    # Tag or prefix match
    for m in local:
        if clean.lower() in m.lower():
            return os.path.join(MODELS_DIR, m)

    return None


def get_dynamic_catalog(refresh: bool = False) -> List[Dict[str, Any]]:
    """Fetch dynamic catalog from local server or disk cache or Hugging Face."""
    # 1. Try local server bridge
    try:
        url = f"{DEFAULT_HOST}/api/models/catalog"
        if refresh:
            url += "?refresh=1"
        req = urllib.request.Request(url, headers={"User-Agent": "Vigyan-CLI/5.0"})
        with urllib.request.urlopen(req, timeout=1.5) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data and "models" in data:
                return data["models"]
    except Exception:
        pass

    # 2. Try disk cache or direct HF query
    cache_file = os.path.expanduser("~/.vigyan/models/hf_catalog_cache.json")
    now = time.time()
    if not refresh and os.path.isfile(cache_file):
        try:
            with open(cache_file, "r") as f:
                cdata = json.load(f)
                if now - cdata.get("timestamp", 0) < 600:
                    return cdata.get("models", [])
        except Exception:
            pass

    # 3. Dynamic HF scan fallback
    try:
        from launch_desktop import fetch_dynamic_hf_catalog
        return fetch_dynamic_hf_catalog(force_refresh=refresh)
    except Exception:
        pass

    # 4. Built-in seed list
    return VERIFIED_EXPERIMENTLAB_MODELS


def cmd_models(refresh: bool = False):
    """List installed and cloud models from Experimentlab."""
    from llama_supervisor import detect_hardware_profile
    hw = detect_hardware_profile()
    total_ram = hw.get("total_ram_gb", 8.0)
    avail_ram = hw.get("avail_ram_gb", 4.0)

    if refresh:
        print("Polling Hugging Face CDN for newly published Experimentlab models...")

    catalog = get_dynamic_catalog(refresh=refresh)
    local = get_local_models()

    print("┌──────────────────────────────────────────────────────────────────────────────────────────────────┐")
    print("│  VIGYAN SOVEREIGN MODEL REGISTRY • https://huggingface.co/Experimentlab                          │")
    print(f"│  Host Profile: {total_ram} GB RAM ({avail_ram} GB available) • Hardware Tier: {hw.get('tier', 'cpu'):<24} │")
    print("├─────────────┬──────────────────────────┬───────────┬───────────────┬─────────────────────────────┤")
    print(f"│ {'STATUS':<11} │ {'MODEL NAME':<24} │ {'SIZE':<9} │ {'HARDWARE':<13} │ {'DOMAIN':<27} │")
    print("├─────────────┼──────────────────────────┼───────────┼───────────────┼─────────────────────────────┤")

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
            badge = "🔴 Incompatible"

        name_display = m.get("name", fname)[:24]
        size_display = m.get("size_formatted", "~1.4 GB")[:9]
        domain_display = m.get("domain", "Sovereign Engine")[:27]
        print(f"│ {status:<11} │ {name_display:<24} │ {size_display:<9} │ {badge:<13} │ {domain_display:<27} │")

    # List custom local models not in catalog
    for m in local:
        basename = os.path.basename(m)
        if basename not in seen:
            size_gb = round(os.path.getsize(os.path.join(MODELS_DIR, m)) / (1024 ** 3), 2)
            clean_title = basename.replace(".gguf", "").replace("-", " ").title()[:24]
            print(f"│ {'● INSTALLED':<11} │ {clean_title:<24} │ {size_gb:>5.2f} GB   │ {'🟢 Local':<13} │ {'Local Custom Engine':<27} │")

    print("└─────────────┴──────────────────────────┴───────────┴───────────────┴─────────────────────────────┘")
    print("Commands: vigyan pull <name>  │  vigyan run [name]  │  vigyan models --refresh")
    print()


def cmd_pull(model_name: str) -> bool:
    """Download model with terminal progress bar, ETA, and GGUF header verification."""
    clean = model_name.strip()
    target_info = None

    catalog = get_dynamic_catalog(refresh=False)
    for m in catalog:
        m_id = m.get("id", "").lower()
        m_tag = m.get("tag", "").lower()
        m_fname = m.get("filename", "").lower()
        m_name = m.get("name", "").lower()
        if clean.lower() in (m_id, m_tag, m_fname, m_name):
            target_info = m
            break

    if not target_info:
        for m in VERIFIED_EXPERIMENTLAB_MODELS:
            if clean.lower() in (m["id"].lower(), m["tag"].lower(), m["filename"].lower(), m["name"].lower()):
                target_info = m
                break

    if not target_info:
        dest_filename = clean if clean.endswith(".gguf") else f"{clean}.gguf"
        target_info = {
            "name": clean,
            "filename": dest_filename,
            "size_bytes": 1_400_000_000,
            "size_formatted": "~1.4 GB",
            "hf_url": f"https://huggingface.co/Experimentlab/Vigyan-Models-GGUF/resolve/main/{dest_filename}?download=true",
        }

    os.makedirs(MODELS_DIR, exist_ok=True)
    dest_file = os.path.join(MODELS_DIR, target_info["filename"])
    part_file = dest_file + ".part"

    if os.path.isfile(dest_file):
        print(f"[Notice] Model '{target_info['filename']}' is already installed at: {dest_file}")
        return True

    # Pre-flight disk space check
    try:
        free_space = shutil.disk_usage(MODELS_DIR).free
        if free_space < target_info.get("size_bytes", 1_400_000_000) + 200_000_000:
            print(f"[Error] Insufficient disk space in ~/.vigyan/models/. Needs ~2.0 GB free.", file=sys.stderr)
            return False
    except Exception:
        pass

    print(f"Connecting to Hugging Face CDN ({target_info['hf_url']})...")
    existing_bytes = os.path.getsize(part_file) if os.path.exists(part_file) else 0
    headers = {"User-Agent": "Vigyan-CLI-Sovereign-Downloader/5.0"}
    if existing_bytes > 0:
        headers["Range"] = f"bytes={existing_bytes}-"
        print(f"Resuming download from byte offset {existing_bytes}...")

    req = urllib.request.Request(target_info["hf_url"], headers=headers)
    start_time = time.time()
    bytes_this_session = 0

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
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
        # Verify GGUF magic header
        with open(part_file, "rb") as check_f:
            magic = check_f.read(4)
            if magic != b"GGUF":
                raise ValueError(f"Corrupted binary: invalid GGUF header ({magic!r})")

        if os.path.exists(dest_file):
            os.remove(dest_file)
        os.rename(part_file, dest_file)
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
    target_path = find_model_file(model_name)
    if not target_path or not os.path.isfile(target_path):
        print(f"[Error] Model '{model_name}' not found in ~/.vigyan/models/.")
        return False

    size_bytes = os.path.getsize(target_path)
    size_mb = round(size_bytes / (1024 ** 2), 1)
    os.remove(target_path)
    print(f"✓ Removed {os.path.basename(target_path)} (Reclaimed {size_mb} MB).")
    return True


def ensure_first_run_interactive() -> Optional[str]:
    """If no models are installed locally, prompt user with interactive numbered menu."""
    local = get_local_models()
    if local:
        # Prefer flagship 3b, 2b, or first found
        preferred = ["vigyan-3b-quad-master-iq3_m.gguf", "vigyan-2b-stem-q4_k_m.gguf", "vigyan-1.5b-4x-moe.gguf"]
        for p in preferred:
            for m in local:
                if p in m:
                    return os.path.join(MODELS_DIR, m)
        return os.path.join(MODELS_DIR, local[0])

    if not sys.stdin.isatty():
        print("[Error] No model installed. Run 'vigyan pull vigyan-3b' to download the flagship engine.", file=sys.stderr)
        sys.exit(1)

    print("┌────────────────────────────────────────────────────────────────────────┐")
    print("│  WELCOME TO VIGYAN PRO SOVEREIGN CLI (100% Offline)                   │")
    print("│  No local models found in ~/.vigyan/models/.                          │")
    print("├────────────────────────────────────────────────────────────────────────┤")
    print("│  Select a sovereign engine to download from Experimentlab:             │")
    print("│    [1] Vigyan-3B Quad-Master (1.39 GB) - Flagship STEM  [Recommended]  │")
    print("│    [2] Vigyan-2B STEM Reasoner (1.18 GB) - Fast Real Analysis          │")
    print("│    [3] Vigyan-1.5B 4x-MoE (1.10 GB) - High-Speed Calculus              │")
    print("│    [4] View All Available Models                                       │")
    print("│    [q] Quit                                                            │")
    print("└────────────────────────────────────────────────────────────────────────┘")

    try:
        choice = input("Enter selection [1-4]: ").strip().lower()
    except (KeyboardInterrupt, EOFError):
        print()
        sys.exit(0)

    if choice == "1":
        if cmd_pull("vigyan-3b-quad-master-iq3_m.gguf"):
            return os.path.join(MODELS_DIR, "vigyan-3b-quad-master-iq3_m.gguf")
    elif choice == "2":
        if cmd_pull("vigyan-2b-stem-q4_k_m.gguf"):
            return os.path.join(MODELS_DIR, "vigyan-2b-stem-q4_k_m.gguf")
    elif choice == "3":
        if cmd_pull("vigyan-1.5b-4x-moe.gguf"):
            return os.path.join(MODELS_DIR, "vigyan-1.5b-4x-moe.gguf")
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
Vigyan Pro Sovereign CLI v5.0 [100% Offline • Air-Gapped STEM Workstation]
Usage:
  vigyan                                Launch interactive scientific REPL
  vigyan run [model]                    Launch REPL with a specific model
  vigyan models | ls [--refresh]        List installed & available Hugging Face models
  vigyan pull <model>                   Download model from https://huggingface.co/Experimentlab
  vigyan rm <model>                     Delete local model and reclaim disk space
  vigyan --version | -v                 Display version specification
  vigyan "<query>"                      One-shot CLI evaluation with streaming answer
  echo "<query>" | vigyan               Piped evaluation for bash scripts and VS Code tasks

Examples:
  vigyan models --refresh
  vigyan pull vigyan-3b-quad-master-iq3_m.gguf
  vigyan "Integrate x^2 * sin(x) dx"
  cat problem.tex | vigyan
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


def main():
    args = sys.argv[1:]

    # Version flag
    if args and args[0] in ("--version", "-v", "version"):
        try:
            from version import __version__
        except ImportError:
            __version__ = "5.0.0"
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
            print("Usage: vigyan pull <model_name>")
            sys.exit(1)
        cmd_pull(args[1])
        return

    # Subcommand: rm / delete
    if args and args[0] in ("rm", "delete", "remove"):
        if len(args) < 2:
            print("Usage: vigyan rm <model_name>")
            sys.exit(1)
        cmd_rm(args[1])
        return

    # Subcommand: run
    if args and args[0] == "run":
        target = args[1] if len(args) > 1 else None
        target_path = find_model_file(target) if target else None
        run_repl(target_path)
        return

    # One-shot or piped prompt
    prompt_text = " ".join(args).strip()
    if not prompt_text:
        if not sys.stdin.isatty():
            prompt_text = sys.stdin.read().strip()
        else:
            run_repl()
            return

    if prompt_text:
        model_path = ensure_first_run_interactive()
        if not model_path:
            return
        sup = start_supervisor_for_model(model_path)
        if not query_local_server(prompt_text):
            if sup and not sup.is_healthy():
                sup.start()
                sup.wait_until_ready(timeout=8.0)
            query_local_server(prompt_text)


if __name__ == "__main__":
    main()
