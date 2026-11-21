"""
Vigyan Pro Workstation — Local Sovereign Bridge Server (v5.0.8)
Split from launch_desktop.py: the token-guarded localhost HTTP bridge serving
the UI, chat streaming, model downloads, settings, and signed derivation receipts.
"""

import os
import re
import io
import sys
import json
import math
import ast
import time
import hmac
import threading
import logging
import urllib.request
import urllib.parse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any, Optional

logger = logging.getLogger("vigyan.desktop")

import runtime
from runtime import _SESSION_TOKEN
from vigyan_hardware import (
    _ACTIVE_COMPUTE_MODE,
    _STATIC_HW_CACHE,
    _discover_static_hardware,
    compute_hybrid_allocation,
    get_current_ram_percent,
    get_system_telemetry,
    RAMGovernor,
)
from stem_engine import _SYMPY_ENGINE, enrich_stem_query, evaluate_plot
from model_store import (
    ALLOWED_SOVEREIGN_MODELS,
    MODELS_CATALOG,
    ModelDownloadManager,
    _DOWNLOAD_MGR,
    get_hf_auth_token,
    get_models_catalog,
    get_platform_model_dirs,
    load_user_config,
    save_user_config,
    get_storage_stats,
)
from chat_stream import compress_conversation_history, select_cascade_model


# Structural chat tokens that must never reach the UI (raw special-token leakage).
STRIP_TOKENS = [
'<answer>', '</answer>', '<solution>', '</solution>', '<|im_end|>', '<|im_start|>', '</s>', '</sstream>'
]

def strip_tokens(text: str) -> str:
    for tok in STRIP_TOKENS:
        text = text.replace(tok, "")
    return text




# ==============================================================================
# 3.3 EMBEDDED LOCAL SOVEREIGN AGENT & NEURO-SYMBOLIC BRIDGE (PORT 8085)
# ==============================================================================
class _NeuroSymbolicHTTPHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass  # Keep console clean

    def _check_auth(self) -> bool:
        import hmac
        token = self.headers.get("X-Vigyan-Token", "")
        if not token:
            auth = self.headers.get("Authorization", "")
            if auth.startswith("Bearer "):
                token = auth[7:].strip()
        if not token and "?" in self.path:
            from urllib.parse import parse_qs, urlparse
            qs = parse_qs(urlparse(self.path).query)
            token = qs.get("token", [""])[0]
        return bool(token and hmac.compare_digest(token, _SESSION_TOKEN))

    def _send_cors(self, status=200, content_type="application/json"):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        origin = self.headers.get("Origin", "")
        if origin.startswith("http://127.0.0.1:") or origin.startswith("http://localhost:") or not origin:
            self.send_header("Access-Control-Allow-Origin", origin if origin else "http://127.0.0.1")
            self.send_header("Access-Control-Allow-Credentials", "true")
        else:
            self.send_header("Access-Control-Allow-Origin", "http://127.0.0.1")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Vigyan-Token")
        self.end_headers()

    def do_OPTIONS(self):
        self._send_cors(200)

    def do_GET(self):
        if self.path.startswith("/health"):
            tel = get_system_telemetry()
            payload = dict(tel)
            payload.update({
                "status": "online",
                "agent": "Vigyan-Sovereign-Neuro-Symbolic-Bridge",
                "llama_server": runtime.LLAMA_SUPERVISOR.is_healthy(),
                "sympy": _SYMPY_ENGINE is not None,
                "kuzudb": True,
                "ram_governor": {"active": True, "threshold_pct": 88.0},
                "telemetry": tel,
            })
            self._send_cors(200)
            self.wfile.write(json.dumps(payload).encode("utf-8"))
            return

        # Enforce session token on all internal API endpoints
        if self.path.startswith("/api/"):
            if not self._check_auth():
                self._send_cors(403)
                self.wfile.write(b'{"error":"Forbidden: Invalid or missing X-Vigyan-Token"}')
                return

        if self.path.startswith("/api/models/catalog") or self.path == "/api/models" or self.path.startswith("/api/models?"):
            force = ("refresh=1" in self.path or "refresh=true" in self.path)
            payload = get_models_catalog(force_refresh=force)
            self._send_cors(200)
            self.wfile.write(json.dumps(payload).encode("utf-8"))
            return

        if self.path.startswith("/api/models/download/status") or self.path.startswith("/api/models/downloads"):
            payload = _DOWNLOAD_MGR.get_status()
            self._send_cors(200)
            self.wfile.write(json.dumps(payload).encode("utf-8"))
            return

        if self.path.startswith("/api/receipt/download"):
            from urllib.parse import urlparse, parse_qs
            qs = parse_qs(urlparse(self.path).query)
            file_path = (qs.get("file_path", [""])[0] or "").strip()
            receipts_root = os.path.realpath(os.path.expanduser("~/.vigyan/receipts"))
            real = os.path.realpath(file_path) if file_path else ""
            if not real or not (real == receipts_root or real.startswith(receipts_root + os.sep)) or not os.path.isfile(real):
                self._send_cors(403)
                self.wfile.write(b'{"error":"Forbidden: receipt path outside ~/.vigyan/receipts"}')
                return
            self._send_cors(200, content_type="application/json")
            with open(real, "rb") as rf:
                self.wfile.write(rf.read())
            return

        if self.path.startswith("/api/receipt/export-pdf"):
            from urllib.parse import urlparse, parse_qs
            qs = parse_qs(urlparse(self.path).query)
            file_path = (qs.get("file_path", [""])[0] or "").strip()
            receipts_root = os.path.realpath(os.path.expanduser("~/.vigyan/receipts"))
            real = os.path.realpath(file_path) if file_path else ""
            if not real or not (real == receipts_root or real.startswith(receipts_root + os.sep)) or not os.path.isfile(real):
                self._send_cors(403)
                self.wfile.write(b'{"error":"Forbidden: receipt path outside ~/.vigyan/receipts"}')
                return
            try:
                with open(real, "r", encoding="utf-8") as rf:
                    receipt = json.load(rf)
            except Exception:
                self._send_cors(400)
                self.wfile.write(b'{"error":"Receipt file is not valid JSON"}')
                return
            from receipt_pdf import receipt_to_pdf, pdf_suggested_filename
            try:
                pdf_bytes = receipt_to_pdf(receipt, source_path=real)
            except Exception as pdf_err:
                self._send_cors(500)
                self.wfile.write(json.dumps({"error": f"PDF generation failed: {pdf_err}"}).encode("utf-8"))
                return
            self.send_response(200)
            self.send_header("Content-Type", "application/pdf")
            self.send_header("Content-Disposition", f'attachment; filename="{pdf_suggested_filename(receipt)}"')
            self.send_header("Content-Length", str(len(pdf_bytes)))
            self.send_header("Access-Control-Allow-Origin", self.headers.get("Origin", "") or "http://127.0.0.1")
            self.end_headers()
            self.wfile.write(pdf_bytes)
            return

        if self.path == "/api/config":
            cfg = load_user_config()
            self._send_cors(200)
            self.wfile.write(json.dumps(cfg).encode("utf-8"))
            return

        if self.path.startswith("/api/settings"):
            cfg = load_user_config()
            cfg["max_cpu_threads"] = os.cpu_count() or 4
            cfg["hardware"] = _STATIC_HW_CACHE or _discover_static_hardware()
            self._send_cors(200)
            self.wfile.write(json.dumps(cfg).encode("utf-8"))
            return

        if self.path.startswith("/api/storage"):
            stats = get_storage_stats()
            self._send_cors(200)
            self.wfile.write(json.dumps(stats).encode("utf-8"))
            return
        else:
            # Universal cross-platform static file serving (dist/ priority then src/)
            clean_path = self.path.split("?")[0]
            base_dir = os.path.dirname(os.path.abspath(__file__))
            dist_dir = os.path.join(base_dir, "dist")
            if clean_path in ("/", "/index.html", "/chat"):
                target_dist = os.path.join(dist_dir, "index.html")
                target_file = target_dist if os.path.isfile(target_dist) else os.path.join(base_dir, "index.html")
                if os.path.isfile(target_file):
                    self._send_cors(200, content_type="text/html; charset=utf-8")
                    with open(target_file, "rb") as f:
                        html_bytes = f.read()
                    token_script = f"""<script>
window.VIGYAN_TOKEN = '{_SESSION_TOKEN}';
window.AGENT_HOST = 'http://127.0.0.1:{self.server.server_port}';
</script>""".encode("utf-8")
                    if b"<head>" in html_bytes:
                        html_bytes = html_bytes.replace(b"<head>", b"<head>\n" + token_script, 1)
                    elif b"<html" in html_bytes:
                        html_bytes = token_script + html_bytes
                    self.wfile.write(html_bytes)
                    return
            elif clean_path.startswith(("/vendor/", "/assets/")):
                rel = clean_path.lstrip("/")
                target_dist = os.path.join(dist_dir, rel)
                target_file = target_dist if os.path.isfile(target_dist) else os.path.join(base_dir, rel)
                norm_target = os.path.realpath(target_file)
                if not (norm_target.startswith(os.path.realpath(dist_dir)) or norm_target.startswith(os.path.realpath(base_dir))):
                    self._send_cors(403)
                    self.wfile.write(b'{"error":"Forbidden: Path traversal blocked"}')
                    return
                if os.path.isfile(target_file):
                    ctype = "application/octet-stream"
                    if clean_path.endswith(".js"):
                        ctype = "application/javascript"
                    elif clean_path.endswith(".css"):
                        ctype = "text/css"
                    elif clean_path.endswith(".woff2"):
                        ctype = "font/woff2"
                    elif clean_path.endswith(".png"):
                        ctype = "image/png"
                    elif clean_path.endswith((".jpg", ".jpeg")):
                        ctype = "image/jpeg"
                    elif clean_path.endswith(".svg"):
                        ctype = "image/svg+xml"
                    self._send_cors(200, content_type=ctype)
                    with open(target_file, "rb") as f:
                        self.wfile.write(f.read())
                    return
            self._send_cors(404)
            self.wfile.write(b'{"error":"not found"}')

    def do_POST(self):
        # Enforce session token on all internal API endpoints
        if self.path.startswith("/api/"):
            if not self._check_auth():
                self._send_cors(403)
                self.wfile.write(b'{"error":"Forbidden: Invalid or missing X-Vigyan-Token"}')
                return

        # DoS Protection: Limit payload length to 5 MB
        length = int(self.headers.get("Content-Length", "0"))
        if length > 5 * 1024 * 1024:
            self._send_cors(413)
            self.wfile.write(b'{"error":"Payload Too Large: maximum allowed body size is 5 MB"}')
            return
        raw = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"
        try:
            body = json.loads(raw)
        except Exception:
            body = {}

        if self.path == "/api/config":
            updated = save_user_config(body)
            self._send_cors(200)
            self.wfile.write(json.dumps({"success": True, "config": updated}).encode("utf-8"))
            return

        if self.path == "/api/receipt/verify":
            file_path = (body.get("file_path") or "").strip()
            if not file_path or not os.path.isfile(file_path):
                self._send_cors(404)
                self.wfile.write(json.dumps({"valid": False, "reason": "file not found"}).encode("utf-8"))
                return
            try:
                with open(file_path, "r", encoding="utf-8") as rf:
                    receipt = json.load(rf)
                import derivation_receipt as _dr
                valid, reason, details = _dr.verify_derivation_receipt(receipt)
            except Exception as v_err:
                self._send_cors(400)
                self.wfile.write(json.dumps({"valid": False, "reason": str(v_err)}).encode("utf-8"))
                return
            self._send_cors(200)
            self.wfile.write(json.dumps({"valid": valid, "reason": reason, "details": details}).encode("utf-8"))
            return

        if self.path.startswith("/api/settings"):
            updated = save_user_config(body)
            if "cpu_threads" in body and hasattr(runtime.LLAMA_SUPERVISOR, "_threads"):
                runtime.LLAMA_SUPERVISOR._threads = body["cpu_threads"]
            if "context_window" in body and hasattr(runtime.LLAMA_SUPERVISOR, "_ctx_size"):
                runtime.LLAMA_SUPERVISOR._ctx_size = body["context_window"]
            self._send_cors(200)
            self.wfile.write(json.dumps({"success": True, "settings": updated}).encode("utf-8"))
            return

        if self.path == "/api/models/download/pause" or self.path.startswith("/api/models/download/pause"):
            tag = body.get("tag") or body.get("filename")
            ok = _DOWNLOAD_MGR.pause_download(tag) if tag else False
            self._send_cors(200 if ok else 400)
            self.wfile.write(json.dumps({"success": ok, "tag": tag}).encode("utf-8"))
            return

        if self.path == "/api/models/download/resume" or self.path.startswith("/api/models/download/resume"):
            tag = body.get("tag") or body.get("filename")
            ok = _DOWNLOAD_MGR.resume_download(tag) if tag else False
            self._send_cors(200 if ok else 400)
            self.wfile.write(json.dumps({"success": ok, "tag": tag}).encode("utf-8"))
            return

        if self.path == "/api/models/download/cancel" or self.path.startswith("/api/models/download/cancel"):
            tag = body.get("tag") or body.get("filename")
            remove_part = body.get("remove_part", True)
            ok = _DOWNLOAD_MGR.cancel_download(tag, remove_part=remove_part) if tag else False
            self._send_cors(200 if ok else 400)
            self.wfile.write(json.dumps({"success": ok, "tag": tag}).encode("utf-8"))
            return

        if self.path == "/api/models/catalog/refresh" or self.path.startswith("/api/models/catalog/refresh"):
            payload = get_models_catalog(force_refresh=True)
            self._send_cors(200)
            self.wfile.write(json.dumps(payload).encode("utf-8"))
            return

        if self.path.startswith("/api/models/download"):
            raw_filename = body.get("filename") or body.get("name")
            if not raw_filename or not isinstance(raw_filename, str):
                self._send_cors(400)
                self.wfile.write(json.dumps({"success": False, "error": "Invalid model filename"}).encode("utf-8"))
                return
            filename = os.path.basename(raw_filename.strip())
            target_item = None
            catalog = get_models_catalog()
            for m in catalog.get("models", []):
                if (m.get("filename") == filename or m.get("id") == filename or 
                    m.get("name") == filename or m.get("tag") == filename):
                    target_item = m
                    break
            if not target_item and filename in MODELS_CATALOG:
                target_item = MODELS_CATALOG[filename]
            if not target_item:
                target_item = {
                    "filename": filename,
                    "name": filename,
                    "hf_url": body.get("hf_url") or f"https://huggingface.co/Experimentlab/Vigyan-Models-GGUF/resolve/main/{filename}?download=true",
                    "size_bytes": body.get("size_bytes", 1_400_000_000)
                }
            res = _DOWNLOAD_MGR.start_download(target_item)
            self._send_cors(200)
            self.wfile.write(json.dumps(res).encode("utf-8"))
            return

        if self.path.startswith("/api/models/swap"):
            raw_filename = body.get("filename")
            if not raw_filename or not isinstance(raw_filename, str):
                self._send_cors(400)
                self.wfile.write(json.dumps({"success": False, "error": "Invalid model filename"}).encode("utf-8"))
                return
            filename = os.path.basename(raw_filename.strip())
            models_dir = os.path.expanduser("~/.vigyan/models")
            target_path = os.path.join(models_dir, filename) if filename else ""
            if not os.path.isfile(target_path):
                vl4b_path = os.path.join(models_dir, "vl4b", filename) if filename else ""
                if os.path.isfile(vl4b_path):
                    target_path = vl4b_path

            if not os.path.isfile(target_path):
                self._send_cors(404)
                self.wfile.write(json.dumps({"success": False, "error": f"Model not found on disk: {filename}"}).encode("utf-8"))
                return

            # Pre-flight RAM safety check (design-doc governor): estimated
            # requirement must fit within 85% of available memory, else block.
            catalog_ctx_size = None
            try:
                from llama_supervisor import get_available_memory_gb
                catalog_entry = None
                try:
                    from model_store import MODELS_CATALOG
                    catalog_entry = MODELS_CATALOG.get(filename)
                except Exception:
                    catalog_entry = None
                model_sz_gb = os.path.getsize(target_path) / (1024 ** 3)
                req_ram = float(catalog_entry.get("ram_required_gb")) if catalog_entry and catalog_entry.get("ram_required_gb") else model_sz_gb * 1.5
                if catalog_entry and catalog_entry.get("ctx_size"):
                    catalog_ctx_size = int(catalog_entry["ctx_size"])
                avail_gb = get_available_memory_gb()
                if req_ram > avail_gb * 0.85:
                    self._send_cors(422)
                    self.wfile.write(json.dumps({
                        "success": False,
                        "error": f"Activation prevented to protect your PC from freezing: {filename} requires ~{req_ram:.1f} GB RAM, but only {avail_gb:.1f} GB is currently available."
                    }).encode("utf-8"))
                    return
            except Exception:
                pass

            prev_model = runtime.LLAMA_SUPERVISOR.model_path
            try:
                ok = runtime.LLAMA_SUPERVISOR.swap_model(target_path, ctx_size=catalog_ctx_size)
                if not ok:
                    raise RuntimeError("Memory Sentinel blocked activation: not enough available RAM.")
                self._send_cors(200)
                self.wfile.write(json.dumps({"success": True, "active_model": filename}).encode("utf-8"))
            except Exception as exc:
                logger.error("Failed to swap model to %s: %s. Reverting to previous model...", filename, exc)
                reverted = False
                if prev_model and os.path.isfile(prev_model) and prev_model != target_path:
                    try:
                        runtime.LLAMA_SUPERVISOR.swap_model(prev_model)
                        reverted = True
                    except Exception:
                        pass
                self._send_cors(500)
                err_msg = f"Failed to activate {filename}: {exc}"
                if reverted:
                    err_msg += f" (Reverted to {os.path.basename(prev_model)})"
                self.wfile.write(json.dumps({
                    "success": False,
                    "error": err_msg,
                    "reverted_to": os.path.basename(prev_model) if reverted else None
                }).encode("utf-8"))
            return

        if self.path.startswith("/api/models/purge"):
            try:
                models_dir = os.path.expanduser("~/.vigyan/models")
                reclaimed_bytes = 0
                
                # Stop supervisor
                runtime.LLAMA_SUPERVISOR.stop()
                time.sleep(0.3)

                if os.path.isdir(models_dir):
                    for root, _, files in os.walk(models_dir):
                        for f in files:
                            if f.endswith(".gguf") or f.endswith(".part"):
                                fp = os.path.join(root, f)
                                try:
                                    sz = os.path.getsize(fp)
                                    os.remove(fp)
                                    reclaimed_bytes += sz
                                except Exception:
                                    pass

                reclaimed_gb = round(reclaimed_bytes / (1024 ** 3), 2)
                self._send_cors(200)
                self.wfile.write(json.dumps({
                    "success": True,
                    "reclaimed_bytes": reclaimed_bytes,
                    "reclaimed_formatted": f"{reclaimed_gb} GB"
                }).encode("utf-8"))
            except Exception as exc:
                self._send_cors(500)
                self.wfile.write(json.dumps({"success": False, "error": str(exc)}).encode("utf-8"))
            return

        if self.path.startswith("/api/models/delete"):
            raw_filename = body.get("filename")
            if not raw_filename or not isinstance(raw_filename, str):
                self._send_cors(400)
                self.wfile.write(json.dumps({"success": False, "error": "Invalid model filename"}).encode("utf-8"))
                return
            filename = os.path.basename(raw_filename.strip())
            models_dir = os.path.expanduser("~/.vigyan/models")
            target_path = os.path.join(models_dir, filename) if filename else ""
            if not os.path.isfile(target_path):
                vl4b_path = os.path.join(models_dir, "vl4b", filename) if filename else ""
                if os.path.isfile(vl4b_path):
                    target_path = vl4b_path

            part_path = target_path + ".part" if target_path else ""

            if not os.path.isfile(target_path) and not (part_path and os.path.isfile(part_path)):
                self._send_cors(404)
                self.wfile.write(json.dumps({"success": False, "error": f"Model file not found on disk: {filename}"}).encode("utf-8"))
                return

            try:
                # Cancel any active download in manager
                _DOWNLOAD_MGR.cancel_download(filename, remove_part=True)

                active_model = runtime.LLAMA_SUPERVISOR.model_path
                is_active = active_model and (os.path.basename(active_model) == os.path.basename(target_path))
                if is_active:
                    runtime.LLAMA_SUPERVISOR.stop()
                    time.sleep(0.3)

                reclaimed_bytes = 0
                if os.path.isfile(target_path):
                    reclaimed_bytes += os.path.getsize(target_path)
                    for _ in range(5):
                        try:
                            os.remove(target_path)
                            break
                        except Exception:
                            time.sleep(0.2)

                if part_path and os.path.isfile(part_path):
                    reclaimed_bytes += os.path.getsize(part_path)
                    for _ in range(5):
                        try:
                            os.remove(part_path)
                            break
                        except Exception:
                            time.sleep(0.2)

                next_active = None
                if is_active:
                    catalog = get_models_catalog()
                    installed = [
                        m for m in catalog.get("models", [])
                        if m.get("is_installed") and m.get("filename") != filename
                    ]
                    if installed:
                        installed.sort(key=lambda m: (
                            0 if "e4b" in m.get("filename", "") or "4b" in m.get("filename", "") else
                            1 if "7b" in m.get("filename", "") else
                            2 if "12b" in m.get("filename", "") else 3
                        ))
                        next_model_file = os.path.join(models_dir, installed[0]["filename"])
                        if os.path.isfile(next_model_file):
                            try:
                                if runtime.LLAMA_SUPERVISOR.swap_model(next_model_file):
                                    next_active = installed[0]["filename"]
                                else:
                                    logger.warning("Failover swap blocked by Memory Sentinel for %s", next_model_file)
                            except Exception as swap_err:
                                logger.warning("Failover swap failed: %s", swap_err)

                self._send_cors(200)
                self.wfile.write(json.dumps({
                    "success": True,
                    "reclaimed_bytes": reclaimed_bytes,
                    "reclaimed_formatted": f"{round(reclaimed_bytes / (1024**3), 2)} GB",
                    "next_active": next_active
                }).encode("utf-8"))
            except Exception as exc:
                self._send_cors(500)
                self.wfile.write(json.dumps({"success": False, "error": str(exc)}).encode("utf-8"))
            return

        if self.path.startswith("/api/ingest/file"):
            import ingest_engine
            filename = body.get("filename", "document.txt")
            image_b64 = body.get("image_base64", "")
            pdf_b64 = body.get("pdf_base64", "")
            content = body.get("content", "")

            raw_text = content
            if image_b64:
                try:
                    img_bytes = base64.b64decode(image_b64)
                    raw_text = ingest_engine.extract_text_from_image_bytes(img_bytes)
                except Exception:
                    raw_text = ""
            elif pdf_b64:
                try:
                    pdf_bytes = base64.b64decode(pdf_b64)
                    raw_text = ingest_engine.extract_text_from_pdf_bytes(pdf_bytes)
                except Exception:
                    raw_text = ""

            res = ingest_engine.analyze_ingested_content(filename, raw_text)
            self._send_cors(200)
            self.wfile.write(json.dumps(res).encode("utf-8"))
            return

        if self.path.startswith("/api/chat") or self.path.startswith("/api/agent/stream"):
            telemetry = get_system_telemetry()
            user_query = (body.get("query") or body.get("message") or "").strip()
            requested_model = body.get("model") or "auto"

            attachment = body.get("attachment")
            images = body.get("images") or []
            has_image = False
            image_data_uri = None

            if isinstance(attachment, dict) and attachment.get("data"):
                has_image = True
                raw_data = str(attachment["data"])
                if raw_data.startswith("data:image/"):
                    image_data_uri = raw_data
                else:
                    mime = attachment.get("type") or "image/jpeg"
                    image_data_uri = f"data:{mime};base64,{raw_data}"
            elif images and isinstance(images, list) and len(images) > 0:
                has_image = True
                raw_img = str(images[0])
                if raw_img.startswith("data:image/"):
                    image_data_uri = raw_img
                else:
                    image_data_uri = f"data:image/jpeg;base64,{raw_img}"

            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream")
            self.send_header("Cache-Control", "no-cache, no-transform")
            self.send_header("Connection", "keep-alive")
            self.send_header("X-Accel-Buffering", "no")
            origin = self.headers.get("Origin", "")
            if origin.startswith("http://127.0.0.1:") or origin.startswith("http://localhost:") or origin == "null" or not origin:
                self.send_header("Access-Control-Allow-Origin", origin if origin else "http://127.0.0.1")
                self.send_header("Access-Control-Allow-Credentials", "true")
            else:
                self.send_header("Access-Control-Allow-Origin", "http://127.0.0.1")
            self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Vigyan-Token")
            self.end_headers()

            enrichment = enrich_stem_query(user_query)

            stream_lock = threading.Lock()
            client_connected = [True]

            def _emit(event: str, data_obj: Any) -> bool:
                if not client_connected[0]:
                    return False
                chunk = f"event: {event}\ndata: {json.dumps(data_obj)}\n\n"
                with stream_lock:
                    try:
                        self.wfile.write(chunk.encode("utf-8"))
                        self.wfile.flush()
                        return True
                    except (BrokenPipeError, ConnectionResetError, IOError):
                        client_connected[0] = False
                        return False
                    except Exception:
                        return False

            # Grounding and axioms
            if enrichment.get("sympy"):
                s = enrichment["sympy"]
                _emit("sympy", f"$${s.get('latex', s.get('result'))}$$")
                _emit("think", f"SymPy AST Verified: {s.get('expression')} => {s.get('result')}\n")
                _emit("tool_result", {
                    "tool": "sympy_eval",
                    "success": True,
                    "expression": s.get("expression"),
                    "result": s.get("result"),
                    "latex": s.get("latex"),
                    "numeric_approx": s.get("numeric_approx")
                })
            if enrichment.get("graph_axioms"):
                cites = [f"[{a['domain']}: {a['law']}] {a['equation']}" for a in enrichment["graph_axioms"]]
                _emit("memory", "<br>• " + "<br>• ".join(cites))

            sys_prompt = (
                "You are Vigyan AI, a sovereign STEM, math, and physics intelligence system architected by Shreyansh Singh. "
                "Solve problems with mathematical precision, concise explanations, and clean LaTeX ($$...$$). Be direct, rigorous, and professional. "
                "When requested to verify mathematical plots and formulas, emit structured <tool_call> JSON specifications."
            )
            if enrichment.get("sympy"):
                s = enrichment["sympy"]
                sys_prompt += f"\n[SymPy Verified Grounding]: {s.get('expression')} = {s.get('result')}"

            # Sovereign Offline Engine with RAM Governor
            cascade = select_cascade_model(requested_model, user_query, has_image=False)
            active_model = cascade["model"]
            _emit("cascade_tier", cascade)
            if cascade.get("downgraded"):
                _emit("tier_downgrade", cascade)
                _emit("think", f"[RAM Guard]: System routed to {active_model} Sovereign Engine.\n")

            # Check if any model is installed or active
            if not runtime.LLAMA_SUPERVISOR.model_path:
                _emit("token", "No local engine is currently active.\n\nPlease open the **Model Vault** (click 'Intelligence Models') to download **4B Daily**, **7B Production**, or **12B Advanced**.\n")
                _emit("done", {})
                return

            try:
                user_cfg = load_user_config()
                user_ctx = None
                try:
                    if body.get("num_ctx"):
                        user_ctx = int(body.get("num_ctx"))
                    elif body.get("options", {}).get("num_ctx"):
                        user_ctx = int(body.get("options", {}).get("num_ctx"))
                except Exception:
                    user_ctx = None

                # RAM-Safe Dynamic Context Budget Clamping
                target_ctx = user_ctx or user_cfg.get("context_window", 2048)
                avail_ram = telemetry.get("ram_avail_gb", 4.0)
                if target_ctx > 8192 and avail_ram < 5.0:
                    target_ctx = 8192
                if target_ctx > 4096 and avail_ram < 2.0:
                    target_ctx = 4096
                if target_ctx > 2048 and avail_ram < 1.0:
                    target_ctx = 2048

                if has_image and image_data_uri:
                    user_msg_content: Any = [
                        {"type": "text", "text": user_query or "Analyze this image in detail and explain the components, equations, or structures."},
                        {"type": "image_url", "image_url": {"url": image_data_uri}}
                    ]
                else:
                    user_msg_content = user_query

                raw_messages = body.get("messages") or []
                if raw_messages:
                    if has_image and image_data_uri:
                        if raw_messages[-1].get("role") == "user":
                            raw_messages[-1]["content"] = user_msg_content
                        else:
                            raw_messages.append({"role": "user", "content": user_msg_content})
                    full_msgs = [{"role": "system", "content": sys_prompt}] + raw_messages
                    model_messages = compress_conversation_history(full_msgs, max_tokens_est=target_ctx)
                else:
                    model_messages = [
                        {"role": "system", "content": sys_prompt},
                        {"role": "user", "content": user_msg_content},
                    ]
                user_temp = body.get("temperature")
                if user_temp is None:
                    user_temp = body.get("options", {}).get("temperature")
                if user_temp is None:
                    user_temp = user_cfg.get("temperature", 0.0)
                try:
                    user_temp = max(0.0, min(2.0, float(user_temp)))
                except Exception:
                    user_temp = 0.0

                # Verified stop sequences and generation parameters
                stop_sequences = [
                    "<|im_start|>",
                    "<|im_end|>",
                    "<|endoftext|>",
                    "</sstream>",
                    "</solution>",
                    "User:",
                    "\n\nUser",
                    "Human:",
                    '<end_of_turn>'
                ]
                model_stops = (MODELS_CATALOG.get(active_model or "", {}) or {}).get("stop") or []
                for ms in model_stops:
                    if ms not in stop_sequences:
                        stop_sequences.append(ms)

                is_active_vl = has_image or "vl" in os.path.basename(runtime.LLAMA_SUPERVISOR.model_path or "").lower()
                openai_payload = {
                    "model": active_model or "gemma:4b",
                    "messages": model_messages,
                    "temperature": user_temp,
                    "top_p": 0.95,
                    "max_tokens": min(target_ctx, 4096),
                    "stream": True,
                    "stop": stop_sequences,
                    "repeat_penalty": 1.15,
                    "repeat_last_n": 64,
                }

                # Keep-alive silent heartbeat thread to prevent socket drop without user-facing noise
                _emit("status", {"type": "thinking"})
                hb_stop = threading.Event()
                def _heartbeat_worker():
                    step = 0
                    while not hb_stop.is_set():
                        time.sleep(1.5)
                        if hb_stop.is_set():
                            break
                        step += 1
                        _emit("heartbeat", {"type": "ping", "step": step})

                hb_t = threading.Thread(target=_heartbeat_worker, daemon=True)
                hb_t.start()

                governor_tripped = [False]
                def _on_ram_trip(pct):
                    governor_tripped[0] = True
                    _emit("ram_governor_trip", {
                        "ram_percent": pct,
                        "threshold": 92.0,
                        "evicted_model": active_model,
                    })
                    _emit("token", f"\n\n**[RAM Safety Guard]**: System memory reached {pct:.1f}%. Generation was safely stopped to protect your PC from freezing.")

                governor = RAMGovernor(threshold_pct=92.0, interval_sec=0.1)
                governor.start(_on_ram_trip, active_model)

                accumulated_text = ""
                streamed_from_llama = False
                last_llama_exc: Optional[str] = None

                # Ensure embedded llama-server is ready before attempting stream
                if not runtime.LLAMA_SUPERVISOR.is_healthy():
                    runtime.LLAMA_SUPERVISOR.start()
                    runtime.LLAMA_SUPERVISOR.wait_until_ready(timeout=8.0)

                # Primary routing: Embedded llama-server OpenAI endpoint (port 8086)
                try:
                    ls_req = urllib.request.Request(
                        "http://127.0.0.1:8086/v1/chat/completions",
                        headers={"Content-Type": "application/json"},
                        data=json.dumps(openai_payload).encode("utf-8"),
                    )
                    with urllib.request.urlopen(ls_req, timeout=180) as resp:
                        hb_stop.set()
                        _emit("status", {"type": "ready", "message": "Inference stream active"})
                        streamed_from_llama = True
                        for raw_line in resp:
                            if governor_tripped[0] or not client_connected[0]:
                                break
                            line_s = raw_line.decode("utf-8", errors="replace").strip()
                            if not line_s or line_s.startswith(":"):
                                continue
                            if line_s.startswith("data: "):
                                data_part = line_s[6:].strip()
                                if data_part == "[DONE]":
                                    break
                                try:
                                    chunk = json.loads(data_part)
                                    choices = chunk.get("choices", [])
                                    if choices:
                                        delta = choices[0].get("delta", {})
                                        tok = delta.get("content", "")
                                        if tok:
                                            ended = ("</sstream>" in tok or "</solution>" in tok)
                                            clean_tok = strip_tokens(tok)
                                            if clean_tok.strip():
                                                accumulated_text += clean_tok
                                                _emit("token", clean_tok)
                                            if ended:
                                                break
                                except Exception:
                                    continue
                except Exception as ls_exc:
                    last_llama_exc = str(ls_exc)
                    print(f"[WARN] llama-server stream unavailable: {ls_exc}; trying Ollama fallback", file=sys.stderr)

                if not streamed_from_llama and not governor_tripped[0]:
                    # Fallback to local Ollama daemon if available
                    try:
                        ollama_payload = {
                            "model": active_model,
                            "messages": model_messages,
                            "options": {
                                "num_gpu": telemetry.get("gpu", {}).get("num_gpu", 0),
                                "num_thread": user_cfg.get("cpu_threads", 4),
                                "num_ctx": target_ctx,
                                "num_batch": 256,
                                "num_predict": min(target_ctx, 4096),
                                "repeat_penalty": 1.15,
                                "repeat_last_n": 64,
                                "temperature": user_temp,
                                "stop": stop_sequences,
                            },
                            "stream": True,
                        }
                        req = urllib.request.Request(
                            "http://127.0.0.1:11434/api/chat",
                            headers={"Content-Type": "application/json"},
                            data=json.dumps(ollama_payload).encode("utf-8"),
                        )
                        with urllib.request.urlopen(req, timeout=180) as resp:
                            hb_stop.set()
                            _emit("status", {"type": "ready", "message": "Inference stream active (fallback)"})
                            for line in resp:
                                if governor_tripped[0] or not client_connected[0]:
                                    break
                                line_s = line.decode("utf-8").strip()
                                if not line_s:
                                    continue
                                chunk = json.loads(line_s)
                                tok = chunk.get("message", {}).get("content", "")
                                if tok:
                                    ended = ("</sstream>" in tok or "</solution>" in tok)
                                    clean_tok = strip_tokens(tok)
                                    if clean_tok.strip():
                                        accumulated_text += clean_tok
                                        _emit("token", clean_tok)
                                    if ended:
                                        break
                    except Exception as ollama_exc:
                        hb_stop.set()
                        if enrichment.get("sympy"):
                            s = enrichment["sympy"]
                            fallback = (
                                f"### Exact Closed-Form Symbolic Solution\n\n"
                                f"**Evaluated AST:** `{s.get('expression')}`\n\n"
                                f"$$\\mathbf{{{s.get('latex')}}}$$\n\n"
                                f"**Numerical Approximation:** `{s.get('numeric_approx')}`\n"
                            )
                            _emit("token", fallback)
                        elif enrichment.get("graph_axioms"):
                            ax = enrichment["graph_axioms"][0]
                            fallback = (
                                f"### {ax['law']} ({ax['domain']})\n\n"
                                f"$$\\mathbf{{{ax['equation']}}}$$\n\n"
                                f"{ax['axiom']}\n"
                            )
                            _emit("token", fallback)
                        else:
                            _emit("token", f"[Neuro-Symbolic Engine Initializing: {last_llama_exc or 'Inference server starting...'}]")

                governor.stop()
                hb_stop.set()
                self._parse_and_execute_tools(accumulated_text, _emit)

            except Exception as exc:
                if enrichment.get("sympy"):
                    s = enrichment["sympy"]
                    fallback = (
                        f"### Exact Closed-Form Symbolic Solution\n\n"
                        f"**Evaluated AST:** `{s.get('expression')}`\n\n"
                        f"$$\\mathbf{{{s.get('latex')}}}$$\n\n"
                        f"**Numerical Approximation:** `{s.get('numeric_approx')}`\n"
                    )
                    _emit("token", fallback)
                elif enrichment.get("graph_axioms"):
                    ax = enrichment["graph_axioms"][0]
                    fallback = (
                        f"### {ax['law']} ({ax['domain']})\n\n"
                        f"$$\\mathbf{{{ax['equation']}}}$$\n\n"
                        f"{ax['axiom']}\n"
                    )
                    _emit("token", fallback)
                else:
                    _emit("token", f"[Neuro-Symbolic Notice: {exc}]")

            # Derivation Receipt: emit a signed, hash-verifiable artefact only
            # when the deterministic CAS actually produced a verified result.
            # Unverified LLM-only answers get no receipt — that is the point.
            if enrichment.get("sympy"):
                try:
                    import derivation_receipt as _dr
                    s_r = enrichment["sympy"]
                    receipt = _dr.generate_derivation_receipt(
                        question=user_query or "",
                        expression=s_r.get("expression", ""),
                        exact_result=str(s_r.get("result", "")),
                        latex_result=str(s_r.get("latex", "")),
                        numeric_approx=s_r.get("numeric_approx"),
                        op="solve",
                        planner_model=cascade.get("model", active_model or ""),
                    )
                    receipts_dir = os.path.expanduser("~/.vigyan/receipts")
                    try:
                        os.makedirs(receipts_dir, exist_ok=True)
                        sha_prefix = receipt["id"].replace("sha256:", "")[:12]
                        ts = time.strftime("%Y%m%d_%H%M%S")
                        receipt_path = os.path.join(receipts_dir, sha_prefix + "-" + ts + ".rcpt.json")
                        with open(receipt_path, "w", encoding="utf-8") as rf:
                            json.dump(receipt, rf, indent=2)
                        receipt["file"] = receipt_path
                    except OSError as store_err:
                        logger.debug("Receipt not persisted to disk: %s", store_err)
                    wire = dict(receipt)
                    wire.update({
                        "file_path": receipt.get("file", ""),
                        "exact_analytical": receipt.get("derivation", [{}])[0].get("exact_analytical", ""),
                        "residual": receipt.get("verification", {}).get("residual_error", ""),
                        "sympy_version": receipt.get("toolchain", {}).get("sympy", ""),
                        "model_name": receipt.get("planner", {}).get("model", ""),
                    })
                    _emit("receipt_ready", wire)
                except Exception as rec_err:
                    logger.debug("Receipt generation skipped: %s", rec_err)

            _emit("done", {})
            self.close_connection = True
            return

        self._send_cors(404)
        self.wfile.write(b'{"error":"unknown endpoint"}')

    def _parse_and_execute_tools(self, text: str, emit_fn):
        tool_matches = re.findall(r"<tool_call>(.*?)</tool_call>", text, re.DOTALL)
        for t_str in tool_matches:
            try:
                t_data = json.loads(t_str.strip())
                t_name = t_data.get("name")
                t_args = t_data.get("arguments", {})
                if t_name == "sympy_eval":
                    expr = t_args.get("expression", "")
                    if _SYMPY_ENGINE:
                        eval_res = _SYMPY_ENGINE.evaluate_expression(expr)
                        emit_fn("sympy", f"$${eval_res.get('latex', eval_res.get('result'))}$$")
                        emit_fn("tool_result", {
                            "tool": "sympy_eval",
                            "success": True,
                            "expression": expr,
                            "result": eval_res.get("result", ""),
                            "latex": eval_res.get("latex", ""),
                            "numeric": eval_res.get("numeric_approx", "")
                        })
                elif t_name == "plot_function":
                    expr = t_args.get("expression", "x**2")
                    x_min = t_args.get("x_min", -10.0)
                    x_max = t_args.get("x_max", 10.0)
                    pts = t_args.get("points", 200)
                    title = t_args.get("title", "")
                    x_lbl = t_args.get("x_label", "x")
                    y_lbl = t_args.get("y_label", "y")
                    plot_res = evaluate_plot(expr, x_min, x_max, pts, title, x_lbl, y_lbl)
                    emit_fn("tool_result", plot_res)
            except Exception:
                pass
def start_neuro_symbolic_bridge_server(port: int = 8085) -> Optional[int]:
    """Start embedded Neuro-Symbolic HTTP server on port 8085 (hunting up to port+20)."""
    for candidate_port in range(port, port + 20):
        try:
            server = ThreadingHTTPServer(("127.0.0.1", candidate_port), _NeuroSymbolicHTTPHandler)
            t = threading.Thread(target=server.serve_forever, daemon=True)
            t.start()
            return candidate_port
        except OSError:
            continue
    return None
