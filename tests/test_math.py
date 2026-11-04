import pytest
from vigyan.tools.math import solve_math

def test_math_calculus_diff():
    res = solve_math("diff(x**3 * sin(x), x)")
    assert res.status == "success"
    assert res.is_exact is True
    assert "cos(x)" in res.solution
    assert "x**3" in res.solution
    assert res.latex != ""
    assert res.execution_time_ms >= 0

def test_math_calculus_integrate():
    res = solve_math("integrate(x**2, x)")
    assert res.status == "success"
    assert res.is_exact is True
    assert "x**3/3" in res.solution

def test_math_algebra_solve():
    res = solve_math("solve(x**2 - 16, x)")
    assert res.status == "success"
    assert res.is_exact is True
    assert "-4" in res.solution
    assert "4" in res.solution

def test_math_trigonometric_simplify():
    res = solve_math("simplify(sin(x)**2 + cos(x)**2)")
    assert res.status == "success"
    assert res.solution == "1"

def test_math_matrix_determinant():
    res = solve_math("Matrix([[1, 2], [3, 4]]).det()")
    assert res.status == "success"
    assert res.solution == "-2"

def test_math_numerical_eval():
    res = solve_math("pi", evaluate_numerical=True)
    assert res.status == "success"
    assert res.evaluated_numerical is not None
    assert res.evaluated_numerical.startswith("3.14159")

def test_math_invalid_expression():
    res = solve_math("invalid_syntax(++//)")
    assert res.status == "error"
    assert res.is_exact is False
