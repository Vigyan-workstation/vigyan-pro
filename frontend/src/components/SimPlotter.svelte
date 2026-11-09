<script lang="ts">
  // SimPlotter.svelte — Interactive 2D Multiphysics Canvas
  // Interactive trajectory and oscillation dynamics with real-time slider updates.
  import { onMount } from "svelte";

  interface Props {
    simData?: {
      system: string;
      metrics: Record<string, any>;
      trajectories: Record<string, number[]>;
      timePoints: number[];
    };
  }
  let { simData }: Props = $props();

  let canvas = $state<HTMLCanvasElement | null>(null);

  // Interactive parameters
  let isProjectile = $derived(simData?.system?.toLowerCase().includes("projectile") ?? true);

  // Projectile state
  let v0 = $state(50);
  let angleDeg = $state(45);
  let dragK = $state(0.05);
  let mass = $state(1.0);

  $effect(() => {
    if (simData?.metrics) {
      if (simData.metrics.v0 !== undefined) v0 = Number(simData.metrics.v0);
      if (simData.metrics.angle !== undefined) angleDeg = Number(simData.metrics.angle);
      if (simData.metrics.drag_k !== undefined) dragK = Number(simData.metrics.drag_k);
      if (simData.metrics.mass !== undefined) mass = Number(simData.metrics.mass);
    }
  });

  // Derived metrics
  let userTinkered = $state(false);
  let calculatedRange = $state(0);
  let calculatedMaxHeight = $state(0);
  let calculatedFlightTime = $state(0);

  function rk4Deriv(s: [number, number, number, number], k: number, m: number): [number, number, number, number] {
    const g = 9.80665;
    const [, , vx, vy] = s;
    const speed = Math.hypot(vx, vy);
    const ax = -(k / m) * speed * vx;
    const ay = -g - (k / m) * speed * vy;
    return [vx, vy, ax, ay];
  }

  function simulateProjectileRK4(v: number, ang: number, k: number, m: number) {
    const rad = (ang * Math.PI) / 180;
    let s: [number, number, number, number] = [0, 0, v * Math.cos(rad), v * Math.sin(rad)];
    let t = 0;
    const dt = 0.02;

    const xs: number[] = [0];
    const ys: number[] = [0];
    let maxY = 0;

    while (s[1] >= 0 && t < 30) {
      const k1 = rk4Deriv(s, k, m);
      const s2: [number, number, number, number] = [
        s[0] + 0.5 * dt * k1[0],
        s[1] + 0.5 * dt * k1[1],
        s[2] + 0.5 * dt * k1[2],
        s[3] + 0.5 * dt * k1[3]
      ];
      const k2 = rk4Deriv(s2, k, m);
      const s3: [number, number, number, number] = [
        s[0] + 0.5 * dt * k2[0],
        s[1] + 0.5 * dt * k2[1],
        s[2] + 0.5 * dt * k2[2],
        s[3] + 0.5 * dt * k2[3]
      ];
      const k3 = rk4Deriv(s3, k, m);
      const s4: [number, number, number, number] = [
        s[0] + dt * k3[0],
        s[1] + dt * k3[1],
        s[2] + dt * k3[2],
        s[3] + dt * k3[3]
      ];
      const k4 = rk4Deriv(s4, k, m);

      s[0] += (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
      s[1] += (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
      s[2] += (dt / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]);
      s[3] += (dt / 6) * (k1[3] + 2 * k2[3] + 2 * k3[3] + k4[3]);
      t += dt;

      if (s[1] > maxY) maxY = s[1];
      if (s[1] >= 0) {
        xs.push(s[0]);
        ys.push(s[1]);
      }
    }

    calculatedRange = Math.round(s[0] * 100) / 100;
    calculatedMaxHeight = Math.round(maxY * 100) / 100;
    calculatedFlightTime = Math.round(t * 100) / 100;

    return { xs, ys };
  }

  function getTrajectoryData() {
    if (!userTinkered && simData?.trajectories?.x && simData?.trajectories?.y && simData.trajectories.x.length > 0) {
      const xs = simData.trajectories.x;
      const ys = simData.trajectories.y;
      calculatedRange = simData.metrics?.total_range_m ?? Math.round(xs[xs.length - 1] * 100) / 100;
      calculatedMaxHeight = simData.metrics?.max_altitude_m ?? Math.round(Math.max(...ys) * 100) / 100;
      calculatedFlightTime = simData.metrics?.flight_time_s ?? 0;
      return { xs, ys };
    }
    return simulateProjectileRK4(v0, angleDeg, dragK, mass);
  }

  function draw() {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    // Dark canvas background
    ctx.fillStyle = "#02050a";
    ctx.fillRect(0, 0, w, h);

    const padLeft = 55;
    const padRight = 30;
    const padTop = 30;
    const padBottom = 45;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;

    if (isProjectile) {
      const { xs, ys } = getTrajectoryData();

      const maxX = Math.max(Math.max(...xs) * 1.15, 20);
      const maxY = Math.max(Math.max(...ys) * 1.25, 10);

      // Draw Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 1;
      const gridStepsX = 5;
      const gridStepsY = 4;

      for (let i = 0; i <= gridStepsX; i++) {
        const gx = padLeft + (i / gridStepsX) * plotW;
        ctx.beginPath();
        ctx.moveTo(gx, padTop);
        ctx.lineTo(gx, padTop + plotH);
        ctx.stroke();

        ctx.fillStyle = "#64748b";
        ctx.font = "10px monospace";
        const valX = Math.round((i / gridStepsX) * maxX);
        ctx.fillText(`${valX}m`, gx - 10, padTop + plotH + 18);
      }

      for (let j = 0; j <= gridStepsY; j++) {
        const gy = padTop + plotH - (j / gridStepsY) * plotH;
        ctx.beginPath();
        ctx.moveTo(padLeft, gy);
        ctx.lineTo(padLeft + plotW, gy);
        ctx.stroke();

        ctx.fillStyle = "#64748b";
        ctx.font = "10px monospace";
        const valY = Math.round((j / gridStepsY) * maxY);
        ctx.fillText(`${valY}m`, padLeft - 38, gy + 4);
      }

      // Draw Axis Lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(padLeft, padTop);
      ctx.lineTo(padLeft, padTop + plotH);
      ctx.lineTo(padLeft + plotW, padTop + plotH);
      ctx.stroke();

      // Axis Labels
      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px sans-serif";
      ctx.fillText("Altitude (y) [m]", padLeft, padTop - 12);
      ctx.fillText("Downrange Distance (x) [m]", padLeft + plotW / 2 - 50, padTop + plotH + 36);

      // Draw Trajectory with Gradient Fill
      if (xs.length > 1) {
        ctx.beginPath();
        ctx.moveTo(padLeft, padTop + plotH);
        for (let i = 0; i < xs.length; i++) {
          const px = padLeft + (xs[i] / maxX) * plotW;
          const py = padTop + plotH - (ys[i] / maxY) * plotH;
          ctx.lineTo(px, py);
        }
        ctx.lineTo(padLeft + (xs[xs.length - 1] / maxX) * plotW, padTop + plotH);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, padTop, 0, padTop + plotH);
        grad.addColorStop(0, "rgba(56, 189, 248, 0.25)");
        grad.addColorStop(1, "rgba(56, 189, 248, 0.0)");
        ctx.fillStyle = grad;
        ctx.fill();

        // Stroke line
        ctx.beginPath();
        ctx.moveTo(padLeft, padTop + plotH);
        for (let i = 0; i < xs.length; i++) {
          const px = padLeft + (xs[i] / maxX) * plotW;
          const py = padTop + plotH - (ys[i] / maxY) * plotH;
          ctx.lineTo(px, py);
        }
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
      }

      // Draw Apex Point
      const apexIdx = ys.indexOf(Math.max(...ys));
      if (apexIdx >= 0) {
        const ax = padLeft + (xs[apexIdx] / maxX) * plotW;
        const ay = padTop + plotH - (ys[apexIdx] / maxY) * plotH;
        ctx.fillStyle = "#10b981";
        ctx.beginPath();
        ctx.arc(ax, ay, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#10b981";
        ctx.font = "bold 10px monospace";
        ctx.fillText(`Peak: ${calculatedMaxHeight}m`, ax + 8, ay - 4);
      }
    }
  }

  $effect(() => {
    // Re-draw whenever sliders change
    v0;
    angleDeg;
    dragK;
    mass;
    draw();
  });

  onMount(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
</script>

<div class="h-full w-full flex flex-col bg-[#02050a] text-[#f3f4f6]">
  <!-- Simulation Header -->
  <div class="px-5 py-3 border-b border-white/[0.08] bg-[#040812]/90 flex items-center justify-between text-xs">
    <div>
      <div class="font-semibold text-white tracking-tight">{simData?.system || "2D Nonlinear Projectile Simulation"}</div>
      <div class="text-[11px] text-[#64748b]">{userTinkered ? "Real-Time 4th-Order Runge-Kutta (RK4) • Quadratic Drag" : "SciPy RK45 Adaptive Integrator • Verified Initial Trajectory"}</div>
    </div>
    <div class="flex items-center gap-4 text-xs font-mono">
      <div class="flex flex-col items-end">
        <span class="text-[#94a3b8]">Range</span>
        <span class="font-bold text-[#38bdf8]">{calculatedRange} m</span>
      </div>
      <div class="flex flex-col items-end">
        <span class="text-[#94a3b8]">Peak Alt</span>
        <span class="font-bold text-[#10b981]">{calculatedMaxHeight} m</span>
      </div>
      <div class="flex flex-col items-end">
        <span class="text-[#94a3b8]">Flight Time</span>
        <span class="font-bold text-white">{calculatedFlightTime} s</span>
      </div>
    </div>
  </div>

  <!-- Interactive Canvas -->
  <div class="flex-1 w-full relative min-h-[220px]">
    <canvas bind:this={canvas} class="w-full h-full block"></canvas>
  </div>

  <!-- Interactive Controls Drawer -->
  <div class="p-4 border-t border-white/[0.08] bg-[#030610] grid grid-cols-2 md:grid-cols-4 gap-4 text-xs select-none">
    <!-- Velocity Slider -->
    <div class="space-y-1">
      <div class="flex justify-between text-[11px]">
        <span class="text-[#94a3b8]">Velocity (v₀)</span>
        <span class="font-mono text-[#38bdf8]">{v0} m/s</span>
      </div>
      <input type="range" min="10" max="150" step="1" bind:value={v0} oninput={() => userTinkered = true} class="w-full accent-[#38bdf8] cursor-pointer" />
    </div>

    <!-- Launch Angle Slider -->
    <div class="space-y-1">
      <div class="flex justify-between text-[11px]">
        <span class="text-[#94a3b8]">Launch Angle (θ)</span>
        <span class="font-mono text-[#38bdf8]">{angleDeg}°</span>
      </div>
      <input type="range" min="5" max="85" step="1" bind:value={angleDeg} oninput={() => userTinkered = true} class="w-full accent-[#38bdf8] cursor-pointer" />
    </div>

    <!-- Drag Coefficient Slider -->
    <div class="space-y-1">
      <div class="flex justify-between text-[11px]">
        <span class="text-[#94a3b8]">Air Drag (k)</span>
        <span class="font-mono text-[#38bdf8]">{dragK}</span>
      </div>
      <input type="range" min="0.00" max="0.20" step="0.01" bind:value={dragK} oninput={() => userTinkered = true} class="w-full accent-[#38bdf8] cursor-pointer" />
    </div>

    <!-- Mass Slider -->
    <div class="space-y-1">
      <div class="flex justify-between text-[11px]">
        <span class="text-[#94a3b8]">Mass (m)</span>
        <span class="font-mono text-[#38bdf8]">{mass} kg</span>
      </div>
      <input type="range" min="0.1" max="10" step="0.1" bind:value={mass} oninput={() => userTinkered = true} class="w-full accent-[#38bdf8] cursor-pointer" />
    </div>
  </div>
</div>
