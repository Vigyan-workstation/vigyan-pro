<script lang="ts">
  // SettingsPanel.svelte — Sovereign Executive Preferences & Workstation Tuning
  // Dual-persisted (localStorage + ~/.vigyan/config.json) via /api/settings.
  // Full hardware threading clamps, temperature presets, and storage diagnostics.

  import { onMount } from "svelte";
  import { chatStore } from "../lib/chatStore.svelte";
  import { getAgentHost, getVigyanToken } from "../lib/ollama";

  interface Props {
    open: boolean;
    onClose: () => void;
    activeModelName?: string;
    onOpenModels?: () => void;
    onFontSizeChange?: (size: "sm" | "md" | "lg") => void;
  }

  let {
    open,
    onClose,
    activeModelName = "",
    onOpenModels,
    onFontSizeChange,
  }: Props = $props();

  // Inference tuning state
  let temperature = $state<number>(0.0);
  let cpuThreads = $state<number>(3);
  let maxThreads = $state<number>(4);
  let contextWindow = $state<number>(2048);
  let fontSize = $state<"sm" | "md" | "lg">("md");
  let autoOpenCanvas = $state<boolean>(true);

  // Storage and hardware diagnostics
  let storageStats = $state<{
    models_formatted?: string;
    free_formatted?: string;
    total_formatted?: string;
    disk_percent?: number;
  } | null>(null);

  let hardwareTier = $state<string>("cpu_budget");
  let totalRamGb = $state<number>(7.0);

  let confirmReset = $state<boolean>(false);
  let resetTimer: ReturnType<typeof setTimeout> | null = null;
  let saveNotice = $state<string | null>(null);
  let noticeTimer: ReturnType<typeof setTimeout> | null = null;

  async function loadSettings() {
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = {};
      if (token) headers["X-Vigyan-Token"] = token;

      // 1. Fetch settings from bridge
      const res = await fetch(`${host}/api/settings`, { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.temperature !== undefined) temperature = data.temperature;
        if (data.cpu_threads !== undefined) cpuThreads = data.cpu_threads;
        if (data.max_cpu_threads !== undefined) maxThreads = data.max_cpu_threads;
        if (data.context_window !== undefined) contextWindow = data.context_window;
        if (data.font_size) fontSize = data.font_size;
        if (data.auto_open_canvas !== undefined) autoOpenCanvas = data.auto_open_canvas;
        if (data.hardware) {
          totalRamGb = data.hardware.total_ram_gb || 7.0;
          hardwareTier = data.hardware.tier || "cpu_budget";
        }
      }

      // 2. Fetch storage diagnostics
      const stRes = await fetch(`${host}/api/storage`, { headers });
      if (stRes.ok) {
        storageStats = await stRes.json();
      }
    } catch {
      // Fallback to localStorage if bridge offline
      try {
        const localTemp = localStorage.getItem("vigyan_pref_temperature");
        if (localTemp) temperature = parseFloat(localTemp);
        const localThreads = localStorage.getItem("vigyan_pref_threads");
        if (localThreads) cpuThreads = parseInt(localThreads, 10);
        const localCtx = localStorage.getItem("vigyan_pref_ctx");
        if (localCtx) contextWindow = parseInt(localCtx, 10);
        const localFont = localStorage.getItem("vigyan_pref_font_size") as "sm" | "md" | "lg" | null;
        if (localFont) fontSize = localFont;
      } catch {}
    }
  }

  async function updateSetting(key: string, value: any) {
    // Update local storage for zero-latency local render
    try {
      if (key === "temperature") localStorage.setItem("vigyan_pref_temperature", String(value));
      if (key === "cpu_threads") localStorage.setItem("vigyan_pref_threads", String(value));
      if (key === "context_window") localStorage.setItem("vigyan_pref_ctx", String(value));
      if (key === "font_size") {
        localStorage.setItem("vigyan_pref_font_size", value);
        if (onFontSizeChange) onFontSizeChange(value);
      }
    } catch {}

    // Synchronize to bridge backend (~/.vigyan/config.json)
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Vigyan-Token"] = token;

      await fetch(`${host}/api/settings`, {
        method: "POST",
        headers,
        body: JSON.stringify({ [key]: value }),
      });

      saveNotice = "Settings saved";
      if (noticeTimer) clearTimeout(noticeTimer);
      noticeTimer = setTimeout(() => {
        saveNotice = null;
      }, 2000);
    } catch {}
  }

  function handleResetChat() {
    if (!confirmReset) {
      confirmReset = true;
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        confirmReset = false;
      }, 3500);
    } else {
      confirmReset = false;
      if (resetTimer) clearTimeout(resetTimer);
      chatStore.clear();
      onClose();
    }
  }

  $effect(() => {
    if (open) {
      loadSettings();
      confirmReset = false;
    }
  });

  onMount(() => {
    loadSettings();
  });
</script>

<!-- Backdrop Blur -->
{#if open}
  <button
    type="button"
    class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm border-0 cursor-default transition-opacity duration-300"
    onclick={onClose}
    aria-label="Close preferences"
  ></button>
{/if}

<!-- Apple Fluid Spring Slide-in Drawer -->
<aside
  class="fixed top-0 right-0 h-full w-full sm:w-[420px] z-50 flex flex-col bg-[#07080b] border-l border-white/[0.08] shadow-2xl transition-transform duration-300 {open
    ? 'translate-x-0'
    : 'translate-x-full'}"
  style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); will-change: transform;"
>
  <!-- Executive Header -->
  <div class="px-5 py-3.5 border-b border-white/[0.07] bg-[#0a0c10] flex items-center justify-between flex-shrink-0">
    <div class="flex items-center gap-2">
      <span class="text-xs font-mono font-semibold tracking-wider text-white uppercase">Workstation Preferences</span>
      {#if saveNotice}
        <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full transition-all">
          ✓ {saveNotice}
        </span>
      {/if}
    </div>
    <button
      onclick={onClose}
      class="text-neutral-500 hover:text-white transition-colors p-1 cursor-pointer flex items-center justify-center rounded"
      aria-label="Close"
    >
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>

  <!-- Content Feed -->
  <div class="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">

    <!-- Active Engine Card -->
    <section class="space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-400">Intelligence Engine</span>
        {#if onOpenModels}
          <button
            onclick={() => {
              onClose();
              onOpenModels();
            }}
            class="text-[10px] font-mono text-sky-400 hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>Models Catalog</span>
            <span>›</span>
          </button>
        {/if}
      </div>
      <div class="bg-[#0c0e14] rounded-xl border border-white/[0.08] p-3.5 flex items-center justify-between gap-3">
        <div class="min-w-0 flex-1">
          <h3 class="text-xs font-semibold text-white tracking-tight truncate">
            {activeModelName ? activeModelName.replace(/\.gguf$/i, "") : "Offline Engine"}
          </h3>
          <p class="text-[10px] text-neutral-400 font-mono mt-0.5 truncate">
            Hardware Tier: {hardwareTier} • {totalRamGb} GB Host RAM
          </p>
        </div>
        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-mono text-emerald-400 flex-shrink-0">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Active
        </span>
      </div>
    </section>

    <!-- Inference Tuning Section -->
    <section class="space-y-3">
      <span class="text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-400 block">Inference Parameters</span>
      <div class="bg-[#0c0e14] rounded-xl border border-white/[0.08] p-4 space-y-4">
        
        <!-- Temperature Presets -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label for="temp-slider" class="text-xs text-neutral-300 font-medium">Temperature</label>
            <span class="text-xs font-mono text-sky-400 font-semibold">{temperature.toFixed(2)}</span>
          </div>
          <div class="grid grid-cols-3 gap-1.5">
            <button
              onclick={() => {
                temperature = 0.0;
                updateSetting("temperature", 0.0);
              }}
              class="py-1.5 px-2 rounded-lg text-[10px] font-mono transition-all border cursor-pointer flex flex-col items-center justify-center {temperature === 0.0
                ? 'bg-sky-500/20 border-sky-500/40 text-sky-200 shadow-sm'
                : 'bg-white/[0.03] border-white/5 text-neutral-400 hover:text-white hover:bg-white/[0.06]'}"
            >
              <span class="font-semibold">0.0 Exact</span>
              <span class="text-[8px] text-neutral-400">Math & Proofs</span>
            </button>
            <button
              onclick={() => {
                temperature = 0.2;
                updateSetting("temperature", 0.2);
              }}
              class="py-1.5 px-2 rounded-lg text-[10px] font-mono transition-all border cursor-pointer flex flex-col items-center justify-center {temperature > 0.05 && temperature <= 0.3
                ? 'bg-sky-500/20 border-sky-500/40 text-sky-200 shadow-sm'
                : 'bg-white/[0.03] border-white/5 text-neutral-400 hover:text-white hover:bg-white/[0.06]'}"
            >
              <span class="font-semibold">0.2 Balanced</span>
              <span class="text-[8px] text-neutral-400">Standard STEM</span>
            </button>
            <button
              onclick={() => {
                temperature = 0.7;
                updateSetting("temperature", 0.7);
              }}
              class="py-1.5 px-2 rounded-lg text-[10px] font-mono transition-all border cursor-pointer flex flex-col items-center justify-center {temperature > 0.3
                ? 'bg-sky-500/20 border-sky-500/40 text-sky-200 shadow-sm'
                : 'bg-white/[0.03] border-white/5 text-neutral-400 hover:text-white hover:bg-white/[0.06]'}"
            >
              <span class="font-semibold">0.7 Exploratory</span>
              <span class="text-[8px] text-neutral-400">Brainstorming</span>
            </button>
          </div>
        </div>

        <!-- CPU Threading Clamp -->
        <div class="space-y-1.5 pt-2 border-t border-white/[0.05]">
          <div class="flex items-center justify-between">
            <span class="text-xs text-neutral-300 font-medium">CPU Compute Threads</span>
            <span class="text-xs font-mono text-emerald-400 font-semibold">{cpuThreads} of {maxThreads} cores</span>
          </div>
          <p class="text-[10px] text-neutral-500 leading-normal">
            Clamping threads preserves host responsiveness and prevents screen freezes.
          </p>
          <div class="flex items-center gap-2 pt-1">
            <input
              id="temp-slider"
              type="range"
              min="1"
              max={maxThreads}
              step="1"
              bind:value={cpuThreads}
              onchange={() => updateSetting("cpu_threads", cpuThreads)}
              class="w-full accent-emerald-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
            />
          </div>
        </div>

        <!-- Context Window Size -->
        <div class="space-y-2 pt-2 border-t border-white/[0.05]">
          <div class="flex items-center justify-between">
            <span class="text-xs text-neutral-300 font-medium">Context Window</span>
            <span class="text-xs font-mono text-neutral-400">{contextWindow} tokens</span>
          </div>
          <div class="flex items-center gap-2">
            {#each [2048, 4096, 8192] as ctx}
              <button
                onclick={() => {
                  contextWindow = ctx;
                  updateSetting("context_window", ctx);
                }}
                class="flex-1 py-1 rounded-lg text-xs font-mono border transition-all cursor-pointer {contextWindow === ctx
                  ? 'bg-white/10 border-white/20 text-white font-semibold'
                  : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white'}"
              >
                {ctx}
              </button>
            {/each}
          </div>
        </div>

      </div>
    </section>

    <!-- Appearance & Workspace Section -->
    <section class="space-y-3">
      <span class="text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-400 block">Appearance & Workspace</span>
      <div class="bg-[#0c0e14] rounded-xl border border-white/[0.08] p-4 space-y-4">
        
        <!-- Font Size Scale -->
        <div class="space-y-2">
          <span class="text-xs text-neutral-300 font-medium block">Dialogue Font Scale</span>
          <div class="flex items-center gap-2">
            {#each [
              { id: 'sm', label: 'Compact' },
              { id: 'md', label: 'Standard' },
              { id: 'lg', label: 'Comfortable' }
            ] as f}
              <button
                onclick={() => {
                  fontSize = f.id as any;
                  updateSetting("font_size", f.id);
                }}
                class="flex-1 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer {fontSize === f.id
                  ? 'bg-white/10 border-white/20 text-white font-semibold'
                  : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white'}"
              >
                {f.label}
              </button>
            {/each}
          </div>
        </div>

        <!-- Split Canvas Auto-Open -->
        <div class="flex items-center justify-between pt-2 border-t border-white/[0.05]">
          <div>
            <span class="text-xs text-neutral-300 font-medium block">Artifact Studio Canvas</span>
            <span class="text-[10px] text-neutral-500">Auto-expand split canvas when plots are generated</span>
          </div>
          <button
            onclick={() => {
              autoOpenCanvas = !autoOpenCanvas;
              updateSetting("auto_open_canvas", autoOpenCanvas);
            }}
            class="w-9 h-5 rounded-full transition-colors p-0.5 cursor-pointer relative {autoOpenCanvas ? 'bg-emerald-500' : 'bg-neutral-800'}"
            aria-label="Toggle auto canvas"
          >
            <div class="w-4 h-4 rounded-full bg-white transition-transform {autoOpenCanvas ? 'translate-x-4' : 'translate-x-0'}"></div>
          </button>
        </div>

      </div>
    </section>

    <!-- Storage & System Diagnostics -->
    <section class="space-y-3">
      <span class="text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-400 block">Storage & Diagnostics</span>
      <div class="bg-[#0c0e14] rounded-xl border border-white/[0.08] p-4 space-y-3 text-xs">
        {#if storageStats}
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-[11px] font-mono">
              <span class="text-neutral-400">Models Storage (~/.vigyan/models/)</span>
              <span class="text-white font-semibold">{storageStats.models_formatted || "0 MB"}</span>
            </div>
            <!-- Disk Usage Meter -->
            <div class="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
              <div
                class="h-full bg-sky-500 transition-all duration-300"
                style="width: {Math.max(5, Math.min(100, storageStats.disk_percent || 15))}%;"
              ></div>
            </div>
            <div class="flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span>Disk Available: {storageStats.free_formatted || "Unknown"}</span>
              <span>Total: {storageStats.total_formatted || "Unknown"}</span>
            </div>
          </div>
        {/if}

        <div class="pt-2 border-t border-white/[0.05]">
          <button
            type="button"
            onclick={handleResetChat}
            class="w-full py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all border cursor-pointer {confirmReset
              ? 'bg-rose-950/60 border-rose-500 text-rose-200 animate-pulse'
              : 'bg-white/[0.03] border-white/10 text-rose-400 hover:bg-rose-950/20 hover:border-rose-800/40'}"
          >
            {confirmReset ? "Click again to confirm reset" : "Clear Conversation History"}
          </button>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="space-y-2">
      <span class="text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-400 block">About</span>
      <div class="bg-[#0c0e14] border border-white/[0.08] rounded-xl p-3.5 space-y-2 text-[11px]">
        <div class="flex items-center justify-between text-white">
          <span class="font-medium">Vigyan Pro Desktop</span>
          <span class="font-mono text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">v5.0.0</span>
        </div>
        <p class="text-neutral-400 leading-relaxed text-[10px]">
          Sovereign physical and mathematical engineering intelligence workstation combining local SLMs with exact closed-form SymPy CAS algebra.
        </p>
        <div class="pt-2 border-t border-white/[0.05] space-y-1 text-[10px] font-mono text-neutral-500">
          <div class="flex justify-between">
            <span>Author</span>
            <span class="text-neutral-300">ExperimentLab AI</span>
          </div>
          <div class="flex justify-between">
            <span>Architecture</span>
            <span class="text-neutral-300">100% Offline • Zero Egress</span>
          </div>
          <div class="flex justify-between">
            <span>Config Path</span>
            <span class="text-neutral-400">~/.vigyan/config.json</span>
          </div>
        </div>
      </div>
    </section>

  </div>
</aside>
