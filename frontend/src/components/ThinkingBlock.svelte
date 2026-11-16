<script lang="ts">
  // ThinkingBlock — Steve Jobs Collapsible Thought Process Drawer
  // Human language, zero log dumps, pure Apple spring motion.
  interface Props {
    text: string;
    streaming: boolean;
    done: boolean;
    sympyGrounding?: string;
  }
  let { text, streaming, done, sympyGrounding }: Props = $props();

  let expanded = $state(true);

  // Clean raw logger tokens or debug traces into plain human thought text
  const cleanThinkingText = $derived(
    (text || "")
      .replace(/^\[(?:RAM Governor|Hardware Profile|Supervisor|Bridge)\]:[^\n]*\n?/gim, "")
      .replace(/<\|start_header_id\|>.*?<\|end_header_id\|>/g, "")
      .replace(/<\|eot_id\|>/g, "")
      .replace(/<\|im_end\|>/g, "")
      .trim()
  );

  const stepCount = $derived(
    (cleanThinkingText.match(/^(?:step\s*\d+|^\d+\.)/gim) ?? []).length ||
    (cleanThinkingText.split("\n").filter(l => l.trim().length > 15).length > 2 ? 4 : 2)
  );

  $effect(() => {
    if (done && !streaming) {
      setTimeout(() => { expanded = false; }, 900);
    }
  });
</script>

{#if cleanThinkingText || streaming}
  <div class="animate-fade-in w-full my-2">
    {#if expanded}
      <!-- Expanded Drawer (Pure Monochrome & Spherical) -->
      <div
        class="rounded-2xl border border-white/10 bg-[#07090e] overflow-hidden shadow-xl transition-all duration-300"
        style="border-left: 2px solid #ffffff;"
      >
        <!-- Header -->
        <button
          onclick={() => (expanded = false)}
          class="w-full flex items-center justify-between px-4 py-3 bg-[#0a0d14] hover:bg-white/[0.04] transition-colors cursor-pointer"
        >
          <div class="flex items-center gap-3">
            {#if streaming}
              <!-- Oscillating silver pulse -->
              <div class="flex items-center gap-[3px] h-4 px-1" aria-label="Thinking">
                {#each [0, 1, 2, 3, 4, 5, 6, 7] as i}
                  <span
                    class="quantum-bar bg-white rounded-full"
                    style="animation-delay: {i * 0.1}s;"
                  ></span>
                {/each}
              </div>
            {:else}
              <span class="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"></span>
            {/if}

            <span class="text-xs font-semibold text-white tracking-tight">
              {streaming
                ? "Reasoning step-by-step…"
                : `Thought Process (${stepCount} steps)`}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-[10px] text-neutral-400 ml-1 flex items-center gap-0.5">
              <span>Hide</span>
              <span class="text-[9px]">▴</span>
            </span>
          </div>
        </button>

        <!-- Content -->
        <div class="px-4 py-3.5 text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap break-words max-h-56 overflow-y-auto">
          {cleanThinkingText || "Analyzing fundamental equations and physical constraints…"}{#if streaming}<span class="animate-pulse text-white ml-0.5">▋</span>{/if}
        </div>
      </div>
    {:else}
      <!-- Collapsed Spherical Pill -->
      <button
        onclick={() => (expanded = true)}
        class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/25 text-xs text-neutral-300 hover:text-white transition-all shadow-sm cursor-pointer"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
        <span class="font-medium text-white">
          Thought Process ({stepCount} steps)
        </span>
        <span class="text-[10px] text-neutral-400 ml-1">▾</span>
      </button>
    {/if}
  </div>
{/if}

<style>
  @keyframes quantumWave {
    0%, 100% {
      height: 4px;
      opacity: 0.35;
      transform: scaleY(1);
    }
    50% {
      height: 14px;
      opacity: 1;
      transform: scaleY(1.15);
      box-shadow: 0 0 6px rgba(255, 255, 255, 0.7);
    }
  }
  .quantum-bar {
    width: 2.5px;
    min-height: 4px;
    animation: quantumWave 1.0s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
  }
</style>
