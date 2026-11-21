<script lang="ts">
  // ReceiptBadge.svelte — inline CAS verification state for assistant messages.
  // "verified" is ONLY set by an actual signed receipt_ready event from the backend.
  import type { ReceiptStatus } from "../lib/chatStore.svelte";

  interface Props {
    status: ReceiptStatus;
    onClick?: () => void;
  }
  let { status, onClick }: Props = $props();

  const config = {
    verified: { label: "CAS Verified", mark: "✓", cls: "text-[var(--ok)] bg-[var(--ok)]/10 border-[var(--ok)]/20", dot: "bg-[var(--ok)]" },
    unverified: { label: "Unverified — LLM heuristic", mark: "⚠", cls: "text-[var(--warn)] bg-[var(--warn)]/10 border-[var(--warn)]/20", dot: "bg-[var(--warn)]" },
    unable_to_check: { label: "Unable to Check", mark: "✗", cls: "text-[var(--text-3)] bg-white/[0.03] border-white/[0.08]", dot: "bg-[var(--text-3)]" },
  } as const;
</script>

{#if status === "verified"}
  <button
    type="button"
    onclick={() => onClick?.()}
    title="Open the signed derivation receipt in the Receipt Inspector"
    class="inline-flex items-center gap-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded border {config[status].cls} cursor-pointer hover:brightness-125 transition-all receipt-pulse"
  >
    <span class="w-1 h-1 rounded-full {config[status].dot}"></span>
    {config[status].mark} {config[status].label}
  </button>
{:else}
  <span
    role="status"
    class="inline-flex items-center gap-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded border {config[status].cls}"
  >
    <span class="w-1 h-1 rounded-full {config[status].dot}"></span>
    {config[status].mark} {config[status].label}
  </span>
{/if}

<style>
  .receipt-pulse {
    animation: pulseRing 900ms ease-out 1;
  }
</style>
