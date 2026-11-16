# ==============================================================================
# Vigyan Pro Sovereign CLI Uninstaller for Windows (PowerShell)
# https://github.com/shreyansh001boy-tech/vigyan-pro-desktop
# ==============================================================================
$ErrorActionPreference = "Continue"

Write-Host "┌────────────────────────────────────────────────────────┐" -ForegroundColor Cyan
Write-Host "│  VIGYAN PRO • SOVEREIGN CLI UNINSTALLER FOR WINDOWS    │" -ForegroundColor Cyan
Write-Host "└────────────────────────────────────────────────────────┘" -ForegroundColor Cyan

$Confirm = Read-Host "Are you sure you want to completely uninstall Vigyan CLI? [y/N]"
if ($Confirm -notmatch "^[yY]") {
    Write-Host "Uninstallation cancelled." -ForegroundColor Yellow
    exit 0
}

# 1. Remove Install Directory
$InstallDir = Join-Path $env:LOCALAPPDATA "vigyan\bin"
if (Test-Path $InstallDir) {
    Remove-Item -Recurse -Force $InstallDir
    Write-Host "✓ Removed $InstallDir" -ForegroundColor Green
}

# 2. Clean User PATH
$CurrentPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($CurrentPath -like "*$InstallDir*") {
    $NewPath = ($CurrentPath.Split(';') | Where-Object { $_ -ne $InstallDir -and $_ -ne "" }) -join ';'
    [Environment]::SetEnvironmentVariable("Path", $NewPath, "User")
    Write-Host "✓ Cleaned $InstallDir from User PATH." -ForegroundColor Green
}

# 3. Optional Model Reclaim
$ModelsDir = Join-Path $env:USERPROFILE ".vigyan\models"
if (Test-Path $ModelsDir) {
    $MConfirm = Read-Host "Do you also want to delete all downloaded model weights ($ModelsDir) to reclaim disk space? [y/N]"
    if ($MConfirm -match "^[yY]") {
        Remove-Item -Recurse -Force $ModelsDir
        Write-Host "✓ Removed $ModelsDir (Reclaimed disk space)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "✓ Vigyan Pro CLI has been completely uninstalled." -ForegroundColor Green
