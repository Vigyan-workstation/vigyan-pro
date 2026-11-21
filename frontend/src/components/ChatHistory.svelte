<script lang="ts">
  // ChatHistory.svelte — 220px Session_Rail (left column of the 3-column grid).
  // Lists past sessions grouped by recency; click to restore, ✕ to delete.
  import { sessionStore, type ChatSession } from "../lib/sessionStore.svelte";

  interface Props {
    activeSessionId: string;
    onSelectSession: (id: string) => void;
    onNewChat: () => void;
  }
  let { activeSessionId, onSelectSession, onNewChat }: Props = $props();

  const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform || "");

  function relTime(ts: number): string {
    const d = Date.now() - ts;
    const min = Math.floor(d / 60000);
    if (min < 1) return "now";
    if (min < 60) return `${min}m`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h`;
    return `${Math.floor(hr / 24)}d`;
  }

  // Recency buckets: Today / Yesterday / Earlier
  const groups = $derived.by(() => {
    const sorted = [...sessionStore.sessions].sort((a, b) => b.lastActivity - a.lastActivity);
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const dayMs = 86_400_000;
    const yStart = startOfDay.getTime() - dayMs;
    const buckets: Record<string, ChatSession[]> = { Today: [], Yesterday: [], Earlier: [] };
    for (const s of sorted) {
      if (s.lastActivity >= startOfDay.getTime()) buckets.Today.push(s);
      else if (s.lastActivity >= yStart) buckets.Yesterday.push(s);
      else buckets.Earlier.push(s);
    }
    return Object.entries(buckets).filter(([, list]) => list.length > 0);
  });

  function handleDelete(e: MouseEvent, id: string) {
    e.stopPropagation();
    sessionStore.deleteSession(id);
  }
</script>

<aside
  class="h-full flex flex-col bg-[var(--surface)] border-r border-[var(--line)] select-none"
  aria-label="Chat history"
>
  <div class="p-2.5 flex-shrink-0">
    <button
      type="button"
      onclick={onNewChat}
      class="w-full flex items-center justify-center gap-2 py-1.5 rounded-[var(--r)] bg-white/[0.06] hover:bg-white/[0.12] text-[12px] font-medium text-[var(--text)] transition-all cursor-pointer border border-white/[0.08]"
      title="Start a new chat ({isMac ? '⌘' : 'Ctrl+'}N)"
    >
      <span class="text-[var(--accent)] leading-none">+</span>
      New Chat
      <span class="text-[9px] font-mono text-[var(--text-3)] border border-white/[0.08] rounded px-1">
        {isMac ? "⌘N" : "Ctrl+N"}
      </span>
    </button>
  </div>

  <div class="flex-1 overflow-y-auto px-2.5 pb-3">
    {#if groups.length === 0}
      <p class="text-[11px] text-[var(--text-3)] leading-relaxed px-1 pt-2">
        No past sessions yet. Conversations are saved here as you work.
      </p>
    {/if}

    {#each groups as [label, list]}
      <div class="mb-3">
        <div class="text-[9px] font-mono uppercase tracking-[0.12em] text-[var(--text-3)] px-1 py-1">{label}</div>
        {#each list as s (s.id)}
          <div
            role="button"
            tabindex="0"
            class="group flex items-center gap-1.5 px-2 py-1.5 rounded-[var(--r)] cursor-pointer transition-colors duration-[130ms] {s.id === activeSessionId
              ? 'bg-white/[0.08] text-white'
              : 'text-[var(--text-2)] hover:bg-white/[0.04] hover:text-[var(--text)]'}"
            onclick={() => onSelectSession(s.id)}
            onkeydown={(e) => (e.key === "Enter" || e.key === " ") && onSelectSession(s.id)}
            title={s.title}
          >
            <span class="min-w-0 flex-1 text-[12px] truncate">{s.title}</span>
            <span class="text-[9px] font-mono text-[var(--text-3)] flex-shrink-0 group-hover:hidden">{relTime(s.lastActivity)}</span>
            <button
              type="button"
              tabindex="-1"
              class="hidden group-hover:flex w-4 h-4 items-center justify-center rounded text-[var(--text-3)] hover:text-[var(--err)] hover:bg-white/[0.08] flex-shrink-0 cursor-pointer"
              onclick={(e) => handleDelete(e, s.id)}
              title="Delete session"
              aria-label="Delete session {s.title}"
            >
              ✕
            </button>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</aside>
