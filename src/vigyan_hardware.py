"""
Vigyan Pro Workstation — Hardware Profiler, Telemetry & RAM Governor (v5.0.8)
Split from launch_desktop.py: hybrid GPU+CPU allocator, hardware discovery,
system telemetry, and the out-of-memory safety governor.
"""

import os
import re
import glob
import shutil
import sys
import subprocess
import threading
import logging
from typing import Dict, Any, Optional

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("vigyan.desktop")

try:
    import psutil
except ImportError:
    psutil = None

import runtime


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

    # 2. Context window & batch scaling (Gemma 4 E4B QAT Q4 uses 2.5GB; 4096 ctx KV cache is ~200MB)
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
                            if runtime.LLAMA_SUPERVISOR:
                                runtime.LLAMA_SUPERVISOR.release_slot(0)
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
