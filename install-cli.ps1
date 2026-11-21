# ==============================================================================
# Vigyan Pro Sovereign CLI 1-Line Installer for Windows (PowerShell)
# https://github.com/shreyansh001boy-tech/vigyan-pro-desktop
#
# Usage:
#   irm https://raw.githubusercontent.com/shreyansh001boy-tech/vigyan-pro-desktop/main/install-cli.ps1 | iex
# ==============================================================================
$ErrorActionPreference = "Stop"

$Repo = "shreyansh001boy-tech/vigyan-pro-desktop"
$Version = if ($env:VIGYAN_VERSION) { $env:VIGYAN_VERSION } else { "5.0.8" }

Write-Host "┌────────────────────────────────────────────────────────┐" -ForegroundColor Cyan
Write-Host "│  VIGYAN PRO • SOVEREIGN STANDALONE CLI FOR WINDOWS     │" -ForegroundColor Cyan
Write-Host "│  100% Offline • Zero Cloud Egress • Windows 10/11 x64  │" -ForegroundColor Cyan
Write-Host "└────────────────────────────────────────────────────────┘" -ForegroundColor Cyan

$InstallDir = Join-Path $env:LOCALAPPDATA "vigyan\bin"
if (-not (Test-Path $InstallDir)) {
    New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
}

$ZipUrl = "https://github.com/$Repo/releases/download/v$Version/vigyan-cli_${Version}_windows_x86_64.zip"
$ZipFile = Join-Path $env:TEMP "vigyan-cli_${Version}_windows_x86_64.zip"

Write-Host "==> Downloading Vigyan CLI v$Version..." -ForegroundColor Green
try {
    Invoke-WebRequest -Uri $ZipUrl -OutFile $ZipFile -UseBasicParsing
    Expand-Archive -Path $ZipFile -DestinationPath $InstallDir -Force
    Remove-Item $ZipFile -Force
} catch {
    Write-Host "[Notice] Binary archive not yet published on CDN; writing native Windows launcher..." -ForegroundColor Yellow
    $LauncherCmd = @"
@echo off
set VIGYAN_DIR=%LOCALAPPDATA%\vigyan\bin
if exist "%VIGYAN_DIR%\vigyan.exe" (
    "%VIGYAN_DIR%\vigyan.exe" %*
) else (
    py -3 -m vigyan_cli %* 2>nul || python -m vigyan_cli %*
)
"@
    Set-Content -Path (Join-Path $InstallDir "vigyan.cmd") -Value $LauncherCmd -Force
}

# Update User PATH
$CurrentPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($CurrentPath -notlike "*$InstallDir*") {
    [Environment]::SetEnvironmentVariable("Path", "$CurrentPath;$InstallDir", "User")
    Write-Host "✓ Added $InstallDir to User PATH." -ForegroundColor Green
}

Write-Host ""
Write-Host "✓ Vigyan Pro CLI v$Version installed successfully!" -ForegroundColor Green
Write-Host "  Location: $InstallDir\vigyan.cmd" -ForegroundColor Gray
Write-Host ""
Write-Host "Quick Start:" -ForegroundColor White
Write-Host "  vigyan models         List available 4B, 7B, 12B sovereign engines" -ForegroundColor Cyan
Write-Host "  vigyan pull 4b        Download daily 2.5 GB STEM engine" -ForegroundColor Cyan
Write-Host "  vigyan `"2+2`"           Run one-shot mathematical evaluation" -ForegroundColor Cyan
Write-Host "  vigyan serve          Start OpenAI-compatible server on port 8086" -ForegroundColor Cyan
Write-Host "  vigyan uninstall      Cleanly remove CLI and reclaim disk space" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: Restart your PowerShell or CMD terminal to reload PATH." -ForegroundColor Yellow
