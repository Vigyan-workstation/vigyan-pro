#!/usr/bin/env python3
"""
Vigyan Pro: Multi-OS Monolithic Release Builder
Builds standalone release archives for Linux, Windows, and macOS,
bundling the sovereign Vigyan-3B GGUF model directly for zero-download offline use.
"""

import os
import sys
import shutil
import tarfile
import zipfile
from pathlib import Path

VERSION = "4.1.0"
MODEL_NAME = "vigyan-3b-quad-master-iq3_m.gguf"

REPO_ROOT = Path(__file__).resolve().parent.parent
DIST_RELEASE_DIR = REPO_ROOT / "dist_release"
SOURCE_MODEL_PATH = Path(os.path.expanduser(f"~/.vigyan/models/{MODEL_NAME}"))

CORE_INCLUDES = [
    "pyproject.toml",
    "README.md",
    "LICENSE",
    "run.py",
    "src",
    "vigyan",
]

EXCLUDE_PATTERNS = {
    "__pycache__",
    "*.pyc",
    "*.pyo",
    ".pytest_cache",
    ".git",
    ".github",
    ".venv",
    "node_modules",
}

def should_exclude(path: Path) -> bool:
    for part in path.parts:
        if part in EXCLUDE_PATTERNS or part.startswith("."):
            return True
    if path.suffix in (".pyc", ".pyo"):
        return True
    return False

def copy_bundle_tree(dest_dir: Path, include_model: bool = True):
    if dest_dir.exists():
        shutil.rmtree(dest_dir)
    dest_dir.mkdir(parents=True, exist_ok=True)

    for item in CORE_INCLUDES:
        src = REPO_ROOT / item
        dst = dest_dir / item
        if not src.exists():
            continue
        if src.is_dir():
            shutil.copytree(
                src,
                dst,
                ignore=shutil.ignore_patterns(
                    "__pycache__", "*.pyc", ".pytest_cache", "node_modules", ".git"
                )
            )
        else:
            shutil.copy2(src, dst)

    if include_model:
        models_target_dir = dest_dir / "models"
        models_target_dir.mkdir(exist_ok=True)
        target_model = models_target_dir / MODEL_NAME
        if SOURCE_MODEL_PATH.exists():
            print(f"[*] Hardlinking / copying {MODEL_NAME} ({SOURCE_MODEL_PATH.stat().st_size / (1024**3):.2f} GB)...")
            try:
                os.link(SOURCE_MODEL_PATH, target_model)
            except OSError:
                shutil.copy2(SOURCE_MODEL_PATH, target_model)
        else:
            print(f"[WARN] Local model file not found at {SOURCE_MODEL_PATH}")

def build_tar_gz(source_dir: Path, archive_path: Path):
    print(f"[*] Packaging {archive_path.name}...")
    with tarfile.open(archive_path, "w:gz") as tar:
        tar.add(source_dir, arcname=f"vigyan-pro-{VERSION}")

def build_zip(source_dir: Path, archive_path: Path):
    print(f"[*] Packaging {archive_path.name}...")
    with zipfile.ZipFile(archive_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(source_dir):
            for file in files:
                p = Path(root) / file
                arcname = Path(f"vigyan-pro-{VERSION}") / p.relative_to(source_dir)
                zipf.write(p, arcname)

def main():
    print(f"==========================================================")
    print(f"  Vigyan Pro v{VERSION} Multi-OS Monolithic Release Builder")
    print(f"==========================================================")

    DIST_RELEASE_DIR.mkdir(parents=True, exist_ok=True)
    temp_staging = DIST_RELEASE_DIR / "_staging"

    try:
        # 1. Linux Monolithic Bundle (.tar.gz)
        linux_stage = temp_staging / "linux"
        copy_bundle_tree(linux_stage, include_model=True)
        build_tar_gz(linux_stage, DIST_RELEASE_DIR / f"vigyan-pro-{VERSION}-linux.tar.gz")

        # 2. Windows Monolithic Bundle (.zip)
        win_stage = temp_staging / "windows"
        copy_bundle_tree(win_stage, include_model=True)
        build_zip(win_stage, DIST_RELEASE_DIR / f"vigyan-pro-{VERSION}-windows.zip")

        # 3. macOS Monolithic Bundle (.tar.gz)
        mac_stage = temp_staging / "macos"
        copy_bundle_tree(mac_stage, include_model=True)
        build_tar_gz(mac_stage, DIST_RELEASE_DIR / f"vigyan-pro-{VERSION}-macos.tar.gz")

        # 4. Source & Universal Python Package (.tar.gz without weights)
        src_stage = temp_staging / "source"
        copy_bundle_tree(src_stage, include_model=False)
        build_tar_gz(src_stage, DIST_RELEASE_DIR / f"vigyan-pro-{VERSION}.tar.gz")

        print("\n[SUCCESS] Successfully generated all Multi-OS release bundles:")
        for item in sorted(DIST_RELEASE_DIR.glob("*.tar.gz")) + sorted(DIST_RELEASE_DIR.glob("*.zip")):
            size_mb = item.stat().st_size / (1024 * 1024)
            print(f"  - {item.name:36} ({size_mb:,.1f} MB)")

    finally:
        if temp_staging.exists():
            shutil.rmtree(temp_staging)

if __name__ == "__main__":
    main()
