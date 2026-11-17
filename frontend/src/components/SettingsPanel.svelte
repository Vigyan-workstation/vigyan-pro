<script lang="ts">
  // SettingsPanel.svelte — Sovereign Control Center (v5.0.7)
  // Radical 80% reduction: Pure 4-row tactile control center.
  // Dual-persisted (localStorage + ~/.vigyan/config.json).
  // Zero nerd clutter: No CPU core sliders, no HF token fields, no raw numbers.

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

  // Pure 4-Row State
  let responseStyle = $state<"precise" | "balanced" | "creative">("precise");
  let fontSize = $state<"sm" | "md" | "lg">("md");

  // Storage Stats
  let storageStats = $state<{
    models_formatted?: string;
    free_formatted?: string;
    total_formatted?: string;
    disk_percent?: number;
  } | null>(null);

  // Confirmations
  let confirmClearChat = $state<boolean>(false);
  let clearTimer: ReturnType<typeof setTimeout> | null = null;

  let confirmPurge = $state<boolean>(false);
  let purgeTimer: ReturnType<typeof setTimeout> | null = null;
  let isPurging = $state<boolean>(false);

  let statusNotice = $state<string | null>(null);
  let noticeTimer: ReturnType<typeof setTimeout> | null = null;

  function showNotice(msg: string) {
    statusNotice = msg;
    if (noticeTimer) clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => {
      statusNotice = null;
    }, 2800);
  }

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
        if (data.temperature !== undefined) {
          if (data.temperature <= 0.1) responseStyle = "precise";
          else if (data.temperature <= 0.5) responseStyle = "balanced";
          else responseStyle = "creative";
        }
        if (data.font_size) fontSize = data.font_size;
      }

      // 2. Fetch storage
      await refreshStorage();
    } catch {
      // Fallback to localStorage
      try {
        const localTemp = localStorage.getItem("vigyan_pref_temperature");
        if (localTemp) {
          const t = parseFloat(localTemp);
          if (t <= 0.1) responseStyle = "precise";
          else if (t <= 0.5) responseStyle = "balanced";
          else responseStyle = "creative";
        }
        const localFont = localStorage.getItem("vigyan_pref_font_size") as "sm" | "md" | "lg" | null;
        if (localFont) fontSize = localFont;
      } catch {}
    }
  }

  async function refreshStorage() {
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = {};
      if (token) headers["X-Vigyan-Token"] = token;
      const stRes = await fetch(`${host}/api/storage`, { headers });
      if (stRes.ok) {
        storageStats = await stRes.json();
      }
    } catch {}
  }

  async function setStyle(style: "precise" | "balanced" | "creative") {
    responseStyle = style;
    const tempMap = { precise: 0.0, balanced: 0.3, creative: 0.7 };
    const temp = tempMap[style];

    try {
      localStorage.setItem("vigyan_pref_temperature", String(temp));
    } catch {}

    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Vigyan-Token"] = token;
      await fetch(`${host}/api/settings`, {
        method: "POST",
        headers,
        body: JSON.stringify({ temperature: temp }),
      });
      showNotice(`Style set to ${style.charAt(0).toUpperCase() + style.slice(1)}`);
    } catch {}
  }

  async function setSize(size: "sm" | "md" | "lg") {
    fontSize = size;
    try {
      localStorage.setItem("vigyan_pref_font_size", size);
      if (onFontSizeChange) onFontSizeChange(size);
    } catch {}

    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Vigyan-Token"] = token;
      await fetch(`${host}/api/settings`, {
        method: "POST",
        headers,
        body: JSON.stringify({ font_size: size }),
      });
      showNotice(`Text size: ${size.toUpperCase()}`);
    } catch {}
  }

  async function handlePurgeStorage() {
    if (!confirmPurge) {
      confirmPurge = true;
      if (purgeTimer) clearTimeout(purgeTimer);
      purgeTimer = setTimeout(() => {
        confirmPurge = false;
      }, 4000);
      return;
    }

    confirmPurge = false;
    isPurging = true;
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Vigyan-Token"] = token;

      const res = await fetch(`${host}/api/models/purge`, {
        method: "POST",
        headers,
        body: JSON.stringify({}),
      });

      if (res.ok) {
        const data = await res.json();
        showNotice(`Reclaimed ${data.reclaimed_formatted || "disk space"}`);
        await refreshStorage();
      } else {
        showNotice("Could not purge storage");
      }
    } catch {
      showNotice("Network error while reclaiming space");
    } finally {
      isPurging = false;
    }
  }

  function handleResetChat() {
    if (!confirmClearChat) {
      confirmClearChat = true;
      if (clearTimer) clearTimeout(clearTimer);
      clearTimer = setTimeout(() => {
        confirmClearChat = false;
      }, 3500);
      return;
    }

    confirmClearChat = false;
    try {
      chatStore.clear();
      showNotice("Conversation cleared");
    } catch {
      showNotice("Reset failed");
    }
  }

  const handleClearChat = handleResetChat;

  $effect(() => {
    if (open) {
      loadSettings();
    }
  });

  onMount(() => {
    loadSettings();
  });
</script>

{#if open}
  <!-- Backdrop with tactile blur -->
  <div
    role="button"
    tabindex="0"
    aria-label="Close Settings Backdrop"
    onclick={onClose}
    onkeydown={(e) => (e.key === "Escape" || e.key === "Enter" || e.key === " ") && onClose()}
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 cursor-pointer"
  ></div>
{/if}

<!-- Sovereign Preferences Drawer -->
<aside
  class="fixed top-0 right-0 h-full w-[380px] max-w-[92vw] bg-[#06080c] border-l border-white/10 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] {open ? 'translate-x-0' : 'translate-x-full'}"
  aria-label="Preferences Panel"
>
  <!-- Header -->
  <div class="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between flex-shrink-0">
    <div class="space-y-0.5">
      <h2 class="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
        <span>Preferences</span>
      </h2>
      <p class="text-[11px] text-neutral-400">Minimal workstation control</p>
    </div>
    <button
      onclick={onClose}
      class="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
      aria-label="Close preferences"
    >
      ✕
    </button>
  </div>

  <!-- Status Notification -->
  {#if statusNotice}
    <div class="px-6 py-2 bg-white text-black text-xs font-medium tracking-tight text-center flex-shrink-0 transition-all">
      {statusNotice}
    </div>
  {/if}

  <!-- Body: Pure 4-Row Control Card -->
  <div class="flex-1 overflow-y-auto px-6 py-6 space-y-6">

    <!-- Row 1: Response Style -->
    <div class="space-y-2.5">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-neutral-200">Response Style</span>
        <span class="text-[11px] text-neutral-500 capitalize">{responseStyle}</span>
      </div>
      <div class="grid grid-cols-3 gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-2xl">
        <button
          onclick={() => setStyle("precise")}
          class="py-2 rounded-xl text-xs font-medium transition-all cursor-pointer {responseStyle === 'precise' ? 'bg-white text-black shadow-sm font-semibold' : 'text-neutral-400 hover:text-white'}"
        >
          Precise
        </button>
        <button
          onclick={() => setStyle("balanced")}
          class="py-2 rounded-xl text-xs font-medium transition-all cursor-pointer {responseStyle === 'balanced' ? 'bg-white text-black shadow-sm font-semibold' : 'text-neutral-400 hover:text-white'}"
        >
          Balanced
        </button>
        <button
          onclick={() => setStyle("creative")}
          class="py-2 rounded-xl text-xs font-medium transition-all cursor-pointer {responseStyle === 'creative' ? 'bg-white text-black shadow-sm font-semibold' : 'text-neutral-400 hover:text-white'}"
        >
          Creative
        </button>
      </div>
    </div>

    <!-- Row 2: Text Size -->
    <div class="space-y-2.5">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-neutral-200">Text Size</span>
        <span class="text-[11px] text-neutral-500 uppercase">{fontSize}</span>
      </div>
      <div class="grid grid-cols-3 gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-2xl">
        <button
          onclick={() => setSize("sm")}
          class="py-2 rounded-xl text-xs font-medium transition-all cursor-pointer {fontSize === 'sm' ? 'bg-white text-black shadow-sm font-semibold' : 'text-neutral-400 hover:text-white'}"
        >
          Small
        </button>
        <button
          onclick={() => setSize("md")}
          class="py-2 rounded-xl text-xs font-medium transition-all cursor-pointer {fontSize === 'md' ? 'bg-white text-black shadow-sm font-semibold' : 'text-neutral-400 hover:text-white'}"
        >
          Medium
        </button>
        <button
          onclick={() => setSize("lg")}
          class="py-2 rounded-xl text-xs font-medium transition-all cursor-pointer {fontSize === 'lg' ? 'bg-white text-black shadow-sm font-semibold' : 'text-neutral-400 hover:text-white'}"
        >
          Large
        </button>
      </div>
    </div>

    <!-- Row 3: Local Storage & Reclaim -->
    <div class="space-y-2.5 pt-2 border-t border-white/[0.08]">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-neutral-200">Local Model Storage</span>
        <span class="text-xs font-medium text-white">{storageStats?.models_formatted || "0 MB"} Used</span>
      </div>
      
      {#if storageStats?.free_formatted}
        <div class="flex items-center justify-between text-[11px] text-neutral-500">
          <span>Available on Disk</span>
          <span>{storageStats.free_formatted}</span>
        </div>
      {/if}

      <button
        onclick={handlePurgeStorage}
        disabled={isPurging}
        class="w-full py-2.5 px-4 rounded-2xl text-xs font-medium transition-all border cursor-pointer flex items-center justify-center gap-2 {confirmPurge
          ? 'bg-rose-500 text-white border-rose-500 font-semibold animate-pulse'
          : 'bg-white/[0.03] border-white/15 text-neutral-300 hover:bg-white hover:text-black hover:border-white'}"
      >
        {#if isPurging}
          <span>Reclaiming disk space…</span>
        {:else if confirmPurge}
          <span>Click again to delete models & free space</span>
        {:else}
          <span>Reclaim Storage Space</span>
        {/if}
      </button>
    </div>

    <!-- Row 4: Clear Conversation -->
    <div class="space-y-2.5 pt-2 border-t border-white/[0.08]">
      <span class="text-xs font-medium text-neutral-200 block">Conversation History</span>
      <button
        onclick={handleClearChat}
        class="w-full py-2.5 px-4 rounded-2xl text-xs font-medium transition-all border cursor-pointer {confirmClearChat
          ? 'bg-white text-black border-white font-semibold shadow-md'
          : 'bg-white/[0.03] border-white/15 text-neutral-300 hover:bg-white hover:text-black hover:border-white'}"
      >
        {confirmClearChat ? "Click again to confirm reset" : "Clear Conversation History"}
      </button>
    </div>

  </div>

  <!-- Minimal Executive Footer -->
  <div class="px-6 py-4 border-t border-white/[0.08] bg-[#040608] flex items-center justify-between text-[11px] text-neutral-400 flex-shrink-0">
    <div class="flex items-center gap-2">
      <span class="font-medium text-white">Vigyan Pro</span>
      <span class="bg-white/10 px-2 py-0.5 rounded-full text-[10px] text-white">v5.0.7</span>
    </div>
    <span>100% Offline • Zero Cloud Egress</span>
  </div>
</aside>
