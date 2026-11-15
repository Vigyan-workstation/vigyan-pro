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
  type: "thinking" | "answer" | "done" | "error" | "tool_result" | "sympy";
  text: string;
  toolData?: ToolResult;
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

export async function checkOllamaStatus(): Promise<boolean> {
  // Check embedded bridge
  try {
    const res = await fetch(`${getAgentHost()}/health`, { signal: AbortSignal.timeout(1500) });
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
  return [DEFAULT_MODEL];
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
    } else {
      onChunk({
        type: "error",
        text: "Unable to reach local intelligence engine. Please check that a model is installed in Models (Cmd+M) or try again.",
      });
      return;
    }
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") return;
    onChunk({
      type: "error",
      text: "Unable to reach local intelligence engine. Please check that a model is installed in Models (Cmd+M) or try again.",
    });
  }
}
