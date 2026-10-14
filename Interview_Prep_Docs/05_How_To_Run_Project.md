# 05. Setup, Deployment & Execution Guide

This document provides complete instructions for launching the full-stack PlacementPro AI platform locally or in presentation environments.

---

## 1. System Prerequisites
- **Node.js**: v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **Python**: v3.8 or higher ([Download Python](https://www.python.org/))
- **MongoDB** *(Optional)*: v6.0+ running locally on port 27017 or a MongoDB Atlas URI. *(Note: The platform features a 100% resilient hybrid storage engine; if MongoDB is not running, the application seamlessly runs using local/memory failover without crashing).*
- **Web Browser**: Any modern browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Brave).

---

## 2. Port Architecture Summary

| Service | Port | Base URL | Technology |
| :--- | :---: | :--- | :--- |
| **Frontend Client** | **3006** | `http://127.0.0.1:3006` | Live-Server / HTML5 / CSS3 / ES6+ |
| **Backend API Gateway** | **5000** | `http://127.0.0.1:5000` | Node.js / Express.js / Mongoose |
| **ML Microservice** | **5001** | `http://127.0.0.1:5001` | Python 3 / Flask / Scikit-Learn |
| **Database** | **27017**| `mongodb://localhost:27017` | MongoDB |

---

## 3. Quick-Start (One-Click Launchers)

### Option A: Windows One-Click Launcher (Recommended)
1. In the root workspace directory, double-click **`start-servers.bat`**.
2. The batch script will automatically:
   - Terminate any stale processes currently occupying ports 5000 or 5001.
   - Verify Python dependencies (`flask`, `flask-cors`).
   - Execute `npm run dev` to launch all three tiers concurrently in a unified terminal window.
3. Open your browser and navigate to: **`http://127.0.0.1:3006`**

### Option B: Linux / macOS Launcher
1. Open a terminal in the root project folder.
2. Grant execution permissions:
   ```bash
   chmod +x start-servers.sh
   ./start-servers.sh
   ```
3. Open your browser at: **`http://127.0.0.1:3006`**

### Option C: Universal Terminal Command
From the root workspace directory, run:
```bash
npm run dev
```
*(This triggers `concurrently "npm run backend" "npm run ml" "npm run frontend"`).*

---

## 4. Manual Step-by-Step Launch Sequence

If you prefer to start each service in separate terminal windows for closer log inspection:

### Terminal 1: Backend API Gateway (Port 5000)
```bash
cd Backend
npm install
npm run dev
```
*Expected Console Output:*
```
Server running in development mode on port 5000
MongoDB Connected... (or: Running in resilient in-memory fallback mode)
```

### Terminal 2: Python ML Microservice (Port 5001)
```bash
pip install flask flask-cors pandas scikit-learn
python -u ML/api/ml_api.py
```
*Expected Console Output:*
```
[ML Service] PlacementPro ML Microservice listening on http://127.0.0.1:5001
```

### Terminal 3: Frontend Client (Port 3006)
```bash
npx live-server Frontend --port=3006 --cors
```
*Expected Console Output:*
```
Serving "Frontend" at http://127.0.0.1:3006
Ready for changes
```

---

## 5. Verification & Testing Checklist

1. **Visit Landing Page**: Open `http://127.0.0.1:3006/index.html`. Verify hero animations, Explore Jobs link, and Admin Portal button.
2. **Student Login**: Click "Student Login" (or navigate to `http://127.0.0.1:3006/login.html`). Enter any test email (e.g. `student@test.edu`).
3. **Explore Jobs**: Navigate to `student/jobs.html`. Confirm that the 6 pre-seeded corporate openings (TCS, Infosys, Zoho, Flipkart, Amazon, Cognizant) render with dynamic SVG match rings and eligibility pills.
4. **1-Click Apply**: Click any job card, inspect the hiring roadmap, and click "Apply Now". Confirm the 1-click modal, submit, and observe the celebratory confetti animation.
5. **My Applications**: Navigate to `student/applications.html`. Confirm that your application appears with the 5-step interactive progress stepper.
6. **Live AI Resume Studio**: Navigate to `student/resume.html`. Verify the split-screen view. Click "🚀 1-Click MNC / FAANG Upgrade" and "⚡ AI Fix Verbs" to observe the real-time DOM update and emerald glowing animation on the physical A4 paper.
7. **Admin Portal**: Navigate to `admin/jobs.html`. Create a new test job posting, view the applicant in the slide-over drawer, and change their status to "Shortlisted". Observe the instant update in the student's My Applications tab.

---

## 6. Troubleshooting Common Issues

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **Port 5000 / 5001 Already in Use** | A previous Node or Python instance was left running. | Run `start-servers.bat` (which automatically clears ports) or execute `npx kill-port 5000 5001`. |
| **MongoDB Connection Error** | MongoDB local service is not started. | **No action required!** PlacementPro AI features automatic silent failover. Endpoints continue operating in memory and via `localStorage`. |
| **CORS Error in Browser Console** | Frontend opened via `file://` instead of an HTTP server. | Always access pages via `http://127.0.0.1:3006` served by `live-server` or VS Code Live Server. |
| **Python ModuleNotFoundError: 'flask'** | Python dependencies not installed in global environment. | Execute `pip install flask flask-cors` in your terminal. |
