/**
 * PlacementPro AI — Auth Guard
 * ─────────────────────────────────────────────────────────────────
 * Include this script in EVERY student page <head> AFTER student-profile.js.
 * It:
 *  1. Reads the session from localStorage.
 *  2. Redirects unauthenticated visitors to ../login.html immediately.
 *  3. Injects the user's first name into any element with [data-user-name].
 *  4. Wires up all logout links (<a data-logout>) to handleLogout().
 * ─────────────────────────────────────────────────────────────────
 */
(function () {
    'use strict';

    /* ── 1. Read session ── */
    let session = null;
    try {
        const raw = localStorage.getItem('placementpro_session');
        session = raw ? JSON.parse(raw) : null;
    } catch (e) { session = null; }

    /* ── 2. Guard: redirect if not logged in ── */
    if (!session || !session.email) {
        // Determine correct login.html path based on current depth
        const depth = (window.location.pathname.match(/\//g) || []).length;
        const prefix = depth >= 2 ? '../' : '';
        window.location.replace(prefix + 'login.html');
        // Halt further script execution
        throw new Error('[Auth Guard] Not authenticated. Redirecting to login.');
    }

    /* ── 3. Inject user name when DOM is ready ── */
    document.addEventListener('DOMContentLoaded', () => {
        // Greet with first name in any [data-user-name] element
        const firstName = (session.name || session.email.split('@')[0])
            .split(' ')[0].replace(/\b\w/g, c => c.toUpperCase());

        document.querySelectorAll('[data-user-name]').forEach(el => {
            el.textContent = firstName;
        });

        // Wire up logout links
        document.querySelectorAll('[data-logout]').forEach(el => {
            el.addEventListener('click', (ev) => {
                ev.preventDefault();
                if (typeof handleLogout === 'function') {
                    handleLogout();
                } else {
                    localStorage.removeItem('placementpro_session');
                    window.location.href = '../login.html';
                }
            });
        });
    });
})();
