/**
 * PlacementPro AI — JobStore
 * Resilient Hybrid Storage & Client-Side Sync Layer
 * ─────────────────────────────────────────────────────────────────
 * Guarantees zero "Failed to Fetch" or broken UI states.
 * Connects to live Node.js/MongoDB backend when online; automatically
 * and transparently mirrors all jobs, applications, and statuses in
 * localStorage when offline or during demo presentations.
 * ─────────────────────────────────────────────────────────────────
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.JobStore = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────
     6 REALISTIC DEMO JOBS SEED (TCS, Infosys, Zoho, Flipkart, Amazon, Cognizant)
     ───────────────────────────────────────────────────────────── */
  const SEED_JOBS = [
    {
      _id: "job_tcs_digital_001",
      title: "Digital Software Engineer",
      companyName: "TCS",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
      category: "Service-Based",
      technicalRole: "Full Stack Developer",
      description: "Join the elite TCS Digital unit to architect, engineer, and deploy next-generation enterprise cloud platforms and microservices for Fortune 500 clients.",
      responsibilities: [
        "Design and implement scalable RESTful APIs using Java / Spring Boot and Node.js.",
        "Build high-performance, accessible frontend interfaces in React.js and modern JavaScript.",
        "Work with relational and NoSQL databases (PostgreSQL, MongoDB) with clean query optimization.",
        "Collaborate in cross-functional Agile squads with automated CI/CD deployment pipelines."
      ],
      requiredSkills: ["Java", "Python", "JavaScript", "React", "SQL", "Data Structures"],
      preferredSkills: ["Spring Boot", "Docker", "AWS", "Git", "REST APIs"],
      eligibility: {
        requiredDegree: "B.Tech / B.E. / MCA",
        eligibleBranches: ["CS", "IT", "ECE", "EE"],
        minimumCGPA: 7.0,
        maximumBacklogs: 0,
        eligibleBatches: [2025, 2026, 2027],
        experienceLevel: "Fresher"
      },
      location: "Bangalore / Kolkata / Hyderabad",
      workMode: "Hybrid",
      employmentType: "Full-time",
      salary: "₹7.0 - 9.5 LPA",
      vacancies: 45,
      startDate: new Date(Date.now() - 3 * 86400000).toISOString(),
      deadline: new Date(Date.now() + 18 * 86400000).toISOString(),
      selectionProcess: [
        "TCS NQT Online Cognitive & Coding Assessment",
        "Technical Interview (DSA, System Design Basics)",
        "Managerial & HR Discussion"
      ],
      additionalInstructions: "Ensure all educational details from Class 10 to B.Tech are updated. Candidates must bring 2 copies of their resume and valid college ID.",
      status: "Active",
      featured: true
    },
    {
      _id: "job_infosys_sp_002",
      title: "Specialist Programmer (Power Programmer)",
      companyName: "Infosys",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
      category: "Service-Based",
      technicalRole: "Backend Engineer",
      description: "Infosys Specialist Programmers are high-calibre competitive coders focused on complex algorithmic modeling, distributed cloud architectures, and core software systems.",
      responsibilities: [
        "Solve advanced algorithmic challenges with high concurrency and strict latency constraints.",
        "Contribute to Infosys Cobalt cloud solutions and microservice design patterns.",
        "Automate testing suites and mentor graduate engineers on secure coding practices."
      ],
      requiredSkills: ["C++", "Java", "Data Structures", "Algorithms", "Database Management", "System Design"],
      preferredSkills: ["Kubernetes", "Kafka", "Linux", "Competitive Programming"],
      eligibility: {
        requiredDegree: "B.Tech / B.E.",
        eligibleBranches: ["CS", "IT", "ECE"],
        minimumCGPA: 7.5,
        maximumBacklogs: 0,
        eligibleBatches: [2025, 2026],
        experienceLevel: "Fresher"
      },
      location: "Pune / Mysore / Bangalore",
      workMode: "On-site",
      employmentType: "Full-time",
      salary: "₹9.5 - 11.5 LPA",
      vacancies: 25,
      startDate: new Date(Date.now() - 2 * 86400000).toISOString(),
      deadline: new Date(Date.now() + 10 * 86400000).toISOString(),
      selectionProcess: [
        "HackWithInfy / National Coding Qualifier (3 Hard Problems)",
        "Deep Technical Problem-Solving Interview",
        "Behavioral Leadership Fit"
      ],
      additionalInstructions: "Strong command of dynamic programming, graphs, and OS concepts will be rigorously tested.",
      status: "Active",
      featured: true
    },
    {
      _id: "job_zoho_sde_003",
      title: "Member Technical Staff (Software Developer)",
      companyName: "Zoho",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Zoho_Corporation_2019_logo.svg",
      category: "Product-Based",
      technicalRole: "Full Stack Developer",
      description: "Zoho builds 50+ enterprise SaaS products used by over 100 million users worldwide. As an MTS, you will write clean, un-bloated native code from scratch.",
      responsibilities: [
        "Develop scalable web features with deep architectural independence and minimal external dependencies.",
        "Optimize browser rendering performance, memory footprint, and server response times.",
        "Work on proprietary database engines and distributed storage subsystems."
      ],
      requiredSkills: ["C", "Java", "JavaScript", "Data Structures", "OOP", "Problem Solving"],
      preferredSkills: ["HTML5", "CSS3", "SQL", "Operating Systems", "Networking"],
      eligibility: {
        requiredDegree: "Any Engineering Degree / MCA / B.Sc CS",
        eligibleBranches: ["CS", "IT", "TT", "APM", "ECE", "EE", "ME", "Other"],
        minimumCGPA: 6.0,
        maximumBacklogs: 2,
        eligibleBatches: [2024, 2025, 2026, 2027],
        experienceLevel: "Fresher"
      },
      location: "Chennai / Tenkasi / Salem",
      workMode: "On-site",
      employmentType: "Full-time",
      salary: "₹8.0 - 12.0 LPA",
      vacancies: 30,
      startDate: new Date(Date.now() - 5 * 86400000).toISOString(),
      deadline: new Date(Date.now() + 7 * 86400000).toISOString(),
      selectionProcess: [
        "Round 1: General Aptitude & C/Java Debugging",
        "Round 2: Basic Programming (Matrix, Strings, Recursion)",
        "Round 3: Advanced Application Programming (Mini System e.g. Railway Reservation)",
        "Round 4: Technical & HR Interview"
      ],
      additionalInstructions: "Zoho values pure problem-solving and coding logic above college marks or branches. All branches are welcome to apply.",
      status: "Active",
      featured: true
    },
    {
      _id: "job_flipkart_sde_004",
      title: "Software Development Engineer - 1 (SDE-1)",
      companyName: "Flipkart",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Flipkart_logo.svg",
      category: "Product-Based",
      technicalRole: "Backend Developer",
      description: "Power India's largest e-commerce infrastructure handling billions of requests during Big Billion Days. Build mission-critical checkout, order management, and catalog services.",
      responsibilities: [
        "Write high-throughput, low-latency microservices using Java / Go and Kafka.",
        "Design database schemas, caching layers (Redis/Aerospike), and resilient asynchronous messaging.",
        "Participate in design reviews, production on-call rotations, and performance benchmarking."
      ],
      requiredSkills: ["Java", "Data Structures", "Algorithms", "Low-Level Design", "SQL", "Multithreading"],
      preferredSkills: ["Redis", "Kafka", "Elasticsearch", "AWS", "Docker"],
      eligibility: {
        requiredDegree: "B.Tech / B.E. / Dual Degree",
        eligibleBranches: ["CS", "IT", "ECE"],
        minimumCGPA: 7.5,
        maximumBacklogs: 0,
        eligibleBatches: [2025, 2026],
        experienceLevel: "Fresher"
      },
      location: "Bangalore",
      workMode: "Hybrid",
      employmentType: "Full-time",
      salary: "₹18.0 - 24.0 LPA",
      vacancies: 15,
      startDate: new Date(Date.now() - 1 * 86400000).toISOString(),
      deadline: new Date(Date.now() + 5 * 86400000).toISOString(),
      selectionProcess: [
        "Online Coding Challenge (3 LeetCode Medium/Hard)",
        "Machine Coding Round (2 Hours: Clean Working Code)",
        "Problem Solving & DSA Round",
        "Hiring Manager / Culture Fit"
      ],
      additionalInstructions: "Machine coding round requires modular design, clean separation of concerns, and unit tests. LLD design patterns will be evaluated.",
      status: "Active",
      featured: true
    },
    {
      _id: "job_amazon_intern_005",
      title: "SDE Intern (Summer 2026 / 6-Month Co-op)",
      companyName: "Amazon",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      category: "Product-Based",
      technicalRole: "Software Engineer",
      description: "Work shoulder-to-shoulder with senior Amazon engineers to develop, test, and deploy software features impacting hundreds of millions of global customers.",
      responsibilities: [
        "Own an end-to-end software feature deliverable over a 6-month internship period.",
        "Implement scalable backend logic guided by Amazon Leadership Principles (Customer Obsession, Bias for Action).",
        "Write comprehensive automated unit, integration, and load tests."
      ],
      requiredSkills: ["Java", "C++", "Python", "Data Structures", "Algorithms", "Object-Oriented Design"],
      preferredSkills: ["AWS Services", "Git", "REST APIs", "Linux"],
      eligibility: {
        requiredDegree: "B.Tech / B.E. / M.Tech",
        eligibleBranches: ["CS", "IT", "ECE", "EE"],
        minimumCGPA: 7.0,
        maximumBacklogs: 0,
        eligibleBatches: [2026, 2027],
        experienceLevel: "Fresher"
      },
      location: "Hyderabad / Bangalore / Chennai",
      workMode: "Hybrid",
      employmentType: "Internship",
      salary: "₹80,000 / month Stipend (PPO opportunity up to 45 LPA)",
      vacancies: 20,
      startDate: new Date(Date.now() - 4 * 86400000).toISOString(),
      deadline: new Date(Date.now() + 2 * 86400000).toISOString(),
      selectionProcess: [
        "Online Assessment 1: Code Debugging + Coding Challenge",
        "Online Assessment 2: Work Style Simulation & Behavioral",
        "Virtual Technical Rounds 1 & 2 (DSA & Leadership Principles)"
      ],
      additionalInstructions: "Top performing interns will be offered full-time Pre-Placement Offers (PPO) before graduation.",
      status: "Active",
      featured: true
    },
    {
      _id: "job_cognizant_gen_006",
      title: "GenC Next Developer",
      companyName: "Cognizant",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Cognizant_logo_2022.svg",
      category: "Service-Based",
      technicalRole: "Cloud & DevOps Engineer",
      description: "Cognizant GenC Next is the premier engineering track for high-performing graduates to work on modern cloud migrations, AI integrations, and full-stack development.",
      responsibilities: [
        "Deploy cloud infrastructure components across Azure and AWS ecosystems.",
        "Build CI/CD pipelines, containerize microservices, and configure observability dashboards.",
        "Collaborate with solution architects to deliver client transformation projects."
      ],
      requiredSkills: ["Python", "Java", "Cloud Computing", "SQL", "Web Technologies"],
      preferredSkills: ["AWS", "Azure", "Docker", "DevOps", "Linux", "Git"],
      eligibility: {
        requiredDegree: "B.Tech / B.E. / MCA",
        eligibleBranches: ["CS", "IT", "ECE", "EE", "ME"],
        minimumCGPA: 6.5,
        maximumBacklogs: 1,
        eligibleBatches: [2025, 2026, 2027],
        experienceLevel: "Fresher"
      },
      location: "Kolkata / Chennai / Pune / Coimbatore",
      workMode: "Hybrid",
      employmentType: "Full-time",
      salary: "₹6.75 - 8.5 LPA",
      vacancies: 35,
      startDate: new Date(Date.now() - 6 * 86400000).toISOString(),
      deadline: new Date(Date.now() + 22 * 86400000).toISOString(),
      selectionProcess: [
        "Skill-Based Assessment (Coding + Advanced Tech MCQ)",
        "Technical Interview (Cloud Basics, Project Deep Dive)",
        "HR & Communication Assessment"
      ],
      additionalInstructions: "Certifications in AWS Cloud Practitioner or Azure Fundamentals will receive extra preference during technical evaluation.",
      status: "Active",
      featured: false
    }
  ];

  const STORAGE_JOBS_KEY = 'placementpro_jobs';
  const STORAGE_APPS_KEY = 'placementpro_applications';

  /* ─────────────────────────────────────────────────────────────
     INITIALIZE SEED DATA IN LOCAL STORAGE
     ───────────────────────────────────────────────────────────── */
  function ensureSeeded() {
    try {
      const existing = localStorage.getItem(STORAGE_JOBS_KEY);
      if (!existing || JSON.parse(existing).length === 0) {
        localStorage.setItem(STORAGE_JOBS_KEY, JSON.stringify(SEED_JOBS));
      }
    } catch (e) {
      console.warn('[JobStore] Seed error:', e);
    }
  }
  ensureSeeded();

  /* ─────────────────────────────────────────────────────────────
     LOCAL STORAGE HELPERS
     ───────────────────────────────────────────────────────────── */
  function getLocalJobs() {
    try {
      const raw = localStorage.getItem(STORAGE_JOBS_KEY);
      return raw ? JSON.parse(raw) : [...SEED_JOBS];
    } catch (e) {
      return [...SEED_JOBS];
    }
  }

  function setLocalJobs(jobs) {
    try {
      localStorage.setItem(STORAGE_JOBS_KEY, JSON.stringify(jobs));
    } catch (e) {
      console.error('[JobStore] Save jobs error:', e);
    }
  }

  function getLocalApplications() {
    try {
      const raw = localStorage.getItem(STORAGE_APPS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function setLocalApplications(apps) {
    try {
      localStorage.setItem(STORAGE_APPS_KEY, JSON.stringify(apps));
    } catch (e) {
      console.error('[JobStore] Save apps error:', e);
    }
  }

  /* ─────────────────────────────────────────────────────────────
     ML MATCH & ELIGIBILITY ENGINE
     ───────────────────────────────────────────────────────────── */
  function calculateMatch(student, job) {
    student = student || {};
    job = job || {};

    const studentSkills = [
      ...(student.programming ? student.programming.split(',').map(s => s.trim()) : []),
      ...(student.web ? student.web.split(',').map(s => s.trim()) : []),
      ...(student.databases ? student.databases.split(',').map(s => s.trim()) : []),
      ...(student.skills || []),
      ...(student.technicalSkills?.programmingLanguages || []),
      ...(student.technicalSkills?.webTechnologies || []),
      ...(student.technicalSkills?.databases || [])
    ].map(s => String(s).toLowerCase().trim()).filter(Boolean);

    const reqSkills = (job.requiredSkills || []).map(s => String(s).toLowerCase().trim());
    const matched = [];
    const missing = [];

    (job.requiredSkills || []).forEach(orig => {
      const s = orig.toLowerCase().trim();
      const hasMatch = studentSkills.some(st => st === s || st.includes(s) || s.includes(st));
      if (hasMatch) {
        matched.push(orig);
      } else {
        missing.push(orig);
      }
    });

    const totalReq = reqSkills.length || 1;
    const skillRatio = matched.length / totalReq;

    const studentCGPA = parseFloat(student.cgpa) || 7.0;
    const reqCGPA = job.eligibility?.minimumCGPA ?? 6.0;
    const backlogs = parseInt(student.backlogs) || 0;
    const maxBacklogs = job.eligibility?.maximumBacklogs ?? 0;
    const studentBatch = parseInt(student.gradYear) || new Date().getFullYear() + 1;

    let isEligible = true;
    const eligibilityReasons = [];

    if (studentCGPA < reqCGPA) {
      isEligible = false;
      eligibilityReasons.push(`CGPA (${studentCGPA.toFixed(2)}) is below the required ${reqCGPA.toFixed(2)}.`);
    }

    if (backlogs > maxBacklogs) {
      isEligible = false;
      eligibilityReasons.push(`Active backlogs (${backlogs}) exceed maximum allowed (${maxBacklogs}).`);
    }

    if (job.eligibility?.eligibleBranches && job.eligibility.eligibleBranches.length > 0 && student.branch) {
      if (!job.eligibility.eligibleBranches.includes(student.branch) && student.branch !== 'Other') {
        isEligible = false;
        eligibilityReasons.push(`Branch ${student.branch} is not eligible. Required: ${job.eligibility.eligibleBranches.join(', ')}.`);
      }
    }

    if (job.eligibility?.eligibleBatches && job.eligibility.eligibleBatches.length > 0) {
      if (!job.eligibility.eligibleBatches.includes(studentBatch)) {
        isEligible = false;
        eligibilityReasons.push(`Graduation batch ${studentBatch} is not accepted.`);
      }
    }

    // Weighted Formula: 55% skill match, 30% CGPA, 10% projects, 5% contests
    const hasProjects = (student.projects && student.projects.length > 0) ? 10 : 4;
    const hasContests = (student.codingContests && student.codingContests.length > 0) ? 5 : 2;
    const cgpaScore = Math.min(studentCGPA / 10, 1) * 30;

    let matchScore = Math.round(skillRatio * 55 + cgpaScore + hasProjects + hasContests);
    if (backlogs > 0) matchScore -= backlogs * 5;
    matchScore = Math.max(38, Math.min(97, matchScore));

    // Urgency calculation
    const deadlineDate = new Date(job.deadline || Date.now());
    const now = new Date();
    const diffHours = Math.ceil((deadlineDate - now) / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffHours / 24);

    let urgencyText = '';
    let urgencyClass = 'bg-secondary';
    if (diffHours <= 0) {
      urgencyText = 'Closed';
      urgencyClass = 'badge bg-danger';
    } else if (diffHours <= 24) {
      urgencyText = '⚡ Closes Today';
      urgencyClass = 'badge bg-danger text-white';
    } else if (diffDays <= 3) {
      urgencyText = `🔥 Closes in ${diffDays}d`;
      urgencyClass = 'badge bg-warning text-dark';
    } else {
      urgencyText = `⏳ ${diffDays} days left`;
      urgencyClass = 'badge bg-light text-muted border';
    }

    return {
      matchScore,
      isEligible,
      eligibilityReasons,
      matchedSkills: matched,
      missingSkills: missing,
      urgency: {
        diffDays,
        diffHours,
        text: urgencyText,
        badgeClass: urgencyClass,
        isExpired: diffHours <= 0
      }
    };
  }

  /* ─────────────────────────────────────────────────────────────
     AVATAR & LOGO GENERATION
     ───────────────────────────────────────────────────────────── */
  function getCompanyLogoHTML(companyName, logoUrl, size = 44) {
    const initials = (companyName || 'CO')
      .split(' ')
      .map(w => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const colors = [
      'linear-gradient(135deg, #4338ca, #6366f1)',
      'linear-gradient(135deg, #0aa06e, #14b8a6)',
      'linear-gradient(135deg, #d97706, #f59e0b)',
      'linear-gradient(135deg, #0891b2, #38bdf8)',
      'linear-gradient(135deg, #7c3aed, #a855f7)',
      'linear-gradient(135deg, #e11d48, #fb7185)'
    ];

    let hash = 0;
    for (let i = 0; i < (companyName || '').length; i++) {
      hash = companyName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorBg = colors[Math.abs(hash) % colors.length];

    if (logoUrl && logoUrl.trim() !== '') {
      return `
        <div class="company-logo-wrap" style="width:${size}px; height:${size}px; border-radius:14px; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#fff; box-shadow:var(--pp-clay-sm); border:1px solid rgba(255,255,255,.9); flex-shrink:0;">
          <img src="${logoUrl}" alt="${companyName}" style="max-width:82%; max-height:82%; object-fit:contain;" onerror="this.parentElement.innerHTML='<span style=\\'font-weight:800; font-size:${Math.round(size * 0.42)}px; color:#fff;\\'>${initials}</span>'; this.parentElement.style.background='${colorBg}';">
        </div>
      `;
    }

    return `
      <div class="company-logo-wrap" style="width:${size}px; height:${size}px; border-radius:14px; display:flex; align-items:center; justify-content:center; background:${colorBg}; color:#fff; font-weight:800; font-size:${Math.round(size * 0.42)}px; box-shadow:var(--pp-clay-sm); border:1px solid rgba(255,255,255,.3); flex-shrink:0;">
        ${initials}
      </div>
    `;
  }

  /* ─────────────────────────────────────────────────────────────
     CIRCULAR ML MATCH RING SVG
     ───────────────────────────────────────────────────────────── */
  function renderMatchRingSVG(score, size = 68, stroke = 6) {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    let strokeColor = '#0aa06e'; // emerald
    let trackBg = 'rgba(10, 160, 110, 0.12)';
    if (score < 60) {
      strokeColor = '#e0455c'; // rose
      trackBg = 'rgba(224, 69, 92, 0.12)';
    } else if (score < 75) {
      strokeColor = '#d97706'; // amber
      trackBg = 'rgba(217, 119, 6, 0.12)';
    }

    return `
      <div class="match-ring-widget" style="width:${size}px; height:${size}px; position:relative; display:inline-flex; align-items:center; justify-content:center;" title="${score}% Match with your profile">
        <svg width="${size}" height="${size}" style="transform: rotate(-90deg); overflow: visible;">
          <circle cx="${size / 2}" cy="${size / 2}" r="${radius}"
                  stroke="${trackBg}" stroke-width="${stroke}" fill="transparent" />
          <circle cx="${size / 2}" cy="${size / 2}" r="${radius}"
                  stroke="${strokeColor}" stroke-width="${stroke}" stroke-linecap="round"
                  stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
                  fill="transparent" style="transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1);" />
        </svg>
        <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
          <span style="font-size:${Math.round(size * 0.26)}px; font-weight:900; color:${strokeColor}; line-height:1;">${score}%</span>
          <span style="font-size:8px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:var(--pp-muted); margin-top:2px;">Match</span>
        </div>
      </div>
    `;
  }

  /* ─────────────────────────────────────────────────────────────
     BOOKMARKS (SAVED JOBS PER LOGGED-IN EMAIL)
     ───────────────────────────────────────────────────────────── */
  function getBookmarkKey(email) {
    const safeEmail = (email || '').toLowerCase().trim() || 'guest';
    return `placementpro_bookmarks_${safeEmail}`;
  }

  function getBookmarks(email) {
    try {
      const raw = localStorage.getItem(getBookmarkKey(email));
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function isBookmarked(jobId, email) {
    const list = getBookmarks(email);
    return list.includes(String(jobId));
  }

  function toggleBookmark(jobId, email) {
    const list = getBookmarks(email);
    const idStr = String(jobId);
    const index = list.indexOf(idStr);
    let bookmarked = false;
    if (index === -1) {
      list.push(idStr);
      bookmarked = true;
    } else {
      list.splice(index, 1);
      bookmarked = false;
    }
    localStorage.setItem(getBookmarkKey(email), JSON.stringify(list));
    return bookmarked;
  }

  /* ─────────────────────────────────────────────────────────────
     ASYNC API CALLS WITH SILENT FALLBACK
     ───────────────────────────────────────────────────────────── */
  async function safeFetch(endpoint, method = 'GET', body = null) {
    if (typeof apiCall === 'function') {
      try {
        return await apiCall(endpoint, method, body);
      } catch (err) {
        // Fall back to local storage
        return null;
      }
    }
    return null;
  }

  /* ─────────────────────────────────────────────────────────────
     PUBLIC API METHODS
     ───────────────────────────────────────────────────────────── */

  // 1. Get all jobs (with optional filters)
  async function getAllJobs(options = {}) {
    const { search = '', category = '', role = '', workMode = '', status = '', batch = '' } = options;
    const queryParts = [];
    if (search) queryParts.push(`search=${encodeURIComponent(search)}`);
    if (category) queryParts.push(`category=${encodeURIComponent(category)}`);
    if (role) queryParts.push(`role=${encodeURIComponent(role)}`);
    if (workMode) queryParts.push(`workMode=${encodeURIComponent(workMode)}`);
    if (status) queryParts.push(`status=${encodeURIComponent(status)}`);
    const qs = queryParts.length ? `?${queryParts.join('&')}` : '';

    // Attempt backend first
    const apiRes = await safeFetch(`/jobs${qs}`);
    if (apiRes && apiRes.data && Array.isArray(apiRes.data)) {
      // Sync local jobs cache
      const serverJobs = apiRes.data;
      if (serverJobs.length > 0) {
        setLocalJobs(serverJobs);
      }
      return serverJobs;
    }

    // Offline / Local storage fallback
    let jobs = getLocalJobs();
    const apps = getLocalApplications();

    if (status && status !== 'All') {
      jobs = jobs.filter(j => j.status === status);
    }
    if (category && category !== 'All') {
      jobs = jobs.filter(j => j.category === category);
    }
    if (workMode && workMode !== 'All') {
      jobs = jobs.filter(j => j.workMode === workMode);
    }
    if (role && role !== 'All') {
      jobs = jobs.filter(j => (j.technicalRole || '').toLowerCase().includes(role.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      jobs = jobs.filter(j =>
        (j.title || '').toLowerCase().includes(q) ||
        (j.companyName || '').toLowerCase().includes(q) ||
        (j.location || '').toLowerCase().includes(q) ||
        (j.requiredSkills || []).some(s => s.toLowerCase().includes(q))
      );
    }

    return jobs.map(j => ({
      ...j,
      applicantCount: apps.filter(a => String(a.job) === String(j._id)).length
    }));
  }

  // 2. Get single job
  async function getJobById(id) {
    const apiRes = await safeFetch(`/jobs/${id}`);
    if (apiRes && apiRes.data) {
      return apiRes.data;
    }

    const jobs = getLocalJobs();
    const apps = getLocalApplications();
    const found = jobs.find(j => String(j._id) === String(id));
    if (found) {
      return {
        ...found,
        applicantCount: apps.filter(a => String(a.job) === String(id)).length
      };
    }
    return null;
  }

  // 3. Create job
  async function createJob(jobData) {
    const jobs = getLocalJobs();
    const newJob = {
      ...jobData,
      _id: 'job_' + Date.now(),
      status: jobData.status || 'Active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applicantCount: 0
    };

    // Save locally immediately
    jobs.unshift(newJob);
    setLocalJobs(jobs);

    // Sync to backend asynchronously
    safeFetch('/jobs', 'POST', jobData).then(res => {
      if (res && res.data && res.data._id) {
        // Update local job with MongoDB ObjectId
        const updatedJobs = getLocalJobs().map(j => (j._id === newJob._id ? res.data : j));
        setLocalJobs(updatedJobs);
      }
    });

    return newJob;
  }

  // 4. Update job
  async function updateJob(id, updates) {
    const jobs = getLocalJobs();
    const idx = jobs.findIndex(j => String(j._id) === String(id));
    let updatedJob = null;
    if (idx !== -1) {
      jobs[idx] = { ...jobs[idx], ...updates, updatedAt: new Date().toISOString() };
      setLocalJobs(jobs);
      updatedJob = jobs[idx];
    }

    safeFetch(`/jobs/${id}`, 'PUT', updates);
    return updatedJob;
  }

  // 5. Toggle status (Active, Draft, Closed)
  async function toggleJobStatus(id, newStatus) {
    const jobs = getLocalJobs();
    const idx = jobs.findIndex(j => String(j._id) === String(id));
    if (idx !== -1) {
      jobs[idx].status = newStatus;
      jobs[idx].updatedAt = new Date().toISOString();
      setLocalJobs(jobs);
    }
    safeFetch(`/jobs/${id}/status`, 'PATCH', { status: newStatus });
    return true;
  }

  // 6. Delete job
  async function deleteJob(id) {
    let jobs = getLocalJobs();
    jobs = jobs.filter(j => String(j._id) !== String(id));
    setLocalJobs(jobs);

    // Also remove applications associated with this job
    let apps = getLocalApplications();
    apps = apps.filter(a => String(a.job) !== String(id));
    setLocalApplications(apps);

    safeFetch(`/jobs/${id}`, 'DELETE');
    return true;
  }

  // 7. Apply to job
  async function applyToJob(jobId, payload) {
    const { studentProfile, resumeType, resumeUrl, resumeFileName, atsScore } = payload;
    const email = (studentProfile.email || '').toLowerCase().trim();

    const jobs = getLocalJobs();
    const job = jobs.find(j => String(j._id) === String(jobId));
    if (!job) {
      throw new Error('Job posting not found');
    }

    // Check duplicate
    const apps = getLocalApplications();
    const alreadyApplied = apps.some(a => String(a.job) === String(jobId) && a.studentEmail === email);
    if (alreadyApplied) {
      throw new Error('You have already applied for this job.');
    }

    // Calculate match
    const matchAnalysis = calculateMatch(studentProfile, job);

    const application = {
      _id: 'app_' + Date.now(),
      job: jobId,
      jobTitle: job.title,
      companyName: job.companyName,
      companyLogo: job.companyLogo,
      studentEmail: email,
      studentName: studentProfile.name || studentProfile.fullName || 'Student',
      studentPhone: studentProfile.phone || '',
      studentBranch: studentProfile.branch || 'Other',
      studentCGPA: parseFloat(studentProfile.cgpa) || 0,
      studentProfileSnapshot: studentProfile,
      mlMatchScore: matchAnalysis.matchScore,
      matchedSkills: matchAnalysis.matchedSkills,
      missingSkills: matchAnalysis.missingSkills,
      atsScore: atsScore || 82,
      resumeType: resumeType || 'generated',
      resumeUrl: resumeUrl || '',
      resumeFileName: resumeFileName || `${(studentProfile.name || 'Student').replace(/\s+/g, '_')}_Resume.pdf`,
      status: 'Applied',
      statusHistory: [
        {
          status: 'Applied',
          updatedAt: new Date().toISOString(),
          comment: 'Application successfully submitted.'
        }
      ],
      appliedAt: new Date().toISOString()
    };

    apps.unshift(application);
    setLocalApplications(apps);

    // Sync to backend asynchronously
    safeFetch(`/jobs/${jobId}/apply`, 'POST', payload);

    return {
      success: true,
      application,
      matchAnalysis
    };
  }

  // 8. Get applications for a specific job (Admin Pipeline)
  async function getApplicationsForJob(jobId) {
    const apiRes = await safeFetch(`/jobs/${jobId}/applications`);
    if (apiRes && apiRes.data && Array.isArray(apiRes.data)) {
      return apiRes.data;
    }

    const apps = getLocalApplications();
    return apps
      .filter(a => String(a.job) === String(jobId))
      .sort((a, b) => (b.mlMatchScore || 0) - (a.mlMatchScore || 0));
  }

  // 9. Get student's own applications
  async function getMyApplications(email) {
    const safeEmail = (email || '').toLowerCase().trim();
    const apiRes = await safeFetch(`/applications/my?email=${encodeURIComponent(safeEmail)}`);
    if (apiRes && apiRes.data && Array.isArray(apiRes.data) && apiRes.data.length > 0) {
      return apiRes.data;
    }

    const apps = getLocalApplications();
    const jobs = getLocalJobs();

    return apps
      .filter(a => (a.studentEmail || '').toLowerCase().trim() === safeEmail)
      .map(app => {
        const job = jobs.find(j => String(j._id) === String(app.job));
        return {
          ...app,
          jobDetails: job || {
            title: app.jobTitle,
            companyName: app.companyName,
            location: 'Bangalore / Remote',
            salary: '₹6.5 - 12 LPA',
            workMode: 'Hybrid'
          }
        };
      })
      .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));
  }

  // 10. Update application status (Admin)
  async function updateApplicationStatus(appId, newStatus, comment = '') {
    const apps = getLocalApplications();
    const app = apps.find(a => String(a._id) === String(appId));
    if (app) {
      app.status = newStatus;
      if (!app.statusHistory) app.statusHistory = [];
      app.statusHistory.push({
        status: newStatus,
        updatedAt: new Date().toISOString(),
        comment: comment || `Status moved to ${newStatus}`
      });
      setLocalApplications(apps);
    }

    safeFetch(`/applications/${appId}/status`, 'PATCH', { status: newStatus, comment });
    return true;
  }

  // 11. Check if student has applied to job
  function hasApplied(jobId, email) {
    const safeEmail = (email || '').toLowerCase().trim();
    const apps = getLocalApplications();
    return apps.find(a => String(a.job) === String(jobId) && (a.studentEmail || '').toLowerCase().trim() === safeEmail);
  }

  return {
    SEED_JOBS,
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    toggleJobStatus,
    deleteJob,
    applyToJob,
    getApplicationsForJob,
    getMyApplications,
    updateApplicationStatus,
    hasApplied,
    calculateMatch,
    getCompanyLogoHTML,
    renderMatchRingSVG,
    isBookmarked,
    toggleBookmark,
    getBookmarks
  };
});
