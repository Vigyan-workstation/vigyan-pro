#!/usr/bin/env python3
"""
Automated Agent Guardrails Verification Script
Validates:
1. Zero Emojis Invariant: Ensures no Unicode emoji symbols exist in tracked text files.
2. Python Syntax: Runs py_compile on all Python files.
3. Air-Gap Egress: Scans core engine files for unauthorized outbound API endpoints.

Returns exit code 0 on clean pass; exit code 1 with exact file and line references on failure.
"""

import os
import sys
import py_compile
import subprocess
import unicodedata
from typing import List, Tuple

EXCLUDED_EXTENSIONS = {
    ".png", ".ico", ".jpg", ".jpeg", ".woff", ".woff2", ".ttf", ".eot",
    ".gguf", ".bin", ".pyc", ".stl", ".tar", ".gz", ".zip"
}

EXCLUDED_DIRECTORIES = {
    ".git", ".pytest_cache", "__pycache__", "node_modules", "dist", ".agents"
}

def is_emoji(ch: str) -> bool:
    """Return True if character falls in standard emoji ranges."""
    cp = ord(ch)
    # Common Emoji Ranges
    if 0x1F300 <= cp <= 0x1FAFF:
        return True
    if 0x1F600 <= cp <= 0x1F64F:
        return True
    if 0x1F680 <= cp <= 0x1F6FF:
        return True
    if 0x2600 <= cp <= 0x27BF:
        # Exclude common mathematical or typography symbols if needed
        cat = unicodedata.category(ch)
        if cat in ("So", "Sk"):
            return True
    if 0xFE00 <= cp <= 0xFE0F:  # Variation selectors
        return True
    return False

def get_tracked_files(root_dir: str) -> List[str]:
    """Retrieve tracked files using git ls-files if inside a git repo, else walk."""
    try:
        res = subprocess.run(
            ["git", "ls-files"],
            cwd=root_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        return [os.path.join(root_dir, f.strip()) for f in res.stdout.splitlines() if f.strip()]
    except Exception:
        files = []
        for r, dirs, fnames in os.walk(root_dir):
            dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRECTORIES]
            for fn in fnames:
                ext = os.path.splitext(fn)[1].lower()
                if ext not in EXCLUDED_EXTENSIONS:
                    files.append(os.path.join(r, fn))
        return files

def check_zero_emojis(files: List[str]) -> List[str]:
    """Scan all text files for emoji characters."""
    errors = []
    for fpath in files:
        ext = os.path.splitext(fpath)[1].lower()
        if ext in EXCLUDED_EXTENSIONS:
            continue
        if not os.path.isfile(fpath):
            continue

        try:
            with open(fpath, "r", encoding="utf-8", errors="replace") as f:
                for line_idx, line in enumerate(f, start=1):
                    for char_idx, ch in enumerate(line, start=1):
                        if is_emoji(ch):
                            rel_path = os.path.relpath(fpath)
                            errors.append(
                                f"[EMOJI VIOLATION] {rel_path}:{line_idx}:{char_idx} -> "
                                f"U+{ord(ch):04X} ({unicodedata.name(ch, 'UNKNOWN')})"
                            )
        except Exception as e:
            errors.append(f"[READ ERROR] {fpath}: {e}")
    return errors

def check_python_syntax(files: List[str]) -> List[str]:
    """Verify syntax of all Python files using py_compile."""
    errors = []
    for fpath in files:
        if fpath.endswith(".py") and os.path.isfile(fpath):
            try:
                py_compile.compile(fpath, doraise=True)
            except py_compile.PyCompileError as e:
                errors.append(f"[SYNTAX ERROR] {e}")
    return errors

def check_airgap_egress(root_dir: str) -> List[str]:
    """Scan core backend code for unauthorized outbound API calls."""
    prohibited_patterns = [
        "api.openai.com", "api.anthropic.com", "api.cohere.ai",
        "https://api.", "http://api.", "mixpanel.com", "segment.io"
    ]
    errors = []
    engine_dirs = [
        os.path.join(root_dir, "vigyan"),
        os.path.join(root_dir, "src")
    ]
    for ed in engine_dirs:
        if not os.path.isdir(ed):
            continue
        for r, _, fnames in os.walk(ed):
            for fn in fnames:
                if fn.endswith(".py"):
                    fp = os.path.join(r, fn)
                    try:
                        with open(fp, "r", encoding="utf-8", errors="replace") as f:
                            for idx, line in enumerate(f, start=1):
                                for pat in prohibited_patterns:
                                    if pat in line:
                                        rel = os.path.relpath(fp, root_dir)
                                        errors.append(
                                            f"[AIR-GAP EGRESS VIOLATION] {rel}:{idx} -> contains forbidden endpoint '{pat}'"
                                        )
                    except Exception:
                        pass
    return errors

def main() -> int:
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    tracked_files = get_tracked_files(root_dir)

    all_errors: List[str] = []

    # 1. Zero Emojis Invariant Check
    emoji_errors = check_zero_emojis(tracked_files)
    all_errors.extend(emoji_errors)

    # 2. Python Syntax Check
    syntax_errors = check_python_syntax(tracked_files)
    all_errors.extend(syntax_errors)

    # 3. Air-Gap Egress Check
    egress_errors = check_airgap_egress(root_dir)
    all_errors.extend(egress_errors)

    if all_errors:
        print(f"[GUARDRAILS FAILED] Found {len(all_errors)} violation(s):", file=sys.stderr)
        for err in all_errors:
            print(f"  {err}", file=sys.stderr)
        return 1

    print(f"[GUARDRAILS PASSED] Verified {len(tracked_files)} files: Zero emojis, syntax valid, air-gap secured.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
