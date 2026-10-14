/**
 * company.js — Powers the "Explore 50 Top Tech Companies" module on the landing page (index.html).
 * Provides instantaneous client-side search, category tabs, official career redirects,
 * and graceful fallback with zero dependencies on server availability.
 */

(function () {
  'use strict';

  let currentCategory = 'All';
  let searchQuery = '';

  document.addEventListener('DOMContentLoaded', () => {
    initLandingCompanies();
  });

  function initLandingCompanies() {
    const container = document.getElementById('landingCompaniesGrid');
    if (!container) return;

    // Attach search listener
    const searchInput = document.getElementById('landingCompanySearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        renderLandingCompanies();
      });
    }

    // Attach category tab listeners
    const categoryBtns = document.querySelectorAll('.landing-category-pill');
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category || 'All';
        renderLandingCompanies();
      });
    });

    renderLandingCompanies();
  }

  function renderLandingCompanies() {
    const container = document.getElementById('landingCompaniesGrid');
    const emptyState = document.getElementById('landingNoCompanies');
    const countBadge = document.getElementById('landingShowingCount');
    if (!container) return;

    const companies = window.COMPANIES_DATA || [];

    // Filter by category and search query
    const filtered = companies.filter(co => {
      if (currentCategory !== 'All' && co.category !== currentCategory) {
        return false;
      }
      if (searchQuery) {
        const matchName = co.name.toLowerCase().includes(searchQuery) || (co.fullName || '').toLowerCase().includes(searchQuery);
        const matchSkill = (co.requiredSkills || []).some(s => s.toLowerCase().includes(searchQuery));
        const matchCat = co.category.toLowerCase().includes(searchQuery);
        if (!matchName && !matchSkill && !matchCat) return false;
      }
      return true;
    });

    if (countBadge) {
      countBadge.textContent = `Showing ${filtered.length} of ${companies.length} companies`;
    }

    if (filtered.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.classList.remove('d-none');
      return;
    } else {
      if (emptyState) emptyState.classList.add('d-none');
    }

    container.innerHTML = filtered.map(co => {
      let catClass = 'service';
      if (co.category === 'Product-Based') catClass = 'product';
      else if (co.category === 'Unicorns') catClass = 'unicorn';

      // Category badge color
      let catBadgeStyle = 'background:#EEF2FF; color:#4F46E5; border:1px solid #C7D2FE;';
      if (co.category === 'Product-Based') catBadgeStyle = 'background:#ECFDF5; color:#047857; border:1px solid #A7F3D0;';
      else if (co.category === 'Unicorns') catBadgeStyle = 'background:#FFF7ED; color:#C2410C; border:1px solid #FFEDD5;';

      const logoHtml = typeof window.getCompanyLogoHTML === 'function'
        ? window.getCompanyLogoHTML(co.name, co.logo, 48)
        : `<div style="width:48px;height:48px;background:#4F46E5;color:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:bold;">${co.name.slice(0,2)}</div>`;

      const skillsHtml = (co.requiredSkills || []).slice(0, 3).map(s => `
        <span style="font-size:0.75rem; font-weight:700; background:#F1F5F9; color:#475569; padding:2px 8px; border-radius:50px; border:1px solid #E2E8F0;">
          ${escapeHtml(s)}
        </span>
      `).join(' ') + ((co.requiredSkills?.length > 3) ? `<span style="font-size:0.75rem; font-weight:700; color:#94A3B8;">+${co.requiredSkills.length - 3}</span>` : '');

      return `
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="card h-100 p-4 border-0 rounded-4" style="background:#FFFFFF; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05); border:1px solid #E2E8F0; transition:transform 0.25s, box-shadow 0.25s; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <!-- Header: Logo, Name & Category -->
              <div class="d-flex justify-content-between align-items-start mb-3">
                <a href="${escapeHtml(co.officialUrl)}" target="_blank" rel="noopener noreferrer"
                   class="d-flex align-items-center gap-3 text-decoration-none" title="Open official careers website for ${escapeHtml(co.name)}">
                  ${logoHtml}
                  <div>
                    <h5 class="fw-bold mb-0 text-dark">${escapeHtml(co.name)}</h5>
                    <small class="text-muted fw-semibold">${escapeHtml(co.fullName || co.name)}</small>
                  </div>
                </a>
                <span class="badge rounded-pill" style="${catBadgeStyle}; font-size:0.72rem; font-weight:800; text-transform:uppercase;">
                  ${escapeHtml(co.category)}
                </span>
              </div>

              <!-- Description -->
              <p class="text-muted small mb-3" style="min-height:38px; line-height:1.5;">
                ${escapeHtml(co.description)}
              </p>

              <!-- Metrics: CTC & Cutoff -->
              <div class="d-flex flex-wrap gap-2 mb-3">
                <span class="badge bg-light text-dark border px-2 py-1 fw-bold">
                  <i class="fa fa-money-bill-wave text-success me-1"></i>${escapeHtml(co.packageCTC)}
                </span>
                <span class="badge bg-light text-dark border px-2 py-1 fw-bold">
                  <i class="fa fa-graduation-cap text-primary me-1"></i>Min CGPA: ${co.minimumCGPA.toFixed(1)}
                </span>
              </div>

              <!-- Skills -->
              <div class="mb-3 d-flex flex-wrap gap-1 align-items-center">
                ${skillsHtml}
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="pt-3 border-top mt-2 d-flex justify-content-between align-items-center gap-2">
              <a href="${escapeHtml(co.officialUrl)}" target="_blank" rel="noopener noreferrer"
                 class="btn-official-site flex-grow-1 justify-content-center" title="Visit official careers website in a new tab">
                Visit Official Site <i class="fa fa-arrow-up-right-from-square ms-1"></i>
              </a>
              <a href="student/jobs.html?search=${encodeURIComponent(co.name)}"
                 class="btn btn-outline-primary btn-sm rounded-pill px-3 fw-bold text-nowrap"
                 title="View active openings in PlacementPro">
                <i class="fa fa-briefcase me-1"></i>Jobs
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
})();
