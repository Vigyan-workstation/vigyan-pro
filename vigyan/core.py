import os
import json
import urllib.request
import urllib.error
from typing import Optional, Dict, Any

DEFAULT_ENGINE_URL = os.environ.get("VIGYAN_ENGINE_URL", "http://127.0.0.1:8086")
FALLBACK_ENGINE_URL = "http://127.0.0.1:8080"

class EngineOfflineError(Exception):
    """Raised when the local Vigyan inference daemon is unreachable."""
    pass

def check_engine_health(url: str = DEFAULT_ENGINE_URL, timeout: float = 0.5) -> bool:
    """Check if the local inference daemon is responsive on loopback."""
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
            resp_data = json.loads(resp.read().decode("utf-8"))
            choices = resp_data.get("choices", [])
            if choices and "message" in choices[0]:
                return choices[0]["message"].get("content", "").strip()
            return ""
    except urllib.error.URLError as e:
        raise EngineOfflineError(f"Connection failed to Vigyan local engine at {target_url}: {e}")
