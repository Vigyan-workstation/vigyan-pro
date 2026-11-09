// Vigyan Pro — Sovereign Neuro-Symbolic & Ollama Streaming Client
// Dual-layered: Connects to Embedded Bridge (Port 8085) with SymPy AST + GraphRAG,
// with automatic graceful fallback to direct Ollama daemon (Port 11434).

import { compressContext, isCompressionEnabled } from "./compression";

export const DEFAULT_MODEL = "vigyan:3b";

export interface ToolResult {
  tool: string;
  render_type?: string;
  title?: string;
  expression?: string;
  result?: string;
  latex?: string;
  numeric_approx?: number | null;
  data?: any;
  layout?: any;
  config?: any;
  type?: string;
  [key: string]: any;
}

export interface StreamChunk {
  type: "thinking" | "answer" | "done" | "error" | "tool_result" | "sympy" | "artifact";
  text: string;
  toolData?: ToolResult;
  artifactData?: any;
}

export function getAgentHost(): string {
  if (typeof window !== "undefined") {
    if ((window as any).AGENT_HOST) return (window as any).AGENT_HOST;
    try {
      const stored = localStorage.getItem("vigyan_agent_host");
      if (stored) return stored;
    } catch {}
  }
  return "http://127.0.0.1:8085";
}

export function getVigyanToken(): string {
  if (typeof window !== "undefined") {
    if ((window as any).VIGYAN_TOKEN) return (window as any).VIGYAN_TOKEN;
    try {
      const stored = localStorage.getItem("vigyan_token");
      if (stored) return stored;
    } catch {}
  }
  return "";
}

export const OLLAMA_BASE = "http://127.0.0.1:11434";

export async function checkOllamaStatus(): Promise<boolean> {
  // Check embedded bridge first
  try {
    const res = await fetch(`${getAgentHost()}/health`, { signal: AbortSignal.timeout(1500) });
    if (res.ok) return true;
  } catch {}

  // Fallback check Ollama daemon
  try {
    const res = await fetch(`${OLLAMA_BASE}/api/tags`, { signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchTelemetry(): Promise<any> {
  try {
    const res = await fetch(`${getAgentHost()}/health`, { signal: AbortSignal.timeout(1500) });
    if (res.ok) {
      return await res.json();
    }
  } catch {}
  return null;
}

export async function getAvailableModels(): Promise<string[]> {
  const token = getVigyanToken();
  const headers: Record<string, string> = {};
  if (token) headers["X-Vigyan-Token"] = token;

  try {
    const res = await fetch(`${getAgentHost()}/api/models/catalog`, {
      headers,
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.models && Array.isArray(data.models)) {
        return data.models.map((m: { tag?: string; id?: string }) => m.tag || m.id || "").filter(Boolean);
      }
      if (data.catalog) {
        if (Array.isArray(data.catalog)) {
          return data.catalog.map((m: { tag?: string; id?: string }) => m.tag || m.id || "").filter(Boolean);
        } else if (typeof data.catalog === "object") {
          return Object.keys(data.catalog);
        }
      }
    }
  } catch {}

  try {
    const res = await fetch(`${OLLAMA_BASE}/api/tags`, { signal: AbortSignal.timeout(2000) });
    if (!res.ok) return [DEFAULT_MODEL];
    const data = await res.json();
    const models = (data.models ?? [])
      .map((m: { name: string }) => m.name)
      .filter((name: string) => !name.includes("7b") && !name.includes("frontier"));
    return models.length > 0 ? models : [DEFAULT_MODEL];
  } catch {
    return [DEFAULT_MODEL];
  }
}

/**
 * Stream a chat completion.
 * Prioritizes the Embedded Sovereign Bridge (with SymPy AST + GraphRAG + STEM Visualizers)
 * and falls back seamlessly to direct Ollama daemon.
 */
export async function streamChat(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  model: string,
  onChunk: (chunk: StreamChunk) => void,
  signal?: AbortSignal,
): Promise<void> {
  let payloadMessages = messages;
  if (isCompressionEnabled() && messages.length > 6) {
    const { compressed } = compressContext(messages, 4);
    payloadMessages = compressed;
  }

  const latestUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content || "";
  const token = getVigyanToken();
  const agentHost = getAgentHost();

  let userCtx = 4096;
  try {
    userCtx = parseInt(localStorage.getItem("vigyan_context_budget") || "4096", 10);
  } catch {}

  // ATTEMPT 1: Sovereign Neuro-Symbolic Bridge
  let bridgeSuccess = false;
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["X-Vigyan-Token"] = token;

    const bridgeResp = await fetch(`${agentHost}/api/chat`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: latestUserMsg,
        messages: payloadMessages,
        model: model || DEFAULT_MODEL,
        num_ctx: userCtx,
      }),
      signal,
    });

    if (bridgeResp.ok && bridgeResp.body) {
      bridgeSuccess = true;
      const reader = bridgeResp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let isStreamDone = false;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const blocks = buffer.split("\n\n");
          buffer = blocks.pop() ?? "";

          for (const block of blocks) {
            if (!block.trim()) continue;
            let eventName = "message";
            let dataStr = "";
            for (const line of block.split("\n")) {
              if (line.startsWith("event: ")) eventName = line.slice(7).trim();
              else if (line.startsWith("data: ")) dataStr = line.slice(6);
            }
            if (!dataStr) continue;

            try {
              const parsed = JSON.parse(dataStr);
              if (eventName === "think") {
                onChunk({ type: "thinking", text: typeof parsed === "string" ? parsed : JSON.stringify(parsed) });
              } else if (eventName === "tier_downgrade") {
                if (parsed && parsed.reason) {
                  onChunk({ type: "thinking", text: `[Model Router]: ${parsed.reason}\n` });
                }
              } else if (eventName === "ram_governor_trip") {
                if (parsed && parsed.ram_percent) {
                  onChunk({ type: "thinking", text: `[RAM Governor]: Memory threshold reached (${parsed.ram_percent}%). Model evicted to prevent OOM.\n` });
                }
              } else if (eventName === "token") {
                let tokenText = typeof parsed === "string" ? parsed : JSON.stringify(parsed);
                tokenText = tokenText.replace(/<\/?(?:code|pre|solution|sstream|latex|math)>/gi, "");
                if (tokenText) onChunk({ type: "answer", text: tokenText });
              } else if (eventName === "sympy") {
                onChunk({ type: "sympy", text: typeof parsed === "string" ? parsed : JSON.stringify(parsed) });
              } else if (eventName === "tool_result") {
                onChunk({ type: "tool_result", text: "", toolData: parsed as ToolResult });
              } else if (eventName === "artifact") {
                onChunk({ type: "artifact", text: "", artifactData: parsed });
              } else if (eventName === "done") {
                onChunk({ type: "done", text: "" });
                isStreamDone = true;
                break;
              }
            } catch {
              // Raw string fallback
              if (eventName === "token") {
                let tokenText = dataStr.replace(/<\/?(?:code|pre|solution|sstream|latex|math)>/gi, "");
                if (tokenText) onChunk({ type: "answer", text: tokenText });
              }
            }
          }
          if (isStreamDone) break;
        }
      } finally {
        reader.releaseLock();
      }
      if (!isStreamDone) onChunk({ type: "done", text: "" });
      return;
    }
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") return;
    // Fall through to direct Ollama if bridge unreachable
  }

  // ATTEMPT 2: Fallback to Direct Local Ollama Daemon
  let directResp: Response;
  try {
    directResp = await fetch(`${OLLAMA_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: model || DEFAULT_MODEL,
        messages: payloadMessages,
        stream: true,
        options: {
          num_ctx: userCtx || 4096,
          num_batch: 256,
          num_thread: 4,
          repeat_penalty: 1.15,
          repeat_last_n: 64,
          stop: [
            "<|im_start|>",
            "<|im_end|>",
            "<|endoftext|>",
            "</sstream>",
            "<solution>",
            "</solution>",
            "</code>",
            "</pre>",
            "User:",
            "\n\nUser",
            "Human:"
          ]
        }
      }),
      signal,
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") return;
    onChunk({ type: "error", text: "Warming up sovereign engine... Please try again in a moment." });
    return;
  }

  if (!directResp.ok) {
    onChunk({ type: "error", text: `Sovereign engine returned status ${directResp.status}. Please try again.` });
    return;
  }

  const reader = directResp.body?.getReader();
  if (!reader) {
    onChunk({ type: "error", text: "No response stream available." });
    return;
  }

  const decoder = new TextDecoder();
  let buffer = "";
  let inThink = false;

  const flush = (raw: string) => {
    raw = raw.replace(/<\/?(?:code|pre|solution|sstream|latex|math)>/gi, "");
    if (!raw) return;
    let i = 0;
    while (i < raw.length) {
      if (inThink) {
        const end = raw.indexOf("</think>", i);
        if (end === -1) {
          const chunk = raw.slice(i);
          onChunk({ type: "thinking", text: chunk });
          i = raw.length;
        } else {
          const chunk = raw.slice(i, end);
          if (chunk) onChunk({ type: "thinking", text: chunk });
          inThink = false;
          i = end + "</think>".length;
        }
      } else {
        const start = raw.indexOf("<think>", i);
        if (start === -1) {
          const chunk = raw.slice(i);
          onChunk({ type: "answer", text: chunk });
          i = raw.length;
        } else {
          const before = raw.slice(i, start);
          if (before) onChunk({ type: "answer", text: before });
          inThink = true;
          i = start + "<think>".length;
        }
      }
    }
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const obj = JSON.parse(line);
          const thinking: string = obj?.message?.thinking ?? "";
          const tokenStr: string = obj?.message?.content ?? "";
          if (thinking) onChunk({ type: "thinking", text: thinking });
          if (tokenStr) flush(tokenStr);
          if (obj?.done) break;
        } catch {}
      }
    }
  } catch (err: unknown) {
    if (err instanceof Error && err.name !== "AbortError") {
      onChunk({ type: "error", text: "The stream was interrupted." });
    }
  } finally {
    reader.releaseLock();
    onChunk({ type: "done", text: "" });
  }
}
