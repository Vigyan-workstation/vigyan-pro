# Vigyan Pro Workstation (v5.0.7)

[![ExperimentLab](https://img.shields.io/badge/Developed%20By-ExperimentLab.in-000000.svg)](https://experimentlab.in)
[![License - PolyForm Noncommercial 1.0.0](https://img.shields.io/badge/License-PolyForm%20Noncommercial-000000.svg)](LICENSE)
[![Security - Air-Gapped Zero Egress](https://img.shields.io/badge/Security-Air--Gapped%20Zero--Egress-000000.svg)](SECURITY.md)
[![Architecture - Pure STEM](https://img.shields.io/badge/Architecture-Deterministic%20SymPy%20CAS-000000.svg)](#system-architecture)

> **Sovereign, Air-Gapped Physical Engineering & Scientific Intelligence Workstation**  
> *Developed by [ExperimentLab AI](https://experimentlab.in). 100% On-Device. Zero Cloud Telemetry.*  
> *"Your AI Never Leaves the Room." Local mathematical derivations, exact SymPy Computer Algebra System, and standalone multi-OS desktop & terminal CLI.*

---

## 1. System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│  Vigyan Pro Desktop Shell (WebKitGTK Linux / WebView2 Win / Mac WKWeb) │
│  • Obsidian Pitch-Black Monochrome Design (#000000)                    │
│  • Zero-Node Client Runtime: Pre-compiled Svelte 5 bundle (src/dist/)  │
│  • Ephemeral Session Security Token & Localhost Strict CORS Boundary   │
├────────────────────────────────────────────────────────────────────────┤
│  STEM Derivations & Verified Mathematical Reasoning                    │
│  • Exact Computer Algebra System (SymPy CAS)                           │
│  • Deterministic Calculus, ODEs, Matrix Algebra & Physics Constants    │
│  • Clean 2D Function Plotter & Live Derivative Curve                   │
│  • Markdown, KaTeX & 1-Click LaTeX Report Export                       │
├────────────────────────────────────────────────────────────────────────┤
│  Neuro-Symbolic Sovereign Engine (src/launch_desktop.py)               │
│  • Exact SymPy AST Sandbox: Zero-hallucination mathematical truth      │
│  • Local Model Inference Runtime (GGUF via llama-server / llama.cpp)   │
│  • Zero Cloud Telemetry: 0.000000 outbound network packets             │
├────────────────────────────────────────────────────────────────────────┤
│  Multi-OS Distribution & Standalone CLI                                │
│  • Desktop GUI: Linux (.deb, .tar.gz), macOS Universal, Windows (.zip) │
│  • Headless CLI: ~/.local/bin/vigyan standalone terminal binary        │
│  • Cryptographic Release Verification (SHA256SUMS)                     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Security & Air-Gap Standard

Vigyan Pro Workstation is architected for strict data sovereignty and research privacy:

* **Zero Cloud Egress:** Client runtime initiates zero external connections. No telemetry, analytics, session tracking, or remote font CDNs.
* **Strict Content Security Policy (CSP):**
  ```http
  default-src 'self' file: data: blob: http://127.0.0.1:* http://localhost:*;
  script-src 'self' 'unsafe-inline' file: blob:;
  connect-src 'self' http://127.0.0.1:* http://localhost:*;
  object-src 'none'; frame-src 'none'; base-uri 'self'; form-action 'none';
  ```
* **Input/Output Sanitization:** All queries and streaming outputs pass through strict entity encoding before rendering, neutralizing DOM injection and Cross-Site Scripting (XSS).
* **Restricted Navigation Handlers:** Native desktop webviews intercept all navigation requests (`decide-policy`). Arbitrary external URLs cannot be opened inside the application window.
* **Supply Chain Cryptographic Verification:** All binary build packages are published with verifiable SHA-256 checksums (`SHA256SUMS`).

For complete threat models and reporting procedures, read [SECURITY.md](SECURITY.md).

---

## 3. Supported Platforms & System Requirements

| OS | Engine | Minimum Requirements | Recommended |
| :--- | :--- | :--- | :--- |
| **Linux (x86_64)** | WebKitGTK 4.1 (`gir1.2-webkit2-4.1`) | Ubuntu 20.04+, Debian 11+, Arch, Fedora | 8–16 GB RAM, 4 cores |
| **Windows** | Microsoft Edge WebView2 | Windows 10/11 x64 (Build 19041+) | 8–16 GB RAM, 4 cores |
| **macOS** | Apple Cocoa WKWebView | macOS 12 Monterey+ (Apple Silicon & Intel) | 8–16 GB Unified Memory |

---

## 4. Multi-OS Downloads & Verification (v5.0.7)

Download verified binary packages directly from the official [Vigyan Workstation GitHub Releases](https://github.com/Vigyan-workstation/vigyan-pro/releases/tag/v5.0.7) or [ExperimentLab](https://experimentlab.in/download):

### Linux (Debian / Ubuntu / Mint / Pop!_OS)
```bash
# 1. Download deb package and checksum file
wget https://github.com/Vigyan-workstation/vigyan-pro/releases/download/v5.0.7/vigyan-pro_5.0.7_amd64.deb
wget https://github.com/Vigyan-workstation/vigyan-pro/releases/download/v5.0.7/SHA256SUMS

# 2. Verify Cryptographic Integrity
sha256sum --check --ignore-missing SHA256SUMS

# 3. Install
sudo apt install ./vigyan-pro_5.0.7_amd64.deb

# 4. Launch
vigyan-pro
```

### Linux Portable (Arch, Fedora, openSUSE, RHEL)
```bash
wget https://github.com/Vigyan-workstation/vigyan-pro/releases/download/v5.0.7/vigyan-pro_5.0.7_linux_x86_64.tar.gz
tar -xzf vigyan-pro_5.0.7_linux_x86_64.tar.gz
cd vigyan-pro-5.0.7
./vigyan-pro
```

### macOS (Apple Silicon M1–M4 & Intel Universal)
```bash
wget https://github.com/Vigyan-workstation/vigyan-pro/releases/download/v5.0.7/vigyan-pro_5.0.7_macos_universal.tar.gz
tar -xzf vigyan-pro_5.0.7_macos_universal.tar.gz
cd vigyan-pro-5.0.7
./Vigyan-Pro.command
```

### Windows 10 / 11 (64-bit)
1. Download `vigyan-pro_5.0.7_windows_x86_64.zip`.
2. Extract the archive.
3. Double-click `Vigyan-Pro.bat` or run from PowerShell:
   ```powershell
   .\Vigyan-Pro.bat
   ```

### Standalone Universal Terminal CLI (1-Line Command)
```bash
curl -fsSL https://experimentlab.in/install.sh | bash
```

Or download the standalone CLI archive directly:
- **Linux**: `vigyan-cli_5.0.7_linux_x86_64.tar.gz`
- **macOS**: `vigyan-cli_5.0.7_macos_universal.tar.gz`
- **Windows**: `vigyan-cli_5.0.7_windows_x86_64.zip`

---

## 5. Clean 1-Command Uninstallation

To completely remove Vigyan Pro without leaving residual system traces:

- **Debian / Ubuntu**:
  ```bash
  sudo apt remove --purge vigyan-pro && rm -rf ~/.local/share/vigyan-pro
  ```
- **Portable Linux / macOS / Windows**:
  Simply delete the extracted directory:
  ```bash
  rm -rf vigyan-pro-5.0.7
  ```
- **CLI**:
  ```bash
  rm -f ~/.local/bin/vigyan
  ```

---

## 6. Intellectual Property & Legal Notice

Copyright © 2026 ExperimentLab AI (https://experimentlab.in). All rights reserved.

### Non-Commercial License
This software is licensed under the **PolyForm Noncommercial License 1.0.0**.
- **Permitted**: Academic research, educational study, personal engineering evaluation.
- **Prohibited**: Commercial exploitation, fee-based hosted APIs, proprietary redistribution, and SaaS deployment without a commercial license.

For commercial licensing and enterprise fleet inquiries:
- **Web**: [experimentlab.in](https://experimentlab.in)
- **Email**: [support@experimentlab.in](mailto:support@experimentlab.in)
