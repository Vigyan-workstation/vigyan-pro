#!/usr/bin/env bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
chmod +x "$SCRIPT_DIR/bin/vigyan-pro" 2>/dev/null || true
exec "$SCRIPT_DIR/bin/vigyan-pro" "$@"
