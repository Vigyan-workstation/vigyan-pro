@echo off
title Vigyan Pro Desktop
cd /d "%~dp0"

echo ========================================================
echo   Launching Vigyan Pro Sovereign Studio (Windows)
echo   100%% Offline Edge Intelligence • Shreyansh Singh
echo ========================================================

:: Auto-detect Python executable in priority order:
:: 1. Embedded / Local bin\python
:: 2. Project root virtual environment
:: 3. Local virtual environment
:: 4. User-installed Python 3.13 / 3.12 / 3.11 / 3.10 in LocalAppData
:: 5. Python launcher (py)
:: 6. Global python in PATH

set "PYTHON_EXE="

if exist "%~dp0..\bin\python\python.exe" (
    set "PYTHON_EXE=%~dp0..\bin\python\python.exe"
    goto :EXECUTE
)

if exist "%~dp0bin\python\python.exe" (
    set "PYTHON_EXE=%~dp0bin\python\python.exe"
    goto :EXECUTE
)

if exist "%~dp0..\.venv\Scripts\python.exe" (
    set "PYTHON_EXE=%~dp0..\.venv\Scripts\python.exe"
    goto :EXECUTE
)

if exist "%~dp0.venv\Scripts\python.exe" (
    set "PYTHON_EXE=%~dp0.venv\Scripts\python.exe"
    goto :EXECUTE
)

if exist "%LOCALAPPDATA%\Programs\Python\Python313\python.exe" (
    set "PYTHON_EXE=%LOCALAPPDATA%\Programs\Python\Python313\python.exe"
    goto :EXECUTE
)

if exist "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" (
    set "PYTHON_EXE=%LOCALAPPDATA%\Programs\Python\Python312\python.exe"
    goto :EXECUTE
)

if exist "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" (
    set "PYTHON_EXE=%LOCALAPPDATA%\Programs\Python\Python311\python.exe"
    goto :EXECUTE
)

if exist "%LOCALAPPDATA%\Programs\Python\Python310\python.exe" (
    set "PYTHON_EXE=%LOCALAPPDATA%\Programs\Python\Python310\python.exe"
    goto :EXECUTE
)

where py >nul 2>&1
if %ERRORLEVEL% equ 0 (
    set "PYTHON_EXE=py"
    goto :EXECUTE
)

where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    set "PYTHON_EXE=python"
    goto :EXECUTE
)

echo ========================================================
echo   [ERROR] Python 3.10+ is required to run Vigyan Pro.
echo   Please install Python via Windows Package Manager:
echo     winget install Python.Python.3.12
echo.
echo   Or download from https://www.python.org/
echo   (Ensure "Add python.exe to PATH" is checked)
echo ========================================================
pause
exit /b 1

:EXECUTE
:: Check if background spawn requested (--background or --detached or VIGYAN_BACKGROUND=1)
if /i "%1"=="--background" goto :SPAWN_BG
if /i "%1"=="--detached" goto :SPAWN_BG
if "%VIGYAN_BACKGROUND%"=="1" goto :SPAWN_BG

:: Standard execution
"%PYTHON_EXE%" "%~dp0launch_desktop_win.py" %*
exit /b %ERRORLEVEL%

:SPAWN_BG
shift
start "" "%PYTHON_EXE%" "%~dp0launch_desktop_win.py" %*
exit /b 0
