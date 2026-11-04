#!/usr/bin/env bash
# ==============================================================================
# Vigyan Pro Desktop - Multi-OS Release Packaging Script
# Enterprise Offline Edition (~1.45 GB)
# Builds packages for Linux (.deb, .tar.gz), Windows (.zip), and macOS (.tar.gz)
# Pure Offline Bundles with 1.4 GB Quad Master weights and embedded llama-server
# ==============================================================================

set -e

RAW_VERSION="3.3.0"
BUNDLE_WEIGHTS=true

for arg in "$@"; do
    if [ "$arg" = "--bundle-weights" ] || [ "$arg" = "--bundled" ]; then
        BUNDLE_WEIGHTS=true
    elif [ "$arg" = "--lightweight" ] || [ "$arg" = "--no-weights" ]; then
        BUNDLE_WEIGHTS=false
    elif [[ "$arg" =~ ^v?[0-9]+\.[0-9]+\.[0-9]+ ]]; then
        RAW_VERSION="$arg"
    fi
done

VERSION="${RAW_VERSION#v}"

echo "========================================================"
echo "  Building Vigyan Pro Enterprise Multi-OS Release v${VERSION}"
if [ "$BUNDLE_WEIGHTS" = true ]; then
    echo "  Mode: Enterprise Offline Edition (~1.45GB Bundled Weights + llama-server)"
else
    echo "  Mode: Standard Lightweight Packages"
fi
echo "========================================================"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

DIST_DIR="$SCRIPT_DIR/dist"
mkdir -p "$DIST_DIR"

MODEL_SOURCE="${MODEL_SOURCE:-$HOME/.vigyan/models/vigyan-3b-quad-master-iq3_m.gguf}"
if [ ! -f "$MODEL_SOURCE" ] && [ -f "$SCRIPT_DIR/models/vigyan-3b-quad-master-iq3_m.gguf" ]; then
    MODEL_SOURCE="$SCRIPT_DIR/models/vigyan-3b-quad-master-iq3_m.gguf"
fi

# Locate llama-server binary for Linux / host
LLAMA_SERVER_SRC=""
if [ -f "$SCRIPT_DIR/bin/llama-server" ]; then
    LLAMA_SERVER_SRC="$SCRIPT_DIR/bin/llama-server"
elif [ -f "$HOME/.local/bin/llama-server" ]; then
    LLAMA_SERVER_SRC="$HOME/.local/bin/llama-server"
elif which llama-server >/dev/null 2>&1; then
    LLAMA_SERVER_SRC="$(which llama-server)"
fi

# Ensure bin/ in the repository itself has llama-server
if [ -n "$LLAMA_SERVER_SRC" ] && [ ! -f "$SCRIPT_DIR/bin/llama-server" ]; then
    cp -L "$LLAMA_SERVER_SRC" "$SCRIPT_DIR/bin/llama-server"
    chmod +x "$SCRIPT_DIR/bin/llama-server"
fi

# ------------------------------------------------------------------------------
# 1. BUILD DEBIAN (.deb) PACKAGE FOR LINUX
# ------------------------------------------------------------------------------
echo "==> Staging Debian package..."
DEB_STAGE="$SCRIPT_DIR/.build_deb"
rm -rf "$DEB_STAGE"

mkdir -p "$DEB_STAGE/DEBIAN"
mkdir -p "$DEB_STAGE/opt/vigyan-pro/src"
mkdir -p "$DEB_STAGE/opt/vigyan-pro/assets"
mkdir -p "$DEB_STAGE/opt/vigyan-pro/bin"
mkdir -p "$DEB_STAGE/usr/bin"
mkdir -p "$DEB_STAGE/usr/share/applications"
mkdir -p "$DEB_STAGE/usr/share/pixmaps"
mkdir -p "$DEB_STAGE/usr/share/icons/hicolor/64x64/apps"
mkdir -p "$DEB_STAGE/usr/share/icons/hicolor/128x128/apps"
mkdir -p "$DEB_STAGE/usr/share/icons/hicolor/256x256/apps"

# Copy application files
cp -r "$SCRIPT_DIR/src/"* "$DEB_STAGE/opt/vigyan-pro/src/"
cp -r "$SCRIPT_DIR/assets/"* "$DEB_STAGE/opt/vigyan-pro/assets/"
cp "$SCRIPT_DIR/bin/vigyan-pro" "$DEB_STAGE/opt/vigyan-pro/bin/vigyan-pro"
chmod +x "$DEB_STAGE/opt/vigyan-pro/bin/vigyan-pro"

# Copy llama-server into staged bin
if [ -n "$LLAMA_SERVER_SRC" ]; then
    cp -L "$LLAMA_SERVER_SRC" "$DEB_STAGE/opt/vigyan-pro/bin/llama-server"
    chmod +x "$DEB_STAGE/opt/vigyan-pro/bin/llama-server"
    cp -P "$SCRIPT_DIR/bin/"lib*.so* "$DEB_STAGE/opt/vigyan-pro/bin/" 2>/dev/null || true
fi

# Bundle sovereign weights if enabled
if [ "$BUNDLE_WEIGHTS" = true ] && [ -f "$MODEL_SOURCE" ]; then
    echo "==> Bundling sovereign model weights into Debian package..."
    mkdir -p "$DEB_STAGE/opt/vigyan-pro/models"
    cp "$MODEL_SOURCE" "$DEB_STAGE/opt/vigyan-pro/models/"
fi

# Symlink to /usr/bin/vigyan-pro
ln -s "/opt/vigyan-pro/bin/vigyan-pro" "$DEB_STAGE/usr/bin/vigyan-pro"

# Desktop Entry
cp "$SCRIPT_DIR/assets/vigyan-pro.desktop" "$DEB_STAGE/usr/share/applications/vigyan-pro.desktop"

# Icons
if [ -f "$SCRIPT_DIR/assets/icons/vigyan-pro-64.png" ]; then
    cp "$SCRIPT_DIR/assets/icons/vigyan-pro-64.png" "$DEB_STAGE/usr/share/icons/hicolor/64x64/apps/vigyan-pro.png"
fi
if [ -f "$SCRIPT_DIR/assets/icons/vigyan-pro-128.png" ]; then
    cp "$SCRIPT_DIR/assets/icons/vigyan-pro-128.png" "$DEB_STAGE/usr/share/icons/hicolor/128x128/apps/vigyan-pro.png"
fi
if [ -f "$SCRIPT_DIR/assets/icons/vigyan-pro-256.png" ]; then
    cp "$SCRIPT_DIR/assets/icons/vigyan-pro-256.png" "$DEB_STAGE/usr/share/icons/hicolor/256x256/apps/vigyan-pro.png"
    cp "$SCRIPT_DIR/assets/icons/vigyan-pro-256.png" "$DEB_STAGE/usr/share/pixmaps/vigyan-pro.png"
fi

# DEBIAN Control File
cat <<EOF > "$DEB_STAGE/DEBIAN/control"
Package: vigyan-pro
Version: ${VERSION}
Section: science
Priority: optional
Architecture: amd64
Maintainer: ExperimentLab AI <support@experimentlab.in>
Depends: python3, python3-gi, gir1.2-gtk-3.0, gir1.2-webkit2-4.1, curl
Homepage: https://experimentlab.in
Description: Sovereign Offline STEM Workstation with Embedded llama-server & SymPy CAS
 Vigyan Pro is an enterprise obsidian-grade sovereign desktop workstation
 featuring native KaTeX proofs, in-memory axiomatic physics/math grounding,
 SymPy CAS, and embedded 100% offline llama-server AI inference.
EOF

# DEBIAN postinst script
cat <<'EOF' > "$DEB_STAGE/DEBIAN/postinst"
#!/bin/sh
set -e
if which update-desktop-database >/dev/null 2>&1; then
    update-desktop-database -q /usr/share/applications || true
fi
if which gtk-update-icon-cache >/dev/null 2>&1; then
    gtk-update-icon-cache -q /usr/share/icons/hicolor || true
fi
exit 0
EOF
chmod 755 "$DEB_STAGE/DEBIAN/postinst"

# DEBIAN postrm script
cat <<'EOF' > "$DEB_STAGE/DEBIAN/postrm"
#!/bin/sh
set -e
if which update-desktop-database >/dev/null 2>&1; then
    update-desktop-database -q /usr/share/applications || true
fi
exit 0
EOF
chmod 755 "$DEB_STAGE/DEBIAN/postrm"

DEB_OUTPUT="$DIST_DIR/vigyan-pro_${VERSION}_amd64.deb"

if which dpkg-deb >/dev/null 2>&1; then
    dpkg-deb -Zgzip -z1 --build --root-owner-group "$DEB_STAGE" "$DEB_OUTPUT"
else
    echo "==> dpkg-deb not found. Creating Debian package via universal ar/tar..."
    TMP_PKG="$SCRIPT_DIR/.deb_tmp"
    rm -rf "$TMP_PKG"
    mkdir -p "$TMP_PKG"
    echo "2.0" > "$TMP_PKG/debian-binary"
    tar --use-compress-program="gzip -1" -cf "$TMP_PKG/control.tar.gz" -C "$DEB_STAGE/DEBIAN" .
    tar --use-compress-program="gzip -1" -cf "$TMP_PKG/data.tar.gz" --exclude='./DEBIAN' -C "$DEB_STAGE" .
    (cd "$TMP_PKG" && ar rcs "$DEB_OUTPUT" debian-binary control.tar.gz data.tar.gz)
    rm -rf "$TMP_PKG"
fi

rm -rf "$DEB_STAGE"
echo "✓ Debian Package Built: $DEB_OUTPUT"

# ------------------------------------------------------------------------------
# 2. BUILD LINUX PORTABLE ARCHIVE (.tar.gz)
# ------------------------------------------------------------------------------
echo "==> Staging Portable Linux Archive..."
TAR_STAGE="$SCRIPT_DIR/.build_tar/vigyan-pro"
rm -rf "$SCRIPT_DIR/.build_tar"
mkdir -p "$TAR_STAGE"

cp -r "$SCRIPT_DIR/src" "$TAR_STAGE/"
cp -r "$SCRIPT_DIR/assets" "$TAR_STAGE/"
cp -r "$SCRIPT_DIR/bin" "$TAR_STAGE/"
chmod +x "$TAR_STAGE/bin/vigyan-pro"

if [ -n "$LLAMA_SERVER_SRC" ]; then
    cp -L "$LLAMA_SERVER_SRC" "$TAR_STAGE/bin/llama-server"
    chmod +x "$TAR_STAGE/bin/llama-server"
fi

if [ "$BUNDLE_WEIGHTS" = true ] && [ -f "$MODEL_SOURCE" ]; then
    echo "==> Bundling sovereign model into Linux package..."
    mkdir -p "$TAR_STAGE/models"
    cp "$MODEL_SOURCE" "$TAR_STAGE/models/"
fi

cat <<'EOF' > "$TAR_STAGE/launch.sh"
#!/usr/bin/env bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$SCRIPT_DIR/bin/vigyan-pro" "$@"
EOF
chmod +x "$TAR_STAGE/launch.sh"

TAR_OUTPUT="$DIST_DIR/vigyan-pro_${VERSION}_linux_x86_64.tar.gz"
tar --use-compress-program="gzip -1" -cf "$TAR_OUTPUT" -C "$SCRIPT_DIR/.build_tar" vigyan-pro
echo "✓ Linux Archive Built: $TAR_OUTPUT"

TAR_BUNDLED_OUTPUT="$DIST_DIR/vigyan-pro_${VERSION}_linux_x86_64_bundled.tar.gz"
ln -f "$TAR_OUTPUT" "$TAR_BUNDLED_OUTPUT" 2>/dev/null || cp "$TAR_OUTPUT" "$TAR_BUNDLED_OUTPUT"
rm -rf "$SCRIPT_DIR/.build_tar"

# ------------------------------------------------------------------------------
# 3. BUILD WINDOWS PORTABLE ARCHIVE (.zip)
# ------------------------------------------------------------------------------
echo "==> Staging Portable Windows Archive..."
WIN_STAGE="$SCRIPT_DIR/.build_win/vigyan-pro"
rm -rf "$SCRIPT_DIR/.build_win"
mkdir -p "$WIN_STAGE"

cp -r "$SCRIPT_DIR/src" "$WIN_STAGE/"
cp -r "$SCRIPT_DIR/assets" "$WIN_STAGE/"
mkdir -p "$WIN_STAGE/bin"

if [ -f "$SCRIPT_DIR/bin/llama-server.exe" ]; then
    cp "$SCRIPT_DIR/bin/llama-server.exe" "$WIN_STAGE/bin/"
elif [ -f "$HOME/.local/bin/llama-server.exe" ]; then
    cp "$HOME/.local/bin/llama-server.exe" "$WIN_STAGE/bin/"
elif [ -n "$LLAMA_SERVER_SRC" ]; then
    cp -L "$LLAMA_SERVER_SRC" "$WIN_STAGE/bin/llama-server"
    cp -L "$LLAMA_SERVER_SRC" "$WIN_STAGE/bin/llama-server.exe" 2>/dev/null || true
fi

if [ "$BUNDLE_WEIGHTS" = true ] && [ -f "$MODEL_SOURCE" ]; then
    echo "==> Bundling sovereign model into Windows package..."
    mkdir -p "$WIN_STAGE/models"
    cp "$MODEL_SOURCE" "$WIN_STAGE/models/"
fi

cat <<'EOF' > "$WIN_STAGE/Vigyan-Pro.bat"
@echo off
title Vigyan Pro
cd /d "%~dp0"
call src\launch_win.bat %*
EOF

WIN_OUTPUT="$DIST_DIR/vigyan-pro_${VERSION}_windows_x86_64.zip"
if which zip >/dev/null 2>&1; then
    (cd "$SCRIPT_DIR/.build_win" && zip -1 -r -q "$WIN_OUTPUT" vigyan-pro)
else
    python3 -c "import shutil; shutil.make_archive('$DIST_DIR/vigyan-pro_${VERSION}_windows_x86_64', 'zip', '$SCRIPT_DIR/.build_win', 'vigyan-pro')"
fi
echo "✓ Windows Archive Built: $WIN_OUTPUT"

WIN_BUNDLED_OUTPUT="$DIST_DIR/vigyan-pro_${VERSION}_windows_x86_64_bundled.zip"
ln -f "$WIN_OUTPUT" "$WIN_BUNDLED_OUTPUT" 2>/dev/null || cp "$WIN_OUTPUT" "$WIN_BUNDLED_OUTPUT"
rm -rf "$SCRIPT_DIR/.build_win"

# ------------------------------------------------------------------------------
# 4. BUILD MACOS PORTABLE ARCHIVE (.tar.gz)
# ------------------------------------------------------------------------------
echo "==> Staging Portable macOS Archive..."
MAC_STAGE="$SCRIPT_DIR/.build_mac/vigyan-pro"
rm -rf "$SCRIPT_DIR/.build_mac"
mkdir -p "$MAC_STAGE"

cp -r "$SCRIPT_DIR/src" "$MAC_STAGE/"
cp -r "$SCRIPT_DIR/assets" "$MAC_STAGE/"
mkdir -p "$MAC_STAGE/bin"

if [ -f "$SCRIPT_DIR/bin/llama-server-mac" ]; then
    cp "$SCRIPT_DIR/bin/llama-server-mac" "$MAC_STAGE/bin/llama-server"
elif [ -n "$LLAMA_SERVER_SRC" ]; then
    cp -L "$LLAMA_SERVER_SRC" "$MAC_STAGE/bin/llama-server"
fi

if [ "$BUNDLE_WEIGHTS" = true ] && [ -f "$MODEL_SOURCE" ]; then
    echo "==> Bundling sovereign model into macOS package..."
    mkdir -p "$MAC_STAGE/models"
    cp "$MODEL_SOURCE" "$MAC_STAGE/models/"
fi

cat <<'EOF' > "$MAC_STAGE/launch.sh"
#!/usr/bin/env bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$DIR/src/launch_mac.sh" "$@"
EOF
chmod +x "$MAC_STAGE/launch.sh"

cat <<'EOF' > "$MAC_STAGE/Vigyan-Pro.command"
#!/usr/bin/env bash
DIR="$(cd "$(dirname "$0")" && pwd)"
exec "$DIR/src/launch_mac.sh" "$@"
EOF
chmod +x "$MAC_STAGE/Vigyan-Pro.command"

# Native macOS .app Bundle Structure
APP_BUNDLE="$MAC_STAGE/Vigyan Pro.app"
mkdir -p "$APP_BUNDLE/Contents/MacOS"
mkdir -p "$APP_BUNDLE/Contents/Resources"

cat <<EOF > "$APP_BUNDLE/Contents/Info.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>Vigyan-Pro</string>
    <key>CFBundleIdentifier</key>
    <string>in.experimentlab.vigyanpro</string>
    <key>CFBundleName</key>
    <string>Vigyan Pro</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>${VERSION}</string>
    <key>LSMinimumSystemVersion</key>
    <string>10.15</string>
    <key>NSHighResolutionCapable</key>
    <true/>
</dict>
</plist>
EOF

cat <<'EOF' > "$APP_BUNDLE/Contents/MacOS/Vigyan-Pro"
#!/usr/bin/env bash
BUNDLE_DIR="$(cd "$(dirname "$0")/../../.." && pwd)"
exec "$BUNDLE_DIR/src/launch_mac.sh" "$@"
EOF
chmod +x "$APP_BUNDLE/Contents/MacOS/Vigyan-Pro"

MAC_OUTPUT="$DIST_DIR/vigyan-pro_${VERSION}_macos_universal.tar.gz"
tar --use-compress-program="gzip -1" -cf "$MAC_OUTPUT" -C "$SCRIPT_DIR/.build_mac" vigyan-pro
echo "✓ macOS Archive Built: $MAC_OUTPUT"

MAC_BUNDLED_OUTPUT="$DIST_DIR/vigyan-pro_${VERSION}_macos_universal_bundled.tar.gz"
ln -f "$MAC_OUTPUT" "$MAC_BUNDLED_OUTPUT" 2>/dev/null || cp "$MAC_OUTPUT" "$MAC_BUNDLED_OUTPUT"
rm -rf "$SCRIPT_DIR/.build_mac"

# ------------------------------------------------------------------------------
# 5. GENERATE CRYPTOGRAPHIC SHA-256 CHECKSUMS
# ------------------------------------------------------------------------------
echo "==> Generating Cryptographic SHA-256 Checksums for Enterprise Security Audit..."
(cd "$DIST_DIR" && sha256sum vigyan-pro_* > SHA256SUMS)
echo "✓ Enterprise SHA256SUMS generated:"
cat "$DIST_DIR/SHA256SUMS"

echo "========================================================"
echo "  Enterprise Multi-OS Packaging Complete!"
ls -lh "$DIST_DIR"
echo "========================================================"
