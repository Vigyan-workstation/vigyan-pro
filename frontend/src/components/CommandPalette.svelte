<script lang="ts">
  // CommandPalette.svelte — ⌘K / Ctrl+K command modal overlay.
  interface Command {
    label: string;
    shortcut?: string;
    action: () => void;
  }

  interface Props {
    open: boolean;
    onClose: () => void;
    commands: Command[];
  }
  let { open, onClose, commands }: Props = $props();

  let query = $state("");
  let selected = $state(0);
  let inputEl: HTMLInputElement | null = $state(null);
  let listEl: HTMLUListElement | null = $state(null);

  const filtered = $derived(
    commands.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()))
  );

  $effect(() => {
    if (open) {
      query = "";
      selected = 0;
      requestAnimationFrame(() => inputEl?.focus());
    }
  });

  function move(delta: number) {
    const n = filtered.length;
    if (n === 0) return;
    selected = (selected + delta + n) % n;
    requestAnimationFrame(() => {
      const row = listEl?.children[selected] as HTMLElement | undefined;
      row?.scrollIntoView({ block: "nearest" });
    });
  }

  function execute(cmd?: Command) {
    if (!cmd) return;
    onClose();
    cmd.action();
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      move(-1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      execute(filtered[selected]);
    }
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm command-backdrop"
    onclick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}
  >
    <div
      class="w-[480px] max-w-[92vw] rounded-xl border border-white/[0.1] bg-[var(--surface)] shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden animate-fade-up"
      role="dialog"
      aria-label="Command palette"
    >
      <input
        bind:this={inputEl}
        bind:value={query}
        onkeydown={onKeydown}
        placeholder="Type a command…"
        class="w-full bg-transparent px-4 py-3.5 text-[14px] text-[var(--text)] placeholder-[var(--text-3)] outline-none border-b border-[var(--line)]"
        aria-label="Search commands"
      />
      <ul bind:this={listEl} class="max-h-[46vh] overflow-y-auto py-1.5 m-0 p-0 list-none">
        {#if filtered.length === 0}
          <li class="px-4 py-3 text-[12px] text-[var(--text-3)]">No matching commands</li>
        {/if}
        {#each filtered as cmd, i (cmd.label)}
          <li
            class="flex items-center justify-between px-4 py-2 text-[13px] cursor-pointer {i === selected
              ? 'bg-[var(--accent)]/15 text-[var(--text)]'
              : 'text-[var(--text-2)] hover:bg-white/[0.04]'}"
            role="option"
            aria-selected={i === selected}
            onclick={() => execute(cmd)}
            onpointerenter={() => (selected = i)}
          >
            <span class="truncate">{cmd.label}</span>
            {#if cmd.shortcut}
              <span class="text-[10px] font-mono text-[var(--text-3)] border border-white/[0.08] rounded px-1.5 py-0.5 flex-shrink-0">
                {cmd.shortcut}
              </span>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </div>
{/if}

<style>
  .command-backdrop {
    z-index: 9999;
  }
</style>
