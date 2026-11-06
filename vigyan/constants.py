"""
Sovereign STEM Physical Constants, SI Units, and Governing Equations.
Provides deterministic physical axioms in < 50 KB of memory with zero external database dependencies.
"""

from typing import Dict, Any, List, Optional

PHYSICAL_CONSTANTS: Dict[str, Dict[str, Any]] = {
    "c": {
        "name": "Speed of light in vacuum",
        "value": 299792458,
        "unit": "m/s",
        "symbol": "c",
        "latex": "c = 299\\,792\\,458\\text{ m/s}"
    },
    "h": {
        "name": "Planck constant",
        "value": 6.62607015e-34,
        "unit": "J*s",
        "symbol": "h",
        "latex": "h = 6.62607015 \\times 10^{-34}\\text{ J}\\cdot\\text{s}"
    },
    "hbar": {
        "name": "Reduced Planck constant",
        "value": 1.054571817e-34,
        "unit": "J*s",
        "symbol": "\\hbar",
        "latex": "\\hbar = 1.054571817 \\times 10^{-34}\\text{ J}\\cdot\\text{s}"
    },
    "G": {
        "name": "Newtonian constant of gravitation",
        "value": 6.67430e-11,
        "unit": "m^3/(kg*s^2)",
        "symbol": "G",
        "latex": "G = 6.67430 \\times 10^{-11}\\text{ m}^3\\text{/(kg}\\cdot\\text{s}^2)"
    },
    "kB": {
        "name": "Boltzmann constant",
        "value": 1.380649e-23,
        "unit": "J/K",
        "symbol": "k_B",
        "latex": "k_B = 1.380649 \\times 10^{-23}\\text{ J/K}"
    },
    "e": {
        "name": "Elementary charge",
        "value": 1.602176634e-19,
        "unit": "C",
        "symbol": "e",
        "latex": "e = 1.602176634 \\times 10^{-19}\\text{ C}"
    },
    "eps0": {
        "name": "Vacuum electric permittivity",
        "value": 8.8541878128e-12,
        "unit": "F/m",
        "symbol": "\\varepsilon_0",
        "latex": "\\varepsilon_0 = 8.8541878128 \\times 10^{-12}\\text{ F/m}"
    },
    "mu0": {
        "name": "Vacuum magnetic permeability",
        "value": 1.25663706212e-6,
        "unit": "N/A^2",
        "symbol": "\\mu_0",
        "latex": "\\mu_0 = 1.25663706212 \\times 10^{-6}\\text{ N/A}^2"
    },
    "me": {
        "name": "Electron rest mass",
        "value": 9.1093837015e-31,
        "unit": "kg",
        "symbol": "m_e",
        "latex": "m_e = 9.1093837015 \\times 10^{-31}\\text{ kg}"
    },
    "mp": {
        "name": "Proton rest mass",
        "value": 1.67262192369e-27,
        "unit": "kg",
        "symbol": "m_p",
        "latex": "m_p = 1.67262192369 \\times 10^{-27}\\text{ kg}"
    },
    "NA": {
        "name": "Avogadro constant",
        "value": 6.02214076e23,
        "unit": "mol^-1",
        "symbol": "N_A",
        "latex": "N_A = 6.02214076 \\times 10^{23}\\text{ mol}^{-1}"
    },
    "R": {
        "name": "Molar gas constant",
        "value": 8.314462618,
        "unit": "J/(mol*K)",
        "symbol": "R",
        "latex": "R = 8.314462618\\text{ J/(mol}\\cdot\\text{K)}"
    },
    "sigma": {
        "name": "Stefan-Boltzmann constant",
        "value": 5.670374419e-8,
        "unit": "W/(m^2*K^4)",
        "symbol": "\\sigma",
        "latex": "\\sigma = 5.670374419 \\times 10^{-8}\\text{ W/(m}^2\\cdot\\text{K}^4)"
    },
    "g0": {
        "name": "Standard gravity",
        "value": 9.80665,
        "unit": "m/s^2",
        "symbol": "g_0",
        "latex": "g_0 = 9.80665\\text{ m/s}^2"
    }
}

STEM_AXIOMS: Dict[str, List[Dict[str, str]]] = {
    "circuits": [
        {"law": "Ohm's Law", "equation": "V = I * R", "latex": "V = I \\cdot R"},
        {"law": "RC Cutoff Frequency", "equation": "f_c = 1 / (2 * pi * R * C)", "latex": "f_c = \\frac{1}{2\\pi R C}"},
        {"law": "RLC Resonant Frequency", "equation": "f_0 = 1 / (2 * pi * sqrt(L * C))", "latex": "f_0 = \\frac{1}{2\\pi\\sqrt{LC}}"},
        {"law": "Quality Factor RLC", "equation": "Q = (1 / R) * sqrt(L / C)", "latex": "Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}"},
        {"law": "555 Timer Astable Frequency", "equation": "f = 1.44 / ((R1 + 2 * R2) * C)", "latex": "f = \\frac{1.44}{(R_1 + 2R_2)C}"},
        {"law": "Shockley Diode Equation", "equation": "I = I_s * (exp(q*V / (n*k*T)) - 1)", "latex": "I = I_s \\left(e^{\\frac{qV}{n k_B T}} - 1\\right)"},
        {"law": "Characteristic Impedance", "equation": "Z_0 = sqrt(L / C)", "latex": "Z_0 = \\sqrt{\\frac{L}{C}}"}
    ],
    "orbital_mechanics": [
        {"law": "Kepler's Third Law", "equation": "T^2 = (4 * pi^2 / (G * M)) * a^3", "latex": "T^2 = \\frac{4\\pi^2}{GM} a^3"},
        {"law": "Vis-Viva Equation", "equation": "v^2 = G * M * (2/r - 1/a)", "latex": "v^2 = GM \\left(\\frac{2}{r} - \\frac{1}{a}\\right)"},
        {"law": "Tsiolkovsky Rocket Equation", "equation": "delta_v = v_e * ln(m0 / mf)", "latex": "\\Delta v = v_e \\ln\\left(\\frac{m_0}{m_f}\\right)"},
        {"law": "Escape Velocity", "equation": "v_esc = sqrt(2 * G * M / r)", "latex": "v_{\\text{esc}} = \\sqrt{\\frac{2GM}{r}}"}
    ],
    "mechanics": [
        {"law": "Newton's Second Law", "equation": "F = m * a", "latex": "\\mathbf{F} = m\\mathbf{a}"},
        {"law": "Kinetic Energy", "equation": "E_k = 0.5 * m * v^2", "latex": "E_k = \\frac{1}{2}mv^2"},
        {"law": "Hooke's Law", "equation": "F = -k * x", "latex": "F = -kx"},
        {"law": "Aerodynamic Drag", "equation": "F_d = 0.5 * rho * v^2 * C_d * A", "latex": "F_d = \\frac{1}{2}\\rho v^2 C_d A"},
        {"law": "Euler-Bernoulli Beam Deflection", "equation": "E * I * (d^4 w / dx^4) = q(x)", "latex": "EI \\frac{d^4 w}{dx^4} = q(x)"}
    ],
    "thermodynamics": [
        {"law": "Ideal Gas Law", "equation": "P * V = n * R * T", "latex": "PV = nRT"},
        {"law": "Fourier Heat Conduction", "equation": "q = -k * grad(T)", "latex": "\\mathbf{q} = -k \\nabla T"},
        {"law": "Carnot Efficiency", "equation": "eta = 1 - (T_c / T_h)", "latex": "\\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H}"},
        {"law": "Stefan-Boltzmann Radiation", "equation": "P = eps * sigma * A * T^4", "latex": "P = \\varepsilon \\sigma A T^4"}
    ],
    "quantum_physics": [
        {"law": "Planck-Einstein Relation", "equation": "E = h * nu", "latex": "E = h\\nu = \\hbar\\omega"},
        {"law": "De Broglie Wavelength", "equation": "lambda = h / p", "latex": "\\lambda = \\frac{h}{p}"},
        {"law": "Mass-Energy Equivalence", "equation": "E = m * c^2", "latex": "E = mc^2"},
        {"law": "Schrödinger Time-Independent Equation", "equation": "(-hbar^2 / (2*m)) * grad^2(psi) + V*psi = E*psi", "latex": "-\\frac{\\hbar^2}{2m}\\nabla^2\\psi + V\\psi = E\\psi"}
    ]
}

def lookup_constant(term: str) -> Optional[Dict[str, Any]]:
    """Lookup a physical constant by name or symbol."""
    clean = term.strip().lower()
    for sym, data in PHYSICAL_CONSTANTS.items():
        if sym.lower() == clean or data["name"].lower() == clean:
            return data
    return None

def search_axioms(keyword: str) -> List[Dict[str, str]]:
    """Return all governing equations matching a keyword."""
    kw = keyword.strip().lower()
    matches: List[Dict[str, str]] = []
    for domain, axioms in STEM_AXIOMS.items():
        for ax in axioms:
            if kw in ax["law"].lower() or kw in domain.lower() or kw in ax["equation"].lower():
                matches.append({"domain": domain, **ax})
    return matches

def get_curated_axioms_summary() -> List[Dict[str, str]]:
    """Returns a flat list of top fundamental STEM axioms for prompt grounding."""
    summary: List[Dict[str, str]] = []
    for domain, axioms in STEM_AXIOMS.items():
        for ax in axioms[:2]:
            summary.append({"domain": domain, "law": ax["law"], "equation": ax["equation"]})
    return summary
