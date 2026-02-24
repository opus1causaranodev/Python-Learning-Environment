// =============================================================================
// Sample challenge definitions
// =============================================================================
// Each challenge is a plain object following the schema consumed by
// AnswerChecker.evaluateCode().  This file serves both as real content and
// as living documentation of the data format.
// =============================================================================

const CHALLENGES = [

    // =========================================================================
    // BEGINNER CHALLENGES
    // =========================================================================

    {
        id: "hello_world",
        title: "Hello, World!",
        description:
            "Write a program that prints exactly:\n\n```\nHello, World!\n```",
        difficulty: "beginner",
        starterCode: '# Print "Hello, World!" below\n',
        testCases: [
            {
                input: "",
                expectedOutput: "Hello, World!",
                comparisonMode: "exact_trimmed",
                hidden: false,
                description: "Prints Hello, World!",
                points: 1,
            },
        ],
        requiredConstructs: ["print_call"],
        hints: [
            "Use the print() function to display text.",
            'The text inside print() needs to be in quotes: print("...")',
            'The exact answer is: print("Hello, World!")',
        ],
        solutionCode: 'print("Hello, World!")',
        scoringRubric: { testWeight: 80, structureWeight: 20, qualityWeight: 0 },
        commonErrors: [
            {
                pattern: "Print\\(",
                message: "Python is case-sensitive. Use `print` (lowercase), not `Print`.",
                title: "Case Sensitivity",
                suggestion: "Change `Print` to `print`.",
            },
            {
                pattern: 'print\\s*"',
                message: "In Python 3, `print` is a function and needs parentheses.",
                title: "Missing Parentheses",
                suggestion: 'Use print("Hello, World!") with parentheses.',
            },
        ],
        passingScore: 70,
        codeQualityChecks: false,
    },

    {
        id: "greeting",
        title: "Personal Greeting",
        description:
            "Write a program that reads a name from input and prints:\n\n```\nHello, <name>!\n```\n\nFor example, if the input is `Alice`, print `Hello, Alice!`.",
        difficulty: "beginner",
        starterCode: '# Read a name and print a greeting\nname = input("Enter your name: ")\n',
        testCases: [
            {
                input: "Alice",
                expectedOutput: "Hello, Alice!",
                comparisonMode: "exact_trimmed",
                hidden: false,
                description: 'Input "Alice"',
                points: 1,
            },
            {
                input: "Bob",
                expectedOutput: "Hello, Bob!",
                comparisonMode: "exact_trimmed",
                hidden: false,
                description: 'Input "Bob"',
                points: 1,
            },
            {
                input: "World",
                expectedOutput: "Hello, World!",
                comparisonMode: "exact_trimmed",
                hidden: true,
                description: "Hidden test",
                points: 1,
            },
        ],
        requiredConstructs: ["input_call", "print_call"],
        hints: [
            "Use input() to read the name into a variable.",
            "Use an f-string or string concatenation to build the greeting.",
            'Example: print(f"Hello, {name}!")',
        ],
        solutionCode:
            'name = input("Enter your name: ")\nprint(f"Hello, {name}!")',
        scoringRubric: { testWeight: 70, structureWeight: 20, qualityWeight: 10 },
        commonErrors: [
            {
                pattern: "\\+\\s*name\\s*\\+",
                flags: "",
                message:
                    "String concatenation works, but f-strings are more readable in Python 3.6+.",
                title: "Style Tip",
                suggestion: 'Try: print(f"Hello, {name}!")',
            },
        ],
        passingScore: 70,
    },

    {
        id: "even_odd",
        title: "Even or Odd",
        description:
            "Write a program that reads an integer and prints `even` if it is even, or `odd` if it is odd.",
        difficulty: "beginner",
        starterCode: "# Read a number and print even or odd\n",
        testCases: [
            { input: "4", expectedOutput: "even", description: "4 is even", points: 1 },
            { input: "7", expectedOutput: "odd", description: "7 is odd", points: 1 },
            { input: "0", expectedOutput: "even", description: "0 is even", points: 1 },
            { input: "-3", expectedOutput: "odd", description: "-3 is odd", points: 1, hidden: true },
        ],
        requiredConstructs: ["if_statement"],
        hints: [
            "Use the modulo operator (%) to check divisibility by 2.",
            "if number % 2 == 0: means the number is even.",
            'Full pattern:\nnum = int(input())\nif num % 2 == 0:\n    print("even")\nelse:\n    print("odd")',
        ],
        solutionCode: 'num = int(input())\nif num % 2 == 0:\n    print("even")\nelse:\n    print("odd")',
        commonErrors: [
            {
                pattern: "input\\(\\)",
                flags: "",
                message: "Remember that input() returns a string. Wrap it with int() to get a number.",
                title: "String vs Number",
                suggestion: "Use int(input()) to read an integer.",
            },
        ],
        passingScore: 70,
    },

    {
        id: "sum_list",
        title: "Sum of a List",
        description:
            "Write a function called `sum_list` that takes a list of numbers and returns their sum.\n\n" +
            "Do NOT use the built-in `sum()` function — use a loop instead.\n\n" +
            "After defining the function, call it with `[1, 2, 3, 4, 5]` and print the result.",
        difficulty: "beginner",
        starterCode: "def sum_list(numbers):\n    # Your code here\n    pass\n\nprint(sum_list([1, 2, 3, 4, 5]))\n",
        testCases: [
            { input: "", expectedOutput: "15", description: "sum of [1,2,3,4,5]", points: 2 },
        ],
        requiredConstructs: ["function:sum_list", "for_loop", "no_import:builtins"],
        hints: [
            "Start with a variable set to 0, then add each number in a loop.",
            "Use a `for` loop: for num in numbers:",
            "def sum_list(numbers):\n    total = 0\n    for num in numbers:\n        total += num\n    return total",
        ],
        solutionCode:
            "def sum_list(numbers):\n    total = 0\n    for num in numbers:\n        total += num\n    return total\n\nprint(sum_list([1, 2, 3, 4, 5]))",
        commonErrors: [
            {
                pattern: "\\bsum\\(",
                message: "This challenge asks you to compute the sum manually with a loop, not using the built-in sum().",
                title: "Built-in Not Allowed",
                suggestion: "Replace sum() with a for loop that accumulates a total.",
            },
        ],
        passingScore: 70,
    },

    // =========================================================================
    // INTERMEDIATE CHALLENGES
    // =========================================================================

    {
        id: "fizzbuzz",
        title: "FizzBuzz",
        description:
            "Print numbers from 1 to 20. But:\n" +
            "- For multiples of 3, print `Fizz` instead of the number.\n" +
            "- For multiples of 5, print `Buzz` instead.\n" +
            "- For multiples of both 3 and 5, print `FizzBuzz`.\n" +
            "Print one value per line.",
        difficulty: "intermediate",
        starterCode: "# FizzBuzz from 1 to 20\n",
        testCases: [
            {
                input: "",
                expectedOutput:
                    "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz",
                comparisonMode: "exact_trimmed",
                description: "FizzBuzz 1-20",
                points: 3,
            },
        ],
        requiredConstructs: ["for_loop", "if_statement"],
        hints: [
            "Use a for loop with range(1, 21).",
            "Check the 'both' condition (divisible by 15) FIRST, because 15 is also divisible by 3 and 5 individually.",
            'for i in range(1, 21):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
        ],
        solutionCode:
            'for i in range(1, 21):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
        commonErrors: [
            {
                pattern: "i % 3 == 0.*\\n.*i % 5 == 0.*\\n.*i % 15 == 0",
                flags: "s",
                message:
                    "Check for divisibility by 15 BEFORE checking 3 and 5 separately, otherwise 15, etc. will print 'Fizz' instead of 'FizzBuzz'.",
                title: "Order of Checks",
                suggestion: "Move the `i % 15 == 0` (or `i % 3 == 0 and i % 5 == 0`) check to be the FIRST condition.",
            },
        ],
        passingScore: 70,
    },

    {
        id: "palindrome_check",
        title: "Palindrome Checker",
        description:
            "Write a function called `is_palindrome` that takes a string and returns `True` if it reads the same forwards and backwards (case-insensitive, ignoring spaces), `False` otherwise.\n\n" +
            "Then read a string from input and print the result of calling your function on it.",
        difficulty: "intermediate",
        starterCode:
            "def is_palindrome(text):\n    # Your code here\n    pass\n\nword = input()\nprint(is_palindrome(word))\n",
        testCases: [
            { input: "racecar", expectedOutput: "True", description: '"racecar"', points: 1 },
            { input: "hello", expectedOutput: "False", description: '"hello"', points: 1 },
            { input: "A man a plan a canal Panama", expectedOutput: "True", description: "Sentence palindrome", points: 2 },
            { input: "Madam", expectedOutput: "True", description: "Case-insensitive", points: 1, hidden: true },
        ],
        requiredConstructs: ["function:is_palindrome", "return"],
        hints: [
            "Convert to lowercase and remove spaces first.",
            "Compare the cleaned string with its reverse ([::-1]).",
            'def is_palindrome(text):\n    cleaned = text.lower().replace(" ", "")\n    return cleaned == cleaned[::-1]',
        ],
        solutionCode:
            'def is_palindrome(text):\n    cleaned = text.lower().replace(" ", "")\n    return cleaned == cleaned[::-1]\n\nword = input()\nprint(is_palindrome(word))',
        passingScore: 70,
    },

    {
        id: "word_frequency",
        title: "Word Frequency Counter",
        description:
            "Write a function called `word_freq` that takes a string and returns a dictionary mapping each word (lowercased) to the number of times it appears.\n\n" +
            "Read a sentence from input, call the function, and print each word and count on its own line in the format `word: count`, sorted alphabetically.",
        difficulty: "intermediate",
        starterCode:
            "def word_freq(text):\n    # Your code here\n    pass\n\nsentence = input()\nresult = word_freq(sentence)\nfor word in sorted(result):\n    print(f\"{word}: {result[word]}\")\n",
        testCases: [
            {
                input: "the cat sat on the mat",
                expectedOutput: "cat: 1\nmat: 1\non: 1\nsat: 1\nthe: 2",
                comparisonMode: "exact_trimmed",
                description: "Basic word count",
                points: 2,
            },
            {
                input: "hello hello hello",
                expectedOutput: "hello: 3",
                comparisonMode: "exact_trimmed",
                description: "Repeated word",
                points: 1,
            },
        ],
        requiredConstructs: ["function:word_freq", "for_loop"],
        hints: [
            "Split the string into words with .split().",
            "Use a dictionary to count occurrences.",
            "def word_freq(text):\n    counts = {}\n    for word in text.lower().split():\n        counts[word] = counts.get(word, 0) + 1\n    return counts",
        ],
        solutionCode:
            'def word_freq(text):\n    counts = {}\n    for word in text.lower().split():\n        counts[word] = counts.get(word, 0) + 1\n    return counts\n\nsentence = input()\nresult = word_freq(sentence)\nfor word in sorted(result):\n    print(f"{word}: {result[word]}")',
        passingScore: 70,
    },

    // =========================================================================
    // ADVANCED CHALLENGES
    // =========================================================================

    {
        id: "fibonacci_gen",
        title: "Fibonacci Generator",
        description:
            "Write a **generator function** called `fibonacci` that yields an infinite sequence of Fibonacci numbers starting with 0, 1, 1, 2, 3, 5, ...\n\n" +
            "Then print the first 10 Fibonacci numbers, one per line.",
        difficulty: "advanced",
        starterCode:
            "def fibonacci():\n    # Your generator code here\n    pass\n\ngen = fibonacci()\nfor _ in range(10):\n    print(next(gen))\n",
        testCases: [
            {
                input: "",
                expectedOutput: "0\n1\n1\n2\n3\n5\n8\n13\n21\n34",
                comparisonMode: "exact_trimmed",
                description: "First 10 Fibonacci numbers",
                points: 3,
            },
        ],
        requiredConstructs: ["function:fibonacci", "yield"],
        hints: [
            "A generator function uses `yield` instead of `return`.",
            "Keep two variables (a, b) and update them: a, b = b, a + b.",
            "def fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b",
        ],
        solutionCode:
            "def fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\ngen = fibonacci()\nfor _ in range(10):\n    print(next(gen))",
        passingScore: 70,
    },

    {
        id: "matrix_multiply",
        title: "Matrix Multiplication",
        description:
            "Write a function called `mat_mul` that takes two 2D lists (matrices) and returns their matrix product.\n\n" +
            "Assume the matrices are always compatible for multiplication.\n\n" +
            "Test with:\n```\nA = [[1, 2], [3, 4]]\nB = [[5, 6], [7, 8]]\n```\nPrint each row of the result on its own line.",
        difficulty: "advanced",
        starterCode:
            "def mat_mul(a, b):\n    # Your code here\n    pass\n\nA = [[1, 2], [3, 4]]\nB = [[5, 6], [7, 8]]\nresult = mat_mul(A, B)\nfor row in result:\n    print(row)\n",
        testCases: [
            {
                input: "",
                expectedOutput: "[19, 22]\n[43, 50]",
                comparisonMode: "exact_trimmed",
                description: "2x2 matrix multiplication",
                points: 3,
            },
        ],
        requiredConstructs: ["function:mat_mul", "for_loop", "return"],
        hints: [
            "The result matrix has dimensions (rows of A) x (cols of B).",
            "For each cell [i][j], sum the products of row i of A with column j of B.",
            "def mat_mul(a, b):\n    rows_a, cols_b = len(a), len(b[0])\n    result = [[0] * cols_b for _ in range(rows_a)]\n    for i in range(rows_a):\n        for j in range(cols_b):\n            for k in range(len(b)):\n                result[i][j] += a[i][k] * b[k][j]\n    return result",
        ],
        solutionCode:
            "def mat_mul(a, b):\n    rows_a, cols_b = len(a), len(b[0])\n    result = [[0] * cols_b for _ in range(rows_a)]\n    for i in range(rows_a):\n        for j in range(cols_b):\n            for k in range(len(b)):\n                result[i][j] += a[i][k] * b[k][j]\n    return result\n\nA = [[1, 2], [3, 4]]\nB = [[5, 6], [7, 8]]\nresult = mat_mul(A, B)\nfor row in result:\n    print(row)",
        passingScore: 70,
    },

    {
        id: "decorator_timer",
        title: "Timing Decorator",
        description:
            "Write a decorator called `timer` that measures how long a function takes to execute and prints the elapsed time in the format:\n\n" +
            "```\n<function_name> took <seconds>s\n```\n\n" +
            "Apply it to a function called `slow_add` that takes two numbers, sleeps for 0.1 seconds (use `time.sleep`), and returns their sum.\n\n" +
            "Call `slow_add(3, 4)` and print its return value.",
        difficulty: "advanced",
        starterCode:
            "import time\n\ndef timer(func):\n    # Your decorator code here\n    pass\n\n@timer\ndef slow_add(a, b):\n    time.sleep(0.1)\n    return a + b\n\nresult = slow_add(3, 4)\nprint(result)\n",
        testCases: [
            {
                input: "",
                expectedOutput: "slow_add took \\d+\\.\\d+s\\n7",
                comparisonMode: "regex",
                description: "Decorator prints timing, function returns correctly",
                points: 3,
            },
        ],
        requiredConstructs: ["function:timer", "function:slow_add", "import:time"],
        hints: [
            "A decorator is a function that takes a function and returns a new function.",
            "Inside the wrapper, record time.time() before and after calling the original function.",
            'def timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        elapsed = time.time() - start\n        print(f"{func.__name__} took {elapsed:.4f}s")\n        return result\n    return wrapper',
        ],
        solutionCode:
            'import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        elapsed = time.time() - start\n        print(f"{func.__name__} took {elapsed:.4f}s")\n        return result\n    return wrapper\n\n@timer\ndef slow_add(a, b):\n    time.sleep(0.1)\n    return a + b\n\nresult = slow_add(3, 4)\nprint(result)',
        passingScore: 70,
    },
];

// ---------------------------------------------------------------------------
// Merge in challenges from ALL activity files (M1-M4, M5-M8, M9-M12).
// Normalises the slightly different field names so AnswerChecker can consume
// them uniformly.
// ---------------------------------------------------------------------------
(function mergeExistingActivities() {
    const DIFFICULTY_MAP = { easy: "beginner", medium: "intermediate", hard: "advanced" };
    const existingIds = new Set(CHALLENGES.map((c) => c.id));

    const sources = [];
    if (typeof activitiesM1M4 !== "undefined") sources.push(activitiesM1M4);
    if (typeof activitiesM5M8 !== "undefined") sources.push(activitiesM5M8);
    if (typeof activitiesM9M12 !== "undefined") sources.push(activitiesM9M12);

    for (const activities of sources) {
        for (const act of activities) {
            if (existingIds.has(act.id)) continue;
            existingIds.add(act.id);
            CHALLENGES.push({
                id: act.id,
                moduleId: act.moduleId,
                title: act.title,
                description: act.description +
                    (act.instructions ? "\n\n" + act.instructions.map((s, i) => `${i + 1}. ${s}`).join("\n") : ""),
                difficulty: DIFFICULTY_MAP[act.difficulty] || act.difficulty || "beginner",
                starterCode: act.starterCode || "",
                testCases: (act.testCases || []).map((tc) => ({
                    input: tc.input ?? "",
                    expectedOutput: tc.expectedOutput ?? "",
                    comparisonMode: tc.comparisonMode || "exact_trimmed",
                    hidden: !!tc.hidden,
                    description: tc.description || "",
                    points: tc.points ?? 1,
                })),
                requiredConstructs: act.requiredConstructs || [],
                hints: act.hints || [],
                solutionCode: act.solutionCode || "",
                commonErrors: (act.commonErrors || []).map((ce) => ({
                    pattern: ce.pattern,
                    message: ce.feedback || ce.message || "",
                    title: ce.title || "Common Mistake",
                    suggestion: ce.suggestion || "",
                    flags: ce.flags || "",
                })),
                passingScore: 70,
                tags: act.tags || [],
                xpReward: act.xpReward || 10,
            });
        }
    }
})();
