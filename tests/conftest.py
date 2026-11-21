"""
Global Pytest Configuration & Environment Isolation Fixtures.
Ensures loopback calls (127.0.0.1, localhost) strictly bypass ambient proxies.
"""

import os
import pytest

# Guarantee loopback addresses are never sent to external proxies during tests
for var in ("no_proxy", "NO_PROXY"):
    cur = os.environ.get(var, "")
    additions = ["127.0.0.1", "localhost", "::1"]
    existing = set(x.strip() for x in cur.split(",") if x.strip())
    merged = existing.union(additions)
    os.environ[var] = ",".join(sorted(merged))

# Fallback home directory to /tmp if ~/.vigyan is read-only
try:
    os.makedirs(os.path.expanduser("~/.vigyan"), exist_ok=True)
except OSError:
    os.environ["HOME"] = "/tmp"
