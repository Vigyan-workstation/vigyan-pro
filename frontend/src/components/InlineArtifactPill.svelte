<script lang="ts">
  // InlineArtifactPill.svelte — Sovereign Artifact Reference Card
  // Rendered inline in chat stream. Clicking opens the Sovereign Artifact Canvas.
  import { artifactStore, type Artifact } from "../lib/artifactStore.svelte";

  interface Props {
    artifact: Artifact;
  }
  let { artifact }: Props = $props();

  let isActive = $derived(artifactStore.activeArtifact?.id === artifact.id);
</script>

<div
  class="my-3 p-3 rounded-xl bg-[#05080f] border transition-all duration-200 {isActive
    ? 'border-[#38bdf8]/60 shadow-[0_0_20px_rgba(56,189,248,0.15)] ring-1 ring-[#38bdf8]/30'
    : 'border-white/10 hover:border-white/20 hover:bg-[#070b14]'}"
>
  <div class="flex items-center justify-between gap-3">
    <!-- Left: Artifact Metadata -->
    <div class="flex items-center gap-3 min-w-0">
      <div class="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#38bdf8] flex-shrink-0">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </div>

      <div class="min-w-0">
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-mono font-medium text-[#38bdf8] tracking-wider uppercase">Artifact</span>
          <span class="text-[10px] font-mono text-[#6b7280]">#{artifact.id}</span>
          {#if artifact.verified}
            <span class="inline-flex items-center gap-1 text-[10px] font-mono text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.2 rounded border border-[#10b981]/20">
              <span class="w-1 h-1 rounded-full bg-[#10b981]"></span>
              CAS Verified
            </span>
          {/if}
        </div>
        <h4 class="text-xs font-semibold text-white tracking-tight truncate mt-0.5">{artifact.title}</h4>
      </div>
    </div>

    <!-- Right: Open Canvas Button -->
    <button
      type="button"
      onclick={() => artifactStore.openArtifact(artifact)}
      class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer {isActive
        ? 'bg-[#38bdf8] text-black font-semibold'
        : 'bg-white/[0.06] hover:bg-white/[0.12] text-[#e2e8f0] border border-white/10'}"
    >
      <span>{isActive ? "Viewing Canvas" : "Open Canvas"}</span>
      <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clip-rule="evenodd" />
        <path fill-rule="evenodd" d="M19 10a.75.75 0 00-.75-.75H8.704l2.473-2.47a.75.75 0 10-1.06-1.06l-3.75 3.75a.75.75 0 000 1.06l3.75 3.75a.75.75 0 101.06-1.06L8.704 10.75H18.25A.75.75 0 0019 10z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</div>
