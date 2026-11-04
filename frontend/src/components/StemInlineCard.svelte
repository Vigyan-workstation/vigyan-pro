<script lang="ts">
  // StemInlineCard — Sovereign Inline STEM Artifact Visualizer
  // In-situ rendering for 2D Plotly curves, Bode frequency responses, and Keplerian orbits.
  // 100% Offline, Zero WebGL overhead, Pure Event-Driven DOM.
  import { onMount } from "svelte";
  import type { ToolResult } from "../lib/ollama";

  interface Props {
    tool: ToolResult;
  }
  let { tool }: Props = $props();

  let expanded = $state(true);
  let plotEl = $state<HTMLDivElement | null>(null);

  const isPlot = $derived(
    tool.tool === "plot" ||
    tool.tool === "evaluate_plot" ||
    tool.tool === "plot_function" ||
    tool.tool === "circuit_calc" ||
    tool.tool === "physics_sim" ||
    tool.render_type === "plot" ||
    (tool.data && Array.isArray(tool.data)) ||
    (tool.x && tool.y) ||
    !!tool.expression ||
    !!tool.plot
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

    let traces: any[] = [];
    let layoutTitle = tool.plot?.title || tool.title || (tool.expression ? `f(x) = ${tool.expression}` : "Analytical Response");
    let xLabel = "x";
    let yLabel = "y";
    let isLogX = false;

    if (tool.plot && tool.plot.traces && Array.isArray(tool.plot.traces) && tool.plot.traces.length > 0) {
      traces = tool.plot.traces.map((tr: any) => ({
        mode: tr.mode || "lines",
        line: tr.line || { color: "#10b981", width: 2.2 },
        marker: tr.marker,
        name: tr.name || "Trace",
        x: tr.x || [],
        y: tr.y || [],
      }));
      if (tool.plot.title) layoutTitle = tool.plot.title;
      if (tool.plot.x_label) xLabel = tool.plot.x_label;
      if (tool.plot.y_label) yLabel = tool.plot.y_label;
      if (tool.plot.x_log) isLogX = true;
    } else {
      let xVals: number[] = tool.x ? [...tool.x] : [];
      let yVals: number[] = tool.y ? [...tool.y] : [];

      if (xVals.length === 0 && tool.expression) {
        for (let x = -10; x <= 10; x += 0.2) {
          xVals.push(Math.round(x * 10) / 10);
          yVals.push(evaluateFormula(tool.expression, x));
        }
      }

      traces = [{
        x: xVals,
        y: yVals,
        mode: "lines",
        line: {
          color: "#10b981",
          width: 2.2,
        },
        name: tool.title || (tool.expression ? `f(x) = ${tool.expression}` : "Curve"),
      }];
    }

    const layout = {
      title: {
        text: layoutTitle,
        font: { color: "#ffffff", size: 12 },
      },
      paper_bgcolor: "#020306",
      plot_bgcolor: "#06080d",
      margin: { l: 45, r: 20, t: 35, b: 35 },
      xaxis: {
        title: { text: xLabel, font: { color: "#9ca3af", size: 10 } },
        type: isLogX ? "log" : "-",
        gridcolor: "#141722",
        zerolinecolor: "#2a2f42",
        tickfont: { color: "#9ca3af", size: 9 },
      },
      yaxis: {
        title: { text: yLabel, font: { color: "#9ca3af", size: 10 } },
        gridcolor: "#141722",
        zerolinecolor: "#2a2f42",
        tickfont: { color: "#9ca3af", size: 9 },
      },
      showlegend: traces.length > 1,
      legend: {
        font: { color: "#9ca3af", size: 9 },
        bgcolor: "rgba(0,0,0,0)",
      },
    };

    const config = {
      displayModeBar: false,
      responsive: true,
    };

    (window as any).Plotly.newPlot(plotEl, traces, layout, config);
  }

  onMount(() => {
    if (isPlot) setTimeout(renderPlot, 60);
  });

  $effect(() => {
    if (expanded && isPlot) {
      setTimeout(renderPlot, 60);
    }
  });

  let copiedLatex = $state(false);

  function copyFormula() {
    const textToCopy = (tool as any).latex || tool.expression || (tool as any).equation || "";
    if (!textToCopy) return;
    try {
      navigator.clipboard.writeText(textToCopy);
      copiedLatex = true;
      setTimeout(() => {
        copiedLatex = false;
      }, 1500);
    } catch {}
  }

  const icon = $derived(isPlot ? "∫" : "⚙");

  const title = $derived(
    tool.circuit_type ||
    tool.sim_type ||
    tool.plot?.title ||
    tool.title ||
    (isPlot ? "Analytical Response Curve" : "STEM Specification")
  );

  const subtitle = $derived(
    tool.expression
      ? `f(x) = ${tool.expression}`
      : tool.tool === "circuit_calc"
      ? "Circuit Frequency & Transient Response"
      : tool.tool === "physics_sim"
      ? "Orbital & Kinematic Trajectory"
      : isPlot
      ? "High-Resolution Continuous Trace"
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
      {#if (tool as any).latex || tool.expression || (tool as any).equation}
        <button
          onclick={copyFormula}
          title="Copy formula to clipboard"
          class="text-[11px] font-mono text-[#38bdf8] hover:text-white px-2 py-0.5 rounded hover:bg-white/[0.05] transition-all cursor-pointer"
        >
          {copiedLatex ? "Copied ✓" : "Copy LaTeX"}
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
      {#if tool.metrics && Array.isArray(tool.metrics) && tool.metrics.length > 0}
        <div class="flex flex-wrap gap-1.5 mb-2.5">
          {#each tool.metrics as m}
            <div class="px-2 py-1 rounded bg-white/[0.04] border border-white/10 text-[11px] font-mono flex items-center gap-1.5">
              <span class="text-[#9ca3af]">{m.label || m}:</span>
              <span class="text-[#38bdf8] font-semibold">{m.value || ""}</span>
            </div>
          {/each}
        </div>
      {/if}

      {#if isPlot}
        <div bind:this={plotEl} class="w-full h-[260px] rounded-lg overflow-hidden"></div>
      {:else}
        <pre class="text-[11px] font-mono text-[#9ca3af] p-2 bg-black/40 rounded-lg overflow-x-auto select-text">{JSON.stringify(tool, null, 2)}</pre>
      {/if}
    </div>
  {/if}
</div>
