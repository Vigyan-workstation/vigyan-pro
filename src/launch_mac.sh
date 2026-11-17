#!/usr/bin/env bash
# ==============================================================================
# Vigyan Pro Sovereign Studio - Darwin Launcher & First-Run Bootstrap
# ==============================================================================
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$( cd "$DIR/.." && pwd )"
cd "$DIR"

# Auto-strip macOS Gatekeeper quarantine recursively before execution
if command -v xattr >/dev/null 2>&1; then
    xattr -cr "$ROOT_DIR" 2>/dev/null || true
    xattr -cr "$DIR" 2>/dev/null || true
fi

echo "========================================================"
echo "  Launching Vigyan Pro Sovereign Studio"
echo "  100% Offline Edge Intelligence • Shreyansh Singh"
echo "========================================================"

# Robust Python 3 discovery (check venvs, brew python on Apple Silicon & Intel, python3)
PY_CANDIDATES=(
    "$ROOT_DIR/.venv/bin/python3"
    "$ROOT_DIR/.venv/bin/python"
    "$DIR/.venv/bin/python3"
    "$DIR/.venv/bin/python"
    "$HOME/.vigyan/venv/bin/python3"
    "$HOME/.vigyan/venv/bin/python"
    "$HOME/.venv-rag/bin/python3"
    "$HOME/.venv-rag/bin/python"
    "/opt/homebrew/bin/python3"
    "/usr/local/bin/python3"
    "/opt/homebrew/bin/python3.13"
    "/opt/homebrew/bin/python3.12"
    "/opt/homebrew/bin/python3.11"
    "/usr/local/bin/python3.13"
    "/usr/local/bin/python3.12"
    "/usr/local/bin/python3.11"
    "python3"
    "python"
)

for py_cmd in "${PY_CANDIDATES[@]}"; do
    if [ -x "$py_cmd" ] || command -v "$py_cmd" >/dev/null 2>&1; then
        # Verify it's actually Python 3
        if "$py_cmd" -c "import sys; sys.exit(0 if sys.version_info >= (3, 8) else 1)" 2>/dev/null; then
            exec "$py_cmd" "$DIR/launch_desktop_mac.py" "$@"
        fi
    fi
done

echo "========================================================"
echo "  [ERROR] Python 3.10+ is required to run Vigyan Pro."
echo "  Please install Python using:"
echo "      brew install python3"
echo "  or download the official macOS installer from:"
echo "      https://www.python.org/downloads/macos/"
echo "========================================================"
exit 1
