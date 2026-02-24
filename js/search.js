// =============================================================================
// search.js — Full-text search overlay for PyLearn
// =============================================================================
// Self-contained IIFE. Exposes window.SearchSystem with open(), close(), init().
// =============================================================================

(function () {
    "use strict";

    // -------------------------------------------------------------------------
    // Constants
    // -------------------------------------------------------------------------
    const STORAGE_KEY = "pylearn_recent_searches";
    const MAX_RECENT = 5;
    const DEBOUNCE_MS = 200;
    const SNIPPET_RADIUS = 40; // characters around match for context snippet

    // -------------------------------------------------------------------------
    // Data references (resolved at init time)
    // -------------------------------------------------------------------------
    let curriculum, challenges, codeExamples, allProjects;

    // -------------------------------------------------------------------------
    // State
    // -------------------------------------------------------------------------
    let overlay = null;
    let input = null;
    let resultsContainer = null;
    let countEl = null;
    let recentContainer = null;
    let debounceTimer = null;
    let selectedIndex = -1;
    let flatResults = []; // all result elements in DOM order for keyboard nav
    let isOpen = false;

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------
    function stripHTML(html) {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function escapeHTML(s) {
        if (!s) return "";
        return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    function highlight(text, term) {
        if (!term) return escapeHTML(text);
        const regex = new RegExp("(" + escapeRegex(term) + ")", "gi");
        return escapeHTML(text).replace(
            new RegExp("(" + escapeRegex(escapeHTML(term)) + ")", "gi"),
            '<mark class="search-highlight">$1</mark>'
        );
    }

    function buildSnippet(text, term) {
        if (!term || !text) return "";
        const lower = text.toLowerCase();
        const idx = lower.indexOf(term.toLowerCase());
        if (idx === -1) return "";
        const start = Math.max(0, idx - SNIPPET_RADIUS);
        const end = Math.min(text.length, idx + term.length + SNIPPET_RADIUS);
        let snippet = "";
        if (start > 0) snippet += "...";
        snippet += text.slice(start, end);
        if (end < text.length) snippet += "...";
        return highlight(snippet, term);
    }

    function getModuleTitle(moduleId) {
        if (!curriculum || !curriculum.modules) return "";
        const mod = curriculum.modules.find(function (m) { return m.id === moduleId; });
        return mod ? "Module " + mod.id + ": " + mod.title : "";
    }

    // -------------------------------------------------------------------------
    // Recent searches (localStorage)
    // -------------------------------------------------------------------------
    function getRecent() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (_) {
            return [];
        }
    }

    function addRecent(term) {
        if (!term || !term.trim()) return;
        let list = getRecent().filter(function (s) { return s !== term; });
        list.unshift(term);
        if (list.length > MAX_RECENT) list = list.slice(0, MAX_RECENT);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    function renderRecent() {
        if (!recentContainer) return;
        const list = getRecent();
        if (list.length === 0) {
            recentContainer.innerHTML = '<div class="search-recent-empty">No recent searches</div>';
            return;
        }
        let html = '<div class="search-recent-header">Recent Searches</div>';
        for (var i = 0; i < list.length; i++) {
            html += '<div class="search-recent-item" data-query="' + escapeHTML(list[i]) + '">' +
                '<span class="search-recent-icon">&#128339;</span>' +
                '<span>' + escapeHTML(list[i]) + '</span>' +
                '</div>';
        }
        recentContainer.innerHTML = html;

        var items = recentContainer.querySelectorAll(".search-recent-item");
        for (var j = 0; j < items.length; j++) {
            items[j].addEventListener("click", function () {
                var q = this.getAttribute("data-query");
                input.value = q;
                performSearch(q);
            });
        }
    }

    // -------------------------------------------------------------------------
    // Search engine
    // -------------------------------------------------------------------------
    function search(term) {
        var results = { lessons: [], challenges: [], examples: [], projects: [] };
        if (!term || term.trim().length === 0) return results;

        var lowerTerm = term.toLowerCase();

        // --- Lessons ---
        if (curriculum && curriculum.modules) {
            for (var mi = 0; mi < curriculum.modules.length; mi++) {
                var mod = curriculum.modules[mi];
                if (!mod.lessons) continue;
                for (var li = 0; li < mod.lessons.length; li++) {
                    var lesson = mod.lessons[li];
                    var titleMatch = lesson.title.toLowerCase().indexOf(lowerTerm) !== -1;
                    var plainContent = stripHTML(lesson.content || "");
                    var contentMatch = plainContent.toLowerCase().indexOf(lowerTerm) !== -1;
                    if (titleMatch || contentMatch) {
                        var snippet = "";
                        if (contentMatch) {
                            snippet = buildSnippet(plainContent, term);
                        } else {
                            snippet = highlight(lesson.title, term);
                        }
                        results.lessons.push({
                            type: "lesson",
                            title: lesson.title,
                            snippet: snippet,
                            moduleTitle: getModuleTitle(mod.id),
                            moduleIndex: mi,
                            lessonIndex: li,
                            titleMatch: titleMatch
                        });
                    }
                }
            }
        }

        // --- Challenges ---
        if (challenges) {
            for (var ci = 0; ci < challenges.length; ci++) {
                var ch = challenges[ci];
                var chTitleMatch = ch.title.toLowerCase().indexOf(lowerTerm) !== -1;
                var chDescMatch = (ch.description || "").toLowerCase().indexOf(lowerTerm) !== -1;
                if (chTitleMatch || chDescMatch) {
                    var chSnippet = "";
                    if (chDescMatch) {
                        chSnippet = buildSnippet(ch.description, term);
                    }
                    results.challenges.push({
                        type: "challenge",
                        title: ch.title,
                        snippet: chSnippet,
                        moduleTitle: ch.moduleId ? getModuleTitle(ch.moduleId) : "",
                        id: ch.id,
                        difficulty: ch.difficulty,
                        titleMatch: chTitleMatch
                    });
                }
            }
        }

        // --- Code Examples ---
        if (codeExamples) {
            for (var ei = 0; ei < codeExamples.length; ei++) {
                var ex = codeExamples[ei];
                var exTitleMatch = ex.title.toLowerCase().indexOf(lowerTerm) !== -1;
                var exDescMatch = (ex.description || "").toLowerCase().indexOf(lowerTerm) !== -1;
                var exCodeMatch = (ex.code || "").toLowerCase().indexOf(lowerTerm) !== -1;
                if (exTitleMatch || exDescMatch || exCodeMatch) {
                    var exSnippet = "";
                    if (exDescMatch) {
                        exSnippet = buildSnippet(ex.description, term);
                    } else if (exCodeMatch) {
                        exSnippet = buildSnippet(ex.code, term);
                    }
                    results.examples.push({
                        type: "example",
                        title: ex.title,
                        snippet: exSnippet,
                        moduleTitle: ex.moduleId ? getModuleTitle(ex.moduleId) : "",
                        id: ex.id,
                        titleMatch: exTitleMatch
                    });
                }
            }
        }

        // --- Projects ---
        if (allProjects) {
            for (var pi = 0; pi < allProjects.length; pi++) {
                var proj = allProjects[pi];
                var pTitleMatch = proj.title.toLowerCase().indexOf(lowerTerm) !== -1;
                var pDescMatch = (proj.description || "").toLowerCase().indexOf(lowerTerm) !== -1;
                if (pTitleMatch || pDescMatch) {
                    var pSnippet = "";
                    if (pDescMatch) {
                        pSnippet = buildSnippet(proj.description, term);
                    }
                    results.projects.push({
                        type: "project",
                        title: proj.title,
                        snippet: pSnippet,
                        id: proj.id,
                        difficulty: proj.difficulty,
                        titleMatch: pTitleMatch
                    });
                }
            }
        }

        return results;
    }

    // -------------------------------------------------------------------------
    // Render results
    // -------------------------------------------------------------------------
    function totalCount(results) {
        return results.lessons.length + results.challenges.length +
               results.examples.length + results.projects.length;
    }

    function renderResults(results, term) {
        flatResults = [];
        selectedIndex = -1;
        var count = totalCount(results);

        if (!term || !term.trim()) {
            resultsContainer.innerHTML = "";
            countEl.textContent = "";
            recentContainer.style.display = "";
            return;
        }

        recentContainer.style.display = "none";

        if (count === 0) {
            resultsContainer.innerHTML =
                '<div class="search-empty">' +
                    '<div class="search-empty-icon">&#128269;</div>' +
                    '<div class="search-empty-title">No results found</div>' +
                    '<div class="search-empty-text">Try a different search term</div>' +
                '</div>';
            countEl.textContent = "0 results";
            return;
        }

        countEl.textContent = count + " result" + (count !== 1 ? "s" : "");

        var html = "";

        var sections = [
            { key: "lessons",    label: "Lessons",    icon: "&#128218;", color: "#6c8cff" },
            { key: "challenges", label: "Challenges", icon: "&#127919;", color: "#f59e0b" },
            { key: "examples",   label: "Examples",   icon: "&#128187;", color: "#10b981" },
            { key: "projects",   label: "Projects",   icon: "&#128640;", color: "#8b5cf6" }
        ];

        for (var si = 0; si < sections.length; si++) {
            var sec = sections[si];
            var items = results[sec.key];
            if (items.length === 0) continue;

            html += '<div class="search-section">';
            html += '<div class="search-section-header">' +
                '<span class="search-section-icon" style="color:' + sec.color + '">' + sec.icon + '</span>' +
                '<span>' + sec.label + '</span>' +
                '<span class="search-section-count">' + items.length + '</span>' +
                '</div>';

            for (var ii = 0; ii < items.length; ii++) {
                var item = items[ii];
                html += '<div class="search-result-item" data-type="' + item.type + '" ' +
                    'data-id="' + escapeHTML(item.id || "") + '" ' +
                    'data-module-index="' + (item.moduleIndex != null ? item.moduleIndex : "") + '" ' +
                    'data-lesson-index="' + (item.lessonIndex != null ? item.lessonIndex : "") + '">';

                html += '<div class="search-result-badge" style="background:' + sec.color + '">' + sec.icon + '</div>';

                html += '<div class="search-result-body">';
                html += '<div class="search-result-title">' + highlight(item.title, term) + '</div>';

                if (item.moduleTitle) {
                    html += '<div class="search-result-module">' + escapeHTML(item.moduleTitle) + '</div>';
                }
                if (item.snippet) {
                    html += '<div class="search-result-snippet">' + item.snippet + '</div>';
                }

                html += '</div>'; // body

                if (item.difficulty) {
                    html += '<div class="search-result-difficulty" data-level="' + item.difficulty + '">' +
                        escapeHTML(item.difficulty) + '</div>';
                }

                html += '</div>'; // item
            }

            html += '</div>'; // section
        }

        resultsContainer.innerHTML = html;

        // Collect flat list for keyboard nav
        flatResults = Array.from(resultsContainer.querySelectorAll(".search-result-item"));

        // Click handlers
        for (var k = 0; k < flatResults.length; k++) {
            flatResults[k].addEventListener("click", onResultClick);
        }
    }

    // -------------------------------------------------------------------------
    // Navigation
    // -------------------------------------------------------------------------
    function navigateToView(viewId) {
        // Find the sidebar nav item and click it to trigger all existing wiring
        var nav = document.querySelector('.sidebar-nav-item[data-view="' + viewId + '"]');
        if (nav) nav.click();
    }

    function onResultClick(e) {
        var el = e.currentTarget;
        var type = el.getAttribute("data-type");
        var id = el.getAttribute("data-id");
        var moduleIndex = el.getAttribute("data-module-index");
        var lessonIndex = el.getAttribute("data-lesson-index");

        // Save search term to recent
        if (input && input.value.trim()) {
            addRecent(input.value.trim());
        }

        closeSearch();

        if (type === "lesson") {
            // Set the module/lesson index then navigate
            if (typeof window._searchSetLesson === "function") {
                window._searchSetLesson(parseInt(moduleIndex, 10), parseInt(lessonIndex, 10));
            } else {
                // Fallback: set localStorage and let the view read it
                localStorage.setItem("pylearn_last_module", moduleIndex);
                localStorage.setItem("pylearn_last_lesson", lessonIndex);
            }
            navigateToView("lesson");

        } else if (type === "challenge") {
            navigateToView("challenge");
            // selectChallenge is called after the view renders
            setTimeout(function () {
                if (typeof window._searchSelectChallenge === "function") {
                    window._searchSelectChallenge(id);
                } else {
                    // Fallback: click the challenge item in the sidebar
                    var item = document.querySelector('.challenge-select-item[data-challenge-id="' + id + '"]');
                    if (item) item.click();
                }
            }, 150);

        } else if (type === "example") {
            navigateToView("examples");
            setTimeout(function () {
                if (typeof window._searchOpenExample === "function") {
                    window._searchOpenExample(id);
                } else {
                    var item = document.querySelector('.example-item[data-example-id="' + id + '"]');
                    if (item) item.click();
                }
            }, 150);

        } else if (type === "project") {
            navigateToView("projects");
            setTimeout(function () {
                if (typeof window._searchOpenProject === "function") {
                    window._searchOpenProject(id);
                } else {
                    var card = document.querySelector('.project-card[data-project-id="' + id + '"]');
                    if (card) card.click();
                }
            }, 150);
        }
    }

    // -------------------------------------------------------------------------
    // Keyboard navigation
    // -------------------------------------------------------------------------
    function updateSelection() {
        for (var i = 0; i < flatResults.length; i++) {
            flatResults[i].classList.toggle("search-result-selected", i === selectedIndex);
        }
        if (selectedIndex >= 0 && flatResults[selectedIndex]) {
            flatResults[selectedIndex].scrollIntoView({ block: "nearest" });
        }
    }

    function onKeyDown(e) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (flatResults.length === 0) return;
            selectedIndex = (selectedIndex + 1) % flatResults.length;
            updateSelection();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (flatResults.length === 0) return;
            selectedIndex = selectedIndex <= 0 ? flatResults.length - 1 : selectedIndex - 1;
            updateSelection();
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (selectedIndex >= 0 && flatResults[selectedIndex]) {
                flatResults[selectedIndex].click();
            }
        } else if (e.key === "Escape") {
            e.preventDefault();
            closeSearch();
        }
    }

    // -------------------------------------------------------------------------
    // Search execution (debounced)
    // -------------------------------------------------------------------------
    function performSearch(term) {
        var results = search(term);
        renderResults(results, term);
    }

    function onInput() {
        clearTimeout(debounceTimer);
        var term = input.value;
        debounceTimer = setTimeout(function () {
            performSearch(term);
        }, DEBOUNCE_MS);
    }

    // -------------------------------------------------------------------------
    // DOM creation
    // -------------------------------------------------------------------------
    function buildOverlay() {
        overlay = document.createElement("div");
        overlay.id = "searchOverlay";
        overlay.className = "search-overlay";
        overlay.innerHTML =
            '<div class="search-modal">' +
                '<div class="search-input-wrap">' +
                    '<span class="search-input-icon">&#128269;</span>' +
                    '<input type="text" class="search-input" placeholder="Search lessons, challenges, examples, projects..." autocomplete="off" spellcheck="false" />' +
                    '<span class="search-count" id="searchCount"></span>' +
                    '<kbd class="search-kbd">Esc</kbd>' +
                '</div>' +
                '<div class="search-recent" id="searchRecent"></div>' +
                '<div class="search-results" id="searchResults"></div>' +
                '<div class="search-footer">' +
                    '<span><kbd>&uarr;</kbd> <kbd>&darr;</kbd> Navigate</span>' +
                    '<span><kbd>Enter</kbd> Open</span>' +
                    '<span><kbd>Esc</kbd> Close</span>' +
                '</div>' +
            '</div>';

        document.body.appendChild(overlay);

        input = overlay.querySelector(".search-input");
        resultsContainer = overlay.querySelector("#searchResults");
        countEl = overlay.querySelector("#searchCount");
        recentContainer = overlay.querySelector("#searchRecent");

        // Events
        input.addEventListener("input", onInput);
        input.addEventListener("keydown", onKeyDown);

        // Close on backdrop click
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) closeSearch();
        });
    }

    // -------------------------------------------------------------------------
    // Open / Close
    // -------------------------------------------------------------------------
    function openSearch() {
        if (isOpen) return;
        if (!overlay) buildOverlay();
        isOpen = true;
        overlay.classList.add("active");
        input.value = "";
        resultsContainer.innerHTML = "";
        countEl.textContent = "";
        recentContainer.style.display = "";
        selectedIndex = -1;
        flatResults = [];
        renderRecent();
        // Focus on next frame so the key that triggered open doesn't land in input
        requestAnimationFrame(function () { input.focus(); });
    }

    function closeSearch() {
        if (!isOpen) return;
        isOpen = false;
        if (overlay) overlay.classList.remove("active");
        clearTimeout(debounceTimer);
    }

    // -------------------------------------------------------------------------
    // Global keyboard shortcut  (Ctrl+K / Cmd+K)
    // -------------------------------------------------------------------------
    function onGlobalKeyDown(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
            e.preventDefault();
            if (isOpen) {
                closeSearch();
            } else {
                openSearch();
            }
        }
    }

    // -------------------------------------------------------------------------
    // Init
    // -------------------------------------------------------------------------
    function init() {
        // Resolve data
        curriculum = (typeof CURRICULUM !== "undefined") ? CURRICULUM : { modules: [] };

        challenges = (typeof CHALLENGES !== "undefined") ? CHALLENGES : [];

        codeExamples = [];
        try { if (typeof CODE_EXAMPLES !== "undefined") codeExamples = CODE_EXAMPLES; } catch (_) {}

        allProjects = [];
        try {
            if (typeof projectsPart1 !== "undefined") allProjects = allProjects.concat(projectsPart1);
        } catch (_) {}
        try {
            if (typeof projectsPart2 !== "undefined") allProjects = allProjects.concat(projectsPart2);
        } catch (_) {}

        // Build DOM
        buildOverlay();

        // Global shortcut
        document.addEventListener("keydown", onGlobalKeyDown);
    }

    // -------------------------------------------------------------------------
    // Expose API
    // -------------------------------------------------------------------------
    window.SearchSystem = {
        init: init,
        open: openSearch,
        close: closeSearch
    };

})();
