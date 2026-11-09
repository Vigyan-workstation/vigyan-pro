import time
from typing import Optional
from vigyan.types import UnitResult

_ureg = None

def _get_registry():
    global _ureg
    if _ureg is None:
        import pint
        _ureg = pint.UnitRegistry()
    return _ureg

def convert_units(expression: str, target_unit: Optional[str] = None) -> UnitResult:
    """
    Evaluates physical quantities and converts to target unit.
    Examples:
      expression='100 km/h', target_unit='m/s' -> 27.7778 m/s
      expression='50 kW to hp' -> 67.049 hp
    """
    t0 = time.perf_counter()
    ureg = _get_registry()

    try:
        expr_clean = expression.strip()
        # Parse 'X to Y' format
        if " to " in expr_clean and not target_unit:
            parts = expr_clean.split(" to ", 1)
            expr_clean = parts[0].strip()
            target_unit = parts[1].strip()

        qty = ureg.parse_expression(expr_clean)

        if target_unit:
            target_unit_clean = target_unit.strip()
            converted = qty.to(target_unit_clean)
            dim_str = str(converted.dimensionality)
            dt_ms = (time.perf_counter() - t0) * 1000.0
            return UnitResult(
                status="success",
                input_expression=expression,
                result_value=float(converted.magnitude),
                result_unit=str(converted.units),
                formatted=f"{converted.magnitude:.6g} {converted.units}",
                dimensional_formula=dim_str,
                is_compatible=True,
                execution_time_ms=dt_ms
            )
        else:
            dim_str = str(qty.dimensionality)
            dt_ms = (time.perf_counter() - t0) * 1000.0
            return UnitResult(
                status="success",
                input_expression=expression,
                result_value=float(qty.magnitude) if hasattr(qty, "magnitude") else None,
                result_unit=str(qty.units) if hasattr(qty, "units") else "",
                formatted=str(qty),
                dimensional_formula=dim_str,
                is_compatible=True,
                execution_time_ms=dt_ms
            )

    except Exception as e:
        dt_ms = (time.perf_counter() - t0) * 1000.0
        return UnitResult(
            status="error",
            input_expression=expression,
            error_message=str(e),
            is_compatible=False,
            execution_time_ms=dt_ms
        )
