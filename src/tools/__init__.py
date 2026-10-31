"""
Modular STEM Tool Registry for Vigyan Pro Desktop.
Permissive Open-Source (Apache 2.0 / MIT / BSD-2 / ISC).
100% offline, air-gapped, zero cloud telemetry.
"""

from typing import Any, Dict, List, Optional
from .base import BaseTool

_INSTANCES: List[BaseTool] = []

TOOL_REGISTRY: Dict[str, BaseTool] = {tool.name: tool for tool in _INSTANCES}


def get_all_tools() -> Dict[str, BaseTool]:
    """Return all registered STEM tools."""
    return TOOL_REGISTRY


def get_tool_schemas_prompt() -> str:
    """Generate dynamic system prompt instructions for all registered STEM tools."""
    lines = [tool.to_system_prompt_spec() for tool in _INSTANCES]
    return "\n".join(lines)


def dispatch_tool(name: str, arguments: Dict[str, Any], context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """Safely dispatch tool call to registered handler with error trapping."""
    tool = TOOL_REGISTRY.get(name)
    if not tool:
        return {"success": False, "error": f"Tool '{name}' is not registered in Vigyan STEM tools"}
    try:
        res = tool.execute(arguments, context=context)
        return res
    except Exception as exc:
        return {"success": False, "tool": name, "error": str(exc)}
