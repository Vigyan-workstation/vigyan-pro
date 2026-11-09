import os
import tempfile
import pytest
from vigyan.tools.units import convert_units
from vigyan.tools.sim import simulate_ode
from vigyan.tools.cad import generate_cad
from vigyan.tools.chem import analyze_molecule

# ==============================================================================
# Unit Conversion Engine Tests (Pint + Astropy)
# ==============================================================================

def test_units_conversion_speed():
    res = convert_units("100 km/h to m/s")
    assert res.status == "success"
    assert res.is_compatible is True
    assert res.result_value is not None
    assert abs(res.result_value - 27.7778) < 0.01
    assert "meter / second" in res.result_unit
    assert res.dimensional_formula == "[length] / [time]"
    assert res.execution_time_ms >= 0

def test_units_conversion_power():
    res = convert_units("50 kW", target_unit="hp")
    assert res.status == "success"
    assert res.is_compatible is True
    assert res.result_value is not None
    assert abs(res.result_value - 67.049) < 0.1
    assert "horsepower" in res.result_unit

def test_units_incompatible():
    res = convert_units("10 meters", target_unit="seconds")
    assert res.status == "error"
    assert res.is_compatible is False
    assert res.error_message is not None
    assert "Cannot convert" in res.error_message

def test_units_parse_quantity():
    res = convert_units("5.5 kg * m / s**2")
    assert res.status == "success"
    assert res.is_compatible is True
    assert "[mass]" in res.dimensional_formula
    assert "[length]" in res.dimensional_formula
    assert "[time]" in res.dimensional_formula

# ==============================================================================
# Numerical Multiphysics Simulation Tests (SciPy RK45)
# ==============================================================================

def test_sim_projectile_drag():
    res = simulate_ode("projectile", params={"v0": 50.0, "angle": 45.0, "mass": 1.0, "drag_k": 0.05})
    assert res.status == "success"
    assert "2D Projectile with Air Drag" in res.system_description
    assert len(res.time_points) > 0
    assert len(res.state_trajectories) == 4  # x, y, vx, vy
    assert "x" in res.state_trajectories
    assert "y" in res.state_trajectories
    assert "vx" in res.state_trajectories
    assert "vy" in res.state_trajectories
    assert "max_altitude_m" in res.summary_metrics
    assert "total_range_m" in res.summary_metrics
    assert res.summary_metrics["max_altitude_m"] > 0
    assert res.summary_metrics["total_range_m"] > 0
    assert res.execution_time_ms >= 0

def test_sim_oscillator_damped():
    res = simulate_ode("oscillator", params={"mass": 1.0, "damping": 0.5, "spring_k": 10.0, "x0": 1.0, "v0": 0.0})
    assert res.status == "success"
    assert "Damped Harmonic Oscillator" in res.system_description
    assert len(res.state_trajectories) == 2  # displacement and velocity
    assert "displacement" in res.state_trajectories
    assert "velocity" in res.state_trajectories
    assert "final_amplitude" in res.summary_metrics
    assert abs(res.summary_metrics["final_amplitude"]) < 1.0

def test_sim_unsupported_system():
    res = simulate_ode("quantum_teleportation")
    assert res.status == "error"
    assert res.error_message is not None
    assert "Unsupported system_type" in res.error_message

# ==============================================================================
# Parametric 3D CAD Tests (build123d + OpenCASCADE)
# ==============================================================================

def test_cad_bracket_generation():
    with tempfile.NamedTemporaryFile(suffix=".stl", delete=False) as tmp:
        tmp_path = tmp.name

    try:
        res = generate_cad(part_type="bracket", dimensions={"width": 30.0, "height": 30.0, "thickness": 4.0}, output_path=tmp_path)
        assert res.status == "success"
        assert res.file_path == tmp_path
        assert res.volume_mm3 > 0
        assert "x_min" in res.bounding_box_mm
        assert os.path.exists(tmp_path)
        assert os.path.getsize(tmp_path) > 0
        assert res.execution_time_ms >= 0
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

def test_cad_flange_generation():
    with tempfile.NamedTemporaryFile(suffix=".stl", delete=False) as tmp:
        tmp_path = tmp.name

    try:
        res = generate_cad(part_type="flange", dimensions={"outer_r": 25.0, "inner_r": 8.0, "thickness": 5.0, "bolt_count": 4}, output_path=tmp_path)
        assert res.status == "success"
        assert res.file_path == tmp_path
        assert res.volume_mm3 > 0
        assert "x_min" in res.bounding_box_mm
        assert os.path.exists(tmp_path)
        assert os.path.getsize(tmp_path) > 0
        assert res.execution_time_ms >= 0
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

def test_cad_unsupported_part():
    res = generate_cad(part_type="warp_drive")
    assert res.status == "error"
    assert res.error_message is not None
    assert "Unsupported part_type" in res.error_message

# ==============================================================================
# Cheminformatics Tests (RDKit)
# ==============================================================================

def test_chem_aspirin():
    # Aspirin: Acetylsalicylic acid
    smiles = "CC(=O)Oc1ccccc1C(=O)O"
    res = analyze_molecule(smiles)
    assert res.status == "success"
    assert res.molecular_formula == "C9H8O4"
    assert abs(res.molecular_weight - 180.042) < 0.1
    assert res.logp is not None
    assert res.tpsa is not None
    assert res.h_bond_donors == 1
    assert res.h_bond_acceptors == 3
    assert res.svg_depiction is not None
    assert "<svg" in res.svg_depiction
    assert res.execution_time_ms >= 0

def test_chem_benzene():
    res = analyze_molecule("c1ccccc1", generate_svg=False)
    assert res.status == "success"
    assert res.molecular_formula == "C6H6"
    assert abs(res.molecular_weight - 78.047) < 0.1
    assert res.svg_depiction is None

def test_chem_invalid_smiles():
    res = analyze_molecule("C123_invalid_chemical_string")
    assert res.status == "error"
    assert res.error_message is not None
    assert "Invalid SMILES" in res.error_message
