<script lang="ts">
  import { onMount } from "svelte";
  import { getAgentHost, getVigyanToken } from "../lib/ollama";

  interface Props {
    open: boolean;
    onClose: () => void;
  }

  let { open, onClose }: Props = $props();

  interface LedgerRule {
    id: string;
    timestamp: string;
    category: string;
    rule: string;
    status: string;
  }

  interface BudgetTelemetry {
    active_rules_count: number;
    lines_used: number;
    max_budget_lines: number;
    budget_used_pct: number;
    budget_remaining_lines: number;
  }

  let rules = $state<LedgerRule[]>([]);
  let telemetry = $state<BudgetTelemetry>({
    active_rules_count: 0,
    lines_used: 0,
    max_budget_lines: 150,
    budget_used_pct: 0,
    budget_remaining_lines: 150
  });

  let inputRule = $state("");
  let isLoading = $state(false);

  async function fetchLedger() {
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = {};
      if (token) headers["X-Vigyan-Token"] = token;

      const res = await fetch(`${host}/api/ledger/list`, { headers });
      if (res.ok) {
        const data = await res.json();
        rules = data.rules || [];
        if (data.telemetry) {
          telemetry = data.telemetry;
        }
      }
    } catch (err) {
      console.error("Ledger fetch error:", err);
    }
  }

  async function handleAddRule(e?: KeyboardEvent) {
    if (e && e.key !== "Enter") return;
    const text = inputRule.trim();
    if (!text || isLoading) return;

    isLoading = true;
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Vigyan-Token"] = token;

      const res = await fetch(`${host}/api/ledger/learn`, {
        method: "POST",
        headers,
        body: JSON.stringify({ rule: text })
      });

      if (res.ok) {
        inputRule = "";
        await fetchLedger();
      }
    } catch (err) {
      console.error("Add rule error:", err);
    } finally {
      isLoading = false;
    }
  }

  async function handleUndoRule(id: string) {
    if (isLoading) return;
    isLoading = true;
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Vigyan-Token"] = token;

      const res = await fetch(`${host}/api/ledger/undo`, {
        method: "POST",
        headers,
        body: JSON.stringify({ id })
      });

      if (res.ok) {
        await fetchLedger();
      }
    } catch (err) {
      console.error("Undo rule error:", err);
    } finally {
      isLoading = false;
    }
  }

  $effect(() => {
    if (open) {
      fetchLedger();
    }
  });

  onMount(() => {
    fetchLedger();
  });
</script>

<!-- Backdrop -->
{#if open}
  <button
    type="button"
    class="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm border-0 cursor-default"
    onclick={onClose}
    aria-label="Close ledger"
  ></button>
{/if}

<!-- Minimalist Drawer -->
<aside
  class="fixed top-0 right-0 h-full w-84 z-50 flex flex-col bg-[#050608] border-l border-white/[0.08] shadow-2xl transition-transform duration-200 {open
    ? 'translate-x-0'
    : 'translate-x-full'}"
>
  <!-- Minimal Header -->
  <div class="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-[#08090c]">
    <div class="flex items-center gap-2">
      <span class="text-xs font-mono font-medium tracking-wide text-white uppercase">Ledger</span>
      <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/10 text-neutral-400">
        {telemetry.lines_used}/{telemetry.max_budget_lines} lines
      </span>
    </div>
    <button
      onclick={onClose}
      class="text-neutral-500 hover:text-white transition-colors text-sm cursor-pointer p-1"
      aria-label="Close"
    >&times;</button>
  </div>

  <!-- Main Feed -->
  <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
    <!-- Single-Line Quick Add Input -->
    <div class="relative">
      <input
        type="text"
        bind:value={inputRule}
        onkeydown={handleAddRule}
        placeholder="Add rule and press Enter..."
        disabled={isLoading}
        class="w-full bg-[#0c0e12] border border-white/10 focus:border-white/30 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors font-mono disabled:opacity-50"
      />
      {#if inputRule.trim()}
        <button
          onclick={() => handleAddRule()}
          class="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/70 hover:text-white px-1.5 py-0.5 rounded bg-white/10 cursor-pointer"
        >
          Add
        </button>
      {/if}
    </div>

    <!-- Active Rules Feed -->
    {#if rules.length === 0}
      <div class="py-12 text-center text-[11px] font-mono text-neutral-600 select-none">
        No active rules.
      </div>
    {:else}
      <div class="flex flex-col gap-2">
        {#each rules as r (r.id)}
          <div class="group bg-[#0a0c10] border border-white/[0.06] hover:border-white/15 rounded-lg p-2.5 transition-all flex items-start justify-between gap-2">
            <div class="flex flex-col gap-1 min-w-0 flex-1">
              <div class="flex items-center gap-1.5">
                <span class="text-[9px] font-mono font-semibold text-neutral-400 uppercase">
                  {r.category || "RULE"}
                </span>
                <span class="text-[9px] font-mono text-neutral-600">{r.id}</span>
              </div>
              <p class="text-[11px] font-mono text-neutral-200 leading-normal break-words select-text">
                {r.rule}
              </p>
            </div>
            <button
              onclick={() => handleUndoRule(r.id)}
              title="Undo rule"
              class="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-rose-400 text-xs px-1 py-0.5 cursor-pointer"
              aria-label="Undo rule"
            >
              &times;
            </button>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Minimal Footer -->
  <div class="px-4 py-2.5 border-t border-white/[0.05] text-[10px] font-mono text-neutral-600 flex items-center justify-between">
    <span>.agents/ledger.jsonl</span>
    <span>150-line ceiling</span>
  </div>
</aside>
