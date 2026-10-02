/**
 * PlacementPro AI — api.js
 * Resolves the backend URL based on the page's own hostname so that
 * file://, 127.0.0.1:3006, and localhost:3006 all hit the same backend.
 *
 * SILENT FALLBACK POLICY:
 * If the backend (Node or Python ML server) is unreachable, this layer
 * stays completely quiet — no banners, badges, popups or toasts. Every
 * caller already renders its own client-side/localStorage data, so the
 * app feels fully functional even when running entirely client-side.
 */
const API_BASE_URL = (() => {
    const host = window.location.hostname || '127.0.0.1';
    // If opened directly as a file (file://) fall back to 127.0.0.1
    const resolvedHost = (host === '' || host === 'null') ? '127.0.0.1' : host;
    return `http://${resolvedHost}:5000/api`;
})();

/* ─────────────────────────────────────────────────────────
   Core API Fetch Wrapper
   Never throws alert(), never touches the DOM on failure.
   Fails silently (console-only) and re-throws so callers can
   transparently use their own fallback/localStorage data.
   ───────────────────────────────────────────────────────── */
async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };
    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Server error');
        return data;
    } catch (error) {
        // Silent fallback: log quietly for developers, show nothing to users.
        console.info(`[PlacementPro] Using client-side data (${method} ${endpoint}).`);
        throw error; // re-throw so callers use their own fallbacks
    }
}
