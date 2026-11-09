import time
import os
import tempfile
from typing import Optional, Dict
from vigyan.types import CADResult

def generate_cad(
    part_type: str = "bracket",
    dimensions: Optional[Dict[str, float]] = None,
    output_path: Optional[str] = None
) -> CADResult:
    """
    Generates parametric 3D CAD parts using build123d and exports production STL.
    Supported part_type:
      - 'bracket': L-bracket with mounting holes (width, height, thickness, hole_radius).
      - 'flange': Circular mounting flange with bolt pattern (outer_r, inner_r, thickness, bolt_r, bolt_count).
    """
    t0 = time.perf_counter()
    dimensions = dimensions or {}

    try:
        from build123d import (
            BuildPart, Box, Cylinder, Hole, Locations, PolarLocations, export_stl, Vector
        )

        if part_type == "bracket":
            w = dimensions.get("width", 40.0)
            h = dimensions.get("height", 40.0)
            t = dimensions.get("thickness", 5.0)
            hole_r = dimensions.get("hole_radius", 2.5)

            with BuildPart() as p:
                # Base plate
                Box(w, w, t)
                # Upright wall
                with Locations((0, (w - t) / 2, (h - t) / 2)):
                    Box(w, t, h)
                # Base mounting holes
                with Locations((-w / 4, 0, 0), (w / 4, 0, 0)):
                    Hole(radius=hole_r, depth=t)

            solid = p.part

        elif part_type == "flange":
            outer_r = dimensions.get("outer_r", 30.0)
            inner_r = dimensions.get("inner_r", 10.0)
            t = dimensions.get("thickness", 6.0)
            bolt_r = dimensions.get("bolt_r", 2.5)
            bolt_count = int(dimensions.get("bolt_count", 4))

            with BuildPart() as p:
                Cylinder(radius=outer_r, height=t)
                Hole(radius=inner_r, depth=t)
                with PolarLocations(radius=(outer_r + inner_r) / 2, count=bolt_count):
                    Hole(radius=bolt_r, depth=t)

            solid = p.part

        else:
            dt_ms = (time.perf_counter() - t0) * 1000.0
            return CADResult(
                status="error",
                design_name=part_type,
                export_format="stl",
                error_message=f"Unsupported part_type: '{part_type}'. Supported: 'bracket', 'flange'.",
                execution_time_ms=dt_ms
            )

        # Export STL
        if not output_path:
            tmp = tempfile.NamedTemporaryFile(suffix=".stl", delete=False)
            output_path = tmp.name
            tmp.close()

        export_stl(solid, output_path)

        bbox = solid.bounding_box()
        vol = solid.volume

        dt_ms = (time.perf_counter() - t0) * 1000.0
        return CADResult(
            status="success",
            design_name=part_type,
            export_format="stl",
            file_path=output_path,
            volume_mm3=round(float(vol), 2),
            bounding_box_mm={
                "x_min": round(float(bbox.min.X), 2),
                "x_max": round(float(bbox.max.X), 2),
                "y_min": round(float(bbox.min.Y), 2),
                "y_max": round(float(bbox.max.Y), 2),
                "z_min": round(float(bbox.min.Z), 2),
                "z_max": round(float(bbox.max.Z), 2),
            },
            execution_time_ms=dt_ms
        )

    except Exception as e:
        dt_ms = (time.perf_counter() - t0) * 1000.0
        return CADResult(
            status="error",
            design_name=part_type,
            export_format="stl",
            error_message=str(e),
            execution_time_ms=dt_ms
        )
