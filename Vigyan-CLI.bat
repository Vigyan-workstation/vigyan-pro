@echo off
setlocal EnableDelayedExpansion
title Vigyan Pro CLI

:: Check if running from unextracted zip / %TEMP% directory
set "CURRENT_DIR=%~dp0"
echo !CURRENT_DIR! | findstr /i "\\AppData\\Local\\Temp\\" >nul 2>&1
if %ERRORLEVEL% equ 0 goto :UNEXTRACTED_ERROR

if not exist "%~dp0src\vigyan_cli.py" goto :UNEXTRACTED_ERROR

cd /d "%~dp0"

:: Auto-detect Python executable
set "PYTHON_CMD="
if exist "%~dp0bin\python\python.exe" (
    set "PYTHON_CMD=%~dp0bin\python\python.exe"
    goto :PYTHON_FOUND
)
if exist "%~dp0.venv\Scripts\python.exe" (
    set "PYTHON_CMD=%~dp0.venv\Scripts\python.exe"
    goto :PYTHON_FOUND
)
where py >nul 2>&1
if %ERRORLEVEL% equ 0 (
    set "PYTHON_CMD=py"
    goto :PYTHON_FOUND
)
where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    set "PYTHON_CMD=python"
    goto :PYTHON_FOUND
)

:PYTHON_NOT_FOUND
color 0C
echo ===============================================================================
echo  [ERROR] Python executable not found on your system!
echo ===============================================================================
echo.
echo  Python 3.10+ is required. Install via Windows Package Manager:
echo    winget install Python.Python.3.12
echo.
echo  Or download from https://www.python.org/downloads/
echo  (Ensure "Add python.exe to PATH" is checked during installation)
echo.
echo ===============================================================================
pause
exit /b 1

:PYTHON_FOUND
"%PYTHON_CMD%" "%~dp0src\vigyan_cli.py" %*
exit /b %ERRORLEVEL%

:UNEXTRACTED_ERROR
color 0C
echo ===============================================================================
echo  [ERROR] Vigyan Pro CLI is running directly from an unextracted ZIP archive!
echo ===============================================================================
echo.
echo  Windows opened this file from the virtual ZIP preview folder without extracting.
echo.
echo  To run Vigyan Pro CLI properly:
echo    1. Close this window.
echo    2. Right-click the downloaded .zip file and select 'Extract All...'.
echo    3. Open the extracted folder and double-click Vigyan-CLI.bat.
echo.
echo ===============================================================================
pause
exit /b 1
