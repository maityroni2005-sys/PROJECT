/**
 * PlacementPro AI — api.js
 * ─────────────────────────────────────────────────────────────────────
 * Environment-aware API base URL resolver.
 *
 * Priority order for determining the base URL:
 *
 *   1. NEXT_PUBLIC_API_URL environment variable (highest priority)
 *      Set this in production to your full HTTPS endpoint, e.g.:
 *        NEXT_PUBLIC_API_URL=https://api.yourapp.com/api
 *      Supports: process.env (Node/bundlers), window.NEXT_PUBLIC_API_URL
 *      (injected via script tag / SSR), window.__ENV__.NEXT_PUBLIC_API_URL.
 *
 *   2. Explicit localhost / 127.0.0.1 dev override (never upgrades to https)
 *      When the browser is on localhost or 127.0.0.1 the code always uses
 *      http:, even if served through an HTTPS tunnel, to avoid mixed-content
 *      errors with a plain local Node server.
 *
 *   3. Protocol-mirrored fallback for every other host
 *      Mirrors window.location.protocol (http: or https:) so that a
 *      production deployment served over TLS never generates mixed-content
 *      requests. The backend port is read from NEXT_PUBLIC_API_PORT (default 5000),
 *      allowing the port to be changed per environment without touching code.
 *
 * SILENT FALLBACK POLICY:
 *   If the backend is unreachable this layer stays quiet — no banners, badges,
 *   popups or toasts. Every caller renders its own client-side / localStorage
 *   data, so the app stays fully functional even when running offline.
 * ─────────────────────────────────────────────────────────────────────
 */

/**
 * LOCAL_HOSTS — hostnames that are always treated as local development.
 * HTTP is used unconditionally for these, preventing false mixed-content
 * warnings when a TLS reverse proxy is in front of local tools.
 * @type {Set<string>}
 */
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '']);

/**
 * _readEnv — safely reads an env value from process.env, window, or
 * window.__ENV__ without throwing in any environment.
 * @param {string} key
 * @returns {string|null}
 */
function _readEnv(key) {
    try {
        if (typeof process !== 'undefined' && process.env && process.env[key]) {
            return process.env[key];
        }
    } catch (_) { /* process not available in some browsers */ }

    if (typeof window !== 'undefined') {
        if (window[key]) return window[key];
        if (window.__ENV__ && window.__ENV__[key]) return window.__ENV__[key];
    }
    return null;
}

/**
 * resolveApiBaseUrl — pure URL-resolution function, fully testable in Node.
 *
 * @param {object} options
 * @param {string|null} options.envApiUrl     - Full URL from env var (may be null)
 * @param {string}      options.hostname      - window.location.hostname
 * @param {string}      options.protocol      - window.location.protocol ('http:' | 'https:' | 'file:')
 * @param {string|null} options.envPort       - Port from NEXT_PUBLIC_API_PORT env var (may be null)
 * @returns {string}  Clean base URL with no trailing slash
 */
function resolveApiBaseUrl({ envApiUrl, hostname, protocol, envPort }) {
    // ── 1. Explicit env URL wins unconditionally ──────────────────────
    if (envApiUrl && envApiUrl.trim()) {
        return envApiUrl.trim().replace(/\/+$/, '');
    }

    const port = (envPort && envPort.trim()) ? envPort.trim() : '5000';

    // ── 2. Local dev override — always http: on loopback addresses ────
    if (LOCAL_HOSTS.has(hostname)) {
        return `http://${hostname || '127.0.0.1'}:${port}/api`;
    }

    // ── 3. Protocol-mirror for all other hosts ────────────────────────
    // Mirrors the page protocol (https: → https:, http: → http:).
    // file:// falls back to http: for compatibility with local file opens.
    const resolvedProtocol = (protocol === 'https:') ? 'https:' : 'http:';
    return `${resolvedProtocol}//${hostname}:${port}/api`;
}

// ── Compute the active base URL once at module load ───────────────────
const API_BASE_URL = resolveApiBaseUrl({
    envApiUrl: _readEnv('NEXT_PUBLIC_API_URL'),
    hostname:  (typeof window !== 'undefined' && window.location && window.location.hostname) || '127.0.0.1',
    protocol:  (typeof window !== 'undefined' && window.location && window.location.protocol) || 'http:',
    envPort:   _readEnv('NEXT_PUBLIC_API_PORT'),
});

/* ─────────────────────────────────────────────────────────
   Core API Fetch Wrapper
   Never throws alert(), never touches the DOM on failure.
   Fails silently (console-only) and re-throws so callers can
   transparently use their own fallback / localStorage data.
   ───────────────────────────────────────────────────────── */
/**
 * apiCall — thin fetch wrapper that routes requests through API_BASE_URL.
 *
 * @param {string}      endpoint - Path relative to API root, e.g. '/students'
 * @param {string}      [method='GET']
 * @param {object|null} [body=null]
 * @returns {Promise<any>} Parsed JSON response
 */
async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (body) options.body = JSON.stringify(body);

    const cleanBase     = API_BASE_URL.replace(/\/+$/, '');
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    try {
        const response = await fetch(`${cleanBase}${cleanEndpoint}`, options);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Server error');
        return data;
    } catch (error) {
        // Silent fallback — log for developers only, show nothing to users.
        console.info(`[PlacementPro] Using client-side data (${method} ${endpoint}).`);
        throw error; // re-throw so callers use their own fallbacks
    }
}

// ── Exports ───────────────────────────────────────────────────────────
// Expose on window for plain HTML <script> usage.
if (typeof window !== 'undefined') {
    window.API_BASE_URL = API_BASE_URL;
    window.apiCall      = apiCall;
}
// Expose as CommonJS module for Node tests and bundlers.
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_BASE_URL, apiCall, resolveApiBaseUrl, LOCAL_HOSTS };
}
