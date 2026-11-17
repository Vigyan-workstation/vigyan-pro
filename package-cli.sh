#!/usr/bin/env bash
# ==============================================================================
# package-cli.sh: Multi-OS Standalone Packaging for Vigyan Sovereign CLI
# Linux x86_64, Windows x64, macOS Universal
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VERSION="${1:-5.0.7}"
DIST_DIR="$SCRIPT_DIR/dist"
mkdir -p "$DIST_DIR"

echo "========================================================"
echo "  Packaging Vigyan Sovereign CLI Multi-OS Release v${VERSION}"
echo "========================================================"

# Common CLI source files to include in all packages
stage_common_sources() {
    local target_dir="$1"
    mkdir -p "$target_dir/src"
    cp "$SCRIPT_DIR/src/vigyan_cli.py" "$target_dir/src/"
    cp "$SCRIPT_DIR/src/llama_supervisor.py" "$target_dir/src/"
    cp "$SCRIPT_DIR/src/version.py" "$target_dir/src/"
    if [ -d "$SCRIPT_DIR/src/knowledge_graph" ]; then
        cp -r "$SCRIPT_DIR/src/knowledge_graph" "$target_dir/src/"
    fi
}

# ------------------------------------------------------------------------------
# 1. Package Portable Linux x86_64 CLI
# ------------------------------------------------------------------------------
echo "==> Staging Portable Linux x86_64 CLI..."
STAGE_LINUX="$SCRIPT_DIR/.build_cli_linux/vigyan-cli"
rm -rf "$SCRIPT_DIR/.build_cli_linux"
mkdir -p "$STAGE_LINUX/bin"

# Copy Linux native binaries and libraries
cp "$SCRIPT_DIR/bin/llama-server" "$STAGE_LINUX/bin/"
cp "$SCRIPT_DIR/bin/"*.so* "$STAGE_LINUX/bin/" 2>/dev/null || true
stage_common_sources "$STAGE_LINUX"

# Root launcher script
cat <<'EOF' > "$STAGE_LINUX/vigyan"
#!/usr/bin/env bash
set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export LD_LIBRARY_PATH="${DIR}/bin:${LD_LIBRARY_PATH:-}"
export GGML_BACKEND_PATH="${DIR}/bin"
export PATH="${DIR}/bin:${PATH}"

# Find python3 runtime
PYTHON_CMD="python3"
for cand in "/home/hello/.venv-rag/bin/python" "${HOME}/.venv/bin/python" "$(which python3 2>/dev/null)"; do
    if [ -x "$cand" ]; then
        PYTHON_CMD="$cand"
        break
    fi
done
exec "$PYTHON_CMD" "${DIR}/src/vigyan_cli.py" "$@"
EOF
chmod +x "$STAGE_LINUX/vigyan"
chmod +x "$STAGE_LINUX/bin/llama-server"

LINUX_CLI_TAR="$DIST_DIR/vigyan-cli_${VERSION}_linux_x86_64.tar.gz"
tar -czf "$LINUX_CLI_TAR" -C "$SCRIPT_DIR/.build_cli_linux" vigyan-cli
echo "✓ Linux CLI Archive Built: $LINUX_CLI_TAR"
rm -rf "$SCRIPT_DIR/.build_cli_linux"

# ------------------------------------------------------------------------------
# 2. Package Portable Windows x64 CLI
# ------------------------------------------------------------------------------
echo "==> Staging Portable Windows x64 CLI..."
STAGE_WIN="$SCRIPT_DIR/.build_cli_win/vigyan-cli"
rm -rf "$SCRIPT_DIR/.build_cli_win"
mkdir -p "$STAGE_WIN/bin"

if [ -f "$HOME/.vigyan/cache/llama_win.zip" ]; then
    unzip -q -o "$HOME/.vigyan/cache/llama_win.zip" -d "$STAGE_WIN/bin/"
elif [ -f "/tmp/llama_win.zip" ]; then
    unzip -q -o "/tmp/llama_win.zip" -d "$STAGE_WIN/bin/"
fi
stage_common_sources "$STAGE_WIN"

cat <<'EOF' > "$STAGE_WIN/vigyan.cmd"
@echo off
setlocal
set "DIR=%~dp0"
set "PATH=%DIR%bin;%PATH%"
set "PYTHONPATH=%DIR%src;%PYTHONPATH%"

set "PYTHON_CMD=python"
where py >nul 2>&1 && set "PYTHON_CMD=py -3"
where python >nul 2>&1 && set "PYTHON_CMD=python"

%PYTHON_CMD% "%DIR%src\vigyan_cli.py" %*
endlocal
EOF

WIN_CLI_ZIP="$DIST_DIR/vigyan-cli_${VERSION}_windows_x86_64.zip"
if which zip >/dev/null 2>&1; then
    (cd "$SCRIPT_DIR/.build_cli_win" && zip -1 -r -q "$WIN_CLI_ZIP" vigyan-cli)
else
    python3 -c "import shutil; shutil.make_archive('$DIST_DIR/vigyan-cli_${VERSION}_windows_x86_64', 'zip', '$SCRIPT_DIR/.build_cli_win', 'vigyan-cli')"
fi
echo "✓ Windows CLI Archive Built: $WIN_CLI_ZIP"
rm -rf "$SCRIPT_DIR/.build_cli_win"

# ------------------------------------------------------------------------------
# 3. Package Portable macOS Universal CLI
# ------------------------------------------------------------------------------
echo "==> Staging Portable macOS Universal CLI..."
STAGE_MAC="$SCRIPT_DIR/.build_cli_mac/vigyan-cli"
rm -rf "$SCRIPT_DIR/.build_cli_mac"
mkdir -p "$STAGE_MAC/bin"

if [ -f "$HOME/.vigyan/cache/llama_mac.tar.gz" ]; then
    tar -xzf "$HOME/.vigyan/cache/llama_mac.tar.gz" -C "$STAGE_MAC/bin/"
elif [ -f "/tmp/llama_mac.tar.gz" ]; then
    tar -xzf "/tmp/llama_mac.tar.gz" -C "$STAGE_MAC/bin/"
fi
stage_common_sources "$STAGE_MAC"

cat <<'EOF' > "$STAGE_MAC/vigyan"
#!/usr/bin/env bash
set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export DYLD_LIBRARY_PATH="${DIR}/bin:${DYLD_LIBRARY_PATH:-}"
export GGML_BACKEND_PATH="${DIR}/bin"
export PATH="${DIR}/bin:${PATH}"

PYTHON_CMD="python3"
for cand in "${HOME}/.venv/bin/python" "/opt/homebrew/bin/python3" "/usr/local/bin/python3" "$(which python3 2>/dev/null)"; do
    if [ -x "$cand" ]; then
        PYTHON_CMD="$cand"
        break
    fi
done
exec "$PYTHON_CMD" "${DIR}/src/vigyan_cli.py" "$@"
EOF
chmod +x "$STAGE_MAC/vigyan"
if [ -f "$STAGE_MAC/bin/llama-server" ]; then
    chmod +x "$STAGE_MAC/bin/llama-server"
fi

MAC_CLI_TAR="$DIST_DIR/vigyan-cli_${VERSION}_macos_universal.tar.gz"
tar -czf "$MAC_CLI_TAR" -C "$SCRIPT_DIR/.build_cli_mac" vigyan-cli
echo "✓ macOS CLI Archive Built: $MAC_CLI_TAR"
rm -rf "$SCRIPT_DIR/.build_cli_mac"

# ------------------------------------------------------------------------------
# 4. Generate SHA256 Checksums
# ------------------------------------------------------------------------------
echo "==> Generating SHA-256 Checksums for CLI Archives..."
(cd "$DIST_DIR" && sha256sum vigyan-cli_${VERSION}_* > SHA256SUMS-CLI)
echo "✓ Checksums generated in dist/SHA256SUMS-CLI:"
cat "$DIST_DIR/SHA256SUMS-CLI"

echo "========================================================"
echo "  Vigyan Sovereign CLI Multi-OS Packaging Complete!"
echo "========================================================"
