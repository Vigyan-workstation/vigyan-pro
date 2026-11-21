# Implementation Plan: Vigyan Pro v5.0.8 Free Tier

## Overview

Implements all requirements for the first publicly stable Vigyan Pro release. The order below ensures that critical runtime bugs are fixed before any new surface area is added, the backend model catalog is correct before the frontend references it, and the receipt system is wired end-to-end before the new UI components that display it are built. Property-based tests are co-located with the code they validate so regressions are caught as each piece lands.

## Tasks

- [ ] 1. Fix critical runtime bugs in Chat.svelte, InlineArtifactPill.svelte, and chatStore.svelte.ts
  - [ ] 1.1 Fix false CAS badge — remove hardcoded `verified: true` from `synthesizeArtifactIfMath()` in `frontend/src/components/Chat.svelte`
    - Delete the line `artifact.verified = true` inside `synthesizeArtifactIfMath()` so verified state is never set by the client heuristic
    - In `frontend/src/components/InlineArtifactPill.svelte`, gate the "CAS Verified" span on `artifact.receiptStatus === "verified"` (a prop passed down from MessageBubble) instead of `artifact.verified`
    - In `frontend/src/lib/chatStore.svelte.ts`, add `receiptStatus?: "verified" | "unverified" | "unable_to_check"` and `receiptMeta?: ReceiptMeta` to the `Message` interface; export `ReceiptStatus` and `ReceiptMeta` types
    - _Requirements: 1.1, 1.3, 1.4_

  - [ ] 1.2 Fix chat scroll-to-bottom regression in `frontend/src/components/Chat.svelte`
    - Add `let userScrolledUp = $state(false)` and an `onScrollEvent()` handler that sets it when `distFromBottom > 80`
    - Bind `onscroll={onScrollEvent}` to the scroll container div
    - Change `scrollToBottom()` to accept a `force` parameter; skip scroll when `userScrolledUp && !force`
    - In `send()`, call `scrollToBottom(true)` and reset `userScrolledUp = false` before pushing the user message
    - Call `scrollToBottom()` (non-forced) on each `answer` token and on `done`
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ] 1.3 Fix raw token leakage — add `stripTokens()` to `frontend/src/lib/ollama.ts` and `frontend/src/components/Chat.svelte`
    - In `frontend/src/lib/ollama.ts`: add `const STRIP_TOKENS = ["<answer>","</answer>","<solution>","</solution>","<|im_end|>","<|im_start|>","<|endoftext|>","</sstream>"]` and a `stripTokens(text: string): string` function that iterates the list replacing each occurrence with `""`
    - In the `token` event branch of `streamChat()`, apply `stripTokens()` after the existing regex strip
    - In `frontend/src/components/Chat.svelte`, import `stripTokens` from `../lib/ollama` and apply it to `tokenText` in the `answer` chunk handler
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ]* 1.4 Write property tests for token strip — `tests/test_token_strip.py`
    - **Property 2: Token strip idempotency** — `stripTokens(stripTokens(text)) === stripTokens(text)` for arbitrary strings
    - **Property 3: Strip tokens absent from output** — for each token in `STRIP_TOKENS`, output must not contain that token
    - Implement as a Hypothesis `@given(st.text())` test
    - _Requirements: 3.1, 3.2, 3.3_

- [ ] 2. Update backend model catalog to the three Apache 2.0 sovereign models
  - [ ] 2.1 Replace model catalog constants in `src/vigyan_cli.py`
    - Replace `ALLOWED_SOVEREIGN_MODELS` set with the three filenames: `gemma-4-e4b-qat-q4-0.gguf`, `vigyan-7b-quad-master-q4_k_m.gguf`, `gemma-4-12b-qat-q4-0.gguf`
    - Replace `SOVEREIGN_PRODUCTION_MODELS` list with the three-entry list from the design (Gemma 4 E4B, Vigyan-7B, Gemma 4 12B)
    - Replace `MODEL_ALIASES` dict with the new aliases: `4b/gemma4/gemma:4b → gemma-4-e4b-qat-q4-0.gguf`, `7b/vigyan:7b → vigyan-7b-quad-master-q4_k_m.gguf`, `12b/gemma:12b/gemma4:12b → gemma-4-12b-qat-q4-0.gguf`
    - Update `cmd_models()` table header and `alias_display` / `tier_labels` dicts to match new filenames
    - Update error messages in `cmd_pull()` to reference `4b`, `7b`, `12b`
    - Change `cmd_pull()` RAM check from advisory-only to blocking `[y/N]` confirmation when `avail_ram < req_ram`
    - Update `print_usage()` to list the new three models
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [ ] 2.2 Replace model catalog constants in `src/launch_desktop.py`
    - Replace `ALLOWED_SOVEREIGN_MODELS`, `SOVEREIGN_PRODUCTION_MODELS`, and `MODELS_CATALOG` with the new three-model definitions including `ctx_size` and `template` fields
    - Add `GEMMA4_TEMPLATE` and `GEMMA4_STOP` constants
    - In the chat handler, detect `model_info["template"]` and format the prompt with `GEMMA4_TEMPLATE` when `template == "gemma4"`, or the existing OLMo 2 format otherwise
    - Pass `--ctx-size <model_info["ctx_size"]>` through to the supervisor when starting llama.cpp
    - Add RAM governor check at model load: refuse if `model_info["ram_required_gb"] > avail_gb * 0.85` and emit `error` SSE event
    - Add `strip_tokens()` helper applied to every streaming chunk before SSE emission using the same 8-token list
    - Add system prompt constant: `"You are Vigyan, a sovereign offline STEM assistant. Provide exact, step-by-step scientific and mathematical derivations. Never fabricate numerical results. When in doubt, defer to the CAS engine."`
    - _Requirements: 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ] 2.3 Update `src/llama_supervisor.py` model whitelist
    - Replace `ALLOWED_SOVEREIGN_MODELS` with the new three filenames
    - Add context window awareness: read `ctx_size` from model info dict and pass `--ctx-size <ctx_size>` to the llama.cpp subprocess
    - _Requirements: 4.1, 5.2, 5.3_

  - [ ] 2.4 Update frontend model switcher in `frontend/src/App.svelte`
    - In the segmented nav, replace the three segment entries with `{ id: "4b", label: "4B Daily", fname: "gemma-4-e4b-qat-q4-0.gguf" }`, `{ id: "7b", label: "7B Production", fname: "vigyan-7b-quad-master-q4_k_m.gguf" }`, `{ id: "12b", label: "12B Advanced", fname: "gemma-4-12b-qat-q4-0.gguf" }`
    - Update `isActive` matching logic to handle the new filename patterns
    - _Requirements: 4.8_

  - [ ] 2.5 Update model cards in `frontend/src/components/ModelsDrawer.svelte`
    - Update any hardcoded model names, filenames, or size strings to the new three-model catalog entries
    - Ensure "4B Daily", "7B Production", "12B Advanced" labels are used consistently
    - _Requirements: 4.1, 4.2, 4.8_

  - [ ]* 2.6 Write property test for model alias coverage — `tests/test_model_aliases.py`
    - **Property 4: All model aliases resolve to an allowed filename** — for every key in `MODEL_ALIASES`, the value must be in `ALLOWED_SOVEREIGN_MODELS`
    - Run against both `vigyan_cli.py` and `launch_desktop.py` alias dicts
    - _Requirements: 4.3, 4.4, 4.5_

- [ ] 3. Wire the derivation receipt system end-to-end in `src/launch_desktop.py`
  - [ ] 3.1 Add `_save_receipt()` helper and call it after successful SymPy evaluation
    - Write `_save_receipt(receipt: dict) -> str` that creates `~/.vigyan/receipts/`, derives filename `<sha256_12>-<YYYYMMDD_HHMMSS>.rcpt.json`, writes the receipt with `json.dump(..., indent=2)`, and returns the absolute path
    - After a successful SymPy evaluation (`result["success"] == True`), call `generate_derivation_receipt()` from `derivation_receipt.py` with `question`, `expression`, `exact_result`, `latex_result`, `numeric_approx`, and `planner_model=active_model_name`
    - Call `_save_receipt(receipt)` to persist it; handle `OSError` (disk full) by logging a warning and continuing without the receipt event
    - _Requirements: 6.1, 6.2_

  - [ ] 3.2 Emit `receipt_ready` SSE event after receipt is saved
    - Immediately after `_save_receipt()` returns, `yield` an SSE `receipt_ready` event with JSON payload: `{ "id": receipt["id"], "exact_analytical": result["result"], "file_path": filepath, "residual": receipt["verification"]["residual_error"], "sympy_version": receipt["toolchain"]["sympy"], "model_name": active_model_name }`
    - _Requirements: 6.3_

  - [ ] 3.3 Add `POST /api/receipt/verify` endpoint to `src/launch_desktop.py`
    - Register the route handler: read `file_path` from JSON body, return 404 if missing, load the JSON, call `verify_derivation_receipt()`, return `{ "valid": bool, "reason": str, "details": dict }`
    - _Requirements: 7.4_

  - [ ] 3.4 Add `GET /api/config` and `POST /api/config` endpoints to `src/launch_desktop.py`
    - `GET /api/config`: read `~/.vigyan/config.json`, return `{}` if missing
    - `POST /api/config`: merge incoming JSON into existing config file, write back atomically
    - _Requirements: 12.3_

  - [ ]* 3.5 Write property tests for receipt round-trip — `tests/test_receipt_roundtrip.py`
    - **Property 5: Receipt round-trip produces exit 0** — for sampled expressions, `generate_derivation_receipt()` → `verify_derivation_receipt()` must return `(True, _, _)`
    - **Property 6: Receipt content matches SymPy output** — `receipt["derivation"][0]["exact_analytical"] == str(sympy_result)`
    - Use Hypothesis `@given` with `st.sampled_from(["x**2 + 1", "sin(x)", "exp(-x)", "x**3 - x"])` for expressions
    - _Requirements: 6.6, 6.7_

  - [ ] 3.6 Add step-index comment and fix step numbering in `src/derivation_receipt.py`
    - Add `# "step" is 0-indexed: step 0 is the first derivation step.` comment above the `steps` list construction
    - Change the default `steps` list in `generate_derivation_receipt()` to use `"step": 0` for the first (and only) default step, so it matches the 0-indexed convention
    - Verify `verify_derivation_receipt()` already reports `s.get("step")` verbatim (no change needed if so)
    - _Requirements: 10.4_

- [ ] 4. UI shell redesign — design tokens, 3-panel layout, and titlebar
  - [ ] 4.1 Replace CSS design tokens in `frontend/src/app.css`
    - Remove all `--obsidian-*` custom properties and `--emerald-accent` / `--guide-*` variables
    - Add the full ExperimentLab token set to `:root`: `--bg: #0A0A0B`, `--surface: #111113`, `--line: rgba(255,255,255,.07)`, `--line-2: rgba(255,255,255,.045)`, `--text: #F1F1F3`, `--text-2: #9C9CA4`, `--text-3: #7C7C85`, `--accent: #FF7B5F`, `--ok: #3FB950`, `--warn: #D29922`, `--err: #E5534B`, `--font: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`, `--mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace`, `--t: 130ms cubic-bezier(.2,0,0,1)`, `--r: 6px`
    - Add keyframes: `fadeUp`, `pulseRing`, `sweep`, `blink`
    - Update `html, body` background to `var(--bg)` and font to `var(--font)`
    - Add `@media (prefers-reduced-motion: reduce)` block suppressing all animations and transitions except opacity
    - _Requirements: 8.1, 8.2, 8.3, 8.7_

  - [ ] 4.2 Restructure `frontend/src/App.svelte` to 3-column CSS grid and 36 px titlebar
    - Change the root `div` background from `#000000` to `var(--bg)`
    - Change the `header` height from `h-11` (44 px) to `h-9` (36 px) and update border/bg tokens to use `var(--line)` and `var(--surface)`
    - Change `main` from `flex flex-row` to `display: grid; grid-template-columns: 220px 1fr 264px; grid-template-rows: 36px 1fr` applied via a Tailwind arbitrary-value class or a scoped `<style>` block
    - Slot `ChatHistory.svelte` placeholder div into the first grid column (220 px); wire it up fully in task 5.4
    - Keep the existing Chat panel in the second column (`flex-1`)
    - Add an `activeReceipt` state (`$state<ReceiptMeta | null>(null)`) and slot a `ReceiptInspector.svelte` placeholder div into the third column (264 px, hidden when `activeReceipt === null`); wire it up fully in task 6.3
    - Replace hardcoded `emerald-400` and `sky-400` color classes in the titlebar with `text-[var(--ok)]` and `text-[var(--accent)]`
    - Update version badge from `v5.0.7` to `v5.0.8`
    - _Requirements: 8.1, 8.4, 8.5, 8.10_

  - [ ] 4.3 Update empty state and fade-up animation in `frontend/src/components/Chat.svelte`
    - Change welcome-state headline from "Vigyan Pro" to "What are we working on?"
    - Apply `animate-[fadeUp_240ms_ease]` to the welcome-state container; wrap it in a Svelte `{#key chatStore.messages.length === 0}` block so the animation replays on clear
    - Remove the existing `border-[#38bdf8]` and `text-[#38bdf8]` color classes from the input dock and replace with `border-[var(--accent)]` / `text-[var(--accent)]` on the focus-within ring and send button
    - _Requirements: 8.8, 8.9_

- [ ] 5. Build new UI components

  - [ ] 5.1 Create `frontend/src/components/ReceiptBadge.svelte`
    - Accept props: `status: "verified" | "unverified" | "unable_to_check"`, `onClick?: () => void`
    - Render a `<button>` (only when `status === "verified"`) or `<span role="status">` for the other two states
    - Verified: green dot using `var(--ok)`, label "✓ CAS Verified", apply `pulseRing` animation once on mount via `animate-[pulseRing_600ms_ease_1]`
    - Unverified: amber dot using `var(--warn)`, label "⚠ Unverified — LLM heuristic"
    - Unable to check: muted dot using `var(--text-3)`, label "✗ Unable to Check"
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [ ] 5.2 Create `frontend/src/components/ReceiptInspector.svelte`
    - Accept props matching the `ReceiptMeta` interface and `onRerunVerification`, `onCopyLatex`, `onExportPdf` callbacks
    - Render 264 px fixed panel: header "Receipt Inspector" with close button (×), `dl` grid with `dt` at 74 px for fields: Expression, SymPy Version, Residual Error, Model, Runtime, Network Bytes (always 0), Receipt Hash
    - Show placeholder "Select a verified answer to inspect its receipt." when `receipt` prop is `null`
    - "Re-run Verification" button: call `POST /api/receipt/verify` with `{ file_path }`, show blink spinner, update status within 10 s or show timeout error
    - "Copy as LaTeX" button: write `receipt.latex` to clipboard
    - "Export PDF" button: placeholder implementation — `console.warn("PDF export not yet implemented")`; wire Tauri's `save()` dialog in a follow-up
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ] 5.3 Create `frontend/src/components/CommandPalette.svelte`
    - Accept props: `open: boolean`, `onClose: () => void`, `commands: Command[]`
    - Render as a portal at `<body>` root using Svelte's `<svelte:body>` or a `{#if open}` teleport pattern; 480 px wide, `top: 15vh`, centered horizontally, backdrop click closes
    - Auto-focus text input on open
    - Filter command list case-insensitively on every keypress with no debounce
    - ArrowUp / ArrowDown move selection; Enter executes selected command and calls `onClose()`; Escape calls `onClose()` without executing
    - Default commands list: "New session (⌘N)", "Open receipts", "Toggle theme", "Re-run verification", "Export receipt as PDF", "Settings (⌘,)"
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

  - [ ] 5.4 Create `frontend/src/components/ChatHistory.svelte`
    - Accept props: `sessions: ChatSession[]`, `activeSessionId: string`, `onSelectSession`, `onNewChat`
    - Render 220 px rail: "New Chat" button with ⌘N badge at top; session rows showing truncated title (40 chars max) and relative timestamp
    - Hover state: 130 ms background transition using `var(--t)`; long titles clip with `text-overflow: ellipsis`
    - Export `ChatSession` type: `{ id: string, title: string, createdAt: number, messageCount: number, lastActivity: number }`; persist session list under `localStorage` key `"vigyan_sessions"`
    - Wire `onNewChat` to call `chatStore.clear()` and mount the component in the left-rail slot in `App.svelte`
    - _Requirements: 8.5, 8.6_

- [ ] 6. Checkpoint — verify bug fixes and new components before wiring receipt SSE
  - Ensure all tests pass with `pytest tests/` and confirm `npm run build` completes without TypeScript errors; ask the user if questions arise.

- [ ] 7. Wire receipt SSE events through frontend to ReceiptInspector

  - [ ] 7.1 Extend `StreamChunk` type and SSE parser in `frontend/src/lib/ollama.ts`
    - Add `"receipt_ready"` to the `StreamChunk.type` union and add a `receiptData?: Record<string, any>` field
    - In the SSE parser's event dispatch, handle `eventName === "receipt_ready"` by calling `onChunk({ type: "receipt_ready", text: "", receiptData: parsed })`
    - Update `DEFAULT_MODEL` from `"vigyan:3b"` to `"gemma:4b"`
    - _Requirements: 6.3, 6.4_

  - [ ] 7.2 Parse `receipt_ready` events in `frontend/src/components/Chat.svelte`
    - In the `onChunk` callback, add a `receipt_ready` branch that constructs a `ReceiptMeta` object from `chunk.receiptData` and sets `chatStore.messages[idx].receiptStatus = "verified"` and `chatStore.messages[idx].receiptMeta = meta`
    - Add `onReceiptReady?: (meta: ReceiptMeta) => void` prop and call it when the event arrives
    - Set `chatStore.messages[idx].artifact.verified = true` only here, never in `synthesizeArtifactIfMath()`
    - For messages with no receipt event when `done` fires: set `receiptStatus = "unverified"` if the message has content and no prior receipt; set `receiptStatus = "unable_to_check"` if a SymPy error/timeout was indicated
    - _Requirements: 1.1, 1.2, 1.3, 6.4_

  - [ ] 7.3 Thread `activeReceipt` state from `App.svelte` to `ReceiptInspector.svelte`
    - Pass `onReceiptReady={(meta) => { activeReceipt = meta }}` down to `<Chat />`
    - Replace the placeholder right-rail div with `<ReceiptInspector receipt={activeReceipt} onRerunVerification={...} onCopyLatex={...} onExportPdf={...} />`, hidden via `grid-column` collapse when `activeReceipt === null`
    - _Requirements: 7.1, 7.7_

  - [ ] 7.4 Add `ReceiptBadge` to `MessageBubble.svelte` and update `InlineArtifactPill.svelte`
    - In `frontend/src/components/MessageBubble.svelte`, add `receiptStatus?: ReceiptStatus` and `receiptMeta?: ReceiptMeta` props; import and render `<ReceiptBadge status={receiptStatus ?? "unverified"} onClick={() => receiptMeta && onReceiptClick?.(receiptMeta)} />` after the content `div` for assistant messages
    - Remove the existing hardcoded `{#if artifact.verified}` CAS Verified span from `InlineArtifactPill.svelte`; replace it with `<ReceiptBadge status={receiptStatus ?? "unverified"} />` passed as a prop from the parent
    - Replace `border-[#38bdf8]` and `text-[#38bdf8]` classes in `InlineArtifactPill.svelte` with `border-[var(--accent)]` and `text-[var(--accent)]`
    - _Requirements: 1.1, 6.4, 6.5_

  - [ ] 7.5 Wire `CommandPalette` into `App.svelte`
    - Add `commandPaletteOpen = $state(false)`
    - In `handleGlobalKeydown`, change the existing ⌘K handler from `chatStore.clear()` to `commandPaletteOpen = !commandPaletteOpen`
    - Mount `<CommandPalette open={commandPaletteOpen} onClose={() => commandPaletteOpen = false} commands={...} />` at root level outside the grid
    - Provide the six default commands, wiring "New session" to `chatStore.clear()`, "Settings" to `settingsOpen = true`, "Open receipts" to opening the ReceiptInspector, "Re-run verification" to calling the verify endpoint, "Export receipt as PDF" to the inspector's export action
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [ ] 8. Add `vigyan verify` and `vigyan receipts` CLI commands to `src/vigyan_cli.py`

  - [ ] 8.1 Implement `cmd_verify(filepath: str) -> int`
    - If `filepath` does not exist, print `Error: file not found: <filepath>` to stderr, return 2
    - If the file is not valid JSON, print `Error: invalid JSON in receipt file` to stderr, return 2
    - Import `verify_derivation_receipt` and `format_cli_receipt_report` from `derivation_receipt`
    - Call `verify_derivation_receipt(data)`, then `format_cli_receipt_report(data, valid, reason, details)`, print the report
    - If `valid`, print `VERIFIED` and return 0; else return 1
    - Report wall-clock time in ms: `print(f"Verification completed in {elapsed_ms} ms")`
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_

  - [ ] 8.2 Implement `cmd_receipts(verify_all: bool = False, export_dir: str | None = None) -> int`
    - Scan `~/.vigyan/receipts/` for `*.rcpt.json` files; if none found, print "No receipts found in ~/.vigyan/receipts/" and return 0
    - Sort by `mtime` descending
    - Default: print table with columns: filename, created timestamp, question (truncated to 60 chars), verification status (cached from receipt `verification.status` field without re-running)
    - `--verify-all`: call `verify_derivation_receipt()` on each file and append pass/fail indicator to each row
    - `--export <dir>`: copy all receipt files to `<dir>` using `shutil.copy2`, creating the directory if needed; print count of files exported
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

  - [ ] 8.3 Wire `verify` and `receipts` subcommands in `main()` and update `print_usage()`
    - In `main()`, add dispatch branches: `args[0] == "verify"` → `cmd_verify(args[1])`, `args[0] == "receipts"` → parse `--verify-all` / `--export` flags then call `cmd_receipts()`
    - In `--version` branch, append `" Licence: Non-Commercial Free Tier"` to the printed version string
    - Add `verify` and `receipts` entries to `print_usage()` output
    - _Requirements: 10.1, 11.1, 12.5_

  - [ ]* 8.4 Write unit tests for new CLI commands — `tests/test_cli_verify_receipts.py`
    - Test `cmd_verify()` returns 2 for missing file, 2 for invalid JSON, 0 for a freshly generated valid receipt, 1 for a tampered receipt (modify `derivation[0].exact_analytical` before calling)
    - Test `cmd_receipts()` prints "No receipts found" when directory is empty
    - Test `--version` output contains "Licence: Non-Commercial Free Tier"
    - _Requirements: 10.2, 10.5, 10.6, 11.2, 12.5_

- [ ] 9. Add licence file and SettingsPanel licence section

  - [ ] 9.1 Create `LICENCE-FREE-TIER.md` at the repository root
    - Write a brief non-commercial licence: free for personal, academic, and non-commercial research use; commercial use requires a paid seat; no warranty; OSS dependencies listed separately
    - _Requirements: 12.1_

  - [ ] 9.2 Add first-launch licence modal to `frontend/src/App.svelte`
    - On `onMount`, call `GET /api/config`; if the response lacks `licence_accepted: true`, set `licenceModalOpen = $state(true)`
    - Render a blocking modal overlay (z-50, full screen backdrop) with the licence summary text and a single "I Understand" button
    - On click, call `POST /api/config` with `{ licence_accepted: true, accepted_at: new Date().toISOString() }` then set `licenceModalOpen = false`
    - _Requirements: 12.2, 12.3, 12.6_

  - [ ] 9.3 Add "Licence" section to `frontend/src/components/SettingsPanel.svelte`
    - After "Clear Conversation History" row, add a new "Licence" section: label "Personal — Free Tier", read and display the `accepted_at` date from `GET /api/config`
    - Add a "View Licence" link that calls `window.__TAURI__.shell.open("LICENCE-FREE-TIER.md")` or falls back to `window.open()` if Tauri is unavailable
    - Update version badge from `v5.0.7` to `v5.0.8`
    - Replace remaining hardcoded `#10b981` and `sky-400` color tokens in the footer with `var(--ok)` and `var(--accent)`
    - _Requirements: 8.4, 12.4_

- [ ] 10. Checkpoint — full integration smoke test
  - Start the backend with `python src/launch_desktop.py` (or `run.py`); open the app via `npm run dev` in `frontend/`; send the prompt "Integrate x^2 exp(-x) dx from 0 to infinity"; confirm: (a) no raw tokens in the response, (b) a `.rcpt.json` file appears in `~/.vigyan/receipts/` within 5 s, (c) the ReceiptBadge shows "✓ CAS Verified", (d) clicking the badge opens ReceiptInspector with correct fields, (e) `vigyan verify <that file>` exits 0
  - Run `pytest tests/` and confirm all tests pass; ask the user if questions arise.

## Notes

- Sub-tasks marked with `*` are optional property-based tests that can be skipped for a faster MVP build; core implementation tasks are never optional
- Run Python tests with `pytest tests/` from the repo root (requires `pytest` and `hypothesis` installed)
- Run TypeScript type checks with `npm run build` from `frontend/` (no test runner is configured yet — add `vitest` to `devDependencies` in `frontend/package.json` and a `"test": "vitest --run"` script before running PBTs 1.4 through 7.4)
- Each task references specific requirements for traceability; the design document holds the full interface contracts and SSE event schemas
- Task 10 is not an automated test — it requires the app to be running locally; use the commands above to start both processes

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3"] },
    { "id": 1, "tasks": ["1.4", "2.1", "2.2", "2.3"] },
    { "id": 2, "tasks": ["2.4", "2.5", "2.6"] },
    { "id": 3, "tasks": ["3.1"] },
    { "id": 4, "tasks": ["3.2", "3.3", "3.4"] },
    { "id": 5, "tasks": ["3.5", "3.6"] },
    { "id": 6, "tasks": ["4.1"] },
    { "id": 7, "tasks": ["4.2", "4.3"] },
    { "id": 8, "tasks": ["5.1", "5.2", "5.3", "5.4"] },
    { "id": 9, "tasks": ["6"] },
    { "id": 10, "tasks": ["7.1"] },
    { "id": 11, "tasks": ["7.2"] },
    { "id": 12, "tasks": ["7.3", "7.4", "7.5"] },
    { "id": 13, "tasks": ["8.1", "8.2"] },
    { "id": 14, "tasks": ["8.3"] },
    { "id": 15, "tasks": ["8.4"] },
    { "id": 16, "tasks": ["9.1", "9.2", "9.3"] },
    { "id": 17, "tasks": ["10"] }
  ]
}
```
