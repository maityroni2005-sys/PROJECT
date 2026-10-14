/**
 * Backend/config/seedJobs.js
 * ─────────────────────────────────────────────────────────────────
 * 50 Real PlacementPro Demo Job Openings across all 50 Tech Giants
 * Categorized into Service-Based (20), Product-Based (20), and Unicorns (10)
 * Includes official career URLs, detailed descriptions, packages, and eligibility.
 * ─────────────────────────────────────────────────────────────────
 */

const SEED_COMPANIES = require('./seedCompanies');

const ROLE_TITLES = {
  "TCS": "Digital Software Engineer - Cloud & Microservices",
  "Infosys": "Specialist Programmer (Power Programmer)",
  "Wipro": "Project Engineer - Enterprise Cloud Solutions",
  "Cognizant": "GenC Next Developer - Full Stack & DevOps",
  "Accenture": "Advanced App Engineering Analyst - Cloud & AI",
  "Capgemini": "Senior Software Engineer - Full Stack Java/Angular",
  "Tech Mahindra": "Software Engineer - 5G & Digital Platforms",
  "HCLTech": "Software Engineer - Cloud & Infrastructure Services",
  "LTIMindtree": "Software Engineer - Microservices & Digital Core",
  "Mphasis": "Associate Software Engineer - Cognitive Cloud",
  "Persistent Systems": "Product Engineering Associate - Cloud Native",
  "Hexaware": "Software Engineer - Next-Gen Automation & APIs",
  "Coforge": "Software Engineer - Digital Enterprise Solutions",
  "Zensar": "Software Engineer - Data & Cloud Engineering",
  "Birlasoft": "Software Engineer - Enterprise Cloud Applications",
  "Sonata Software": "Software Engineer - Platformation & Azure",
  "Cyient": "Embedded Software Engineer - Aerospace & IoT",
  "KPIT Technologies": "Software Engineer - Autonomous & EV Mobility",
  "Tata Elxsi": "Embedded AI/ML Software Engineer - Computer Vision",
  "Genpact": "Data Engineer - Analytics & AI Platforms",
  "Google": "Software Engineer - Distributed Systems (L3/L4)",
  "Microsoft": "Software Development Engineer - Azure Core Cloud",
  "Amazon": "Software Development Engineer (SDE I)",
  "Meta": "Software Engineer - Product Infrastructure",
  "Apple": "Software Engineer - CoreOS & Systems Architecture",
  "Adobe": "Computer Scientist - Creative Cloud Platforms",
  "Oracle": "Software Developer - Autonomous Database Engine",
  "Salesforce": "Member Technical Staff (MTS) - Platform Engineering",
  "SAP": "Associate Developer - SAP S/4HANA Cloud Core",
  "Cisco": "Software Engineer - Cloud Networking & Cybersecurity",
  "Intel": "System Software Engineer - Hardware/Firmware Architecture",
  "IBM": "Associate System Software Engineer - Hybrid Cloud & watsonx",
  "Walmart Global Tech": "Software Engineer III - Supply Chain & Omnichannel",
  "Atlassian": "Software Engineer - Cloud Platform Architecture",
  "Intuit": "Software Engineer - Financial Data Systems",
  "Uber": "Software Engineer II - Real-Time Marketplace Core",
  "ServiceNow": "Software Engineer - Cloud Workflow Platform",
  "Nvidia": "Deep Learning Systems Software Engineer - CUDA/GPU",
  "Qualcomm": "Modem Software Engineer - 5G / Mobile Systems",
  "Dell Technologies": "Cloud Infrastructure & Storage Software Engineer",
  "Flipkart": "Software Development Engineer I (SDE I)",
  "Zoho": "Member Technical Staff (Software Developer)",
  "Razorpay": "Software Development Engineer - Payments Core",
  "Zomato": "Software Engineer - High Concurrency Platforms",
  "Swiggy": "Software Development Engineer - Hyperlocal Logistics",
  "Paytm": "Backend Software Engineer - Payments & FinTech",
  "PhonePe": "Software Engineer - Distributed UPI Transaction Engine",
  "Cred": "Backend Engineer - High Performance FinTech Systems",
  "Postman": "Software Engineer - API Platform & Cloud Architecture",
  "Zerodha": "Software Engineer - Low Latency Trading Systems"
};

const DEMO_JOBS = SEED_COMPANIES.map((company, index) => {
  const slug = company.companyName.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const roleTitle = ROLE_TITLES[company.companyName] || `Software Development Engineer - ${company.companyName}`;
  const isProduct = company.category === 'Product-Based';
  const isUnicorn = company.category === 'Unicorns';

  const defaultResponsibilities = [
    `Architect and develop highly scalable, resilient microservices for ${company.companyName}'s production workloads.`,
    `Collaborate with cross-functional engineering teams using modern Agile and CI/CD automation pipelines.`,
    `Optimize performance, query latency, database indexing, and memory efficiency across distributed systems.`,
    `Write comprehensive unit and integration tests adhering to enterprise engineering best practices.`
  ];

  const defaultSelectionProcess = isProduct ? [
    "Online Coding Qualifier (DSA & Problem Solving)",
    "Technical Round 1: Data Structures, Algorithms & Concurrency",
    "Technical Round 2: System Architecture & Low-Level Design",
    "Managerial Fitment & Leadership Principles"
  ] : isUnicorn ? [
    "Machine Coding / Practical Problem Solving Round",
    "Deep Technical Interview (High Scale & DB Internals)",
    "Cultural Fit & Architectural Alignment"
  ] : [
    "National Qualifier Cognitive & Coding Assessment",
    "Technical Interview (Core CS, DSA, OOP, Projects)",
    "HR Discussion & Communication Evaluation"
  ];

  const now = Date.now();
  const deadlineDays = 10 + (index % 25);

  return {
    _id: `job_${slug}_${String(index + 1).padStart(3, '0')}`,
    title: roleTitle,
    companyName: company.companyName,
    companyLogo: company.logo,
    officialUrl: company.officialUrl,
    category: company.category,
    technicalRole: company.jobRoles && company.jobRoles[0] ? company.jobRoles[0] : "Full Stack Developer",
    description: company.description,
    responsibilities: defaultResponsibilities,
    requiredSkills: company.requiredSkills,
    preferredSkills: company.preferredSkills,
    eligibility: {
      requiredDegree: "B.Tech / B.E. / MCA",
      eligibleBranches: ["CS", "IT", "ECE", "EE"],
      minimumCGPA: company.minimumCGPA,
      maximumBacklogs: company.maximumBacklogs,
      eligibleBatches: [2025, 2026, 2027],
      experienceLevel: "Fresher"
    },
    location: isProduct ? "Bangalore / Hyderabad" : isUnicorn ? "Bangalore" : "Pan-India / Hybrid",
    workMode: isProduct && index % 4 === 0 ? "Remote" : "Hybrid",
    employmentType: "Full-time",
    salary: company.packageCTC,
    vacancies: 10 + ((index * 7) % 40),
    startDate: new Date(now - (index % 5 + 1) * 86400000).toISOString(),
    deadline: new Date(now + deadlineDays * 86400000).toISOString(),
    selectionProcess: defaultSelectionProcess,
    additionalInstructions: `Candidates are advised to review core ${company.requiredSkills.slice(0, 3).join(', ')} concepts. Please ensure your academic records and resume are fully up to date.`,
    status: "Active",
    featured: index < 12
  };
});

module.exports = DEMO_JOBS;
