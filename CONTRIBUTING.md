# Contributing to Vigyan Pro

Thank you for contributing to Vigyan Pro. This repository is built for human engineers, researchers, and students who want to build and expand offline, air-gapped engineering intelligence.

---

## 1. Development Principles

1. **Deterministic Accuracy Over Hallucination**:
   Whenever an engineering calculation, calculus derivation, or physical simulation can be verified deterministically (SymPy, OpenSCAD, Icarus Verilog, ngspice, KiCad), prioritize deterministic execution.

2. **Unified Tool Sharing**:
   Both the Desktop Workstation GUI (`run.py`) and the Terminal CLI (`vigyan`) share the exact same underlying tool implementations in `vigyan/tools/`. Never build duplicate logic.

3. **Strict Type Safety**:
   Every tool accepts validated arguments and returns a structured `ToolResult` or `MathResult` model from `vigyan.types`.

4. **Zero Emojis**:
   Maintain clean, professional, enterprise-grade typography. Never add emojis to code, docstrings, commits, or CLI output.

---

## 2. Adding a New Tool

To add a new engineering tool, simply add a Python module inside `vigyan/tools/`:

```python
# vigyan/tools/spice.py
from vigyan.types import ToolResult

def simulate_circuit(netlist: str) -> ToolResult:
    # 1. Parse or validate SPICE netlist
    # 2. Invoke local ngspice CLI or solver
    # 3. Return ToolResult
    return ToolResult(
        status="success",
        tool_name="spice_sim",
        stdout="Transient analysis complete.",
        code=netlist
    )
```

Then register the tool in `AVAILABLE_TOOLS` in `vigyan/cli.py` and export in `vigyan/tools/__init__.py`.

---

## 3. Testing Your Tool

Verify your new tool from the command line:

```bash
# Direct CLI execution
vigyan run spice ".include model.cir"

# Run automated test suite
pytest tests/ -v
```

All test cases must pass 100% green before submitting a pull request.

---

## 4. Submitting Pull Requests

1. Fork the repository and create your feature branch:
   ```bash
   git checkout -b feature/spice-simulation
   ```
2. Commit your changes:
   ```bash
   git commit -m "feat(tools): add SPICE analog simulation tool"
   ```
3. Push to your branch and open a Pull Request against `main`.

---

## 5. Licensing

All contributions to this repository will be licensed under the PolyForm Noncommercial License 1.0.0.
