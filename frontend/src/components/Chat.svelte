<script lang="ts">
  // Chat.svelte — Sovereign Centered Reading Workspace with Floating Bottom Input
  // Obsidian Titanium monochrome styling for focused scientific derivation.
  import { onMount } from "svelte";
  import { streamChat, DEFAULT_MODEL } from "../lib/ollama";
  import { chatStore } from "../lib/chatStore.svelte";
  import ThinkingBlock from "./ThinkingBlock.svelte";
  import MessageBubble from "./MessageBubble.svelte";

  interface Props {
    model: string;
    fontSize?: "sm" | "md" | "lg";
  }
  let { model, fontSize = "md" }: Props = $props();

  let input = $state("");
  let isStreaming = $state(false);
  let abortController: AbortController | null = null;
  let scrollEl: HTMLElement | null = null;
  let textareaEl: HTMLTextAreaElement | null = $state(null);

  onMount(() => {
    scrollToBottom();
  });

  function autoResize() {
    if (!textareaEl) return;
    textareaEl.style.height = "auto";
    textareaEl.style.height = Math.min(textareaEl.scrollHeight, 140) + "px";
  }

  const STARTERS = [
    { badge: "RLC", label: "Transient Analysis", prompt: "Derive the step response and damping ratio of an underdamped series RLC circuit with R=20 Ohm, L=0.1 H, and C=100 uF." },
    { badge: "CAS", label: "Symbolic Calculus", prompt: "Evaluate the analytical integral of x^2 * exp(-x) dx from 0 to infinity using step-by-step SymPy derivation." },
    { badge: "QM", label: "Quantum Tunneling", prompt: "Derive the transmission coefficient T for quantum tunneling through a rectangular finite potential barrier of width a and height V0." },
    { badge: "ODE", label: "Harmonic Oscillation", prompt: "Solve the second-order differential equation m*x''(t) + c*x'(t) + k*x(t) = 0 for initial conditions x(0)=x0, x'(0)=0." },
  ];

  const fontClass: Record<"sm" | "md" | "lg", string> = {
    sm: "text-[13px]",
    md: "text-[15px]",
    lg: "text-[16px]",
  };

  function uid() {
    return Math.random().toString(36).slice(2, 10);
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
    });
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    input = "";
    if (textareaEl) {
      textareaEl.style.height = "auto";
    }

    isStreaming = true;

    chatStore.messages.push({
      id: uid(),
      role: "user",
      content: trimmed,
      thinking: "",
      thinkingDone: false,
      streaming: false,
    });
    chatStore.save();

    const assistantId = uid();
    chatStore.messages.push({
      id: assistantId,
      role: "assistant",
      content: "",
      thinking: "",
      thinkingDone: false,
      streaming: true,
      toolResults: [],
    });

    scrollToBottom();

    const history = chatStore.messages
      .filter((m) => m.role === "user" || (m.role === "assistant" && m.content))
      .slice(0, -1)
      .map((m) => ({ role: m.role, content: m.content }));

    abortController = new AbortController();

    await streamChat(
      [...history, { role: "user", content: trimmed }],
      model || DEFAULT_MODEL,
      (chunk) => {
        const idx = chatStore.messages.findIndex((m) => m.id === assistantId);
        if (idx === -1) return;

        if (chunk.type === "thinking") {
          chatStore.messages[idx].thinking += chunk.text;
          scrollToBottom();
        } else if (chunk.type === "sympy") {
          chatStore.messages[idx].sympyGrounding = chunk.text;
          if (!chatStore.messages[idx].thinking.includes("Symbolically Verified")) {
            chatStore.messages[idx].thinking = `[Symbolically Verified]: ${chunk.text}\n` + chatStore.messages[idx].thinking;
          }
          scrollToBottom();
        } else if (chunk.toolData) {
          if (!chatStore.messages[idx].toolResults) {
            chatStore.messages[idx].toolResults = [];
          }
          chatStore.messages[idx].toolResults!.push(chunk.toolData);
          scrollToBottom();
        } else if (chunk.type === "answer") {
          if (!chatStore.messages[idx].thinkingDone) chatStore.messages[idx].thinkingDone = true;
          chatStore.messages[idx].content += chunk.text;
          scrollToBottom();
        } else if (chunk.type === "done" || chunk.type === "error") {
          chatStore.messages[idx].thinkingDone = true;
          chatStore.messages[idx].streaming = false;
          if (chunk.type === "error") {
            chatStore.messages[idx].content = chunk.text;
          }
          chatStore.save();
          isStreaming = false;
        }
      },
      abortController.signal,
    );

    isStreaming = false;
    chatStore.save();
    try {
      const budget = parseInt(localStorage.getItem("vigyan_context_budget") || "2048", 10);
      chatStore.autoCompressIfNeeded(budget);
    } catch {}
    scrollToBottom();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && (!e.shiftKey || e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      send(input);
    }
  }

  function stop() {
    abortController?.abort();
    isStreaming = false;
    const last = chatStore.messages.at(-1);
    if (last && last.role === "assistant") {
      last.streaming = false;
      last.thinkingDone = true;
      if (!last.content) last.content = "Generation halted.";
      chatStore.save();
    }
  }
</script>

<div class="flex flex-col h-full bg-[#000000] text-[#f3f4f6] {fontClass[fontSize]} relative">

  <!-- Centered Message Canvas (768px reading container) -->
  <div
    bind:this={scrollEl}
    class="flex-1 overflow-y-auto overscroll-contain px-4 py-6 scroll-smooth"
    style="scrollbar-width: none;"
  >
    <div class="max-w-[768px] mx-auto w-full flex flex-col gap-4">

      {#if chatStore.messages.length === 0}
        <!-- Welcome Hero -->
        <div class="flex flex-col items-center justify-center min-h-[52vh] text-center gap-6 animate-fade-in select-none">
          <div class="flex flex-col items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-[#ffffff]" viewBox="0 0 100 100" fill="currentColor">
                <polygon points="50,90 20,20 38,20 50,65 62,20 80,20" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-white tracking-tight">Vigyan Pro</h1>
            <p class="text-[#9ca3af] text-[14px] max-w-md leading-relaxed">
              Sovereign scientific intelligence. Exact mathematical derivations, offline document analysis, and zero cloud footprint.
            </p>
          </div>

          <!-- Starter Chips -->
          <div class="flex flex-wrap justify-center gap-2.5 mt-1">
            {#each STARTERS as s}
              <button
                onclick={() => send(s.prompt)}
                class="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#08090d] border border-white/10 text-xs text-[#9ca3af] hover:text-white hover:border-white/25 transition-all shadow-sm cursor-pointer"
              >
                <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.08] text-[#10b981] font-semibold">{s.badge}</span>
                <span>{s.label}</span>
              </button>
            {/each}
          </div>
        </div>
      {:else}
        <!-- Message Thread -->
        {#each chatStore.messages as msg, i (msg.id)}
          {#if msg.role === "user"}
            <MessageBubble
              id={msg.id}
              role="user"
              content={msg.content}
              attachment={msg.attachment}
              canTrimPrior={i > 0}
              onDelete={(id) => chatStore.deleteMessage(id)}
              onTrimPrior={(id) => chatStore.trimHistoryBefore(id)}
            />
          {:else}
            <div class="flex flex-col gap-2">
              {#if msg.thinking || (msg.streaming && !msg.thinkingDone)}
                <ThinkingBlock
                  text={msg.thinking}
                  streaming={msg.streaming && !msg.thinkingDone}
                  done={msg.thinkingDone}
                  sympyGrounding={msg.sympyGrounding}
                />
              {/if}
              {#if msg.content || (msg.toolResults && msg.toolResults.length > 0) || (msg.thinkingDone && msg.streaming) || msg.digest}
                <MessageBubble
                  id={msg.id}
                  role="assistant"
                  content={msg.content}
                  streaming={msg.streaming}
                  toolResults={msg.toolResults}
                  sympyGrounding={msg.sympyGrounding}
                  digest={msg.digest}
                  canTrimPrior={i > 0}
                  onDelete={(id) => chatStore.deleteMessage(id)}
                  onTrimPrior={(id) => chatStore.trimHistoryBefore(id)}
                />
              {/if}
            </div>
          {/if}
        {/each}
      {/if}

    </div>
  </div>

  <!-- Floating Bottom Input Dock -->
  <div
    class="px-4 pb-4 pt-1 flex-shrink-0 z-20 relative"
    role="region"
    aria-label="Chat input dock"
  >
    <div class="max-w-[720px] mx-auto w-full flex flex-col items-center">
      <div class="w-full flex items-center gap-3 bg-[#06080e]/90 backdrop-blur-2xl border border-white/[0.08] rounded-2xl px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.85)] focus-within:border-[#38bdf8]/40 transition-all">
        <textarea
          bind:this={textareaEl}
          bind:value={input}
          oninput={autoResize}
          onkeydown={handleKeydown}
          placeholder="Ask a scientific question, derive a proof, analyze a circuit…"
          rows={1}
          disabled={isStreaming}
          class="flex-1 bg-transparent text-[#ffffff] placeholder-[#6b7280] outline-none resize-none leading-relaxed disabled:opacity-50 max-h-36 overflow-y-auto text-[14px]"
          style="scrollbar-width: none;"
        ></textarea>

        {#if isStreaming}
          <button
            onclick={stop}
            class="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/20 text-[#e2e8f0] hover:bg-white/20 flex items-center justify-center transition-all cursor-pointer"
            title="Halt generation (Escape)"
          >
            <span class="w-2.5 h-2.5 bg-white rounded-sm block"></span>
          </button>
        {:else}
          <button
            onclick={() => send(input)}
            disabled={!input.trim()}
            class="flex-shrink-0 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-30 hover:opacity-90 transition-all shadow-md font-bold cursor-pointer"
            title="Send (Enter)"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 translate-y-[-0.5px]">
              <path fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clip-rule="evenodd"/>
            </svg>
          </button>
        {/if}
      </div>

      <p class="text-[10px] font-mono text-[#6b7280] text-center mt-2 tracking-wide select-none">
        100% Offline &amp; Private · Verified Symbolic Mathematics · On-Device Intelligence
      </p>
    </div>
  </div>

</div>
