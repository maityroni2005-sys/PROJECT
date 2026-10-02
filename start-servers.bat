@echo off
:: ============================================================
::  PlacementPro AI — One-Click Launcher (Windows)
::  Double-click this file to start all servers.
::  Runs: Node.js Backend (5000) + Python ML (5001) + Frontend (3006)
:: ============================================================
title PlacementPro AI — Launcher

echo.
echo  ╔══════════════════════════════════════════════╗
echo  ║    PlacementPro AI — One-Click Launcher      ║
echo  ╚══════════════════════════════════════════════╝
echo.

:: Kill anything already on ports 5000 or 5001
echo  Clearing ports 5000 and 5001...
for /f "tokens=5 delims= " %%a in ('netstat -aon 2^>nul ^| findstr ":5000 "') do (
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5 delims= " %%a in ('netstat -aon 2^>nul ^| findstr ":5001 "') do (
    taskkill /F /PID %%a >nul 2>&1
)
echo  Ports cleared.
echo.

:: Install Python dependencies if missing
echo  Checking Python dependencies...
python -c "import flask, flask_cors, joblib" >nul 2>&1
if errorlevel 1 (
    echo  Installing flask, flask-cors, joblib...
    pip install flask flask-cors joblib -q
    echo  Python dependencies ready.
) else (
    echo  Python dependencies OK.
)
echo.

:: Start everything with concurrently via npm run dev
echo  Starting all servers via: npm run dev
echo  (Backend on :5000, ML on :5001, Frontend on :3006)
echo.
echo ════════════════════════════════════════════════
echo  Open your browser at: http://127.0.0.1:3006
echo  Press Ctrl+C in this window to stop all servers
echo ════════════════════════════════════════════════
echo.

npm run dev

pause
