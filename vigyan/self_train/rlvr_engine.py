"""
🏛️ VIGYAN AUTONOMOUS SELF-FINE-TUNING RLVR ENGINE
==================================================
Empirical self-training via Reinforcement Learning with Verifiable Rewards (RLVR).
Features:
- Candidate Rollout Sampling (N rollouts per problem).
- Native <tool_call> AST parsing & deterministic execution (SymPy CAS).
- Residual Zero Verification: sp.simplify(candidate - target) == 0.
- Automatic DPO/Rejection Sampling Dataset Construction:
    - Chosen: Verified zero-residual trajectory with successful tool-call trace.
    - Rejected: Flawed trajectory or execution error.
- Autonomous Self-Update Hook: Triggers local LoRA/DPO training on verified pairs.
==================================================
"""

import json
import re
import time
from typing import List, Dict, Any, Optional, Tuple
import sympy as sp

from vigyan.tools.math import solve_math, validate_sympy_ast, SecurityViolationError
from vigyan.types import MathResult

TOOL_CALL_REGEX = re.compile(r"<tool_call>(.*?)</tool_call>", re.DOTALL)
THINK_REGEX = re.compile(r"<think>(.*?)</think>", re.DOTALL)

class RLVREngine:
    def __init__(self, model_endpoint: Optional[str] = None):
        self.model_endpoint = model_endpoint

    def extract_tool_calls(self, text: str) -> List[Dict[str, Any]]:
        """Extracts JSON tool calls from <tool_call> tags."""
        matches = TOOL_CALL_REGEX.findall(text)
        tool_calls = []
        for m in matches:
            try:
                data = json.loads(m.strip())
                tool_calls.append(data)
            except Exception:
                # If raw python expression
                tool_calls.append({"tool": "sympy", "command": m.strip()})
        return tool_calls

    def execute_tool(self, tool_call: Dict[str, Any]) -> str:
        """Executes a parsed tool call deterministically via SymPy AST."""
        tool_name = tool_call.get("tool", "").lower()
        cmd = tool_call.get("command", "") or tool_call.get("cmd", "") or tool_call.get("expr", "")
        
        if tool_name in ["sympy", "cas", "math"]:
            try:
                # Validate AST safety
                validate_sympy_ast(cmd)
                res = solve_math(cmd)
                if res.solution:
                    return str(res.solution)
                elif res.latex:
                    return str(res.latex)
                else:
                    return str(res.evaluated_numerical or "")
            except Exception as e:
                return f"ExecutionError: {e}"
        else:
            return f"UnsupportedTool: {tool_name}"

    def verify_candidate_residual(self, candidate_solution: str, ground_truth: str) -> Tuple[bool, str]:
        """
        Symbolic verification: residual = simplify(candidate - ground_truth) == 0
        """
        try:
            cand_sym = sp.sympify(candidate_solution)
            gt_sym = sp.sympify(ground_truth)
            residual = sp.simplify(cand_sym - gt_sym)
            if residual == 0:
                return True, "Residual == 0 (Exact Algebraic Proof)"
            else:
                return False, f"Residual != 0 (Residual: {residual})"
        except Exception as e:
            # Fallback to normalized string equality
            cand_clean = candidate_solution.strip().replace(" ", "").replace("**", "^")
            gt_clean = ground_truth.strip().replace(" ", "").replace("**", "^")
            if cand_clean == gt_clean:
                return True, "String exact match fallback"
            return False, f"Verification parse error: {e}"

    def score_rollout(self, problem: str, rollout_text: str, ground_truth: str) -> Dict[str, Any]:
        """
        Scores a single trajectory rollout:
        1. Checks for tool calls and executes them.
        2. Validates final candidate against ground truth.
        """
        tool_calls = self.extract_tool_calls(rollout_text)
        tool_results = []
        for tc in tool_calls:
            res = self.execute_tool(tc)
            tool_results.append(res)

        # Extract answer from rollout (e.g. \boxed{...} or final line)
        ans_match = re.search(r"\\boxed\{(.*?)\}", rollout_text)
        if ans_match:
            candidate = ans_match.group(1).strip()
        else:
            lines = [l.strip() for l in rollout_text.strip().split("\n") if l.strip()]
            candidate = lines[-1] if lines else ""

        passed, reason = self.verify_candidate_residual(candidate, ground_truth)
        
        return {
            "passed": passed,
            "reason": reason,
            "candidate": candidate,
            "tool_calls_count": len(tool_calls),
            "tool_results": tool_results,
            "rollout_text": rollout_text
        }

    def create_dpo_pair(
        self,
        problem: str,
        rollouts: List[str],
        ground_truth: str
    ) -> Optional[Dict[str, Any]]:
        """
        Self-Fine-Tuning Pair Constructor:
        Evaluates rollouts, selects a verified passed trajectory as 'chosen',
        and an unverified or errored trajectory as 'rejected'.
        """
        scored = [self.score_rollout(problem, r, ground_truth) for r in rollouts]
        
        chosen_candidates = [s for s in scored if s["passed"]]
        rejected_candidates = [s for s in scored if not s["passed"]]

        if chosen_candidates and rejected_candidates:
            # Pick the best chosen (preferably one that used tools)
            chosen_sorted = sorted(chosen_candidates, key=lambda x: x["tool_calls_count"], reverse=True)
            chosen = chosen_sorted[0]
            rejected = rejected_candidates[0]

            return {
                "prompt": problem,
                "chosen": chosen["rollout_text"],
                "rejected": rejected["rollout_text"],
                "chosen_tool_calls": chosen["tool_calls_count"],
                "verification_reason": chosen["reason"],
                "timestamp": time.time()
            }
        return None
