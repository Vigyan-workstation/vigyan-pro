<script lang="ts">
  // SettingsPanel — Sovereign Executive Preferences Drawer
  // Offline scientific settings and configuration panel.
  import { chatStore } from "../lib/chatStore.svelte";

  interface Props {
    open: boolean;
    onClose: () => void;
    activeModelName?: string;
    onOpenLedger?: () => void;
    onOpenModels?: () => void;
  }

  let {
    open,
    onClose,
    activeModelName = "",
    onOpenLedger,
    onOpenModels,
  }: Props = $props();

  let confirmReset = $state(false);
  let fontSize = $state("medium");
  let resetTimer: ReturnType<typeof setTimeout> | null = null;

  function handleResetChat() {
    if (!confirmReset) {
      confirmReset = true;
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { confirmReset = false; }, 3500);
    } else {
      confirmReset = false;
      if (resetTimer) clearTimeout(resetTimer);
      chatStore.clear();
      onClose();
    }
  }
</script>

<!-- Backdrop Blur -->
{#if open}
  <button
    type="button"
    class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm border-0 cursor-default"
    onclick={onClose}
    aria-label="Close preferences"
  ></button>
{/if}

<!-- Slide-in Drawer -->
<aside
  class="fixed top-0 right-0 h-full w-84 z-50 flex flex-col bg-[#08090d] border-l border-[rgba(255,255,255,0.08)] shadow-2xl transition-transform duration-300 {open
    ? 'translate-x-0'
    : 'translate-x-full'}"
  style="will-change: transform;"
>
  <!-- Header -->
  <div class="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.06)] bg-[#0c0e14]">
    <span class="text-xs font-semibold text-white tracking-wider uppercase">Preferences</span>
    <button
      onclick={onClose}
      class="text-[#9ca3af] hover:text-white transition-colors p-1 cursor-pointer flex items-center justify-center"
      aria-label="Close"
    >
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>

  <!-- Content -->
  <div class="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">

    <!-- Engine Information Card -->
    <section>
      <div class="flex items-center justify-between mb-2">
        <span class="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">Intelligence Engine</span>
        {#if onOpenModels}
          <button
            onclick={() => {
              onClose();
              onOpenModels();
            }}
            class="text-[10px] font-mono text-sky-400 hover:underline cursor-pointer"
          >
            Manage Models ›
          </button>
        {/if}
      </div>
      <div class="bg-[#10121a] rounded-xl border border-[rgba(255,255,255,0.08)] p-4 space-y-3">
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0 flex-1">
            <h3 class="text-sm font-semibold text-white tracking-tight truncate">
              {activeModelName ? activeModelName.replace(/\.gguf$/i, "") : "Offline Engine"}
            </h3>
            <p class="text-[11px] text-[#9ca3af] font-mono mt-0.5 truncate">
              {activeModelName ? "Sovereign GGUF Local Instance" : "No model active"}
            </p>
          </div>
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/25 text-[10px] font-medium text-[#10b981] flex-shrink-0">
            <span class="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
            Active
          </span>
        </div>
      </div>
    </section>

    <!-- Autonomous Learning Ledger -->
    <section>
      <span class="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af] block mb-2">Learning Ledger</span>
      <div class="bg-[#10121a] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 space-y-3">
        <p class="text-[11px] text-[#9ca3af] leading-relaxed">
          Manage learned operational habits, mathematical rules, and context budget in <span class="font-mono text-white">.agents/ledger.jsonl</span>.
        </p>
        {#if onOpenLedger}
          <button
            type="button"
            onclick={() => {
              onClose();
              onOpenLedger();
            }}
            class="w-full py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all border border-white/10 bg-white/[0.04] text-sky-400 hover:bg-sky-950/20 hover:border-sky-500/30 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span>Open Ledger Rules (Cmd+L)</span>
          </button>
        {/if}
      </div>
    </section>

    <!-- Storage & Privacy -->
    <section>
      <span class="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af] block mb-2">Storage & Privacy</span>
      <div class="bg-[#10121a] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 space-y-3">
        <p class="text-[11px] text-[#9ca3af] leading-relaxed">
          Your conversations and mathematical proofs reside exclusively in local storage on this computer.
        </p>
        <button
          type="button"
          onclick={handleResetChat}
          class="w-full py-2 px-3 rounded-lg text-xs font-medium transition-all border cursor-pointer {confirmReset
            ? 'bg-rose-950/60 border-rose-500 text-rose-200 animate-pulse'
            : 'bg-white/[0.03] border-white/10 text-rose-400 hover:bg-rose-950/20 hover:border-rose-800/40'}"
        >
          {confirmReset ? "Click again to confirm reset" : "Clear Conversation History"}
        </button>
      </div>
    </section>

    <!-- About Section -->
    <section>
      <span class="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af] block mb-2">About</span>
      <div class="bg-[#10121a] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 space-y-2 text-[11px]">
        <div class="flex items-center justify-between text-white">
          <span class="font-medium">Vigyan Pro Desktop</span>
          <span class="font-mono text-[10px] text-emerald-400">v4.2.0</span>
        </div>
        <p class="text-[#6b7280] leading-relaxed">
          Sovereign STEM workstation combining local neural inference with exact symbolic algebra (SymPy CAS).
        </p>
        <div class="pt-2 border-t border-[rgba(255,255,255,0.06)] space-y-1 text-[10px]">
          <div class="flex justify-between">
            <span class="text-[#6b7280]">Developer</span>
            <span class="text-slate-300">ExperimentLab AI</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[#6b7280]">Website</span>
            <a href="https://experimentlab.in" target="_blank" rel="noopener noreferrer" class="text-violet-400 hover:underline">experimentlab.in</a>
          </div>
          <div class="flex justify-between">
            <span class="text-[#6b7280]">Support</span>
            <span class="text-slate-300">support@experimentlab.in</span>
          </div>
        </div>
      </div>
    </section>

  </div>
</aside>
