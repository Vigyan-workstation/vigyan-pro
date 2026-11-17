# Vigyan Pro Workstation: Engineering Roadmap

```
Architecture: 100% On-Device Sovereign Silicon • Zero Cloud Egress • PolyForm Noncommercial 1.0.0
Lead Organization: ExperimentLab AI (https://experimentlab.in)
```

The engineering roadmap for **Vigyan Pro Workstation**, the sovereign, air-gapped physical engineering and exact scientific intelligence desktop instrument.

---

## 🎯 Current Milestone: v5.0.7 (Stable Release)

- [x] **Zero Local Compute Invariant**: Pre-training and quantization pipelines executed 100% cloud-to-cloud.
- [x] **Vigyan-3B Quad-Master Engine**: High-density IQ3_M importance-matrix quantization (~1.39 GB GGUF) operating in < 2 GB RAM with < 5ms memory reflex.
- [x] **Deterministic AST Grounding**: Embedded in-process SymPy Computer Algebra System (CAS) eliminating LLM calculus and arithmetic hallucinations.
- [x] **Multi-OS Native Distribution**:
  - Linux: Native `.deb` package (Debian/Ubuntu/Mint) and portable `.tar.gz`.
  - macOS: Universal binary (.tar.gz) supporting Apple Silicon (M1–M4) and Intel with Gatekeeper `xattr` auto-clearing.
  - Windows: Portable package with active unextracted ZIP preview trap and Inno Setup zero-admin installer (`ci/vigyan-pro-setup.iss`).
  - Terminal CLI: Universal 1-liner installer (`curl -fsSL https://experimentlab.in/install.sh | bash`).
- [x] **Wayland & Linux Display Hardening**: Automated `WEBKIT_DISABLE_DMABUF_RENDERER=1` and fallback backend negotiation on modern Linux (Ubuntu 24.04 / Fedora).

---

## 🚀 Flagship Architectural Transition: v5.1.0 (Next Version)

### 🌟 4B Sovereign Engine Migration: Deprecating 3B for Qwen 3.5 4B IQ3_M
- [ ] **Phase 1: Zero-Cost Cloud Pretraining & Alignment ($0.00 Kaggle Dual T4)**:
  - Base Model: `Qwen/Qwen3.5-4B` (**100% Apache 2.0 Permissive**).
  - Multi-adapter STEM SFT (Calculus, Physical Chemistry, Verilog HDL, CAD/Orbital).
  - Targeted STEM DPO with SymPy CAS zero-residual verification.
  - Importance-matrix calibration (`llama-imatrix`) on STEM corpus chunks.
  - Export: `vigyan-4b-quad-master-iq3_m.gguf` (~1.95 GB, 3.66 bpw).
- [ ] **Phase 2: 100-Question Audited Benchmark Certification**:
  - Prove empirical superiority over Vigyan-3B (target: $\ge 75\%$ pass rate on 100-question unseen STEM suite).
  - Verify zero-regression in synthesizable Verilog and SymPy proofs.
- [ ] **Phase 3: Workstation Core & CLI Engine Swap**:
  - Replace default runtime target in `launch_desktop.py`, `vigyan_cli.py`, and `llama_supervisor.py` with `vigyan-4b-quad-master-iq3_m.gguf`.
  - Preserve backward compatibility for users with existing `vigyan-3b` files on disk.
  - Update `ModelsDrawer.svelte` catalog: Flagship daily driver promoted to **4B Daily (Apache 2.0)**.
- [ ] **Phase 4: Multi-OS Installer & Portal Alignment**:
  - Update Windows Inno Setup installer script (`ci/vigyan-pro-setup.iss`) to pull the 4B engine.
  - Synchronize download portal at [experimentlab.in/download](https://experimentlab.in/download) and Cloudflare Functions.

---

## 🛠️ Feature & Desktop Instrumentation: v5.1.0

### 1. Inno Setup Windows Production Release
- [ ] Automate compilation of `Vigyan-Setup-5.1.0-x64.exe` via GitHub Actions CI matrix.
- [ ] Direct single-click desktop installation for Windows users without archive extraction friction.

### 2. Deterministic STEM AST Expansion
- [ ] **Bode & Nyquist Frequency Analysis**: Real-time frequency response and gain/phase margin calculations for control system engineering.
- [ ] **Coupled ODE / State-Space Solvers**: Symbolic solution verification for mechanical mass-spring-damper and multi-loop RLC circuits.
- [ ] **Extended 1-Click LaTeX Compiler**: Direct `.tex` compilation to publication-ready PDF formats matching IEEE/ACM templates.

### 3. Local Ingestion & Technical Data
- [ ] Standalone offline `.csv`, `.tsv`, and `.dat` numeric data inspector.
- [ ] Zero-dependency tabular statistics and regression curves rendered natively in the WebKit viewport.

---

## 🏢 Enterprise & Strategic Air-Gap (B2B Fleet)

- [x] **B2B Custom Workstation Portal**: Live request pipeline on [experimentlab.in/download](https://experimentlab.in/download) for defense, aerospace, and proprietary engineering labs.
- [ ] **Air-Gap Hardware Verification Kit**: Automated cryptographic checksum validation (`SHA256SUMS`) and zero-socket verification tests for strict ITAR / defense compliance.
- [ ] **Domain Micro-Adapters**: Support for hot-swapping private domain fine-tunes (aerospace telemetry, VLSI/RTL, biomedical) onto the base 3B engine without base model weight drift.

---

## 🤝 Community Bug Reports & Feedback

We keep engineering overhead lean:
- **Found a bug?** Submit an issue directly at: [Vigyan-workstation/vigyan-pro/issues](https://github.com/Vigyan-workstation/vigyan-pro/issues)
- **Feature suggestions?** Open a discussion or RFC using our issue templates.
- **Join the Builders**: Discuss architecture and benchmarks in our [Discord Community](https://discord.gg/9W7wD6K).
