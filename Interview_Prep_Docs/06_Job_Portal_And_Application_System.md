# 06. Module A — Enterprise Job Portal & Application Management System

## 1. Module Overview & Value Proposition
Campus recruitment processes are often fragmented across Google Forms, third-party spreadsheets, and unverified student resumes. The **Enterprise Job Portal & Application Management System** in PlacementPro AI creates a seamless, bidirectional pipeline between campus recruiters/administrators and graduating students:

- **For Recruiters & Admins**: A centralized management suite to create corporate postings, toggle visibility in real time, inspect applicants ranked automatically by their ML Eligibility Match %, and update candidate stages with instant toast feedback.
- **For Students**: A premium jobs explorer featuring dynamic circular ML match rings, instant eligibility diagnostics (`✓ Eligible to Apply` vs. `⚠ CGPA or Skill Gap`), urgency badges, sticky multi-facet filtering, a 1-click apply confirmation modal with celebratory confetti, and an interactive 5-step visual progress stepper in "My Applications".

---

## 2. Administrator Job & Applicant Management Suite (`admin/jobs.html`)

### A. Core Architecture
- **Interactive Data Table**:
  - Live client-side instant search across job title, company name, and technical skill tags.
  - Filter pills: `All Jobs`, `Active`, `Draft`, and `Closed` with real-time record count badges.
  - Live status toggle switch: Admins can activate or deactivate any job posting instantly with a single click.
  - Applicant counter badge showing the number of students who have applied.
- **Multi-Step / Sectioned Job Creation Modal**:
  - **1. Core Job Information**: Job Title, Company Name, Company Logo URL (with auto-generated initials avatar fallback), Category (Product-Based, Service-Based, Startups, FinTech, Consulting).
  - **2. Role & Technical Stack**: Technical Role, Job Description, Responsibilities (dynamic bullet inputs), Required Skills (interactive tag pills), Preferred Skills.
  - **3. Eligibility Criteria**: Required Degree, Eligible Branches (CS, IT, ECE, EE, ME, etc.), Minimum CGPA threshold (e.g. 7.5), Maximum Allowed Backlogs (e.g. 0), Eligible Graduation Batches (2025, 2026, 2027), Experience level.
  - **4. Logistics & Compensation**: Location, Work Mode (`On-site`, `Hybrid`, `Remote`), Employment Type (`Full-time`, `Internship`, `Contract`), Package (CTC or Stipend), Vacancies.
  - **5. Schedule & Selection Process**: Application Start Date & Deadline (triggers automatic countdown badges), Hiring Process Steps (e.g., *Online Assessment ➔ Technical Round 1 ➔ Technical Round 2 ➔ HR Discussion*), and special instructions.
- **Slide-Over Applicant Pipeline Drawer (`#applicantDrawer`)**:
  - Triggered by clicking the applicant badge or "View Pipeline" on any job row.
  - **Automatic ML Ranking**: Candidates are sorted in descending order of their **ML Eligibility Match %**, placing the most compatible engineers at the top.
  - Quick-sort dropdown: Highest Match % First, Highest CGPA First, Newest First.
  - Clicking any applicant opens the **Candidate Profile Snapshot Modal** displaying Class 10 %, Class 12 %, B.Tech CGPA, active backlogs, matched skills vs. missing skills, and a 1-click button to download/preview their attached CV.
  - **Status Update Pills**: One-click dropdown / pills (`Applied`, `Under Review`, `Shortlisted`, `Selected`, `Rejected`) that update candidate stages in real time and trigger instant toast notifications.

---

## 3. Student "Explore Jobs" Portal (`student/jobs.html`)

### A. Elevated Smart Job Cards
Each job card in the grid layout features:
1. **Company Branding**: High-resolution company logo with an algorithmic gradient initials fallback avatar if the logo URL is missing or broken.
2. **Key Metadata Badges**: Work Mode badge (`Hybrid`, `On-site`, `Remote`) and Salary/Stipend badge.
3. **Dynamic Circular SVG ML Match Ring**:
   - Rendered using mathematical SVG circle dash offsets:
     $$\text{Offset} = \text{Circumference} - \left(\frac{\text{Score}}{100} \times \text{Circumference}\right)$$
   - Color-coded: Emerald Green ($\ge 80\%$), Amber ($50\% - 79\%$), Rose Red ($< 50\%$).
4. **Eligibility Pill**:
   - `✓ Eligible to Apply` (in soft emerald): When student CGPA $\ge$ required CGPA and backlogs $\le$ max backlogs.
   - `⚠ CGPA or Skill Gap` (in soft red): When student falls below criteria.
5. **Urgency Countdown Pill**:
   - `🔥 Closes in 2 days`
   - `⚡ Closes Today`
   - `⏳ 14 days left`
   - `Closed` (blocks application)
6. **Card Hover Micro-Interactions**: Smooth `transform: translateY(-5px)` and glowing border box-shadow.

### B. Sticky Filter Toolbar
- Real-time client-side search by title, company, or technical skill.
- Filters for Role, Work Mode, Employment Type, and Salary Range.
- **"Show Only Eligible Jobs" Toggle Switch**: Filters out any corporate postings where the student fails academic or backlog thresholds.
- **Bookmarking Engine**: Students can bookmark openings for later review with persistent `localStorage` saving.

### C. Rich Job Details View & AI Eligibility Insights
Clicking any job card opens an expanded modal featuring:
- **Hero Header**: Company banner, logo, title, location, salary package, and sticky apply action bar.
- **Personalized AI Eligibility & Skill-Gap Card**: Glassmorphic comparison card displaying:
  - Matched Skills (Green ✓ pills)
  - Missing Skills (Red ✗ pills with upskilling recommendations)
  - Academic Check Grid: Student CGPA vs. Required CGPA, Backlogs check, Branch check.
- **Visual Selection Roadmap**: Renders the corporate selection stages as a connected horizontal timeline.
- **Similar Openings Carousel**: Recommends related positions from the same industry category.

### D. Frictionless 1-Click Apply Flow
When clicking "Apply Now":
1. **Validation Gates**:
   - Verifies active session (prompts login if unauthenticated).
   - Verifies deadline (blocks submission if expired).
   - Verifies duplicate status (blocks duplicate submissions and displays `✓ Applied on [Date]`).
2. **1-Click Application Confirmation Modal**:
   - Displays pre-filled student academic snapshot (Class 10 %, Class 12 %, B.Tech CGPA).
   - Displays current AI Fit % and ATS Resume Score.
   - Allows choosing between the auto-generated PlacementPro ATS Resume or uploading a custom PDF file.
3. **Submission Celebration**:
   - Triggers celebratory multi-color **Canvas Confetti** animation across the screen.
   - Displays an animated success toast notification.
   - Changes the action button to a disabled `✓ Applied` state.

---

## 4. "My Applications" Visual Progress Tracker (`student/applications.html`)

### A. Summary Metric Cards
Top metrics row tracking the student's hiring funnel:
- **Total Applied**: Number of active submissions.
- **Under Review**: Applications currently being screened by HR.
- **Shortlisted**: Applications that have progressed to technical rounds.
- **Interview / Offers**: Applications with final interview calls or formal placement offers.

### B. 5-Step Visual Stepper Timeline
For every applied position, an interactive horizontal progress bar is rendered:
$$\text{Applied} \longrightarrow \text{Under Review} \longrightarrow \text{Shortlisted} \longrightarrow \text{Interview} \longrightarrow \text{Selected / Rejected}$$

- **Active Stage Pulse Indicator**: The current stage circle pulses with an outer glow animation (`@keyframes pulseCircle`).
- **Completed Nodes**: Highlighted in emerald green with checkmark icons.
- **Rejected Nodes**: Highlighted in rose red with descriptive feedback.
- **Submitted Snapshot Modal**: Allows students to review the exact resume and academic scores submitted to the company.

---

## 5. Resilient Hybrid Synchronization Architecture (`Frontend/js/job-store.js`)
To guarantee zero "Failed to Fetch" errors during presentations:
1. Every write operation (`saveJob`, `applyForJob`, `updateApplicationStatus`) attempts to push to the live Node.js/MongoDB REST API on port 5000.
2. Simultaneously, it updates `localStorage` namespaced by the user's email (`placementpro_jobs_<email>`, `placementpro_applications_<email>`).
3. If the backend server is offline or MongoDB is down, the system transparently reads and writes to the synchronized local storage without showing browser errors or broken loaders.
4. Six realistic corporate jobs (**TCS, Infosys, Zoho, Flipkart, Amazon, Cognizant**) are permanently pre-seeded.
