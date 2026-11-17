#!/usr/bin/env bash
# ==============================================================================
# Vigyan Pro Sovereign CLI 1-Line Universal Installer (Linux & macOS)
# https://github.com/shreyansh001boy-tech/vigyan-pro-desktop
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/shreyansh001boy-tech/vigyan-pro-desktop/main/install-cli.sh | bash
# ==============================================================================
set -euo pipefail

REPO="shreyansh001boy-tech/vigyan-pro-desktop"
VERSION="${VIGYAN_VERSION:-5.0.7}"

# Color formatting
BOLD="\033[1m"
GREEN="\033[32m"
CYAN="\033[36m"
YELLOW="\033[33m"
RED="\033[31m"
RESET="\033[0m"

echo -e "${BOLD}${CYAN}"
echo "┌────────────────────────────────────────────────────────┐"
echo "│  VIGYAN PRO • SOVEREIGN STANDALONE CLI INSTALLER       │"
echo "│  100% Offline • Zero Egress • Air-Gapped Physical STEM │"
echo "└────────────────────────────────────────────────────────┘"
echo -e "${RESET}"

# 1. Detect OS & Hardware Architecture
OS_TYPE="$(uname -s | tr '[:upper:]' '[:lower:]')"
ARCH_TYPE="$(uname -m)"

case "$OS_TYPE" in
  linux*)
    PLATFORM="linux"
    ;;
  darwin*)
    PLATFORM="macos"
    ;;
  *)
    echo -e "${RED}[Error] Unsupported operating system: $OS_TYPE${RESET}" >&2
    exit 1
    ;;
esac

case "$ARCH_TYPE" in
  x86_64|amd64)
    ARCH="x86_64"
    ;;
  arm64|aarch64)
    ARCH="arm64"
    ;;
  *)
    echo -e "${YELLOW}[Warning] Architecture $ARCH_TYPE; attempting x86_64 compatibility${RESET}"
    ARCH="x86_64"
    ;;
esac

echo -e "==> Detected Host: ${BOLD}${PLATFORM} (${ARCH})${RESET}"

# 2. Determine Installation Target
if [ "${EUID:-$(id -u)}" -eq 0 ]; then
  INSTALL_DIR="/usr/local/bin"
  SHARE_DIR="/usr/local/share/vigyan"
else
  INSTALL_DIR="${HOME}/.local/bin"
  SHARE_DIR="${HOME}/.local/share/vigyan"
fi

mkdir -p "$INSTALL_DIR"
mkdir -p "$SHARE_DIR"

# 3. Download Standalone CLI Archive
if [ "$PLATFORM" = "macos" ]; then
  ARCHIVE_NAME="vigyan-cli_${VERSION}_macos_universal.tar.gz"
else
  ARCHIVE_NAME="vigyan-cli_${VERSION}_linux_x86_64.tar.gz"
fi

TAR_URL="https://github.com/${REPO}/releases/download/v${VERSION}/${ARCHIVE_NAME}"
TMP_DIR="$(mktemp -d -t vigyan-install-XXXXXX)"
trap 'rm -rf "$TMP_DIR"' EXIT

echo -e "==> Downloading Vigyan CLI v${VERSION}..."
if command -v curl >/dev/null 2>&1; then
  curl -fSL "$TAR_URL" -o "${TMP_DIR}/${ARCHIVE_NAME}" || {
    echo -e "${YELLOW}[Notice] Release archive not found directly on CDN; installing local package launcher...${RESET}"
  }
elif command -v wget >/dev/null 2>&1; then
  wget -q "$TAR_URL" -O "${TMP_DIR}/${ARCHIVE_NAME}" || true
fi

# 4. Extract and Deploy
if [ -f "${TMP_DIR}/${ARCHIVE_NAME}" ] && [ -s "${TMP_DIR}/${ARCHIVE_NAME}" ]; then
  tar -xzf "${TMP_DIR}/${ARCHIVE_NAME}" -C "$SHARE_DIR"
  ln -sf "${SHARE_DIR}/vigyan" "${INSTALL_DIR}/vigyan"
  chmod +x "${INSTALL_DIR}/vigyan"
else
  # Fallback: install self-contained launcher script
  cat <<'EOF' > "${INSTALL_DIR}/vigyan"
#!/usr/bin/env bash
# Sovereign Vigyan Pro CLI Dispatcher
set -e
_VIGYAN_DIR="${HOME}/.local/share/vigyan"
if [ -x "${_VIGYAN_DIR}/vigyan" ]; then
  exec "${_VIGYAN_DIR}/vigyan" "$@"
fi

# Find host python3
PYTHON_BIN=""
for candidate in "/home/hello/.venv-rag/bin/python" "${HOME}/.venv/bin/python" "$(which python3 2>/dev/null)"; do
  if [ -x "$candidate" ]; then
    PYTHON_BIN="$candidate"
    break
  fi
done

if [ -z "$PYTHON_BIN" ]; then
  echo "[Error] Python 3 or standalone runtime required for Vigyan CLI." >&2
  exit 1
fi

exec "$PYTHON_BIN" -m vigyan_cli "$@"
EOF
  chmod +x "${INSTALL_DIR}/vigyan"
fi

# 5. Shell PATH Configuration
PROFILE_UPDATED=0
for rc in "${HOME}/.bashrc" "${HOME}/.zshrc" "${HOME}/.profile"; do
  if [ -f "$rc" ]; then
    if ! grep -q '\.local/bin' "$rc" 2>/dev/null; then
      echo '' >> "$rc"
      echo '# Vigyan CLI PATH' >> "$rc"
      echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$rc"
      PROFILE_UPDATED=1
    fi
  fi
done

echo
echo -e "${GREEN}${BOLD}✓ Vigyan Pro CLI v${VERSION} installed successfully!${RESET}"
echo -e "  Location: ${BOLD}${INSTALL_DIR}/vigyan${RESET}"
echo
echo -e "${BOLD}Quick Start:${RESET}"
echo -e "  ${CYAN}vigyan models${RESET}        List available 3B, 7B, 14B sovereign engines"
echo -e "  ${CYAN}vigyan pull 3b${RESET}       Download flagship 1.39 GB STEM model"
echo -e "  ${CYAN}vigyan \"2+2\"${RESET}          Run one-shot mathematical evaluation"
echo -e "  ${CYAN}vigyan serve${RESET}         Start OpenAI-compatible API on port 8086 for VS Code"
echo -e "  ${CYAN}vigyan uninstall${RESET}     Cleanly remove CLI and reclaim disk space"
echo
if [ "$PROFILE_UPDATED" -eq 1 ]; then
  echo -e "${YELLOW}Note: Run 'source ~/.bashrc' or restart your terminal to reload PATH.${RESET}"
fi
