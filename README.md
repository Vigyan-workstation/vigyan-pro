# Vigyan Pro: Sovereign Offline STEM Intelligence Workstation

Vigyan Pro is an air-gapped, zero-cloud-egress physical engineering intelligence workstation designed for engineers, researchers, and students. It unites high-performance local language model inference with exact computer algebra systems, parametric 3D CAD solid modeling, and digital logic synthesis.

---

## Architecture Overview

Vigyan Pro provides two user-facing interfaces built on top of a single deterministic STEM toolchain:

1. **Desktop Workstation (`run.py`)**: Native graphical desktop application with an obsidian theme, interactive KaTeX math typography, Plotly engineering charts, WaveDrom waveforms, and embedded micro-daemon management on loopback `127.0.0.1:8086`.
2. **Terminal CLI (`vigyan`)**: Fast command-line interface for engineers needing immediate calculations, CAD exports, and Verilog synthesis directly in their terminal.

```
+-----------------------------------------------------------------------+
|                        User-Facing Interfaces                         |
|         Desktop Studio (run.py)       |    Terminal CLI (vigyan)      |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                             Core Bridge                               |
|  Loopback Daemon (:8086)  |  RAM Governor  |  Pydantic V2 Schemas     |
+-----------------------------------------------------------------------+
                                   |
        +--------------------------+--------------------------+
        |                          |                          |
        v                          v                          v
+------------------+      +------------------+      +------------------+
|    SymPy CAS     |      |  OpenSCAD Engine |      | Icarus Verilog   |
| Exact Analytical |      | Parametric 3D    |      | Digital RTL &    |
| Math (0% Error)  |      | Solid Models     |      | Simulation Loop  |
+------------------+      +------------------+      +------------------+
```

---

## The Big Three Deterministic STEM Engines

### 1. SymPy Computer Algebra System (`vigyan math`)
- Exact analytical calculus, differential equations, matrix operations, and series expansions.
- 0% approximation error. Executes in sub-millisecond latencies directly in the Python AST engine.
- Returns verified analytical formulas, LaTeX representations, and optional numerical evaluations.

### 2. Parametric 3D CAD Engine (`vigyan cad`)
- Synthesizes clean, manifold OpenSCAD code for mechanical engineering parts, brackets, and enclosures.
- Automated headless compilation to physical `.stl` meshes using the OpenSCAD compiler.

### 3. Silicon EDA Engine (`vigyan rtl`)
- Generates synthesizable Verilog-2001 / SystemVerilog modules with integrated self-checking testbenches.
- Runs an automated 2-pass self-healing compilation loop with Icarus Verilog (`iverilog` + `vvp`) to resolve syntax errors autonomously.

---

## Quickstart

### Installation

Clone the repository and install the Python package in editable mode:

```bash
git clone https://github.com/Vigyan-workstation/vigyan-pro.git
cd vigyan-pro
pip install -e .
```

### 1. Launch Desktop Workstation

```bash
python run.py
```

The desktop supervisor discovers precompiled `llama-server` binaries in `bin/`, launches the micro-daemon on private loopback `127.0.0.1:8086`, and enforces memory governor boundaries.

### 2. Terminal CLI

```bash
# Exact analytical calculus
vigyan math "diff(x**3 * sin(x), x)"
vigyan math "integrate(x*exp(-x), (x, 0, oo))"
vigyan math "solve(x**2 - 16, x)"

# Parametric 3D CAD modeling
vigyan cad "planetary gear 24 teeth module 1.5" -o gear.scad --stl

# Synthesizable Verilog HDL with simulation verification
vigyan rtl "8-bit synchronous FIFO depth 16" -o fifo.v --verify

# List all available STEM tools
vigyan list

# Direct tool execution
vigyan run math "diff(x**4, x)"

# System diagnostics
vigyan status
```

---

## Building Distribution Packages

To build standalone distribution packages (`.deb`, `.tar.gz`, Windows `.zip`, macOS `.tar.gz`):

```bash
# Standard package (resolves model from ~/.vigyan/models/ at runtime)
./package.sh

# Bundled package (embeds the 1.45 GB 3B model directly into installer)
./package.sh --bundle-weights
```

---

## Automated Verification

The repository contains automated unit tests verifying all tools and CLI commands:

```bash
pytest tests/ -v
```

---

## License

This software is licensed under the **PolyForm Noncommercial License 1.0.0**.

- **Non-Commercial Use**: 100% free for personal research, academic study, educational projects, and hobbyist development.
- **Commercial Use**: Commercial deployment, enterprise use, or proprietary integration requires a commercial license from ExperimentLab Technologies.

For commercial licensing and enterprise support inquiries, contact: `licensing@experimentlab.in`.
