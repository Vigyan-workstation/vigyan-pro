#!/usr/bin/env python3
"""
Vigyan Pro Sovereign Studio - Native Desktop WebKitGTK Application
Pitch-Black Obsidian STEM Studio with Smart Hybrid GPU+CPU Compute Engine,
Embedded Neuro-Symbolic Bridge (SymPy AST + KùzuDB GraphRAG), LaTeX, and WebGL.
Zero Browser Chrome. 100% Native Desktop Window.
"""

import sys
import os
import re
import glob
import math
import ast
import json
import time
import shutil
import signal
import threading
import subprocess
import urllib.request
import urllib.parse
import secrets
import logging
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Dict, Any, List, Optional

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("vigyan.desktop")

# Sovereign session security token (ephemeral, single-session only)
_SESSION_TOKEN = secrets.token_hex(32)

_BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if _BASE_DIR not in sys.path:
    sys.path.insert(0, _BASE_DIR)
for _cand in [
    os.path.join(_BASE_DIR, "knowledge_graph"),
    _BASE_DIR,
    os.path.expanduser("~/.vigyan/knowledge_graph"),
]:
    if os.path.isdir(_cand) and _cand not in sys.path:
        sys.path.insert(0, _cand)

_py_ver = f"python{sys.version_info.major}.{sys.version_info.minor}"
for _p in (
    glob.glob(os.path.join(_BASE_DIR, "..", ".venv", "lib", _py_ver, "site-packages"))
    + glob.glob(os.path.join(_BASE_DIR, ".venv", "lib", _py_ver, "site-packages"))
    + glob.glob(os.path.expanduser(f"~/.vigyan/venv/lib/{_py_ver}/site-packages"))
    + glob.glob(os.path.expanduser(f"~/.venv-rag/lib/{_py_ver}/site-packages"))
):
    if os.path.isdir(_p) and _p not in sys.path:
        sys.path.insert(0, _p)

# Auto-inject system site-packages and dist-packages so gi (Gtk, WebKit2) is always available even in a venv
for _sys_p in (
    glob.glob(f"/usr/lib*/{_py_ver}/site-packages")
    + glob.glob("/usr/lib*/python3/dist-packages")
    + glob.glob(f"/usr/local/lib*/{_py_ver}/site-packages")
    + glob.glob("/usr/local/lib*/python3/dist-packages")
):
    if os.path.isdir(_sys_p) and _sys_p not in sys.path:
        sys.path.append(_sys_p)

from llama_supervisor import LlamaServerSupervisor

try:
    from version import __version__
except Exception:
    __version__ = "5.0.2"

try:
    import psutil
except ImportError:
    psutil = None

# ==============================================================================
# 1. SMART HYBRID GPU + CPU HARDWARE PROFILER & ALLOCATOR
# ==============================================================================
_ACTIVE_COMPUTE_MODE = "auto"  # "auto" | "max_gpu" | "balanced" | "cpu_eco"
_STATIC_HW_CACHE: Optional[ Dict[str, Any] ] = None


def _read_sysfs_int(path: str) -> Optional[int]:
    try:
        with open(path, "r", encoding="utf-8") as f:
            return int(f.read().strip())
    except Exception:
        return None


def _read_sysfs_str(path: str) -> Optional[str]:
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read().strip()
    except Exception:
        return None


def _discover_static_hardware() -> Dict[str, Any]:
    """One-time hardware topology discovery (<50ms at startup, cached forever)."""
    global _STATIC_HW_CACHE
    if _STATIC_HW_CACHE is not None:
        return _STATIC_HW_CACHE

    # 1. CPU Physical vs Logical Cores
    logical_cores = os.cpu_count() or 4
    physical_cores = max(1, logical_cores // 2)
    if psutil:
        try:
            lc = psutil.cpu_count(logical=True)
            pc = psutil.cpu_count(logical=False)
            if lc:
                logical_cores = lc
            if pc:
                physical_cores = pc
        except Exception:
            pass

    cpu_model = "Generic x86_64/ARM64 Processor"
    if sys.platform.startswith("linux") and os.path.exists("/proc/cpuinfo"):
        try:
            with open("/proc/cpuinfo", "r", encoding="utf-8", errors="ignore") as f:
                for line in f:
                    if "model name" in line or "Hardware" in line:
                        cpu_model = line.split(":", 1)[1].strip()
                        break
        except Exception:
            pass
    elif sys.platform == "darwin":
        try:
            res = subprocess.run(
                ["sysctl", "-n", "machdep.cpu.brand_string"],
                stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=0.4
            )
            if res.returncode == 0 and res.stdout.strip():
                cpu_model = res.stdout.strip()
        except Exception:
            pass

    # 2. Total System RAM
    ram_total_gb = 8.0
    if psutil:
        try:
            ram_total_gb = round(psutil.virtual_memory().total / (1024 ** 3), 2)
        except Exception:
            pass

    # 3. GPU Topology Discovery (NVIDIA, Linux DRM sysfs AMD/Intel, Unified Metal, Windows WMI)
    has_nvidia = shutil.which("nvidia-smi") is not None
    nvidia_name = None
    if has_nvidia:
        try:
            res = subprocess.run(
                ["nvidia-smi", "--query-gpu=name", "--format=csv,noheader"],
                stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=0.4
            )
            if res.returncode == 0 and res.stdout.strip():
                nvidia_name = res.stdout.strip().splitlines()[0].strip()
            else:
                has_nvidia = False
        except Exception:
            has_nvidia = False

    drm_card_dir = None
    gpu_vendor = "none"
    gpu_name = nvidia_name or "CPU Vector Engine"

    if sys.platform.startswith("linux"):
        for card_path in sorted(glob.glob("/sys/class/drm/card[0-9]/device")):
            vendor_hex = (_read_sysfs_str(os.path.join(card_path, "vendor")) or "").lower()
            vram_tot = _read_sysfs_int(os.path.join(card_path, "mem_info_vram_total"))
            busy_path = os.path.join(card_path, "gpu_busy_percent")
            if vram_tot is not None or os.path.exists(busy_path) or vendor_hex in ("0x1002", "0x8086", "0x10de"):
                drm_card_dir = card_path
                if vendor_hex == "0x1002":
                    gpu_vendor = "amd"
                    gpu_name = "AMD Radeon Graphics"
                elif vendor_hex == "0x8086":
                    gpu_vendor = "intel"
                    gpu_name = "Intel Integrated/Arc GPU"
                elif vendor_hex == "0x10de":
                    gpu_vendor = "nvidia"
                    gpu_name = nvidia_name or "NVIDIA GPU"
                break

        # Enrich marketing name from lspci once at startup
        if shutil.which("lspci"):
            try:
                res = subprocess.run(
                    ["lspci"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=0.4
                )
                if res.returncode == 0:
                    for line in res.stdout.splitlines():
                        if any(k in line for k in ("VGA compatible controller", "3D controller", "Display controller")):
                            parts = line.split(":", 2)
                            if len(parts) >= 3:
                                desc = parts[2].strip()
                                bracket = re.findall(r"\[([^\]]+)\]", desc)
                                if bracket:
                                    # Pick the most descriptive bracketed model name
                                    best = [b for b in bracket if not b.startswith("1002:") and not b.startswith("8086:") and not b.startswith("10de:")]
                                    if best:
                                        gpu_name = best[-1]
                                    else:
                                        gpu_name = desc[:42]
                                else:
                                    gpu_name = desc[:42]
                                break
            except Exception:
                pass
    elif sys.platform == "darwin":
        gpu_vendor = "metal"
        gpu_name = f"{cpu_model} Unified GPU"

    _STATIC_HW_CACHE = {
        "cpu_model": cpu_model,
        "physical_cores": physical_cores,
        "logical_cores": logical_cores,
        "ram_total_gb": ram_total_gb,
        "has_nvidia": has_nvidia,
        "drm_card_dir": drm_card_dir,
        "gpu_vendor": gpu_vendor if not has_nvidia else "nvidia",
        "gpu_name": nvidia_name or gpu_name,
    }
    return _STATIC_HW_CACHE


def _read_power_state() -> Dict[str, Any]:
    """Fast zero-subprocess battery and AC power profile detection."""
    is_laptop = False
    on_battery = False
    battery_pct = 100

    if sys.platform.startswith("linux"):
        bat_dirs = glob.glob("/sys/class/power_supply/BAT*")
        if bat_dirs:
            is_laptop = True
            status = (_read_sysfs_str(os.path.join(bat_dirs[0], "status")) or "").lower()
            cap = _read_sysfs_int(os.path.join(bat_dirs[0], "capacity"))
            if cap is not None:
                battery_pct = cap
            if status == "discharging":
                on_battery = True
    elif psutil and hasattr(psutil, "sensors_battery"):
        try:
            bat = psutil.sensors_battery()
            if bat is not None:
                is_laptop = True
                battery_pct = int(round(bat.percent))
                on_battery = not bool(bat.power_plugged)
        except Exception:
            pass

    if not is_laptop:
        power_profile = "Desktop AC"
    elif on_battery:
        power_profile = f"Laptop Battery ({battery_pct}%)"
    else:
        power_profile = f"Laptop AC ({battery_pct}%)"

    return {
        "is_laptop": is_laptop,
        "on_battery": on_battery,
        "battery_pct": battery_pct,
        "power_profile": power_profile,
    }


def compute_hybrid_allocation(
    mode: str,
    hw: Dict[str, Any],
    gpu_metrics: Dict[str, Any],
    power: Dict[str, Any],
    ram_avail_gb: float,
) -> Dict[str, Any]:
    """
    Smart Hybrid GPU + CPU Compute Allocator.
    Computes optimal Ollama runtime options (num_gpu, num_thread, num_ctx, num_batch)
    based on hardware topology, VRAM + GTT headroom, physical CPU cores, and power state.
    """
    mode = (mode or "auto").lower()
    if mode not in ("auto", "max_gpu", "balanced", "cpu_eco"):
        mode = "auto"

    phys_cores = int(hw.get("physical_cores", 4))
    ram_total_gb = float(hw.get("ram_total_gb", 8.0))
    has_gpu = bool(gpu_metrics.get("has_gpu", False))
    is_apu = bool(gpu_metrics.get("is_apu", False))
    vram_total_mb = float(gpu_metrics.get("vram_total_mb", 0.0))
    gtt_total_mb = float(gpu_metrics.get("gtt_total_mb", 0.0))
    effective_gpu_mem_mb = vram_total_mb + (gtt_total_mb * 0.65 if is_apu else 0.0)
    on_battery = bool(power.get("on_battery", False))
    battery_pct = int(power.get("battery_pct", 100))

    # 1. Thread allocation: bind to physical cores for peak AVX2 FMA throughput without hyperthreading contention
    if mode == "cpu_eco":
        num_thread = max(2, phys_cores - 2)
    else:
        num_thread = phys_cores

    # 2. Context window & batch scaling (Vigyan-3B IQ3_M uses only 1.4GB; 4096 ctx KV cache is ~200MB)
    if ram_total_gb < 6.0:
        num_ctx = 2048
        num_batch = 128
    elif ram_total_gb < 10.0:
        # 7-8 GB laptops (e.g., AMD Ryzen 5 7520U with 6.95 GB usable RAM)
        num_ctx = 4096 if ram_avail_gb >= 2.0 else 2048
        num_batch = 256
    elif ram_total_gb < 18.0:
        num_ctx = 8192 if ram_avail_gb >= 4.0 else 4096
        num_batch = 512
    else:
        num_ctx = 16384 if mode == "max_gpu" and ram_total_gb >= 24.0 else 8192
        num_batch = 512

    # 3. Hybrid GPU + CPU Layer Split (num_gpu)
    if mode == "cpu_eco" or not has_gpu:
        num_gpu = 0
        strategy_label = "CPU Eco (AVX2 Physical Cores)" if mode == "cpu_eco" else "CPU Vector Engine"
    elif mode == "max_gpu":
        num_gpu = 99
        strategy_label = "Max GPU Offload (All Layers)"
    elif mode == "balanced":
        num_gpu = 16 if (is_apu or vram_total_mb < 6000) else 28
        strategy_label = f"Balanced Split ({num_gpu} GPU L + {num_thread}C CPU)"
    else:
        # Smart Auto-Hybrid Policy ("auto")
        if on_battery and battery_pct < 20:
            num_gpu = 0
            strategy_label = "Battery Saver CPU Mode"
        elif not is_apu and vram_total_mb >= 6000:
            num_gpu = 99
            strategy_label = f"Full dGPU Offload ({num_thread}C Assist)"
        elif is_apu or effective_gpu_mem_mb >= 1500:
            if ram_avail_gb >= 3.2:
                num_gpu = 20 if not on_battery else 12
            elif ram_avail_gb >= 2.0:
                num_gpu = 12 if not on_battery else 8
            else:
                num_gpu = 0
            strategy_label = (
                f"Smart APU+CPU Hybrid ({num_gpu}L GPU / {num_thread}C CPU)"
                if num_gpu > 0
                else f"Smart Low-RAM CPU Guard ({num_thread}C CPU)"
            )
        elif vram_total_mb >= 2000:
            num_gpu = 18
            strategy_label = f"Smart Hybrid Split ({num_gpu}L GPU / {num_thread}C CPU)"
        else:
            num_gpu = 0
            strategy_label = f"Physical Core AVX ({num_thread}C CPU)"

    mode_titles = {
        "auto": "Auto Hybrid",
        "max_gpu": "Max GPU",
        "balanced": "Balanced Hybrid",
        "cpu_eco": "CPU Eco",
    }

    return {
        "mode": mode,
        "mode_label": mode_titles.get(mode, "Auto Hybrid"),
        "strategy_label": strategy_label,
        "num_gpu": num_gpu,
        "num_thread": num_thread,
        "num_ctx": num_ctx,
        "num_batch": num_batch,
        "flash_attention": True,
        "kv_cache_type": "q8_0",
    }


def get_system_telemetry(override_mode: Optional[str] = None) -> Dict[str, Any]:
    """
    Return comprehensive, zero-lag hardware & hybrid compute telemetry:
    CPU %, RAM %, GPU % & VRAM/GTT usage, Power Profile, and active Hybrid Compute options.
    """
    global _ACTIVE_COMPUTE_MODE
    if override_mode in ("auto", "max_gpu", "balanced", "cpu_eco"):
        _ACTIVE_COMPUTE_MODE = override_mode

    hw = _discover_static_hardware()
    power = _read_power_state()

    ram_pct = 0.0
    cpu_pct = 0.0
    ram_used_gb = 0.0
    ram_avail_gb = max(2.0, hw["ram_total_gb"] * 0.5)

    if psutil:
        try:
            vm = psutil.virtual_memory()
            ram_pct = float(vm.percent)
            ram_used_gb = round((vm.total - vm.available) / (1024 ** 3), 2)
            ram_avail_gb = round(vm.available / (1024 ** 3), 2)
            cpu_pct = float(psutil.cpu_percent(interval=None))
        except Exception:
            pass

    gpu_util = 0
    vram_used_mb = 0.0
    vram_total_mb = 0.0
    gtt_used_mb = 0.0
    gtt_total_mb = 0.0
    has_gpu = False
    is_apu = False
    gpu_info = "CPU Only"

    # Fast Path 1: Linux DRM sysfs (0.05ms, zero subprocesses)
    card_dir = hw.get("drm_card_dir")
    if card_dir and os.path.exists(card_dir) and not hw.get("has_nvidia"):
        has_gpu = True
        busy = _read_sysfs_int(os.path.join(card_dir, "gpu_busy_percent"))
        if busy is not None:
            gpu_util = busy
        vu = _read_sysfs_int(os.path.join(card_dir, "mem_info_vram_used"))
        vt = _read_sysfs_int(os.path.join(card_dir, "mem_info_vram_total"))
        gu = _read_sysfs_int(os.path.join(card_dir, "mem_info_gtt_used"))
        gt = _read_sysfs_int(os.path.join(card_dir, "mem_info_gtt_total"))

        if vt is not None:
            vram_used_mb = round((vu or 0) / (1024 ** 2), 1)
            vram_total_mb = round(vt / (1024 ** 2), 1)
        if gt is not None:
            gtt_used_mb = round((gu or 0) / (1024 ** 2), 1)
            gtt_total_mb = round(gt / (1024 ** 2), 1)

        if vram_total_mb < 2048 and gtt_total_mb > 0:
            is_apu = True
            combined_used_gb = (vram_used_mb + gtt_used_mb) / 1024.0
            combined_tot_gb = (vram_total_mb + gtt_total_mb) / 1024.0
            gpu_info = f"GPU {gpu_util}% | {combined_used_gb:.1f}/{combined_tot_gb:.1f} GB Unified"
        elif vram_total_mb > 0:
            gpu_info = f"GPU {gpu_util}% | {vram_used_mb/1024:.1f}/{vram_total_mb/1024:.1f} GB VRAM"
        else:
            gpu_info = f"GPU {gpu_util}% ({hw['gpu_name']})"

    # Path 2: NVIDIA SMI (if present)
    elif hw.get("has_nvidia"):
        try:
            res = subprocess.run(
                ["nvidia-smi", "--query-gpu=utilization.gpu,memory.used,memory.total", "--format=csv,noheader,nounits"],
                stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=0.25
            )
            if res.returncode == 0 and res.stdout.strip():
                parts = [p.strip() for p in res.stdout.strip().split(",")]
                if len(parts) >= 3:
                    has_gpu = True
                    gpu_util = int(float(parts[0]))
                    vram_used_mb = float(parts[1])
                    vram_total_mb = float(parts[2])
                    gpu_info = f"GPU {gpu_util}% | {vram_used_mb/1024:.1f}/{vram_total_mb/1024:.1f} GB"
        except Exception:
            pass
    elif hw.get("gpu_vendor") == "metal":
        has_gpu = True
        is_apu = True
        vram_total_mb = hw["ram_total_gb"] * 1024 * 0.75
        gpu_info = f"Metal Unified ({hw['ram_total_gb']:.0f} GB)"

    gpu_metrics = {
        "has_gpu": has_gpu,
        "is_apu": is_apu,
        "gpu_name": hw.get("gpu_name", "CPU Only"),
        "gpu_vendor": hw.get("gpu_vendor", "none"),
        "gpu_util": gpu_util,
        "vram_used_mb": vram_used_mb,
        "vram_total_mb": vram_total_mb,
        "gtt_used_mb": gtt_used_mb,
        "gtt_total_mb": gtt_total_mb,
    }

    hybrid = compute_hybrid_allocation(_ACTIVE_COMPUTE_MODE, hw, gpu_metrics, power, ram_avail_gb)
    ollama_options = {
        "num_gpu": hybrid["num_gpu"],
        "num_thread": hybrid["num_thread"],
        "num_ctx": hybrid["num_ctx"],
        "num_batch": hybrid["num_batch"],
    }

    return {
        "cpu_pct": cpu_pct,
        "cpu_percent": cpu_pct,
        "cpu_model": hw["cpu_model"],
        "physical_cores": hw["physical_cores"],
        "cpu_cores_physical": hw["physical_cores"],
        "logical_cores": hw["logical_cores"],
        "cpu_cores_logical": hw["logical_cores"],
        "ram_pct": ram_pct,
        "ram_percent": ram_pct,
        "ram_used_gb": ram_used_gb,
        "ram_total_gb": hw["ram_total_gb"],
        "ram_avail_gb": ram_avail_gb,
        "gpu_info": gpu_info,
        "gpu_available": has_gpu,
        "gpu_name": hw.get("gpu_name", "CPU Only"),
        "gpu_vendor": hw.get("gpu_vendor", "none"),
        "gpu_percent": gpu_util,
        "vram_used_mb": vram_used_mb,
        "vram_total_mb": vram_total_mb,
        "gtt_used_mb": gtt_used_mb,
        "gtt_total_mb": gtt_total_mb,
        "effective_vram_mb": round(vram_total_mb + gtt_total_mb, 1),
        "on_battery": power["on_battery"],
        "battery_percent": power["battery_pct"],
        "compute_mode": hybrid["mode"],
        "strategy_label": hybrid["strategy_label"],
        "ollama_options": ollama_options,
        "gpu": gpu_metrics,
        "power": power,
        "hybrid": hybrid,
    }


# ==============================================================================
# 2. EMBEDDED NEURO-SYMBOLIC ENGINE (SYMPY AST + KÙZUDB GRAPHRAG BRIDGE)
# ==============================================================================
_SYMPY_ENGINE = None
_STEM_GRAPH = None

try:
    import sympy as sp
    from concurrent.futures import ThreadPoolExecutor, TimeoutError as FuturesTimeoutError

    class _FallbackSymPyEngine:
        def __init__(self):
            # Standard scientific symbols across physics, math, and engineering
            self.safe_dict = {
                "x": sp.Symbol("x"), "y": sp.Symbol("y"), "z": sp.Symbol("z"),
                "t": sp.Symbol("t"), "s": sp.Symbol("s"), "n": sp.Symbol("n", integer=True),
                "k": sp.Symbol("k"), "R": sp.Symbol("R", positive=True),
                "C": sp.Symbol("C", positive=True), "L": sp.Symbol("L", positive=True),
                "v": sp.Symbol("v"), "u": sp.Symbol("u"), "a": sp.Symbol("a"),
                "m": sp.Symbol("m", positive=True), "F": sp.Symbol("F"), "r": sp.Symbol("r", positive=True),
                "p": sp.Symbol("p"), "T": sp.Symbol("T", positive=True), "w": sp.Symbol("w"),
                "I": sp.Symbol("I"), "q": sp.Symbol("q"), "V": sp.Symbol("V"),
                "pi": sp.pi, "e": sp.E, "E": sp.E, "oo": sp.oo, "inf": sp.oo,
                "sin": sp.sin, "cos": sp.cos, "tan": sp.tan, "asin": sp.asin, "acos": sp.acos, "atan": sp.atan,
                "sinh": sp.sinh, "cosh": sp.cosh, "tanh": sp.tanh, "exp": sp.exp,
                "log": sp.log, "ln": sp.log, "sqrt": sp.sqrt, "diff": sp.diff,
                "integrate": sp.integrate, "solve": sp.solve, "simplify": sp.simplify,
                "expand": sp.expand, "factor": sp.factor, "limit": sp.limit,
                "series": sp.series, "dsolve": sp.dsolve, "Matrix": sp.Matrix,
                "Eq": sp.Eq, "symbols": sp.symbols, "Symbol": sp.Symbol,
                "Integer": sp.Integer, "Float": sp.Float, "Rational": sp.Rational, "Number": sp.Number
            }
            self._cache: Dict[str, Dict[str, Any]] = {}
            self._cache_lock = threading.Lock()
            self._executor = ThreadPoolExecutor(max_workers=2, thread_name_prefix="vigyan_sympy")
            try:
                from sympy.parsing.sympy_parser import (
                    parse_expr,
                    standard_transformations,
                    implicit_multiplication_application,
                    convert_xor
                )
                self._parse_expr = parse_expr
                self._transformations = standard_transformations + (implicit_multiplication_application, convert_xor)
            except Exception:
                self._parse_expr = None
                self._transformations = None

        def _clean_math_str(self, s: str) -> str:
            s = s.strip()
            s = s.replace("²", "**2").replace("³", "**3").replace("⁴", "**4").replace("⁻¹", "**(-1)")
            s = s.replace("−", "-").replace("×", "*").replace("÷", "/").replace("π", "pi").replace("√", "sqrt")
            # Disallow dangerous builtins and code execution primitives
            disallowed = (
                "__", "import", "eval", "exec", "open", "os", "sys", "subprocess",
                "lambda", "globals", "locals", "getattr", "setattr", "delattr",
                "system", "pty", "shutil", "compile", "breakpoint"
            )
            for bad in disallowed:
                if bad in s.lower():
                    return ""
            # Syntax normalization: 2x -> 2*x (avoid scientific notation like 1e-4)
            s = re.sub(r'(\d)(?![eE][+-]?\d)([a-zA-Z])', r'\1*\2', s)
            s = re.sub(r'(\d)\(', r'\1*(', s)
            s = re.sub(r'\)([\w\(])', r')*\1', s)
            return s

        def _is_safe_ast(self, expr_str: str) -> bool:
            try:
                tree = ast.parse(expr_str, mode="eval")
                allowed_nodes = (
                    ast.Expression, ast.BinOp, ast.UnaryOp, ast.Constant,
                    ast.Add, ast.Sub, ast.Mult, ast.Div, ast.Pow,
                    ast.FloorDiv, ast.Mod, ast.UAdd, ast.USub, ast.Name,
                    ast.Call, ast.Load, ast.Tuple, ast.List,
                    ast.BitXor, ast.BitAnd, ast.Invert, ast.keyword
                )
                disallowed_names = {
                    "import", "eval", "exec", "open", "os", "sys", "subprocess",
                    "lambda", "globals", "locals", "getattr", "setattr", "delattr",
                    "system", "pty", "shutil", "compile", "breakpoint", "quit", "exit"
                }
                for node in ast.walk(tree):
                    if not isinstance(node, allowed_nodes):
                        return False
                    if isinstance(node, ast.Attribute):
                        return False
                    if isinstance(node, ast.Name):
                        if node.id.startswith("__") or node.id.lower() in disallowed_names:
                            return False
                        # Dynamically register valid variable symbols if safe
                        if node.id not in self.safe_dict:
                            if re.match(r'^[a-zA-Z][a-zA-Z0-9_]*$', node.id):
                                self.safe_dict[node.id] = sp.Symbol(node.id)
                            else:
                                return False
                return True
            except Exception:
                return False

        def _eval_core(self, s: str) -> Dict[str, Any]:
            if self._parse_expr:
                res = self._parse_expr(
                    s,
                    local_dict=self.safe_dict,
                    global_dict={"__builtins__": {}},
                    transformations=self._transformations
                )
            else:
                res = eval(s, {"__builtins__": {}}, dict(self.safe_dict))

            latex_res = sp.latex(res) if isinstance(res, (sp.Basic, sp.Matrix, list, tuple)) else str(res)
            num = None
            if hasattr(res, "evalf") and not getattr(res, "free_symbols", None):
                try:
                    num = float(res.evalf(6))
                except Exception:
                    num = None
            elif isinstance(res, (int, float)):
                num = float(res)
            return {"success": True, "result": str(res), "latex": latex_res, "numeric_approx": num, "cached": False}

        def evaluate_expression(self, expr_str: str, timeout_sec: float = 2.5) -> Dict[str, Any]:
            s = self._clean_math_str(expr_str)
            if not s:
                return {"success": False, "error": "Mathematical expression contains disallowed syntax or keywords"}

            import hashlib
            cache_key = hashlib.sha256(s.encode("utf-8")).hexdigest()
            with self._cache_lock:
                if cache_key in self._cache:
                    hit = dict(self._cache[cache_key])
                    hit["cached"] = True
                    hit["latency_ms"] = 0.0
                    return hit

            if "=" in s and not ("==" in s or "Eq" in s or "<=" in s or ">=" in s):
                parts = s.split("=", 1)
                s = f"solve(Eq({parts[0].strip()}, {parts[1].strip()}))"

            if not self._is_safe_ast(s):
                return {"success": False, "error": "Mathematical expression contains disallowed syntax"}

            try:
                future = self._executor.submit(self._eval_core, s)
                out = future.result(timeout=timeout_sec)
                with self._cache_lock:
                    if len(self._cache) > 2048:
                        self._cache.pop(next(iter(self._cache)))
                    self._cache[cache_key] = out
                return out
            except FuturesTimeoutError:
                return {"success": False, "error": f"Evaluation timed out after {timeout_sec}s"}
            except Exception as exc:
                return {"success": False, "error": f"Evaluation error: {str(exc)}"}

    _SYMPY_ENGINE = _FallbackSymPyEngine()
except Exception:
    _SYMPY_ENGINE = None

# Curated deterministic GraphRAG knowledge base (always available even if KùzuDB is locked)
CURATED_GRAPH_AXIOMS = [
    {
        "keywords": ["ohm", "resistor", "voltage", "current", "resistance"],
        "law": "Ohm's Law & Joule Heating",
        "domain": "Circuits",
        "equation": "V = I \\cdot R, \\quad P = I^2 R = \\frac{V^2}{R}",
        "axiom": "Potential difference across an ideal conductor is proportional to current; microscopic form J = sigma E.",
    },
    {
        "keywords": ["rc", "cutoff", "filter", "sallen", "capacitor", "time constant"],
        "law": "RC Filter & Cutoff Frequency",
        "domain": "Signal Processing",
        "equation": "\\tau = R C, \\quad f_c = \\frac{1}{2\\pi R C}, \\quad H(s) = \\frac{1}{1 + s R C}",
        "axiom": "3dB corner frequency where output power drops by 50% (-3 dB) with -45 deg phase shift.",
    },
    {
        "keywords": ["rlc", "resonance", "resonant", "tank", "inductor", "q factor"],
        "law": "RLC Resonance & Quality Factor",
        "domain": "RF & Circuits",
        "equation": "f_0 = \\frac{1}{2\\pi\\sqrt{LC}}, \\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}",
        "axiom": "At resonance X_L = X_C, reactive impedance cancels and energy oscillates between magnetic (L) and electric (C) fields.",
    },
    {
        "keywords": ["555", "astable", "timer", "oscillator", "pwm", "duty"],
        "law": "NE555 Astable Multivibrator Timing",
        "domain": "Analog ICs",
        "equation": "f = \\frac{1.44}{(R_A + 2 R_B) C}, \\quad D = \\frac{R_A + R_B}{R_A + 2 R_B}",
        "axiom": "Capacitor charges between 1/3 Vcc and 2/3 Vcc comparator thresholds via RA+RB and discharges through RB.",
    },
    {
        "keywords": ["mosfet", "saturation", "finfet", "gaa", "transistor", "vgs", "vds", "dibl", "subthreshold"],
        "law": "MOSFET Saturation & Subthreshold Conduction",
        "domain": "Semiconductor VLSI",
        "equation": "I_D = \\frac{1}{2}\\mu_n C_{ox}\\frac{W}{L}(V_{GS}-V_{th})^2(1+\\lambda V_{DS}), \\quad SS = \\ln(10)\\frac{k_B T}{q}\\left(1+\\frac{C_d}{C_{ox}}\\right)",
        "axiom": "Pinch-off saturation occurs for Vds >= Vgs - Vth; room-temperature thermionic subthreshold limit is 60 mV/decade.",
    },
    {
        "keywords": ["bandgap", "silicon", "gaas", "gan", "pn", "junction", "depletion", "diode", "shockley"],
        "law": "PN Junction Depletion & Shockley Diode Law",
        "domain": "Solid-State Physics",
        "equation": "I = I_s\\left(e^{\\frac{qV}{n k_B T}} - 1\\right), \\quad V_{bi} = \\frac{k_B T}{q}\\ln\\left(\\frac{N_A N_D}{n_i^2}\\right)",
        "axiom": "Si Eg = 1.12 eV (indirect), GaAs Eg = 1.42 eV (direct), GaN Eg = 3.40 eV (wide bandgap).",
    },
    {
        "keywords": ["orbit", "kepler", "satellite", "vis-viva", "gravity", "escape"],
        "law": "Vis-Viva & Kepler's Third Law",
        "domain": "Astrodynamics",
        "equation": "v^2 = GM\\left(\\frac{2}{r} - \\frac{1}{a}\\right), \\quad T^2 = \\frac{4\\pi^2}{GM}a^3",
        "axiom": "Conservation of specific orbital energy E = -GM/(2a) and angular momentum h = r x v.",
    },
    {
        "keywords": ["rocket", "tsiolkovsky", "propulsion", "impulse", "delta-v"],
        "law": "Tsiolkovsky Rocket Equation",
        "domain": "Aerospace",
        "equation": "\\Delta v = I_{sp} g_0 \\ln\\left(\\frac{m_0}{m_f}\\right), \\quad g_0 = 9.80665\\text{ m/s}^2",
        "axiom": "Momentum conservation for variable-mass reaction propulsion vehicles.",
    },
    {
        "keywords": ["quantum", "schrodinger", "tunneling", "wavefunction", "harmonic", "planck"],
        "law": "Time-Independent Schrödinger Equation & Tunneling",
        "domain": "Quantum Mechanics",
        "equation": "-\\frac{\\hbar^2}{2m}\\nabla^2\\psi + V(\\mathbf{r})\\psi = E\\psi, \\quad E_n = \\left(n + \\frac{1}{2}\\right)\\hbar\\omega",
        "axiom": "Wavefunction transmission through a finite barrier decays exponentially with barrier width and root height.",
    },
    {
        "keywords": ["fcc", "bcc", "hcp", "perovskite", "crystal", "miller", "bragg", "xrd", "eutectic", "lattice"],
        "law": "Bragg's Law & Crystallographic Packing",
        "domain": "Materials Science",
        "equation": "n\\lambda = 2 d_{hkl}\\sin\\theta, \\quad d_{hkl} = \\frac{a}{\\sqrt{h^2+k^2+l^2}}, \\quad \\text{APF}_{\\text{FCC}} = 0.74",
        "axiom": "FCC (Cu, Al, Au) has APF=0.74 and CN=12; BCC (Fe, W) has APF=0.68 and CN=8; Pb-Sn eutectic is at 183 C, 61.9 wt% Sn.",
    },
    {
        "keywords": ["dna", "helix", "protein", "membrane", "atp", "enzyme", "michaelis", "ion channel", "nernst"],
        "law": "Nernst Potential & Michaelis-Menten Kinetics",
        "domain": "Molecular Biology",
        "equation": "E_{\\text{ion}} = \\frac{RT}{zF}\\ln\\frac{[\\text{Ion}]_{\\text{out}}}{[\\text{Ion}]_{\\text{in}}}, \\quad v = \\frac{V_{\\max}[S]}{K_m + [S]}",
        "axiom": "B-DNA has 10.5 bp/turn and 3.4 nm pitch; A=T forms 2 H-bonds and G=C forms 3 H-bonds.",
    },
    {
        "keywords": ["saddle", "paraboloid", "gaussian", "curvature", "hessian", "curl", "divergence", "taylor", "stokes"],
        "law": "Gaussian Curvature, Vector Curl & Taylor Expansion",
        "domain": "Differential Geometry & Calculus",
        "equation": "K = \\frac{f_{xx}f_{yy} - f_{xy}^2}{(1 + f_x^2 + f_y^2)^2}, \\quad \\oint_{\\partial\\Sigma}\\mathbf{F}\\cdot d\\mathbf{r} = \\iint_{\\Sigma}(\\nabla\\times\\mathbf{F})\\cdot d\\mathbf{S}",
        "axiom": "Hyperbolic paraboloid z = x^2/a^2 - y^2/b^2 has negative Gaussian curvature K < 0 everywhere.",
    },
    {
        "keywords": ["ecg", "stemi", "sepsis", "embolism", "troponin", "lactate", "medical", "vitals", "cardiac"],
        "law": "Hemodynamic Oxygen Delivery & Mean Arterial Pressure",
        "domain": "Clinical Medicine",
        "equation": "\\text{MAP} = \\text{DBP} + \\frac{1}{3}(\\text{SBP} - \\text{DBP}), \\quad DO_2 = CO \\times (1.34 \\cdot \\text{Hb} \\cdot S_aO_2 + 0.003 P_aO_2)",
        "axiom": "STEMI exhibits ST-segment elevation in contiguous leads with elevated hs-cTnI; Septic Shock requires MAP >= 65 mmHg.",
    },
    {
        "keywords": ["gear", "propeller", "heatsink", "truss", "kinematics", "stress", "torsion", "beam"],
        "law": "Epicyclic Gear Ratio & Fin Heat Transfer",
        "domain": "Mechanical Engineering",
        "equation": "i = 1 + \\frac{Z_{\\text{ring}}}{Z_{\\text{sun}}}, \\quad q_{\\text{fin}} = \\sqrt{hPkA_c}(T_b - T_\\infty)\\tanh(mL)",
        "axiom": "Planetary gear train distributes torque across planet pinions; microchannel fins maximize convective surface area.",
    },
]


def _extract_math_expression(query: str) -> Optional[str]:
    """Extract a SymPy-evaluable expression from natural language STEM prompts."""
    q = query.strip()
    q_lower = q.lower()

    # Explicit SymPy function calls inside text
    direct_call = re.search(
        r"\b(integrate|diff|solve|simplify|expand|factor|limit|series|dsolve|Matrix)\s*\([^\n]+?\)",
        q
    )
    if direct_call:
        return direct_call.group(0).replace("^", "**")

    # Definite integral: integrate <expr> from <a> to <b>
    m_def = re.search(r"integrate\s+(.+?)\s+from\s+([^\s]+)\s+to\s+([^\s\?\.]+)", q_lower)
    if m_def:
        expr, a, b = m_def.groups()
        expr = expr.replace("dx", "").replace("^", "**").strip()
        a = "oo" if "inf" in a else a
        b = "oo" if "inf" in b else b
        return f"integrate({expr}, (x, {a}, {b}))"

    # Indefinite integral
    m_indef = re.search(r"(?:integrate|integral of)\s+([^\?\.\n]+)", q_lower)
    if m_indef:
        expr = m_indef.group(1).replace("dx", "").replace("^", "**").strip()
        if expr and len(expr) < 80:
            return f"integrate({expr}, x)"

    # Derivative
    m_diff = re.search(r"(?:derivative of|differentiate)\s+([^\?\.\n]+)", q_lower)
    if m_diff:
        expr = m_diff.group(1).replace("with respect to x", "").replace("^", "**").strip()
        if expr and len(expr) < 80:
            return f"diff({expr}, x)"

    # Solve algebraic equation
    m_solve = re.search(r"solve\s+([0-9a-zA-Z_\+\-\*\/\^\(\)\s=]+)", q_lower)
    if m_solve:
        target = m_solve.group(1).split(" and ")[0].replace("^", "**").strip()
        if "=" in target:
            lhs, rhs = target.split("=", 1)
            if lhs.strip() and rhs.strip():
                return f"solve(Eq({lhs.strip()}, {rhs.strip()}), x)"
        elif any(ch in target for ch in ("x", "+", "-", "*")):
            return f"solve({target}, x)"

    # Pure arithmetic / symbolic calculation
    m_calc = re.search(r"(?:calculate|evaluate|simplify)\s+([0-9x\+\-\*\/\^\(\)\.\s]+)", q_lower)
    if m_calc:
        target = m_calc.group(1).replace("^", "**").strip()
        if len(target) >= 3 and any(op in target for op in ("+", "-", "*", "/", "**")):
            return target

    return None


def enrich_stem_query(query: str) -> Dict[str, Any]:
    """
    Deterministic Neuro-Symbolic Enrichment:
    1. Evaluates exact symbolic/numerical math via SymPy AST Engine.
    2. Retrieves multi-hop physical laws, constants, and equations via KùzuDB + Curated STEM Graph.
    3. Returns structured badges and grounding context for the LLM or UI.
    """
    q = (query or "").strip()
    q_lower = q.lower()

    sympy_res = None
    if _SYMPY_ENGINE is not None:
        expr = _extract_math_expression(q)
        if expr:
            eval_out = _SYMPY_ENGINE.evaluate_expression(expr)
            if eval_out.get("success"):
                eval_out["expression"] = expr
                sympy_res = eval_out

    matched_axioms = []
    seen_laws = set()

    # Check Curated GraphRAG Knowledge Base (0.1ms, lock-free)
    for item in CURATED_GRAPH_AXIOMS:
        if any(kw in q_lower for kw in item["keywords"]):
            if item["law"] not in seen_laws:
                seen_laws.add(item["law"])
                matched_axioms.append({
                    "law": item["law"],
                    "topic": item["law"],
                    "domain": item["domain"],
                    "equation": item["equation"],
                    "axiom": item["axiom"],
                })

    # Also query KùzuDB if available and not locked
    global _STEM_GRAPH
    if len(matched_axioms) < 3 and q:
        try:
            if _STEM_GRAPH is None:
                from knowledge_graph.kuzu_stem_graph import VigyanSTEMGraph
                _STEM_GRAPH = VigyanSTEMGraph()
            if _STEM_GRAPH is not None:
                words = [w for w in re.findall(r"\b[A-Za-z0-9_-]{3,}\b", q) if w.lower() not in {"what", "the", "and", "for", "with", "how", "derive", "explain", "plot", "simulate"}]
                ctx_str = _STEM_GRAPH.query_multihop_context(words[:6])
                if ctx_str:
                    for block in ctx_str.split("- [Graph "):
                        if not block.strip() or block.startswith("###"):
                            continue
                        first_line = block.splitlines()[0].strip()
                        law_title = first_line.split("]:", 1)[-1].strip()
                        if law_title and law_title not in seen_laws:
                            seen_laws.add(law_title)
                            eq_match = re.search(r"Equation:\s*(.+)", block)
                            ax_match = re.search(r"(?:Axiom|Definition|Properties):\s*(.+)", block)
                            matched_axioms.append({
                                "law": law_title,
                                "topic": law_title,
                                "domain": "KùzuDB GraphRAG",
                                "equation": eq_match.group(1).strip() if eq_match else "",
                                "axiom": ax_match.group(1).strip() if ax_match else block.replace("\n", " ")[:140],
                            })
        except Exception:
            pass

    prompt_injection = ""
    if sympy_res or matched_axioms:
        parts = ["[NEURO-SYMBOLIC VERIFIED GROUNDING • KùzuDB GraphRAG + SymPy AST]"]
        if sympy_res:
            parts.append(
                f"• SymPy AST Exact Evaluation: `{sympy_res.get('expression')}` = `{sympy_res.get('result')}` "
                f"(LaTeX: $${sympy_res.get('latex')}$$, Approx: {sympy_res.get('numeric_approx')})"
            )
        for ax in matched_axioms[:3]:
            parts.append(f"• [{ax['domain']}] {ax['law']}: $${ax['equation']}$$ — {ax['axiom']}")
        prompt_injection = "\n".join(parts)

    telemetry = get_system_telemetry()
    sympy_str = f"{sympy_res.get('expression')} = {sympy_res.get('result')}" if sympy_res else ""
    return {
        "query": q,
        "sympy": sympy_res,
        "sympy_verified": bool(sympy_res and sympy_res.get("success")),
        "sympy_result": sympy_str,
        "graph_axioms": matched_axioms[:4],
        "axioms": matched_axioms[:4],
        "lancedb_context": "",
        "prompt_injection": prompt_injection,
        "enriched_system_suffix": ("\n" + prompt_injection) if prompt_injection else "",
        "hybrid": telemetry["hybrid"],
    }


# ==============================================================================
# 3. EMBEDDED LOCAL SOVEREIGN AGENT & NEURO-SYMBOLIC BRIDGE (PORT 8085)
# ==============================================================================
def get_current_ram_percent() -> float:
    """Returns current system memory percentage with /proc/meminfo fallback."""
    if psutil:
        try:
            return float(psutil.virtual_memory().percent)
        except Exception:
            pass
    # Linux /proc/meminfo fallback
    try:
        meminfo = {}
        with open("/proc/meminfo", "r") as f:
            for line in f:
                parts = line.split(":")
                if len(parts) == 2:
                    meminfo[parts[0].strip()] = int(parts[1].split()[0])
        total = meminfo.get("MemTotal", 0)
        avail = meminfo.get("MemAvailable", meminfo.get("MemFree", 0))
        if total > 0:
            return round((1.0 - (avail / total)) * 100.0, 1)
    except Exception:
        pass
    return 0.0


class RAMGovernor:
    """Monitors system memory during model streaming inference.
    If RAM usage reaches or exceeds threshold_pct (default 88.0%),
    immediately triggers abort callback and issues keep_alive: 0 to Ollama.
    """
    def __init__(self, threshold_pct: float = 88.0, interval_sec: float = 0.1):
        self.threshold_pct = threshold_pct
        self.interval_sec = interval_sec
        self.tripped = False
        self.running = False
        self._thread = None
        self.peak_ram_pct = 0.0
        self.prev_ram_pct = 0.0
        self.rate_of_rise = 0.0

    def start(self, on_trip_cb, active_model: str):
        self.tripped = False
        self.running = True
        self.peak_ram_pct = 0.0
        self.prev_ram_pct = get_current_ram_percent()

        def _watchdog():
            consecutive_over = 0
            while self.running:
                try:
                    pct = get_current_ram_percent()
                    self.rate_of_rise = pct - self.prev_ram_pct
                    self.prev_ram_pct = pct

                    if pct > self.peak_ram_pct:
                        self.peak_ram_pct = pct

                    # Predictive tripwire: RAM >= 80% and surging rapidly (>= 3.0% / interval)
                    predictive_trip = (pct >= 80.0 and self.rate_of_rise >= 3.0)

                    if pct >= self.threshold_pct or predictive_trip:
                        consecutive_over += 1
                    else:
                        consecutive_over = 0

                    if consecutive_over >= 2 and not self.tripped:
                        self.tripped = True
                        print(f"[RAM GOVERNOR] CRITICAL TRIPWIRE: RAM reached {pct:.1f}% (rise: +{self.rate_of_rise:.1f}%) >= {self.threshold_pct}%. Aborting & releasing inference slots!")
                        try:
                            if LLAMA_SUPERVISOR:
                                LLAMA_SUPERVISOR.release_slot(0)
                        except Exception:
                            pass
                        try:
                            evict_req = urllib.request.Request(
                                "http://127.0.0.1:11434/api/generate",
                                headers={"Content-Type": "application/json"},
                                data=json.dumps({"model": active_model, "keep_alive": 0}).encode("utf-8"),
                            )
                            urllib.request.urlopen(evict_req, timeout=1.5)
                        except Exception:
                            pass
                        try:
                            on_trip_cb(pct)
                        except Exception:
                            pass
                        break
                except Exception:
                    pass
                time.sleep(self.interval_sec)

        self._thread = threading.Thread(target=_watchdog, daemon=True)
        self._thread.start()

    def stop(self):
        self.running = False




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


def select_cascade_model(requested_model: str, query: str = "", has_image: bool = False) -> Dict[str, Any]:
    """Sovereign Vigyan AI execution router.
    Flagship Vigyan-3B Quad-Master IQ3_M is the primary sovereign engine,
    with Vigyan AI 1.5B Quad-Master available for ultra-fast edge inference,
    and Vigyan-VL-4B for multimodal vision reasoning.
    """
    req = (requested_model or "").strip().lower()

    if has_image or req in ("vigyan:4b", "4b", "vigyan-vl-4b", "vl4b"):
        return {
            "tier": 4,
            "model": "vigyan:4b",
            "downgraded": False,
            "reason": "Vigyan-VL-4B Multimodal Vision Engine (Circuit Schematics & Diagrams)"
        }

    # 1. Explicit 1.5B request
    if req in ("vigyan:1.5b", "1.5b"):
        return {
            "tier": 1,
            "model": "vigyan:1.5b",
            "downgraded": False,
            "reason": "Vigyan AI 1.5B Quad Master (Ultra-fast edge inference)"
        }

    # 2. Flagship Vigyan-3B Quad-Master (57.50% GSM8K certified)
    return {
        "tier": 2,
        "model": "vigyan:3b",
        "downgraded": False,
        "reason": "Vigyan 3B Quad-Master Sovereign Engine (57.50% GSM8K Certified, 22-28 tok/s CPU inference)"
    }


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
    "vigyan-3b-quad-master-iq3_m.gguf",     # Daily Driver (3B)
    "vigyan-vl-4b-iq3_m.gguf",              # Multimodal Vision (4B)
    "vigyan-7b-quad-master-q4_k_m.gguf",     # Doctoral STEM (7B)
    "vigyan-r1-14b-health-semi-quantum-iq3_m.gguf"  # Deep R1 Reasoning (14B)
}

SOVEREIGN_PRODUCTION_MODELS = [
    {
        "id": "vigyan-3b-quad-master-iq3_m",
        "name": "Vigyan-3B Quad-Master",
        "tag": "vigyan-3b",
        "short_label": "3B Daily Driver",
        "filename": "vigyan-3b-quad-master-iq3_m.gguf",
        "dest_filename": "vigyan-3b-quad-master-iq3_m.gguf",
        "size_bytes": 1488894752,
        "size_formatted": "1.39 GB",
        "ram_required_gb": 4.0,
        "domain": "Fast STEM, Calculus & Exact Symbolic Mathematics",
        "hf_url": "https://huggingface.co/shreyansh12183/vigyan-3b-quad-master/resolve/main/vigyan-3b-quad-master-iq3_m.gguf?download=true",
        "hf_repo": "shreyansh12183/vigyan-3b-quad-master",
        "template": "{{ prompt }}",
        "stop": ["<|endoftext|>", "<|im_end|>"]
    },
    {
        "id": "vigyan-vl-4b-iq3_m",
        "name": "Vigyan-VL-4B Multimodal",
        "tag": "vigyan:4b",
        "short_label": "4B Vision",
        "filename": "vigyan-vl-4b-iq3_m.gguf",
        "dest_filename": "vigyan-vl-4b-iq3_m.gguf",
        "size_bytes": 1962897120,
        "size_formatted": "1.83 GB",
        "ram_required_gb": 5.0,
        "domain": "Vision-Language, Circuit Schematics & Diagram Analysis",
        "hf_url": "https://huggingface.co/Experimentlab/Vigyan-VL-4B-GGUF/resolve/main/vigyan-vl-4b-iq3_m.gguf?download=true",
        "hf_repo": "Experimentlab/Vigyan-VL-4B-GGUF",
        "mmproj_url": "https://huggingface.co/Experimentlab/Vigyan-VL-4B-GGUF/resolve/main/mmproj-vigyan-vl-4b-f16.gguf?download=true",
        "mmproj_filename": "mmproj-vigyan-vl-4b-f16.gguf",
        "template": "{{ prompt }}",
        "stop": ["<|endoftext|>", "<|im_end|>"]
    },
    {
        "id": "vigyan-7b-quad-master-q4_k_m",
        "name": "Vigyan-7B Quad-Master",
        "tag": "vigyan-7b-quad",
        "short_label": "7B Doctoral",
        "filename": "vigyan-7b-quad-master-q4_k_m.gguf",
        "dest_filename": "vigyan-7b-quad-master-q4_k_m.gguf",
        "size_bytes": 4467000000,
        "size_formatted": "4.16 GB",
        "ram_required_gb": 8.0,
        "domain": "Doctoral Proofs, Complex Engineering & Physical Science",
        "hf_url": "https://huggingface.co/shreyansh12183/vigyan-olmo2-7b-quad-master/resolve/main/vigyan-7b-quad-master-q4_k_m.gguf?download=true",
        "hf_repo": "shreyansh12183/vigyan-olmo2-7b-quad-master",
        "template": "{{ prompt }}",
        "stop": ["<|endoftext|>", "<|im_end|>"]
    },
    {
        "id": "vigyan-r1-14b-health-semi-quantum",
        "name": "Vigyan-R1-14B Reasoning",
        "tag": "vigyan-r1-14b",
        "short_label": "14B Frontier",
        "filename": "vigyan-r1-14b-health-semi-quantum-iq3_m.gguf",
        "dest_filename": "vigyan-r1-14b-health-semi-quantum-iq3_m.gguf",
        "size_bytes": 6917000000,
        "size_formatted": "6.44 GB",
        "ram_required_gb": 10.0,
        "domain": "Frontier Step-by-Step Chain-of-Thought & Quantum Physics",
        "hf_url": "https://huggingface.co/shreyansh12183/vigyan-r1-14b-health-semi-quantum-gguf/resolve/main/vigyan-r1-14b-health-semi-quantum-iq3_m.gguf?download=true",
        "hf_repo": "shreyansh12183/vigyan-r1-14b-health-semi-quantum-gguf",
        "template": "{{ prompt }}",
        "stop": ["<|endoftext|>", "<|im_end|>"]
    }
]

VERIFIED_EXPERIMENTLAB_MODELS = SOVEREIGN_PRODUCTION_MODELS

MODELS_CATALOG = {
    "vigyan:3b": SOVEREIGN_PRODUCTION_MODELS[0],
    "vigyan-3b-quad-master-iq3_m": SOVEREIGN_PRODUCTION_MODELS[0],
    "vigyan-3b": SOVEREIGN_PRODUCTION_MODELS[0],
    "vigyan:4b": SOVEREIGN_PRODUCTION_MODELS[1],
    "vigyan-vl-4b-iq3_m": SOVEREIGN_PRODUCTION_MODELS[1],
    "vigyan:7b": SOVEREIGN_PRODUCTION_MODELS[2],
    "vigyan-7b-quad-master-q4_k_m": SOVEREIGN_PRODUCTION_MODELS[2],
    "vigyan:14b": SOVEREIGN_PRODUCTION_MODELS[3],
    "vigyan-r1-14b-health-semi-quantum-iq3_m": SOVEREIGN_PRODUCTION_MODELS[3],
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
        dest_filename = item.get("filename") or item.get("dest_filename") or f"{tag}.gguf"
        if not dest_filename.endswith(".gguf"):
            dest_filename += ".gguf"

        hf_url = item.get("hf_url") or f"https://huggingface.co/Experimentlab/Vigyan-Models-GGUF/resolve/main/{dest_filename}?download=true"

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
                global LLAMA_SUPERVISOR
                was_active = False
                if LLAMA_SUPERVISOR and LLAMA_SUPERVISOR.is_alive():
                    try:
                        if os.path.abspath(LLAMA_SUPERVISOR.model_path or "") == os.path.abspath(dest_file):
                            LLAMA_SUPERVISOR.stop()
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

                if was_active and LLAMA_SUPERVISOR:
                    try:
                        LLAMA_SUPERVISOR.start()
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
            0 if "3b-quad-master" in m["filename"] else
            1 if "2b-stem" in m["filename"] else
            2 if "1.5b-quad" in m["filename"] else
            3 if "moe" in m["filename"] else
            4 if "reasoning" in m["filename"] else
            5 if "7b" in m["filename"] else 6,
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

    active_path = LLAMA_SUPERVISOR.model_path or ""
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
    rec_model = "vigyan-3b-quad-master-iq3_m.gguf"

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

    # Guarantee canonical alias tags (vigyan:3b, vigyan:4b, vigyan:7b, vigyan:14b) are always present
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




# ==============================================================================
# 3.2.1 SOVEREIGN AGENTIC STEM & SCIENTIFIC COMPUTING TOOLS
# ==============================================================================
_SAFE_MATH_NODES = (
    ast.Expression, ast.BinOp, ast.UnaryOp, ast.Call, ast.Name,
    ast.Constant, ast.Add, ast.Sub, ast.Mult, ast.Div,
    ast.Pow, ast.USub, ast.UAdd, ast.Mod, ast.FloorDiv, ast.Load
)

_SAFE_MATH_ENV = {
    "sin": math.sin, "cos": math.cos, "tan": math.tan,
    "asin": math.asin, "acos": math.acos, "atan": math.atan,
    "sinh": math.sinh, "cosh": math.cosh, "tanh": math.tanh,
    "exp": math.exp, "log": math.log, "log10": math.log10, "log2": math.log2,
    "ln": math.log, "sqrt": math.sqrt, "abs": abs,
    "pi": math.pi, "e": math.e, "tau": math.tau,
}


def evaluate_plot(
    expression: str,
    x_min: float = -10.0,
    x_max: float = 10.0,
    points: int = 200,
    title: str = "",
    x_label: str = "x",
    y_label: str = "y"
) -> Dict[str, Any]:
    """Safely evaluates a continuous mathematical function f(x) and returns high-resolution (x, y) plot traces."""
    clean_expr = expression.strip()
    if clean_expr.lower().startswith("f(x) ="):
        clean_expr = clean_expr[6:].strip()
    elif clean_expr.lower().startswith("f(x)="):
        clean_expr = clean_expr[5:].strip()
    elif clean_expr.lower().startswith("y ="):
        clean_expr = clean_expr[3:].strip()
    elif clean_expr.lower().startswith("y="):
        clean_expr = clean_expr[2:].strip()

    clean_expr = clean_expr.replace("^", "**").strip()
    try:
        tree = ast.parse(clean_expr, mode="eval")
    except Exception:
        # Try normalizing implicit multiplication e.g. 0.15x -> 0.15*x, )cos -> )*cos
        norm = re.sub(r"(\d+)([a-zA-Z\(])", r"\1*\2", clean_expr)
        norm = re.sub(r"\)([a-zA-Z\(])", r")*\1", norm)
        try:
            tree = ast.parse(norm, mode="eval")
            clean_expr = norm
        except Exception as exc:
            return {"tool": "plot_function", "success": False, "error": f"Mathematical parse error: {exc}"}

    try:
        for node in ast.walk(tree):
            if not isinstance(node, _SAFE_MATH_NODES):
                return {"tool": "plot_function", "success": False, "error": f"Disallowed mathematical syntax: {type(node).__name__}"}
            if isinstance(node, ast.Name) and node.id != "x" and node.id not in _SAFE_MATH_ENV:
                return {"tool": "plot_function", "success": False, "error": f"Unknown or disallowed symbol: {node.id}"}
        compiled_code = compile(tree, "<plot_math>", "eval")
    except Exception as exc:
        return {"tool": "plot_function", "success": False, "error": f"Mathematical parse error: {exc}"}

    x_min = float(x_min)
    x_max = float(x_max)
    points = max(10, min(1000, int(points)))
    step = (x_max - x_min) / max(1, points - 1)
    
    x_vals: List[float] = []
    y_vals: List[Optional[float]] = []
    env = dict(_SAFE_MATH_ENV)

    for i in range(points):
        x = x_min + i * step
        env["x"] = x
        try:
            val = eval(compiled_code, {"__builtins__": {}}, env)
            if math.isnan(val) or math.isinf(val):
                y_vals.append(None)
            else:
                y_vals.append(round(float(val), 5))
        except Exception:
            y_vals.append(None)
        x_vals.append(round(x, 4))

    return {
        "tool": "plot_function",
        "success": True,
        "expression": expression,
        "title": title or f"f(x) = {expression}",
        "x_label": x_label,
        "y_label": y_label,
        "x_range": [x_min, x_max],
        "points": points,
        "plot": {
            "title": title or f"f(x) = {expression}",
            "x_label": x_label,
            "y_label": y_label,
            "traces": [
                {
                    "x": x_vals,
                    "y": y_vals,
                    "name": expression,
                    "mode": "lines",
                    "line": {"color": "#38bdf8", "width": 2}
                }
            ]
        }
    }


def _extract_text_content(content: Any) -> str:
    """Extract string text from string or multimodal list content."""
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts = []
        for item in content:
            if isinstance(item, dict) and item.get("type") == "text":
                parts.append(str(item.get("text", "")))
            elif isinstance(item, str):
                parts.append(item)
        return " ".join(parts)
    return str(content or "")


def compress_conversation_history(messages: List[Dict[str, Any]], max_tokens_est: int = 2048) -> List[Dict[str, Any]]:
    """
    Sliding Window + Micro-Summary Compressor.
    Preserves system axioms & original user goal, condenses intermediate turns into
    a compact bulleted memory summary, and streams the latest 4 turns verbatim.
    Prevents overflowing the context budget on long sessions while retaining depth.
    Safely handles multimodal messages with image attachments.
    """
    if not messages or len(messages) <= 5:
        return messages

    total_chars = sum(len(_extract_text_content(m.get("content", ""))) for m in messages)
    if total_chars < max_tokens_est * 4:
        return messages

    system_msg = messages[0] if messages[0].get("role") == "system" else None
    rest = messages[1:] if system_msg else messages

    if len(rest) <= 4:
        return messages

    initial_turn = rest[0]
    latest_turns = rest[-4:]
    middle_turns = rest[1:-4]

    bullets = []
    for m in middle_turns:
        role = m.get("role", "user")
        snippet = _extract_text_content(m.get("content", "")).strip()[:70].replace("\n", " ")
        if snippet:
            bullets.append(f"{role.capitalize()}: {snippet}...")

    summary_text = "[Conversation Memory Summary]: " + "; ".join(bullets[:5])
    summary_msg = {"role": "system", "content": summary_text}

    compressed = []
    if system_msg:
        compressed.append(system_msg)
    compressed.append(initial_turn)
    compressed.append(summary_msg)
    compressed.extend(latest_turns)
    return compressed



# ==============================================================================
# 3.25 USER WORKSTATION PREFERENCES & STORAGE MANAGEMENT
# ==============================================================================
CONFIG_FILE = os.path.expanduser("~/.vigyan/config.json")

DEFAULT_CONFIG: Dict[str, Any] = {
    "temperature": 0.0,
    "cpu_threads": max(1, min(4, (os.cpu_count() or 4) - 1)),
    "context_window": 2048,
    "font_size": "md",
    "auto_open_canvas": True,
    "hf_token": "",
}


def load_user_config() -> Dict[str, Any]:
    os.makedirs(os.path.expanduser("~/.vigyan"), exist_ok=True)
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
    os.makedirs(os.path.expanduser("~/.vigyan"), exist_ok=True)
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
# 3.3 EMBEDDED LOCAL SOVEREIGN AGENT & NEURO-SYMBOLIC BRIDGE (PORT 8085)
# ==============================================================================
class _NeuroSymbolicHTTPHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass  # Keep console clean

    def _check_auth(self) -> bool:
        import hmac
        token = self.headers.get("X-Vigyan-Token", "")
        if not token:
            auth = self.headers.get("Authorization", "")
            if auth.startswith("Bearer "):
                token = auth[7:].strip()
        if not token and "?" in self.path:
            from urllib.parse import parse_qs, urlparse
            qs = parse_qs(urlparse(self.path).query)
            token = qs.get("token", [""])[0]
        return bool(token and hmac.compare_digest(token, _SESSION_TOKEN))

    def _send_cors(self, status=200, content_type="application/json"):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        origin = self.headers.get("Origin", "")
        if origin.startswith("http://127.0.0.1:") or origin.startswith("http://localhost:") or not origin:
            self.send_header("Access-Control-Allow-Origin", origin if origin else "http://127.0.0.1")
            self.send_header("Access-Control-Allow-Credentials", "true")
        else:
            self.send_header("Access-Control-Allow-Origin", "http://127.0.0.1")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Vigyan-Token")
        self.end_headers()

    def do_OPTIONS(self):
        self._send_cors(200)

    def do_GET(self):
        if self.path.startswith("/health"):
            tel = get_system_telemetry()
            payload = dict(tel)
            payload.update({
                "status": "online",
                "agent": "Vigyan-Sovereign-Neuro-Symbolic-Bridge",
                "llama_server": LLAMA_SUPERVISOR.is_healthy(),
                "sympy": _SYMPY_ENGINE is not None,
                "kuzudb": True,
                "ram_governor": {"active": True, "threshold_pct": 88.0},
                "telemetry": tel,
            })
            self._send_cors(200)
            self.wfile.write(json.dumps(payload).encode("utf-8"))
            return

        # Enforce session token on all internal API endpoints
        if self.path.startswith("/api/"):
            if not self._check_auth():
                self._send_cors(403)
                self.wfile.write(b'{"error":"Forbidden: Invalid or missing X-Vigyan-Token"}')
                return

        if self.path.startswith("/api/models/catalog") or self.path == "/api/models" or self.path.startswith("/api/models?"):
            force = ("refresh=1" in self.path or "refresh=true" in self.path)
            payload = get_models_catalog(force_refresh=force)
            self._send_cors(200)
            self.wfile.write(json.dumps(payload).encode("utf-8"))
            return

        if self.path.startswith("/api/models/download/status") or self.path.startswith("/api/models/downloads"):
            payload = _DOWNLOAD_MGR.get_status()
            self._send_cors(200)
            self.wfile.write(json.dumps(payload).encode("utf-8"))
            return

        if self.path.startswith("/api/settings"):
            cfg = load_user_config()
            cfg["max_cpu_threads"] = os.cpu_count() or 4
            cfg["hardware"] = _STATIC_HW_CACHE or _discover_static_hardware()
            self._send_cors(200)
            self.wfile.write(json.dumps(cfg).encode("utf-8"))
            return

        if self.path.startswith("/api/storage"):
            stats = get_storage_stats()
            self._send_cors(200)
            self.wfile.write(json.dumps(stats).encode("utf-8"))
            return
        else:
            # Universal cross-platform static file serving (dist/ priority then src/)
            clean_path = self.path.split("?")[0]
            base_dir = os.path.dirname(os.path.abspath(__file__))
            dist_dir = os.path.join(base_dir, "dist")
            if clean_path in ("/", "/index.html", "/chat"):
                target_dist = os.path.join(dist_dir, "index.html")
                target_file = target_dist if os.path.isfile(target_dist) else os.path.join(base_dir, "index.html")
                if os.path.isfile(target_file):
                    self._send_cors(200, content_type="text/html; charset=utf-8")
                    with open(target_file, "rb") as f:
                        html_bytes = f.read()
                    token_script = f"""<script>
window.VIGYAN_TOKEN = '{_SESSION_TOKEN}';
window.AGENT_HOST = 'http://127.0.0.1:{self.server.server_port}';
try {{ localStorage.setItem('vigyan_token', '{_SESSION_TOKEN}'); localStorage.setItem('vigyan_agent_host', 'http://127.0.0.1:{self.server.server_port}'); }} catch(e) {{}}
</script>""".encode("utf-8")
                    if b"<head>" in html_bytes:
                        html_bytes = html_bytes.replace(b"<head>", b"<head>\n" + token_script, 1)
                    elif b"<html" in html_bytes:
                        html_bytes = token_script + html_bytes
                    self.wfile.write(html_bytes)
                    return
            elif clean_path.startswith(("/vendor/", "/assets/")):
                rel = clean_path.lstrip("/")
                target_dist = os.path.join(dist_dir, rel)
                target_file = target_dist if os.path.isfile(target_dist) else os.path.join(base_dir, rel)
                norm_target = os.path.realpath(target_file)
                if not (norm_target.startswith(os.path.realpath(dist_dir)) or norm_target.startswith(os.path.realpath(base_dir))):
                    self._send_cors(403)
                    self.wfile.write(b'{"error":"Forbidden: Path traversal blocked"}')
                    return
                if os.path.isfile(target_file):
                    ctype = "application/octet-stream"
                    if clean_path.endswith(".js"):
                        ctype = "application/javascript"
                    elif clean_path.endswith(".css"):
                        ctype = "text/css"
                    elif clean_path.endswith(".woff2"):
                        ctype = "font/woff2"
                    elif clean_path.endswith(".png"):
                        ctype = "image/png"
                    elif clean_path.endswith((".jpg", ".jpeg")):
                        ctype = "image/jpeg"
                    elif clean_path.endswith(".svg"):
                        ctype = "image/svg+xml"
                    self._send_cors(200, content_type=ctype)
                    with open(target_file, "rb") as f:
                        self.wfile.write(f.read())
                    return
            self._send_cors(404)
            self.wfile.write(b'{"error":"not found"}')

    def do_POST(self):
        # Enforce session token on all internal API endpoints
        if self.path.startswith("/api/"):
            if not self._check_auth():
                self._send_cors(403)
                self.wfile.write(b'{"error":"Forbidden: Invalid or missing X-Vigyan-Token"}')
                return

        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"
        try:
            body = json.loads(raw)
        except Exception:
            body = {}

        if self.path.startswith("/api/settings"):
            updated = save_user_config(body)
            if "cpu_threads" in body and hasattr(LLAMA_SUPERVISOR, "_threads"):
                LLAMA_SUPERVISOR._threads = body["cpu_threads"]
            if "context_window" in body and hasattr(LLAMA_SUPERVISOR, "_ctx_size"):
                LLAMA_SUPERVISOR._ctx_size = body["context_window"]
            self._send_cors(200)
            self.wfile.write(json.dumps({"success": True, "settings": updated}).encode("utf-8"))
            return

        if self.path == "/api/models/download/pause" or self.path.startswith("/api/models/download/pause"):
            tag = body.get("tag") or body.get("filename")
            ok = _DOWNLOAD_MGR.pause_download(tag) if tag else False
            self._send_cors(200 if ok else 400)
            self.wfile.write(json.dumps({"success": ok, "tag": tag}).encode("utf-8"))
            return

        if self.path == "/api/models/download/resume" or self.path.startswith("/api/models/download/resume"):
            tag = body.get("tag") or body.get("filename")
            ok = _DOWNLOAD_MGR.resume_download(tag) if tag else False
            self._send_cors(200 if ok else 400)
            self.wfile.write(json.dumps({"success": ok, "tag": tag}).encode("utf-8"))
            return

        if self.path == "/api/models/download/cancel" or self.path.startswith("/api/models/download/cancel"):
            tag = body.get("tag") or body.get("filename")
            remove_part = body.get("remove_part", True)
            ok = _DOWNLOAD_MGR.cancel_download(tag, remove_part=remove_part) if tag else False
            self._send_cors(200 if ok else 400)
            self.wfile.write(json.dumps({"success": ok, "tag": tag}).encode("utf-8"))
            return

        if self.path == "/api/models/catalog/refresh" or self.path.startswith("/api/models/catalog/refresh"):
            payload = get_models_catalog(force_refresh=True)
            self._send_cors(200)
            self.wfile.write(json.dumps(payload).encode("utf-8"))
            return

        if self.path.startswith("/api/models/download"):
            filename = body.get("filename") or body.get("name")
            target_item = None
            catalog = get_models_catalog()
            for m in catalog.get("models", []):
                if (m.get("filename") == filename or m.get("id") == filename or 
                    m.get("name") == filename or m.get("tag") == filename):
                    target_item = m
                    break
            if not target_item and filename in MODELS_CATALOG:
                target_item = MODELS_CATALOG[filename]
            if not target_item:
                target_item = {
                    "filename": filename,
                    "name": filename,
                    "hf_url": body.get("hf_url") or f"https://huggingface.co/Experimentlab/Vigyan-Models-GGUF/resolve/main/{filename}?download=true",
                    "size_bytes": body.get("size_bytes", 1_400_000_000)
                }
            res = _DOWNLOAD_MGR.start_download(target_item)
            self._send_cors(200)
            self.wfile.write(json.dumps(res).encode("utf-8"))
            return

        if self.path.startswith("/api/models/swap"):
            filename = body.get("filename")
            models_dir = os.path.expanduser("~/.vigyan/models")
            target_path = os.path.join(models_dir, filename) if filename else ""
            if not os.path.isfile(target_path):
                vl4b_path = os.path.join(models_dir, "vl4b", filename) if filename else ""
                if os.path.isfile(vl4b_path):
                    target_path = vl4b_path

            if not os.path.isfile(target_path):
                self._send_cors(404)
                self.wfile.write(json.dumps({"success": False, "error": f"Model not found on disk: {filename}"}).encode("utf-8"))
                return

            # Pre-flight RAM safety check: protect host from OOM lockups
            try:
                from llama_supervisor import get_available_memory_gb, detect_hardware_profile
                model_sz_gb = os.path.getsize(target_path) / (1024 ** 3)
                avail_gb = get_available_memory_gb()
                hw = detect_hardware_profile()
                if hw.get("tier") == "cpu_budget" and model_sz_gb > (avail_gb + 0.5) and model_sz_gb > 5.0:
                    self._send_cors(422)
                    self.wfile.write(json.dumps({
                        "success": False,
                        "error": f"Activation prevented to protect your PC from freezing: {filename} requires ~{model_sz_gb:.1f} GB RAM, but only {avail_gb:.1f} GB is currently available."
                    }).encode("utf-8"))
                    return
            except Exception:
                pass

            prev_model = LLAMA_SUPERVISOR.model_path
            try:
                LLAMA_SUPERVISOR.swap_model(target_path)
                self._send_cors(200)
                self.wfile.write(json.dumps({"success": True, "active_model": filename}).encode("utf-8"))
            except Exception as exc:
                logger.error("Failed to swap model to %s: %s. Reverting to previous model...", filename, exc)
                reverted = False
                if prev_model and os.path.isfile(prev_model) and prev_model != target_path:
                    try:
                        LLAMA_SUPERVISOR.swap_model(prev_model)
                        reverted = True
                    except Exception:
                        pass
                self._send_cors(500)
                err_msg = f"Failed to activate {filename}: {exc}"
                if reverted:
                    err_msg += f" (Reverted to {os.path.basename(prev_model)})"
                self.wfile.write(json.dumps({
                    "success": False,
                    "error": err_msg,
                    "reverted_to": os.path.basename(prev_model) if reverted else None
                }).encode("utf-8"))
            return

        if self.path.startswith("/api/models/purge"):
            try:
                models_dir = os.path.expanduser("~/.vigyan/models")
                reclaimed_bytes = 0
                
                # Stop supervisor
                LLAMA_SUPERVISOR.stop()
                time.sleep(0.3)

                if os.path.isdir(models_dir):
                    for root, _, files in os.walk(models_dir):
                        for f in files:
                            if f.endswith(".gguf") or f.endswith(".part"):
                                fp = os.path.join(root, f)
                                try:
                                    sz = os.path.getsize(fp)
                                    os.remove(fp)
                                    reclaimed_bytes += sz
                                except Exception:
                                    pass

                reclaimed_gb = round(reclaimed_bytes / (1024 ** 3), 2)
                self._send_cors(200)
                self.wfile.write(json.dumps({
                    "success": True,
                    "reclaimed_bytes": reclaimed_bytes,
                    "reclaimed_formatted": f"{reclaimed_gb} GB"
                }).encode("utf-8"))
            except Exception as exc:
                self._send_cors(500)
                self.wfile.write(json.dumps({"success": False, "error": str(exc)}).encode("utf-8"))
            return

        if self.path.startswith("/api/models/delete"):
            filename = body.get("filename")
            models_dir = os.path.expanduser("~/.vigyan/models")
            target_path = os.path.join(models_dir, filename) if filename else ""
            if not os.path.isfile(target_path):
                vl4b_path = os.path.join(models_dir, "vl4b", filename) if filename else ""
                if os.path.isfile(vl4b_path):
                    target_path = vl4b_path

            part_path = target_path + ".part" if target_path else ""

            if not os.path.isfile(target_path) and not (part_path and os.path.isfile(part_path)):
                self._send_cors(404)
                self.wfile.write(json.dumps({"success": False, "error": f"Model file not found on disk: {filename}"}).encode("utf-8"))
                return

            try:
                # Cancel any active download in manager
                _DOWNLOAD_MGR.cancel_download(filename, remove_part=True)

                active_model = LLAMA_SUPERVISOR.model_path
                is_active = active_model and (os.path.basename(active_model) == os.path.basename(target_path))
                if is_active:
                    LLAMA_SUPERVISOR.stop()
                    time.sleep(0.3)

                reclaimed_bytes = 0
                if os.path.isfile(target_path):
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

                next_active = None
                if is_active:
                    catalog = get_models_catalog()
                    installed = [
                        m for m in catalog.get("models", [])
                        if m.get("is_installed") and m.get("filename") != filename
                    ]
                    if installed:
                        installed.sort(key=lambda m: (
                            0 if "3b-quad-master" in m.get("filename", "") else
                            1 if "2b-stem" in m.get("filename", "") else
                            2 if "1.5b" in m.get("filename", "") else 3
                        ))
                        next_model_file = os.path.join(models_dir, installed[0]["filename"])
                        if os.path.isfile(next_model_file):
                            try:
                                LLAMA_SUPERVISOR.swap_model(next_model_file)
                                next_active = installed[0]["filename"]
                            except Exception as swap_err:
                                logger.warning("Failover swap failed: %s", swap_err)

                self._send_cors(200)
                self.wfile.write(json.dumps({
                    "success": True,
                    "reclaimed_bytes": reclaimed_bytes,
                    "reclaimed_formatted": f"{round(reclaimed_bytes / (1024**3), 2)} GB",
                    "next_active": next_active
                }).encode("utf-8"))
            except Exception as exc:
                self._send_cors(500)
                self.wfile.write(json.dumps({"success": False, "error": str(exc)}).encode("utf-8"))
            return

        if self.path.startswith("/api/ingest/file"):
            import ingest_engine
            filename = body.get("filename", "document.txt")
            image_b64 = body.get("image_base64", "")
            pdf_b64 = body.get("pdf_base64", "")
            content = body.get("content", "")

            raw_text = content
            if image_b64:
                try:
                    img_bytes = base64.b64decode(image_b64)
                    raw_text = ingest_engine.extract_text_from_image_bytes(img_bytes)
                except Exception:
                    raw_text = ""
            elif pdf_b64:
                try:
                    pdf_bytes = base64.b64decode(pdf_b64)
                    raw_text = ingest_engine.extract_text_from_pdf_bytes(pdf_bytes)
                except Exception:
                    raw_text = ""

            res = ingest_engine.analyze_ingested_content(filename, raw_text)
            self._send_cors(200)
            self.wfile.write(json.dumps(res).encode("utf-8"))
            return

        if self.path.startswith("/api/chat") or self.path.startswith("/api/agent/stream"):
            telemetry = get_system_telemetry()
            user_query = (body.get("query") or body.get("message") or "").strip()
            requested_model = body.get("model") or "auto"

            attachment = body.get("attachment")
            images = body.get("images") or []
            has_image = False
            image_data_uri = None

            if isinstance(attachment, dict) and attachment.get("data"):
                has_image = True
                raw_data = str(attachment["data"])
                if raw_data.startswith("data:image/"):
                    image_data_uri = raw_data
                else:
                    mime = attachment.get("type") or "image/jpeg"
                    image_data_uri = f"data:{mime};base64,{raw_data}"
            elif images and isinstance(images, list) and len(images) > 0:
                has_image = True
                raw_img = str(images[0])
                if raw_img.startswith("data:image/"):
                    image_data_uri = raw_img
                else:
                    image_data_uri = f"data:image/jpeg;base64,{raw_img}"

            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream")
            self.send_header("Cache-Control", "no-cache, no-transform")
            self.send_header("Connection", "keep-alive")
            self.send_header("X-Accel-Buffering", "no")
            origin = self.headers.get("Origin", "")
            if origin.startswith("http://127.0.0.1:") or origin.startswith("http://localhost:") or origin == "null" or not origin:
                self.send_header("Access-Control-Allow-Origin", origin if origin else "http://127.0.0.1")
                self.send_header("Access-Control-Allow-Credentials", "true")
            else:
                self.send_header("Access-Control-Allow-Origin", "http://127.0.0.1")
            self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Vigyan-Token")
            self.end_headers()

            enrichment = enrich_stem_query(user_query)

            stream_lock = threading.Lock()
            client_connected = [True]

            def _emit(event: str, data_obj: Any) -> bool:
                if not client_connected[0]:
                    return False
                chunk = f"event: {event}\ndata: {json.dumps(data_obj)}\n\n"
                with stream_lock:
                    try:
                        self.wfile.write(chunk.encode("utf-8"))
                        self.wfile.flush()
                        return True
                    except (BrokenPipeError, ConnectionResetError, IOError):
                        client_connected[0] = False
                        return False
                    except Exception:
                        return False

            # Grounding and axioms
            if enrichment.get("sympy"):
                s = enrichment["sympy"]
                _emit("sympy", f"$${s.get('latex', s.get('result'))}$$")
                _emit("think", f"SymPy AST Verified: {s.get('expression')} => {s.get('result')}\n")
                _emit("tool_result", {
                    "tool": "sympy_eval",
                    "success": True,
                    "expression": s.get("expression"),
                    "result": s.get("result"),
                    "latex": s.get("latex"),
                    "numeric_approx": s.get("numeric_approx")
                })
            if enrichment.get("graph_axioms"):
                cites = [f"[{a['domain']}: {a['law']}] {a['equation']}" for a in enrichment["graph_axioms"]]
                _emit("memory", "<br>• " + "<br>• ".join(cites))

            sys_prompt = (
                "You are Vigyan AI, a sovereign STEM, math, and physics intelligence system architected by Shreyansh Singh. "
                "Solve problems with mathematical precision, concise explanations, and clean LaTeX ($$...$$). Be direct, rigorous, and professional. "
                "When requested to synthesize digital bus waveforms, PCB netlists, or verify mathematical plots and formulas, emit structured <tool_call> JSON specifications."
            )
            if enrichment.get("sympy"):
                s = enrichment["sympy"]
                sys_prompt += f"\n[SymPy Verified Grounding]: {s.get('expression')} = {s.get('result')}"

            # Sovereign Offline Engine with RAM Governor
            cascade = select_cascade_model(requested_model, user_query, has_image=has_image)
            active_model = cascade["model"]
            _emit("cascade_tier", cascade)
            if cascade.get("downgraded"):
                _emit("tier_downgrade", cascade)
                _emit("think", f"[RAM Guard]: System routed to {active_model} Sovereign Engine.\n")

            # Multimodal Vision Routing & Auto-Swap
            if has_image:
                current_model_path = (LLAMA_SUPERVISOR.model_path or "").lower()
                current_is_vl = "vl" in os.path.basename(current_model_path)
                if not current_is_vl:
                    vl_candidates = [
                        os.path.expanduser("~/.vigyan/models/vigyan-vl-4b-iq3_m.gguf"),
                        os.path.expanduser("~/.vigyan/models/vl4b/vigyan-vl-4b-iq3_m.gguf"),
                        os.path.join(os.getcwd(), "models", "vigyan-vl-4b-iq3_m.gguf"),
                    ]
                    found_vl = next((p for p in vl_candidates if os.path.isfile(p)), None)
                    if found_vl:
                        _emit("think", "[Vision Router]: Swapping engine to Vigyan-VL-4B for image and schematic analysis...\n")
                        LLAMA_SUPERVISOR.swap_model(found_vl)
                    else:
                        _emit("token", "**Notice**: Image and schematic reasoning requires the **Vigyan-VL-4B Multimodal** engine.\n\nPlease open the **Models** tab and click Download on **Vigyan-VL-4B**, or run `vigyan pull 4b` in your terminal.\n")
                        _emit("done", {})
                        return

            try:
                user_cfg = load_user_config()
                user_ctx = None
                try:
                    if body.get("num_ctx"):
                        user_ctx = int(body.get("num_ctx"))
                    elif body.get("options", {}).get("num_ctx"):
                        user_ctx = int(body.get("options", {}).get("num_ctx"))
                except Exception:
                    user_ctx = None

                # RAM-Safe Dynamic Context Budget Clamping
                target_ctx = user_ctx or user_cfg.get("context_window", 2048)
                avail_ram = telemetry.get("ram_avail_gb", 4.0)
                if target_ctx > 8192 and avail_ram < 5.0:
                    target_ctx = 8192
                if target_ctx > 4096 and avail_ram < 2.0:
                    target_ctx = 4096
                if target_ctx > 2048 and avail_ram < 1.0:
                    target_ctx = 2048

                if has_image and image_data_uri:
                    user_msg_content: Any = [
                        {"type": "text", "text": user_query or "Analyze this image in detail and explain the components, equations, or structures."},
                        {"type": "image_url", "image_url": {"url": image_data_uri}}
                    ]
                else:
                    user_msg_content = user_query

                raw_messages = body.get("messages") or []
                if raw_messages:
                    if has_image and image_data_uri:
                        if raw_messages[-1].get("role") == "user":
                            raw_messages[-1]["content"] = user_msg_content
                        else:
                            raw_messages.append({"role": "user", "content": user_msg_content})
                    full_msgs = [{"role": "system", "content": sys_prompt}] + raw_messages
                    model_messages = compress_conversation_history(full_msgs, max_tokens_est=target_ctx)
                else:
                    model_messages = [
                        {"role": "system", "content": sys_prompt},
                        {"role": "user", "content": user_msg_content},
                    ]
                user_temp = body.get("temperature")
                if user_temp is None:
                    user_temp = body.get("options", {}).get("temperature")
                if user_temp is None:
                    user_temp = user_cfg.get("temperature", 0.0)
                try:
                    user_temp = max(0.0, min(2.0, float(user_temp)))
                except Exception:
                    user_temp = 0.0

                # Verified stop sequences and generation parameters
                stop_sequences = [
                    "<|im_start|>",
                    "<|im_end|>",
                    "<|endoftext|>",
                    "</sstream>",
                    "</solution>",
                    "User:",
                    "\n\nUser",
                    "Human:"
                ]

                is_active_vl = has_image or "vl" in os.path.basename(LLAMA_SUPERVISOR.model_path or "").lower()
                openai_payload = {
                    "model": "vigyan-vl-4b" if is_active_vl else "vigyan-3b",
                    "messages": model_messages,
                    "temperature": user_temp,
                    "top_p": 0.95,
                    "max_tokens": min(target_ctx, 4096),
                    "stream": True,
                    "stop": stop_sequences,
                    "repeat_penalty": 1.15,
                    "repeat_last_n": 64,
                }

                # Keep-alive silent heartbeat thread to prevent socket drop without user-facing noise
                _emit("status", {"type": "thinking"})
                hb_stop = threading.Event()
                def _heartbeat_worker():
                    step = 0
                    while not hb_stop.is_set():
                        time.sleep(1.5)
                        if hb_stop.is_set():
                            break
                        step += 1
                        _emit("heartbeat", {"type": "ping", "step": step})

                hb_t = threading.Thread(target=_heartbeat_worker, daemon=True)
                hb_t.start()

                governor_tripped = [False]
                def _on_ram_trip(pct):
                    governor_tripped[0] = True
                    _emit("ram_governor_trip", {
                        "ram_percent": pct,
                        "threshold": 92.0,
                        "evicted_model": active_model,
                    })
                    _emit("token", f"\n\n**[RAM Safety Guard]**: System memory reached {pct:.1f}%. Generation was safely stopped to protect your PC from freezing.")

                governor = RAMGovernor(threshold_pct=92.0, interval_sec=0.1)
                governor.start(_on_ram_trip, active_model)

                accumulated_text = ""
                streamed_from_llama = False
                last_llama_exc: Optional[str] = None

                # Ensure embedded llama-server is ready before attempting stream
                if not LLAMA_SUPERVISOR.is_healthy():
                    LLAMA_SUPERVISOR.start()
                    LLAMA_SUPERVISOR.wait_until_ready(timeout=8.0)

                # Primary routing: Embedded llama-server OpenAI endpoint (port 8086)
                try:
                    ls_req = urllib.request.Request(
                        "http://127.0.0.1:8086/v1/chat/completions",
                        headers={"Content-Type": "application/json"},
                        data=json.dumps(openai_payload).encode("utf-8"),
                    )
                    with urllib.request.urlopen(ls_req, timeout=180) as resp:
                        hb_stop.set()
                        _emit("status", {"type": "ready", "message": "Inference stream active"})
                        streamed_from_llama = True
                        for raw_line in resp:
                            if governor_tripped[0] or not client_connected[0]:
                                break
                            line_s = raw_line.decode("utf-8", errors="replace").strip()
                            if not line_s or line_s.startswith(":"):
                                continue
                            if line_s.startswith("data: "):
                                data_part = line_s[6:].strip()
                                if data_part == "[DONE]":
                                    break
                                try:
                                    chunk = json.loads(data_part)
                                    choices = chunk.get("choices", [])
                                    if choices:
                                        delta = choices[0].get("delta", {})
                                        tok = delta.get("content", "")
                                        if tok:
                                            if "</sstream>" in tok or "</solution>" in tok:
                                                clean_tok = tok.replace("</sstream>", "").replace("</solution>", "")
                                                if clean_tok.strip():
                                                    accumulated_text += clean_tok
                                                    _emit("token", clean_tok)
                                                break
                                            accumulated_text += tok
                                            _emit("token", tok)
                                except Exception:
                                    continue
                except Exception as ls_exc:
                    last_llama_exc = str(ls_exc)
                    print(f"[WARN] llama-server stream unavailable: {ls_exc}; trying Ollama fallback", file=sys.stderr)

                if not streamed_from_llama and not governor_tripped[0]:
                    # Fallback to local Ollama daemon if available
                    try:
                        ollama_payload = {
                            "model": active_model,
                            "messages": model_messages,
                            "options": {
                                "num_gpu": telemetry.get("gpu", {}).get("num_gpu", 0),
                                "num_thread": user_cfg.get("cpu_threads", 4),
                                "num_ctx": target_ctx,
                                "num_batch": 256,
                                "num_predict": min(target_ctx, 4096),
                                "repeat_penalty": 1.15,
                                "repeat_last_n": 64,
                                "temperature": user_temp,
                                "stop": stop_sequences,
                            },
                            "stream": True,
                        }
                        req = urllib.request.Request(
                            "http://127.0.0.1:11434/api/chat",
                            headers={"Content-Type": "application/json"},
                            data=json.dumps(ollama_payload).encode("utf-8"),
                        )
                        with urllib.request.urlopen(req, timeout=180) as resp:
                            hb_stop.set()
                            _emit("status", {"type": "ready", "message": "Inference stream active (fallback)"})
                            for line in resp:
                                if governor_tripped[0] or not client_connected[0]:
                                    break
                                line_s = line.decode("utf-8").strip()
                                if not line_s:
                                    continue
                                chunk = json.loads(line_s)
                                tok = chunk.get("message", {}).get("content", "")
                                if tok:
                                    if "</sstream>" in tok or "</solution>" in tok:
                                        clean_tok = tok.replace("</sstream>", "").replace("</solution>", "")
                                        if clean_tok.strip():
                                            accumulated_text += clean_tok
                                            _emit("token", clean_tok)
                                        break
                                    accumulated_text += tok
                                    _emit("token", tok)
                    except Exception as ollama_exc:
                        hb_stop.set()
                        if enrichment.get("sympy"):
                            s = enrichment["sympy"]
                            fallback = (
                                f"### Exact Closed-Form Symbolic Solution\n\n"
                                f"**Evaluated AST:** `{s.get('expression')}`\n\n"
                                f"$$\\mathbf{{{s.get('latex')}}}$$\n\n"
                                f"**Numerical Approximation:** `{s.get('numeric_approx')}`\n"
                            )
                            _emit("token", fallback)
                        elif enrichment.get("graph_axioms"):
                            ax = enrichment["graph_axioms"][0]
                            fallback = (
                                f"### {ax['law']} ({ax['domain']})\n\n"
                                f"$$\\mathbf{{{ax['equation']}}}$$\n\n"
                                f"{ax['axiom']}\n"
                            )
                            _emit("token", fallback)
                        else:
                            _emit("token", f"[Neuro-Symbolic Engine Initializing: {last_llama_exc or 'Inference server starting...'}]")

                governor.stop()
                hb_stop.set()
                self._parse_and_execute_tools(accumulated_text, _emit)

            except Exception as exc:
                if enrichment.get("sympy"):
                    s = enrichment["sympy"]
                    fallback = (
                        f"### Exact Closed-Form Symbolic Solution\n\n"
                        f"**Evaluated AST:** `{s.get('expression')}`\n\n"
                        f"$$\\mathbf{{{s.get('latex')}}}$$\n\n"
                        f"**Numerical Approximation:** `{s.get('numeric_approx')}`\n"
                    )
                    _emit("token", fallback)
                elif enrichment.get("graph_axioms"):
                    ax = enrichment["graph_axioms"][0]
                    fallback = (
                        f"### {ax['law']} ({ax['domain']})\n\n"
                        f"$$\\mathbf{{{ax['equation']}}}$$\n\n"
                        f"{ax['axiom']}\n"
                    )
                    _emit("token", fallback)
                else:
                    _emit("token", f"[Neuro-Symbolic Notice: {exc}]")

            _emit("done", {})
            self.close_connection = True
            return

        self._send_cors(404)
        self.wfile.write(b'{"error":"unknown endpoint"}')

    def _parse_and_execute_tools(self, text: str, emit_fn):
        tool_matches = re.findall(r"<tool_call>(.*?)</tool_call>", text, re.DOTALL)
        for t_str in tool_matches:
            try:
                t_data = json.loads(t_str.strip())
                t_name = t_data.get("name")
                t_args = t_data.get("arguments", {})
                if t_name == "sympy_eval":
                    expr = t_args.get("expression", "")
                    if _SYMPY_ENGINE:
                        eval_res = _SYMPY_ENGINE.evaluate_expression(expr)
                        emit_fn("sympy", f"$${eval_res.get('latex', eval_res.get('result'))}$$")
                        emit_fn("tool_result", {
                            "tool": "sympy_eval",
                            "success": True,
                            "expression": expr,
                            "result": eval_res.get("result", ""),
                            "latex": eval_res.get("latex", ""),
                            "numeric": eval_res.get("numeric_approx", "")
                        })
                elif t_name == "plot_function":
                    expr = t_args.get("expression", "x**2")
                    x_min = t_args.get("x_min", -10.0)
                    x_max = t_args.get("x_max", 10.0)
                    pts = t_args.get("points", 200)
                    title = t_args.get("title", "")
                    x_lbl = t_args.get("x_label", "x")
                    y_lbl = t_args.get("y_label", "y")
                    plot_res = evaluate_plot(expr, x_min, x_max, pts, title, x_lbl, y_lbl)
                    emit_fn("tool_result", plot_res)
            except Exception:
                pass


def start_neuro_symbolic_bridge_server(port: int = 8085) -> Optional[int]:
    """Start embedded Neuro-Symbolic HTTP server on port 8085 (hunting up to port+20)."""
    for candidate_port in range(port, port + 20):
        try:
            server = ThreadingHTTPServer(("127.0.0.1", candidate_port), _NeuroSymbolicHTTPHandler)
            t = threading.Thread(target=server.serve_forever, daemon=True)
            t.start()
            return candidate_port
        except OSError:
            continue
    return None


# ==============================================================================
# 4. OLLAMA DAEMON SUPERVISOR & WEBKITGTK WORKSTATION SHELL
# ==============================================================================
_init_cfg = load_user_config()
LLAMA_SUPERVISOR = LlamaServerSupervisor(
    port=8086,
    threads=_init_cfg.get("cpu_threads"),
    ctx_size=_init_cfg.get("context_window")
)


def ensure_llama_server() -> None:
    """Make sure the embedded llama-server micro-daemon is running."""
    try:
        if not LLAMA_SUPERVISOR.is_healthy():
            LLAMA_SUPERVISOR.start()
    except Exception as exc:
        print(f"[WARN] could not start llama-server: {exc}", file=sys.stderr)


def _watch_llama_server() -> bool:
    """GLib timer callback: restart a crashed llama-server child. True keeps the timer."""
    LLAMA_SUPERVISOR.check()
    return True


# Backward compatibility shims
OLLAMA = LLAMA_SUPERVISOR
ensure_ollama_daemon = ensure_llama_server
_watch_ollama = _watch_llama_server


def main():
    # Lower process priority to nice 10 to yield CPU cycles to foreground user apps
    try:
        os.nice(10)
    except Exception:
        pass

    if "--server-only" in sys.argv:
        _discover_static_hardware()
        ensure_llama_server()
        bridge_port = start_neuro_symbolic_bridge_server(8085) or 8085
        print(f"[Vigyan Pro] Bridge server active at http://127.0.0.1:{bridge_port}/")
        try:
            while True:
                time.sleep(1)
        except (KeyboardInterrupt, SystemExit):
            pass
        finally:
            LLAMA_SUPERVISOR.stop()
        return

    if "--browser" in sys.argv:
        _discover_static_hardware()
        ensure_llama_server()
        bridge_port = start_neuro_symbolic_bridge_server(8085) or 8085
        url = f"http://127.0.0.1:{bridge_port}/"
        print(f"[Vigyan Pro] Opening {url} in default browser...")
        import webbrowser
        webbrowser.open(url)
        try:
            while True:
                time.sleep(1)
        except (KeyboardInterrupt, SystemExit):
            pass
        finally:
            LLAMA_SUPERVISOR.stop()
        return

    try:
        try:
            import gi
        except ImportError:
            for _p in ("/usr/lib/python3.14/site-packages", "/usr/lib/python3.13/site-packages", "/usr/lib/python3/dist-packages", "/usr/lib64/python3.14/site-packages"):
                if os.path.isdir(_p) and _p not in sys.path:
                    sys.path.append(_p)
            import gi
        gi.require_version('Gtk', '3.0')
        gi.require_version('WebKit2', '4.1')
        from gi.repository import Gtk, WebKit2, Gdk, GdkPixbuf, GLib
    except Exception as gtk_err:
        print(f"[Vigyan Pro] WebKitGTK 4.1 runtime unavailable ({gtk_err}). Launching in Frameless App Mode...", file=sys.stderr)
        _discover_static_hardware()
        ensure_llama_server()
        bridge_port = start_neuro_symbolic_bridge_server(8085) or 8085
        url = f"http://127.0.0.1:{bridge_port}/"

        # Search for Chromium-family browser to run in isolated chromeless app mode
        for b_name in ("google-chrome", "google-chrome-stable", "chromium", "brave-browser", "brave", "microsoft-edge"):
            b_path = shutil.which(b_name)
            if b_path:
                app_data = os.path.expanduser("~/.cache/vigyan-app-mode")
                os.makedirs(app_data, exist_ok=True)
                cmd = [
                    b_path,
                    f"--app={url}",
                    "--window-size=1340,740",
                    "--class=vigyan-pro",
                    "--name=Vigyan Pro",
                    f"--user-data-dir={app_data}",
                    "--force-dark-mode"
                ]
                try:
                    subprocess.run(cmd)
                finally:
                    LLAMA_SUPERVISOR.stop()
                return

        # Fallback to default browser
        import webbrowser
        webbrowser.open(url)
        try:
            while True:
                time.sleep(1)
        except (KeyboardInterrupt, SystemExit):
            pass
        finally:
            LLAMA_SUPERVISOR.stop()
        return

    # Exit through the GTK main loop so the cleanup after Gtk.main() always runs.
    try:
        from gi.repository import GLibUnix
        GLibUnix.signal_add(GLib.PRIORITY_DEFAULT, signal.SIGINT, Gtk.main_quit)
        GLibUnix.signal_add(GLib.PRIORITY_DEFAULT, signal.SIGTERM, Gtk.main_quit)
    except Exception:
        GLib.unix_signal_add(GLib.PRIORITY_DEFAULT, signal.SIGINT, Gtk.main_quit)
        GLib.unix_signal_add(GLib.PRIORITY_DEFAULT, signal.SIGTERM, Gtk.main_quit)

    # Wayland / XDG application identity mapping
    GLib.set_prgname("vigyan-pro")
    GLib.set_application_name("Vigyan Pro")

    # Initialize hardware topology cache, Ollama daemon, and Neuro-Symbolic bridge
    _discover_static_hardware()
    ensure_llama_server()
    bridge_port = start_neuro_symbolic_bridge_server(8085) or 8085

    win = Gtk.Window(type=Gtk.WindowType.TOPLEVEL)
    win.set_title("Vigyan Pro")
    win.set_role("vigyan-pro")
    win.set_default_size(1340, 740)
    win.set_position(Gtk.WindowPosition.CENTER)

    # Modern CSS Provider for pitch-black background
    css_provider = Gtk.CssProvider()
    css_provider.load_from_data(b"window { background-color: #000000; }")
    win.get_style_context().add_provider(css_provider, Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION)

    # Icon resolution
    base_dir = os.path.dirname(os.path.abspath(__file__))
    icon_candidates = [
        os.path.join(base_dir, "..", "assets", "micro_logo_v.png"),
        os.path.join(base_dir, "assets", "micro_logo_v.png"),
        "/opt/vigyan-pro/assets/micro_logo_v.png",
        "/usr/share/icons/hicolor/256x256/apps/vigyan-pro.png",
        os.path.expanduser("~/.local/share/icons/hicolor/256x256/apps/vigyan-pro.png"),
        os.path.expanduser("~/.vigyan/build/favicon.png")
    ]
    icon_path = next((p for p in icon_candidates if os.path.exists(p)), None)
    if icon_path:
        try:
            pixbuf = GdkPixbuf.Pixbuf.new_from_file(icon_path)
            win.set_icon(pixbuf)
            Gtk.Window.set_default_icon(pixbuf)
            win.set_icon_name("vigyan-pro")
        except Exception:
            pass

    # WebKit Settings & UserContentManager IPC
    settings = WebKit2.Settings()
    settings.set_enable_javascript(True)
    settings.set_enable_webgl(True)
    settings.set_enable_write_console_messages_to_stdout(True)
    settings.set_allow_file_access_from_file_urls(True)
    settings.set_allow_universal_access_from_file_urls(True)
    settings.set_enable_smooth_scrolling(True)
    try:
        settings.set_hardware_acceleration_policy(WebKit2.HardwareAccelerationPolicy.ALWAYS)
    except Exception:
        pass

    ucm = WebKit2.UserContentManager()

    def _eval_js(js_code: str):
        if hasattr(webview, "evaluate_javascript"):
            webview.evaluate_javascript(js_code, -1, None, None, None, None, None)
        else:
            webview.run_javascript(js_code, None, None, None)

    # Native IPC Message Handler (Bidirectional Communication: Telemetry, Hybrid Mode, Neuro-Symbolic AST/GraphRAG)
    def on_script_message(manager, js_result):
        try:
            val = js_result.get_js_value() if hasattr(js_result, "get_js_value") else js_result.to_value()
            if val and val.is_string():
                data = json.loads(val.to_string())
                action = data.get("action") or data.get("cmd")
                if action == "get_telemetry":
                    stats = get_system_telemetry()
                    _eval_js(f"window.onNativeTelemetry && window.onNativeTelemetry({json.dumps(stats)});")
                elif action == "set_compute_mode":
                    mode = data.get("mode", "auto")
                    stats = get_system_telemetry(override_mode=mode)
                    _eval_js(f"window.onNativeTelemetry && window.onNativeTelemetry({json.dumps(stats)});")
                elif action in ("neuro_symbolic_query", "enrich"):
                    req_id = data.get("reqId", "")
                    query_str = data.get("query", "")
                    enriched = enrich_stem_query(query_str)
                    enriched["reqId"] = req_id
                    _eval_js(f"window.__onNeuroSymbolicResult && window.__onNeuroSymbolicResult({json.dumps(enriched)});")
        except Exception as e:
            print(f"[IPC ERR] {e}", file=sys.stderr)

    ucm.register_script_message_handler("nativeHost")
    ucm.connect("script-message-received::nativeHost", on_script_message)

    # WebKit View
    webview = WebKit2.WebView.new_with_user_content_manager(ucm)
    webview.set_settings(settings)
    webview.set_background_color(Gdk.RGBA(0, 0, 0, 1))

    # Periodic Hardware Telemetry Broadcast (every 3 seconds, <0.2ms sysfs read)
    def _push_telemetry():
        try:
            stats = get_system_telemetry()
            _eval_js(f"window.onNativeTelemetry && window.onNativeTelemetry({json.dumps(stats)});")
        except Exception:
            pass
        return True

    GLib.timeout_add_seconds(3, _push_telemetry)

    # Enterprise Navigation Policy: Prevent webview URL hijacking / unauthorized redirection
    def on_decide_policy(view, decision, decision_type):
        if decision_type == WebKit2.PolicyDecisionType.NAVIGATION_ACTION:
            action = decision.get_navigation_action()
            req = action.get_request()
            uri = req.get_uri() if req else ""
            if uri.startswith(f"http://127.0.0.1:{bridge_port}") or uri.startswith(f"http://localhost:{bridge_port}") or uri.startswith("file://") or uri.startswith("about:blank"):
                return False
            decision.ignore()
            try:
                import webbrowser
                webbrowser.open(uri)
            except Exception:
                pass
            return True
        return False

    webview.connect("decide-policy", on_decide_policy)

    # Load embedded local sovereign bridge directly (avoids file:// null-origin sandbox restrictions)
    webview.load_uri(f"http://127.0.0.1:{bridge_port}/")

    # Push initial telemetry and sync bridge port + security token as soon as page finishes loading
    def on_load_finished(view, event):
        if event == WebKit2.LoadEvent.FINISHED:
            _eval_js(
                f"window.VIGYAN_TOKEN = '{_SESSION_TOKEN}'; "
                f"window.AGENT_HOST = 'http://127.0.0.1:{bridge_port}'; "
                f"try {{ "
                f"  localStorage.setItem('vigyan_token', '{_SESSION_TOKEN}'); "
                f"  localStorage.setItem('vigyan_agent_host', 'http://127.0.0.1:{bridge_port}'); "
                f"}} catch(e){{}}"
            )
            GLib.timeout_add(300, lambda: (_push_telemetry() and False))

    webview.connect("load-changed", on_load_finished)

    # Keyboard shortcuts: F11 Fullscreen, Ctrl+R Reload, Ctrl + / - / 0 Zoom
    def on_key_press(widget, event):
        keyval = event.keyval
        state = event.state
        if keyval == Gdk.KEY_F11:
            if win.get_window().get_state() & Gdk.WindowState.FULLSCREEN:
                win.unfullscreen()
            else:
                win.fullscreen()
            return True
        elif state & Gdk.ModifierType.CONTROL_MASK:
            if keyval in (Gdk.KEY_r, Gdk.KEY_R):
                webview.reload()
                return True
            elif keyval in (Gdk.KEY_plus, Gdk.KEY_equal, Gdk.KEY_KP_Add):
                _eval_js("window.applyUiZoom && window.applyUiZoom((window.uiZoomLevel || 1.0) + 0.1);")
                return True
            elif keyval in (Gdk.KEY_minus, Gdk.KEY_underscore, Gdk.KEY_KP_Subtract):
                _eval_js("window.applyUiZoom && window.applyUiZoom((window.uiZoomLevel || 1.0) - 0.1);")
                return True
            elif keyval in (Gdk.KEY_0, Gdk.KEY_KP_0):
                _eval_js("window.applyUiZoom && window.applyUiZoom(1.0);")
                return True
        return False

    win.connect("key-press-event", on_key_press)
    win.add(webview)
    win.connect("destroy", Gtk.main_quit)

    snapshot_path = None
    if "--snapshot" in sys.argv:
        idx = sys.argv.index("--snapshot")
        if idx + 1 < len(sys.argv):
            snapshot_path = sys.argv[idx + 1]

    if snapshot_path:
        def on_snapshot_done(view, res, target):
            try:
                surface = view.get_snapshot_finish(res)
                surface.write_to_png(target)
                print(f"[OK] Snapshot saved to {target}")
            except Exception as e:
                print(f"[ERR] Snapshot failed: {e}")
            Gtk.main_quit()

        def trigger_snapshot():
            webview.get_snapshot(
                WebKit2.SnapshotRegion.FULL_DOCUMENT,
                WebKit2.SnapshotOptions.NONE,
                None,
                on_snapshot_done,
                snapshot_path
            )
            return False

        def on_load_changed(view, event):
            if event == WebKit2.LoadEvent.FINISHED:
                GLib.timeout_add(1500, trigger_snapshot)

        webview.connect("load-changed", on_load_changed)

    win.show_all()
    win.present()
    GLib.timeout_add_seconds(5, _watch_llama_server)

    # Low-priority background pre-warming for zero-latency first prompt
    def _prewarm_moe():
        time.sleep(2.0)  # Wait for UI window to finish layout
        try:
            pw_req = urllib.request.Request(
                "http://127.0.0.1:8086/health",
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(pw_req, timeout=5.0) as pw_resp:
                if pw_resp.status == 200:
                    print("[INFO] Embedded llama-server is online and warmed.", file=sys.stderr)
        except Exception:
            pass

    threading.Thread(target=_prewarm_moe, daemon=True).start()

    try:
        Gtk.main()
    finally:
        LLAMA_SUPERVISOR.stop()


if __name__ == "__main__":
    main()
