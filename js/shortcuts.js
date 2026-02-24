// =============================================================================
// shortcuts.js — Keyboard Shortcuts, Help Panel & Accessibility
// =============================================================================
// Exposes: window.Shortcuts.init(), window.Shortcuts.showHelp()
// =============================================================================

(function () {
    "use strict";

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------
    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];

    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const modKey = isMac ? "metaKey" : "ctrlKey";
    const modLabel = isMac ? "\u2318" : "Ctrl";

    // View order matching sidebar data-view attributes
    const viewKeys = ["dashboard", "lesson", "challenge", "projects", "examples", "progress"];

    // -------------------------------------------------------------------------
    // State
    // -------------------------------------------------------------------------
    let helpOverlayEl = null;
    let initialized = false;
    let lastFocusBeforeModal = null;

    // -------------------------------------------------------------------------
    // Shortcut definitions (for the help panel)
    // -------------------------------------------------------------------------
    const shortcutGroups = [
        {
            title: "Navigation",
            shortcuts: [
                { keys: ["Alt", "1-6"], desc: "Switch view (1=Dashboard ... 6=Progress)" },
                { keys: ["Alt", "\u2190"], desc: "Previous lesson" },
                { keys: ["Alt", "\u2192"], desc: "Next lesson" },
                { keys: ["Escape"], desc: "Close modal / overlay" },
                { keys: [modLabel, "K"], desc: "Open search" },
            ],
        },
        {
            title: "Editor",
            shortcuts: [
                { keys: [modLabel, "Enter"], desc: "Run code" },
                { keys: [modLabel, "S"], desc: "Save (auto-saved)" },
            ],
        },
        {
            title: "UI",
            shortcuts: [
                { keys: ["Alt", "S"], desc: "Toggle sidebar" },
                { keys: ["Alt", "T"], desc: "Open settings" },
                { keys: ["?"], desc: "Show this help" },
            ],
        },
    ];

    // -------------------------------------------------------------------------
    // Build Shortcuts Help Modal
    // -------------------------------------------------------------------------
    function buildHelpModal() {
        if (helpOverlayEl) return helpOverlayEl;

        helpOverlayEl = document.createElement("div");
        helpOverlayEl.className = "shortcuts-overlay";
        helpOverlayEl.id = "shortcutsOverlay";
        helpOverlayEl.setAttribute("role", "dialog");
        helpOverlayEl.setAttribute("aria-label", "Keyboard shortcuts");
        helpOverlayEl.setAttribute("aria-modal", "true");

        let groupsHTML = shortcutGroups.map(function (group) {
            const rows = group.shortcuts.map(function (s) {
                const keysHTML = s.keys.map(function (k) {
                    return '<span class="shortcut-key">' + escapeHTML(k) + '</span>';
                }).join('<span class="shortcut-separator">+</span>');

                return '<div class="shortcut-row">' +
                    '<span class="shortcut-desc">' + escapeHTML(s.desc) + '</span>' +
                    '<span class="shortcut-keys">' + keysHTML + '</span>' +
                    '</div>';
            }).join("");

            return '<div class="shortcuts-group">' +
                '<div class="shortcuts-group-title">' + escapeHTML(group.title) + '</div>' +
                '<div class="shortcuts-list">' + rows + '</div>' +
                '</div>';
        }).join("");

        helpOverlayEl.innerHTML =
            '<div class="shortcuts-modal">' +
            '  <div class="shortcuts-modal-header">' +
            '    <h3>Keyboard Shortcuts</h3>' +
            '    <button class="shortcuts-modal-close" aria-label="Close shortcuts">&times;</button>' +
            '  </div>' +
            '  <div class="shortcuts-modal-body">' + groupsHTML + '</div>' +
            '</div>';

        document.body.appendChild(helpOverlayEl);

        // Close handlers
        helpOverlayEl.querySelector(".shortcuts-modal-close").addEventListener("click", hideHelp);
        helpOverlayEl.addEventListener("click", function (e) {
            if (e.target === helpOverlayEl) hideHelp();
        });

        return helpOverlayEl;
    }

    function escapeHTML(str) {
        var div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    // -------------------------------------------------------------------------
    // Show / Hide Help
    // -------------------------------------------------------------------------
    function showHelp() {
        buildHelpModal();
        lastFocusBeforeModal = document.activeElement;
        helpOverlayEl.classList.add("active");
        var closeBtn = helpOverlayEl.querySelector(".shortcuts-modal-close");
        if (closeBtn) closeBtn.focus();
        trapFocus(helpOverlayEl);
    }

    function hideHelp() {
        if (!helpOverlayEl) return;
        helpOverlayEl.classList.remove("active");
        releaseFocusTrap();
        if (lastFocusBeforeModal) {
            lastFocusBeforeModal.focus();
            lastFocusBeforeModal = null;
        }
    }

    // -------------------------------------------------------------------------
    // Focus Trap for Modals
    // -------------------------------------------------------------------------
    let focusTrapHandler = null;

    function trapFocus(container) {
        releaseFocusTrap();
        focusTrapHandler = function (e) {
            if (e.key !== "Tab") return;
            var focusable = container.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusable.length === 0) return;
            var first = focusable[0];
            var last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener("keydown", focusTrapHandler);
    }

    function releaseFocusTrap() {
        if (focusTrapHandler) {
            document.removeEventListener("keydown", focusTrapHandler);
            focusTrapHandler = null;
        }
    }

    // -------------------------------------------------------------------------
    // Modal focus trapping for existing modals
    // -------------------------------------------------------------------------
    function setupModalFocusTraps() {
        // Watch for .modal-overlay.active changes via MutationObserver
        var overlays = $$(".modal-overlay");
        overlays.forEach(function (overlay) {
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (m) {
                    if (m.attributeName !== "class") return;
                    if (overlay.classList.contains("active")) {
                        var prev = document.activeElement;
                        overlay._prevFocus = prev;
                        trapFocus(overlay);
                        // Focus first focusable inside modal
                        var first = overlay.querySelector(
                            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                        );
                        if (first) first.focus();
                    } else {
                        releaseFocusTrap();
                        if (overlay._prevFocus) {
                            overlay._prevFocus.focus();
                            overlay._prevFocus = null;
                        }
                    }
                });
            });
            observer.observe(overlay, { attributes: true });
        });
    }

    // -------------------------------------------------------------------------
    // Switch View Helper
    // -------------------------------------------------------------------------
    function switchToView(viewId) {
        var navItem = $(".sidebar-nav-item[data-view='" + viewId + "']");
        if (navItem) navItem.click();
    }

    // -------------------------------------------------------------------------
    // Close Any Open Modal/Overlay
    // -------------------------------------------------------------------------
    function closeAnyOverlay() {
        // Shortcuts help
        if (helpOverlayEl && helpOverlayEl.classList.contains("active")) {
            hideHelp();
            return true;
        }
        // More menu on mobile
        var moreMenu = $(".bottom-nav-more-menu.open");
        var moreBackdrop = $(".bottom-nav-more-backdrop.open");
        if (moreMenu) {
            moreMenu.classList.remove("open");
            if (moreBackdrop) moreBackdrop.classList.remove("open");
            return true;
        }
        // Existing modal overlays
        var activeOverlays = $$(".modal-overlay.active");
        if (activeOverlays.length > 0) {
            activeOverlays.forEach(function (o) { o.classList.remove("active"); });
            return true;
        }
        // Sidebar on mobile
        var sidebar = $("#sidebar");
        if (sidebar && sidebar.classList.contains("open")) {
            sidebar.classList.remove("open");
            var sidebarOverlay = $("#sidebarOverlay");
            if (sidebarOverlay) sidebarOverlay.classList.remove("active");
            return true;
        }
        return false;
    }

    // -------------------------------------------------------------------------
    // Keyboard Event Handler
    // -------------------------------------------------------------------------
    function onKeyDown(e) {
        var tag = (e.target.tagName || "").toLowerCase();
        var isInput = (tag === "input" || tag === "textarea" || tag === "select" || e.target.isContentEditable);

        // ----- Escape: close any overlay -----
        if (e.key === "Escape") {
            if (closeAnyOverlay()) {
                e.preventDefault();
                return;
            }
        }

        // ----- Ctrl/Cmd+S: prevent default, show auto-save toast -----
        if (e.key === "s" && e[modKey] && !e.altKey) {
            e.preventDefault();
            if (typeof showToast === "function") {
                showToast("info", "Auto-saved", "Progress is saved automatically");
            }
            return;
        }

        // ----- Ctrl/Cmd+Enter: Run code -----
        if (e.key === "Enter" && e[modKey] && !e.altKey) {
            e.preventDefault();
            // Find the visible run button
            var activeView = $(".view.active");
            if (activeView) {
                var runBtn = activeView.querySelector(".run-btn");
                if (runBtn) runBtn.click();
            }
            return;
        }

        // ----- Ctrl/Cmd+K: Search (documented, just prevent default) -----
        if (e.key === "k" && e[modKey] && !e.altKey) {
            // search.js will handle this; just document it
            // Do not prevent default here so search.js can capture it
            return;
        }

        // ----- All remaining shortcuts should not fire when typing in inputs -----
        if (isInput) return;

        // ----- ? : Show shortcuts help -----
        if (e.key === "?" && !e.altKey && !e[modKey]) {
            e.preventDefault();
            showHelp();
            return;
        }

        // ----- Alt+1 through Alt+6: Switch views -----
        if (e.altKey && !e[modKey] && !e.shiftKey) {
            var num = parseInt(e.key, 10);
            if (num >= 1 && num <= 6) {
                e.preventDefault();
                switchToView(viewKeys[num - 1]);
                return;
            }

            // ----- Alt+Left / Alt+Right: Previous/Next lesson -----
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                var prevBtn = $(".lesson-nav .btn:first-child");
                if (prevBtn) prevBtn.click();
                return;
            }

            if (e.key === "ArrowRight") {
                e.preventDefault();
                var nextBtn = $(".lesson-nav .btn:last-child");
                if (nextBtn) nextBtn.click();
                return;
            }

            // ----- Alt+S: Toggle sidebar -----
            if (e.key === "s" || e.key === "S") {
                e.preventDefault();
                var sidebarToggleBtn = $("#sidebarToggle");
                var menuBtnEl = $("#menuBtn");
                // On mobile use menu button, on desktop use sidebar toggle
                if (window.innerWidth <= 768 && menuBtnEl) {
                    menuBtnEl.click();
                } else if (sidebarToggleBtn) {
                    sidebarToggleBtn.click();
                }
                return;
            }

            // ----- Alt+T: Open settings -----
            if (e.key === "t" || e.key === "T") {
                e.preventDefault();
                var settingsBtn = $("#settingsBtn");
                if (settingsBtn) settingsBtn.click();
                return;
            }
        }
    }

    // -------------------------------------------------------------------------
    // Accessibility: ARIA Attributes
    // -------------------------------------------------------------------------
    function applyAria() {
        // role="navigation" on sidebar
        var sidebar = $("#sidebar");
        if (sidebar) sidebar.setAttribute("role", "navigation");

        var sidebarNav = $(".sidebar-nav");
        if (sidebarNav) sidebarNav.setAttribute("role", "navigation");

        // role="main" on content
        var mainContent = $(".app-content");
        if (mainContent) mainContent.setAttribute("role", "main");

        // role="banner" on header
        var header = $(".app-header");
        if (header) header.setAttribute("role", "banner");

        // role="dialog" on all modal overlays
        $$(".modal-overlay").forEach(function (overlay) {
            overlay.setAttribute("role", "dialog");
            overlay.setAttribute("aria-modal", "true");
        });

        // aria-label on icon-only buttons
        var ariaLabels = {
            "#settingsBtn": "Settings",
            "#notifBtn": "Notifications",
            "#sidebarToggle": "Toggle sidebar",
            "#menuBtn": "Open menu",
            "#outputDockToggle": "Toggle output position",
            "#outputDrawerClose": "Close output panel",
        };

        Object.keys(ariaLabels).forEach(function (sel) {
            var el = $(sel);
            if (el && !el.getAttribute("aria-label")) {
                el.setAttribute("aria-label", ariaLabels[sel]);
            }
        });

        // aria-current="page" on active nav item
        updateAriaCurrent();

        // aria-hidden on decorative SVGs in progress rings
        $$(".sidebar-module-progress svg, .circular-progress svg").forEach(function (svg) {
            svg.setAttribute("aria-hidden", "true");
        });

        // aria-hidden on decorative stat icons
        $$(".sidebar-nav-icon, .dashboard-stat-icon, .streak-flame, .footer-stat-icon").forEach(function (el) {
            el.setAttribute("aria-hidden", "true");
        });

        // Star rating decorative
        $$(".star-rating .star").forEach(function (star) {
            star.setAttribute("aria-hidden", "true");
        });

        // aria-live on toast container
        var toastContainer = $("#toastContainer");
        if (toastContainer) {
            toastContainer.setAttribute("aria-live", "polite");
            toastContainer.setAttribute("aria-relevant", "additions");
        }

        // aria-live on output areas
        var outputBody = $("#outputDrawerBody");
        if (outputBody) {
            outputBody.setAttribute("aria-live", "polite");
        }

        $$(".code-output-body").forEach(function (el) {
            el.setAttribute("aria-live", "polite");
        });

        // Ensure interactive elements are focusable
        $$(".sidebar-nav-item").forEach(function (item) {
            if (!item.getAttribute("tabindex")) {
                item.setAttribute("tabindex", "0");
                item.setAttribute("role", "button");
            }
        });

        $$(".sidebar-module-item").forEach(function (item) {
            if (!item.getAttribute("tabindex")) {
                item.setAttribute("tabindex", "0");
                item.setAttribute("role", "button");
            }
        });

        // Allow Enter/Space on div[role=button] elements
        $$("[role='button']:not(button)").forEach(function (el) {
            if (!el._a11yKeyBound) {
                el._a11yKeyBound = true;
                el.addEventListener("keydown", function (e) {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        el.click();
                    }
                });
            }
        });
    }

    // -------------------------------------------------------------------------
    // Update aria-current on view switches
    // -------------------------------------------------------------------------
    function updateAriaCurrent() {
        $$(".sidebar-nav-item[data-view]").forEach(function (item) {
            if (item.classList.contains("active")) {
                item.setAttribute("aria-current", "page");
            } else {
                item.removeAttribute("aria-current");
            }
        });

        // Also update bottom nav if present
        $$(".bottom-nav-item[data-view]").forEach(function (item) {
            if (item.classList.contains("active")) {
                item.setAttribute("aria-current", "page");
            } else {
                item.removeAttribute("aria-current");
            }
        });
    }

    // Watch for sidebar nav clicks to update aria-current
    function watchNavChanges() {
        $$(".sidebar-nav-item[data-view]").forEach(function (item) {
            item.addEventListener("click", function () {
                setTimeout(updateAriaCurrent, 50);
            });
        });
    }

    // -------------------------------------------------------------------------
    // Bottom Navigation Bar (Mobile) — Wire Interactivity
    // -------------------------------------------------------------------------
    function wireBottomNav() {
        var bottomNav = $(".bottom-nav");
        if (!bottomNav) return;

        var navItems = $$(".bottom-nav-item[data-view]", bottomNav);
        var moreBtn = $(".bottom-nav-item[data-action='more']", bottomNav);
        var moreMenu = $(".bottom-nav-more-menu");
        var moreBackdrop = $(".bottom-nav-more-backdrop");

        // Nav items switch views
        navItems.forEach(function (item) {
            item.addEventListener("click", function () {
                var viewId = item.getAttribute("data-view");
                switchToView(viewId);

                // Update bottom nav active state
                navItems.forEach(function (n) { n.classList.remove("active"); });
                if (moreBtn) moreBtn.classList.remove("active");
                item.classList.add("active");

                // Close more menu if open
                if (moreMenu) moreMenu.classList.remove("open");
                if (moreBackdrop) moreBackdrop.classList.remove("open");
            });
        });

        // "More" button
        if (moreBtn) {
            moreBtn.addEventListener("click", function () {
                if (moreMenu) moreMenu.classList.toggle("open");
                if (moreBackdrop) moreBackdrop.classList.toggle("open");
            });
        }

        // Backdrop closes more menu
        if (moreBackdrop) {
            moreBackdrop.addEventListener("click", function () {
                if (moreMenu) moreMenu.classList.remove("open");
                moreBackdrop.classList.remove("open");
            });
        }

        // More menu items
        if (moreMenu) {
            $$(".bottom-nav-more-item[data-view]", moreMenu).forEach(function (item) {
                item.addEventListener("click", function () {
                    var viewId = item.getAttribute("data-view");
                    switchToView(viewId);

                    // Update active states
                    navItems.forEach(function (n) { n.classList.remove("active"); });
                    if (moreBtn) {
                        moreBtn.classList.add("active");
                    }
                    $$(".bottom-nav-more-item", moreMenu).forEach(function (m) { m.classList.remove("active"); });
                    item.classList.add("active");

                    // Close menu
                    moreMenu.classList.remove("open");
                    if (moreBackdrop) moreBackdrop.classList.remove("open");
                });
            });
        }

        // Keep bottom nav in sync when sidebar nav is used
        $$(".sidebar-nav-item[data-view]").forEach(function (sideItem) {
            sideItem.addEventListener("click", function () {
                var viewId = sideItem.getAttribute("data-view");
                syncBottomNav(viewId);
            });
        });
    }

    function syncBottomNav(viewId) {
        var bottomNav = $(".bottom-nav");
        if (!bottomNav) return;

        var navItems = $$(".bottom-nav-item[data-view]", bottomNav);
        var moreBtn = $(".bottom-nav-item[data-action='more']", bottomNav);
        var moreMenuItems = $$(".bottom-nav-more-item[data-view]");
        var moreViews = ["projects", "examples", "progress"];

        // Clear all active
        navItems.forEach(function (n) { n.classList.remove("active"); });
        if (moreBtn) moreBtn.classList.remove("active");
        moreMenuItems.forEach(function (m) { m.classList.remove("active"); });

        // Check if it's a "more" view
        if (moreViews.indexOf(viewId) !== -1) {
            if (moreBtn) moreBtn.classList.add("active");
            moreMenuItems.forEach(function (m) {
                if (m.getAttribute("data-view") === viewId) m.classList.add("active");
            });
        } else {
            // Highlight the matching bottom nav item
            navItems.forEach(function (n) {
                if (n.getAttribute("data-view") === viewId) n.classList.add("active");
            });
        }
    }

    // -------------------------------------------------------------------------
    // Init
    // -------------------------------------------------------------------------
    function init() {
        if (initialized) return;
        initialized = true;

        // Keyboard shortcuts
        document.addEventListener("keydown", onKeyDown);

        // ARIA attributes
        applyAria();

        // Watch nav changes for aria-current
        watchNavChanges();

        // Focus traps for existing modals
        setupModalFocusTraps();

        // Wire bottom navigation
        wireBottomNav();

        // Re-apply ARIA when DOM changes (for dynamically built sidebar modules)
        var observer = new MutationObserver(function () {
            applyAria();
        });
        var sidebarNav = $(".sidebar-nav");
        if (sidebarNav) {
            observer.observe(sidebarNav, { childList: true, subtree: true });
        }
    }

    // -------------------------------------------------------------------------
    // Expose API
    // -------------------------------------------------------------------------
    window.Shortcuts = {
        init: init,
        showHelp: showHelp,
        updateAriaCurrent: updateAriaCurrent,
    };

    // Auto-init when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();
