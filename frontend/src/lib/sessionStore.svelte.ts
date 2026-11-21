// Vigyan Pro — Session Store (Svelte 5 Runes)
// Persists past chat sessions in localStorage under "vigyan_sessions".
// Each session records its message array so ChatHistory can restore it.

export interface ChatSession {
  id: string;
  title: string; // first user message, truncated
  createdAt: number; // Unix ms
  lastActivity: number; // Unix ms
  messageCount: number;
  messages?: any[]; // full message payload for restore
}

const SESSIONS_KEY = "vigyan_sessions";
const MAX_SESSIONS = 50;
const TITLE_LEN = 40;

function loadSessions(): ChatSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function persist(sessions: ChatSession[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions.slice(0, MAX_SESSIONS)));
  } catch {
    // quota exceeded — silently ignore
  }
}

function firstUserTitle(messages: any[]): string {
  const first = messages.find((m) => m.role === "user");
  if (!first) return "Untitled session";
  const text = String(first.content || "");
  if (!text.trim()) return "Untitled session";
  return text.length > TITLE_LEN ? text.slice(0, TITLE_LEN) + "…" : text;
}

class SessionStore {
  sessions = $state<ChatSession[]>(loadSessions());
  activeSessionId = $state<string>("");

  /** Record (create or update) the session covering the current message array. */
  recordSession(id: string, messages: any[]) {
    if (messages.length === 0) return;
    const now = Date.now();
    const existing = this.sessions.find((s) => s.id === id);
    if (existing) {
      existing.lastActivity = now;
      existing.messageCount = messages.length;
      existing.messages = messages;
    } else {
      this.sessions = [
        {
          id,
          title: firstUserTitle(messages),
          createdAt: now,
          lastActivity: now,
          messageCount: messages.length,
          messages,
        },
        ...this.sessions,
      ];
    }
    this.activeSessionId = id;
    // Cap stored payloads
    if (this.sessions.length > MAX_SESSIONS) {
      this.sessions = this.sessions.slice(0, MAX_SESSIONS);
    }
    persist(this.sessions);
  }

  /** Archive the active session and return a fresh session id. */
  newSession(currentId: string, messages: any[]): string {
    this.recordSession(currentId, messages);
    const id = Math.random().toString(36).slice(2, 12);
    this.activeSessionId = id;
    return id;
  }

  switchSession(id: string): any[] | null {
    const s = this.sessions.find((x) => x.id === id);
    if (!s) return null;
    this.activeSessionId = id;
    return s.messages || [];
  }

  deleteSession(id: string) {
    this.sessions = this.sessions.filter((s) => s.id !== id);
    if (this.activeSessionId === id) this.activeSessionId = "";
    persist(this.sessions);
  }
}

export const sessionStore = new SessionStore();
