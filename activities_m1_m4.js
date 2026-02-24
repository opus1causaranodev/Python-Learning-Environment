// ============================================================
// ACTIVITIES: Modules 1-4
// M1: Variables, data types, print, input
// M2: Arithmetic, comparison, logical operators
// M3: if/elif/else conditionals
// M4: for loops, while loops, nested loops
// ============================================================

const activitiesM1M4 = [

    // ========================================================
    // MODULE 1: Variables, Data Types, Print, Input
    // ========================================================
    {
        id: "m1_a1",
        moduleId: 1,
        title: "Hello, World!",
        difficulty: "easy",
        xpReward: 10,
        description: "Write your very first Python program! Use the print() function to display a greeting to the world.",
        instructions: [
            "Use the print() function to display the text: Hello, World!",
            "Make sure the output matches exactly, including capitalization and punctuation."
        ],
        starterCode: `# Your first Python program!\n# Use the print() function to display a message\n\n# Write your code below:\n`,
        testCases: [
            { input: "", expectedOutput: "Hello, World!", description: "Should print Hello, World!", hidden: false },
        ],
        hints: [
            "The print() function displays text to the screen.",
            "Put your text inside quotes within the parentheses: print(\"text here\")",
            "The exact code is: print(\"Hello, World!\")"
        ],
        solutionCode: `# Your first Python program!\n# Use the print() function to display a message\n\n# Write your code below:\nprint("Hello, World!")`,
        requiredConstructs: ["print_function"],
        commonErrors: [
            { pattern: "Print", feedback: "Python is case-sensitive. Use lowercase 'print', not 'Print'." },
            { pattern: "print \\(", feedback: "Don't put a space between 'print' and the parenthesis." },
            { pattern: "print\\([^'\"]", feedback: "Remember to put your text inside quotes (single or double)." }
        ],
        tags: ["print", "basics", "hello-world"]
    },
    {
        id: "m1_a2",
        moduleId: 1,
        title: "Variable Introduction",
        difficulty: "easy",
        xpReward: 15,
        description: "Create variables to store your personal information and print them out.",
        instructions: [
            "Create a variable called 'name' and assign it the string 'Alice'.",
            "Create a variable called 'age' and assign it the integer 25.",
            "Create a variable called 'height' and assign it the float 5.6.",
            "Print each variable on its own line."
        ],
        starterCode: `# Store personal information in variables\n\n# Create a variable called 'name' with the value 'Alice'\n\n# Create a variable called 'age' with the value 25\n\n# Create a variable called 'height' with the value 5.6\n\n# Print each variable\n`,
        testCases: [
            { input: "", expectedOutput: "Alice\n25\n5.6", description: "Should print name, age, and height on separate lines", hidden: false },
        ],
        hints: [
            "Assign a value to a variable using the = operator: variable_name = value",
            "Strings need quotes, integers and floats do not: name = 'Alice'",
            "Use print(variable_name) to print the value stored in a variable."
        ],
        solutionCode: `# Store personal information in variables\n\n# Create a variable called 'name' with the value 'Alice'\nname = 'Alice'\n\n# Create a variable called 'age' with the value 25\nage = 25\n\n# Create a variable called 'height' with the value 5.6\nheight = 5.6\n\n# Print each variable\nprint(name)\nprint(age)\nprint(height)`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "Name|Age|Height", feedback: "Variable names should be lowercase: name, age, height." },
            { pattern: "print\\(name, age, height\\)", feedback: "Print each variable on its own line using separate print() calls." }
        ],
        tags: ["variables", "data-types", "print"]
    },
    {
        id: "m1_a3",
        moduleId: 1,
        title: "Data Type Detective",
        difficulty: "medium",
        xpReward: 20,
        description: "Explore Python's type() function to identify different data types.",
        instructions: [
            "Create a variable 'a' with integer value 42.",
            "Create a variable 'b' with float value 3.14.",
            "Create a variable 'c' with string value 'Python'.",
            "Create a variable 'd' with boolean value True.",
            "Print the type of each variable using the type() function."
        ],
        starterCode: `# Investigate data types with the type() function\n\n# Create four variables with different data types\na = 42\nb = 3.14\nc = 'Python'\nd = True\n\n# Print the type of each variable\n# Example: print(type(a))\n`,
        testCases: [
            { input: "", expectedOutput: "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>", description: "Should print the type of each variable", hidden: false },
        ],
        hints: [
            "The type() function returns the data type of a value.",
            "You can nest functions: print(type(variable))",
            "Python's basic types are int, float, str, and bool."
        ],
        solutionCode: `# Investigate data types with the type() function\n\n# Create four variables with different data types\na = 42\nb = 3.14\nc = 'Python'\nd = True\n\n# Print the type of each variable\nprint(type(a))\nprint(type(b))\nprint(type(c))\nprint(type(d))`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "typeof", feedback: "Python uses type(), not typeof. That's JavaScript!" },
            { pattern: "type\\(\\)", feedback: "Pass the variable inside type(): type(a), not type()." }
        ],
        tags: ["data-types", "type-function", "basics"]
    },
    {
        id: "m1_a4",
        moduleId: 1,
        title: "String Concatenation",
        difficulty: "medium",
        xpReward: 20,
        description: "Combine strings and variables together to form complete sentences.",
        instructions: [
            "Create a variable 'first_name' with value 'John'.",
            "Create a variable 'last_name' with value 'Doe'.",
            "Create a variable 'age' with value 30.",
            "Print: 'My name is John Doe and I am 30 years old.' using string concatenation or f-strings."
        ],
        starterCode: `# Practice combining strings and variables\n\nfirst_name = 'John'\nlast_name = 'Doe'\nage = 30\n\n# Print the sentence: My name is John Doe and I am 30 years old.\n# You can use + for concatenation or f-strings\n`,
        testCases: [
            { input: "", expectedOutput: "My name is John Doe and I am 30 years old.", description: "Should print the complete sentence", hidden: false },
        ],
        hints: [
            "You can use f-strings: f'text {variable} more text'",
            "Or concatenation: 'text ' + variable + ' more text'",
            "If using concatenation with age, convert it: str(age)"
        ],
        solutionCode: `# Practice combining strings and variables\n\nfirst_name = 'John'\nlast_name = 'Doe'\nage = 30\n\n# Print the sentence using an f-string\nprint(f"My name is {first_name} {last_name} and I am {age} years old.")`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "\\+ age \\+", feedback: "When concatenating, convert age to string first: str(age)" },
            { pattern: "print.*My name is.*John", feedback: "Use the variables instead of hard-coding the values." }
        ],
        tags: ["strings", "concatenation", "f-strings"]
    },
    {
        id: "m1_a5",
        moduleId: 1,
        title: "Type Conversion",
        difficulty: "hard",
        xpReward: 30,
        description: "Practice converting between different data types using int(), float(), str(), and bool().",
        instructions: [
            "Convert the string '42' to an integer and print it.",
            "Convert the integer 10 to a float and print it.",
            "Convert the float 3.14 to an integer and print it.",
            "Convert the integer 0 to a boolean and print it.",
            "Convert the string 'hello' to a boolean and print it."
        ],
        starterCode: `# Type conversion practice\n\n# Convert string '42' to integer and print\n\n# Convert integer 10 to float and print\n\n# Convert float 3.14 to integer and print\n\n# Convert integer 0 to boolean and print\n\n# Convert string 'hello' to boolean and print\n`,
        testCases: [
            { input: "", expectedOutput: "42\n10.0\n3\nFalse\nTrue", description: "Should print all converted values", hidden: false },
        ],
        hints: [
            "Use int(), float(), str(), and bool() to convert types.",
            "int(3.14) truncates the decimal, giving 3 (not rounding).",
            "bool(0) is False, but bool(any non-zero number) is True. bool('') is False, but bool(any non-empty string) is True."
        ],
        solutionCode: `# Type conversion practice\n\n# Convert string '42' to integer and print\nprint(int('42'))\n\n# Convert integer 10 to float and print\nprint(float(10))\n\n# Convert float 3.14 to integer and print\nprint(int(3.14))\n\n# Convert integer 0 to boolean and print\nprint(bool(0))\n\n# Convert string 'hello' to boolean and print\nprint(bool('hello'))`,
        requiredConstructs: ["print_function"],
        commonErrors: [
            { pattern: "round", feedback: "int() truncates (cuts off decimals), it doesn't round. int(3.14) gives 3." },
            { pattern: "bool\\('0'\\)", feedback: "bool('0') is True because it's a non-empty string. bool(0) is False because 0 is falsy." }
        ],
        tags: ["type-conversion", "data-types", "casting"]
    },
    {
        id: "m1_a6",
        moduleId: 1,
        title: "Multi-line Output",
        difficulty: "hard",
        xpReward: 30,
        description: "Create a formatted information card using multiple print statements, escape characters, and string formatting.",
        instructions: [
            "Create variables: name = 'Python', version = 3.12, year = 1991",
            "Print a formatted card that looks exactly like the expected output.",
            "Use '=' characters to create borders (20 characters wide).",
            "Display each piece of info on its own line with labels."
        ],
        starterCode: `# Create a formatted information card\n\nname = 'Python'\nversion = 3.12\nyear = 1991\n\n# Print the card:\n# ====================\n# Language: Python\n# Version: 3.12\n# Born: 1991\n# ====================\n`,
        testCases: [
            { input: "", expectedOutput: "====================\nLanguage: Python\nVersion: 3.12\nBorn: 1991\n====================", description: "Should print the formatted card", hidden: false },
        ],
        hints: [
            "You can multiply a string: '=' * 20 gives you 20 equal signs.",
            "Use f-strings or concatenation to combine labels with variables.",
            "You need 5 print statements total (or use newline characters)."
        ],
        solutionCode: `# Create a formatted information card\n\nname = 'Python'\nversion = 3.12\nyear = 1991\n\n# Print the card\nprint('=' * 20)\nprint(f"Language: {name}")\nprint(f"Version: {version}")\nprint(f"Born: {year}")\nprint('=' * 20)`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "==========", feedback: "Try using string multiplication: '=' * 20 instead of typing them all out." }
        ],
        tags: ["print", "formatting", "strings"]
    },

    // ========================================================
    // MODULE 2: Arithmetic, Comparison, Logical Operators
    // ========================================================
    {
        id: "m2_a1",
        moduleId: 2,
        title: "Basic Calculator",
        difficulty: "easy",
        xpReward: 10,
        description: "Perform basic arithmetic operations on two numbers and display the results.",
        instructions: [
            "Set variables a = 15 and b = 4.",
            "Print the result of addition (a + b).",
            "Print the result of subtraction (a - b).",
            "Print the result of multiplication (a * b).",
            "Print the result of division (a / b)."
        ],
        starterCode: `# Basic arithmetic operations\n\na = 15\nb = 4\n\n# Print the sum of a and b\n\n# Print the difference of a and b\n\n# Print the product of a and b\n\n# Print the division of a by b\n`,
        testCases: [
            { input: "", expectedOutput: "19\n11\n60\n3.75", description: "Should print sum, difference, product, and quotient", hidden: false },
        ],
        hints: [
            "Use +, -, *, / for the four basic operations.",
            "Division (/) always returns a float in Python 3.",
            "print(a + b) will print the sum."
        ],
        solutionCode: `# Basic arithmetic operations\n\na = 15\nb = 4\n\n# Print the sum of a and b\nprint(a + b)\n\n# Print the difference of a and b\nprint(a - b)\n\n# Print the product of a and b\nprint(a * b)\n\n# Print the division of a by b\nprint(a / b)`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "print\\(15 \\+ 4\\)", feedback: "Use the variables a and b instead of hard-coded numbers." }
        ],
        tags: ["arithmetic", "operators", "basics"]
    },
    {
        id: "m2_a2",
        moduleId: 2,
        title: "Floor Division and Modulo",
        difficulty: "easy",
        xpReward: 15,
        description: "Learn the difference between regular division, floor division, and the modulo operator.",
        instructions: [
            "Set variables a = 17 and b = 5.",
            "Print the result of regular division (a / b).",
            "Print the result of floor division (a // b).",
            "Print the remainder using modulo (a % b).",
            "Print the result of exponentiation: a ** 2."
        ],
        starterCode: `# Floor division, modulo, and exponentiation\n\na = 17\nb = 5\n\n# Regular division\n\n# Floor division (rounds down to nearest integer)\n\n# Modulo (remainder after division)\n\n# Exponentiation (a raised to the power of 2)\n`,
        testCases: [
            { input: "", expectedOutput: "3.4\n3\n2\n289", description: "Should print division, floor division, modulo, and power", hidden: false },
        ],
        hints: [
            "// is floor division: it divides and rounds down to the nearest integer.",
            "% is modulo: it gives the remainder. 17 % 5 = 2 because 17 = 5*3 + 2.",
            "** is exponentiation: a ** 2 means a squared."
        ],
        solutionCode: `# Floor division, modulo, and exponentiation\n\na = 17\nb = 5\n\n# Regular division\nprint(a / b)\n\n# Floor division (rounds down to nearest integer)\nprint(a // b)\n\n# Modulo (remainder after division)\nprint(a % b)\n\n# Exponentiation (a raised to the power of 2)\nprint(a ** 2)`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "math.floor", feedback: "You don't need math.floor. Use the // operator for floor division." },
            { pattern: "pow", feedback: "Use the ** operator for exponentiation instead of pow()." }
        ],
        tags: ["arithmetic", "floor-division", "modulo", "exponentiation"]
    },
    {
        id: "m2_a3",
        moduleId: 2,
        title: "Comparison Operators",
        difficulty: "medium",
        xpReward: 20,
        description: "Use comparison operators to evaluate relationships between values and print the boolean results.",
        instructions: [
            "Set x = 10 and y = 20.",
            "Print the result of x > y.",
            "Print the result of x < y.",
            "Print the result of x == y.",
            "Print the result of x != y.",
            "Print the result of x >= 10.",
            "Print the result of y <= 15."
        ],
        starterCode: `# Comparison operators return True or False\n\nx = 10\ny = 20\n\n# Is x greater than y?\n\n# Is x less than y?\n\n# Is x equal to y?\n\n# Is x not equal to y?\n\n# Is x greater than or equal to 10?\n\n# Is y less than or equal to 15?\n`,
        testCases: [
            { input: "", expectedOutput: "False\nTrue\nFalse\nTrue\nTrue\nFalse", description: "Should print boolean results of all comparisons", hidden: false },
        ],
        hints: [
            "Comparison operators: >, <, ==, !=, >=, <=",
            "== checks equality (not = which is assignment).",
            "Each comparison returns either True or False."
        ],
        solutionCode: `# Comparison operators return True or False\n\nx = 10\ny = 20\n\n# Is x greater than y?\nprint(x > y)\n\n# Is x less than y?\nprint(x < y)\n\n# Is x equal to y?\nprint(x == y)\n\n# Is x not equal to y?\nprint(x != y)\n\n# Is x greater than or equal to 10?\nprint(x >= 10)\n\n# Is y less than or equal to 15?\nprint(y <= 15)`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "x = y", feedback: "Use == for comparison, not = which is assignment." },
            { pattern: "true|false", feedback: "Python booleans are capitalized: True and False, not true/false." }
        ],
        tags: ["comparison", "operators", "booleans"]
    },
    {
        id: "m2_a4",
        moduleId: 2,
        title: "Logical Operators",
        difficulty: "medium",
        xpReward: 25,
        description: "Combine conditions using and, or, and not operators.",
        instructions: [
            "Set age = 25 and has_license = True.",
            "Print whether the person can drive: age >= 16 and has_license.",
            "Print whether the person qualifies for a discount: age < 18 or age > 65.",
            "Print the opposite of has_license using not.",
            "Set temperature = 72. Print whether it's comfortable: temperature > 60 and temperature < 80."
        ],
        starterCode: `# Logical operators: and, or, not\n\nage = 25\nhas_license = True\n\n# Can drive? (age >= 16 AND has a license)\n\n# Qualifies for discount? (under 18 OR over 65)\n\n# Opposite of has_license\n\ntemperature = 72\n# Is comfortable? (between 60 and 80)\n`,
        testCases: [
            { input: "", expectedOutput: "True\nFalse\nFalse\nTrue", description: "Should print results of logical operations", hidden: false },
        ],
        hints: [
            "'and' returns True only if BOTH conditions are True.",
            "'or' returns True if EITHER condition is True.",
            "'not' flips True to False and False to True."
        ],
        solutionCode: `# Logical operators: and, or, not\n\nage = 25\nhas_license = True\n\n# Can drive? (age >= 16 AND has a license)\nprint(age >= 16 and has_license)\n\n# Qualifies for discount? (under 18 OR over 65)\nprint(age < 18 or age > 65)\n\n# Opposite of has_license\nprint(not has_license)\n\ntemperature = 72\n# Is comfortable? (between 60 and 80)\nprint(temperature > 60 and temperature < 80)`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "&&", feedback: "Python uses 'and' not '&&'. Same for 'or' instead of '||'." },
            { pattern: "!", feedback: "Python uses 'not' instead of '!' for negation." }
        ],
        tags: ["logical-operators", "and", "or", "not", "booleans"]
    },
    {
        id: "m2_a5",
        moduleId: 2,
        title: "Temperature Converter",
        difficulty: "hard",
        xpReward: 30,
        description: "Build a temperature converter that converts Celsius to Fahrenheit and vice versa, using arithmetic operators and formatted output.",
        instructions: [
            "Set celsius = 100.",
            "Convert to Fahrenheit using: F = C * 9/5 + 32. Store in 'fahrenheit'.",
            "Print: '100C is 212.0F'",
            "Set fahrenheit2 = 72.",
            "Convert to Celsius using: C = (F - 32) * 5/9. Store in 'celsius2'.",
            "Print the result rounded to 1 decimal: '72F is 22.2C'"
        ],
        starterCode: `# Temperature converter\n\n# Celsius to Fahrenheit\ncelsius = 100\n# Formula: F = C * 9/5 + 32\n\n# Print: 100C is 212.0F\n\n# Fahrenheit to Celsius\nfahrenheit2 = 72\n# Formula: C = (F - 32) * 5/9\n\n# Print: 72F is 22.2C (rounded to 1 decimal)\n`,
        testCases: [
            { input: "", expectedOutput: "100C is 212.0F\n72F is 22.2C", description: "Should print both conversions", hidden: false },
        ],
        hints: [
            "For Celsius to Fahrenheit: fahrenheit = celsius * 9/5 + 32",
            "For Fahrenheit to Celsius: celsius2 = (fahrenheit2 - 32) * 5/9",
            "Use round(value, 1) to round to 1 decimal place."
        ],
        solutionCode: `# Temperature converter\n\n# Celsius to Fahrenheit\ncelsius = 100\nfahrenheit = celsius * 9/5 + 32\n\n# Print: 100C is 212.0F\nprint(f"{celsius}C is {fahrenheit}F")\n\n# Fahrenheit to Celsius\nfahrenheit2 = 72\ncelsius2 = (fahrenheit2 - 32) * 5/9\n\n# Print: 72F is 22.2C (rounded to 1 decimal)\nprint(f"{fahrenheit2}F is {round(celsius2, 1)}C")`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "9 / 5", feedback: "Make sure you follow order of operations. Multiplication before addition: C * 9/5 + 32." },
            { pattern: "round\\(.*0\\)", feedback: "Use round(value, 1) to get 1 decimal place." }
        ],
        tags: ["arithmetic", "formulas", "f-strings", "rounding"]
    },
    {
        id: "m2_a6",
        moduleId: 2,
        title: "Operator Precedence Challenge",
        difficulty: "hard",
        xpReward: 35,
        description: "Predict and verify the results of expressions involving operator precedence.",
        instructions: [
            "Calculate and print the result of: 2 + 3 * 4",
            "Calculate and print the result of: (2 + 3) * 4",
            "Calculate and print the result of: 10 - 2 ** 3",
            "Calculate and print the result of: 15 // 4 + 3 % 2",
            "Calculate and print the result of: not (5 > 3 and 2 > 8)"
        ],
        starterCode: `# Operator precedence - predict the output!\n# Remember: ** > * / // % > + - > comparisons > not > and > or\n\n# Expression 1: 2 + 3 * 4\n\n# Expression 2: (2 + 3) * 4\n\n# Expression 3: 10 - 2 ** 3\n\n# Expression 4: 15 // 4 + 3 % 2\n\n# Expression 5: not (5 > 3 and 2 > 8)\n`,
        testCases: [
            { input: "", expectedOutput: "14\n20\n2\n4\nTrue", description: "Should print correct results for all expressions", hidden: false },
        ],
        hints: [
            "Multiplication (*) happens before addition (+), so 2 + 3 * 4 = 2 + 12 = 14.",
            "Exponentiation (**) has higher precedence than subtraction. 2 ** 3 = 8, then 10 - 8 = 2.",
            "// and % have the same precedence as * and /. Evaluate left to right."
        ],
        solutionCode: `# Operator precedence\n\n# Expression 1: 2 + 3 * 4 = 2 + 12 = 14\nprint(2 + 3 * 4)\n\n# Expression 2: (2 + 3) * 4 = 5 * 4 = 20\nprint((2 + 3) * 4)\n\n# Expression 3: 10 - 2 ** 3 = 10 - 8 = 2\nprint(10 - 2 ** 3)\n\n# Expression 4: 15 // 4 + 3 % 2 = 3 + 1 = 4\nprint(15 // 4 + 3 % 2)\n\n# Expression 5: not (True and False) = not False = True\nprint(not (5 > 3 and 2 > 8))`,
        requiredConstructs: ["print_function"],
        commonErrors: [],
        tags: ["operators", "precedence", "arithmetic", "logic"]
    },

    // ========================================================
    // MODULE 3: if/elif/else Conditionals
    // ========================================================
    {
        id: "m3_a1",
        moduleId: 3,
        title: "Simple If Statement",
        difficulty: "easy",
        xpReward: 10,
        description: "Use a basic if statement to check a condition and print a message.",
        instructions: [
            "Set score = 85.",
            "If score is greater than or equal to 70, print 'You passed!'",
            "If score is less than 70, print 'Keep trying!'",
            "Since score is 85, only 'You passed!' should print."
        ],
        starterCode: `# Check if the student passed\n\nscore = 85\n\n# If score >= 70, print 'You passed!'\n# Otherwise, print 'Keep trying!'\n`,
        testCases: [
            { input: "", expectedOutput: "You passed!", description: "Score 85 should result in 'You passed!'", hidden: false },
        ],
        hints: [
            "An if statement looks like: if condition:",
            "Don't forget the colon at the end of the if line.",
            "The code inside the if block must be indented (4 spaces)."
        ],
        solutionCode: `# Check if the student passed\n\nscore = 85\n\n# If score >= 70, print 'You passed!'\n# Otherwise, print 'Keep trying!'\nif score >= 70:\n    print('You passed!')\nelse:\n    print('Keep trying!')`,
        requiredConstructs: ["if_statement", "print_function"],
        commonErrors: [
            { pattern: "if score >= 70", feedback: "Don't forget the colon (:) at the end of the if line." },
            { pattern: "if\\(", feedback: "In Python, you don't need parentheses around the condition (though they're optional)." }
        ],
        tags: ["conditionals", "if-else", "basics"]
    },
    {
        id: "m3_a2",
        moduleId: 3,
        title: "Grade Calculator",
        difficulty: "easy",
        xpReward: 15,
        description: "Use if/elif/else to assign letter grades based on a numeric score.",
        instructions: [
            "Set score = 78.",
            "Determine the letter grade using these ranges:",
            "90-100: 'A', 80-89: 'B', 70-79: 'C', 60-69: 'D', below 60: 'F'",
            "Print the grade letter."
        ],
        starterCode: `# Assign a letter grade based on the score\n\nscore = 78\n\n# Determine the grade:\n# 90+: A, 80-89: B, 70-79: C, 60-69: D, below 60: F\n# Print the letter grade\n`,
        testCases: [
            { input: "", expectedOutput: "C", description: "Score 78 should give grade C", hidden: false },
        ],
        hints: [
            "Start with the highest grade and work down using elif.",
            "Use if score >= 90, elif score >= 80, etc.",
            "The else at the end catches everything below 60."
        ],
        solutionCode: `# Assign a letter grade based on the score\n\nscore = 78\n\n# Determine the grade\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelif score >= 70:\n    print('C')\nelif score >= 60:\n    print('D')\nelse:\n    print('F')`,
        requiredConstructs: ["if_statement", "print_function"],
        commonErrors: [
            { pattern: "if score == 78", feedback: "Don't check for a specific score. Use ranges with >= so it works for any score." },
            { pattern: "elseif", feedback: "Python uses 'elif' not 'elseif'." }
        ],
        tags: ["conditionals", "elif", "grade-calculator"]
    },
    {
        id: "m3_a3",
        moduleId: 3,
        title: "Leap Year Checker",
        difficulty: "medium",
        xpReward: 25,
        description: "Determine if a given year is a leap year using nested conditionals.",
        instructions: [
            "Set year = 2024.",
            "A year is a leap year if:",
            "  - It is divisible by 4 AND",
            "  - It is NOT divisible by 100, UNLESS it is also divisible by 400.",
            "Print 'Leap year' or 'Not a leap year'."
        ],
        starterCode: `# Leap year checker\n\nyear = 2024\n\n# Rules:\n# Divisible by 4 -> leap year\n# UNLESS divisible by 100 -> not a leap year\n# UNLESS also divisible by 400 -> leap year\n\n# Print 'Leap year' or 'Not a leap year'\n`,
        testCases: [
            { input: "", expectedOutput: "Leap year", description: "2024 is a leap year", hidden: false },
        ],
        hints: [
            "Use the modulo operator (%) to check divisibility: year % 4 == 0",
            "You can combine conditions: if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)",
            "Or use nested if statements to check each rule."
        ],
        solutionCode: `# Leap year checker\n\nyear = 2024\n\n# Check leap year rules\nif (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):\n    print('Leap year')\nelse:\n    print('Not a leap year')`,
        requiredConstructs: ["if_statement", "print_function"],
        commonErrors: [
            { pattern: "year % 4", feedback: "Remember to use == 0 to check if the remainder is zero: year % 4 == 0" },
            { pattern: "year / 4", feedback: "Use % (modulo) not / (division) to check divisibility." }
        ],
        tags: ["conditionals", "logic", "modulo", "leap-year"]
    },
    {
        id: "m3_a4",
        moduleId: 3,
        title: "Number Classifier",
        difficulty: "medium",
        xpReward: 25,
        description: "Classify a number based on multiple properties: positive/negative/zero, even/odd, and size category.",
        instructions: [
            "Set number = -7.",
            "First, print whether it is 'Positive', 'Negative', or 'Zero'.",
            "Then, print whether it is 'Even' or 'Odd'.",
            "Finally, print its absolute size category: 'Small' (abs < 10), 'Medium' (10-99), or 'Large' (100+)."
        ],
        starterCode: `# Classify a number\n\nnumber = -7\n\n# Print 'Positive', 'Negative', or 'Zero'\n\n# Print 'Even' or 'Odd'\n\n# Print size: 'Small' (abs < 10), 'Medium' (10-99), 'Large' (100+)\n`,
        testCases: [
            { input: "", expectedOutput: "Negative\nOdd\nSmall", description: "-7 is negative, odd, and small", hidden: false },
        ],
        hints: [
            "Check > 0, < 0, or == 0 for sign classification.",
            "Use number % 2 == 0 to check even/odd.",
            "Use abs(number) to get the absolute value for size comparison."
        ],
        solutionCode: `# Classify a number\n\nnumber = -7\n\n# Print 'Positive', 'Negative', or 'Zero'\nif number > 0:\n    print('Positive')\nelif number < 0:\n    print('Negative')\nelse:\n    print('Zero')\n\n# Print 'Even' or 'Odd'\nif number % 2 == 0:\n    print('Even')\nelse:\n    print('Odd')\n\n# Print size: 'Small' (abs < 10), 'Medium' (10-99), 'Large' (100+)\nabs_num = abs(number)\nif abs_num < 10:\n    print('Small')\nelif abs_num < 100:\n    print('Medium')\nelse:\n    print('Large')`,
        requiredConstructs: ["if_statement", "print_function"],
        commonErrors: [
            { pattern: "-7 % 2", feedback: "In Python, -7 % 2 equals 1 (not -1), so -7 is correctly identified as Odd." }
        ],
        tags: ["conditionals", "classification", "abs", "modulo"]
    },
    {
        id: "m3_a5",
        moduleId: 3,
        title: "Ticket Price Calculator",
        difficulty: "hard",
        xpReward: 35,
        description: "Calculate a ticket price based on age, day of week, and membership status using nested conditionals.",
        instructions: [
            "Set age = 30, is_weekend = True, is_member = False.",
            "Base ticket price is $12.",
            "If the person is under 12 or 65+, they get a 50% discount.",
            "If it's a weekend, add $3 surcharge (applied after age discount).",
            "If they're a member, subtract $2 (applied last).",
            "Print the final price as a float: e.g., 15.0"
        ],
        starterCode: `# Ticket price calculator\n\nage = 30\nis_weekend = True\nis_member = False\n\n# Base price: $12\nprice = 12\n\n# Age discount: under 12 or 65+ get 50% off\n\n# Weekend surcharge: add $3\n\n# Member discount: subtract $2\n\n# Print the final price\n`,
        testCases: [
            { input: "", expectedOutput: "15.0", description: "Adult, weekend, non-member should be $15.0", hidden: false },
        ],
        hints: [
            "Start with price = 12. Apply discounts by modifying price.",
            "For 50% discount: price = price * 0.5 or price = price / 2",
            "Apply each adjustment in order: age, then weekend, then membership."
        ],
        solutionCode: `# Ticket price calculator\n\nage = 30\nis_weekend = True\nis_member = False\n\n# Base price\nprice = 12.0\n\n# Age discount: under 12 or 65+ get 50% off\nif age < 12 or age >= 65:\n    price = price * 0.5\n\n# Weekend surcharge: add $3\nif is_weekend:\n    price = price + 3\n\n# Member discount: subtract $2\nif is_member:\n    price = price - 2\n\n# Print the final price\nprint(price)`,
        requiredConstructs: ["if_statement", "variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "elif is_weekend", feedback: "Each condition is independent, so use separate if statements, not elif." },
            { pattern: "price = 15", feedback: "Don't hardcode the answer. Calculate it step by step so it works with any inputs." }
        ],
        tags: ["conditionals", "business-logic", "calculations"]
    },
    {
        id: "m3_a6",
        moduleId: 3,
        title: "Rock Paper Scissors Judge",
        difficulty: "hard",
        xpReward: 35,
        description: "Determine the winner of a Rock Paper Scissors game between two players.",
        instructions: [
            "Set player1 = 'rock' and player2 = 'scissors'.",
            "Determine the winner based on standard rules:",
            "  Rock beats Scissors, Scissors beats Paper, Paper beats Rock.",
            "Print 'Player 1 wins!' if player1 wins.",
            "Print 'Player 2 wins!' if player2 wins.",
            "Print 'It\\'s a tie!' if they chose the same."
        ],
        starterCode: `# Rock Paper Scissors\n\nplayer1 = 'rock'\nplayer2 = 'scissors'\n\n# Determine the winner:\n# Rock beats Scissors\n# Scissors beats Paper\n# Paper beats Rock\n# Same choice = tie\n`,
        testCases: [
            { input: "", expectedOutput: "Player 1 wins!", description: "Rock beats scissors", hidden: false },
        ],
        hints: [
            "First check if it's a tie (both chose the same).",
            "Then check the three winning conditions for player 1.",
            "Otherwise, player 2 wins."
        ],
        solutionCode: `# Rock Paper Scissors\n\nplayer1 = 'rock'\nplayer2 = 'scissors'\n\n# Determine the winner\nif player1 == player2:\n    print("It's a tie!")\nelif (player1 == 'rock' and player2 == 'scissors') or \\\n     (player1 == 'scissors' and player2 == 'paper') or \\\n     (player1 == 'paper' and player2 == 'rock'):\n    print('Player 1 wins!')\nelse:\n    print('Player 2 wins!')`,
        requiredConstructs: ["if_statement", "print_function"],
        commonErrors: [
            { pattern: "if player1 == 'rock':", feedback: "Check both players' choices together, not just player1's choice alone." }
        ],
        tags: ["conditionals", "game-logic", "comparisons"]
    },

    // ========================================================
    // MODULE 4: for loops, while loops, nested loops
    // ========================================================
    {
        id: "m4_a1",
        moduleId: 4,
        title: "Counting with For Loops",
        difficulty: "easy",
        xpReward: 10,
        description: "Use a for loop with range() to print a sequence of numbers.",
        instructions: [
            "Use a for loop to print numbers 1 through 5, each on a new line.",
            "Use the range() function to generate the sequence."
        ],
        starterCode: `# Print numbers 1 through 5 using a for loop\n\n# Use range() to generate numbers\n`,
        testCases: [
            { input: "", expectedOutput: "1\n2\n3\n4\n5", description: "Should print 1 through 5", hidden: false },
        ],
        hints: [
            "range(1, 6) generates numbers 1, 2, 3, 4, 5.",
            "The syntax is: for variable in range(start, stop):",
            "Remember: range(start, stop) stops BEFORE the stop value."
        ],
        solutionCode: `# Print numbers 1 through 5 using a for loop\n\nfor i in range(1, 6):\n    print(i)`,
        requiredConstructs: ["for_loop", "print_function"],
        commonErrors: [
            { pattern: "range\\(1, 5\\)", feedback: "range(1, 5) only goes up to 4. Use range(1, 6) to include 5." },
            { pattern: "range\\(5\\)", feedback: "range(5) starts at 0. Use range(1, 6) to start at 1." }
        ],
        tags: ["for-loop", "range", "basics"]
    },
    {
        id: "m4_a2",
        moduleId: 4,
        title: "Sum Calculator",
        difficulty: "easy",
        xpReward: 15,
        description: "Use a for loop to calculate the sum of numbers from 1 to 10.",
        instructions: [
            "Create a variable 'total' and initialize it to 0.",
            "Use a for loop to add each number from 1 to 10 to 'total'.",
            "After the loop, print the total."
        ],
        starterCode: `# Calculate the sum of numbers 1 through 10\n\ntotal = 0\n\n# Loop through 1 to 10 and add each number to total\n\n# Print the final total\n`,
        testCases: [
            { input: "", expectedOutput: "55", description: "Sum of 1-10 should be 55", hidden: false },
        ],
        hints: [
            "Initialize total = 0 before the loop.",
            "Inside the loop: total = total + i (or total += i)",
            "Print total after the loop ends (no indentation)."
        ],
        solutionCode: `# Calculate the sum of numbers 1 through 10\n\ntotal = 0\n\n# Loop through 1 to 10 and add each number to total\nfor i in range(1, 11):\n    total += i\n\n# Print the final total\nprint(total)`,
        requiredConstructs: ["for_loop", "variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "print.*total.*\\n.*for", feedback: "Make sure the print statement comes AFTER the loop, not before." },
            { pattern: "range\\(1, 10\\)", feedback: "range(1, 10) goes up to 9. Use range(1, 11) to include 10." }
        ],
        tags: ["for-loop", "accumulator", "sum"]
    },
    {
        id: "m4_a3",
        moduleId: 4,
        title: "While Loop Countdown",
        difficulty: "medium",
        xpReward: 20,
        description: "Use a while loop to create a countdown from 5 to 1, then print 'Liftoff!'",
        instructions: [
            "Set count = 5.",
            "Use a while loop that continues while count > 0.",
            "Print the current count inside the loop.",
            "Decrease count by 1 each iteration.",
            "After the loop, print 'Liftoff!'"
        ],
        starterCode: `# Countdown from 5 to 1, then Liftoff!\n\ncount = 5\n\n# While count is greater than 0:\n#   print count\n#   decrease count by 1\n\n# Print 'Liftoff!' after the loop\n`,
        testCases: [
            { input: "", expectedOutput: "5\n4\n3\n2\n1\nLiftoff!", description: "Should count down from 5 to 1 then say Liftoff!", hidden: false },
        ],
        hints: [
            "A while loop continues as long as the condition is True.",
            "Decrease count with: count -= 1 or count = count - 1",
            "Make sure 'Liftoff!' is printed outside the loop (not indented)."
        ],
        solutionCode: `# Countdown from 5 to 1, then Liftoff!\n\ncount = 5\n\nwhile count > 0:\n    print(count)\n    count -= 1\n\nprint('Liftoff!')`,
        requiredConstructs: ["while_loop", "print_function"],
        commonErrors: [
            { pattern: "while count >= 0", feedback: "Use count > 0, not count >= 0, otherwise you'll print 0 before Liftoff!" },
            { pattern: "while count", feedback: "Be explicit: use 'while count > 0' instead of just 'while count'." }
        ],
        tags: ["while-loop", "countdown", "basics"]
    },
    {
        id: "m4_a4",
        moduleId: 4,
        title: "Multiplication Table",
        difficulty: "medium",
        xpReward: 25,
        description: "Use a for loop to print the multiplication table for a given number.",
        instructions: [
            "Set number = 7.",
            "Use a for loop to print the multiplication table for 7 (from 1 to 5).",
            "Format each line as: '7 x 1 = 7', '7 x 2 = 14', etc."
        ],
        starterCode: `# Print multiplication table for a number\n\nnumber = 7\n\n# Print: 7 x 1 = 7, 7 x 2 = 14, ... up to 7 x 5 = 35\n`,
        testCases: [
            { input: "", expectedOutput: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35", description: "Should print 7 times table from 1 to 5", hidden: false },
        ],
        hints: [
            "Use range(1, 6) to loop from 1 to 5.",
            "Use f-strings: f'{number} x {i} = {number * i}'",
            "The calculation is simply number * i for each iteration."
        ],
        solutionCode: `# Print multiplication table for a number\n\nnumber = 7\n\nfor i in range(1, 6):\n    print(f"{number} x {i} = {number * i}")`,
        requiredConstructs: ["for_loop", "print_function"],
        commonErrors: [
            { pattern: "print\\(number, 'x'", feedback: "Using f-strings will be easier: f'{number} x {i} = {number * i}'" }
        ],
        tags: ["for-loop", "multiplication-table", "f-strings"]
    },
    {
        id: "m4_a5",
        moduleId: 4,
        title: "Pattern Printer",
        difficulty: "hard",
        xpReward: 35,
        description: "Use nested loops to print a right triangle pattern of stars.",
        instructions: [
            "Use nested for loops to print a right triangle with 5 rows.",
            "Row 1 has 1 star, row 2 has 2 stars, etc.",
            "Each star is the '*' character with no spaces between them."
        ],
        starterCode: `# Print a right triangle pattern:\n# *\n# **\n# ***\n# ****\n# *****\n\n# Use nested for loops\n`,
        testCases: [
            { input: "", expectedOutput: "*\n**\n***\n****\n*****", description: "Should print a right triangle of stars", hidden: false },
        ],
        hints: [
            "The outer loop controls the row number (1 to 5).",
            "You can multiply a string: '*' * 3 gives '***'.",
            "Alternatively, use an inner loop to print stars, but string multiplication is simpler."
        ],
        solutionCode: `# Print a right triangle pattern\nfor i in range(1, 6):\n    print('*' * i)`,
        requiredConstructs: ["for_loop", "print_function"],
        commonErrors: [
            { pattern: "range\\(5\\)", feedback: "range(5) gives 0-4. Use range(1, 6) to get 1-5, or adjust your formula." },
            { pattern: "end=", feedback: "You can simplify by using string multiplication: print('*' * i)" }
        ],
        tags: ["nested-loops", "patterns", "string-multiplication"]
    },
    {
        id: "m4_a6",
        moduleId: 4,
        title: "FizzBuzz",
        difficulty: "hard",
        xpReward: 40,
        description: "Solve the classic FizzBuzz problem using loops and conditionals together.",
        instructions: [
            "Loop through numbers 1 to 20.",
            "If the number is divisible by both 3 and 5, print 'FizzBuzz'.",
            "Else if divisible by 3, print 'Fizz'.",
            "Else if divisible by 5, print 'Buzz'.",
            "Otherwise, print the number itself."
        ],
        starterCode: `# FizzBuzz: numbers 1 to 20\n# Divisible by 3 and 5: 'FizzBuzz'\n# Divisible by 3 only: 'Fizz'\n# Divisible by 5 only: 'Buzz'\n# Otherwise: the number\n`,
        testCases: [
            { input: "", expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz", description: "FizzBuzz from 1 to 20", hidden: false },
        ],
        hints: [
            "Check divisibility by BOTH 3 and 5 first (using 'and').",
            "Use i % 3 == 0 to check if i is divisible by 3.",
            "Order matters: check 'both' before 'either', or you'll never hit FizzBuzz."
        ],
        solutionCode: `# FizzBuzz: numbers 1 to 20\nfor i in range(1, 21):\n    if i % 3 == 0 and i % 5 == 0:\n        print('FizzBuzz')\n    elif i % 3 == 0:\n        print('Fizz')\n    elif i % 5 == 0:\n        print('Buzz')\n    else:\n        print(i)`,
        requiredConstructs: ["for_loop", "if_statement", "print_function"],
        commonErrors: [
            { pattern: "if i % 3.*elif i % 15", feedback: "Check divisibility by both 3 AND 5 first, before checking each individually." },
            { pattern: "i % 15", feedback: "While % 15 works, it's clearer to write: i % 3 == 0 and i % 5 == 0" }
        ],
        tags: ["fizzbuzz", "loops", "conditionals", "classic-problem"]
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { activitiesM1M4 };
}
