/**
 * PlacementPro AI — api.js
 * Resolves the backend base URL dynamically.
 *
 * Uses environment variable (process.env.NEXT_PUBLIC_API_URL) when available,
 * allowing production deployments to securely use https:// without code modifications.
 * Falls back to dynamic protocol/hostname resolution for local development and file:// mode.
 *
 * SILENT FALLBACK POLICY:
 * If the backend (Node or Python ML server) is unreachable, this layer
 * stays completely quiet — no banners, badges, popups or toasts. Every
 * caller already renders its own client-side/localStorage data, so the
 * app feels fully functional even when running entirely client-side.
 */
const API_BASE_URL = (() => {
    // 1. Check environment variable (e.g. process.env.NEXT_PUBLIC_API_URL for Next.js / bundlers / Node)
    const envApiUrl = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_URL)
        || (typeof window !== 'undefined' && (window.NEXT_PUBLIC_API_URL || (window.__ENV__ && window.__ENV__.NEXT_PUBLIC_API_URL)))
        || null;

    if (envApiUrl) {
        return envApiUrl.replace(/\/+$/, '');
    }

    // 2. Dynamic fallback based on current host and protocol (supports both https: and http:)
    const host = (typeof window !== 'undefined' && window.location && window.location.hostname) || '127.0.0.1';
    const resolvedHost = (host === '' || host === 'null') ? '127.0.0.1' : host;
    const protocol = (typeof window !== 'undefined' && window.location && window.location.protocol === 'https:') ? 'https:' : 'http:';
    return `${protocol}//${resolvedHost}:5000/api`;
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

    const cleanBase = API_BASE_URL.replace(/\/+$/, '');
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    try {
        const response = await fetch(`${cleanBase}${cleanEndpoint}`, options);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Server error');
        return data;
    } catch (error) {
        // Silent fallback: log quietly for developers, show nothing to users.
        console.info(`[PlacementPro] Using client-side data (${method} ${endpoint}).`);
        throw error; // re-throw so callers use their own fallbacks
    }
}

// Expose on window / module for broad compatibility
if (typeof window !== 'undefined') {
    window.API_BASE_URL = API_BASE_URL;
    window.apiCall = apiCall;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_BASE_URL, apiCall };
}
