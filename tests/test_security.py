import pytest
from vigyan.tools.math import solve_math, validate_sympy_ast, SecurityViolationError
from vigyan.core import validate_loopback_url, AirGapSecurityViolationError

def test_ast_sandbox_rejects_imports():
    with pytest.raises(SecurityViolationError):
        validate_sympy_ast("__import__('os').system('id')")

def test_ast_sandbox_rejects_dunders():
    with pytest.raises(SecurityViolationError):
        validate_sympy_ast("(1).__class__.__bases__[0]")

def test_ast_sandbox_rejects_lambdas_and_comps():
    with pytest.raises(SecurityViolationError):
        validate_sympy_ast("(lambda: 42)()")
    with pytest.raises(SecurityViolationError):
        validate_sympy_ast("[x for x in range(10)]")

def test_ast_sandbox_allows_valid_math():
    # Valid math operations should pass without error
    validate_sympy_ast("diff(sin(x)*exp(x), x)")
    validate_sympy_ast("integrate(x**2 + 2*x + 1, x)")
    validate_sympy_ast("solve(x**2 - 5*x + 6, x)")

def test_solve_math_security_violation_handling():
    res = solve_math("__import__('os').system('ls')")
    assert res.status == "error"
    assert "Security Violation" in res.solution

def test_airgap_loopback_validation():
    # Permitted loopback URLs
    validate_loopback_url("http://127.0.0.1:8086")
    validate_loopback_url("http://localhost:8080")
    validate_loopback_url("http://[::1]:8086/health")

    # Prohibited non-loopback egress URLs
    with pytest.raises(AirGapSecurityViolationError):
        validate_loopback_url("http://google.com")
    with pytest.raises(AirGapSecurityViolationError):
        validate_loopback_url("https://api.openai.com/v1/chat")
    with pytest.raises(AirGapSecurityViolationError):
        validate_loopback_url("http://192.168.1.100:8080")
