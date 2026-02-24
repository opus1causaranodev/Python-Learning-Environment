// =============================================================================
// CODE_EXAMPLES — Runnable Python examples organized by module
// =============================================================================

const CODE_EXAMPLES = [

    // =========================================================================
    // MODULE 1: Python Basics
    // =========================================================================
    {
        id: "ex_m1_1", moduleId: 1,
        title: "Hello World & Print Variations",
        description: "Different ways to display output using print()",
        code: `# Multiple ways to use print()
print("Hello, World!")
print('Single quotes work too!')
print("The answer is", 42)
print("Name:", "Alice", "Age:", 25)
print("Line 1\\nLine 2\\nLine 3")
print("Items:", "apple", "banana", "cherry", sep=" | ")
print("No newline ->", end=" ")
print("Same line!")`,
        expectedOutput: "Hello, World!\nSingle quotes work too!\nThe answer is 42\nName: Alice Age: 25\nLine 1\nLine 2\nLine 3\nItems: apple | banana | cherry\nNo newline -> Same line!",
        concepts: ["print", "strings", "escape-characters"],
        tryItIdeas: ["Try using sep='\\n' to put each item on its own line", "Try printing a box made of * characters"]
    },
    {
        id: "ex_m1_2", moduleId: 1,
        title: "Variables and Data Types",
        description: "Creating variables and checking their types",
        code: `# Creating different types of variables
name = "Alice"          # str
age = 25                # int
height = 5.6            # float
is_student = True       # bool
favorite_colors = None  # NoneType

# Display values and types
print(f"name = {name} (type: {type(name).__name__})")
print(f"age = {age} (type: {type(age).__name__})")
print(f"height = {height} (type: {type(height).__name__})")
print(f"is_student = {is_student} (type: {type(is_student).__name__})")
print(f"favorite_colors = {favorite_colors} (type: {type(favorite_colors).__name__})")`,
        expectedOutput: "name = Alice (type: str)\nage = 25 (type: int)\nheight = 5.6 (type: float)\nis_student = True (type: bool)\nfavorite_colors = None (type: NoneType)",
        concepts: ["variables", "data-types", "f-strings", "type"],
        tryItIdeas: ["Add a list variable and check its type", "Try type(3.14) vs type(3)"]
    },
    {
        id: "ex_m1_3", moduleId: 1,
        title: "Type Conversion",
        description: "Converting between data types",
        code: `# String to number
age_str = "25"
age_int = int(age_str)
print(f"String '25' -> int: {age_int}, type: {type(age_int).__name__}")

# Number to string
pi = 3.14159
pi_str = str(pi)
print(f"Float 3.14159 -> str: '{pi_str}', type: {type(pi_str).__name__}")

# Float and int conversions
print(f"int(3.7) = {int(3.7)}")        # Truncates (no rounding!)
print(f"float(42) = {float(42)}")
print(f"round(3.7) = {round(3.7)}")    # Rounds properly
print(f"bool(0) = {bool(0)}, bool(1) = {bool(1)}")
print(f"bool('') = {bool('')}, bool('hello') = {bool('hello')}")`,
        expectedOutput: "String '25' -> int: 25, type: int\nFloat 3.14159 -> str: '3.14159', type: str\nint(3.7) = 3\nfloat(42) = 42.0\nround(3.7) = 4\nbool(0) = False, bool(1) = True\nbool('') = False, bool('hello') = True",
        concepts: ["type-conversion", "int", "float", "str", "bool"],
        tryItIdeas: ["Try converting 'hello' to int — what happens?", "What does bool([]) return vs bool([1,2])?"]
    },

    // =========================================================================
    // MODULE 2: Operators & Expressions
    // =========================================================================
    {
        id: "ex_m2_1", moduleId: 2,
        title: "Arithmetic Operations",
        description: "All Python arithmetic operators in action",
        code: `a, b = 17, 5

print(f"{a} + {b} = {a + b}")    # Addition
print(f"{a} - {b} = {a - b}")    # Subtraction
print(f"{a} * {b} = {a * b}")    # Multiplication
print(f"{a} / {b} = {a / b}")    # Division (always float)
print(f"{a} // {b} = {a // b}")  # Floor division
print(f"{a} % {b} = {a % b}")    # Modulo (remainder)
print(f"{a} ** {b} = {a ** b}")  # Exponentiation

# Practical use: currency
total_cents = 347
dollars = total_cents // 100
cents = total_cents % 100
print(f"\\n347 cents = \${dollars}.{cents:02d}")`,
        expectedOutput: "17 + 5 = 22\n17 - 5 = 12\n17 * 5 = 85\n17 / 5 = 3.4\n17 // 5 = 3\n17 % 5 = 2\n17 ** 5 = 1419857\n\n347 cents = $3.47",
        concepts: ["arithmetic", "operators", "floor-division", "modulo"],
        tryItIdeas: ["Try negative floor division: -17 // 5", "Calculate how many weeks and leftover days in 100 days"]
    },
    {
        id: "ex_m2_2", moduleId: 2,
        title: "Comparison and Logical Operators",
        description: "Boolean logic with comparisons and logical operators",
        code: `x = 15

# Comparison operators
print(f"x == 15: {x == 15}")
print(f"x != 10: {x != 10}")
print(f"x > 10: {x > 10}")
print(f"x <= 20: {x <= 20}")

# Chained comparisons (Python special!)
print(f"\\n10 < x < 20: {10 < x < 20}")
print(f"10 < x < 12: {10 < x < 12}")

# Logical operators
age = 25
has_license = True
print(f"\\nage >= 18 and has_license: {age >= 18 and has_license}")
print(f"age < 16 or age > 65: {age < 16 or age > 65}")
print(f"not has_license: {not has_license}")`,
        expectedOutput: "x == 15: True\nx != 10: True\nx > 10: True\nx <= 20: True\n\n10 < x < 20: True\n10 < x < 12: False\n\nage >= 18 and has_license: True\nage < 16 or age > 65: False\nnot has_license: False",
        concepts: ["comparison", "logical-operators", "chained-comparisons", "boolean"],
        tryItIdeas: ["Try: print(1 < 2 < 3 < 4)", "What does 'hello' and 'world' return?"]
    },
    {
        id: "ex_m2_3", moduleId: 2,
        title: "Assignment Operators Shorthand",
        description: "Compound assignment operators for cleaner code",
        code: `score = 100
print(f"Start: {score}")

score += 10   # score = score + 10
print(f"After += 10: {score}")

score -= 25   # score = score - 25
print(f"After -= 25: {score}")

score *= 2    # score = score * 2
print(f"After *= 2: {score}")

score //= 3   # score = score // 3
print(f"After //= 3: {score}")

score **= 2   # score = score ** 2
print(f"After **= 2: {score}")

# String repetition with *=
stars = "*"
stars *= 10
print(f"\\nStars: {stars}")`,
        expectedOutput: "Start: 100\nAfter += 10: 110\nAfter -= 25: 85\nAfter *= 2: 170\nAfter //= 3: 56\nAfter **= 2: 3136\n\nStars: **********",
        concepts: ["assignment-operators", "compound-assignment"],
        tryItIdeas: ["Start with a list and use += to extend it", "Try %= with different values"]
    },

    // =========================================================================
    // MODULE 3: Control Flow
    // =========================================================================
    {
        id: "ex_m3_1", moduleId: 3,
        title: "Temperature Converter",
        description: "if/elif/else with user-friendly output",
        code: `def describe_temp(celsius):
    fahrenheit = celsius * 9/5 + 32
    if celsius <= 0:
        feeling = "Freezing!"
    elif celsius <= 15:
        feeling = "Cold"
    elif celsius <= 25:
        feeling = "Comfortable"
    elif celsius <= 35:
        feeling = "Hot"
    else:
        feeling = "Extreme heat!"
    print(f"{celsius}°C = {fahrenheit}°F -> {feeling}")

describe_temp(-5)
describe_temp(10)
describe_temp(22)
describe_temp(30)
describe_temp(42)`,
        expectedOutput: "-5°C = 23.0°F -> Freezing!\n10°C = 50.0°F -> Cold\n22°C = 71.6°F -> Comfortable\n30°C = 86.0°F -> Hot\n42°C = 107.6°F -> Extreme heat!",
        concepts: ["if-elif-else", "functions", "f-strings"],
        tryItIdeas: ["Add a 'Mild' category between Cold and Comfortable", "Convert from Fahrenheit to Celsius instead"]
    },
    {
        id: "ex_m3_2", moduleId: 3,
        title: "Grade Calculator",
        description: "Nested conditions with grade boundaries",
        code: `def get_grade(score):
    if score < 0 or score > 100:
        return "Invalid"
    elif score >= 90:
        return "A" if score >= 97 else "A" if score >= 93 else "A-"
    elif score >= 80:
        return "B+" if score >= 87 else "B" if score >= 83 else "B-"
    elif score >= 70:
        return "C+" if score >= 77 else "C" if score >= 73 else "C-"
    elif score >= 60:
        return "D"
    else:
        return "F"

scores = [95, 87, 73, 65, 42, 100]
for s in scores:
    grade = get_grade(s)
    status = "PASS" if grade != "F" else "FAIL"
    print(f"Score: {s:3d} -> Grade: {grade:2s} [{status}]")`,
        expectedOutput: "Score:  95 -> Grade: A  [PASS]\nScore:  87 -> Grade: B+ [PASS]\nScore:  73 -> Grade: C  [PASS]\nScore:  65 -> Grade: D  [PASS]\nScore:  42 -> Grade: F  [FAIL]\nScore: 100 -> Grade: A  [PASS]",
        concepts: ["if-elif-else", "ternary", "string-formatting"],
        tryItIdeas: ["Add plus/minus grades for all letter grades", "Calculate the GPA from the grades"]
    },
    {
        id: "ex_m3_3", moduleId: 3,
        title: "Leap Year Checker",
        description: "Compound conditions for calendar logic",
        code: `def is_leap_year(year):
    # Leap year rules:
    # 1. Divisible by 4 AND
    # 2. NOT divisible by 100, UNLESS also divisible by 400
    return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)

test_years = [2000, 1900, 2024, 2023, 2100, 1600]
for year in test_years:
    result = "Leap year" if is_leap_year(year) else "Not a leap year"
    print(f"{year}: {result}")`,
        expectedOutput: "2000: Leap year\n1900: Not a leap year\n2024: Leap year\n2023: Not a leap year\n2100: Not a leap year\n1600: Leap year",
        concepts: ["boolean-logic", "modulo", "functions"],
        tryItIdeas: ["Count how many leap years there are between 1900-2100", "Find the next leap year after a given year"]
    },

    // =========================================================================
    // MODULE 4: Loops
    // =========================================================================
    {
        id: "ex_m4_1", moduleId: 4,
        title: "Multiplication Table",
        description: "Nested for loops to build a formatted table",
        code: `# Print a multiplication table (1-5)
print("  |", end="")
for i in range(1, 6):
    print(f"{i:4d}", end="")
print()
print("-" * 23)

for row in range(1, 6):
    print(f"{row} |", end="")
    for col in range(1, 6):
        print(f"{row * col:4d}", end="")
    print()`,
        expectedOutput: "  |   1   2   3   4   5\n-----------------------\n1 |   1   2   3   4   5\n2 |   2   4   6   8  10\n3 |   3   6   9  12  15\n4 |   4   8  12  16  20\n5 |   5  10  15  20  25",
        concepts: ["nested-loops", "range", "string-formatting"],
        tryItIdeas: ["Extend to a 10x10 table", "Make a table for addition instead of multiplication"]
    },
    {
        id: "ex_m4_2", moduleId: 4,
        title: "Pattern Printer",
        description: "Building visual patterns with nested loops",
        code: `# Triangle pattern
n = 5
print("Right triangle:")
for i in range(1, n + 1):
    print("* " * i)

print("\\nInverted triangle:")
for i in range(n, 0, -1):
    print("* " * i)

print("\\nDiamond:")
for i in range(1, n + 1):
    print(" " * (n - i) + "* " * i)
for i in range(n - 1, 0, -1):
    print(" " * (n - i) + "* " * i)`,
        expectedOutput: "Right triangle:\n* \n* * \n* * * \n* * * * \n* * * * * \n\nInverted triangle:\n* * * * * \n* * * * \n* * * \n* * \n* \n\nDiamond:\n    * \n   * * \n  * * * \n * * * * \n* * * * * \n * * * * \n  * * * \n   * * \n    * ",
        concepts: ["nested-loops", "string-multiplication", "patterns"],
        tryItIdeas: ["Make a hollow rectangle", "Create a number pyramid (1, 12, 123, 1234...)"]
    },
    {
        id: "ex_m4_3", moduleId: 4,
        title: "Prime Number Finder",
        description: "Using loops and break to find primes efficiently",
        code: `def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

# Find all primes up to 50
primes = []
for num in range(2, 51):
    if is_prime(num):
        primes.append(num)

print(f"Primes up to 50: {primes}")
print(f"Count: {len(primes)}")`,
        expectedOutput: "Primes up to 50: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]\nCount: 15",
        concepts: ["loops", "break", "functions", "optimization"],
        tryItIdeas: ["Find the 100th prime number", "Check if a large number like 997 is prime"]
    },

    // =========================================================================
    // MODULE 5: Strings
    // =========================================================================
    {
        id: "ex_m5_1", moduleId: 5,
        title: "String Methods Showcase",
        description: "Essential string methods every Python dev should know",
        code: `text = "  Hello, Python World!  "

print(f"Original:  '{text}'")
print(f"strip():   '{text.strip()}'")
print(f"lower():   '{text.strip().lower()}'")
print(f"upper():   '{text.strip().upper()}'")
print(f"title():   '{text.strip().title()}'")
print(f"replace(): '{text.strip().replace('World', 'Universe')}'")
print(f"split():   {text.strip().split()}")
print(f"count('l'):{text.count('l')}")
print(f"find('Py'):{text.find('Py')}")
print(f"startswith('  H'): {text.startswith('  H')}")
print(f"isdigit('42'): {'42'.isdigit()}")`,
        expectedOutput: "Original:  '  Hello, Python World!  '\nstrip():   'Hello, Python World!'\nlower():   'hello, python world!'\nupper():   'HELLO, PYTHON WORLD!'\ntitle():   'Hello, Python World!'\nreplace(): 'Hello, Python Universe!'\nsplit():   ['Hello,', 'Python', 'World!']\ncount('l'):3\nfind('Py'):9\nstartswith('  H'): True\nisdigit('42'): True",
        concepts: ["string-methods", "strip", "split", "replace"],
        tryItIdeas: ["Chain methods: text.strip().lower().replace(' ', '_')", "Use join() to reverse a split"]
    },
    {
        id: "ex_m5_2", moduleId: 5,
        title: "String Formatting Three Ways",
        description: "f-strings, .format(), and % formatting compared",
        code: `name = "Alice"
age = 30
gpa = 3.856

# Method 1: f-strings (Python 3.6+, recommended)
print(f"1) {name} is {age} years old, GPA: {gpa:.2f}")

# Method 2: .format()
print("2) {} is {} years old, GPA: {:.2f}".format(name, age, gpa))

# Method 3: % formatting (older style)
print("3) %s is %d years old, GPA: %.2f" % (name, age, gpa))

# f-string tricks
print(f"\\nPadding:  '{name:>10}' (right-aligned)")
print(f"Padding:  '{name:<10}' (left-aligned)")
print(f"Padding:  '{name:^10}' (centered)")
print(f"Number:   {1234567:,}")
print(f"Percent:  {0.856:.1%}")
print(f"Binary:   {42:b}")
print(f"Hex:      {255:x}")`,
        expectedOutput: "1) Alice is 30 years old, GPA: 3.86\n2) Alice is 30 years old, GPA: 3.86\n3) Alice is 30 years old, GPA: 3.86\n\nPadding:  '     Alice' (right-aligned)\nPadding:  'Alice     ' (left-aligned)\nPadding:  '  Alice   ' (centered)\nNumber:   1,234,567\nPercent:  85.6%\nBinary:   101010\nHex:      ff",
        concepts: ["f-strings", "format", "string-formatting"],
        tryItIdeas: ["Format a price as $XX.XX", "Create a formatted table of data using f-strings"]
    },
    {
        id: "ex_m5_3", moduleId: 5,
        title: "Caesar Cipher",
        description: "Encrypt and decrypt text by shifting letters",
        code: `def caesar_cipher(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            base = ord('A') if char.isupper() else ord('a')
            shifted = (ord(char) - base + shift) % 26 + base
            result += chr(shifted)
        else:
            result += char
    return result

message = "Hello, World!"
encrypted = caesar_cipher(message, 3)
decrypted = caesar_cipher(encrypted, -3)

print(f"Original:  {message}")
print(f"Encrypted: {encrypted}")
print(f"Decrypted: {decrypted}")`,
        expectedOutput: "Original:  Hello, World!\nEncrypted: Khoor, Zruog!\nDecrypted: Hello, World!",
        concepts: ["strings", "ord", "chr", "encryption"],
        tryItIdeas: ["Try shift=13 (ROT13) — encrypting twice gives the original", "Add support for numbers too"]
    },

    // =========================================================================
    // MODULE 6: Lists, Tuples, Sets
    // =========================================================================
    {
        id: "ex_m6_1", moduleId: 6,
        title: "List Operations",
        description: "Creating, modifying, and manipulating lists",
        code: `fruits = ["apple", "banana", "cherry"]
print(f"Original: {fruits}")

fruits.append("date")
print(f"After append: {fruits}")

fruits.insert(1, "avocado")
print(f"After insert at 1: {fruits}")

fruits.remove("banana")
print(f"After remove banana: {fruits}")

popped = fruits.pop()
print(f"Popped: {popped}, Remaining: {fruits}")

numbers = [3, 1, 4, 1, 5, 9, 2, 6]
print(f"\\nNumbers: {numbers}")
print(f"Sorted:  {sorted(numbers)}")
print(f"Reversed:{numbers[::-1]}")
print(f"Sum: {sum(numbers)}, Min: {min(numbers)}, Max: {max(numbers)}")`,
        expectedOutput: "Original: ['apple', 'banana', 'cherry']\nAfter append: ['apple', 'banana', 'cherry', 'date']\nAfter insert at 1: ['apple', 'avocado', 'banana', 'cherry', 'date']\nAfter remove banana: ['apple', 'avocado', 'cherry', 'date']\nPopped: date, Remaining: ['apple', 'avocado', 'cherry']\n\nNumbers: [3, 1, 4, 1, 5, 9, 2, 6]\nSorted:  [1, 1, 2, 3, 4, 5, 6, 9]\nReversed:[6, 2, 9, 5, 1, 4, 1, 3]\nSum: 31, Min: 1, Max: 9",
        concepts: ["lists", "append", "insert", "remove", "slicing", "sorting"],
        tryItIdeas: ["Try sorting in reverse: sorted(numbers, reverse=True)", "Use list.sort() to sort in-place"]
    },
    {
        id: "ex_m6_2", moduleId: 6,
        title: "Tuples and Unpacking",
        description: "Immutable sequences and elegant unpacking",
        code: `# Tuples are immutable lists
point = (3, 7)
rgb = (255, 128, 0)

# Unpacking
x, y = point
r, g, b = rgb
print(f"Point: ({x}, {y})")
print(f"RGB: ({r}, {g}, {b})")

# Swap variables (Python magic!)
a, b = 10, 20
print(f"\\nBefore swap: a={a}, b={b}")
a, b = b, a
print(f"After swap:  a={a}, b={b}")

# Star unpacking
first, *middle, last = [1, 2, 3, 4, 5]
print(f"\\nfirst={first}, middle={middle}, last={last}")

# Tuple as dictionary key (lists can't do this!)
locations = {(40.7, -74.0): "New York", (51.5, -0.1): "London"}
print(f"\\n(40.7, -74.0) -> {locations[(40.7, -74.0)]}")`,
        expectedOutput: "Point: (3, 7)\nRGB: (255, 128, 0)\n\nBefore swap: a=10, b=20\nAfter swap:  a=20, b=10\n\nfirst=1, middle=[2, 3, 4], last=5\n\n(40.7, -74.0) -> New York",
        concepts: ["tuples", "unpacking", "immutable", "star-unpacking"],
        tryItIdeas: ["Try to modify a tuple element — what error do you get?", "Use enumerate() which returns tuples"]
    },
    {
        id: "ex_m6_3", moduleId: 6,
        title: "Set Operations",
        description: "Mathematical set operations for finding unique items",
        code: `python_devs = {"Alice", "Bob", "Charlie", "Diana"}
js_devs = {"Bob", "Diana", "Eve", "Frank"}

print(f"Python devs: {sorted(python_devs)}")
print(f"JS devs:     {sorted(js_devs)}")

# Set operations
print(f"\\nBoth (intersection):   {sorted(python_devs & js_devs)}")
print(f"Either (union):        {sorted(python_devs | js_devs)}")
print(f"Only Python:           {sorted(python_devs - js_devs)}")
print(f"Only one (symmetric):  {sorted(python_devs ^ js_devs)}")

# Remove duplicates from a list
numbers = [1, 3, 2, 3, 1, 4, 2, 5, 1]
unique = sorted(set(numbers))
print(f"\\nOriginal:  {numbers}")
print(f"Unique:    {unique}")`,
        expectedOutput: "Python devs: ['Alice', 'Bob', 'Charlie', 'Diana']\nJS devs:     ['Bob', 'Diana', 'Eve', 'Frank']\n\nBoth (intersection):   ['Bob', 'Diana']\nEither (union):        ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']\nOnly Python:           ['Alice', 'Charlie']\nOnly one (symmetric):  ['Alice', 'Charlie', 'Eve', 'Frank']\n\nOriginal:  [1, 3, 2, 3, 1, 4, 2, 5, 1]\nUnique:    [1, 2, 3, 4, 5]",
        concepts: ["sets", "intersection", "union", "difference", "deduplication"],
        tryItIdeas: ["Check if one set is a subset of another with <=", "Use set.add() and set.discard()"]
    },

    // =========================================================================
    // MODULE 7: Dictionaries
    // =========================================================================
    {
        id: "ex_m7_1", moduleId: 7,
        title: "Word Frequency Counter",
        description: "Count word occurrences using a dictionary",
        code: `text = "the cat sat on the mat the cat ate the rat"
words = text.split()

# Method 1: Manual counting
freq = {}
for word in words:
    freq[word] = freq.get(word, 0) + 1

# Sort by frequency (highest first)
sorted_freq = sorted(freq.items(), key=lambda x: x[1], reverse=True)

print("Word Frequencies:")
for word, count in sorted_freq:
    bar = "#" * count
    print(f"  {word:6s} | {bar} ({count})")
print(f"\\nTotal words: {len(words)}")
print(f"Unique words: {len(freq)}")`,
        expectedOutput: "Word Frequencies:\n  the    | #### (4)\n  cat    | ## (2)\n  sat    | # (1)\n  on     | # (1)\n  mat    | # (1)\n  ate    | # (1)\n  rat    | # (1)\n\nTotal words: 11\nUnique words: 7",
        concepts: ["dictionaries", "get", "sorting", "lambda"],
        tryItIdeas: ["Use collections.Counter instead", "Make it case-insensitive"]
    },
    {
        id: "ex_m7_2", moduleId: 7,
        title: "Nested Dictionaries",
        description: "Working with complex data structures",
        code: `students = {
    "Alice": {"math": 95, "science": 88, "english": 92},
    "Bob":   {"math": 78, "science": 85, "english": 90},
    "Charlie":{"math": 92, "science": 95, "english": 87},
}

print("Student Report Card:")
print("-" * 45)
for name, grades in students.items():
    avg = sum(grades.values()) / len(grades)
    print(f"  {name:10s} | Math:{grades['math']:3d} Sci:{grades['science']:3d} Eng:{grades['english']:3d} | Avg:{avg:.1f}")

# Find top scorer per subject
print("\\nTop per subject:")
for subject in ["math", "science", "english"]:
    top = max(students.items(), key=lambda x: x[1][subject])
    print(f"  {subject:8s}: {top[0]} ({top[1][subject]})")`,
        expectedOutput: "Student Report Card:\n---------------------------------------------\n  Alice      | Math: 95 Sci: 88 Eng: 92 | Avg:91.7\n  Bob        | Math: 78 Sci: 85 Eng: 90 | Avg:84.3\n  Charlie    | Math: 92 Sci: 95 Eng: 87 | Avg:91.3\n\nTop per subject:\n  math    : Alice (95)\n  science : Charlie (95)\n  english : Alice (92)",
        concepts: ["nested-dicts", "iteration", "max", "lambda"],
        tryItIdeas: ["Add a new student with grades", "Calculate the class average for each subject"]
    },
    {
        id: "ex_m7_3", moduleId: 7,
        title: "Dictionary Comprehensions",
        description: "Create dictionaries concisely with comprehensions",
        code: `# Basic dict comprehension
squares = {x: x**2 for x in range(1, 8)}
print(f"Squares: {squares}")

# Filtering
even_squares = {k: v for k, v in squares.items() if k % 2 == 0}
print(f"Even squares: {even_squares}")

# Inverting a dictionary
colors = {"red": "#FF0000", "green": "#00FF00", "blue": "#0000FF"}
hex_to_name = {v: k for k, v in colors.items()}
print(f"\\nColors: {colors}")
print(f"Inverted: {hex_to_name}")

# Word lengths
words = ["Python", "is", "awesome", "and", "fun"]
lengths = {w: len(w) for w in words}
print(f"\\nWord lengths: {lengths}")`,
        expectedOutput: "Squares: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6: 36, 7: 49}\nEven squares: {2: 4, 4: 16, 6: 36}\n\nColors: {'red': '#FF0000', 'green': '#00FF00', 'blue': '#0000FF'}\nInverted: {'#FF0000': 'red', '#00FF00': 'green', '#0000FF': 'blue'}\n\nWord lengths: {'Python': 6, 'is': 2, 'awesome': 7, 'and': 3, 'fun': 3}",
        concepts: ["dict-comprehension", "filtering", "inversion"],
        tryItIdeas: ["Create a dict mapping characters to their ASCII values", "Create a frequency dict from a string using comprehension"]
    },

    // =========================================================================
    // MODULE 8: Functions
    // =========================================================================
    {
        id: "ex_m8_1", moduleId: 8,
        title: "Default and Keyword Arguments",
        description: "Flexible function parameters with defaults",
        code: `def greet(name, greeting="Hello", punctuation="!"):
    return f"{greeting}, {name}{punctuation}"

# Different ways to call
print(greet("Alice"))
print(greet("Bob", "Hi"))
print(greet("Charlie", punctuation="..."))
print(greet(greeting="Hey", name="Diana"))

def make_sandwich(*ingredients, bread="white"):
    print(f"\\n{bread.title()} bread sandwich with:")
    for item in ingredients:
        print(f"  - {item}")

make_sandwich("ham", "cheese", "lettuce")
make_sandwich("peanut butter", "jelly", bread="wheat")`,
        expectedOutput: "Hello, Alice!\nHi, Bob!\nHello, Charlie...\nHey, Diana!\n\nWhite bread sandwich with:\n  - ham\n  - cheese\n  - lettuce\n\nWheat bread sandwich with:\n  - peanut butter\n  - jelly",
        concepts: ["default-args", "keyword-args", "args"],
        tryItIdeas: ["Add **kwargs for extra toppings", "Try calling with wrong argument order — what happens?"]
    },
    {
        id: "ex_m8_2", moduleId: 8,
        title: "Lambda, Map, and Filter",
        description: "Functional programming basics in Python",
        code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Lambda: anonymous one-line functions
square = lambda x: x ** 2
print(f"square(5) = {square(5)}")

# Map: apply function to every element
squared = list(map(lambda x: x**2, numbers))
print(f"Squared: {squared}")

# Filter: keep elements that pass a test
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(f"Evens:   {evens}")

# Combining map and filter
big_even_squares = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0 and x > 4, numbers)))
print(f"Big even squares: {big_even_squares}")

# Sorting with key function
words = ["banana", "apple", "cherry", "date"]
by_length = sorted(words, key=lambda w: len(w))
print(f"\\nSorted by length: {by_length}")`,
        expectedOutput: "square(5) = 25\nSquared: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\nEvens:   [2, 4, 6, 8, 10]\nBig even squares: [36, 64, 100]\n\nSorted by length: ['date', 'apple', 'banana', 'cherry']",
        concepts: ["lambda", "map", "filter", "sorting"],
        tryItIdeas: ["Rewrite the map/filter examples as list comprehensions", "Use reduce() from functools to find the product of all numbers"]
    },
    {
        id: "ex_m8_3", moduleId: 8,
        title: "Recursive Functions",
        description: "Functions that call themselves to solve problems",
        code: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

def flatten(lst):
    result = []
    for item in lst:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result

print(f"5! = {factorial(5)}")
print(f"10! = {factorial(10)}")

fib_seq = [fibonacci(i) for i in range(10)]
print(f"\\nFibonacci: {fib_seq}")

nested = [1, [2, 3], [4, [5, 6]], [7, [8, [9]]]]
print(f"\\nNested:    {nested}")
print(f"Flattened: {flatten(nested)}")`,
        expectedOutput: "5! = 120\n10! = 3628800\n\nFibonacci: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\n\nNested:    [1, [2, 3], [4, [5, 6]], [7, [8, [9]]]]\nFlattened: [1, 2, 3, 4, 5, 6, 7, 8, 9]",
        concepts: ["recursion", "base-case", "factorial", "fibonacci"],
        tryItIdeas: ["Write a recursive binary search", "Add memoization to fibonacci using a dictionary cache"]
    },

    // =========================================================================
    // MODULE 9: Error Handling
    // =========================================================================
    {
        id: "ex_m9_1", moduleId: 9,
        title: "Try/Except Patterns",
        description: "Handling errors gracefully with try/except/else/finally",
        code: `def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print(f"  Cannot divide {a} by zero!")
        return None
    except TypeError:
        print(f"  Invalid types: {type(a).__name__} / {type(b).__name__}")
        return None
    else:
        print(f"  {a} / {b} = {result}")
        return result
    finally:
        print(f"  (division attempted)")

print("Test 1:"); safe_divide(10, 3)
print("Test 2:"); safe_divide(10, 0)
print("Test 3:"); safe_divide("10", 2)`,
        expectedOutput: "Test 1:\n  10 / 3 = 3.3333333333333335\n  (division attempted)\nTest 2:\n  Cannot divide 10 by zero!\n  (division attempted)\nTest 3:\n  Invalid types: str / int\n  (division attempted)",
        concepts: ["try-except", "else", "finally", "error-types"],
        tryItIdeas: ["Add handling for OverflowError", "Use the 'as' keyword to get error details: except ValueError as e"]
    },
    {
        id: "ex_m9_2", moduleId: 9,
        title: "Custom Exceptions",
        description: "Creating your own exception classes",
        code: `class ValidationError(Exception):
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")

def validate_age(age):
    if not isinstance(age, int):
        raise ValidationError("age", "must be an integer")
    if age < 0:
        raise ValidationError("age", "cannot be negative")
    if age > 150:
        raise ValidationError("age", "seems unrealistic")
    return True

test_values = [25, -5, 200, "thirty"]
for val in test_values:
    try:
        validate_age(val)
        print(f"  {val!r:10s} -> Valid")
    except ValidationError as e:
        print(f"  {val!r:10s} -> Error: {e}")`,
        expectedOutput: "  25         -> Valid\n  -5         -> Error: age: cannot be negative\n  200        -> Error: age: seems unrealistic\n  'thirty'   -> Error: age: must be an integer",
        concepts: ["custom-exceptions", "raise", "inheritance"],
        tryItIdeas: ["Add a validate_email function with its own exceptions", "Create an exception hierarchy with a base AppError"]
    },

    // =========================================================================
    // MODULE 10: OOP
    // =========================================================================
    {
        id: "ex_m10_1", moduleId: 10,
        title: "Classes and Objects",
        description: "Building a class with attributes and methods",
        code: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        self.transactions = []

    def deposit(self, amount):
        self.balance += amount
        self.transactions.append(f"+\${amount:.2f}")
        print(f"  Deposited \${amount:.2f}")

    def withdraw(self, amount):
        if amount > self.balance:
            print(f"  Insufficient funds!")
            return False
        self.balance -= amount
        self.transactions.append(f"-\${amount:.2f}")
        print(f"  Withdrew \${amount:.2f}")
        return True

    def __str__(self):
        return f"{self.owner}'s Account: \${self.balance:.2f}"

acc = BankAccount("Alice", 100)
print(acc)
acc.deposit(50)
acc.withdraw(30)
acc.withdraw(200)
print(acc)
print(f"  History: {acc.transactions}")`,
        expectedOutput: "Alice's Account: $100.00\n  Deposited $50.00\n  Withdrew $30.00\n  Insufficient funds!\nAlice's Account: $120.00\n  History: ['+$50.00', '-$30.00']",
        concepts: ["classes", "init", "methods", "str"],
        tryItIdeas: ["Add an interest method that increases balance by a percentage", "Add a transfer method between two accounts"]
    },
    {
        id: "ex_m10_2", moduleId: 10,
        title: "Inheritance and Polymorphism",
        description: "Building class hierarchies with shared behavior",
        code: `class Shape:
    def __init__(self, name):
        self.name = name
    def area(self):
        return 0
    def __str__(self):
        return f"{self.name}: area = {self.area():.2f}"

class Circle(Shape):
    def __init__(self, radius):
        super().__init__("Circle")
        self.radius = radius
    def area(self):
        return 3.14159 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        super().__init__("Rectangle")
        self.width = width
        self.height = height
    def area(self):
        return self.width * self.height

class Triangle(Shape):
    def __init__(self, base, height):
        super().__init__("Triangle")
        self.base = base
        self.height = height
    def area(self):
        return 0.5 * self.base * self.height

# Polymorphism: same method, different behavior
shapes = [Circle(5), Rectangle(4, 6), Triangle(3, 8)]
for shape in shapes:
    print(shape)

total = sum(s.area() for s in shapes)
print(f"\\nTotal area: {total:.2f}")`,
        expectedOutput: "Circle: area = 78.54\nRectangle: area = 24.00\nTriangle: area = 12.00\n\nTotal area: 114.54",
        concepts: ["inheritance", "polymorphism", "super", "method-overriding"],
        tryItIdeas: ["Add a Square class that inherits from Rectangle", "Add a perimeter() method to each shape"]
    },
    {
        id: "ex_m10_3", moduleId: 10,
        title: "Magic Methods",
        description: "Customize how objects behave with dunder methods",
        code: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    def __abs__(self):
        return (self.x**2 + self.y**2) ** 0.5

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(3, 4)
v2 = Vector(1, 2)

print(f"v1 = {v1}")
print(f"v2 = {v2}")
print(f"v1 + v2 = {v1 + v2}")
print(f"v1 * 3 = {v1 * 3}")
print(f"|v1| = {abs(v1)}")
print(f"v1 == Vector(3,4): {v1 == Vector(3, 4)}")`,
        expectedOutput: "v1 = Vector(3, 4)\nv2 = Vector(1, 2)\nv1 + v2 = Vector(4, 6)\nv1 * 3 = Vector(9, 12)\n|v1| = 5.0\nv1 == Vector(3,4): True",
        concepts: ["magic-methods", "operator-overloading", "repr"],
        tryItIdeas: ["Add __sub__ for subtraction", "Add __len__ to return the dimension count"]
    },

    // =========================================================================
    // MODULE 11: Modules & Standard Library
    // =========================================================================
    {
        id: "ex_m11_1", moduleId: 11,
        title: "Math Module Essentials",
        description: "Mathematical functions from the standard library",
        code: `import math

print("Constants:")
print(f"  pi = {math.pi:.6f}")
print(f"  e  = {math.e:.6f}")

print("\\nFunctions:")
print(f"  sqrt(144) = {math.sqrt(144)}")
print(f"  pow(2, 10) = {math.pow(2, 10)}")
print(f"  ceil(4.2) = {math.ceil(4.2)}")
print(f"  floor(4.8) = {math.floor(4.8)}")
print(f"  factorial(6) = {math.factorial(6)}")
print(f"  gcd(24, 36) = {math.gcd(24, 36)}")
print(f"  log2(1024) = {math.log2(1024)}")`,
        expectedOutput: "Constants:\n  pi = 3.141593\n  e  = 2.718282\n\nFunctions:\n  sqrt(144) = 12.0\n  pow(2, 10) = 1024.0\n  ceil(4.2) = 5\n  floor(4.8) = 4\n  factorial(6) = 720\n  gcd(24, 36) = 12\n  log2(1024) = 10.0",
        concepts: ["math-module", "import", "standard-library"],
        tryItIdeas: ["Calculate the hypotenuse using math.hypot(3, 4)", "Try math.comb(10, 3) for combinations"]
    },
    {
        id: "ex_m11_2", moduleId: 11,
        title: "Collections Module",
        description: "Specialized containers: Counter, defaultdict, namedtuple",
        code: `from collections import Counter, defaultdict, namedtuple

# Counter: count things easily
words = "the cat sat on the mat the cat ate the rat".split()
counter = Counter(words)
print("Top 3 words:", counter.most_common(3))

# defaultdict: no KeyError ever
graph = defaultdict(list)
edges = [("A","B"), ("A","C"), ("B","C"), ("C","D")]
for src, dst in edges:
    graph[src].append(dst)
print(f"\\nGraph: {dict(graph)}")

# namedtuple: lightweight classes
Point = namedtuple("Point", ["x", "y"])
p1 = Point(3, 4)
p2 = Point(x=1, y=2)
print(f"\\np1 = {p1}, p1.x = {p1.x}, p1.y = {p1.y}")`,
        expectedOutput: "Top 3 words: [('the', 4), ('cat', 2), ('sat', 1)]\n\nGraph: {'A': ['B', 'C'], 'B': ['C'], 'C': ['D']}\n\np1 = Point(x=3, y=4), p1.x = 3, p1.y = 4",
        concepts: ["Counter", "defaultdict", "namedtuple", "collections"],
        tryItIdeas: ["Use Counter to find the most common letters in a sentence", "Try deque from collections for efficient queue operations"]
    },

    // =========================================================================
    // MODULE 12: Advanced Topics
    // =========================================================================
    {
        id: "ex_m12_1", moduleId: 12,
        title: "List Comprehensions Mastery",
        description: "Concise list creation with comprehensions",
        code: `# Basic comprehension
squares = [x**2 for x in range(1, 11)]
print(f"Squares: {squares}")

# With condition
evens = [x for x in range(20) if x % 2 == 0]
print(f"Evens:   {evens}")

# Nested comprehension (flatten 2D list)
matrix = [[1,2,3], [4,5,6], [7,8,9]]
flat = [n for row in matrix for n in row]
print(f"Flat:    {flat}")

# Dict comprehension
word_lengths = {w: len(w) for w in "Python is truly awesome".split()}
print(f"Lengths: {word_lengths}")

# Set comprehension
vowels = {c.lower() for c in "Hello World" if c.lower() in "aeiou"}
print(f"Vowels:  {vowels}")

# Generator expression (lazy, memory efficient)
total = sum(x**2 for x in range(1, 101))
print(f"\\nSum of squares 1-100: {total}")`,
        expectedOutput: "Squares: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\nEvens:   [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]\nFlat:    [1, 2, 3, 4, 5, 6, 7, 8, 9]\nLengths: {'Python': 6, 'is': 2, 'truly': 5, 'awesome': 7}\nVowels:  {'e', 'o'}\n\nSum of squares 1-100: 338350",
        concepts: ["list-comprehension", "dict-comprehension", "set-comprehension", "generator-expression"],
        tryItIdeas: ["Create a matrix using nested comprehension: [[i*j for j in range(5)] for i in range(5)]", "Use a generator to process a large range without memory issues"]
    },
    {
        id: "ex_m12_2", moduleId: 12,
        title: "Decorator Patterns",
        description: "Enhance functions with decorators",
        code: `import functools

def debug(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        args_str = ", ".join(repr(a) for a in args)
        print(f"  Calling {func.__name__}({args_str})")
        result = func(*args, **kwargs)
        print(f"  {func.__name__} returned {result!r}")
        return result
    return wrapper

def repeat(n):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@debug
def add(a, b):
    return a + b

@repeat(3)
def say(message):
    print(f"  >> {message}")

print("Debug decorator:")
add(3, 5)
print("\\nRepeat decorator:")
say("Hello!")`,
        expectedOutput: "Debug decorator:\n  Calling add(3, 5)\n  add returned 8\n\nRepeat decorator:\n  >> Hello!\n  >> Hello!\n  >> Hello!",
        concepts: ["decorators", "functools.wraps", "closures", "decorator-factory"],
        tryItIdeas: ["Create a @timer decorator that measures execution time", "Create a @cache decorator for memoization"]
    },
    {
        id: "ex_m12_3", moduleId: 12,
        title: "Generators and Iterators",
        description: "Lazy evaluation with yield for memory efficiency",
        code: `def fibonacci_gen(limit):
    a, b = 0, 1
    while a <= limit:
        yield a
        a, b = b, a + b

def chunked(iterable, size):
    chunk = []
    for item in iterable:
        chunk.append(item)
        if len(chunk) == size:
            yield chunk
            chunk = []
    if chunk:
        yield chunk

# Fibonacci up to 100
fibs = list(fibonacci_gen(100))
print(f"Fibonacci <= 100: {fibs}")

# Chunk a list
data = list(range(1, 12))
chunks = list(chunked(data, 3))
print(f"\\nData: {data}")
print(f"Chunked by 3: {chunks}")

# Generator pipeline
numbers = range(1, 21)
evens = (x for x in numbers if x % 2 == 0)
squared = (x**2 for x in evens)
result = list(squared)
print(f"\\nEven squares 1-20: {result}")`,
        expectedOutput: "Fibonacci <= 100: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]\n\nData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]\nChunked by 3: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11]]\n\nEven squares 1-20: [4, 16, 36, 64, 100, 144, 196, 256, 324, 400]",
        concepts: ["generators", "yield", "lazy-evaluation", "pipeline"],
        tryItIdeas: ["Create a generator that yields prime numbers infinitely", "Use itertools.islice to take the first N items from an infinite generator"]
    },
];

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CODE_EXAMPLES };
}
