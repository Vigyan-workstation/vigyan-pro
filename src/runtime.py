"""
Vigyan Pro Workstation — Runtime Singleton Holder (v5.0.8)
Holds process-wide state shared by the split modules without creating import
cycles: the llama-server supervisor instance (late-bound by the launcher) and
the ephemeral session token.
"""

import os
import secrets

# Guarantee loopback addresses are never routed through system proxies (HTTP_PROXY / http_proxy)
for _var in ("no_proxy", "NO_PROXY"):
    _cur = os.environ.get(_var, "")
    _additions = ["127.0.0.1", "localhost", "::1"]
    _existing = set(x.strip() for x in _cur.split(",") if x.strip())
    _merged = _existing.union(_additions)
    os.environ[_var] = ",".join(sorted(_merged))

LLAMA_SUPERVISOR = None  # injected by launch_desktop after instantiation

# Sovereign session security token (ephemeral, single-session only)
_SESSION_TOKEN = secrets.token_hex(32)

