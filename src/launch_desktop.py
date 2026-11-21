#!/usr/bin/env python3
"""
Vigyan Pro Sovereign Studio - Native Desktop WebKitGTK Application
Pitch-Black Obsidian STEM Studio with Smart Hybrid GPU+CPU Compute Engine,
Embedded Neuro-Symbolic Bridge (SymPy AST + KùzuDB GraphRAG), LaTeX, and WebGL.
Zero Browser Chrome. 100% Native Desktop Window.
"""

import sys
import os
import re
import glob
import math
import ast
import json
import time
import shutil
import signal
import threading
import subprocess
import urllib.request
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("vigyan.desktop")

# Sovereign session security token (ephemeral, single-session only)
import runtime as _rt  # noqa: E402
_SESSION_TOKEN = _rt._SESSION_TOKEN

_BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if _BASE_DIR not in sys.path:
    sys.path.insert(0, _BASE_DIR)
for _cand in [
    os.path.join(_BASE_DIR, "knowledge_graph"),
    _BASE_DIR,
    os.path.expanduser("~/.vigyan/knowledge_graph"),
]:
    if os.path.isdir(_cand) and _cand not in sys.path:
        sys.path.insert(0, _cand)

_py_ver = f"python{sys.version_info.major}.{sys.version_info.minor}"
for _p in (
    glob.glob(os.path.join(_BASE_DIR, "..", ".venv", "lib", _py_ver, "site-packages"))
    + glob.glob(os.path.join(_BASE_DIR, ".venv", "lib", _py_ver, "site-packages"))
    + glob.glob(os.path.expanduser(f"~/.vigyan/venv/lib/{_py_ver}/site-packages"))
    + glob.glob(os.path.expanduser(f"~/.venv-rag/lib/{_py_ver}/site-packages"))
):
    if os.path.isdir(_p) and _p not in sys.path:
        sys.path.insert(0, _p)

# Auto-inject system site-packages and dist-packages so gi (Gtk, WebKit2) is always available even in a venv
for _sys_p in (
    glob.glob(f"/usr/lib*/{_py_ver}/site-packages")
    + glob.glob("/usr/lib*/python3/dist-packages")
    + glob.glob(f"/usr/local/lib*/{_py_ver}/site-packages")
    + glob.glob("/usr/local/lib*/python3/dist-packages")
):
    if os.path.isdir(_sys_p) and _sys_p not in sys.path:
        sys.path.append(_sys_p)

# Linux / Wayland & WebKitGTK display and compositing compatibility
# Modern Linux Wayland desktops (e.g. Ubuntu 24.04, Fedora 40/41) with WebKitGTK 4.1:
# - Avoid crashes from DMA-BUF renderer conflicts on certain Wayland/Mesa drivers
# - Allow graceful GDK backend fallback (wayland,x11,*)
if sys.platform.startswith("linux"):
    if not os.environ.get("XDG_RUNTIME_DIR"):
        _uid_runtime = f"/run/user/{os.getuid()}"
        if os.path.isdir(_uid_runtime):
            os.environ["XDG_RUNTIME_DIR"] = _uid_runtime
    is_wayland = bool(os.environ.get("WAYLAND_DISPLAY") or os.environ.get("XDG_SESSION_TYPE") == "wayland")
    # If GDK_BACKEND is not explicitly set, let GTK negotiate Wayland then X11 fallback safely
    os.environ.setdefault("GDK_BACKEND", "wayland,x11,*")
    # Prevent WebKitGTK DMA-BUF renderer crashes/freezes on Wayland compositors
    if is_wayland:
        os.environ.setdefault("WEBKIT_DISABLE_DMABUF_RENDERER", "1")


from llama_supervisor import LlamaServerSupervisor

# ==============================================================================
# 5. SPLIT-MODULE IMPORTS (v5.0.8 refactor: engine, hardware, models, bridge)
# ==============================================================================
import runtime as _rt
_runtime_token = _rt._SESSION_TOKEN  # re-exported for backward compatibility

from vigyan_hardware import (  # noqa: E402
    _ACTIVE_COMPUTE_MODE,
    _STATIC_HW_CACHE,
    _discover_static_hardware,
    _read_power_state,
    _read_sysfs_int,
    _read_sysfs_str,
    compute_hybrid_allocation,
    get_current_ram_percent,
    get_system_telemetry,
    RAMGovernor,
)
from stem_engine import (  # noqa: E402
    _SYMPY_ENGINE,
    _STEM_GRAPH,
    CURATED_GRAPH_AXIOMS,
    _extract_math_expression,
    enrich_stem_query,
    evaluate_plot,
)
from model_store import (  # noqa: E402
    CONFIG_FILE,
    DEFAULT_CONFIG,
    SOVEREIGN_PRODUCTION_MODELS,
    VERIFIED_EXPERIMENTLAB_MODELS,
    ALLOWED_SOVEREIGN_MODELS,
    MODELS_CATALOG,
    ModelDownloadManager,
    _DOWNLOAD_MGR,
    _build_model_candidates,
    _format_clean_model_name,
    _infer_model_domain,
    _scan_and_cache_hf_repos,
    fetch_dynamic_hf_catalog,
    get_hf_auth_token,
    get_models_catalog,
    get_platform_model_dirs,
    get_storage_stats,
    load_user_config,
    save_user_config,
)
from chat_stream import (  # noqa: E402
    _extract_text_content,
    compress_conversation_history,
    select_cascade_model,
)
from bridge_server import (  # noqa: E402
    _NeuroSymbolicHTTPHandler,
    start_neuro_symbolic_bridge_server,
)


try:
    from version import __version__
except Exception:
    __version__ = "5.0.2"

try:
    import psutil
except ImportError:
    psutil = None




# ==============================================================================
# 3.2.1 SOVEREIGN AGENTIC STEM & SCIENTIFIC COMPUTING TOOLS
# ==============================================================================



# ==============================================================================
# 3.25 USER WORKSTATION PREFERENCES & STORAGE MANAGEMENT
# ==============================================================================



_init_cfg = load_user_config()
LLAMA_SUPERVISOR = LlamaServerSupervisor(
    port=8086,
    threads=_init_cfg.get("cpu_threads"),
    ctx_size=_init_cfg.get("context_window")
)
_rt.LLAMA_SUPERVISOR = LLAMA_SUPERVISOR  # late-bound singleton for split modules


def _ensure_user_desktop_icons():
    """Installs user-level desktop entry and hicolor icon so the Linux taskbar & dock always display the official V logo."""
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        src_icon = os.path.join(base_dir, "..", "assets", "micro_logo_v.png")
        if not os.path.exists(src_icon):
            src_icon = os.path.join(base_dir, "assets", "micro_logo_v.png")
        if not os.path.exists(src_icon):
            return

        icon_dir = os.path.expanduser("~/.local/share/icons/hicolor/256x256/apps")
        os.makedirs(icon_dir, exist_ok=True)
        dest_icon = os.path.join(icon_dir, "vigyan-pro.png")
        if not os.path.exists(dest_icon):
            shutil.copyfile(src_icon, dest_icon)

        apps_dir = os.path.expanduser("~/.local/share/applications")
        os.makedirs(apps_dir, exist_ok=True)
        dest_desktop = os.path.join(apps_dir, "vigyan-pro.desktop")
        
        launch_script = os.path.abspath(os.path.join(base_dir, "..", "launch.sh"))
        desktop_content = f"""[Desktop Entry]
Type=Application
Name=Vigyan Pro
Comment=Sovereign Offline AI Studio & STEM Computational Engine
Exec="{launch_script}"
Icon=vigyan-pro
Terminal=false
Categories=Science;Math;Development;Education;
StartupWMClass=vigyan-pro
"""
        with open(dest_desktop, "w", encoding="utf-8") as f:
            f.write(desktop_content)
        try:
            os.chmod(dest_desktop, 0o755)
        except Exception:
            pass
    except Exception as e:
        logger.debug(f"Desktop icon registration notice: {e}")


def ensure_llama_server() -> None:
    """Make sure the embedded llama-server micro-daemon is running."""
    try:
        if not LLAMA_SUPERVISOR.model_path:
            return  # Clean fresh install: will start once a model is downloaded/selected
        if not LLAMA_SUPERVISOR.is_healthy():
            LLAMA_SUPERVISOR.start()
    except Exception as exc:
        print(f"[WARN] could not start llama-server: {exc}", file=sys.stderr)


def _watch_llama_server() -> bool:
    """GLib timer callback: restart a crashed llama-server child. True keeps the timer."""
    LLAMA_SUPERVISOR.check()
    return True


# Backward compatibility shims
OLLAMA = LLAMA_SUPERVISOR
ensure_ollama_daemon = ensure_llama_server
_watch_ollama = _watch_llama_server


def main():
    # Lower process priority to nice 10 to yield CPU cycles to foreground user apps
    try:
        os.nice(10)
    except Exception:
        pass

    try:
        try:
            import gi
        except ImportError:
            for _p in ("/usr/lib/python3.14/site-packages", "/usr/lib/python3.13/site-packages", "/usr/lib/python3/dist-packages", "/usr/lib64/python3.14/site-packages"):
                if os.path.isdir(_p) and _p not in sys.path:
                    sys.path.append(_p)
            import gi
        gi.require_version('Gtk', '3.0')
        gi.require_version('WebKit2', '4.1')
        from gi.repository import Gtk, WebKit2, Gdk, GdkPixbuf, GLib
        _initialized, _ = Gtk.init_check()
        if not _initialized:
            raise RuntimeError("Gtk display initialization failed (no active X11 or Wayland display)")
        # Test WebKit2 settings to ensure shared libraries (e.g. libjxl) are loadable
        _ = WebKit2.Settings()
    except Exception as gtk_err:
        logger.warning(f"Native WebKitGTK display fallback triggered: {gtk_err}")
        # Search for available browser engine to run strictly in isolated desktop window mode
        app_launched = False
        _discover_static_hardware()
        ensure_llama_server()
        bridge_port = start_neuro_symbolic_bridge_server(8085) or 8085
        url = f"http://127.0.0.1:{bridge_port}/"

        # 1. Chromium-family browser: dedicated chromeless app window mode
        for b_name in ("google-chrome", "google-chrome-stable", "chromium", "brave-browser", "brave", "microsoft-edge"):
            b_path = shutil.which(b_name)
            if b_path:
                app_data = os.path.expanduser("~/.cache/vigyan-app-mode")
                os.makedirs(app_data, exist_ok=True)
                cmd = [
                    b_path,
                    f"--app={url}",
                    "--window-size=1340,740",
                    "--class=vigyan-pro",
                    "--name=Vigyan Pro",
                    f"--user-data-dir={app_data}",
                    "--force-dark-mode"
                ]
                try:
                    app_launched = True
                    print(f"[*] Vigyan Pro Sovereign Studio running at {url}")
                    print(f"[*] Opened dedicated window via {b_name}.")
                    subprocess.run(cmd)
                finally:
                    LLAMA_SUPERVISOR.stop()
                return

        # 2. Firefox / Gecko family: dedicated application window
        for b_name in ("firefox", "firefox-developer-edition", "librewolf", "zen-browser"):
            b_path = shutil.which(b_name)
            if b_path:
                cmd = [b_path, "--new-window", url]
                try:
                    app_launched = True
                    print(f"[*] Vigyan Pro Sovereign Studio running at {url}")
                    print(f"[*] Opened dedicated desktop window via {b_name}.")
                    print(f"[*] Bridge server active. Press Ctrl+C in terminal to stop.")
                    p = subprocess.Popen(cmd)
                    t0 = time.time()
                    p.wait()
                    if time.time() - t0 < 3.0:
                        # Firefox delegated to running instance; maintain bridge server loop
                        while True:
                            time.sleep(1)
                except KeyboardInterrupt:
                    print("\n[*] Vigyan Pro shutdown.")
                finally:
                    LLAMA_SUPERVISOR.stop()
                return

        # 3. Generic system desktop opener
        for b_name in ("xdg-open", "gio"):
            b_path = shutil.which(b_name)
            if b_path:
                cmd = [b_path, "open", url] if b_name == "gio" else [b_path, url]
                try:
                    app_launched = True
                    print(f"[*] Vigyan Pro Sovereign Studio running at {url}")
                    print(f"[*] Opened dedicated desktop window via {b_name}.")
                    print(f"[*] Bridge server active. Press Ctrl+C in terminal to stop.")
                    subprocess.Popen(cmd)
                    while True:
                        time.sleep(1)
                except KeyboardInterrupt:
                    print("\n[*] Vigyan Pro shutdown.")
                finally:
                    LLAMA_SUPERVISOR.stop()
                return

        if not app_launched:
            print(f"[Error] Failed to initialize native desktop window: WebKitGTK 4.1 or graphical display server is required ({gtk_err}).", file=sys.stderr)
            sys.exit(1)

    # Exit through the GTK main loop so the cleanup after Gtk.main() always runs.
    try:
        from gi.repository import GLibUnix
        GLibUnix.signal_add(GLib.PRIORITY_DEFAULT, signal.SIGINT, Gtk.main_quit)
        GLibUnix.signal_add(GLib.PRIORITY_DEFAULT, signal.SIGTERM, Gtk.main_quit)
    except Exception:
        GLib.unix_signal_add(GLib.PRIORITY_DEFAULT, signal.SIGINT, Gtk.main_quit)
        GLib.unix_signal_add(GLib.PRIORITY_DEFAULT, signal.SIGTERM, Gtk.main_quit)

    # Wayland / XDG application identity mapping
    GLib.set_prgname("vigyan-pro")
    GLib.set_application_name("Vigyan Pro")

    # Initialize hardware topology cache, Ollama daemon, and Neuro-Symbolic bridge
    _discover_static_hardware()
    ensure_llama_server()
    bridge_port = start_neuro_symbolic_bridge_server(8085) or 8085

    _ensure_user_desktop_icons()
    try:
        from gi.repository import GLib
        GLib.set_prgname("vigyan-pro")
        GLib.set_application_name("Vigyan Pro")
    except Exception:
        pass

    win = Gtk.Window(type=Gtk.WindowType.TOPLEVEL)
    try:
        win.set_wmclass("vigyan-pro", "Vigyan Pro")
    except Exception:
        pass
    win.set_title("Vigyan Pro")
    win.set_role("vigyan-pro")
    win.set_default_size(1340, 740)
    win.set_position(Gtk.WindowPosition.CENTER)

    # Modern CSS Provider for pitch-black background
    css_provider = Gtk.CssProvider()
    css_provider.load_from_data(b"window { background-color: #000000; }")
    win.get_style_context().add_provider(css_provider, Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION)

    # Icon resolution
    base_dir = os.path.dirname(os.path.abspath(__file__))
    icon_candidates = [
        os.path.join(base_dir, "..", "assets", "micro_logo_v.png"),
        os.path.join(base_dir, "assets", "micro_logo_v.png"),
        "/opt/vigyan-pro/assets/micro_logo_v.png",
        "/usr/share/icons/hicolor/256x256/apps/vigyan-pro.png",
        os.path.expanduser("~/.local/share/icons/hicolor/256x256/apps/vigyan-pro.png"),
        os.path.expanduser("~/.vigyan/build/favicon.png")
    ]
    icon_path = next((p for p in icon_candidates if os.path.exists(p)), None)
    if icon_path:
        try:
            pixbuf = GdkPixbuf.Pixbuf.new_from_file(icon_path)
            win.set_icon(pixbuf)
            Gtk.Window.set_default_icon(pixbuf)
            win.set_icon_name("vigyan-pro")
        except Exception:
            pass

    # WebKit Settings & UserContentManager IPC
    settings = WebKit2.Settings()
    settings.set_enable_javascript(True)
    settings.set_enable_webgl(True)
    settings.set_enable_write_console_messages_to_stdout(True)
    settings.set_allow_file_access_from_file_urls(True)
    settings.set_allow_universal_access_from_file_urls(True)
    settings.set_enable_smooth_scrolling(True)
    try:
        settings.set_hardware_acceleration_policy(WebKit2.HardwareAccelerationPolicy.ALWAYS)
    except Exception:
        pass

    ucm = WebKit2.UserContentManager()

    def _eval_js(js_code: str):
        if hasattr(webview, "evaluate_javascript"):
            webview.evaluate_javascript(js_code, -1, None, None, None, None, None)
        else:
            webview.run_javascript(js_code, None, None, None)

    # Native IPC Message Handler (Bidirectional Communication: Telemetry, Hybrid Mode, Neuro-Symbolic AST/GraphRAG)
    def on_script_message(manager, js_result):
        try:
            val = js_result.get_js_value() if hasattr(js_result, "get_js_value") else js_result.to_value()
            if val and val.is_string():
                data = json.loads(val.to_string())
                action = data.get("action") or data.get("cmd")
                if action == "get_telemetry":
                    stats = get_system_telemetry()
                    _eval_js(f"window.onNativeTelemetry && window.onNativeTelemetry({json.dumps(stats)});")
                elif action == "set_compute_mode":
                    mode = data.get("mode", "auto")
                    stats = get_system_telemetry(override_mode=mode)
                    _eval_js(f"window.onNativeTelemetry && window.onNativeTelemetry({json.dumps(stats)});")
                elif action in ("neuro_symbolic_query", "enrich"):
                    req_id = data.get("reqId", "")
                    query_str = data.get("query", "")
                    enriched = enrich_stem_query(query_str)
                    enriched["reqId"] = req_id
                    _eval_js(f"window.__onNeuroSymbolicResult && window.__onNeuroSymbolicResult({json.dumps(enriched)});")
        except Exception as e:
            print(f"[IPC ERR] {e}", file=sys.stderr)

    ucm.register_script_message_handler("nativeHost")
    ucm.connect("script-message-received::nativeHost", on_script_message)

    # WebKit View
    webview = WebKit2.WebView.new_with_user_content_manager(ucm)
    webview.set_settings(settings)
    webview.set_background_color(Gdk.RGBA(0, 0, 0, 1))

    # Periodic Hardware Telemetry Broadcast (every 3 seconds, <0.2ms sysfs read)
    def _push_telemetry():
        try:
            stats = get_system_telemetry()
            _eval_js(f"window.onNativeTelemetry && window.onNativeTelemetry({json.dumps(stats)});")
        except Exception:
            pass
        return True

    GLib.timeout_add_seconds(3, _push_telemetry)

    # Enterprise Navigation Policy: Prevent webview URL hijacking / unauthorized redirection
    def on_decide_policy(view, decision, decision_type):
        if decision_type == WebKit2.PolicyDecisionType.NAVIGATION_ACTION:
            action = decision.get_navigation_action()
            req = action.get_request()
            uri = req.get_uri() if req else ""
            if uri.startswith(f"http://127.0.0.1:{bridge_port}") or uri.startswith(f"http://localhost:{bridge_port}") or uri.startswith("file://") or uri.startswith("about:blank"):
                return False
            decision.ignore()
            try:
                import webbrowser
                webbrowser.open(uri)
            except Exception:
                pass
            return True
        return False

    webview.connect("decide-policy", on_decide_policy)

    # Load embedded local sovereign bridge directly (avoids file:// null-origin sandbox restrictions)
    webview.load_uri(f"http://127.0.0.1:{bridge_port}/")

    # Push initial telemetry and sync bridge port + security token as soon as page finishes loading
    def on_load_finished(view, event):
        if event == WebKit2.LoadEvent.FINISHED:
            _eval_js(
                f"window.VIGYAN_TOKEN = '{_SESSION_TOKEN}'; "
                f"window.AGENT_HOST = 'http://127.0.0.1:{bridge_port}'; "
            )
            GLib.timeout_add(300, lambda: (_push_telemetry() and False))

    webview.connect("load-changed", on_load_finished)

    # Keyboard shortcuts: F11 Fullscreen, Ctrl+R Reload, Ctrl + / - / 0 Zoom
    def on_key_press(widget, event):
        keyval = event.keyval
        state = event.state
        if keyval == Gdk.KEY_F11:
            if win.get_window().get_state() & Gdk.WindowState.FULLSCREEN:
                win.unfullscreen()
            else:
                win.fullscreen()
            return True
        elif state & Gdk.ModifierType.CONTROL_MASK:
            if keyval in (Gdk.KEY_r, Gdk.KEY_R):
                webview.reload()
                return True
            elif keyval in (Gdk.KEY_plus, Gdk.KEY_equal, Gdk.KEY_KP_Add):
                _eval_js("window.applyUiZoom && window.applyUiZoom((window.uiZoomLevel || 1.0) + 0.1);")
                return True
            elif keyval in (Gdk.KEY_minus, Gdk.KEY_underscore, Gdk.KEY_KP_Subtract):
                _eval_js("window.applyUiZoom && window.applyUiZoom((window.uiZoomLevel || 1.0) - 0.1);")
                return True
            elif keyval in (Gdk.KEY_0, Gdk.KEY_KP_0):
                _eval_js("window.applyUiZoom && window.applyUiZoom(1.0);")
                return True
        return False

    win.connect("key-press-event", on_key_press)
    win.add(webview)
    win.connect("destroy", Gtk.main_quit)

    snapshot_path = None
    if "--snapshot" in sys.argv:
        idx = sys.argv.index("--snapshot")
        if idx + 1 < len(sys.argv):
            snapshot_path = sys.argv[idx + 1]

    if snapshot_path:
        def on_snapshot_done(view, res, target):
            try:
                surface = view.get_snapshot_finish(res)
                surface.write_to_png(target)
                print(f"[OK] Snapshot saved to {target}")
            except Exception as e:
                print(f"[ERR] Snapshot failed: {e}")
            Gtk.main_quit()

        def trigger_snapshot():
            webview.get_snapshot(
                WebKit2.SnapshotRegion.FULL_DOCUMENT,
                WebKit2.SnapshotOptions.NONE,
                None,
                on_snapshot_done,
                snapshot_path
            )
            return False

        def on_load_changed(view, event):
            if event == WebKit2.LoadEvent.FINISHED:
                GLib.timeout_add(1500, trigger_snapshot)

        webview.connect("load-changed", on_load_changed)

    win.show_all()
    win.present()
    GLib.timeout_add_seconds(5, _watch_llama_server)

    # Low-priority background pre-warming for zero-latency first prompt
    def _prewarm_moe():
        time.sleep(2.0)  # Wait for UI window to finish layout
        try:
            pw_req = urllib.request.Request(
                "http://127.0.0.1:8086/health",
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(pw_req, timeout=5.0) as pw_resp:
                if pw_resp.status == 200:
                    print("[INFO] Embedded llama-server is online and warmed.", file=sys.stderr)
        except Exception:
            pass

    threading.Thread(target=_prewarm_moe, daemon=True).start()

    try:
        Gtk.main()
    finally:
        LLAMA_SUPERVISOR.stop()


if __name__ == "__main__":
    main()
