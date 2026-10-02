/**
 * PlacementPro AI — Student Profile Data Manager
 * Handles localStorage persistence for student academic details,
 * skills, projects, and profile photo across all pages.
 *
 * ⚠️  FIX: Storage keys are now DYNAMIC and tied to the logged-in user's
 *          email address. This ensures complete data isolation between
 *          different Gmail/demo accounts on the same browser.
 */

/* ══════════════════════════════════════════════════════
   SESSION MANAGEMENT
   The session object lives at 'placementpro_session' and
   stores { email, name } for the currently logged-in user.
   ══════════════════════════════════════════════════════ */

/**
 * Get the currently logged-in session object, or null if not logged in.
 * @returns {{ email: string, name: string } | null}
 */
function getSession() {
  try {
    const raw = localStorage.getItem('placementpro_session');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Persist a session object (call this on login / register).
 * @param {{ email: string, name: string }} session
 */
function saveSession(session) {
  try {
    localStorage.setItem('placementpro_session', JSON.stringify(session));
  } catch (e) {
    console.error('Failed to save session:', e);
  }
}

/**
 * Clear session and redirect to login page.
 * Call this from every Logout button.
 */
function handleLogout() {
  localStorage.removeItem('placementpro_session');
  // Determine correct relative path to login.html from the current page depth
  const path = window.location.pathname;
  const isInStudentDir = path.includes('/student/');
  window.location.href = isInStudentDir ? '../login.html' : 'login.html';
}

/* ══════════════════════════════════════════════════════
   DYNAMIC STORAGE KEY HELPERS
   Keys include the user's email so every account gets
   its own isolated namespace in localStorage.
   ══════════════════════════════════════════════════════ */

/**
 * Returns the profile storage key for the current user.
 * Falls back to 'guest' if no session exists.
 */
function getStorageKey() {
  const session = getSession();
  const email = (session && session.email) ? session.email.toLowerCase().trim() : 'guest';
  return 'placementpro_profile_' + email;
}

/**
 * Returns the photo storage key for the current user.
 */
function getPhotoKey() {
  const session = getSession();
  const email = (session && session.email) ? session.email.toLowerCase().trim() : 'guest';
  return 'placementpro_photo_' + email;
}

/* ---------- Default data shown before student fills in anything ---------- */
// NOTE: All personal data is intentionally blank so every new account
// starts with a clean slate. Do NOT seed this with any real user data.
const DEFAULT_PROFILE = {
  // ── Personal ──────────────────────────────────────────
  name:             '',
  email:            '',
  phone:            '',
  location:         '',
  college:          '',
  branch:           'Other',
  cgpa:             '',
  backlogs:         '0',
  gradYear:         String(new Date().getFullYear() + 1),
  programming:      '',
  web:              '',
  databases:        '',
  dsa:              'Beginner',
  summary:          '',

  // ── Communication Address (new) ────────────────────────
  commStreet:       '',   // Street / Town
  commDistrict:     '',   // District
  commState:        '',   // State
  commPin:          '',   // PIN Code

  // ── Academic History — Class 10 (Madhyamik) ───────────
  madhyamikSchool:   '',
  madhyamikPercent:  '',
  madhyamikYear:     '',
  madhyamikBoard:    '',

  // ── Academic History — Class 12 (Higher Secondary) ────
  higherSecSchool:   '',
  higherSecPercent:  '',
  higherSecYear:     '',
  higherSecStream:   'Science',
  higherSecBoard:    '',

  // ── Academic History — Graduation (B.Tech) ────────────
  // Note: college, branch, cgpa, gradYear already serve as graduation row.
  // Added: university field for graduation
  graduationUniversity: '',

  // ── Projects ──────────────────────────────────────────
  projects: [],

  // ── 4. Hackathons & Flagship Projects ─────────────────
  hackathons: [],
  // Each entry: { name, role, techStack, description, links }

  // ── 5. Coding Contests & Competitive Programming ──────
  codingContests: [],
  // Each entry: { platform, rating, achievement }

  // ── 6. Internships & Work Experience ──────────────────
  internships: [],
  // Each entry: { company, role, startDate, endDate, deliverables }

  // ── 7. Workshops & Seminars Attended ──────────────────
  workshops: [],
  // Each entry: { title, organizer, date, duration, learnings }

  // ── 8. Extracurricular Activities ─────────────────────
  extracurricular: []
  // Each entry: { activity, role, description }
};

/**
 * Get the current saved profile for the logged-in user.
 * Uses a dynamic key tied to their email so accounts never share data.
 */
function getProfile() {
  try {
    const key   = getStorageKey();
    const saved = localStorage.getItem(key);
    // Merge saved with defaults so any new fields added to DEFAULT_PROFILE
    // automatically appear for existing users without losing their data.
    // Also pre-fill email/name from the active session if the profile is new.
    const session = getSession();
    const sessionDefaults = session
      ? { email: session.email || '', name: session.name || '' }
      : {};
    return saved
      ? { ...DEFAULT_PROFILE, ...sessionDefaults, ...JSON.parse(saved) }
      : { ...DEFAULT_PROFILE, ...sessionDefaults };
  } catch (e) {
    return { ...DEFAULT_PROFILE };
  }
}

/**
 * Build the backend API payload from a flat profile object.
 * Used both in saveProfile() and in ML analysis pages to send live data.
 */
function buildBackendPayload(data) {
  return {
    personalDetails: {
      fullName:             data.name || '',
      email:                data.email || '',
      phone:                data.phone || '',
      location:             data.location || '',
      college:              data.college || '',
      branch:               data.branch || 'Other',
      graduationYear:       parseInt(data.gradYear) || new Date().getFullYear() + 1,
      communicationAddress: buildCommAddress(data)
    },
    academicDetails: {
      cgpa:               parseFloat(data.cgpa) || 0,
      backlogs:           parseInt(data.backlogs) || 0,
      // Madhyamik
      madhyamikSchool:    data.madhyamikSchool  || '',
      madhyamikBoard:     data.madhyamikBoard   || '',
      madhyamikPercent:   parseFloat(data.madhyamikPercent)  || 0,
      madhyamikYear:      parseInt(data.madhyamikYear)       || null,
      // Higher Secondary
      higherSecSchool:    data.higherSecSchool  || '',
      higherSecBoard:     data.higherSecBoard   || '',
      higherSecStream:    data.higherSecStream  || '',
      higherSecPercent:   parseFloat(data.higherSecPercent)  || 0,
      higherSecYear:      parseInt(data.higherSecYear)       || null,
      // Graduation
      graduationUniversity: data.graduationUniversity || ''
    },
    technicalSkills: {
      programmingLanguages: (data.programming || '').split(',').map(s => s.trim()).filter(Boolean),
      webTechnologies:      (data.web         || '').split(',').map(s => s.trim()).filter(Boolean),
      databases:            (data.databases   || '').split(',').map(s => s.trim()).filter(Boolean),
      otherSkills:          [],
      dsaLevel:             data.dsa || 'Beginner'
    },
    projects: (data.projects || []).map(p => ({
      projectName:       p.title || '',
      technologiesUsed:  (p.tech || '').split(',').map(s => s.trim()).filter(Boolean),
      description:       (p.points || []).join('. ')
    })),
    hackathons: (data.hackathons || []).map(h => ({
      name:        h.name        || '',
      role:        h.role        || '',
      techStack:   h.techStack   || '',
      description: h.description || '',
      links:       h.links       || ''
    })),
    codingContests: (data.codingContests || []).map(c => ({
      platform:    c.platform    || '',
      rating:      c.rating      || '',
      achievement: c.achievement || ''
    })),
    internships: (data.internships || []).map(i => ({
      company:     i.company     || '',
      role:        i.role        || '',
      startDate:   i.startDate   || '',
      endDate:     i.endDate     || '',
      deliverables: i.deliverables || ''
    })),
    workshops: (data.workshops || []).map(w => ({
      title:     w.title     || '',
      organizer: w.organizer || '',
      date:      w.date      || '',
      duration:  w.duration  || '',
      learnings: w.learnings || ''
    })),
    extracurricular: (data.extracurricular || []).map(e => ({
      activity:    e.activity    || '',
      role:        e.role        || '',
      description: e.description || ''
    }))
  };
}

/**
 * Build a formatted communication address string from flat profile fields.
 */
function buildCommAddress(data) {
  const parts = [
    data.commStreet,
    data.commDistrict,
    data.commState,
    data.commPin ? 'PIN: ' + data.commPin : ''
  ].filter(Boolean);
  return parts.join(', ');
}

/**
 * Save a profile object to localStorage and Backend.
 */
async function saveProfile(data) {
  // 1. Save to local storage for instant UI updates (user-isolated key).
  //    This is the source of truth for the client-side experience.
  localStorage.setItem(getStorageKey(), JSON.stringify(data));

  // 2. Silently sync to the backend when available. If the backend is
  //    unreachable, localStorage has already succeeded — do NOT surface
  //    any error to the user (silent fallback policy).
  try {
    const backendPayload = buildBackendPayload(data);

    if (typeof apiCall === 'function') {
      await apiCall('/students', 'POST', backendPayload);

      // Pre-warm the ML pipeline for all three views so they are synced and ready
      try {
        const targetRole = localStorage.getItem('placementpro_target_role') || 'Backend Developer';
        apiCall('/analysis/roles',     'POST', { student: backendPayload }).catch(() => {});
        apiCall('/analysis/skill-gap', 'POST', { student: backendPayload, targetRole }).catch(() => {});
        apiCall('/companies/recommendations', 'POST', backendPayload).catch(() => {});
      } catch (err) {
        console.info('ML pipeline will warm up on next tab load.');
      }
    }
  } catch (e) {
    // Backend offline — local save is authoritative; stay silent.
    console.info('Backend sync skipped; profile saved locally.');
  }

  return true;
}

/**
 * Get saved profile photo (base64 string or null) for the current user.
 */
function getPhoto() {
  try {
    return localStorage.getItem(getPhotoKey()) || null;
  } catch (e) {
    return null;
  }
}

/**
 * Save a base64 photo string for the current user.
 */
function savePhoto(base64) {
  try {
    localStorage.setItem(getPhotoKey(), base64);
    return true;
  } catch (e) {
    console.error('Photo too large for localStorage (must be < ~5MB):', e);
    return false;
  }
}

/**
 * Remove stored photo for the current user.
 */
function removePhoto() {
  try {
    localStorage.removeItem(getPhotoKey());
  } catch (e) {
    console.error('Error removing photo:', e);
  }
}

/**
 * Show a lightweight toast notification.
 * @param {string} message  - Message text
 * @param {string} type     - 'success' | 'danger' | 'info'
 */
function showToast(message, type = 'success') {
  let container = document.getElementById('pp-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'pp-toast-container';
    container.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 9999;
      display: flex; flex-direction: column; gap: 10px;
    `;
    document.body.appendChild(container);
  }

  const colorMap = {
    success: { bg: '#059669', icon: '✓' },
    danger:  { bg: '#dc2626', icon: '✗' },
    info:    { bg: '#4f46e5', icon: 'ℹ' }
  };
  const { bg, icon } = colorMap[type] || colorMap.info;

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: ${bg}; color: #fff; padding: 12px 20px;
    border-radius: 10px; font-size: 0.9rem; font-weight: 600;
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    display: flex; align-items: center; gap: 10px;
    transform: translateX(110%); transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
    min-width: 240px; max-width: 360px;
  `;
  toast.innerHTML = `<span style="font-size:1.1rem">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => { toast.style.transform = 'translateX(0)'; });
  });

  setTimeout(() => {
    toast.style.transform = 'translateX(110%)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
