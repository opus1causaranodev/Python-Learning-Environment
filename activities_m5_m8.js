// ============================================================
// ACTIVITIES: Modules 5-8
// M5: String manipulation, methods, formatting
// M6: Lists, tuples, sets operations
// M7: Dictionary operations
// M8: Functions, parameters, return values, lambda
// ============================================================

const activitiesM5M8 = [

    // ========================================================
    // MODULE 5: String Manipulation, Methods, Formatting
    // ========================================================
    {
        id: "m5_a1",
        moduleId: 5,
        title: "String Methods Basics",
        difficulty: "easy",
        xpReward: 10,
        description: "Explore basic string methods like upper(), lower(), and title().",
        instructions: [
            "Set message = 'hello, python world!'",
            "Print the message in all uppercase.",
            "Print the message in all lowercase.",
            "Print the message in title case (first letter of each word capitalized)."
        ],
        starterCode: `# String methods\n\nmessage = 'hello, python world!'\n\n# Print in UPPERCASE\n\n# Print in lowercase\n\n# Print in Title Case\n`,
        testCases: [
            { input: "", expectedOutput: "HELLO, PYTHON WORLD!\nhello, python world!\nHello, Python World!", description: "Should print upper, lower, and title case", hidden: false },
        ],
        hints: [
            "Use .upper() to convert to uppercase: message.upper()",
            "Use .lower() for lowercase and .title() for title case.",
            "These methods return new strings; they don't modify the original."
        ],
        solutionCode: `# String methods\n\nmessage = 'hello, python world!'\n\n# Print in UPPERCASE\nprint(message.upper())\n\n# Print in lowercase\nprint(message.lower())\n\n# Print in Title Case\nprint(message.title())`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "upper\\(message\\)", feedback: "String methods use dot notation: message.upper(), not upper(message)." },
            { pattern: "\\.Upper\\(\\)", feedback: "Python is case-sensitive. Use .upper() not .Upper()." }
        ],
        tags: ["strings", "methods", "upper", "lower", "title"]
    },
    {
        id: "m5_a2",
        moduleId: 5,
        title: "String Slicing",
        difficulty: "easy",
        xpReward: 15,
        description: "Extract parts of a string using slicing notation.",
        instructions: [
            "Set word = 'Programming'",
            "Print the first 4 characters.",
            "Print the last 4 characters.",
            "Print every other character.",
            "Print the string reversed."
        ],
        starterCode: `# String slicing\n\nword = 'Programming'\n\n# First 4 characters (Prog)\n\n# Last 4 characters (ming)\n\n# Every other character (Pormin)\n\n# Reversed string (gnimmargorP)\n`,
        testCases: [
            { input: "", expectedOutput: "Prog\nming\nPormin\ngnimmargorP", description: "Should print sliced strings", hidden: false },
        ],
        hints: [
            "Slicing syntax: string[start:stop:step]",
            "word[:4] gets the first 4 characters.",
            "word[-4:] gets the last 4 characters.",
            "word[::2] gets every other character. word[::-1] reverses."
        ],
        solutionCode: `# String slicing\n\nword = 'Programming'\n\n# First 4 characters\nprint(word[:4])\n\n# Last 4 characters\nprint(word[-4:])\n\n# Every other character\nprint(word[::2])\n\n# Reversed string\nprint(word[::-1])`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "word\\[0:4\\]", feedback: "That works! But word[:4] is simpler - you can omit 0." },
            { pattern: "reverse\\(\\)", feedback: "Strings don't have a reverse() method. Use slicing: word[::-1]" }
        ],
        tags: ["strings", "slicing", "indexing"]
    },
    {
        id: "m5_a3",
        moduleId: 5,
        title: "String Search and Replace",
        difficulty: "medium",
        xpReward: 20,
        description: "Use find(), count(), and replace() string methods.",
        instructions: [
            "Set text = 'the quick brown fox jumps over the lazy dog'",
            "Print the index where 'fox' first appears.",
            "Print how many times 'the' appears in the text.",
            "Replace 'lazy' with 'energetic' and print the new string."
        ],
        starterCode: `# String searching and replacing\n\ntext = 'the quick brown fox jumps over the lazy dog'\n\n# Find the index of 'fox'\n\n# Count occurrences of 'the'\n\n# Replace 'lazy' with 'energetic' and print\n`,
        testCases: [
            { input: "", expectedOutput: "16\n2\nthe quick brown fox jumps over the energetic dog", description: "Should find, count, and replace correctly", hidden: false },
        ],
        hints: [
            ".find('fox') returns the index of the first occurrence.",
            ".count('the') returns how many times the substring appears.",
            ".replace('old', 'new') returns a new string with replacements."
        ],
        solutionCode: `# String searching and replacing\n\ntext = 'the quick brown fox jumps over the lazy dog'\n\n# Find the index of 'fox'\nprint(text.find('fox'))\n\n# Count occurrences of 'the'\nprint(text.count('the'))\n\n# Replace 'lazy' with 'energetic' and print\nprint(text.replace('lazy', 'energetic'))`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "index\\(", feedback: "Both .find() and .index() work, but .find() returns -1 if not found instead of raising an error." }
        ],
        tags: ["strings", "find", "count", "replace"]
    },
    {
        id: "m5_a4",
        moduleId: 5,
        title: "String Split and Join",
        difficulty: "medium",
        xpReward: 25,
        description: "Break strings apart with split() and combine them with join().",
        instructions: [
            "Set csv_data = 'apple,banana,cherry,date'",
            "Split the string by commas into a list and print it.",
            "Set words = ['Python', 'is', 'awesome']",
            "Join the words with spaces and print the resulting sentence.",
            "Join the words with ' - ' and print."
        ],
        starterCode: `# Split and Join\n\ncsv_data = 'apple,banana,cherry,date'\n\n# Split by commas and print the list\n\nwords = ['Python', 'is', 'awesome']\n\n# Join with spaces and print\n\n# Join with ' - ' and print\n`,
        testCases: [
            { input: "", expectedOutput: "['apple', 'banana', 'cherry', 'date']\nPython is awesome\nPython - is - awesome", description: "Should split and join correctly", hidden: false },
        ],
        hints: [
            "Use .split(',') to split a string by commas.",
            "Use ' '.join(list) to join list items with spaces.",
            "The join method is called on the separator string, not the list."
        ],
        solutionCode: `# Split and Join\n\ncsv_data = 'apple,banana,cherry,date'\n\n# Split by commas and print the list\nprint(csv_data.split(','))\n\nwords = ['Python', 'is', 'awesome']\n\n# Join with spaces and print\nprint(' '.join(words))\n\n# Join with ' - ' and print\nprint(' - '.join(words))`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "words.join", feedback: "join() is called on the separator string: ' '.join(words), not words.join(' ')." }
        ],
        tags: ["strings", "split", "join", "lists"]
    },
    {
        id: "m5_a5",
        moduleId: 5,
        title: "F-String Formatting",
        difficulty: "hard",
        xpReward: 30,
        description: "Master f-string formatting with alignment, padding, and number formatting.",
        instructions: [
            "Set name = 'Alice', score = 95.678, items = 3.",
            "Print name left-aligned in a 10-character field: 'Name: Alice     '",
            "Print score formatted to 1 decimal place: 'Score: 95.7'",
            "Print items zero-padded to 3 digits: 'Items: 003'",
            "Print score as a percentage with no decimals: 'Grade: 96%'"
        ],
        starterCode: `# F-string formatting\n\nname = 'Alice'\nscore = 95.678\nitems = 3\n\n# Left-align name in 10-char field: 'Name: Alice     '\n\n# Score to 1 decimal: 'Score: 95.7'\n\n# Items zero-padded to 3 digits: 'Items: 003'\n\n# Score as percentage (divided by 100 first): 'Grade: 96%'\n`,
        testCases: [
            { input: "", expectedOutput: "Name: Alice     \nScore: 95.7\nItems: 003\nGrade: 96%", description: "Should format all values correctly", hidden: false },
        ],
        hints: [
            "Left-align with f'{name:<10}' for a 10-character field.",
            "Format decimals with f'{score:.1f}' for 1 decimal place.",
            "Zero-pad with f'{items:03d}' for 3 digits.",
            "For percentage: f'{score/100:.0%}' formats as percent."
        ],
        solutionCode: `# F-string formatting\n\nname = 'Alice'\nscore = 95.678\nitems = 3\n\n# Left-align name in 10-char field\nprint(f"Name: {name:<10}")\n\n# Score to 1 decimal\nprint(f"Score: {score:.1f}")\n\n# Items zero-padded to 3 digits\nprint(f"Items: {items:03d}")\n\n# Score as percentage\nprint(f"Grade: {score/100:.0%}")`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "round\\(", feedback: "Use f-string format specs instead of round(): f'{score:.1f}'" },
            { pattern: "str\\(items\\).zfill", feedback: "f-strings can do this: f'{items:03d}' is cleaner than zfill." }
        ],
        tags: ["f-strings", "formatting", "alignment", "number-format"]
    },
    {
        id: "m5_a6",
        moduleId: 5,
        title: "Palindrome Checker",
        difficulty: "hard",
        xpReward: 35,
        description: "Check if words are palindromes using string manipulation techniques.",
        instructions: [
            "Set word1 = 'racecar' and word2 = 'python'.",
            "For each word, check if it reads the same forwards and backwards.",
            "Print 'racecar is a palindrome' or 'racecar is not a palindrome'.",
            "Do the same for word2.",
            "Bonus: set word3 = 'Was It A Rat I Saw' and check it case-insensitively, ignoring spaces."
        ],
        starterCode: `# Palindrome checker\n\nword1 = 'racecar'\nword2 = 'python'\nword3 = 'Was It A Rat I Saw'\n\n# Check word1\n\n# Check word2\n\n# Check word3 (ignore case and spaces)\n`,
        testCases: [
            { input: "", expectedOutput: "racecar is a palindrome\npython is not a palindrome\nWas It A Rat I Saw is a palindrome", description: "Should correctly identify palindromes", hidden: false },
        ],
        hints: [
            "Reverse a string with [::-1].",
            "Compare the original and reversed: word == word[::-1]",
            "For word3: convert to lowercase and remove spaces first."
        ],
        solutionCode: `# Palindrome checker\n\nword1 = 'racecar'\nword2 = 'python'\nword3 = 'Was It A Rat I Saw'\n\n# Check word1\nif word1 == word1[::-1]:\n    print(f"{word1} is a palindrome")\nelse:\n    print(f"{word1} is not a palindrome")\n\n# Check word2\nif word2 == word2[::-1]:\n    print(f"{word2} is a palindrome")\nelse:\n    print(f"{word2} is not a palindrome")\n\n# Check word3 (ignore case and spaces)\ncleaned = word3.lower().replace(' ', '')\nif cleaned == cleaned[::-1]:\n    print(f"{word3} is a palindrome")\nelse:\n    print(f"{word3} is not a palindrome")`,
        requiredConstructs: ["if_statement", "print_function"],
        commonErrors: [
            { pattern: "reversed\\(", feedback: "reversed() returns an iterator, not a string. Use slicing: word[::-1]" }
        ],
        tags: ["strings", "palindrome", "slicing", "conditionals"]
    },

    // ========================================================
    // MODULE 6: Lists, Tuples, Sets Operations
    // ========================================================
    {
        id: "m6_a1",
        moduleId: 6,
        title: "List Basics",
        difficulty: "easy",
        xpReward: 10,
        description: "Create lists, access elements by index, and modify list contents.",
        instructions: [
            "Create a list called 'fruits' with: 'apple', 'banana', 'cherry'.",
            "Print the first element.",
            "Print the last element using negative indexing.",
            "Change the second element to 'blueberry'.",
            "Print the entire updated list."
        ],
        starterCode: `# List basics\n\n# Create a list of fruits\n\n# Print the first element\n\n# Print the last element (use negative indexing)\n\n# Change the second element to 'blueberry'\n\n# Print the full list\n`,
        testCases: [
            { input: "", expectedOutput: "apple\ncherry\n['apple', 'blueberry', 'cherry']", description: "Should access and modify list elements", hidden: false },
        ],
        hints: [
            "Create a list with square brackets: fruits = ['apple', 'banana', 'cherry']",
            "Access elements by index: fruits[0] for first, fruits[-1] for last.",
            "Modify by assignment: fruits[1] = 'blueberry'"
        ],
        solutionCode: `# List basics\n\n# Create a list of fruits\nfruits = ['apple', 'banana', 'cherry']\n\n# Print the first element\nprint(fruits[0])\n\n# Print the last element (use negative indexing)\nprint(fruits[-1])\n\n# Change the second element to 'blueberry'\nfruits[1] = 'blueberry'\n\n# Print the full list\nprint(fruits)`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "fruits\\[3\\]", feedback: "List indices start at 0. The third element is fruits[2], not fruits[3]." },
            { pattern: "fruits\\(", feedback: "Use square brackets for list access: fruits[0], not fruits(0)." }
        ],
        tags: ["lists", "indexing", "basics"]
    },
    {
        id: "m6_a2",
        moduleId: 6,
        title: "List Methods",
        difficulty: "easy",
        xpReward: 15,
        description: "Practice common list methods: append, insert, remove, and pop.",
        instructions: [
            "Start with numbers = [10, 20, 30].",
            "Append 40 to the end.",
            "Insert 15 at index 1.",
            "Remove the value 30.",
            "Pop the last element and store it in 'popped'.",
            "Print numbers and print popped."
        ],
        starterCode: `# List methods\n\nnumbers = [10, 20, 30]\n\n# Append 40\n\n# Insert 15 at index 1\n\n# Remove the value 30\n\n# Pop the last element into 'popped'\n\n# Print the list and the popped value\n`,
        testCases: [
            { input: "", expectedOutput: "[10, 15, 20]\n40", description: "Should show modified list and popped value", hidden: false },
        ],
        hints: [
            ".append(value) adds to the end of the list.",
            ".insert(index, value) inserts at a specific position.",
            ".remove(value) removes the first occurrence of that value.",
            ".pop() removes and returns the last element."
        ],
        solutionCode: `# List methods\n\nnumbers = [10, 20, 30]\n\n# Append 40\nnumbers.append(40)\n\n# Insert 15 at index 1\nnumbers.insert(1, 15)\n\n# Remove the value 30\nnumbers.remove(30)\n\n# Pop the last element into 'popped'\npopped = numbers.pop()\n\n# Print the list and the popped value\nprint(numbers)\nprint(popped)`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "numbers.add", feedback: "Lists use .append(), not .add(). (.add() is for sets.)" },
            { pattern: "remove\\(2\\)", feedback: ".remove(value) removes by VALUE, not by index. To remove index 2, use .pop(2)." }
        ],
        tags: ["lists", "methods", "append", "insert", "remove", "pop"]
    },
    {
        id: "m6_a3",
        moduleId: 6,
        title: "List Slicing and Sorting",
        difficulty: "medium",
        xpReward: 20,
        description: "Slice lists and sort them in different ways.",
        instructions: [
            "Set numbers = [5, 2, 8, 1, 9, 3, 7, 4, 6].",
            "Print the first 3 elements.",
            "Print the last 3 elements.",
            "Print a sorted version (ascending) without modifying the original.",
            "Print a sorted version (descending).",
            "Print the original list to show it's unchanged."
        ],
        starterCode: `# List slicing and sorting\n\nnumbers = [5, 2, 8, 1, 9, 3, 7, 4, 6]\n\n# First 3 elements\n\n# Last 3 elements\n\n# Sorted ascending (don't modify original)\n\n# Sorted descending\n\n# Print original to prove it's unchanged\n`,
        testCases: [
            { input: "", expectedOutput: "[5, 2, 8]\n[4, 6]\n[1, 2, 3, 4, 5, 6, 7, 8, 9]\n[9, 8, 7, 6, 5, 4, 3, 2, 1]\n[5, 2, 8, 1, 9, 3, 7, 4, 6]", description: "Should slice and sort correctly", hidden: false },
        ],
        hints: [
            "Use numbers[:3] for first 3, numbers[-3:] for last 3. Wait - count the elements! numbers[-3:] gives the last 3 which are [4, 6] for 2 elements if you use [-2:].",
            "sorted(numbers) returns a new sorted list without modifying the original.",
            "sorted(numbers, reverse=True) sorts in descending order."
        ],
        solutionCode: `# List slicing and sorting\n\nnumbers = [5, 2, 8, 1, 9, 3, 7, 4, 6]\n\n# First 3 elements\nprint(numbers[:3])\n\n# Last 3 elements\nprint(numbers[-3:])\n\n# Sorted ascending (don't modify original)\nprint(sorted(numbers))\n\n# Sorted descending\nprint(sorted(numbers, reverse=True))\n\n# Print original to prove it's unchanged\nprint(numbers)`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "numbers.sort\\(\\)", feedback: ".sort() modifies the list in place. Use sorted(numbers) to get a new sorted list." }
        ],
        tags: ["lists", "slicing", "sorting", "sorted"]
    },
    {
        id: "m6_a4",
        moduleId: 6,
        title: "Tuples and Unpacking",
        difficulty: "medium",
        xpReward: 25,
        description: "Work with tuples, understand immutability, and practice tuple unpacking.",
        instructions: [
            "Create a tuple: coordinates = (10, 20, 30).",
            "Print the tuple and its length.",
            "Unpack the tuple into variables x, y, z and print each.",
            "Create a tuple of tuples: points = ((1, 2), (3, 4), (5, 6)).",
            "Loop through points and print each pair as 'x=1, y=2' format."
        ],
        starterCode: `# Tuples and unpacking\n\n# Create a coordinate tuple\ncoordinates = (10, 20, 30)\n\n# Print the tuple and its length\n\n# Unpack into x, y, z and print each\n\n# Create a tuple of point pairs\npoints = ((1, 2), (3, 4), (5, 6))\n\n# Loop and print each as 'x=_, y=_'\n`,
        testCases: [
            { input: "", expectedOutput: "(10, 20, 30)\n3\n10\n20\n30\nx=1, y=2\nx=3, y=4\nx=5, y=6", description: "Should demonstrate tuple operations", hidden: false },
        ],
        hints: [
            "len() works on tuples just like lists.",
            "Unpack with: x, y, z = coordinates",
            "In the loop: for a, b in points: unpacks each inner tuple."
        ],
        solutionCode: `# Tuples and unpacking\n\n# Create a coordinate tuple\ncoordinates = (10, 20, 30)\n\n# Print the tuple and its length\nprint(coordinates)\nprint(len(coordinates))\n\n# Unpack into x, y, z and print each\nx, y, z = coordinates\nprint(x)\nprint(y)\nprint(z)\n\n# Create a tuple of point pairs\npoints = ((1, 2), (3, 4), (5, 6))\n\n# Loop and print each as 'x=_, y=_'\nfor a, b in points:\n    print(f"x={a}, y={b}")`,
        requiredConstructs: ["variable_assignment", "for_loop", "print_function"],
        commonErrors: [
            { pattern: "coordinates\\[0\\] =", feedback: "Tuples are immutable! You cannot change their values after creation." }
        ],
        tags: ["tuples", "unpacking", "immutability", "loops"]
    },
    {
        id: "m6_a5",
        moduleId: 6,
        title: "Set Operations",
        difficulty: "hard",
        xpReward: 30,
        description: "Perform set operations: union, intersection, and difference.",
        instructions: [
            "Create set_a = {1, 2, 3, 4, 5} and set_b = {4, 5, 6, 7, 8}.",
            "Print the union (all unique elements from both).",
            "Print the intersection (elements in both).",
            "Print the difference (elements in A but not in B).",
            "Print the symmetric difference (elements in either but not both)."
        ],
        starterCode: `# Set operations\n\nset_a = {1, 2, 3, 4, 5}\nset_b = {4, 5, 6, 7, 8}\n\n# Union: all unique elements from both sets\n\n# Intersection: elements common to both\n\n# Difference: elements in A but not in B\n\n# Symmetric difference: elements in either but not both\n`,
        testCases: [
            { input: "", expectedOutput: "{1, 2, 3, 4, 5, 6, 7, 8}\n{4, 5}\n{1, 2, 3}\n{1, 2, 3, 6, 7, 8}", description: "Should show correct set operations", hidden: false },
        ],
        hints: [
            "Union: set_a | set_b or set_a.union(set_b)",
            "Intersection: set_a & set_b or set_a.intersection(set_b)",
            "Difference: set_a - set_b",
            "Symmetric difference: set_a ^ set_b"
        ],
        solutionCode: `# Set operations\n\nset_a = {1, 2, 3, 4, 5}\nset_b = {4, 5, 6, 7, 8}\n\n# Union\nprint(set_a | set_b)\n\n# Intersection\nprint(set_a & set_b)\n\n# Difference\nprint(set_a - set_b)\n\n# Symmetric difference\nprint(set_a ^ set_b)`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "set_a \\+ set_b", feedback: "Sets don't support + operator. Use | for union or set_a.union(set_b)." }
        ],
        tags: ["sets", "union", "intersection", "difference"]
    },
    {
        id: "m6_a6",
        moduleId: 6,
        title: "List Statistics",
        difficulty: "hard",
        xpReward: 35,
        description: "Calculate statistics from a list of numbers without using external libraries.",
        instructions: [
            "Set grades = [85, 92, 78, 95, 88, 72, 90, 83, 97, 76].",
            "Print the count of grades.",
            "Print the sum of all grades.",
            "Print the average (to 1 decimal place).",
            "Print the highest grade.",
            "Print the lowest grade.",
            "Print the sorted grades."
        ],
        starterCode: `# List statistics\n\ngrades = [85, 92, 78, 95, 88, 72, 90, 83, 97, 76]\n\n# Count\n\n# Sum\n\n# Average (1 decimal place)\n\n# Highest\n\n# Lowest\n\n# Sorted\n`,
        testCases: [
            { input: "", expectedOutput: "10\n856\n85.6\n97\n72\n[72, 76, 78, 83, 85, 88, 90, 92, 95, 97]", description: "Should calculate correct statistics", hidden: false },
        ],
        hints: [
            "len() for count, sum() for total.",
            "Average = sum / len. Use round(avg, 1) for 1 decimal.",
            "max() for highest, min() for lowest, sorted() for sorted list."
        ],
        solutionCode: `# List statistics\n\ngrades = [85, 92, 78, 95, 88, 72, 90, 83, 97, 76]\n\n# Count\nprint(len(grades))\n\n# Sum\nprint(sum(grades))\n\n# Average (1 decimal place)\nprint(round(sum(grades) / len(grades), 1))\n\n# Highest\nprint(max(grades))\n\n# Lowest\nprint(min(grades))\n\n# Sorted\nprint(sorted(grades))`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "import statistics", feedback: "You can do this with built-in functions: len(), sum(), max(), min(), sorted()." }
        ],
        tags: ["lists", "statistics", "built-in-functions"]
    },

    // ========================================================
    // MODULE 7: Dictionary Operations
    // ========================================================
    {
        id: "m7_a1",
        moduleId: 7,
        title: "Dictionary Basics",
        difficulty: "easy",
        xpReward: 10,
        description: "Create a dictionary, access values, and add new key-value pairs.",
        instructions: [
            "Create a dictionary: person = {'name': 'Alice', 'age': 30, 'city': 'New York'}.",
            "Print the value of the 'name' key.",
            "Print the value of the 'age' key.",
            "Add a new key 'email' with value 'alice@example.com'.",
            "Print the entire dictionary."
        ],
        starterCode: `# Dictionary basics\n\n# Create the person dictionary\n\n# Print the name\n\n# Print the age\n\n# Add email\n\n# Print the full dictionary\n`,
        testCases: [
            { input: "", expectedOutput: "Alice\n30\n{'name': 'Alice', 'age': 30, 'city': 'New York', 'email': 'alice@example.com'}", description: "Should access and modify dictionary", hidden: false },
        ],
        hints: [
            "Access with: person['name'] or person.get('name')",
            "Add new pairs with: person['email'] = 'alice@example.com'",
            "Dictionaries maintain insertion order in Python 3.7+."
        ],
        solutionCode: `# Dictionary basics\n\n# Create the person dictionary\nperson = {'name': 'Alice', 'age': 30, 'city': 'New York'}\n\n# Print the name\nprint(person['name'])\n\n# Print the age\nprint(person['age'])\n\n# Add email\nperson['email'] = 'alice@example.com'\n\n# Print the full dictionary\nprint(person)`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "person.name", feedback: "Use square bracket notation: person['name'], not dot notation." },
            { pattern: "person\\(", feedback: "Use square brackets, not parentheses: person['name']" }
        ],
        tags: ["dictionaries", "basics", "key-value"]
    },
    {
        id: "m7_a2",
        moduleId: 7,
        title: "Dictionary Methods",
        difficulty: "easy",
        xpReward: 15,
        description: "Explore dictionary methods: keys(), values(), items(), and get().",
        instructions: [
            "Set scores = {'Alice': 95, 'Bob': 87, 'Charlie': 92}.",
            "Print all the keys.",
            "Print all the values.",
            "Print all key-value pairs.",
            "Use .get() to safely access 'David' with a default of 0. Print the result."
        ],
        starterCode: `# Dictionary methods\n\nscores = {'Alice': 95, 'Bob': 87, 'Charlie': 92}\n\n# Print all keys\n\n# Print all values\n\n# Print all key-value pairs (items)\n\n# Safely get 'David' with default 0\n`,
        testCases: [
            { input: "", expectedOutput: "dict_keys(['Alice', 'Bob', 'Charlie'])\ndict_values([95, 87, 92])\ndict_items([('Alice', 95), ('Bob', 87), ('Charlie', 92)])\n0", description: "Should demonstrate dictionary methods", hidden: false },
        ],
        hints: [
            ".keys() returns all keys, .values() returns all values.",
            ".items() returns key-value pairs as tuples.",
            ".get('key', default) returns the default if the key doesn't exist."
        ],
        solutionCode: `# Dictionary methods\n\nscores = {'Alice': 95, 'Bob': 87, 'Charlie': 92}\n\n# Print all keys\nprint(scores.keys())\n\n# Print all values\nprint(scores.values())\n\n# Print all key-value pairs (items)\nprint(scores.items())\n\n# Safely get 'David' with default 0\nprint(scores.get('David', 0))`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "scores\\['David'\\]", feedback: "scores['David'] would raise a KeyError. Use .get('David', 0) for safe access." }
        ],
        tags: ["dictionaries", "methods", "keys", "values", "items", "get"]
    },
    {
        id: "m7_a3",
        moduleId: 7,
        title: "Looping Through Dictionaries",
        difficulty: "medium",
        xpReward: 20,
        description: "Iterate through a dictionary in different ways.",
        instructions: [
            "Set inventory = {'apples': 5, 'bananas': 12, 'oranges': 8, 'grapes': 3}.",
            "Loop through and print each item as: 'apples: 5'",
            "Print the total count of all items.",
            "Find and print the item with the most stock."
        ],
        starterCode: `# Looping through dictionaries\n\ninventory = {'apples': 5, 'bananas': 12, 'oranges': 8, 'grapes': 3}\n\n# Print each item as 'item: count'\n\n# Print total count\n\n# Print the item with the most stock\n`,
        testCases: [
            { input: "", expectedOutput: "apples: 5\nbananas: 12\noranges: 8\ngrapes: 3\n28\nbananas", description: "Should loop and find max", hidden: false },
        ],
        hints: [
            "Use 'for key, value in inventory.items():' to loop through pairs.",
            "Sum the values with sum(inventory.values()).",
            "Use max(inventory, key=inventory.get) to find the key with the highest value."
        ],
        solutionCode: `# Looping through dictionaries\n\ninventory = {'apples': 5, 'bananas': 12, 'oranges': 8, 'grapes': 3}\n\n# Print each item as 'item: count'\nfor item, count in inventory.items():\n    print(f"{item}: {count}")\n\n# Print total count\nprint(sum(inventory.values()))\n\n# Print the item with the most stock\nprint(max(inventory, key=inventory.get))`,
        requiredConstructs: ["for_loop", "print_function"],
        commonErrors: [
            { pattern: "for item in inventory:", feedback: "That only gives keys. Use 'for item, count in inventory.items():' to get both." }
        ],
        tags: ["dictionaries", "loops", "iteration", "max"]
    },
    {
        id: "m7_a4",
        moduleId: 7,
        title: "Nested Dictionaries",
        difficulty: "medium",
        xpReward: 25,
        description: "Work with dictionaries inside dictionaries.",
        instructions: [
            "Create a nested dictionary 'students' with data for two students.",
            "Student 'Alice': grades={'math': 90, 'science': 85}, age=20",
            "Student 'Bob': grades={'math': 78, 'science': 92}, age=21",
            "Print Alice's math grade.",
            "Print Bob's age.",
            "Print the average of Alice's grades."
        ],
        starterCode: `# Nested dictionaries\n\nstudents = {\n    'Alice': {\n        'grades': {'math': 90, 'science': 85},\n        'age': 20\n    },\n    'Bob': {\n        'grades': {'math': 78, 'science': 92},\n        'age': 21\n    }\n}\n\n# Print Alice's math grade\n\n# Print Bob's age\n\n# Print the average of Alice's grades\n`,
        testCases: [
            { input: "", expectedOutput: "90\n21\n87.5", description: "Should access nested dictionary values", hidden: false },
        ],
        hints: [
            "Chain keys: students['Alice']['grades']['math']",
            "For the average, get Alice's grades values and calculate mean.",
            "Use sum() and len() on the grades values."
        ],
        solutionCode: `# Nested dictionaries\n\nstudents = {\n    'Alice': {\n        'grades': {'math': 90, 'science': 85},\n        'age': 20\n    },\n    'Bob': {\n        'grades': {'math': 78, 'science': 92},\n        'age': 21\n    }\n}\n\n# Print Alice's math grade\nprint(students['Alice']['grades']['math'])\n\n# Print Bob's age\nprint(students['Bob']['age'])\n\n# Print the average of Alice's grades\nalice_grades = students['Alice']['grades'].values()\nprint(sum(alice_grades) / len(alice_grades))`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "students.Alice", feedback: "Use bracket notation: students['Alice'], not dot notation." }
        ],
        tags: ["dictionaries", "nested", "data-structures"]
    },
    {
        id: "m7_a5",
        moduleId: 7,
        title: "Word Frequency Counter",
        difficulty: "hard",
        xpReward: 35,
        description: "Count the frequency of each word in a sentence using a dictionary.",
        instructions: [
            "Set sentence = 'the cat sat on the mat the cat'.",
            "Split the sentence into words.",
            "Count the frequency of each word using a dictionary.",
            "Print each word and its count, sorted alphabetically.",
            "Print the most common word."
        ],
        starterCode: `# Word frequency counter\n\nsentence = 'the cat sat on the mat the cat'\n\n# Split into words\n\n# Count frequency of each word\n\n# Print each word and count (sorted alphabetically)\n\n# Print the most common word\n`,
        testCases: [
            { input: "", expectedOutput: "cat: 2\nmat: 1\non: 1\nsat: 1\nthe: 3\nthe", description: "Should count and display word frequencies", hidden: false },
        ],
        hints: [
            "Split with sentence.split() to get a list of words.",
            "Loop through words, using a dict to count: counts[word] = counts.get(word, 0) + 1",
            "Sort the keys with sorted(counts.keys()) before printing."
        ],
        solutionCode: `# Word frequency counter\n\nsentence = 'the cat sat on the mat the cat'\n\n# Split into words\nwords = sentence.split()\n\n# Count frequency of each word\ncounts = {}\nfor word in words:\n    counts[word] = counts.get(word, 0) + 1\n\n# Print each word and count (sorted alphabetically)\nfor word in sorted(counts.keys()):\n    print(f"{word}: {counts[word]}")\n\n# Print the most common word\nprint(max(counts, key=counts.get))`,
        requiredConstructs: ["for_loop", "variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "Counter", feedback: "Try building the counter manually with a dict and .get() before using Counter." }
        ],
        tags: ["dictionaries", "word-count", "frequency", "sorting"]
    },
    {
        id: "m7_a6",
        moduleId: 7,
        title: "Dictionary Merge and Transform",
        difficulty: "hard",
        xpReward: 35,
        description: "Merge dictionaries and transform data between different structures.",
        instructions: [
            "Set dict1 = {'a': 1, 'b': 2} and dict2 = {'b': 3, 'c': 4}.",
            "Merge them (dict2 values overwrite dict1 for shared keys). Print the merged dict.",
            "Set prices = {'apple': 1.5, 'banana': 0.75, 'cherry': 2.0}.",
            "Create a new dict with only items costing more than $1. Print it.",
            "Swap keys and values in prices. Print the swapped dict."
        ],
        starterCode: `# Dictionary merge and transform\n\ndict1 = {'a': 1, 'b': 2}\ndict2 = {'b': 3, 'c': 4}\n\n# Merge: dict2 overwrites shared keys\n\nprices = {'apple': 1.5, 'banana': 0.75, 'cherry': 2.0}\n\n# Filter: only items > $1\n\n# Swap keys and values\n`,
        testCases: [
            { input: "", expectedOutput: "{'a': 1, 'b': 3, 'c': 4}\n{'apple': 1.5, 'cherry': 2.0}\n{1.5: 'apple', 0.75: 'banana', 2.0: 'cherry'}", description: "Should merge, filter, and swap dictionaries", hidden: false },
        ],
        hints: [
            "Merge with: merged = {**dict1, **dict2} or dict1 | dict2 (Python 3.9+)",
            "Filter with a dict comprehension: {k: v for k, v in prices.items() if v > 1}",
            "Swap with: {v: k for k, v in prices.items()}"
        ],
        solutionCode: `# Dictionary merge and transform\n\ndict1 = {'a': 1, 'b': 2}\ndict2 = {'b': 3, 'c': 4}\n\n# Merge: dict2 overwrites shared keys\nmerged = {**dict1, **dict2}\nprint(merged)\n\nprices = {'apple': 1.5, 'banana': 0.75, 'cherry': 2.0}\n\n# Filter: only items > $1\nexpensive = {k: v for k, v in prices.items() if v > 1}\nprint(expensive)\n\n# Swap keys and values\nswapped = {v: k for k, v in prices.items()}\nprint(swapped)`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "dict1.update\\(dict2\\)", feedback: ".update() modifies dict1 in place. Use {**dict1, **dict2} for a new merged dict." }
        ],
        tags: ["dictionaries", "merge", "comprehension", "transform"]
    },

    // ========================================================
    // MODULE 8: Functions, Parameters, Return Values, Lambda
    // ========================================================
    {
        id: "m8_a1",
        moduleId: 8,
        title: "Your First Function",
        difficulty: "easy",
        xpReward: 10,
        description: "Define and call a simple function that takes no parameters.",
        instructions: [
            "Define a function called 'greet' that prints 'Hello, welcome to Python!'",
            "Call the function to see the output."
        ],
        starterCode: `# Define a function called 'greet'\n# It should print 'Hello, welcome to Python!'\n\n# Define the function\n\n# Call the function\n`,
        testCases: [
            { input: "", expectedOutput: "Hello, welcome to Python!", description: "Should print the greeting", hidden: false },
        ],
        hints: [
            "Define with: def function_name():",
            "The body must be indented.",
            "Call by writing: greet()"
        ],
        solutionCode: `# Define a function called 'greet'\ndef greet():\n    print('Hello, welcome to Python!')\n\n# Call the function\ngreet()`,
        requiredConstructs: ["function_def", "print_function"],
        commonErrors: [
            { pattern: "def greet\\(\\)[^:]", feedback: "Don't forget the colon after the parentheses: def greet():" },
            { pattern: "function ", feedback: "Python uses 'def' not 'function' to define functions." }
        ],
        tags: ["functions", "def", "basics"]
    },
    {
        id: "m8_a2",
        moduleId: 8,
        title: "Functions with Parameters",
        difficulty: "easy",
        xpReward: 15,
        description: "Create functions that accept parameters and use them.",
        instructions: [
            "Define a function 'greet_person' that takes a 'name' parameter.",
            "It should print: 'Hello, {name}! Nice to meet you.'",
            "Call it with 'Alice', then with 'Bob'."
        ],
        starterCode: `# Define a function with a parameter\n\n# Define greet_person(name) that prints a personalized greeting\n\n# Call with 'Alice'\n\n# Call with 'Bob'\n`,
        testCases: [
            { input: "", expectedOutput: "Hello, Alice! Nice to meet you.\nHello, Bob! Nice to meet you.", description: "Should greet both Alice and Bob", hidden: false },
        ],
        hints: [
            "Parameters go inside the parentheses: def greet_person(name):",
            "Use the parameter like a variable inside the function.",
            "Use an f-string: print(f'Hello, {name}! Nice to meet you.')"
        ],
        solutionCode: `# Define a function with a parameter\ndef greet_person(name):\n    print(f"Hello, {name}! Nice to meet you.")\n\n# Call with 'Alice'\ngreet_person('Alice')\n\n# Call with 'Bob'\ngreet_person('Bob')`,
        requiredConstructs: ["function_def", "print_function"],
        commonErrors: [
            { pattern: "def greet_person\\(\\)", feedback: "Include the parameter in the function definition: def greet_person(name):" }
        ],
        tags: ["functions", "parameters", "f-strings"]
    },
    {
        id: "m8_a3",
        moduleId: 8,
        title: "Return Values",
        difficulty: "medium",
        xpReward: 20,
        description: "Create functions that return values instead of just printing them.",
        instructions: [
            "Define a function 'add' that takes two numbers and returns their sum.",
            "Define a function 'is_even' that takes a number and returns True if even, False otherwise.",
            "Print the result of add(5, 3).",
            "Print the result of is_even(7).",
            "Print the result of is_even(4)."
        ],
        starterCode: `# Functions with return values\n\n# Define add(a, b) - returns the sum\n\n# Define is_even(n) - returns True if even\n\n# Print add(5, 3)\n\n# Print is_even(7)\n\n# Print is_even(4)\n`,
        testCases: [
            { input: "", expectedOutput: "8\nFalse\nTrue", description: "Should return correct values", hidden: false },
        ],
        hints: [
            "Use 'return' to send a value back: return a + b",
            "For is_even: return n % 2 == 0",
            "The return value can be used in print(): print(add(5, 3))"
        ],
        solutionCode: `# Functions with return values\n\n# Define add(a, b) - returns the sum\ndef add(a, b):\n    return a + b\n\n# Define is_even(n) - returns True if even\ndef is_even(n):\n    return n % 2 == 0\n\n# Print add(5, 3)\nprint(add(5, 3))\n\n# Print is_even(7)\nprint(is_even(7))\n\n# Print is_even(4)\nprint(is_even(4))`,
        requiredConstructs: ["function_def", "return_statement", "print_function"],
        commonErrors: [
            { pattern: "print\\(a \\+ b\\)", feedback: "Use 'return a + b' inside the function, then print the function call outside." },
            { pattern: "return true", feedback: "Python booleans are capitalized: True and False." }
        ],
        tags: ["functions", "return", "boolean"]
    },
    {
        id: "m8_a4",
        moduleId: 8,
        title: "Default Parameters",
        difficulty: "medium",
        xpReward: 25,
        description: "Create functions with default parameter values and keyword arguments.",
        instructions: [
            "Define 'power(base, exponent=2)' that returns base raised to exponent.",
            "Print power(3) - should use default exponent of 2.",
            "Print power(2, 10) - should use exponent 10.",
            "Define 'format_name(first, last, uppercase=False)' that returns the full name.",
            "If uppercase is True, return the name in uppercase.",
            "Print format_name('John', 'Doe').",
            "Print format_name('Jane', 'Smith', uppercase=True)."
        ],
        starterCode: `# Default parameters and keyword arguments\n\n# Define power(base, exponent=2)\n\n# Print power(3)\n\n# Print power(2, 10)\n\n# Define format_name(first, last, uppercase=False)\n\n# Print format_name('John', 'Doe')\n\n# Print format_name('Jane', 'Smith', uppercase=True)\n`,
        testCases: [
            { input: "", expectedOutput: "9\n1024\nJohn Doe\nJANE SMITH", description: "Should use default and custom parameters", hidden: false },
        ],
        hints: [
            "Default values: def power(base, exponent=2):",
            "Inside power: return base ** exponent",
            "Inside format_name: join the names, then optionally uppercase."
        ],
        solutionCode: `# Default parameters and keyword arguments\n\n# Define power(base, exponent=2)\ndef power(base, exponent=2):\n    return base ** exponent\n\n# Print power(3)\nprint(power(3))\n\n# Print power(2, 10)\nprint(power(2, 10))\n\n# Define format_name(first, last, uppercase=False)\ndef format_name(first, last, uppercase=False):\n    full_name = f"{first} {last}"\n    if uppercase:\n        return full_name.upper()\n    return full_name\n\n# Print format_name('John', 'Doe')\nprint(format_name('John', 'Doe'))\n\n# Print format_name('Jane', 'Smith', uppercase=True)\nprint(format_name('Jane', 'Smith', uppercase=True))`,
        requiredConstructs: ["function_def", "return_statement", "print_function"],
        commonErrors: [
            { pattern: "def power\\(base, exponent\\)", feedback: "Include the default value: def power(base, exponent=2):" }
        ],
        tags: ["functions", "default-parameters", "keyword-arguments"]
    },
    {
        id: "m8_a5",
        moduleId: 8,
        title: "Lambda Functions",
        difficulty: "hard",
        xpReward: 30,
        description: "Use lambda functions for short, anonymous operations.",
        instructions: [
            "Create a lambda 'square' that takes x and returns x squared. Print square(5).",
            "Create a lambda 'add' that takes x, y and returns their sum. Print add(3, 7).",
            "Set numbers = [3, 1, 4, 1, 5, 9, 2, 6].",
            "Use sorted() with a lambda key to sort by distance from 5. Print the result.",
            "Use filter() with a lambda to keep only even numbers. Print as a list."
        ],
        starterCode: `# Lambda functions\n\n# Lambda to square a number\n\n# Print square(5)\n\n# Lambda to add two numbers\n\n# Print add(3, 7)\n\nnumbers = [3, 1, 4, 1, 5, 9, 2, 6]\n\n# Sort by distance from 5\n\n# Filter even numbers\n`,
        testCases: [
            { input: "", expectedOutput: "25\n10\n[5, 4, 6, 3, 9, 2, 1, 1]\n[4, 2, 6]", description: "Should demonstrate lambda usage", hidden: false },
        ],
        hints: [
            "Lambda syntax: square = lambda x: x ** 2",
            "For sorting by distance from 5: key=lambda x: abs(x - 5)",
            "filter() returns a filter object; wrap in list(): list(filter(...))"
        ],
        solutionCode: `# Lambda functions\n\n# Lambda to square a number\nsquare = lambda x: x ** 2\nprint(square(5))\n\n# Lambda to add two numbers\nadd = lambda x, y: x + y\nprint(add(3, 7))\n\nnumbers = [3, 1, 4, 1, 5, 9, 2, 6]\n\n# Sort by distance from 5\nprint(sorted(numbers, key=lambda x: abs(x - 5)))\n\n# Filter even numbers\nprint(list(filter(lambda x: x % 2 == 0, numbers)))`,
        requiredConstructs: ["variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "def square", feedback: "Use lambda syntax: square = lambda x: x ** 2" },
            { pattern: "lambda x: return", feedback: "Lambdas don't use 'return'. The expression IS the return value: lambda x: x ** 2" }
        ],
        tags: ["lambda", "functions", "sorted", "filter"]
    },
    {
        id: "m8_a6",
        moduleId: 8,
        title: "Higher-Order Functions",
        difficulty: "hard",
        xpReward: 40,
        description: "Create functions that accept other functions as arguments or return functions.",
        instructions: [
            "Define 'apply_operation(a, b, operation)' that calls operation(a, b) and returns the result.",
            "Define 'multiply(x, y)' that returns x * y.",
            "Define 'subtract(x, y)' that returns x - y.",
            "Print apply_operation(6, 3, multiply).",
            "Print apply_operation(10, 4, subtract).",
            "Use apply_operation with a lambda to compute the maximum of 7 and 12. Print the result."
        ],
        starterCode: `# Higher-order functions\n\n# Define apply_operation(a, b, operation)\n\n# Define multiply(x, y)\n\n# Define subtract(x, y)\n\n# Print apply_operation(6, 3, multiply)\n\n# Print apply_operation(10, 4, subtract)\n\n# Use with lambda for max of 7 and 12\n`,
        testCases: [
            { input: "", expectedOutput: "18\n6\n12", description: "Should apply operations correctly", hidden: false },
        ],
        hints: [
            "apply_operation simply calls: return operation(a, b)",
            "Pass function names without parentheses: apply_operation(6, 3, multiply)",
            "For the lambda: apply_operation(7, 12, lambda x, y: max(x, y))"
        ],
        solutionCode: `# Higher-order functions\n\n# Define apply_operation(a, b, operation)\ndef apply_operation(a, b, operation):\n    return operation(a, b)\n\n# Define multiply(x, y)\ndef multiply(x, y):\n    return x * y\n\n# Define subtract(x, y)\ndef subtract(x, y):\n    return x - y\n\n# Print apply_operation(6, 3, multiply)\nprint(apply_operation(6, 3, multiply))\n\n# Print apply_operation(10, 4, subtract)\nprint(apply_operation(10, 4, subtract))\n\n# Use with lambda for max of 7 and 12\nprint(apply_operation(7, 12, lambda x, y: max(x, y)))`,
        requiredConstructs: ["function_def", "return_statement", "print_function"],
        commonErrors: [
            { pattern: "multiply\\(\\)", feedback: "Pass the function without calling it: multiply, not multiply()." }
        ],
        tags: ["functions", "higher-order", "callbacks", "lambda"]
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { activitiesM5M8 };
}
