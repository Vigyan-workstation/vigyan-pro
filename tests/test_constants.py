from vigyan.constants import lookup_constant, search_axioms, PHYSICAL_CONSTANTS, STEM_AXIOMS

def test_lookup_speed_of_light():
    c = lookup_constant("c")
    assert c is not None
    assert c["value"] == 299792458
    assert c["unit"] == "m/s"

def test_lookup_planck_constant():
    h = lookup_constant("h")
    assert h is not None
    assert "6.626" in str(h["value"])

def test_search_axioms_circuits():
    matches = search_axioms("rc")
    assert len(matches) > 0
    laws = [m["law"] for m in matches]
    assert any("RC" in law for law in laws)

def test_search_axioms_orbits():
    matches = search_axioms("kepler")
    assert len(matches) > 0
    assert any("Kepler" in m["law"] for m in matches)
