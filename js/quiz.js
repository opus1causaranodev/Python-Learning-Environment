// =============================================================================
// quiz.js — Quiz Mode for Python Learning Environment
// =============================================================================
// Multiple-choice quizzes that test understanding of Python concepts per module.
// Each module has 2-5 questions. Results are persisted in localStorage.
// =============================================================================

(function () {
    "use strict";

    // -------------------------------------------------------------------------
    // Quiz question bank — keyed by moduleId (number)
    // -------------------------------------------------------------------------
    const QUIZ_BANK = {

        // =====================================================================
        // Module 1: Python Basics — Variables, print(), data types, syntax
        // =====================================================================
        1: [
            {
                moduleId: 1,
                question: "What is the output of print(type(42))?",
                options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "<class 'number'>"],
                correctIndex: 0,
                explanation: "42 is an integer literal, so type() returns <class 'int'>. Python has no 'number' type."
            },
            {
                moduleId: 1,
                question: "Which of the following is a valid variable name in Python?",
                options: ["2fast", "my-var", "_score", "class"],
                correctIndex: 2,
                explanation: "Variable names must start with a letter or underscore and cannot be reserved keywords. '_score' is valid. '2fast' starts with a digit, 'my-var' contains a hyphen, and 'class' is a reserved keyword."
            },
            {
                moduleId: 1,
                question: "What does input() always return?",
                options: ["An integer", "A float", "A string", "The type the user intended"],
                correctIndex: 2,
                explanation: "The input() function always returns a string, even if the user types a number. You must use int() or float() to convert it."
            },
            {
                moduleId: 1,
                question: "What will print('Hello' + ' ' + 'World') output?",
                options: ["HelloWorld", "Hello World", "Hello + World", "Error"],
                correctIndex: 1,
                explanation: "The + operator concatenates strings. 'Hello' + ' ' + 'World' joins them into 'Hello World' with the space in between."
            },
            {
                moduleId: 1,
                question: "Which f-string correctly inserts the variable name into a greeting?",
                options: [
                    "f'Hello {name}'",
                    "'Hello {name}'",
                    "f'Hello (name)'",
                    "'Hello' + {name}"
                ],
                correctIndex: 0,
                explanation: "F-strings require the 'f' prefix before the quote and curly braces {} around variable names. Without the 'f' prefix, {name} is treated as literal text."
            }
        ],

        // =====================================================================
        // Module 2: Operators & Expressions
        // =====================================================================
        2: [
            {
                moduleId: 2,
                question: "What is the result of 17 % 5 in Python?",
                options: ["3", "3.4", "2", "5"],
                correctIndex: 2,
                explanation: "The modulo operator (%) returns the remainder of division. 17 divided by 5 is 3 with a remainder of 2."
            },
            {
                moduleId: 2,
                question: "What does the // operator do?",
                options: [
                    "Regular division",
                    "Floor division (rounds down to nearest integer)",
                    "Exponentiation",
                    "Modulo"
                ],
                correctIndex: 1,
                explanation: "The // operator performs floor division, which divides and rounds down to the nearest whole number. For example, 7 // 2 gives 3."
            },
            {
                moduleId: 2,
                question: "What is the result of True and False?",
                options: ["True", "False", "None", "Error"],
                correctIndex: 1,
                explanation: "'and' returns True only when both operands are True. Since one operand is False, the result is False."
            },
            {
                moduleId: 2,
                question: "What does not (5 > 3) evaluate to?",
                options: ["True", "False", "5", "None"],
                correctIndex: 1,
                explanation: "5 > 3 is True, and the 'not' operator inverts it to False."
            },
            {
                moduleId: 2,
                question: "What is the value of x after: x = 10; x += 3; x *= 2?",
                options: ["26", "23", "16", "36"],
                correctIndex: 0,
                explanation: "x starts at 10. x += 3 makes it 13. x *= 2 makes it 26. Augmented assignment operators modify the variable in place."
            }
        ],

        // =====================================================================
        // Module 3: Control Flow — if/elif/else, comparison, boolean logic
        // =====================================================================
        3: [
            {
                moduleId: 3,
                question: "What keyword is used for a secondary condition check in Python?",
                options: ["else if", "elseif", "elif", "elsif"],
                correctIndex: 2,
                explanation: "Python uses 'elif' (short for 'else if') for secondary condition checks. Other languages use 'else if' or 'elsif', but Python's keyword is 'elif'."
            },
            {
                moduleId: 3,
                question: "What will this code print?\n\nx = 15\nif x > 20:\n    print('A')\nelif x > 10:\n    print('B')\nelse:\n    print('C')",
                options: ["A", "B", "C", "A and B"],
                correctIndex: 1,
                explanation: "x is 15. The first condition (x > 20) is False. The elif (x > 10) is True, so 'B' is printed. Once a branch executes, the rest are skipped."
            },
            {
                moduleId: 3,
                question: "Which comparison operator checks for equality in Python?",
                options: ["=", "==", "===", "equals()"],
                correctIndex: 1,
                explanation: "== is the equality comparison operator. = is for assignment, === does not exist in Python, and equals() is not a built-in function."
            },
            {
                moduleId: 3,
                question: "What does 'pass' do inside an if block?",
                options: [
                    "Skips to the next iteration",
                    "Does nothing (placeholder)",
                    "Exits the program",
                    "Returns None"
                ],
                correctIndex: 1,
                explanation: "'pass' is a null operation — it does nothing. It is used as a placeholder when a statement is syntactically required but no action is needed."
            },
            {
                moduleId: 3,
                question: "What is the output of: print(10 == 10.0)?",
                options: ["True", "False", "Error", "None"],
                correctIndex: 0,
                explanation: "Python considers 10 (int) and 10.0 (float) equal in value comparisons. The == operator compares values, not types."
            }
        ],

        // =====================================================================
        // Module 4: Loops — for, while, range(), break/continue
        // =====================================================================
        4: [
            {
                moduleId: 4,
                question: "How many times does this loop run?\n\nfor i in range(5):\n    print(i)",
                options: ["4", "5", "6", "Infinite"],
                correctIndex: 1,
                explanation: "range(5) generates numbers 0, 1, 2, 3, 4 — that is 5 iterations. The stop value (5) is exclusive."
            },
            {
                moduleId: 4,
                question: "What does the 'break' statement do inside a loop?",
                options: [
                    "Skips the current iteration",
                    "Exits the loop immediately",
                    "Restarts the loop",
                    "Pauses the loop"
                ],
                correctIndex: 1,
                explanation: "'break' immediately terminates the innermost loop and execution continues with the statement after the loop."
            },
            {
                moduleId: 4,
                question: "What does 'continue' do inside a loop?",
                options: [
                    "Exits the loop",
                    "Skips to the next iteration",
                    "Repeats the current iteration",
                    "Does nothing"
                ],
                correctIndex: 1,
                explanation: "'continue' skips the rest of the current iteration and moves to the next one. The loop itself keeps running."
            },
            {
                moduleId: 4,
                question: "What does range(2, 10, 3) produce?",
                options: ["[2, 5, 8]", "[2, 5, 8, 11]", "[2, 3, 4, 5, 6, 7, 8, 9]", "[3, 6, 9]"],
                correctIndex: 0,
                explanation: "range(2, 10, 3) starts at 2, increments by 3, and stops before 10. So it produces 2, 5, 8."
            },
            {
                moduleId: 4,
                question: "Which loop should you use when you don't know how many iterations are needed?",
                options: ["for loop", "while loop", "do-while loop", "foreach loop"],
                correctIndex: 1,
                explanation: "A while loop continues as long as its condition is True, making it ideal when the number of iterations is unknown. Python does not have do-while or foreach loops."
            }
        ],

        // =====================================================================
        // Module 5: Strings & String Methods
        // =====================================================================
        5: [
            {
                moduleId: 5,
                question: "What does 'hello'.upper() return?",
                options: ["'Hello'", "'HELLO'", "'hello'", "Error"],
                correctIndex: 1,
                explanation: "The upper() method converts all characters in a string to uppercase, returning 'HELLO'."
            },
            {
                moduleId: 5,
                question: "What is 'Python'[1:4]?",
                options: ["'Pyt'", "'yth'", "'ytho'", "'Pyth'"],
                correctIndex: 1,
                explanation: "String slicing [1:4] starts at index 1 ('y') and goes up to but not including index 4. So 'Python'[1:4] is 'yth'."
            },
            {
                moduleId: 5,
                question: "What does 'hello world'.split() return?",
                options: [
                    "['hello world']",
                    "['hello', 'world']",
                    "['h','e','l','l','o',' ','w','o','r','l','d']",
                    "('hello', 'world')"
                ],
                correctIndex: 1,
                explanation: "split() without arguments splits on whitespace by default, returning a list of words: ['hello', 'world']."
            },
            {
                moduleId: 5,
                question: "What does 'abc' * 3 produce?",
                options: ["'abc3'", "'abcabcabc'", "Error", "['abc','abc','abc']"],
                correctIndex: 1,
                explanation: "The * operator with a string and integer repeats the string that many times. 'abc' * 3 produces 'abcabcabc'."
            },
            {
                moduleId: 5,
                question: "Which method removes whitespace from both ends of a string?",
                options: ["clean()", "strip()", "trim()", "remove()"],
                correctIndex: 1,
                explanation: "strip() removes leading and trailing whitespace from a string. Python does not have trim(), clean(), or remove() for strings (remove() is a list method)."
            }
        ],

        // =====================================================================
        // Module 6: Lists, Tuples & Sets
        // =====================================================================
        6: [
            {
                moduleId: 6,
                question: "What does [1, 2, 3].append(4) do?",
                options: [
                    "Returns [1, 2, 3, 4]",
                    "Adds 4 to the list in place and returns None",
                    "Creates a new list [1, 2, 3, 4]",
                    "Error"
                ],
                correctIndex: 1,
                explanation: "append() modifies the list in place by adding the element to the end. It returns None, not the modified list."
            },
            {
                moduleId: 6,
                question: "Which data structure is immutable?",
                options: ["List", "Dictionary", "Tuple", "Set"],
                correctIndex: 2,
                explanation: "Tuples are immutable — once created, their elements cannot be changed, added, or removed. Lists, dictionaries, and sets are all mutable."
            },
            {
                moduleId: 6,
                question: "What does set([1, 2, 2, 3, 3, 3]) produce?",
                options: ["{1, 2, 2, 3, 3, 3}", "{1, 2, 3}", "[1, 2, 3]", "Error"],
                correctIndex: 1,
                explanation: "Sets automatically remove duplicates. Converting a list with duplicates to a set keeps only unique values: {1, 2, 3}."
            },
            {
                moduleId: 6,
                question: "How do you access the last element of a list called 'items'?",
                options: ["items[last]", "items[-1]", "items[len]", "items.last()"],
                correctIndex: 1,
                explanation: "Negative indexing in Python lets you access elements from the end. items[-1] returns the last element."
            },
            {
                moduleId: 6,
                question: "What is the result of [1, 2, 3] + [4, 5]?",
                options: ["[1, 2, 3, 4, 5]", "[5, 7, 3]", "Error", "[[1,2,3],[4,5]]"],
                correctIndex: 0,
                explanation: "The + operator concatenates two lists into a new list containing all elements from both: [1, 2, 3, 4, 5]."
            }
        ],

        // =====================================================================
        // Module 7: Dictionaries
        // =====================================================================
        7: [
            {
                moduleId: 7,
                question: "How do you access the value for key 'name' in a dictionary d?",
                options: ["d.name", "d['name']", "d(name)", "d.get[name]"],
                correctIndex: 1,
                explanation: "Dictionary values are accessed using bracket notation with the key: d['name']. d.get('name') also works, but d.get[name] is invalid syntax."
            },
            {
                moduleId: 7,
                question: "What does d.get('age', 0) return if 'age' is not in d?",
                options: ["None", "KeyError", "0", "False"],
                correctIndex: 2,
                explanation: "The get() method returns the default value (second argument) when the key is not found. Here it returns 0 instead of raising a KeyError."
            },
            {
                moduleId: 7,
                question: "Which method returns all keys of a dictionary?",
                options: ["d.values()", "d.keys()", "d.items()", "d.all()"],
                correctIndex: 1,
                explanation: "d.keys() returns a view object containing all the keys. d.values() returns values, d.items() returns key-value pairs."
            }
        ],

        // =====================================================================
        // Module 8: Functions
        // =====================================================================
        8: [
            {
                moduleId: 8,
                question: "What keyword is used to define a function in Python?",
                options: ["function", "func", "def", "define"],
                correctIndex: 2,
                explanation: "Python uses the 'def' keyword to define functions: def my_function():. Other languages use 'function' but Python does not."
            },
            {
                moduleId: 8,
                question: "What does a function return if it has no return statement?",
                options: ["0", "''", "None", "Error"],
                correctIndex: 2,
                explanation: "If a function ends without a return statement (or uses return without a value), it implicitly returns None."
            },
            {
                moduleId: 8,
                question: "What is a default parameter?",
                options: [
                    "A parameter that must be provided",
                    "A parameter with a pre-set value used when no argument is given",
                    "The first parameter in a function",
                    "A global variable"
                ],
                correctIndex: 1,
                explanation: "Default parameters have values defined in the function signature (e.g., def greet(name='World')). If the caller omits the argument, the default is used."
            }
        ],

        // =====================================================================
        // Module 9: File I/O & Error Handling
        // =====================================================================
        9: [
            {
                moduleId: 9,
                question: "Which mode opens a file for reading only?",
                options: ["'w'", "'r'", "'a'", "'x'"],
                correctIndex: 1,
                explanation: "'r' opens a file for reading (the default mode). 'w' is write (overwrites), 'a' is append, and 'x' is exclusive creation."
            },
            {
                moduleId: 9,
                question: "What is the advantage of using 'with open(...)' instead of open()/close()?",
                options: [
                    "It is faster",
                    "It automatically closes the file even if an error occurs",
                    "It allows writing larger files",
                    "It encrypts the file"
                ],
                correctIndex: 1,
                explanation: "The 'with' statement (context manager) guarantees the file is properly closed when the block exits, even if an exception is raised."
            },
            {
                moduleId: 9,
                question: "Which block runs only when no exception occurred in a try/except?",
                options: ["except", "finally", "else", "pass"],
                correctIndex: 2,
                explanation: "The 'else' block in try/except runs only when the try block completes without raising an exception. 'finally' always runs."
            }
        ],

        // =====================================================================
        // Module 10: Object-Oriented Programming
        // =====================================================================
        10: [
            {
                moduleId: 10,
                question: "What does the __init__ method do in a Python class?",
                options: [
                    "Destroys the object",
                    "Initializes a new instance with starting values",
                    "Makes the class static",
                    "Imports required modules"
                ],
                correctIndex: 1,
                explanation: "__init__ is the constructor method called automatically when a new instance is created. It sets up the object's initial state."
            },
            {
                moduleId: 10,
                question: "What does 'self' refer to in a class method?",
                options: [
                    "The class itself",
                    "The current instance of the class",
                    "The parent class",
                    "A global variable"
                ],
                correctIndex: 1,
                explanation: "'self' refers to the current instance of the class, allowing access to its attributes and methods. It is the first parameter of instance methods."
            },
            {
                moduleId: 10,
                question: "What is inheritance in OOP?",
                options: [
                    "Hiding internal data",
                    "A class acquiring attributes and methods from a parent class",
                    "Creating multiple instances",
                    "Overloading operators"
                ],
                correctIndex: 1,
                explanation: "Inheritance allows a child class to inherit attributes and methods from a parent class, promoting code reuse and hierarchy."
            }
        ],

        // =====================================================================
        // Module 11: Modules, Packages & Standard Library
        // =====================================================================
        11: [
            {
                moduleId: 11,
                question: "Which statement imports only the sqrt function from the math module?",
                options: [
                    "import math.sqrt",
                    "from math import sqrt",
                    "import sqrt from math",
                    "using math.sqrt"
                ],
                correctIndex: 1,
                explanation: "'from math import sqrt' imports only the sqrt function, so you can call sqrt() directly without the math. prefix."
            },
            {
                moduleId: 11,
                question: "What does 'if __name__ == \"__main__\":' check?",
                options: [
                    "If the module is installed",
                    "If the script is being run directly (not imported)",
                    "If the function is the main one",
                    "If the module has no errors"
                ],
                correctIndex: 1,
                explanation: "When a script is run directly, __name__ is set to '__main__'. When imported as a module, __name__ is set to the module's name. This guard prevents code from running on import."
            },
            {
                moduleId: 11,
                question: "What is a Python package?",
                options: [
                    "A single .py file",
                    "A directory containing an __init__.py file and modules",
                    "A compressed archive of code",
                    "A virtual environment"
                ],
                correctIndex: 1,
                explanation: "A package is a directory containing an __init__.py file (which can be empty) and one or more modules. It allows organizing related modules into a hierarchy."
            }
        ],

        // =====================================================================
        // Module 12: Intermediate Topics — Comprehensions, Decorators, Context Managers
        // =====================================================================
        12: [
            {
                moduleId: 12,
                question: "What does [x**2 for x in range(5)] produce?",
                options: [
                    "[0, 1, 2, 3, 4]",
                    "[0, 1, 4, 9, 16]",
                    "[1, 4, 9, 16, 25]",
                    "[0, 2, 4, 6, 8]"
                ],
                correctIndex: 1,
                explanation: "This list comprehension squares each number in range(5): 0^2=0, 1^2=1, 2^2=4, 3^2=9, 4^2=16, giving [0, 1, 4, 9, 16]."
            },
            {
                moduleId: 12,
                question: "What is a decorator in Python?",
                options: [
                    "A comment that describes a function",
                    "A function that takes another function and extends its behavior",
                    "A way to delete functions",
                    "A type annotation"
                ],
                correctIndex: 1,
                explanation: "A decorator is a function that wraps another function to extend or modify its behavior, applied using the @decorator syntax above a function definition."
            },
            {
                moduleId: 12,
                question: "Which magic method makes an object usable with the 'with' statement?",
                options: [
                    "__init__ and __del__",
                    "__enter__ and __exit__",
                    "__get__ and __set__",
                    "__open__ and __close__"
                ],
                correctIndex: 1,
                explanation: "Objects that implement __enter__ and __exit__ can be used as context managers with the 'with' statement. __enter__ runs on entry, __exit__ on exit."
            }
        ]
    };

    // -------------------------------------------------------------------------
    // State
    // -------------------------------------------------------------------------
    let activeQuiz = null;   // { moduleId, questions, currentIndex, score, answers[], finished }
    let quizOverlay = null;  // DOM reference to the quiz modal overlay

    // -------------------------------------------------------------------------
    // localStorage helpers
    // -------------------------------------------------------------------------
    function _storageKey(moduleId) {
        return `pylearn_quiz_${moduleId}`;
    }

    function _loadResult(moduleId) {
        try {
            const raw = localStorage.getItem(_storageKey(moduleId));
            return raw ? JSON.parse(raw) : null;
        } catch { return null; }
    }

    function _saveResult(moduleId, result) {
        localStorage.setItem(_storageKey(moduleId), JSON.stringify(result));
    }

    // -------------------------------------------------------------------------
    // Quiz UI
    // -------------------------------------------------------------------------
    function _escapeHTML(s) {
        if (!s) return "";
        const div = document.createElement("div");
        div.textContent = s;
        return div.innerHTML;
    }

    function _ensureOverlay() {
        if (quizOverlay && document.body.contains(quizOverlay)) return quizOverlay;
        quizOverlay = document.createElement("div");
        quizOverlay.className = "modal-overlay quiz-overlay";
        quizOverlay.addEventListener("click", (e) => {
            if (e.target === quizOverlay) _closeQuiz();
        });
        document.body.appendChild(quizOverlay);
        return quizOverlay;
    }

    function _closeQuiz() {
        if (quizOverlay) {
            quizOverlay.classList.remove("active");
            setTimeout(() => {
                if (quizOverlay && quizOverlay.parentNode) quizOverlay.remove();
                quizOverlay = null;
            }, 300);
        }
        activeQuiz = null;
    }

    function _renderQuestion() {
        if (!activeQuiz || !quizOverlay) return;
        const q = activeQuiz.questions[activeQuiz.currentIndex];
        const total = activeQuiz.questions.length;
        const idx = activeQuiz.currentIndex;
        const progressPct = Math.round(((idx + 1) / total) * 100);

        const answered = activeQuiz.answers[idx];
        const hasAnswered = answered !== undefined && answered !== null;

        let optionsHTML = "";
        q.options.forEach((opt, i) => {
            let stateClass = "";
            let indicator = "";
            if (hasAnswered) {
                if (i === q.correctIndex) {
                    stateClass = "quiz-option-correct";
                    indicator = '<span class="quiz-option-indicator">&#10004;</span>';
                } else if (i === answered && answered !== q.correctIndex) {
                    stateClass = "quiz-option-wrong";
                    indicator = '<span class="quiz-option-indicator">&#10008;</span>';
                } else {
                    stateClass = "quiz-option-disabled";
                }
            }
            optionsHTML += `
                <button class="quiz-option ${stateClass}" data-index="${i}" ${hasAnswered ? "disabled" : ""}>
                    <span class="quiz-option-letter">${String.fromCharCode(65 + i)}</span>
                    <span class="quiz-option-text">${_escapeHTML(opt)}</span>
                    ${indicator}
                </button>
            `;
        });

        let explanationHTML = "";
        if (hasAnswered) {
            const isCorrect = answered === q.correctIndex;
            explanationHTML = `
                <div class="quiz-explanation ${isCorrect ? "quiz-explanation-correct" : "quiz-explanation-wrong"}">
                    <div class="quiz-explanation-header">
                        ${isCorrect ? "&#10004; Correct!" : "&#10008; Incorrect"}
                    </div>
                    <p>${_escapeHTML(q.explanation)}</p>
                </div>
            `;
        }

        const isLast = idx === total - 1;
        let footerHTML = "";
        if (hasAnswered) {
            if (isLast) {
                footerHTML = `<button class="btn btn-primary quiz-finish-btn">View Results</button>`;
            } else {
                footerHTML = `<button class="btn btn-primary quiz-next-btn">Next Question &rarr;</button>`;
            }
        }

        quizOverlay.innerHTML = `
            <div class="modal quiz-modal">
                <div class="modal-header">
                    <h3>Module ${activeQuiz.moduleId} Quiz</h3>
                    <button class="quiz-close-btn" title="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="quiz-progress-bar">
                        <div class="quiz-progress-fill" style="width:${progressPct}%"></div>
                    </div>
                    <div class="quiz-meta">
                        <span>Question ${idx + 1} of ${total}</span>
                        <span>Score: ${activeQuiz.score}/${total}</span>
                    </div>
                    <div class="quiz-question">${_escapeHTML(q.question)}</div>
                    <div class="quiz-options">${optionsHTML}</div>
                    ${explanationHTML}
                </div>
                <div class="modal-footer">
                    ${footerHTML}
                </div>
            </div>
        `;

        // Wire events
        quizOverlay.querySelector(".quiz-close-btn").addEventListener("click", _closeQuiz);

        if (!hasAnswered) {
            quizOverlay.querySelectorAll(".quiz-option").forEach((btn) => {
                btn.addEventListener("click", () => {
                    const chosen = parseInt(btn.dataset.index, 10);
                    activeQuiz.answers[idx] = chosen;
                    if (chosen === q.correctIndex) activeQuiz.score++;
                    _renderQuestion();
                });
            });
        }

        const nextBtn = quizOverlay.querySelector(".quiz-next-btn");
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                activeQuiz.currentIndex++;
                _renderQuestion();
            });
        }

        const finishBtn = quizOverlay.querySelector(".quiz-finish-btn");
        if (finishBtn) {
            finishBtn.addEventListener("click", _renderSummary);
        }
    }

    function _renderSummary() {
        if (!activeQuiz || !quizOverlay) return;
        const total = activeQuiz.questions.length;
        const score = activeQuiz.score;
        const pct = Math.round((score / total) * 100);
        activeQuiz.finished = true;

        // Persist result
        const prev = _loadResult(activeQuiz.moduleId);
        const attempts = prev ? prev.attempts + 1 : 1;
        const bestScore = prev ? Math.max(prev.bestScore, score) : score;
        _saveResult(activeQuiz.moduleId, {
            score,
            total,
            attempts,
            bestScore,
            lastAttempt: new Date().toISOString()
        });

        // Determine grade
        let gradeLabel, gradeClass;
        if (pct === 100) { gradeLabel = "Perfect!"; gradeClass = "quiz-grade-perfect"; }
        else if (pct >= 80) { gradeLabel = "Great Job!"; gradeClass = "quiz-grade-great"; }
        else if (pct >= 60) { gradeLabel = "Good Effort"; gradeClass = "quiz-grade-good"; }
        else { gradeLabel = "Keep Practicing"; gradeClass = "quiz-grade-low"; }

        // Build review list
        let reviewHTML = "";
        activeQuiz.questions.forEach((q, i) => {
            const chosen = activeQuiz.answers[i];
            const correct = chosen === q.correctIndex;
            reviewHTML += `
                <div class="quiz-review-item ${correct ? "quiz-review-correct" : "quiz-review-wrong"}">
                    <div class="quiz-review-status">${correct ? "&#10004;" : "&#10008;"}</div>
                    <div class="quiz-review-content">
                        <div class="quiz-review-question">${_escapeHTML(q.question)}</div>
                        <div class="quiz-review-answer">
                            Your answer: <strong>${_escapeHTML(q.options[chosen])}</strong>
                            ${!correct ? ` | Correct: <strong>${_escapeHTML(q.options[q.correctIndex])}</strong>` : ""}
                        </div>
                    </div>
                </div>
            `;
        });

        quizOverlay.innerHTML = `
            <div class="modal quiz-modal quiz-summary-modal">
                <div class="modal-header">
                    <h3>Quiz Results — Module ${activeQuiz.moduleId}</h3>
                    <button class="quiz-close-btn" title="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="quiz-summary-score ${gradeClass}">
                        <div class="quiz-summary-pct">${pct}%</div>
                        <div class="quiz-summary-label">${gradeLabel}</div>
                        <div class="quiz-summary-detail">${score} out of ${total} correct</div>
                        ${attempts > 1 ? `<div class="quiz-summary-best">Best score: ${bestScore}/${total}</div>` : ""}
                    </div>
                    <div class="quiz-review">
                        <h4>Review</h4>
                        ${reviewHTML}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary quiz-close-summary-btn">Close</button>
                    <button class="btn btn-primary quiz-retry-btn">Retry Quiz</button>
                </div>
            </div>
        `;

        quizOverlay.querySelector(".quiz-close-btn").addEventListener("click", _closeQuiz);
        quizOverlay.querySelector(".quiz-close-summary-btn").addEventListener("click", _closeQuiz);
        quizOverlay.querySelector(".quiz-retry-btn").addEventListener("click", () => {
            startQuiz(activeQuiz.moduleId);
        });

        // Toast notification
        if (typeof showToast === "function") {
            if (pct === 100) showToast("success", "Perfect Score!", `You aced the Module ${activeQuiz.moduleId} quiz!`);
            else if (pct >= 80) showToast("success", "Quiz Complete", `${score}/${total} — ${gradeLabel}`);
            else showToast("info", "Quiz Complete", `${score}/${total} — ${gradeLabel}`);
        }
    }

    // -------------------------------------------------------------------------
    // Public API
    // -------------------------------------------------------------------------

    /**
     * Start a quiz for the given module.
     * @param {number} moduleId
     */
    function startQuiz(moduleId) {
        const questions = QUIZ_BANK[moduleId];
        if (!questions || questions.length === 0) {
            if (typeof showToast === "function") {
                showToast("warning", "No Quiz", `No quiz available for module ${moduleId}.`);
            }
            return;
        }

        // Shuffle a copy so questions are in random order
        const shuffled = [...questions].sort(() => Math.random() - 0.5);

        activeQuiz = {
            moduleId,
            questions: shuffled,
            currentIndex: 0,
            score: 0,
            answers: new Array(shuffled.length).fill(null),
            finished: false
        };

        const overlay = _ensureOverlay();
        _renderQuestion();
        // Trigger visible after next frame for transition
        requestAnimationFrame(() => overlay.classList.add("active"));
    }

    /**
     * Get the stored quiz result for a module.
     * @param {number} moduleId
     * @returns {{ score: number, total: number, attempts: number, bestScore: number, lastAttempt: string } | null}
     */
    function getQuizResult(moduleId) {
        return _loadResult(moduleId);
    }

    /**
     * Check whether a quiz exists for the given module.
     * @param {number} moduleId
     * @returns {boolean}
     */
    function hasQuiz(moduleId) {
        return !!(QUIZ_BANK[moduleId] && QUIZ_BANK[moduleId].length > 0);
    }

    /**
     * Initialize the quiz system (currently a no-op, but reserved for future setup).
     */
    function init() {
        // Placeholder for any future initialization needs
    }

    // -------------------------------------------------------------------------
    // Expose global API
    // -------------------------------------------------------------------------
    window.QuizSystem = Object.freeze({
        startQuiz,
        getQuizResult,
        hasQuiz,
        init
    });

})();
