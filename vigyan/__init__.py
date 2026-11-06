"""
Vigyan Pro: Sovereign Offline Physical Engineering Intelligence Workstation.
"""

__version__ = "4.0.0"

from vigyan.types import ToolResult, MathResult, Artifact
from vigyan.core import check_engine_health, query_engine, EngineOfflineError

def __getattr__(name):
    if name == "solve_math":
        from vigyan.tools.math import solve_math
        return solve_math
    raise AttributeError(f"module '{__name__}' has no attribute '{name}'")

__all__ = [
    "__version__",
    "ToolResult",
    "MathResult",
    "Artifact",
    "solve_math",
    "check_engine_health",
    "query_engine",
    "EngineOfflineError"
]
