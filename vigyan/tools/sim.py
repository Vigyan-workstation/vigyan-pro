import time
from typing import List, Dict, Any, Optional
from vigyan.types import SimulationResult

def simulate_ode(
    system_type: str = "projectile",
    params: Optional[Dict[str, float]] = None,
    t_span: Optional[List[float]] = None
) -> SimulationResult:
    """
    Numerically integrates differential equations using SciPy RK45.
    Supported system_type:
      - 'projectile': 2D projectile with quadratic air resistance (mass, drag, v0, angle).
      - 'oscillator': Damped harmonic oscillator (mass, damping, spring_k, x0, v0).
    """
    t0 = time.perf_counter()
    import numpy as np
    from scipy.integrate import solve_ivp

    params = params or {}
    t_span = t_span or [0.0, 10.0]

    try:
        if system_type == "projectile":
            # Parameters
            m = params.get("mass", 1.0)
            g = params.get("g", 9.80665)
            k = params.get("drag_k", 0.05)  # drag coefficient
            v0 = params.get("v0", 50.0)
            angle_deg = params.get("angle", 45.0)

            angle_rad = np.radians(angle_deg)
            vx0 = v0 * np.cos(angle_rad)
            vy0 = v0 * np.sin(angle_rad)
            y0 = [0.0, 0.0, vx0, vy0]  # [x, y, vx, vy]

            def deriv(t, state):
                x, y, vx, vy = state
                v = np.sqrt(vx**2 + vy**2)
                ax = - (k / m) * v * vx
                ay = - g - (k / m) * v * vy
                return [vx, vy, ax, ay]

            def hit_ground(t, state):
                return state[1] if state[0] > 0.001 else 1.0
            hit_ground.terminal = True
            hit_ground.direction = -1

            t_eval = np.linspace(t_span[0], t_span[1], 100)
            sol = solve_ivp(deriv, t_span, y0, t_eval=t_eval, events=hit_ground, method="RK45")

            max_y = float(np.max(sol.y[1]))
            range_x = float(sol.y[0][-1])
            flight_time = float(sol.t[-1])

            dt_ms = (time.perf_counter() - t0) * 1000.0
            return SimulationResult(
                status="success",
                system_description=f"2D Projectile with Air Drag (v0={v0}m/s, angle={angle_deg}°, m={m}kg, k={k})",
                time_points=[round(float(t), 4) for t in sol.t],
                state_trajectories={
                    "x": [round(float(v), 3) for v in sol.y[0]],
                    "y": [round(float(v), 3) for v in sol.y[1]],
                    "vx": [round(float(v), 3) for v in sol.y[2]],
                    "vy": [round(float(v), 3) for v in sol.y[3]],
                },
                summary_metrics={
                    "max_altitude_m": round(max_y, 2),
                    "total_range_m": round(range_x, 2),
                    "flight_time_s": round(flight_time, 2)
                },
                execution_time_ms=dt_ms
            )

        elif system_type == "oscillator":
            m = params.get("mass", 1.0)
            c = params.get("damping", 0.2)
            k = params.get("spring_k", 4.0)
            x0 = params.get("x0", 1.0)
            v0 = params.get("v0", 0.0)

            y0 = [x0, v0]

            def deriv(t, state):
                x, v = state
                dxdt = v
                dvdt = -(c / m) * v - (k / m) * x
                return [dxdt, dvdt]

            t_eval = np.linspace(t_span[0], t_span[1], 100)
            sol = solve_ivp(deriv, t_span, y0, t_eval=t_eval, method="RK45")

            dt_ms = (time.perf_counter() - t0) * 1000.0
            return SimulationResult(
                status="success",
                system_description=f"Damped Harmonic Oscillator (m={m}kg, c={c}, k={k}N/m)",
                time_points=[round(float(t), 4) for t in sol.t],
                state_trajectories={
                    "displacement": [round(float(v), 4) for v in sol.y[0]],
                    "velocity": [round(float(v), 4) for v in sol.y[1]],
                },
                summary_metrics={
                    "initial_amplitude": x0,
                    "final_amplitude": round(float(sol.y[0][-1]), 4),
                    "damping_ratio": round(c / (2 * np.sqrt(m * k)), 4)
                },
                execution_time_ms=dt_ms
            )
        else:
            dt_ms = (time.perf_counter() - t0) * 1000.0
            return SimulationResult(
                status="error",
                system_description=f"Unknown system_type: {system_type}",
                error_message=f"Unsupported system_type: '{system_type}'. Supported: 'projectile', 'oscillator'.",
                execution_time_ms=dt_ms
            )

    except Exception as e:
        dt_ms = (time.perf_counter() - t0) * 1000.0
        return SimulationResult(
            status="error",
            system_description=f"ODE Simulation Failed: {system_type}",
            error_message=str(e),
            execution_time_ms=dt_ms
        )
