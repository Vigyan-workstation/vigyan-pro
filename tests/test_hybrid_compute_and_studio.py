import json
import os
import pathlib
import re
import shutil
import subprocess
import sys
import unittest
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

import launch_desktop
import launch_desktop_win
from llama_supervisor import LlamaServerSupervisor


class TestHybridComputeAndNeuroSymbolicStudio(unittest.TestCase):
    def test_llama_supervisor_hardware_profile_and_env(self):
        sup = LlamaServerSupervisor(port=18090, ctx_size=2048, threads=4)
        self.assertEqual(sup.port, 18090)
        self.assertEqual(sup.ctx_size, 2048)
        self.assertEqual(sup.threads, 4)

    def test_compute_hybrid_allocation_all_modes_and_edge_cases(self):
        hw_apu = {"physical_cores": 4, "logical_cores": 8, "ram_total_gb": 8.0}
        gpu_apu = {
            "has_gpu": True,
            "is_apu": True,
            "vram_total_mb": 512.0,
            "gtt_total_mb": 3564.0,
        }
        power_ac = {"is_laptop": True, "on_battery": False, "battery_pct": 95}
        power_low_bat = {"is_laptop": True, "on_battery": True, "battery_pct": 15}

        # 1. Auto mode with APU + healthy RAM headroom on AC
        res_auto = launch_desktop.compute_hybrid_allocation(
            mode="auto",
            hw=hw_apu,
            gpu_metrics=gpu_apu,
            power=power_ac,
            ram_avail_gb=3.6,
        )
        self.assertEqual(res_auto["mode"], "auto")
        self.assertEqual(res_auto["num_gpu"], 20)
        self.assertEqual(res_auto["num_thread"], 4)

        # 2. Max GPU mode on 24GB RAM desktop dGPU
        res_max = launch_desktop.compute_hybrid_allocation(
            mode="max_gpu",
            hw={"physical_cores": 8, "logical_cores": 16, "ram_total_gb": 24.0},
            gpu_metrics={"has_gpu": True, "is_apu": False, "vram_total_mb": 12288.0, "gtt_total_mb": 0.0},
            power={"is_laptop": False, "on_battery": False, "battery_pct": 100},
            ram_avail_gb=18.0,
        )
        self.assertEqual(res_max["num_gpu"], 99)
        self.assertEqual(res_max["num_ctx"], 16384)

        # 3. Balanced GPU+CPU mode
        res_bal = launch_desktop.compute_hybrid_allocation(
            mode="balanced",
            hw=hw_apu,
            gpu_metrics=gpu_apu,
            power=power_ac,
            ram_avail_gb=4.0,
        )
        self.assertEqual(res_bal["num_gpu"], 16)
        self.assertEqual(res_bal["num_thread"], 4)

        # 4. CPU Eco mode forces num_gpu=0 even when GPU is present
        res_eco = launch_desktop.compute_hybrid_allocation(
            mode="cpu_eco",
            hw=hw_apu,
            gpu_metrics=gpu_apu,
            power=power_ac,
            ram_avail_gb=4.0,
        )
        self.assertEqual(res_eco["num_gpu"], 0)

        # 5. Edge case: Auto mode with low battery (<20%) drops to CPU battery saver
        res_bat = launch_desktop.compute_hybrid_allocation(
            mode="auto",
            hw=hw_apu,
            gpu_metrics=gpu_apu,
            power=power_low_bat,
            ram_avail_gb=4.0,
        )
        self.assertEqual(res_bat["num_gpu"], 0)

        # 6. Edge case: Unknown mode falls back cleanly to auto, no GPU available
        res_fallback = launch_desktop.compute_hybrid_allocation(
            mode="invalid_mode_xyz",
            hw={"physical_cores": 4, "logical_cores": 4, "ram_total_gb": 4.0},
            gpu_metrics={"has_gpu": False, "is_apu": False, "vram_total_mb": 0.0, "gtt_total_mb": 0.0},
            power=power_ac,
            ram_avail_gb=1.5,
        )
        self.assertEqual(res_fallback["mode"], "auto")
        self.assertEqual(res_fallback["num_gpu"], 0)

    def test_get_system_telemetry_live_host(self):
        tel = launch_desktop.get_system_telemetry("auto")
        self.assertIn("cpu_percent", tel)
        self.assertIn("ram_percent", tel)
        self.assertIn("ollama_options", tel)
        self.assertIn("strategy_label", tel)
        self.assertGreaterEqual(tel["cpu_cores_physical"], 1)

    def test_windows_launcher_telemetry_fallback(self):
        win_tel = launch_desktop_win.get_windows_telemetry("balanced")
        self.assertEqual(win_tel["compute_mode"], "balanced")
        self.assertIn("ollama_options", win_tel)
        self.assertIn("num_gpu", win_tel["ollama_options"])

    def test_neuro_symbolic_enrichment_and_edge_cases(self):
        # Empty query edge case
        empty_res = launch_desktop.enrich_stem_query("")
        self.assertFalse(empty_res["sympy_verified"])
        self.assertEqual(empty_res["axioms"], [])

        # Semiconductor + Physics axiom retrieval
        semi_res = launch_desktop.enrich_stem_query("/semiconductor MOSFET band bending and Schrodinger wave")
        self.assertGreaterEqual(len(semi_res["axioms"]), 1)
        self.assertIn("KùzuDB", semi_res["enriched_system_suffix"])

        # Algebraic equation SymPy verification
        alg_res = launch_desktop.enrich_stem_query("Solve x^2 - 5*x + 6 = 0")
        if launch_desktop._SYMPY_ENGINE is not None:
            self.assertTrue(alg_res["sympy_verified"])
            self.assertIn("2", alg_res["sympy_result"])
            self.assertIn("3", alg_res["sympy_result"])

    def test_embedded_neuro_symbolic_http_server(self):
        port = 18086
        srv = launch_desktop.start_neuro_symbolic_bridge_server(port=port)
        self.assertIsNotNone(srv)

        # Unauthenticated request to protected API must return 403 Forbidden
        with self.assertRaises(urllib.error.HTTPError) as cm:
            urllib.request.urlopen(f"http://127.0.0.1:{port}/api/models/catalog", timeout=3)
        self.assertEqual(cm.exception.code, 403)

        # Authenticated request with session token succeeds
        headers = {"X-Vigyan-Token": launch_desktop._SESSION_TOKEN}
        req_cat = urllib.request.Request(f"http://127.0.0.1:{port}/api/models/catalog", headers=headers)
        with urllib.request.urlopen(req_cat, timeout=3) as resp:
            self.assertEqual(resp.status, 200)
            data = json.loads(resp.read().decode("utf-8"))
            self.assertIn("catalog", data)
            self.assertIn("gemma:4b", data["catalog"])

        # Health check endpoint returns status and live telemetry
        with urllib.request.urlopen(f"http://127.0.0.1:{port}/health", timeout=3) as resp:
            self.assertEqual(resp.status, 200)
            data = json.loads(resp.read().decode("utf-8"))
            self.assertEqual(data["status"], "online")
            self.assertIn("telemetry", data)

    def test_index_html_eight_domains_modals_and_js_syntax(self):
        html_path = SRC / "dist" / "index.html"
        self.assertTrue(html_path.exists(), "src/dist/index.html must exist as compiled SPA")
        html = html_path.read_text(encoding="utf-8")

        self.assertIn('<div id="app"></div>', html)
        self.assertIn("Vigyan Pro", html)
        self.assertIn("katex.min.css", html)
        self.assertIn("plotly.min.js", html)

        for removed_modal in ["openStemTaskHub", "openLatexRefModal", "openExportPdfModal"]:
            self.assertNotIn(removed_modal, html, f"Removed modal function {removed_modal} should not be in production assets")

        # Verify bundled script exists and passes JS syntax checks
        assets_dir = SRC / "dist" / "assets"
        js_files = list(assets_dir.glob("*.js"))
        self.assertGreaterEqual(len(js_files), 1, "Expected at least one bundled JS asset in src/dist/assets")
        js_runtime = shutil.which("node") or shutil.which("bun")
        if js_runtime:
            for js_file in js_files:
                if "bun" in os.path.basename(js_runtime):
                    proc = subprocess.run([js_runtime, "build", str(js_file), "--no-bundle"], capture_output=True, text=True)
                else:
                    proc = subprocess.run([js_runtime, "--check", str(js_file)], capture_output=True, text=True)
                self.assertEqual(proc.returncode, 0, f"JS syntax check failed for {js_file.name}: {proc.stderr}")

    def test_enterprise_settings_rows_and_functions(self):
        frontend_dir = ROOT / "frontend" / "src"
        app_svelte = (frontend_dir / "App.svelte").read_text(encoding="utf-8")
        settings_svelte = (frontend_dir / "components" / "SettingsPanel.svelte").read_text(encoding="utf-8")

        # Verify executive settings controls exist in Svelte components
        self.assertIn("fontSize", settings_svelte)
        self.assertIn("handleResetChat", settings_svelte)
        self.assertIn("chatStore.clear()", settings_svelte)
        self.assertIn("Preferences", settings_svelte)

        # Verify executive minimalist header in App.svelte
        self.assertIn("<header", app_svelte)
        self.assertIn("Vigyan Pro", app_svelte)
        self.assertIn("DEFAULT_MODEL", app_svelte)

        # Verify legacy quad-master model is absent from model selection
        self.assertNotIn("vigyan:7b-quad-master", app_svelte)
        self.assertNotIn("vigyan:7b-quad-master", settings_svelte)


if __name__ == "__main__":
    unittest.main()
