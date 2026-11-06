import os
import sys
import time
import json
import signal
import subprocess
import urllib.request
import urllib.error
import urllib.parse
from typing import Optional, Dict, Any

DEFAULT_ENGINE_URL = os.environ.get("VIGYAN_ENGINE_URL", "http://127.0.0.1:8086")
FALLBACK_ENGINE_URL = "http://127.0.0.1:8080"

class EngineOfflineError(Exception):
    """Raised when the local Vigyan inference daemon is unreachable."""
    pass

class AirGapSecurityViolationError(ValueError):
    """Raised when a network request attempts egress outside of the local loopback interface."""
    pass

def validate_loopback_url(url: str) -> None:
    """Enforce strict air-gap: only 127.0.0.1, localhost, and ::1 are permitted."""
    parsed = urllib.parse.urlparse(url)
    hostname = (parsed.hostname or "").lower()
    if hostname not in ("127.0.0.1", "localhost", "::1"):
        raise AirGapSecurityViolationError(
            f"Air-Gap Security Violation: Egress to non-loopback host '{hostname}' is blocked."
        )

def check_engine_health(url: str = DEFAULT_ENGINE_URL, timeout: float = 0.5) -> bool:
    """Check if the local inference daemon is responsive on loopback."""
    validate_loopback_url(url)
    endpoints = [f"{url}/health", f"{url}/v1/models", url]
    for ep in endpoints:
        try:
            req = urllib.request.Request(ep, method="GET")
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                if resp.status in (200, 204):
                    return True
        except Exception:
            continue
    return False

def query_engine(
    prompt: str,
    system_prompt: str = "You are Vigyan, an air-gapped sovereign physical engineering and deterministic STEM intelligence engine.",
    grammar: Optional[str] = None,
    temperature: float = 0.1,
    max_tokens: int = 1024,
    url: Optional[str] = None
) -> str:
    """
    Send an inference query to the local sovereign llama-server daemon.
    Uses standard library urllib for zero-dependency networking.
    """
    target_url = url or DEFAULT_ENGINE_URL
    validate_loopback_url(target_url)

    # Dynamic RAM Governor Check
    try:
        from vigyan.models import get_available_memory_gb
        if get_available_memory_gb() < 2.0 and max_tokens > 2048:
            max_tokens = 2048
    except Exception:
        pass

    if not check_engine_health(target_url, timeout=0.2):
        if check_engine_health(FALLBACK_ENGINE_URL, timeout=0.2):
            target_url = FALLBACK_ENGINE_URL
        else:
            raise EngineOfflineError(
                f"Vigyan local engine is unreachable on {target_url} and {FALLBACK_ENGINE_URL}.\n"
                "Please launch Vigyan Pro Desktop or start the local llama-server via:\n"
                "  llama-server -m models/vigyan-3b-quad-master-iq3_m.gguf --port 8086 --no-jinja"
            )

    payload: Dict[str, Any] = {
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ],
        "temperature": temperature,
        "max_tokens": max_tokens,
        "stop": ["<|im_start|>", "<|im_end|>", "<|endoftext|>", "</s>"],
        "stream": False
    }

    if grammar:
        payload["grammar"] = grammar

    data_bytes = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{target_url}/v1/chat/completions",
        data=data_bytes,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=30.0) as resp:
            touch_engine_activity()
            resp_data = json.loads(resp.read().decode("utf-8"))
            choices = resp_data.get("choices", [])
            if choices and "message" in choices[0]:
                return choices[0]["message"].get("content", "").strip()
            return ""
    except urllib.error.URLError as e:
        raise EngineOfflineError(f"Connection failed to Vigyan local engine at {target_url}: {e}")

def stream_engine(
    prompt: str,
    system_prompt: Optional[str] = None,
    history: Optional[list] = None,
    temperature: float = 0.2,
    max_tokens: int = 1024,
    url: Optional[str] = None
):
    """
    Stream tokens in real-time from the local sovereign llama-server daemon.
    Automatically includes active Sovereign Learning Ledger rules into context.
    """
    target_url = url or DEFAULT_ENGINE_URL
    validate_loopback_url(target_url)

    # Dynamic RAM Governor Check
    try:
        from vigyan.models import get_available_memory_gb
        if get_available_memory_gb() < 2.0 and max_tokens > 2048:
            max_tokens = 2048
    except Exception:
        pass

    if not check_engine_health(target_url, timeout=0.2):
        if check_engine_health(FALLBACK_ENGINE_URL, timeout=0.2):
            target_url = FALLBACK_ENGINE_URL
        else:
            raise EngineOfflineError(
                f"Vigyan local engine is unreachable on {target_url} and {FALLBACK_ENGINE_URL}.\n"
                "Please launch Vigyan Pro Desktop or use 'vigyan chat' to start the local engine."
            )

    try:
        from vigyan.ledger import get_prompt_injection
        ledger_rules = get_prompt_injection()
    except Exception:
        ledger_rules = ""

    base_sys = system_prompt or "You are Vigyan, an air-gapped sovereign physical engineering and deterministic STEM intelligence engine."
    if ledger_rules:
        base_sys = f"{base_sys}\n\n{ledger_rules}"

    messages = [{"role": "system", "content": base_sys}]
    if history:
        messages.extend(history)
    messages.append({"role": "user", "content": prompt})

    payload = {
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
        "stop": ["<|im_start|>", "<|im_end|>", "<|endoftext|>", "</s>"],
        "stream": True
    }

    data_bytes = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{target_url}/v1/chat/completions",
        data=data_bytes,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=60.0) as resp:
            touch_engine_activity()
            for line in resp:
                line_str = line.decode("utf-8", errors="replace").strip()
                if not line_str.startswith("data:"):
                    continue
                data_part = line_str[5:].strip()
                if data_part == "[DONE]":
                    break
                try:
                    chunk = json.loads(data_part)
                    delta = chunk.get("choices", [{}])[0].get("delta", {}).get("content", "")
                    if delta:
                        yield delta
                except Exception:
                    continue
    except urllib.error.URLError as e:
        raise EngineOfflineError(f"Connection failed to Vigyan local engine at {target_url}: {e}")

def get_engine_state_path() -> str:
    """Path to the local engine state metadata file."""
    vigyan_dir = os.path.expanduser("~/.vigyan")
    os.makedirs(vigyan_dir, exist_ok=True)
    return os.path.join(vigyan_dir, "engine_state.json")

def touch_engine_activity() -> None:
    """Update the last activity timestamp to prevent idle reaping."""
    path = get_engine_state_path()
    try:
        data = {}
        if os.path.isfile(path):
            with open(path, "r", encoding="utf-8") as f:
                data = json.load(f)
        data["last_activity"] = time.time()
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f)
    except Exception:
        pass

def stop_engine(port: int = 8086) -> bool:
    """Terminate the local llama-server daemon and clean up state."""
    path = get_engine_state_path()
    stopped = False
    pids_to_kill = set()
    if os.path.isfile(path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                data = json.load(f)
            if data.get("pid"):
                pids_to_kill.add(data["pid"])
            if data.get("daemon_pid"):
                pids_to_kill.add(data["daemon_pid"])
            os.remove(path)
        except Exception:
            pass

    for pid in pids_to_kill:
        try:
            os.kill(pid, signal.SIGTERM)
            stopped = True
        except ProcessLookupError:
            pass
        except Exception:
            pass

    time.sleep(0.3)
    for pid in pids_to_kill:
        try:
            os.kill(pid, signal.SIGKILL)
        except Exception:
            pass

    if sys.platform != "win32":
        try:
            res = subprocess.run(["fuser", "-k", f"{port}/tcp"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=1.0)
            if res.returncode == 0:
                stopped = True
        except Exception:
            pass

    return stopped

def run_daemon(port: int = 8086, idle_timeout: float = 600.0) -> None:
    """
    Persistent hybrid daemon loop with idle timeout reaper.
    Terminates llama-server if no queries arrive within idle_timeout seconds.
    """
    try:
        from src.llama_supervisor import LlamaServerSupervisor
    except ModuleNotFoundError:
        repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        if repo_root not in sys.path:
            sys.path.insert(0, repo_root)
        from src.llama_supervisor import LlamaServerSupervisor

    sup = LlamaServerSupervisor(port=port, die_with_parent=False)
    if not sup.server_bin or not sup.model_path:
        return

    if not sup.is_healthy():
        sup.start()
        if not sup.wait_until_ready(timeout=15.0):
            sup.stop()
            return

    state_path = get_engine_state_path()
    state = {
        "pid": sup.pid,
        "daemon_pid": os.getpid(),
        "port": port,
        "started_at": time.time(),
        "last_activity": time.time(),
        "idle_timeout": idle_timeout
    }
    try:
        with open(state_path, "w", encoding="utf-8") as f:
            json.dump(state, f)
    except Exception:
        pass

    try:
        while True:
            time.sleep(10.0)
            if not sup.is_alive:
                break
            last_act = time.time()
            try:
                if os.path.isfile(state_path):
                    with open(state_path, "r", encoding="utf-8") as f:
                        cur = json.load(f)
                    last_act = cur.get("last_activity", last_act)
            except Exception:
                pass

            if (time.time() - last_act) >= idle_timeout:
                break
    finally:
        sup.stop()
        try:
            if os.path.isfile(state_path):
                os.remove(state_path)
        except Exception:
            pass

def ensure_engine_running(port: int = 8086, idle_timeout: float = 600.0) -> bool:
    """
    Ensures the local llama-server is healthy on loopback.
    If offline, starts the hybrid background daemon with idle timeout reaper.
    """
    if check_engine_health(f"http://127.0.0.1:{port}", timeout=0.3):
        touch_engine_activity()
        return True

    cmd = [
        sys.executable,
        "-m", "vigyan.core",
        "--daemon",
        "--port", str(port),
        "--idle-timeout", str(int(idle_timeout))
    ]
    daemon_log = os.path.expanduser("~/.vigyan/daemon.log")
    with open(daemon_log, "a", encoding="utf-8") as log_file:
        subprocess.Popen(
            cmd,
            stdout=log_file,
            stderr=log_file,
            stdin=subprocess.DEVNULL,
            start_new_session=True
        )

    start_t = time.time()
    while time.time() - start_t < 15.0:
        if check_engine_health(f"http://127.0.0.1:{port}", timeout=0.4):
            touch_engine_activity()
            return True
        time.sleep(0.3)

    return False

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Vigyan Sovereign Engine Daemon")
    parser.add_argument("--daemon", action="store_true", help="Run background daemon with idle monitor")
    parser.add_argument("--port", type=int, default=8086, help="Port to serve llama-server on")
    parser.add_argument("--idle-timeout", type=float, default=600.0, help="Idle timeout in seconds before auto-shutdown")
    parser.add_argument("--stop", action="store_true", help="Stop running engine daemon")
    args = parser.parse_args()

    if args.stop:
        stopped = stop_engine(port=args.port)
        print("Engine stopped." if stopped else "Engine was not running.")
    elif args.daemon:
        run_daemon(port=args.port, idle_timeout=args.idle_timeout)

