# Contributing to Vigyan Pro

Thank you for contributing to Vigyan Pro. This repository is dedicated to building sovereign, offline physical science and engineering intelligence for researchers, engineers, and students.

We welcome contributions from both human developers and autonomous AI coding agents (Claude Code, Cursor, Windsurf, Aider, Devin, GitHub Copilot). To maintain sovereign reliability and security, all contributions must strictly adhere to the guidelines below.

---

## 1. Sovereign Invariants (Mandatory)

All Pull Requests (human or agent-generated) are evaluated against six mandatory invariants:

1. **Zero Emojis Invariant**:
   Never include emojis in source code, docstrings, commit messages, console output, or documentation. Maintain clean, professional, enterprise-grade typography.
2. **Zero Local Compute Invariant**:
   Never run heavy model fine-tuning, large-scale quantization sweeps, or parameter mergers on local host hardware.
3. **Air-Gap Loopback Egress Lock**:
   All networking in `vigyan/core.py` and internal bridge servers must bind strictly to `127.0.0.1`, `localhost`, or `::1`. Never introduce outbound WAN calls to external APIs or CDNs.
4. **AST Mathematical Sandboxing**:
   All mathematical or symbolic operations must execute through deterministic CAS (`sympy`) and be validated by `validate_sympy_ast` to prevent arbitrary code execution or dunder attribute traversal (`__class__`, `__subclasses__`).
5. **Reversible Learning Ledger Standard**:
   The Learning Ledger (`vigyan/ledger.py`) enforces a hard 150-line context ceiling and full `/undo` reversibility.
6. **Multi-OS Native Parity**:
   Changes affecting the desktop workstation or CLI must maintain cross-platform compatibility across Linux (WebKitGTK), macOS (Cocoa WKWebView), and Windows (Microsoft Edge WebView2).

---

## 2. Setting Up Development Environment

Clone the repository and install the development dependencies:

```bash
git clone https://github.com/Vigyan-workstation/vigyan-pro.git
cd vigyan-pro

# Use a virtual environment with Python >= 3.10
python3 -m venv .venv
source .venv/bin/activate

# Install in editable mode with test dependencies
pip install -e .
pip install pytest
```

---

## 3. Adding a New Deterministic STEM Tool

All deterministic tool implementations live under `vigyan/tools/` and are shared between the Terminal CLI and Desktop Workstation:

1. Create a new module `vigyan/tools/<domain>.py`.
2. Define your tool function with typed arguments returning `ToolResult` or `MathResult` from `vigyan.types`.
3. Register the tool in `AVAILABLE_TOOLS` in `vigyan/cli.py` and export in `vigyan/tools/__init__.py`.
4. Create comprehensive unit tests in `tests/test_<domain>.py`.

Example:

```python
# vigyan/tools/fluid.py
from vigyan.types import ToolResult

def calculate_reynolds_number(velocity: float, length: float, viscosity: float) -> ToolResult:
    if viscosity <= 0:
        return ToolResult(status="error", tool_name="reynolds", stdout="", stderr="Kinematic viscosity must be positive.")
    re = (velocity * length) / viscosity
    regime = "Laminar" if re < 2300 else ("Transitional" if re <= 4000 else "Turbulent")
    return ToolResult(
        status="success",
        tool_name="reynolds",
        stdout=f"Reynolds Number: {re:.2f} ({regime})",
        code=f"Re = ({velocity} * {length}) / {viscosity}"
    )
```

---

## 4. Verification & Quality Gates

Before submitting a Pull Request, verify that all automated quality gates pass:

```bash
# 1. Run agent guardrails (Zero Emojis, Syntax, Air-Gap)
python scripts/verify_agent_guardrails.py

# 2. Run automated test suite
pytest tests/ -v

# 3. Test CLI commands
vigyan status --json
vigyan bench --json
```

---

## 5. Coding Agent Protocol

If you are using an AI coding agent:
- Direct your agent to read [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md) prior to modifying files.
- Ensure the agent does not invent mock return values, placeholder strings, or fake simulation stubs.
- Verify that commit messages follow Conventional Commits (e.g. `feat: add fluid mechanics tool`) with zero emojis.

---

## 6. Developer Certificate of Origin (DCO)

To protect intellectual property and ensure sovereign open-source integrity, Vigyan Pro utilizes the Developer Certificate of Origin (DCO) version 1.1:

```text
By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the PolyForm Noncommercial
    License 1.0.0; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open-source or
    noncommercial license and I have the right under that license to
    submit that work with modifications, whether created in whole
    or in part by me, under the same license; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project and the PolyForm Noncommercial License 1.0.0.
```

All contributions are licensed under the PolyForm Noncommercial License 1.0.0. Commercial use or proprietary redistribution requires a separate commercial license from ExperimentLab AI.
