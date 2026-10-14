# 07. Module B — Split-Screen Live AI Resume Studio

## 1. Module Overview & Problem Statement
In traditional career portals, resume builders are clunky and disconnected:
- Controls take up the entire screen, pushing the actual resume off the viewport.
- Users have to scroll up and down or fill out multi-page wizards just to see if their changes fit on an A4 sheet.
- "AI enhancements" are often black-box text replacements with no visual clarity or immediate feedback.

The **Split-Screen Live AI Resume Studio** in PlacementPro AI solves this by transforming the builder into a high-performance, real-time engineering laboratory:
- **38% Left AI Control Panel (Scrollable)**: Consolidates target role tailoring, circular ATS score calculation, 1-click AI action suites, template selectors, and profile photo management.
- **62% Right Live A4 Resume Canvas (Pinned/Sticky)**: Renders a physical A4 sheet floating on a clay desk with zoom controls (`-`, `+`, `Fit to View`).
- **Instant Visual Flash Feedback**: Clicking any AI button triggers an immediate highlight flash on the resume paper, visibly updating words and metrics in real time without page refreshes.

---

## 2. Split-Screen Studio Architecture & Viewport Layout

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TOP STUDIO BAR: Live AI Resume Studio   [Refresh Profile]  [Download Print-Ready PDF]  │
├────────────────────────────────────────┬───────────────────────────────────────────────┤
│ ◄─── LEFT AI CONTROL PANEL (38%) ───► │ ◄────── RIGHT LIVE A4 RESUME PREVIEW (62%) ────►│
│                                        │                                               │
│ [Target Role Dropdown: SDE/ML/MNC/Dev] │ [VIEW MODE: 📄 Basic Profile | ✨ AI MNC Opt]  │
│                                        │ [Zoom: [-] 85% [+] [Fit]]                     │
│ ┌────────────────────────────────────┐ │ ┌───────────────────────────────────────────┐ │
│ │ ATS Keyword Fit: 94% [MNC Ready]   │ │ │               PHYSICAL A4 SHEET           │ │
│ │ Circular Animated Ring (SVG)       │ │ │               (794px x 1123px)            │ │
│ │ Detected (14) vs Missing (3)       │ │ │                                           │ │
│ └────────────────────────────────────┘ │ │  STUDENT NAME                             │ │
│                                        │ │  B.Tech IT | College of Engineering        │ │
│ ┌────────────────────────────────────┐ │ │                                           │ │
│ │ 1-CLICK AI ENHANCERS               │ │ │  PROFESSIONAL SUMMARY                     │ │
│ │ 🚀 1-Click MNC / FAANG Upgrade     │ │ │  Results-oriented Software Development... │ │
│ │ ⚡ AI Fix Verbs & Quantify Impact   │ │ │                                           │ │
│ │ 🔑 Smart ATS Keyword Auto-Injector │ │ │  EDUCATION TABLE                          │ │
│ └────────────────────────────────────┘ │ │  10th | 12th | B.Tech CGPA: 8.42          │ │
│                                        │ │                                           │ │
│ ┌────────────────────────────────────┐ │ │  TECHNICAL SKILLS (Categorized Rows)      │ │
│ │ RECRUITER VISUAL TEMPLATES         │ │ │                                           │ │
│ │ [FAANG]  [Modern MNC]  [IIT/NIT]   │ │ │  KEY PROJECTS (STAR Method Bullets)       │ │
│ └────────────────────────────────────┘ │ │  • Architected full-stack platform...    │ │
│                                        │ │  • Optimized database queries by 42%...   │ │
│ [Profile Photo Uploader & Controls]    │ │                                           │ │
│                                        │ └───────────────────────────────────────────┘ │
└────────────────────────────────────────┴───────────────────────────────────────────────┘
```

---

## 3. Real-Time "Basic-to-MNC" Transformation Engine

### A. "🚀 1-Click MNC / FAANG Upgrade" (`applyMNCUpgrade()`)
Transforms student phrasing into executive engineering terminology:

#### 1. Professional Summary Rewrite:
- **Basic Phrasing**:
  > *"Dedicated B.Tech student passionate about technology and problem solving. Looking for an entry-level software job."*
- **Transformed MNC Executive Summary**:
  > *"Results-oriented Software Development Engineer specializing in Full-Stack web architecture, microservices, and algorithmic problem-solving. Proficient in architecting low-latency RESTful APIs, high-throughput backend services, and modular React.js frontends. Demonstrated track record of optimizing database queries and deploying clean, scalable code in cross-functional Agile workflows."*

#### 2. STAR-Method Bullet Rewriter with Quantified Metrics:
- **Basic Phrasing**:
  > *"Made a student placement website using HTML, JS, and Python."*
- **Transformed STAR-Method Engineering Bullet**:
  > *"Architected an end-to-end Machine Learning eligibility predictor evaluating 15+ student academic parameters against corporate hiring criteria, automating skill-gap detection and improving candidate-company matching accuracy by 40%."*

---

### B. "⚡ AI Fix Verbs & Quantify Impact" (`applyAIVerbsFix()`)
Scans all text nodes across the resume and executes dictionary replacements targeting weak or passive phrasing:

| Weak / Passive Verb | High-Impact MNC Action Verb |
| :--- | :--- |
| `Made` / `Built` | **Architected** / **Engineered** |
| `Worked on` | **Spearheaded** |
| `Helped with` | **Orchestrated cross-functional delivery of** |
| `Used` | **Leveraged** |
| `Created` | **Designed and deployed** |
| `Did` | **Executed** |
| `Handled` | **Managed and optimized** |
| `Wrote` | **Authored high-coverage modular code for** |

#### Emerald Glowing Animation (`.word-upgrade-flash`):
Every upgraded word is wrapped in an ephemeral HTML span that pulses with an emerald green glow for 3 seconds:
```css
@keyframes wordHighlightFlash {
    0%   { background: #bbf7d0; color: #065f46; box-shadow: 0 0 8px rgba(16,185,129,.5); border-radius: 4px; padding: 1px 3px; }
    80%  { background: #dcfce7; color: #065f46; border-radius: 4px; padding: 1px 3px; }
    100% { background: transparent; color: inherit; box-shadow: none; padding: 0; }
}
```

---

### C. "🔑 Smart ATS Keyword Auto-Injector" (`applyAutoInjectKeywords()`)
1. Pulls the target role's missing critical keywords (e.g., `React.js`, `REST APIs`, `FastAPI`, `Docker`, `PostgreSQL`, `System Design`).
2. Intelligently sorts and weaves them into the **4 Technical Skills Categorized Rows**:
   - **Programming Languages**: `Java, Python, C++, JavaScript, TypeScript`
   - **Web & Frameworks**: `React.js, Node.js, Express, REST APIs, FastAPI, HTML5, CSS3`
   - **Databases & Cloud**: `PostgreSQL, MongoDB, MySQL, Redis, Docker, Git, AWS Cloud`
   - **Core CS & Algorithms**: `Data Structures & Algorithms, System Design, Object-Oriented Design (OOP), DBMS, CI/CD Pipelines`
3. **Smooth Animated Score Jump**:
   The circular SVG score ring animates smoothly upward from its baseline score (e.g. 35%) to **94%+ (MNC Ready)** in vibrant emerald green, while missing red ✗ pills convert into green ✓ pills.

---

### D. Before / After Toggle Switch
- Located in the top preview action bar: `[ 📄 Basic Profile | ✨ AI MNC-Optimized ]`
- Allows the user to flip back and forth instantaneously.
- Demonstrates the dramatic difference between raw student drafting and professional executive engineering standards.

---

## 4. Recruiter-Approved Visual Templates

Clicking the template buttons switches the A4 stylesheet class instantly without page reloads:

### 1. FAANG / Jake's Resume Standard (`.tpl-faang`)
- Ultra-clean, single-column, high-density layout.
- Classic technical serif/sans hybrid typography (Times/Georgia with Inter dates).
- Solid black section divider rules (`border-bottom: 1.5px solid #0f172a`).
- Right-aligned dates and institutional locations.

### 2. Modern MNC Executive (`.tpl-modern`)
- Crisp navy/indigo top accent band (`border-top: 10px solid #4338ca`).
- Styled candidate header card with left-border accent.
- Circular section bullets and clean structured badge grids.

### 3. Minimalist IIT/NIT Placement Standard (`.tpl-iit`)
- Modeled after official IIT/NIT Training & Placement Cell templates.
- Features a high-density, grid-bordered academic summary table at the top comparing Class 10, Class 12, and B.Tech semester scores.
- Compact boxed section headers (`background: #f3f4f6; border-left: 4px solid #111827`).

---

## 5. Target Role AI Tailor Dropdown
Selecting a role from the dropdown immediately tunes the entire studio:
- **SDE / Full-Stack**: Prioritizes Data Structures, Algorithms, React, Node.js, System Design.
- **Data Science / ML**: Prioritizes Python, Pandas, NumPy, Scikit-Learn, TensorFlow, Statistics.
- **Core IT / Service MNC (TCS/Infosys)**: Prioritizes Java, Python, SQL, OOP, DBMS, SDLC.
- **Cloud & DevOps**: Prioritizes Linux, Docker, Kubernetes, AWS, CI/CD, Terraform.

---

## 6. Persistence & Clean PDF Export

### Persistence:
The state of the AI studio (`isAIOptimized`, `currentTemplate`, `currentTargetRole`, `aiUpgradesApplied`, `aiOptimizedData`) is saved to `localStorage` under `placementpro_resume_ai_state_<email>`. Refreshing the browser preserves every enhancement.

### Clean PDF Export (`downloadPDF()`):
- Temporarily scales the A4 paper to `scale(1)` for maximum resolution.
- Invokes `html2pdf.js` with A4 dimensions (210mm x 297mm) at $2\times$ pixel density.
- Includes strict `@media print` rules:
  - Hides the sidebar, studio topbar, left AI control panel, zoom pills, and background meshes (`display: none !important`).
  - Strips shadows and background colors.
  - Ensures a crisp, 100% clean physical paper output ready for corporate submission.
