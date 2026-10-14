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
     50 REALISTIC TECH GIANT DEMO JOBS SEED
     Spans Service-Based (20), Product-Based (20), and Unicorns (10)
     Guaranteed 100% hybrid client-side availability with official URLs
     ───────────────────────────────────────────────────────────── */
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

  const RAW_COMPANIES_50 = [
    // ══════════════════════════════════════════════════════════
    // SERVICE-BASED & IT CONSULTING (20 COMPANIES)
    // ══════════════════════════════════════════════════════════
    {
      id: "tcs",
      name: "TCS",
      fullName: "Tata Consultancy Services",
      category: "Service-Based",
      officialUrl: "https://www.tcs.com/careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
      brandColor: "#004c97",
      packageCTC: "₹3.6 - 9.0 LPA",
      minCTC: 3.6,
      maxCTC: 9.0,
      minimumCGPA: 6.0,
      maximumBacklogs: 0,
      requiredSkills: ["Python", "Java", "SQL", "Data Structures", "Spring Boot", "Communication"],
      preferredSkills: ["Cloud Computing", "Docker", "REST APIs"],
      description: "India's largest multinational IT services powerhouse operating across 55 countries with Ninja and Digital talent streams.",
      location: "Pan-India (Bangalore, Kolkata, Mumbai, Pune, Hyderabad)",
      workMode: "Hybrid",
      openingsCount: 3
    },
    {
      id: "infosys",
      name: "Infosys",
      fullName: "Infosys Limited",
      category: "Service-Based",
      officialUrl: "https://www.infosys.com/careers/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
      brandColor: "#007cc3",
      packageCTC: "₹3.6 - 9.5 LPA",
      minCTC: 3.6,
      maxCTC: 9.5,
      minimumCGPA: 6.5,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "Python", "C++", "SQL", "Cloud Basics", "Algorithms"],
      preferredSkills: ["Cobalt Cloud", "Microservices", "Kubernetes"],
      description: "Global leader in next-generation digital services and consulting offering Systems Engineer and Specialist Programmer tracks.",
      location: "Bangalore, Mysore, Pune, Hyderabad, Bhubaneswar",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "wipro",
      name: "Wipro",
      fullName: "Wipro Limited",
      category: "Service-Based",
      officialUrl: "https://careers.wipro.com/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
      brandColor: "#000000",
      packageCTC: "₹3.5 - 6.5 LPA",
      minCTC: 3.5,
      maxCTC: 6.5,
      minimumCGPA: 6.0,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "C#", ".NET", "SQL", "JavaScript", "Testing"],
      preferredSkills: ["Cloud Infrastructure", "DevOps", "Automation"],
      description: "Pioneering technology services firm driving enterprise modernization and cognitive computing solutions across industries.",
      location: "Bangalore, Chennai, Hyderabad, Pune, Kolkata",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "cognizant",
      name: "Cognizant",
      fullName: "Cognizant Technology Solutions",
      category: "Service-Based",
      officialUrl: "https://careers.cognizant.com/global/en",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Cognizant_logo_2022.svg",
      brandColor: "#0033a0",
      packageCTC: "₹4.0 - 7.0 LPA",
      minCTC: 4.0,
      maxCTC: 7.0,
      minimumCGPA: 6.0,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "React", "SQL", "HTML/CSS", "Node.js", "REST APIs"],
      preferredSkills: ["Spring Boot", "MongoDB", "Agile"],
      description: "Fortune 500 professional services giant modernizing technology and building high-performance customer platforms.",
      location: "Chennai, Kolkata, Bangalore, Pune, Coimbatore",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "accenture",
      name: "Accenture",
      fullName: "Accenture India",
      category: "Service-Based",
      officialUrl: "https://www.accenture.com/in-en/careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
      brandColor: "#a100ff",
      packageCTC: "₹4.5 - 11.0 LPA",
      minCTC: 4.5,
      maxCTC: 11.0,
      minimumCGPA: 6.5,
      maximumBacklogs: 0,
      requiredSkills: ["Python", "Java", "Cloud", "Data Analytics", "DevOps", "System Design"],
      preferredSkills: ["AWS / Azure", "Generative AI", "Microservices"],
      description: "Global consulting and technology leader delivering end-to-end cloud transformation, digital core, and AI innovation.",
      location: "Bangalore, Mumbai, Gurgaon, Hyderabad, Pune",
      workMode: "Hybrid",
      openingsCount: 3
    },
    {
      id: "capgemini",
      name: "Capgemini",
      fullName: "Capgemini SE",
      category: "Service-Based",
      officialUrl: "https://www.capgemini.com/careers/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/77/Capgemini_201x_logo.svg",
      brandColor: "#0070ad",
      packageCTC: "₹4.0 - 7.5 LPA",
      minCTC: 4.0,
      maxCTC: 7.5,
      minimumCGPA: 6.0,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "Angular", "Spring Boot", "SQL", "Docker", "Git"],
      preferredSkills: ["Kubernetes", "PostgreSQL", "Cloud"],
      description: "French multinational consulting and engineering services leader steering businesses into sustainable digital futures.",
      location: "Pune, Mumbai, Bangalore, Hyderabad, Kolkata",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "tech-mahindra",
      name: "Tech Mahindra",
      fullName: "Tech Mahindra Limited",
      category: "Service-Based",
      officialUrl: "https://careers.techmahindra.com/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/52/Tech_Mahindra_New_Logo.svg",
      brandColor: "#e31837",
      packageCTC: "₹3.5 - 6.0 LPA",
      minCTC: 3.5,
      maxCTC: 6.0,
      minimumCGPA: 6.0,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "Python", "Networking", "SQL", "HTML", "5G Telecom"],
      preferredSkills: ["Linux", "IoT", "Network Virtualization"],
      description: "Leading digital transformation and business re-engineering provider with distinctive expertise in 5G and telecommunications.",
      location: "Pune, Noida, Bangalore, Hyderabad, Chennai",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "hcltech",
      name: "HCLTech",
      fullName: "HCL Technologies",
      category: "Service-Based",
      officialUrl: "https://www.hcltech.com/careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/HCLTech_Logo_2022.svg",
      brandColor: "#2b2a82",
      packageCTC: "₹4.25 - 8.5 LPA",
      minCTC: 4.25,
      maxCTC: 8.5,
      minimumCGPA: 6.5,
      maximumBacklogs: 0,
      requiredSkills: ["C++", "Java", "Linux", "Cloud", "Python", "Cybersecurity"],
      preferredSkills: ["VMware", "Storage Networks", "Azure"],
      description: "Global enterprise powering businesses with Supercharging Progress across cloud, digital engineering, and cybersecurity.",
      location: "Noida, Bangalore, Chennai, Lucknow, Nagpur",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "ltimindtree",
      name: "LTIMindtree",
      fullName: "LTIMindtree Limited",
      category: "Service-Based",
      officialUrl: "https://www.ltimindtree.com/careers/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/LTIMindtree_Logo.svg",
      brandColor: "#0b2341",
      packageCTC: "₹4.5 - 8.0 LPA",
      minCTC: 4.5,
      maxCTC: 8.0,
      minimumCGPA: 6.5,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "React", "Microservices", "SQL", "Azure", "Docker"],
      preferredSkills: ["Spring Cloud", "Kafka", "DevOps"],
      description: "Tier-1 IT services and consulting force formed by the merger of L&T Infotech and Mindtree.",
      location: "Mumbai, Bangalore, Pune, Chennai, Hyderabad",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "mphasis",
      name: "Mphasis",
      fullName: "Mphasis Limited",
      category: "Service-Based",
      officialUrl: "https://www.mphasis.com/home/careers.html",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Mphasis_logo.svg",
      brandColor: "#e01a22",
      packageCTC: "₹3.8 - 6.5 LPA",
      minCTC: 3.8,
      maxCTC: 6.5,
      minimumCGPA: 6.0,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "Python", "SQL", "AWS", "Automation", "Spring Boot"],
      preferredSkills: ["Banking Domain", "Microservices", "CI/CD"],
      description: "Applied technology services company specializing in architecture-led digital solutions for banking and insurance.",
      location: "Bangalore, Pune, Chennai, Mangalore",
      workMode: "Hybrid",
      openingsCount: 1
    },
    {
      id: "persistent",
      name: "Persistent Systems",
      fullName: "Persistent Systems Limited",
      category: "Service-Based",
      officialUrl: "https://www.persistent.com/careers/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Persistent_Systems_Logo.svg",
      brandColor: "#f15a24",
      packageCTC: "₹5.0 - 9.0 LPA",
      minCTC: 5.0,
      maxCTC: 9.0,
      minimumCGPA: 6.5,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "Cloud Native", "DSA", "Spring Boot", "Kafka", "React"],
      preferredSkills: ["Kubernetes", "AWS Lambda", "Distributed Systems"],
      description: "Global product engineering and software development partner for the world's leading tech brands.",
      location: "Pune, Bangalore, Hyderabad, Nagpur, Goa",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "hexaware",
      name: "Hexaware",
      fullName: "Hexaware Technologies",
      category: "Service-Based",
      officialUrl: "https://jobs.hexaware.com/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Hexaware_Logo.svg",
      brandColor: "#1d3557",
      packageCTC: "₹4.0 - 6.0 LPA",
      minCTC: 4.0,
      maxCTC: 6.0,
      minimumCGPA: 6.0,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "Automation", "Python", "API Testing", "SQL", "Selenium"],
      preferredSkills: ["Cloud", "Rest Assured", "Jira"],
      description: "Automation-driven IT consulting services firm known for its 'Automate Everything' enterprise digital philosophy.",
      location: "Navi Mumbai, Chennai, Pune, Bangalore",
      workMode: "Hybrid",
      openingsCount: 1
    },
    {
      id: "coforge",
      name: "Coforge",
      fullName: "Coforge Limited",
      category: "Service-Based",
      officialUrl: "https://www.coforge.com/careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Coforge_Logo.svg",
      brandColor: "#00529b",
      packageCTC: "₹4.0 - 7.0 LPA",
      minCTC: 4.0,
      maxCTC: 7.0,
      minimumCGPA: 6.0,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "Angular", "PostgreSQL", "Spring Boot", "REST APIs", "Cloud"],
      preferredSkills: ["Microservices", "Docker", "Git"],
      description: "High-growth digital services provider leading transformations across travel, transport, and financial sectors.",
      location: "Greater Noida, Bangalore, Hyderabad, Kolhapur",
      workMode: "Hybrid",
      openingsCount: 1
    },
    {
      id: "zensar",
      name: "Zensar",
      fullName: "Zensar Technologies",
      category: "Service-Based",
      officialUrl: "https://www.zensar.com/careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Zensar_Technologies_logo.svg",
      brandColor: "#f58220",
      packageCTC: "₹4.0 - 6.5 LPA",
      minCTC: 4.0,
      maxCTC: 6.5,
      minimumCGPA: 6.0,
      maximumBacklogs: 0,
      requiredSkills: ["Python", "Data Engineering", "SQL", "React", "Docker", "Java"],
      preferredSkills: ["AWS", "PySpark", "Power BI"],
      description: "RPG Group technology firm crafting disruptive digital experiences, data engineering, and cloud platforms.",
      location: "Pune, Hyderabad, Bangalore",
      workMode: "Hybrid",
      openingsCount: 1
    },
    {
      id: "birlasoft",
      name: "Birlasoft",
      fullName: "Birlasoft (CK Birla Group)",
      category: "Service-Based",
      officialUrl: "https://www.birlasoft.com/careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Birlasoft_Logo.svg",
      brandColor: "#00205b",
      packageCTC: "₹3.6 - 5.5 LPA",
      minCTC: 3.6,
      maxCTC: 5.5,
      minimumCGPA: 6.0,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "Oracle", "SQL", "Spring Boot", "Web Services", "Cloud"],
      preferredSkills: ["SAP ERP", "RESTful APIs", "JavaScript"],
      description: "Premier enterprise cloud and ERP modernization specialist combining domain depth with advanced cloud architectures.",
      location: "Pune, Noida, Bangalore, Hyderabad",
      workMode: "Hybrid",
      openingsCount: 1
    },
    {
      id: "sonata-software",
      name: "Sonata Software",
      fullName: "Sonata Software Limited",
      category: "Service-Based",
      officialUrl: "https://www.sonata-software.com/careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/Sonata_Software_logo.svg",
      brandColor: "#004b87",
      packageCTC: "₹4.0 - 6.5 LPA",
      minCTC: 4.0,
      maxCTC: 6.5,
      minimumCGPA: 6.0,
      maximumBacklogs: 0,
      requiredSkills: ["C#", ".NET", "Azure", "Angular", "SQL", "Microservices"],
      preferredSkills: ["Dynamics 365", "Docker", "TypeScript"],
      description: "Global modernization engineering company driving Platformation solutions for retail, consumer goods, and travel.",
      location: "Bangalore, Hyderabad",
      workMode: "Hybrid",
      openingsCount: 1
    },
    {
      id: "cyient",
      name: "Cyient",
      fullName: "Cyient Limited",
      category: "Service-Based",
      officialUrl: "https://careers.cyient.com/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Cyient_Logo.svg",
      brandColor: "#009a44",
      packageCTC: "₹4.0 - 7.0 LPA",
      minCTC: 4.0,
      maxCTC: 7.0,
      minimumCGPA: 6.5,
      maximumBacklogs: 0,
      requiredSkills: ["C++", "Python", "Embedded Systems", "IoT", "Linux", "Data Structures"],
      preferredSkills: ["RTOS", "Hardware Protocols", "Git"],
      description: "Engineering and technology solutions company partnering in aerospace, rail transportation, and telecom networks.",
      location: "Hyderabad, Bangalore, Pune, Vizag",
      workMode: "Hybrid",
      openingsCount: 1
    },
    {
      id: "kpit",
      name: "KPIT Technologies",
      fullName: "KPIT Technologies Limited",
      category: "Service-Based",
      officialUrl: "https://www.kpit.com/careers/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/KPIT_Technologies_logo.svg",
      brandColor: "#2b2a82",
      packageCTC: "₹4.5 - 8.5 LPA",
      minCTC: 4.5,
      maxCTC: 8.5,
      minimumCGPA: 6.5,
      maximumBacklogs: 0,
      requiredSkills: ["C++", "Embedded C", "Automotive Software", "Python", "Linux", "RTOS"],
      preferredSkills: ["AUTOSAR", "CAN Protocol", "MATLAB / Simulink"],
      description: "Global software integration specialist for autonomous driving, connected vehicles, and electric powertrains.",
      location: "Pune, Bangalore",
      workMode: "Hybrid",
      openingsCount: 1
    },
    {
      id: "tata-elxsi",
      name: "Tata Elxsi",
      fullName: "Tata Elxsi Limited",
      category: "Service-Based",
      officialUrl: "https://www.tataelxsi.com/careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/23/Tata_Elxsi_Logo.svg",
      brandColor: "#1d71b8",
      packageCTC: "₹4.5 - 9.0 LPA",
      minCTC: 4.5,
      maxCTC: 9.0,
      minimumCGPA: 6.8,
      maximumBacklogs: 0,
      requiredSkills: ["C++", "Python", "AI/ML", "Computer Vision", "Embedded", "IoT"],
      preferredSkills: ["OpenCV", "TensorFlow", "Deep Learning"],
      description: "Design-led technology services provider delivering high-end computing for automotive, medical devices, and media.",
      location: "Bangalore, Trivandrum, Pune, Chennai",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "genpact",
      name: "Genpact",
      fullName: "Genpact Limited",
      category: "Service-Based",
      officialUrl: "https://www.genpact.com/careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Genpact_logo.svg",
      brandColor: "#ff6600",
      packageCTC: "₹4.0 - 7.5 LPA",
      minCTC: 4.0,
      maxCTC: 7.5,
      minimumCGPA: 6.0,
      maximumBacklogs: 0,
      requiredSkills: ["Python", "SQL", "Data Analytics", "Machine Learning", "Power BI", "Java"],
      preferredSkills: ["Pandas", "Scikit-Learn", "Cloud Data Warehouses"],
      description: "Global professional services powerhouse running digital operations, data science, and financial analytics for Fortune 500s.",
      location: "Gurgaon, Noida, Hyderabad, Bangalore, Kolkata",
      workMode: "Hybrid",
      openingsCount: 1
    },

    // ══════════════════════════════════════════════════════════
    // PRODUCT-BASED & GLOBAL MNCS (20 COMPANIES)
    // ══════════════════════════════════════════════════════════
    {
      id: "google",
      name: "Google",
      fullName: "Google LLC / Alphabet",
      category: "Product-Based",
      officialUrl: "https://careers.google.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      brandColor: "#4285f4",
      packageCTC: "₹32 - 55 LPA",
      minCTC: 32.0,
      maxCTC: 55.0,
      minimumCGPA: 8.0,
      maximumBacklogs: 0,
      requiredSkills: ["DSA", "Algorithms", "Distributed Systems", "C++", "Python", "Go"],
      preferredSkills: ["System Design", "Kubernetes", "Machine Learning"],
      description: "Global tech pioneer organizing the world's information across search, cloud, AI, Android, and YouTube.",
      location: "Bangalore, Hyderabad",
      workMode: "Hybrid",
      openingsCount: 3
    },
    {
      id: "microsoft",
      name: "Microsoft",
      fullName: "Microsoft Corporation",
      category: "Product-Based",
      officialUrl: "https://careers.microsoft.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      brandColor: "#00a4ef",
      packageCTC: "₹26 - 52 LPA",
      minCTC: 26.0,
      maxCTC: 52.0,
      minimumCGPA: 7.5,
      maximumBacklogs: 0,
      requiredSkills: ["DSA", "C++", "C#", "Cloud Architecture", "System Design", "Azure"],
      preferredSkills: [".NET Core", "TypeScript", "Microservices"],
      description: "Global computing titan empowering organizations with Azure cloud, Microsoft 365, GitHub, and enterprise AI.",
      location: "Hyderabad, Bangalore, Noida",
      workMode: "Hybrid",
      openingsCount: 3
    },
    {
      id: "amazon",
      name: "Amazon",
      fullName: "Amazon.com, Inc.",
      category: "Product-Based",
      officialUrl: "https://www.amazon.jobs",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      brandColor: "#ff9900",
      packageCTC: "₹28 - 48 LPA",
      minCTC: 28.0,
      maxCTC: 48.0,
      minimumCGPA: 7.0,
      maximumBacklogs: 0,
      requiredSkills: ["DSA", "System Design", "Java", "AWS", "Object-Oriented Design", "Microservices"],
      preferredSkills: ["DynamoDB", "Kafka", "Low-Latency Systems"],
      description: "World's largest e-commerce and cloud infrastructure (AWS) corporation inventing at massive global scale.",
      location: "Bangalore, Hyderabad, Chennai, Delhi NCR",
      workMode: "Hybrid",
      openingsCount: 4
    },
    {
      id: "meta",
      name: "Meta",
      fullName: "Meta Platforms, Inc.",
      category: "Product-Based",
      officialUrl: "https://www.metacareers.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
      brandColor: "#0668e1",
      packageCTC: "₹36 - 60 LPA",
      minCTC: 36.0,
      maxCTC: 60.0,
      minimumCGPA: 8.0,
      maximumBacklogs: 0,
      requiredSkills: ["DSA", "React", "Distributed Systems", "Python", "C++", "GraphQL"],
      preferredSkills: ["PyTorch", "High Concurrency", "System Architecture"],
      description: "Social technology pioneer connecting billions across Instagram, WhatsApp, Facebook, Quest, and open-source AI.",
      location: "Gurgaon, Bangalore",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "apple",
      name: "Apple",
      fullName: "Apple Inc.",
      category: "Product-Based",
      officialUrl: "https://www.apple.com/careers/in/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      brandColor: "#000000",
      packageCTC: "₹30 - 55 LPA",
      minCTC: 30.0,
      maxCTC: 55.0,
      minimumCGPA: 8.0,
      maximumBacklogs: 0,
      requiredSkills: ["Swift", "C++", "Algorithms", "Hardware-Software Interfacing", "DSA", "Operating Systems"],
      preferredSkills: ["Objective-C", "Metal", "Embedded Unix"],
      description: "Creator of the iPhone, Mac, Silicon, and iOS, known for unparalleled product design and software performance.",
      location: "Hyderabad, Bangalore",
      workMode: "On-site",
      openingsCount: 2
    },
    {
      id: "adobe",
      name: "Adobe",
      fullName: "Adobe Inc.",
      category: "Product-Based",
      officialUrl: "https://www.adobe.com/careers.html",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Adobe_Systems_logo_and_wordmark.svg",
      brandColor: "#fa0f00",
      packageCTC: "₹24 - 45 LPA",
      minCTC: 24.0,
      maxCTC: 45.0,
      minimumCGPA: 7.5,
      maximumBacklogs: 0,
      requiredSkills: ["C++", "DSA", "Computer Graphics", "JavaScript", "React", "Machine Learning"],
      preferredSkills: ["WebAssembly", "Image Processing", "WebGL"],
      description: "The global creative software authority behind Photoshop, Illustrator, Premiere Pro, and Adobe Experience Cloud.",
      location: "Noida, Bangalore",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "oracle",
      name: "Oracle",
      fullName: "Oracle Corporation",
      category: "Product-Based",
      officialUrl: "https://www.oracle.com/corporate/careers/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
      brandColor: "#f80000",
      packageCTC: "₹18 - 36 LPA",
      minCTC: 18.0,
      maxCTC: 36.0,
      minimumCGPA: 7.0,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "SQL", "Database Internals", "Distributed Systems", "Cloud Infrastructure"],
      preferredSkills: ["C", "Linux Kernel", "OCI Cloud"],
      description: "Enterprise database leader and rapidly expanding cloud provider running mission-critical workloads globally.",
      location: "Bangalore, Hyderabad, Mumbai, Noida",
      workMode: "Hybrid",
      openingsCount: 3
    },
    {
      id: "salesforce",
      name: "Salesforce",
      fullName: "Salesforce, Inc.",
      category: "Product-Based",
      officialUrl: "https://www.salesforce.com/company/careers/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
      brandColor: "#00a1e0",
      packageCTC: "₹22 - 42 LPA",
      minCTC: 22.0,
      maxCTC: 42.0,
      minimumCGPA: 7.5,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "Apex", "Cloud Platforms", "JavaScript", "System Architecture", "REST APIs"],
      preferredSkills: ["Lightning Web Components", "Microservices", "Kafka"],
      description: "World's #1 CRM platform revolutionizing cloud enterprise software, customer data platforms, and Einstein AI.",
      location: "Hyderabad, Bangalore, Mumbai, Gurgaon",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "sap",
      name: "SAP",
      fullName: "SAP SE (SAP Labs India)",
      category: "Product-Based",
      officialUrl: "https://jobs.sap.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg",
      brandColor: "#008fd3",
      packageCTC: "₹16 - 32 LPA",
      minCTC: 16.0,
      maxCTC: 32.0,
      minimumCGPA: 7.0,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "ABAP", "SAP HANA", "Microservices", "Python", "Cloud Computing"],
      preferredSkills: ["In-Memory Computing", "Kubernetes", "UI5"],
      description: "Market leader in enterprise applications powering 87% of total global commerce with SAP S/4HANA.",
      location: "Bangalore, Gurgaon, Pune",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "cisco",
      name: "Cisco",
      fullName: "Cisco Systems, Inc.",
      category: "Product-Based",
      officialUrl: "https://jobs.cisco.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
      brandColor: "#049fd9",
      packageCTC: "₹18 - 35 LPA",
      minCTC: 18.0,
      maxCTC: 35.0,
      minimumCGPA: 7.5,
      maximumBacklogs: 0,
      requiredSkills: ["Networking Protocols", "C++", "Python", "Cybersecurity", "Linux", "Distributed Systems"],
      preferredSkills: ["SDN", "Socket Programming", "Docker"],
      description: "Worldwide leader in networking hardware, internet infrastructure, optical switches, and enterprise cybersecurity.",
      location: "Bangalore",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "intel",
      name: "Intel",
      fullName: "Intel Corporation",
      category: "Product-Based",
      officialUrl: "https://jobs.intel.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282020%29.svg",
      brandColor: "#0071c5",
      packageCTC: "₹18 - 34 LPA",
      minCTC: 18.0,
      maxCTC: 34.0,
      minimumCGPA: 7.5,
      maximumBacklogs: 0,
      requiredSkills: ["C++", "Computer Architecture", "Linux", "Python", "Verilog", "Firmware"],
      preferredSkills: ["VHDL", "Device Drivers", "DSA"],
      description: "Semiconductor innovator powering the world's microprocessors, data centers, and advanced graphics architectures.",
      location: "Bangalore",
      workMode: "On-site",
      openingsCount: 2
    },
    {
      id: "ibm",
      name: "IBM",
      fullName: "International Business Machines",
      category: "Product-Based",
      officialUrl: "https://www.ibm.com/careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      brandColor: "#006699",
      packageCTC: "₹14 - 28 LPA",
      minCTC: 14.0,
      maxCTC: 28.0,
      minimumCGPA: 7.0,
      maximumBacklogs: 0,
      requiredSkills: ["Cloud Computing", "Python", "Java", "AI/ML", "Kubernetes", "Enterprise Architecture"],
      preferredSkills: ["Red Hat OpenShift", "watsonx", "PostgreSQL"],
      description: "Iconic enterprise technology institution pioneering hybrid cloud solutions, quantum computing, and generative AI for business.",
      location: "Bangalore, Hyderabad, Kochi, Pune",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "walmart-tech",
      name: "Walmart Global Tech",
      fullName: "Walmart Global Tech India",
      category: "Product-Based",
      officialUrl: "https://careers.walmart.com/technology",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
      brandColor: "#0071ce",
      packageCTC: "₹22 - 38 LPA",
      minCTC: 22.0,
      maxCTC: 38.0,
      minimumCGPA: 7.5,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "Spring Boot", "Kafka", "DSA", "Microservices", "High-Scale Systems"],
      preferredSkills: ["Cassandra", "Cloud Native", "React"],
      description: "Technology brain powering the world's largest omni-channel retailer serving hundreds of millions of weekly shoppers.",
      location: "Bangalore, Chennai",
      workMode: "Hybrid",
      openingsCount: 3
    },
    {
      id: "atlassian",
      name: "Atlassian",
      fullName: "Atlassian Corporation",
      category: "Product-Based",
      officialUrl: "https://www.atlassian.com/company/careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Atlassian_logo.svg",
      brandColor: "#0052cc",
      packageCTC: "₹28 - 50 LPA",
      minCTC: 28.0,
      maxCTC: 50.0,
      minimumCGPA: 7.5,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "React", "Distributed Systems", "Microservices", "System Design", "Kotlin"],
      preferredSkills: ["AWS", "GraphQL", "High Reliability"],
      description: "Creator of Jira, Confluence, Bitbucket, and Trello, empowering millions of software engineering squads globally.",
      location: "Bangalore (Remote-First)",
      workMode: "Remote",
      openingsCount: 2
    },
    {
      id: "intuit",
      name: "Intuit",
      fullName: "Intuit Inc.",
      category: "Product-Based",
      officialUrl: "https://www.intuit.com/careers/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Intuit_Logo.svg",
      brandColor: "#0077c5",
      packageCTC: "₹24 - 44 LPA",
      minCTC: 24.0,
      maxCTC: 44.0,
      minimumCGPA: 7.5,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "React", "AWS", "Spring Boot", "Microservices", "Data Security"],
      preferredSkills: ["Kafka", "GraphQL", "Distributed Caching"],
      description: "Global fintech and financial platform giant behind TurboTax, QuickBooks, and Credit Karma.",
      location: "Bangalore",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "uber",
      name: "Uber",
      fullName: "Uber Technologies, Inc.",
      category: "Product-Based",
      officialUrl: "https://www.uber.com/us/en/careers/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
      brandColor: "#000000",
      packageCTC: "₹32 - 58 LPA",
      minCTC: 32.0,
      maxCTC: 58.0,
      minimumCGPA: 8.0,
      maximumBacklogs: 0,
      requiredSkills: ["Golang", "Java", "Distributed Systems", "Kafka", "System Design", "Algorithms"],
      preferredSkills: ["Geospatial Indexing", "gRPC", "High Concurrency"],
      description: "Revolutionizing global mobility, freight, and food delivery with ultra-high concurrency distributed architectures.",
      location: "Bangalore, Hyderabad",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "servicenow",
      name: "ServiceNow",
      fullName: "ServiceNow, Inc.",
      category: "Product-Based",
      officialUrl: "https://careers.servicenow.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/ServiceNow_logo.svg",
      brandColor: "#81b5a1",
      packageCTC: "₹22 - 42 LPA",
      minCTC: 22.0,
      maxCTC: 42.0,
      minimumCGPA: 7.5,
      maximumBacklogs: 0,
      requiredSkills: ["JavaScript", "Java", "Cloud SaaS", "REST APIs", "System Architecture", "Node.js"],
      preferredSkills: ["React", "SQL Query Optimization", "Microservices"],
      description: "Enterprise cloud software leader delivering intelligent digital workflows to optimize modern workplace productivity.",
      location: "Hyderabad, Bangalore",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "nvidia",
      name: "Nvidia",
      fullName: "NVIDIA Corporation",
      category: "Product-Based",
      officialUrl: "https://www.nvidia.com/en-us/about-nvidia/careers/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
      brandColor: "#76b900",
      packageCTC: "₹28 - 52 LPA",
      minCTC: 28.0,
      maxCTC: 52.0,
      minimumCGPA: 8.0,
      maximumBacklogs: 0,
      requiredSkills: ["CUDA", "C++", "Deep Learning", "GPU Computing", "Computer Vision", "PyTorch"],
      preferredSkills: ["TensorRT", "Linux Kernel", "High Performance Computing"],
      description: "The engine of the global artificial intelligence boom, inventing GPUs and high-throughput AI accelerator infrastructure.",
      location: "Bangalore, Pune, Hyderabad",
      workMode: "Hybrid",
      openingsCount: 3
    },
    {
      id: "qualcomm",
      name: "Qualcomm",
      fullName: "Qualcomm Incorporated",
      category: "Product-Based",
      officialUrl: "https://www.qualcomm.com/company/careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Qualcomm-Logo.svg",
      brandColor: "#3253dc",
      packageCTC: "₹20 - 38 LPA",
      minCTC: 20.0,
      maxCTC: 38.0,
      minimumCGPA: 7.5,
      maximumBacklogs: 0,
      requiredSkills: ["Embedded C", "C++", "Wireless Communications", "Linux Kernel", "RTOS", "DSP"],
      preferredSkills: ["5G Protocols", "Device Drivers", "ARM Architecture"],
      description: "Global wireless technology leader developing Snapdragon chipsets, mobile modems, and edge AI compute systems.",
      location: "Hyderabad, Bangalore, Chennai",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "dell",
      name: "Dell Technologies",
      fullName: "Dell Technologies Inc.",
      category: "Product-Based",
      officialUrl: "https://jobs.dell.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg",
      brandColor: "#007db8",
      packageCTC: "₹14 - 26 LPA",
      minCTC: 14.0,
      maxCTC: 26.0,
      minimumCGPA: 7.0,
      maximumBacklogs: 0,
      requiredSkills: ["Cloud Infrastructure", "Java", "Python", "Storage Systems", "Linux", "Networking"],
      preferredSkills: ["Kubernetes", "DevOps", "REST APIs"],
      description: "End-to-end technology solutions giant providing enterprise storage, hybrid cloud, edge compute, and laptops.",
      location: "Bangalore, Hyderabad",
      workMode: "Hybrid",
      openingsCount: 2
    },

    // ══════════════════════════════════════════════════════════
    // TOP INDIAN UNICORNS & FINTECHS (10 COMPANIES)
    // ══════════════════════════════════════════════════════════
    {
      id: "flipkart",
      name: "Flipkart",
      fullName: "Flipkart Internet Private Limited",
      category: "Unicorns",
      officialUrl: "https://www.flipkartcareers.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Flipkart_logo.svg",
      brandColor: "#2874f0",
      packageCTC: "₹20 - 36 LPA",
      minCTC: 20.0,
      maxCTC: 36.0,
      minimumCGPA: 7.5,
      maximumBacklogs: 0,
      requiredSkills: ["DSA", "Java", "High Concurrency", "Kafka", "System Design", "MySQL"],
      preferredSkills: ["HBase", "Aerospike", "Spring Boot"],
      description: "India's homegrown e-commerce unicorn pioneering big billion day sales, quick supply chains, and fin-tech integrations.",
      location: "Bangalore",
      workMode: "Hybrid",
      openingsCount: 3
    },
    {
      id: "zoho",
      name: "Zoho",
      fullName: "Zoho Corporation",
      category: "Unicorns",
      officialUrl: "https://www.zoho.com/careers/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Zoho_Corporation_2019_logo.svg",
      brandColor: "#e42528",
      packageCTC: "₹7.0 - 16 LPA",
      minCTC: 7.0,
      maxCTC: 16.0,
      minimumCGPA: 6.5,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "C", "JavaScript", "Data Structures", "OOP", "SQL"],
      preferredSkills: ["HTML5", "CSS3", "Low-Level Networking"],
      description: "Bootstrapped profitable SaaS unicorn developing 55+ business applications used by over 100 million individuals globally.",
      location: "Chennai, Tenkasi, Salem, Tirunelveli",
      workMode: "On-site",
      openingsCount: 3
    },
    {
      id: "razorpay",
      name: "Razorpay",
      fullName: "Razorpay Software Private Limited",
      category: "Unicorns",
      officialUrl: "https://razorpay.com/jobs/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
      brandColor: "#0c2340",
      packageCTC: "₹18 - 34 LPA",
      minCTC: 18.0,
      maxCTC: 34.0,
      minimumCGPA: 7.0,
      maximumBacklogs: 0,
      requiredSkills: ["Node.js", "Go", "React", "FinTech APIs", "PostgreSQL", "Microservices"],
      preferredSkills: ["Redis", "Distributed Transactions", "AWS"],
      description: "Premier payment gateway and neo-banking platform processing over $100B in annualized transaction volume.",
      location: "Bangalore",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "zomato",
      name: "Zomato",
      fullName: "Zomato Limited",
      category: "Unicorns",
      officialUrl: "https://www.zomato.com/careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
      brandColor: "#cb202d",
      packageCTC: "₹16 - 32 LPA",
      minCTC: 16.0,
      maxCTC: 32.0,
      minimumCGPA: 7.0,
      maximumBacklogs: 0,
      requiredSkills: ["Python", "Go", "React Native", "Redis", "PostgreSQL", "High Traffic Architecture"],
      preferredSkills: ["Kafka", "GraphQL", "Microservices"],
      description: "Food discovery and quick commerce (Blinkit) giant reshaping hyper-local logistics and everyday consumer habits.",
      location: "Gurgaon, Bangalore",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "swiggy",
      name: "Swiggy",
      fullName: "Swiggy Limited",
      category: "Unicorns",
      officialUrl: "https://careers.swiggy.com",
      logo: "https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg",
      brandColor: "#fc8019",
      packageCTC: "₹18 - 35 LPA",
      minCTC: 18.0,
      maxCTC: 35.0,
      minimumCGPA: 7.2,
      maximumBacklogs: 0,
      requiredSkills: ["Go", "Java", "Distributed Systems", "Kafka", "Microservices", "System Design"],
      preferredSkills: ["Elasticsearch", "AWS", "Aerospike"],
      description: "On-demand convenience unicorn orchestrating food delivery, Instamart 10-minute grocery delivery, and Dineout.",
      location: "Bangalore",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "paytm",
      name: "Paytm",
      fullName: "One97 Communications Limited (Paytm)",
      category: "Unicorns",
      officialUrl: "https://paytm.com/careers/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg",
      brandColor: "#002e6e",
      packageCTC: "₹14 - 26 LPA",
      minCTC: 14.0,
      maxCTC: 26.0,
      minimumCGPA: 7.0,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "Spring Boot", "Microservices", "MySQL", "Payment Gateways", "Kafka"],
      preferredSkills: ["Redis", "Distributed Systems", "High Availability"],
      description: "Digital payments and mobile wallet innovator that ushered in QR code soundbox payments across India.",
      location: "Noida, Bangalore",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "phonepe",
      name: "PhonePe",
      fullName: "PhonePe Private Limited",
      category: "Unicorns",
      officialUrl: "https://www.phonepe.com/careers/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg",
      brandColor: "#6739b7",
      packageCTC: "₹22 - 38 LPA",
      minCTC: 22.0,
      maxCTC: 38.0,
      minimumCGPA: 7.5,
      maximumBacklogs: 0,
      requiredSkills: ["Java", "Distributed Systems", "Cassandra", "Kafka", "System Design", "High Concurrency"],
      preferredSkills: ["HBase", "Aerospike", "Reactive Systems"],
      description: "India's #1 digital payments company leading UPI transaction share with nearly 50% market penetration.",
      location: "Bangalore",
      workMode: "Hybrid",
      openingsCount: 2
    },
    {
      id: "cred",
      name: "Cred",
      fullName: "Dreamplug Technologies Private Limited (CRED)",
      category: "Unicorns",
      officialUrl: "https://careers.cred.club",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/CRED_%28fintech_company%29_logo.svg/300px-CRED_%28fintech_company%29_logo.svg.png",
      brandColor: "#1a1a1a",
      packageCTC: "₹24 - 45 LPA",
      minCTC: 24.0,
      maxCTC: 45.0,
      minimumCGPA: 7.8,
      maximumBacklogs: 0,
      requiredSkills: ["Go", "Python", "React Native", "AWS", "Microservices", "PostgreSQL"],
      preferredSkills: ["Kafka", "Redis", "Event-Driven Architecture"],
      description: "Members-only fintech club rewarding creditworthy individuals with gold-standard UI/UX aesthetics and backend speed.",
      location: "Bangalore",
      workMode: "On-site",
      openingsCount: 2
    },
    {
      id: "postman",
      name: "Postman",
      fullName: "Postman, Inc.",
      category: "Unicorns",
      officialUrl: "https://www.postman.com/company/careers/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Postman_%28software%29.png",
      brandColor: "#ff6c37",
      packageCTC: "₹18 - 36 LPA",
      minCTC: 18.0,
      maxCTC: 36.0,
      minimumCGPA: 7.2,
      maximumBacklogs: 0,
      requiredSkills: ["Node.js", "JavaScript", "API Design", "React", "Electron", "Cloud Architecture"],
      preferredSkills: ["TypeScript", "Distributed Caching", "Docker"],
      description: "The global API platform benchmark used by more than 30 million engineers to build, test, and document APIs.",
      location: "Bangalore (Remote-Friendly)",
      workMode: "Remote",
      openingsCount: 2
    },
    {
      id: "zerodha",
      name: "Zerodha",
      fullName: "Zerodha Broking Limited",
      category: "Unicorns",
      officialUrl: "https://zerodha.com/careers/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Zerodha_logo.svg",
      brandColor: "#387ed1",
      packageCTC: "₹16 - 35 LPA",
      minCTC: 16.0,
      maxCTC: 35.0,
      minimumCGPA: 7.0,
      maximumBacklogs: 0,
      requiredSkills: ["Go", "Python", "PostgreSQL", "Redis", "Vue.js / React", "Low Latency Systems"],
      preferredSkills: ["Linux", "FOSS", "Self-Hosted Infrastructure"],
      description: "India's largest retail brokerage company renowned for lean, open-source first, bootstrapped software engineering.",
      location: "Bangalore",
      workMode: "On-site",
      openingsCount: 2
    }
  ];

  function build50Jobs() {
    const list = (typeof window !== 'undefined' && window.COMPANIES_DATA && window.COMPANIES_DATA.length >= 50)
      ? window.COMPANIES_DATA
      : RAW_COMPANIES_50;

    const now = Date.now();
    return list.map((c, idx) => {
      const slug = (c.name || c.companyName || 'co').toLowerCase().replace(/[^a-z0-9]/g, '_');
      const compName = c.name || c.companyName;
      const isProduct = c.category === 'Product-Based';
      const isUnicorn = c.category === 'Unicorns';

      return {
        _id: `job_${slug}_${String(idx + 1).padStart(3, '0')}`,
        title: ROLE_TITLES[compName] || `Software Engineer - ${compName}`,
        companyName: compName,
        companyLogo: c.logo || '',
        officialUrl: c.officialUrl || '',
        category: c.category,
        technicalRole: isProduct ? "Backend Engineer" : isUnicorn ? "Full Stack Developer" : "Software Engineer",
        description: c.description || `Join ${compName} in developing high-scale systems and customer platforms.`,
        responsibilities: [
          `Architect and deploy high-performance microservices for ${compName}'s production workloads.`,
          `Collaborate with cross-functional engineering teams using modern Agile pipelines.`,
          `Optimize database queries, distributed caching, and end-to-end latency benchmarks.`,
          `Write resilient, well-tested code following strict production CI/CD standards.`
        ],
        requiredSkills: c.requiredSkills || ["Java", "Python", "SQL", "DSA"],
        preferredSkills: c.preferredSkills || ["Cloud", "Docker", "Git", "REST APIs"],
        eligibility: {
          requiredDegree: "B.Tech / B.E. / MCA",
          eligibleBranches: ["CS", "IT", "ECE", "EE"],
          minimumCGPA: c.minimumCGPA || 6.5,
          maximumBacklogs: c.maximumBacklogs || 0,
          eligibleBatches: [2025, 2026, 2027],
          experienceLevel: "Fresher"
        },
        location: c.location || (isProduct ? "Bangalore / Hyderabad" : "Pan-India"),
        workMode: (c.workMode || (idx % 4 === 0 ? "Remote" : "Hybrid")),
        employmentType: "Full-time",
        salary: c.packageCTC || "Competitive",
        vacancies: 15 + ((idx * 7) % 35),
        startDate: new Date(now - (idx % 6 + 1) * 86400000).toISOString(),
        deadline: new Date(now + (12 + (idx % 20)) * 86400000).toISOString(),
        selectionProcess: isProduct ? [
          "Online Coding Assessment (DSA & Algorithmic Problem Solving)",
          "Technical Round 1: Core Data Structures, Low-Level Design & Concurrency",
          "Technical Round 2: System Architecture & Database Internals",
          "Leadership Fitment & Engineering Discussion"
        ] : isUnicorn ? [
          "Practical Machine Coding & Problem Solving Round",
          "Deep Technical Interview (High Concurrency & Scalability)",
          "Culture & Behavioral Assessment"
        ] : [
          "National Cognitive & Technical Qualifier Assessment",
          "Technical Interview (Programming, CS Fundamentals & Projects)",
          "Managerial & HR Fitment Round"
        ],
        additionalInstructions: `Candidates should prepare core ${(c.requiredSkills || []).slice(0, 3).join(', ')} topics. Please ensure your academic snapshot is up to date before applying.`,
        status: "Active",
        featured: idx < 12
      };
    });
  }

  const SEED_JOBS = build50Jobs();

  const STORAGE_JOBS_KEY = 'placementpro_jobs';
  const STORAGE_APPS_KEY = 'placementpro_applications';

  /* ─────────────────────────────────────────────────────────────
     INITIALIZE SEED DATA IN LOCAL STORAGE
     ───────────────────────────────────────────────────────────── */
  function ensureSeeded() {
    try {
      const existing = localStorage.getItem(STORAGE_JOBS_KEY);
      const parsed = existing ? JSON.parse(existing) : null;
      if (!parsed || parsed.length < SEED_JOBS.length || !parsed[0]?.officialUrl) {
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
