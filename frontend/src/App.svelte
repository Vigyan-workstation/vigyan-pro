<script lang="ts">
  // App.svelte — Root Obsidian Executive Frame
  // Nualt x Steve Jobs sovereign engineering workstation interface.
  import { onMount } from "svelte";
  import Chat from "./components/Chat.svelte";
  import SettingsPanel from "./components/SettingsPanel.svelte";
  import StudioCanvas from "./components/StudioCanvas.svelte";
  import { checkOllamaStatus, fetchTelemetry, DEFAULT_MODEL } from "./lib/ollama";
  import { chatStore } from "./lib/chatStore.svelte";
  import { studioStore } from "./lib/studioStore.svelte";

  let settingsOpen = $state(false);
  let ollamaConnected = $state(false);
  let model = $state(DEFAULT_MODEL);
  let fontSize = $state<"sm" | "md" | "lg">("md");

  // Live telemetry state for Nualt Control Deck
  let ramUsedGb = $state<number>(3.8);
  let ramTotalGb = $state<number>(7.0);
  let ramPercent = $state<number>(54);
  let isCascaded = $state<boolean>(false);
  let contextTier = $state<string>("8K DEEP");

  onMount(() => {
    // Read stored context setting
    try {
      const storedCtx = localStorage.getItem("vigyan_context_window");
      if (storedCtx === "2048") contextTier = "2K STD";
      else if (storedCtx === "4096") contextTier = "4K EXT";
      else contextTier = "8K DEEP";
    } catch {}

    const check = async () => {
      ollamaConnected = await checkOllamaStatus();
      const tel = await fetchTelemetry();
      if (tel) {
        if (tel.ram_used_pct) ramPercent = Math.round(tel.ram_used_pct);
        if (tel.ram_total_gb) ramTotalGb = Math.round(tel.ram_total_gb * 10) / 10;
        if (tel.ram_avail_gb) {
          ramUsedGb = Math.round((ramTotalGb - tel.ram_avail_gb) * 10) / 10;
          if (tel.ram_avail_gb < 3.6 && model.includes("7b")) {
            isCascaded = true;
          } else {
            isCascaded = false;
          }
        }
      }
    };
    check();
    const interval = setInterval(check, 5_000);
    return () => clearInterval(interval);
  });
</script>

<div class="h-screen w-screen flex flex-col bg-[#000000] text-[#f3f4f6] select-none overflow-hidden font-sans">

  <!-- Executive Minimalist Control Deck: 44px (h-11) whisper-quiet top-bar -->
  <header class="h-11 flex-shrink-0 flex items-center justify-between px-4 border-b border-[var(--guide-color)] bg-[#020408]/80 backdrop-blur-md z-30 select-none">

    <!-- Left: Brand Identity & Active Model -->
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-2">
        <div class="w-5 h-5 rounded bg-white/[0.06] border border-white/15 flex items-center justify-center">
          <svg class="w-3 h-3 text-[#38bdf8]" viewBox="0 0 100 100" fill="currentColor">
            <polygon points="50,90 20,20 38,20 50,65 62,20 80,20" />
          </svg>
        </div>
        <span class="text-[13px] font-medium tracking-tight text-white">Vigyan Pro</span>
        <span class="text-[9px] font-mono px-1 py-0.2 rounded bg-white/[0.04] border border-white/10 text-[#6b7280]">v3.1</span>
      </div>

      <!-- Divider -->
      <span class="text-white/10">/</span>

      <!-- Model Status Pill -->
      <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono">
        {#if model.includes("7b")}
          {#if isCascaded}
            <span class="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse"></span>
            <span class="text-[#f59e0b]">7B → 1.5B Cascade</span>
          {:else}
            <span class="w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_6px_#38bdf8]"></span>
            <span class="text-white/90">7B Frontier</span>
          {/if}
        {:else}
          <span class="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
          <span class="text-white/90">1.5B Quad-Master</span>
        {/if}
      </div>
    </div>

    <!-- Center: Whisper-Quiet Telemetry Capsule -->
    <div class="hidden sm:flex items-center gap-2.5 px-3 py-1 rounded-full bg-black/40 border border-white/[0.06] text-[10px] font-mono text-[#8b949e]">
      <span>{contextTier}</span>
      <span class="text-white/10">•</span>
      <span class="{ramPercent >= 85 ? 'text-[#ef4444]' : ramPercent >= 70 ? 'text-[#f59e0b]' : 'text-[#8b949e]'}">
        {ramUsedGb}G RAM ({ramPercent}%)
      </span>
      <span class="text-white/10">•</span>
      <span class="text-[#10b981]">AST 0ms</span>
    </div>

    <!-- Right: Frictionless Executive Actions -->
    <div class="flex items-center gap-1.5">
      <!-- 3D Studio Toggle -->
      <button
        onclick={() => (studioStore.isOpen = !studioStore.isOpen)}
        class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer {studioStore.isOpen ? 'bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 shadow-sm' : 'text-[#9ca3af] hover:text-white hover:bg-white/[0.05] border border-transparent'}"
        title="Toggle 3D STEM & Hardware Canvas"
      >
        <span class="text-xs">⬡</span>
        <span class="text-[11px]">3D Studio</span>
        {#if studioStore.activeArtifact}
          <span class="w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_6px_#38bdf8]"></span>
        {/if}
      </button>

      {#if chatStore.messages.length > 0}
        <button
          onclick={() => chatStore.clear()}
          class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer border border-transparent"
          title="Start fresh conversation"
        >
          <span>+ New</span>
        </button>
      {/if}

      <button
        onclick={() => (settingsOpen = !settingsOpen)}
        class="w-7 h-7 flex items-center justify-center rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer"
        aria-label="Settings"
        title="Settings"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </header>

  <!-- Main: Nualt Architectural Blueprint Split Grid -->
  <main class="flex-1 overflow-hidden relative flex">
    <div class="h-full transition-all duration-300 {studioStore.isOpen ? 'w-[52%] border-r border-[var(--guide-color)]' : 'w-full'}">
      <Chat {model} {fontSize} />
    </div>

    {#if studioStore.isOpen}
      <div class="h-full w-[48%] flex-shrink-0 animate-fade-in bg-[#04060a]">
        <StudioCanvas />
      </div>
    {/if}
  </main>

  <!-- Settings Slide-in Drawer -->
  <SettingsPanel
    open={settingsOpen}
    {model}
    {fontSize}
    onClose={() => (settingsOpen = false)}
    onModelChange={(m) => (model = m)}
    onFontSizeChange={(s) => (fontSize = s)}
  />

</div>
