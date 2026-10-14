# 04. Frontend Tier Deep-Dive (HTML5, Vanilla CSS3 & ES6+ JavaScript)

The Frontend tier is located in the `Frontend/` folder and is served on **Port 3006**. It delivers an ultra-fast, visually stunning, claymorphic Single Page Application (SPA)-style user experience built with **Semantic HTML5, Vanilla CSS3, Bootstrap 5 utilities, and modular ES6+ JavaScript**—with zero frontend framework overhead.

---

## 1. Design Aesthetics & Claymorphic Design System
The visual language of PlacementPro AI is defined in [`Frontend/css/style.css`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/css/style.css). It is grounded in modern **Claymorphic Design**:
- **Soft Volumetric Surfaces**: Using dual-layer inset shadows (`inset 0 2px 3px rgba(255,255,255,.32)` and `inset 0 -4px 8px rgba(0,0,0,.15)`) combined with elevated drop shadows (`0 14px 28px -10px rgba(60,65,130,.28)`).
- **Aurora Ambient Mesh**: Subtle animated backdrop glows (`.pp-aurora-b`) that breathe life into the UI without distracting from data.
- **Harmonious Indigo/Emerald/Amber Palettes**: High contrast, fully accessible color scales tailored specifically for engineering data visualization.

---

## 2. Exhaustive File-by-File Breakdown of All HTML Pages

### A. Public & Authentication Pages
#### 1. [`Frontend/index.html`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/index.html)
- **Role**: Platform landing page & marketing hero.
- **Components**: Navigation bar with direct links to "Explore Jobs", "Student Login", and "Admin Portal"; interactive feature cards showcasing the ML engine, Skill Gap visualizer, ATS Resume builder, and Job Portal; conversion CTA band.

#### 2. [`Frontend/login.html`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/login.html)
- **Role**: Secure authentication gateway.
- **Mechanism**: Captures student email and password. Establishes the browser session via `saveSession({ email, name })` in `localStorage`, guaranteeing that all subsequent pages load the isolated data silo for that exact email.

#### 3. [`Frontend/register.html`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/register.html)
- **Role**: New student account onboarding.
- **Mechanism**: Initializes a clean student profile record tied to the new email and redirects directly to `student/profile.html` with zero friction.

---

### B. Admin Portal Suite
#### 4. [`Frontend/admin/index.html`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/admin/index.html)
- **Role**: Entry point redirecting seamlessly to `admin/jobs.html`.

#### 5. [`Frontend/admin/jobs.html`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/admin/jobs.html)
- **Role**: Complete enterprise Job & Applicant Management Suite.
- **Key Modules**:
  - **Metric Stat Cards**: Real-time counters for Active Postings, Total Applications Received, Candidates Shortlisted, and Candidates Offered.
  - **Multi-Step / Cleanly Sectioned Job Creation Modal**: Captures 15+ corporate parameters (Title, Company Name, Logo URL, Role, Category, Required & Preferred Skills, Minimum CGPA, Backlog limits, Eligible Batches, Work Mode, CTC/Stipend, Vacancies, Deadline, Selection Roadmap steps).
  - **Interactive Data Table**: Instant client-side search, status filter pills (`All`, `Active`, `Draft`, `Closed`), applicant count badges, and a 1-click live publish/unpublish toggle switch.
  - **Applicant Pipeline Slide-Over Drawer**: Automatically sorts all students who applied for a job by their **ML Eligibility Match %**. Clicking any candidate opens their academic profile snapshot, skill match breakdown, and gives a 1-click button to download/preview their attached CV.
  - **Kanban-Style Status Pills**: Allows administrators to transition applicants between `Applied`, `Under Review`, `Shortlisted`, `Selected`, and `Rejected` with immediate toast notifications.

---

### C. Student Dashboard & Core Discovery Views
#### 6. [`Frontend/student/dashboard.html`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/student/dashboard.html)
- **Role**: Student command center.
- **Components**: Profile completeness progress meter, quick action buttons ("Explore Jobs", "View Applications", "Resume Studio"), top-fit career role badge, and company match alerts.

#### 7. [`Frontend/student/profile.html`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/student/profile.html)
- **Role**: Deep student academic and technical profile manager.
- **Modules**: Personal information, Class 10/12 details, B.Tech semester-by-semester CGPA and active backlogs, technical skills matrix (Languages, Web, Databases, DSA proficiency), project repository with links, and internship history.

#### 8. [`Frontend/student/jobs.html`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/student/jobs.html)
- **Role**: Premium "Explore Jobs" Portal.
- **Features**:
  - **Elevated Smart Job Cards**: Smooth hover elevation (`translateY(-5px)`), company logo with fallback initials avatar, work mode badges, and CTC badges.
  - **Live Circular SVG ML Match Ring**: Real-time match percentage badge calculated specifically against the logged-in student's saved profile.
  - **Eligibility Pill**: Clear visual indicator (`✓ Eligible to Apply` in emerald green vs. `⚠ CGPA or Skill Gap` in red).
  - **Urgency Countdown Tag**: Real-time deadline pill (e.g. `🔥 Closes in 2 days` or `⚡ Closes Today`).
  - **Sticky Search & Multi-Facet Filter Bar**: Search by company, title, or skill; filter by work mode, employment type, salary tier, and "Show Only Eligible Jobs" toggle.
  - **Job Details View & AI Insights**: Matched vs. Missing skill pills with upskilling recommendations, academic checklist, hiring process roadmap, and similar jobs carousel.
  - **1-Click Application Confirmation Modal**: Pre-fills academic snapshot, displays current ATS resume score, allows selecting PlacementPro CV or uploading custom PDF, prevents duplicate submissions, and launches celebratory confetti upon submission.

#### 9. [`Frontend/student/applications.html`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/student/applications.html)
- **Role**: Interactive Student Application Tracker.
- **Features**:
  - Top metric cards: Total Applied, Under Review, Shortlisted, Interview/Offers.
  - **5-Step Visual Progress Stepper**: Interactive timeline displaying `Applied ➔ Under Review ➔ Shortlisted ➔ Interview ➔ Result (Selected/Rejected)`. The active stage pulses with color-coded badges.
  - View Submitted Snapshot modal showing frozen academic marks and ML match score at the time of application.

#### 10. [`Frontend/student/analysis.html`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/student/analysis.html)
- **Role**: Company Eligibility Predictor view.
- **Components**: Hard eligibility check results, animated circular percentage rings, and AI company compatibility cards.

#### 11. [`Frontend/student/companies.html`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/student/companies.html)
- **Role**: Corporate hiring directory segmented by Product-Based, Service-Based, and Startups.

#### 12. [`Frontend/student/roles.html`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/student/roles.html)
- **Role**: Career Role Compatibility view ranking roles by percentage match with animated progress bars.

#### 13. [`Frontend/student/skill-gap.html`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/student/skill-gap.html)
- **Role**: Detailed skill gap diagnostic tool segmenting missing competencies into High, Medium, and Low priorities.

#### 14. [`Frontend/student/resume.html`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/student/resume.html)
- **Role**: **Split-Screen Live AI Resume Studio**.
- **Features**:
  - Consolidated 38% Left AI Control Panel + 62% Right Live A4 Resume Canvas.
  - Before/After toggle pill switch (`📄 Basic Profile` ↔ `✨ AI MNC-Optimized`).
  - 1-Click MNC/FAANG Upgrade (rewrites summary & STAR-method project bullets).
  - AI Fix Verbs with emerald glowing highlight animation on the physical paper.
  - ATS Keyword Auto-Injector with smooth circular SVG score animation jumping to 94%+.
  - 3 Recruiter-approved visual templates (FAANG Standard, Modern MNC Executive, Minimalist IIT/NIT Placement Standard).
  - Target Role AI Tailoring (SDE, Data Science/ML, Core IT MNC, Cloud/DevOps).
  - Clean `@media print` A4 PDF export with zero UI controls bleeding into the document.

---

## 3. Modular JavaScript Architecture (`Frontend/js/`)

### 1. [`Frontend/js/job-store.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/js/job-store.js)
- **Role**: Resilient Hybrid Data Synchronization Layer.
- **Key Methods**:
  - `preseedJobs()`: Seeds 6 top Indian placement openings (TCS, Infosys, Zoho, Flipkart, Amazon, Cognizant).
  - `calculateMatch(job, student)`: Executes the weighted client-side ML match formula (skills 55%, CGPA 30%, projects 10%, contests 5%, backlogs penalty).
  - `renderMatchRingSVG(score, size, stroke)`: Returns clean, scalable circular SVG progress rings.
  - `getCompanyLogoHTML(name, url, size)`: Generates corporate logos with an algorithmic colored initials avatar fallback.
  - `saveJob()`, `applyForJob()`, `updateApplicationStatus()`: Persists updates to the live backend when online, and synchronizes to `localStorage` when offline.

### 2. [`Frontend/js/student-profile.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/js/student-profile.js)
- **Role**: Session and Profile Storage Manager.
- **Key Methods**:
  - `getSession()`, `saveSession()`: Manages `{ email, name }`.
  - `getStorageKey()`: Dynamically returns `'placementpro_profile_' + email`.
  - `getProfile()`, `saveProfile()`: Encapsulates profile reads and writes.
  - `getPhoto()`, `savePhoto()`, `removePhoto()`: Manages profile photo Base64 data.

### 3. [`Frontend/js/api.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/js/api.js)
- **Role**: Standardized HTTP communication wrapper around `fetch()`. Configured to handle API errors gracefully without throwing raw uncaught promises.

### 4. [`Frontend/js/layout.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/js/layout.js)
- **Role**: Handles responsive drawer navigation toggles and mobile topbars.

### 5. [`Frontend/js/auth-guard.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Frontend/js/auth-guard.js)
- **Role**: Client-side authentication guard. Redirects unauthenticated users trying to access `/student/*` to `/login.html`.
