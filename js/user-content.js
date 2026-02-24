// =============================================================================
// user-content.js — Bookmarks, Notes, and Code Snippets for PyLearn
// =============================================================================
// Self-contained IIFE that exposes window.UserContent with APIs for managing
// user-generated content: bookmarks/favorites, per-lesson notes, and a code
// snippets library.  All data persists in localStorage with pylearn_ prefix.
// =============================================================================

(function () {
    "use strict";

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------
    function escapeHTML(s) {
        if (!s) return "";
        var div = document.createElement("div");
        div.textContent = s;
        return div.innerHTML;
    }

    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
    }

    function formatDate(ts) {
        var d = new Date(ts);
        var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    }

    function debounce(fn, ms) {
        var timer;
        return function () {
            var ctx = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () { fn.apply(ctx, args); }, ms);
        };
    }

    // =========================================================================
    //  1. BOOKMARKS / FAVORITES
    // =========================================================================
    var BOOKMARKS_KEY = "pylearn_bookmarks";

    function loadBookmarks() {
        try { return JSON.parse(localStorage.getItem(BOOKMARKS_KEY)) || []; }
        catch (e) { return []; }
    }

    function saveBookmarks(arr) {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(arr));
    }

    /**
     * Toggle a bookmark on/off.
     * @param {string} type  - "lesson" | "challenge" | "example" | "project"
     * @param {string|number} id - unique identifier for the item
     * @param {string} title - display title
     * @param {string|number} [moduleId] - optional module context
     * @returns {boolean} true if bookmarked, false if removed
     */
    function toggleBookmark(type, id, title, moduleId) {
        var bookmarks = loadBookmarks();
        var idx = bookmarks.findIndex(function (b) {
            return b.type === type && String(b.id) === String(id);
        });
        if (idx !== -1) {
            bookmarks.splice(idx, 1);
            saveBookmarks(bookmarks);
            if (typeof showToast === "function") {
                showToast("info", "Bookmark Removed", title + " removed from bookmarks");
            }
            return false;
        }
        bookmarks.push({
            type: type,
            id: id,
            title: title,
            moduleId: moduleId || null,
            timestamp: Date.now()
        });
        saveBookmarks(bookmarks);
        if (typeof showToast === "function") {
            showToast("success", "Bookmarked", title + " added to bookmarks");
        }
        return true;
    }

    function isBookmarked(type, id) {
        return loadBookmarks().some(function (b) {
            return b.type === type && String(b.id) === String(id);
        });
    }

    function getBookmarks() {
        return loadBookmarks();
    }

    function removeBookmark(type, id) {
        var bookmarks = loadBookmarks();
        var filtered = bookmarks.filter(function (b) {
            return !(b.type === type && String(b.id) === String(id));
        });
        saveBookmarks(filtered);
    }

    // =========================================================================
    //  2. PER-LESSON NOTES
    // =========================================================================

    function noteKey(moduleId, lessonIndex) {
        return "pylearn_notes_" + moduleId + "_" + lessonIndex;
    }

    function getNote(moduleId, lessonIndex) {
        return localStorage.getItem(noteKey(moduleId, lessonIndex)) || "";
    }

    function saveNote(moduleId, lessonIndex, text) {
        var key = noteKey(moduleId, lessonIndex);
        if (text && text.trim()) {
            localStorage.setItem(key, text);
        } else {
            localStorage.removeItem(key);
        }
    }

    function getAllNotes() {
        var notes = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key && key.indexOf("pylearn_notes_") === 0) {
                var parts = key.replace("pylearn_notes_", "").split("_");
                var modId = parseInt(parts[0], 10);
                var lessonIdx = parseInt(parts[1], 10);
                var text = localStorage.getItem(key);
                if (text && text.trim()) {
                    // Try to resolve lesson title from globals
                    var lessonTitle = "";
                    var moduleTitle = "";
                    if (typeof CURRICULUM !== "undefined" && CURRICULUM.modules) {
                        var mod = CURRICULUM.modules.find(function (m) { return m.id === modId; });
                        if (mod) {
                            moduleTitle = mod.title || "";
                            if (mod.lessons && mod.lessons[lessonIdx]) {
                                lessonTitle = mod.lessons[lessonIdx].title || "";
                            }
                        }
                    }
                    notes.push({
                        moduleId: modId,
                        lessonIndex: lessonIdx,
                        moduleTitle: moduleTitle,
                        lessonTitle: lessonTitle,
                        text: text
                    });
                }
            }
        }
        notes.sort(function (a, b) { return a.moduleId - b.moduleId || a.lessonIndex - b.lessonIndex; });
        return notes;
    }

    /**
     * Render a notepad textarea into the given container element.
     * Auto-saves with 500ms debounce.
     * @param {string} containerId - DOM id of the container
     * @param {number} moduleId
     * @param {number} lessonIndex
     */
    function renderNotepad(containerId, moduleId, lessonIndex) {
        var container = document.getElementById(containerId);
        if (!container) return;

        var existing = getNote(moduleId, lessonIndex);

        container.innerHTML =
            '<div class="uc-notepad">' +
                '<div class="uc-notepad-header">' +
                    '<span class="uc-notepad-icon">&#128221;</span>' +
                    '<span class="uc-notepad-title">My Notes</span>' +
                    '<span class="uc-notepad-status" id="uc-note-status"></span>' +
                '</div>' +
                '<textarea class="uc-notepad-textarea" id="uc-notepad-input" placeholder="Type your notes for this lesson here..." spellcheck="true">' +
                    escapeHTML(existing) +
                '</textarea>' +
            '</div>';

        var textarea = document.getElementById("uc-notepad-input");
        var status = document.getElementById("uc-note-status");

        if (!textarea) return;

        var debouncedSave = debounce(function () {
            saveNote(moduleId, lessonIndex, textarea.value);
            if (status) {
                status.textContent = "Saved";
                status.style.color = "var(--success)";
                setTimeout(function () { status.textContent = ""; }, 2000);
            }
        }, 500);

        textarea.addEventListener("input", function () {
            if (status) {
                status.textContent = "Typing...";
                status.style.color = "var(--text-muted)";
            }
            debouncedSave();
        });
    }

    // =========================================================================
    //  3. CODE SNIPPETS LIBRARY
    // =========================================================================
    var SNIPPETS_KEY = "pylearn_snippets";

    function loadSnippets() {
        try { return JSON.parse(localStorage.getItem(SNIPPETS_KEY)) || []; }
        catch (e) { return []; }
    }

    function saveSnippetsStore(arr) {
        localStorage.setItem(SNIPPETS_KEY, JSON.stringify(arr));
    }

    function saveSnippet(title, code, tag) {
        var snippets = loadSnippets();
        var snippet = {
            id: generateId(),
            title: title || "Untitled Snippet",
            code: code || "",
            tag: tag || "",
            timestamp: Date.now()
        };
        snippets.unshift(snippet);
        saveSnippetsStore(snippets);
        if (typeof showToast === "function") {
            showToast("success", "Snippet Saved", '"' + snippet.title + '" saved to your library');
        }
        return snippet;
    }

    function deleteSnippet(id) {
        var snippets = loadSnippets();
        var filtered = snippets.filter(function (s) { return s.id !== id; });
        saveSnippetsStore(filtered);
        if (typeof showToast === "function") {
            showToast("info", "Snippet Deleted", "Snippet removed from your library");
        }
    }

    function getSnippets(filterTag) {
        var snippets = loadSnippets();
        if (filterTag) {
            var lower = filterTag.toLowerCase();
            return snippets.filter(function (s) {
                return s.tag && s.tag.toLowerCase() === lower;
            });
        }
        return snippets;
    }

    // =========================================================================
    //  4. RENDER — SNIPPETS PANEL (returns HTML string)
    // =========================================================================
    function renderSnippetsPanel() {
        var snippets = loadSnippets();
        var tags = [];
        var tagMap = {};
        snippets.forEach(function (s) {
            if (s.tag && !tagMap[s.tag]) {
                tagMap[s.tag] = true;
                tags.push(s.tag);
            }
        });

        var html =
            '<div class="uc-snippets-panel">' +
                '<div class="uc-section-header">' +
                    '<h3><span class="uc-section-icon">&#128196;</span> Code Snippets</h3>' +
                    '<button class="btn btn-sm btn-primary" id="uc-add-snippet-btn">+ New Snippet</button>' +
                '</div>';

        // Tag filter pills
        if (tags.length > 0) {
            html += '<div class="pills uc-snippet-filters" id="uc-snippet-filters">' +
                '<button class="pill-item active" data-tag="">All</button>';
            tags.forEach(function (t) {
                html += '<button class="pill-item" data-tag="' + escapeHTML(t) + '">' + escapeHTML(t) + '</button>';
            });
            html += '</div>';
        }

        // Snippet cards
        if (snippets.length === 0) {
            html += '<div class="uc-empty-state">' +
                '<div class="uc-empty-icon">&#128196;</div>' +
                '<p>No snippets saved yet.</p>' +
                '<p class="text-sm text-muted">Save code snippets from lessons and examples to build your personal library.</p>' +
            '</div>';
        } else {
            html += '<div class="uc-snippets-list" id="uc-snippets-list">';
            snippets.forEach(function (s) {
                html +=
                    '<div class="uc-snippet-card" data-snippet-id="' + s.id + '" data-tag="' + escapeHTML(s.tag || "") + '">' +
                        '<div class="uc-snippet-card-header">' +
                            '<span class="uc-snippet-title">' + escapeHTML(s.title) + '</span>' +
                            '<div class="uc-snippet-actions">' +
                                '<button class="btn-icon uc-snippet-copy" data-snippet-id="' + s.id + '" title="Copy code">&#128203;</button>' +
                                '<button class="btn-icon uc-snippet-delete" data-snippet-id="' + s.id + '" title="Delete snippet">&#128465;</button>' +
                            '</div>' +
                        '</div>' +
                        (s.tag ? '<span class="chip uc-snippet-tag">' + escapeHTML(s.tag) + '</span>' : '') +
                        '<pre class="uc-snippet-code"><code>' + escapeHTML(s.code) + '</code></pre>' +
                        '<div class="uc-snippet-meta">' + formatDate(s.timestamp) + '</div>' +
                    '</div>';
            });
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    // =========================================================================
    //  5. RENDER — COMBINED BOOKMARKS & SNIPPETS VIEW (returns HTML string)
    // =========================================================================
    function renderBookmarksView() {
        var bookmarks = loadBookmarks();
        var html = '<div class="uc-bookmarks-view">';

        // --- Bookmarks section ---
        html +=
            '<div class="uc-section-header">' +
                '<h3><span class="uc-section-icon">&#11088;</span> Bookmarks</h3>' +
                '<span class="badge">' + bookmarks.length + ' item' + (bookmarks.length !== 1 ? 's' : '') + '</span>' +
            '</div>';

        // Type filter pills
        html += '<div class="pills uc-bookmark-filters" id="uc-bookmark-filters">' +
            '<button class="pill-item active" data-type="">All</button>' +
            '<button class="pill-item" data-type="lesson">Lessons</button>' +
            '<button class="pill-item" data-type="challenge">Challenges</button>' +
            '<button class="pill-item" data-type="example">Examples</button>' +
            '<button class="pill-item" data-type="project">Projects</button>' +
        '</div>';

        if (bookmarks.length === 0) {
            html += '<div class="uc-empty-state">' +
                '<div class="uc-empty-icon">&#11088;</div>' +
                '<p>No bookmarks yet.</p>' +
                '<p class="text-sm text-muted">Bookmark lessons, challenges, examples, and projects to quickly find them later.</p>' +
            '</div>';
        } else {
            html += '<div class="uc-bookmarks-list" id="uc-bookmarks-list">';
            var typeIcons = { lesson: "&#128218;", challenge: "&#9889;", example: "&#128196;", project: "&#128187;" };
            var typeColors = { lesson: "var(--accent-primary)", challenge: "var(--warning)", example: "var(--success)", project: "var(--accent-secondary)" };

            bookmarks.sort(function (a, b) { return b.timestamp - a.timestamp; });

            bookmarks.forEach(function (b) {
                html +=
                    '<div class="uc-bookmark-item" data-bk-type="' + b.type + '" data-bk-id="' + b.id + '">' +
                        '<div class="uc-bookmark-icon" style="color:' + (typeColors[b.type] || "var(--text-secondary)") + '">' + (typeIcons[b.type] || "&#11088;") + '</div>' +
                        '<div class="uc-bookmark-info">' +
                            '<div class="uc-bookmark-title">' + escapeHTML(b.title) + '</div>' +
                            '<div class="uc-bookmark-meta">' +
                                '<span class="chip uc-type-chip">' + escapeHTML(b.type) + '</span>' +
                                (b.moduleId ? ' <span class="text-muted text-sm">Module ' + b.moduleId + '</span>' : '') +
                                ' <span class="text-muted text-sm">' + formatDate(b.timestamp) + '</span>' +
                            '</div>' +
                        '</div>' +
                        '<button class="btn-icon uc-bookmark-remove" data-bk-type="' + b.type + '" data-bk-id="' + b.id + '" title="Remove bookmark">&#10005;</button>' +
                    '</div>';
            });
            html += '</div>';
        }

        // --- Notes summary section ---
        var allNotes = getAllNotes();
        if (allNotes.length > 0) {
            html +=
                '<div class="uc-section-header" style="margin-top:32px;">' +
                    '<h3><span class="uc-section-icon">&#128221;</span> My Notes</h3>' +
                    '<span class="badge">' + allNotes.length + ' note' + (allNotes.length !== 1 ? 's' : '') + '</span>' +
                '</div>';
            html += '<div class="uc-notes-list">';
            allNotes.forEach(function (n) {
                var preview = n.text.length > 120 ? n.text.substring(0, 120) + "..." : n.text;
                html +=
                    '<div class="uc-note-item" data-mod="' + n.moduleId + '" data-lesson="' + n.lessonIndex + '">' +
                        '<div class="uc-note-item-header">' +
                            '<span class="uc-note-item-title">' + escapeHTML(n.lessonTitle || ("Lesson " + (n.lessonIndex + 1))) + '</span>' +
                            '<span class="text-muted text-sm">' + escapeHTML(n.moduleTitle || ("Module " + n.moduleId)) + '</span>' +
                        '</div>' +
                        '<p class="uc-note-item-preview">' + escapeHTML(preview) + '</p>' +
                    '</div>';
            });
            html += '</div>';
        }

        // --- Snippets section ---
        html += '<div style="margin-top:32px;">' + renderSnippetsPanel() + '</div>';

        html += '</div>';
        return html;
    }

    // =========================================================================
    //  6. INJECT VIEW INTO DOM & WIRE EVENTS
    // =========================================================================
    function injectView() {
        // Create the view section if it doesn't exist
        var existing = document.getElementById("viewUserContent");
        if (existing) existing.remove();

        var section = document.createElement("section");
        section.className = "view view-user-content";
        section.id = "viewUserContent";
        section.innerHTML = renderBookmarksView();

        var appContent = document.getElementById("appContent");
        if (appContent) appContent.appendChild(section);

        wireViewEvents(section);
    }

    function wireViewEvents(section) {
        if (!section) return;

        // --- Bookmark filter pills ---
        var filterPills = section.querySelectorAll("#uc-bookmark-filters .pill-item");
        filterPills.forEach(function (pill) {
            pill.addEventListener("click", function () {
                filterPills.forEach(function (p) { p.classList.remove("active"); });
                pill.classList.add("active");
                var filterType = pill.getAttribute("data-type");
                var items = section.querySelectorAll(".uc-bookmark-item");
                items.forEach(function (item) {
                    item.style.display = (!filterType || item.getAttribute("data-bk-type") === filterType) ? "" : "none";
                });
            });
        });

        // --- Bookmark remove buttons ---
        section.querySelectorAll(".uc-bookmark-remove").forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                var type = btn.getAttribute("data-bk-type");
                var id = btn.getAttribute("data-bk-id");
                removeBookmark(type, id);
                refreshView();
            });
        });

        // --- Bookmark item click -> navigate ---
        section.querySelectorAll(".uc-bookmark-item").forEach(function (item) {
            item.style.cursor = "pointer";
            item.addEventListener("click", function () {
                var type = item.getAttribute("data-bk-type");
                navigateToView(type);
            });
        });

        // --- Note item click -> navigate to lesson ---
        section.querySelectorAll(".uc-note-item").forEach(function (item) {
            item.style.cursor = "pointer";
            item.addEventListener("click", function () {
                navigateToView("lesson");
            });
        });

        // --- Snippet filter pills ---
        var snippetFilters = section.querySelectorAll("#uc-snippet-filters .pill-item");
        snippetFilters.forEach(function (pill) {
            pill.addEventListener("click", function () {
                snippetFilters.forEach(function (p) { p.classList.remove("active"); });
                pill.classList.add("active");
                var tag = pill.getAttribute("data-tag");
                var cards = section.querySelectorAll(".uc-snippet-card");
                cards.forEach(function (card) {
                    card.style.display = (!tag || card.getAttribute("data-tag") === tag) ? "" : "none";
                });
            });
        });

        // --- Snippet copy buttons ---
        section.querySelectorAll(".uc-snippet-copy").forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                var sid = btn.getAttribute("data-snippet-id");
                var snippets = loadSnippets();
                var s = snippets.find(function (x) { return x.id === sid; });
                if (s && navigator.clipboard) {
                    navigator.clipboard.writeText(s.code).then(function () {
                        if (typeof showToast === "function") showToast("success", "Copied", "Code copied to clipboard");
                    });
                }
            });
        });

        // --- Snippet delete buttons ---
        section.querySelectorAll(".uc-snippet-delete").forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                var sid = btn.getAttribute("data-snippet-id");
                deleteSnippet(sid);
                refreshView();
            });
        });

        // --- Add snippet button -> open modal ---
        var addBtn = section.querySelector("#uc-add-snippet-btn");
        if (addBtn) {
            addBtn.addEventListener("click", function () {
                openSnippetModal();
            });
        }
    }

    function navigateToView(viewName) {
        // Map bookmark types to sidebar view names
        var map = { lesson: "lesson", challenge: "challenge", example: "examples", project: "projects" };
        var target = map[viewName] || viewName;
        var navItem = document.querySelector('.sidebar-nav-item[data-view="' + target + '"]');
        if (navItem) navItem.click();
    }

    function refreshView() {
        var section = document.getElementById("viewUserContent");
        if (section) {
            section.innerHTML = renderBookmarksView();
            wireViewEvents(section);
        }
    }

    // =========================================================================
    //  7. SNIPPET SAVE MODAL
    // =========================================================================
    function openSnippetModal(prefillCode, prefillTitle) {
        // Remove existing modal if any
        var old = document.getElementById("uc-snippet-modal-overlay");
        if (old) old.remove();

        var overlay = document.createElement("div");
        overlay.className = "modal-overlay active";
        overlay.id = "uc-snippet-modal-overlay";
        overlay.innerHTML =
            '<div class="modal">' +
                '<div class="modal-header">' +
                    '<h3 class="modal-title">Save Code Snippet</h3>' +
                    '<button class="modal-close" id="uc-snippet-modal-close">&times;</button>' +
                '</div>' +
                '<div class="modal-body">' +
                    '<div style="margin-bottom:12px;">' +
                        '<label style="font-weight:600;display:block;margin-bottom:4px;color:var(--text-primary);">Title</label>' +
                        '<input type="text" class="form-input" id="uc-snippet-title" placeholder="e.g. List Comprehension Example" value="' + escapeHTML(prefillTitle || "") + '" style="width:100%;">' +
                    '</div>' +
                    '<div style="margin-bottom:12px;">' +
                        '<label style="font-weight:600;display:block;margin-bottom:4px;color:var(--text-primary);">Tag (optional)</label>' +
                        '<input type="text" class="form-input" id="uc-snippet-tag" placeholder="e.g. loops, functions, strings" style="width:100%;">' +
                    '</div>' +
                    '<div>' +
                        '<label style="font-weight:600;display:block;margin-bottom:4px;color:var(--text-primary);">Code</label>' +
                        '<textarea class="form-input" id="uc-snippet-code" rows="8" placeholder="Paste or type your code here..." style="width:100%;font-family:\'JetBrains Mono\',monospace;font-size:0.85rem;background:var(--code-bg);color:var(--code-text);resize:vertical;">' + escapeHTML(prefillCode || "") + '</textarea>' +
                    '</div>' +
                '</div>' +
                '<div class="modal-footer">' +
                    '<button class="btn btn-secondary" id="uc-snippet-modal-cancel">Cancel</button>' +
                    '<button class="btn btn-primary" id="uc-snippet-modal-save">Save Snippet</button>' +
                '</div>' +
            '</div>';

        document.body.appendChild(overlay);

        // Wire modal events
        var closeModal = function () { overlay.remove(); };
        overlay.querySelector("#uc-snippet-modal-close").addEventListener("click", closeModal);
        overlay.querySelector("#uc-snippet-modal-cancel").addEventListener("click", closeModal);
        overlay.addEventListener("click", function (e) { if (e.target === overlay) closeModal(); });

        overlay.querySelector("#uc-snippet-modal-save").addEventListener("click", function () {
            var title = document.getElementById("uc-snippet-title").value.trim();
            var tag = document.getElementById("uc-snippet-tag").value.trim();
            var code = document.getElementById("uc-snippet-code").value;
            if (!code.trim()) {
                if (typeof showToast === "function") showToast("warning", "Missing Code", "Please enter some code to save.");
                return;
            }
            saveSnippet(title || "Untitled Snippet", code, tag);
            closeModal();
            refreshView();
        });

        // Auto-focus title
        setTimeout(function () {
            var input = document.getElementById("uc-snippet-title");
            if (input) input.focus();
        }, 100);
    }

    // =========================================================================
    //  8. BOOKMARK TOGGLE BUTTON (returns HTML string)
    // =========================================================================
    /**
     * Returns an HTML string for a bookmark toggle button.
     * @param {string} type
     * @param {string|number} id
     * @param {string} title
     * @param {string|number} [moduleId]
     * @returns {string} HTML
     */
    function renderBookmarkButton(type, id, title, moduleId) {
        var active = isBookmarked(type, id);
        return '<button class="uc-bookmark-btn' + (active ? ' active' : '') + '" ' +
            'data-uc-type="' + escapeHTML(type) + '" ' +
            'data-uc-id="' + escapeHTML(String(id)) + '" ' +
            'data-uc-title="' + escapeHTML(title) + '" ' +
            (moduleId ? 'data-uc-module="' + escapeHTML(String(moduleId)) + '" ' : '') +
            'title="' + (active ? 'Remove bookmark' : 'Add bookmark') + '">' +
            (active ? '&#9733;' : '&#9734;') +
        '</button>';
    }

    /**
     * Returns an HTML string for a "Save as Snippet" button for code areas.
     * @param {string} [contextTitle] - pre-fill title for the snippet
     * @returns {string} HTML
     */
    function renderSaveSnippetButton(contextTitle) {
        return '<button class="btn btn-sm btn-secondary uc-save-snippet-btn" ' +
            'data-uc-snippet-title="' + escapeHTML(contextTitle || "") + '" ' +
            'title="Save as Snippet" style="font-size:0.7rem;">' +
            '&#128190; Save Snippet</button>';
    }

    // =========================================================================
    //  9. GLOBAL EVENT DELEGATION
    // =========================================================================
    // Handle bookmark toggle clicks anywhere in the page
    document.addEventListener("click", function (e) {
        var btn = e.target.closest(".uc-bookmark-btn");
        if (btn) {
            e.preventDefault();
            e.stopPropagation();
            var type = btn.getAttribute("data-uc-type");
            var id = btn.getAttribute("data-uc-id");
            var title = btn.getAttribute("data-uc-title");
            var moduleId = btn.getAttribute("data-uc-module") || null;
            var nowBookmarked = toggleBookmark(type, id, title, moduleId);
            btn.classList.toggle("active", nowBookmarked);
            btn.innerHTML = nowBookmarked ? "&#9733;" : "&#9734;";
            btn.title = nowBookmarked ? "Remove bookmark" : "Add bookmark";
            // Refresh the user content view if it's visible
            var ucView = document.getElementById("viewUserContent");
            if (ucView && ucView.classList.contains("active")) {
                refreshView();
            }
        }
    });

    // Handle "Save as Snippet" clicks anywhere
    document.addEventListener("click", function (e) {
        var btn = e.target.closest(".uc-save-snippet-btn");
        if (btn) {
            e.preventDefault();
            e.stopPropagation();
            var contextTitle = btn.getAttribute("data-uc-snippet-title") || "";
            // Try to find nearby code block content
            var codeBlock = btn.closest(".code-block");
            var code = "";
            if (codeBlock) {
                var codeEl = codeBlock.querySelector("code");
                if (codeEl) code = codeEl.textContent;
            }
            // If no code block, try a nearby textarea
            if (!code) {
                var wrapper = btn.closest(".code-editor-wrapper");
                if (wrapper) {
                    var editor = wrapper.querySelector(".code-content, textarea");
                    if (editor) code = editor.textContent || editor.value || "";
                }
            }
            openSnippetModal(code, contextTitle);
        }
    });

    // =========================================================================
    //  10. SIDEBAR NAV ITEM INJECTION
    // =========================================================================
    function injectSidebarNav() {
        // Find the sidebar nav and add a "My Content" nav item after "Progress"
        var progressNav = document.querySelector('.sidebar-nav-item[data-view="progress"]');
        if (!progressNav) return;

        // Check if already injected
        if (document.querySelector('.sidebar-nav-item[data-view="user-content"]')) return;

        var navItem = document.createElement("div");
        navItem.className = "sidebar-nav-item";
        navItem.setAttribute("data-view", "user-content");
        navItem.innerHTML =
            '<span class="sidebar-nav-icon">&#11088;</span>' +
            '<span class="sidebar-nav-label">My Content</span>';

        progressNav.insertAdjacentElement("afterend", navItem);

        // Wire the click handler
        navItem.addEventListener("click", function () {
            // Deactivate all nav items
            document.querySelectorAll(".sidebar-nav-item[data-view]").forEach(function (n) {
                n.classList.remove("active");
            });
            navItem.classList.add("active");

            // Hide all views, show ours
            document.querySelectorAll(".view").forEach(function (v) {
                v.classList.remove("active");
            });

            // Rebuild the view content each time
            injectView();
            var ucView = document.getElementById("viewUserContent");
            if (ucView) ucView.classList.add("active");

            // Update breadcrumb
            var bc = document.getElementById("breadcrumbCurrent");
            if (bc) bc.textContent = "My Content";

            // Close mobile sidebar
            var sidebar = document.getElementById("sidebar");
            var sidebarOverlay = document.getElementById("sidebarOverlay");
            if (sidebar) sidebar.classList.remove("open");
            if (sidebarOverlay) sidebarOverlay.classList.remove("active");
        });
    }

    // =========================================================================
    //  11. INITIALIZATION
    // =========================================================================
    function init() {
        injectSidebarNav();
        injectView();
    }

    // Run init when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    // =========================================================================
    //  PUBLIC API
    // =========================================================================
    window.UserContent = {
        // Bookmarks
        toggleBookmark: toggleBookmark,
        isBookmarked: isBookmarked,
        getBookmarks: getBookmarks,

        // Notes
        renderNotepad: renderNotepad,
        getNote: getNote,
        getAllNotes: getAllNotes,

        // Snippets
        saveSnippet: saveSnippet,
        deleteSnippet: deleteSnippet,
        getSnippets: getSnippets,
        renderSnippetsPanel: renderSnippetsPanel,

        // UI helpers
        renderBookmarkButton: renderBookmarkButton,
        renderSaveSnippetButton: renderSaveSnippetButton,
        openSnippetModal: openSnippetModal,

        // View
        refreshView: refreshView
    };

})();
