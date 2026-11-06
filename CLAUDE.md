# CLAUDE.md — Directives for Claude Code

## Project Overview
Vigyan Pro is an air-gapped sovereign physical engineering intelligence workstation developed by ExperimentLab AI (https://experimentlab.in).
It unites deterministic SymPy CAS analytical computation, CODATA 2022 physical constants, an in-memory STEM axiom registry, a local Sovereign Learning Ledger, and local quantized GGUF inference (<=3B IQ3_M on `llama-server` :8086).

## Essential Commands

### Testing & Verification
- Run full test suite: `pytest tests/ -v`
- Run agent guardrails check: `python scripts/verify_agent_guardrails.py`
- Run math benchmark: `pytest tests/test_math.py -v`
- Run security test suite: `pytest tests/test_security.py -v`

### CLI Execution
- Status check: `vigyan status --json`
- Model registry check: `vigyan model status --json`
- Analytical math derivation: `vigyan math "diff(x**3 * sin(x), x)" --json`
- Learning ledger inspection: `vigyan ledger --json`
- Forensic benchmark: `vigyan bench --json`
- Stop daemon: `vigyan stop`

### Frontend Build
- Build desktop bundle: `cd frontend && bun run build`

## Architecture & Code Map
- `vigyan/tools/math.py`: Deterministic SymPy CAS engine with `validate_sympy_ast` security sandbox.
- `vigyan/models.py`: Sovereign model registry and Hugging Face Hub downloader (`Experimentlab/Vigyan-Models-GGUF`).
- `vigyan/core.py`: Loopback engine client with idle auto-reaper (`run_daemon`, `stop_engine`) and `AirGapSecurityViolationError`.
- `vigyan/ledger.py`: Sovereign Learning Ledger (150-line context budget, plain-file JSONL storage, `/undo` reversibility).
- `vigyan/constants.py`: Embedded CODATA 2022 physical constants and physical axioms database.
- `src/launch_desktop.py`: WebKitGTK desktop GUI runner and HTTP bridge server.
- `frontend/src/`: Svelte 5 desktop interface with monochrome obsidian typography and KaTeX math rendering.

## Strict Invariants
1. **Zero Emojis**: Never output or commit emojis in code, commits, or documentation.
2. **Zero Local Compute**: Never execute heavy model training or large quantization on local host hardware.
3. **Air-Gap Loopback Egress Lock**: All networking must target `127.0.0.1`, `localhost`, or `::1`.
4. **AST Sandboxing**: Math expressions must pass AST validation in `eval` mode.
5. **Type Safety**: Tool returns must conform to `ToolResult` or `MathResult` schemas in `vigyan.types`.
