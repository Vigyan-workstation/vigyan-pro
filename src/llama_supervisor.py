"""Lifecycle supervisor for the embedded llama-server process.

Discovers and supervises the embedded C++ llama-server micro-daemon on private loopback.
Ensures zero orphaned processes across Windows (Job Object), Linux (PR_SET_PDEATHSIG / process group),
and macOS (SIGTERM / process group).
Deliberately has no GUI imports so it can be tested headless.
"""
from __future__ import annotations

import json
import logging
import os
import shutil
import signal
import subprocess
import sys
import time
import urllib.error
import urllib.request
from collections.abc import Callable, Sequence
from typing import Optional

logger = logging.getLogger(__name__)


def find_llama_server_binary() -> Optional[str]:
    """Discover pre-compiled llama-server (or llama-server.exe) in priority order:

    1. LLAMA_SERVER_BIN environment variable
    2. bin/ (relative to script or project root)
    3. ~/.local/bin/llama-server
    4. ~/.vigyan/bin/llama-server
    5. /opt/vigyan-pro/bin/llama-server
    6. System PATH
    """
    env_override = os.environ.get("LLAMA_SERVER_BIN")
    if env_override:
        cand = os.path.expanduser(env_override)
        if os.path.isfile(cand) and (sys.platform == "win32" or os.access(cand, os.X_OK)):
            return os.path.abspath(cand)

    base_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(base_dir, ".."))

    search_dirs = [
        os.path.join(project_root, "bin"),
        os.path.join(base_dir, "bin"),
        os.path.join(project_root, "dist_bin"),
        os.path.expanduser("~/.local/llama.cpp"),
        os.path.expanduser("~/.local/bin"),
        os.path.expanduser("~/.vigyan/bin"),
        "/opt/vigyan-pro/bin",
        "/usr/local/bin",
        "/usr/bin",
    ]

    binary_names = ["llama-server.exe", "llama-server"] if sys.platform == "win32" else ["llama-server"]

    for d in search_dirs:
        for b in binary_names:
            cand = os.path.join(d, b)
            if os.path.isfile(cand) and (sys.platform == "win32" or os.access(cand, os.X_OK)):
                return os.path.abspath(cand)

    for b in binary_names:
        found = shutil.which(b)
        if found:
            return os.path.abspath(found)

    return None


def find_model_path(preferred_path: Optional[str] = None) -> Optional[str]:
    """Discover bundled or local sovereign model weights:

    1. preferred_path argument or VIGYAN_MODEL_PATH env
    2. models/vigyan-3b-quad-master-iq3_m.gguf (bundled)
    3. ~/.vigyan/models/vigyan-3b-quad-master-iq3_m.gguf
    4. /opt/vigyan-pro/models/vigyan-3b-quad-master-iq3_m.gguf
    """
    env_override = os.environ.get("VIGYAN_MODEL_PATH")
    if env_override and os.path.isfile(os.path.expanduser(env_override)):
        return os.path.abspath(os.path.expanduser(env_override))

    if preferred_path and os.path.isfile(os.path.expanduser(preferred_path)):
        return os.path.abspath(os.path.expanduser(preferred_path))

    base_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(base_dir, ".."))

    candidates = [
        os.path.join(project_root, "models", "vigyan-3b-quad-master-iq3_m.gguf"),
        os.path.join(base_dir, "models", "vigyan-3b-quad-master-iq3_m.gguf"),
        os.path.expanduser("~/.vigyan/models/vigyan-3b-quad-master-iq3_m.gguf"),
        "/opt/vigyan-pro/models/vigyan-3b-quad-master-iq3_m.gguf",
        # Fallbacks for alternate quantized artifacts if 3b quad master is absent
        os.path.expanduser("~/.vigyan/models/vigyan-1.5b-quad-master-q4_k_m.gguf"),
    ]

    for cand in candidates:
        if os.path.isfile(cand):
            return os.path.abspath(cand)

    return None


def get_available_memory_gb() -> float:
    """Returns available RAM in gigabytes using psutil or /proc/meminfo fallback."""
    try:
        import psutil
        return psutil.virtual_memory().available / (1024 ** 3)
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
            return avail_kb / (1024 ** 2)
    except Exception:
        pass
    return 8.0  # Safe default if undetectable


def _with_parent_death_signal(command: list[str]) -> list[str]:
    """Ask Linux kernel to SIGTERM the child if parent process dies (e.g. setpriv wrapper)."""
    if not sys.platform.startswith("linux"):
        return command
    if shutil.which("setpriv") is None:
        return command
    return ["setpriv", "--pdeathsig", "SIGTERM", *command]


def _linux_preexec() -> None:
    """Preexec hook for Linux subprocesses: creates a new process group, sets background niceness, and registers PR_SET_PDEATHSIG."""
    if sys.platform.startswith("linux"):
        try:
            os.setpgrp()
        except Exception:
            pass
        try:
            # Deprioritize CPU compute relative to desktop GUI / window compositor (prevents UI freeze/stutter)
            os.nice(5)
        except Exception:
            pass
        try:
            import ctypes
            libc = ctypes.CDLL("libc.so.6")
            PR_SET_PDEATHSIG = 1
            libc.prctl(PR_SET_PDEATHSIG, signal.SIGTERM)
        except Exception:
            pass


class LlamaServerSupervisor:
    """Manages the lifecycle of an embedded llama-server micro-daemon."""

    def __init__(
        self,
        model_path: Optional[str] = None,
        server_bin: Optional[str] = None,
        host: str = "127.0.0.1",
        port: int = 8086,
        ctx_size: int = 4096,
        batch_size: int = 256,
        threads: int = 4,
        command: Optional[Sequence[str]] = None,
        is_healthy: Optional[Callable[[], bool]] = None,
        stop_timeout: float = 5.0,
        die_with_parent: bool = True,
        max_restarts: int = 3,
        extra_env: Optional[dict[str, str]] = None,
        extra_args: Optional[Sequence[str]] = None,
    ) -> None:
        # Dynamic RAM Guard: If available RAM is constrained (<2.5 GB), clamp ctx_size to 2048 to prevent OOM
        if ctx_size > 2048:
            avail_gb = get_available_memory_gb()
            if avail_gb < 2.5:
                ctx_size = 2048
                logger.info("Host available RAM is low (%.2f GB < 2.5 GB). Clamped ctx_size to 2048.", avail_gb)

        self._model_path = model_path
        self._server_bin = server_bin
        self._host = host
        self._port = port
        self._ctx_size = ctx_size
        self._batch_size = batch_size
        self._threads = threads
        self._explicit_command = list(command) if command is not None else None
        self._custom_is_healthy = is_healthy
        self._stop_timeout = stop_timeout
        self._die_with_parent = die_with_parent
        self._max_restarts = max_restarts
        self._extra_env = dict(extra_env) if extra_env else {}
        self._extra_args = list(extra_args) if extra_args else []

        self._restarts = 0
        self._job: Optional[int] = None  # Windows Job Object handle
        self._process: Optional[subprocess.Popen[bytes]] = None

    @property
    def host(self) -> str:
        return self._host

    @property
    def port(self) -> int:
        return self._port

    @property
    def pid(self) -> Optional[int]:
        """PID of the supervised child process, or None."""
        return self._process.pid if self._process is not None else None

    @property
    def owns_process(self) -> bool:
        """True while a child process we started is running."""
        return self._process is not None and self._process.poll() is None

    @property
    def model_path(self) -> Optional[str]:
        return self._model_path or find_model_path()

    @property
    def server_bin(self) -> Optional[str]:
        return self._server_bin or find_llama_server_binary()

    def build_command(self) -> list[str]:
        """Construct the launch argument sequence for llama-server."""
        if self._explicit_command is not None:
            return list(self._explicit_command)

        bin_path = self.server_bin
        if not bin_path:
            raise FileNotFoundError(
                "llama-server binary could not be found in bin/, ~/.local/bin, or PATH."
            )

        model = self.model_path
        if not model:
            raise FileNotFoundError(
                "Sovereign GGUF model weights not found in models/ or ~/.vigyan/models/."
            )

        cmd = [
            bin_path,
            "--model", str(model),
            "--ctx-size", str(self._ctx_size),
            "--batch-size", str(self._batch_size),
            "--threads", str(self._threads),
            "--parallel", "1",
            "--cache-type-k", "q8_0",
            "--cache-type-v", "q8_0",
            "--no-jinja",
            "--chat-template", "chatml",
            "--host", str(self._host),
            "--port", str(self._port),
        ]
        if self._extra_args:
            cmd.extend(self._extra_args)
        return cmd

    def is_healthy(self) -> bool:
        """Probe the server /health endpoint or evaluate custom health check."""
        if self._custom_is_healthy is not None:
            try:
                return bool(self._custom_is_healthy())
            except Exception:
                return False

        url = f"http://{self._host}:{self._port}/health"
        try:
            req = urllib.request.Request(url, method="GET")
            with urllib.request.urlopen(req, timeout=1.0) as resp:
                if resp.status == 200:
                    try:
                        data = json.loads(resp.read().decode("utf-8"))
                        if isinstance(data, dict):
                            status = data.get("status")
                            if status is not None:
                                return status == "ok"
                        return True
                    except Exception:
                        return True
                return False
        except Exception:
            return False

    def release_slot(self, slot_id: int = 0) -> bool:
        """Tell llama-server to flush and release the KV cache for a given slot."""
        url = f"http://{self._host}:{self._port}/slots/{slot_id}?action=release"
        try:
            req = urllib.request.Request(url, data=b"{}", headers={"Content-Type": "application/json"}, method="POST")
            with urllib.request.urlopen(req, timeout=1.5) as resp:
                return resp.status in (200, 204)
        except Exception as exc:
            logger.debug("Failed to release slot %d: %s", slot_id, exc)
            return False

    def wait_until_ready(self, timeout: float = 15.0) -> bool:
        """Poll the /health endpoint until status is ok or timeout expires."""
        deadline = time.monotonic() + timeout
        while time.monotonic() < deadline:
            if self._process is not None and self._process.poll() is not None:
                logger.error(
                    "llama-server process exited prematurely with code %s",
                    self._process.returncode,
                )
                return False
            if self.is_healthy():
                return True
            time.sleep(0.1)
        return False

    def start(self) -> bool:
        """Spawn the llama-server micro-daemon if not already running or healthy.

        Returns True if a new process was spawned, False otherwise.
        """
        if self.owns_process:
            return False
        if self.is_healthy():
            logger.info("llama-server is already healthy on %s:%s", self._host, self._port)
            return False

        command = self.build_command()
        if self._die_with_parent:
            command = _with_parent_death_signal(command)

        child_env = os.environ.copy()
        if self._extra_env:
            child_env.update(self._extra_env)

        # Ensure LD_LIBRARY_PATH includes the directory of the binary for companion shared libraries
        real_bin = self.server_bin
        if real_bin:
            bin_dir = os.path.dirname(os.path.realpath(real_bin))
            cur_ld = child_env.get("LD_LIBRARY_PATH", "")
            child_env["LD_LIBRARY_PATH"] = f"{bin_dir}:{cur_ld}" if cur_ld else bin_dir
            child_env["GGML_BACKEND_PATH"] = bin_dir

        preexec = _linux_preexec if (self._die_with_parent and sys.platform.startswith("linux")) else None
        creationflags = 0
        if sys.platform == "win32":
            creationflags = getattr(subprocess, "BELOW_NORMAL_PRIORITY_CLASS", 0x00004000)

        self._process = subprocess.Popen(
            command,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            env=child_env,
            preexec_fn=preexec,
            creationflags=creationflags,
        )

        if self._die_with_parent and sys.platform == "win32":
            self._attach_to_job(self._process)

        return True

    def _attach_to_job(self, process: subprocess.Popen[bytes]) -> None:
        """Windows Job Object integration to prevent orphaned processes."""
        try:
            import win_job

            if self._job is None:
                self._job = win_job.create_kill_on_close_job()
            win_job.assign_pid(self._job, process.pid)
        except Exception as exc:
            logger.warning("could not attach child to Windows Job Object: %s", exc)

    def _close_job(self) -> None:
        if self._job is None:
            return
        job, self._job = self._job, None
        try:
            import win_job

            win_job.close_job(job)
        except OSError as exc:
            logger.warning("could not close Windows Job Object: %s", exc)

    def check(self) -> bool:
        """Check process status; if dead unexpectedly, restart up to max_restarts."""
        process = self._process
        if process is None or process.poll() is None:
            return False

        self._process = None  # poll() reaped the dead process
        if self._restarts >= self._max_restarts:
            logger.error("llama-server exited again; giving up after %d restarts", self._restarts)
            return False

        if self.start():
            self._restarts += 1
            logger.warning("llama-server exited unexpectedly; restarted (%d)", self._restarts)
            return True
        return False

    def stop(self) -> None:
        """Terminate the supervised process and cleanly reap it."""
        process = self._process
        if process is None:
            self._close_job()
            return

        if process.poll() is None:
            if sys.platform != "win32":
                try:
                    pgid = os.getpgid(process.pid)
                    if pgid == process.pid and pgid != os.getpgrp():
                        os.killpg(pgid, signal.SIGTERM)
                    else:
                        process.terminate()
                except Exception:
                    process.terminate()
            else:
                process.terminate()

            try:
                process.wait(timeout=self._stop_timeout)
            except subprocess.TimeoutExpired:
                if sys.platform != "win32":
                    try:
                        pgid = os.getpgid(process.pid)
                        if pgid == process.pid and pgid != os.getpgrp():
                            os.killpg(pgid, signal.SIGKILL)
                        else:
                            process.kill()
                    except Exception:
                        process.kill()
                else:
                    process.kill()
                process.wait()

        self._process = None
        self._close_job()
