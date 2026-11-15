#!/usr/bin/env bash
# ==============================================================================
# Vigyan Pro Sovereign Studio - Darwin Launcher & First-Run Bootstrap
# ==============================================================================
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "========================================================"
echo "  Launching Vigyan Pro Sovereign Studio"
echo "  100% Offline Edge Intelligence • Shreyansh Singh"
echo "========================================================"

# Locate Python 3 (prioritize project and user venvs over Xcode stub)
for py_cmd in "$DIR/../.venv/bin/python3" "$DIR/.venv/bin/python3" "$HOME/.vigyan/venv/bin/python3" /opt/homebrew/bin/python3 /usr/local/bin/python3 python3; do
    if [ -x "$py_cmd" ] || command -v "$py_cmd" &>/dev/null; then
        exec "$py_cmd" "$DIR/launch_desktop_mac.py" "$@"
    fi
done

echo "========================================================"
echo "  [ERROR] Python 3.10+ is required to run Vigyan Pro."
echo "  Please install Python using 'brew install python3'"
echo "  or download from https://www.python.org/"
echo "========================================================"
exit 1
