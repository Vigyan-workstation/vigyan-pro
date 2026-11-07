<script lang="ts">
  // DockedActionBar.svelte — Non-Blocking Action Deck
  // Pinned directly above the chat dock: non-blocking action cards.
  import { artifactStore } from "../lib/artifactStore.svelte";

  let card = $derived(artifactStore.dockedCard);
</script>

{#if card}
  <div
    class="w-full mb-2 px-3 py-2 rounded-xl bg-[#080d14]/95 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl flex items-center justify-between gap-3 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200"
    role="region"
    aria-label="Docked action card"
  >
    <!-- Left: Status & Identity -->
    <div class="flex items-center gap-2.5 min-w-0">
      <span
        class="w-2 h-2 rounded-full flex-shrink-0 {card.type === 'sympy' ? 'bg-[#10b981] shadow-[0_0_8px_#10b981]' : 'bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]'}"
      ></span>
      <div class="flex items-center gap-2 min-w-0">
        <span class="font-semibold text-white tracking-tight truncate">{card.title}</span>
        {#if card.badge}
          <span class="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 font-mono text-[10px] text-[#9ca3af] flex-shrink-0">
            {card.badge}
          </span>
        {/if}
        <span class="hidden md:inline text-[#9ca3af] truncate text-[11px]">{card.description}</span>
      </div>
    </div>

    <!-- Right: Interactive Actions & Dismiss -->
    <div class="flex items-center gap-1.5 flex-shrink-0">
      {#each card.actions as action}
        <button
          type="button"
          onclick={action.onClick}
          class="px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer {action.primary
            ? 'bg-[#38bdf8] text-black hover:bg-[#7dd3fc] font-semibold shadow-sm'
            : 'bg-white/[0.06] text-[#e2e8f0] hover:bg-white/[0.12] border border-white/10'}"
        >
          {action.label}
        </button>
      {/each}

      <button
        type="button"
        onclick={() => artifactStore.dismissDockedCard()}
        class="w-6 h-6 rounded-md text-[#9ca3af] hover:text-white hover:bg-white/[0.08] flex items-center justify-center transition-all cursor-pointer ml-1"
        title="Dismiss card"
        aria-label="Dismiss action card"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
{/if}
