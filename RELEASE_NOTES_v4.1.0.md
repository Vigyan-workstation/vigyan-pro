# Vigyan Pro v4.1.0 Sovereign Engineering Edition (Multi-OS Release)

Vigyan Pro v4.1.0 is an air-gapped, zero-cloud-egress physical engineering and scientific intelligence workstation built for engineers, researchers, and students. It unites exact computer algebra systems (SymPy CAS) with sovereign local language model inference, a 150-line reversible Sovereign Learning Ledger, CODATA 2022 physical constants, and multi-OS desktop runtimes.

Operating with 0% external cloud dependencies, all computation, inference, and derivations execute locally on host hardware without external telemetry, tracking, or network egress.

---

## What's New in v4.1.0

### 1. Monolithic Multi-OS Bundles with Direct AI Model Packaging
* **Zero External Links**: Each monolithic package bundles the pre-packaged 1.4 GB **Vigyan-3B Quad-Master AI model** (`models/vigyan-3b-quad-master-iq3_m.gguf`) directly inside the archive for immediate extract-and-run offline execution.
* **Linux (x86_64)**: Native WebKitGTK with obsidian titanium monochrome design system (`vigyan-pro-4.1.0-linux.tar.gz`).
* **Windows 10/11 (x86_64)**: Microsoft Edge WebView2 with double-click batch launcher (`vigyan-pro-4.1.0-windows.zip`).
* **macOS (Apple Silicon & Intel)**: Apple Cocoa WKWebView (`vigyan-pro-4.1.0-macos.tar.gz`).
* **Universal Python Source Package**: Standalone source archive (`vigyan-pro-4.1.0.tar.gz`).

### 2. Deterministic STEM Multiphysics Engines
* **Parametric 3D CAD (`build123d` + OpenCASCADE)**: Generates manufacturing-ready STL solid meshes on-device (`vigyan cad`).
* **Multiphysics Simulation (`SciPy` RK45)**: Adaptive ODE numerical solver returning full 100-point ballistic drag and oscillator trajectories (`vigyan sim`).
* **Cheminformatics (`RDKit`)**: Molecular descriptor evaluation (MW, LogP, TPSA, HBD, HBA) and vector SVG bond rendering (`vigyan chem`).
* **Dimensional Algebra (`Pint` + `Astropy`)**: Rigorous dimensional formula validation and unit conversions (`vigyan unit`).

### 3. Split-Pane Artifact Studio & Typst PDF Engine
* **Interactive 3D CAD Viewport**: Native Three.js STL viewport with OrbitControls, studio lighting, wireframe mode, and 1-click STL download.
* **Real-Time 2D Simulation Canvas**: SciPy RK45 initial coordinates with interactive sliders powered by an on-the-fly 4th-Order Runge-Kutta (RK4) numerical integrator at 60 FPS.
* **Typst PDF Export (<50ms)**: Embedded Rust compiler generating publication-ready vector academic papers with SymPy verification badges, replacing heavy 2 GB TeXLive setups.

### 4. Smart Process Supervision & Auto-Boot Daemon
* Automatic background engine boot on first query from CLI or Desktop with zero manual configuration.
* Automatic 10-minute idle reaper reclaims host RAM when no queries are active.
* Immediate manual reclamation via `vigyan stop`.

---

## Direct Downloads & Packages

| Asset | File Size | Description |
|---|---|---|
| `vigyan-pro-4.1.0-linux.tar.gz` | ~1.40 GB | Monolithic Linux bundle (Software + Svelte 5 Dist + 1.4 GB Vigyan-3B GGUF Model) |
| `vigyan-pro-4.1.0-windows.zip` | ~1.40 GB | Monolithic Windows bundle (Software + WebView2 Launcher + 1.4 GB Vigyan-3B GGUF Model) |
| `vigyan-pro-4.1.0-macos.tar.gz` | ~1.40 GB | Monolithic macOS bundle (Software + WKWebView Launcher + 1.4 GB Vigyan-3B GGUF Model) |
| `vigyan-pro-4.1.0.tar.gz` | ~1.5 MB | Universal Python Source Distribution (Without weights) |
| `vigyan-3b-quad-master-iq3_m.gguf` | ~1.39 GB | Standalone GGUF Model Artifact (Also on Hugging Face: `Experimentlab/Vigyan-Models-GGUF`) |

---

## Verification & Quality Gates

* **Automated Guardrails**: 205/205 files passing `scripts/verify_agent_guardrails.py` (Zero Unicode emojis, valid syntax, air-gap secured).
* **Test Suite**: 48/48 tests passing across STEM tools, CAS algebra, CLI commands, and process lifecycle (`pytest tests/ -v`).
* **License**: PolyForm Noncommercial License 1.0.0 with Section 8 AI Distillation Restrictions.
