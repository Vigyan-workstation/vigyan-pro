import os
import tempfile
import pytest
from vigyan.ledger import (
    add_rule,
    undo_rule,
    get_active_rules,
    get_budget_telemetry,
    get_prompt_injection,
    detect_category,
    MAX_BUDGET_LINES
)

def test_detect_category():
    assert detect_category("Always set $fn=60 in OpenSCAD") == "cad"
    assert detect_category("Synchronous reset for Verilog flip-flops") == "eda"
    assert detect_category("Use analytical sympy integral for energy") == "math"
    assert detect_category("Kepler third law orbital period calculation") == "physics"
    assert detect_category("Never use external third-party libraries") == "general"

def test_add_and_undo_rule():
    res = add_rule("Default tolerance for 3D STL export is 0.2mm", category="cad")
    assert res["success"] is True
    rule_id = res["rule"]["id"]
    assert rule_id.startswith("L-")
    assert res["rule"]["category"] == "cad"

    active_rules = get_active_rules()
    assert any(r["id"] == rule_id for r in active_rules)

    undo_res = undo_rule(rule_id)
    assert undo_res["success"] is True
    assert undo_res["rule"]["status"] == "undone"

    active_after = get_active_rules()
    assert not any(r["id"] == rule_id for r in active_after)

def test_budget_telemetry():
    tel = get_budget_telemetry()
    assert "active_rules_count" in tel
    assert "lines_used" in tel
    assert tel["max_budget_lines"] == MAX_BUDGET_LINES
    assert tel["lines_used"] <= MAX_BUDGET_LINES

def test_prompt_injection():
    res = add_rule("Test rule for prompt injection", category="general")
    injection = get_prompt_injection()
    assert "SOVEREIGN REVERSIBLE LEARNING LEDGER" in injection
    assert len(injection.splitlines()) <= MAX_BUDGET_LINES
    if res.get("success"):
        undo_rule(res["rule"]["id"])
