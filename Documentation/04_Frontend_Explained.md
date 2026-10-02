# 04. Frontend Explained (HTML/CSS/JS)

The Frontend, housed in the `Frontend/` folder, represents the client-facing presentation tier of the application. It is engineered to be a responsive, intuitive, and visually appealing Single Page Application (SPA)-like experience without the overhead of heavy component frameworks.

## Key Technologies Used
- **HTML5:** The core markup language defining the semantic structure, accessible layout, and fundamental content of the application.
- **CSS3:** The styling language used to control typography, color palettes, animations, and complex grid/flexbox layouts.
- **Bootstrap 5:** A powerful, mobile-first CSS framework utilized to rapidly implement responsive design, grid systems, and pre-styled UI components (modals, cards, navbars).
- **JavaScript (ES6+):** The client-side programming language that drives dynamic DOM manipulation, asynchronous data fetching, and state management within the browser.

## Folder Structure Explained

### 1. Public Interfaces (`index.html`, `login.html`, `register.html`)
- **Purpose:** The unauthenticated landing and entry points.
- **Mechanism:** `index.html` serves as the marketing and informational landing page. `login.html` and `register.html` capture user credentials and communicate with the **Node.js** backend authentication routes via **JavaScript** `fetch()` calls.

### 2. The Dashboard (`student/`)
- **Purpose:** The authenticated, private user interface where the core value of the application is delivered.
- **Mechanism:** 
  - `dashboard.html`: The central hub providing a high-level summary of the user's profile completeness, strongest predicted role, and actionable alerts.
  - `profile.html`: A dynamic form interface where users manage their technical matrix (CGPA, skills, etc.).
  - `companies.html`: A catalog interface displaying potential employers, categorized strategically (Startups, Product-based, Service-based).
  - `analysis.html`: The critical results view. It renders the "Hard Eligibility" status and visually graphs the prediction scores returned by the **Python** **Machine Learning** API.
  - `skill-gap.html`: A detailed analytical view visualizing the output of the backend's skill gap service, segmenting missing skills by priority to guide the student's learning path.

### 3. Resume Generation (`student/resume.html`)
- **Purpose:** Automated document creation.
- **Mechanism:** This module consumes the student's aggregated data and maps it into a professional resume template using **HTML5** and **CSS3**. It integrates a specialized **JavaScript** library (`html2pdf.js`) to capture the DOM structure and render it client-side into a downloadable, high-fidelity PDF, avoiding server-side PDF generation overhead.

### 4. Styling & Logic (`css/style.css`, `js/api.js`)
- **`css/style.css`:** Overrides and extends **Bootstrap 5** defaults. It implements custom hover micro-interactions, complex gradient backgrounds, and specific component spacing to achieve a premium aesthetic.
- **`js/api.js`:** The core communication layer. This file abstracts all `fetch()` API calls, handling asynchronous communication (Promises/async-await), JSON serialization/deserialization, and basic error handling when communicating with the **Node.js** backend (`http://localhost:5000/api/...`).
