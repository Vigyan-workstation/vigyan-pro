#!/usr/bin/env python3
"""
Vigyan Pro Sovereign Studio - Native Desktop Launcher
Utilizes Cocoa WKWebView with native window vibrancy, pitch-black obsidian theme,
Smart Hybrid GPU+CPU Compute Engine, and Embedded Neuro-Symbolic Bridge.
Zero Browser Chrome. 100% Native Desktop Window.
"""

import sys
import os
import time
import subprocess
from typing import Optional


def launch_mac():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    index_dist = os.path.join(base_dir, "dist", "index.html")
    index_path = index_dist if os.path.exists(index_dist) else os.path.join(base_dir, "index.html")

    # 1. Start embedded Neuro-Symbolic HTTP Bridge (:8085)
    port = 8085
    bridge_started = False
    try:
        from launch_desktop import start_neuro_symbolic_bridge_server
        p = start_neuro_symbolic_bridge_server(8085)
        if p:
            port = p
            bridge_started = True
            print(f"[Vigyan Pro] Sovereign Neuro-Symbolic Bridge online at http://127.0.0.1:{port}")
    except Exception as exc:
        print(f"[Vigyan Pro] Warning: Neuro-Symbolic bridge init notice: {exc}", file=sys.stderr)

    # 2. Start Embedded Llama Server Supervisor Daemon
    try:
        from launch_desktop import ensure_llama_server, LLAMA_SUPERVISOR
        ensure_llama_server()
        print("[Vigyan Pro] Embedded Llama Server Supervisor initialized")
    except Exception as exc:
        print(f"[Vigyan Pro] Sovereign engine notice: {exc}", file=sys.stderr)

    target_url = f"http://127.0.0.1:{port}/" if bridge_started else f"file://{os.path.abspath(index_path)}"

    def _cleanup():
        try:
            from launch_desktop import LLAMA_SUPERVISOR
            LLAMA_SUPERVISOR.stop()
        except Exception:
            pass

    # 3. Launch Native Cocoa WKWebView via pywebview
    try:
        import webview
        window = webview.create_window(
            title="Vigyan Pro",
            url=target_url,
            width=1340,
            height=780,
            resizable=True,
            background_color='#000000',
            easy_drag=False
        )
        try:
            webview.start(gui='cocoa', debug=False)
            return True
        finally:
            _cleanup()
    except ImportError:
        pass
    except Exception as e:
        print(f"[Vigyan Pro] Cocoa pywebview notice: {e}")

    # 4. Fallback: Chromium / Chrome / Brave / Edge App Mode
    chrome_paths = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
        "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
    ]
    browser_exe = next((p for p in chrome_paths if os.path.exists(p)), None)
    if browser_exe:
        cmd = [
            browser_exe,
            f"--app={target_url}",
            "--window-size=1340,780",
            "--force-dark-mode"
        ]
        try:
            proc = subprocess.Popen(cmd)
            proc.wait()
            return True
        finally:
            _cleanup()

    # 5. Native Safari open fallback
    try:
        print(f"[Vigyan Pro] Sovereign Workstation running at {target_url}")
        print("[Vigyan Pro] Browser opened. Press Ctrl+C to terminate.")
        subprocess.Popen(["open", target_url])
        while True:
            time.sleep(1.0)
    except KeyboardInterrupt:
        return True
    finally:
        _cleanup()


if __name__ == "__main__":
    launch_mac()
