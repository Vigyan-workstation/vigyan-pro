<script lang="ts">
  // SettingsPanel — Minimal Preferences Drawer
  // Streamlined executive controls with zero developer plumbing.
  import { onMount } from "svelte";
  import { getAvailableModels, DEFAULT_MODEL } from "../lib/ollama";
  import { chatStore } from "../lib/chatStore.svelte";

  interface Props {
    open: boolean;
    model: string;
    fontSize: "sm" | "md" | "lg";
    onClose: () => void;
    onModelChange: (m: string) => void;
    onFontSizeChange: (s: "sm" | "md" | "lg") => void;
  }

  let {
    open,
    model,
    fontSize,
    onClose,
    onModelChange,
    onFontSizeChange,
  }: Props = $props();

  let availableModels = $state<string[]>([DEFAULT_MODEL]);
  let loading = $state(false);
  let confirmReset = $state(false);
  let resetTimer: ReturnType<typeof setTimeout> | null = null;
  let computeMode = $state<"auto" | "gpu" | "cpu">("auto");
  let contextBudget = $state<number>(2048);

  onMount(() => {
    try {
      const stored = localStorage.getItem("vigyan_compute_mode");
      if (stored === "auto" || stored === "gpu" || stored === "cpu") {
        computeMode = stored;
      }
      const storedBudget = localStorage.getItem("vigyan_context_budget");
      if (storedBudget) {
        const val = parseInt(storedBudget, 10);
        if (val === 2048 || val === 4096 || val === 8192) {
          contextBudget = val;
        }
      }
    } catch {}
  });

  function setContextBudget(budget: number) {
    contextBudget = budget;
    try {
      localStorage.setItem("vigyan_context_budget", String(budget));
    } catch {}
  }

  $effect(() => {
    if (open) {
      loading = true;
      getAvailableModels().then((list) => {
        if (list.length > 0) availableModels = list;
        loading = false;
      });
    }
  });

  const fontLabels: Record<"sm" | "md" | "lg", string> = {
    sm: "Compact",
    md: "Standard",
    lg: "Large",
  };

  const isFrontier = $derived(
    model.includes("7b") || model.includes("frontier") || model.includes("8b")
  );

  function selectEngineTier(tier: "fast" | "frontier") {
    if (tier === "fast") {
      const match = availableModels.find(
        (m) => m.includes("3b") || m.includes("1.5b") || m.includes("mini")
      ) || availableModels[0] || "vigyan:3b";
      onModelChange(match);
    } else {
      const match = availableModels.find(
        (m) => m.includes("7b") || m.includes("8b") || m.includes("frontier")
      ) || "vigyan:7b";
      onModelChange(match);
    }
  }

  function setComputeMode(mode: "auto" | "gpu" | "cpu") {
    computeMode = mode;
    try {
      localStorage.setItem("vigyan_compute_mode", mode);
    } catch {}
  }

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
    aria-label="Close settings"
  ></button>
{/if}

<!-- Slide-in Drawer -->
<aside
  class="fixed top-0 right-0 h-full w-80 z-50 flex flex-col bg-[#08090d] border-l border-[rgba(255,255,255,0.08)] shadow-2xl transition-transform duration-300 {open
    ? 'translate-x-0'
    : 'translate-x-full'}"
  style="will-change: transform;"
>
  <!-- Header -->
  <div class="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.06)] bg-[#0c0e14]">
    <span class="text-xs font-semibold text-white tracking-wider uppercase">Preferences</span>
    <button
      onclick={onClose}
      class="text-[#9ca3af] hover:text-white transition-colors text-base leading-none p-1 cursor-pointer"
      aria-label="Close"
    >✕</button>
  </div>

  <!-- Content -->
  <div class="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">

    <!-- Dedicated Dual-Engine Switch -->
    <section>
      <span class="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af] block mb-2">AI Compute Tier</span>
      <div class="grid grid-cols-2 gap-2 p-1 bg-[#10121a] rounded-xl border border-[rgba(255,255,255,0.08)]">
        <button
          type="button"
          onclick={() => selectEngineTier("fast")}
          class="py-2.5 px-3 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer {!isFrontier
            ? 'bg-white text-black font-semibold shadow-sm'
            : 'text-[#9ca3af] hover:text-white'}"
        >
          <span class="text-xs font-medium">Fast Engine</span>
          <span class="text-[10px] opacity-75 font-mono">3B Low-Bit</span>
        </button>

        <button
          type="button"
          onclick={() => selectEngineTier("frontier")}
          class="py-2.5 px-3 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer {isFrontier
            ? 'bg-white text-black font-semibold shadow-sm'
            : 'text-[#9ca3af] hover:text-white'}"
        >
          <span class="text-xs font-medium">Frontier Engine</span>
          <span class="text-[10px] opacity-75 font-mono">7B Sovereign</span>
        </button>
      </div>

      <div class="mt-2 flex items-center justify-between text-[11px] text-[#6b7280]">
        <span>Active Model Tag:</span>
        <span class="font-mono text-white text-[10px] bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">{model}</span>
      </div>
      <p class="text-[11px] text-[#6b7280] mt-1.5 leading-relaxed">
        100% offline air-gapped compute. Zero external API calls.
      </p>
    </section>

    <!-- Hardware Acceleration Mode -->
    <section>
      <span class="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af] block mb-2">Hardware Compute Mode</span>
      <div class="flex gap-1.5 bg-[#10121a] p-1 rounded-xl border border-[rgba(255,255,255,0.08)]">
        {#each ([{ id: "auto", label: "Auto" }, { id: "gpu", label: "Max GPU" }, { id: "cpu", label: "CPU Eco" }] as const) as item}
          <button
            type="button"
            onclick={() => setComputeMode(item.id)}
            class="flex-1 py-1.5 rounded-lg text-xs transition-all cursor-pointer {computeMode === item.id
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-[#9ca3af] hover:text-white'}"
          >
            {item.label}
          </button>
        {/each}
      </div>
    </section>

    <!-- Context Window Budget -->
    <section>
      <span class="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af] block mb-2">Context Window Budget</span>
      <div class="flex gap-1.5 bg-[#10121a] p-1 rounded-xl border border-[rgba(255,255,255,0.08)]">
        {#each ([{ id: 2048, label: "2K Std" }, { id: 4096, label: "4K Ext" }, { id: 8192, label: "8K Deep" }] as const) as item}
          <button
            type="button"
            onclick={() => setContextBudget(item.id)}
            class="flex-1 py-1.5 rounded-lg text-xs transition-all cursor-pointer {contextBudget === item.id
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-[#9ca3af] hover:text-white'}"
          >
            {item.label}
          </button>
        {/each}
      </div>
      <p class="text-[10px] text-[#6b7280] mt-1.5 leading-relaxed">
        {contextBudget === 2048
          ? "Lightweight footprint. Ideal for fast single-topic queries."
          : contextBudget === 4096
          ? "Recommended balance for long calculus derivations and CAD specs."
          : "Maximum depth for multi-step STEM proofs. Requires 12 GB+ RAM or GPU."}
      </p>
    </section>

    <!-- Reading Size -->
    <section>
      <span class="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af] block mb-2">Typography Size</span>
      <div class="flex gap-2 bg-[#10121a] p-1 rounded-xl border border-[rgba(255,255,255,0.08)]">
        {#each (["sm", "md", "lg"] as ("sm" | "md" | "lg")[]) as size}
          <button
            onclick={() => onFontSizeChange(size)}
            class="flex-1 py-1.5 rounded-lg text-xs transition-all cursor-pointer {fontSize === size
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-[#9ca3af] hover:text-white'}"
          >
            {fontLabels[size]}
          </button>
        {/each}
      </div>
    </section>

    <!-- Conversation & Privacy -->
    <section>
      <span class="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af] block mb-2">Privacy & Storage</span>
      <div class="bg-[#10121a] border border-[rgba(255,255,255,0.08)] rounded-xl p-3.5 space-y-3">
        <p class="text-[11px] text-[#9ca3af] leading-relaxed">
          All conversation history and mathematical traces reside strictly on your local disk.
        </p>
        <button
          onclick={handleResetChat}
          class="w-full py-2 px-3 rounded-lg text-xs font-medium transition-all border cursor-pointer {confirmReset
            ? 'bg-rose-950/60 border-rose-500 text-rose-200 animate-pulse'
            : 'bg-white/[0.03] border-white/10 text-rose-400 hover:bg-rose-950/20 hover:border-rose-800/40'}"
        >
          {confirmReset ? "Confirm: Reset Conversation?" : "Clear Chat History"}
        </button>
      </div>
    </section>

  </div>
</aside>
