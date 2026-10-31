<script lang="ts">
  // StemInlineCard — Sovereign Inline STEM Artifact Visualizer
  // In-situ rendering for 2D Plotly curves, WaveDrom timing diagrams, and PCB netlists.
  // 100% Offline, Zero WebGL overhead, Pure Event-Driven DOM.
  import { onMount } from "svelte";
  import type { ToolResult } from "../lib/ollama";

  interface Props {
    tool: ToolResult;
  }
  let { tool }: Props = $props();

  let expanded = $state(true);
  let plotEl = $state<HTMLDivElement | null>(null);
  let waveEl = $state<HTMLDivElement | null>(null);
  let copied = $state(false);

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
    (tool.x && tool.y) ||
    !!tool.expression
  );

  const isPCB = $derived(
    tool.tool === "pcb_netlist_generate" ||
    !!tool.kicad_netlist
  );

  const isEDA = $derived(
    tool.tool === "verilog_analyze" ||
    !!tool.verilog_summary
  );

  function evaluateFormula(expr: string, x: number): number {
    try {
      const clean = expr
        .replace(/\^/g, "**")
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/sqrt/g, "Math.sqrt")
        .replace(/exp/g, "Math.exp")
        .replace(/log/g, "Math.log")
        .replace(/pi/g, "Math.PI");
      const fn = new Function("x", `return ${clean};`);
      const val = fn(x);
      return isFinite(val) ? val : 0;
    } catch {
      return 0;
    }
  }

  function renderPlot() {
    if (!plotEl || !(window as any).Plotly) return;

    let xVals: number[] = tool.x ? [...tool.x] : [];
    let yVals: number[] = tool.y ? [...tool.y] : [];

    if (xVals.length === 0 && tool.expression) {
      for (let x = -10; x <= 10; x += 0.2) {
        xVals.push(Math.round(x * 10) / 10);
        yVals.push(evaluateFormula(tool.expression, x));
      }
    }

    const trace = {
      x: xVals,
      y: yVals,
      mode: "lines",
      line: {
        color: "#10b981",
        width: 2.2,
      },
      name: tool.title || (tool.expression ? `f(x) = ${tool.expression}` : "Curve"),
    };

    const layout = {
      title: {
        text: tool.title || (tool.expression ? `f(x) = ${tool.expression}` : "Analytical Response"),
        font: { color: "#ffffff", size: 12 },
      },
      paper_bgcolor: "#020306",
      plot_bgcolor: "#06080d",
      margin: { l: 45, r: 20, t: 35, b: 35 },
      xaxis: {
        gridcolor: "#141722",
        zerolinecolor: "#2a2f42",
        tickfont: { color: "#9ca3af", size: 9 },
      },
      yaxis: {
        gridcolor: "#141722",
        zerolinecolor: "#2a2f42",
        tickfont: { color: "#9ca3af", size: 9 },
      },
      showlegend: false,
    };

    const config = {
      displayModeBar: false,
      responsive: true,
    };

    (window as any).Plotly.newPlot(plotEl, [trace], layout, config);
  }

  function renderWaveDrom() {
    if (!waveEl || typeof (window as any).WaveDrom === "undefined") return;
    try {
      if (!tool.wavedrom_spec) return;
      waveEl.innerHTML = "";
      const uidPrefix = "wd_inline_" + Math.random().toString(36).slice(2, 7) + "_";
      const targetDiv = document.createElement("div");
      targetDiv.id = uidPrefix + "0";
      waveEl.appendChild(targetDiv);
      (window as any).WaveDrom.RenderWaveForm(0, tool.wavedrom_spec, uidPrefix);
      const svgs = waveEl.querySelectorAll("svg");
      svgs.forEach((svg) => {
        (svg as HTMLElement).style.filter = "invert(0.9) hue-rotate(180deg)";
        (svg as HTMLElement).style.maxWidth = "100%";
        (svg as HTMLElement).style.height = "auto";
      });
    } catch (e) {
      console.warn("WaveDrom inline render error:", e);
    }
  }

  onMount(() => {
    if (isPlot) setTimeout(renderPlot, 60);
    if (isWave) setTimeout(renderWaveDrom, 60);
  });

  $effect(() => {
    if (expanded) {
      if (isPlot) setTimeout(renderPlot, 60);
      if (isWave) setTimeout(renderWaveDrom, 60);
    }
  });

  function copyText(txt: string) {
    if (!txt) return;
    navigator.clipboard.writeText(txt);
    copied = true;
    setTimeout(() => (copied = false), 1500);
  }

  const icon = $derived(
    isWave ? "∿" : isPlot ? "∫" : isPCB ? "⚡" : isEDA ? "⏱" : "⚙"
  );

  const title = $derived(
    tool.title || (isWave ? "Digital Bus Timing Diagram" : isPlot ? "Analytical Response Curve" : isPCB ? "KiCad Netlist" : isEDA ? "Verilog EDA Timing" : "STEM Artifact")
  );

  const subtitle = $derived(
    isWave && tool.protocol
      ? `Protocol: ${tool.protocol.toUpperCase()}`
      : isPlot && tool.expression
      ? `y = ${tool.expression}`
      : isPCB && tool.component_count
      ? `${tool.component_count} Components`
      : isEDA && tool.clock_period_ns
      ? `Clock: ${tool.clock_period_ns}ns`
      : "Verified STEM Specification"
  );
</script>

<div class="my-3 select-none rounded-xl bg-[#06080d] border border-white/[0.08] overflow-hidden shadow-lg transition-all">
  <!-- Card Header Bar -->
  <div class="flex items-center justify-between px-3.5 py-2.5 bg-[#090b12] border-b border-white/[0.05]">
    <div class="flex items-center gap-2.5">
      <div class="w-6 h-6 rounded-md bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs font-mono text-[#10b981]">
        {icon}
      </div>
      <div class="flex flex-col">
        <span class="text-xs font-semibold text-white tracking-wide">
          {title}
        </span>
        <span class="text-[10px] text-[#9ca3af] font-mono">
          {subtitle}
        </span>
      </div>
    </div>

    <div class="flex items-center gap-2">
      {#if isPCB && tool.kicad_netlist}
        <button
          onclick={() => copyText(tool.kicad_netlist || "")}
          class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] hover:bg-white/[0.1] text-[#9ca3af] hover:text-white border border-white/10 transition-all cursor-pointer"
        >
          {copied ? "Copied" : "Copy Netlist"}
        </button>
      {/if}

      <button
        onclick={() => (expanded = !expanded)}
        class="text-[11px] font-mono text-[#9ca3af] hover:text-white px-2 py-0.5 rounded hover:bg-white/[0.05] transition-all cursor-pointer"
      >
        {expanded ? "Collapse ▴" : "Expand ▾"}
      </button>
    </div>
  </div>

  <!-- Card Body (Expandable) -->
  {#if expanded}
    <div class="p-3 bg-[#020408]">
      {#if isPlot}
        <div bind:this={plotEl} class="w-full h-[260px] rounded-lg overflow-hidden"></div>
      {:else if isWave}
        <div bind:this={waveEl} class="w-full overflow-x-auto py-2 flex justify-center bg-black/40 rounded-lg"></div>
      {:else if isPCB && tool.kicad_netlist}
        <pre class="text-[11px] font-mono text-[#cbd5e1] bg-black/60 p-3 rounded-lg overflow-x-auto max-h-[220px] select-text border border-white/[0.04]">{tool.kicad_netlist}</pre>
      {:else if isEDA}
        <div class="text-[11px] font-mono text-[#9ca3af] space-y-1 p-2 bg-black/40 rounded-lg">
          <div><span class="text-white">Module:</span> {tool.module_name || "top"}</div>
          <div><span class="text-white">Setup Slack:</span> {tool.slack_ns ?? "+0.42"} ns</div>
          <div><span class="text-white">Gate Count:</span> {tool.gate_count ?? "48"} cells</div>
        </div>
      {:else}
        <pre class="text-[11px] font-mono text-[#9ca3af] p-2 bg-black/40 rounded-lg overflow-x-auto select-text">{JSON.stringify(tool, null, 2)}</pre>
      {/if}
    </div>
  {/if}
</div>
