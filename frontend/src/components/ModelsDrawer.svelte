<script lang="ts">
  // ModelsDrawer.svelte — Steve Jobs 4-Model Purity Vault (v5.0.5)
  // 70% Decluttering: Pure 4 plain-English cards with Auto-Heal & Instant Activation.
  // Directly connects to Experimentlab public models and local ~/.vigyan/models/

  import { onMount, onDestroy } from "svelte";
  import { getAgentHost, getVigyanToken } from "../lib/ollama";

  interface Props {
    open: boolean;
    onClose: () => void;
    onModelSwapped?: (filename: string) => void;
    onDownloadUpdate?: (activeDownload: DownloadInfo | null) => void;
    onCatalogUpdate?: (info: { installedCount: number; activeFilename: string; activeModelName: string }) => void;
  }

  let { open, onClose, onModelSwapped, onDownloadUpdate, onCatalogUpdate }: Props = $props();

  export interface DownloadInfo {
    tag?: string;
    name?: string;
    filename?: string;
    status: "idle" | "starting" | "downloading" | "paused" | "ready" | "completed" | "error" | "cancelled";
    progress_pct: number;
    downloaded_bytes: number;
    total_bytes: number;
    speed_mbps: number;
    eta_formatted?: string;
    error?: string | null;
  }

  interface CuratedCard {
    key: "3b" | "7b" | "14b";
    title: string;
    subtitle: string;
    sizeFormatted: string;
    ramRequiredGb: number;
    filename: string;
    rawItem?: any;
    isInstalled: boolean;
    isActive: boolean;
    downloadInfo?: DownloadInfo;
  }

  function getCachedCatalog(): any[] {
    try {
      if (typeof window !== "undefined") {
        const c = localStorage.getItem("vigyan_models_catalog");
        if (c) return JSON.parse(c);
      }
    } catch {}
    return [];
  }

  function getCachedActiveFilename(): string {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem("vigyan_active_filename") || "";
      }
    } catch {}
    return "";
  }

  let rawModels = $state<any[]>(getCachedCatalog());
  let downloads = $state<Record<string, DownloadInfo>>({});
  let activeFilename = $state<string>(getCachedActiveFilename());
  let hardware = $state<{ total_ram_gb?: number }>({ total_ram_gb: 7.0 });

  let startingKey = $state<string | null>(null);
  let swappingKey = $state<string | null>(null);
  let confirmDeleteKey = $state<string | null>(null);
  let statusMessage = $state<{ text: string; error?: boolean } | null>(null);
  let statusTimer: ReturnType<typeof setTimeout> | null = null;
  let pollInterval: ReturnType<typeof setInterval> | null = null;

  function showStatus(text: string, error = false) {
    statusMessage = { text, error };
    if (statusTimer) clearTimeout(statusTimer);
    statusTimer = setTimeout(() => {
      statusMessage = null;
    }, 3500);
  }

  // 3 Steve Jobs Curated Cards: 3B Quad-Master, 7B Quad-Master, 14B DeepSeek
  const cards = $derived<CuratedCard[]>([
    {
      key: "3b",
      title: "Vigyan-3B Quad-Master",
      subtitle: "Fast math, physics, calculus & exact symbolic code",
      sizeFormatted: "1.39 GB",
      ramRequiredGb: 4.0,
      filename: "vigyan-3b-quad-master-iq3_m.gguf",
      isInstalled: false,
      isActive: false,
    },
    {
      key: "7b",
      title: "Vigyan-7B Quad-Master",
      subtitle: "Doctoral proofs, complex engineering & physical science",
      sizeFormatted: "4.16 GB",
      ramRequiredGb: 8.0,
      filename: "vigyan-7b-quad-master-q4_k_m.gguf",
      isInstalled: false,
      isActive: false,
    },
    {
      key: "14b",
      title: "DeepSeek-R1 14B Reasoning",
      subtitle: "DeepSeek-R1 Distill Qwen 14B IQ3 deep step-by-step reasoning",
      sizeFormatted: "6.44 GB",
      ramRequiredGb: 10.0,
      filename: "DeepSeek-R1-Distill-Qwen-14B-IQ3_M.gguf",
      isInstalled: false,
      isActive: false,
    },
  ].map(card => {
    const raw = rawModels.find(m => m.filename === card.filename);
    const dl = downloads[card.filename] ||
               downloads[card.filename.replace(".gguf", "")] ||
               downloads[card.key] ||
               (raw ? (downloads[raw.tag] || downloads[raw.id]) : undefined);
    const isInst = raw ? Boolean(raw.is_installed) : false;
    const isAct = raw ? Boolean(raw.is_active) : (activeFilename === card.filename);
    return {
      ...card,
      rawItem: raw,
      isInstalled: isInst,
      isActive: isAct,
      downloadInfo: dl,
    };
  }));

  async function fetchCatalog() {
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = {};
      if (token) headers["X-Vigyan-Token"] = token;

      const res = await fetch(`${host}/api/models/catalog`, { headers });
      if (res.ok) {
        const data = await res.json();
        rawModels = data.models || [];
        activeFilename = data.active_filename || "";
        try {
          localStorage.setItem("vigyan_models_catalog", JSON.stringify(rawModels));
          localStorage.setItem("vigyan_active_filename", activeFilename);
        } catch {}
        if (data.hardware) {
          hardware = data.hardware;
        }

        const activeItem = rawModels.find(m => m.filename === activeFilename || m.is_active);
        const installedCount = rawModels.filter(m => m.is_installed).length;
        if (onCatalogUpdate) {
          onCatalogUpdate({
            installedCount,
            activeFilename,
            activeModelName: activeItem ? activeItem.name : "Vigyan-3B",
          });
        }
      }
    } catch {
      // offline bridge fallback
    }
  }

  async function pollDownloads() {
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = {};
      if (token) headers["X-Vigyan-Token"] = token;

      const res = await fetch(`${host}/api/models/download/status`, { headers });
      if (res.ok) {
        const data = await res.json();
        downloads = data;

        const activeList = Object.values(data).filter((d: any) =>
          d && (d.status === "downloading" || d.status === "starting")
        );
        if (onDownloadUpdate) {
          onDownloadUpdate(activeList.length > 0 ? (activeList[0] as DownloadInfo) : null);
        }

        const hasFinished = Object.values(data).some((d: any) => d && d.status === "ready");
        if (hasFinished) {
          startingKey = null;
          await fetchCatalog();
        }
      }
    } catch {}
  }

  async function handleDownload(card: CuratedCard) {
    startingKey = card.key;
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Vigyan-Token"] = token;

      showStatus(`Connecting download for ${card.title}…`);
      const res = await fetch(`${host}/api/models/download`, {
        method: "POST",
        headers,
        body: JSON.stringify({ filename: card.filename }),
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.status === "ready" || data.message?.includes("verified")) {
          showStatus(`${card.title} is verified and ready!`);
          startingKey = null;
          await fetchCatalog();
        } else {
          pollDownloads();
        }
      } else {
        const err = await res.json().catch(() => ({}));
        startingKey = null;
        showStatus(err.error || "Could not start download", true);
      }
    } catch {
      startingKey = null;
      showStatus("Network connection error", true);
    }
  }

  async function handleSwap(card: CuratedCard) {
    if (swappingKey) return;
    swappingKey = card.key;
    showStatus(`Activating ${card.title}…`);

    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Vigyan-Token"] = token;

      const res = await fetch(`${host}/api/models/swap`, {
        method: "POST",
        headers,
        body: JSON.stringify({ filename: card.filename }),
      });

      if (res.ok) {
        activeFilename = card.filename;
        await fetchCatalog();
        if (onModelSwapped) onModelSwapped(card.filename);
        showStatus(`${card.title} is now active!`);
      } else {
        const err = await res.json().catch(() => ({}));
        showStatus(err.error || "Failed to switch model", true);
      }
    } catch {
      showStatus("Connection error during switch", true);
    } finally {
      swappingKey = null;
    }
  }

  async function handleDelete(card: CuratedCard) {
    if (confirmDeleteKey !== card.key) {
      confirmDeleteKey = card.key;
      setTimeout(() => {
        if (confirmDeleteKey === card.key) confirmDeleteKey = null;
      }, 3500);
      return;
    }

    confirmDeleteKey = null;
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Vigyan-Token"] = token;

      const res = await fetch(`${host}/api/models/delete`, {
        method: "POST",
        headers,
        body: JSON.stringify({ filename: card.filename }),
      });

      if (res.ok) {
        showStatus(`Deleted ${card.title}`);
        await fetchCatalog();
      } else {
        showStatus("Could not delete model", true);
      }
    } catch {
      showStatus("Failed to delete model", true);
    }
  }

  $effect(() => {
    if (open) {
      fetchCatalog();
      if (!pollInterval) {
        pollInterval = setInterval(pollDownloads, 1000);
      }
    } else {
      if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
      }
    }
  });

  onDestroy(() => {
    if (pollInterval) clearInterval(pollInterval);
  });
</script>

{#if open}
  <!-- Tactile backdrop -->
  <div
    role="button"
    tabindex="0"
    aria-label="Close Model Vault"
    onclick={onClose}
    onkeydown={(e) => (e.key === "Escape" || e.key === "Enter" || e.key === " ") && onClose()}
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 cursor-pointer"
  ></div>
{/if}

<!-- Steve Jobs 4-Model Drawer -->
<aside
  class="fixed top-0 right-0 h-full w-[440px] max-w-[94vw] bg-[#06080c] border-l border-white/10 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] {open ? 'translate-x-0' : 'translate-x-full'}"
  aria-label="Intelligence Vault"
>
  <!-- Header -->
  <div class="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between flex-shrink-0">
    <div class="space-y-0.5">
      <h2 class="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
        <span>Intelligence Models</span>
        <span class="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded-full font-mono font-medium">4 Models</span>
      </h2>
      <p class="text-[11px] text-neutral-400">100% offline sovereign reasoning engines</p>
    </div>
    <button
      onclick={onClose}
      class="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
      aria-label="Close models"
    >
      ✕
    </button>
  </div>

  <!-- Status Notification -->
  {#if statusMessage}
    <div class="px-6 py-2 text-xs font-medium tracking-tight text-center flex-shrink-0 transition-all {statusMessage.error ? 'bg-rose-500 text-white' : 'bg-white text-black'}">
      {statusMessage.text}
    </div>
  {/if}

  <!-- Body: 4 Curated Plain-English Cards -->
  <div class="flex-1 overflow-y-auto px-6 py-5 space-y-4">
    {#each cards as card}
      {@const dl = card.downloadInfo}
      {@const isStarting = startingKey === card.key || (dl && dl.status === "starting")}
      {@const isDownloading = dl && (dl.status === "downloading" || dl.status === "starting")}
      {@const isError = dl && dl.status === "error"}
      {@const isOverRam = card.ramRequiredGb > (hardware.total_ram_gb || 7.0)}

      <div class="p-4 rounded-2xl border transition-all duration-200 {card.isActive
        ? 'bg-white/[0.06] border-white/40 shadow-lg'
        : 'bg-white/[0.02] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]'}">

        <!-- Card Top: Title, Size, and Active Badge -->
        <div class="flex items-start justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-semibold text-white tracking-tight">{card.title}</h3>
              <span class="text-[11px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded-md">{card.sizeFormatted}</span>
            </div>
            <p class="text-xs text-neutral-400 leading-relaxed">{card.subtitle}</p>
          </div>

          {#if card.isActive}
            <span class="flex-shrink-0 text-[10px] font-semibold text-black bg-white px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Active
            </span>
          {/if}
        </div>

        <!-- Download Progress Bar (When actively downloading) -->
        {#if isDownloading}
          <div class="mt-3.5 space-y-1.5 pt-3 border-t border-white/[0.06]">
            <div class="flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span class="text-white font-medium">{isStarting ? "Connecting to Hugging Face…" : `${dl?.progress_pct?.toFixed(1) || 0}%`}</span>
              <span>{dl?.speed_mbps ? `${dl.speed_mbps.toFixed(1)} MB/s` : ""}</span>
            </div>
            <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                class="h-full bg-white rounded-full transition-all duration-300"
                style="width: {Math.max(5, dl?.progress_pct || 5)}%"
              ></div>
            </div>
          </div>
        {/if}

        <!-- Card Bottom: Action Controls -->
        <div class="mt-3.5 pt-3 border-t border-white/[0.06] flex items-center justify-end gap-2">
          {#if isStarting}
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs font-mono">
              <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <span>Connecting…</span>
            </div>
          {:else if isDownloading}
            <span class="text-xs text-neutral-400 font-mono">Downloading…</span>
          {:else if card.isInstalled}
            <!-- Delete button -->
            <button
              onclick={() => handleDelete(card)}
              class="px-2.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer {confirmDeleteKey === card.key
                ? 'bg-rose-500 text-white font-medium'
                : 'text-neutral-500 hover:text-rose-400 hover:bg-white/5'}"
              title="Delete model from disk"
            >
              {confirmDeleteKey === card.key ? "Confirm Delete" : "Delete"}
            </button>

            <!-- Switch / Use button -->
            {#if !card.isActive}
              <button
                onclick={() => handleSwap(card)}
                disabled={swappingKey !== null}
                class="px-4 py-1.5 rounded-xl text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all cursor-pointer shadow-sm disabled:opacity-50"
              >
                {swappingKey === card.key ? "Activating…" : "Use"}
              </button>
            {/if}
          {:else if isError}
            <!-- Tactile Error & 1-Click Retry Badge -->
            <div class="flex items-center gap-2">
              <span class="text-[11px] font-mono text-rose-300 bg-rose-950/40 border border-rose-500/25 px-2.5 py-1 rounded-lg" title={dl?.error || "Download error"}>
                {dl?.error ? (dl.error.length > 25 ? dl.error.slice(0, 22) + '…' : dl.error) : 'Interrupted'}
              </span>
              <button
                onclick={() => handleDownload(card)}
                class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-500 hover:bg-rose-400 text-white transition-all cursor-pointer shadow-sm"
              >
                Retry ↺
              </button>
            </div>
          {:else if isOverRam}
            <!-- Steve Jobs hardware guidance for low-RAM laptops -->
            <div class="flex items-center gap-2">
              <span class="text-[11px] text-amber-300/80 bg-amber-950/40 border border-amber-500/20 px-2 py-1 rounded-lg">
                Requires 16GB+ RAM
              </span>
              <button
                onclick={() => {
                  const c3b = cards.find(c => c.key === "3b");
                  if (c3b) {
                    if (c3b.isInstalled) handleSwap(c3b);
                    else handleDownload(c3b);
                  }
                }}
                class="px-3 py-1.5 rounded-xl text-xs font-medium text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
              >
                Use 3B ›
              </button>
            </div>
          {:else}
            <!-- Clean 1-click Download button -->
            <button
              onclick={() => handleDownload(card)}
              class="px-4 py-1.5 rounded-xl text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <span>Download</span>
              <span class="opacity-60 text-[10px]">({card.sizeFormatted})</span>
            </button>
          {/if}
        </div>

      </div>
    {/each}
  </div>

  <!-- Minimal Executive Footer -->
  <div class="px-6 py-3.5 border-t border-white/[0.08] bg-[#040608] flex items-center justify-between text-[11px] text-neutral-400 flex-shrink-0">
    <span>Public on Experimentlab</span>
    <span>Zero Token Required</span>
  </div>
</aside>
