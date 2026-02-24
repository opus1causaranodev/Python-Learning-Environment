// =============================================================================
// Gamification — Achievements, difficulty ratings, activity heatmap
// =============================================================================
// Self-contained IIFE that exposes window.Gamification.
// Depends on: ProgressTracker, CHALLENGES, CURRICULUM (all optional at init
// time — the module degrades gracefully if they are not yet loaded).
// =============================================================================

window.Gamification = (function () {
    "use strict";

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];

    function _getCurriculum() {
        return (typeof CURRICULUM !== "undefined") ? CURRICULUM : { modules: [] };
    }

    function _getChallenges() {
        return (typeof CHALLENGES !== "undefined") ? CHALLENGES : [];
    }

    function _getTotalLessonsViewed() {
        let total = 0;
        for (const mod of _getCurriculum().modules) {
            if (!mod.lessons) continue;
            for (let i = 0; i < mod.lessons.length; i++) {
                if (localStorage.getItem("pylearn_lesson_" + mod.id + "_" + i)) total++;
            }
        }
        return total;
    }

    function _getTotalLessons() {
        let total = 0;
        for (const mod of _getCurriculum().modules) {
            if (mod.lessons) total += mod.lessons.length;
        }
        return total;
    }

    function _allLessonsViewedInModule(moduleId) {
        const mod = _getCurriculum().modules.find(function (m) { return m.id === moduleId; });
        if (!mod || !mod.lessons || mod.lessons.length === 0) return false;
        for (let i = 0; i < mod.lessons.length; i++) {
            if (!localStorage.getItem("pylearn_lesson_" + mod.id + "_" + i)) return false;
        }
        return true;
    }

    function _dateStr(d) {
        return d.toISOString().slice(0, 10);
    }

    // =========================================================================
    //  1. ACHIEVEMENT BADGES SYSTEM
    // =========================================================================

    const STORAGE_KEY_ACHIEVEMENTS = "pylearn_achievements";

    // Each badge definition
    var BADGES = [
        // --- Learning Milestones ---
        {
            id: "first_lesson",
            name: "First Steps",
            icon: "\uD83D\uDC63",       // footprints
            description: "View your first lesson.",
            condition: function () { return _getTotalLessonsViewed() >= 1; },
        },
        {
            id: "curious_mind",
            name: "Curious Mind",
            icon: "\uD83E\uDDE0",       // brain
            description: "View 10 lessons.",
            condition: function () { return _getTotalLessonsViewed() >= 10; },
        },
        {
            id: "scholar",
            name: "Scholar",
            icon: "\uD83C\uDF93",       // graduation cap
            description: "View 25 lessons.",
            condition: function () { return _getTotalLessonsViewed() >= 25; },
        },
        {
            id: "module_master",
            name: "Module Master",
            icon: "\uD83C\uDFC5",       // medal
            description: "Complete all lessons in any module.",
            condition: function () {
                return _getCurriculum().modules.some(function (m) {
                    return _allLessonsViewedInModule(m.id);
                });
            },
        },
        {
            id: "completionist",
            name: "Completionist",
            icon: "\uD83D\uDCDA",       // books
            description: "View all lessons across all modules.",
            condition: function () {
                var total = _getTotalLessons();
                return total > 0 && _getTotalLessonsViewed() >= total;
            },
        },

        // --- Challenge Milestones ---
        {
            id: "challenge_accepted",
            name: "Challenge Accepted",
            icon: "\u2694\uFE0F",        // crossed swords
            description: "Complete your first challenge.",
            condition: function () {
                var snap = ProgressTracker.getSnapshot();
                return snap.completedCount >= 1;
            },
        },
        {
            id: "problem_solver",
            name: "Problem Solver",
            icon: "\uD83E\uDDE9",       // puzzle piece
            description: "Complete 5 challenges.",
            condition: function () {
                var snap = ProgressTracker.getSnapshot();
                return snap.completedCount >= 5;
            },
        },
        {
            id: "code_warrior",
            name: "Code Warrior",
            icon: "\uD83D\uDDE1\uFE0F", // dagger
            description: "Complete 15 challenges.",
            condition: function () {
                var snap = ProgressTracker.getSnapshot();
                return snap.completedCount >= 15;
            },
        },
        {
            id: "perfect_score",
            name: "Perfect Score",
            icon: "\uD83D\uDCAF",       // 100
            description: "Get 100% on any challenge.",
            condition: function () {
                var snap = ProgressTracker.getSnapshot();
                var recs = Object.values(snap.challenges);
                return recs.some(function (r) { return r.bestScore === 100; });
            },
        },
        {
            id: "perfectionist",
            name: "Perfectionist",
            icon: "\uD83C\uDFC6",       // trophy
            description: "Get 100% on 5 challenges.",
            condition: function () {
                var snap = ProgressTracker.getSnapshot();
                var count = Object.values(snap.challenges).filter(function (r) { return r.bestScore === 100; }).length;
                return count >= 5;
            },
        },

        // --- Streak & Dedication ---
        {
            id: "getting_started",
            name: "Getting Started",
            icon: "\uD83D\uDD25",       // fire
            description: "Use the app for 3 days.",
            condition: function () {
                var activity = _loadDailyActivity();
                return Object.keys(activity).length >= 3;
            },
        },
        {
            id: "dedicated_learner",
            name: "Dedicated Learner",
            icon: "\uD83D\uDCC6",       // calendar
            description: "Maintain a 7-day streak.",
            condition: function () {
                var streaks = _calculateStreaks();
                return streaks.longest >= 7;
            },
        },
        {
            id: "unstoppable",
            name: "Unstoppable",
            icon: "\uD83D\uDE80",       // rocket
            description: "Maintain a 14-day streak.",
            condition: function () {
                var streaks = _calculateStreaks();
                return streaks.longest >= 14;
            },
        },

        // --- Special ---
        {
            id: "night_owl",
            name: "Night Owl",
            icon: "\uD83E\uDD89",       // owl
            description: "Study after 10 PM.",
            condition: function () {
                var data = _loadAchievementData();
                return !!data._nightOwl;
            },
        },
        {
            id: "early_bird",
            name: "Early Bird",
            icon: "\uD83D\uDC26",       // bird
            description: "Study before 7 AM.",
            condition: function () {
                var data = _loadAchievementData();
                return !!data._earlyBird;
            },
        },
        {
            id: "speed_demon",
            name: "Speed Demon",
            icon: "\u26A1",             // lightning
            description: "Complete a challenge in under 30 seconds.",
            condition: function () {
                var data = _loadAchievementData();
                return !!data._speedDemon;
            },
        },
        {
            id: "explorer",
            name: "Explorer",
            icon: "\uD83E\uDDED",       // compass
            description: "Visit all 6 views.",
            condition: function () {
                var data = _loadAchievementData();
                var visited = data._viewsVisited || [];
                var required = ["dashboard", "lesson", "challenge", "projects", "examples", "progress"];
                return required.every(function (v) { return visited.indexOf(v) !== -1; });
            },
        },
    ];

    // -------------------------------------------------------------------------
    // Achievement persistence
    // -------------------------------------------------------------------------

    function _loadAchievementData() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
            if (!raw) return { unlocked: {}, _nightOwl: false, _earlyBird: false, _speedDemon: false, _viewsVisited: [] };
            return JSON.parse(raw);
        } catch (e) {
            return { unlocked: {}, _nightOwl: false, _earlyBird: false, _speedDemon: false, _viewsVisited: [] };
        }
    }

    function _saveAchievementData(data) {
        try {
            localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(data));
        } catch (e) {
            // silently fail
        }
    }

    // -------------------------------------------------------------------------
    // Track special conditions
    // -------------------------------------------------------------------------

    function _trackTimeOfDay() {
        var hour = new Date().getHours();
        var data = _loadAchievementData();
        if (hour >= 22 || hour < 5) data._nightOwl = true;
        if (hour >= 4 && hour < 7) data._earlyBird = true;
        _saveAchievementData(data);
    }

    function trackSpeedDemon(seconds) {
        if (seconds < 30) {
            var data = _loadAchievementData();
            data._speedDemon = true;
            _saveAchievementData(data);
        }
    }

    function trackViewVisit(viewName) {
        var data = _loadAchievementData();
        if (!data._viewsVisited) data._viewsVisited = [];
        if (data._viewsVisited.indexOf(viewName) === -1) {
            data._viewsVisited.push(viewName);
            _saveAchievementData(data);
        }
    }

    // -------------------------------------------------------------------------
    // Check & unlock achievements
    // -------------------------------------------------------------------------

    function checkAchievements() {
        _trackTimeOfDay();
        var data = _loadAchievementData();
        if (!data.unlocked) data.unlocked = {};
        var newlyUnlocked = [];

        for (var i = 0; i < BADGES.length; i++) {
            var badge = BADGES[i];
            if (data.unlocked[badge.id]) continue;
            try {
                if (badge.condition()) {
                    data.unlocked[badge.id] = new Date().toISOString();
                    newlyUnlocked.push(badge);
                }
            } catch (e) {
                // condition failed, skip
            }
        }

        _saveAchievementData(data);

        // Show popups for newly unlocked badges
        for (var j = 0; j < newlyUnlocked.length; j++) {
            _showAchievementPopup(newlyUnlocked[j]);
        }

        return newlyUnlocked;
    }

    function _showAchievementPopup(badge) {
        var popup = $("#achievementPopup");
        if (!popup) return;

        var iconEl = $(".achievement-icon", popup);
        var h3 = $("h3", popup);
        var p = $("p", popup);

        if (iconEl) iconEl.textContent = badge.icon;
        if (h3) h3.textContent = badge.name;
        if (p) p.textContent = badge.description;

        popup.classList.remove("active");
        // Force reflow so re-adding .active triggers animation
        void popup.offsetWidth;
        popup.classList.add("active");

        setTimeout(function () {
            popup.classList.remove("active");
        }, 5000);
    }

    function getAchievements() {
        var data = _loadAchievementData();
        if (!data.unlocked) data.unlocked = {};

        return BADGES.map(function (badge) {
            var unlocked = !!data.unlocked[badge.id];
            return {
                id: badge.id,
                name: badge.name,
                icon: badge.icon,
                description: badge.description,
                unlocked: unlocked,
                unlockedAt: unlocked ? data.unlocked[badge.id] : null,
            };
        });
    }

    function renderBadgesPanel() {
        var badges = getAchievements();
        var unlockedCount = badges.filter(function (b) { return b.unlocked; }).length;

        var html = '<div class="gamification-badges-panel">';
        html += '<div class="badges-header">';
        html += '<h3>Achievements</h3>';
        html += '<span class="badges-count">' + unlockedCount + ' / ' + badges.length + ' unlocked</span>';
        html += '</div>';
        html += '<div class="badges-grid">';

        for (var i = 0; i < badges.length; i++) {
            var b = badges[i];
            var cls = b.unlocked ? "badge-card unlocked" : "badge-card locked";
            var icon = b.unlocked ? b.icon : "?";
            var dateStr = "";
            if (b.unlockedAt) {
                var d = new Date(b.unlockedAt);
                dateStr = d.toLocaleDateString();
            }

            html += '<div class="' + cls + '">';
            html += '<div class="badge-card-icon">' + icon + '</div>';
            html += '<div class="badge-card-name">' + (b.unlocked ? b.name : "???") + '</div>';
            html += '<div class="badge-card-desc">' + (b.unlocked ? b.description : "Keep exploring to unlock!") + '</div>';
            if (dateStr) {
                html += '<div class="badge-card-date">Unlocked ' + dateStr + '</div>';
            }
            html += '</div>';
        }

        html += '</div></div>';
        return html;
    }

    // =========================================================================
    //  2. DIFFICULTY RATINGS
    // =========================================================================

    function getDifficulty(challengeId) {
        var challenges = _getChallenges();
        var ch = null;
        for (var i = 0; i < challenges.length; i++) {
            if (challenges[i].id === challengeId) {
                ch = challenges[i];
                break;
            }
        }
        if (!ch) return "beginner";

        // If the challenge already has a difficulty field, use it
        if (ch.difficulty) return ch.difficulty;

        // Otherwise assign based on moduleId
        var mid = ch.moduleId || 1;
        if (mid <= 4) return "beginner";
        if (mid <= 8) return "intermediate";
        return "advanced";
    }

    function renderDifficultyBadge(difficulty) {
        var colors = {
            beginner: "var(--success, #4ade80)",
            easy: "var(--success, #4ade80)",
            intermediate: "var(--warning, #fbbf24)",
            medium: "var(--warning, #fbbf24)",
            advanced: "var(--danger, #f87171)",
            hard: "var(--danger, #f87171)",
        };
        var labels = {
            beginner: "Beginner",
            easy: "Beginner",
            intermediate: "Intermediate",
            medium: "Intermediate",
            advanced: "Advanced",
            hard: "Advanced",
        };
        var color = colors[difficulty] || colors.beginner;
        var label = labels[difficulty] || "Beginner";

        return '<span class="difficulty-badge" style="' +
            'display:inline-flex;align-items:center;gap:4px;' +
            'padding:2px 10px;border-radius:12px;font-size:0.75rem;font-weight:600;' +
            'background:' + color + '20;color:' + color + ';' +
            'border:1px solid ' + color + '40;' +
            '">' +
            '<span style="width:6px;height:6px;border-radius:50%;background:' + color + ';"></span>' +
            label +
            '</span>';
    }

    // =========================================================================
    //  3. STREAKS CALENDAR / HEATMAP
    // =========================================================================

    var STORAGE_KEY_ACTIVITY = "pylearn_daily_activity";

    function _loadDailyActivity() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY_ACTIVITY);
            if (!raw) return {};
            return JSON.parse(raw);
        } catch (e) {
            return {};
        }
    }

    function _saveDailyActivity(data) {
        try {
            localStorage.setItem(STORAGE_KEY_ACTIVITY, JSON.stringify(data));
        } catch (e) {
            // silently fail
        }
    }

    function recordActivity() {
        var today = _dateStr(new Date());
        var activity = _loadDailyActivity();
        activity[today] = (activity[today] || 0) + 1;
        _saveDailyActivity(activity);
    }

    function _calculateStreaks() {
        var activity = _loadDailyActivity();
        var dates = Object.keys(activity).sort();
        if (dates.length === 0) return { current: 0, longest: 0 };

        // Build set of active dates for O(1) lookup
        var dateSet = {};
        for (var i = 0; i < dates.length; i++) {
            dateSet[dates[i]] = true;
        }

        // Calculate longest streak
        var longest = 0;
        var tempStreak = 0;
        for (var j = 0; j < dates.length; j++) {
            var prev = _dateStr(new Date(new Date(dates[j]).getTime() - 86400000));
            if (j === 0 || !dateSet[prev]) {
                tempStreak = 1;
            } else {
                tempStreak++;
            }
            if (tempStreak > longest) longest = tempStreak;
        }

        // Calculate current streak (counting back from today)
        var current = 0;
        var checkDate = new Date();
        // If today has no activity, start from yesterday
        var todayStr = _dateStr(checkDate);
        if (!dateSet[todayStr]) {
            checkDate = new Date(checkDate.getTime() - 86400000);
        }

        while (true) {
            var ds = _dateStr(checkDate);
            if (dateSet[ds]) {
                current++;
                checkDate = new Date(checkDate.getTime() - 86400000);
            } else {
                break;
            }
        }

        return { current: current, longest: longest };
    }

    function _getActivityLevel(count) {
        if (!count || count === 0) return 0;
        if (count <= 2) return 1;
        if (count <= 5) return 2;
        return 3;
    }

    function renderHeatmap(months) {
        if (!months) months = 3;
        var activity = _loadDailyActivity();
        var streaks = _calculateStreaks();

        var now = new Date();
        // Start date: N months ago, aligned to the start of that week (Sunday)
        var startDate = new Date(now.getFullYear(), now.getMonth() - months, 1);
        // Align to Sunday
        var startDay = startDate.getDay();
        startDate = new Date(startDate.getTime() - startDay * 86400000);

        var endDate = now;
        var totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000) + 1;

        // Build weeks array (columns). Each week = array of 7 day objects.
        var weeks = [];
        var currentWeek = [];
        var iterDate = new Date(startDate);

        for (var d = 0; d < totalDays; d++) {
            var ds = _dateStr(iterDate);
            var count = activity[ds] || 0;
            var dayOfWeek = iterDate.getDay();
            var month = iterDate.getMonth();
            var dateNum = iterDate.getDate();
            var isFuture = iterDate > endDate;

            currentWeek.push({
                date: ds,
                count: count,
                level: isFuture ? -1 : _getActivityLevel(count),
                dayOfWeek: dayOfWeek,
                month: month,
                dateNum: dateNum,
                isFuture: isFuture,
            });

            if (dayOfWeek === 6 || d === totalDays - 1) {
                weeks.push(currentWeek);
                currentWeek = [];
            }

            iterDate = new Date(iterDate.getTime() + 86400000);
        }

        // Month labels
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var html = '<div class="gamification-heatmap">';

        // Month labels row
        html += '<div class="heatmap-months">';
        html += '<div class="heatmap-day-labels-spacer"></div>';
        var lastMonth = -1;
        for (var w = 0; w < weeks.length; w++) {
            // Use the first non-future day in the week to determine month
            var firstDay = weeks[w][0];
            if (firstDay.month !== lastMonth) {
                html += '<div class="heatmap-month-label">' + monthNames[firstDay.month] + '</div>';
                lastMonth = firstDay.month;
            } else {
                html += '<div class="heatmap-month-label"></div>';
            }
        }
        html += '</div>';

        // Grid: 7 rows (Sun-Sat) x N weeks (columns)
        html += '<div class="heatmap-grid-container">';

        // Day-of-week labels
        var dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        html += '<div class="heatmap-day-labels">';
        for (var r = 0; r < 7; r++) {
            var showLabel = (r === 1 || r === 3 || r === 5);
            html += '<div class="heatmap-day-label">' + (showLabel ? dayLabels[r] : "") + '</div>';
        }
        html += '</div>';

        // Cells grid
        html += '<div class="heatmap-cells">';
        for (var row = 0; row < 7; row++) {
            html += '<div class="heatmap-row">';
            for (var col = 0; col < weeks.length; col++) {
                if (row < weeks[col].length) {
                    var cell = weeks[col][row];
                    if (cell.isFuture) {
                        html += '<div class="heatmap-cell" data-level="-1" title=""></div>';
                    } else {
                        var tooltip = cell.date + ": " + cell.count + " activit" + (cell.count === 1 ? "y" : "ies");
                        html += '<div class="heatmap-cell" data-level="' + cell.level + '" title="' + tooltip + '"></div>';
                    }
                } else {
                    html += '<div class="heatmap-cell" data-level="-1"></div>';
                }
            }
            html += '</div>';
        }
        html += '</div>';

        html += '</div>'; // heatmap-grid-container

        // Legend and streak info
        html += '<div class="heatmap-footer">';
        html += '<div class="heatmap-legend">';
        html += '<span class="heatmap-legend-label">Less</span>';
        html += '<div class="heatmap-cell" data-level="0" title="No activity"></div>';
        html += '<div class="heatmap-cell" data-level="1" title="1-2 activities"></div>';
        html += '<div class="heatmap-cell" data-level="2" title="3-5 activities"></div>';
        html += '<div class="heatmap-cell" data-level="3" title="6+ activities"></div>';
        html += '<span class="heatmap-legend-label">More</span>';
        html += '</div>';
        html += '<div class="heatmap-streak-info">';
        html += '<div class="heatmap-streak-item">';
        html += '<span class="heatmap-streak-value">' + streaks.current + '</span>';
        html += '<span class="heatmap-streak-label">Current streak</span>';
        html += '</div>';
        html += '<div class="heatmap-streak-item">';
        html += '<span class="heatmap-streak-value">' + streaks.longest + '</span>';
        html += '<span class="heatmap-streak-label">Longest streak</span>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        html += '</div>'; // gamification-heatmap
        return html;
    }

    // =========================================================================
    //  AUTO-INIT: listen for view navigation to track Explorer badge
    // =========================================================================

    function _initViewTracking() {
        var navItems = $$(".sidebar-nav-item[data-view]");
        for (var i = 0; i < navItems.length; i++) {
            (function (item) {
                item.addEventListener("click", function () {
                    var view = item.getAttribute("data-view");
                    if (view) trackViewVisit(view);
                });
            })(navItems[i]);
        }
        // Track current active view on load
        var activeNav = $(".sidebar-nav-item.active[data-view]");
        if (activeNav) {
            var activeView = activeNav.getAttribute("data-view");
            if (activeView) trackViewVisit(activeView);
        }
    }

    // Run after DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", _initViewTracking);
    } else {
        _initViewTracking();
    }

    // =========================================================================
    //  PUBLIC API
    // =========================================================================

    return Object.freeze({
        // Achievements
        checkAchievements: checkAchievements,
        getAchievements: getAchievements,
        renderBadgesPanel: renderBadgesPanel,
        trackSpeedDemon: trackSpeedDemon,
        trackViewVisit: trackViewVisit,

        // Difficulty
        getDifficulty: getDifficulty,
        renderDifficultyBadge: renderDifficultyBadge,

        // Activity / Heatmap
        recordActivity: recordActivity,
        renderHeatmap: renderHeatmap,

        // Streaks (read-only)
        getStreaks: _calculateStreaks,
    });

})();
