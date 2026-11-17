# Vigyan Pro Workstation: Engineering Roadmap

```
Architecture: 100% On-Device Sovereign Silicon • Zero Cloud Egress • PolyForm Noncommercial 1.0.0
Lead Organization: ExperimentLab AI (https://experimentlab.in)
```

The engineering roadmap for **Vigyan Pro Workstation**, the sovereign, air-gapped physical engineering and exact scientific intelligence desktop instrument.

---

## 🎯 Current Milestone: v5.0.7 (Stable Release)

- [x] **Zero Local Compute Invariant**: Pre-training and quantization pipelines executed 100% cloud-to-cloud.
- [x] **Vigyan-3B Quad-Master Engine**: High-density IQ3_M importance-matrix quantization (~1.58 GB GGUF) operating in < 2 GB RAM with < 5ms memory reflex.
- [x] **Deterministic AST Grounding**: Embedded in-process SymPy Computer Algebra System (CAS) eliminating LLM calculus and arithmetic hallucinations.
- [x] **Multi-OS Native Distribution**:
  - Linux: Native `.deb` package (Debian/Ubuntu/Mint) and portable `.tar.gz`.
  - macOS: Universal binary (.tar.gz) supporting Apple Silicon (M1–M4) and Intel with Gatekeeper `xattr` auto-clearing.
  - Windows: Portable package with active unextracted ZIP preview trap and Inno Setup zero-admin installer (`ci/vigyan-pro-setup.iss`).
  - Terminal CLI: Universal 1-liner installer (`curl -fsSL https://experimentlab.in/install.sh | bash`).
- [x] **Wayland & Linux Display Hardening**: Automated `WEBKIT_DISABLE_DMABUF_RENDERER=1` and fallback backend negotiation on modern Linux (Ubuntu 24.04 / Fedora).

---

## 🚀 Near-Term Priorities: v5.1.0 (Q1 2027)

### 1. Inno Setup Windows Production Release
- [ ] Automate compilation of `Vigyan-Setup-5.0.7-x64.exe` via GitHub Actions CI matrix.
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
