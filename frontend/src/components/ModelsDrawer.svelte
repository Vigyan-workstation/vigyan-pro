<script lang="ts">
  // ModelsDrawer.svelte — Sovereign Intelligence Model Catalog & Manager
  // Directly interfaces with Experimentlab Hugging Face models and local ~/.vigyan/models/
  // Supports Search, Download, Swap, and Safe Deletion with live hardware profiling.

  import { onMount } from "svelte";
  import { getAgentHost, getVigyanToken } from "../lib/ollama";

  interface Props {
    open: boolean;
    onClose: () => void;
    onModelSwapped?: (filename: string) => void;
    onDownloadUpdate?: (activeDownload: DownloadInfo | null) => void;
    onCatalogUpdate?: (info: { installedCount: number; activeFilename: string; activeModelName: string }) => void;
  }

  let { open, onClose, onModelSwapped, onDownloadUpdate, onCatalogUpdate }: Props = $props();

  export interface ModelItem {
    id: string;
    name: string;
    tag: string;
    filename: string;
    size_bytes: number;
    size_formatted: string;
    actual_size_bytes?: number;
    ram_required_gb: number;
    domain: string;
    hf_url: string;
    hf_repo: string;
    is_installed: boolean;
    is_active: boolean;
    compatibility: "verified" | "tight" | "incompatible";
    compatibility_badge: string;
  }

  export interface DownloadInfo {
    tag?: string;
    name?: string;
    filename?: string;
    status: "idle" | "starting" | "downloading" | "paused" | "ready" | "completed" | "error" | "cancelled";
    progress_pct: number;
    downloaded_bytes: number;
    total_bytes: number;
    speed_mbps: number;
    eta_seconds?: number;
    eta_formatted?: string;
    error?: string | null;
  }

  let models = $state<ModelItem[]>([]);
  let downloads = $state<Record<string, DownloadInfo>>({});
  let activeFilename = $state<string>("");
  let installedCount = $state<number>(0);
  let totalCount = $state<number>(0);
  let hardware = $state<{ total_ram_gb?: number; avail_ram_gb?: number; tier?: string; cpu_threads?: number }>({});
  
  let searchQuery = $state("");
  let activeFilter = $state<"all" | "installed" | "available">("all");
  let isLoading = $state(false);
  let isRefreshing = $state(false);
  let swappingFilename = $state<string | null>(null);
  let confirmDeleteFilename = $state<string | null>(null);
  let statusMessage = $state<{ type: "success" | "error" | "info"; text: string } | null>(null);

  let activeDownloadList = $derived(
    Object.values(downloads).filter(d =>
      d && (d.status === "downloading" || d.status === "starting" || d.status === "paused")
    )
  );

  let pollInterval: ReturnType<typeof setInterval> | null = null;

  function isRamExceeded(model: ModelItem): boolean {
    const totalRam = hardware.total_ram_gb || 7.0;
    return model.ram_required_gb > totalRam;
  }

  function getModelTitle(m: ModelItem): string {
    const raw = (m.name || m.filename || "").replace(/\.gguf$/i, "").toLowerCase();
    if (raw.includes("3b-quad-master")) return "Vigyan-3B Quad-Master";
    if (raw.includes("1.5b-4x-moe") || raw.includes("1.5b-moe")) return "Vigyan-1.5B (4x MoE)";
    if (raw.includes("2b-stem")) return "Vigyan-2B STEM Reasoner";
    if (raw.includes("2b-reasoning")) return "Vigyan-2B Logic Reasoner";
    if (raw.includes("7b-stem") || raw.includes("4th-gen-7b") || raw.includes("gen-4-7b")) return "Vigyan-7B STEM Engine";
    if (raw.includes("silicon-rtl") || raw.includes("silicon-eda")) return "OLMo2-7B Silicon RTL & EDA";
    if (raw.includes("biomed-chem")) return "OLMo2-7B BioMed & Chem";
    if (raw.includes("vl-4b") || raw.includes("vl4b")) return "Vigyan-VL-4B Multimodal";
    if (m.name && !m.name.toLowerCase().endsWith(".gguf") && m.name !== m.filename) {
      return m.name;
    }
    return raw
      .split(/[-_]/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  function getModelSubtitle(m: ModelItem): string {
    if (m.domain && m.domain.trim()) return m.domain;
    if (/quad-master/i.test(m.filename)) return "Flagship Offline STEM Reasoner with CAS";
    if (/7b/i.test(m.filename)) return "Deep Analytical Synthesis & Extended Proofs";
    return "Local Sovereign Intelligence Engine";
  }

  export async function downloadFlagship() {
    let target = models.find(m => m.id === "vigyan-3b-quad-master" || m.filename.includes("vigyan-3b-quad-master"));
    if (!target) {
      await fetchCatalog(true);
      target = models.find(m => m.id === "vigyan-3b-quad-master" || m.filename.includes("vigyan-3b-quad-master"));
    }
    if (target) {
      await handleDownload(target);
    } else {
      try {
        const host = getAgentHost();
        const token = getVigyanToken();
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (token) headers["X-Vigyan-Token"] = token;
        await fetch(`${host}/api/models/download`, {
          method: "POST",
          headers,
          body: JSON.stringify({ filename: "vigyan-3b-quad-master-iq3_m.gguf" })
        });
        await fetchCatalog(true);
      } catch (e) {
        console.error("Flagship download dispatch failed:", e);
      }
    }
  }

  async function fetchCatalog(silent = false, forceRefresh = false) {
    if (!silent) isLoading = true;
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = {};
      if (token) headers["X-Vigyan-Token"] = token;

      const url = forceRefresh ? `${host}/api/models/catalog?refresh=1` : `${host}/api/models/catalog`;
      const res = await fetch(url, { headers });
      if (res.ok) {
        const data = await res.json();
        models = data.models || [];
        installedCount = data.installed_count ?? models.filter(m => m.is_installed).length;
        totalCount = models.length;
        activeFilename = data.active_filename || "";
        hardware = data.hardware || {};
        downloads = data.downloads || {};

        // Dispatch active download to parent
        const activeDl = Object.values(downloads).find(d => d.status === "downloading" || d.status === "starting" || d.status === "paused") || null;
        if (onDownloadUpdate) {
          onDownloadUpdate(activeDl);
        }

        // Dispatch catalog metadata to parent
        if (onCatalogUpdate) {
          const activeItem = models.find(m => m.filename === activeFilename || m.is_active);
          const displayName = activeItem ? getModelTitle(activeItem) : (activeFilename ? activeFilename.replace(/\.gguf$/i, "") : "");
          onCatalogUpdate({
            installedCount,
            activeFilename,
            activeModelName: displayName
          });
        }
      }
    } catch (err) {
      console.error("Failed to fetch model catalog:", err);
    } finally {
      if (!silent) isLoading = false;
    }
  }

  async function handlePauseDownload(dl: DownloadInfo) {
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
      statusMessage = { type: "info", text: `Paused download: ${dl.name || dl.filename}` };
      setTimeout(() => { if (statusMessage?.text.includes("Paused")) statusMessage = null; }, 3000);
      await fetchCatalog(true);
    } catch (e: any) {
      statusMessage = { type: "error", text: `Pause error: ${e.message}` };
    }
  }

  async function handleResumeDownload(dl: DownloadInfo) {
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
      statusMessage = { type: "info", text: `Resumed download: ${dl.name || dl.filename}` };
      setTimeout(() => { if (statusMessage?.text.includes("Resumed")) statusMessage = null; }, 3000);
      await fetchCatalog(true);
    } catch (e: any) {
      statusMessage = { type: "error", text: `Resume error: ${e.message}` };
    }
  }

  async function handleCancelDownload(dl: DownloadInfo) {
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
      statusMessage = { type: "info", text: `Cancelled download: ${dl.name || dl.filename}` };
      setTimeout(() => { if (statusMessage?.text.includes("Cancelled")) statusMessage = null; }, 3000);
      await fetchCatalog(true);
    } catch (e: any) {
      statusMessage = { type: "error", text: `Cancel error: ${e.message}` };
    }
  }

  async function handleRefreshCatalog() {
    isRefreshing = true;
    statusMessage = { type: "info", text: "Scanning Hugging Face for newly published models…" };
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = {};
      if (token) headers["X-Vigyan-Token"] = token;
      await fetch(`${host}/api/models/catalog/refresh`, { method: "POST", headers });
      await fetchCatalog(true);
      statusMessage = { type: "success", text: "Catalog synchronized with Hugging Face (Experimentlab)" };
      setTimeout(() => { if (statusMessage?.text.includes("synchronized")) statusMessage = null; }, 3500);
    } catch (e: any) {
      statusMessage = { type: "error", text: `Refresh error: ${e.message}` };
    } finally {
      isRefreshing = false;
    }
  }

  async function handleDownload(model: ModelItem) {
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Vigyan-Token"] = token;

      const res = await fetch(`${host}/api/models/download`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          filename: model.filename,
          name: model.name,
          hf_url: model.hf_url,
          size_bytes: model.size_bytes
        })
      });

      if (res.ok) {
        statusMessage = { type: "info", text: `Download started: ${model.name}` };
        setTimeout(() => { if (statusMessage?.text.includes("Download started")) statusMessage = null; }, 4000);
        await fetchCatalog(true);
      } else {
        const err = await res.json().catch(() => ({}));
        statusMessage = { type: "error", text: err.error || "Failed to start download" };
      }
    } catch (err: any) {
      statusMessage = { type: "error", text: `Network error: ${err.message}` };
    }
  }

  async function handleSwap(model: ModelItem) {
    if (swappingFilename) return;
    swappingFilename = model.filename;
    statusMessage = { type: "info", text: `Activating ${model.name}…` };

    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Vigyan-Token"] = token;

      const res = await fetch(`${host}/api/models/swap`, {
        method: "POST",
        headers,
        body: JSON.stringify({ filename: model.filename })
      });

      if (res.ok) {
        const data = await res.json();
        activeFilename = data.active_model || model.filename;
        statusMessage = { type: "success", text: `Active engine switched to ${model.name}` };
        setTimeout(() => { statusMessage = null; }, 3000);
        await fetchCatalog(true);
        if (onModelSwapped) onModelSwapped(model.filename);
      } else {
        const err = await res.json().catch(() => ({}));
        statusMessage = { type: "error", text: err.error || "Failed to swap model" };
      }
    } catch (err: any) {
      statusMessage = { type: "error", text: `Swap failed: ${err.message}` };
    } finally {
      swappingFilename = null;
    }
  }

  async function handleDelete(model: ModelItem) {
    if (confirmDeleteFilename !== model.filename) {
      confirmDeleteFilename = model.filename;
      return;
    }

    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Vigyan-Token"] = token;

      const res = await fetch(`${host}/api/models/delete`, {
        method: "POST",
        headers,
        body: JSON.stringify({ filename: model.filename })
      });

      if (res.ok) {
        statusMessage = { type: "info", text: `Deleted ${model.filename}. Space reclaimed.` };
        setTimeout(() => { statusMessage = null; }, 3500);
        confirmDeleteFilename = null;
        await fetchCatalog(true);
      } else {
        const err = await res.json().catch(() => ({}));
        statusMessage = { type: "error", text: err.error || "Failed to delete model" };
      }
    } catch (err: any) {
      statusMessage = { type: "error", text: `Delete failed: ${err.message}` };
    }
  }

  // Filter models based on search and tab
  let filteredModels = $derived(
    models.filter(m => {
      // Tab filter
      if (activeFilter === "installed" && !m.is_installed) return false;
      if (activeFilter === "available" && m.is_installed) return false;

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        m.name.toLowerCase().includes(q) ||
        m.domain.toLowerCase().includes(q) ||
        m.filename.toLowerCase().includes(q) ||
        m.tag.toLowerCase().includes(q)
      );
    })
  );

  // Check if any download is active or paused to adjust polling rate
  let hasActiveDownloads = $derived(
    Object.values(downloads).some(d => d && (d.status === "downloading" || d.status === "starting" || d.status === "paused"))
  );

  $effect(() => {
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }

    if (open) {
      fetchCatalog(true);
      pollInterval = setInterval(() => {
        fetchCatalog(true);
      }, hasActiveDownloads ? 1200 : 4000);
    } else if (hasActiveDownloads) {
      // Continue tracking background downloads when drawer is closed
      pollInterval = setInterval(() => {
        fetchCatalog(true);
      }, 1500);
    } else {
      confirmDeleteFilename = null;
    }
  });

  onMount(() => {
    fetchCatalog(true);
    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  });
</script>

<!-- Backdrop Blur -->
{#if open}
  <button
    type="button"
    class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm border-0 cursor-default"
    onclick={onClose}
    aria-label="Close models drawer"
  ></button>
{/if}

<!-- Obsidian Executive Slide-in Drawer with Apple Fluid Spring Curve -->
<aside
  class="fixed top-0 right-0 h-full w-full sm:w-[440px] z-50 flex flex-col bg-[#07080b] border-l border-white/[0.08] shadow-2xl transition-transform duration-300 {open
    ? 'translate-x-0'
    : 'translate-x-full'}"
  style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); will-change: transform;"
>
  <!-- Executive Header -->
  <div class="px-5 py-3.5 border-b border-white/[0.07] bg-[#0a0c10] flex-shrink-0">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <span class="text-xs font-mono font-semibold tracking-wider text-white uppercase">Intelligence Models</span>
        <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-neutral-300">
          {installedCount} of {totalCount} ready
        </span>
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

    <div class="flex items-center justify-between mt-1 text-[10px] font-mono text-neutral-500">
      <div class="flex items-center gap-1.5 truncate">
        <span>Source:</span>
        <a
          href="https://huggingface.co/Experimentlab"
          target="_blank"
          rel="noreferrer"
          class="text-sky-400 hover:underline truncate"
        >
          huggingface.co/Experimentlab
        </a>
        <button
          onclick={handleRefreshCatalog}
          disabled={isRefreshing}
          class="ml-1 px-1.5 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white border border-white/10 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
          title="Check Hugging Face for newly added or updated models"
        >
          <span class={isRefreshing ? "animate-spin" : ""}>↻</span>
          <span>{isRefreshing ? "Syncing…" : "Sync"}</span>
        </button>
      </div>
      {#if hardware.total_ram_gb}
        <span class="text-neutral-400">{hardware.avail_ram_gb ?? 2.0}G / {hardware.total_ram_gb}G RAM</span>
      {/if}
    </div>
  </div>

  <!-- Toast Notification Bar -->
  {#if statusMessage}
    <div
      class="px-5 py-2 text-xs font-mono flex items-center justify-between border-b transition-all {statusMessage.type === 'error'
        ? 'bg-rose-950/40 border-rose-800/40 text-rose-300'
        : statusMessage.type === 'success'
        ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300'
        : 'bg-sky-950/40 border-sky-800/40 text-sky-300'}"
    >
      <span class="truncate">{statusMessage.text}</span>
      <button onclick={() => (statusMessage = null)} class="text-xs hover:opacity-75 cursor-pointer ml-2">&times;</button>
    </div>
  {/if}

  <!-- Minimal Download Manager Deck -->
  {#if activeDownloadList.length > 0}
    <div class="p-3.5 border-b border-white/[0.08] bg-[#0c0e15] space-y-2.5 flex-shrink-0">
      <div class="flex items-center justify-between text-xs font-mono">
        <span class="text-white font-semibold flex items-center gap-2">
          <span class="w-2 h-2 rounded-full {hasActiveDownloads ? 'bg-sky-400 animate-pulse' : 'bg-amber-400'}"></span>
          <span>Download Manager ({activeDownloadList.length})</span>
        </span>
        <span class="text-[10px] text-neutral-400">Resumable Transfer</span>
      </div>

      {#each activeDownloadList as dl (dl.filename || dl.tag)}
        <div class="bg-[#10131d] border border-white/10 rounded-xl p-3 space-y-2">
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs font-semibold text-white truncate max-w-[210px]">
              {dl.name || dl.filename}
            </span>
            <div class="flex items-center gap-1.5 flex-shrink-0">
              {#if dl.status === "downloading" || dl.status === "starting"}
                <button
                  onclick={() => handlePauseDownload(dl)}
                  class="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center gap-1 border border-white/10"
                  title="Pause download"
                >
                  <span>⏸ Pause</span>
                </button>
              {:else if dl.status === "paused"}
                <button
                  onclick={() => handleResumeDownload(dl)}
                  class="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 transition-all cursor-pointer flex items-center gap-1"
                  title="Resume download"
                >
                  <span>▶ Resume</span>
                </button>
              {/if}
              <button
                onclick={() => handleCancelDownload(dl)}
                class="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 transition-all cursor-pointer"
                title="Cancel download"
              >
                ✕
              </button>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
            <div
              class="h-full {dl.status === 'paused' ? 'bg-amber-500' : 'bg-gradient-to-r from-sky-500 to-emerald-400'} transition-all duration-300"
              style="width: {Math.max(2, Math.min(100, dl.progress_pct))}%;"
            ></div>
          </div>

          <!-- Telemetry Footer: % • Speed • ETA -->
          <div class="flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>{dl.progress_pct.toFixed(1)}%</span>
            <span>{dl.status === 'paused' ? 'Paused' : `${dl.speed_mbps.toFixed(1)} MB/s`}</span>
            <span>{dl.status === 'paused' ? 'Paused' : (dl.eta_formatted ? `ETA: ${dl.eta_formatted}` : '')}</span>
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Filter & Search Controls -->
  <div class="p-4 border-b border-white/[0.06] bg-[#08090d] flex flex-col gap-2.5 flex-shrink-0">
    <!-- Search Bar -->
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search models by name, domain, size..."
        class="w-full bg-[#0d0f14] border border-white/10 focus:border-white/25 rounded-lg pl-9 pr-8 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors font-mono"
      />
      {#if searchQuery}
        <button
          onclick={() => (searchQuery = "")}
          class="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-white cursor-pointer"
          aria-label="Clear search"
        >
          &times;
        </button>
      {/if}
    </div>

    <!-- Filter Pills -->
    <div class="flex items-center gap-1.5">
      <button
        onclick={() => (activeFilter = "all")}
        class="px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer border {activeFilter === 'all'
          ? 'bg-white/10 text-white border-white/20'
          : 'bg-transparent text-neutral-400 border-transparent hover:text-white hover:bg-white/[0.04]'}"
      >
        All ({models.length})
      </button>
      <button
        onclick={() => (activeFilter = "installed")}
        class="px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer border {activeFilter === 'installed'
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          : 'bg-transparent text-neutral-400 border-transparent hover:text-white hover:bg-white/[0.04]'}"
      >
        Installed ({installedCount})
      </button>
      <button
        onclick={() => (activeFilter = "available")}
        class="px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer border {activeFilter === 'available'
          ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
          : 'bg-transparent text-neutral-400 border-transparent hover:text-white hover:bg-white/[0.04]'}"
      >
        Available ({Math.max(0, models.length - installedCount)})
      </button>
    </div>
  </div>

  <!-- Main Scrollable Catalog Feed -->
  <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
    <!-- Zero Installed First-Run Banner -->
    {#if installedCount === 0 && !searchQuery && activeFilter !== "installed"}
      <div class="bg-gradient-to-br from-emerald-950/30 to-[#0c0e14] border border-emerald-500/20 rounded-xl p-3.5 space-y-2">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <h4 class="text-xs font-semibold text-white tracking-wide">First-Run Setup</h4>
        </div>
        <p class="text-[11px] text-neutral-300 leading-relaxed font-sans">
          No model is installed yet. Download <strong class="text-white">Vigyan-3B Quad-Master</strong> below for complete offline STEM reasoning.
        </p>
      </div>
    {/if}

    {#if filteredModels.length === 0}
      <div class="py-16 text-center text-xs font-mono text-neutral-600 space-y-2 select-none">
        <p>No models matching "{searchQuery}"</p>
        <button
          onclick={() => { searchQuery = ""; activeFilter = "all"; }}
          class="text-sky-400 hover:underline text-[11px]"
        >
          Reset filters
        </button>
      </div>
    {:else}
      {#each filteredModels as m (m.filename)}
        {@const dl = downloads[m.filename] || downloads[m.tag] || downloads[m.id]}
        {@const isDownloading = dl && (dl.status === "downloading" || dl.status === "starting" || dl.status === "paused")}
        {@const isCurrentActive = m.is_active || (activeFilename && m.filename === activeFilename)}

        <div
          class="group rounded-xl border p-3.5 transition-all flex flex-col gap-2.5 {isCurrentActive
            ? 'bg-[#0b1218] border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.06)]'
            : m.is_installed
            ? 'bg-[#0a0c10] border-white/[0.08] hover:border-white/20'
            : 'bg-[#08090d]/80 border-white/[0.05] hover:border-white/15'}"
        >
          <!-- Top Row: Title, Badges -->
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="text-xs font-semibold text-white tracking-tight truncate">
                  {getModelTitle(m)}
                </h3>
                {#if isCurrentActive}
                  <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-mono font-medium text-emerald-400">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Active
                  </span>
                {/if}
              </div>
              <p class="text-[11px] text-neutral-400 font-sans mt-0.5 leading-snug line-clamp-2">
                {getModelSubtitle(m)}
              </p>
            </div>

            <!-- Size Pill -->
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-neutral-300 flex-shrink-0">
              {m.size_formatted}
            </span>
          </div>

          <!-- Compatibility & Architecture Metadata -->
          <div class="flex items-center gap-1.5 flex-wrap">
            {#if isRamExceeded(m)}
              <span class="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/40 border border-rose-500/25 text-rose-300">
                <span>✕</span>
                <span>Requires {m.ram_required_gb.toFixed(1)} GB RAM (Host: {hardware.total_ram_gb?.toFixed(1) || '7.0'} GB)</span>
              </span>
            {:else if m.compatibility === "verified"}
              <span class="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/25 text-emerald-300">
                <span>●</span>
                <span>{m.compatibility_badge}</span>
              </span>
            {:else if m.compatibility === "tight"}
              <span class="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/25 text-amber-300">
                <span>▲</span>
                <span>{m.compatibility_badge}</span>
              </span>
            {:else}
              <span class="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/40 border border-rose-500/25 text-rose-300">
                <span>✕</span>
                <span>{m.compatibility_badge}</span>
              </span>
            {/if}

            <span class="text-[9px] font-mono text-neutral-600 truncate">
              {m.filename}
            </span>
          </div>

          <!-- Action States -->
          {#if isDownloading}
            <!-- Live Progress Bar Deck -->
            <div class="space-y-1.5 pt-1">
              <div class="flex items-center justify-between text-[10px] font-mono text-neutral-300">
                <span class="flex items-center gap-1.5 {dl.status === 'paused' ? 'text-amber-400' : 'text-sky-400'}">
                  {#if dl.status === 'paused'}
                    <span>⏸ Paused</span>
                  {:else}
                    <svg class="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" stroke-width="4" class="opacity-25" />
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Downloading…</span>
                  {/if}
                </span>
                <div class="flex items-center gap-2">
                  <span>{dl.progress_pct.toFixed(1)}% ({dl.status === 'paused' ? '0 MB/s' : `${dl.speed_mbps.toFixed(1)} MB/s`})</span>
                  {#if dl.eta_formatted && dl.status !== 'paused'}
                    <span class="text-neutral-500">• {dl.eta_formatted}</span>
                  {/if}
                </div>
              </div>
              <div class="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
                <div
                  class="h-full {dl.status === 'paused' ? 'bg-amber-500' : 'bg-gradient-to-r from-sky-500 to-emerald-400'} transition-all duration-300"
                  style="width: {Math.max(2, Math.min(100, dl.progress_pct))}%;"
                ></div>
              </div>
              <div class="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-0.5">
                <span>{dl.status === 'paused' ? 'Paused in Download Manager' : 'Streaming via Hugging Face'}</span>
                <span class="text-neutral-500">Deck controls above ↑</span>
              </div>
            </div>
          {:else if dl && (dl.status === 'completed' || dl.status === 'ready' || dl.progress_pct >= 99.9) && !m.is_installed}
            <div class="flex items-center justify-between pt-1">
              <span class="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Download Complete</span>
              </span>
              <button
                onclick={() => handleSwap(m)}
                class="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 cursor-pointer flex items-center gap-1"
              >
                <span>Activate Now ›</span>
              </button>
            </div>
          {:else}
            <!-- Button Deck -->
            <div class="flex items-center justify-end gap-2 pt-1">
              {#if m.is_installed}
                {#if isCurrentActive}
                  <button
                    disabled
                    class="px-3 py-1.5 rounded-lg text-xs font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 cursor-default flex items-center gap-1.5"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Active Engine</span>
                  </button>
                {:else if isRamExceeded(m)}
                  <button
                    disabled
                    class="px-3 py-1.5 rounded-lg text-xs font-mono bg-rose-950/30 border border-rose-500/30 text-rose-300 cursor-not-allowed"
                    title="Exceeds host RAM: {m.ram_required_gb.toFixed(1)} GB required vs {hardware.total_ram_gb?.toFixed(1) || '7.0'} GB available"
                  >
                    RAM Exceeded
                  </button>
                {:else}
                  <button
                    onclick={() => handleSwap(m)}
                    disabled={swappingFilename !== null}
                    class="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {#if swappingFilename === m.filename}
                      <svg class="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" stroke-width="4" class="opacity-25" />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>Activating…</span>
                    {:else}
                      <svg class="w-3 h-3 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      <span>Switch & Chat</span>
                    {/if}
                  </button>
                {/if}

                <!-- Delete Action -->
                <button
                  onclick={() => handleDelete(m)}
                  title={confirmDeleteFilename === m.filename ? "Click again to confirm delete" : "Delete model"}
                  class="px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer {confirmDeleteFilename === m.filename
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                    : 'bg-transparent border-transparent text-neutral-500 hover:text-rose-400 hover:bg-white/[0.04]'}"
                >
                  {#if confirmDeleteFilename === m.filename}
                    <span>Confirm 🗑</span>
                  {:else}
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                    </svg>
                  {/if}
                </button>
              {:else if isRamExceeded(m)}
                <!-- RAM Safety Lockout for uninstalled models -->
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-mono text-rose-400/90 bg-rose-950/40 border border-rose-500/20 px-2 py-1 rounded" title="This model exceeds total system RAM and would cause the system to freeze.">
                    Requires {m.ram_required_gb.toFixed(1)} GB RAM (Host: {hardware.total_ram_gb?.toFixed(1) || '7.0'} GB)
                  </span>
                  <button
                    disabled
                    class="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/5 border border-white/10 text-neutral-500 cursor-not-allowed"
                    title="Disabled: Insufficient host RAM"
                  >
                    Locked
                  </button>
                </div>
              {:else}
                <!-- Download Button -->
                <button
                  onclick={() => handleDownload(m)}
                  class="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/30 text-white shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>Download</span>
                </button>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    {/if}
  </div>

  <!-- Minimal Executive Footer -->
  <div class="px-5 py-2.5 border-t border-white/[0.06] bg-[#090b0e] text-[10px] font-mono text-neutral-500 flex items-center justify-between flex-shrink-0">
    <span class="truncate">~/.vigyan/models/</span>
    <span class="text-neutral-400">Zero Cloud Egress</span>
  </div>
</aside>
