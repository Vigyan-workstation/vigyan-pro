<script lang="ts">
  import { renderMath, extractPlottableFormula } from "../lib/katex";
  import StemInlineCard from "./StemInlineCard.svelte";
  import AttachmentCard from "./AttachmentCard.svelte";
  import type { ToolResult } from "../lib/ollama";
  import type { Attachment, Digest } from "../lib/chatStore.svelte";

  interface Props {
    id?: string;
    role: "user" | "assistant";
    content: string;
    streaming?: boolean;
    toolResults?: ToolResult[];
    sympyGrounding?: string;
    attachment?: Attachment;
    digest?: Digest;
    canTrimPrior?: boolean;
    onAction?: (actionText: string) => void;
    onDelete?: (id: string) => void;
    onTrimPrior?: (id: string) => void;
  }
  let {
    id,
    role,
    content,
    streaming = false,
    toolResults = [],
    sympyGrounding,
    attachment,
    digest,
    canTrimPrior = false,
    onAction,
    onDelete,
    onTrimPrior,
  }: Props = $props();

  let copied = $state(false);
  let activePlotExpr = $state<string | null>(null);

  function handleCopy() {
    if (!content) return;
    try {
      navigator.clipboard.writeText(content);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 1500);
    } catch {}
  }

  const isUser = $derived(role === "user");

  // Render math in assistant messages
  const rendered = $derived(
    isUser ? content : renderMath(content)
  );

  // Check if a mathematical formula can be plotted (if not already handled by toolResults)
  const plottableFormula = $derived(
    !isUser && !streaming && toolResults.length === 0 ? extractPlottableFormula(content) : null
  );

  function openFormulaPlot(expr: string) {
    activePlotExpr = expr;
  }
</script>

<div class="flex w-full animate-fade-in {isUser ? 'justify-end' : 'justify-start'} my-2 group">
  <div
    class="
      max-w-[90%] leading-relaxed break-words relative
      {isUser
        ? 'bg-[#0e121a] border border-white/[0.08] text-[#f3f4f6] px-4 py-3 rounded-2xl rounded-tr-sm font-normal shadow-sm'
        : 'bg-[#030508] border border-white/[0.05] text-[#e2e8f0] px-5 py-4 rounded-xl shadow-sm w-full'}
    "
  >
    {#if isUser}
      {#if attachment}
        <AttachmentCard {attachment} />
      {/if}
      {#if content}
        <p class="whitespace-pre-wrap text-[14px] leading-relaxed select-text">{content}</p>
      {/if}
    {:else}

      {#if digest}
        <div class="mb-3 p-3.5 rounded-xl bg-[#0c0e14] border border-white/10 space-y-3">
          <div class="flex items-center justify-between text-xs">
            <span class="font-semibold text-white flex items-center gap-1.5">
              <span class="text-[#10b981]">⬡</span>
              <span>Engineering Digest: {digest.filename}</span>
            </span>
            <span class="text-[10px] text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/20 font-mono">
              Document Analyzed
            </span>
          </div>

          <p class="text-xs text-[#9ca3af] leading-relaxed select-text">
            {digest.summary}
          </p>

          {#if digest.metrics && digest.metrics.length > 0}
            <div class="flex flex-wrap gap-1.5 pt-1">
              {#each digest.metrics as m}
                <span class="text-[11px] font-mono bg-white/[0.05] border border-white/10 text-white px-2 py-0.5 rounded select-text">
                  {m}
                </span>
              {/each}
            </div>
          {/if}

          {#if digest.actions && digest.actions.length > 0}
            <div class="pt-2 border-t border-white/[0.06] flex flex-wrap gap-2">
              {#each digest.actions as act}
                <button
                  type="button"
                  onclick={() => onAction?.(act)}
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black hover:bg-slate-200 text-xs font-semibold shadow transition-all cursor-pointer"
                >
                  <span>⬡</span>
                  <span>{act}</span>
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <!-- Compact Reference Pills for Engineering Artifacts -->
      {#if toolResults && toolResults.length > 0}
        <div class="mb-3 space-y-2">
          {#each toolResults as t}
            <StemInlineCard tool={t} />
          {/each}
        </div>
      {/if}

      <!-- Assistant text response with offline KaTeX typography -->
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <div class="prose-vigyan text-[14px] select-text">{@html rendered}{#if streaming}<span class="animate-blink text-[#10b981] ml-0.5">▋</span>{/if}</div>

      <!-- 1-Click Interactive Plot Curve Button (renders in-situ) -->
      {#if plottableFormula && !activePlotExpr}
        <button
          onclick={() => openFormulaPlot(plottableFormula)}
          class="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] hover:bg-[#10b981]/20 text-xs font-medium transition-all cursor-pointer"
        >
          <span>∫</span>
          <span>Plot Curve: y = {plottableFormula}</span>
        </button>
      {/if}

      {#if activePlotExpr}
        <StemInlineCard tool={{ tool: "plot", render_type: "plot", expression: activePlotExpr, title: `Curve: y = ${activePlotExpr}` }} />
      {/if}
    {/if}

    <!-- Discreet Hover Micro-Toolbar for Context Actions -->
    {#if !streaming && id}
      <div
        class="
          opacity-0 group-hover:opacity-100 transition-opacity duration-150
          flex items-center gap-1.5 mt-2.5 pt-2 border-t border-white/[0.06] text-[11px] text-[#9ca3af]
          {isUser ? 'justify-end' : 'justify-start'}
        "
      >
        <button
          type="button"
          onclick={handleCopy}
          title="Copy content"
          class="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.1] hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
        >
          {copied ? "Copied" : "Copy"}
        </button>
        {#if canTrimPrior && onTrimPrior}
          <button
            type="button"
            onclick={() => onTrimPrior?.(id)}
            title="Trim prior conversation turns before this point"
            class="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-amber-500/20 hover:text-amber-300 hover:border-amber-500/30 border border-white/[0.08] transition-colors cursor-pointer"
          >
            Trim Prior
          </button>
        {/if}
        {#if onDelete}
          <button
            type="button"
            onclick={() => onDelete?.(id)}
            title="Delete this message from context"
            class="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 border border-white/[0.08] transition-colors cursor-pointer"
          >
            Delete
          </button>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  :global(.prose-vigyan .katex) {
    font-size: 1.08em;
  }
  :global(.prose-vigyan .katex-display) {
    margin: 0.8em 0;
    overflow-x: auto;
    padding: 0.4em 0;
  }
  :global(.prose-vigyan .inline-code) {
    font-family: "SF Mono", "Cascadia Code", "Fira Code", monospace;
    font-size: 0.88em;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    padding: 0.15em 0.4em;
    color: #e2e8f0;
  }
</style>
