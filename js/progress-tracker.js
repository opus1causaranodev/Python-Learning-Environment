// =============================================================================
// ProgressTracker — Persistent progress, streaks, achievements via localStorage
// =============================================================================
// Stores completed challenges, scores, time spent, streak data, badges earned,
// and overall statistics. Everything lives in localStorage so there is no
// backend dependency.
// =============================================================================

const ProgressTracker = (() => {
    "use strict";

    // -------------------------------------------------------------------------
    // Constants
    // -------------------------------------------------------------------------

    const STORAGE_KEY = "pylearn_progress";
    const VERSION = 1; // Bump when the schema changes; migrate on load.

    // -------------------------------------------------------------------------
    // Badge / Achievement definitions
    // -------------------------------------------------------------------------

    /**
     * Each badge has:
     *   id          — unique slug.
     *   title       — display name.
     *   description — how to earn it.
     *   icon        — emoji or CSS class (consumer decides rendering).
     *   check(data) — function returning true when the badge is earned.
     */
    const BADGE_DEFINITIONS = [
        {
            id: "first_steps",
            title: "First Steps",
            description: "Complete your very first challenge.",
            icon: "star",
            check: (d) => d.completedCount >= 1,
        },
        {
            id: "high_five",
            title: "High Five",
            description: "Complete 5 challenges.",
            icon: "hand",
            check: (d) => d.completedCount >= 5,
        },
        {
            id: "ten_streak",
            title: "On Fire",
            description: "Reach a 10-day practice streak.",
            icon: "flame",
            check: (d) => d.longestStreak >= 10,
        },
        {
            id: "perfect_score",
            title: "Perfectionist",
            description: "Score 100 on any challenge.",
            icon: "trophy",
            check: (d) => d.hasPerfectScore,
        },
        {
            id: "half_way",
            title: "Half Way There",
            description: "Complete 50 % of all challenges.",
            icon: "flag",
            check: (d) => d.overallProgress >= 50,
        },
        {
            id: "century",
            title: "Century",
            description: "Complete 100 challenges.",
            icon: "100",
            check: (d) => d.completedCount >= 100,
        },
        {
            id: "speed_demon",
            title: "Speed Demon",
            description: "Complete a challenge in under 60 seconds.",
            icon: "bolt",
            check: (d) => d.fastestCompletion !== null && d.fastestCompletion < 60,
        },
        {
            id: "night_owl",
            title: "Night Owl",
            description: "Complete a challenge between midnight and 5 AM.",
            icon: "moon",
            check: (d) => d.completedAtNight,
        },
        {
            id: "comeback_kid",
            title: "Comeback Kid",
            description: "Pass a challenge after 5 or more failed attempts.",
            icon: "refresh",
            check: (d) => d.maxAttemptsBeforePass >= 5,
        },
        {
            id: "bug_squasher",
            title: "Bug Squasher",
            description: "Fix 20 runtime errors across all challenges.",
            icon: "bug",
            check: (d) => d.totalErrorsFixed >= 20,
        },
        {
            id: "three_day_streak",
            title: "Getting Started",
            description: "Reach a 3-day practice streak.",
            icon: "calendar",
            check: (d) => d.longestStreak >= 3,
        },
        {
            id: "thirty_day_streak",
            title: "Dedicated Learner",
            description: "Reach a 30-day practice streak.",
            icon: "medal",
            check: (d) => d.longestStreak >= 30,
        },
        {
            id: "all_beginner",
            title: "Beginner Complete",
            description: "Complete all beginner-level challenges.",
            icon: "seedling",
            check: (d) => d.completedAllBeginner,
        },
        {
            id: "code_reviewer",
            title: "Clean Coder",
            description: "Get a perfect code-quality score on 10 challenges.",
            icon: "sparkle",
            check: (d) => d.perfectQualityCount >= 10,
        },
        {
            id: "twenty_five",
            title: "Quarter Century",
            description: "Complete 25 challenges.",
            icon: "gem",
            check: (d) => d.completedCount >= 25,
        },
    ];

    // -------------------------------------------------------------------------
    // Data model
    // -------------------------------------------------------------------------

    /**
     * @typedef {object} ProgressData
     * @property {number}                version
     * @property {Object<string, ChallengeRecord>} challenges  Keyed by challenge id.
     * @property {StreakData}             streak
     * @property {string[]}              earnedBadges   Badge ids.
     * @property {object}                stats          Aggregate counters.
     */

    /**
     * @typedef {object} ChallengeRecord
     * @property {string}  id
     * @property {boolean} completed
     * @property {number}  bestScore         0-100
     * @property {number}  attempts          Total submission count.
     * @property {number}  timeSpentSeconds  Cumulative.
     * @property {string}  firstAttemptDate  ISO string.
     * @property {string}  lastAttemptDate   ISO string.
     * @property {string|null} completedDate ISO string or null.
     * @property {number}  bestQualityScore  0-100 (quality sub-score).
     * @property {number}  errorsEncountered Total runtime errors across attempts.
     * @property {string}  lastCode          Last submitted code (for resume).
     */

    /**
     * @typedef {object} StreakData
     * @property {number} current       Current consecutive-day streak.
     * @property {number} longest       All-time longest streak.
     * @property {string|null} lastActiveDate  ISO date string (YYYY-MM-DD).
     */

    function _defaultData() {
        return {
            version: VERSION,
            challenges: {},
            streak: { current: 0, longest: 0, lastActiveDate: null },
            earnedBadges: [],
            stats: {
                totalSubmissions: 0,
                totalErrorsFixed: 0,
                totalTimeSeconds: 0,
                perfectQualityCount: 0,
            },
        };
    }

    // -------------------------------------------------------------------------
    // Persistence helpers
    // -------------------------------------------------------------------------

    function _load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return _defaultData();
            const data = JSON.parse(raw);
            // Future: migrate schema versions here.
            if (!data.version) data.version = VERSION;
            if (!data.stats) data.stats = _defaultData().stats;
            return data;
        } catch {
            return _defaultData();
        }
    }

    function _save(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (err) {
            console.error("ProgressTracker: Failed to save to localStorage.", err);
        }
    }

    // -------------------------------------------------------------------------
    // Public API
    // -------------------------------------------------------------------------

    /**
     * Record a submission for a challenge.
     *
     * @param {string} challengeId
     * @param {object} result           The EvaluationResult from AnswerChecker.
     * @param {number} timeSpentSeconds Seconds the user spent on this attempt.
     * @param {string} code             The submitted source code.
     * @param {string} [difficulty]     "beginner"|"intermediate"|"advanced"
     */
    function recordAttempt(challengeId, result, timeSpentSeconds, code, difficulty) {
        const data = _load();
        const now = new Date();

        // Ensure challenge record exists.
        if (!data.challenges[challengeId]) {
            data.challenges[challengeId] = {
                id: challengeId,
                completed: false,
                bestScore: 0,
                attempts: 0,
                timeSpentSeconds: 0,
                firstAttemptDate: now.toISOString(),
                lastAttemptDate: now.toISOString(),
                completedDate: null,
                bestQualityScore: 0,
                errorsEncountered: 0,
                lastCode: "",
                difficulty: difficulty || "beginner",
            };
        }

        const rec = data.challenges[challengeId];
        rec.attempts += 1;
        rec.lastAttemptDate = now.toISOString();
        rec.timeSpentSeconds += timeSpentSeconds;
        rec.lastCode = code;

        if (result.score > rec.bestScore) {
            rec.bestScore = result.score;
        }

        // Count errors
        if (result.errorAnalysis && result.errorAnalysis.detected) {
            rec.errorsEncountered += result.errorAnalysis.errors.length;
            data.stats.totalErrorsFixed += result.errorAnalysis.errors.length;
        }

        // Quality sub-score
        const qualScore = result.qualityResults
            ? (result.qualityResults.details.length > 0
                ? Math.round(
                      (result.qualityResults.details.filter((d) => d.passed).length /
                          result.qualityResults.details.length) *
                          100
                  )
                : 100)
            : 100;
        if (qualScore > rec.bestQualityScore) {
            rec.bestQualityScore = qualScore;
        }
        if (qualScore === 100) {
            data.stats.perfectQualityCount += 1;
        }

        // Completion
        if (result.passed && !rec.completed) {
            rec.completed = true;
            rec.completedDate = now.toISOString();
        }

        // Global stats
        data.stats.totalSubmissions += 1;
        data.stats.totalTimeSeconds += timeSpentSeconds;

        // Streak
        _updateStreak(data, now);

        // Badges
        _checkBadges(data, now, timeSpentSeconds);

        _save(data);
        return getSnapshot();
    }

    /**
     * Update the daily practice streak.
     */
    function _updateStreak(data, now) {
        const todayStr = _dateStr(now);
        const last = data.streak.lastActiveDate;

        if (last === todayStr) {
            // Already active today — nothing to do.
            return;
        }

        const yesterday = _dateStr(new Date(now.getTime() - 86_400_000));
        if (last === yesterday) {
            // Consecutive day.
            data.streak.current += 1;
        } else if (last !== todayStr) {
            // Streak broken (or first day ever).
            data.streak.current = 1;
        }

        if (data.streak.current > data.streak.longest) {
            data.streak.longest = data.streak.current;
        }

        data.streak.lastActiveDate = todayStr;
    }

    function _dateStr(d) {
        return d.toISOString().slice(0, 10);
    }

    /**
     * Check all badge conditions and award any newly earned ones.
     */
    function _checkBadges(data, now, latestTimeSpent) {
        const earned = new Set(data.earnedBadges);
        const summaryData = _buildBadgeSummary(data, now, latestTimeSpent);

        for (const badge of BADGE_DEFINITIONS) {
            if (earned.has(badge.id)) continue;
            try {
                if (badge.check(summaryData)) {
                    data.earnedBadges.push(badge.id);
                }
            } catch {
                // Skip if check throws
            }
        }
    }

    function _buildBadgeSummary(data, now, latestTimeSpent) {
        const challenges = Object.values(data.challenges);
        const completed = challenges.filter((c) => c.completed);

        return {
            completedCount: completed.length,
            longestStreak: data.streak.longest,
            hasPerfectScore: completed.some((c) => c.bestScore === 100),
            overallProgress: 0, // Consumer must call setTotalChallenges for this to work.
            fastestCompletion: latestTimeSpent,
            completedAtNight: now.getHours() < 5,
            maxAttemptsBeforePass: Math.max(0, ...completed.map((c) => c.attempts)),
            totalErrorsFixed: data.stats.totalErrorsFixed,
            completedAllBeginner: _allOfDifficulty(challenges, "beginner"),
            perfectQualityCount: data.stats.perfectQualityCount,
        };
    }

    function _allOfDifficulty(challenges, level) {
        const ofLevel = challenges.filter((c) => c.difficulty === level);
        return ofLevel.length > 0 && ofLevel.every((c) => c.completed);
    }

    // -------------------------------------------------------------------------
    // Queries
    // -------------------------------------------------------------------------

    /**
     * Return a full snapshot of the current progress state.
     */
    function getSnapshot() {
        const data = _load();
        const challenges = Object.values(data.challenges);
        const completed = challenges.filter((c) => c.completed);

        return {
            challenges: data.challenges,
            completedCount: completed.length,
            totalAttempts: data.stats.totalSubmissions,
            totalTimeSeconds: data.stats.totalTimeSeconds,
            averageScore: completed.length > 0
                ? Math.round(completed.reduce((s, c) => s + c.bestScore, 0) / completed.length)
                : 0,
            streak: { ...data.streak },
            earnedBadges: data.earnedBadges.map((id) => {
                const def = BADGE_DEFINITIONS.find((b) => b.id === id);
                return def ? { ...def, check: undefined } : { id, title: id, description: "", icon: "" };
            }),
            stats: { ...data.stats },
        };
    }

    /**
     * Calculate overall progress as a percentage of a given total.
     *
     * @param {number} totalChallenges  How many challenges exist in the curriculum.
     * @returns {number} 0-100 percentage.
     */
    function getOverallProgress(totalChallenges) {
        if (totalChallenges <= 0) return 0;
        const data = _load();
        const completed = Object.values(data.challenges).filter((c) => c.completed).length;
        return Math.round((completed / totalChallenges) * 100);
    }

    /**
     * Get the record for a single challenge (or null if never attempted).
     *
     * @param {string} challengeId
     * @returns {ChallengeRecord|null}
     */
    function getChallengeRecord(challengeId) {
        const data = _load();
        return data.challenges[challengeId] || null;
    }

    /**
     * Get the user's last submitted code for a challenge (for "resume" UX).
     *
     * @param {string} challengeId
     * @returns {string}
     */
    function getLastCode(challengeId) {
        const rec = getChallengeRecord(challengeId);
        return rec ? rec.lastCode : "";
    }

    /**
     * Get challenges sorted by recency, for a "recent activity" feed.
     *
     * @param {number} [limit=10]
     * @returns {ChallengeRecord[]}
     */
    function getRecentActivity(limit = 10) {
        const data = _load();
        return Object.values(data.challenges)
            .sort((a, b) => new Date(b.lastAttemptDate) - new Date(a.lastAttemptDate))
            .slice(0, limit);
    }

    /**
     * Get per-difficulty completion statistics.
     *
     * @param {Challenge[]} allChallenges  The full challenge catalogue.
     * @returns {{ beginner: {completed,total}, intermediate: {completed,total}, advanced: {completed,total} }}
     */
    function getDifficultyBreakdown(allChallenges) {
        const data = _load();
        const result = {};
        for (const level of ["beginner", "intermediate", "advanced"]) {
            const ofLevel = allChallenges.filter((c) => c.difficulty === level);
            const completed = ofLevel.filter((c) => data.challenges[c.id]?.completed).length;
            result[level] = { completed, total: ofLevel.length };
        }
        return result;
    }

    /**
     * Get the list of all available badge definitions (for display in a "badges" page).
     */
    function getAllBadgeDefinitions() {
        return BADGE_DEFINITIONS.map((b) => {
            const data = _load();
            return {
                id: b.id,
                title: b.title,
                description: b.description,
                icon: b.icon,
                earned: data.earnedBadges.includes(b.id),
            };
        });
    }

    /**
     * Check for any newly earned badges without recording an attempt.
     * Useful after setTotalChallenges or external state changes.
     */
    function refreshBadges() {
        const data = _load();
        _checkBadges(data, new Date(), Infinity);
        _save(data);
    }

    // -------------------------------------------------------------------------
    // Admin / debug
    // -------------------------------------------------------------------------

    /**
     * Export all progress as a JSON string (for backup/share).
     */
    function exportData() {
        return JSON.stringify(_load(), null, 2);
    }

    /**
     * Import previously exported progress data.
     *
     * @param {string} jsonStr
     * @returns {boolean} Success.
     */
    function importData(jsonStr) {
        try {
            const parsed = JSON.parse(jsonStr);
            if (!parsed.challenges || !parsed.streak) {
                throw new Error("Invalid progress data format.");
            }
            _save(parsed);
            return true;
        } catch (err) {
            console.error("ProgressTracker: Import failed.", err);
            return false;
        }
    }

    /**
     * Reset all progress (destructive).
     */
    function resetAll() {
        _save(_defaultData());
    }

    // -------------------------------------------------------------------------
    // Public API
    // -------------------------------------------------------------------------

    return Object.freeze({
        recordAttempt,
        getSnapshot,
        getOverallProgress,
        getChallengeRecord,
        getLastCode,
        getRecentActivity,
        getDifficultyBreakdown,
        getAllBadgeDefinitions,
        refreshBadges,
        exportData,
        importData,
        resetAll,
    });
})();
