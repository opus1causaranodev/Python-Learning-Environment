// =============================================================================
// AnswerChecker — Comprehensive Python code evaluation engine
// =============================================================================
// Evaluates user-written Python code against challenge specifications using
// output comparison, regex matching, AST analysis, multi-test-case runs,
// partial credit scoring, hint progression, common-error detection, and
// basic code-quality checks.
//
// Depends on: PyodideRunner (pyodide-runner.js)
// =============================================================================

const AnswerChecker = (() => {
    "use strict";

    // =========================================================================
    // 1.  CORE EVALUATION
    // =========================================================================

    /**
     * Evaluate user code against a full challenge specification.
     *
     * @param {string}    userCode   The student's Python source code.
     * @param {Challenge} challenge  The challenge definition object.
     * @returns {Promise<EvaluationResult>}
     *
     * @typedef {object} EvaluationResult
     * @property {boolean}  passed          Overall pass/fail.
     * @property {number}   score           0–100.
     * @property {object}   testResults     Per-test-case verdicts.
     * @property {object}   structureResults AST requirement verdicts.
     * @property {object}   qualityResults  Code-quality verdicts.
     * @property {object}   errorAnalysis   Detected common errors.
     * @property {string}   feedback        Human-readable summary.
     * @property {number}   executionTime   Total wall-clock ms.
     */
    async function evaluateCode(userCode, challenge) {
        const startTime = performance.now();

        // Guard: empty submission
        if (!userCode || !userCode.trim()) {
            return _emptySubmissionResult();
        }

        // --- Phase 1: Static analysis (AST + quality) -----------------------
        const astData = await PyodideRunner.analyzeAST(userCode);

        let structureResults = { passed: true, details: [] };
        if (challenge.requiredConstructs && challenge.requiredConstructs.length > 0) {
            structureResults = _evaluateStructure(astData, challenge.requiredConstructs);
        }

        let qualityResults = { passed: true, details: [] };
        if (challenge.codeQualityChecks !== false) {
            qualityResults = _evaluateCodeQuality(userCode, astData);
        }

        // If there is a syntax error, skip execution entirely.
        if (astData.parseError) {
            const synErr = astData.parseError;
            const errorAnalysis = analyzeError(
                { errorType: "SyntaxError", error: synErr.message, errorLine: synErr.line },
                userCode
            );
            return {
                passed: false,
                score: 0,
                testResults: { passed: false, results: [], summary: "Code has a syntax error." },
                structureResults,
                qualityResults,
                errorAnalysis,
                feedback: generateFeedback({
                    testResults: { passed: false, results: [] },
                    structureResults,
                    qualityResults,
                    errorAnalysis,
                    syntaxError: synErr,
                }),
                executionTime: Math.round(performance.now() - startTime),
            };
        }

        // --- Phase 2: Run test cases -----------------------------------------
        const testCases = challenge.testCases || [];
        let testResults = { passed: true, results: [], summary: "No test cases defined." };
        if (testCases.length > 0) {
            testResults = await runTestCases(userCode, testCases);
        }

        // --- Phase 3: Error analysis on first failure ------------------------
        let errorAnalysis = { detected: false, errors: [] };
        const firstFailure = testResults.results.find((r) => !r.passed && r.error);
        if (firstFailure) {
            errorAnalysis = analyzeError(
                { errorType: firstFailure.errorType, error: firstFailure.error, errorLine: firstFailure.errorLine },
                userCode
            );
        }
        // Also run pattern-based common-error detection even when tests pass
        if (challenge.commonErrors && challenge.commonErrors.length > 0) {
            const patternErrors = _detectCommonErrorsByPattern(userCode, challenge.commonErrors);
            errorAnalysis.errors = [...errorAnalysis.errors, ...patternErrors];
            if (patternErrors.length > 0) errorAnalysis.detected = true;
        }

        // --- Phase 4: Score --------------------------------------------------
        const score = calculateScore({
            testResults,
            structureResults,
            qualityResults,
            scoringRubric: challenge.scoringRubric,
        });

        const passed = score >= (challenge.passingScore ?? 70);

        // --- Phase 5: Feedback -----------------------------------------------
        const feedback = generateFeedback({
            testResults,
            structureResults,
            qualityResults,
            errorAnalysis,
            score,
            passed,
        });

        return {
            passed,
            score,
            testResults,
            structureResults,
            qualityResults,
            errorAnalysis,
            feedback,
            executionTime: Math.round(performance.now() - startTime),
        };
    }

    function _emptySubmissionResult() {
        return {
            passed: false,
            score: 0,
            testResults: { passed: false, results: [], summary: "No code was submitted." },
            structureResults: { passed: false, details: [] },
            qualityResults: { passed: true, details: [] },
            errorAnalysis: { detected: false, errors: [] },
            feedback: "It looks like you haven't written any code yet. Give it a try!",
            executionTime: 0,
        };
    }

    // =========================================================================
    // 2.  OUTPUT COMPARISON
    // =========================================================================

    /**
     * Compare actual program output against an expected value.
     *
     * @param {string} actual   What the program printed.
     * @param {string} expected The expected output or regex pattern.
     * @param {"exact"|"exact_trimmed"|"regex"|"contains"|"numeric"|"unordered_lines"} mode
     * @returns {{ matched: boolean, detail: string }}
     */
    function compareOutput(actual, expected, mode = "exact_trimmed") {
        // Normalise line endings
        const a = (actual ?? "").replace(/\r\n/g, "\n");
        const e = (expected ?? "").replace(/\r\n/g, "\n");

        switch (mode) {
            // -- exact (whitespace-sensitive) ----------------------------------
            case "exact":
                return {
                    matched: a === e,
                    detail: a === e ? "Output matches exactly." : _diffSummary(a, e),
                };

            // -- exact after trimming each line & trailing newlines -------------
            case "exact_trimmed": {
                const norm = (s) => s.split("\n").map((l) => l.trimEnd()).join("\n").trim();
                const an = norm(a);
                const en = norm(e);
                return {
                    matched: an === en,
                    detail: an === en ? "Output matches (ignoring trailing whitespace)." : _diffSummary(an, en),
                };
            }

            // -- regex ----------------------------------------------------------
            case "regex": {
                try {
                    const re = new RegExp(e, "s"); // dotAll so . matches \n
                    const ok = re.test(a.trim());
                    return {
                        matched: ok,
                        detail: ok ? "Output matches the expected pattern." : `Output did not match pattern: /${e}/`,
                    };
                } catch (err) {
                    return { matched: false, detail: `Invalid regex pattern: ${err.message}` };
                }
            }

            // -- substring containment ------------------------------------------
            case "contains": {
                const ok = a.includes(e);
                return {
                    matched: ok,
                    detail: ok
                        ? "Output contains the expected text."
                        : `Expected output to contain "${_truncate(e, 80)}" but it was not found.`,
                };
            }

            // -- numeric (tolerant of whitespace, compares as numbers) ----------
            case "numeric": {
                const extractNums = (s) =>
                    s.trim().split(/\s+/).map(Number).filter((n) => !isNaN(n));
                const aN = extractNums(a);
                const eN = extractNums(e);
                if (aN.length !== eN.length) {
                    return {
                        matched: false,
                        detail: `Expected ${eN.length} number(s) but got ${aN.length}.`,
                    };
                }
                const epsilon = 1e-9;
                const ok = aN.every((v, i) => Math.abs(v - eN[i]) < epsilon);
                return {
                    matched: ok,
                    detail: ok ? "Numeric output matches." : `Expected [${eN}] but got [${aN}].`,
                };
            }

            // -- unordered lines (set comparison) ------------------------------
            case "unordered_lines": {
                const setA = new Set(a.trim().split("\n").map((l) => l.trim()).filter(Boolean));
                const setE = new Set(e.trim().split("\n").map((l) => l.trim()).filter(Boolean));
                const missing = [...setE].filter((l) => !setA.has(l));
                const extra = [...setA].filter((l) => !setE.has(l));
                const ok = missing.length === 0 && extra.length === 0;
                let detail = ok ? "All expected lines present (order ignored)." : "";
                if (missing.length) detail += `Missing lines: ${missing.map((l) => `"${l}"`).join(", ")}. `;
                if (extra.length) detail += `Unexpected lines: ${extra.map((l) => `"${l}"`).join(", ")}.`;
                return { matched: ok, detail };
            }

            default:
                return { matched: false, detail: `Unknown comparison mode: "${mode}".` };
        }
    }

    /**
     * Produce a short human-readable diff of two strings.
     */
    function _diffSummary(actual, expected) {
        const aLines = actual.split("\n");
        const eLines = expected.split("\n");

        if (aLines.length !== eLines.length) {
            return (
                `Expected ${eLines.length} line(s) of output but got ${aLines.length}.\n` +
                `Expected:\n${_indent(expected)}\nGot:\n${_indent(actual)}`
            );
        }
        for (let i = 0; i < eLines.length; i++) {
            if (aLines[i] !== eLines[i]) {
                return (
                    `Line ${i + 1} differs.\n` +
                    `  Expected: "${_truncate(eLines[i], 120)}"\n` +
                    `  Got:      "${_truncate(aLines[i], 120)}"`
                );
            }
        }
        return "Outputs differ (could not pinpoint exact difference).";
    }

    // =========================================================================
    // 3.  AST-BASED CODE STRUCTURE ANALYSIS
    // =========================================================================

    /**
     * Check that the user's code contains required constructs.
     *
     * @param {string}   code          Python source.
     * @param {string[]} requirements  List of requirement keys (see table below).
     * @returns {Promise<{ passed: boolean, details: object[] }>}
     *
     * Supported requirement keys (partial list — extend as needed):
     *   "for_loop"        — at least one for loop
     *   "while_loop"      — at least one while loop
     *   "if_statement"    — at least one if/elif/else
     *   "function_def"    — at least one function definition
     *   "function:NAME"   — a function named NAME
     *   "class_def"       — at least one class definition
     *   "class:NAME"      — a class named NAME
     *   "recursion"       — at least one recursive function
     *   "list_comp"       — at least one list comprehension
     *   "dict_comp"       — at least one dict comprehension
     *   "try_except"      — at least one try/except block
     *   "import:MODULE"   — imports MODULE
     *   "no_import:MODULE"— must NOT import MODULE
     *   "print_call"      — at least one print() call
     *   "input_call"      — at least one input() call
     *   "return"          — at least one return statement
     *   "lambda"          — at least one lambda
     *   "f_string"        — at least one f-string
     *   "with_statement"  — at least one with statement
     *   "nested_function" — at least one nested function def
     *   "no_global"       — no assignments at module level (encourage functions)
     *   "min_functions:N" — at least N function definitions
     *   "uses_method:NAME"— calls .NAME() on some object
     *   "uses_builtin:NAME"— calls NAME() as a built-in
     *   "variable:NAME"   — assigns to a variable called NAME
     */
    async function analyzeCodeStructure(code, requirements) {
        const astData = await PyodideRunner.analyzeAST(code);
        return _evaluateStructure(astData, requirements);
    }

    function _evaluateStructure(astData, requirements) {
        if (astData.parseError) {
            return {
                passed: false,
                details: [
                    {
                        requirement: "valid_syntax",
                        passed: false,
                        message: `Syntax error on line ${astData.parseError.line}: ${astData.parseError.message}`,
                    },
                ],
            };
        }

        const c = astData.constructs;
        const details = [];
        let allPassed = true;

        for (const req of requirements) {
            const result = _checkSingleRequirement(req, c);
            details.push(result);
            if (!result.passed) allPassed = false;
        }

        return { passed: allPassed, details };
    }

    function _checkSingleRequirement(req, c) {
        // Parameterised requirements use "key:value" syntax
        const [key, param] = req.includes(":") ? [req.split(":")[0], req.split(":").slice(1).join(":")] : [req, null];

        // Aliases for the existing activities_m1_m4 format
        const ALIASES = {
            "print_function": "print_call",
            "input_function": "input_call",
            "variable_assignment": "variable_any",
            "string_method": "method_any",
            "list_operation": "subscript_any",
            "type_function": "uses_builtin:type",
            "int_conversion": "uses_builtin:int",
            "float_conversion": "uses_builtin:float",
            "str_conversion": "uses_builtin:str",
            "len_function": "uses_builtin:len",
            "range_function": "uses_builtin:range",
            "comparison_operator": "comparison",
            "logical_operator": "boolean_op",
            "for_loop": "for_loop",
            "while_loop": "while_loop",
            "if_else": "if_statement",
            "elif": "if_statement",
        };

        const resolved = ALIASES[req] || req;
        const [resolvedKey, resolvedParam] = resolved.includes(":")
            ? [resolved.split(":")[0], resolved.split(":").slice(1).join(":")]
            : [resolved, param];

        // Use resolved values but fall back to original key for unknown aliases
        const effectiveKey = ALIASES[req] ? resolvedKey : key;
        const effectiveParam = ALIASES[req] ? resolvedParam : param;

        switch (effectiveKey) {
            case "for_loop":
                return _reqResult(req, c.for_loops > 0, "Use at least one `for` loop.");
            case "while_loop":
                return _reqResult(req, c.while_loops > 0, "Use at least one `while` loop.");
            case "if_statement":
                return _reqResult(req, c.if_statements > 0, "Use at least one `if` statement.");
            case "function_def":
                return _reqResult(req, c.functions.length > 0, "Define at least one function.");
            case "function": {
                const found = c.functions.some((f) => f.name === effectiveParam);
                return _reqResult(req, found, `Define a function called \`${effectiveParam}\`.`);
            }
            case "class_def":
                return _reqResult(req, c.classes.length > 0, "Define at least one class.");
            case "class": {
                const found = c.classes.some((cl) => cl.name === effectiveParam);
                return _reqResult(req, found, `Define a class called \`${effectiveParam}\`.`);
            }
            case "recursion":
                return _reqResult(req, c.recursion.length > 0, "Use recursion in at least one function.");
            case "list_comp":
                return _reqResult(req, c.list_comprehensions > 0, "Use at least one list comprehension.");
            case "dict_comp":
                return _reqResult(req, c.dict_comprehensions > 0, "Use at least one dictionary comprehension.");
            case "set_comp":
                return _reqResult(req, c.set_comprehensions > 0, "Use at least one set comprehension.");
            case "try_except":
                return _reqResult(req, c.try_except > 0, "Use at least one `try`/`except` block.");
            case "import": {
                const found = c.imports.some((imp) => imp === effectiveParam || imp.startsWith(effectiveParam + "."));
                return _reqResult(req, found, `Import the \`${effectiveParam}\` module.`);
            }
            case "no_import": {
                const found = c.imports.some((imp) => imp === effectiveParam || imp.startsWith(effectiveParam + "."));
                return _reqResult(req, !found, `Do not import \`${effectiveParam}\` for this challenge.`);
            }
            case "print_call":
                return _reqResult(req, c.print_calls > 0, "Use `print()` to display output.");
            case "input_call":
                return _reqResult(req, c.input_calls > 0, "Use `input()` to read user input.");
            case "return":
                return _reqResult(req, c.return_statements > 0, "Use a `return` statement in your function.");
            case "lambda":
                return _reqResult(req, c.lambda_functions > 0, "Use at least one `lambda` expression.");
            case "f_string":
                return _reqResult(req, c.f_strings > 0, "Use at least one f-string.");
            case "with_statement":
                return _reqResult(req, c.with_statements > 0, "Use a `with` statement.");
            case "nested_function":
                return _reqResult(req, c.nested_functions.length > 0, "Define a nested (inner) function.");
            case "no_global": {
                // Only top-level assignments count (heuristic: all assignments minus those inside functions/classes).
                // Since our AST walk collects ALL assignments, and we don't track scope depth,
                // we approximate: if there are no functions at all, everything is global.
                // This check is intentionally lenient.
                const topLevel = c.assignments.filter(
                    (name) => !["__name__", "__all__"].includes(name)
                );
                const funcNames = c.functions.map((f) => f.name);
                const suspicious = topLevel.filter((name) => !funcNames.includes(name));
                return _reqResult(
                    req,
                    suspicious.length === 0,
                    "Avoid global-scope variable assignments; put your logic inside functions."
                );
            }
            case "min_functions": {
                const n = parseInt(effectiveParam, 10) || 1;
                return _reqResult(req, c.functions.length >= n, `Define at least ${n} function(s).`);
            }
            case "uses_method": {
                const found = c.method_calls.includes(effectiveParam);
                return _reqResult(req, found, `Call the \`.${effectiveParam}()\` method somewhere in your code.`);
            }
            case "uses_builtin": {
                const found = c.builtin_calls.includes(effectiveParam);
                return _reqResult(req, found, `Call the \`${effectiveParam}()\` function.`);
            }
            case "variable": {
                const found = c.assignments.includes(effectiveParam) || c.augmented_assignments.includes(effectiveParam);
                return _reqResult(req, found, `Create a variable called \`${effectiveParam}\`.`);
            }
            // Aliases for broad checks (from activitiesM1M4 format)
            case "variable_any":
                return _reqResult(req, c.assignments.length > 0, "Create at least one variable.");
            case "method_any":
                return _reqResult(req, c.method_calls.length > 0, "Call at least one method on an object.");
            case "subscript_any":
                return _reqResult(req, c.subscripts > 0, "Use indexing or slicing on a list/string.");
            case "comparison":
                return _reqResult(req, c.comparisons > 0, "Use a comparison operator (==, !=, <, >, etc.).");
            case "boolean_op":
                return _reqResult(req, c.boolean_ops > 0, "Use a boolean operator (and, or, not).");
            case "yield":
                return _reqResult(req, c.yield_statements > 0, "Use `yield` in a generator function.");
            case "decorator":
                return _reqResult(req, c.decorators.length > 0, "Use at least one decorator.");
            case "assert":
                return _reqResult(req, c.assert_statements > 0, "Use at least one `assert` statement.");
            case "generator_expr":
                return _reqResult(req, c.generator_expressions > 0, "Use a generator expression.");
            default:
                return { requirement: req, passed: false, message: `Unknown requirement: "${req}".` };
        }
    }

    function _reqResult(requirement, passed, failMessage) {
        return {
            requirement,
            passed,
            message: passed ? "Requirement met." : failMessage,
        };
    }

    // =========================================================================
    // 4.  MULTI-TEST-CASE RUNNER
    // =========================================================================

    /**
     * Run the user's code against every test case.
     *
     * @param {string}      code       Python source.
     * @param {TestCase[]}  testCases  Array of test case objects.
     * @returns {Promise<{ passed: boolean, results: TestCaseResult[], summary: string }>}
     *
     * @typedef  {object} TestCase
     * @property {string}  [input]          stdin text to feed.
     * @property {string}  [expectedOutput] Expected stdout.
     * @property {string}  [comparisonMode] One of the compareOutput modes.
     * @property {boolean} [hidden]         If true, don't reveal expected output on failure.
     * @property {string}  [description]    Human label for this test case.
     * @property {number}  [points]         Point weight (default 1).
     * @property {number}  [timeout]        Per-test timeout in ms.
     *
     * @typedef  {object} TestCaseResult
     * @property {boolean} passed
     * @property {string}  description
     * @property {string}  actualOutput
     * @property {string}  expectedOutput
     * @property {string}  detail
     * @property {boolean} hidden
     * @property {string|null} error
     * @property {string|null} errorType
     * @property {number|null} errorLine
     * @property {number}  executionTime
     */
    async function runTestCases(code, testCases) {
        const results = [];
        let allPassed = true;

        for (let i = 0; i < testCases.length; i++) {
            const tc = testCases[i];
            const desc = tc.description || `Test case ${i + 1}`;
            const mode = tc.comparisonMode || "exact_trimmed";

            const runResult = await PyodideRunner.runCode(code, {
                stdin: tc.input || "",
                timeout: tc.timeout,
            });

            if (!runResult.success) {
                allPassed = false;
                results.push({
                    passed: false,
                    description: desc,
                    actualOutput: runResult.stdout,
                    expectedOutput: tc.hidden ? "(hidden)" : (tc.expectedOutput ?? ""),
                    detail: runResult.error,
                    hidden: !!tc.hidden,
                    error: runResult.error,
                    errorType: runResult.errorType,
                    errorLine: runResult.errorLine,
                    executionTime: runResult.executionTime,
                });
                continue;
            }

            const cmp = compareOutput(runResult.stdout, tc.expectedOutput || "", mode);

            if (!cmp.matched) allPassed = false;

            results.push({
                passed: cmp.matched,
                description: desc,
                actualOutput: tc.hidden && !cmp.matched ? "(hidden test)" : runResult.stdout.trimEnd(),
                expectedOutput: tc.hidden ? "(hidden)" : (tc.expectedOutput ?? "").trimEnd(),
                detail: cmp.detail,
                hidden: !!tc.hidden,
                error: null,
                errorType: null,
                errorLine: null,
                executionTime: runResult.executionTime,
            });
        }

        const passedCount = results.filter((r) => r.passed).length;
        const summary = `${passedCount}/${results.length} test case(s) passed.`;

        return { passed: allPassed, results, summary };
    }

    // =========================================================================
    // 5.  HINT SYSTEM
    // =========================================================================

    /**
     * Retrieve a progressive hint for a challenge.
     *
     * @param {Challenge} challenge     The challenge object (must have .hints array).
     * @param {number}    attemptNumber How many times the student has submitted (1-based).
     * @returns {{ hint: string|null, hintIndex: number, totalHints: number, remainingHints: number }}
     */
    function getHint(challenge, attemptNumber) {
        const hints = challenge.hints || [];
        if (hints.length === 0) {
            return { hint: null, hintIndex: -1, totalHints: 0, remainingHints: 0 };
        }

        // Reveal one more hint every 2 failed attempts, up to the total.
        const index = Math.min(Math.floor((attemptNumber - 1) / 2), hints.length - 1);

        return {
            hint: hints[index],
            hintIndex: index,
            totalHints: hints.length,
            remainingHints: hints.length - index - 1,
        };
    }

    /**
     * Get ALL hints that should be revealed so far (cumulative).
     *
     * @param {Challenge} challenge
     * @param {number}    attemptNumber
     * @returns {string[]}
     */
    function getRevealedHints(challenge, attemptNumber) {
        const hints = challenge.hints || [];
        const count = Math.min(Math.floor((attemptNumber - 1) / 2) + 1, hints.length);
        return hints.slice(0, count);
    }

    // =========================================================================
    // 6.  ERROR ANALYSIS
    // =========================================================================

    /**
     * Analyze a Python error and produce beginner-friendly diagnostics.
     *
     * @param {{ errorType: string|null, error: string|null, errorLine: number|null }} errInfo
     * @param {string} code  The user's source code.
     * @returns {{ detected: boolean, errors: ErrorDiagnosis[] }}
     *
     * @typedef {object} ErrorDiagnosis
     * @property {string} type        Category (syntax, runtime, logic, style).
     * @property {string} title       Short heading.
     * @property {string} explanation Beginner-friendly explanation.
     * @property {string} suggestion  Actionable advice.
     * @property {number|null} line   Line number in user code, if known.
     */
    function analyzeError(errInfo, code) {
        if (!errInfo || !errInfo.error) {
            return { detected: false, errors: [] };
        }

        const errors = [];
        const errMsg = errInfo.error;
        const errType = errInfo.errorType || "";
        const lines = code.split("\n");

        // ----- SyntaxError ---------------------------------------------------
        if (errType === "SyntaxError" || errMsg.includes("SyntaxError")) {
            if (/unexpected EOF/i.test(errMsg) || /expected an indented block/i.test(errMsg)) {
                errors.push({
                    type: "syntax",
                    title: "Incomplete Code",
                    explanation:
                        "Python reached the end of your code but was still expecting more. " +
                        "This usually means a colon (:) is missing, or a block (like inside an `if` or `for`) is empty.",
                    suggestion: "Make sure every `if`, `for`, `while`, `def`, and `class` has an indented body beneath it.",
                    line: errInfo.errorLine,
                });
            } else if (/invalid syntax/i.test(errMsg)) {
                errors.push(_guessSyntaxIssue(errMsg, errInfo.errorLine, lines));
            } else if (/EOL while scanning string/i.test(errMsg)) {
                errors.push({
                    type: "syntax",
                    title: "Unclosed String",
                    explanation: "You started a string with a quote but never closed it on the same line.",
                    suggestion: "Check that every opening quote (' or \") has a matching closing quote.",
                    line: errInfo.errorLine,
                });
            } else if (/unmatched/i.test(errMsg) || /unexpected/i.test(errMsg)) {
                errors.push({
                    type: "syntax",
                    title: "Mismatched Brackets",
                    explanation: "There is an unmatched parenthesis, bracket, or brace.",
                    suggestion: "Count your opening and closing brackets to make sure they match up.",
                    line: errInfo.errorLine,
                });
            } else {
                errors.push({
                    type: "syntax",
                    title: "Syntax Error",
                    explanation: "Python could not understand your code's structure.",
                    suggestion: "Look carefully at the line indicated. Common issues: missing colons, mismatched quotes or brackets, wrong indentation.",
                    line: errInfo.errorLine,
                });
            }
        }

        // ----- NameError -----------------------------------------------------
        else if (errType === "NameError" || errMsg.includes("NameError")) {
            const m = errMsg.match(/name '(\w+)' is not defined/);
            const varName = m ? m[1] : "a variable";
            const suggestion = _suggestSimilarName(varName, lines);
            errors.push({
                type: "runtime",
                title: "Undefined Name",
                explanation:
                    `Python doesn't recognize the name \`${varName}\`. ` +
                    "This means it hasn't been created (assigned) yet, or it's spelled differently elsewhere.",
                suggestion: suggestion || `Double-check the spelling of \`${varName}\` and make sure you assigned a value to it before using it.`,
                line: errInfo.errorLine,
            });
        }

        // ----- TypeError -----------------------------------------------------
        else if (errType === "TypeError" || errMsg.includes("TypeError")) {
            if (/can.t multiply/i.test(errMsg) || /unsupported operand/i.test(errMsg)) {
                errors.push({
                    type: "runtime",
                    title: "Type Mismatch in Operation",
                    explanation:
                        "You tried to use a math operator on values of incompatible types (like adding a string and a number).",
                    suggestion: "Use `int()` or `float()` to convert strings to numbers, or `str()` to convert numbers to strings.",
                    line: errInfo.errorLine,
                });
            } else if (/takes \d+ positional argument/i.test(errMsg)) {
                errors.push({
                    type: "runtime",
                    title: "Wrong Number of Arguments",
                    explanation: "You called a function with too many or too few arguments.",
                    suggestion: "Check the function definition to see how many parameters it expects.",
                    line: errInfo.errorLine,
                });
            } else if (/not callable/i.test(errMsg)) {
                errors.push({
                    type: "runtime",
                    title: "Not Callable",
                    explanation: "You used `()` after something that is not a function.",
                    suggestion: "Make sure you are not accidentally reusing a variable name that shadows a built-in function (like `list = [1,2]` then `list()`).",
                    line: errInfo.errorLine,
                });
            } else {
                errors.push({
                    type: "runtime",
                    title: "Type Error",
                    explanation: "An operation received a value of the wrong type.",
                    suggestion: "Check the types of your variables with `type()` and convert where needed.",
                    line: errInfo.errorLine,
                });
            }
        }

        // ----- IndexError ----------------------------------------------------
        else if (errType === "IndexError" || errMsg.includes("IndexError")) {
            errors.push({
                type: "runtime",
                title: "Index Out of Range",
                explanation:
                    "You tried to access a list/tuple position that doesn't exist. " +
                    "Remember: a list of length N has valid indices 0 through N-1.",
                suggestion: "Check the length of your list with `len()` and make sure your index is within bounds.",
                line: errInfo.errorLine,
            });
        }

        // ----- KeyError ------------------------------------------------------
        else if (errType === "KeyError" || errMsg.includes("KeyError")) {
            errors.push({
                type: "runtime",
                title: "Key Not Found",
                explanation: "You tried to access a dictionary key that doesn't exist.",
                suggestion: "Use `dict.get(key, default)` for safe access, or check with `if key in dict:` first.",
                line: errInfo.errorLine,
            });
        }

        // ----- ValueError ----------------------------------------------------
        else if (errType === "ValueError" || errMsg.includes("ValueError")) {
            if (/invalid literal for int/i.test(errMsg)) {
                errors.push({
                    type: "runtime",
                    title: "Invalid Number Conversion",
                    explanation:
                        "You tried to convert a string to a number, but the string doesn't look like a number (e.g. `int('hello')`).",
                    suggestion:
                        "Make sure the value you are converting actually contains only digits. " +
                        "If reading with `input()`, remember it returns a string.",
                    line: errInfo.errorLine,
                });
            } else {
                errors.push({
                    type: "runtime",
                    title: "Value Error",
                    explanation: "A function received a value that is the right type but inappropriate.",
                    suggestion: "Check what values the function accepts and adjust your argument.",
                    line: errInfo.errorLine,
                });
            }
        }

        // ----- IndentationError ----------------------------------------------
        else if (errType === "IndentationError" || errMsg.includes("IndentationError")) {
            errors.push({
                type: "syntax",
                title: "Indentation Error",
                explanation:
                    "Python uses indentation (spaces at the start of lines) to define code blocks. " +
                    "Your indentation is inconsistent or missing.",
                suggestion:
                    "Use exactly 4 spaces for each indentation level. " +
                    "Don't mix tabs and spaces. Make sure all lines inside a block line up.",
                line: errInfo.errorLine,
            });
        }

        // ----- AttributeError ------------------------------------------------
        else if (errType === "AttributeError" || errMsg.includes("AttributeError")) {
            const m = errMsg.match(/'(\w+)' object has no attribute '(\w+)'/);
            if (m) {
                errors.push({
                    type: "runtime",
                    title: "Attribute Not Found",
                    explanation: `A \`${m[1]}\` object does not have a \`.${m[2]}\` attribute or method.`,
                    suggestion: `Check the spelling of \`.${m[2]}\` and make sure it exists for \`${m[1]}\` types. You can try \`dir()\` to see available attributes.`,
                    line: errInfo.errorLine,
                });
            } else {
                errors.push({
                    type: "runtime",
                    title: "Attribute Error",
                    explanation: "You tried to access an attribute or method that doesn't exist on this object.",
                    suggestion: "Double-check the method name and the type of the variable you're calling it on.",
                    line: errInfo.errorLine,
                });
            }
        }

        // ----- ZeroDivisionError ---------------------------------------------
        else if (errType === "ZeroDivisionError" || errMsg.includes("ZeroDivisionError")) {
            errors.push({
                type: "runtime",
                title: "Division by Zero",
                explanation: "You divided or used modulo (%) with zero as the divisor, which is mathematically undefined.",
                suggestion: "Add a check like `if divisor != 0:` before dividing.",
                line: errInfo.errorLine,
            });
        }

        // ----- TimeoutError --------------------------------------------------
        else if (errType === "TimeoutError") {
            errors.push({
                type: "runtime",
                title: "Infinite Loop Detected",
                explanation:
                    "Your code ran for too long. This usually means there is an infinite loop — " +
                    "a `while` loop whose condition never becomes False, or a recursion that never reaches its base case.",
                suggestion:
                    "Check every `while` loop to make sure the loop variable changes so the condition eventually becomes False. " +
                    "For recursion, verify the base case is reachable.",
                line: null,
            });
        }

        // ----- RecursionError ------------------------------------------------
        else if (errType === "RecursionError" || errMsg.includes("RecursionError")) {
            errors.push({
                type: "runtime",
                title: "Maximum Recursion Depth Exceeded",
                explanation:
                    "Your function calls itself too many times without stopping. " +
                    "This means the base case is never reached or is incorrect.",
                suggestion: "Make sure your recursive function has a base case that actually gets hit, and that each recursive call moves closer to it.",
                line: errInfo.errorLine,
            });
        }

        // ----- FileNotFoundError ---------------------------------------------
        else if (errType === "FileNotFoundError" || errMsg.includes("FileNotFoundError")) {
            errors.push({
                type: "runtime",
                title: "File Not Found",
                explanation: "Your code tries to open a file that doesn't exist in this environment.",
                suggestion: "This coding environment runs in your browser and does not have access to files on your computer. Use variables and input() instead.",
                line: errInfo.errorLine,
            });
        }

        // ----- ModuleNotFoundError -------------------------------------------
        else if (errType === "ModuleNotFoundError" || errMsg.includes("ModuleNotFoundError")) {
            const m = errMsg.match(/No module named '(\w+)'/);
            const modName = m ? m[1] : "the module";
            errors.push({
                type: "runtime",
                title: "Module Not Found",
                explanation: `The module \`${modName}\` is not available in this browser-based Python environment.`,
                suggestion: "Only standard library modules and a few popular packages are available. Try using built-in alternatives.",
                line: errInfo.errorLine,
            });
        }

        // ----- EOFError ------------------------------------------------------
        else if (errType === "EOFError" || errMsg.includes("EOFError")) {
            errors.push({
                type: "runtime",
                title: "Unexpected End of Input",
                explanation: "Your code calls `input()` more times than there are input values provided.",
                suggestion: "Check how many times you call `input()` and make sure it matches the expected number of inputs for this challenge.",
                line: errInfo.errorLine,
            });
        }

        // ----- Fallback ------------------------------------------------------
        else {
            errors.push({
                type: "runtime",
                title: errType || "Error",
                explanation: `An error occurred: ${_truncate(errMsg, 300)}`,
                suggestion: "Read the error message carefully — it usually tells you the line number and what went wrong.",
                line: errInfo.errorLine,
            });
        }

        return { detected: errors.length > 0, errors };
    }

    /**
     * Attempt to guess what went wrong with a generic "invalid syntax" error.
     */
    function _guessSyntaxIssue(errMsg, lineNum, lines) {
        const result = {
            type: "syntax",
            title: "Invalid Syntax",
            explanation: "Python found something unexpected in your code.",
            suggestion: "Common causes: missing colon after if/for/while/def, mismatched parentheses, or a typo.",
            line: lineNum,
        };

        if (lineNum && lineNum <= lines.length) {
            const line = lines[lineNum - 1];
            // Missing colon after keyword
            if (/^\s*(if|elif|else|for|while|def|class|with|try|except|finally)\b/.test(line) && !line.trimEnd().endsWith(":")) {
                result.explanation = "It looks like you're missing a colon (`:`) at the end of this line.";
                result.suggestion = `Add a colon at the end: \`${line.trimEnd()}:\``;
            }
            // = instead of == in condition
            else if (/^\s*(if|elif|while)\b/.test(line) && /[^=!<>]=[^=]/.test(line) && !/==/.test(line)) {
                result.explanation = "You might be using `=` (assignment) instead of `==` (comparison) in a condition.";
                result.suggestion = "Use `==` to compare values. `=` is only for assigning values to variables.";
            }
        }

        return result;
    }

    /**
     * Suggest a similar variable name if one exists in the code.
     */
    function _suggestSimilarName(name, lines) {
        // Extract all identifiers from the code
        const identifiers = new Set();
        const idRegex = /\b([a-zA-Z_]\w*)\b/g;
        for (const line of lines) {
            let m;
            while ((m = idRegex.exec(line)) !== null) {
                identifiers.add(m[1]);
            }
        }

        // Simple Levenshtein distance
        let bestMatch = null;
        let bestDist = Infinity;
        for (const id of identifiers) {
            if (id === name) continue;
            const d = _levenshtein(name.toLowerCase(), id.toLowerCase());
            if (d < bestDist && d <= 2) {
                bestDist = d;
                bestMatch = id;
            }
        }

        if (bestMatch) {
            return `Did you mean \`${bestMatch}\`? Check for typos.`;
        }
        return null;
    }

    function _levenshtein(a, b) {
        const m = a.length, n = b.length;
        const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                dp[i][j] = a[i - 1] === b[j - 1]
                    ? dp[i - 1][j - 1]
                    : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
        return dp[m][n];
    }

    /**
     * Detect challenge-specific common errors by regex patterns on the source.
     */
    function _detectCommonErrorsByPattern(code, commonErrors) {
        const found = [];
        for (const ce of commonErrors) {
            try {
                const re = new RegExp(ce.pattern, ce.flags || "");
                if (re.test(code)) {
                    found.push({
                        type: "common",
                        title: ce.title || "Common Mistake",
                        explanation: ce.message || ce.feedback || "",
                        suggestion: ce.suggestion || "",
                        line: null,
                    });
                }
            } catch {
                // Skip invalid regex patterns in challenge definitions.
            }
        }
        return found;
    }

    // =========================================================================
    // 7.  CODE QUALITY CHECKS
    // =========================================================================

    /**
     * Run basic code-quality / style heuristics.
     *
     * @param {string} code     Python source.
     * @param {object} astData  The AST analysis result.
     * @returns {{ passed: boolean, details: object[] }}
     */
    function _evaluateCodeQuality(code, astData) {
        const details = [];
        const c = astData.constructs;

        if (!c) {
            // Can't analyze if there's a parse error
            return { passed: true, details: [] };
        }

        // --- Variable naming: snake_case ------------------------------------
        const BAD_NAMES_RE = /^[a-z]+[A-Z]/; // camelCase
        const SINGLE_CHAR = /^[a-zA-Z]$/;
        const ACCEPTABLE_SINGLE = new Set(["i", "j", "k", "n", "x", "y", "z", "e", "_"]);
        const allVarNames = [...new Set([...c.assignments, ...c.augmented_assignments])];

        const camelCaseVars = allVarNames.filter((v) => BAD_NAMES_RE.test(v));
        if (camelCaseVars.length > 0) {
            details.push({
                check: "naming_convention",
                passed: false,
                severity: "suggestion",
                message:
                    `Python convention uses \`snake_case\` for variables, but you used camelCase: ` +
                    camelCaseVars.map((v) => `\`${v}\``).join(", ") +
                    `. Consider renaming (e.g. \`${camelCaseVars[0]}\` -> \`${_toSnakeCase(camelCaseVars[0])}\`).`,
            });
        }

        const poorSingleChar = allVarNames.filter(
            (v) => SINGLE_CHAR.test(v) && !ACCEPTABLE_SINGLE.has(v)
        );
        if (poorSingleChar.length > 0) {
            details.push({
                check: "descriptive_names",
                passed: false,
                severity: "suggestion",
                message:
                    `Use descriptive variable names instead of single letters like ` +
                    poorSingleChar.map((v) => `\`${v}\``).join(", ") + ".",
            });
        }

        // --- Very long lines ------------------------------------------------
        const longLines = code.split("\n").filter((l) => l.length > 100);
        if (longLines.length > 0) {
            details.push({
                check: "line_length",
                passed: false,
                severity: "suggestion",
                message: `${longLines.length} line(s) exceed 100 characters. Consider breaking them up for readability.`,
            });
        }

        // --- Function docstrings (only flag for intermediate+ challenges) ----
        const funcsWithoutDocstring = c.functions.filter((f) => !f.has_docstring);
        if (c.functions.length > 0 && funcsWithoutDocstring.length === c.functions.length) {
            details.push({
                check: "docstrings",
                passed: false,
                severity: "suggestion",
                message:
                    "None of your functions have docstrings. Adding a short description helps others understand your code.",
            });
        }

        // --- Unused-looking variables (very rough heuristic) ----------------
        // We skip this for now because proper unused-variable detection requires
        // scope analysis beyond what a single-pass visitor provides.

        // --- Magic numbers --------------------------------------------------
        const magicNums = c.numeric_literals.filter(
            (n) => typeof n === "number" && ![-1, 0, 1, 2, 10, 100].includes(n)
        );
        if (magicNums.length > 5) {
            details.push({
                check: "magic_numbers",
                passed: false,
                severity: "suggestion",
                message: "Your code contains many literal numbers. Consider assigning them to named constants for clarity.",
            });
        }

        // Quality checks never block passing; they are advisory.
        const allPassed = details.every((d) => d.passed);
        return { passed: allPassed, details };
    }

    function _toSnakeCase(s) {
        return s.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
    }

    // =========================================================================
    // 8.  SCORING
    // =========================================================================

    /**
     * Calculate a 0–100 score.
     *
     * Default rubric weights (can be overridden per challenge):
     *   testCases:   70 %
     *   structure:   20 %
     *   quality:     10 %
     *
     * @param {object} params
     * @param {object} params.testResults
     * @param {object} params.structureResults
     * @param {object} params.qualityResults
     * @param {object} [params.scoringRubric]
     * @returns {number}
     */
    function calculateScore({ testResults, structureResults, qualityResults, scoringRubric }) {
        const rubric = Object.assign(
            { testWeight: 70, structureWeight: 20, qualityWeight: 10 },
            scoringRubric || {}
        );

        // --- Test-case score ------------------------------------------------
        let testScore = 100; // default if there are no tests
        if (testResults.results.length > 0) {
            // Weighted by points
            let totalPoints = 0;
            let earnedPoints = 0;
            for (const r of testResults.results) {
                const pts = r.points ?? 1;
                totalPoints += pts;
                if (r.passed) earnedPoints += pts;
            }
            testScore = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
        }

        // --- Structure score ------------------------------------------------
        let structScore = 100;
        if (structureResults.details.length > 0) {
            const passed = structureResults.details.filter((d) => d.passed).length;
            structScore = (passed / structureResults.details.length) * 100;
        }

        // --- Quality score --------------------------------------------------
        let qualScore = 100;
        if (qualityResults.details.length > 0) {
            const passed = qualityResults.details.filter((d) => d.passed).length;
            qualScore = (passed / qualityResults.details.length) * 100;
        }

        const total =
            (testScore * rubric.testWeight +
                structScore * rubric.structureWeight +
                qualScore * rubric.qualityWeight) /
            (rubric.testWeight + rubric.structureWeight + rubric.qualityWeight);

        return Math.round(Math.max(0, Math.min(100, total)));
    }

    // =========================================================================
    // 9.  FEEDBACK GENERATION
    // =========================================================================

    /**
     * Produce a human-readable feedback string.
     *
     * @param {object} params  All the partial results from evaluation.
     * @returns {string}
     */
    function generateFeedback({
        testResults,
        structureResults,
        qualityResults,
        errorAnalysis,
        syntaxError,
        score,
        passed,
    }) {
        const parts = [];

        // -- Syntax error (top priority) --------------------------------------
        if (syntaxError) {
            parts.push(
                `Your code has a syntax error on line ${syntaxError.line || "?"}:\n` +
                `  ${syntaxError.message}\n` +
                (syntaxError.text ? `  Near: ${syntaxError.text.trim()}\n` : "") +
                `Fix the syntax error before the code can be tested.`
            );
            if (errorAnalysis && errorAnalysis.errors.length > 0) {
                parts.push("");
                for (const e of errorAnalysis.errors) {
                    parts.push(`${e.title}: ${e.explanation}`);
                    if (e.suggestion) parts.push(`  Tip: ${e.suggestion}`);
                }
            }
            return parts.join("\n");
        }

        // -- Runtime errors ---------------------------------------------------
        if (errorAnalysis && errorAnalysis.detected) {
            for (const e of errorAnalysis.errors) {
                parts.push(`${e.title}${e.line ? ` (line ${e.line})` : ""}: ${e.explanation}`);
                if (e.suggestion) parts.push(`  Tip: ${e.suggestion}`);
                parts.push("");
            }
        }

        // -- Test results -----------------------------------------------------
        if (testResults && testResults.results.length > 0) {
            const p = testResults.results.filter((r) => r.passed).length;
            const t = testResults.results.length;
            if (p === t) {
                parts.push(`All ${t} test case(s) passed!`);
            } else {
                parts.push(`${p}/${t} test case(s) passed.`);
                // Show first few failures
                const failures = testResults.results.filter((r) => !r.passed);
                for (const f of failures.slice(0, 3)) {
                    if (f.error) {
                        parts.push(`  ${f.description}: Error — ${_truncate(f.error.split("\n").pop(), 120)}`);
                    } else if (!f.hidden) {
                        parts.push(`  ${f.description}: Expected "${_truncate(f.expectedOutput, 80)}" but got "${_truncate(f.actualOutput, 80)}"`);
                    } else {
                        parts.push(`  ${f.description}: Output does not match (hidden test).`);
                    }
                }
                if (failures.length > 3) {
                    parts.push(`  ...and ${failures.length - 3} more failing test(s).`);
                }
            }
            parts.push("");
        }

        // -- Structure requirements -------------------------------------------
        if (structureResults && structureResults.details.length > 0) {
            const unmet = structureResults.details.filter((d) => !d.passed);
            if (unmet.length > 0) {
                parts.push("Requirements not met:");
                for (const u of unmet) {
                    parts.push(`  - ${u.message}`);
                }
                parts.push("");
            }
        }

        // -- Quality suggestions ----------------------------------------------
        if (qualityResults && qualityResults.details.length > 0) {
            const issues = qualityResults.details.filter((d) => !d.passed);
            if (issues.length > 0) {
                parts.push("Style suggestions:");
                for (const iss of issues) {
                    parts.push(`  - ${iss.message}`);
                }
                parts.push("");
            }
        }

        // -- Overall ----------------------------------------------------------
        if (typeof score === "number") {
            parts.push(`Score: ${score}/100`);
        }
        if (passed === true) {
            parts.push("Great work — challenge passed!");
        } else if (passed === false && !syntaxError) {
            parts.push("Not quite there yet. Review the feedback above and try again!");
        }

        return parts.join("\n").trim();
    }

    // =========================================================================
    // 10. UTILITIES
    // =========================================================================

    function _truncate(s, max) {
        if (!s) return "";
        return s.length > max ? s.slice(0, max - 3) + "..." : s;
    }

    function _indent(s, spaces = 4) {
        const pad = " ".repeat(spaces);
        return s
            .split("\n")
            .map((l) => pad + l)
            .join("\n");
    }

    // =========================================================================
    // PUBLIC API
    // =========================================================================

    return Object.freeze({
        evaluateCode,
        compareOutput,
        analyzeCodeStructure,
        runTestCases,
        getHint,
        getRevealedHints,
        analyzeError,
        calculateScore,
        generateFeedback,
    });
})();
