@echo off
setlocal EnableDelayedExpansion
title Vigyan Pro

:: Check if running from unextracted zip / %TEMP% directory
set "CURRENT_DIR=%~dp0"
echo !CURRENT_DIR! | findstr /i "\\AppData\\Local\\Temp\\" >nul 2>&1
if %ERRORLEVEL% equ 0 goto :UNEXTRACTED_ERROR

if not exist "%~dp0src\launch_win.bat" goto :UNEXTRACTED_ERROR

cd /d "%~dp0"
call "%~dp0src\launch_win.bat" %*
exit /b %ERRORLEVEL%

:UNEXTRACTED_ERROR
color 0C
echo ===============================================================================
echo  [ERROR] Vigyan Pro is running directly from an unextracted ZIP archive!
echo ===============================================================================
echo.
echo  Windows opened this file from the virtual ZIP preview folder without extracting.
echo.
echo  To run Vigyan Pro properly:
echo    1. Close this window.
echo    2. Right-click the downloaded .zip file and select 'Extract All...'.
echo    3. Open the extracted folder and double-click Vigyan-Pro.bat.
echo.
echo ===============================================================================
pause
exit /b 1
