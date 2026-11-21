# Vigyan Pro Workstation: Master Engineering Roadmap

```
Architecture: 100% On-Device Sovereign Silicon • Zero Cloud Egress • Permissive (BSD-3 / MIT / Apache 2.0)
Lead Organization: ExperimentLab AI (https://experimentlab.in)
Thesis: "One Product, One Claim, One Artefact — The Verified Computation Environment"
```

The master engineering roadmap for **Vigyan Pro Workstation**, the sovereign, air-gapped physical engineering and exact scientific intelligence desktop instrument.

---

## 🏛️ Executive Product Thesis

```
[ THE STRUCTURAL INVERSION ]
What we NEVER claim : A 4B model is as smart as a 700B frontier model.
What we ALWAYS claim: The arithmetic, the physical units, and the calculus are machine-checked,
                      and the answer arrives with a cryptographic receipt you can file, cite, and re-run.
```

Vigyan is an offline scientific workstation that turns a STEM question into a checked derivation. The language model acts strictly as a **router and planner** (choosing *what* to compute), deterministic CAS engines perform the **computing**, and the output is a **hash-verifiable derivation receipt (`.receipt.json`)**.

---

## 🎯 Active Milestone: v5.0.8 (Stable Release)

- [x] **Zero Local Compute Invariant**: Post-training, alignment, and GGUF quantization executed with zero local compute overhead.
- [x] **Multi-OS Native Distribution**:
  - Linux: Native `.deb` package (Debian/Ubuntu/Mint) and portable `.tar.gz`.
  - macOS: Universal binary (.tar.gz) supporting Apple Silicon (M1–M4) and Intel with Gatekeeper `xattr` auto-clearing.
  - Windows: Portable package with active unextracted ZIP preview trap and Inno Setup zero-admin installer (`ci/vigyan-pro-setup.iss`).
  - Terminal CLI: Universal 1-liner installer (`curl -fsSL https://experimentlab.in/install.sh | bash`).
- [x] **Wayland & Linux Display Hardening**: Automated `WEBKIT_DISABLE_DMABUF_RENDERER=1` and fallback backend negotiation on modern Linux (Ubuntu 24.04 / Fedora).

---

## ⚡ Immediate Critical Hotfix: v5.0.8 (Verification Integrity & CAS Enforcement)

### 🛡️ Eliminating False Badging & Hallucinatory Calculus
- [ ] **Kill False-Positive "CAS Verified" Badging**:
  - Audit `Chat.svelte` and `InlineArtifactPill.svelte` to remove unconditional `verified: true` flags on math keywords.
  - The green `• CAS Verified` badge must **strictly and exclusively render** when backend SymPy execution returns `success: true`. Unverified completions must carry `⚠️ Unverified LLM Heuristic`.
- [ ] **Deterministic Pre-Execution Interception**:
  - Upgrade natural language query parsing in `launch_desktop.py` (`_extract_math_expression`).
  - Automatically intercept definite/improper integrals (e.g. Dirichlet $\int_0^\infty \frac{\sin x}{x} dx = \pi/2$), derivatives, limits, and exact arithmetic ("2+2") *before* LLM generation.
  - Force SymPy to evaluate the analytical ground truth in < 5ms and inject it into the generation context so the LLM acts as an explanatory formatter rather than an error-prone probabilistic calculator.
- [ ] **Streaming Token Sanitization**:
  - Clean internal model training tokens (`<answer>`, `</answer>`, `<solution>`, `</solution>`) in the streaming parser to prevent raw XML tags leaking into user-facing derivations.

---

## 🧾 Flagship Product: The Derivation Receipt (`receipt.json` v1.0)

```
[ THE MOAT: VERIFICATION-AS-AN-ARTEFACT ]
Wolfram owns "correct computation" behind a subscription wall.
Cloud AI sells cheap unverified probabilistic tokens.
Vigyan Pro ships an auditable, reproducible, cryptographic receipt you can file in a thesis or patent.
```

### 1. Standardized Receipt Schema
Every verified computation emits a signed, offline JSON receipt:
```json
{
  "receipt_version": "1.0",
  "id": "sha256:9f2c...",
  "created_at": "2026-11-18T09:14:03+05:30",
  "question": "What is the integral of sin(x)/x from 0 to infinity?",
  "planner": {
    "model": "gemma-4-e4b-it",
    "quant": "Q4_K_M",
    "model_hash": "sha256:6588...",
    "seed": 42,
    "temperature": 0.0
  },
  "toolchain": {
    "engine": "vigyan-core 5.0.8",
    "sympy": "1.14.0",
    "pint": "0.24.4",
    "kernel": "SymPy AST Permissive Core"
  },
  "derivation": [
    {
      "step": 1,
      "op": "definite_integral",
      "expression": "integrate(sin(x)/x, (x, 0, oo))",
      "exact_analytical": "pi/2",
      "latex": "\\frac{\\pi}{2}",
      "numeric_approx": 1.5707963267948966
    }
  ],
  "verification": {
    "status": "PASSED",
    "symbolic": "passed (SymPy CAS 1.14.0 exact evaluation)",
    "units": "passed (dimensional analysis)",
    "residual_error": "0.000e+00"
  },
  "assumptions": ["Lebesgue integrable in improper sense", "Dirichlet kernel formulation"],
  "data_sources": ["deterministic-local-cas"],
  "environment": {
    "offline": true,
    "egress_attempts": 0,
    "os": "Linux / Windows / macOS"
  },
  "reproduce": {
    "command": "vigyan verify receipt.json",
    "expected_hash": "sha256:9f2c..."
  },
  "limitations": [
    "Derived via deterministic SymPy CAS AST parsing.",
    "Assumes standard real variable domain x in [0, oo)."
  ]
}
```

### 2. Receipt Tiers & Independent CLI Verifier
- **Tier 1 (Trace)**: Exact SymPy AST expression tree that executed.
- **Tier 2 (Trace + Hash)**: Same inputs and pinned engine version produce the same tree with cryptographic SHA-256 validation.
- **Tier 3 (Cryptographic Provenance)**: Full machine telemetry, exact AST tree, and cryptographic HMAC-SHA256 signature verification.
- **1-Click Turnkey Verification**:
  ```bash
  vigyan verify receipt.json
  # Checks schema, validates SHA-256 hash, and re-executes SymPy steps in < 10ms offline.
  ```

---

## 🚀 The Sovereign Model Fleet (Non-Chinese • Apache 2.0 • 4-bit)

```
[ THE SOVEREIGN COMPLIANCE FLEET ]
Strictly permissive Apache 2.0 open weights ensuring full data sovereignty and academic autonomy.
Unifies toolchains: Google Gemma 4 pipeline for Daily & Advanced; Ai2 open-lineage for Production.
```

| Tier | Sovereign Engine | Lab & Architecture | Upstream License | Footprint (4-bit) | Hardware Class | Core Strategic Role |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **4B (Default)** | **Gemma 4 E4B** | Google (4.5B eff / 8B MoE) | **Apache 2.0** | ~4.5–5.0 GB | 8–16 GB RAM Laptops | **Anti-Fabrication Edge Engine**: GPQA-D 58.6%. Refuses to guess or invent data when inputs are absent. |
| **7B (Middle)** | **OLMo 3 7B** | Ai2 (Dense 7B) | **Apache 2.0** | ~4.2 GB | 8–16 GB RAM | **100% Auditable Open Lineage**: Fully public Dolma pretraining data, code & checkpoints for open scientific audit. |
| **14B (Heavy)** | **Gemma 4 12B Unified** | Google (Dense 11.95B) | **Apache 2.0** | ~8.9 GB | 12–16 GB VRAM Workstations | **Doctoral Science Powerhouse**: GPQA-D 78.8%, MMLU-Pro 77.2%, AIME 77.5%. Shares tokenizer with 4B tier. |

---

## 🛡️ The Permissive Open Computation Stack (Zero GPL Copyleft)

| Component | Choice | License | Legal & Operational Role |
| :--- | :--- | :--- | :--- |
| **Symbolic Core**| **SymPy 1.14.0** (Pinned) | BSD-3-Clause | 100% commercially permissive exact CAS. Version hashed into every derivation receipt. |
| **AST Sandbox** | Deterministic SymPy AST Core | BSD-3-Clause | AST allowlist, subprocess isolation, CODATA constants, derivation sessions. |
| **Units & Physics**| **Pint** + SciPy CODATA | BSD-3-Clause | Dimensional analysis and physical constant retrieval. |
| **STRICTLY EXCLUDED**| Mathics3, SageMath, Maxima | GPL-3.0 / Copyleft | **Strictly banned from installer bundle** to prevent copyleft viral contamination. |

---

## 💰 Commercial Pricing & Business Model

Anchored against published Indian market data (ORA Pro at ₹4,999/yr, hardware appliances at ₹10.8 Lakh):

| Tier | Price | Model Tiers | Target Buyer | Commercial Terms |
| :--- | :--- | :--- | :--- | :--- |
| **Academic** | **₹0** (Free Forever) | 4B Tier + Receipts | Students, PhDs, University labs | Non-commercial research. No account required. |
| **Workstation** | **₹9,999** (One-Time) | 4B + 7B + 14B Tiers | Individual engineers, consultants | Commercial rights, GST invoice, UPI, no renewal. |
| **Lab Pack** | **₹39,999** (5 Seats) | All Tiers + Shared Archive | Research groups, university depts | Shared receipt archive, priority model packs. |
| **Air-Gap Deploy** | **from ₹1.5 Lakh** (Fixed) | Air-Gapped Appliance Pack | Semiconductor foundries, Genomics Labs, HPC | Encrypted media delivery, on-site install, DPDPA pack. |

---

## 📅 90-Day Execution Roadmap

### Phase 1: Days 1–30 (Make the Claim Real)
- [ ] Deliver v5.0.8 hotfix: Kill false CAS badges, enforce SymPy pre-execution, sanitize tokens.
- [ ] Standardize the `.receipt.json` schema and integrate `vigyan verify` into CLI.
- [ ] Enforce deterministic SymPy AST-sandboxed execution in `src/stem_engine.py`.
- [ ] Reconcile website positioning: Remove clinic/lawyer copy; lead with "Verified Computation Receipts".

### Phase 2: Days 31–60 (Prove Air-Gap Resilience)
- [ ] Record 3-minute air-gap install video with network disabled and stopwatch running.
- [ ] Publish printable installation runbook and cryptographic SHA-256 checksums.
- [ ] Run 200-problem verified arithmetic benchmark across all three model tiers and publish results.
- [ ] Package Gemma 4 E4B and OLMo 3 7B GGUF weights.

### Phase 3: Days 61–90 (Land Reference Customers)
- [ ] Target one restricted-data vertical (Semiconductor RTL design or Genomics).
- [ ] Ship DPDPA procurement pack (zero-egress data-flow diagram, DPA template, GST invoice sample).
- [ ] Formalize one narrow claim in Lean 4 (e.g. dimensional consistency in engineering review).
- [ ] Establish second maintainer / institutional advisory partner.

---

## ⚖️ Stopping Rule & Accountability Check

| Metric | Healthy (Continue Scaling) | Failing (Trigger Stopping Rule) | Check by |
| :--- | :--- | :--- | :--- |
| **Paid Adoption** | $\ge 10$ paid seats or 1 air-gap deployment | 0 paid seats | Month 6 |
| **Receipt Usage** | A third-party lab or paper cites a `.receipt.json` | Receipts generated but never shared | Month 9 |
| **Academic Funnel** | 3 of first 50 academic installs convert to paid lab | Free downloads with zero institutional interest | Month 12 |
| **Team Durability** | Second maintainer or advisory partner named | Still a single-person maintainer | Month 6 |
| **Integrity** | Zero arithmetic errors on 200 published benchmarks | Any uncorrected mathematical hallucination | Continuous |

> **The Honest Stopping Rule**: If by Month 12 there are **zero paying institutional customers, no second maintainer, and no receipts in active scientific use**, treat Vigyan as a valuable open-source research contribution: publish the paper, license the weights under Apache 2.0, and do not burn further runway competing against free consumer LLMs.
