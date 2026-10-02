#!/usr/bin/env bash
# ============================================================
#  PlacementPro AI — Unified Startup Script
#  Starts the Node.js backend and Python ML server together.
#  Usage: bash start-servers.sh
# ============================================================

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/Backend"
ML_DIR="$ROOT_DIR/ML/api"

# Color helpers
GREEN='\033[0;32m'; CYAN='\033[0;36m'; YELLOW='\033[1;33m'; NC='\033[0m'

echo -e "${CYAN}"
echo "  ╔═══════════════════════════════════════╗"
echo "  ║   PlacementPro AI — Starting Servers  ║"
echo "  ╚═══════════════════════════════════════╝"
echo -e "${NC}"

# ---- Kill any lingering processes on ports 5000 and 5001 ----
echo -e "${YELLOW}Checking for processes on ports 5000 and 5001...${NC}"
if command -v lsof &>/dev/null; then
    lsof -ti:5000 | xargs kill -9 2>/dev/null && echo "  Cleared port 5000" || true
    lsof -ti:5001 | xargs kill -9 2>/dev/null && echo "  Cleared port 5001" || true
fi

# ---- Start Node.js backend ----
echo -e "${GREEN}[1/2] Starting Node.js Backend on port 5000...${NC}"
cd "$BACKEND_DIR"
npm start &
BACKEND_PID=$!
echo "  Backend PID: $BACKEND_PID"

# Wait a moment for backend to initialise
sleep 2

# ---- Start Python ML server ----
echo -e "${GREEN}[2/2] Starting Python ML Server on port 5001...${NC}"
cd "$ML_DIR"

# Use python3 or python, whichever is available
if command -v python3 &>/dev/null; then
    python3 ml_api.py &
elif command -v python &>/dev/null; then
    python ml_api.py &
else
    echo "ERROR: python3 / python not found. Please install Python 3."
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi
ML_PID=$!
echo "  ML Server PID: $ML_PID"

echo ""
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ All servers started!${NC}"
echo ""
echo "  Backend API  → http://127.0.0.1:5000/api"
echo "  ML Server    → http://127.0.0.1:5001"
echo ""
echo -e "${YELLOW}  Frontend: Open Frontend/index.html or run:${NC}"
echo "  npx live-server Frontend --port=3006"
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo ""
echo "Press Ctrl+C to stop all servers."

# Wait for background jobs; if any exits, kill the rest
trap "echo 'Stopping all servers...'; kill $BACKEND_PID $ML_PID 2>/dev/null; exit" SIGINT SIGTERM
wait
