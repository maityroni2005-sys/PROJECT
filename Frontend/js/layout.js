/**
 * PlacementPro AI — layout.js
 * Shared responsive shell behavior for every student page.
 * Requires this DOM contract (present on all student pages):
 *   <div class="pp-topbar"> with .pp-burger button
 *   <div class="sidebar">  — main navigation
 *   <div class="pp-backdrop"></div>
 */
(function () {
    'use strict';

    function wireDrawer() {
        const body    = document.body;
        const burger  = document.querySelector('.pp-burger');
        const backdrop = document.querySelector('.pp-backdrop');
        const sidebar = document.querySelector('.sidebar');
        if (!burger || !sidebar) return;

        // A11y: expose the current page to assistive tech (color alone is not enough)
        const activeLink = sidebar.querySelector('.nav-link.active');
        if (activeLink) activeLink.setAttribute('aria-current', 'page');

        const open  = () => { body.classList.add('pp-drawer-open');  burger.setAttribute('aria-expanded', 'true'); };
        const close = () => { body.classList.remove('pp-drawer-open'); burger.setAttribute('aria-expanded', 'false'); };
        const isOpen = () => body.classList.contains('pp-drawer-open');

        burger.addEventListener('click', () => (isOpen() ? close() : open()));
        if (backdrop) backdrop.addEventListener('click', close);
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen()) close(); });

        // Auto-close when a nav link is clicked (navigation happens on the same tap)
        sidebar.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (link) close();
        });

        // Reset state when leaving mobile width
        window.matchMedia('(min-width: 992px)').addEventListener('change', (e) => {
            if (e.matches) close();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', wireDrawer);
    } else {
        wireDrawer();
    }
})();
