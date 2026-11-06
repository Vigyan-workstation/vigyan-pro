"""
Sovereign Learning Ledger Engine for Vigyan Pro Workstation.
Manages deterministic, reviewable, reversible rules in .agents/ledger.jsonl
with strict 150-line context budget enforcement.
"""

import os
import json
import re
from datetime import datetime
from typing import Dict, Any, List, Optional

MAX_BUDGET_LINES = 150

def _get_project_root() -> str:
    """Find the root directory of the vigyan project."""
    current = os.path.dirname(os.path.abspath(__file__))
    # Check parent
    parent = os.path.dirname(current)
    if os.path.exists(os.path.join(parent, "pyproject.toml")) or os.path.exists(os.path.join(parent, "run.py")):
        return parent
    return parent

def get_ledger_dir() -> str:
    root = _get_project_root()
    agents_dir = os.path.join(root, ".agents")
    os.makedirs(agents_dir, exist_ok=True)
    return agents_dir

def get_ledger_path() -> str:
    return os.path.join(get_ledger_dir(), "ledger.jsonl")

def get_archive_path() -> str:
    return os.path.join(get_ledger_dir(), "ledger_archive.jsonl")

def detect_category(rule_text: str) -> str:
    """Classifies a rule into a STEM category based on keywords."""
    r = rule_text.lower()
    if any(k in r for k in ("diff", "integral", "derivative", "solve", "matrix", "sympy", "calculus", "algebra", "latex", "formula")):
        return "math"
    if any(k in r for k in ("orbit", "gravity", "kepler", "velocity", "circuit", "resistor", "capacitor", "ohm", "bode", "filter", "diode")):
        return "physics"
    if any(k in r for k in ("cad", "scad", "openscad", "stl", "manifold", "mesh", "3d", "bracket", "tolerance", "$fn")):
        return "cad"
    if any(k in r for k in ("verilog", "eda", "rtl", "wire", "reg", "clock", "reset", "fpga", "asic", "fifo", "simulation", "iverilog")):
        return "eda"
    return "general"

def load_all_rules() -> List[Dict[str, Any]]:
    path = get_ledger_path()
    if not os.path.exists(path):
        return []
    rules = []
    try:
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    try:
                        rules.append(json.loads(line))
                    except Exception:
                        pass
    except Exception:
        return []
    return rules

def save_all_rules(rules: List[Dict[str, Any]]) -> None:
    path = get_ledger_path()
    with open(path, "w", encoding="utf-8") as f:
        for r in rules:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")

def get_active_rules() -> List[Dict[str, Any]]:
    return [r for r in load_all_rules() if r.get("status") == "active"]

def generate_next_id(existing_rules: List[Dict[str, Any]]) -> str:
    highest = 100
    for r in existing_rules:
        rid = r.get("id", "")
        m = re.match(r"^L-(\d+)$", rid)
        if m:
            num = int(m.group(1))
            if num > highest:
                highest = num
    return f"L-{highest + 1}"

def count_injected_lines(rules: List[Dict[str, Any]]) -> int:
    """Estimates the line count of the injected rules."""
    lines = 1  # Header line
    for r in rules:
        # Each rule takes 1 line in compact markdown
        rule_lines = len(r.get("rule", "").splitlines())
        lines += max(1, rule_lines)
    return lines

def get_budget_telemetry() -> Dict[str, Any]:
    active = get_active_rules()
    line_count = count_injected_lines(active)
    pct = round((line_count / MAX_BUDGET_LINES) * 100, 1)
    return {
        "active_rules_count": len(active),
        "lines_used": line_count,
        "max_budget_lines": MAX_BUDGET_LINES,
        "budget_used_pct": min(100.0, pct),
        "budget_remaining_lines": max(0, MAX_BUDGET_LINES - line_count)
    }

def add_rule(rule_text: str, category: Optional[str] = None) -> Dict[str, Any]:
    clean_text = rule_text.strip()
    if not clean_text:
        return {"success": False, "error": "Rule text cannot be empty."}

    all_rules = load_all_rules()
    cat = category if category and category != "auto" else detect_category(clean_text)
    new_id = generate_next_id(all_rules)

    entry = {
        "id": new_id,
        "timestamp": datetime.now().isoformat(),
        "category": cat,
        "rule": clean_text,
        "status": "active"
    }

    all_rules.append(entry)
    save_all_rules(all_rules)

    # Check and enforce budget
    consolidated = consolidate_and_archive_if_needed()

    telemetry = get_budget_telemetry()
    return {
        "success": True,
        "rule": entry,
        "consolidated": consolidated,
        "telemetry": telemetry
    }

def undo_rule(rule_id: str) -> Dict[str, Any]:
    clean_id = rule_id.strip()
    all_rules = load_all_rules()
    found = False
    target_rule = None

    for r in all_rules:
        if r.get("id") == clean_id:
            r["status"] = "undone"
            r["undone_at"] = datetime.now().isoformat()
            found = True
            target_rule = r
            break

    if not found:
        return {"success": False, "error": f"Rule ID '{clean_id}' not found in ledger."}

    save_all_rules(all_rules)
    telemetry = get_budget_telemetry()
    return {
        "success": True,
        "message": f"Successfully reverted rule {clean_id}.",
        "rule": target_rule,
        "telemetry": telemetry
    }

def consolidate_and_archive_if_needed() -> bool:
    """
    If active rules exceed MAX_BUDGET_LINES, archives the oldest
    rules to .agents/ledger_archive.jsonl until budget is satisfied.
    """
    all_rules = load_all_rules()
    active = [r for r in all_rules if r.get("status") == "active"]

    if count_injected_lines(active) <= MAX_BUDGET_LINES:
        return False

    archive_path = get_archive_path()
    archived_count = 0

    with open(archive_path, "a", encoding="utf-8") as af:
        while count_injected_lines(active) > MAX_BUDGET_LINES and len(active) > 1:
            # Pop oldest
            oldest = active.pop(0)
            oldest["status"] = "archived"
            oldest["archived_at"] = datetime.now().isoformat()
            af.write(json.dumps(oldest, ensure_ascii=False) + "\n")
            archived_count += 1

            # Update in all_rules
            for r in all_rules:
                if r.get("id") == oldest.get("id"):
                    r["status"] = "archived"
                    r["archived_at"] = oldest["archived_at"]
                    break

    save_all_rules(all_rules)
    return archived_count > 0

def get_prompt_injection() -> str:
    """
    Formats all active ledger rules into a compact, bulleted markdown block
    guaranteed to stay strictly under the 150-line budget.
    """
    active = get_active_rules()
    if not active:
        return ""

    lines = ["[SOVEREIGN REVERSIBLE LEARNING LEDGER]"]
    for r in active:
        cat_badge = r.get("category", "rule").upper()
        rid = r.get("id", "")
        text = r.get("rule", "").strip().replace("\n", " ")
        lines.append(f"• [{cat_badge} | {rid}] {text}")

    return "\n".join(lines[:MAX_BUDGET_LINES])
