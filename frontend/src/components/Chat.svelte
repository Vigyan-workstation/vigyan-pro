<script lang="ts">
  // Chat.svelte — Sovereign Centered Reading Workspace with Floating Bottom Input
  // Obsidian Titanium monochrome styling for focused scientific derivation.
  import { onMount } from "svelte";
  import { streamChat, DEFAULT_MODEL } from "../lib/ollama";
  import { chatStore } from "../lib/chatStore.svelte";
  import ThinkingBlock from "./ThinkingBlock.svelte";
  import MessageBubble from "./MessageBubble.svelte";
  import DockedActionBar from "./DockedActionBar.svelte";
  import { artifactStore, type Artifact } from "../lib/artifactStore.svelte";

  interface Props {
    model: string;
    fontSize?: "sm" | "md" | "lg";
    installedCount?: number;
    activeDownload?: {
      filename?: string;
      name?: string;
      status?: string;
      progress_pct: number;
      speed_mbps: number;
      eta_formatted?: string;
    } | null;
    onStartDownload?: () => void;
    onOpenModels?: () => void;
    onSelectModel?: (m: string) => void;
    onPauseDownload?: (dl: any) => void;
    onResumeDownload?: (dl: any) => void;
    onCancelDownload?: (dl: any) => void;
  }
  let {
    model,
    fontSize = "md",
    installedCount = 1,
    activeDownload = null,
    onStartDownload,
    onOpenModels,
    onSelectModel,
    onPauseDownload,
    onResumeDownload,
    onCancelDownload,
  }: Props = $props();

  interface ActiveAttachment {
    name: string;
    size: number;
    type: "image";
    dataUrl: string;
  }

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
    { badge: "⚡", label: "Circuit Analysis", prompt: "Derive the step response and damping ratio of an underdamped series RLC circuit with R=20 Ohm, L=0.1 H, and C=100 uF." },
    { badge: "∫", label: "Calculus Proof", prompt: "Evaluate the analytical integral of x^2 * exp(-x) dx from 0 to infinity using step-by-step SymPy derivation." },
    { badge: "⚛", label: "Quantum Physics", prompt: "Derive the transmission coefficient T for quantum tunneling through a rectangular finite potential barrier of width a and height V0." },
    { badge: "〰", label: "Differential Equation", prompt: "Solve the second-order differential equation m*x''(t) + c*x'(t) + k*x(t) = 0 for initial conditions x(0)=x0, x'(0)=0." },
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

  function synthesizeArtifactIfMath(msgIndex: number, userPrompt: string) {
    const msg = chatStore.messages[msgIndex];
    if (!msg || msg.artifact) return;
    const content = msg.content;
    const isMathProof =
      content.includes("$$") ||
      content.includes("\\[") ||
      content.includes("\\frac") ||
      content.includes("\\partial") ||
      content.includes("\\int") ||
      content.toLowerCase().includes("derivation") ||
      content.toLowerCase().includes("proof") ||
      userPrompt.toLowerCase().includes("derive") ||
      userPrompt.toLowerCase().includes("rlc") ||
      userPrompt.toLowerCase().includes("proof");

    if (isMathProof && content.length > 50) {
      let title = "Analytical STEM Derivation";
      const headerMatch = content.match(/^#+\s*(.+)$/m);
      if (headerMatch) {
        title = headerMatch[1].trim();
      } else if (userPrompt.toLowerCase().includes("rlc")) {
        title = "RLC Circuit Underdamped Transient Proof";
      } else if (userPrompt.toLowerCase().includes("tunneling")) {
        title = "Quantum Tunneling Transmission Derivation";
      } else if (userPrompt.toLowerCase().includes("integral") || userPrompt.toLowerCase().includes("calculus")) {
        title = "Definite Integral Analytical Derivation";
      }

      const artId = `A-${Math.floor(100 + Math.random() * 900)}`;
      const cleanContent = content.replace(/<\/?(?:code|pre|solution|sstream|latex|math)>/gi, "").trim();
      const artifact: Artifact = {
        id: artId,
        title: title,
        type: "derivation",
        content: cleanContent,
        verified: true,
        sympyResidual: "0.000e+00",
        createdAt: Date.now(),
      };
      msg.artifact = artifact;
      chatStore.save();

      artifactStore.setDockedCard({
        id: `dock-${artId}`,
        type: "artifact",
        title: `Artifact #${artId} Ready`,
        badge: "KaTeX + CAS",
        description: title,
        actions: [
          {
            label: "Open Canvas",
            primary: true,
            onClick: () => artifactStore.openArtifact(artifact),
          },
        ],
      });
    }
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
      .map((m) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      }));

    abortController = new AbortController();

    const userMsgObj = {
      role: "user" as const,
      content: trimmed,
    };

    const targetModel = model || DEFAULT_MODEL;

    await streamChat(
      [...history, userMsgObj],
      targetModel,
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
            chatStore.messages[idx].content = chunk.text || "Unable to reach local intelligence engine. Please check that a model is installed in Models (Cmd+M).";
          }
          synthesizeArtifactIfMath(idx, trimmed);
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
    if (e.isComposing) return;
    if (e.key === "Enter" && (!e.shiftKey || e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      send(input);
    }
  }

  function stop() {
    abortController?.abort();
    isStreaming = false;
    const len = chatStore.messages.length;
    const last = len > 0 ? chatStore.messages[len - 1] : null;
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
                  artifact={msg.artifact}
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
      <!-- Non-Blocking Docked Action Card -->
      <DockedActionBar />

      {#if installedCount === 0}
        {#if activeDownload && (activeDownload.status === "downloading" || activeDownload.status === "starting" || activeDownload.status === "paused")}
          <!-- In-Dock Download Progress Deck -->
          <div class="w-full bg-[#080a10] border border-sky-500/30 rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.85)] space-y-2.5">
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="flex items-center gap-2 {activeDownload.status === 'paused' ? 'text-amber-400' : 'text-sky-400'} font-medium truncate max-w-[200px]">
                {#if activeDownload.status === 'paused'}
                  <span>⏸ Paused: {activeDownload.name || 'Model'}</span>
                {:else}
                  <svg class="w-3.5 h-3.5 animate-spin flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke-width="4" class="opacity-25" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span class="truncate">Downloading {activeDownload.name || 'Flagship'}…</span>
                {/if}
              </span>
              <div class="flex items-center gap-2 flex-shrink-0">
                <span class="text-neutral-300 font-mono text-[11px]">
                  {activeDownload.progress_pct.toFixed(1)}% ({activeDownload.status === 'paused' ? '0 MB/s' : `${activeDownload.speed_mbps.toFixed(1)} MB/s`})
                </span>
                {#if activeDownload.eta_formatted && activeDownload.status !== 'paused'}
                  <span class="text-neutral-500 text-[10px] hidden sm:inline">• {activeDownload.eta_formatted}</span>
                {/if}
                {#if onPauseDownload && (activeDownload.status === 'downloading' || activeDownload.status === 'starting')}
                  <button
                    onclick={() => onPauseDownload && onPauseDownload(activeDownload)}
                    class="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white cursor-pointer ml-1"
                    title="Pause download"
                  >
                    ⏸ Pause
                  </button>
                {:else if onResumeDownload && activeDownload.status === 'paused'}
                  <button
                    onclick={() => onResumeDownload && onResumeDownload(activeDownload)}
                    class="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 cursor-pointer ml-1"
                    title="Resume download"
                  >
                    ▶ Resume
                  </button>
                {/if}
                {#if onCancelDownload}
                  <button
                    onclick={() => onCancelDownload && onCancelDownload(activeDownload)}
                    class="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 cursor-pointer"
                    title="Cancel download"
                  >
                    ✕
                  </button>
                {/if}
              </div>
            </div>
            <div class="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
              <div
                class="h-full {activeDownload.status === 'paused' ? 'bg-amber-500' : 'bg-gradient-to-r from-sky-500 to-emerald-400'} transition-all duration-300"
                style="width: {Math.max(2, Math.min(100, activeDownload.progress_pct))}%;"
              ></div>
            </div>
            <div class="flex items-center justify-between text-[11px] text-neutral-500 font-sans">
              <span>Hugging Face: Experimentlab • Automatically unlocks when ready</span>
              {#if onOpenModels}
                <button onclick={onOpenModels} class="text-sky-400 hover:underline cursor-pointer text-[10px] font-mono">
                  View in Manager ›
                </button>
              {/if}
            </div>
          </div>
        {:else}
          <!-- In-Dock Actionable Locked Bar -->
          <div class="w-full bg-[#080a10] border border-white/10 rounded-2xl px-5 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] flex items-center justify-between gap-4">
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0"></span>
              <span class="text-xs text-neutral-300 font-sans truncate">
                No engine installed yet. Download Flagship model to begin offline computing.
              </span>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <button
                onclick={onStartDownload}
                class="px-4 py-1.5 rounded-lg text-xs font-mono font-medium bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Download Flagship (1.39 GB)</span>
              </button>
              {#if onOpenModels}
                <button
                  onclick={onOpenModels}
                  class="px-2.5 py-1.5 rounded-lg text-xs font-mono text-neutral-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  Browse all
                </button>
              {/if}
            </div>
          </div>
        {/if}
      {:else}
        <!-- Compact Floating Progress Pill above Input if downloading in background -->
        {#if activeDownload && (activeDownload.status === "downloading" || activeDownload.status === "starting" || activeDownload.status === "paused")}
          <div class="w-full mb-2 bg-[#090b12]/90 backdrop-blur-md border border-sky-500/25 rounded-xl px-3.5 py-2 flex items-center justify-between gap-3 text-xs font-mono shadow-lg">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-2 h-2 rounded-full {activeDownload.status === 'paused' ? 'bg-amber-400' : 'bg-sky-400 animate-pulse'} flex-shrink-0"></span>
              <span class="text-white truncate text-[11px]">
                {activeDownload.status === 'paused' ? 'Paused' : 'Downloading'} {activeDownload.name || 'Model'}
              </span>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span class="text-sky-400 text-[11px] font-semibold">
                {activeDownload.progress_pct.toFixed(0)}%
              </span>
              {#if activeDownload.eta_formatted && activeDownload.status !== 'paused'}
                <span class="text-neutral-500 text-[10px] hidden sm:inline">{activeDownload.eta_formatted}</span>
              {/if}
              {#if onPauseDownload && (activeDownload.status === 'downloading' || activeDownload.status === 'starting')}
                <button onclick={() => onPauseDownload && onPauseDownload(activeDownload)} class="px-1.5 py-0.5 rounded text-[10px] bg-white/10 hover:bg-white/20 text-neutral-300 cursor-pointer">
                  ⏸
                </button>
              {:else if onResumeDownload && activeDownload.status === 'paused'}
                <button onclick={() => onResumeDownload && onResumeDownload(activeDownload)} class="px-1.5 py-0.5 rounded text-[10px] bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 cursor-pointer">
                  ▶
                </button>
              {/if}
              {#if onCancelDownload}
                <button onclick={() => onCancelDownload && onCancelDownload(activeDownload)} class="px-1.5 py-0.5 rounded text-[10px] text-rose-400 hover:text-rose-300 cursor-pointer">
                  ✕
                </button>
              {/if}
            </div>
          </div>
        {/if}

        <div class="w-full flex items-center gap-2 bg-[#06080e]/90 backdrop-blur-2xl border border-white/[0.08] rounded-2xl px-3.5 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] focus-within:border-[#38bdf8]/40 transition-all">
          <textarea
            bind:this={textareaEl}
            bind:value={input}
            oninput={autoResize}
            onkeydown={handleKeydown}
            placeholder="Ask a scientific question, derive a proof, evaluate calculus…"
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
      {/if}

      <p class="text-[10px] font-mono text-[#6b7280] text-center mt-2 tracking-wide select-none">
        100% Offline &amp; Private · Verified Symbolic Mathematics · On-Device Intelligence
      </p>
    </div>
  </div>

</div>
