@echo off
title Vigyan Pro Desktop
cd /d "%~dp0"

echo ========================================================
echo   Launching Vigyan Pro Sovereign Studio (Windows)
echo   100%% Offline Edge Intelligence • Shreyansh Singh
echo ========================================================

if exist "%~dp0..\.venv\Scripts\python.exe" (
    "%~dp0..\.venv\Scripts\python.exe" launch_desktop_win.py %*
    exit /b %ERRORLEVEL%
)

if exist "%~dp0.venv\Scripts\python.exe" (
    "%~dp0.venv\Scripts\python.exe" launch_desktop_win.py %*
    exit /b %ERRORLEVEL%
)

if exist "%LOCALAPPDATA%\Programs\Python\Python313\python.exe" (
    "%LOCALAPPDATA%\Programs\Python\Python313\python.exe" launch_desktop_win.py %*
    exit /b %ERRORLEVEL%
)

if exist "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" (
    "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" launch_desktop_win.py %*
    exit /b %ERRORLEVEL%
)

if exist "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" (
    "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" launch_desktop_win.py %*
    exit /b %ERRORLEVEL%
)

if exist "%LOCALAPPDATA%\Programs\Python\Python310\python.exe" (
    "%LOCALAPPDATA%\Programs\Python\Python310\python.exe" launch_desktop_win.py %*
    exit /b %ERRORLEVEL%
)

where py >nul 2>&1
if %ERRORLEVEL% equ 0 (
    py launch_desktop_win.py %*
    exit /b %ERRORLEVEL%
)

where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    python launch_desktop_win.py %*
    exit /b %ERRORLEVEL%
)

echo ========================================================
echo   [ERROR] Python 3.10+ is required to run Vigyan Pro.
echo   Please install Python from https://www.python.org/
echo   or download the self-contained portable Windows bundle.
echo ========================================================
pause
exit /b 1
