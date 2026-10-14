/**
 * 6 Pre-seeded Realistic PlacementPro Demo Jobs
 * Matches TCS, Infosys, Zoho, Flipkart, Amazon, Cognizant
 */
const DEMO_JOBS = [
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

module.exports = DEMO_JOBS;
