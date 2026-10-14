# 02. Backend Tier Deep-Dive (Node.js, Express & MongoDB)

The Backend tier resides in the `Backend/` directory and executes on **Port 5000**. It acts as the central API gateway, security gatekeeper, database persistence layer, and proxy to the Python Machine Learning microservice.

---

## 1. Technology Stack & Key Dependencies
- **Node.js (v18+)**: Asynchronous event-driven JavaScript runtime.
- **Express.js (v4.18)**: High-performance web framework providing RESTful routing and middleware pipelining.
- **MongoDB (v6.0+) & Mongoose ODM (v8.0)**: Strict schema validation, automatic indexing, and document lifecycle hooks.
- **Axios (v1.6)**: HTTP client used for inter-service communication from Node.js to the Python ML microservice on Port 5001.
- **CORS & Body-Parser**: Configured to accept incoming cross-origin requests from the client tier (`http://127.0.0.1:3006`).
- **Dotenv**: Environment variable isolation for database URIs, JWT secrets, and port assignments.

---

## 2. Exhaustive File-by-File Breakdown

### A. Core Entry Points
#### 1. [`Backend/server.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Backend/server.js)
- **Role**: Process bootstrapper.
- **Implementation**: Imports `app.js`, invokes `connectDB()`, reads `PORT` from environment variables (defaults to `5000`), and begins listening for incoming socket connections.
- **Error Handling**: Catches unhandled promise rejections and logs database connection status cleanly.

#### 2. [`Backend/app.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Backend/app.js)
- **Role**: Express application and middleware configuration hub.
- **Implementation**:
  - Initializes Express application instance.
  - Registers `cors()` enabling browser cross-origin requests.
  - Registers `express.json({ limit: '10mb' })` and `express.urlencoded()` to handle large resume and profile payloads.
  - Mounts REST API routes:
    - `/api/students` ➔ `studentRoute.js`
    - `/api/companies` ➔ `companyRoute.js`
    - `/api/analysis` ➔ `analysisRoute.js`
    - `/api/jobs` ➔ `jobRoute.js` *(Today's addition)*
    - `/api/applications` ➔ `applicationRoute.js` *(Today's addition)*

---

### B. Configuration & Pre-Seeding
#### 3. [`Backend/config/db.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Backend/config/db.js)
- **Role**: MongoDB database connector with resilience policy.
- **Mechanism**: Connects to `MONGO_URI`. If MongoDB is offline or fails to start, it logs an informative warning rather than crashing the Node process with an unhandled exception (`process.exit(1)` is avoided so the server continues running in hybrid memory fallback mode).

#### 4. [`Backend/config/seedJobs.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Backend/config/seedJobs.js)
- **Role**: Enterprise corporate job dataset seed.
- **Data Seeded**: Contains 6 top-tier realistic Indian placement openings:
  1. **TCS Digital**: Full Stack Developer (7.0 - 9.5 LPA, min CGPA 7.0, 0 backlogs).
  2. **Infosys Power Programmer**: Specialist Programmer / Backend (9.5 - 11.5 LPA, min CGPA 7.5).
  3. **Zoho Corporation**: Member Technical Staff (MTS) / Full Stack (8.0 - 12.0 LPA, min CGPA 6.0, all branches).
  4. **Flipkart**: SDE-1 E-Commerce Backend (18.0 - 24.0 LPA, min CGPA 7.5).
  5. **Amazon**: SDE Intern / Co-op (₹80,000/mo stipend with PPO up to 45 LPA).
  6. **Cognizant**: GenC Next Developer (6.75 - 9.0 LPA, min CGPA 6.5).

---

### C. Database Schemas (`Backend/models/`)
#### 5. [`Backend/models/Student.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Backend/models/Student.js)
- **Purpose**: Defines comprehensive student academic, technical, and biographical records.
- **Key Schema Attributes**:
  - `personalDetails`: `name`, `email` (unique index), `phone`, `location`, `college`, `branch`.
  - `academicDetails`: `cgpa` (Number, 0-10), `backlogs` (Number), `gradYear` (Number), `madhyamik` (10th) marks, `higherSec` (12th) marks.
  - `techSkills`: `programming` (Array of Strings), `web` (Array), `databases` (Array), `dsa` (Enum: `Beginner`, `Intermediate`, `Advanced`).
  - `projects`: Array of `{ title, tech, points, link }`.
  - `internships`: Array of `{ company, role, startDate, endDate, deliverables }`.
  - `codingContests` & `hackathons`: Performance and ratings history.
  - `timestamps`: `createdAt`, `updatedAt`.

#### 6. [`Backend/models/Job.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Backend/models/Job.js)
- **Purpose**: Enterprise job listing model.
- **Key Schema Attributes**:
  - `title`, `companyName`, `companyLogo` (with initials avatar fallback logic).
  - `category` (Enum: `Product-Based`, `Service-Based`, `Startups`, `FinTech`, `Consulting`, `Other`).
  - `technicalRole`, `description`, `responsibilities` (Array of strings).
  - `requiredSkills` & `preferredSkills` (Arrays of strings).
  - `eligibility`: `{ requiredDegree, eligibleBranches, minimumCGPA, maximumBacklogs, eligibleBatches, experienceLevel }`.
  - `location`, `workMode` (`On-site`, `Hybrid`, `Remote`), `employmentType` (`Full-time`, `Internship`, `Contract`).
  - `salary` (CTC/Stipend string), `vacancies` (Number).
  - `startDate`, `deadline` (Date with automatic countdown calculations).
  - `selectionProcess` (Array of hiring round steps).
  - `status` (`Active`, `Draft`, `Closed`).
  - `indexes`: Text search indexed on `title`, `companyName`, and `requiredSkills`.

#### 7. [`Backend/models/JobApplication.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Backend/models/JobApplication.js)
- **Purpose**: Tracks student applications through the corporate recruitment funnel.
- **Key Schema Attributes**:
  - `jobId` (ObjectId referencing `Job`).
  - `studentEmail`, `studentName`, `jobTitle`, `companyName`.
  - `studentSnapshot`: Frozen academic record at the time of application (CGPA, backlogs, branch, 10th/12th percentages).
  - `mlMatchScore`: Real-time match percentage recorded upon submission (0-100).
  - `matchedSkills` & `missingSkills`: Arrays of strings.
  - `atsScore`: ATS compatibility metric.
  - `resumeType`: `generated` (PlacementPro ATS resume) or `uploaded` (custom PDF).
  - `status`: Enum (`Applied`, `Under Review`, `Shortlisted`, `Selected`, `Rejected`).
  - `statusHistory`: Timeline tracking timestamped stage transitions with recruiter notes.

#### 8. [`Backend/models/Company.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Backend/models/Company.js)
- **Purpose**: Defines corporate hiring benchmarks for the historical company matching engine (TCS, Infosys, Wipro, Google, Microsoft, Accenture).

---

### D. Controllers & Business Logic (`Backend/controllers/`)
#### 9. [`Backend/controllers/jobController.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Backend/controllers/jobController.js)
- **Features**:
  - `getAllJobs()`: Fetches all posted jobs with support for search filters, category pills, and live statuses.
  - `getJobById()`: Returns complete job details.
  - `createJob()`: Validates required fields and saves new company job postings.
  - `updateJob()`: Updates job information.
  - `toggleJobStatus()`: 1-click live toggle switch between `Active`, `Draft`, and `Closed`.
  - `deleteJob()`: Removes a job posting.
  - `getJobApplicants()`: Retrieves all candidates who applied for a specific job, automatically sorted in descending order by `mlMatchScore`.
  - **Memory Cache Fallback**: When MongoDB is disconnected, stores jobs in an in-memory repository pre-loaded with `seedJobs.js` so endpoints never fail.

#### 10. [`Backend/controllers/applicationController.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Backend/controllers/applicationController.js)
- **Features**:
  - `submitApplication()`: Checks for duplicate applications per student email, validates eligibility, records candidate profile snapshot, and stores application.
  - `getStudentApplications()`: Fetches all applications filed by a specific student email.
  - `updateApplicationStatus()`: Recruiter 1-click status update (`Applied` ➔ `Under Review` ➔ `Shortlisted` ➔ `Selected` / `Rejected`) and pushes to status history timeline.

#### 11. [`Backend/controllers/analysisController.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Backend/controllers/analysisController.js)
- **Features**:
  - `analyzeCompanySuitability()`: Passes student profile to Python ML microservice `/predict-company`. If Python is offline, executes a deterministic academic fallback:
    $$\text{Fallback Score} = \min(99, \max(30, \text{round}(\text{CGPA} \times 10 - \text{Backlogs} \times 5)))$$
  - `analyzeRoles()`: Proxies to Python ML `/predict-role`.
  - `analyzeSkillGap()`: Proxies to Python ML `/skill-gap`.

#### 12. [`Backend/controllers/studentController.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Backend/controllers/studentController.js)
- **Features**: Handles profile creation, updating, and lookups by unique email address.

---

### E. Specialized Services (`Backend/services/`)
#### 13. [`Backend/services/skillGapService.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Backend/services/skillGapService.js)
- **Function**: `generateExplainableScore(student, company, mlScore)`
- **Mechanism**: Calculates set intersection and difference between student skills and target company skills. Segments missing skills into:
  - **Critical Skills** (must-learn immediately to pass technical screening)
  - **Recommended Skills** (gives competitive advantage in interview rounds)
  - **Bonus Skills** (nice to have)

#### 14. [`Backend/services/eligibilityService.js`](file:///c:/Users/maity/OneDrive/Desktop/roni/Backend/services/eligibilityService.js)
- **Function**: Executes binary hard criteria rules (CGPA minimums, maximum backlog limits, eligible degree branches). Returns boolean status and structured explanation strings.

---

## 3. Complete REST API Endpoint Directory

| Method | Endpoint | Description | Request Body / Query |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/jobs` | Retrieve all jobs (filtered) | `?status=Active&category=...&search=...` |
| **GET** | `/api/jobs/:id` | Get single job details | URL param `:id` |
| **POST** | `/api/jobs` | Create new job posting | Full Job JSON payload |
| **PUT** | `/api/jobs/:id` | Update job posting | Full Job JSON payload |
| **PATCH** | `/api/jobs/:id/status`| 1-Click Toggle Active/Closed | `{ status: "Active" }` |
| **DELETE**| `/api/jobs/:id` | Delete job posting | URL param `:id` |
| **GET** | `/api/jobs/:id/applicants`| Get applicants for job | Sorted by `mlMatchScore` desc |
| **POST** | `/api/applications` | Submit 1-click application | `{ jobId, studentEmail, resumeType, ... }` |
| **GET** | `/api/applications/student/:email` | Get student applications | URL param `:email` |
| **PATCH** | `/api/applications/:id/status` | Update candidate status | `{ status: "Shortlisted", notes: "..." }` |
| **POST** | `/api/analysis/company` | ML Company Compatibility | `{ student, company }` |
| **POST** | `/api/analysis/roles` | ML Career Role Compatibility| `{ student }` |
| **POST** | `/api/analysis/skill-gap` | Target Role Skill Gap | `{ student, targetRole }` |
| **POST** | `/api/students/profile`| Upsert Student Profile | Complete student profile JSON |
| **GET** | `/api/students/profile/:email`| Get profile by email | URL param `:email` |
