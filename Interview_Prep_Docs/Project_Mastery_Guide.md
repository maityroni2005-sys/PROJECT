# PlacementPro AI — Personal Project Mastery Guide
*Confidential — Personal Technical Study Bible & Architecture Deep-Dive*

---

## 1. System Boot & Code Execution: What Happens Under the Hood

### Step 1: When I Run `npm run dev` (or double-click `start-servers.bat`)
1. **Port Clearing Phase (`start-servers.bat`)**:
   - The script runs `netstat -aon | findstr ":5000"` and `:5001`.
   - It captures the PID of any lingering Node or Python process from previous runs and executes `taskkill /F /PID <PID>` to guarantee that no `EADDRINUSE` port collision occurs.
2. **Concurrent Process Spawning (`package.json`)**:
   - `concurrently` executes three child processes simultaneously:
     - **Process 1**: `node Backend/server.js` (Application Tier on Port 5000)
     - **Process 2**: `python -u ML/api/ml_api.py` (Data Science Tier on Port 5001)
     - **Process 3**: `live-server Frontend --port=3006 --cors` (Client Tier on Port 3006)

### Step 2: In-Memory Initialization of Backend (Port 5000)
1. `server.js` calls `require('./app')` and `connectDB()`.
2. Inside `app.js`:
   - Express registers `cors()`. This sets the HTTP response header `Access-Control-Allow-Origin: *` so the browser running on port 3006 is permitted to send fetch requests to port 5000 without CORS security blocks.
   - Body parsers `express.json({ limit: '10mb' })` are mounted to decode JSON payloads into `req.body`.
   - Five route files (`studentRoute`, `companyRoute`, `analysisRoute`, `jobRoute`, `applicationRoute`) bind their respective endpoints to Express router dispatchers.
3. Inside `config/db.js`:
   - Mongoose attempts an asynchronous TCP socket connection to `mongodb://localhost:27017/placement_guidance`.
   - **Crucial Architecture Decision**: If MongoDB is offline, our code catches the error in `.catch()` and logs `[WARN] Running in resilient in-memory fallback mode` rather than calling `process.exit(1)`. The Node server stays 100% alive!
4. Inside `controllers/jobController.js`:
   - An in-memory cache `memoryJobsCache` is pre-populated with the 6 demo jobs from `seedJobs.js`. If MongoDB queries fail, the controller transparently serves and updates this memory cache.

### Step 3: In-Memory Initialization of Python ML Microservice (Port 5001)
1. Python executes `ML/api/ml_api.py`.
2. `Flask(__name__)` and `CORS(app)` initialize the WSGI application.
3. The `ROLE_PROFILES` dictionary is loaded into memory:
   - Contains feature weightings ($W_{\text{skills}}, W_{\text{cgpa}}, W_{\text{dsa}}$) and canonical required/preferred skill sets for all 6 target career roles.
4. Flask starts its lightweight WSGI HTTP server bound to `0.0.0.0:5001`.

### Step 4: When a Student Loads `http://127.0.0.1:3006` in the Browser
1. The browser requests `index.html`. `live-server` streams the static HTML, CSS (`style.css`), and JavaScript assets.
2. The browser parses the DOM:
   - Stylesheet rules apply claymorphic tokens (`--pp-clay`, `--pp-surface`, `--pp-primary`).
   - The background aurora mesh (`.pp-aurora-b`) initializes its CSS radial gradient animation.
3. When navigating to `/student/dashboard.html` or `/student/profile.html`:
   - `auth-guard.js` immediately checks `localStorage.getItem('placementpro_session')`. If no user is logged in, it redirects to `login.html`.
   - `student-profile.js` runs `getStorageKey()`. It reads the logged-in email and scopes all reads/writes strictly to `placementpro_profile_<email>`.

---

## 2. Deep-Dive on Key Engineering Decisions

### Why Node.js for Backend + Python for ML (Decoupled Microservices)?
- **Node.js** has an asynchronous, non-blocking single-threaded event loop. It is unparalleled at handling rapid I/O operations, such as receiving hundreds of concurrent HTTP requests from students, checking cached records, and serving database documents.
- **Python** is the indisputable standard for Data Science and Machine Learning. Trying to do complex statistical modeling, vector intersection, and ensemble tree calculations natively in JavaScript is slow and lacks battle-tested libraries like Scikit-Learn, NumPy, and Pandas.
- By decoupling them into two independent ports (5000 and 5001), neither tier blocks the other. If the ML model performs a heavy calculation, the Node.js API gateway continues serving static job listings and handling student logins without a millisecond of lag.

### Why Vanilla CSS & Vanilla JS Instead of React or Tailwind?
- **Zero Build Latency & Instant Load**: No Webpack, Vite, or Babel bundling. No `npm run build` steps. The code runs natively in the V8 engine immediately.
- **Maximum Aesthetic Control**: Tailwind forces utility bloat (`class="flex items-center justify-between p-4 bg-slate-100 rounded-xl ..."`). Vanilla CSS allowed us to create a unified, claymorphic design token system with custom inset and elevated shadows that look like a $50k custom enterprise design system.
- **100% Explainability in Interviews**: There are no hidden framework abstractions, `useEffect` race conditions, or virtual DOM reconciliation mysteries. Every DOM mutation is direct, measurable, and mathematically explainable.

### How Email-Based Sandboxing Works (`placementpro_profile_<email>`)
- In standard student demos, if Student A logs in with `roni@gmail.com` and edits their profile, and then Student B logs in with `rahul@gmail.com` on the same browser, a naive `localStorage.setItem('profile', ...)` would overwrite Student A's data.
- In `student-profile.js` and `job-store.js`, every key dynamically appends the active session email:
  ```javascript
  function getStorageKey() {
      const session = getSession();
      const email = (session && session.email) ? session.email.toLowerCase().trim() : 'guest';
      return 'placementpro_profile_' + email;
  }
  ```
- Result: 100% isolated sandboxes for every account on the exact same browser!

---

## 3. Deep-Dive: Today's Major Additions Under the Hood

### Module A: Job Portal & Application Management System
1. **Dynamic Client-Side ML Match Formula (`calculateMatch()`)**:
   When a student opens `jobs.html`, the client loops through every job and calculates their match score in real time using the student's saved profile:
   ```javascript
   // Weighted Formula: 55% Skills, 30% CGPA, 10% Projects, 5% Contests
   const skillRatio = matchedSkills.length / job.requiredSkills.length;
   const cgpaScore = Math.min(studentCGPA / 10, 1) * 30;
   let matchScore = Math.round(skillRatio * 55 + cgpaScore + projectBonus + contestBonus);
   if (backlogs > 0) matchScore -= backlogs * 5;
   ```
2. **Circular SVG Ring Rendering (`renderMatchRingSVG()`)**:
   - A standard circle has circumference $C = 2 \times \pi \times r$. For $r = 28$, $C \approx 176$.
   - The SVG has two circles: a subtle background track and an animated foreground stroke.
   - CSS `stroke-dasharray: 176` and `stroke-dashoffset: 176 - (score / 100) * 176`.
   - The browser hardware-accelerates this transition, producing a smooth circular filling animation.
3. **Slide-Over Applicant Pipeline Drawer (`#applicantDrawer`)**:
   - The drawer uses CSS `transform: translateX(100%)` positioned fixed on the right of the screen.
   - When opened, `classList.add('open')` triggers `transform: translateX(0)` with a cubic-bezier transition (`cubic-bezier(0.16, 1, 0.3, 1)`).
   - Candidates are passed to `.sort((a, b) => b.mlMatchScore - a.mlMatchScore)`, guaranteeing that the highest-fit student is always at the top of the recruiter's list.
4. **Interactive 5-Step Visual Progress Stepper (`applications.html`)**:
   - For any applied position, the stepper maps status into a 5-node timeline:
     - 1: `Applied` ➔ 2: `Under Review` ➔ 3: `Shortlisted` ➔ 4: `Interview` ➔ 5: `Selected / Rejected`
   - A horizontal track fill bar (`.stepper-progress-fill`) animates its width (`0%`, `25%`, `50%`, `75%`, `100%`).
   - The active node receives the class `.active`, triggering `@keyframes pulseCircle` with an expanding multi-ring shadow.

---

### Module B: Split-Screen Live AI Resume Studio
1. **Side-by-Side Synchronized Layout**:
   - Main studio flex container: `display: flex; height: 100vh; overflow: hidden;`
   - Left Panel (38% width): `overflow-y: auto;` (user scrolls through tools, photo controls, and AI action buttons).
   - Right Canvas (62% width): Pinned live preview. The A4 sheet (`794px x 1123px`) stays in direct view at all times.
   - Scale engine: `transform: scale(0.85)` fits the complete A4 document on standard laptop screens without cutting off headers or footers.
2. **Weak-to-Strong Action Verb Rewriter (`applyAIVerbsFix()`)**:
   - Traverses all bullet points in `#r-projects-container` and `#r-summary`.
   - Uses regex word-boundary matching (`/\bMade\b/g`, `/\bBuilt\b/g`, `/\bWorked on\b/gi`) and replaces them with active engineering verbs (`Architected`, `Engineered`, `Spearheaded`, `Leveraged`).
   - Wraps the replacement in `<span class="word-upgrade-flash">`.
   - The `.word-upgrade-flash` CSS class triggers `@keyframes wordHighlightFlash`, pulsing with an emerald green glow (`#bbf7d0`) for 3 seconds before fading cleanly back into the body text.
3. **STAR-Method Bullet Rewriter with Quantified Metrics (`applyMNCUpgrade()`)**:
   - Checks if project bullets contain numbers or percentages (`/\d+%|\d+x|\d+ ms/i`).
   - If basic, transforms phrases like *"Made a student placement website using HTML, JS, and Python"* into *"Architected a full-stack AI Placement & Eligibility Platform utilizing Python, REST APIs, and JavaScript, automating skill-gap detection and improving candidate-company matching accuracy by 40%."*
4. **Smart ATS Keyword Auto-Injector (`applyAutoInjectKeywords()`)**:
   - Identifies missing keywords from the target role's critical list.
   - Deduplicates and injects them into 4 structured rows: Programming Languages, Web & Frameworks, Databases & Cloud, Core CS & Algorithms.
   - Updates the circular ATS score ring: smoothly animates `strokeDashoffset` jumping from baseline (e.g. 35%) to **94%+ (MNC Ready)**.
5. **Clean PDF Export via `@media print` & `html2pdf.js`**:
   - When "Download PDF" is clicked, `html2pdf()` temporarily scales the paper to `scale(1)` for high-DPI rendering, generates the vector PDF, and restores the zoom.
   - In browser print mode, `@media print` hides the sidebar, studio topbar, left panel, and zoom pills (`display: none !important`), ensuring 0 UI elements bleed into the final document.
