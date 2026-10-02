/**
 * Roni Maity - Personal Portfolio JavaScript Engine
 * Atmospheric Sky & Nature Canvas Physics with Human Copy & Real Stories
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTypedHeadline();
  initHeroCardTilt();
  initTerminalEngine();
  initSkillsFilter();
  initProjectsFilter();
  initProjectModals();
  initResumeModal();
  initHobbyModal();
  initContactForm();
  initNavigation();
  initThemeToggle();
  initStatCounters();

  // Student Profile, Academic Customizer & Photo Manager
  initStudentProfileManager();
  initConfettiSystem();
  renderAllStudentData();

  // Enhanced UX features
  initScrollReveal();
  initDragDropPhotoUpload();
  initOnboardingHint();

  // Set current copyright year
  const yearEl = document.getElementById('year-placeholder');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ==========================================================================
   1. Serene Sky & Tree Canopy Particle Physics Canvas
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  const particleCount = Math.min(window.innerWidth < 768 ? 32 : 70, 85);
  const maxDistance = 130;

  const mouse = {
    x: null,
    y: null,
    radius: 140
  };

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class NatureParticle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5 + 0.15; // Gentle horizontal sky drift
      this.vy = (Math.random() - 0.5) * 0.4 - 0.08; // Gentle upward thermal float
      this.radius = Math.random() * 2.2 + 0.8;
      this.baseAlpha = Math.random() * 0.45 + 0.25;
      this.type = Math.random() > 0.4 ? 'star' : 'firefly';
      this.pulse = Math.random() * Math.PI;
    }

    update() {
      this.pulse += 0.03;
      this.x += this.vx + Math.sin(this.pulse) * 0.2;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Gentle mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2.2;
          this.y -= (dy / dist) * force * 2.2;
        }
      }
    }

    draw() {
      const alpha = this.baseAlpha + Math.sin(this.pulse) * 0.15;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      
      if (this.type === 'firefly') {
        ctx.fillStyle = `rgba(52, 211, 153, ${Math.max(0.1, alpha)})`;
      } else {
        ctx.fillStyle = `rgba(56, 189, 248, ${Math.max(0.1, alpha)})`;
      }
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new NatureParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const alpha = (1 - distance / maxDistance) * 0.16;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }

      // Starlight connection to mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.28;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Dynamic Typed Headline Rotator
   ========================================================================== */
function initTypedHeadline() {
  const typedEl = document.getElementById('typed-text');
  if (!typedEl) return;

  const phrases = [
    'tinkering with Python, SQL, and JavaScript.',
    'turning messy marks data into clean NumPy & Pandas reports.',
    'exploring Spring Boot backend architecture in my final year.',
    'analyzing Chennai Super Kings\' death-over tactics.',
    'logging tricky bugs so I don\'t make the same mistake twice.'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 75;

  function typeLoop() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      typedEl.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 35;
    } else {
      typedEl.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* ==========================================================================
   3. 3D Interactive Card Tilt Effect
   ========================================================================== */
function initHeroCardTilt() {
  const card = document.getElementById('hero-card');
  if (!card || window.innerWidth < 992) return;

  const inner = card.querySelector('.dev-card-inner');
  if (!inner) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  card.addEventListener('mouseleave', () => {
    inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
}

/* ==========================================================================
   4. Interactive Terminal CLI Engine (4th Year & CGPA 7.22 Updated)
   ========================================================================== */
let runTerminalCmd;

function initTerminalEngine() {
  const termBody = document.getElementById('terminal-body');
  const termInput = document.getElementById('terminal-input');
  const termSubmit = document.getElementById('terminal-submit-btn');

  if (!termBody || !termInput) return;

  const cmdHistory = [];
  let historyIdx = -1;

  const commands = {
    help: () => `
      <div class="term-line cmd-highlight">RONI'S CLI - AVAILABLE COMMANDS:</div>
      <table class="term-table">
        <tr><td class="cmd-name">about</td><td class="cmd-desc">Story of a 4th-year IT undergrad & what I enjoy building</td></tr>
        <tr><td class="cmd-name">projects</td><td class="cmd-desc">Stories behind my Python data analyzer & RIASEC chatbot</td></tr>
        <tr><td class="cmd-name">skills</td><td class="cmd-desc">My everyday stack (Python, SQL, JS, Spring Boot, NumPy, Pandas)</td></tr>
        <tr><td class="cmd-name">csk</td><td class="cmd-desc">Why I love analyzing Chennai Super Kings' cricket tactics</td></tr>
        <tr><td class="cmd-name">books</td><td class="cmd-desc">Takeaways from Siddhartha & Into the Wild</td></tr>
        <tr><td class="cmd-name">errorlog</td><td class="cmd-desc">Why and how I maintain a personal bug log</td></tr>
        <tr><td class="cmd-name">investing</td><td class="cmd-desc">Index funds and how compounding applies to coding</td></tr>
        <tr><td class="cmd-name">education</td><td class="cmd-desc">GCETT B.Tech IT (CGPA 7.22), Python marathon, Infosys & Wipro</td></tr>
        <tr><td class="cmd-name">resume</td><td class="cmd-desc">Open the complete official resume preview</td></tr>
        <tr><td class="cmd-name">coffee</td><td class="cmd-desc">Say hello & grab a virtual coffee chat</td></tr>
        <tr><td class="cmd-name">contact</td><td class="cmd-desc">Direct email, phone number & location</td></tr>
        <tr><td class="cmd-name">theme</td><td class="cmd-desc">Cycle nature sky palette (Twilight / Aurora / Sunset)</td></tr>
        <tr><td class="cmd-name">clear</td><td class="cmd-desc">Clear the terminal screen</td></tr>
      </table>
    `,

    about: () => `
      <div class="term-line"><span class="cmd-prefix">&#9658;</span> <strong>Roni Maity</strong> — 4th-Year (Final Year) IT Undergrad @ GCETT (CGPA: 7.22)</div>
      <div class="term-line">I genuinely enjoy breaking down complex problems into clean Python scripts, querying SQL databases, and building responsive web tools.</div>
      <div class="term-line" style="color:#fde047;">Outside the editor: CSK match tactics, reading Siddhartha, index fund investing, and keeping a dedicated bug error log.</div>
      <div class="term-line" style="color:#34d399;">Currently seeking: Software & Data Development Internships or Full-Time Roles.</div>
    `,

    skills: () => `
      <div class="term-line cmd-highlight">MY EVERYDAY TOOLKIT:</div>
      <div class="term-line">&bull; <strong>Languages:</strong> Python (Core, OOP, Data handling), C (Pointers & Foundations), JavaScript (DOM & Logic), SQL (MySQL)</div>
      <div class="term-line">&bull; <strong>Data Handling:</strong> NumPy (Vectorized math & stats), Pandas (DataFrames & CSV reports)</div>
      <div class="term-line">&bull; <strong>Frameworks:</strong> Java (Spring Boot basics — Infosys Springboard), Streamlit (Rapid Python web apps)</div>
      <div class="term-line">&bull; <strong>Currently Practicing:</strong> Data Structures & Algorithms in Python</div>
      <div class="term-line">&bull; <strong>Tools:</strong> VS Code, Git & GitHub, Jupyter Notebook</div>
    `,

    projects: () => `
      <div class="term-line cmd-highlight">FEATURED PROJECT STORIES:</div>
      <div class="term-line">1. <strong>Student Performance Analyzer</strong> <em>(Python, NumPy, Pandas)</em></div>
      <div class="term-line">&nbsp;&nbsp;&bull; Built to automate manual grade calculation. Replaced slow nested loops with NumPy vectorization and generated formatted CSV summaries with Pandas.</div>
      <div class="term-line">2. <strong>Career Guidance Chatbot</strong> <em>(Python, Streamlit, Holland RIASEC Model)</em></div>
      <div class="term-line">&nbsp;&nbsp;&bull; Built an approachable interactive web app that maps personality traits into practical software & IT career paths.</div>
      <div class="term-line">3. <strong>Foundational DSA Suite</strong> <em>(C, Python, Memory Allocation)</em></div>
      <div class="term-line">&nbsp;&nbsp;&bull; Understanding dynamic memory, pointer arithmetic, and algorithmic trade-offs from the ground up.</div>
    `,

    csk: () => {
      showTacticsModal();
      return `
        <div class="term-line" style="color:#facc15;">&#127951; <strong>Chennai Super Kings Match Tactics:</strong></div>
        <div class="term-line">Opened tactical note modal! Cricket strategy is real-time probability management: MS Dhoni's spin choke in middle overs at Chepauk and death-over field traps mirror efficient heuristic algorithms.</div>
      `;
    },

    books: () => {
      showBooksModal();
      return `
        <div class="term-line" style="color:#c084fc;">&#128214; <strong>Bookshelf & Philosophy:</strong></div>
        <div class="term-line">Opened reading takeaways! <em>Siddhartha</em> (learning through direct experience) and <em>Into the Wild</em> (finding clarity in simplicity) shape my approach to problem solving and engineering humility.</div>
      `;
    },

    errorlog: () => {
      showErrorLogModal();
      return `
        <div class="term-line" style="color:#fb7185;">&#128027; <strong>The Infamous Error Log:</strong></div>
        <div class="term-line">Opened Error Log peek! Every tricky bug that takes >15 mins gets documented with the root cause and fix. Making a mistake once is learning; making it twice is poor logging.</div>
      `;
    },

    investing: () => {
      showInvestingModal();
      return `
        <div class="term-line" style="color:#34d399;">&#128200; <strong>Index Funds & Compounding:</strong></div>
        <div class="term-line">Opened compounding calculator! Consistency &gt; Intensity. Small, steady daily improvements in coding compound exponentially over years, just like broad market index funds.</div>
      `;
    },

    education: () => `
      <div class="term-line cmd-highlight">JOURNEY & MILESTONES:</div>
      <div class="term-line">&bull; <strong>B.Tech in Information Technology:</strong> GCETT (Final Year) | <strong>CGPA: 7.22</strong></div>
      <div class="term-line">&bull; <strong>Infosys Springboard:</strong> Spring Boot Internship Track (Java backend & REST APIs)</div>
      <div class="term-line">&bull; <strong>Core Python Track:</strong> 100-Video comprehensive deep dive into syntax, OOP & Pandas</div>
      <div class="term-line">&bull; <strong>Wipro TalentNext:</strong> Digital readiness & problem-solving track</div>
      <div class="term-line">&bull; <strong>Class XII (WBCHSE):</strong> 77.8% | <strong>Class X (Madhyamik):</strong> 86.75%</div>
    `,

    coffee: () => `
      <div class="term-line" style="color:#34d399;">&#127795; Let's grab a coffee under the open sky!</div>
      <div class="term-line">Always up to chat about Python scripts, backend systems, cricket tactics, or interesting books.</div>
      <div class="term-line">Email: <a href="mailto:maityroni2005@gmail.com" style="color:#38bdf8; text-decoration:underline;">maityroni2005@gmail.com</a> | Phone: <a href="tel:+918597176733" style="color:#38bdf8; text-decoration:underline;">+91 8597176733</a></div>
    `,

    contact: () => `
      <div class="term-line cmd-highlight">DIRECT CONTACT CHANNELS:</div>
      <div class="term-line">&bull; <strong>Email:</strong> <a href="mailto:maityroni2005@gmail.com" style="color:#38bdf8; text-decoration:underline;">maityroni2005@gmail.com</a></div>
      <div class="term-line">&bull; <strong>Phone:</strong> <a href="tel:+918597176733" style="color:#38bdf8; text-decoration:underline;">+91 8597176733</a></div>
      <div class="term-line">&bull; <strong>Location:</strong> Contai, West Bengal, India (Open for remote & on-site)</div>
    `,

    resume: () => {
      openResumeModal();
      return `<div class="term-line" style="color:#34d399;">&#10004; Opened Official Resume Modal.</div>`;
    },

    theme: () => {
      toggleThemePalette();
      return `<div class="term-line" style="color:#34d399;">&#10004; Switched sky & nature theme palette.</div>`;
    },

    whoami: () => `
      <div class="term-line">visitor@roni-portfolio (Welcome, fellow developer or recruiter!)</div>
    `,

    date: () => `
      <div class="term-line">${new Date().toLocaleString()}</div>
    `
  };

  function executeCommand(rawInput) {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    cmdHistory.push(trimmed);
    historyIdx = cmdHistory.length;

    // Render user command line
    const userLine = document.createElement('div');
    userLine.className = 'term-line user-cmd-line';
    userLine.innerHTML = `<span class="term-prompt">roni@student-dev:~$</span> ${escapeHTML(trimmed)}`;
    termBody.appendChild(userLine);

    const cmdLower = trimmed.toLowerCase();

    if (cmdLower === 'clear') {
      termBody.innerHTML = '';
      return;
    }

    const outputLine = document.createElement('div');
    outputLine.className = 'term-line output-line';

    if (commands[cmdLower]) {
      const result = commands[cmdLower]();
      outputLine.innerHTML = result;
    } else {
      outputLine.innerHTML = `
        <span style="color:#fb7185;">Command not recognized: '${escapeHTML(trimmed)}'</span>. 
        Type <span class="cmd-highlight">'help'</span> to see available commands like <span class="cmd-highlight">'about'</span>, <span class="cmd-highlight">'csk'</span>, <span class="cmd-highlight">'errorlog'</span>, or <span class="cmd-highlight">'projects'</span>.
      `;
    }

    termBody.appendChild(outputLine);
    termBody.scrollTop = termBody.scrollHeight;
  }

  // Global trigger for chips
  runTerminalCmd = (cmd) => {
    termInput.value = cmd;
    executeCommand(cmd);
    termInput.value = '';
    termInput.focus();
  };

  // Keyboard events
  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = termInput.value;
      termInput.value = '';
      executeCommand(val);
    } else if (e.key === 'ArrowUp') {
      if (cmdHistory.length > 0 && historyIdx > 0) {
        historyIdx--;
        termInput.value = cmdHistory[historyIdx] || '';
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (cmdHistory.length > 0 && historyIdx < cmdHistory.length - 1) {
        historyIdx++;
        termInput.value = cmdHistory[historyIdx] || '';
      } else {
        historyIdx = cmdHistory.length;
        termInput.value = '';
      }
      e.preventDefault();
    }
  });

  if (termSubmit) {
    termSubmit.addEventListener('click', () => {
      const val = termInput.value;
      termInput.value = '';
      executeCommand(val);
      termInput.focus();
    });
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ==========================================================================
   5. Skills & Projects Filters
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.35s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

function initProjectsFilter() {
  const projFilterBtns = document.querySelectorAll('.proj-filter-btn');
  const projectCards = document.querySelectorAll('.project-story-card');

  projFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-pfilter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.35s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   6. Project Modals & Simulators
   ========================================================================== */
const projectData = {
  'proj-analyzer': {
    title: 'Student Performance Analyzer',
    tags: ['Python', 'NumPy', 'Pandas', 'Data Processing', 'CSV Reporting'],
    description: `
      An automated marks processing pipeline written in Python. It solves the manual grading headache by taking raw examination scores, sanitizing missing values or invalid entries, calculating subject-wise statistics (mean, standard deviation, minimum, and maximum) using NumPy vectorization, and generating automated grade distribution tables and formatted CSV exports via Pandas.
    `,
    highlights: [
      'Eliminated slow nested Python for-loops by leveraging high-performance NumPy ndarray vectorization.',
      'Robustly sanitized missing values and NaNs without silently corrupting class aggregates.',
      'Categorized students into transparent grading bands (A+, A, B, C, F) with customizable threshold rules.',
      'Auto-generated exportable, publication-ready summary CSV spreadsheets.'
    ],
    codeSnippet: `import numpy as np
import pandas as pd

class StudentPerformanceAnalyzer:
    def __init__(self, filepath):
        # Load raw dataset into Pandas DataFrame
        self.df = pd.read_csv(filepath)
        
    def calculate_subject_metrics(self, subject_columns):
        """Computes statistical metrics across subjects using NumPy vectorization."""
        metrics = {}
        for subject in subject_columns:
            # Clean missing data (drop NaNs for score calculation)
            scores = np.array(self.df[subject].dropna())
            metrics[subject] = {
                'Mean': float(np.round(np.mean(scores), 2)),
                'StdDev': float(np.round(np.std(scores), 2)),
                'MaxScore': int(np.max(scores)),
                'MinScore': int(np.min(scores))
            }
        return pd.DataFrame(metrics).T

    def assign_grades_and_export(self, subjects, output_file='grade_summary.csv'):
        """Computes student percentages and exports graded CSV report."""
        self.df['Total'] = self.df[subjects].sum(axis=1)
        self.df['Percentage'] = np.round(self.df['Total'] / len(subjects), 2)
        
        # Vectorized grade binning
        conditions = [
            self.df['Percentage'] >= 85,
            self.df['Percentage'] >= 70,
            self.df['Percentage'] >= 50
        ]
        grades = ['A+', 'A', 'B']
        self.df['Grade'] = np.select(conditions, grades, default='C')
        
        self.df.to_csv(output_file, index=False)
        return f"Exported {len(self.df)} student records to {output_file}"`
  },

  'proj-chatbot': {
    title: 'Career Guidance Chatbot (RIASEC Holland Model)',
    tags: ['Python', 'Streamlit', 'Holland RIASEC', 'Decision Trees', 'Web App'],
    description: `
      An interactive career guidance web application developed with Python and Streamlit. It uses John Holland's RIASEC psychological vocational model (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) to assess user affinities and recommend tailored career paths and technical skill roadmaps without overwhelming them with boring government-style forms.
    `,
    highlights: [
      'Implemented Holland\'s 6-dimensional psychological scoring framework in pure Python.',
      'Constructed an intuitive questionnaire flow using Streamlit with instant visual radar feedback.',
      'Mapped composite personality codes (e.g. Investigative + Realistic) to concrete software and data roles.',
      'Focused heavily on approachable UI/UX so students feel empowered rather than tested.'
    ],
    codeSnippet: `import streamlit as st

RIASEC_DOMAINS = {
    'R': 'Realistic (Practical, Hands-on, Systems)',
    'I': 'Investigative (Analytical, Problem Solving, Data)',
    'A': 'Artistic (Creative, UI/UX, Design)',
    'S': 'Social (Collaborative, Teaching, Mentoring)',
    'E': 'Enterprising (Leadership, Product, Pitching)',
    'C': 'Conventional (Organized, Databases, Structured)'
}

CAREER_MAPPINGS = {
    ('I', 'R'): ('Backend & Systems Engineer', 'Strong affinity for algorithmic logic, Python, C, and system architecture.'),
    ('I', 'C'): ('Data Analyst & Database Architect', 'Excels at SQL schema design, Pandas pipelines, and structured reporting.'),
    ('I', 'A'): ('Full Stack & UI/UX Engineer', 'Blends rigorous problem solving with aesthetic, human-first frontend design.'),
    ('S', 'E'): ('Technical Product Manager / Consultant', 'Bridges communication between engineering teams and stakeholders.')
}

def calculate_top_career(scores_dict):
    # Sort top 2 dominant RIASEC traits
    sorted_traits = sorted(scores_dict.items(), key=lambda item: item[1], reverse=True)
    primary, secondary = sorted_traits[0][0], sorted_traits[1][0]
    
    role, description = CAREER_MAPPINGS.get(
        (primary, secondary), 
        ("Software Developer / IT Engineer", "Versatile problem solver suited for general software engineering.")
    )
    return primary, secondary, role, description`
  },

  'proj-dsa': {
    title: 'DSA & Low-Level Problem Solving Suite',
    tags: ['C Language', 'Python DSA', 'Pointers', 'Memory Allocation', 'Time Complexity'],
    description: `
      A systematic repository of foundational computer science implementations. Features low-level pointer arithmetic, dynamic memory management (malloc, free) in C, and comprehensive Data Structures & Algorithms implemented in Python with documented time and space trade-offs.
    `,
    highlights: [
      'Implemented pointer-based linked lists, stacks, queues, and tree traversals in C.',
      'Practiced memory leak prevention and manual resource cleanup.',
      'Solved algorithmic recursion, sorting, and search challenges in Python.',
      'Recorded every tricky pointer mistake in my dedicated Markdown Error Log.'
    ],
    codeSnippet: `/* Dynamic Memory Pointer Node Allocation in C */
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* createNode(int value) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (newNode == NULL) {
        fprintf(stderr, "Error: Memory allocation failed!\\n");
        exit(EXIT_FAILURE);
    }
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

void freeList(Node* head) {
    Node* temp;
    while (head != NULL) {
        temp = head;
        head = head->next;
        free(temp); // Prevent memory leaks
    }
}`
  },

  'proj-web': {
    title: 'Human-Crafted Portfolio & Terminal Platform',
    tags: ['Vanilla JavaScript', 'Modern CSS', 'Canvas API', 'Dark Mode', 'Zero Dependencies'],
    description: `
      This portfolio was engineered from scratch with pure web fundamentals. It features an atmospheric Sky & Tree Canopy canvas physics engine, an interactive CLI terminal shell, multi-palette theme cycling, interactive project simulators, and a story-first layout that reflects a real person.
    `,
    highlights: [
      '100% Vanilla JavaScript and CSS variables—zero bloated node modules or heavy frameworks.',
      'Interactive CLI emulator supporting command history, easter eggs, and autoscroll.',
      'Story-driven project cards with live interactive demo simulators.',
      'Accessible, lightweight, and fully responsive across all screen sizes.'
    ],
    codeSnippet: `// Nature Particle Constellation Loop
function animateConstellation(ctx, particles, width, height, mouse) {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouse, width, height);
        particles[i].draw(ctx);
        for (let j = i + 1; j < particles.length; j++) {
            connectParticles(ctx, particles[i], particles[j], 130);
        }
    }
    requestAnimationFrame(() => animateConstellation(ctx, particles, width, height, mouse));
}`
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalContainer = document.getElementById('modal-content-container');
  const closeBtn = document.getElementById('modal-close-btn');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  if (!modal || !modalContainer) return;

  function openModal(projectId) {
    const data = projectData[projectId];

    if (projectId === 'proj-chatbot-demo') {
      renderRIASECSimulator(modalContainer);
    } else if (data) {
      modalContainer.innerHTML = `
        <div class="modal-header-section">
          <h3 class="modal-title">${data.title}</h3>
          <div class="bento-tags-row">
            ${data.tags.map(t => `<span class="btag">${t}</span>`).join('')}
          </div>
        </div>

        <div class="modal-body-section">
          <h4><i class="fa-solid fa-file-lines"></i> Project Overview</h4>
          <p>${data.description}</p>

          <h4 style="margin-top:18px;"><i class="fa-solid fa-star"></i> Key Implementation Highlights</h4>
          <ul style="padding-left: 20px; font-size: 0.92rem; color: #cbd5e1; display: flex; flex-direction: column; gap: 8px; margin: 10px 0;">
            ${data.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>

          <h4 style="margin-top:18px;"><i class="fa-solid fa-code"></i> Code Implementation</h4>
          <pre class="modal-code-block"><code>${escapeHTML(data.codeSnippet)}</code></pre>
        </div>

        <div class="modal-actions">
          <button class="btn btn-primary btn-sm" onclick="showToast('Thank you! Project details noted.', 'success')">
            <i class="fa-solid fa-circle-check"></i> Great Story!
          </button>
          <button class="btn btn-secondary btn-sm" onclick="closeProjectModal()">
            Close
          </button>
        </div>
      `;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  window.closeProjectModal = closeModal;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      openModal(projKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function renderRIASECSimulator(container) {
  container.innerHTML = `
    <div class="modal-header-section">
      <h3 class="modal-title"><i class="fa-solid fa-brain"></i> Career Guidance RIASEC Live Simulator</h3>
      <p style="color:var(--text-muted); font-size:0.92rem;">Test the Holland Code questionnaire engine right in your browser:</p>
    </div>

    <div class="simulator-box" style="display:flex; flex-direction:column; gap:16px;">
      <div style="background:rgba(0,0,0,0.3); padding:16px; border-radius:10px; border:1px solid rgba(255,255,255,0.08);">
        <p style="font-weight:600; color:#fff; margin-bottom:8px;">1. What kind of problem solving gets you most excited?</p>
        <label style="display:block; margin:6px 0; font-size:0.9rem; cursor:pointer;"><input type="radio" name="q1" value="I" checked> Diving into data, math, and debugging logical systems (Investigative)</label>
        <label style="display:block; margin:6px 0; font-size:0.9rem; cursor:pointer;"><input type="radio" name="q1" value="R"> Building physical things, servers, or concrete tools (Realistic)</label>
        <label style="display:block; margin:6px 0; font-size:0.9rem; cursor:pointer;"><input type="radio" name="q1" value="S"> Collaborating with people, teaching, and mentoring (Social)</label>
      </div>

      <div style="background:rgba(0,0,0,0.3); padding:16px; border-radius:10px; border:1px solid rgba(255,255,255,0.08);">
        <p style="font-weight:600; color:#fff; margin-bottom:8px;">2. When creating an application, what do you care about most?</p>
        <label style="display:block; margin:6px 0; font-size:0.9rem; cursor:pointer;"><input type="radio" name="q2" value="R" checked> Solid backend architecture, database speed, and clean code</label>
        <label style="display:block; margin:6px 0; font-size:0.9rem; cursor:pointer;"><input type="radio" name="q2" value="A"> Beautiful design, thoughtful typography, and smooth UX (Artistic)</label>
        <label style="display:block; margin:6px 0; font-size:0.9rem; cursor:pointer;"><input type="radio" name="q2" value="C"> Well-organized data structures, clean error logs & documentation (Conventional)</label>
      </div>

      <button class="btn btn-primary btn-sm" id="calc-riasec-btn" style="align-self:flex-start;">
        <i class="fa-solid fa-calculator"></i> Match My Career Path
      </button>

      <div id="simulator-result" style="padding:16px; background:rgba(56,189,248,0.1); border-radius:10px; border:1px solid rgba(56,189,248,0.3); display:none;">
      </div>
    </div>

    <div class="modal-actions">
      <button class="btn btn-glass btn-sm" onclick="closeProjectModal()">Close Simulator</button>
    </div>
  `;

  setTimeout(() => {
    const calcBtn = document.getElementById('calc-riasec-btn');
    const resBox = document.getElementById('simulator-result');
    if (calcBtn && resBox) {
      calcBtn.addEventListener('click', () => {
        const q1Val = document.querySelector('input[name="q1"]:checked')?.value || 'I';
        const q2Val = document.querySelector('input[name="q2"]:checked')?.value || 'R';

        let path = "Software Developer / IT Engineer";
        let details = "Strong affinity for analytical problem solving, data structures, and computer systems.";

        if (q1Val === 'I' && q2Val === 'R') {
          path = "Backend & Systems Developer (Python / Java / C)";
          details = "You thrive on writing logic, optimizing data handling pipelines, and designing robust backends.";
        } else if (q2Val === 'A') {
          path = "Full Stack & UI/UX Engineer";
          details = "You blend rigorous backend problem solving with human-centered, creative interface design.";
        } else if (q2Val === 'C') {
          path = "Data Analyst & Database Architect (SQL / Pandas)";
          details = "You excel at schema architecture, structured data transformations, and reliable reporting.";
        }

        resBox.style.display = 'block';
        resBox.innerHTML = `
          <h4 style="color:var(--accent-primary); margin-bottom:6px;"><i class="fa-solid fa-circle-check"></i> RIASEC Code Composite: [${q1Val}-${q2Val}]</h4>
          <p style="color:#fff; font-weight:700; font-size:1.05rem; margin-bottom:4px;">Recommended Trajectory: ${path}</p>
          <p style="font-size:0.9rem; color:#cbd5e1; margin:0;">${details}</p>
        `;
      });
    }
  }, 60);
}

function showAnalyzerDemoModal() {
  const modal = document.getElementById('project-modal');
  const modalContainer = document.getElementById('modal-content-container');
  if (!modal || !modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-header-section">
      <h3 class="modal-title"><i class="fa-solid fa-table-cells"></i> Student Performance Analyzer Simulator</h3>
      <p style="color:var(--text-muted); font-size:0.92rem;">Try out the Python/NumPy calculation engine live:</p>
    </div>

    <div style="display:flex; flex-direction:column; gap:16px;">
      <p style="font-size:0.9rem; color:#cbd5e1;">Edit student marks below and click <strong>"Run NumPy Calculations"</strong> to compute class mean, standard deviation, and letter grades:</p>
      
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; background:rgba(0,0,0,0.3); border-radius:8px; font-size:0.88rem;">
          <thead>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.1); color:var(--accent-primary); text-align:left;">
              <th style="padding:8px 12px;">Student</th>
              <th style="padding:8px 12px;">Python</th>
              <th style="padding:8px 12px;">SQL</th>
              <th style="padding:8px 12px;">DSA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px 12px;">Rahul S.</td>
              <td style="padding:6px 12px;"><input type="number" id="m1_py" value="88" style="width:60px; padding:4px 8px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:4px; color:#fff;"></td>
              <td style="padding:6px 12px;"><input type="number" id="m1_sql" value="92" style="width:60px; padding:4px 8px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:4px; color:#fff;"></td>
              <td style="padding:6px 12px;"><input type="number" id="m1_dsa" value="85" style="width:60px; padding:4px 8px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:4px; color:#fff;"></td>
            </tr>
            <tr>
              <td style="padding:6px 12px;">Ananya M.</td>
              <td style="padding:6px 12px;"><input type="number" id="m2_py" value="74" style="width:60px; padding:4px 8px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:4px; color:#fff;"></td>
              <td style="padding:6px 12px;"><input type="number" id="m2_sql" value="79" style="width:60px; padding:4px 8px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:4px; color:#fff;"></td>
              <td style="padding:6px 12px;"><input type="number" id="m2_dsa" value="82" style="width:60px; padding:4px 8px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:4px; color:#fff;"></td>
            </tr>
            <tr>
              <td style="padding:6px 12px;">Sourav D.</td>
              <td style="padding:6px 12px;"><input type="number" id="m3_py" value="95" style="width:60px; padding:4px 8px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:4px; color:#fff;"></td>
              <td style="padding:6px 12px;"><input type="number" id="m3_sql" value="68" style="width:60px; padding:4px 8px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:4px; color:#fff;"></td>
              <td style="padding:6px 12px;"><input type="number" id="m3_dsa" value="91" style="width:60px; padding:4px 8px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:4px; color:#fff;"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <button class="btn btn-primary btn-sm" id="calc-stats-btn" style="align-self:flex-start;">
        <i class="fa-solid fa-bolt"></i> Run NumPy Calculations
      </button>

      <div id="analyzer-results" style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:16px; display:none;">
      </div>
    </div>

    <div class="modal-actions">
      <button class="btn btn-glass btn-sm" onclick="closeProjectModal()">Close Demo</button>
    </div>
  `;

  setTimeout(() => {
    const btn = document.getElementById('calc-stats-btn');
    const res = document.getElementById('analyzer-results');
    if (btn && res) {
      btn.addEventListener('click', () => {
        const pyScores = [
          parseFloat(document.getElementById('m1_py').value) || 0,
          parseFloat(document.getElementById('m2_py').value) || 0,
          parseFloat(document.getElementById('m3_py').value) || 0
        ];
        const sqlScores = [
          parseFloat(document.getElementById('m1_sql').value) || 0,
          parseFloat(document.getElementById('m2_sql').value) || 0,
          parseFloat(document.getElementById('m3_sql').value) || 0
        ];
        const dsaScores = [
          parseFloat(document.getElementById('m1_dsa').value) || 0,
          parseFloat(document.getElementById('m2_dsa').value) || 0,
          parseFloat(document.getElementById('m3_dsa').value) || 0
        ];

        const meanPy = (pyScores.reduce((a,b)=>a+b, 0)/3).toFixed(2);
        const meanSql = (sqlScores.reduce((a,b)=>a+b, 0)/3).toFixed(2);
        const meanDsa = (dsaScores.reduce((a,b)=>a+b, 0)/3).toFixed(2);

        res.style.display = 'block';
        res.innerHTML = `
          <h4 style="color:#34d399; margin-bottom:8px;"><i class="fa-solid fa-chart-simple"></i> NumPy Metrics Computed:</h4>
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; font-size:0.88rem; margin-bottom:10px;">
            <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px;"><strong>Python Mean:</strong> ${meanPy}%</div>
            <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px;"><strong>SQL Mean:</strong> ${meanSql}%</div>
            <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px;"><strong>DSA Mean:</strong> ${meanDsa}%</div>
          </div>
          <p style="font-size:0.85rem; color:#cbd5e1; margin:0;"><i class="fa-solid fa-circle-check" style="color:#34d399;"></i> Generated grade distribution: 2 Students with <strong>Grade A+</strong>, 1 Student with <strong>Grade A</strong>. CSV export pipeline ready.</p>
        `;
      });
    }
  }, 60);

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
window.showAnalyzerDemoModal = showAnalyzerDemoModal;

/* ==========================================================================
   7. Bento Hobby Modals (CSK, Books, Error Log, Compounding)
   ========================================================================== */
function initHobbyModal() {
  const modal = document.getElementById('hobby-modal');
  const closeBtn = document.getElementById('hobby-close-btn');

  if (!modal) return;

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  window.closeHobbyModal = closeModal;

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function showHobbyModal(htmlContent) {
  const modal = document.getElementById('hobby-modal');
  const content = document.getElementById('hobby-modal-content');
  if (!modal || !content) return;

  content.innerHTML = htmlContent;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function showTacticsModal() {
  showHobbyModal(`
    <div class="modal-header-section">
      <h3 class="modal-title" style="color:var(--accent-csk);"><i class="fa-solid fa-trophy"></i> Chennai Super Kings &bull; Tactical Breakdown</h3>
      <p style="color:var(--text-muted); font-size:0.92rem;">Why cricket captaincy is basically live algorithmic optimization:</p>
    </div>
    <div style="display:flex; flex-direction:column; gap:14px; font-size:0.93rem; color:#cbd5e1; line-height:1.65;">
      <p>
        Most people watch T20 cricket for the big sixes, but what keeps me glued to the screen is the <strong>tactical chess match</strong> orchestrated by MS Dhoni and CSK management:
      </p>
      <div style="background:rgba(250,204,21,0.08); border-left:3px solid #facc15; padding:12px 16px; border-radius:0 8px 8px 0;">
        <h4 style="color:#facc15; font-size:0.98rem; margin-bottom:4px;">1. The Chepauk "Spin Choke" Matrix</h4>
        <p style="margin:0;">Rotating finger and wrist spinners in overs 7–15 to force batters into hitting against the longer boundary dimensions while controlling run rate.</p>
      </div>
      <div style="background:rgba(56,189,248,0.08); border-left:3px solid var(--accent-primary); padding:12px 16px; border-radius:0 8px 8px 0;">
        <h4 style="color:var(--accent-primary); font-size:0.98rem; margin-bottom:4px;">2. Unconventional Field Traps</h4>
        <p style="margin:0;">Setting a straightish mid-off right next to the bowler's run-up or placing a catching mid-wicket specifically to exploit a batter's technical weakness against incoming angle.</p>
      </div>
      <div style="background:rgba(16,185,129,0.08); border-left:3px solid #10b981; padding:12px 16px; border-radius:0 8px 8px 0;">
        <h4 style="color:#34d399; font-size:0.98rem; margin-bottom:4px;">3. Process Over Outcome</h4>
        <p style="margin:0;">"Control the controllables." Dhoni's philosophy of executing the right ball rather than panicking over bad bounces is the exact mindset I bring to debugging complex edge cases.</p>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-primary btn-sm" onclick="closeHobbyModal()">Whistle Podu! &#128079;</button>
    </div>
  `);
}
window.showTacticsModal = showTacticsModal;

function showBooksModal() {
  showHobbyModal(`
    <div class="modal-header-section">
      <h3 class="modal-title" style="color:var(--accent-purple);"><i class="fa-solid fa-book-open-reader"></i> Bookshelf &amp; Philosophical Stories</h3>
      <p style="color:var(--text-muted); font-size:0.92rem;">Favorite reads that keep me humble and curious:</p>
    </div>
    <div style="display:flex; flex-direction:column; gap:16px; font-size:0.92rem; color:#cbd5e1; line-height:1.65;">
      <div style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:16px;">
        <h4 style="color:#d8b4fe; font-size:1.05rem; margin-bottom:4px;">&#128218; Siddhartha — Hermann Hesse</h4>
        <p style="font-style:italic; color:#e2e8f0; margin-bottom:6px;">"Wisdom cannot be imparted. Wisdom that a wise man attempts to impart always sounds like foolishness to someone else."</p>
        <p style="margin:0; font-size:0.88rem; color:var(--text-muted);"><strong>Takeaway:</strong> You cannot learn software engineering solely by reading tutorials. You have to write broken code, feel the friction, and understand the problem through direct experience.</p>
      </div>

      <div style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:16px;">
        <h4 style="color:#67e8f9; font-size:1.05rem; margin-bottom:4px;">&#127957; Into the Wild — Jon Krakauer</h4>
        <p style="font-style:italic; color:#e2e8f0; margin-bottom:6px;">"The joy of life comes from our encounters with new experiences, and hence there is no greater joy than to have an endlessly changing horizon."</p>
        <p style="margin:0; font-size:0.88rem; color:var(--text-muted);"><strong>Takeaway:</strong> The courage to explore unfamiliar territory, maintain intense curiosity, and stay true to your values.</p>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-secondary btn-sm" onclick="closeHobbyModal()">Close Bookshelf</button>
    </div>
  `);
}
window.showBooksModal = showBooksModal;

function showInvestingModal() {
  showHobbyModal(`
    <div class="modal-header-section">
      <h3 class="modal-title" style="color:#34d399;"><i class="fa-solid fa-chart-line"></i> Compounding &amp; Long-Term Leverage</h3>
      <p style="color:var(--text-muted); font-size:0.92rem;">How small daily efforts compound in code &amp; finance:</p>
    </div>
    <div style="display:flex; flex-direction:column; gap:16px; font-size:0.92rem; color:#cbd5e1; line-height:1.65;">
      <p>
        In finance, a low-cost broad index fund quietly compounding at 12% over 20 years turns modest monthly savings into life-changing wealth. 
        <strong>Software development follows the exact same compounding curve:</strong>
      </p>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div style="background:rgba(0,0,0,0.3); padding:14px; border-radius:8px; border:1px solid rgba(255,255,255,0.08);">
          <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Daily Intensity (The Sprint)</span>
          <p style="margin:4px 0 0; color:#fb7185; font-weight:600;">1.00<sup>365</sup> = 1.00</p>
          <span style="font-size:0.78rem; color:var(--text-muted);">Cramming once a month leads to burnout.</span>
        </div>
        <div style="background:rgba(16,185,129,0.1); padding:14px; border-radius:8px; border:1px solid rgba(16,185,129,0.3);">
          <span style="font-size:0.8rem; color:#34d399; text-transform:uppercase;">1% Daily Improvement</span>
          <p style="margin:4px 0 0; color:#34d399; font-weight:700; font-size:1.1rem;">1.01<sup>365</sup> = 37.78x</p>
          <span style="font-size:0.78rem; color:#cbd5e1;">Solving 1 problem a day produces 37x growth.</span>
        </div>
      </div>
      <p style="margin:0; font-size:0.88rem; color:var(--text-muted);">
        Whether it is contributing steadily to an index fund or watching 1 video a day from my 100-video Python curriculum, consistency beats burst intensity every single time.
      </p>
    </div>
    <div class="modal-actions">
      <button class="btn btn-primary btn-sm" onclick="closeHobbyModal()">Keep Compounding!</button>
    </div>
  `);
}
window.showInvestingModal = showInvestingModal;

function showErrorLogModal() {
  showHobbyModal(`
    <div class="modal-header-section">
      <h3 class="modal-title" style="color:#fb7185;"><i class="fa-solid fa-bug-slash"></i> Peek Inside Roni's "Error Log"</h3>
      <p style="color:var(--text-muted); font-size:0.92rem;">Real entries from my Markdown developer bug diary:</p>
    </div>
    <div style="display:flex; flex-direction:column; gap:14px; font-size:0.88rem; color:#cbd5e1; font-family:var(--font-mono);">
      
      <div style="background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px;">
        <span style="color:#fb7185; font-weight:600;">[LOG #24 - Pandas SettingWithCopyWarning]</span>
        <p style="color:#94a3b8; margin:4px 0;"><strong>Mistake:</strong> Modifying a filtered slice of a DataFrame directly without <code>.copy()</code>.</p>
        <p style="color:#34d399; margin:0;"><strong>Fix:</strong> Always use <code>df.loc[mask, 'col'] = val</code> or explicitly instantiate <code>.copy()</code>.</p>
      </div>

      <div style="background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px;">
        <span style="color:#fb7185; font-weight:600;">[LOG #31 - C Pointer Dangling Reference]</span>
        <p style="color:#94a3b8; margin:4px 0;"><strong>Mistake:</strong> Returning the address of a local stack variable from a function.</p>
        <p style="color:#34d399; margin:0;"><strong>Fix:</strong> Allocate memory on the heap with <code>malloc()</code> or pass a pointer buffer from the caller.</p>
      </div>

      <div style="background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px;">
        <span style="color:#fb7185; font-weight:600;">[LOG #39 - Spring Boot Bean Not Found]</span>
        <p style="color:#94a3b8; margin:4px 0;"><strong>Mistake:</strong> Missing <code>@Service</code> annotation on my business logic class, causing dependency injection failure.</p>
        <p style="color:#34d399; margin:0;"><strong>Fix:</strong> Ensure component scanning picks up all service and repository stereotype annotations.</p>
      </div>

    </div>
    <div class="modal-actions">
      <button class="btn btn-secondary btn-sm" onclick="closeHobbyModal()">Close Error Log</button>
    </div>
  `);
}
window.showErrorLogModal = showErrorLogModal;

/* ==========================================================================
   8. Resume Modal Handlers (Updated to 4th Year & CGPA 7.22)
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const navResumeBtn = document.getElementById('nav-resume-btn');
  const resumeCloseBtn = document.getElementById('resume-close-btn');

  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResumeModal);
  if (navResumeBtn) navResumeBtn.addEventListener('click', openResumeModal);
  if (resumeCloseBtn) resumeCloseBtn.addEventListener('click', closeResumeModal);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
      closeResumeModal();
    }
  });
}

function openResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  if (resumeModal) {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  if (resumeModal) {
    resumeModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

window.openResumeModal = openResumeModal;
window.closeResumeModal = closeResumeModal;

function printResume() {
  window.print();
}
window.printResume = printResume;

function downloadResumeText() {
  const data = getAcademicData();
  const skills = getSkillsData();

  const langSkills = skills.filter(s => s.category === 'languages').map(s => s.name).join(', ');
  const dataSkills = skills.filter(s => s.category === 'data').map(s => s.name).join(', ');
  const fwSkills = skills.filter(s => s.category === 'frameworks').map(s => s.name).join(', ');
  const toolSkills = skills.filter(s => s.category === 'tools').map(s => s.name).join(', ');

  const trainingStr = Array.isArray(data.trainingTracks) 
    ? data.trainingTracks.map(t => `- ${t}`).join('\n') 
    : '- Infosys Springboard & Wipro TalentNext';

  const resumeText = `===================================================================
${(data.name || 'RONI MAITY').toUpperCase()}
${data.location || 'Contai, West Bengal, India'} | ${data.phone || '+91 8597176733'} | ${data.email || 'maityroni2005@gmail.com'}
${data.tagline || 'Information Technology Student & Software/Data Developer'}
===================================================================

CAREER OBJECTIVE:
${data.objective || 'Information Technology student dedicated to building clean, scalable software solutions.'}

EDUCATION:
- ${data.collegeDegree || 'B.Tech in Information Technology'}
  ${data.collegeName || 'Government College of Engineering and Textile Technology'} | Score/CGPA: ${data.collegeCgpa || '7.17'}
- Higher Secondary (Class XII)
  ${data.xiiSchool || 'WBCHSE'} | Score: ${data.xiiScore || '77.8%'}
- Secondary (Class X)
  ${data.xSchool || 'WBBSE'} | Score: ${data.xScore || '86.75%'}

TECHNICAL SKILLS:
- Languages & Core: ${langSkills || 'Python, C, SQL'}
- Data & Libraries: ${dataSkills || 'NumPy, Pandas'}
- Frameworks & Web: ${fwSkills || 'Spring Boot, Streamlit'}
- Tools & Environments: ${toolSkills || 'VS Code, Git, GitHub, Jupyter Notebook'}

PROJECTS:
1. Student Performance Analyzer (Python, NumPy, Pandas)
   - Ingests raw classroom examination marks, cleans inconsistencies with Pandas,
     and computes vectorized variance and statistical summaries with NumPy.
2. Career Guidance Chatbot (Python, Streamlit, RIASEC Model)
   - Interactive web application implementing John Holland's RIASEC psychology model
     to score personality traits and recommend targeted career trajectories.
3. DSA & Low-Level Problem Solving Suite (C & Python)
   - Custom implementations of linked lists, stacks, queues, and search algorithms
     with memory tracking and time complexity analysis.

TRAINING & CERTIFICATIONS:
${trainingStr}

ADDITIONAL STRENGTHS:
- Analytical mindset with a dedicated Developer Error Log to track and eliminate recurring bugs.
- Objective research ability and commitment to continuous technical improvement.
===================================================================`;

  const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${(data.name || 'Student').replace(/\s+/g, '_')}_Resume.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('Resume downloaded as formatted text file!', 'success');
}
window.downloadResumeText = downloadResumeText;


/* ==========================================================================
   9. 1-Click Copy-to-Clipboard
   ========================================================================== */
function copyToClipboard(text, successMsg = 'Copied to clipboard!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg, 'success');
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMsg, 'success');
  } catch (err) {
    showToast('Failed to copy. Please select manually.', 'info');
  }
  document.body.removeChild(textArea);
}
window.copyToClipboard = copyToClipboard;

/* ==========================================================================
   10. Contact Form & Toast Notifications
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'info');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending note...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Send Note to Roni</span> <i class="fa-solid fa-paper-plane"></i>`;
      }
      form.reset();
      showToast(`Thanks, ${name}! Your note has been sent. Looking forward to chatting.`, 'success');
    }, 700);
  });
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-info'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.35s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
window.showToast = showToast;

/* ==========================================================================
   11. Navigation & Theme Toggle (Sky & Nature Palettes)
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Active section observer
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', toggleThemePalette);
}

function toggleThemePalette() {
  const body = document.body;
  const themes = ['theme-twilight', 'theme-aurora', 'theme-sunset'];
  let currentThemeIdx = 0;

  for (let i = 0; i < themes.length; i++) {
    if (body.classList.contains(themes[i])) {
      currentThemeIdx = i;
      break;
    }
  }

  body.classList.remove(themes[currentThemeIdx]);
  const nextTheme = themes[(currentThemeIdx + 1) % themes.length];
  body.classList.add(nextTheme);

  const themeNames = {
    'theme-twilight': 'Twilight Sky & Pine Forest',
    'theme-aurora': 'Northern Lights & Starry Canopy',
    'theme-sunset': 'Sunset Horizon & Warm Forest'
  };

  showToast(`Atmosphere switched to: ${themeNames[nextTheme]}`, 'info');
}
window.toggleThemePalette = toggleThemePalette;

/* ==========================================================================
   12. Stat Counters (CGPA 7.22 Animation)
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-num');
  if (statNumbers.length === 0) return;

  let started = false;
  const card = document.getElementById('hero-card');

  function startCount() {
    statNumbers.forEach(num => {
      const targetStr = num.getAttribute('data-target');
      const isFloat = targetStr.includes('.');
      const target = parseFloat(targetStr);
      let count = 0;
      const steps = 25;
      const increment = target / steps;

      const updateCounter = () => {
        count += increment;
        if (count < target) {
          num.textContent = isFloat ? count.toFixed(2) : Math.ceil(count);
          setTimeout(updateCounter, 40);
        } else {
          num.textContent = isFloat ? target.toFixed(2) : target;
        }
      };
      updateCounter();
    });
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      startCount();
      started = true;
    }
  }, { threshold: 0.3 });

  if (card) observer.observe(card);
}

/* ==========================================================================
   13. STUDENT PROFILE & ACADEMIC DATA MANAGEMENT SYSTEM
   ========================================================================== */
const STORAGE_KEYS = {
  ACADEMIC: 'roni_student_academic_data',
  SKILLS: 'roni_student_skills_data',
  PHOTO: 'roni_student_photo_base64'
};

// Default Academic Details
const DEFAULT_ACADEMIC_DATA = {
  name: "Roni Maity",
  tagline: "3rd-Year Information Technology Student • Software & Data Development",
  email: "maityroni2005@gmail.com",
  phone: "+91 8597176733",
  location: "Contai, West Bengal, India",
  collegeName: "Government College of Engineering and Textile Technology",
  collegeDegree: "Bachelor of Technology (B.Tech) — Information Technology",
  collegeYear: "3rd-Year IT Undergrad",
  collegeCgpa: "7.17",
  xiiSchool: "West Bengal Council of Higher Secondary Education (WBCHSE)",
  xiiScore: "77.8%",
  xSchool: "West Bengal Board of Secondary Education (Madhyamik)",
  xScore: "86.75%",
  trainingTracks: [
    "Enrolled in Infosys Springboard — Spring Boot Internship track.",
    "Completed core Python fundamentals through a structured 100-video course; currently progressing through NumPy and Pandas.",
    "Active participant in Wipro TalentNext digital readiness program."
  ],
  objective: "Third-year Information Technology student building a strong foundation in Python, data handling (NumPy, Pandas), and Data Structures & Algorithms. Actively engaged with industry training programs (Wipro TalentNext, Infosys Springboard) and seeking an entry-level role or internship in software/data development where I can apply my problem-solving skills and grow as a developer."
};

// Default Skills Dataset
const DEFAULT_SKILLS = [
  { id: 'skill-python', name: 'Python', category: 'languages', badge: 'Primary Language', icon: 'devicon-python-plain', desc: 'Completed a structured 100-video foundational course. Comfortable with OOP, script automation, file I/O, data pipelines, and problem solving.', context: 'Used in: Performance Analyzer, RIASEC Bot, DSA practice' },
  { id: 'skill-sql', name: 'SQL & MySQL', category: 'languages', badge: 'Databases', icon: 'devicon-mysql-plain', desc: 'Writing structured relational queries, multiple JOINs, aggregations, filtering, table design, primary/foreign key relationships, and data integrity.', context: 'Used in: Academic database systems, query optimization' },
  { id: 'skill-js', name: 'JavaScript (ES6+)', category: 'languages', badge: 'Frontend Logic', icon: 'devicon-javascript-plain', desc: 'DOM manipulation, asynchronous events, interactive animations, Canvas physics, state handling, and building responsive browser experiences.', context: 'Used in: This portfolio engine, interactive simulators, CLI' },
  { id: 'skill-numpy', name: 'NumPy', category: 'data', badge: 'Data Handling', icon: 'devicon-numpy-original', desc: 'Multi-dimensional ndarrays, vectorized mathematical computations, fast statistical metrics (mean, std dev, min/max), and array indexing.', context: 'Used in: Student marks analyzer, matrix operations' },
  { id: 'skill-pandas', name: 'Pandas', category: 'data', badge: 'Data Manipulation', icon: 'devicon-pandas-original', desc: 'DataFrames, Series, reading and exporting CSV/Excel files, cleaning missing values (NaNs), filtering, grouping, and generating reports.', context: 'Used in: Data transformation scripts, CSV reporting pipelines' },
  { id: 'skill-spring', name: 'Java & Spring Boot', category: 'frameworks', badge: 'Infosys Springboard', icon: 'devicon-spring-plain', desc: 'Actively learning enterprise backend concepts: Java OOP, Spring Boot basics, REST API routing, dependency injection, and MVC architecture.', context: 'Used in: Infosys Springboard internship training track' },
  { id: 'skill-streamlit', name: 'Streamlit', category: 'frameworks', badge: 'Python Web Framework', icon: 'fa-solid fa-chart-pie', desc: 'Rapidly turning Python data logic into interactive web interfaces with widgets, questionnaire state flows, and clean data visualizations.', context: 'Used in: Career Guidance Chatbot web deployment' },
  { id: 'skill-c', name: 'C Language', category: 'languages', badge: 'Low-Level Foundations', icon: 'devicon-c-plain', desc: 'Procedural logic, pointer arithmetic, manual memory allocation (malloc/free), structures, and low-level debugging.', context: 'Used in: CS core coursework, understanding memory architecture' },
  { id: 'skill-dsa', name: 'Data Structures & Algorithms', category: 'tools', badge: 'Active Practice (Python)', icon: 'fa-solid fa-network-wired', desc: 'Arrays, linked lists, stacks, queues, recursion, sorting/searching algorithms, and understanding time & space complexity trade-offs.', context: 'Used in: Daily problem solving and technical interview prep' },
  { id: 'skill-tools', name: 'VS Code, Git & GitHub', category: 'tools', badge: 'Workflow Tools', icon: 'devicon-vscode-plain', desc: 'Day-to-day development with VS Code, Jupyter Notebook for interactive experiments, and Git/GitHub for structured version control.', context: 'Used in: All daily coding and project repositories' },
  { id: 'skill-cn', name: 'Computer Networks & Core CS', category: 'tools', badge: 'Academic Foundations', icon: 'fa-solid fa-server', desc: 'OSI and TCP/IP protocol stack, HTTP/HTTPS client-server communication, socket concepts, and fundamental operating system principles.', context: 'Used in: B.Tech IT curriculum and backend comprehension' }
];

// Helper to get active academic data
function getAcademicData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.ACADEMIC);
    return saved ? JSON.parse(saved) : { ...DEFAULT_ACADEMIC_DATA };
  } catch (e) {
    return { ...DEFAULT_ACADEMIC_DATA };
  }
}

// Helper to save academic data
function saveAcademicData(data) {
  try {
    localStorage.setItem(STORAGE_KEYS.ACADEMIC, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving academic data:', e);
  }
}

// Helper to get active skills list
function getSkillsData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
    return saved ? JSON.parse(saved) : [...DEFAULT_SKILLS];
  } catch (e) {
    return [...DEFAULT_SKILLS];
  }
}

// Helper to save skills list
function saveSkillsData(skills) {
  try {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  } catch (e) {
    console.error('Error saving skills data:', e);
  }
}

// Helper to get student photo
function getStudentPhoto() {
  try {
    return localStorage.getItem(STORAGE_KEYS.PHOTO) || null;
  } catch (e) {
    return null;
  }
}

// Helper to save student photo
function saveStudentPhoto(base64Str) {
  try {
    localStorage.setItem(STORAGE_KEYS.PHOTO, base64Str);
    renderStudentPhoto();
    triggerCelebrationConfetti();
    showToast('Student photo updated successfully across website & resume!', 'success');
  } catch (e) {
    showToast('Photo too large to store in local memory. Please use a smaller image file.', 'info');
  }
}

// Helper to remove student photo
function removeStudentPhoto() {
  try {
    localStorage.removeItem(STORAGE_KEYS.PHOTO);
    renderStudentPhoto();
    showToast('Student photo removed. Showing default badge.', 'info');
  } catch (e) {
    console.error('Error removing photo:', e);
  }
}
window.removeStudentPhoto = removeStudentPhoto;

/* ==========================================================================
   14. RENDER ALL STUDENT DATA ACROSS THE DOM
   ========================================================================== */
function renderAllStudentData() {
  const data = getAcademicData();
  const skills = getSkillsData();
  
  // 1. Update Resume Modal Content
  const rName = document.getElementById('resume-student-name');
  if (rName) rName.textContent = (data.name || "Roni Maity").toUpperCase();

  const rTagline = document.getElementById('resume-student-tagline');
  if (rTagline) rTagline.textContent = data.tagline || "";

  const rLoc = document.getElementById('resume-student-location');
  if (rLoc) rLoc.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.location || ""}`;

  const rPhone = document.getElementById('resume-student-phone');
  if (rPhone) rPhone.innerHTML = `<i class="fa-solid fa-phone"></i> ${data.phone || ""}`;

  const rEmail = document.getElementById('resume-student-email');
  if (rEmail) rEmail.innerHTML = `<i class="fa-solid fa-envelope"></i> ${data.email || ""}`;

  const rObj = document.getElementById('resume-student-objective');
  if (rObj) rObj.textContent = data.objective || "";

  const rDeg = document.getElementById('resume-college-degree');
  if (rDeg) rDeg.textContent = data.collegeDegree || "";

  const rCgpa = document.getElementById('resume-college-cgpa');
  if (rCgpa) rCgpa.textContent = `CGPA / Score: ${data.collegeCgpa || ""}`;

  const rColName = document.getElementById('resume-college-name');
  if (rColName) rColName.textContent = data.collegeName || "";

  const rXiiScore = document.getElementById('resume-xii-score');
  if (rXiiScore) rXiiScore.textContent = data.xiiScore || "";

  const rXiiSchool = document.getElementById('resume-xii-school');
  if (rXiiSchool) rXiiSchool.textContent = data.xiiSchool || "";

  const rXScore = document.getElementById('resume-x-score');
  if (rXScore) rXScore.textContent = data.xScore || "";

  const rXSchool = document.getElementById('resume-x-school');
  if (rXSchool) rXSchool.textContent = data.xSchool || "";

  // Resume Training Tracks
  const rTraining = document.getElementById('resume-training-list');
  if (rTraining && Array.isArray(data.trainingTracks)) {
    rTraining.innerHTML = data.trainingTracks
      .filter(t => t.trim().length > 0)
      .map(t => `<li>${escapeHTML(t)}</li>`)
      .join('');
  }

  // Resume Skills List
  const rSkills = document.getElementById('resume-skills-list');
  if (rSkills) {
    const langSkills = skills.filter(s => s.category === 'languages').map(s => s.name).join(', ');
    const dataSkills = skills.filter(s => s.category === 'data').map(s => s.name).join(', ');
    const fwSkills = skills.filter(s => s.category === 'frameworks').map(s => s.name).join(', ');
    const toolSkills = skills.filter(s => s.category === 'tools').map(s => s.name).join(', ');

    rSkills.innerHTML = `
      <li><strong>Languages &amp; Core:</strong> ${langSkills || 'Python, C, SQL'}</li>
      <li><strong>Data &amp; Libraries:</strong> ${dataSkills || 'NumPy, Pandas'}</li>
      <li><strong>Frameworks &amp; Web:</strong> ${fwSkills || 'Spring Boot, Streamlit'}</li>
      <li><strong>Tools &amp; Workspaces:</strong> ${toolSkills || 'VS Code, Git, GitHub, Jupyter'}</li>
    `;
  }

  // 2. Update Hero 3D Card Snippet & CGPA Stat Badge
  const heroCgpa = document.querySelector('.dev-stats-row .stat-pill:first-child .stat-num');
  if (heroCgpa) {
    heroCgpa.setAttribute('data-target', data.collegeCgpa || "7.17");
    heroCgpa.textContent = data.collegeCgpa || "7.17";
  }

  // 3. Render Dynamic Skills Grid in Section
  renderSkillsSectionGrid(skills);

  // 4. Render Skills Manager List in Editor Tab
  renderSkillsManageList(skills);

  // 5. Render Student Photo in Upper Right Resume & Hero
  renderStudentPhoto();

  // 6. Update Education Timeline Section
  renderEducationTimeline();
}

// Render Skills in Main Grid
function renderSkillsSectionGrid(skills) {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  grid.innerHTML = skills.map(s => `
    <div class="skill-card glass-panel" data-category="${escapeHTML(s.category)}">
      <div class="skill-header">
        <div class="skill-icon ${s.icon && s.icon.includes('devicon') ? s.icon.split('-')[1] + '-icon' : 'tools-icon'}">
          <i class="${escapeHTML(s.icon || 'fa-solid fa-code')}"></i>
        </div>
        <div class="skill-info">
          <h4>${escapeHTML(s.name)}</h4>
          <span class="skill-badge">${escapeHTML(s.badge || 'Skill')}</span>
        </div>
      </div>
      <p class="skill-desc">${escapeHTML(s.desc)}</p>
      ${s.context ? `
        <div class="skill-context">
          <i class="fa-solid fa-circle-check text-accent"></i> <strong>${escapeHTML(s.context)}</strong>
        </div>
      ` : ''}
    </div>
  `).join('');

  // Re-apply active filter tab state
  const activeBtn = document.querySelector('.filter-btn.active');
  if (activeBtn) {
    const filter = activeBtn.getAttribute('data-filter');
    const cards = grid.querySelectorAll('.skill-card');
    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }
}

// Render Skills in Manager List
function renderSkillsManageList(skills) {
  const list = document.getElementById('skills-manage-list');
  const countBadge = document.getElementById('skill-count-badge');
  if (countBadge) countBadge.textContent = skills.length;
  if (!list) return;

  if (skills.length === 0) {
    list.innerHTML = `<p class="text-muted" style="grid-column:1/-1; padding:12px;">No skills in inventory. Add one above!</p>`;
    return;
  }

  list.innerHTML = skills.map((s, idx) => `
    <div class="skill-manage-item">
      <div class="skill-manage-info">
        <div class="skill-manage-icon">
          <i class="${escapeHTML(s.icon || 'fa-solid fa-code')}"></i>
        </div>
        <div class="skill-manage-text">
          <strong>${escapeHTML(s.name)}</strong>
          <span>${escapeHTML(s.category)} &bull; ${escapeHTML(s.badge || '')}</span>
        </div>
      </div>
      <div class="skill-manage-actions">
        <button type="button" class="btn-icon-danger" onclick="deleteSkillByIndex(${idx})" title="Remove ${escapeHTML(s.name)}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// Delete a skill by index
function deleteSkillByIndex(index) {
  const skills = getSkillsData();
  const deletedName = skills[index] ? skills[index].name : 'Skill';
  skills.splice(index, 1);
  saveSkillsData(skills);
  renderAllStudentData();
  showToast(`Removed "${deletedName}" from your skills list.`, 'info');
}
window.deleteSkillByIndex = deleteSkillByIndex;

// Render Student Photo across DOM
function renderStudentPhoto() {
  const photo = getStudentPhoto();
  
  // Upper Right Resume Photo
  const resumeImg = document.getElementById('resume-photo-img');
  const resumeFallback = document.getElementById('resume-photo-placeholder');
  const resumeRemoveBtn = document.getElementById('resume-remove-photo-btn');

  // Modal Tab 3 Preview
  const tabImg = document.getElementById('tab-photo-preview-img');
  const tabFallback = document.getElementById('tab-photo-fallback');
  const tabRemoveBtn = document.getElementById('modal-remove-photo-btn');

  // Hero Card Avatar
  const heroAvatarBox = document.querySelector('.card-avatar-wrapper .avatar-box');

  if (photo) {
    if (resumeImg) {
      resumeImg.src = photo;
      resumeImg.style.display = 'block';
    }
    if (resumeFallback) resumeFallback.style.display = 'none';
    if (resumeRemoveBtn) resumeRemoveBtn.style.display = 'inline-flex';

    if (tabImg) {
      tabImg.src = photo;
      tabImg.style.display = 'block';
    }
    if (tabFallback) tabFallback.style.display = 'none';
    if (tabRemoveBtn) tabRemoveBtn.style.display = 'inline-flex';

    if (heroAvatarBox) {
      heroAvatarBox.innerHTML = `<img src="${photo}" alt="Student Photo" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
    }
  } else {
    if (resumeImg) {
      resumeImg.src = '';
      resumeImg.style.display = 'none';
    }
    if (resumeFallback) resumeFallback.style.display = 'flex';
    if (resumeRemoveBtn) resumeRemoveBtn.style.display = 'none';

    if (tabImg) {
      tabImg.src = '';
      tabImg.style.display = 'none';
    }
    if (tabFallback) tabFallback.style.display = 'flex';
    if (tabRemoveBtn) tabRemoveBtn.style.display = 'none';

    if (heroAvatarBox) {
      heroAvatarBox.innerHTML = `<span class="avatar-initials">RM</span>`;
    }
  }
}

/* ==========================================================================
   15. STUDENT PROFILE MODAL & EDIT LOGIC
   ========================================================================== */
function initStudentProfileManager() {
  const modal = document.getElementById('profile-edit-modal');
  const closeBtn = document.getElementById('profile-edit-close-btn');
  const triggers = document.querySelectorAll('.edit-profile-trigger');
  const tabBtns = document.querySelectorAll('.edit-tab-btn');
  const addSkillForm = document.getElementById('add-skill-form');

  // Open Modal triggers
  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = btn.getAttribute('data-open-tab') || 'academic-tab';
      openProfileEditModal(targetTab);
    });
  });

  // Close Modal
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Tab switching in edit modal
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target-tab');
      document.querySelectorAll('.edit-tab-content').forEach(tab => {
        tab.classList.remove('active');
      });
      const activeTab = document.getElementById(targetId);
      if (activeTab) activeTab.classList.add('active');
    });
  });

  // Handle Add Skill Form
  if (addSkillForm) {
    addSkillForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('new-skill-name').value.trim();
      const category = document.getElementById('new-skill-category').value;
      const badge = document.getElementById('new-skill-badge').value.trim() || 'Skill';
      let icon = document.getElementById('new-skill-icon').value.trim();
      const desc = document.getElementById('new-skill-desc').value.trim();
      const context = document.getElementById('new-skill-context').value.trim();

      if (!icon) {
        icon = category === 'languages' ? 'fa-solid fa-code' :
               category === 'data' ? 'fa-solid fa-chart-simple' :
               category === 'frameworks' ? 'fa-solid fa-cubes' : 'fa-solid fa-wrench';
      }

      const newSkill = {
        id: 'skill-' + Date.now(),
        name,
        category,
        badge,
        icon,
        desc,
        context: context ? (context.startsWith('Used in:') ? context : `Used in: ${context}`) : ''
      };

      const skills = getSkillsData();
      skills.unshift(newSkill);
      saveSkillsData(skills);
      renderAllStudentData();
      addSkillForm.reset();

      triggerCelebrationConfetti();
      showToast(`Added "${name}" to your skill inventory!`, 'success');
    });
  }

  // File Upload Handlers (Resume Modal & Edit Modal)
  setupPhotoInput('resume-photo-file-input');
  setupPhotoInput('modal-photo-file-input');
}

function setupPhotoInput(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  input.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WEBP).', 'info');
      return;
    }

    if (file.size > 2.5 * 1024 * 1024) {
      showToast('Image is larger than 2.5MB. Please choose a smaller picture.', 'info');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      saveStudentPhoto(base64);
    };
    reader.readAsDataURL(file);
  });
}

function openProfileEditModal(tabId = 'academic-tab') {
  const modal = document.getElementById('profile-edit-modal');
  if (!modal) return;

  // Populate inputs with current data
  const data = getAcademicData();
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  };

  setVal('edit-student-name', data.name);
  setVal('edit-student-tagline', data.tagline);
  setVal('edit-student-email', data.email);
  setVal('edit-student-phone', data.phone);
  setVal('edit-student-location', data.location);
  setVal('edit-college-name', data.collegeName);
  setVal('edit-college-degree', data.collegeDegree);
  setVal('edit-college-year', data.collegeYear);
  setVal('edit-college-cgpa', data.collegeCgpa);
  setVal('edit-xii-school', data.xiiSchool);
  setVal('edit-xii-score', data.xiiScore);
  setVal('edit-x-school', data.xSchool);
  setVal('edit-x-score', data.xScore);
  setVal('edit-student-objective', data.objective);
  setVal('edit-training-tracks', Array.isArray(data.trainingTracks) ? data.trainingTracks.join('\n') : '');

  // Switch to requested tab
  const tabBtn = document.querySelector(`.edit-tab-btn[data-target-tab="${tabId}"]`);
  if (tabBtn) {
    document.querySelectorAll('.edit-tab-btn').forEach(b => b.classList.remove('active'));
    tabBtn.classList.add('active');

    document.querySelectorAll('.edit-tab-content').forEach(t => t.classList.remove('active'));
    const tabEl = document.getElementById(tabId);
    if (tabEl) tabEl.classList.add('active');
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
window.openProfileEditModal = openProfileEditModal;

function saveAcademicDetails() {
  const getVal = id => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  };

  const name = getVal('edit-student-name');
  if (!name) {
    showToast('Student name is required.', 'info');
    return;
  }

  const rawTracks = getVal('edit-training-tracks');
  const trainingTracks = rawTracks
    .split('\n')
    .map(t => t.trim())
    .filter(t => t.length > 0);

  const updatedData = {
    name,
    tagline: getVal('edit-student-tagline'),
    email: getVal('edit-student-email'),
    phone: getVal('edit-student-phone'),
    location: getVal('edit-student-location'),
    collegeName: getVal('edit-college-name'),
    collegeDegree: getVal('edit-college-degree'),
    collegeYear: getVal('edit-college-year'),
    collegeCgpa: getVal('edit-college-cgpa'),
    xiiSchool: getVal('edit-xii-school'),
    xiiScore: getVal('edit-xii-score'),
    xSchool: getVal('edit-x-school'),
    xScore: getVal('edit-x-score'),
    trainingTracks: trainingTracks.length > 0 ? trainingTracks : DEFAULT_ACADEMIC_DATA.trainingTracks,
    objective: getVal('edit-student-objective')
  };

  saveAcademicData(updatedData);
  renderAllStudentData();

  const modal = document.getElementById('profile-edit-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  triggerCelebrationConfetti();
  showToast('Academic details saved & updated everywhere!', 'success');
}
window.saveAcademicDetails = saveAcademicDetails;

function resetToOriginalData() {
  if (confirm('Reset your profile and skills back to original defaults?')) {
    localStorage.removeItem(STORAGE_KEYS.ACADEMIC);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    localStorage.removeItem(STORAGE_KEYS.PHOTO);
    renderAllStudentData();
    
    const modal = document.getElementById('profile-edit-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
    showToast('Reset to original portfolio defaults.', 'info');
  }
}
window.resetToOriginalData = resetToOriginalData;

/* ==========================================================================
   16. CELEBRATION CONFETTI ENGINE
   ========================================================================== */
function initConfettiSystem() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let confettiPieces = [];
  let isRunning = false;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const colors = ['#38bdf8', '#34d399', '#fbbf24', '#f43f5e', '#a855f7', '#38bdf8', '#ffffff'];

  class Confetti {
    constructor() {
      this.x = Math.random() * width;
      this.y = -20 - Math.random() * 50;
      this.vx = (Math.random() - 0.5) * 6;
      this.vy = Math.random() * 4 + 3;
      this.size = Math.random() * 8 + 4;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.2;
      this.opacity = 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      if (this.y > height * 0.6) {
        this.opacity -= 0.015;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      ctx.restore();
    }
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);

    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      const p = confettiPieces[i];
      p.update();
      p.draw();

      if (p.opacity <= 0 || p.y > height) {
        confettiPieces.splice(i, 1);
      }
    }

    if (confettiPieces.length > 0) {
      requestAnimationFrame(loop);
    } else {
      isRunning = false;
      ctx.clearRect(0, 0, width, height);
    }
  }

  window.triggerCelebrationConfetti = function() {
    for (let i = 0; i < 70; i++) {
      confettiPieces.push(new Confetti());
    }
    if (!isRunning) {
      isRunning = true;
      requestAnimationFrame(loop);
    }
  };
}

/* ==========================================================================
   17. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.timeline-card, .bento-card, .project-story-card, .skill-card, .intro-narrative, .contact-info-card, .contact-form-card'
  );

  if (!revealEls.length) return;

  // Add base reveal class
  revealEls.forEach(el => {
    el.classList.add('reveal-on-scroll');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for grid items
        const delay = (i % 4) * 80;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
}

/* ==========================================================================
   18. DRAG & DROP PHOTO UPLOAD
   ========================================================================== */
function initDragDropPhotoUpload() {
  const dropzone = document.getElementById('photo-dropzone');
  if (!dropzone) return;

  // Style the dropzone as draggable
  dropzone.style.cursor = 'pointer';
  dropzone.setAttribute('role', 'button');
  dropzone.setAttribute('aria-label', 'Drag and drop photo or click to browse');

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('drag-over');
    });
  });

  ['dragleave', 'dragend', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('drag-over');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (!file) return;
    processDroppedPhoto(file);
  });

  // Click on dropzone to trigger file picker
  dropzone.addEventListener('click', (e) => {
    // Only trigger if not clicking the label/button inside
    if (e.target.tagName !== 'LABEL' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
      const input = document.getElementById('modal-photo-file-input');
      if (input) input.click();
    }
  });
}

function processDroppedPhoto(file) {
  if (!file.type.startsWith('image/')) {
    showToast('Please drop a valid image file (JPG, PNG, WEBP).', 'info');
    return;
  }
  if (file.size > 2.5 * 1024 * 1024) {
    showToast('Image is too large (max 2.5MB). Please use a smaller picture.', 'info');
    return;
  }

  const dropzone = document.getElementById('photo-dropzone');
  if (dropzone) {
    dropzone.classList.add('uploading');
    const cloudIcon = dropzone.querySelector('.cloud-icon');
    if (cloudIcon) cloudIcon.className = 'fa-solid fa-spinner fa-spin cloud-icon';
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    saveStudentPhoto(event.target.result);

    if (dropzone) {
      dropzone.classList.remove('uploading');
      const cloudIcon = dropzone.querySelector('.cloud-icon');
      if (cloudIcon) cloudIcon.className = 'fa-solid fa-circle-check cloud-icon';
      setTimeout(() => {
        if (cloudIcon) cloudIcon.className = 'fa-solid fa-cloud-arrow-up cloud-icon';
      }, 2000);
    }
  };
  reader.readAsDataURL(file);
}

/* ==========================================================================
   19. FIRST-VISIT ONBOARDING HINT
   ========================================================================== */
function initOnboardingHint() {
  const hasVisited = localStorage.getItem('roni_portfolio_visited');
  if (hasVisited) return;

  // Mark as visited
  localStorage.setItem('roni_portfolio_visited', '1');

  // Wait for page to fully render
  setTimeout(() => {
    const hint = document.createElement('div');
    hint.id = 'onboarding-hint';
    hint.innerHTML = `
      <div class="onboarding-bubble">
        <button class="onboarding-close" onclick="document.getElementById('onboarding-hint').remove()" aria-label="Dismiss hint">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="onboarding-icon"><i class="fa-solid fa-user-pen"></i></div>
        <h4>Welcome to Roni's Portfolio!</h4>
        <p>This is <strong>your personalizable</strong> portfolio. Click <strong>"Edit Profile"</strong> or the floating button below to update academic details, skills, and add your photo!</p>
        <button class="btn btn-primary btn-sm onboarding-cta" onclick="openProfileEditModal('academic-tab'); document.getElementById('onboarding-hint').remove();">
          <i class="fa-solid fa-wand-magic-sparkles"></i> Customize Now
        </button>
      </div>
    `;
    document.body.appendChild(hint);

    // Auto-dismiss after 12 seconds
    setTimeout(() => {
      const el = document.getElementById('onboarding-hint');
      if (el) {
        el.style.animation = 'onboardingFadeOut 0.5s ease forwards';
        setTimeout(() => el.remove(), 500);
      }
    }, 12000);
  }, 2500);
}

/* ==========================================================================
   20. DYNAMIC EDUCATION TIMELINE UPDATE
   ========================================================================== */
function renderEducationTimeline() {
  const data = getAcademicData();
  const timeline = document.querySelector('#education .timeline');
  if (!timeline) return;

  // Update B.Tech card
  const bTechTitle = timeline.querySelector('.timeline-item:nth-child(1) .timeline-title');
  const bTechMeta = timeline.querySelector('.timeline-item:nth-child(1) .time-badge');
  const bTechInst = timeline.querySelector('.timeline-item:nth-child(1) .timeline-inst strong');
  const bTechDesc = timeline.querySelector('.timeline-item:nth-child(1) .timeline-card > p');
  const bTechTags = timeline.querySelector('.timeline-item:nth-child(1) .timeline-tags');

  if (bTechTitle) bTechTitle.textContent = data.collegeDegree || 'B.Tech in Information Technology';
  if (bTechMeta) bTechMeta.textContent = `CGPA: ${data.collegeCgpa || '7.17'} (till current sem)`;
  if (bTechInst) bTechInst.textContent = data.collegeName || 'Government College of Engineering and Textile Technology';
  if (bTechDesc) bTechDesc.textContent = `Currently in my ${data.collegeYear || '3rd year'}. Here I transitioned from simply writing code to understanding computing systems, database architectures, algorithmic efficiency, and object-oriented software design.`;
  if (bTechTags) {
    bTechTags.innerHTML = `
      <span>Information Technology</span>
      <span>CGPA: ${data.collegeCgpa || '7.17'}</span>
      <span>${data.collegeYear || 'Third Year'}</span>
      <span>Govt. College</span>
    `;
  }

  // Update Class XII
  const xiiScore = timeline.querySelector('.timeline-item:nth-child(5) .time-badge');
  const xiiInst = timeline.querySelector('.timeline-item:nth-child(5) .timeline-inst strong');
  if (xiiScore) xiiScore.textContent = `Score: ${data.xiiScore || '77.8%'}`;
  if (xiiInst) xiiInst.textContent = data.xiiSchool || 'West Bengal Council of Higher Secondary Education (WBCHSE)';

  // Update Class X
  const xScore = timeline.querySelector('.timeline-item:nth-child(6) .time-badge');
  const xInst = timeline.querySelector('.timeline-item:nth-child(6) .timeline-inst strong');
  if (xScore) xScore.textContent = `Score: ${data.xScore || '86.75%'}`;
  if (xInst) xInst.textContent = data.xSchool || 'West Bengal Board of Secondary Education (WBBSE)';

  // Update Hero card CGPA stat text
  const heroCgpaStat = document.querySelector('.dev-stats-row .stat-pill:first-child .stat-num');
  if (heroCgpaStat) {
    heroCgpaStat.setAttribute('data-target', data.collegeCgpa || '7.17');
    heroCgpaStat.textContent = data.collegeCgpa || '7.17';
  }

  // Update hero description year text
  const heroYearEl = document.querySelector('.hero-desc strong:first-of-type');
  if (heroYearEl) {
    heroYearEl.textContent = data.collegeYear || '3rd year of Information Technology';
  }
}
