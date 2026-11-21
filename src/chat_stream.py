"""
Vigyan Pro Workstation — Conversation Planner (v5.0.8)
Split from launch_desktop.py: cascade model routing, conversation-history
compression, and message text normalisation.
"""

import re
import sys
import logging
from typing import Dict, Any, List

logger = logging.getLogger("vigyan.desktop")


def select_cascade_model(requested_model: str, query: str = "", has_image: bool = False) -> Dict[str, Any]:
    """Sovereign Vigyan AI pure STEM execution router.
    Routes between:
    - 4B Daily: Gemma 4 E4B dense (Fast STEM, Calculus & Exact Symbolic Mathematics)
    - 7B Production: Vigyan-7B Quad-Master (Doctoral Proofs, Complex Engineering & Physical Science)
    - 12B Advanced: Gemma 4 12B dense (Deep Chain-of-Thought & Frontier Reasoning)
    """
    req = (requested_model or "").strip().lower()

    if any(k in req for k in ("12b", "advanced")):
        return {
            "tier": 3,
            "model": "gemma:12b",
            "downgraded": False,
            "reason": "Gemma 4 12B Advanced Engine (Deep Chain-of-Thought & Frontier Reasoning)"
        }

    if any(k in req for k in ("7b", "production", "vigyan")):
        return {
            "tier": 2,
            "model": "vigyan:7b",
            "downgraded": False,
            "reason": "Vigyan-7B Quad-Master Production Engine (Advanced Derivations & Engineering)"
        }

    return {
        "tier": 1,
        "model": "gemma:4b",
        "downgraded": False,
        "reason": "Gemma 4 E4B Daily Engine (Fast STEM & Symbolic Calculus)"
    }
def _extract_text_content(content: Any) -> str:
    """Extract string text from string or multimodal list content."""
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts = []
        for item in content:
            if isinstance(item, dict) and item.get("type") == "text":
                parts.append(str(item.get("text", "")))
            elif isinstance(item, str):
                parts.append(item)
        return " ".join(parts)
    return str(content or "")
def compress_conversation_history(messages: List[Dict[str, Any]], max_tokens_est: int = 2048) -> List[Dict[str, Any]]:
    """
    Sliding Window + Micro-Summary Compressor.
    Preserves system axioms & original user goal, condenses intermediate turns into
    a compact bulleted memory summary, and streams the latest 4 turns verbatim.
    Prevents overflowing the context budget on long sessions while retaining depth.
    Safely handles multimodal messages with image attachments.
    """
    if not messages or len(messages) <= 5:
        return messages

    total_chars = sum(len(_extract_text_content(m.get("content", ""))) for m in messages)
    if total_chars < max_tokens_est * 4:
        return messages

    system_msg = messages[0] if messages[0].get("role") == "system" else None
    rest = messages[1:] if system_msg else messages

    if len(rest) <= 4:
        return messages

    initial_turn = rest[0]
    latest_turns = rest[-4:]
    middle_turns = rest[1:-4]

    bullets = []
    for m in middle_turns:
        role = m.get("role", "user")
        snippet = _extract_text_content(m.get("content", "")).strip()[:70].replace("\n", " ")
        if snippet:
            bullets.append(f"{role.capitalize()}: {snippet}...")

    summary_text = "[Conversation Memory Summary]: " + "; ".join(bullets[:5])
    summary_msg = {"role": "system", "content": summary_text}

    compressed = []
    if system_msg:
        compressed.append(system_msg)
    compressed.append(initial_turn)
    compressed.append(summary_msg)
    compressed.extend(latest_turns)
    return compressed
