// =============================================================================
// PyodideRunner — Manages the Pyodide WebAssembly Python runtime
// =============================================================================
// Handles loading, initialization, code execution, stdin simulation,
// stdout/stderr capture, and timeout enforcement.
// =============================================================================

const PyodideRunner = (() => {
    "use strict";

    // -------------------------------------------------------------------------
    // Private state
    // -------------------------------------------------------------------------
    let _pyodide = null;
    let _loading = false;
    let _loadPromise = null;

    const PYODIDE_CDN = "pyodide/";
    const DEFAULT_TIMEOUT_MS = 10_000; // 10 seconds

    // -------------------------------------------------------------------------
    // Initialization
    // -------------------------------------------------------------------------

    /**
     * Load the Pyodide runtime. Safe to call multiple times — subsequent calls
     * return the same promise.
     * @returns {Promise<object>} The pyodide instance.
     */
    async function init() {
        if (_pyodide) return _pyodide;
        if (_loading) return _loadPromise;

        _loading = true;
        _loadPromise = _doLoad();
        return _loadPromise;
    }

    async function _doLoad() {
        try {
            if (typeof loadPyodide === "undefined") {
                throw new Error(
                    "Pyodide loader script not found. " +
                    "Add <script src=\"" + PYODIDE_CDN + "pyodide.js\"></script> to your HTML."
                );
            }
            _pyodide = await loadPyodide({ indexURL: PYODIDE_CDN });

            // Pre-load the `ast` module so AST analysis is instant later.
            await _pyodide.runPythonAsync("import ast, json, sys, io");

            return _pyodide;
        } catch (err) {
            _loading = false;
            _loadPromise = null;
            throw err;
        }
    }

    /**
     * @returns {boolean} Whether the runtime is ready.
     */
    function isReady() {
        return _pyodide !== null;
    }

    // -------------------------------------------------------------------------
    // Code execution
    // -------------------------------------------------------------------------

    /**
     * Run a Python program, capturing stdout/stderr and enforcing a timeout.
     *
     * @param {string}   code             The user's Python source code.
     * @param {object}   [options]
     * @param {string}   [options.stdin]  Text to feed to input() calls.
     * @param {number}   [options.timeout] Max execution time in ms.
     * @returns {Promise<RunResult>}
     *
     * @typedef  {object} RunResult
     * @property {string}       stdout       Captured standard output.
     * @property {string}       stderr       Captured standard error.
     * @property {*}            returnValue  The Python expression value (if any).
     * @property {boolean}      success      True when no exception occurred.
     * @property {string|null}  error        The error message, or null.
     * @property {string|null}  errorType    The Python exception class name, or null.
     * @property {number|null}  errorLine    The line number of the error, or null.
     * @property {number}       executionTime  Wall-clock ms elapsed.
     */
    async function runCode(code, options = {}) {
        const py = await init();
        const timeout = options.timeout ?? DEFAULT_TIMEOUT_MS;
        const stdinText = options.stdin ?? "";

        const startTime = performance.now();

        // Build a small wrapper that:
        //  1. Redirects stdout / stderr to StringIO buffers.
        //  2. Patches input() to read from a pre-filled buffer.
        //  3. Executes the user code inside exec() so we can catch exceptions.
        const stdinLines = JSON.stringify(stdinText.split("\n"));

        const wrapper = `
import sys, io, traceback, json

_stdout_buf = io.StringIO()
_stderr_buf = io.StringIO()
_old_stdout = sys.stdout
_old_stderr = sys.stderr
sys.stdout = _stdout_buf
sys.stderr = _stderr_buf

_stdin_lines = ${stdinLines}
_stdin_index = 0

def _patched_input(prompt=""):
    global _stdin_index
    if prompt:
        sys.stdout.write(str(prompt))
    if _stdin_index < len(_stdin_lines):
        line = _stdin_lines[_stdin_index]
        _stdin_index += 1
        return line
    raise EOFError("No more input available")

# Patch input() — handle both dict-style and module-style builtins
if isinstance(__builtins__, dict):
    __builtins__["input"] = _patched_input
else:
    __builtins__.input = _patched_input

_user_error = None
_user_error_type = None
_user_error_line = None

try:
    exec(${JSON.stringify(code)}, {"__builtins__": __builtins__, "__name__": "__main__"})
except Exception as _e:
    _user_error = traceback.format_exc()
    _user_error_type = type(_e).__name__
    # Try to extract line number
    import re as _re
    _m = _re.search(r'line (\\d+)', str(_user_error))
    if _m:
        _user_error_line = int(_m.group(1))

sys.stdout = _old_stdout
sys.stderr = _old_stderr

_result = json.dumps({
    "stdout": _stdout_buf.getvalue(),
    "stderr": _stderr_buf.getvalue(),
    "error": _user_error,
    "errorType": _user_error_type,
    "errorLine": _user_error_line,
})
_result
`;

        try {
            const resultJSON = await _withTimeout(
                py.runPythonAsync(wrapper),
                timeout
            );

            const elapsed = performance.now() - startTime;
            const parsed = JSON.parse(resultJSON);

            return {
                stdout: parsed.stdout,
                stderr: parsed.stderr,
                returnValue: null,
                success: parsed.error === null,
                error: parsed.error,
                errorType: parsed.errorType,
                errorLine: parsed.errorLine,
                executionTime: Math.round(elapsed),
            };
        } catch (err) {
            const elapsed = performance.now() - startTime;

            // Timeout or Pyodide-level crash
            if (err.message === "__TIMEOUT__") {
                return {
                    stdout: "",
                    stderr: "",
                    returnValue: null,
                    success: false,
                    error: `Your code took longer than ${timeout / 1000} seconds to run. ` +
                           `It might contain an infinite loop.`,
                    errorType: "TimeoutError",
                    errorLine: null,
                    executionTime: Math.round(elapsed),
                };
            }

            return {
                stdout: "",
                stderr: "",
                returnValue: null,
                success: false,
                error: String(err),
                errorType: "RuntimeError",
                errorLine: null,
                executionTime: Math.round(elapsed),
            };
        }
    }

    // -------------------------------------------------------------------------
    // AST helpers (executed inside Pyodide)
    // -------------------------------------------------------------------------

    /**
     * Parse Python source and return a JSON description of all AST constructs
     * found. This never executes the code — it only parses it.
     *
     * @param {string} code  Python source code.
     * @returns {Promise<object>} Parsed AST summary.
     */
    async function analyzeAST(code) {
        const py = await init();

        const script = `
import ast, json

_code = ${JSON.stringify(code)}

class _Analyzer(ast.NodeVisitor):
    def __init__(self):
        self.constructs = {
            "imports": [],
            "functions": [],
            "classes": [],
            "for_loops": 0,
            "while_loops": 0,
            "if_statements": 0,
            "try_except": 0,
            "with_statements": 0,
            "list_comprehensions": 0,
            "dict_comprehensions": 0,
            "set_comprehensions": 0,
            "generator_expressions": 0,
            "lambda_functions": 0,
            "global_variables": [],
            "return_statements": 0,
            "yield_statements": 0,
            "assert_statements": 0,
            "raise_statements": 0,
            "assignments": [],
            "augmented_assignments": [],
            "f_strings": 0,
            "print_calls": 0,
            "input_calls": 0,
            "builtin_calls": [],
            "method_calls": [],
            "subscripts": 0,
            "slices": 0,
            "boolean_ops": 0,
            "comparisons": 0,
            "string_literals": [],
            "numeric_literals": [],
            "recursion": [],
            "decorators": [],
            "nested_functions": [],
            "variable_names": set(),
        }
        self._current_function = None

    def visit_Import(self, node):
        for alias in node.names:
            self.constructs["imports"].append(alias.name)
        self.generic_visit(node)

    def visit_ImportFrom(self, node):
        module = node.module or ""
        for alias in node.names:
            self.constructs["imports"].append(f"{module}.{alias.name}")
        self.generic_visit(node)

    def visit_FunctionDef(self, node):
        info = {
            "name": node.name,
            "args": [a.arg for a in node.args.args],
            "has_return": any(isinstance(n, ast.Return) for n in ast.walk(node)),
            "has_docstring": (
                isinstance(node.body[0], ast.Expr) and isinstance(node.body[0].value, (ast.Constant,))
                and isinstance(node.body[0].value.value, str)
            ) if node.body else False,
            "decorators": [ast.dump(d) for d in node.decorator_list],
            "line": node.lineno,
        }
        if self._current_function is not None:
            self.constructs["nested_functions"].append(info["name"])
        self.constructs["functions"].append(info)
        # Check for recursion
        for child in ast.walk(node):
            if isinstance(child, ast.Call) and isinstance(child.func, ast.Name) and child.func.id == node.name:
                self.constructs["recursion"].append(node.name)
                break
        old = self._current_function
        self._current_function = node.name
        self.generic_visit(node)
        self._current_function = old

    visit_AsyncFunctionDef = visit_FunctionDef

    def visit_ClassDef(self, node):
        bases = []
        for b in node.bases:
            if isinstance(b, ast.Name):
                bases.append(b.id)
            elif isinstance(b, ast.Attribute):
                bases.append(ast.dump(b))
        self.constructs["classes"].append({
            "name": node.name,
            "bases": bases,
            "methods": [n.name for n in node.body if isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef))],
            "line": node.lineno,
        })
        self.generic_visit(node)

    def visit_For(self, node):
        self.constructs["for_loops"] += 1
        self.generic_visit(node)

    def visit_While(self, node):
        self.constructs["while_loops"] += 1
        self.generic_visit(node)

    def visit_If(self, node):
        self.constructs["if_statements"] += 1
        self.generic_visit(node)

    def visit_Try(self, node):
        self.constructs["try_except"] += 1
        self.generic_visit(node)

    # Python 3.11+ TryStar
    def visit_TryStar(self, node):
        self.constructs["try_except"] += 1
        self.generic_visit(node)

    def visit_With(self, node):
        self.constructs["with_statements"] += 1
        self.generic_visit(node)

    def visit_ListComp(self, node):
        self.constructs["list_comprehensions"] += 1
        self.generic_visit(node)

    def visit_DictComp(self, node):
        self.constructs["dict_comprehensions"] += 1
        self.generic_visit(node)

    def visit_SetComp(self, node):
        self.constructs["set_comprehensions"] += 1
        self.generic_visit(node)

    def visit_GeneratorExp(self, node):
        self.constructs["generator_expressions"] += 1
        self.generic_visit(node)

    def visit_Lambda(self, node):
        self.constructs["lambda_functions"] += 1
        self.generic_visit(node)

    def visit_Return(self, node):
        self.constructs["return_statements"] += 1
        self.generic_visit(node)

    def visit_Yield(self, node):
        self.constructs["yield_statements"] += 1
        self.generic_visit(node)

    def visit_YieldFrom(self, node):
        self.constructs["yield_statements"] += 1
        self.generic_visit(node)

    def visit_Assert(self, node):
        self.constructs["assert_statements"] += 1
        self.generic_visit(node)

    def visit_Raise(self, node):
        self.constructs["raise_statements"] += 1
        self.generic_visit(node)

    def visit_Assign(self, node):
        for target in node.targets:
            if isinstance(target, ast.Name):
                self.constructs["assignments"].append(target.id)
                self.constructs["variable_names"].add(target.id)
        self.generic_visit(node)

    def visit_AugAssign(self, node):
        if isinstance(node.target, ast.Name):
            self.constructs["augmented_assignments"].append(node.target.id)
            self.constructs["variable_names"].add(node.target.id)
        self.generic_visit(node)

    def visit_JoinedStr(self, node):
        self.constructs["f_strings"] += 1
        self.generic_visit(node)

    def visit_Call(self, node):
        if isinstance(node.func, ast.Name):
            name = node.func.id
            if name == "print":
                self.constructs["print_calls"] += 1
            elif name == "input":
                self.constructs["input_calls"] += 1
            self.constructs["builtin_calls"].append(name)
        elif isinstance(node.func, ast.Attribute):
            self.constructs["method_calls"].append(node.func.attr)
        self.generic_visit(node)

    def visit_Subscript(self, node):
        self.constructs["subscripts"] += 1
        if isinstance(node.slice, ast.Slice):
            self.constructs["slices"] += 1
        self.generic_visit(node)

    def visit_BoolOp(self, node):
        self.constructs["boolean_ops"] += 1
        self.generic_visit(node)

    def visit_Compare(self, node):
        self.constructs["comparisons"] += 1
        self.generic_visit(node)

    def visit_Constant(self, node):
        if isinstance(node.value, str):
            self.constructs["string_literals"].append(node.value)
        elif isinstance(node.value, (int, float)):
            self.constructs["numeric_literals"].append(node.value)
        self.generic_visit(node)

    def visit_Name(self, node):
        # Track variable reads too
        if isinstance(node.ctx, ast.Load):
            self.constructs["variable_names"].add(node.id)
        self.generic_visit(node)

_parse_error = None
_ast_result = None

try:
    _tree = ast.parse(_code)
    _a = _Analyzer()
    _a.visit(_tree)
    _c = _a.constructs
    _c["variable_names"] = sorted(_c["variable_names"])
    _ast_result = _c
except SyntaxError as _e:
    _parse_error = {
        "message": str(_e.msg),
        "line": _e.lineno,
        "offset": _e.offset,
        "text": _e.text,
    }

json.dumps({"constructs": _ast_result, "parseError": _parse_error})
`;

        try {
            const raw = await py.runPythonAsync(script);
            return JSON.parse(raw);
        } catch (err) {
            return {
                constructs: null,
                parseError: { message: String(err), line: null, offset: null, text: null },
            };
        }
    }

    // -------------------------------------------------------------------------
    // Utility
    // -------------------------------------------------------------------------

    function _withTimeout(promise, ms) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error("__TIMEOUT__")), ms);
            promise.then(
                (val) => { clearTimeout(timer); resolve(val); },
                (err) => { clearTimeout(timer); reject(err); }
            );
        });
    }

    // -------------------------------------------------------------------------
    // Public API
    // -------------------------------------------------------------------------
    return Object.freeze({
        init,
        isReady,
        runCode,
        analyzeAST,
        PYODIDE_CDN,
    });
})();
