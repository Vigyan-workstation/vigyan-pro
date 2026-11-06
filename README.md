# Vigyan Pro: Sovereign Offline STEM Intelligence Workstation

**Version**: 4.0.0 Sovereign Engineering Edition  
**Developed by**: [ExperimentLab AI](https://experimentlab.in)  
**License**: [PolyForm Noncommercial License 1.0.0](LICENSE) (Non-Commercial Use Only)  
**Security Standard**: Air-Gapped • Zero Cloud Egress • Deterministic AST CAS • Loopback Isolated  

---

## 1. Executive Overview

Vigyan Pro is an air-gapped, zero-cloud-egress physical engineering and scientific intelligence workstation built for engineers, researchers, and students. It unites exact computer algebra systems (SymPy CAS) with sovereign local language model inference (Vigyan-3B IQ3_M on `llama-server` :8086), a 150-line reversible Sovereign Learning Ledger, CODATA 2022 physical constants, and multi-OS desktop environments.

Vigyan Pro operates with 0% cloud dependencies. All computation, inference, and derivations execute locally on host hardware without external telemetry, tracking, or network egress.

---

## 2. Core Architectural Pillars

### 2.1 Deterministic SymPy CAS Engine (`vigyan math`)
- Exact analytical calculus (derivatives, integrals, limits, Taylor series expansions).
- Non-linear algebraic solving, matrix determinants, and trigonometric identities with 0% error.
- Verified AST sandboxing (`validate_sympy_ast`) rejecting code injection, lambdas, and dunder attribute traversal.
- Returns verified analytical formulas, LaTeX representations, and optional numerical evaluations.

### 2.2 Sovereign Model Registry & HF Hub (`vigyan model`)
- Integrated local model discovery across `~/.vigyan/models/` and `models/`.
- Direct connectivity with official Hugging Face Hub repository `Experimentlab/Vigyan-Models-GGUF`.
- Inspect active weights, file sizes, and quantization formats (`vigyan model status`).
- Query and stream public or gated model weights with token authentication (`vigyan model pull`).

### 2.3 Sovereign Learning Ledger (`vigyan ledger`)
- Plain-file reversible operational memory stored locally in `.agents/ledger.jsonl`.
- Enforces a strict 150-line context budget ceiling to keep inference fast and clean.
- Auto-classifies engineering rules (`math`, `cad`, `eda`, `code`, `rule`).
- Full reversibility via `vigyan undo <id>` or in-chat `/undo`.

### 2.4 Hybrid Smart Keep-Alive Daemon (`vigyan/core.py`)
- Background `llama-server` supervisor serving on private loopback (`127.0.0.1:8086`).
- Automatic 10-minute idle reaper reclaims host RAM when no queries are active.
- Immediate manual reclamation via `vigyan stop`.
- ChatML turn stop tokens preventing token runaway and socket timeouts.

### 2.5 Multi-OS Native Desktop Workstation (`run.py`)
- **Linux**: Native WebKitGTK with obsidian titanium monochrome design system.
- **macOS**: Native Cocoa WKWebView (`src/launch_desktop_mac.py`).
- **Windows**: Microsoft Edge WebView2 with Windows Job Object process supervision (`src/launch_desktop_win.py`).
- Instant KaTeX mathematical rendering with 1-click "Copy LaTeX" micro-buttons for Overleaf.

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
