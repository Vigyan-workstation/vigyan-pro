from typing import List, Optional, Literal, Dict, Any
from pydantic import BaseModel, Field

class Artifact(BaseModel):
    file_path: str = Field(..., description="Absolute or relative file path to the generated artifact")
    file_type: str = Field(..., description="File extension / format (e.g., 'scad', 'stl', 'v', 'vvp')")
    description: str = Field("", description="Human-readable description of what this artifact represents")

class ToolResult(BaseModel):
    status: Literal["success", "error", "warning"] = Field(..., description="Execution status")
    tool_name: str = Field(..., description="Identifier of the executing tool")
    stdout: str = Field("", description="Compiler, simulator, or execution standard output")
    code: str = Field("", description="Primary generated source code or script content")
    artifacts: List[Artifact] = Field(default_factory=list, description="Output artifact files produced")
    error_message: Optional[str] = Field(None, description="Diagnostic error trace if failed")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Arbitrary execution metadata")

class MathResult(BaseModel):
    status: Literal["success", "error"] = Field("success", description="Analytical solving status")
    expression: str = Field(..., description="Input algebraic mathematical expression")
    solution: str = Field(..., description="Exact analytical solution in standard mathematical format")
    latex: str = Field("", description="Formatted LaTeX representation suitable for rendering")
    evaluated_numerical: Optional[str] = Field(None, description="Numerical floating-point evaluation if requested")
    is_exact: bool = Field(True, description="True if proven analytically via SymPy CAS with 0% error")
    execution_time_ms: float = Field(0.0, description="Execution duration in milliseconds")
