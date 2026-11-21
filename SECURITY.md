# Security Policy — Vigyan Pro Desktop

## 1. Zero-Trust Air-Gapped Architectural Guarantee

Vigyan Pro Desktop is engineered specifically for academic laboratories, physical engineering research, and sovereign scientific environments requiring strict zero-data-exfiltration guarantees.

### Key Security Commitments:
* **Zero Remote Telemetry:** The workstation runtime contains zero analytics, tracking pings, or background telemetry. Local inference and exact CAS evaluations operate 100% offline.
* **Controlled Network Egress:** Outbound network activity occurs strictly and exclusively when the user explicitly initiates a model download from Hugging Face (`huggingface.co`). No user queries, prompts, derivations, or computation tokens ever leave the local machine.
* **Air-Gapped IPC:** All inference and symbolic mathematics occur strictly on the local machine via loopback (`127.0.0.1:8085` for the local bridge server and private loopback ports for the supervised `llama-server` process).
* **Strict Content Security Policy (CSP):** The embedded runtime strictly forbids any outbound connection outside local loopback interfaces:
  ```http
  Content-Security-Policy: default-src 'self' file: data: blob: http://127.0.0.1:* http://localhost:*; script-src 'self' 'unsafe-inline' file: blob:; style-src 'self' 'unsafe-inline' file:; font-src 'self' file: data:; img-src 'self' file: data: blob:; connect-src 'self' http://127.0.0.1:* http://localhost:*; object-src 'none'; frame-src 'none'; base-uri 'self'; form-action 'none';
  ```
* **Offline Vendor Assets:** All mathematical engines (KaTeX) and WebGL visualization libraries (Plotly) are bundled locally in `src/vendor/` with zero runtime CDN dependencies.
* **Cross-Site Scripting (XSS) Sanitization:** All user prompts and model responses are rigorously entity-encoded before rendering to prevent script injection or DOM hijacking.
* **Strict Navigation Policy:** The WebKitGTK / Edge / Cocoa runtime rejects any arbitrary external navigation inside the application window frame.

---

## 2. Threat Model & Sandboxing

| Layer | Threat Vector | Mitigation Strategy |
| :--- | :--- | :--- |
| **Network Egress** | Unauthorized token / prompt exfiltration | Hard CSP blocking all non-loopback network requests (`connect-src 'self' http://127.0.0.1:* http://localhost:*`). Hyperlink auditing and DNS prefetching disabled. |
| **Model Output** | Indirect prompt injection executing malicious scripts | Strict HTML entity escaping in the Markdown tokenizer before KaTeX rendering. |
| **File System Access** | Path traversal or unauthorized reading | WebKit restricted navigation policy; webview cannot be directed to arbitrary local file paths outside application scope. |
| **Binary Tampering** | Supply chain corruption of release packages | Cryptographic SHA-256 hashes (`SHA256SUMS`) generated and verified for every release. |

---

## 3. Cryptographic Verification of Releases

Every release asset is accompanied by an authoritative `SHA256SUMS` file. Research teams can verify asset integrity prior to internal distribution:

```bash
# Verify downloaded release packages against checksums
sha256sum --check SHA256SUMS
```

---

## 4. Reporting Security Vulnerabilities

We take security issues with extreme seriousness. If you identify a potential vulnerability:

1. **Do NOT open a public GitHub issue.**
2. Send an email report to: `support@experimentlab.in`.
3. Include:
   - Detailed proof of concept (PoC).
   - Affected platform (Linux, Windows, or macOS).
   - Expected impact and remediation suggestions.
4. We aim to acknowledge reports within 24 hours and issue a patched release within 72 hours.
