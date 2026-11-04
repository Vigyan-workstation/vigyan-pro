import os
import shutil
import subprocess
import re
from typing import Optional
from vigyan.types import ToolResult, Artifact
from vigyan.core import query_engine

OPENSCAD_SYSTEM_PROMPT = """You are Vigyan CAD Engine, an expert parametric 3D CAD designer.
Generate valid, clean, manifold OpenSCAD code for mechanical engineering parts, brackets, and enclosures.
Output ONLY the raw OpenSCAD code. Do not wrap in markdown or backticks.
Ensure all parameters ($fn, dimensions, tolerances) are cleanly declared at the top of the file."""

def synthesize_cad(
    spec: str,
    output_path: str = "part.scad",
    render_stl: bool = False
) -> ToolResult:
    """
    Synthesize parametric OpenSCAD code and optionally render a manufacturing-ready STL.
    """
    clean_spec = spec.strip()

    try:
        raw_code = query_engine(
            prompt=f"Design parametric OpenSCAD model for specification: {clean_spec}",
            system_prompt=OPENSCAD_SYSTEM_PROMPT,
            temperature=0.1,
            max_tokens=1024
        )
    except Exception:
        raw_code = _generate_parametric_scaffold(clean_spec)

    code = _clean_code_fences(raw_code)

    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(code)

    artifacts = [
        Artifact(file_path=os.path.abspath(output_path), file_type="scad", description="Parametric OpenSCAD Source")
    ]
    stdout_msg = f"Generated parametric CAD script: {output_path}"

    if render_stl:
        stl_path = os.path.splitext(output_path)[0] + ".stl"
        openscad_bin = shutil.which("openscad")

        if openscad_bin:
            try:
                res = subprocess.run(
                    [openscad_bin, "-o", stl_path, output_path],
                    capture_output=True,
                    text=True,
                    timeout=15.0
                )
                if res.returncode == 0:
                    artifacts.append(
                        Artifact(file_path=os.path.abspath(stl_path), file_type="stl", description="Manufacturing 3D STL Mesh")
                    )
                    stdout_msg += f"\nSuccessfully compiled 3D mesh: {stl_path}"
                else:
                    stdout_msg += f"\nOpenSCAD compiler notice: {res.stderr.strip()}"
            except subprocess.TimeoutExpired:
                stdout_msg += "\nWarning: OpenSCAD rendering timed out (complex CSG geometry)."
            except Exception as e:
                stdout_msg += f"\nWarning: Could not invoke OpenSCAD: {e}"
        else:
            stdout_msg += (
                "\nNotice: 'openscad' CLI not found on system path.\n"
                "To enable automated STL rendering, install OpenSCAD:\n"
                "  Debian/Ubuntu: sudo apt install openscad\n"
                "  macOS: brew install openscad\n"
                "  Windows: winget install OpenSCAD.OpenSCAD"
            )

    return ToolResult(
        status="success",
        tool_name="cad_openscad",
        stdout=stdout_msg,
        code=code,
        artifacts=artifacts
    )

def _clean_code_fences(raw: str) -> str:
    clean = re.sub(r'^```(?:openscad|scad)?\s*', '', raw, flags=re.MULTILINE)
    clean = re.sub(r'```\s*$', '', clean, flags=re.MULTILINE)
    return clean.strip()

def _generate_parametric_scaffold(spec: str) -> str:
    return f"""// Vigyan Parametric CAD Template
// Spec: {spec}
$fn = 64;

// Primary Dimensions (mm)
length = 40.0;
width  = 30.0;
height = 15.0;
wall_thickness = 2.5;
mounting_hole_dia = 3.2;

difference() {{
    cube([length, width, height], center=true);
    translate([0, 0, wall_thickness])
        cube([length - 2*wall_thickness, width - 2*wall_thickness, height], center=true);
    cylinder(h=height + 2, d=mounting_hole_dia, center=true);
}}
"""
