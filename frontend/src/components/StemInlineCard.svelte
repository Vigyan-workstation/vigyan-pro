<script lang="ts">
  import MathCard from "./MathCard.svelte";

  interface Props {
    tool: any;
  }
  let { tool }: Props = $props();

  const isMath = $derived(
    tool.tool === "sympy_eval" ||
    (tool.result !== undefined && (tool.latex || tool.numeric_approx || tool.expression))
  );
</script>

{#if isMath}
  <MathCard {tool} />
{:else}
  <div class="my-3 select-none rounded-xl bg-[#06080d] border border-white/[0.08] p-3 text-xs font-mono text-[#9ca3af]">
    <pre class="overflow-x-auto select-text">{JSON.stringify(tool, null, 2)}</pre>
  </div>
{/if}
