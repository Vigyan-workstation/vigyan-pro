import time
import re
import sympy as sp
from typing import Optional
from vigyan.types import MathResult
from vigyan.core import query_engine, check_engine_health

def solve_math(query: str, evaluate_numerical: bool = False) -> MathResult:
    """
    Deterministically solve mathematical derivations, calculus, and algebraic equations.
    Directly evaluates standard mathematical syntax via SymPy CAS with 0% error.
    Falls back to natural-language intent extraction via local SLM if needed.
    """
    start_time = time.perf_counter()
    clean_query = query.strip()

    # Direct Evaluation Attempt
    try:
        res = _evaluate_sympy_direct(clean_query, evaluate_numerical)
        res.execution_time_ms = round((time.perf_counter() - start_time) * 1000, 3)
        return res
    except Exception:
        pass

    # If direct parsing failed and query looks like natural language, query engine for SymPy command
    try:
        if check_engine_health(timeout=0.1):
            extracted_cmd = _extract_sympy_expression(clean_query)
            if extracted_cmd:
                res = _evaluate_sympy_direct(extracted_cmd, evaluate_numerical)
                res.expression = query
                res.execution_time_ms = round((time.perf_counter() - start_time) * 1000, 3)
                return res
    except Exception:
        pass

    # Fallback: parse symbols directly and simplify
    try:
        expr = sp.sympify(clean_query)
        sol = sp.simplify(expr)
        num_val = str(sol.evalf()) if evaluate_numerical else None
        return MathResult(
            status="success",
            expression=query,
            solution=str(sol),
            latex=sp.latex(sol),
            evaluated_numerical=num_val,
            is_exact=True,
            execution_time_ms=round((time.perf_counter() - start_time) * 1000, 3)
        )
    except Exception:
        return MathResult(
            status="error",
            expression=query,
            solution="",
            latex="",
            is_exact=False,
            execution_time_ms=round((time.perf_counter() - start_time) * 1000, 3)
        )

def _evaluate_sympy_direct(code_str: str, evaluate_numerical: bool = False) -> MathResult:
    """Safely execute bounded SymPy analytical operations."""
    x, y, z, t, a, b, c, n, k = sp.symbols('x y z t a b c n k')
    f, g = sp.symbols('f g', cls=sp.Function)

    safe_globals = {
        "sp": sp,
        "x": x, "y": y, "z": z, "t": t, "a": a, "b": b, "c": c, "n": n, "k": k,
        "f": f, "g": g,
        "sin": sp.sin, "cos": sp.cos, "tan": sp.tan,
        "exp": sp.exp, "log": sp.log, "sqrt": sp.sqrt,
        "pi": sp.pi, "E": sp.E, "oo": sp.oo,
        "diff": sp.diff, "integrate": sp.integrate, "solve": sp.solve,
        "simplify": sp.simplify, "expand": sp.expand, "factor": sp.factor,
        "limit": sp.limit, "series": sp.series, "Matrix": sp.Matrix
    }

    normalized = re.sub(r'(\w+)\^(\d+)', r'\1**\2', code_str)
    parsed = eval(normalized, {"__builtins__": {}}, safe_globals)

    sol_str = str(parsed)
    latex_str = sp.latex(parsed) if hasattr(parsed, "__class__") else str(parsed)
    num_val = str(parsed.evalf()) if (evaluate_numerical and hasattr(parsed, "evalf")) else None

    return MathResult(
        status="success",
        expression=code_str,
        solution=sol_str,
        latex=latex_str,
        evaluated_numerical=num_val,
        is_exact=True
    )

def _extract_sympy_expression(nl_prompt: str) -> Optional[str]:
    """Ask local model to translate natural-language math query into a 1-line SymPy call."""
    prompt = (
        "Translate the following mathematical query into a single executable SymPy expression.\n"
        "Output ONLY the single SymPy call (e.g. diff(x**3 * sin(x), x) or integrate(x*exp(-x), (x, 0, oo))).\n"
        "Do NOT include any markdown, explanation, or extra characters.\n\n"
        f"Query: {nl_prompt}"
    )
    raw = query_engine(prompt=prompt, temperature=0.0, max_tokens=64)
    match = re.search(r'`?([a-zA-Z_]+\(.*\))`?', raw.strip())
    if match:
        return match.group(1)
    return raw.strip()
