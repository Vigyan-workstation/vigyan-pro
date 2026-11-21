<script lang="ts">
  // ReceiptInspector.svelte — 264px Receipt_Inspector (right column).
  // Shows the signed derivation receipt for the active message; re-runs
  // verification against the real POST /api/receipt/verify backend endpoint.
  import { getAgentHost, getVigyanToken } from "../lib/ollama";
  import type { ReceiptMeta } from "../lib/chatStore.svelte";

  interface Props {
    receipt: ReceiptMeta | null;
    onClose: () => void;
  }
  let { receipt, onClose }: Props = $props();

  let verifying = $state(false);
  let verifyResult = $state<{ valid: boolean; reason: string } | null>(null);

  async function rerunVerification() {
    if (!receipt?.filePath || verifying) return;
    verifying = true;
    verifyResult = null;
    try {
      const host = getAgentHost();
      const token = getVigyanToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["X-Vigyan-Token"] = token;
      const res = await fetch(`${host}/api/receipt/verify`, {
        method: "POST",
        headers,
        body: JSON.stringify({ file_path: receipt.filePath }),
        signal: AbortSignal.timeout(10_000),
      });
      const data = await res.json();
      verifyResult = { valid: !!data.valid, reason: data.reason || (data.valid ? "verified" : "unverifiable") };
    } catch (e: any) {
      const timedOut = e?.name === "TimeoutError" || e?.name === "AbortError";
      verifyResult = { valid: false, reason: timedOut ? "Verification timed out" : String(e?.message || e) };
    } finally {
      verifying = false;
    }
  }

  async function copyLatex() {
    if (!receipt?.exactAnalytical) return;
    try {
      navigator.clipboard.writeText(receipt.exactAnalytical);
    } catch {}
  }

  function downloadReceipt() {
    if (!receipt?.filePath) return;
    try {
      const a = document.createElement("a");
      a.href = `${getAgentHost()}/api/receipt/download?file_path=${encodeURIComponent(receipt.filePath)}&token=${encodeURIComponent(getVigyanToken())}`;
      a.download = receipt.filePath.split("/").pop() || "receipt.rcpt.json";
      a.click();
    } catch {}
  }

  let exportingPdf = $state(false);
  let pdfError = $state<string | null>(null);

  async function exportPdf() {
    if (!receipt?.filePath || exportingPdf) return;
    exportingPdf = true;
    pdfError = null;
    try {
      const host = getAgentHost();
      const headers: Record<string, string> = {};
      const token = getVigyanToken();
      if (token) headers["X-Vigyan-Token"] = token;
      const res = await fetch(
        `${host}/api/receipt/export-pdf?file_path=${encodeURIComponent(receipt.filePath)}`,
        { headers, signal: AbortSignal.timeout(10_000) }
      );
      if (!res.ok) throw new Error(res.status === 403 ? "receipt not accessible" : `HTTP ${res.status}`);
      const blob = await res.blob();
      const dispo = res.headers.get("Content-Disposition") || "";
      const name = dispo.match(/filename="([^"]+)"/)?.[1] || "receipt.pdf";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      const timedOut = e?.name === "TimeoutError" || e?.name === "AbortError";
      pdfError = timedOut ? "Export timed out" : String(e?.message || e);
    } finally {
      exportingPdf = false;
    }
  }

  function truncatedHash(hash?: string): string {
    if (!hash) return "—";
    return hash.length > 24 ? hash.slice(0, 24) + "…" : hash;
  }
</script>

<aside class="h-full flex flex-col bg-[var(--surface)] border-l border-[var(--line)] select-none" aria-label="Receipt Inspector">
  <div class="h-11 flex items-center justify-between px-3 border-b border-[var(--line)] flex-shrink-0">
    <span class="text-[11px] font-mono uppercase tracking-[0.12em] text-[var(--text-2)]">Receipt Inspector</span>
    <button
      type="button"
      onclick={onClose}
      class="w-6 h-6 flex items-center justify-center rounded-[var(--r)] text-[var(--text-3)] hover:text-[var(--text)] hover:bg-white/[0.06] transition-all cursor-pointer"
      aria-label="Close receipt inspector"
    >
      ✕
    </button>
  </div>

  {#if !receipt}
    <div class="flex-1 flex items-center justify-center px-6">
      <p class="text-[11px] text-[var(--text-3)] text-center leading-relaxed">
        No receipt active. When a symbolic result is CAS-verified, its signed derivation receipt appears here — click the
        <span class="text-[var(--ok)] font-mono">✓ CAS Verified</span> badge on a reply.
      </p>
    </div>
  {:else}
    <div class="flex-1 overflow-y-auto p-3 space-y-3">
      <dl class="grid grid-cols-[74px_1fr] gap-x-2.5 gap-y-2.5 text-[11px]">
        <dt class="text-[var(--text-3)] font-mono pt-0.5">Expression</dt>
        <dd class="text-[var(--text)] font-mono bg-white/[0.04] border border-white/[0.06] rounded-[var(--r)] px-2 py-1.5 break-all select-text">
          {receipt.exactAnalytical || "—"}
        </dd>

        <dt class="text-[var(--text-3)] font-mono pt-0.5">SymPy</dt>
        <dd class="text-[var(--text)] font-mono py-0.5 select-text">{receipt.sympyVersion || "—"}</dd>

        <dt class="text-[var(--text-3)] font-mono pt-0.5">Residual</dt>
        <dd class="text-[var(--ok)] font-mono py-0.5 select-text">{receipt.residual || "0.000e+00"}</dd>

        <dt class="text-[var(--text-3)] font-mono pt-0.5">Model</dt>
        <dd class="text-[var(--text)] font-mono py-0.5 truncate" title={receipt.modelName}>{receipt.modelName || "—"}</dd>

        <dt class="text-[var(--text-3)] font-mono pt-0.5">Signed</dt>
        <dd class="text-[var(--text)] font-mono py-0.5 select-text">
          {receipt.timestamp ? new Date(receipt.timestamp).toLocaleString() : "—"}
        </dd>

        <dt class="text-[var(--text-3)] font-mono pt-0.5">Hash</dt>
        <dd class="text-[var(--text-2)] font-mono py-0.5 break-all select-text" title={receipt.hash}>
          {truncatedHash(receipt.hash)}
        </dd>
      </dl>

      {#if verifyResult}
        <div
          class="text-[11px] font-mono px-2.5 py-2 rounded-[var(--r)] border {verifyResult.valid
            ? 'text-[var(--ok)] border-[var(--ok)]/30 bg-[var(--ok)]/10'
            : 'text-[var(--err)] border-[var(--err)]/30 bg-[var(--err)]/10'}"
          role="status"
        >
          {verifyResult.valid ? "✓ Re-verified" : "✗ Verification failed"}: {verifyResult.reason}
        </div>
      {/if}
    </div>

    <div class="p-2.5 border-t border-[var(--line)] space-y-2 flex-shrink-0">
      <button
        type="button"
        onclick={rerunVerification}
        disabled={verifying || !receipt.filePath}
        class="w-full py-1.5 rounded-[var(--r)] text-[11px] font-medium bg-white/[0.08] hover:bg-white/[0.14] text-[var(--text)] border border-white/[0.08] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {#if verifying}
          <span class="w-3 h-3 border-2 border-[var(--text-3)] border-t-transparent rounded-full animate-spin"></span>
          Verifying…
        {:else}
          Re-run Verification
        {/if}
      </button>
      <div class="flex gap-2">
        <button
          type="button"
          onclick={copyLatex}
          class="flex-1 py-1.5 rounded-[var(--r)] text-[10px] font-mono bg-white/[0.04] hover:bg-white/[0.1] text-[var(--text-2)] hover:text-[var(--text)] border border-white/[0.06] transition-all cursor-pointer"
        >
          Copy Exact
        </button>
        <button
          type="button"
          onclick={downloadReceipt}
          class="flex-1 py-1.5 rounded-[var(--r)] text-[10px] font-mono bg-white/[0.04] hover:bg-white/[0.1] text-[var(--text-2)] hover:text-[var(--text)] border border-white/[0.06] transition-all cursor-pointer"
        >
          Download .rcpt
        </button>
        <button
          type="button"
          onclick={exportPdf}
          disabled={exportingPdf || !receipt.filePath}
          class="flex-1 py-1.5 rounded-[var(--r)] text-[10px] font-mono bg-white/[0.04] hover:bg-white/[0.1] text-[var(--text-2)] hover:text-[var(--text)] border border-white/[0.06] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          title="Export this receipt as a self-contained PDF (generated locally)"
        >
          {#if exportingPdf}
            <span class="inline-block w-2.5 h-2.5 border-2 border-[var(--text-3)] border-t-transparent rounded-full animate-spin"></span>
          {:else}
            Export PDF
          {/if}
        </button>
      </div>
      {#if pdfError}
        <p class="text-[10px] font-mono text-[var(--err)]" role="alert">PDF export failed: {pdfError}</p>
      {/if}
    </div>
  {/if}
</aside>
