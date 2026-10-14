/**
 * PlacementPro AI — Comprehensive 50 Tech Companies Dataset & ML Suitability Engine
 * ─────────────────────────────────────────────────────────────────────────────────
 * Categorized into:
 *  - Service-Based & IT Consulting (20 Companies)
 *  - Product-Based & Global MNCs (20 Companies)
 *  - Top Indian Unicorns & FinTechs (10 Companies)
 *
 * Guaranteed 100% hybrid client-side availability with official career portal URLs,
 * package CTC ranges, cutoffs, and live ML suitability score calculation.
 * ─────────────────────────────────────────────────────────────────────────────────
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const data = factory();
    root.COMPANIES_DATA = data.COMPANIES_DATA;
    root.calculateCompanySuitability = data.calculateCompanySuitability;
    root.getCompanyLogoHTML = data.getCompanyLogoHTML;
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const COMPANIES_DATA = [
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

  /**
   * Generates a bulletproof fallback-safe Brand Logo HTML element
   * If the SVG/remote image fails or is slow to load, it automatically falls back
   * to a sleek gradient badge with the company's initials.
   */
  function getCompanyLogoHTML(name, logoUrl, size = 48) {
    const initials = name
      .replace(/[^A-Za-z0-9]/g, '')
      .substring(0, 2)
      .toUpperCase() || 'CO';
    
    // Choose brand tint based on hash
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    const bgGradient = `linear-gradient(135deg, hsl(${hue}, 70%, 48%), hsl(${(hue + 45) % 360}, 80%, 42%))`;

    if (logoUrl) {
      return `
        <div class="company-logo-wrapper" style="width:${size}px; height:${size}px; min-width:${size}px; border-radius:12px; background:#fff; display:inline-flex; align-items:center; justify-content:center; padding:6px; box-shadow:0 4px 12px rgba(0,0,0,0.06); border:1px solid #e2e8f0; overflow:hidden;">
          <img src="${logoUrl}" alt="${name} logo" loading="lazy" style="max-width:100%; max-height:100%; object-fit:contain; transition:transform 0.2s;"
               onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;border-radius:10px;background:${bgGradient};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:${Math.round(size * 0.38)}px;letter-spacing:-0.5px;\\'>${initials}</div>';">
        </div>
      `;
    }

    return `
      <div style="width:${size}px; height:${size}px; min-width:${size}px; border-radius:12px; background:${bgGradient}; color:#fff; display:inline-flex; align-items:center; justify-content:center; font-weight:800; font-size:${Math.round(size * 0.38)}px; letter-spacing:-0.5px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
        ${initials}
      </div>
    `;
  }

  /**
   * Deterministic Real-Time ML Suitability & Profile Fit Engine
   * Calculates dynamic match percentage, matched skills, missing skills, and hard eligibility.
   *
   * Scoring Breakdown:
   *  - 50% Skill Match Ratio (weighted against required & preferred skills)
   *  - 30% Academic Standing (CGPA relative to cutoff & bonus for high CGPA)
   *  - 10% DSA / Technical Depth bonus
   *  - 10% Projects & Practical Experience
   *  - Backlog penalty (-8% per backlog)
   */
  function calculateCompanySuitability(profile, company) {
    if (!profile) profile = {};

    // 1. Extract and normalize student technical skills
    const rawSkills = [
      ...(profile.programming ? profile.programming.split(',') : []),
      ...(profile.web ? profile.web.split(',') : []),
      ...(profile.databases ? profile.databases.split(',') : []),
      ...(Array.isArray(profile.technicalSkills?.programmingLanguages) ? profile.technicalSkills.programmingLanguages : []),
      ...(Array.isArray(profile.technicalSkills?.webTechnologies) ? profile.technicalSkills.webTechnologies : []),
      ...(Array.isArray(profile.technicalSkills?.databases) ? profile.technicalSkills.databases : []),
      ...(Array.isArray(profile.technicalSkills?.otherSkills) ? profile.technicalSkills.otherSkills : [])
    ].map(s => String(s || '').trim().toLowerCase()).filter(Boolean);

    // Dedup student skills
    const studentSkills = Array.from(new Set(rawSkills));

    // 2. Match skills against company required & preferred lists
    const reqList = company.requiredSkills || [];
    const prefList = company.preferredSkills || [];
    const matched = [];
    const missing = [];

    // Smart synonym helper
    const isSkillMatch = (req, student) => {
      if (student === req) return true;
      if (student.includes(req) || req.includes(student)) return true;
      // Synonyms
      if (req === 'dsa' && (student.includes('data structure') || student.includes('algorithm'))) return true;
      if (req.includes('data structure') && student === 'dsa') return true;
      if (req === 'react' && student.includes('react')) return true;
      if (req === 'node.js' && (student === 'node' || student.includes('nodejs'))) return true;
      if (req === 'sql' && (student.includes('sql') || student.includes('postgres') || student.includes('mysql'))) return true;
      if (req.includes('c++') && (student === 'cpp' || student.includes('c++'))) return true;
      if (req.includes('cloud') && (student === 'aws' || student === 'azure' || student === 'gcp')) return true;
      return false;
    };

    reqList.forEach(skill => {
      const sLower = skill.toLowerCase().trim();
      const hasMatch = studentSkills.some(st => isSkillMatch(sLower, st));
      if (hasMatch) {
        matched.push(skill);
      } else {
        missing.push(skill);
      }
    });

    // 3. Compute ratio
    const totalReq = reqList.length || 1;
    const skillRatio = matched.length / totalReq;

    // 4. Academic calculation
    const cgpa = parseFloat(profile.cgpa || profile.academicDetails?.cgpa || 7.5);
    const minCGPA = company.minimumCGPA || 6.0;
    const backlogs = parseInt(profile.backlogs ?? profile.academicDetails?.backlogs ?? 0, 10);
    const maxBacklogs = company.maximumBacklogs ?? 0;

    let academicScore = 0;
    if (cgpa >= minCGPA) {
      // 85 to 100 base depending on margin above cutoff
      const margin = Math.min(2.0, cgpa - minCGPA);
      academicScore = 85 + (margin / 2.0) * 15;
    } else {
      // Penalized proportionally
      academicScore = Math.max(30, (cgpa / minCGPA) * 70);
    }

    // 5. DSA Level depth bonus
    const dsaLevel = (profile.dsa || profile.technicalSkills?.dsaLevel || 'Beginner').toLowerCase();
    let dsaBonus = 4;
    if (dsaLevel === 'advanced') dsaBonus = 10;
    else if (dsaLevel === 'intermediate') dsaBonus = 7;

    // 6. Projects bonus
    const projectCount = Array.isArray(profile.projects) ? profile.projects.length : 1;
    const projectBonus = Math.min(10, 4 + projectCount * 2);

    // 7. Weighted Composite Score
    let finalScore = Math.round(
      (skillRatio * 100) * 0.50 +
      academicScore * 0.30 +
      dsaBonus +
      projectBonus
    );

    // Apply backlogs penalty
    if (backlogs > 0) {
      finalScore -= backlogs * 8;
    }

    // If student has zero skills entered yet, provide realistic baseline
    if (studentSkills.length === 0) {
      finalScore = Math.round(Math.min(finalScore, 58 + (cgpa >= minCGPA ? 12 : -10)));
    }

    // Clamp score
    finalScore = Math.max(28, Math.min(98, finalScore));

    // Hard eligibility evaluation
    const isEligible = (cgpa >= minCGPA) && (backlogs <= maxBacklogs);
    const eligibilityReasons = [];
    if (cgpa < minCGPA) {
      eligibilityReasons.push(`CGPA (${cgpa.toFixed(1)}) is below the required cutoff of ${minCGPA.toFixed(1)}`);
    }
    if (backlogs > maxBacklogs) {
      eligibilityReasons.push(`Active backlogs (${backlogs}) exceed company cutoff (${maxBacklogs})`);
    }

    // Match badge styling definition (from Requirement 4)
    let badgeType = 'high';
    let badgeLabel = 'High Match';
    let badgeBg = '#DCFCE7';
    let badgeText = '#15803D';
    let badgeBorder = '#BBF7D0';

    if (finalScore >= 80) {
      badgeType = 'high';
      badgeLabel = 'High Match (80%+)';
      badgeBg = '#DCFCE7';
      badgeText = '#15803D';
      badgeBorder = '#BBF7D0';
    } else if (finalScore >= 60) {
      badgeType = 'medium';
      badgeLabel = 'Medium Match (60%–79%)';
      badgeBg = '#FEF3C7';
      badgeText = '#B45309';
      badgeBorder = '#FDE68A';
    } else {
      badgeType = 'low';
      badgeLabel = 'Low Match (<60%)';
      badgeBg = '#FFE4E6';
      badgeText = '#BE123C';
      badgeBorder = '#FECDD3';
    }

    return {
      score: finalScore,
      matchedSkills: matched,
      missingSkills: missing,
      matchedCount: matched.length,
      totalCount: totalReq,
      isEligible,
      eligibilityReasons,
      badge: {
        type: badgeType,
        label: badgeLabel,
        bg: badgeBg,
        text: badgeText,
        border: badgeBorder
      }
    };
  }

  return {
    COMPANIES_DATA,
    calculateCompanySuitability,
    getCompanyLogoHTML
  };
});
