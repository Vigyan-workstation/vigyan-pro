<script lang="ts">
  // App.svelte — Root Obsidian Executive Frame
  // Sovereign scientific engineering workstation interface.
  // 100% Offline, Zero Cloud Egress, Air-Gapped STEM Workstation.
  import { onMount } from "svelte";
  import Chat from "./components/Chat.svelte";
  import SettingsPanel from "./components/SettingsPanel.svelte";
  import LedgerDrawer from "./components/LedgerDrawer.svelte";
  import ModelsDrawer, { type DownloadInfo } from "./components/ModelsDrawer.svelte";
  import ArtifactStudio from "./components/ArtifactStudio.svelte";
  import { checkOllamaStatus, fetchTelemetry, DEFAULT_MODEL, getAgentHost, getVigyanToken } from "./lib/ollama";
  import { chatStore } from "./lib/chatStore.svelte";
  import { artifactStore } from "./lib/artifactStore.svelte";

  let settingsOpen = $state(false);
  let ledgerOpen = $state(false);
  let modelsOpen = $state(false);
  let ollamaConnected = $state(false);
  let model = $state(DEFAULT_MODEL);
  let activeModelName = $state<string>("");
  let fontSize = $state<"sm" | "md" | "lg">("md");

  let modelsDrawerRef = $state<any>(null);
  let installedCount = $state<number>(1);
  let activeDownload = $state<DownloadInfo | null>(null);

  // Telemetry preserved for diagnostics & tooltip inspections
  let ramUsedGb = $state<number>(1.8);
  let ramTotalGb = $state<number>(7.0);
  let ramPercent = $state<number>(26);
  let initialCheckDone = false;

  async function handlePauseDownload(dl: any) {
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Vigyan-Token"] = token;
      await fetch(`${host}/api/models/download/pause`, {
        method: "POST",
        headers,
        body: JSON.stringify({ tag: dl.tag || dl.filename })
      });
    } catch (e) {}
  }

  async function handleResumeDownload(dl: any) {
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Vigyan-Token"] = token;
      await fetch(`${host}/api/models/download/resume`, {
        method: "POST",
        headers,
        body: JSON.stringify({ tag: dl.tag || dl.filename })
      });
    } catch (e) {}
  }

  async function handleCancelDownload(dl: any) {
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Vigyan-Token"] = token;
      await fetch(`${host}/api/models/download/cancel`, {
        method: "POST",
        headers,
        body: JSON.stringify({ tag: dl.tag || dl.filename, remove_part: true })
      });
    } catch (e) {}
  }

  onMount(() => {
    const handleGlobalKeydown = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        chatStore.clear();
      } else if (isMeta && e.key.toLowerCase() === "m") {
        e.preventDefault();
        modelsOpen = !modelsOpen;
      } else if (isMeta && e.key.toLowerCase() === "l") {
        e.preventDefault();
        ledgerOpen = !ledgerOpen;
      } else if (isMeta && e.key === ",") {
        e.preventDefault();
        settingsOpen = !settingsOpen;
      } else if (e.key === "Escape") {
        if (modelsOpen) modelsOpen = false;
        if (settingsOpen) settingsOpen = false;
        if (ledgerOpen) ledgerOpen = false;
        if (artifactStore.activeArtifact) artifactStore.closeArtifact();
      }
    };
    window.addEventListener("keydown", handleGlobalKeydown);

    const check = async () => {
      ollamaConnected = await checkOllamaStatus();
      const tel = await fetchTelemetry();
      if (tel) {
        const ramP = tel.ram_used_pct ?? tel.ram_pct;
        if (ramP !== undefined) ramPercent = Math.round(ramP);
        if (tel.ram_total_gb) ramTotalGb = Math.round(tel.ram_total_gb * 10) / 10;
        if (tel.ram_avail_gb) {
          ramUsedGb = Math.round((ramTotalGb - tel.ram_avail_gb) * 10) / 10;
        }
      }

      // Check models catalog and first-run state
      try {
        const host = getAgentHost();
        const token = getVigyanToken();
        const headers: Record<string, string> = {};
        if (token) headers["X-Vigyan-Token"] = token;
        const catRes = await fetch(`${host}/api/models/catalog`, { headers, signal: AbortSignal.timeout(2000) });
        if (catRes.ok) {
          const catData = await catRes.json();
          installedCount = catData.installed_count ?? 1;
          if (catData.active_filename) {
            activeModelName = catData.active_filename;
          }
          if (catData.downloads) {
            const dl = Object.values(catData.downloads as Record<string, DownloadInfo>).find(
              d => d.status === "downloading" || d.status === "starting"
            );
            activeDownload = dl || null;
          }
          // First-run auto-open drawer if 0 models installed
          if (!initialCheckDone) {
            initialCheckDone = true;
            if (catData.installed_count === 0) {
              modelsOpen = true;
            }
          }
        }
      } catch {}
    };
    check();
    const interval = setInterval(check, 4_000);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleGlobalKeydown);
    };
  });
</script>

<div class="h-screen w-screen flex flex-col bg-[#000000] text-[#f3f4f6] overflow-hidden font-sans">

  <!-- Executive Minimalist Control Deck: 44px (h-11) whisper-quiet top-bar -->
  <header class="h-11 flex-shrink-0 flex items-center justify-between px-4 border-b border-[var(--guide-color)] bg-[#020408]/90 backdrop-blur-md z-30 select-none">

    <!-- Left: Refined Brand Identity -->
    <div class="flex items-center gap-2.5">
      <div class="w-5 h-5 rounded bg-white/[0.06] border border-white/15 flex items-center justify-center shadow-inner">
        <svg class="w-3 h-3 text-[#10b981]" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,90 20,20 38,20 50,65 62,20 80,20" />
        </svg>
      </div>
      <span class="text-[13px] font-semibold tracking-tight text-white">Vigyan Pro</span>
      <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-emerald-400">v5.0</span>
    </div>

    <!-- Center: Whisper-Quiet Status Capsule (Clickable to open Models Drawer) -->
    <button
      onclick={() => (modelsOpen = !modelsOpen)}
      class="hidden sm:flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] text-[11px] text-[#9ca3af] hover:text-white select-none transition-all cursor-pointer shadow-sm"
      title={activeDownload
        ? `${activeDownload.status === 'paused' ? 'Paused' : 'Downloading'} ${activeDownload.name || activeDownload.filename}: ${activeDownload.progress_pct.toFixed(0)}% • Click to open models`
        : ollamaConnected
        ? `Sovereign Engine Active • ${activeModelName || 'Vigyan'} • ${ramUsedGb}G / ${ramTotalGb}G RAM (${ramPercent}%) • Click to manage models (Cmd+M)`
        : "Connecting to local engine… Click to open Models (Cmd+M)"}
    >
      {#if activeDownload && (activeDownload.status === "downloading" || activeDownload.status === "starting")}
        <span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping"></span>
        <span class="font-mono text-sky-400 font-medium">
          ⬇ {activeDownload.progress_pct.toFixed(0)}%
        </span>
        <span class="text-neutral-400 truncate max-w-[140px]">
          ({activeDownload.speed_mbps.toFixed(1)} MB/s{activeDownload.eta_formatted ? ` • ${activeDownload.eta_formatted}` : ''})
        </span>
      {:else if activeDownload && activeDownload.status === "paused"}
        <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        <span class="font-mono text-amber-400 font-medium">
          ⏸ Paused ({activeDownload.progress_pct.toFixed(0)}%)
        </span>
      {:else}
        <span
          class="w-1.5 h-1.5 rounded-full transition-all duration-300 {ollamaConnected
            ? 'bg-[#10b981] shadow-[0_0_6px_#10b981]'
            : 'bg-[#f59e0b] shadow-[0_0_6px_#f59e0b] animate-pulse'}"
        ></span>
        <span class="font-medium tracking-wide text-[#cbd5e1] truncate max-w-[200px]">
          {ollamaConnected ? (activeModelName ? activeModelName.replace(/\.gguf$/i, '') : "Offline & Grounded") : "Connecting…"}
        </span>
      {/if}
      <span class="text-[9px] font-mono text-neutral-500 ml-0.5">▼</span>
    </button>

    <!-- Right: Frictionless Executive Actions -->
    <div class="flex items-center gap-1.5">
      {#if chatStore.messages.length > 0}
        <button
          onclick={() => chatStore.clear()}
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer border border-transparent"
          title="Start fresh conversation (Cmd+K)"
        >
          <span>+ New</span>
        </button>
      {/if}

      <button
        onclick={() => (settingsOpen = !settingsOpen)}
        class="w-7 h-7 flex items-center justify-center rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer"
        aria-label="Preferences"
        title="Preferences (Cmd+,)"
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

  <!-- Main: Unified Centered Reading & STEM Proof Container (Supports Split Artifact Studio) -->
  <main class="flex-1 overflow-hidden relative w-full h-full flex flex-row">
    <!-- Left: Sovereign Dialogue Stream -->
    <div class="h-full flex-1 min-w-[360px] overflow-hidden transition-all duration-300">
      <Chat
        {model}
        {fontSize}
        {installedCount}
        {activeDownload}
        onStartDownload={() => {
          if (modelsDrawerRef?.downloadFlagship) {
            modelsDrawerRef.downloadFlagship();
          }
        }}
        onOpenModels={() => (modelsOpen = true)}
        onPauseDownload={handlePauseDownload}
        onResumeDownload={handleResumeDownload}
        onCancelDownload={handleCancelDownload}
      />
    </div>

    <!-- Right: Sovereign Artifact Studio (Split Canvas) -->
    {#if artifactStore.activeArtifact}
      <div class="w-px bg-white/10 flex-shrink-0"></div>
      <div class="h-full w-[50%] min-w-[420px] max-w-[70%] flex-shrink-0 animate-in slide-in-from-right-4 duration-200">
        <ArtifactStudio
          artifact={artifactStore.activeArtifact}
          onClose={() => artifactStore.closeArtifact()}
        />
      </div>
    {/if}
  </main>

  <!-- Intelligence Models Slide-in Drawer -->
  <ModelsDrawer
    bind:this={modelsDrawerRef}
    open={modelsOpen}
    onClose={() => (modelsOpen = false)}
    onModelSwapped={(fname) => {
      model = fname;
      activeModelName = fname;
    }}
    onDownloadUpdate={(dl) => {
      activeDownload = dl;
    }}
    onCatalogUpdate={(cat) => {
      installedCount = cat.installedCount;
      if (cat.activeModelName) activeModelName = cat.activeModelName;
      if (cat.activeFilename) model = cat.activeFilename;
    }}
  />

  <!-- Learning Ledger Slide-in Drawer -->
  <LedgerDrawer
    open={ledgerOpen}
    onClose={() => (ledgerOpen = false)}
  />

  <!-- Settings Slide-in Drawer -->
  <SettingsPanel
    open={settingsOpen}
    onClose={() => (settingsOpen = false)}
    {activeModelName}
    onOpenLedger={() => (ledgerOpen = true)}
    onOpenModels={() => (modelsOpen = true)}
  />

</div>
