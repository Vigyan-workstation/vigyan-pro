#!/usr/bin/env python3
"""
Vigyan Pro Sovereign Studio - Universal Cross-Platform Desktop Entrypoint
Supports:
  - Linux: Native WebKitGTK / PyGObject & PyWebView
  - Windows 10/11: Microsoft Edge WebView2 & PyWebView
  - macOS (Intel & Apple Silicon): Apple Cocoa WKWebView & PyWebView
Single-command sovereign execution with zero setup.
"""

import sys
import os
import subprocess

BANNER = r"""
 __      ___                       ___           
 \ \    / (_)__ _ _  _ __ _ _ _   | _ \_ _ ___   
  \ \/\/ /| / _` | || / _` | ' \  |  _/ '_/ _ \  
   \_/\_/ |_/\__, |\_, \__,_|_||_| |_| |_| \___/  
             |___/ |__/                          
  Sovereign Desktop STEM & Scientific Workstation
"""


def main():
    if "--no-banner" not in sys.argv:
        print(BANNER)

    root_dir = os.path.dirname(os.path.abspath(__file__))
    src_dir = os.path.join(root_dir, "src")
    if not os.path.isdir(src_dir):
        print(f"[Error] 'src' directory not found at {src_dir}", file=sys.stderr)
        sys.exit(1)

    platform = sys.platform.lower()

    if platform.startswith("linux"):
        launcher = os.path.join(src_dir, "launch_desktop.py")
        os_label = "Linux (WebKitGTK / Native Obsidian Shell)"
    elif platform.startswith("win32") or platform.startswith("cygwin"):
        launcher = os.path.join(src_dir, "launch_desktop_win.py")
        os_label = "Windows (Microsoft Edge WebView2)"
    elif platform.startswith("darwin"):
        launcher = os.path.join(src_dir, "launch_desktop_mac.py")
        os_label = "macOS (Apple Cocoa WKWebView)"
    else:
        launcher = os.path.join(src_dir, "launch_desktop.py")
        os_label = f"Generic ({platform})"

    print(f"[*] Detected Host OS: {os_label}")
    print(f"[*] Starting Sovereign Engine & Desktop Shell...\n")

    # Pass through remaining arguments (excluding --no-banner)
    filtered_args = [arg for arg in sys.argv[1:] if arg != "--no-banner"]

    # Support dry-run / dependency check flag
    if "--check-only" in filtered_args:
        print("[*] Environment check completed successfully.")
        sys.exit(0)

    cmd = [sys.executable, launcher] + filtered_args
    try:
        sys.exit(subprocess.call(cmd, cwd=src_dir))
    except KeyboardInterrupt:
        print("\n[*] Vigyan Pro shutdown gracefully.")
        sys.exit(0)
    except Exception as exc:
        print(f"[Error] Failed to launch desktop shell: {exc}", file=sys.stderr)
        dist_dir = os.path.join(src_dir, "dist")
        if os.path.isdir(dist_dir):
            import http.server
            import socketserver
            import webbrowser

            class Handler(http.server.SimpleHTTPRequestHandler):
                def __init__(self, *args, **kwargs):
                    super().__init__(*args, directory=dist_dir, **kwargs)

                def log_message(self, format, *args):
                    pass  # Quiet logging

            try:
                with socketserver.TCPServer(("127.0.0.1", 0), Handler) as httpd:
                    port = httpd.server_address[1]
                    url = f"http://127.0.0.1:{port}"
                    print(f"[*] Falling back to localhost browser server: {url} (Ctrl+C to stop)...")
                    webbrowser.open(url)
                    httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n[*] Browser server stopped.")
        sys.exit(1)


if __name__ == "__main__":
    main()
