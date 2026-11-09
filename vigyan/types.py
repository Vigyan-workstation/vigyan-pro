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

@dataclass
class UnitResult:
    status: str
    input_expression: str
    result_value: Optional[float] = None
    result_unit: str = ""
    formatted: str = ""
    dimensional_formula: str = ""
    is_compatible: bool = True
    error_message: Optional[str] = None
    execution_time_ms: float = 0.0

@dataclass
class SimulationResult:
    status: str
    system_description: str
    time_points: List[float] = field(default_factory=list)
    state_trajectories: Dict[str, List[float]] = field(default_factory=dict)
    summary_metrics: Dict[str, Any] = field(default_factory=dict)
    error_message: Optional[str] = None
    execution_time_ms: float = 0.0

@dataclass
class CADResult:
    status: str
    design_name: str
    export_format: str
    file_path: Optional[str] = None
    volume_mm3: float = 0.0
    bounding_box_mm: Dict[str, float] = field(default_factory=dict)
    error_message: Optional[str] = None
    execution_time_ms: float = 0.0

@dataclass
class ChemResult:
    status: str
    smiles: str
    molecular_formula: str = ""
    molecular_weight: float = 0.0
    logp: float = 0.0
    tpsa: float = 0.0
    h_bond_donors: int = 0
    h_bond_acceptors: int = 0
    svg_depiction: Optional[str] = None
    error_message: Optional[str] = None
    execution_time_ms: float = 0.0
