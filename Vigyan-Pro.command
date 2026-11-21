#!/usr/bin/env bash
# ==============================================================================
# Vigyan Pro Sovereign Studio - macOS Double-Click Finder Launcher
# ==============================================================================
DIR="$( cd "$( dirname "$0" )" && pwd )"

# Auto-strip macOS Gatekeeper quarantine recursively before execution
if command -v xattr >/dev/null 2>&1; then
    xattr -cr "$DIR" 2>/dev/null || true
fi

exec "$DIR/src/launch_mac.sh" "$@"
