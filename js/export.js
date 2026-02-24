// =============================================================================
// export.js — Print/Export Progress Report for Python Learning Environment
// =============================================================================
// Generates a downloadable or printable HTML progress report with inline CSS.
// Uses Blob + URL.createObjectURL for downloads, and window.open for printing.
// =============================================================================

(function () {
    "use strict";

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------
    const curriculum = (typeof CURRICULUM !== "undefined") ? CURRICULUM : { modules: [] };
    const challenges = (typeof CHALLENGES !== "undefined") ? CHALLENGES : [];

    function _escapeHTML(s) {
        if (!s) return "";
        const div = document.createElement("div");
        div.textContent = s;
        return div.innerHTML;
    }

    function _getLessonProgress(moduleId) {
        const mod = curriculum.modules.find(m => m.id === moduleId);
        if (!mod || !mod.lessons) return { viewed: 0, total: 0 };
        let viewed = 0;
        for (let i = 0; i < mod.lessons.length; i++) {
            if (localStorage.getItem(`pylearn_lesson_${moduleId}_${i}`)) viewed++;
        }
        return { viewed, total: mod.lessons.length };
    }

    function _getTotalLessonsViewed() {
        let total = 0;
        for (const mod of curriculum.modules) {
            total += _getLessonProgress(mod.id).viewed;
        }
        return total;
    }

    function _getTotalLessons() {
        let total = 0;
        for (const mod of curriculum.modules) {
            if (mod.lessons) total += mod.lessons.length;
        }
        return total;
    }

    // -------------------------------------------------------------------------
    // Build the heatmap data (last 90 days)
    // -------------------------------------------------------------------------
    function _buildHeatmapData() {
        const data = {};
        // Collect from progress tracker recent activity
        const snap = ProgressTracker.getSnapshot();
        if (snap.challenges) {
            for (const [, rec] of Object.entries(snap.challenges)) {
                if (rec.lastAttemptDate) {
                    const day = rec.lastAttemptDate.slice(0, 10);
                    data[day] = (data[day] || 0) + 1;
                }
            }
        }
        // Also count lesson views by checking localStorage timestamps
        // (we don't store timestamps for lessons, so heatmap is challenge-based)
        return data;
    }

    function _renderHeatmapHTML(data) {
        const today = new Date();
        const days = 91; // ~13 weeks
        let cells = "";
        for (let i = days - 1; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const key = d.toISOString().slice(0, 10);
            const count = data[key] || 0;
            let level = 0;
            if (count >= 5) level = 4;
            else if (count >= 3) level = 3;
            else if (count >= 2) level = 2;
            else if (count >= 1) level = 1;
            const colors = ["#1e2130", "#0e4429", "#006d32", "#26a641", "#39d353"];
            cells += `<span style="display:inline-block;width:11px;height:11px;margin:1px;border-radius:2px;background:${colors[level]};" title="${key}: ${count} activities"></span>`;
        }
        return `<div style="line-height:0;max-width:600px;">${cells}</div>`;
    }

    // -------------------------------------------------------------------------
    // Generate report HTML
    // -------------------------------------------------------------------------
    function _generateReportHTML() {
        const snap = ProgressTracker.getSnapshot();
        const totalLessons = _getTotalLessons();
        const lessonsViewed = _getTotalLessonsViewed();
        const totalChallenges = challenges.length;
        const now = new Date();
        const dateStr = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

        // Overall XP estimate: lessons worth 10 XP, challenges worth 25 XP
        const xp = (lessonsViewed * 10) + (snap.completedCount * 25);

        // Streak info
        const streak = snap.streak || {};
        const currentStreak = streak.current || 0;

        // Build per-module rows
        let moduleRowsHTML = "";
        for (const mod of curriculum.modules) {
            const lp = _getLessonProgress(mod.id);
            const moduleChallenges = challenges.filter(c => c.moduleId === mod.id);
            let completedCh = 0;
            for (const ch of moduleChallenges) {
                const rec = ProgressTracker.getChallengeRecord(ch.id);
                if (rec && rec.completed) completedCh++;
            }
            // Quiz results
            let quizHTML = "<span style='color:#8b8fa3;'>No quiz taken</span>";
            if (typeof QuizSystem !== "undefined" && QuizSystem.hasQuiz(mod.id)) {
                const qr = QuizSystem.getQuizResult(mod.id);
                if (qr) {
                    const qPct = Math.round((qr.bestScore / qr.total) * 100);
                    quizHTML = `${qr.bestScore}/${qr.total} (${qPct}%) — ${qr.attempts} attempt${qr.attempts !== 1 ? "s" : ""}`;
                } else {
                    quizHTML = "<span style='color:#8b8fa3;'>Not attempted</span>";
                }
            }

            const totalItems = lp.total + moduleChallenges.length;
            const doneItems = lp.viewed + completedCh;
            const modPct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

            moduleRowsHTML += `
                <tr>
                    <td style="padding:10px 12px;border-bottom:1px solid #2a2d3e;">
                        <strong>Module ${mod.id}</strong>: ${_escapeHTML(mod.title)}
                    </td>
                    <td style="padding:10px 12px;border-bottom:1px solid #2a2d3e;text-align:center;">
                        ${lp.viewed}/${lp.total}
                    </td>
                    <td style="padding:10px 12px;border-bottom:1px solid #2a2d3e;text-align:center;">
                        ${completedCh}/${moduleChallenges.length}
                    </td>
                    <td style="padding:10px 12px;border-bottom:1px solid #2a2d3e;text-align:center;">
                        ${quizHTML}
                    </td>
                    <td style="padding:10px 12px;border-bottom:1px solid #2a2d3e;text-align:center;">
                        <div style="display:flex;align-items:center;gap:8px;justify-content:center;">
                            <div style="width:80px;height:8px;background:#1e2130;border-radius:4px;overflow:hidden;">
                                <div style="height:100%;width:${modPct}%;background:${modPct === 100 ? "#26a641" : "#6c8cff"};border-radius:4px;"></div>
                            </div>
                            <span>${modPct}%</span>
                        </div>
                    </td>
                </tr>
            `;
        }

        // Achievements
        const allBadges = ProgressTracker.getAllBadgeDefinitions();
        const earnedIds = new Set(snap.earnedBadges.map(b => b.id));
        let badgesHTML = "";
        const badgeIcons = {
            star: "&#11088;", hand: "&#9995;", flame: "&#128293;", trophy: "&#127942;",
            flag: "&#127937;", "100": "&#128175;", bolt: "&#9889;", moon: "&#127769;",
            refresh: "&#128260;", bug: "&#128027;"
        };
        for (const badge of allBadges) {
            const earned = earnedIds.has(badge.id);
            const icon = badgeIcons[badge.icon] || "&#127891;";
            badgesHTML += `
                <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;margin:4px;border-radius:8px;border:1px solid ${earned ? "#26a641" : "#2a2d3e"};background:${earned ? "rgba(38,166,65,0.1)" : "#161822"};opacity:${earned ? 1 : 0.4};">
                    <span style="font-size:1.2rem;">${icon}</span>
                    <div>
                        <div style="font-weight:600;font-size:0.85rem;color:${earned ? "#e1e4ed" : "#8b8fa3"};">${_escapeHTML(badge.title)}</div>
                        <div style="font-size:0.75rem;color:#8b8fa3;">${_escapeHTML(badge.description)}</div>
                    </div>
                </div>
            `;
        }

        // Heatmap
        const heatmapData = _buildHeatmapData();
        const heatmapHTML = _renderHeatmapHTML(heatmapData);

        // Recent activity
        const recentActivity = ProgressTracker.getRecentActivity(10);
        let activityHTML = "";
        if (recentActivity.length > 0) {
            for (const rec of recentActivity) {
                const dateLabel = rec.lastAttemptDate
                    ? new Date(rec.lastAttemptDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    : "Unknown";
                const status = rec.completed
                    ? '<span style="color:#26a641;">&#10004; Completed</span>'
                    : '<span style="color:#f0a03c;">In Progress</span>';
                activityHTML += `
                    <tr>
                        <td style="padding:8px 12px;border-bottom:1px solid #2a2d3e;">${_escapeHTML(rec.challengeId || "")}</td>
                        <td style="padding:8px 12px;border-bottom:1px solid #2a2d3e;text-align:center;">${rec.bestScore || 0}/100</td>
                        <td style="padding:8px 12px;border-bottom:1px solid #2a2d3e;text-align:center;">${rec.attempts || 0}</td>
                        <td style="padding:8px 12px;border-bottom:1px solid #2a2d3e;text-align:center;">${status}</td>
                        <td style="padding:8px 12px;border-bottom:1px solid #2a2d3e;text-align:center;">${dateLabel}</td>
                    </tr>
                `;
            }
        } else {
            activityHTML = `<tr><td colspan="5" style="padding:16px;text-align:center;color:#8b8fa3;">No recent activity</td></tr>`;
        }

        // Assemble the full report
        return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Python Learning Environment — Progress Report</title>
<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
        font-family: 'Segoe UI', Inter, -apple-system, BlinkMacSystemFont, sans-serif;
        background: #0d1117;
        color: #e1e4ed;
        padding: 40px;
        line-height: 1.6;
    }
    @media print {
        body { background: #fff; color: #1a1a2e; padding: 20px; }
        .no-print { display: none !important; }
        table { page-break-inside: avoid; }
        h2 { page-break-after: avoid; }
        .stat-card { background: #f5f5f5 !important; border-color: #ddd !important; }
        .stat-card .stat-value { color: #1a1a2e !important; }
        .module-table th { background: #f0f0f0 !important; color: #1a1a2e !important; }
        .module-table td { border-color: #ddd !important; }
    }
    .report-header {
        text-align: center;
        margin-bottom: 40px;
        padding-bottom: 24px;
        border-bottom: 2px solid #2a2d3e;
    }
    .report-header h1 {
        font-size: 1.8rem;
        margin-bottom: 8px;
        color: #6c8cff;
    }
    .report-header p { color: #8b8fa3; font-size: 0.95rem; }
    .section { margin-bottom: 32px; }
    .section h2 {
        font-size: 1.2rem;
        margin-bottom: 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid #2a2d3e;
        color: #6c8cff;
    }
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 16px;
    }
    .stat-card {
        background: #161822;
        border: 1px solid #2a2d3e;
        border-radius: 10px;
        padding: 20px;
        text-align: center;
    }
    .stat-card .stat-value {
        font-size: 2rem;
        font-weight: 700;
        color: #6c8cff;
    }
    .stat-card .stat-label {
        font-size: 0.85rem;
        color: #8b8fa3;
        margin-top: 4px;
    }
    .module-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
    }
    .module-table th {
        background: #161822;
        color: #8b8fa3;
        padding: 10px 12px;
        text-align: center;
        font-weight: 600;
        border-bottom: 2px solid #2a2d3e;
    }
    .module-table th:first-child { text-align: left; }
    .module-table td { color: #c8cad0; }
    .activity-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.85rem;
    }
    .activity-table th {
        background: #161822;
        color: #8b8fa3;
        padding: 8px 12px;
        text-align: center;
        font-weight: 600;
        border-bottom: 2px solid #2a2d3e;
    }
    .activity-table th:first-child { text-align: left; }
    .activity-table td { color: #c8cad0; }
    .footer {
        margin-top: 40px;
        padding-top: 16px;
        border-top: 1px solid #2a2d3e;
        text-align: center;
        color: #8b8fa3;
        font-size: 0.8rem;
    }
</style>
</head>
<body>

<div class="report-header">
    <h1>Python Learning Environment — Progress Report</h1>
    <p>Generated on ${_escapeHTML(dateStr)} at ${_escapeHTML(timeStr)}</p>
</div>

<div class="section">
    <h2>Overall Statistics</h2>
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-value">${lessonsViewed}/${totalLessons}</div>
            <div class="stat-label">Lessons Viewed</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${snap.completedCount}/${totalChallenges}</div>
            <div class="stat-label">Challenges Completed</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${xp.toLocaleString()}</div>
            <div class="stat-label">Total XP</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${currentStreak}</div>
            <div class="stat-label">Current Streak (days)</div>
        </div>
    </div>
</div>

<div class="section">
    <h2>Per-Module Progress</h2>
    <table class="module-table">
        <thead>
            <tr>
                <th style="text-align:left;">Module</th>
                <th>Lessons</th>
                <th>Challenges</th>
                <th>Quiz Score</th>
                <th>Overall</th>
            </tr>
        </thead>
        <tbody>
            ${moduleRowsHTML}
        </tbody>
    </table>
</div>

<div class="section">
    <h2>Achievement Badges</h2>
    <div style="display:flex;flex-wrap:wrap;gap:4px;">
        ${badgesHTML}
    </div>
</div>

<div class="section">
    <h2>Activity Heatmap (Last 90 Days)</h2>
    ${heatmapHTML}
    <div style="margin-top:8px;display:flex;align-items:center;gap:4px;font-size:0.75rem;color:#8b8fa3;">
        <span>Less</span>
        <span style="display:inline-block;width:11px;height:11px;border-radius:2px;background:#1e2130;"></span>
        <span style="display:inline-block;width:11px;height:11px;border-radius:2px;background:#0e4429;"></span>
        <span style="display:inline-block;width:11px;height:11px;border-radius:2px;background:#006d32;"></span>
        <span style="display:inline-block;width:11px;height:11px;border-radius:2px;background:#26a641;"></span>
        <span style="display:inline-block;width:11px;height:11px;border-radius:2px;background:#39d353;"></span>
        <span>More</span>
    </div>
</div>

<div class="section">
    <h2>Recent Activity</h2>
    <table class="activity-table">
        <thead>
            <tr>
                <th style="text-align:left;">Challenge</th>
                <th>Best Score</th>
                <th>Attempts</th>
                <th>Status</th>
                <th>Last Attempt</th>
            </tr>
        </thead>
        <tbody>
            ${activityHTML}
        </tbody>
    </table>
</div>

<div class="footer">
    <p>Python Learning Environment — Progress Report</p>
    <p>This report was generated automatically from your local learning data.</p>
</div>

</body>
</html>`;
    }

    // -------------------------------------------------------------------------
    // Download as HTML file
    // -------------------------------------------------------------------------
    function exportReport() {
        const html = _generateReportHTML();
        const blob = new Blob([html], { type: "text/html;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `pylearn-progress-report-${new Date().toISOString().slice(0, 10)}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        if (typeof showToast === "function") {
            showToast("success", "Report Downloaded", "Your progress report has been saved as an HTML file.");
        }
    }

    // -------------------------------------------------------------------------
    // Open print dialog
    // -------------------------------------------------------------------------
    function printReport() {
        const html = _generateReportHTML();
        const printWindow = window.open("", "_blank");
        if (!printWindow) {
            if (typeof showToast === "function") {
                showToast("warning", "Popup Blocked", "Please allow popups to print the report.");
            }
            return;
        }
        printWindow.document.write(html);
        printWindow.document.close();
        // Wait for content to load then trigger print
        printWindow.addEventListener("load", () => {
            printWindow.print();
        });
    }

    // -------------------------------------------------------------------------
    // Expose global API
    // -------------------------------------------------------------------------
    window.ExportSystem = Object.freeze({
        exportReport,
        printReport
    });

})();
