# Operational Rules and Directives for AI Coding Agents

The end users of Vigyan Pro are human engineers, researchers, and students. AI coding agents (Cursor, Claude Code, Aider, Antigravity) are internal developer tooling only to assist in writing, testing, and maintaining code. All AI agents reading or modifying this repository must strictly adhere to the invariants defined below.

---

## 1. Zero Local Compute Invariant
- Host Hardware Profile: Low-power host with limited memory and integrated graphics.
- Invariant: Never execute model fine-tuning, large-scale quantization, parameter mergers, or heavy benchmark sweeps on the local machine.
- Enforcement: All neural training or heavy GGUF compilation workloads must be executed cloud-to-cloud on Kaggle Dual Tesla T4s or TPU v3-8 instances.
- Local Host Role: Strictly limited to deterministic tool execution (SymPy CAS, OpenSCAD, Icarus Verilog), lightweight GGUF inference (<=3B IQ3_M on llama-server :8086), and CLI/Desktop UI serving.

## 2. Zero Emojis Invariant
- Never include emojis in code, docstrings, commit messages, console output, or documentation. Maintain clean, professional, enterprise-grade typography.

## 3. Sandboxed Subprocess Standard
- When invoking external compilers (such as `openscad`, `iverilog`, or `vvp`):
  1. Always enforce an explicit timeout parameter (e.g., `timeout=15.0`).
  2. Always capture standard output and standard error cleanly using `capture_output=True`.
  3. Never invoke external binaries using shell interpolation (`shell=True`). Use list-based command arguments.
  4. Gracefully detect missing system binaries using `shutil.which` and return actionable installation instructions instead of raising unhandled exceptions.

## 4. Strict Type Contracts
- All external API inputs and outputs must pass through strict Pydantic models defined in `vigyan.types`.
- Never return raw unvalidated dictionaries from tool functions. Return `ToolResult` or `MathResult`.

## 5. Local Runtime Ports and Loopback Standard
- Local inference server: `http://127.0.0.1:8086` (fallback: `http://127.0.0.1:8080`).
- Sockets must bind exclusively to `127.0.0.1` (loopback) to prevent unauthorized network exposure. Never bind internal control planes to `0.0.0.0`.

## 6. Test-Driven Verification
- Any modification or addition of a tool or feature must be accompanied by automated unit tests in `tests/`.
- Run tests via pytest using the project environment:
  ```bash
  pytest tests/ -v
  ```
- All tests must pass 100% green before committing changes.
