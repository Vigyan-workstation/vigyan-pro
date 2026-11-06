from typing import List, Optional, Literal, Dict, Any
from dataclasses import dataclass, field

@dataclass
class Artifact:
    file_path: str
    file_type: str
    description: str = ""

@dataclass
class ToolResult:
    status: str
    tool_name: str
    stdout: str = ""
    code: str = ""
    artifacts: List[Artifact] = field(default_factory=list)
    error_message: Optional[str] = None
    metadata: Dict[str, Any] = field(default_factory=dict)

@dataclass
class MathResult:
    expression: str
    solution: str
    status: str = "success"
    latex: str = ""
    evaluated_numerical: Optional[str] = None
    is_exact: bool = True
    execution_time_ms: float = 0.0
