# Vigyan Pro: Sovereign Offline STEM Intelligence Workstation

**Version**: 4.1.0 Sovereign Engineering Edition  
**Developed by**: [ExperimentLab AI](https://experimentlab.in)  
**License**: [PolyForm Noncommercial License 1.0.0](LICENSE) (Non-Commercial Use Only)  
**Back Research**: [Buy Me A Chai](https://buymeachai.in/shreyansh001boy)  
**Security Standard**: Air-Gapped • Zero Cloud Egress • Deterministic AST CAS • Loopback Isolated  

[![License](https://img.shields.io/badge/License-PolyForm_Noncommercial_1.0.0-blue.svg?style=flat)](LICENSE)
[![Back Research](https://img.shields.io/badge/Back_Research-Buy_Me_A_Chai-d97706?style=flat)](https://buymeachai.in/shreyansh001boy)
[![Discord](https://img.shields.io/badge/Discord-Experimentlab_Community-5865F2?style=flat&logo=discord&logoColor=white)](https://discord.com/invite/Jck3tD6mhf)  

---

## 1. Executive Overview

Vigyan Pro is an air-gapped, zero-cloud-egress physical engineering and scientific intelligence workstation built for engineers, researchers, and students. It unites exact computer algebra systems (SymPy CAS) with sovereign local language model inference (Vigyan-3B IQ3_M on `llama-server` :8086), a 150-line reversible Sovereign Learning Ledger, CODATA 2022 physical constants, and multi-OS desktop environments.

Vigyan Pro operates with 0% cloud dependencies. All computation, inference, and derivations execute locally on host hardware without external telemetry, tracking, or network egress.

---

## 2. Multi-OS Monolithic Downloads (with AI Model)

Users can download fully self-contained monolithic bundles directly from GitHub Releases or Hugging Face. Each bundle includes the application, the Svelte 5 desktop studio, and the pre-packaged 1.4 GB **Vigyan-3B Quad-Master AI model** inside `models/`:

| Platform | Download Bundle | Features & Launcher |
|---|---|---|
| **Linux (x86_64)** | [`vigyan-pro-4.1.0-linux.tar.gz`](https://github.com/Vigyan-workstation/vigyan-pro/releases/download/v4.1.0/vigyan-pro-4.1.0-linux.tar.gz) | WebKitGTK / Localhost Shell • `python run.py` |
| **Windows 10/11** | [`vigyan-pro-4.1.0-windows.zip`](https://github.com/Vigyan-workstation/vigyan-pro/releases/download/v4.1.0/vigyan-pro-4.1.0-windows.zip) | Microsoft Edge WebView2 • Double-click `launch_win.bat` |
| **macOS (Apple Silicon & Intel)** | [`vigyan-pro-4.1.0-macos.tar.gz`](https://github.com/Vigyan-workstation/vigyan-pro/releases/download/v4.1.0/vigyan-pro-4.1.0-macos.tar.gz) | Apple Cocoa WKWebView • Run `./src/launch_mac.sh` |
| **Standalone Model** | [`vigyan-3b-quad-master-iq3_m.gguf`](https://github.com/Vigyan-workstation/vigyan-pro/releases/download/v4.1.0/vigyan-3b-quad-master-iq3_m.gguf) | Raw 1.4 GB GGUF Model (also on [Hugging Face](https://huggingface.co/Experimentlab/Vigyan-Models-GGUF)) |

---

## 3. Core Architectural Pillars

### 3.1 Deterministic SymPy CAS Engine (`vigyan math`)
- Exact analytical calculus (derivatives, integrals, limits, Taylor series expansions).
- Non-linear algebraic solving, matrix determinants, and trigonometric identities with 0% error.
- Verified AST sandboxing (`validate_sympy_ast`) rejecting code injection, lambdas, and dunder attribute traversal.
- Returns verified analytical formulas, LaTeX representations, and optional numerical evaluations.

### 3.2 Multiphysics & Parametric Engineering Engines
- **Parametric 3D CAD (`vigyan cad`)**: build123d + OpenCASCADE solid modeling generating manufacturing-ready STL meshes.
- **Multiphysics ODE Simulation (`vigyan sim`)**: SciPy RK45 adaptive numerical integrator for ballistic drag and harmonic dynamics.
- **Cheminformatics (`vigyan chem`)**: RDKit molecular analysis, Lipinski Rule of 5 descriptors, and vector SVG generation.
- **Dimensional Algebra (`vigyan unit`)**: Pint & Astropy strict dimensional conversion and unit validation.

### 3.3 Split-Pane Artifact Studio & Typst PDF Generation
- Unified split-pane UI featuring Three.js 3D STL viewer, interactive 2D simulation canvas with real-time 4th-order Runge-Kutta (RK4) sliders, and chemical structure views.
- Embedded Rust-native **Typst compiler** generating publication-grade vector PDFs with formal title blocks and SymPy verification badges in <50ms.
- 1-click "Copy LaTeX" for seamless Overleaf collaboration.

### 3.4 Sovereign Model Registry & HF Hub (`vigyan model`)
- Integrated local model discovery across `~/.vigyan/models/` and `models/`.
- Direct connectivity with official Hugging Face Hub repository `Experimentlab/Vigyan-Models-GGUF`.
- Inspect active weights, file sizes, and quantization formats (`vigyan model status`).
- Query and stream public or gated model weights with token authentication (`vigyan model pull`).

### 3.5 Sovereign Learning Ledger (`vigyan ledger`)
- Plain-file reversible operational memory stored locally in `.agents/ledger.jsonl`.
- Enforces a strict 150-line context budget ceiling to keep inference fast and clean.
- Auto-classifies engineering rules (`math`, `cad`, `eda`, `code`, `rule`).
- Full reversibility via `vigyan undo <id>` or in-chat `/undo`.

### 3.6 Hybrid Smart Keep-Alive Daemon (`vigyan/core.py`)
- Background `llama-server` supervisor serving on private loopback (`127.0.0.1:8086`).
- Automatic 10-minute idle reaper reclaims host RAM when no queries are active.
- Immediate manual reclamation via `vigyan stop`.
- ChatML turn stop tokens preventing token runaway and socket timeouts.

---

## 3. Quickstart & Installation

### Installation

Clone the repository and install the package in editable mode:

```bash
git clone https://github.com/Vigyan-workstation/vigyan-pro.git
cd vigyan-pro

# Create and activate virtual environment (Python >= 3.10)
python3 -m venv .venv
source .venv/bin/activate

# Install editable package
pip install -e .
```

### 1. Launch Desktop Workstation

```bash
python run.py
```

The desktop supervisor discovers precompiled `llama-server` binaries in `bin/` or `~/.local/bin`, launches the micro-daemon on private loopback `127.0.0.1:8086`, and enforces host RAM boundaries.

### 2. Terminal CLI Commands

```bash
# Interactive conversational STEM console (with arrow-key history)
vigyan chat

# Ask single-turn physical engineering or mathematical question
vigyan ask "Calculate the transient response of an underdamped RLC circuit" --stream

# Exact analytical SymPy derivations
vigyan math "diff(x**3 * sin(x), x)" --json
vigyan math "integrate(x*exp(-x), (x, 0, oo))" --json
vigyan math "solve(x**2 - 5*x + 6, x)" --json

# Model management & Hugging Face Hub integration
vigyan model status --json
vigyan model list --remote --json
vigyan model pull vigyan-2b-stem-q4_k_m.gguf

# CODATA 2022 physical constants
vigyan const c --json
vigyan const h --json

# STEM governing equations search
vigyan axiom maxwell --json
vigyan axiom navier --json

# Sovereign Learning Ledger
vigyan learn "Always enforce 4-wire Kelvin sensing for sub-ohm shunt resistors"
vigyan ledger --json
vigyan undo L-101

# Immediately terminate background daemon and free host RAM
vigyan stop

# Comprehensive forensic benchmark suite
vigyan bench --json
```

---

## 4. Contributing with AI Coding Agents

Vigyan Pro is architected for collaborative engineering between human researchers and autonomous AI coding agents (Claude Code, Cursor, Windsurf, Aider, Devin, GitHub Copilot, Antigravity).

### Agent Directive Specifications
- **Universal Specification**: [AGENTS.md](AGENTS.md)
- **Claude Code**: [CLAUDE.md](CLAUDE.md)
- **Cursor / Windsurf**: [.cursorrules](.cursorrules)
- **GitHub Copilot**: [.github/copilot-instructions.md](.github/copilot-instructions.md)
- **Contribution Guide**: [CONTRIBUTING.md](CONTRIBUTING.md)

### Quality Gate Verification

Before submitting Pull Requests, ensure that all automated quality gates pass:

```bash
# 1. Verify agent guardrails (Zero Emojis, Syntax, Air-Gap)
python scripts/verify_agent_guardrails.py

# 2. Run unit and security test suite
pytest tests/ -v
```

### Back Sovereign Open-Source Research

If Vigyan Pro or our open-weight foundation models accelerate your work or engineering research, you can support our independent computing and pretraining infrastructure via [Buy Me A Chai](https://buymeachai.in/shreyansh001boy).

---

## 5. Intellectual Property & Legal Notice

Copyright (c) 2026 ExperimentLab AI (https://experimentlab.in). All rights reserved.

### Non-Commercial License
This software and associated model integration files are licensed under the **[PolyForm Noncommercial License 1.0.0](LICENSE)**.
- **Permitted**: Academic research, educational use, personal engineering study, and non-monetized evaluation.
- **Prohibited**: Commercial exploitation, fee-based hosted APIs, proprietary redistribution, and SaaS deployment without a commercial license.

### AI Training & Distillation Restriction
You may not use or permit any third party to use this software, its algorithms, datasets, prompts, or model weights to pre-train, fine-tune, or distill any commercial, closed-source artificial intelligence foundation model or automated service.

### Trademark Protection
"Vigyan", "Vigyan Pro", and "ExperimentLab AI" are exclusive trademarks of ExperimentLab AI. No rights to commercial trademark use or endorsement are granted.

For commercial licensing and enterprise deployment inquiries:
- **Web**: https://experimentlab.in
- **Email**: support@experimentlab.in
