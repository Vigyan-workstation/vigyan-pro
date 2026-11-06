# Sovereign Invariants & Directives for AI Coding Agents

Vigyan Pro is an air-gapped, offline physical engineering intelligence workstation developed by ExperimentLab AI (https://experimentlab.in).

This document serves as the universal operating specification for all AI coding agents (Claude Code, Cursor, Windsurf, Aider, Devin, GitHub Copilot, Antigravity) interacting with this codebase. All agents must strictly enforce the invariants below.

---

## 1. Zero Local Compute Invariant
- **Host Hardware Profile**: Target host hardware typically features limited RAM (<=8 GB) and integrated graphics without discrete GPUs.
- **Rule**: NEVER run heavy model fine-tuning, large-scale quantization sweeps (>3B), parameter merges, or lengthy benchmark loops on the local host machine.
- **Enforcement**: Heavy neural training and quantization must be orchestrated cloud-to-cloud on Kaggle Dual Tesla T4s or TPU v3-8 instances.
- **Local Role**: Strictly limited to deterministic SymPy CAS analytical computation, lightweight GGUF inference (<=3B IQ3_M on `llama-server` :8086), and CLI/desktop interface serving.

## 2. Zero Emojis Invariant
- **Rule**: NEVER include emojis in source code, docstrings, commit messages, terminal output, PR descriptions, or documentation.
- **Standard**: Maintain clean, professional, enterprise-grade typography. Use plain brackets or markdown tags (e.g. `[STATUS]`, `[ERROR]`, `[CAS]`, `[RLC]`) instead of emoji icons.

## 3. Air-Gap Loopback Egress Lock
- **Rule**: Vigyan Pro is 100% offline. Sockets, API bridges, and daemons must bind exclusively to private loopback (`127.0.0.1`, `localhost`, `::1`).
- **Standard**: Never introduce outbound HTTP requests to WAN endpoints, external analytics, CDNs, or telemetry servers. All networking in `vigyan/core.py` must pass `validate_loopback_url()`.

## 4. AST Execution Sandboxing
- **Rule**: Every mathematical derivation or user calculation must pass through deterministic SymPy Computer Algebra Systems (CAS) with 0% error.
- **Security Standard**: Expressions evaluated by `vigyan.tools.math` must be validated by `validate_sympy_ast(code_str)` in `eval` mode. Prohibit imports, lambdas, comprehensions, dunder traversal (`__class__`, `__subclasses__`), and dangerous identifiers (`os`, `sys`, `subprocess`, `eval`, `exec`).

## 5. Reversible Learning Ledger Standard
- **Rule**: The Sovereign Learning Ledger (`vigyan/ledger.py`) manages dynamic operational rules with a strict 150-line context ceiling and sub-5ms performance.
- **Standard**: All rules must support instant `/undo` reversibility. The `.agents/` directory is local to the host and must never be committed to git.

## 6. Multi-OS Native Parity
- **Rule**: Vigyan Pro supports Linux (WebKitGTK), macOS (Cocoa WKWebView), and Windows (Microsoft Edge WebView2).
- **Standard**: All CLI commands and shared backend tools must work identically across POSIX and Windows environments. Do not introduce platform-specific code without appropriate OS detection guards (`sys.platform`).

---

## Build, Test, and Quality Gate Commands

- **Run Test Suite**: `pytest tests/ -v`
- **Verify Agent Guardrails**: `python scripts/verify_agent_guardrails.py`
- **Rebuild Desktop Frontend**: `cd frontend && bun run build`
- **Run CLI Status**: `vigyan status --json`
- **Run Forensic Benchmark**: `vigyan bench --json`
- **Inspect Models**: `vigyan model status --json`
