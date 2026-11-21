"""
Vigyan Pro Workstation — Deterministic STEM Engine (v5.0.8)
Split from launch_desktop.py: SymPy AST sandbox, math-expression extraction,
curated GraphRAG axioms, and neuro-symbolic query enrichment.
"""

import os
import re
import sys
import ast
import math
import time
import logging
import hashlib
import threading
from typing import Dict, Any, Optional

logger = logging.getLogger("vigyan.desktop")

from vigyan_hardware import get_system_telemetry

_SAFE_MATH_NODES = (
    ast.Expression, ast.BinOp, ast.UnaryOp, ast.Call, ast.Name,
    ast.Constant, ast.Add, ast.Sub, ast.Mult, ast.Div,
    ast.Pow, ast.USub, ast.UAdd, ast.Mod, ast.FloorDiv, ast.Load
)

_SAFE_MATH_ENV = {
    "sin": math.sin, "cos": math.cos, "tan": math.tan,
    "asin": math.asin, "acos": math.acos, "atan": math.atan,
    "sinh": math.sinh, "cosh": math.cosh, "tanh": math.tanh,
    "exp": math.exp, "log": math.log, "log10": math.log10, "log2": math.log2,
    "ln": math.log, "sqrt": math.sqrt, "abs": abs,
    "pi": math.pi, "e": math.e, "tau": math.tau,
}


# ==============================================================================
# 2. EMBEDDED NEURO-SYMBOLIC ENGINE (SYMPY AST + KÙZUDB GRAPHRAG BRIDGE)
# ==============================================================================
_SYMPY_ENGINE = None
_STEM_GRAPH = None
try:
    import sympy as sp
    from concurrent.futures import ThreadPoolExecutor, TimeoutError as FuturesTimeoutError

    class _FallbackSymPyEngine:
        def __init__(self):
            # Standard scientific symbols across physics, math, and engineering
            self.safe_dict = {
                "x": sp.Symbol("x"), "y": sp.Symbol("y"), "z": sp.Symbol("z"),
                "t": sp.Symbol("t"), "s": sp.Symbol("s"), "n": sp.Symbol("n", integer=True),
                "k": sp.Symbol("k"), "R": sp.Symbol("R", positive=True),
                "C": sp.Symbol("C", positive=True), "L": sp.Symbol("L", positive=True),
                "v": sp.Symbol("v"), "u": sp.Symbol("u"), "a": sp.Symbol("a"),
                "m": sp.Symbol("m", positive=True), "F": sp.Symbol("F"), "r": sp.Symbol("r", positive=True),
                "p": sp.Symbol("p"), "T": sp.Symbol("T", positive=True), "w": sp.Symbol("w"),
                "I": sp.Symbol("I"), "q": sp.Symbol("q"), "V": sp.Symbol("V"),
                "pi": sp.pi, "e": sp.E, "E": sp.E, "oo": sp.oo, "inf": sp.oo,
                "sin": sp.sin, "cos": sp.cos, "tan": sp.tan, "asin": sp.asin, "acos": sp.acos, "atan": sp.atan,
                "sinh": sp.sinh, "cosh": sp.cosh, "tanh": sp.tanh, "exp": sp.exp,
                "log": sp.log, "ln": sp.log, "sqrt": sp.sqrt, "diff": sp.diff,
                "integrate": sp.integrate, "solve": sp.solve, "simplify": sp.simplify,
                "expand": sp.expand, "factor": sp.factor, "limit": sp.limit,
                "series": sp.series, "dsolve": sp.dsolve, "Matrix": sp.Matrix,
                "Eq": sp.Eq, "symbols": sp.symbols, "Symbol": sp.Symbol,
                "Derivative": sp.Derivative, "Function": sp.Function,
                "Integer": sp.Integer, "Float": sp.Float, "Rational": sp.Rational, "Number": sp.Number
            }
            self._cache: Dict[str, Dict[str, Any]] = {}
            self._cache_lock = threading.Lock()
            self._executor = ThreadPoolExecutor(max_workers=2, thread_name_prefix="vigyan_sympy")
            try:
                from sympy.parsing.sympy_parser import (
                    parse_expr,
                    standard_transformations,
                    implicit_multiplication_application,
                    convert_xor
                )
                self._parse_expr = parse_expr
                self._transformations = standard_transformations + (implicit_multiplication_application, convert_xor)
            except Exception:
                self._parse_expr = None
                self._transformations = None

        def _clean_math_str(self, s: str) -> str:
            s = s.strip()
            s = s.replace("²", "**2").replace("³", "**3").replace("⁴", "**4").replace("⁻¹", "**(-1)")
            s = s.replace("−", "-").replace("×", "*").replace("÷", "/").replace("π", "pi").replace("√", "sqrt")
            # Disallow dangerous builtins and code execution primitives
            disallowed = (
                "__", "import", "eval", "exec", "open", "os", "sys", "subprocess",
                "lambda", "globals", "locals", "getattr", "setattr", "delattr",
                "system", "pty", "shutil", "compile", "breakpoint"
            )
            for bad in disallowed:
                if bad in s.lower():
                    return ""
            # Syntax normalization: 2x -> 2*x (avoid scientific notation like 1e-4)
            s = re.sub(r'(\d)(?![eE][+-]?\d)([a-zA-Z])', r'\1*\2', s)
            s = re.sub(r'(\d)\(', r'\1*(', s)
            s = re.sub(r'\)([\w\(])', r')*\1', s)
            return s

        def _is_safe_ast(self, expr_str: str) -> bool:
            try:
                tree = ast.parse(expr_str, mode="eval")
                allowed_nodes = (
                    ast.Expression, ast.BinOp, ast.UnaryOp, ast.Constant,
                    ast.Add, ast.Sub, ast.Mult, ast.Div, ast.Pow,
                    ast.FloorDiv, ast.Mod, ast.UAdd, ast.USub, ast.Name,
                    ast.Call, ast.Load, ast.Tuple, ast.List,
                    ast.BitXor, ast.BitAnd, ast.Invert, ast.keyword
                )
                disallowed_names = {
                    "import", "eval", "exec", "open", "os", "sys", "subprocess",
                    "lambda", "globals", "locals", "getattr", "setattr", "delattr",
                    "system", "pty", "shutil", "compile", "breakpoint", "quit", "exit"
                }
                for node in ast.walk(tree):
                    if not isinstance(node, allowed_nodes):
                        return False
                    if isinstance(node, ast.Attribute):
                        return False
                    if isinstance(node, ast.Name):
                        if node.id.startswith("__") or node.id.lower() in disallowed_names:
                            return False
                        # Dynamically register valid variable symbols if safe
                        if node.id not in self.safe_dict:
                            if re.match(r'^[a-zA-Z][a-zA-Z0-9_]*$', node.id):
                                self.safe_dict[node.id] = sp.Symbol(node.id)
                            else:
                                return False
                return True
            except Exception:
                return False

        def _eval_core(self, s: str) -> Dict[str, Any]:
            local_dict = dict(self.safe_dict)
            transformations = self._transformations
            if "dsolve" in s or "Derivative" in s:
                local_dict["y"] = sp.Function("y")
                from sympy.parsing.sympy_parser import standard_transformations, convert_xor
                transformations = standard_transformations + (convert_xor,)

            if self._parse_expr:
                res = self._parse_expr(
                    s,
                    local_dict=local_dict,
                    global_dict={"__builtins__": {}},
                    transformations=transformations
                )
            else:
                res = eval(s, {"__builtins__": {}}, local_dict)

            latex_res = sp.latex(res) if isinstance(res, (sp.Basic, sp.Matrix, list, tuple)) else str(res)
            num = None
            if hasattr(res, "evalf") and not getattr(res, "free_symbols", None):
                try:
                    num = float(res.evalf(6))
                except Exception:
                    num = None
            elif isinstance(res, (int, float)):
                num = float(res)
            return {"success": True, "result": str(res), "latex": latex_res, "numeric_approx": num, "cached": False}

        def evaluate_expression(self, expr_str: str, timeout_sec: float = 2.5) -> Dict[str, Any]:
            s = self._clean_math_str(expr_str)
            if not s:
                return {"success": False, "error": "Mathematical expression contains disallowed syntax or keywords"}

            import hashlib
            cache_key = hashlib.sha256(s.encode("utf-8")).hexdigest()
            with self._cache_lock:
                if cache_key in self._cache:
                    hit = dict(self._cache[cache_key])
                    hit["cached"] = True
                    hit["latency_ms"] = 0.0
                    return hit

            if "=" in s and not ("==" in s or "Eq" in s or "<=" in s or ">=" in s):
                parts = s.split("=", 1)
                s = f"solve(Eq({parts[0].strip()}, {parts[1].strip()}))"

            if not self._is_safe_ast(s):
                return {"success": False, "error": "Mathematical expression contains disallowed syntax"}

            try:
                future = self._executor.submit(self._eval_core, s)
                out = future.result(timeout=timeout_sec)
                with self._cache_lock:
                    if len(self._cache) > 2048:
                        self._cache.pop(next(iter(self._cache)))
                    self._cache[cache_key] = out
                return out
            except FuturesTimeoutError:
                return {"success": False, "error": f"Evaluation timed out after {timeout_sec}s"}
            except Exception as exc:
                return {"success": False, "error": f"Evaluation error: {str(exc)}"}

    _SYMPY_ENGINE = _FallbackSymPyEngine()
except Exception:
    _SYMPY_ENGINE = None
# Curated deterministic GraphRAG knowledge base (always available even if KùzuDB is locked)
CURATED_GRAPH_AXIOMS = [
    {
        "keywords": ["ohm", "resistor", "voltage", "current", "resistance"],
        "law": "Ohm's Law & Joule Heating",
        "domain": "Circuits",
        "equation": "V = I \\cdot R, \\quad P = I^2 R = \\frac{V^2}{R}",
        "axiom": "Potential difference across an ideal conductor is proportional to current; microscopic form J = sigma E.",
    },
    {
        "keywords": ["rc", "cutoff", "filter", "sallen", "capacitor", "time constant"],
        "law": "RC Filter & Cutoff Frequency",
        "domain": "Signal Processing",
        "equation": "\\tau = R C, \\quad f_c = \\frac{1}{2\\pi R C}, \\quad H(s) = \\frac{1}{1 + s R C}",
        "axiom": "3dB corner frequency where output power drops by 50% (-3 dB) with -45 deg phase shift.",
    },
    {
        "keywords": ["rlc", "resonance", "resonant", "tank", "inductor", "q factor"],
        "law": "RLC Resonance & Quality Factor",
        "domain": "RF & Circuits",
        "equation": "f_0 = \\frac{1}{2\\pi\\sqrt{LC}}, \\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}",
        "axiom": "At resonance X_L = X_C, reactive impedance cancels and energy oscillates between magnetic (L) and electric (C) fields.",
    },
    {
        "keywords": ["555", "astable", "timer", "oscillator", "pwm", "duty"],
        "law": "NE555 Astable Multivibrator Timing",
        "domain": "Analog ICs",
        "equation": "f = \\frac{1.44}{(R_A + 2 R_B) C}, \\quad D = \\frac{R_A + R_B}{R_A + 2 R_B}",
        "axiom": "Capacitor charges between 1/3 Vcc and 2/3 Vcc comparator thresholds via RA+RB and discharges through RB.",
    },
    {
        "keywords": ["mosfet", "saturation", "finfet", "gaa", "transistor", "vgs", "vds", "dibl", "subthreshold"],
        "law": "MOSFET Saturation & Subthreshold Conduction",
        "domain": "Semiconductor VLSI",
        "equation": "I_D = \\frac{1}{2}\\mu_n C_{ox}\\frac{W}{L}(V_{GS}-V_{th})^2(1+\\lambda V_{DS}), \\quad SS = \\ln(10)\\frac{k_B T}{q}\\left(1+\\frac{C_d}{C_{ox}}\\right)",
        "axiom": "Pinch-off saturation occurs for Vds >= Vgs - Vth; room-temperature thermionic subthreshold limit is 60 mV/decade.",
    },
    {
        "keywords": ["bandgap", "silicon", "gaas", "gan", "pn", "junction", "depletion", "diode", "shockley"],
        "law": "PN Junction Depletion & Shockley Diode Law",
        "domain": "Solid-State Physics",
        "equation": "I = I_s\\left(e^{\\frac{qV}{n k_B T}} - 1\\right), \\quad V_{bi} = \\frac{k_B T}{q}\\ln\\left(\\frac{N_A N_D}{n_i^2}\\right)",
        "axiom": "Si Eg = 1.12 eV (indirect), GaAs Eg = 1.42 eV (direct), GaN Eg = 3.40 eV (wide bandgap).",
    },
    {
        "keywords": ["orbit", "kepler", "satellite", "vis-viva", "gravity", "escape"],
        "law": "Vis-Viva & Kepler's Third Law",
        "domain": "Astrodynamics",
        "equation": "v^2 = GM\\left(\\frac{2}{r} - \\frac{1}{a}\\right), \\quad T^2 = \\frac{4\\pi^2}{GM}a^3",
        "axiom": "Conservation of specific orbital energy E = -GM/(2a) and angular momentum h = r x v.",
    },
    {
        "keywords": ["rocket", "tsiolkovsky", "propulsion", "impulse", "delta-v"],
        "law": "Tsiolkovsky Rocket Equation",
        "domain": "Aerospace",
        "equation": "\\Delta v = I_{sp} g_0 \\ln\\left(\\frac{m_0}{m_f}\\right), \\quad g_0 = 9.80665\\text{ m/s}^2",
        "axiom": "Momentum conservation for variable-mass reaction propulsion vehicles.",
    },
    {
        "keywords": ["quantum", "schrodinger", "tunneling", "wavefunction", "harmonic", "planck"],
        "law": "Time-Independent Schrödinger Equation & Tunneling",
        "domain": "Quantum Mechanics",
        "equation": "-\\frac{\\hbar^2}{2m}\\nabla^2\\psi + V(\\mathbf{r})\\psi = E\\psi, \\quad E_n = \\left(n + \\frac{1}{2}\\right)\\hbar\\omega",
        "axiom": "Wavefunction transmission through a finite barrier decays exponentially with barrier width and root height.",
    },
    {
        "keywords": ["fcc", "bcc", "hcp", "perovskite", "crystal", "miller", "bragg", "xrd", "eutectic", "lattice"],
        "law": "Bragg's Law & Crystallographic Packing",
        "domain": "Materials Science",
        "equation": "n\\lambda = 2 d_{hkl}\\sin\\theta, \\quad d_{hkl} = \\frac{a}{\\sqrt{h^2+k^2+l^2}}, \\quad \\text{APF}_{\\text{FCC}} = 0.74",
        "axiom": "FCC (Cu, Al, Au) has APF=0.74 and CN=12; BCC (Fe, W) has APF=0.68 and CN=8; Pb-Sn eutectic is at 183 C, 61.9 wt% Sn.",
    },
    {
        "keywords": ["dna", "helix", "protein", "membrane", "atp", "enzyme", "michaelis", "ion channel", "nernst"],
        "law": "Nernst Potential & Michaelis-Menten Kinetics",
        "domain": "Molecular Biology",
        "equation": "E_{\\text{ion}} = \\frac{RT}{zF}\\ln\\frac{[\\text{Ion}]_{\\text{out}}}{[\\text{Ion}]_{\\text{in}}}, \\quad v = \\frac{V_{\\max}[S]}{K_m + [S]}",
        "axiom": "B-DNA has 10.5 bp/turn and 3.4 nm pitch; A=T forms 2 H-bonds and G=C forms 3 H-bonds.",
    },
    {
        "keywords": ["saddle", "paraboloid", "gaussian", "curvature", "hessian", "curl", "divergence", "taylor", "stokes"],
        "law": "Gaussian Curvature, Vector Curl & Taylor Expansion",
        "domain": "Differential Geometry & Calculus",
        "equation": "K = \\frac{f_{xx}f_{yy} - f_{xy}^2}{(1 + f_x^2 + f_y^2)^2}, \\quad \\oint_{\\partial\\Sigma}\\mathbf{F}\\cdot d\\mathbf{r} = \\iint_{\\Sigma}(\\nabla\\times\\mathbf{F})\\cdot d\\mathbf{S}",
        "axiom": "Hyperbolic paraboloid z = x^2/a^2 - y^2/b^2 has negative Gaussian curvature K < 0 everywhere.",
    },
    {
        "keywords": ["ecg", "stemi", "sepsis", "embolism", "troponin", "lactate", "medical", "vitals", "cardiac"],
        "law": "Hemodynamic Oxygen Delivery & Mean Arterial Pressure",
        "domain": "Clinical Medicine",
        "equation": "\\text{MAP} = \\text{DBP} + \\frac{1}{3}(\\text{SBP} - \\text{DBP}), \\quad DO_2 = CO \\times (1.34 \\cdot \\text{Hb} \\cdot S_aO_2 + 0.003 P_aO_2)",
        "axiom": "STEMI exhibits ST-segment elevation in contiguous leads with elevated hs-cTnI; Septic Shock requires MAP >= 65 mmHg.",
    },
    {
        "keywords": ["gear", "propeller", "heatsink", "truss", "stress", "torsion", "beam"],
        "law": "Epicyclic Gear Ratio & Fin Heat Transfer",
        "domain": "Mechanical Engineering",
        "equation": "i = 1 + \\frac{Z_{\\text{ring}}}{Z_{\\text{sun}}}, \\quad q_{\\text{fin}} = \\sqrt{hPkA_c}(T_b - T_\\infty)\\tanh(mL)",
        "axiom": "Planetary gear train distributes torque across planet pinions; microchannel fins maximize convective surface area.",
    },
]
def _extract_math_expression(query: str) -> Optional[str]:
    """Extract a SymPy-evaluable expression from natural language STEM prompts."""
    q = query.strip()
    q_lower = q.lower().strip("?.! \t")

    # 1. Explicit SymPy function calls inside text
    direct_call = re.search(
        r"\b(integrate|diff|solve|simplify|expand|factor|limit|series|dsolve|Matrix)\s*\([^\n]+?\)",
        q
    )
    if direct_call:
        return direct_call.group(0).replace("^", "**")

    # Helper to clean mathematical boundary symbols
    def _clean_bound(val: str) -> str:
        v = val.strip().lower()
        if v in ("-inf", "-infinity", "-oo"):
            return "-oo"
        if v in ("inf", "infinity", "+inf", "oo", "+oo"):
            return "oo"
        if v in ("pi", "tau", "e"):
            return v
        return v

    # 2. Definite integral: integrate/integral of <expr> from <a> to <b>
    m_def = re.search(r"(?:integrate|integral\s+of)\s+(.+?)\s+from\s+([^\s]+)\s+to\s+([^\s\?\.]+)", q_lower)
    if m_def:
        expr, a, b = m_def.groups()
        expr = expr.replace("dx", "").replace("^", "**").strip()
        a_sym = _clean_bound(a)
        b_sym = _clean_bound(b)
        symbols = [s for s in re.findall(r"\b([a-zA-Z])\b", expr) if s not in ("e", "d", "pi", "oo")]
        var = symbols[0] if symbols else "x"
        return f"integrate({expr}, ({var}, {a_sym}, {b_sym}))"

    # 3. Indefinite integral
    m_indef = re.search(r"(?:integrate|integral\s+of)\s+([^\?\.\n]+)", q_lower)
    if m_indef:
        expr = m_indef.group(1).replace("dx", "").replace("^", "**").strip()
        if expr and len(expr) < 80:
            symbols = [s for s in re.findall(r"\b([a-zA-Z])\b", expr) if s not in ("e", "d", "pi", "oo")]
            var = symbols[0] if symbols else "x"
            return f"integrate({expr}, {var})"

    # 4. Limits: limit of <expr> as x -> <val> OR limit as x approaches <val> of <expr>
    m_lim1 = re.search(r"limit\s+(?:of\s+)?(.+?)\s+(?:as|when)\s+([a-zA-Z])\s*(?:->|approaches|to)\s*([^\s\?\.]+)", q_lower)
    if m_lim1:
        expr, var, target = m_lim1.groups()
        expr = expr.replace("^", "**").strip()
        target_sym = _clean_bound(target)
        return f"limit({expr}, {var}, {target_sym})"

    m_lim2 = re.search(r"limit\s+as\s+([a-zA-Z])\s*(?:->|approaches|to)\s*([^\s\?\.]+)\s+(?:of\s+)?(.+)", q_lower)
    if m_lim2:
        var, target, expr = m_lim2.groups()
        expr = expr.replace("^", "**").strip()
        target_sym = _clean_bound(target)
        return f"limit({expr}, {var}, {target_sym})"

    # 5. Derivatives
    m_diff = re.search(r"(?:derivative\s+of|differentiate)\s+([^\?\.\n]+)", q_lower)
    if m_diff:
        target = m_diff.group(1).replace("^", "**").strip()
        m_wrt = re.search(r"(.*?)\s+(?:with\s+respect\s+to|wrt)\s+([a-zA-Z])", target)
        if m_wrt:
            expr, var = m_wrt.groups()
            return f"diff({expr.strip()}, {var.strip()})"
        if target and len(target) < 80:
            symbols = [s for s in re.findall(r"\b([a-zA-Z])\b", target) if s not in ("e", "d", "pi", "oo")]
            var = symbols[0] if symbols else "x"
            return f"diff({target}, {var})"

    # 6. Ordinary Differential Equations (ODEs)
    m_ode = re.search(r"(?:solve\s+)?(?:differential\s+equation|ode)\s+([^\n]+)", q_lower)
    if m_ode:
        raw_ode = m_ode.group(1).strip()
        ode_norm = raw_ode.replace("dy/dx", "Derivative(y(x), x)").replace("y'", "Derivative(y(x), x)")
        if "Derivative(y(x), x)" in ode_norm:
            ode_norm = re.sub(r"\by\b(?!\()", "y(x)", ode_norm)
            if "=" in ode_norm:
                lhs, rhs = ode_norm.split("=", 1)
                return f"dsolve(Eq({lhs.strip()}, {rhs.strip()}), y(x))"
            return f"dsolve({ode_norm}, y(x))"

    # 7. Multivariable equation systems: solve <eq1> and <eq2>
    m_sys = re.search(r"solve\s+(.+?)\s+and\s+(.+)", q_lower)
    if m_sys:
        eq1, eq2 = m_sys.group(1).strip(), m_sys.group(2).strip()
        def _to_eq(eq_str: str) -> str:
            if "=" in eq_str:
                l, r = eq_str.split("=", 1)
                return f"Eq({l.strip().replace('^', '**')}, {r.strip().replace('^', '**')})"
            return eq_str.replace("^", "**")
        all_text = eq1 + " " + eq2
        vars_found = sorted(set(re.findall(r"\b([a-zA-Z])\b", all_text)) - {"e", "d", "pi", "oo"})
        if len(vars_found) > 1 and ("=" in eq1 or "=" in eq2):
            return f"solve([{_to_eq(eq1)}, {_to_eq(eq2)}], [{', '.join(vars_found)}])"

    # 8. Single algebraic equation
    m_solve = re.search(r"solve\s+([0-9a-zA-Z_\+\-\*\/\^\(\)\s=]+)", q_lower)
    if m_solve:
        target = m_solve.group(1).strip().replace("^", "**")
        symbols = [s for s in re.findall(r"\b([a-zA-Z])\b", target) if s not in ("e", "d", "pi", "oo")]
        var = symbols[0] if symbols else "x"
        if "=" in target:
            lhs, rhs = target.split("=", 1)
            if lhs.strip() and rhs.strip():
                return f"solve(Eq({lhs.strip()}, {rhs.strip()}), {var})"
        elif any(ch in target for ch in ("x", "+", "-", "*")):
            return f"solve({target}, {var})"

    # 9. Pure arithmetic (e.g. "what is 2+2", "2+2", "(14.5 * 3) + 2")
    m_arith = re.search(r"^(?:what\s+is\s+)?([0-9\.\s\+\-\*\/\^\(\)]+)$", q_lower)
    if m_arith:
        target = m_arith.group(1).replace("^", "**").strip()
        if any(op in target for op in ("+", "-", "*", "/")):
            return target

    # 10. General calculate / evaluate / simplify
    m_calc = re.search(r"(?:calculate|evaluate|simplify)\s+([0-9a-zA-Z_\+\-\*\/\^\(\)\.\s]+)", q_lower)
    if m_calc:
        target = m_calc.group(1).replace("^", "**").strip()
        if len(target) >= 3 and any(op in target for op in ("+", "-", "*", "/", "**")):
            return target

    return None
def enrich_stem_query(query: str) -> Dict[str, Any]:
    """
    Deterministic Neuro-Symbolic Enrichment:
    1. Evaluates exact symbolic/numerical math via SymPy AST Engine.
    2. Retrieves multi-hop physical laws, constants, and equations via KùzuDB + Curated STEM Graph.
    3. Returns structured badges and grounding context for the LLM or UI.
    """
    q = (query or "").strip()
    q_lower = q.lower()

    sympy_res = None
    if _SYMPY_ENGINE is not None:
        expr = _extract_math_expression(q)
        if expr:
            eval_out = _SYMPY_ENGINE.evaluate_expression(expr)
            if eval_out.get("success"):
                eval_out["expression"] = expr
                sympy_res = eval_out

    matched_axioms = []
    seen_laws = set()

    # Check Curated GraphRAG Knowledge Base (0.1ms, lock-free)
    for item in CURATED_GRAPH_AXIOMS:
        if any(kw in q_lower for kw in item["keywords"]):
            if item["law"] not in seen_laws:
                seen_laws.add(item["law"])
                matched_axioms.append({
                    "law": item["law"],
                    "topic": item["law"],
                    "domain": item["domain"],
                    "equation": item["equation"],
                    "axiom": item["axiom"],
                })

    # Also query KùzuDB if available and not locked
    global _STEM_GRAPH
    if len(matched_axioms) < 3 and q:
        try:
            if _STEM_GRAPH is None:
                from knowledge_graph.kuzu_stem_graph import VigyanSTEMGraph
                _STEM_GRAPH = VigyanSTEMGraph()
            if _STEM_GRAPH is not None:
                words = [w for w in re.findall(r"\b[A-Za-z0-9_-]{3,}\b", q) if w.lower() not in {"what", "the", "and", "for", "with", "how", "derive", "explain", "plot", "simulate"}]
                ctx_str = _STEM_GRAPH.query_multihop_context(words[:6])
                if ctx_str:
                    for block in ctx_str.split("- [Graph "):
                        if not block.strip() or block.startswith("###"):
                            continue
                        first_line = block.splitlines()[0].strip()
                        law_title = first_line.split("]:", 1)[-1].strip()
                        if law_title and law_title not in seen_laws:
                            seen_laws.add(law_title)
                            eq_match = re.search(r"Equation:\s*(.+)", block)
                            ax_match = re.search(r"(?:Axiom|Definition|Properties):\s*(.+)", block)
                            matched_axioms.append({
                                "law": law_title,
                                "topic": law_title,
                                "domain": "KùzuDB GraphRAG",
                                "equation": eq_match.group(1).strip() if eq_match else "",
                                "axiom": ax_match.group(1).strip() if ax_match else block.replace("\n", " ")[:140],
                            })
        except Exception:
            pass

    prompt_injection = ""
    if sympy_res or matched_axioms:
        parts = ["[NEURO-SYMBOLIC VERIFIED GROUNDING • KùzuDB GraphRAG + SymPy AST]"]
        if sympy_res:
            parts.append(
                f"• SymPy AST Exact Evaluation: `{sympy_res.get('expression')}` = `{sympy_res.get('result')}` "
                f"(LaTeX: $${sympy_res.get('latex')}$$, Approx: {sympy_res.get('numeric_approx')})"
            )
        for ax in matched_axioms[:3]:
            parts.append(f"• [{ax['domain']}] {ax['law']}: $${ax['equation']}$$ — {ax['axiom']}")
        prompt_injection = "\n".join(parts)

    telemetry = get_system_telemetry()
    sympy_str = f"{sympy_res.get('expression')} = {sympy_res.get('result')}" if sympy_res else ""
    return {
        "query": q,
        "sympy": sympy_res,
        "sympy_verified": bool(sympy_res and sympy_res.get("success")),
        "sympy_result": sympy_str,
        "graph_axioms": matched_axioms[:4],
        "axioms": matched_axioms[:4],
        "lancedb_context": "",
        "prompt_injection": prompt_injection,
        "enriched_system_suffix": ("\n" + prompt_injection) if prompt_injection else "",
        "hybrid": telemetry["hybrid"],
    }
def evaluate_plot(
    expression: str,
    x_min: float = -10.0,
    x_max: float = 10.0,
    points: int = 200,
    title: str = "",
    x_label: str = "x",
    y_label: str = "y"
) -> Dict[str, Any]:
    """Safely evaluates a continuous mathematical function f(x) and returns high-resolution (x, y) plot traces."""
    clean_expr = expression.strip()
    if clean_expr.lower().startswith("f(x) ="):
        clean_expr = clean_expr[6:].strip()
    elif clean_expr.lower().startswith("f(x)="):
        clean_expr = clean_expr[5:].strip()
    elif clean_expr.lower().startswith("y ="):
        clean_expr = clean_expr[3:].strip()
    elif clean_expr.lower().startswith("y="):
        clean_expr = clean_expr[2:].strip()

    clean_expr = clean_expr.replace("^", "**").strip()
    try:
        tree = ast.parse(clean_expr, mode="eval")
    except Exception:
        # Try normalizing implicit multiplication e.g. 0.15x -> 0.15*x, )cos -> )*cos
        norm = re.sub(r"(\d+)([a-zA-Z\(])", r"\1*\2", clean_expr)
        norm = re.sub(r"\)([a-zA-Z\(])", r")*\1", norm)
        try:
            tree = ast.parse(norm, mode="eval")
            clean_expr = norm
        except Exception as exc:
            return {"tool": "plot_function", "success": False, "error": f"Mathematical parse error: {exc}"}

    try:
        for node in ast.walk(tree):
            if not isinstance(node, _SAFE_MATH_NODES):
                return {"tool": "plot_function", "success": False, "error": f"Disallowed mathematical syntax: {type(node).__name__}"}
            if isinstance(node, ast.Name) and node.id != "x" and node.id not in _SAFE_MATH_ENV:
                return {"tool": "plot_function", "success": False, "error": f"Unknown or disallowed symbol: {node.id}"}
        compiled_code = compile(tree, "<plot_math>", "eval")
    except Exception as exc:
        return {"tool": "plot_function", "success": False, "error": f"Mathematical parse error: {exc}"}

    x_min = float(x_min)
    x_max = float(x_max)
    points = max(10, min(1000, int(points)))
    step = (x_max - x_min) / max(1, points - 1)
    
    x_vals: List[float] = []
    y_vals: List[Optional[float]] = []
    env = dict(_SAFE_MATH_ENV)

    for i in range(points):
        x = x_min + i * step
        env["x"] = x
        try:
            val = eval(compiled_code, {"__builtins__": {}}, env)
            if math.isnan(val) or math.isinf(val):
                y_vals.append(None)
            else:
                y_vals.append(round(float(val), 5))
        except Exception:
            y_vals.append(None)
        x_vals.append(round(x, 4))

    return {
        "tool": "plot_function",
        "success": True,
        "expression": expression,
        "title": title or f"f(x) = {expression}",
        "x_label": x_label,
        "y_label": y_label,
        "x_range": [x_min, x_max],
        "points": points,
        "plot": {
            "title": title or f"f(x) = {expression}",
            "x_label": x_label,
            "y_label": y_label,
            "traces": [
                {
                    "x": x_vals,
                    "y": y_vals,
                    "name": expression,
                    "mode": "lines",
                    "line": {"color": "#38bdf8", "width": 2}
                }
            ]
        }
    }
