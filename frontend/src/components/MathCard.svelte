<script lang="ts">
  import { renderMath } from "../lib/katex";

  interface Props {
    tool: {
      tool?: string;
      expression?: string;
      result?: string;
      latex?: string;
      numeric?: string;
      numeric_approx?: string;
      success?: boolean;
      metrics?: Array<{ label: string; value: string }>;
    };
  }

  let { tool }: Props = $props();

  let copied = $state(false);

  const rawLatex = $derived(
    tool.latex ||
    (tool.result ? String(tool.result) : "") ||
    (tool.expression ? String(tool.expression) : "")
  );

  const renderedLatexHtml = $derived(
    rawLatex ? renderMath(`$$\\mathbf{${rawLatex}}$$`) : ""
  );

  function copyLatex() {
    if (!rawLatex) return;
    try {
      navigator.clipboard.writeText(rawLatex);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 1500);
    } catch {}
  }
</script>

<div class="my-3 select-none rounded-xl bg-[#06080d] border border-white/[0.08] overflow-hidden shadow-lg transition-all">
  <!-- Obsidian Card Header -->
  <div class="flex items-center justify-between px-3.5 py-2.5 bg-[#090b12] border-b border-white/[0.05]">
    <div class="flex items-center gap-2.5">
      <div class="w-6 h-6 rounded-md bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs font-mono text-[#38bdf8]">
        &sum;
      </div>
      <div class="flex flex-col">
        <span class="text-xs font-semibold text-white tracking-wide">
          SymPy AST Mathematical Engine
        </span>
        <span class="text-[10px] text-[#9ca3af] font-mono">
          {tool.expression ? `AST: ${tool.expression}` : "Closed-Form Exact Solution"}
        </span>
      </div>
    </div>

    <div class="flex items-center gap-2">
      {#if rawLatex}
        <button
          onclick={copyLatex}
          title="Copy LaTeX formula to clipboard"
          class="text-[11px] font-mono text-[#38bdf8] hover:text-white px-2 py-0.5 rounded hover:bg-white/[0.05] transition-all cursor-pointer"
        >
          {copied ? "Copied &check;" : "Copy LaTeX"}
        </button>
      {/if}
    </div>
  </div>

  <!-- Obsidian Card Body -->
  <div class="p-3.5 bg-[#020408] flex flex-col gap-2.5">
    {#if renderedLatexHtml}
      <div class="py-2 px-3 bg-black/40 rounded-lg border border-white/[0.04] overflow-x-auto text-center">
        {@html renderedLatexHtml}
      </div>
    {/if}

    <div class="flex flex-wrap items-center gap-2 text-[11px] font-mono">
      {#if tool.result}
        <div class="px-2 py-1 rounded bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
          <span class="text-[#9ca3af]">Exact:</span>
          <span class="text-[#38bdf8] font-semibold">{tool.result}</span>
        </div>
      {/if}

      {#if tool.numeric || tool.numeric_approx}
        <div class="px-2 py-1 rounded bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
          <span class="text-[#9ca3af]">Approx:</span>
          <span class="text-[#10b981] font-semibold">{tool.numeric || tool.numeric_approx}</span>
        </div>
      {/if}

      {#if tool.metrics}
        {#each tool.metrics as m}
          <div class="px-2 py-1 rounded bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
            <span class="text-[#9ca3af]">{m.label}:</span>
            <span class="text-[#38bdf8] font-semibold">{m.value}</span>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>
