"""
Sovereign In-Process LanceDB Vector & Document RAG Engine.
100% Offline, Zero-Daemon, Sub-Millisecond Vector Retrieval via PyArrow & FastEmbed.
"""

import os
import sys
import time
from typing import Dict, List, Any, Optional

try:
    import lancedb
    import pyarrow as pa
    from fastembed import TextEmbedding
    LANCEDB_AVAILABLE = True
except ImportError:
    LANCEDB_AVAILABLE = False


# Default Axiomatic STEM Corpus (Seeded when table is initialized)
DEFAULT_STEM_AXIOMS = [
    {
        "id": "maxwell_ampere_displacement",
        "topic": "Electrodynamics",
        "title": "Ampère-Maxwell Circuital Law & Displacement Current",
        "text": "Maxwell's addition to Ampère's Law accounts for time-varying electric flux: ∮ B·dl = μ₀(I_enc + ε₀ ∂Φ_E/∂t). The displacement current density J_d = ε₀ ∂E/∂t resolves the continuity equation ∇·J + ∂ρ/∂t = 0 inside charging capacitors and allows self-propagating electromagnetic wave propagation at speed c = 1/√(μ₀ε₀).",
        "latex": "\\oint_{\\partial \\Sigma} \\mathbf{B} \\cdot d\\mathbf{\\ell} = \\mu_0 \\left( I_{\\text{enc}} + \\varepsilon_0 \\frac{d}{dt} \\iint_\\Sigma \\mathbf{E} \\cdot d\\mathbf{A} \\right)"
    },
    {
        "id": "rlc_transient_underdamped",
        "topic": "Circuit Theory",
        "title": "Series RLC Transient Dynamics (Underdamped)",
        "text": "For a series RLC circuit with step voltage V₀, the characteristic equation is s² + (R/L)s + 1/(LC) = 0. Damping factor α = R/(2L), undamped resonant frequency ω₀ = 1/√(LC). When α < ω₀, the system is underdamped with damped oscillation frequency ω_d = √(ω₀² - α²). Capacitor voltage v_c(t) = V₀ - V₀ e^(-α t) [cos(ω_d t) + (α/ω_d) sin(ω_d t)].",
        "latex": "v_c(t) = V_0 \\left[ 1 - e^{-\\alpha t} \\left( \\cos(\\omega_d t) + \\frac{\\alpha}{\\omega_d} \\sin(\\omega_d t) \\right) \\right]"
    },
    {
        "id": "semiconductor_subthreshold_swing",
        "topic": "Semiconductors & VLSI",
        "title": "MOSFET Subthreshold Conduction Limit",
        "text": "In weak inversion (Vgs < Vth), MOSFET drain current operates via diffusion, yielding exponential dependence: I_d ∝ exp(q Vgs / (n k_B T)). The theoretical room-temperature limit for subthreshold swing S = (k_B T / q) ln(10) (1 + C_dep / C_ox) is approximately 60 mV/decade at 300K, dictating the Boltzmann Tyranny in modern CMOS voltage scaling.",
        "latex": "S = \\frac{k_B T}{q} \\ln(10) \\left( 1 + \\frac{C_{\\text{dep}}}{C_{\\text{ox}}} \\right) \\ge 60 \\, \\text{mV/decade}"
    },
    {
        "id": "navier_stokes_incompressible",
        "topic": "Fluid Dynamics",
        "title": "Incompressible Navier-Stokes Equations",
        "text": "Describes momentum conservation for constant-density Newtonian fluid: ρ (∂u/∂t + (u·∇)u) = -∇p + μ ∇²u + f. For irrotational inviscid flow, this reduces via Bernoulli's equation to p + 1/2 ρ v² + ρ g h = constant.",
        "latex": "\\rho \\left( \\frac{\\partial \\mathbf{u}}{\\partial t} + (\\mathbf{u} \\cdot \\nabla) \\mathbf{u} \\right) = -\\nabla p + \\mu \\nabla^2 \\mathbf{u} + \\mathbf{f}"
    },
    {
        "id": "fourier_transform_duality",
        "topic": "Signal Processing & Math",
        "title": "Continuous Fourier Transform & Time-Bandwidth Uncertainty",
        "text": "The forward Fourier transform is F(ω) = ∫_{-∞}^∞ f(t) e^(-i ω t) dt. Parseval's theorem ensures energy conservation: ∫ |f(t)|² dt = (1/2π) ∫ |F(ω)|² dω. Time-bandwidth uncertainty requires Δt Δω ≥ 1/2, with Gaussian wave packets achieving minimum uncertainty.",
        "latex": "\\mathcal{F}\\{f(t)\\}(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i \\omega t} \\, dt"
    },
    {
        "id": "ohms_and_kirchhoff_laws",
        "topic": "Circuit Theory",
        "title": "Kirchhoff's Current and Voltage Laws (KCL & KVL)",
        "text": "KCL (Conservation of Charge): The algebraic sum of currents entering any circuit node is zero: ∑ I_k = 0. KVL (Conservation of Energy): The algebraic sum of electrical potential differences around any closed circuit loop is zero: ∮ E·dl = 0, ∑ V_k = 0.",
        "latex": "\\sum_{k} I_k = 0, \\quad \\sum_{k} V_k = 0"
    }
]


class SovereignLanceDBEngine:
    """In-process, zero-daemon vector database powered by LanceDB and FastEmbed."""

    _instance = None

    @classmethod
    def get_instance(cls, db_path: Optional[str] = None):
        if cls._instance is None:
            cls._instance = cls(db_path=db_path)
        return cls._instance

    def __init__(self, db_path: Optional[str] = None):
        if not LANCEDB_AVAILABLE:
            self.available = False
            self.db = None
            self.embedder = None
            return

        if not db_path:
            candidates = [
                os.path.expanduser("~/.vigyan/data/lancedb"),
                "/home/hello/.local/vigyan/data/lancedb",
                os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "lancedb")
            ]
            for c in candidates:
                if os.path.exists(c):
                    db_path = c
                    break
            if not db_path:
                db_path = os.path.expanduser("~/.vigyan/data/lancedb")

        self.db_path = os.path.expanduser(db_path)
        os.makedirs(self.db_path, exist_ok=True)

        try:
            self.db = lancedb.connect(self.db_path)
            self.embedder = TextEmbedding()
            self.available = True
            self._ensure_stem_table()
            self._ensure_user_docs_table()
        except Exception as e:
            sys.stderr.write(f"[LanceDB] Initialization warning: {e}\n")
            self.available = False
            self.db = None
            self.embedder = None

    def _get_table_names(self) -> List[str]:
        if not self.db:
            return []
        try:
            res = self.db.list_tables()
            if hasattr(res, "tables"):
                return res.tables
            return list(res)
        except Exception:
            try:
                return self.db.table_names()
            except Exception:
                return []

    def _ensure_stem_table(self):
        """Initializes and seeds the STEM axiomatic table if absent or empty."""
        if not self.available or not self.db:
            return
        tables = self._get_table_names()
        if "stem_knowledge" not in tables:
            rows = []
            texts = [f"{a['title']}: {a['text']}" for a in DEFAULT_STEM_AXIOMS]
            vectors = list(self.embedder.embed(texts))
            for i, a in enumerate(DEFAULT_STEM_AXIOMS):
                rows.append({
                    "id": a["id"],
                    "topic": a["topic"],
                    "title": a["title"],
                    "text": a["text"],
                    "latex": a.get("latex", ""),
                    "vector": vectors[i].tolist()
                })
            try:
                self.db.create_table("stem_knowledge", data=rows, exist_ok=True)
            except Exception:
                pass

    def _ensure_user_docs_table(self):
        """Ensures user document ingest table exists."""
        if not self.available or not self.db:
            return
        tables = self._get_table_names()
        if "user_docs" not in tables:
            # Seed with schema structure
            dummy_text = "Vigyan Pro Sovereign In-Process Document Store initialized."
            vec = list(self.embedder.embed([dummy_text]))[0].tolist()
            initial_data = [{
                "id": "init_anchor",
                "filename": "system",
                "chunk_id": 0,
                "text": dummy_text,
                "vector": vec,
                "timestamp": time.time()
            }]
            try:
                self.db.create_table("user_docs", data=initial_data, exist_ok=True)
            except Exception:
                pass

    def query_context(self, query: str, top_k: int = 3) -> str:
        """Returns verified scientific grounding context for prompt injection in <2ms."""
        if not self.available or not self.db or not self.embedder:
            return ""

        try:
            q_vec = list(self.embedder.embed([query]))[0].tolist()
            context_pieces: List[str] = []

            # 1. Search STEM axiomatic table
            tables = self._get_table_names()
            if "stem_knowledge" in tables:
                stem_tbl = self.db.open_table("stem_knowledge")
                res = stem_tbl.search(q_vec).limit(top_k).to_arrow()
                for i in range(len(res)):
                    score = res["_distance"][i].as_py() if "_distance" in res.column_names else 0.0
                    if score < 1.15:
                        t = res["title"][i].as_py()
                        content = res["text"][i].as_py()
                        ltx = res["latex"][i].as_py() if "latex" in res.column_names else ""
                        piece = f"• **{t}**: {content}"
                        if ltx:
                            piece += f" (Formula: `{ltx}`)"
                        context_pieces.append(piece)

            # 2. Search Ingested User Docs (Datasheets / PDFs)
            if "user_docs" in tables:
                docs_tbl = self.db.open_table("user_docs")
                doc_res = docs_tbl.search(q_vec).limit(top_k).to_arrow()
                for i in range(len(doc_res)):
                    doc_id = doc_res["id"][i].as_py()
                    if doc_id == "init_anchor":
                        continue
                    score = doc_res["_distance"][i].as_py() if "_distance" in doc_res.column_names else 0.0
                    if score < 1.15:
                        fn = doc_res["filename"][i].as_py()
                        txt = doc_res["text"][i].as_py()
                        context_pieces.append(f"• **[Document: {fn}]**: {txt}")

            if not context_pieces:
                return ""

            return "\n[GROUNDING KNOWLEDGE - In-Process LanceDB Vector Store]:\n" + "\n".join(context_pieces) + "\n"
        except Exception as e:
            sys.stderr.write(f"[LanceDB] Search query error: {e}\n")
            return ""

    def index_text_document(self, filename: str, text: str, chunk_size: int = 500) -> int:
        """Indexes user documents into LanceDB with instant vectorization."""
        if not self.available or not self.db or not self.embedder:
            return 0

        # Chunk text by paragraphs or length
        raw_chunks = [c.strip() for c in text.split("\n\n") if len(c.strip()) > 30]
        if not raw_chunks:
            raw_chunks = [text[i:i+chunk_size].strip() for i in range(0, len(text), chunk_size) if len(text[i:i+chunk_size].strip()) > 30]

        if not raw_chunks:
            return 0

        vectors = list(self.embedder.embed(raw_chunks))
        now = time.time()
        rows = []
        for i, chunk in enumerate(raw_chunks):
            rows.append({
                "id": f"{filename}_{i}_{int(now)}",
                "filename": filename,
                "chunk_id": i,
                "text": chunk,
                "vector": vectors[i].tolist(),
                "timestamp": now
            })

        try:
            docs_tbl = self.db.open_table("user_docs")
            docs_tbl.add(rows)
            return len(rows)
        except Exception as e:
            sys.stderr.write(f"[LanceDB] Document indexing error: {e}\n")
            return 0
