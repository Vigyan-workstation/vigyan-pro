"""Unit and lifecycle tests for LlamaServerSupervisor (headless, mock-safe)."""
from __future__ import annotations

import os
import signal
import sys
import time
import unittest
from pathlib import Path

# Add src to sys.path
SRC_DIR = Path(__file__).resolve().parents[1] / "src"
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from llama_supervisor import LlamaServerSupervisor, find_llama_server_binary, find_model_path
from proc_helpers import alive

SLEEPER = [sys.executable, "-c", "import time; time.sleep(60)"]
CRASHER = [sys.executable, "-c", "pass"]


class TestLlamaServerSupervisor(unittest.TestCase):
    def setUp(self):
        self.supervisors: list[LlamaServerSupervisor] = []

    def tearDown(self):
        for sup in self.supervisors:
            try:
                sup.stop()
            except Exception:
                pass

    def _track(self, sup: LlamaServerSupervisor) -> LlamaServerSupervisor:
        self.supervisors.append(sup)
        return sup

    def test_discovery_helpers(self):
        bin_path = find_llama_server_binary()
        self.assertIsNotNone(bin_path)
        self.assertTrue(os.path.exists(bin_path))

        model_path = find_model_path()
        self.assertIsNotNone(model_path)
        self.assertTrue(os.path.exists(model_path))

    def test_build_command_standard_parameters(self):
        sup = self._track(
            LlamaServerSupervisor(
                model_path="/fake/models/vigyan-3b.gguf",
                server_bin="/fake/bin/llama-server",
                host="127.0.0.1",
                port=8086,
                ctx_size=4096,
                batch_size=256,
                threads=4,
            )
        )
        cmd = sup.build_command()
        self.assertEqual(cmd[0], "/fake/bin/llama-server")
        self.assertIn("--model", cmd)
        self.assertIn("/fake/models/vigyan-3b.gguf", cmd)
        self.assertIn("--ctx-size", cmd)
        self.assertEqual(cmd[cmd.index("--ctx-size") + 1], "4096")
        self.assertIn("--batch-size", cmd)
        self.assertEqual(cmd[cmd.index("--batch-size") + 1], "256")
        self.assertIn("--threads", cmd)
        self.assertEqual(cmd[cmd.index("--threads") + 1], "4")
        self.assertIn("--no-jinja", cmd)
        self.assertIn("--chat-template", cmd)
        self.assertEqual(cmd[cmd.index("--chat-template") + 1], "chatml")
        self.assertIn("--host", cmd)
        self.assertEqual(cmd[cmd.index("--host") + 1], "127.0.0.1")
        self.assertIn("--port", cmd)
        self.assertEqual(cmd[cmd.index("--port") + 1], "8086")

    def test_spawns_child_when_not_healthy(self):
        sup = self._track(LlamaServerSupervisor(command=SLEEPER, is_healthy=lambda: False))
        self.assertTrue(sup.start())
        self.assertIsNotNone(sup.pid)
        self.assertTrue(alive(sup.pid))
        self.assertTrue(sup.owns_process)

    def test_does_not_spawn_when_already_healthy(self):
        sup = self._track(LlamaServerSupervisor(command=SLEEPER, is_healthy=lambda: True))
        self.assertFalse(sup.start())
        self.assertIsNone(sup.pid)
        self.assertFalse(sup.owns_process)

    def test_second_start_idempotent(self):
        sup = self._track(LlamaServerSupervisor(command=SLEEPER, is_healthy=lambda: False))
        self.assertTrue(sup.start())
        first_pid = sup.pid
        self.assertFalse(sup.start())
        self.assertEqual(sup.pid, first_pid)

    def test_stop_terminates_and_reaps_child(self):
        sup = self._track(LlamaServerSupervisor(command=SLEEPER, is_healthy=lambda: False))
        sup.start()
        pid = sup.pid
        self.assertIsNotNone(pid)
        self.assertTrue(alive(pid))
        sup.stop()
        self.assertFalse(alive(pid))
        self.assertFalse(sup.owns_process)
        self.assertIsNone(sup.pid)

    def test_stop_without_start_is_harmless(self):
        sup = self._track(LlamaServerSupervisor(command=SLEEPER, is_healthy=lambda: False))
        sup.stop()

    def test_crash_is_detected_and_restarted(self):
        sup = self._track(LlamaServerSupervisor(command=SLEEPER, is_healthy=lambda: False))
        sup.start()
        first_pid = sup.pid
        self.assertIsNotNone(first_pid)

        # Simulate crash
        os.kill(first_pid, getattr(signal, "SIGKILL", signal.SIGTERM))

        # Wait for supervisor to detect crash via check()
        restarted = False
        deadline = time.monotonic() + 3.0
        while time.monotonic() < deadline:
            if sup.check():
                restarted = True
                break
            time.sleep(0.05)

        self.assertTrue(restarted, "Supervisor failed to detect crash and restart")
        self.assertIsNotNone(sup.pid)
        self.assertNotEqual(sup.pid, first_pid)
        self.assertTrue(sup.owns_process)

    def test_restarts_are_capped(self):
        sup = self._track(
            LlamaServerSupervisor(
                command=CRASHER,
                is_healthy=lambda: False,
                max_restarts=1,
                die_with_parent=False,
            )
        )
        sup.start()
        restarts = 0
        deadline = time.monotonic() + 3.0
        while time.monotonic() < deadline:
            if sup.check():
                restarts += 1
            time.sleep(0.05)
        sup.stop()
        self.assertEqual(restarts, 1)

    def test_stop_does_not_trigger_restart(self):
        sup = self._track(LlamaServerSupervisor(command=SLEEPER, is_healthy=lambda: False))
        sup.start()
        sup.stop()
        self.assertFalse(sup.check())
        self.assertIsNone(sup.pid)

    def test_wait_until_ready(self):
        # Ready state reached
        ready_sup = self._track(LlamaServerSupervisor(command=SLEEPER, is_healthy=lambda: True))
        self.assertTrue(ready_sup.wait_until_ready(timeout=1.0))

        # Premature exit detected
        crasher_sup = self._track(LlamaServerSupervisor(command=CRASHER, is_healthy=lambda: False))
        crasher_sup.start()
        time.sleep(0.2)
        self.assertFalse(crasher_sup.wait_until_ready(timeout=1.0))

    def test_is_healthy_http_status_discrimination(self):
        """Verify is_healthy parses HTTP status and strictly requires 'ok', rejecting 'loading model'."""
        import json
        from http.server import HTTPServer, BaseHTTPRequestHandler
        import threading

        current_response = {"code": 200, "body": {"status": "ok"}}

        class MockHealthHandler(BaseHTTPRequestHandler):
            def log_message(self, *args):
                pass

            def do_GET(self):
                if self.path == "/health":
                    body_bytes = json.dumps(current_response["body"]).encode("utf-8")
                    self.send_response(current_response["code"])
                    self.send_header("Content-Type", "application/json")
                    self.send_header("Content-Length", str(len(body_bytes)))
                    self.end_headers()
                    self.wfile.write(body_bytes)
                else:
                    self.send_response(404)
                    self.end_headers()

        server = HTTPServer(("127.0.0.1", 0), MockHealthHandler)
        port = server.server_port
        t = threading.Thread(target=server.serve_forever, daemon=True)
        t.start()

        try:
            sup = self._track(LlamaServerSupervisor(host="127.0.0.1", port=port))

            # 1. status: "ok" -> healthy
            current_response["code"] = 200
            current_response["body"] = {"status": "ok"}
            self.assertTrue(sup.is_healthy())

            # 2. status: "loading model" -> NOT healthy (model still loading weights)
            current_response["code"] = 200
            current_response["body"] = {"status": "loading model"}
            self.assertFalse(sup.is_healthy())

            # 3. status: "error" -> NOT healthy
            current_response["code"] = 200
            current_response["body"] = {"status": "error"}
            self.assertFalse(sup.is_healthy())

            # 4. HTTP 503 Service Unavailable -> NOT healthy
            current_response["code"] = 503
            current_response["body"] = {"status": "loading model"}
            self.assertFalse(sup.is_healthy())

            # 5. Connection refused port -> NOT healthy
            closed_sup = self._track(LlamaServerSupervisor(host="127.0.0.1", port=59999))
            self.assertFalse(closed_sup.is_healthy())
        finally:
            server.shutdown()
            server.server_close()

    def test_discovery_environment_overrides(self):
        """Verify discovery honors explicit paths and environment variables."""
        import tempfile
        with tempfile.TemporaryDirectory() as tmpdir:
            fake_bin = os.path.join(tmpdir, "llama-server")
            with open(fake_bin, "w") as f:
                f.write("#!/bin/sh\nexit 0\n")
            os.chmod(fake_bin, 0o755)

            fake_model = os.path.join(tmpdir, "custom.gguf")
            with open(fake_model, "w") as f:
                f.write("mock-weights")

            # Test LLAMA_SERVER_BIN env override
            old_bin_env = os.environ.get("LLAMA_SERVER_BIN")
            try:
                os.environ["LLAMA_SERVER_BIN"] = fake_bin
                self.assertEqual(find_llama_server_binary(), os.path.abspath(fake_bin))
            finally:
                if old_bin_env is not None:
                    os.environ["LLAMA_SERVER_BIN"] = old_bin_env
                else:
                    os.environ.pop("LLAMA_SERVER_BIN", None)

            # Test preferred_path in find_model_path
            self.assertEqual(find_model_path(preferred_path=fake_model), os.path.abspath(fake_model))

            # Test VIGYAN_MODEL_PATH env override
            old_model_env = os.environ.get("VIGYAN_MODEL_PATH")
            try:
                os.environ["VIGYAN_MODEL_PATH"] = fake_model
                self.assertEqual(find_model_path(), os.path.abspath(fake_model))
            finally:
                if old_model_env is not None:
                    os.environ["VIGYAN_MODEL_PATH"] = old_model_env
                else:
                    os.environ.pop("VIGYAN_MODEL_PATH", None)


if __name__ == "__main__":
    unittest.main()
