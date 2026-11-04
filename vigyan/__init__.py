"""
Vigyan Pro: Sovereign Offline Physical Engineering Intelligence Workstation.
"""

__version__ = "3.4.0"

from vigyan.types import ToolResult, MathResult, Artifact
from vigyan.core import check_engine_health, query_engine, EngineOfflineError
from vigyan.tools.math import solve_math
from vigyan.tools.cad import synthesize_cad
from vigyan.tools.rtl import generate_rtl

__all__ = [
    "__version__",
    "ToolResult",
    "MathResult",
    "Artifact",
    "solve_math",
    "synthesize_cad",
    "generate_rtl",
    "check_engine_health",
    "query_engine",
    "EngineOfflineError"
]
