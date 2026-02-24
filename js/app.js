// =============================================================================
// app.js — Complete integration layer for PyLearn
// =============================================================================
// Wires CURRICULUM, CHALLENGES, PROJECTS, CODE_EXAMPLES, and the evaluation
// engine into every view of the PyLearn UI.
// =============================================================================

(function () {
    "use strict";

    // -------------------------------------------------------------------------
    // DOM helpers
    // -------------------------------------------------------------------------
    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];

    // -------------------------------------------------------------------------
    // Data aggregation (safe access for optional globals)
    // -------------------------------------------------------------------------
    const curriculum = (typeof CURRICULUM !== "undefined") ? CURRICULUM : { modules: [] };
    const challenges = (typeof CHALLENGES !== "undefined") ? CHALLENGES : [];
    const allProjects = [
        ...((typeof projectsPart1 !== "undefined") ? projectsPart1 : []),
        ...((typeof projectsPart2 !== "undefined") ? projectsPart2 : []),
    ];
    let codeExamples = [];
    try { if (typeof CODE_EXAMPLES !== "undefined") codeExamples = CODE_EXAMPLES; } catch (e) {}

    // -------------------------------------------------------------------------
    // State
    // -------------------------------------------------------------------------
    let currentChallenge = null;
    let attemptCount = 0;
    let timerInterval = null;
    let timerSeconds = 0;
    let pyodideReady = false;
    let currentModuleIndex = parseInt(localStorage.getItem("pylearn_last_module") || "0", 10);
    let currentLessonIndex = parseInt(localStorage.getItem("pylearn_last_lesson") || "0", 10);
    let currentProject = null;
    let currentProjectStep = 0;

    // =========================================================================
    //  GLOBAL OUTPUT DRAWER
    // =========================================================================
    const outputDrawer = $("#outputDrawer");
    const outputDrawerBody = $("#outputDrawerBody");
    let outputDock = localStorage.getItem("pylearn_output_dock") || "bottom";

    function applyOutputDock(mode) {
        outputDock = mode;
        localStorage.setItem("pylearn_output_dock", mode);
        if (outputDrawer) {
            outputDrawer.classList.remove("dock-bottom", "dock-right");
            outputDrawer.classList.add("dock-" + mode);
        }
        document.body.classList.remove("output-bottom", "output-right");
        if (outputDrawer && outputDrawer.classList.contains("open")) {
            document.body.classList.add("output-" + mode);
        }
    }

    function showOutput(html) {
        if (!outputDrawer || !outputDrawerBody) return;
        outputDrawerBody.innerHTML = html;
        outputDrawer.classList.add("open");
        document.body.classList.add("output-" + outputDock);
    }

    function showOutputRunning() {
        showOutput('<span style="color:var(--text-muted);">Running...</span>');
    }

    function showOutputResult(result) {
        if (result.success) {
            showOutput(`<span class="output-success">${escapeHTML(result.stdout || "(no output)")}</span>`);
        } else {
            showOutput(`<span class="output-error">${escapeHTML(result.error || result.stderr)}</span>`);
        }
    }

    function hideOutput() {
        if (outputDrawer) outputDrawer.classList.remove("open");
        document.body.classList.remove("output-bottom", "output-right");
    }

    // Expose for settings inline script
    window._applyOutputDock = applyOutputDock;

    // Init drawer position
    if (outputDrawer) {
        applyOutputDock(outputDock);
        const closeBtn = $("#outputDrawerClose");
        if (closeBtn) closeBtn.addEventListener("click", hideOutput);
        const dockBtn = $("#outputDockToggle");
        if (dockBtn) dockBtn.addEventListener("click", () => {
            applyOutputDock(outputDock === "bottom" ? "right" : "bottom");
        });
    }

    // =========================================================================
    //  PYODIDE LOADING
    // =========================================================================
    function injectLoadingOverlay() {
        const overlay = document.createElement("div");
        overlay.id = "pyodide-loading-overlay";
        overlay.style.cssText = `
            position:fixed;inset:0;z-index:9999;
            background:var(--bg-primary,#0d1117);
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            transition:opacity 0.5s;
        `;
        overlay.innerHTML = `
            <div style="width:48px;height:48px;border:4px solid var(--border-color,#333);border-top-color:var(--accent-primary,#6c8cff);border-radius:50%;animation:_pyspin .8s linear infinite;margin-bottom:20px;"></div>
            <h2 style="color:var(--text-primary,#e1e4ed);font-family:Inter,sans-serif;margin-bottom:8px;">Loading Python Environment</h2>
            <p id="pyodide-load-status" style="color:var(--text-muted,#8b8fa3);font-family:Inter,sans-serif;font-size:0.9rem;">Downloading Python interpreter...</p>
            <style>@keyframes _pyspin{to{transform:rotate(360deg)}}</style>
        `;
        document.body.appendChild(overlay);
        return overlay;
    }

    const loadingOverlay = injectLoadingOverlay();

    PyodideRunner.init()
        .then(() => {
            pyodideReady = true;
            loadingOverlay.style.opacity = "0";
            setTimeout(() => loadingOverlay.remove(), 500);
            initAllViews();
        })
        .catch((err) => {
            loadingOverlay.querySelector("h2").textContent = "Failed to load Python";
            loadingOverlay.querySelector("#pyodide-load-status").textContent = err.message;
            loadingOverlay.querySelector("#pyodide-load-status").style.color = "var(--error,#f87171)";
            // Still init views (they just won't be able to run code)
            initAllViews();
        });

    function initAllViews() {
        buildSidebarModules();
        refreshDashboard();
        renderLessonView();
        renderProjectsView();
        renderExamplesView();
        refreshProgressView();
    }

    // =========================================================================
    //  VIEW NAVIGATION (hooks into existing nav items)
    // =========================================================================
    const navItems = $$(".sidebar-nav-item[data-view]");
    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            const viewId = item.getAttribute("data-view");
            if (viewId === "challenge") {
                setTimeout(() => { buildChallengeSidebar(); wireResetButton(); enableRunButton(); }, 50);
            } else if (viewId === "lesson") {
                setTimeout(renderLessonView, 50);
            } else if (viewId === "projects") {
                setTimeout(renderProjectsView, 50);
            } else if (viewId === "examples") {
                setTimeout(renderExamplesView, 50);
            } else if (viewId === "progress") {
                setTimeout(refreshProgressView, 50);
            } else if (viewId === "dashboard") {
                setTimeout(refreshDashboard, 50);
            }
            // Track view visit for gamification
            if (typeof Gamification !== "undefined") Gamification.trackViewVisit(viewId);
        });
    });

    // =========================================================================
    //  SIDEBAR MODULES (dynamic from CURRICULUM)
    // =========================================================================
    function getModulePct(mod) {
        // Combined progress: lessons viewed + challenges completed
        const lp = getLessonProgress(mod.id);
        const moduleActivities = challenges.filter(c => c.moduleId === mod.id);
        let completedChallenges = 0;
        for (const act of moduleActivities) {
            const rec = ProgressTracker.getChallengeRecord(act.id);
            if (rec && rec.completed) completedChallenges++;
        }
        const totalItems = lp.total + moduleActivities.length;
        const doneItems = lp.viewed + completedChallenges;
        return totalItems > 0 ? doneItems / totalItems : 0;
    }

    function buildSidebarModules() {
        const moduleContainer = $$(".sidebar-module-item");
        const parent = moduleContainer[0]?.parentElement;
        if (!parent) return;
        moduleContainer.forEach(el => el.remove());

        const labels = $$(".sidebar-section-label", parent);
        const modulesLabel = labels.find(l => l.textContent.trim() === "Modules");
        if (!modulesLabel) return;

        function createModuleItem(mod, idx) {
            const pct = getModulePct(mod);
            const offset = 56.5 - (56.5 * pct);
            const item = document.createElement("div");
            item.className = "sidebar-module-item";
            item.style.cursor = "pointer";
            item.dataset.moduleIndex = idx;
            item.innerHTML = `
                <div class="sidebar-module-progress">
                    <svg viewBox="0 0 24 24">
                        <circle class="progress-ring-bg" cx="12" cy="12" r="9"></circle>
                        <circle class="progress-ring-fill" cx="12" cy="12" r="9"
                            stroke-dasharray="56.5" stroke-dashoffset="${offset}"></circle>
                    </svg>
                </div>
                <span class="sidebar-module-name">${mod.id}. ${mod.title}</span>
            `;
            item.addEventListener("click", () => {
                currentModuleIndex = idx;
                currentLessonIndex = 0;
                navItems.forEach(n => n.classList.remove("active"));
                const lessonNav = $$(".sidebar-nav-item[data-view]").find(n => n.getAttribute("data-view") === "lesson");
                if (lessonNav) lessonNav.classList.add("active");
                $$(".view").forEach(v => v.classList.remove("active"));
                const lessonView = $("#viewLesson");
                if (lessonView) lessonView.classList.add("active");
                const bc = $("#breadcrumbCurrent");
                if (bc) bc.textContent = "Lessons";
                renderLessonView();
            });
            return item;
        }

        // Build in order and append
        curriculum.modules.forEach((mod, idx) => {
            parent.appendChild(createModuleItem(mod, idx));
        });
    }

    function getModuleProgress(moduleId) {
        // Count completed challenges for this module
        const moduleActivities = challenges.filter(c => c.moduleId === moduleId);
        let completedChallenges = 0;
        for (const act of moduleActivities) {
            const rec = ProgressTracker.getChallengeRecord(act.id);
            if (rec && rec.completed) completedChallenges++;
        }
        return completedChallenges;
    }

    function getLessonProgress(moduleId) {
        // Count viewed lessons for this module
        const mod = curriculum.modules.find(m => m.id === moduleId);
        if (!mod || !mod.lessons) return { viewed: 0, total: 0 };
        let viewed = 0;
        for (let i = 0; i < mod.lessons.length; i++) {
            if (localStorage.getItem(`pylearn_lesson_${moduleId}_${i}`)) viewed++;
        }
        return { viewed, total: mod.lessons.length };
    }

    function getTotalLessonsViewed() {
        let total = 0;
        for (const mod of curriculum.modules) {
            total += getLessonProgress(mod.id).viewed;
        }
        return total;
    }

    function getTotalLessons() {
        let total = 0;
        for (const mod of curriculum.modules) {
            if (mod.lessons) total += mod.lessons.length;
        }
        return total;
    }

    // =========================================================================
    //  LESSON VIEWER
    // =========================================================================
    function renderLessonView() {
        const view = $("#viewLesson");
        if (!view) return;
        if (curriculum.modules.length === 0) {
            view.innerHTML = `<h2>No curriculum loaded</h2><p class="text-muted">Curriculum data is not available.</p>`;
            return;
        }

        // Bounds check saved indices
        if (currentModuleIndex >= curriculum.modules.length) currentModuleIndex = 0;
        const mod = curriculum.modules[currentModuleIndex];
        if (!mod || !mod.lessons || mod.lessons.length === 0) return;
        if (currentLessonIndex >= mod.lessons.length) currentLessonIndex = 0;
        const lesson = mod.lessons[currentLessonIndex];

        const totalLessons = mod.lessons.length;
        const progressPct = Math.round(((currentLessonIndex + 1) / totalLessons) * 100);

        let html = `
            <div class="lesson-header">
                <div class="d-flex items-center gap-8 mb-8">
                    <span class="badge badge-primary">Module ${mod.id}</span>
                    <span class="badge" style="background:var(--bg-tertiary);color:var(--text-secondary);">${mod.icon || ""} ${mod.subtitle || ""}</span>
                </div>
                <h2>${lesson.title}</h2>
                <div class="lesson-meta">
                    <span>&#128196; Lesson ${currentLessonIndex + 1} of ${totalLessons}</span>
                </div>
            </div>

            <div class="progress-bar-label">
                <span class="label">Lesson Progress</span>
                <span class="value">${progressPct}%</span>
            </div>
            <div class="progress-bar mb-24">
                <div class="progress-bar-fill" style="width:${progressPct}%"></div>
            </div>

            <div class="lesson-content">
                ${lesson.content}
        `;

        // Code examples
        if (lesson.examples && lesson.examples.length > 0) {
            html += `<h3 style="margin-top:24px;">Code Examples</h3>`;
            for (const ex of lesson.examples) {
                html += `
                    <h4 style="margin-top:16px;color:var(--accent-primary);">${escapeHTML(ex.title)}</h4>
                    <div class="code-block">
                        <div class="code-block-header">
                            <span class="code-block-lang">Python</span>
                            <button class="code-block-copy">Copy</button>
                            <button class="btn btn-sm btn-primary lesson-run-btn" style="margin-left:8px;font-size:0.7rem;" data-code="${encodeURIComponent(ex.code)}">&#9654; Run</button>
                        </div>
                        <pre><code>${escapeHTML(ex.code)}</code></pre>
                    </div>
                    <p style="color:var(--text-secondary);font-size:0.875rem;margin-top:8px;">${escapeHTML(ex.explanation)}</p>
                `;
            }
        }

        // Key concepts
        if (lesson.keyConcepts && lesson.keyConcepts.length > 0) {
            html += `
                <div class="accordion mt-24">
                    <div class="accordion-item">
                        <button class="accordion-trigger">Key Concepts <span class="accordion-trigger-icon">&#9660;</span></button>
                        <div class="accordion-content">
                            <div class="accordion-content-inner">
                                <ul>${lesson.keyConcepts.map(c => `<li>${escapeHTML(c)}</li>`).join("")}</ul>
                            </div>
                        </div>
                    </div>
            `;
            // Common mistakes
            if (lesson.commonMistakes && lesson.commonMistakes.length > 0) {
                html += `
                    <div class="accordion-item">
                        <button class="accordion-trigger">Common Mistakes <span class="accordion-trigger-icon">&#9660;</span></button>
                        <div class="accordion-content">
                            <div class="accordion-content-inner">
                                <ul>${lesson.commonMistakes.map(m => `<li style="color:var(--warning);">${escapeHTML(m)}</li>`).join("")}</ul>
                            </div>
                        </div>
                    </div>
                `;
            }
            // Fun fact
            if (lesson.funFact) {
                html += `
                    <div class="accordion-item">
                        <button class="accordion-trigger">&#128161; Did You Know? <span class="accordion-trigger-icon">&#9660;</span></button>
                        <div class="accordion-content">
                            <div class="accordion-content-inner">
                                <p>${escapeHTML(lesson.funFact)}</p>
                            </div>
                        </div>
                    </div>
                `;
            }
            html += `</div>`; // close accordion
        }

        // Output now shown in global drawer (no inline panel needed)

        // Linked challenges for this module
        const moduleChallenges = challenges.filter(c => c.moduleId === mod.id);
        if (moduleChallenges.length > 0) {
            html += `
                <div class="lesson-challenges mt-24" style="border:1px solid var(--border-color);border-radius:10px;padding:16px;background:var(--bg-secondary);">
                    <h3 style="margin:0 0 12px;font-size:1rem;color:var(--text-primary);">&#127919; Practice Challenges for This Module</h3>
                    <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:12px;">Put what you learned into practice:</p>
                    <div style="display:flex;flex-wrap:wrap;gap:8px;">
            `;
            for (const ch of moduleChallenges) {
                const rec = ProgressTracker.getChallengeRecord(ch.id);
                const done = rec && rec.completed;
                const diffColor = ch.difficulty === "beginner" || ch.difficulty === "easy" ? "var(--success)"
                    : ch.difficulty === "medium" || ch.difficulty === "intermediate" ? "var(--warning)"
                    : "var(--error)";
                html += `
                    <button class="btn btn-sm lesson-challenge-link" data-challenge-id="${ch.id}" style="
                        background:${done ? "var(--success)" : "var(--bg-tertiary)"};
                        color:${done ? "#fff" : "var(--text-primary)"};
                        border:1px solid ${done ? "var(--success)" : "var(--border-color)"};
                        display:flex;align-items:center;gap:6px;
                    ">
                        <span style="font-size:0.7rem;">${done ? "&#10004;" : "&#9679;"}</span>
                        ${escapeHTML(ch.title)}
                        <span style="font-size:0.65rem;opacity:0.7;border-left:1px solid ${done ? "rgba(255,255,255,0.3)" : "var(--border-color)"};padding-left:6px;color:${diffColor};">${ch.difficulty || ""}</span>
                    </button>
                `;
            }
            html += `</div></div>`;
        }

        html += `</div>`; // close lesson-content

        // Quiz CTA
        if (typeof QuizSystem !== "undefined" && QuizSystem.hasQuiz && QuizSystem.hasQuiz(mod.id)) {
            var qResult = QuizSystem.getQuizResult(mod.id);
            var scoreInfo = "";
            if (qResult) {
                var qPct = Math.round((qResult.bestScore / qResult.total) * 100);
                scoreInfo = '<div class="quiz-cta-score">Best: ' + qResult.bestScore + '/' + qResult.total + ' (' + qPct + '%)</div>';
            }
            html += '<div class="quiz-cta"><div class="quiz-cta-text"><h4>&#x1F4DD; Module Quiz</h4><p>Test your understanding of ' + escapeHTML(mod.title) + '</p>' + scoreInfo + '</div><button class="btn-quiz" data-quiz-module="' + mod.id + '">' + (qResult ? "Retake Quiz" : "Take Quiz") + '</button></div>';
        }

        // Notepad
        html += '<div id="lesson-notepad"></div>';

        // Navigation
        html += `
            <div class="lesson-nav">
                <button class="btn btn-secondary" id="lesson-prev" ${currentLessonIndex === 0 && currentModuleIndex === 0 ? "disabled" : ""}>&larr; Previous</button>
                <button class="btn btn-primary" id="lesson-next">${currentLessonIndex === totalLessons - 1 && currentModuleIndex === curriculum.modules.length - 1 ? "Complete!" : "Next &rarr;"}</button>
            </div>
        `;

        view.innerHTML = html;

        // Wire navigation
        const prevBtn = $("#lesson-prev");
        const nextBtn = $("#lesson-next");
        if (prevBtn) prevBtn.addEventListener("click", () => {
            const oldModule = currentModuleIndex;
            if (currentLessonIndex > 0) {
                currentLessonIndex--;
            } else if (currentModuleIndex > 0) {
                currentModuleIndex--;
                currentLessonIndex = curriculum.modules[currentModuleIndex].lessons.length - 1;
            }
            renderLessonView();
            view.scrollTop = 0;
            if (currentModuleIndex !== oldModule) playModuleTransition("prev");
        });
        if (nextBtn) nextBtn.addEventListener("click", () => {
            const oldModule = currentModuleIndex;
            if (currentLessonIndex < totalLessons - 1) {
                currentLessonIndex++;
            } else if (currentModuleIndex < curriculum.modules.length - 1) {
                currentModuleIndex++;
                currentLessonIndex = 0;
            }
            renderLessonView();
            view.scrollTop = 0;
            if (currentModuleIndex !== oldModule) playModuleTransition("next");
        });

        // Wire accordion triggers
        $$(".accordion-trigger", view).forEach(trigger => {
            trigger.addEventListener("click", () => {
                const item = trigger.parentElement;
                const isOpen = item.classList.contains("open");
                item.parentElement.querySelectorAll(".accordion-item").forEach(s => s.classList.remove("open"));
                if (!isOpen) item.classList.add("open");
            });
        });

        // Wire copy buttons
        $$(".code-block-copy", view).forEach(btn => {
            btn.addEventListener("click", () => {
                const codeEl = btn.closest(".code-block").querySelector("code");
                if (!codeEl) return;
                navigator.clipboard.writeText(codeEl.textContent).then(() => {
                    btn.textContent = "Copied!";
                    setTimeout(() => { btn.textContent = "Copy"; }, 2000);
                });
            });
        });

        // Wire run buttons — use global output drawer
        $$(".lesson-run-btn", view).forEach(btn => {
            btn.addEventListener("click", async () => {
                if (!pyodideReady) { alert("Python is still loading..."); return; }
                const code = decodeURIComponent(btn.dataset.code);
                showOutputRunning();
                try {
                    const result = await PyodideRunner.runCode(code, { timeout: 10000 });
                    showOutputResult(result);
                } catch (e) {
                    showOutput(`<span class="output-error">${escapeHTML(e.message)}</span>`);
                }
            });
        });

        // Wire challenge link buttons — navigate to Challenges view
        $$(".lesson-challenge-link", view).forEach(btn => {
            btn.addEventListener("click", () => {
                const cid = btn.dataset.challengeId;
                // Switch to challenge view
                const navItems = $$(".sidebar-nav-item[data-view]");
                navItems.forEach(n => n.classList.remove("active"));
                const challengeNav = navItems.find(n => n.getAttribute("data-view") === "challenge");
                if (challengeNav) challengeNav.classList.add("active");
                $$(".view").forEach(v => v.classList.remove("active"));
                const challengeView = $("#viewChallenge");
                if (challengeView) challengeView.classList.add("active");
                const bc = $("#breadcrumbCurrent");
                if (bc) bc.textContent = "Challenges";
                // Build sidebar and select the challenge
                buildChallengeSidebar();
                wireResetButton();
                selectChallenge(cid);
            });
        });

        // Mark lesson as viewed in localStorage
        // Save current position so we resume here next time
        localStorage.setItem("pylearn_last_module", String(currentModuleIndex));
        localStorage.setItem("pylearn_last_lesson", String(currentLessonIndex));

        // Save lesson as viewed and update sidebar + dashboard
        const viewedKey = `pylearn_lesson_${mod.id}_${currentLessonIndex}`;
        if (!localStorage.getItem(viewedKey)) {
            localStorage.setItem(viewedKey, "1");
            buildSidebarModules();
            refreshDashboard();
            refreshProgressView();
        }

        // Gamification hooks
        if (typeof Gamification !== "undefined") {
            Gamification.recordActivity();
            Gamification.checkAchievements();
        }

        // Wire quiz button
        var quizBtn = view.querySelector(".btn-quiz[data-quiz-module]");
        if (quizBtn) {
            quizBtn.addEventListener("click", function() {
                if (typeof QuizSystem !== "undefined") QuizSystem.startQuiz(quizBtn.dataset.quizModule);
            });
        }

        // Render notepad
        if (typeof UserContent !== "undefined" && UserContent.renderNotepad) {
            UserContent.renderNotepad("lesson-notepad", mod.id, currentLessonIndex);
        }

        // Refresh editor enhancements (syntax highlighting, auto-indent)
        if (window.EditorEnhance) setTimeout(function() { window.EditorEnhance.refresh(); }, 50);
    }

    // =========================================================================
    //  MODULE TRANSITION ANIMATION
    // =========================================================================
    function playModuleTransition(direction) {
        const mod = curriculum.modules[currentModuleIndex];
        if (!mod) return;

        // Animate the lesson content
        const view = $("#viewLesson");
        if (view) {
            view.classList.remove("lesson-module-transition");
            void view.offsetWidth; // force reflow
            view.classList.add("lesson-module-transition");
            setTimeout(() => view.classList.remove("lesson-module-transition"), 700);
        }

        // Banner overlay
        const overlay = document.createElement("div");
        overlay.className = "module-banner-overlay";
        overlay.innerHTML = `
            <div class="module-banner">
                <div class="module-banner-icon">${mod.icon || "&#127891;"}</div>
                <h2>Module ${mod.id}</h2>
                <p>${escapeHTML(mod.title)}</p>
            </div>
        `;
        document.body.appendChild(overlay);

        // Confetti burst
        spawnConfetti();

        // Fade out and remove
        setTimeout(() => {
            const banner = overlay.querySelector(".module-banner");
            if (banner) banner.classList.add("fade-out");
            setTimeout(() => overlay.remove(), 450);
        }, 1500);
    }

    function spawnConfetti() {
        const colors = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff6ec7", "#a66cff", "#00d2ff"];
        const count = 40;
        for (let i = 0; i < count; i++) {
            const el = document.createElement("div");
            el.className = "confetti-particle";
            const x = 50 + (Math.random() - 0.5) * 60; // spread around center
            const y = 45 + (Math.random() - 0.5) * 20;
            el.style.left = x + "vw";
            el.style.top = y + "vh";
            el.style.background = colors[Math.floor(Math.random() * colors.length)];
            el.style.width = (4 + Math.random() * 6) + "px";
            el.style.height = (4 + Math.random() * 6) + "px";
            el.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";

            const angle = Math.random() * Math.PI * 2;
            const dist = 80 + Math.random() * 200;
            const dx = Math.cos(angle) * dist;
            const dy = Math.sin(angle) * dist - 60;
            const rot = Math.random() * 720 - 360;
            const dur = 0.7 + Math.random() * 0.6;

            el.style.transition = `all ${dur}s cubic-bezier(0.22, 1, 0.36, 1)`;
            document.body.appendChild(el);

            // Trigger animation next frame
            requestAnimationFrame(() => {
                el.style.opacity = "1";
                requestAnimationFrame(() => {
                    el.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
                    el.style.opacity = "0";
                });
            });

            setTimeout(() => el.remove(), (dur + 0.2) * 1000);
        }
    }

    // =========================================================================
    //  PROJECTS VIEW
    // =========================================================================
    function renderProjectsView() {
        const view = $("#viewProjects");
        if (!view) return;

        let html = `
            <div class="projects-header">
                <div>
                    <h2>Projects</h2>
                    <p class="text-sm text-muted">Build real-world applications to practice your skills</p>
                </div>
                <div class="pills" id="project-filter-pills">
                    <button class="pill-item active" data-filter="all">All</button>
                    <button class="pill-item" data-filter="beginner">Beginner</button>
                    <button class="pill-item" data-filter="intermediate">Intermediate</button>
                </div>
            </div>
            <div class="projects-grid" id="projects-grid">
        `;

        if (allProjects.length === 0) {
            html += `<p class="text-muted" style="grid-column:1/-1;text-align:center;padding:40px;">No projects loaded.</p>`;
        }

        for (const proj of allProjects) {
            const saved = localStorage.getItem(`pylearn_project_${proj.id}_step`) || "0";
            const stepsDone = parseInt(saved, 10);
            const totalSteps = proj.steps ? proj.steps.length : 0;
            const pct = totalSteps > 0 ? Math.round((stepsDone / totalSteps) * 100) : 0;

            html += `
                <div class="project-card" data-project-id="${proj.id}" data-difficulty="${proj.difficulty}" style="cursor:pointer;">
                    <div class="project-card-header">
                        <div class="project-card-icon">${proj.icon || "&#128187;"}</div>
                        <div>
                            <div class="project-card-title">${escapeHTML(proj.title)}</div>
                            <div class="difficulty" data-level="${proj.difficulty}">
                                <div class="difficulty-dots">
                                    <div class="difficulty-dot"></div><div class="difficulty-dot"></div><div class="difficulty-dot"></div>
                                </div>
                                <span class="difficulty-label">${proj.difficulty}</span>
                            </div>
                        </div>
                    </div>
                    <p class="project-card-desc">${escapeHTML(proj.description)}</p>
                    <div class="project-card-footer">
                        ${pct > 0 ? `
                            <div class="progress-bar" style="flex:1;margin-right:12px;">
                                <div class="progress-bar-fill" style="width:${pct}%"></div>
                            </div>
                            <span class="text-xs text-muted">${pct}%</span>
                        ` : `
                            <span class="badge badge-info">Not Started</span>
                            <span class="text-xs text-muted">${totalSteps} steps</span>
                        `}
                    </div>
                    <div class="d-flex gap-4 mt-8" style="flex-wrap:wrap;">
                        ${(proj.skills || []).map(s => `<span class="chip">${escapeHTML(s)}</span>`).join("")}
                    </div>
                </div>
            `;
        }

        html += `</div>`;

        // Project detail view (hidden initially)
        html += `<div id="project-detail-view" style="display:none;"></div>`;

        view.innerHTML = html;

        // Wire filter pills
        $$("#project-filter-pills .pill-item", view).forEach(pill => {
            pill.addEventListener("click", () => {
                $$("#project-filter-pills .pill-item").forEach(p => p.classList.remove("active"));
                pill.classList.add("active");
                const filter = pill.dataset.filter;
                $$(".project-card", view).forEach(card => {
                    card.style.display = (filter === "all" || card.dataset.difficulty === filter) ? "" : "none";
                });
            });
        });

        // Wire project card clicks
        $$(".project-card", view).forEach(card => {
            card.addEventListener("click", () => {
                const projId = card.dataset.projectId;
                openProject(projId);
            });
        });
    }

    function openProject(projectId) {
        const proj = allProjects.find(p => p.id === projectId);
        if (!proj) return;
        currentProject = proj;
        const savedStep = parseInt(localStorage.getItem(`pylearn_project_${proj.id}_step`) || "0", 10);
        currentProjectStep = Math.min(savedStep, (proj.steps || []).length - 1);

        // Hide grid, show detail
        const grid = $("#projects-grid");
        const header = $(".projects-header");
        const detail = $("#project-detail-view");
        if (grid) grid.style.display = "none";
        if (header) header.style.display = "none";
        if (detail) detail.style.display = "block";

        renderProjectStep();
    }

    function renderProjectStep() {
        const detail = $("#project-detail-view");
        if (!detail || !currentProject) return;
        const proj = currentProject;
        const step = proj.steps[currentProjectStep];
        const totalSteps = proj.steps.length;

        let html = `
            <div style="margin-bottom:16px;">
                <button class="btn btn-sm btn-secondary" id="back-to-projects">&#8592; Back to Projects</button>
            </div>
            <div class="d-flex items-center gap-8 mb-8">
                <span class="badge badge-primary">${proj.icon || ""} ${escapeHTML(proj.title)}</span>
                <span class="badge" style="background:var(--bg-tertiary);color:var(--text-secondary);">Step ${currentProjectStep + 1} of ${totalSteps}</span>
            </div>
            <div class="progress-bar mb-16">
                <div class="progress-bar-fill" style="width:${Math.round(((currentProjectStep + 1) / totalSteps) * 100)}%"></div>
            </div>
        `;

        if (step) {
            html += `
                <h3>${escapeHTML(step.title)}</h3>
                <p style="color:var(--text-secondary);margin:8px 0 16px;">${escapeHTML(step.description)}</p>
                <div style="background:var(--bg-tertiary);border-radius:8px;padding:16px;margin-bottom:16px;">
                    <h4 style="margin-bottom:8px;">Instructions</h4>
                    <p style="white-space:pre-wrap;color:var(--text-secondary);font-size:0.875rem;">${escapeHTML(step.instructions)}</p>
                </div>
            `;

            // Hints
            if (step.hints && step.hints.length > 0) {
                html += `
                    <div class="challenge-hints" style="margin-bottom:16px;">
                        <button class="challenge-hint-toggle" id="project-hint-toggle">&#128161; Show Hints</button>
                        <div class="challenge-hint-content" id="project-hint-content">
                            ${step.hints.map((h, i) => `<p style="margin-bottom:4px;"><strong>Hint ${i + 1}:</strong> ${escapeHTML(h)}</p>`).join("")}
                        </div>
                    </div>
                `;
            }

            // Code editor for this step
            html += `
                <div class="code-editor-wrapper" style="border:1px solid var(--border-color);border-radius:8px;overflow:hidden;">
                    <div class="code-editor-toolbar">
                        <span class="file-name">project.py — Step ${currentProjectStep + 1}</span>
                        <div class="d-flex items-center gap-4">
                            <button class="btn btn-sm btn-secondary" id="project-reset-btn">Reset</button>
                            <button class="btn btn-sm btn-secondary" id="project-solution-btn">Solution</button>
                            <button class="btn btn-sm btn-primary" id="project-run-btn">&#9654; Run</button>
                        </div>
                    </div>
                    <div style="display:flex;flex-direction:row;">
                        <div class="code-line-numbers" id="project-line-numbers" style="min-width:40px;padding:12px 8px;text-align:right;"></div>
                        <textarea id="project-code-textarea" spellcheck="false" style="
                            flex:1;width:100%;min-height:200px;padding:12px 16px;
                            background:var(--code-bg);color:var(--code-text);border:none;outline:none;resize:vertical;
                            font-family:'JetBrains Mono',monospace;font-size:0.875rem;line-height:1.6;tab-size:${localStorage.getItem('pylearn_tabsize')||'4'};white-space:pre;
                        "></textarea>
                    </div>
                    <div class="code-output-panel" id="project-output-panel">
                        <div class="code-output-header"><span>&#9654;</span> Output</div>
                        <div class="code-output-body" id="project-output-body">Click Run to test your code.</div>
                    </div>
                </div>
            `;

            // Navigation
            html += `
                <div class="lesson-nav" style="margin-top:16px;">
                    <button class="btn btn-secondary" id="project-prev-step" ${currentProjectStep === 0 ? "disabled" : ""}>&larr; Previous Step</button>
                    <button class="btn btn-primary" id="project-next-step">${currentProjectStep === totalSteps - 1 ? "&#127942; Complete Project" : "Next Step &rarr;"}</button>
                </div>
            `;

            // Concepts
            if (step.concepts && step.concepts.length > 0) {
                html += `<div class="d-flex gap-4 mt-16" style="flex-wrap:wrap;">${step.concepts.map(c => `<span class="chip">${escapeHTML(c)}</span>`).join("")}</div>`;
            }
        }

        detail.innerHTML = html;

        // Load saved or starter code
        const ta = $("#project-code-textarea");
        const savedCode = localStorage.getItem(`pylearn_project_${proj.id}_code_${currentProjectStep}`);
        if (ta) {
            ta.value = savedCode || (step ? step.starterCode : "") || "";
            updateProjectLineNumbers();
            ta.addEventListener("input", updateProjectLineNumbers);
            ta.addEventListener("keydown", (e) => {
                if (e.key === "Tab") {
                    e.preventDefault();
                    const start = ta.selectionStart;
                    ta.value = ta.value.substring(0, start) + "    " + ta.value.substring(ta.selectionEnd);
                    ta.selectionStart = ta.selectionEnd = start + 4;
                }
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                    e.preventDefault();
                    runProjectCode();
                }
            });
        }

        // Wire buttons
        const backBtn = $("#back-to-projects");
        if (backBtn) backBtn.addEventListener("click", () => {
            currentProject = null;
            renderProjectsView();
        });

        const hintToggle = $("#project-hint-toggle");
        if (hintToggle) hintToggle.addEventListener("click", () => {
            const content = $("#project-hint-content");
            if (content) content.classList.toggle("visible");
        });

        const resetBtn = $("#project-reset-btn");
        if (resetBtn) resetBtn.addEventListener("click", () => {
            if (confirm("Reset to starter code?") && ta && step) {
                ta.value = step.starterCode || "";
                updateProjectLineNumbers();
            }
        });

        const solBtn = $("#project-solution-btn");
        if (solBtn) solBtn.addEventListener("click", () => {
            if (confirm("View the solution? Your code will be replaced.") && ta && step) {
                ta.value = step.solutionCode || "# No solution available";
                updateProjectLineNumbers();
            }
        });

        const runBtn = $("#project-run-btn");
        if (runBtn) runBtn.addEventListener("click", runProjectCode);

        const prevBtn = $("#project-prev-step");
        if (prevBtn) prevBtn.addEventListener("click", () => {
            saveProjectCode();
            if (currentProjectStep > 0) { currentProjectStep--; renderProjectStep(); }
        });

        const nextBtn = $("#project-next-step");
        if (nextBtn) nextBtn.addEventListener("click", () => {
            saveProjectCode();
            if (currentProjectStep < totalSteps - 1) {
                currentProjectStep++;
                // Save progress
                const saved = parseInt(localStorage.getItem(`pylearn_project_${proj.id}_step`) || "0", 10);
                if (currentProjectStep > saved) {
                    localStorage.setItem(`pylearn_project_${proj.id}_step`, String(currentProjectStep));
                }
                renderProjectStep();
            } else {
                localStorage.setItem(`pylearn_project_${proj.id}_step`, String(totalSteps));
                if (typeof showToast === "function") showToast("success", "Project Complete!", `You finished ${proj.title}!`);
                currentProject = null;
                renderProjectsView();
            }
        });

        // Refresh editor enhancements
        if (window.EditorEnhance) setTimeout(function() { window.EditorEnhance.refresh(); }, 50);
    }

    function updateProjectLineNumbers() {
        const ta = $("#project-code-textarea");
        const ln = $("#project-line-numbers");
        if (!ta || !ln) return;
        const count = (ta.value.match(/\n/g) || []).length + 1;
        let html = "";
        for (let i = 1; i <= Math.max(count, 10); i++) html += `<span class="line-number">${i}</span>`;
        ln.innerHTML = html;
    }

    function saveProjectCode() {
        const ta = $("#project-code-textarea");
        if (ta && currentProject) {
            localStorage.setItem(`pylearn_project_${currentProject.id}_code_${currentProjectStep}`, ta.value);
        }
    }

    async function runProjectCode() {
        if (!pyodideReady) { alert("Python is still loading..."); return; }
        const ta = $("#project-code-textarea");
        if (!ta) return;
        saveProjectCode();
        showOutputRunning();
        try {
            const result = await PyodideRunner.runCode(ta.value, { timeout: 10000 });
            showOutputResult(result);
        } catch (e) {
            showOutput(`<span class="output-error">${escapeHTML(e.message)}</span>`);
        }
    }

    // =========================================================================
    //  EXAMPLES VIEW
    // =========================================================================
    function renderExamplesView() {
        const view = $("#viewExamples");
        if (!view) return;

        // Build category list from modules
        const categories = ["All"];
        const catMap = {};
        for (const ex of codeExamples) {
            const mod = curriculum.modules.find(m => m.id === ex.moduleId);
            const catName = mod ? mod.title : `Module ${ex.moduleId}`;
            if (!catMap[catName]) {
                catMap[catName] = true;
                categories.push(catName);
            }
        }

        let html = `
            <h2 class="mb-8">Code Examples</h2>
            <p class="text-secondary mb-16">Browse and run curated Python examples for every concept.</p>
            <div class="examples-filter-bar">
                <div class="pills" id="examples-filter-pills">
                    ${categories.map(c => `<button class="pill-item ${c === "All" ? "active" : ""}" data-category="${c}">${escapeHTML(c)}</button>`).join("")}
                </div>
            </div>
            <div class="examples-list" id="examples-list">
        `;

        if (codeExamples.length === 0) {
            html += `<p class="text-muted" style="text-align:center;padding:40px;">No examples loaded.</p>`;
        }

        const icons = ["&#128221;", "&#128290;", "&#128218;", "&#128268;", "&#127963;", "&#128193;", "&#128736;", "&#128161;", "&#9889;", "&#127919;", "&#128640;", "&#128300;"];

        for (const ex of codeExamples) {
            const mod = curriculum.modules.find(m => m.id === ex.moduleId);
            const catName = mod ? mod.title : `Module ${ex.moduleId}`;
            const icon = icons[(ex.moduleId - 1) % icons.length];

            html += `
                <div class="example-item" data-example-id="${ex.id}" data-category="${catName}" style="cursor:pointer;">
                    <div class="example-item-icon">${icon}</div>
                    <div class="example-item-info">
                        <div class="example-item-title">${escapeHTML(ex.title)}</div>
                        <div class="example-item-desc">${escapeHTML(ex.description)}</div>
                    </div>
                    <div class="example-item-tags">
                        <span class="chip">${escapeHTML(catName)}</span>
                        ${(ex.concepts || []).slice(0, 2).map(c => `<span class="chip">${escapeHTML(c)}</span>`).join("")}
                    </div>
                </div>
            `;
        }

        html += `</div>`;

        // Example detail panel
        html += `<div id="example-detail" style="display:none;"></div>`;

        view.innerHTML = html;

        // Wire filter pills
        $$("#examples-filter-pills .pill-item", view).forEach(pill => {
            pill.addEventListener("click", () => {
                $$("#examples-filter-pills .pill-item").forEach(p => p.classList.remove("active"));
                pill.classList.add("active");
                const cat = pill.dataset.category;
                $$(".example-item", view).forEach(item => {
                    item.style.display = (cat === "All" || item.dataset.category === cat) ? "" : "none";
                });
                // Show list, hide detail
                const list = $("#examples-list");
                const detail = $("#example-detail");
                if (list) list.style.display = "";
                if (detail) detail.style.display = "none";
            });
        });

        // Wire example clicks
        $$(".example-item", view).forEach(item => {
            item.addEventListener("click", () => openExample(item.dataset.exampleId));
        });
    }

    function openExample(exampleId) {
        const ex = codeExamples.find(e => e.id === exampleId);
        if (!ex) return;

        const list = $("#examples-list");
        const detail = $("#example-detail");
        if (list) list.style.display = "none";
        if (detail) detail.style.display = "block";

        const mod = curriculum.modules.find(m => m.id === ex.moduleId);
        const catName = mod ? mod.title : `Module ${ex.moduleId}`;

        let html = `
            <button class="btn btn-sm btn-secondary mb-16" id="back-to-examples">&#8592; Back to Examples</button>
            <div class="d-flex items-center gap-8 mb-8">
                <span class="badge badge-primary">${escapeHTML(catName)}</span>
                ${(ex.concepts || []).map(c => `<span class="chip">${escapeHTML(c)}</span>`).join("")}
            </div>
            <h3>${escapeHTML(ex.title)}</h3>
            <p style="color:var(--text-secondary);margin:8px 0 16px;">${escapeHTML(ex.description)}</p>

            <div class="code-editor-wrapper" style="border:1px solid var(--border-color);border-radius:8px;overflow:hidden;">
                <div class="code-editor-toolbar">
                    <span class="file-name">example.py</span>
                    <div class="d-flex items-center gap-4">
                        <button class="btn btn-sm btn-secondary" id="example-copy-btn">Copy</button>
                        <button class="btn btn-sm btn-primary" id="example-run-btn">&#9654; Run</button>
                    </div>
                </div>
                <div style="display:flex;flex-direction:row;">
                    <div class="code-line-numbers" id="example-line-numbers" style="min-width:40px;padding:12px 8px;text-align:right;"></div>
                    <textarea id="example-code-textarea" spellcheck="false" style="
                        flex:1;width:100%;min-height:180px;padding:12px 16px;
                        background:var(--code-bg);color:var(--code-text);border:none;outline:none;resize:vertical;
                        font-family:'JetBrains Mono',monospace;font-size:0.875rem;line-height:1.6;tab-size:${localStorage.getItem('pylearn_tabsize')||'4'};white-space:pre;
                    ">${escapeHTML(ex.code)}</textarea>
                </div>
                <div class="code-output-panel">
                    <div class="code-output-header"><span>&#9654;</span> Output</div>
                    <div class="code-output-body" id="example-output-body">Click Run to see the output.</div>
                </div>
            </div>
        `;

        // Try it ideas
        if (ex.tryItIdeas && ex.tryItIdeas.length > 0) {
            html += `
                <div style="background:var(--bg-tertiary);border-radius:8px;padding:16px;margin-top:16px;">
                    <h4 style="margin-bottom:8px;">&#128161; Try It Yourself</h4>
                    <ul style="color:var(--text-secondary);font-size:0.875rem;">
                        ${ex.tryItIdeas.map(idea => `<li>${escapeHTML(idea)}</li>`).join("")}
                    </ul>
                </div>
            `;
        }

        detail.innerHTML = html;

        // Line numbers
        const ta = $("#example-code-textarea");
        const ln = $("#example-line-numbers");
        function updateExLn() {
            if (!ta || !ln) return;
            const count = (ta.value.match(/\n/g) || []).length + 1;
            let h = "";
            for (let i = 1; i <= Math.max(count, 8); i++) h += `<span class="line-number">${i}</span>`;
            ln.innerHTML = h;
        }
        updateExLn();
        if (ta) {
            ta.addEventListener("input", updateExLn);
            ta.addEventListener("keydown", (e) => {
                if (e.key === "Tab") {
                    e.preventDefault();
                    const start = ta.selectionStart;
                    ta.value = ta.value.substring(0, start) + "    " + ta.value.substring(ta.selectionEnd);
                    ta.selectionStart = ta.selectionEnd = start + 4;
                }
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                    e.preventDefault();
                    runExample();
                }
            });
        }

        // Wire buttons
        $("#back-to-examples").addEventListener("click", () => {
            const list = $("#examples-list");
            const det = $("#example-detail");
            if (list) list.style.display = "";
            if (det) det.style.display = "none";
        });

        $("#example-copy-btn").addEventListener("click", () => {
            if (ta) navigator.clipboard.writeText(ta.value).then(() => {
                if (typeof showToast === "function") showToast("success", "Copied!", "Code copied to clipboard.");
            });
        });

        $("#example-run-btn").addEventListener("click", runExample);

        async function runExample() {
            if (!pyodideReady) { alert("Python is still loading..."); return; }
            if (!ta) return;
            showOutputRunning();
            try {
                const result = await PyodideRunner.runCode(ta.value, { timeout: 10000 });
                showOutputResult(result);
            } catch (e) {
                showOutput(`<span class="output-error">${escapeHTML(e.message)}</span>`);
            }
        }

        // Refresh editor enhancements
        if (window.EditorEnhance) setTimeout(function() { window.EditorEnhance.refresh(); }, 50);
    }

    // =========================================================================
    //  CHALLENGE WORKSPACE (from original app.js — preserved fully)
    // =========================================================================
    function buildChallengeSidebar() {
        renderChallengeList();
    }

    function renderChallengeList() {
        const container = $(".challenge-instructions");
        if (!container) return;

        const groups = { beginner: [], intermediate: [], advanced: [] };
        for (const ch of challenges) {
            (groups[ch.difficulty] || groups.beginner).push(ch);
        }

        let html = `
            <div class="d-flex items-center gap-8 mb-12">
                <span class="badge badge-warning">Challenges</span>
                <span class="text-sm text-muted">${challenges.length} total</span>
            </div>
            <h3 id="challenge-title-heading">Select a Challenge</h3>
            <p class="text-sm text-muted mb-16" id="challenge-description">Choose from ${challenges.length} coding challenges across all difficulty levels.</p>
        `;

        html += `<div id="challenge-selector" style="max-height:60vh;overflow-y:auto;">`;
        for (const [level, challs] of Object.entries(groups)) {
            if (challs.length === 0) continue;
            html += `<div class="sidebar-section-label" style="margin-top:12px;padding-left:0;text-transform:capitalize;">${level} (${challs.length})</div>`;
            for (const ch of challs) {
                const rec = ProgressTracker.getChallengeRecord(ch.id);
                let statusIcon = "&#9679;", statusClass = "pending";
                if (rec && rec.completed) { statusIcon = "&#10004;"; statusClass = "passed"; }
                else if (rec) { statusClass = "failed"; }
                const score = rec ? rec.bestScore : 0;
                html += `
                    <div class="test-case ${statusClass} challenge-select-item" data-challenge-id="${ch.id}" style="cursor:pointer;transition:background 0.15s;">
                        <span class="test-case-icon">${statusIcon}</span>
                        <span style="flex:1;">${ch.title}</span>
                        ${rec ? `<span class="text-xs text-muted">${score}/100</span>` : ""}
                    </div>
                `;
            }
        }
        html += `</div>`;

        html += `
            <div id="challenge-detail" style="display:none;">
                <div class="d-flex items-center gap-8 mb-12">
                    <span class="badge badge-warning">Challenge</span>
                    <div class="difficulty" id="challenge-difficulty" data-level="beginner">
                        <div class="difficulty-dots"><div class="difficulty-dot"></div><div class="difficulty-dot"></div><div class="difficulty-dot"></div></div>
                        <span class="difficulty-label" id="challenge-difficulty-label">Beginner</span>
                    </div>
                </div>
                <h3 id="challenge-detail-title"></h3>
                <div id="challenge-detail-desc" style="white-space:pre-wrap;margin-top:8px;color:var(--text-secondary);font-size:0.875rem;line-height:1.6;"></div>
                <div class="challenge-hints" id="challenge-hints-section">
                    <button class="challenge-hint-toggle" id="btn-show-hint">&#128161; Show Hint</button>
                    <div class="challenge-hint-content" id="challenge-hint-content"></div>
                </div>
                <div class="challenge-tests mt-24"><h4 class="mb-8">Test Cases</h4><div id="test-case-list"></div></div>
                <div style="margin-top:16px;display:flex;gap:8px;">
                    <button class="btn btn-sm btn-secondary" id="btn-back-to-list">&#8592; Back</button>
                    <button class="btn btn-sm btn-secondary" id="btn-show-solution">Solution</button>
                </div>
            </div>
        `;

        container.innerHTML = html;

        $$(".challenge-select-item", container).forEach(el => {
            el.addEventListener("click", () => selectChallenge(el.dataset.challengeId));
        });
        const backBtn = $("#btn-back-to-list");
        if (backBtn) backBtn.addEventListener("click", showChallengeList);
        const solBtn = $("#btn-show-solution");
        if (solBtn) solBtn.addEventListener("click", () => {
            if (!currentChallenge) return;
            if (confirm("View the reference solution?")) setEditorCode(currentChallenge.solutionCode || "# No solution.");
        });
        const hintBtn = $("#btn-show-hint");
        if (hintBtn) hintBtn.addEventListener("click", () => {
            if (!currentChallenge) return;
            const hc = $("#challenge-hint-content");
            if (hc.classList.contains("visible")) { hc.classList.remove("visible"); return; }
            const hints = AnswerChecker.getRevealedHints(currentChallenge, attemptCount + 1);
            if (hints.length === 0) { hc.textContent = "No hints available."; }
            else {
                hc.innerHTML = hints.map((h, i) => `<p style="margin-bottom:6px;"><strong>Hint ${i + 1}:</strong> ${escapeHTML(h)}</p>`).join("");
                const total = currentChallenge.hints ? currentChallenge.hints.length : 0;
                if (hints.length < total) hc.innerHTML += `<p style="color:var(--text-muted);font-size:0.8rem;">(${total - hints.length} more after more attempts)</p>`;
            }
            hc.classList.add("visible");
        });
    }

    function showChallengeList() { currentChallenge = null; stopTimer(); renderChallengeList(); }

    function selectChallenge(id) {
        const ch = challenges.find(c => c.id === id);
        if (!ch) return;
        currentChallenge = ch;
        attemptCount = 0;

        const sel = $("#challenge-selector"), det = $("#challenge-detail");
        const titleH = $("#challenge-title-heading"), descP = $("#challenge-description");
        if (sel) sel.style.display = "none";
        if (titleH) titleH.style.display = "none";
        if (descP) descP.style.display = "none";
        if (det) det.style.display = "block";

        $("#challenge-detail-title").textContent = ch.title;
        $("#challenge-detail-desc").textContent = ch.description;
        const diffEl = $("#challenge-difficulty");
        if (diffEl) diffEl.setAttribute("data-level", ch.difficulty);
        $("#challenge-difficulty-label").textContent = ch.difficulty.charAt(0).toUpperCase() + ch.difficulty.slice(1);

        const tcList = $("#test-case-list");
        if (tcList) {
            tcList.innerHTML = ch.testCases.filter(tc => !tc.hidden).map((tc, i) => `
                <div class="test-case pending" data-tc-index="${i}">
                    <span class="test-case-icon">&#9679;</span>
                    <span>${escapeHTML(tc.description || `Test ${i + 1}`)}</span>
                </div>
            `).join("");
            const hidden = ch.testCases.filter(tc => tc.hidden).length;
            if (hidden > 0) tcList.innerHTML += `<div class="test-case pending"><span class="test-case-icon">&#128274;</span><span style="color:var(--text-muted);">${hidden} hidden test(s)</span></div>`;
        }

        const hc = $("#challenge-hint-content");
        if (hc) hc.classList.remove("visible");

        const savedCode = ProgressTracker.getLastCode(ch.id);
        setEditorCode(savedCode || ch.starterCode || "");
        setOutputContent("Click Run to test your code.");
        resetTimer(); startTimer(); enableRunButton();
    }

    // -------------------------------------------------------------------------
    // Code Editor
    // -------------------------------------------------------------------------
    function getEditorTextarea() {
        let ta = $("#code-textarea");
        if (ta) return ta;
        const codeContent = $(".code-content");
        if (!codeContent) return null;

        ta = document.createElement("textarea");
        ta.id = "code-textarea";
        ta.spellcheck = false;
        ta.autocomplete = "off";
        ta.style.cssText = `flex:1;width:100%;height:100%;padding:12px 16px;background:var(--code-bg);color:var(--code-text);border:none;outline:none;resize:none;font-family:'JetBrains Mono',monospace;font-size:0.875rem;line-height:1.6;tab-size:${localStorage.getItem('pylearn_tabsize')||'4'};white-space:pre;overflow:auto;`;
        ta.addEventListener("keydown", (e) => {
            if (e.key === "Tab") {
                e.preventDefault();
                const tabN = parseInt(localStorage.getItem('pylearn_tabsize') || '4', 10);
                const spaces = ' '.repeat(tabN);
                const start = ta.selectionStart;
                ta.value = ta.value.substring(0, start) + spaces + ta.value.substring(ta.selectionEnd);
                ta.selectionStart = ta.selectionEnd = start + tabN;
                updateLineNumbers(ta);
            }
        });
        ta.addEventListener("input", () => updateLineNumbers(ta));
        ta.addEventListener("scroll", () => { const ln = $(".code-line-numbers"); if (ln) ln.scrollTop = ta.scrollTop; });
        ta.addEventListener("keydown", (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); runAndEvaluate(); }
        });
        codeContent.replaceWith(ta);
        const ed = $(".code-editor");
        if (ed) { ed.style.display = "flex"; ed.style.flexDirection = "row"; }
        return ta;
    }

    function setEditorCode(code) { const ta = getEditorTextarea(); if (ta) { ta.value = code; updateLineNumbers(ta); } }
    function getEditorCode() { const ta = getEditorTextarea(); return ta ? ta.value : ""; }
    function updateLineNumbers(ta) {
        const ln = $(".code-line-numbers");
        if (!ln) return;
        const count = (ta.value.match(/\n/g) || []).length + 1;
        let html = "";
        for (let i = 1; i <= Math.max(count, 12); i++) html += `<span class="line-number">${i}</span>`;
        ln.innerHTML = html;
    }
    function setOutputContent(html) {
        // Write to inline challenge output panel
        const b = $(".code-output-body"); if (b) b.innerHTML = html;
        // Also write to global output drawer
        showOutput(html);
    }

    // -------------------------------------------------------------------------
    // Run & Evaluate
    // -------------------------------------------------------------------------
    async function runAndEvaluate() {
        if (!currentChallenge || !pyodideReady) return;
        const code = getEditorCode();
        const runBtn = $(".run-btn");
        if (runBtn) { runBtn.disabled = true; runBtn.innerHTML = "&#9654; Running..."; }
        attemptCount += 1;

        try {
            const result = await AnswerChecker.evaluateCode(code, currentChallenge);
            ProgressTracker.recordAttempt(currentChallenge.id, result, timerSeconds, code, currentChallenge.difficulty);
            // Gamification hooks
            if (typeof Gamification !== "undefined") {
                Gamification.recordActivity();
                Gamification.trackSpeedDemon(timerSeconds);
                Gamification.checkAchievements();
            }
            renderOutputResults(result);
            updateTestCaseIcons(result);

            if (result.passed) {
                if (typeof showToast === "function") showToast("success", "Challenge Passed!", `Score: ${result.score}/100`);
                checkNewBadges(ProgressTracker.getSnapshot());
            } else {
                if (typeof showToast === "function") showToast("warning", "Not Quite", `${result.score}/100 — Review output below.`);
            }
            renderChallengeListStatusOnly();
            refreshDashboard();
            refreshProgressView();
        } catch (err) {
            setOutputContent(`<span class="output-error">Error: ${escapeHTML(err.message)}</span>`);
        } finally {
            if (runBtn) { runBtn.disabled = false; runBtn.innerHTML = "&#9654; Run"; }
        }
    }

    function renderOutputResults(result) {
        let html = "";
        if (result.testResults && result.testResults.results.length > 0) {
            html += `<span style="color:var(--accent-primary);font-weight:600;">${result.testResults.summary}</span>\n\n`;
            for (const tr of result.testResults.results) {
                if (tr.passed) {
                    html += `<span class="output-success">&#10004; ${escapeHTML(tr.description)}</span>\n`;
                } else {
                    html += `<span class="output-error">&#10008; ${escapeHTML(tr.description)}</span>\n`;
                    if (tr.error) html += `<span class="output-error">  ${escapeHTML(tr.error.split("\n").pop())}</span>\n`;
                    else if (!tr.hidden) { html += `<span style="color:var(--text-muted);">  Expected: ${escapeHTML(tr.expectedOutput)}</span>\n<span style="color:var(--text-muted);">  Got:      ${escapeHTML(tr.actualOutput)}</span>\n`; }
                    else html += `<span style="color:var(--text-muted);">  (hidden test)</span>\n`;
                }
            }
            html += "\n";
        }
        if (result.structureResults) {
            const unmet = result.structureResults.details.filter(d => !d.passed);
            if (unmet.length > 0) { html += `<span style="color:var(--warning);">Requirements:</span>\n`; unmet.forEach(d => { html += `<span style="color:var(--warning);">  - ${escapeHTML(d.message)}</span>\n`; }); html += "\n"; }
        }
        if (result.errorAnalysis && result.errorAnalysis.detected) {
            html += `<span class="output-error">--- Error Analysis ---</span>\n`;
            for (const e of result.errorAnalysis.errors) {
                html += `<span class="output-error">${escapeHTML(e.title)}${e.line ? ` (line ${e.line})` : ""}:</span>\n<span style="color:var(--text-secondary);">  ${escapeHTML(e.explanation)}</span>\n`;
                if (e.suggestion) html += `<span style="color:var(--warning);">  Tip: ${escapeHTML(e.suggestion)}</span>\n`;
                html += "\n";
            }
        }
        if (result.qualityResults) {
            const issues = result.qualityResults.details.filter(d => !d.passed);
            if (issues.length > 0) { html += `<span style="color:var(--text-muted);">--- Style ---</span>\n`; issues.forEach(d => { html += `<span style="color:var(--text-muted);">  - ${escapeHTML(d.message)}</span>\n`; }); html += "\n"; }
        }
        html += `\n<span style="color:var(--text-secondary);font-weight:600;">Score: ${result.score}/100</span>`;
        if (result.passed) html += `  <span class="output-success">PASSED</span>`;
        html += `\n<span style="color:var(--text-muted);">Time: ${result.executionTime}ms</span>`;
        setOutputContent(html);
    }

    function updateTestCaseIcons(result) {
        if (!result.testResults) return;
        const visible = result.testResults.results.filter((_, i) => { const tc = currentChallenge.testCases[i]; return tc && !tc.hidden; });
        const els = $$("#test-case-list .test-case[data-tc-index]");
        for (let i = 0; i < els.length && i < visible.length; i++) {
            els[i].className = `test-case ${visible[i].passed ? "passed" : "failed"}`;
            els[i].querySelector(".test-case-icon").innerHTML = visible[i].passed ? "&#10004;" : "&#10008;";
        }
    }

    function renderChallengeListStatusOnly() {
        $$(".challenge-select-item").forEach(el => {
            const rec = ProgressTracker.getChallengeRecord(el.dataset.challengeId);
            if (rec && rec.completed) { el.className = el.className.replace(/pending|failed/, "passed"); el.querySelector(".test-case-icon").innerHTML = "&#10004;"; }
        });
    }

    function enableRunButton() {
        const btn = $(".run-btn"); if (!btn) return;
        const nb = btn.cloneNode(true); btn.parentNode.replaceChild(nb, btn);
        nb.addEventListener("click", runAndEvaluate);
    }
    function wireResetButton() {
        const btn = $(".code-editor-toolbar .btn-secondary"); if (!btn) return;
        const nb = btn.cloneNode(true); btn.parentNode.replaceChild(nb, btn);
        nb.addEventListener("click", () => { if (currentChallenge && confirm("Reset?")) setEditorCode(currentChallenge.starterCode || ""); });
    }

    // -------------------------------------------------------------------------
    // Timer
    // -------------------------------------------------------------------------
    function startTimer() { stopTimer(); timerSeconds = 0; timerInterval = setInterval(() => timerSeconds++, 1000); }
    function stopTimer() { if (timerInterval) clearInterval(timerInterval); timerInterval = null; }
    function resetTimer() { stopTimer(); timerSeconds = 0; }

    // =========================================================================
    //  DASHBOARD
    // =========================================================================
    function refreshDashboard() {
        const snap = ProgressTracker.getSnapshot();
        const lessonsViewed = getTotalLessonsViewed();
        const statValues = $$(".dashboard-stat-value");
        if (statValues.length >= 4) {
            statValues[0].textContent = lessonsViewed;
            statValues[1].textContent = snap.streak.current;
            const xp = (snap.completedCount * 100) + (lessonsViewed * 25);
            statValues[2].textContent = xp.toLocaleString();
            const hrs = Math.floor(snap.totalTimeSeconds / 3600);
            statValues[3].textContent = hrs > 0 ? `${hrs}h` : `${Math.floor(snap.totalTimeSeconds / 60)}m`;
        }

        const greetEl = $("#dashGreeting");
        if (greetEl) {
            greetEl.textContent = snap.streak.current > 0
                ? `Continue your Python journey. You're on a ${snap.streak.current}-day streak!`
                : "Start your Python journey today!";
        }
        $$(".streak-count").forEach(el => { el.textContent = snap.streak.current; });
        $$(".footer-stat-value").forEach((el, i) => {
            if (i === 0) el.textContent = snap.streak.current;
            if (i === 1) el.textContent = (snap.completedCount * 100).toLocaleString();
            if (i === 2) el.textContent = snap.completedCount;
        });

        // Update user level display
        const level = Math.floor(snap.completedCount / 3) + 1;
        const xp = snap.completedCount * 100;
        $$(".sidebar-user-level").forEach(el => { el.textContent = `Level ${level} \u00b7 ${xp.toLocaleString()} XP`; });

        // Continue Learning
        const recent = ProgressTracker.getRecentActivity(3);
        const contSection = $(".dashboard-continue-section");
        if (contSection) {
            if (recent.length > 0) {
                const cards = $$(".continue-card", contSection);
                cards.forEach((card, i) => {
                    if (i < recent.length) {
                        const rec = recent[i];
                        const ch = challenges.find(c => c.id === rec.id);
                        card.style.display = "";
                        const h4 = $("h4", card);
                        const p = $("p", card);
                        const fill = $(".progress-bar-fill", card);
                        if (ch) {
                            if (h4) h4.textContent = ch.title;
                            if (p) p.textContent = `${ch.difficulty} | Score: ${rec.bestScore}/100 | ${rec.attempts} attempt(s)`;
                            if (fill) fill.style.width = rec.bestScore + "%";
                        }
                    } else {
                        card.style.display = "none";
                    }
                });
            } else {
                $$(".continue-card", contSection).forEach(c => c.style.display = "none");
                const existing = $(".continue-empty", contSection);
                if (!existing) {
                    const msg = document.createElement("p");
                    msg.className = "text-muted continue-empty";
                    msg.textContent = "Complete a challenge to see your progress here!";
                    contSection.appendChild(msg);
                } else {
                    existing.style.display = "";
                }
            }
        }

        // Recent Activity
        const actSection = $(".dashboard-activity-section");
        if (actSection) {
            const actCard = $(".card", actSection);
            if (actCard) {
                if (recent.length > 0) {
                    actCard.innerHTML = recent.map(rec => {
                        const ch = challenges.find(c => c.id === rec.id);
                        const name = ch ? ch.title : rec.id;
                        const dot = rec.completed ? "completed" : "started";
                        const label = rec.completed ? "Completed" : "Attempted";
                        return `<div class="activity-item">
                            <div class="activity-dot ${dot}"></div>
                            <span>${label} <strong>${escapeHTML(name)}</strong></span>
                            <span class="activity-time">Score: ${rec.bestScore}%</span>
                        </div>`;
                    }).join("");
                } else {
                    actCard.innerHTML = `<p class="text-muted" style="padding:12px;">No activity yet. Start a challenge to build your history!</p>`;
                }
            }
        }
    }

    // =========================================================================
    //  PROGRESS VIEW
    // =========================================================================
    function refreshProgressView() {
        const snap = ProgressTracker.getSnapshot();
        const totalChallenges = challenges.length;
        const lessonsViewed = getTotalLessonsViewed();
        const totalLessonsAll = getTotalLessons();

        // Overall: combine lessons + challenges
        const totalItems = totalLessonsAll + totalChallenges;
        const doneItems = lessonsViewed + snap.completedCount;
        const overallPct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

        const progressValues = $$(".progress-value");
        const progressFills = $$(".progress-circle-fill");

        // Overall completion circle
        if (progressValues.length > 0) progressValues[0].textContent = overallPct + "%";
        if (progressFills.length > 0) progressFills[0].setAttribute("stroke-dashoffset", 220 - (220 * overallPct / 100));

        // Challenges circle
        const challengePct = totalChallenges > 0 ? Math.round((snap.completedCount / totalChallenges) * 100) : 0;
        if (progressValues.length > 1) progressValues[1].textContent = challengePct + "%";
        if (progressFills.length > 1) progressFills[1].setAttribute("stroke-dashoffset", 220 - (220 * challengePct / 100));

        // Projects circle
        const totalProj = allProjects.length;
        let completedProj = 0;
        for (const p of allProjects) {
            const saved = parseInt(localStorage.getItem(`pylearn_project_${p.id}_step`) || "0", 10);
            if (saved >= (p.steps ? p.steps.length : 0) && saved > 0) completedProj++;
        }
        const projPct = totalProj > 0 ? Math.round((completedProj / totalProj) * 100) : 0;
        if (progressValues.length > 2) progressValues[2].textContent = projPct + "%";
        if (progressFills.length > 2) progressFills[2].setAttribute("stroke-dashoffset", 220 - (220 * projPct / 100));

        // Update progress text
        $$(".progress-overview-card p").forEach((el, i) => {
            if (i === 0) el.textContent = `${lessonsViewed} of ${totalLessonsAll} lessons · ${snap.completedCount} of ${totalChallenges} challenges`;
            if (i === 1) el.textContent = `${snap.completedCount} of ${totalChallenges} solved`;
            if (i === 2) el.textContent = `${completedProj} of ${totalProj} completed`;
        });

        // Skill bars — per-module combined progress (lessons + challenges)
        const skillItems = $$(".skill-bar-item");
        curriculum.modules.forEach((mod, i) => {
            if (i >= skillItems.length) return;
            const p = Math.round(getModulePct(mod) * 100);
            const lbl = $(".skill-bar-label", skillItems[i]);
            const val = $(".skill-bar-value", skillItems[i]);
            const fill = $(".progress-bar-fill", skillItems[i]);
            if (lbl) lbl.textContent = mod.title;
            if (val) val.textContent = p + "%";
            if (fill) fill.style.width = p + "%";
        });

        // Gamification: render badges and heatmap
        if (typeof Gamification !== "undefined") {
            var bc = document.getElementById("gamification-badges-container");
            if (bc) bc.innerHTML = Gamification.renderBadgesPanel();
            var hc = document.getElementById("gamification-heatmap-container");
            if (hc) hc.innerHTML = Gamification.renderHeatmap(3);
        }
        // Export buttons
        var exportBtn = document.getElementById("exportReportBtn");
        if (exportBtn) exportBtn.onclick = function() { if (typeof ExportSystem !== "undefined") ExportSystem.exportReport(); };
        var printBtn = document.getElementById("printReportBtn");
        if (printBtn) printBtn.onclick = function() { if (typeof ExportSystem !== "undefined") ExportSystem.printReport(); };
    }

    // =========================================================================
    //  BADGES / ACHIEVEMENTS
    // =========================================================================
    function checkNewBadges(snap) {
        const prev = sessionStorage.getItem("_prevBadges") || "";
        const current = snap.earnedBadges.map(b => b.id).join(",");
        if (prev && current !== prev) {
            const prevSet = new Set(prev.split(","));
            const newBadges = snap.earnedBadges.filter(b => !prevSet.has(b.id));
            for (const badge of newBadges) {
                const popup = $("#achievementPopup");
                if (popup) {
                    const h3 = $("h3", popup);
                    const p = $("p", popup);
                    if (h3) h3.textContent = badge.title;
                    if (p) p.textContent = badge.description;
                    popup.classList.add("active");
                    setTimeout(() => popup.classList.remove("active"), 5000);
                }
            }
        }
        sessionStorage.setItem("_prevBadges", current);
    }

    // Init badge state
    const snap = ProgressTracker.getSnapshot();
    sessionStorage.setItem("_prevBadges", snap.earnedBadges.map(b => b.id).join(","));

    // Init challenge view if active
    if ($(".view-challenge.active")) { buildChallengeSidebar(); wireResetButton(); }

    // =========================================================================
    //  UTILITY
    // =========================================================================
    function escapeHTML(s) {
        if (!s) return "";
        const div = document.createElement("div");
        div.textContent = s;
        return div.innerHTML;
    }

    // Shared reset logic — opens the confirm modal
    function doResetProgress() {
        const overlay = $("#resetConfirmOverlay");
        const input = $("#resetConfirmInput");
        const err = $("#resetConfirmError");
        if (!overlay || !input) return;
        input.value = "";
        if (err) err.style.display = "none";
        overlay.classList.add("active");
        setTimeout(() => input.focus(), 100);
    }

    // Wire both reset buttons
    const resetBtn = $("#resetProgressBtn");
    if (resetBtn) resetBtn.addEventListener("click", doResetProgress);
    const settingsResetBtn = $("#settingsResetBtn");
    if (settingsResetBtn) settingsResetBtn.addEventListener("click", doResetProgress);

    // Confirm modal — execute reset
    const resetConfirmBtn = $("#resetConfirmBtn");
    if (resetConfirmBtn) {
        resetConfirmBtn.addEventListener("click", () => {
            const input = $("#resetConfirmInput");
            const err = $("#resetConfirmError");
            if (!input) return;
            if (input.value.trim() !== "DELETE MY PROGRESS") {
                if (err) { err.textContent = 'Please type "DELETE MY PROGRESS" exactly.'; err.style.display = "block"; }
                input.focus();
                return;
            }
            // Wipe everything
            ProgressTracker.resetAll();
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k && k.startsWith("pylearn_")) keysToRemove.push(k);
            }
            keysToRemove.forEach(k => localStorage.removeItem(k));
            // Reset lesson position
            currentModuleIndex = 0;
            currentLessonIndex = 0;
            refreshProgressView();
            refreshDashboard();
            buildSidebarModules();
            renderLessonView();
            // Close all modals
            $("#resetConfirmOverlay").classList.remove("active");
            const settingsOv = document.getElementById("settingsOverlay");
            if (settingsOv) settingsOv.classList.remove("active");
            if (typeof showToast === "function") showToast("success", "Progress Reset", "All progress has been cleared. Fresh start!");
        });
    }
    const resetCancelBtn = $("#resetCancelBtn");
    if (resetCancelBtn) {
        resetCancelBtn.addEventListener("click", () => {
            $("#resetConfirmOverlay").classList.remove("active");
        });
    }
    const resetConfirmOverlay = $("#resetConfirmOverlay");
    if (resetConfirmOverlay) {
        resetConfirmOverlay.addEventListener("click", (e) => {
            if (e.target === resetConfirmOverlay) resetConfirmOverlay.classList.remove("active");
        });
    }

    // Remove the demo toasts from the inline script (only show on first visit)
    if (!localStorage.getItem("pylearn_visited")) {
        localStorage.setItem("pylearn_visited", "1");
        setTimeout(() => {
            if (typeof showToast === "function") showToast("success", "Welcome to PyLearn!", "Start with Module 1 in the Lessons tab.");
        }, 2000);
    }

    // Initialize quiz system
    if (typeof QuizSystem !== "undefined") QuizSystem.init();

    // =========================================================================
    //  SEARCH BRIDGE — allows search.js to navigate to specific items
    // =========================================================================
    window._searchSetLesson = function (moduleIdx, lessonIdx) {
        currentModuleIndex = moduleIdx;
        currentLessonIndex = lessonIdx;
    };
    window._searchSelectChallenge = function (id) {
        if (typeof buildChallengeSidebar === "function") buildChallengeSidebar();
        if (typeof selectChallenge === "function") selectChallenge(id);
    };
    window._searchOpenExample = function (id) {
        if (typeof renderExamplesView === "function") renderExamplesView();
        if (typeof openExample === "function") openExample(id);
    };
    window._searchOpenProject = function (id) {
        if (typeof renderProjectsView === "function") renderProjectsView();
    };

})();
