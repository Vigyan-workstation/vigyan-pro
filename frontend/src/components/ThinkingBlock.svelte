<script lang="ts">
  // ThinkingBlock — Ramanujan reasoning drawer & verified card
  // Shows step-by-step reasoning verified by local symbolic engine.
  interface Props {
    text: string;
    streaming: boolean;
    done: boolean;
    sympyGrounding?: string;
  }
  let { text, streaming, done, sympyGrounding }: Props = $props();

  let expanded = $state(true);

  const hasSymPy = $derived(Boolean(sympyGrounding));

  const stepCount = $derived(
    (text.match(/^(?:step\s*\d+|^\d+\.)/gim) ?? []).length
  );

  $effect(() => {
    if (done && !streaming) {
      setTimeout(() => { expanded = false; }, 800);
    }
  });
</script>

{#if text}
  <div class="animate-fade-in w-full my-2">
    {#if expanded}
      <!-- Expanded Drawer -->
      <div
        class="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#08090d] overflow-hidden shadow-md"
        style="border-left: 2px solid #10b981;"
      >
        <!-- Header -->
        <button
          onclick={() => (expanded = false)}
          class="w-full flex items-center justify-between px-4 py-2.5 bg-[#0c0e14] hover:bg-white/[0.03] transition-colors cursor-pointer"
        >
          <div class="flex items-center gap-2.5">
            <span
              class="w-2 h-2 rounded-full {streaming ? 'bg-[#10b981] animate-pulse-dot shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-[#10b981]'}"
            ></span>
            <span class="text-xs font-semibold text-[#e2e8f0]">
              {streaming
                ? "Reasoning through mathematical derivation…"
                : (hasSymPy
                    ? (stepCount > 0 ? `Symbolically verified in ${stepCount} steps` : "Symbolically verified")
                    : (stepCount > 0 ? `Reasoning chain (${stepCount} steps)` : "Reasoning chain"))}
            </span>
          </div>

          <div class="flex items-center gap-2">
            {#if hasSymPy}
              <span class="text-[10px] font-mono text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/25 px-2 py-0.5 rounded-full">
                Symbolically Verified
              </span>
            {/if}
            <span class="text-[11px] text-[#9ca3af] ml-1 flex items-center gap-0.5">
              <span>Hide</span>
              <span class="text-[9px]">▴</span>
            </span>
          </div>
        </button>

        <!-- Content -->
        <div class="px-4 py-3 text-[13px] text-[#9ca3af] font-mono leading-relaxed whitespace-pre-wrap break-words max-h-60 overflow-y-auto">
          {text}{#if streaming}<span class="animate-blink text-[#10b981]">▋</span>{/if}
        </div>
      </div>
    {:else}
      <!-- Collapsed Pill -->
      <button
        onclick={() => (expanded = true)}
        class="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#08090d] border border-[rgba(255,255,255,0.09)] hover:border-white/20 text-xs text-[#9ca3af] hover:text-white transition-all shadow-sm cursor-pointer"
      >
        <span class="text-[#10b981] font-mono">•</span>
        <span class="font-medium text-[#e2e8f0]">
          {hasSymPy
            ? (stepCount > 0 ? `Symbolically verified (${stepCount} steps)` : "Symbolically verified")
            : (stepCount > 0 ? `Reasoning chain (${stepCount} steps)` : "Reasoning chain")}
        </span>
        {#if hasSymPy}
          <span class="text-[10px] font-mono text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-full border border-[#10b981]/20">
            Symbolically Verified
          </span>
        {:else}
          <span class="text-[10px] font-mono text-[#71717a] bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/10">
            Reasoning
          </span>
        {/if}
        <span class="text-[10px] text-[#71717a] ml-1">▾</span>
      </button>
    {/if}
  </div>
{/if}
