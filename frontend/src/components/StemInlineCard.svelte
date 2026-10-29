<script lang="ts">
  // StemInlineCard — Compact Obsidian Reference Pill for Physical Engineering Artifacts
  // Seamlessly coordinates with the right-hand Artifact Viewport.
  import { onMount } from "svelte";
  import type { ToolResult } from "../lib/ollama";
  import { studioStore, type StudioArtifact } from "../lib/studioStore.svelte";

  interface Props {
    tool: ToolResult;
  }
  let { tool }: Props = $props();

  const isCAD = $derived(
    tool.render_type === "threejs_cad" ||
    tool.tool === "cad_model_generate" ||
    !!tool.mesh
  );

  const isRobotics = $derived(
    tool.render_type === "robotics" ||
    tool.tool === "robotics_kinematics" ||
    !!tool.joint_chain
  );

  const isWave = $derived(
    tool.render_type === "wavedrom" ||
    tool.tool === "wavedrom_generate" ||
    !!tool.wavedrom_spec
  );

  const isPlot = $derived(
    tool.tool === "plot" ||
    tool.tool === "evaluate_plot" ||
    tool.render_type === "plot" ||
    (tool.data && Array.isArray(tool.data)) ||
    (tool.x && tool.y)
  );

  function openInStudio() {
    const artifact: StudioArtifact = {
      id: Math.random().toString(36).slice(2, 9),
      tool: tool.tool,
      render_type: tool.render_type || (isCAD ? "threejs_cad" : isRobotics ? "robotics" : isWave ? "wavedrom" : "plot"),
      title: tool.title || (isCAD ? "Parametric 3D CAD" : isRobotics ? "6-DoF Robotics Kinematics" : isWave ? "Digital Bus Timing" : "Exact Mathematical Curve"),
      shape: tool.shape,
      parameters: tool.parameters,
      mesh: tool.mesh,
      stl_base64: tool.stl_base64,
      dimensions_mm: tool.dimensions_mm,
      triangle_count: tool.triangle_count,
      arm_type: tool.arm_type,
      joint_angles_deg: tool.joint_angles_deg,
      end_effector: tool.end_effector,
      reach_mm: tool.reach_mm,
      joint_chain: tool.joint_chain,
      metrics: tool.metrics,
      wavedrom_spec: tool.wavedrom_spec,
      protocol: tool.protocol,
      data: tool.data,
      x: tool.x,
      y: tool.y,
    };
    studioStore.open(artifact);
  }

  // Automatically reveal studio canvas on generation
  onMount(() => {
    if (isCAD || isRobotics || isWave || isPlot) {
      setTimeout(openInStudio, 60);
    }
  });

  const icon = $derived(
    isCAD ? "⬡" : isRobotics ? "⤹" : isWave ? "∿" : isPlot ? "∫" : "⚙"
  );

  const title = $derived(
    tool.title || (isCAD ? "Parametric 3D CAD" : isRobotics ? "6-DoF Robotics Kinematics" : isWave ? "Digital Bus Waveform" : isPlot ? "Exact Curve Plot" : "STEM Artifact")
  );

  const summary = $derived(
    isCAD && tool.dimensions_mm
      ? `${tool.dimensions_mm.width || 120}x${tool.dimensions_mm.length || 80}x${tool.dimensions_mm.height || 35} mm`
      : isRobotics && tool.reach_mm
      ? `Reach: ${tool.reach_mm} mm`
      : isWave && tool.protocol
      ? tool.protocol.replace("_", " ").toUpperCase()
      : isPlot
      ? "Deterministic SymPy Curve"
      : "Parametric Spec"
  );
</script>

<div class="my-2 select-none">
  <button
    type="button"
    onclick={openInStudio}
    class="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#0c0e14] hover:bg-[#121520] border border-white/[0.08] hover:border-white/20 transition-all shadow-md group cursor-pointer text-left"
  >
    <div class="flex items-center gap-3">
      <div class="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-sm font-mono text-[#10b981] group-hover:bg-[#10b981]/10 group-hover:border-[#10b981]/30 transition-all">
        {icon}
      </div>
      <div class="flex flex-col">
        <span class="text-xs font-semibold text-white tracking-wide group-hover:text-[#10b981] transition-colors">
          {title}
        </span>
        <span class="text-[11px] text-[#9ca3af] font-mono">
          {summary}
        </span>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <span class="text-[10px] font-mono text-[#10b981] bg-[#10b981]/10 px-2.5 py-1 rounded-full border border-[#10b981]/25">
        {studioStore.isOpen ? "Active in Viewport" : "Open in Viewport"}
      </span>
      <span class="text-[#9ca3af] group-hover:text-white transition-colors text-xs">
        →
      </span>
    </div>
  </button>
</div>
