// =============================================================================
// editor-enhance.js — Syntax highlighting, auto-indent, and code history
// =============================================================================
// Self-contained IIFE that exposes window.EditorEnhance with init(), refresh(),
// and showHistory(type, id).
// =============================================================================

(function () {
    "use strict";

    // -------------------------------------------------------------------------
    // Constants
    // -------------------------------------------------------------------------
    var TEXTAREA_IDS = ["code-textarea", "project-code-textarea", "example-code-textarea"];
    var MAX_HISTORY = 10;

    // Python keywords and builtins for highlighting
    var KEYWORDS = [
        "def", "class", "if", "elif", "else", "for", "while", "return",
        "import", "from", "as", "try", "except", "finally", "raise", "with",
        "yield", "lambda", "pass", "break", "continue", "and", "or", "not",
        "in", "is", "True", "False", "None"
    ];
    var BUILTINS = [
        "print", "range", "len", "int", "str", "float", "list", "dict",
        "set", "tuple", "input", "type", "open", "super", "self"
    ];

    var KEYWORD_SET = {};
    KEYWORDS.forEach(function (k) { KEYWORD_SET[k] = true; });
    var BUILTIN_SET = {};
    BUILTINS.forEach(function (b) { BUILTIN_SET[b] = true; });

    // Track managed overlays so we can clean up
    var overlayMap = new Map(); // textarea element -> { overlay, syncRAF }

    // =========================================================================
    //  1. SYNTAX HIGHLIGHTING
    // =========================================================================

    /**
     * Tokenize a Python source string into an array of { type, value } tokens.
     * Types: keyword, builtin, string, comment, number, decorator, operator, text
     */
    function tokenize(code) {
        var tokens = [];
        var i = 0;
        var len = code.length;

        while (i < len) {
            var ch = code[i];

            // --- Comments ---
            if (ch === "#") {
                var end = code.indexOf("\n", i);
                if (end === -1) end = len;
                tokens.push({ type: "comment", value: code.slice(i, end) });
                i = end;
                continue;
            }

            // --- Strings (triple-quoted, f-strings, single/double) ---
            if (ch === '"' || ch === "'" || ((ch === "f" || ch === "F" || ch === "r" || ch === "R" || ch === "b" || ch === "B") && i + 1 < len && (code[i + 1] === '"' || code[i + 1] === "'"))) {
                var strStart = i;
                var prefix = "";
                // Consume prefix characters (f, r, b, combinations like fr, rb, etc.)
                while (i < len && /[fFrRbBuU]/.test(code[i])) {
                    prefix += code[i];
                    i++;
                }
                if (i >= len || (code[i] !== '"' && code[i] !== "'")) {
                    // Not actually a string prefix, treat as identifier start
                    i = strStart;
                    // Fall through to identifier handling below
                } else {
                    var quote = code[i];
                    var triple = (i + 2 < len && code[i + 1] === quote && code[i + 2] === quote);
                    var delimiter = triple ? quote + quote + quote : quote;
                    i += delimiter.length;

                    // Find closing delimiter
                    var closed = false;
                    while (i < len) {
                        if (code[i] === "\\" && i + 1 < len) {
                            i += 2; // skip escaped char
                            continue;
                        }
                        if (triple) {
                            if (i + 2 < len && code[i] === quote && code[i + 1] === quote && code[i + 2] === quote) {
                                i += 3;
                                closed = true;
                                break;
                            }
                        } else {
                            if (code[i] === quote) {
                                i += 1;
                                closed = true;
                                break;
                            }
                            if (code[i] === "\n") {
                                // Unterminated single-line string
                                break;
                            }
                        }
                        i++;
                    }
                    tokens.push({ type: "string", value: code.slice(strStart, i) });
                    continue;
                }
            }

            // --- Decorators ---
            if (ch === "@" && (i === 0 || code[i - 1] === "\n" || /\s/.test(code[i - 1]))) {
                var decEnd = i + 1;
                while (decEnd < len && /[a-zA-Z0-9_.]/.test(code[decEnd])) decEnd++;
                if (decEnd > i + 1) {
                    tokens.push({ type: "decorator", value: code.slice(i, decEnd) });
                    i = decEnd;
                    continue;
                }
            }

            // --- Numbers ---
            if (/[0-9]/.test(ch) || (ch === "." && i + 1 < len && /[0-9]/.test(code[i + 1]))) {
                var numStart = i;
                // Handle hex, octal, binary prefixes
                if (ch === "0" && i + 1 < len && /[xXoObB]/.test(code[i + 1])) {
                    i += 2;
                    while (i < len && /[0-9a-fA-F_]/.test(code[i])) i++;
                } else {
                    while (i < len && /[0-9_]/.test(code[i])) i++;
                    if (i < len && code[i] === ".") {
                        i++;
                        while (i < len && /[0-9_]/.test(code[i])) i++;
                    }
                    if (i < len && /[eE]/.test(code[i])) {
                        i++;
                        if (i < len && /[+-]/.test(code[i])) i++;
                        while (i < len && /[0-9_]/.test(code[i])) i++;
                    }
                }
                // Imaginary suffix
                if (i < len && /[jJ]/.test(code[i])) i++;
                tokens.push({ type: "number", value: code.slice(numStart, i) });
                continue;
            }

            // --- Operators (multi-char first) ---
            var op2 = code.slice(i, i + 2);
            var op3 = code.slice(i, i + 3);
            if (op3 === "**=" || op3 === "//=" || op3 === "!==" || op3 === "<<=") {
                tokens.push({ type: "operator", value: op3 });
                i += 3;
                continue;
            }
            if (op2 === "==" || op2 === "!=" || op2 === "<=" || op2 === ">=" ||
                op2 === "//" || op2 === "**" || op2 === "+=" || op2 === "-=" ||
                op2 === "*=" || op2 === "/=" || op2 === "%=" || op2 === "<<" ||
                op2 === ">>" || op2 === "->" || op2 === ":=") {
                tokens.push({ type: "operator", value: op2 });
                i += 2;
                continue;
            }
            if ("=<>+-*/%".indexOf(ch) !== -1) {
                tokens.push({ type: "operator", value: ch });
                i++;
                continue;
            }

            // --- Identifiers / Keywords / Builtins ---
            if (/[a-zA-Z_]/.test(ch)) {
                var idStart = i;
                while (i < len && /[a-zA-Z0-9_]/.test(code[i])) i++;
                var word = code.slice(idStart, i);
                if (KEYWORD_SET[word]) {
                    tokens.push({ type: "keyword", value: word });
                } else if (BUILTIN_SET[word]) {
                    tokens.push({ type: "builtin", value: word });
                } else {
                    tokens.push({ type: "text", value: word });
                }
                continue;
            }

            // --- Everything else (whitespace, punctuation, etc.) ---
            tokens.push({ type: "text", value: ch });
            i++;
        }

        return tokens;
    }

    /**
     * Render highlighted HTML from tokens. All text is escaped.
     */
    function renderHighlightedHTML(tokens) {
        var parts = [];
        for (var t = 0; t < tokens.length; t++) {
            var tok = tokens[t];
            var escaped = escapeHTML(tok.value);
            switch (tok.type) {
                case "keyword":
                    parts.push('<span class="syn-keyword">' + escaped + "</span>");
                    break;
                case "builtin":
                    parts.push('<span class="syn-builtin">' + escaped + "</span>");
                    break;
                case "string":
                    parts.push('<span class="syn-string">' + escaped + "</span>");
                    break;
                case "comment":
                    parts.push('<span class="syn-comment">' + escaped + "</span>");
                    break;
                case "number":
                    parts.push('<span class="syn-number">' + escaped + "</span>");
                    break;
                case "decorator":
                    parts.push('<span class="syn-decorator">' + escaped + "</span>");
                    break;
                case "operator":
                    parts.push('<span class="syn-operator">' + escaped + "</span>");
                    break;
                default:
                    parts.push(escaped);
            }
        }
        return parts.join("");
    }

    function escapeHTML(s) {
        return s
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    /**
     * Create or retrieve the highlight overlay for a textarea.
     */
    function ensureOverlay(textarea) {
        if (overlayMap.has(textarea)) return overlayMap.get(textarea);

        // Wrap textarea in a container if not already wrapped
        var parent = textarea.parentElement;
        var wrapper;
        if (!parent.classList.contains("syn-highlight-wrapper")) {
            wrapper = document.createElement("div");
            wrapper.className = "syn-highlight-wrapper";
            parent.insertBefore(wrapper, textarea);
            wrapper.appendChild(textarea);
        } else {
            wrapper = parent;
        }
        wrapper.style.position = "relative";

        // Create overlay div
        var overlay = document.createElement("div");
        overlay.className = "syn-highlight-overlay";
        overlay.setAttribute("aria-hidden", "true");
        wrapper.insertBefore(overlay, textarea);

        // Copy computed styles from textarea to overlay
        syncOverlayStyles(textarea, overlay);

        var entry = { overlay: overlay, wrapper: wrapper, syncRAF: null };
        overlayMap.set(textarea, entry);

        // Make textarea text transparent so overlay shows through
        textarea.classList.add("syn-textarea-transparent");

        // Bind events
        function onUpdate() {
            if (entry.syncRAF) return;
            entry.syncRAF = requestAnimationFrame(function () {
                entry.syncRAF = null;
                updateOverlayContent(textarea, overlay);
                syncOverlayScroll(textarea, overlay);
            });
        }

        textarea.addEventListener("input", onUpdate);
        textarea.addEventListener("scroll", function () {
            syncOverlayScroll(textarea, overlay);
        });

        // Initial render
        updateOverlayContent(textarea, overlay);

        // Re-sync styles on window resize
        var resizeTimer = null;
        textarea._synResizeHandler = function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                syncOverlayStyles(textarea, overlay);
                updateOverlayContent(textarea, overlay);
            }, 100);
        };
        window.addEventListener("resize", textarea._synResizeHandler);

        return entry;
    }

    function syncOverlayStyles(textarea, overlay) {
        var cs = window.getComputedStyle(textarea);
        overlay.style.fontFamily = cs.fontFamily;
        overlay.style.fontSize = cs.fontSize;
        overlay.style.lineHeight = cs.lineHeight;
        overlay.style.letterSpacing = cs.letterSpacing;
        overlay.style.wordSpacing = cs.wordSpacing;
        overlay.style.tabSize = cs.tabSize;
        overlay.style.MozTabSize = cs.tabSize;
        overlay.style.paddingTop = cs.paddingTop;
        overlay.style.paddingRight = cs.paddingRight;
        overlay.style.paddingBottom = cs.paddingBottom;
        overlay.style.paddingLeft = cs.paddingLeft;
        overlay.style.borderTop = cs.borderTopWidth + " solid transparent";
        overlay.style.borderRight = cs.borderRightWidth + " solid transparent";
        overlay.style.borderBottom = cs.borderBottomWidth + " solid transparent";
        overlay.style.borderLeft = cs.borderLeftWidth + " solid transparent";
        overlay.style.whiteSpace = cs.whiteSpace;
        overlay.style.wordWrap = cs.wordWrap;
        overlay.style.overflowWrap = cs.overflowWrap;
    }

    function updateOverlayContent(textarea, overlay) {
        var code = textarea.value;
        var tokens = tokenize(code);
        // Add trailing newline so overlay height matches textarea
        overlay.innerHTML = renderHighlightedHTML(tokens) + "\n";
    }

    function syncOverlayScroll(textarea, overlay) {
        overlay.scrollTop = textarea.scrollTop;
        overlay.scrollLeft = textarea.scrollLeft;
    }

    /**
     * Attach highlighting to all known textareas currently in the DOM.
     */
    function attachHighlighting() {
        TEXTAREA_IDS.forEach(function (id) {
            var ta = document.getElementById(id);
            if (ta) ensureOverlay(ta);
        });
    }

    /**
     * Detach overlay for a textarea that no longer exists.
     */
    function cleanupOverlays() {
        overlayMap.forEach(function (entry, textarea) {
            if (!document.contains(textarea)) {
                if (entry.overlay && entry.overlay.parentNode) {
                    entry.overlay.remove();
                }
                if (textarea._synResizeHandler) {
                    window.removeEventListener("resize", textarea._synResizeHandler);
                }
                overlayMap.delete(textarea);
            }
        });
    }

    // =========================================================================
    //  2. AUTO-INDENT
    // =========================================================================

    function getTabSize() {
        return parseInt(localStorage.getItem("pylearn_tabsize") || "4", 10);
    }

    function getIndent() {
        return " ".repeat(getTabSize());
    }

    /**
     * Handle Enter key for auto-indentation on a textarea.
     */
    function handleAutoIndent(e) {
        if (e.key !== "Enter") return;

        var ta = e.target;
        var val = ta.value;
        var start = ta.selectionStart;

        // Get current line (text before cursor on this line)
        var lineStart = val.lastIndexOf("\n", start - 1) + 1;
        var currentLine = val.slice(lineStart, start);

        // Calculate current indentation
        var indentMatch = currentLine.match(/^(\s*)/);
        var currentIndent = indentMatch ? indentMatch[1] : "";

        // Check if line ends with ':' (ignoring trailing whitespace and comments)
        var trimmed = currentLine.replace(/#.*$/, "").trimEnd();
        var endsWithColon = trimmed.endsWith(":");

        var newIndent = currentIndent;
        if (endsWithColon) {
            newIndent = currentIndent + getIndent();
        }

        // Prevent default enter behavior
        e.preventDefault();

        // Insert newline + indentation
        var insertion = "\n" + newIndent;
        var before = val.slice(0, start);
        var after = val.slice(ta.selectionEnd);
        ta.value = before + insertion + after;
        ta.selectionStart = ta.selectionEnd = start + insertion.length;

        // Fire input event so highlighting updates
        ta.dispatchEvent(new Event("input", { bubbles: true }));
    }

    /**
     * Attach auto-indent to all known textareas.
     */
    function attachAutoIndent() {
        TEXTAREA_IDS.forEach(function (id) {
            var ta = document.getElementById(id);
            if (ta && !ta._autoIndentAttached) {
                ta.addEventListener("keydown", handleAutoIndent);
                ta._autoIndentAttached = true;
            }
        });
    }

    // =========================================================================
    //  3. CODE HISTORY
    // =========================================================================

    /**
     * Determine the current context (type and id) from the active view.
     * Returns { type: "lesson"|"challenge"|"project"|"example", id: string } or null.
     */
    function getCurrentContext() {
        // Challenge view
        var challengeView = document.querySelector(".view-challenge.active");
        if (challengeView) {
            var titleEl = document.getElementById("challenge-detail-title");
            if (titleEl && titleEl.textContent) {
                // Use a slug of the title as an id
                return { type: "challenge", id: slugify(titleEl.textContent) };
            }
        }

        // Lesson view
        var lessonView = document.querySelector(".view-lesson.active");
        if (lessonView) {
            var modBadge = lessonView.querySelector(".badge-primary");
            var lessonMeta = lessonView.querySelector(".lesson-meta");
            if (modBadge && lessonMeta) {
                var modText = modBadge.textContent.trim().replace(/\s+/g, "_");
                var lessonText = lessonMeta.textContent.match(/Lesson\s+(\d+)/);
                var lessonNum = lessonText ? lessonText[1] : "0";
                return { type: "lesson", id: modText + "_lesson_" + lessonNum };
            }
        }

        // Project view
        var projectTA = document.getElementById("project-code-textarea");
        if (projectTA) {
            var fileName = document.querySelector(".file-name");
            if (fileName) {
                return { type: "project", id: slugify(fileName.textContent) };
            }
        }

        // Example view
        var exampleTA = document.getElementById("example-code-textarea");
        if (exampleTA) {
            return { type: "example", id: "current_example" };
        }

        return null;
    }

    function slugify(text) {
        return text.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    }

    /**
     * Save code snapshot to history.
     */
    function saveToHistory(type, id, code) {
        if (!code || !code.trim()) return;

        var key = "pylearn_history_" + type + "_" + id;
        var history = [];
        try {
            var stored = localStorage.getItem(key);
            if (stored) history = JSON.parse(stored);
        } catch (e) {
            history = [];
        }

        // Don't save duplicate of the most recent entry
        if (history.length > 0 && history[history.length - 1].code === code) return;

        history.push({
            code: code,
            timestamp: new Date().toISOString()
        });

        // Trim to max
        if (history.length > MAX_HISTORY) {
            history = history.slice(history.length - MAX_HISTORY);
        }

        localStorage.setItem(key, JSON.stringify(history));
    }

    /**
     * Get history array for a given type and id.
     */
    function getHistory(type, id) {
        var key = "pylearn_history_" + type + "_" + id;
        try {
            var stored = localStorage.getItem(key);
            if (stored) return JSON.parse(stored);
        } catch (e) {}
        return [];
    }

    /**
     * Observe output panels and run buttons to detect code execution, then save history.
     */
    function attachHistoryTracking() {
        // Listen for click on Run buttons
        document.addEventListener("click", function (e) {
            var btn = e.target.closest(".run-btn, #project-run-btn, #example-run-btn, .lesson-run-btn");
            if (!btn) return;

            // Defer to let the code run, then save
            setTimeout(function () {
                var ctx = getCurrentContext();
                if (!ctx) return;

                // Find the relevant textarea
                var code = "";
                for (var i = 0; i < TEXTAREA_IDS.length; i++) {
                    var ta = document.getElementById(TEXTAREA_IDS[i]);
                    if (ta && ta.value.trim()) {
                        code = ta.value;
                        break;
                    }
                }
                if (code) {
                    saveToHistory(ctx.type, ctx.id, code);
                }
            }, 500);
        });

        // Also observe the output drawer for mutations (catches Ctrl+Enter runs)
        var outputBody = document.getElementById("outputDrawerBody");
        if (outputBody) {
            var observer = new MutationObserver(function () {
                var ctx = getCurrentContext();
                if (!ctx) return;

                var code = "";
                for (var i = 0; i < TEXTAREA_IDS.length; i++) {
                    var ta = document.getElementById(TEXTAREA_IDS[i]);
                    if (ta && ta.value.trim()) {
                        code = ta.value;
                        break;
                    }
                }
                if (code) {
                    saveToHistory(ctx.type, ctx.id, code);
                }
            });
            observer.observe(outputBody, { childList: true, characterData: true, subtree: true });
        }
    }

    // =========================================================================
    //  INJECT CSS
    // =========================================================================

    function injectStyles() {
        if (document.getElementById("editor-enhance-styles")) return;

        var style = document.createElement("style");
        style.id = "editor-enhance-styles";
        style.textContent = [
            "/* Editor Enhance — Syntax Highlighting Variables */",
            ":root {",
            "    --syn-keyword: #ff79c6;",
            "    --syn-string: #f1fa8c;",
            "    --syn-comment: #6272a4;",
            "    --syn-number: #bd93f9;",
            "    --syn-decorator: #50fa7b;",
            "    --syn-operator: #ff79c6;",
            "    --syn-builtin: #8be9fd;",
            "}",
            "",
            "/* Theme overrides */",
            "[data-theme='midnight-ocean'] {",
            "    --syn-keyword: #ff79c6;",
            "    --syn-string: #f1fa8c;",
            "    --syn-comment: #6272a4;",
            "    --syn-number: #bd93f9;",
            "    --syn-decorator: #50fa7b;",
            "    --syn-operator: #ff79c6;",
            "    --syn-builtin: #8be9fd;",
            "}",
            "[data-theme='solar-flare'] {",
            "    --syn-keyword: #ff6b6b;",
            "    --syn-string: #ffd93d;",
            "    --syn-comment: #7a7a7a;",
            "    --syn-number: #c792ea;",
            "    --syn-decorator: #c3e88d;",
            "    --syn-operator: #ff6b6b;",
            "    --syn-builtin: #89ddff;",
            "}",
            "[data-theme='forest-canopy'] {",
            "    --syn-keyword: #e06c75;",
            "    --syn-string: #e5c07b;",
            "    --syn-comment: #5c6370;",
            "    --syn-number: #d19a66;",
            "    --syn-decorator: #98c379;",
            "    --syn-operator: #e06c75;",
            "    --syn-builtin: #56b6c2;",
            "}",
            "[data-theme='arctic-frost'] {",
            "    --syn-keyword: #d73a49;",
            "    --syn-string: #032f62;",
            "    --syn-comment: #6a737d;",
            "    --syn-number: #005cc5;",
            "    --syn-decorator: #22863a;",
            "    --syn-operator: #d73a49;",
            "    --syn-builtin: #005cc5;",
            "}",
            "[data-theme='sakura-bloom'] {",
            "    --syn-keyword: #d1477a;",
            "    --syn-string: #7c4dff;",
            "    --syn-comment: #9e9e9e;",
            "    --syn-number: #6200ea;",
            "    --syn-decorator: #00c853;",
            "    --syn-operator: #d1477a;",
            "    --syn-builtin: #0091ea;",
            "}",
            "[data-theme='cyberpunk-neon'] {",
            "    --syn-keyword: #ff00ff;",
            "    --syn-string: #ffff00;",
            "    --syn-comment: #666699;",
            "    --syn-number: #ff6600;",
            "    --syn-decorator: #00ff66;",
            "    --syn-operator: #ff00ff;",
            "    --syn-builtin: #00ffff;",
            "}",
            "",
            "/* Syntax highlight token classes */",
            ".syn-keyword { color: var(--syn-keyword); font-weight: 600; }",
            ".syn-builtin { color: var(--syn-builtin); }",
            ".syn-string { color: var(--syn-string); }",
            ".syn-comment { color: var(--syn-comment); font-style: italic; }",
            ".syn-number { color: var(--syn-number); }",
            ".syn-decorator { color: var(--syn-decorator); }",
            ".syn-operator { color: var(--syn-operator); }",
            "",
            "/* Highlight overlay wrapper */",
            ".syn-highlight-wrapper {",
            "    position: relative;",
            "    flex: 1;",
            "    width: 100%;",
            "    min-height: 0;",
            "}",
            "",
            "/* Overlay sits behind the textarea text but shows through transparency */",
            ".syn-highlight-overlay {",
            "    position: absolute;",
            "    top: 0;",
            "    left: 0;",
            "    width: 100%;",
            "    height: 100%;",
            "    overflow: hidden;",
            "    pointer-events: none;",
            "    z-index: 0;",
            "    white-space: pre;",
            "    word-wrap: break-word;",
            "    color: var(--code-text, #e1e4ed);",
            "    background: transparent;",
            "}",
            "",
            "/* Make textarea text transparent so overlay shows through */",
            ".syn-textarea-transparent {",
            "    color: transparent !important;",
            "    caret-color: var(--code-text, #e1e4ed);",
            "    background: var(--code-bg, #0d1117) !important;",
            "    position: relative;",
            "    z-index: 1;",
            "}",
        ].join("\n");

        document.head.appendChild(style);
    }

    // =========================================================================
    //  PUBLIC API
    // =========================================================================

    function init() {
        injectStyles();
        attachHighlighting();
        attachAutoIndent();
        attachHistoryTracking();
    }

    function refresh() {
        cleanupOverlays();
        attachHighlighting();
        attachAutoIndent();
    }

    function showHistory(type, id) {
        return getHistory(type, id);
    }

    // Expose globally
    window.EditorEnhance = {
        init: init,
        refresh: refresh,
        showHistory: showHistory
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        // DOM already loaded, defer slightly to let app.js finish
        setTimeout(init, 0);
    }

})();
