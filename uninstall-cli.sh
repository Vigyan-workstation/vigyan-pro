#!/usr/bin/env bash
# ==============================================================================
# Vigyan Pro Sovereign CLI Uninstaller (Linux & macOS)
# https://github.com/shreyansh001boy-tech/vigyan-pro-desktop
# ==============================================================================
set -euo pipefail

BOLD="\033[1m"
GREEN="\033[32m"
YELLOW="\033[33m"
RED="\033[31m"
RESET="\033[0m"

echo -e "${BOLD}"
echo "┌────────────────────────────────────────────────────────┐"
echo "│  VIGYAN PRO • SOVEREIGN CLI UNINSTALLER                │"
echo "└────────────────────────────────────────────────────────┘"
echo -e "${RESET}"

CONFIRM="${1:-}"
if [ "$CONFIRM" != "-y" ] && [ "$CONFIRM" != "--yes" ]; then
  read -r -p "Are you sure you want to completely uninstall Vigyan CLI? [y/N]: " resp
  case "$resp" in
    [yY][eE][sS]|[yY])
      ;;
    *)
      echo "Uninstallation cancelled."
      exit 0
      ;;
  esac
fi

# 1. Remove binaries
for b in "${HOME}/.local/bin/vigyan" "${HOME}/bin/vigyan" "/usr/local/bin/vigyan"; do
  if [ -f "$b" ] || [ -L "$b" ]; then
    rm -f "$b"
    echo -e "✓ Removed: $b"
  fi
done

# 2. Remove share directory
if [ -d "${HOME}/.local/share/vigyan" ]; then
  rm -rf "${HOME}/.local/share/vigyan"
  echo -e "✓ Removed: ${HOME}/.local/share/vigyan"
fi

# 3. Clean PATH exports from shell RCs
for rc in "${HOME}/.bashrc" "${HOME}/.zshrc" "${HOME}/.profile"; do
  if [ -f "$rc" ]; then
    sed -i '/# Vigyan CLI PATH/d' "$rc" 2>/dev/null || true
  fi
done

# 4. Optional model weights purge
RECLAIM_MODELS=0
if [ "$CONFIRM" = "-y" ] || [ "$CONFIRM" = "--yes" ]; then
  RECLAIM_MODELS=1
else
  if [ -d "${HOME}/.vigyan/models" ]; then
    read -r -p "Do you also want to delete downloaded model weights (~/.vigyan/models/) to reclaim disk space? [y/N]: " m_resp
    case "$m_resp" in
      [yY][eE][sS]|[yY])
        RECLAIM_MODELS=1
        ;;
    esac
  fi
fi

if [ "$RECLAIM_MODELS" -eq 1 ] && [ -d "${HOME}/.vigyan/models" ]; then
  rm -rf "${HOME}/.vigyan/models"
  echo -e "✓ Removed ~/.vigyan/models/ (Reclaimed disk space)"
fi

echo
echo -e "${GREEN}${BOLD}✓ Vigyan Pro CLI has been completely uninstalled.${RESET}"
