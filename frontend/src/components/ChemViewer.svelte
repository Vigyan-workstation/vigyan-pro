<script lang="ts">
  // ChemViewer.svelte — RDKit 2D Vector Structure Viewport
  // Features: High-clarity 2D SVG vector rendering, Lipinski descriptors grid,
  // SMILES string copy, and SVG asset download.
  interface Props {
    svg?: string;
    smiles?: string;
    descriptors?: Record<string, any>;
  }
  let { svg, smiles = "", descriptors = {} }: Props = $props();

  let copied = $state(false);

  async function copySmiles() {
    try {
      await navigator.clipboard.writeText(smiles);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch (e) {
      console.error("Clipboard copy failed", e);
    }
  }

  function downloadSvg() {
    if (!svg) return;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "molecule.svg";
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="h-full w-full flex flex-col bg-[#02050a] text-[#f3f4f6]">
  <!-- Header -->
  <div class="h-10 px-4 flex items-center justify-between border-b border-white/[0.08] bg-[#040812]/80 backdrop-blur-sm text-xs">
    <div class="flex items-center gap-2 font-mono">
      <span class="text-[#38bdf8] truncate max-w-[280px]">{smiles || "Molecular Structure"}</span>
      <button
        type="button"
        onclick={copySmiles}
        class="text-[10px] text-[#9ca3af] hover:text-white px-1.5 py-0.5 rounded bg-white/[0.05] transition-all cursor-pointer"
        title="Copy SMILES string"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>

    <button
      type="button"
      onclick={downloadSvg}
      class="px-2.5 py-1 rounded bg-[#38bdf8]/15 hover:bg-[#38bdf8]/25 text-[#38bdf8] border border-[#38bdf8]/30 font-medium text-[11px] flex items-center gap-1 transition-all cursor-pointer"
      title="Download vector SVG"
    >
      <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clip-rule="evenodd" />
      </svg>
      Download SVG
    </button>
  </div>

  <!-- SVG Depiction Container -->
  <div class="flex-1 flex items-center justify-center p-6 bg-[#030611] overflow-hidden">
    {#if svg}
      <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-2xl max-w-md w-full flex items-center justify-center [&_svg]:max-w-full [&_svg]:h-auto [&_rect]:fill-transparent">
        {@html svg}
      </div>
    {:else}
      <div class="text-xs text-[#64748b]">No chemical structure SVG available</div>
    {/if}
  </div>

  <!-- Lipinski Descriptors Grid -->
  {#if Object.keys(descriptors).length > 0}
    <div class="p-4 border-t border-white/[0.08] bg-[#02050a] grid grid-cols-3 sm:grid-cols-6 gap-3 text-xs select-none">
      <div class="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
        <div class="text-[10px] text-[#9ca3af]">Formula</div>
        <div class="font-mono font-bold text-white mt-0.5">{descriptors.formula || "N/A"}</div>
      </div>
      <div class="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
        <div class="text-[10px] text-[#9ca3af]">Mol Weight</div>
        <div class="font-mono font-bold text-[#38bdf8] mt-0.5">{descriptors.mw || "N/A"}</div>
      </div>
      <div class="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
        <div class="text-[10px] text-[#9ca3af]">LogP</div>
        <div class="font-mono font-bold text-white mt-0.5">{descriptors.logp ?? "N/A"}</div>
      </div>
      <div class="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
        <div class="text-[10px] text-[#9ca3af]">TPSA</div>
        <div class="font-mono font-bold text-white mt-0.5">{descriptors.tpsa ?? "N/A"} Å²</div>
      </div>
      <div class="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
        <div class="text-[10px] text-[#9ca3af]">H-Donors</div>
        <div class="font-mono font-bold text-[#10b981] mt-0.5">{descriptors.hbd ?? 0}</div>
      </div>
      <div class="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
        <div class="text-[10px] text-[#9ca3af]">H-Acceptors</div>
        <div class="font-mono font-bold text-[#38bdf8] mt-0.5">{descriptors.hba ?? 0}</div>
      </div>
    </div>
  {/if}
</div>
