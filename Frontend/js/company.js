/* company.js — Loads company recommendations on the landing page (index.html).
   Gracefully falls back to client-side data if the backend is offline. */

const FALLBACK_SERVICE = [
    { name: 'TCS',       score: 85 },
    { name: 'Infosys',   score: 80 },
    { name: 'Cognizant', score: 75 }
];
const FALLBACK_PRODUCT = [
    { name: 'Flipkart', score: 70 },
    { name: 'Amazon',   score: 65 },
    { name: 'Zoho',     score: 72 }
];

document.addEventListener('DOMContentLoaded', async () => {
    const serviceBasedContainer = document.getElementById('serviceBased');
    const productBasedContainer = document.getElementById('productBased');
    const loadingEl  = document.getElementById('companyLoading');
    const contentEl  = document.getElementById('companyContent');
    const errorEl    = document.getElementById('companyError');

    if (!serviceBasedContainer || !productBasedContainer) return;

    const renderCard = (company, themeClass) => `
        <div class="col-md-4 mb-4">
            <div class="card shadow-sm h-100 border-0 p-4 rounded-4 bg-white company-card">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="fw-bold ${themeClass} mb-0">${company.name}</h4>
                    <span class="badge ${themeClass.replace('text-','bg-')} fs-6">${company.score}% Match</span>
                </div>
                <p class="text-muted mt-2 small">Based on your skills and academic profile, you have a strong chance here.</p>
            </div>
        </div>
    `;

    const render = (service, product) => {
        loadingEl.style.display = 'none';
        contentEl.style.display = 'block';
        serviceBasedContainer.innerHTML = service.map(c => renderCard(c, 'text-primary')).join('');
        productBasedContainer.innerHTML = product.map(c => renderCard(c, 'text-success')).join('');
    };

    try {
        const p = getProfile();
        const payload = typeof buildBackendPayload === 'function' ? buildBackendPayload(p) : p;
        const recs = await apiCall('/companies/recommendations', 'POST', payload);
        render(
            recs.serviceBased?.length ? recs.serviceBased : FALLBACK_SERVICE,
            recs.productBased?.length ? recs.productBased : FALLBACK_PRODUCT
        );
    } catch (error) {
        // Backend offline — show fallback cards silently (banner shown by api.js)
        if (errorEl) errorEl.style.display = 'none';
        render(FALLBACK_SERVICE, FALLBACK_PRODUCT);
    }
});
