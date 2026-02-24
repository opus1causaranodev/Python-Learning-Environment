const CURRICULUM = {
  modules: [
    // ==================== MODULE 1 ====================
    {
      id: 1,
      title: "Python Basics",
      subtitle: "Variables, Data Types, Print & Input",
      icon: "\ud83d\udc23",
      lessons: [
        {
          title: "Welcome to Python & Your First Program",
          content: `<p>Welcome to the world of programming! Python is one of the most popular and beginner-friendly programming languages in the world. It was created by Guido van Rossum in 1991 and is named after the British comedy group Monty Python \u2014 not the snake! Python is used everywhere: from building websites (Instagram, Spotify) to artificial intelligence, data science, and even controlling robots.</p>
<p>Think of a programming language as a way to give instructions to a computer. Just like you might write a recipe for baking a cake \u2014 "mix flour, add eggs, bake at 350\u00b0F" \u2014 a program is a set of step-by-step instructions that the computer follows. Python is special because its instructions look almost like plain English, making it much easier to read and write than many other languages.</p>
<p>The very first thing most programmers learn is how to make the computer display a message on the screen. In Python, we use the <code>print()</code> function for this. A function is like a verb \u2014 it tells the computer to <em>do</em> something. The <code>print()</code> function tells the computer to display whatever you put inside its parentheses. Text must be wrapped in quotation marks (either single quotes <code>'...'</code> or double quotes <code>"..."</code>) so Python knows it is text and not a command.</p>
<p>Every expert programmer started exactly where you are right now. Do not worry about memorizing everything at once. Programming is a skill you build through practice, just like learning to play a musical instrument. The more you type code, experiment, and make mistakes, the faster you will learn. Let us write our very first Python program!</p>`,
          examples: [
            {
              title: "Hello, World!",
              code: `print("Hello, World!")`,
              explanation: "This is the classic first program every programmer writes. The print() function outputs text to the screen. The text inside the quotes is called a 'string'. When you run this, you will see: Hello, World!"
            },
            {
              title: "Printing Multiple Lines",
              code: `print("Welcome to Python!")
print("This is my first program.")
print("I am excited to learn!")`,
              explanation: "Each print() statement outputs its text on a new line. Python runs your code from top to bottom, one line at a time, just like reading a book."
            },
            {
              title: "Printing Numbers",
              code: `print(42)
print(3.14)
print("The answer is", 42)`,
              explanation: "You can print numbers without quotation marks. You can also print multiple items by separating them with commas \u2014 Python will automatically add a space between them."
            },
            {
              title: "Using Single vs Double Quotes",
              code: `print('Hello with single quotes')
print("Hello with double quotes")
print("It's a beautiful day")
print('She said "hello" to me')`,
              explanation: "Both single and double quotes work the same way. Use double quotes when your text contains an apostrophe (like It's), and single quotes when your text contains double quotes. This way Python does not get confused about where the string ends."
            }
          ],
          keyConcepts: [
            "print() displays output to the screen",
            "Strings are text wrapped in quotation marks",
            "Python executes code from top to bottom, line by line",
            "Both single quotes and double quotes can define strings",
            "Functions like print() perform actions when called"
          ],
          commonMistakes: [
            "Forgetting the parentheses: print 'hello' will cause an error. Always use print('hello').",
            "Mismatching quotes: starting with a single quote and ending with a double quote, like print('hello\") will fail.",
            "Forgetting to close quotes: print('hello) is missing the ending quote.",
            "Python is case-sensitive: Print() or PRINT() will not work. It must be lowercase print()."
          ],
          funFact: "The 'Hello, World!' tradition dates back to 1978 when Brian Kernighan used it in a book about the C programming language. Since then, it has become the universal first program for learners in nearly every language!"
        },
        {
          title: "Variables & Data Types",
          content: `<p>Now that you can display messages, let us learn about <strong>variables</strong>. A variable is like a labeled box where you can store information. Imagine you have a box labeled "age" and you put the number 25 inside it. Later, whenever you look at the box labeled "age," you find 25. In Python, creating a variable is as simple as writing a name, an equals sign, and the value you want to store.</p>
<p>Python has several built-in <strong>data types</strong> \u2014 these describe what kind of information a variable holds. The most common ones are: <strong>integers</strong> (whole numbers like 5, -3, 100), <strong>floats</strong> (decimal numbers like 3.14, -0.5, 99.9), <strong>strings</strong> (text like "hello", "Python"), and <strong>booleans</strong> (True or False \u2014 like a light switch that is either on or off). Python automatically figures out the data type based on the value you assign, so you do not need to declare it explicitly.</p>
<p>Variable names have a few rules. They must start with a letter or underscore, can contain letters, numbers, and underscores, and cannot be a Python reserved word like <code>print</code>, <code>if</code>, or <code>for</code>. Good variable names describe what they hold: <code>player_score</code> is much clearer than <code>x</code>. Python convention uses <strong>snake_case</strong> for variable names \u2014 all lowercase with underscores separating words.</p>
<p>One important concept: the <code>=</code> sign in programming does not mean "equals" the way it does in math. It means <strong>assign</strong>. When you write <code>age = 25</code>, you are telling Python: "take the value 25 and store it in a variable called age." You can change a variable's value at any time by assigning a new value to it.</p>`,
          examples: [
            {
              title: "Creating Variables",
              code: `name = "Alice"
age = 25
height = 5.6
is_student = True

print(name)
print(age)
print(height)
print(is_student)`,
              explanation: "Here we create four variables with different data types: a string, an integer, a float, and a boolean. Each variable stores a different kind of information. We then print each one to see its value."
            },
            {
              title: "Checking Data Types with type()",
              code: `score = 95
temperature = 98.6
greeting = "Hi there"
is_raining = False

print(type(score))        # <class 'int'>
print(type(temperature))  # <class 'float'>
print(type(greeting))     # <class 'str'>
print(type(is_raining))   # <class 'bool'>`,
              explanation: "The type() function tells you what kind of data a variable holds. 'int' means integer, 'float' means decimal number, 'str' means string (text), and 'bool' means boolean (True/False). This is useful for debugging when something is not working as expected."
            },
            {
              title: "Reassigning Variables",
              code: `favorite_color = "blue"
print(favorite_color)  # blue

favorite_color = "green"
print(favorite_color)  # green

x = 10
print(x)  # 10
x = x + 5
print(x)  # 15`,
              explanation: "Variables can be changed (reassigned) at any time. When you assign a new value, the old one is replaced. The line x = x + 5 means: take the current value of x (10), add 5, and store the result (15) back in x."
            },
            {
              title: "Multiple Assignment",
              code: `# Assign multiple variables at once
a, b, c = 1, 2, 3
print(a)  # 1
print(b)  # 2
print(c)  # 3

# Assign same value to multiple variables
x = y = z = 0
print(x, y, z)  # 0 0 0`,
              explanation: "Python lets you assign values to multiple variables in a single line. The values on the right are matched with the variable names on the left in order. You can also set several variables to the same value at once."
            }
          ],
          keyConcepts: [
            "Variables store data using the = (assignment) operator",
            "Python has four basic data types: int, float, str, and bool",
            "Python automatically determines the data type (dynamic typing)",
            "Variable names should be descriptive and use snake_case",
            "type() reveals what data type a variable holds",
            "Variables can be reassigned to new values at any time"
          ],
          commonMistakes: [
            "Starting a variable name with a number: 2name = 'Bob' is invalid. Variable names must start with a letter or underscore.",
            "Using spaces in variable names: my name = 'Alice' will cause an error. Use my_name instead.",
            "Confusing = (assignment) with == (comparison, which we will learn later).",
            "Forgetting that Python is case-sensitive: Name and name are two completely different variables."
          ],
          funFact: "Python is dynamically typed, meaning you can change a variable from holding a number to holding text at any time. Many other languages like Java or C++ require you to declare the type upfront and stick with it. This flexibility is one reason Python is so beginner-friendly!"
        },
        {
          title: "User Input & Type Conversion",
          content: `<p>So far, our programs have only used values that we typed directly into the code. But real programs are interactive \u2014 they ask the user for information and respond to it. In Python, the <code>input()</code> function pauses the program and waits for the user to type something. Think of it like a waiter at a restaurant asking "What would you like to order?" and then waiting for your answer.</p>
<p>There is one very important thing to know about <code>input()</code>: it <strong>always returns a string</strong>, even if the user types a number. If someone types 25, Python sees it as the text "25", not the number 25. This matters because you cannot do math with text. Trying to add "25" + 10 would confuse Python. To fix this, we use <strong>type conversion</strong> functions: <code>int()</code> converts to a whole number, <code>float()</code> converts to a decimal number, and <code>str()</code> converts to text.</p>
<p>Type conversion is like changing the format of information. Imagine you have the number twenty-five written as the word "25" on a piece of paper. Before you can use it in a math problem, you need to understand it as the actual number 25. That is what <code>int("25")</code> does \u2014 it converts the text into a real number that Python can do math with.</p>
<p>You can also combine variables and strings in your output using <strong>f-strings</strong> (formatted string literals). By putting an <code>f</code> before the opening quote and wrapping variable names in curly braces <code>{}</code>, Python will insert the variable's value into the string. This is much cleaner than using commas or the <code>+</code> operator to piece strings together.</p>`,
          examples: [
            {
              title: "Getting User Input",
              code: `name = input("What is your name? ")
print("Hello, " + name + "!")
print(f"Welcome to Python, {name}!")`,
              explanation: "input() displays the prompt message and waits for the user to type something and press Enter. Whatever they type is stored in the variable 'name'. We then greet them using both string concatenation (+) and an f-string."
            },
            {
              title: "Type Conversion for Math",
              code: `age_text = input("How old are you? ")
age = int(age_text)
future_age = age + 10
print(f"In 10 years, you will be {future_age} years old!")`,
              explanation: "Since input() always gives us a string, we must convert it to an integer with int() before doing math. Without the int() conversion, Python would try to add the text '10' to a number and crash with an error."
            },
            {
              title: "Converting Between Types",
              code: `# String to Integer
num1 = int("42")
print(num1 + 8)  # 50

# String to Float
price = float("19.99")
print(price + 5)  # 24.99

# Number to String
score = 100
message = "Your score is: " + str(score)
print(message)

# Float to Integer (truncates decimal)
pi = 3.99
print(int(pi))  # 3 (does not round!)`,
              explanation: "int() converts to whole numbers (it chops off decimals, it does not round). float() converts to decimal numbers. str() converts anything to text. These conversions are essential when mixing data types in your programs."
            },
            {
              title: "F-Strings: The Modern Way to Format",
              code: `name = "Alice"
age = 30
gpa = 3.85

# Old way (messy)
print("Name: " + name + ", Age: " + str(age))

# f-string way (clean!)
print(f"Name: {name}, Age: {age}")
print(f"{name} is {age} years old with a {gpa} GPA")
print(f"In 5 years, {name} will be {age + 5}")`,
              explanation: "F-strings (prefixed with 'f') let you embed variables and even expressions directly inside strings using curly braces. They are the cleanest and most readable way to build strings in modern Python. You can even do math inside the curly braces!"
            },
            {
              title: "A Complete Interactive Program",
              code: `name = input("Enter your name: ")
birth_year = int(input("Enter your birth year: "))
current_year = 2026

age = current_year - birth_year
print(f"Hello, {name}!")
print(f"You are approximately {age} years old.")`,
              explanation: "This combines everything we have learned: input for interaction, int() for type conversion, arithmetic with variables, and f-strings for clean output. Notice how int(input(...)) nests the functions \u2014 input() runs first, then int() converts the result."
            }
          ],
          keyConcepts: [
            "input() pauses the program and collects user input as a string",
            "input() ALWAYS returns a string, even if the user types numbers",
            "int(), float(), and str() convert between data types",
            "f-strings use f'...' with {variable} for clean string formatting",
            "Functions can be nested: int(input('...')) converts input in one step",
            "Type conversion is necessary before doing math with user input"
          ],
          commonMistakes: [
            "Forgetting to convert input to a number before doing math: age = input('Age: '); age + 1 will crash.",
            "Using int() on text that is not a number: int('hello') will crash with a ValueError.",
            "Using int() on a decimal string: int('3.14') will crash. Convert to float first, then to int if needed.",
            "Forgetting the 'f' prefix: print('{name}') literally prints {name} instead of the variable's value."
          ],
          funFact: "F-strings were introduced in Python 3.6 (2016). Before that, programmers used .format() or the % operator for string formatting, both of which were much harder to read. F-strings are now the recommended way because they are faster and more intuitive!"
        }
      ]
    },

    // ==================== MODULE 2 ====================
    {
      id: 2,
      title: "Operators & Expressions",
      subtitle: "Arithmetic, Comparison, Logical & Assignment Operators",
      icon: "\u2795",
      lessons: [
        {
          title: "Arithmetic Operators",
          content: `<p>Now that you know how to store data in variables, it is time to learn how to work with that data. <strong>Operators</strong> are symbols that tell Python to perform specific operations \u2014 think of them as the verbs of mathematics. Just as you learned addition, subtraction, multiplication, and division in school, Python has operators for all of these and a few extras you might not have seen before.</p>
<p>The basic arithmetic operators will feel familiar: <code>+</code> for addition, <code>-</code> for subtraction, <code>*</code> for multiplication, and <code>/</code> for division. Python also has three special operators: <code>//</code> for floor division (divides and rounds down to the nearest whole number), <code>%</code> for modulo (gives you the remainder after division), and <code>**</code> for exponentiation (raising a number to a power). These are used far more often in programming than you might expect.</p>
<p>Think of floor division like splitting pizza equally among friends. If you have 7 slices and 2 friends, regular division gives 3.5, but floor division (<code>7 // 2</code>) gives 3 \u2014 each friend gets 3 whole slices. The modulo operator tells you how many are left over: <code>7 % 2</code> gives 1 (one slice remaining). Modulo is incredibly useful for checking if numbers are even or odd, cycling through patterns, and many other programming tasks.</p>
<p>Python follows the standard mathematical <strong>order of operations</strong> (PEMDAS/BODMAS): Parentheses first, then Exponents, then Multiplication/Division, and finally Addition/Subtraction. When operators have the same priority, Python evaluates from left to right. You can always use parentheses to make the order explicit and your code more readable.</p>`,
          examples: [
            {
              title: "Basic Arithmetic",
              code: `a = 15
b = 4

print(f"{a} + {b} = {a + b}")   # 19
print(f"{a} - {b} = {a - b}")   # 11
print(f"{a} * {b} = {a * b}")   # 60
print(f"{a} / {b} = {a / b}")   # 3.75`,
              explanation: "The four basic operators work exactly like in math class. Note that division (/) always returns a float (decimal number), even if the result is a whole number. For example, 8 / 4 gives 2.0, not 2."
            },
            {
              title: "Floor Division, Modulo & Exponents",
              code: `print(17 // 5)   # 3   (floor division: 17/5 = 3.4 -> rounds down to 3)
print(17 % 5)    # 2   (modulo: 17 = 5*3 + 2, remainder is 2)
print(2 ** 10)   # 1024 (exponent: 2 to the power of 10)

# Practical: Is a number even or odd?
number = 42
print(f"{number} is even: {number % 2 == 0}")  # True

# Practical: Convert 150 minutes to hours and minutes
total_minutes = 150
hours = total_minutes // 60    # 2
minutes = total_minutes % 60   # 30
print(f"{total_minutes} minutes = {hours}h {minutes}m")`,
              explanation: "Floor division (//) chops off the decimal part. Modulo (%) gives the remainder. These two often work together, like converting minutes into hours and leftover minutes. Exponentiation (**) raises a number to a power."
            },
            {
              title: "Order of Operations",
              code: `# Without parentheses - follows PEMDAS
result1 = 2 + 3 * 4
print(result1)  # 14 (not 20! multiplication happens first)

# With parentheses - forces addition first
result2 = (2 + 3) * 4
print(result2)  # 20

# Complex expression
result3 = 10 + 2 ** 3 * 2
print(result3)  # 26 (exponent first: 8, then multiply: 16, then add: 26)

# Use parentheses for clarity
result4 = 10 + ((2 ** 3) * 2)
print(result4)  # 26 (same result, but much easier to read)`,
              explanation: "Python follows PEMDAS: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction. When in doubt, use parentheses to make your intentions clear. Other programmers (and future you) will thank you for the readability."
            }
          ],
          keyConcepts: [
            "+ - * / are basic arithmetic operators",
            "// is floor division (rounds down to nearest integer)",
            "% is modulo (gives the remainder of division)",
            "** is exponentiation (raises to a power)",
            "/ always returns a float, // returns an integer",
            "PEMDAS determines operation order; use parentheses for clarity"
          ],
          commonMistakes: [
            "Dividing by zero: 10 / 0 causes a ZeroDivisionError. Always check your divisor.",
            "Confusing / and //: 7 / 2 = 3.5 but 7 // 2 = 3. Use // when you want a whole number.",
            "Forgetting order of operations: 2 + 3 * 4 is 14, not 20. Use parentheses when uncertain.",
            "Negative floor division may surprise you: -7 // 2 = -4 (rounds toward negative infinity), not -3."
          ],
          funFact: "Python can handle absurdly large numbers without any special setup. Try print(2 ** 1000) \u2014 Python will happily compute a number with over 300 digits! Most other languages would crash or give wrong answers with numbers this large."
        },
        {
          title: "Comparison & Logical Operators",
          content: `<p><strong>Comparison operators</strong> let you compare two values and get a <code>True</code> or <code>False</code> answer. They are the foundation of making decisions in programming. Think of them as yes-or-no questions: "Is 5 greater than 3?" \u2014 yes (True). "Is 10 equal to 7?" \u2014 no (False). These True/False values are called <strong>booleans</strong>, and they will become essential when we learn about if-statements in the next module.</p>
<p>Python has six comparison operators: <code>==</code> (equal to), <code>!=</code> (not equal to), <code>></code> (greater than), <code><</code> (less than), <code>>=</code> (greater than or equal to), and <code><=</code> (less than or equal to). Notice that "equal to" uses a double equals sign <code>==</code>. This is because the single <code>=</code> is already used for assignment. This is one of the most common sources of confusion for beginners, so remember: <code>=</code> stores a value, <code>==</code> asks a question.</p>
<p><strong>Logical operators</strong> let you combine multiple conditions. Think of them as connecting words: <code>and</code> means both conditions must be true (like "Is it Saturday AND is it sunny?"), <code>or</code> means at least one condition must be true (like "Is it Saturday OR Sunday?"), and <code>not</code> flips a condition to its opposite (like "Is it NOT raining?"). These let you build complex conditions from simple ones.</p>
<p>You can chain comparisons in Python in a very natural way. Instead of writing <code>age >= 13 and age <= 19</code>, you can write <code>13 <= age <= 19</code>, which reads almost like English: "13 is less than or equal to age, which is less than or equal to 19." This is a feature that is unique to Python and makes your code more readable.</p>`,
          examples: [
            {
              title: "Comparison Operators",
              code: `x = 10
y = 5

print(x == y)   # False (is 10 equal to 5?)
print(x != y)   # True  (is 10 not equal to 5?)
print(x > y)    # True  (is 10 greater than 5?)
print(x < y)    # False (is 10 less than 5?)
print(x >= 10)  # True  (is 10 greater than or equal to 10?)
print(x <= 9)   # False (is 10 less than or equal to 9?)

# Comparing strings (alphabetical order)
print("apple" < "banana")   # True (a comes before b)
print("cat" == "Cat")       # False (case-sensitive!)`,
              explanation: "Each comparison returns True or False. Strings are compared alphabetically (technically by Unicode value), and the comparison is case-sensitive \u2014 uppercase letters come before lowercase letters."
            },
            {
              title: "Logical Operators: and, or, not",
              code: `age = 25
has_license = True

# and: BOTH conditions must be True
can_drive = age >= 16 and has_license
print(f"Can drive: {can_drive}")  # True

# or: at least ONE condition must be True
is_weekend = False
is_holiday = True
day_off = is_weekend or is_holiday
print(f"Day off: {day_off}")  # True

# not: flips True to False and vice versa
is_raining = False
go_outside = not is_raining
print(f"Go outside: {go_outside}")  # True

# Combining them
temp = 72
sunny = True
perfect_day = temp > 65 and temp < 85 and sunny and not is_raining
print(f"Perfect day: {perfect_day}")  # True`,
              explanation: "The 'and' operator requires ALL conditions to be True. The 'or' operator needs at least ONE to be True. The 'not' operator reverses the boolean value. You can combine as many conditions as you need."
            },
            {
              title: "Chained Comparisons & Truthiness",
              code: `# Chained comparisons (Python specialty!)
age = 17
is_teen = 13 <= age <= 19
print(f"Is teenager: {is_teen}")  # True

score = 85
grade_b = 80 <= score < 90
print(f"Grade B: {grade_b}")  # True

# Truthiness: what Python considers True or False
print(bool(0))        # False (zero is falsy)
print(bool(42))       # True  (any non-zero number is truthy)
print(bool(""))       # False (empty string is falsy)
print(bool("hello"))  # True  (non-empty string is truthy)
print(bool([]))       # False (empty list is falsy)
print(bool([1, 2]))   # True  (non-empty list is truthy)`,
              explanation: "Chained comparisons like 13 <= age <= 19 are a Pythonic way to check ranges. Truthiness means Python can treat non-boolean values as True or False: zero, empty strings, and empty collections are 'falsy'; everything else is 'truthy'. This will be very useful later."
            }
          ],
          keyConcepts: [
            "== checks equality, = assigns a value (they are different!)",
            "!= means 'not equal to'",
            ">, <, >=, <= compare values and return booleans",
            "'and' requires both conditions to be True",
            "'or' requires at least one condition to be True",
            "'not' inverts a boolean value",
            "Python allows chained comparisons: 1 <= x <= 10",
            "Truthiness: 0, empty strings, and empty collections are 'falsy'"
          ],
          commonMistakes: [
            "Using = instead of ==: if x = 5 is assignment, not comparison. Use if x == 5.",
            "Confusing 'and' with 'or': 'and' is stricter (both must be true). Think carefully about which you need.",
            "Forgetting that string comparisons are case-sensitive: 'Apple' != 'apple'.",
            "Not understanding operator precedence: 'not' binds tighter than 'and', which binds tighter than 'or'. Use parentheses to be safe."
          ],
          funFact: "Python's 'and' and 'or' operators are short-circuit: if Python can determine the result from the first condition alone, it will not even evaluate the second one. For example, in 'False and some_function()', the function never runs because False and anything is always False!"
        },
        {
          title: "Assignment Operators & String Operators",
          content: `<p><strong>Assignment operators</strong> are shortcuts for updating a variable's value. You have already seen the basic <code>=</code> operator that assigns a value. But what if you want to add 5 to an existing variable? Instead of writing <code>score = score + 5</code>, Python lets you write <code>score += 5</code>. It means exactly the same thing but is shorter and more common in real code. Every arithmetic operator has an assignment shortcut.</p>
<p>These shortcut operators are called <strong>augmented assignment operators</strong>, and they exist for all arithmetic operations: <code>+=</code> (add and assign), <code>-=</code> (subtract and assign), <code>*=</code> (multiply and assign), <code>/=</code> (divide and assign), <code>//=</code> (floor divide and assign), <code>%=</code> (modulo and assign), and <code>**=</code> (power and assign). They make your code shorter and are a very common pattern in programming.</p>
<p>The <code>+</code> and <code>*</code> operators also work with strings in special ways. The <code>+</code> operator <strong>concatenates</strong> (joins) two strings together, like gluing two words. The <code>*</code> operator <strong>repeats</strong> a string a given number of times. These are called operator overloading \u2014 the same symbol does different things depending on the data type. Adding two numbers gives their sum; adding two strings glues them together.</p>
<p>Understanding operators thoroughly is essential because they are the building blocks of every calculation, condition, and decision your programs will make. As you progress, you will use these operators constantly, and they will become as natural as using a calculator.</p>`,
          examples: [
            {
              title: "Augmented Assignment Operators",
              code: `score = 100

score += 10    # score = score + 10 -> 110
print(score)

score -= 25    # score = score - 25 -> 85
print(score)

score *= 2     # score = score * 2 -> 170
print(score)

score //= 3   # score = score // 3 -> 56
print(score)

score %= 10    # score = score % 10 -> 6
print(score)

score **= 3   # score = score ** 3 -> 216
print(score)`,
              explanation: "Each augmented assignment operator takes the current value of the variable, performs the operation with the right-hand value, and stores the result back. They are simply shortcuts that make code shorter and more readable."
            },
            {
              title: "String Concatenation and Repetition",
              code: `first = "Hello"
second = "World"

# Concatenation with +
greeting = first + " " + second
print(greeting)  # Hello World

# Repetition with *
line = "-" * 30
print(line)  # ------------------------------

stars = "* " * 5
print(stars)  # * * * * *

# Building strings
name = "Python"
message = ("=" * 20) + "\\n" + name + "\\n" + ("=" * 20)
print(message)`,
              explanation: "The + operator joins strings end-to-end. The * operator repeats a string. Note that you cannot add a string and a number directly: 'age: ' + 25 will fail. You must convert the number first: 'age: ' + str(25) or use an f-string."
            },
            {
              title: "Practical Example: Simple Calculator",
              code: `# A tiny interactive calculator
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

print(f"\\nResults:")
print(f"{num1} + {num2} = {num1 + num2}")
print(f"{num1} - {num2} = {num1 - num2}")
print(f"{num1} * {num2} = {num1 * num2}")
print(f"{num1} / {num2} = {num1 / num2}")
print(f"{num1} ** {num2} = {num1 ** num2}")`,
              explanation: "This mini program combines user input, type conversion, arithmetic operators, and f-strings. We use float() instead of int() so users can enter decimal numbers. This is a great example of how all the concepts we have learned work together."
            }
          ],
          keyConcepts: [
            "+= -= *= /= //= %= **= are augmented assignment shortcuts",
            "x += 5 is identical to x = x + 5",
            "The + operator concatenates strings: 'a' + 'b' = 'ab'",
            "The * operator repeats strings: 'ha' * 3 = 'hahaha'",
            "You cannot mix strings and numbers with + (use str() or f-strings)",
            "Operator overloading: + means addition for numbers, concatenation for strings"
          ],
          commonMistakes: [
            "Trying 'Hello' + 5 will crash. Convert the number to a string first: 'Hello' + str(5) or use f'Hello{5}'.",
            "Writing =+ instead of +=: x =+ 5 assigns positive 5 to x rather than adding 5. The order matters!",
            "Forgetting that string * float does not work: 'hi' * 2.5 is an error. The multiplier must be an integer.",
            "Assuming += creates a new variable: it modifies the existing one. The variable must already exist before you can use +=."
          ],
          funFact: "Unlike many languages, Python does not have ++ or -- operators (increment/decrement). Guido van Rossum intentionally left them out because he felt x += 1 was clear enough and having both styles would lead to confusion. Simplicity is a core Python philosophy!"
        }
      ]
    },

    // ==================== MODULE 3 ====================
    {
      id: 3,
      title: "Control Flow",
      subtitle: "Making Decisions with if, elif, and else",
      icon: "\ud83d\udea6",
      lessons: [
        {
          title: "if Statements: Making Decisions",
          content: `<p>Until now, every program we have written runs every line from top to bottom, no matter what. But real programs need to make <strong>decisions</strong>. Should the app show "Welcome back" or "Please sign up"? Should the game character jump or duck? This is where <strong>control flow</strong> comes in \u2014 it lets your program choose different paths depending on conditions, just like a fork in the road.</p>
<p>The <code>if</code> statement is the most fundamental decision-making tool in Python. It works exactly like how you make decisions in real life: <em>"If it is raining, bring an umbrella."</em> In Python, you write a condition (something that is either True or False), and if it is True, the indented code below runs. If it is False, that code is skipped entirely. The condition uses the comparison and logical operators you learned in the previous module.</p>
<p><strong>Indentation</strong> is critically important in Python. Unlike most other programming languages that use curly braces {} to group code, Python uses indentation (spaces at the beginning of a line). The standard is 4 spaces. All the lines indented under an if statement belong to that if block. When the indentation returns to the previous level, the if block is over. This forces Python code to be visually clean and readable, which is one of the reasons Python is so popular.</p>
<p>Think of indentation like an outline in a document. The main headings are at the left margin. Sub-points are indented underneath. Everything indented under an if statement only runs when the condition is True. Getting indentation wrong is one of the most common errors for beginners, but you will get used to it quickly with practice.</p>`,
          examples: [
            {
              title: "Basic if Statement",
              code: `age = 18

if age >= 18:
    print("You are an adult.")
    print("You can vote!")

print("This always runs, regardless of age.")`,
              explanation: "The two indented lines only run if age >= 18 is True. The last line is NOT indented under the if, so it runs no matter what. The colon (:) at the end of the if line is required \u2014 it tells Python that an indented block follows."
            },
            {
              title: "if-else: Two Paths",
              code: `temperature = 35

if temperature >= 60:
    print("It's warm outside.")
    print("Wear a t-shirt!")
else:
    print("It's cold outside.")
    print("Wear a jacket!")

print(f"Current temperature: {temperature}\u00b0F")`,
              explanation: "The else block runs when the if condition is False. It is the 'otherwise' path. Exactly one of the two blocks will run \u2014 never both, never neither. The else also ends with a colon and its code is indented."
            },
            {
              title: "if-elif-else: Multiple Paths",
              code: `score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Score: {score} -> Grade: {grade}")`,
              explanation: "elif (short for 'else if') lets you check multiple conditions in sequence. Python checks each condition from top to bottom and runs the FIRST one that is True, then skips all the rest. If none are True, the else block runs. Here, 85 >= 90 is False, but 85 >= 80 is True, so grade becomes 'B'."
            },
            {
              title: "Nested if Statements",
              code: `has_ticket = True
age = 15

if has_ticket:
    print("You have a ticket!")
    if age >= 18:
        print("Welcome to the main show.")
    elif age >= 13:
        print("Welcome to the teen section.")
    else:
        print("Sorry, you need a parent with you.")
else:
    print("You need to buy a ticket first.")`,
              explanation: "You can put if statements inside other if statements \u2014 this is called nesting. The inner if only runs if the outer if is True. Notice how each level of nesting adds another 4 spaces of indentation. Try not to nest more than 2-3 levels deep, as it becomes hard to read."
            }
          ],
          keyConcepts: [
            "if executes code only when a condition is True",
            "else provides an alternative path when the condition is False",
            "elif checks additional conditions in sequence",
            "Only the first True branch in an if-elif-else chain executes",
            "The colon (:) is required after if, elif, and else",
            "Indentation (4 spaces) defines which code belongs to which block",
            "if statements can be nested inside each other"
          ],
          commonMistakes: [
            "Forgetting the colon: 'if x > 5' instead of 'if x > 5:' will cause a SyntaxError.",
            "Inconsistent indentation: mixing tabs and spaces causes IndentationError. Use 4 spaces consistently.",
            "Using = instead of == in conditions: 'if x = 5:' assigns a value instead of comparing. Use 'if x == 5:'.",
            "Putting code after else without indentation: code must be indented under else to belong to it.",
            "Using elif after else: else must always be last in the chain."
          ],
          funFact: "Python's use of indentation was controversial when the language was created. Many programmers coming from C or Java thought it was strange. But studies have shown that Python's forced indentation leads to fewer bugs because the visual structure of the code matches its logical structure. What looks right actually IS right!"
        },
        {
          title: "Conditional Expressions & Complex Conditions",
          content: `<p>Now that you understand basic if statements, let us explore more advanced ways to write conditions. Python offers a <strong>conditional expression</strong> (also called a <strong>ternary operator</strong>) that lets you write a simple if-else on a single line. It follows the pattern: <code>value_if_true if condition else value_if_false</code>. It is great for short, simple decisions, but should not be used for complex logic as it becomes hard to read.</p>
<p>You can build more complex conditions by combining comparison operators with <code>and</code>, <code>or</code>, and <code>not</code>. For example, checking if someone qualifies for a discount might require checking both their age AND their membership status. These compound conditions let your programs handle sophisticated real-world rules with elegance.</p>
<p>Python also lets you check if a value is in a collection using the <code>in</code> operator. Instead of writing <code>color == "red" or color == "blue" or color == "green"</code>, you can write <code>color in ["red", "blue", "green"]</code>. This is more concise and reads almost like English: "if color is in this list." The <code>not in</code> operator checks the opposite.</p>
<p>As you write more conditions, remember that readable code is better than clever code. If a condition is getting too long or complex, break it into smaller pieces by storing intermediate results in well-named boolean variables. For example, <code>is_eligible = age >= 18 and has_id</code> followed by <code>if is_eligible:</code> is much clearer than cramming everything into one giant condition.</p>`,
          examples: [
            {
              title: "Ternary (Conditional) Expression",
              code: `age = 20

# Traditional if-else
if age >= 18:
    status = "adult"
else:
    status = "minor"

# Same thing as a ternary expression (one line)
status = "adult" if age >= 18 else "minor"
print(f"Status: {status}")

# Ternary in a print statement
score = 75
print(f"Result: {'PASS' if score >= 70 else 'FAIL'}")

# Ternary for choosing values
temperature = 95
drink = "iced coffee" if temperature > 80 else "hot coffee"
print(f"I'll have {drink}")`,
              explanation: "The ternary expression is a compact one-line if-else. The format is: result = (value_if_true) if (condition) else (value_if_false). Use it for simple assignments. For anything more complex, stick with the full if-else block."
            },
            {
              title: "Complex Conditions with and, or, not",
              code: `age = 25
income = 50000
credit_score = 720

# Complex loan eligibility check
if age >= 21 and income >= 30000 and credit_score >= 700:
    print("Loan approved!")
else:
    print("Loan denied.")

# Using 'or' for multiple valid options
day = "Saturday"
if day == "Saturday" or day == "Sunday":
    print("It's the weekend!")

# Using 'not' to invert
is_banned = False
has_account = True
if has_account and not is_banned:
    print("Welcome back!")

# Breaking complex conditions into readable parts
is_adult = age >= 21
has_good_income = income >= 30000
has_good_credit = credit_score >= 700
if is_adult and has_good_income and has_good_credit:
    print("You qualify!")`,
              explanation: "Complex conditions combine multiple checks. The last example shows a best practice: store individual conditions in named boolean variables, then combine them. This makes the code self-documenting and much easier to debug."
            },
            {
              title: "The 'in' Operator for Membership Testing",
              code: `# Check if a value is in a list
favorite_color = "blue"
primary_colors = ["red", "blue", "yellow"]

if favorite_color in primary_colors:
    print(f"{favorite_color} is a primary color!")

# Check if a character is in a string
email = "user@example.com"
if "@" in email:
    print("Valid email format (has @)")

# Using 'not in'
banned_words = ["spam", "scam", "fake"]
user_message = "Hello everyone!"

if "spam" not in user_message.lower():
    print("Message is clean!")

# Combining 'in' with other conditions
user_role = "admin"
allowed_roles = ["admin", "moderator", "editor"]
is_active = True

if user_role in allowed_roles and is_active:
    print(f"Access granted for {user_role}")`,
              explanation: "The 'in' operator checks if a value exists in a collection (list, string, tuple, set, etc.). It is much cleaner than writing multiple == comparisons with 'or'. The 'not in' operator checks if a value is absent."
            },
            {
              title: "Practical: Simple Access Control",
              code: `username = input("Enter username: ")
password = input("Enter password: ")

# Simple credential check
correct_user = "admin"
correct_pass = "python123"

if username == correct_user and password == correct_pass:
    print("\\nLogin successful!")
    print("Welcome to the dashboard.")
elif username == correct_user:
    print("\\nWrong password. Try again.")
elif password == correct_pass:
    print("\\nUsername not found.")
else:
    print("\\nInvalid credentials.")`,
              explanation: "This practical example shows how elif can provide specific feedback. By checking combinations of conditions, we can tell the user exactly what went wrong \u2014 wrong password, wrong username, or both. Real apps would never do password checks this way (they use encryption), but this demonstrates the logic nicely."
            }
          ],
          keyConcepts: [
            "Ternary expression: value_if_true if condition else value_if_false",
            "Combine conditions with 'and' (all must be true) and 'or' (any must be true)",
            "'not' inverts a boolean condition",
            "'in' checks if a value exists in a collection or string",
            "'not in' checks if a value is absent",
            "Break complex conditions into named boolean variables for readability",
            "Readable code is better than clever one-liners"
          ],
          commonMistakes: [
            "Overusing ternary expressions: 'x = a if b else c if d else e' is hard to read. Use a full if-elif-else instead.",
            "Confusing 'and' and 'or': Remember 'and' is stricter. 'Is it raining AND cold?' vs 'Is it raining OR cold?'",
            "Forgetting that 'in' is case-sensitive: 'A' in 'abc' is False. Use .lower() for case-insensitive checks.",
            "Writing 'if x == 1 or 2:' instead of 'if x == 1 or x == 2:' or 'if x in [1, 2]:'. The first version always evaluates to True because 2 is truthy!"
          ],
          funFact: "The ternary expression was a hotly debated addition to Python. It was rejected multiple times before being accepted in Python 2.5 (2006). Guido van Rossum chose the 'x if condition else y' syntax specifically because it reads like English, unlike C's 'condition ? x : y' which many find confusing."
        }
      ]
    },

    // ==================== MODULE 4 ====================
    {
      id: 4,
      title: "Loops",
      subtitle: "Repeating Actions with for and while",
      icon: "\ud83d\udd01",
      lessons: [
        {
          title: "for Loops: Iterating Over Sequences",
          content: `<p>Imagine you need to print the numbers 1 through 100, or greet every student in a class of 30. Writing 100 print statements would be tedious and impractical. <strong>Loops</strong> solve this problem by letting you repeat a block of code multiple times. They are one of the most powerful concepts in programming and you will use them in almost every program you write.</p>
<p>The <code>for</code> loop is used when you know what you want to iterate (loop) over. It works like this: "For each item in this collection, do something." Think of it like a teacher taking attendance: "For each student in the class, call their name." The loop automatically moves to the next item each time until it has gone through every item in the collection.</p>
<p>The <code>range()</code> function is a for loop's best friend when you need to repeat something a specific number of times or generate a sequence of numbers. <code>range(5)</code> produces 0, 1, 2, 3, 4 (five numbers starting from 0). <code>range(1, 6)</code> produces 1, 2, 3, 4, 5 (starting from 1, stopping before 6). <code>range(0, 10, 2)</code> produces 0, 2, 4, 6, 8 (counting by 2s). Notice that the stop value is always excluded \u2014 this is a common source of off-by-one errors for beginners.</p>
<p>The variable in a for loop (often called the <strong>loop variable</strong> or <strong>iterator</strong>) takes on a new value each time through the loop. You can name it anything, but use descriptive names: <code>for student in students</code> is much clearer than <code>for x in students</code>. When the loop ends, the variable retains the last value it was assigned.</p>`,
          examples: [
            {
              title: "Basic for Loop with range()",
              code: `# Print numbers 1 to 5
for i in range(1, 6):
    print(i)

# Repeat an action 3 times
for _ in range(3):
    print("Hip, hip, hooray!")

# Count by 2s from 0 to 10
for num in range(0, 11, 2):
    print(num, end=" ")  # 0 2 4 6 8 10`,
              explanation: "range(1, 6) generates 1, 2, 3, 4, 5 (start inclusive, stop exclusive). When you do not need the loop variable, convention is to use _ as the name. The 'end' parameter in print changes the ending character from a newline to a space, so everything prints on one line."
            },
            {
              title: "Looping Over Collections",
              code: `# Loop over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(f"I like {fruit}!")

# Loop over a string (character by character)
word = "Python"
for letter in word:
    print(letter, end="-")  # P-y-t-h-o-n-

# Loop with index using enumerate()
colors = ["red", "green", "blue"]
for index, color in enumerate(colors):
    print(f"{index}: {color}")`,
              explanation: "for loops can iterate over any 'iterable': lists, strings, tuples, and more. When looping over a list, the loop variable takes on each element. enumerate() gives you both the index (position) and the value, which is very handy."
            },
            {
              title: "Accumulator Pattern",
              code: `# Sum numbers 1 to 100
total = 0
for num in range(1, 101):
    total += num
print(f"Sum of 1 to 100: {total}")  # 5050

# Count vowels in a string
text = "Hello World"
vowel_count = 0
for char in text.lower():
    if char in "aeiou":
        vowel_count += 1
print(f"Vowels in '{text}': {vowel_count}")  # 3

# Build a new string
original = "Hello"
reversed_str = ""
for char in original:
    reversed_str = char + reversed_str
print(reversed_str)  # olleH`,
              explanation: "The accumulator pattern starts with an initial value (0, empty string, empty list) and builds up a result inside the loop. It is one of the most common loop patterns. Notice how the vowel counter combines a for loop with an if statement inside it."
            },
            {
              title: "Practical: Multiplication Table",
              code: `num = int(input("Enter a number: "))

print(f"\\nMultiplication table for {num}:")
print("-" * 25)

for i in range(1, 13):
    result = num * i
    print(f"{num} x {i:2d} = {result:3d}")`,
              explanation: "This generates a multiplication table for any number. The :2d and :3d in the f-string are format specifiers \u2014 they ensure numbers take up at least 2 or 3 characters, which aligns the output neatly in columns. The 'd' means integer format."
            }
          ],
          keyConcepts: [
            "for loops iterate over sequences (lists, strings, ranges, etc.)",
            "range(stop), range(start, stop), range(start, stop, step) generate number sequences",
            "range() excludes the stop value: range(5) gives 0,1,2,3,4",
            "The loop variable takes on each value in the sequence automatically",
            "enumerate() provides both index and value during iteration",
            "The accumulator pattern builds a result across loop iterations",
            "Use _ as the loop variable name when you do not need the value"
          ],
          commonMistakes: [
            "Off-by-one error: range(1, 10) gives 1-9, not 1-10. Use range(1, 11) for 1-10.",
            "Modifying a list while looping over it can cause skipped items or infinite loops. Create a copy first.",
            "Forgetting the colon after the for statement: 'for i in range(5)' needs a colon at the end.",
            "Indentation errors: all code inside the loop must be indented consistently."
          ],
          funFact: "The mathematician Carl Friedrich Gauss allegedly solved the sum of 1 to 100 as a child in seconds using the formula n*(n+1)/2. Our loop takes Python microseconds. But Gauss's formula (100 * 101 / 2 = 5050) is still faster because it runs in constant time regardless of how large the number is!"
        },
        {
          title: "while Loops & Loop Control",
          content: `<p>The <code>while</code> loop is the other type of loop in Python. Unlike a for loop which iterates over a known sequence, a while loop keeps running <em>as long as a condition is True</em>. Think of it like waiting for a bus: "While the bus has not arrived, keep waiting." You do not know exactly how many times you will check, but you know the condition that will make you stop.</p>
<p>While loops are perfect for situations where you do not know in advance how many iterations you need. For example: asking a user for valid input until they get it right, running a game until the player loses, or reading data until the end of a file. The condition is checked <em>before</em> each iteration, so if it starts as False, the loop body never runs at all.</p>
<p>Python provides three important <strong>loop control statements</strong>: <code>break</code> exits the loop immediately (like an emergency stop button), <code>continue</code> skips the rest of the current iteration and jumps to the next one (like saying "skip this one, next please"), and <code>else</code> on a loop runs only if the loop completed without hitting a break. These work in both for and while loops.</p>
<p>Be careful with while loops: if the condition never becomes False, you create an <strong>infinite loop</strong> that runs forever and locks up your program. Always make sure something inside the loop will eventually make the condition False. If you accidentally create an infinite loop, you can stop it by pressing Ctrl+C in the terminal.</p>`,
          examples: [
            {
              title: "Basic while Loop",
              code: `# Countdown
count = 5
while count > 0:
    print(count)
    count -= 1
print("Liftoff!")

# Sum until threshold
total = 0
num = 1
while total < 100:
    total += num
    num += 1
print(f"Sum: {total}, numbers used: 1 to {num - 1}")`,
              explanation: "The while loop checks its condition before each iteration. In the countdown, count decreases by 1 each time until it reaches 0, making 'count > 0' False. Always ensure your loop variable changes inside the loop, or you will get an infinite loop."
            },
            {
              title: "Input Validation Loop",
              code: `# Keep asking until valid input
while True:
    age_input = input("Enter your age (1-120): ")
    if age_input.isdigit():
        age = int(age_input)
        if 1 <= age <= 120:
            break
    print("Invalid input. Please try again.")

print(f"Your age: {age}")

# Password attempt limiter
correct_password = "secret123"
attempts = 3

while attempts > 0:
    password = input(f"Enter password ({attempts} attempts left): ")
    if password == correct_password:
        print("Access granted!")
        break
    attempts -= 1
    print("Wrong password.")
else:
    print("Account locked. Too many failed attempts.")`,
              explanation: "'while True' creates an intentional infinite loop that you exit with 'break'. This is a common pattern for input validation \u2014 keep asking until you get valid input. The password example shows 'else' on a loop: it runs only if the loop ended naturally (not via break), meaning all attempts were used."
            },
            {
              title: "break and continue",
              code: `# break: exit the loop immediately
print("Searching for first even number...")
for num in range(1, 100):
    if num % 2 == 0:
        print(f"Found it: {num}")
        break  # Stop as soon as we find one

# continue: skip current iteration
print("\\nOdd numbers from 1 to 10:")
for num in range(1, 11):
    if num % 2 == 0:
        continue  # Skip even numbers
    print(num, end=" ")

# Practical: skip blank lines
print("\\n\\nProcessing data:")
data = ["Alice", "", "Bob", "", "", "Charlie"]
for item in data:
    if not item:  # empty string is falsy
        continue
    print(f"Processing: {item}")`,
              explanation: "break immediately exits the entire loop. continue skips the rest of the current iteration and moves to the next one. Use break when you have found what you are looking for. Use continue when you want to skip certain items but keep looping."
            },
            {
              title: "Nested Loops",
              code: `# Multiplication table
for i in range(1, 6):
    for j in range(1, 6):
        print(f"{i*j:4d}", end="")
    print()  # New line after each row

# Pattern printing
rows = 5
for i in range(1, rows + 1):
    print("* " * i)

# Finding pairs
numbers = [1, 2, 3, 4]
print("\\nAll pairs:")
for a in numbers:
    for b in numbers:
        if a < b:
            print(f"({a}, {b})")`,
              explanation: "Nested loops mean a loop inside a loop. The inner loop runs completely for each iteration of the outer loop. For the multiplication table, the inner loop prints one row, then the outer loop moves to the next row. Be mindful: nested loops can be slow for large datasets because the total iterations multiply."
            }
          ],
          keyConcepts: [
            "while loops repeat as long as a condition is True",
            "while True creates an intentional infinite loop (exit with break)",
            "break exits the loop immediately",
            "continue skips to the next iteration",
            "Loop else clause runs only if the loop was NOT exited by break",
            "Nested loops: the inner loop runs fully for each outer iteration",
            "Always ensure while loops can eventually terminate"
          ],
          commonMistakes: [
            "Infinite loops: forgetting to update the condition variable inside the loop. Always change something that will eventually make the condition False.",
            "Using break when you mean continue (or vice versa): break exits entirely, continue skips one iteration.",
            "Off-by-one in while loops: 'while count < 10' runs for count 0-9 (10 times), not 1-10.",
            "Nesting too deeply: more than 2-3 levels of nested loops becomes hard to read and slow. Consider restructuring."
          ],
          funFact: "The loop 'else' clause is a feature unique to Python \u2014 no other mainstream language has it. It was inspired by Donald Knuth's 'loop and a half' pattern from his classic book 'The Art of Computer Programming'. Many Python experts consider it one of the language's most elegant but underused features!"
        }
      ]
    },

    // ==================== MODULE 5 ====================
    {
      id: 5,
      title: "Strings & String Methods",
      subtitle: "Manipulating Text Like a Pro",
      icon: "\ud83d\udcdd",
      lessons: [
        {
          title: "String Fundamentals & Indexing",
          content: `<p>Strings are one of the most commonly used data types in programming. Nearly every program deals with text in some way: usernames, messages, file contents, web pages, and more. In Python, a string is a <strong>sequence of characters</strong> \u2014 letters, numbers, symbols, and spaces wrapped in quotes. We have used strings since Module 1, but now it is time to master them.</p>
<p>Every character in a string has a position called an <strong>index</strong>. Indexing starts at 0, not 1. Think of it like apartment numbers in a building: the ground floor is 0, the first floor above ground is 1, and so on. In the string "Python", 'P' is at index 0, 'y' at index 1, 't' at index 2, and so on. Python also supports <strong>negative indexing</strong>: -1 refers to the last character, -2 to the second-to-last, and so forth. This is incredibly useful when you want to access the end of a string without knowing its length.</p>
<p><strong>Slicing</strong> lets you extract a portion of a string using the syntax <code>string[start:stop:step]</code>. It works like range(): start is inclusive, stop is exclusive, and step determines the direction and interval. For example, <code>"Hello"[1:4]</code> gives "ell" (characters at indices 1, 2, 3). If you omit start, it defaults to the beginning; if you omit stop, it goes to the end. A step of -1 reverses the string.</p>
<p>An important property of Python strings is that they are <strong>immutable</strong>: once created, you cannot change individual characters. You cannot write <code>name[0] = "J"</code>. Instead, you create a new string with the desired changes using slicing, concatenation, or string methods. This might seem limiting, but it actually prevents many bugs and allows Python to optimize memory usage behind the scenes.</p>`,
          examples: [
            {
              title: "String Indexing",
              code: `text = "Python"

# Positive indexing (left to right, starting at 0)
print(text[0])    # P
print(text[1])    # y
print(text[5])    # n

# Negative indexing (right to left, starting at -1)
print(text[-1])   # n (last character)
print(text[-2])   # o (second to last)
print(text[-6])   # P (same as text[0])

# Length of a string
print(len(text))  # 6`,
              explanation: "Indexing accesses individual characters by position. Positive indices count from the left (0, 1, 2...), negative indices count from the right (-1, -2, -3...). The len() function returns the total number of characters. Note: text[6] would cause an IndexError since valid indices are 0-5."
            },
            {
              title: "String Slicing",
              code: `text = "Hello, World!"

# Basic slicing [start:stop]
print(text[0:5])    # Hello
print(text[7:12])   # World

# Omitting start or stop
print(text[:5])     # Hello (from beginning)
print(text[7:])     # World! (to end)
print(text[:])      # Hello, World! (full copy)

# Using step
print(text[::2])    # Hlo ol! (every 2nd character)
print(text[::-1])   # !dlroW ,olleH (reversed!)

# Practical: extract parts of data
email = "user@example.com"
username = email[:email.index("@")]
domain = email[email.index("@")+1:]
print(f"User: {username}, Domain: {domain}")`,
              explanation: "Slicing extracts a substring. The pattern is [start:stop:step]. Omitting values uses defaults: start=0, stop=end, step=1. The most useful trick is [::-1] to reverse a string. The email example shows a practical use of combining index() with slicing."
            },
            {
              title: "Strings Are Immutable",
              code: `name = "Hello"

# This will NOT work:
# name[0] = "J"  # TypeError: strings don't support item assignment

# Instead, create a new string:
name = "J" + name[1:]
print(name)  # Jello

# Or use replace()
greeting = "Hello World"
new_greeting = greeting.replace("Hello", "Goodbye")
print(greeting)      # Hello World (unchanged!)
print(new_greeting)  # Goodbye World (new string)`,
              explanation: "You cannot modify a string in place. Any operation that seems to change a string actually creates a brand new string. The original is left unchanged. This is why greeting still says 'Hello World' after replace() \u2014 the method returns a new string without modifying the original."
            },
            {
              title: "Escape Characters & Raw Strings",
              code: `# Escape characters
print("Line 1\\nLine 2")       # \\n = newline
print("Column1\\tColumn2")     # \\t = tab
print("She said \\"hi\\"")      # \\" = literal quote
print("Backslash: \\\\")        # \\\\ = literal backslash

# Multi-line strings with triple quotes
poem = """Roses are red,
Violets are blue,
Python is awesome,
And so are you!"""
print(poem)

# Raw strings (ignore escape characters)
path = r"C:\\Users\\Documents\\file.txt"
print(path)  # C:\\Users\\Documents\\file.txt`,
              explanation: "Escape characters start with a backslash and represent special characters: \\n (newline), \\t (tab), \\\" (literal quote), \\\\ (literal backslash). Triple quotes let you write multi-line strings naturally. Raw strings (prefixed with r) treat backslashes literally, which is useful for file paths and regular expressions."
            }
          ],
          keyConcepts: [
            "String indexing starts at 0; negative indexing starts at -1 from the end",
            "Slicing syntax: string[start:stop:step]",
            "[::-1] reverses a string",
            "Strings are immutable \u2014 you cannot change individual characters in place",
            "len() returns the number of characters in a string",
            "Escape characters: \\n (newline), \\t (tab), \\\\ (backslash), \\\" (quote)",
            "Triple quotes allow multi-line strings",
            "Raw strings (r'...') treat backslashes literally"
          ],
          commonMistakes: [
            "IndexError: trying to access an index beyond the string length. 'Hello'[5] fails because valid indices are 0-4.",
            "Forgetting that indexing starts at 0: 'Hello'[1] is 'e', not 'H'.",
            "Trying to modify a string: name[0] = 'X' causes TypeError. Create a new string instead.",
            "Confusing slice stop value: 'Hello'[0:3] gives 'Hel' (3 characters), not 'Hell'. Stop is exclusive."
          ],
          funFact: "Python strings are stored internally as sequences of Unicode characters, which means Python can handle text in virtually any language \u2014 Chinese, Arabic, Hindi, emoji, and more. You can even have variable names in non-English scripts like \u03c0 = 3.14159, though this is not recommended for readability!"
        },
        {
          title: "Essential String Methods",
          content: `<p>Python strings come with a rich collection of built-in <strong>methods</strong> \u2014 functions that are attached to the string itself and perform useful operations. You call them using dot notation: <code>"hello".upper()</code>. Think of methods as tools in a toolbox, each designed for a specific task. Since strings are immutable, all string methods return a <em>new</em> string and leave the original unchanged.</p>
<p>The most commonly used string methods fall into a few categories. <strong>Case methods</strong> like <code>.upper()</code>, <code>.lower()</code>, <code>.title()</code>, and <code>.capitalize()</code> change the letter casing. <strong>Search methods</strong> like <code>.find()</code>, <code>.index()</code>, <code>.count()</code>, and <code>.startswith()</code>/<code>.endswith()</code> help you locate text within a string. <strong>Modification methods</strong> like <code>.strip()</code>, <code>.replace()</code>, <code>.split()</code>, and <code>.join()</code> transform the string in various ways.</p>
<p>Two of the most powerful string methods are <code>.split()</code> and <code>.join()</code>. The <code>.split()</code> method breaks a string into a list of smaller strings based on a separator (defaulting to whitespace). It is like tearing a piece of paper along dotted lines. The <code>.join()</code> method does the opposite: it takes a list of strings and glues them together with a separator. These two methods are workhorses for text processing.</p>
<p>String methods are chainable, meaning you can call multiple methods in sequence: <code>"  Hello World  ".strip().lower().replace("world", "python")</code> gives <code>"hello python"</code>. Each method is applied to the result of the previous one. This makes for very concise and expressive text processing, though you should keep chains short for readability.</p>`,
          examples: [
            {
              title: "Case Changing Methods",
              code: `text = "hello, World!"

print(text.upper())       # HELLO, WORLD!
print(text.lower())       # hello, world!
print(text.title())       # Hello, World!
print(text.capitalize())  # Hello, world!
print(text.swapcase())    # HELLO, wORLD!

# Practical: case-insensitive comparison
user_input = "YES"
if user_input.lower() == "yes":
    print("User agreed!")

# Check casing
print("HELLO".isupper())    # True
print("hello".islower())    # True
print("Hello World".istitle())  # True`,
              explanation: "Case methods are essential for normalizing user input. When comparing strings, always convert to a consistent case first using .lower() or .upper(). The .is*() methods check the casing without changing anything and return True or False."
            },
            {
              title: "Searching Within Strings",
              code: `sentence = "The quick brown fox jumps over the lazy dog"

# find() returns index of first occurrence (-1 if not found)
print(sentence.find("fox"))     # 16
print(sentence.find("cat"))     # -1

# index() is like find() but raises ValueError if not found
print(sentence.index("fox"))    # 16

# count() counts occurrences
print(sentence.count("the"))    # 1
print(sentence.lower().count("the"))  # 2

# startswith() and endswith()
filename = "report_2026.pdf"
print(filename.startswith("report"))  # True
print(filename.endswith(".pdf"))      # True
print(filename.endswith((".pdf", ".doc", ".txt")))  # True (tuple of options)

# Check string content
print("hello123".isalnum())    # True (letters and numbers only)
print("hello".isalpha())      # True (letters only)
print("12345".isdigit())      # True (digits only)`,
              explanation: "Search methods help you find and analyze text content. Use find() when not finding something is expected (it returns -1). Use index() when the text should always be there (it raises an error if missing). endswith() accepts a tuple to check multiple options at once."
            },
            {
              title: "split() and join()",
              code: `# split() breaks a string into a list
sentence = "Python is amazing"
words = sentence.split()
print(words)  # ['Python', 'is', 'amazing']

# Split on specific separator
csv_data = "Alice,30,Engineer"
fields = csv_data.split(",")
print(fields)  # ['Alice', '30', 'Engineer']

# join() combines a list into a string
words = ["I", "love", "Python"]
sentence = " ".join(words)
print(sentence)  # I love Python

dash_joined = "-".join(words)
print(dash_joined)  # I-love-Python

# Practical: clean and reformat data
messy = "  apple,  banana ,cherry  , date "
items = [item.strip() for item in messy.split(",")]
clean = ", ".join(items)
print(items)  # ['apple', 'banana', 'cherry', 'date']
print(clean)  # apple, banana, cherry, date`,
              explanation: "split() and join() are complementary operations. split() turns a string into a list, join() turns a list into a string. The separator is what split() looks for to cut, and what join() inserts between items. These are among the most frequently used string methods in real-world Python."
            },
            {
              title: "strip(), replace() & Method Chaining",
              code: `# strip() removes leading/trailing whitespace
messy = "   Hello World   "
print(f"'{messy.strip()}'")    # 'Hello World'
print(f"'{messy.lstrip()}'")   # 'Hello World   '
print(f"'{messy.rstrip()}'")   # '   Hello World'

# strip specific characters
data = "***IMPORTANT***"
print(data.strip("*"))   # IMPORTANT

# replace() substitutes substrings
text = "I like cats. Cats are great."
new_text = text.replace("cat", "dog")
print(new_text)  # I like dogs. dogs are great.

# Replace with limit
text = "aaa"
print(text.replace("a", "b", 2))  # bba (only first 2)

# Method chaining
raw = "   Hello, WORLD!   "
result = raw.strip().lower().replace("world", "python").title()
print(result)  # Hello, Python!`,
              explanation: "strip() is essential for cleaning user input (users often accidentally add spaces). replace() substitutes all occurrences by default, or a limited number if you pass a third argument. Method chaining calls multiple methods in sequence \u2014 each is applied to the result of the previous call."
            }
          ],
          keyConcepts: [
            ".upper(), .lower(), .title() change case and return new strings",
            ".find() returns -1 if not found; .index() raises an error",
            ".count() counts occurrences of a substring",
            ".startswith() and .endswith() check string boundaries",
            ".split() breaks a string into a list; .join() combines a list into a string",
            ".strip() removes leading and trailing whitespace",
            ".replace(old, new) substitutes substrings",
            "All string methods return new strings (strings are immutable)",
            "Methods can be chained: text.strip().lower().replace(...)"
          ],
          commonMistakes: [
            "Forgetting that string methods return NEW strings: text.upper() does not change text. You must do text = text.upper().",
            "Using .index() when the substring might not exist (use .find() instead to avoid crashes).",
            "Forgetting that .split() without arguments splits on ALL whitespace, not just single spaces.",
            "Calling .join() on the separator, not the list: use ', '.join(list) not list.join(', ')."
          ],
          funFact: "Python has over 40 built-in string methods. The .maketrans() and .translate() methods can perform complex character substitutions in a single pass, making them much faster than chaining multiple .replace() calls. They were originally designed for cipher and encoding tasks!"
        }
      ]
    },

    // ==================== MODULE 6 ====================
    {
      id: 6,
      title: "Lists, Tuples & Sets",
      subtitle: "Organizing Data in Collections",
      icon: "\ud83d\udccb",
      lessons: [
        {
          title: "Lists: Python's Workhorse Collection",
          content: `<p>So far, each variable has held a single value. But what if you need to store a list of 100 student names? Creating 100 separate variables would be impractical. <strong>Lists</strong> solve this by letting you store multiple values in a single variable. A list is an <strong>ordered, mutable collection</strong> that can hold items of any type. Think of it as a numbered shelf where you can place, rearrange, add, or remove items.</p>
<p>Lists are created using square brackets <code>[]</code> with items separated by commas: <code>fruits = ["apple", "banana", "cherry"]</code>. Like strings, lists support <strong>indexing</strong> (starting at 0) and <strong>slicing</strong>. But unlike strings, lists are <strong>mutable</strong> \u2014 you can change, add, and remove items after creation. This is a crucial difference. When you write <code>fruits[0] = "avocado"</code>, it actually changes the first item in the list.</p>
<p>Lists come with many powerful methods for modification. <code>.append()</code> adds an item to the end, <code>.insert()</code> adds at a specific position, <code>.remove()</code> deletes by value, <code>.pop()</code> deletes by index (and returns the removed item), and <code>.sort()</code> arranges items in order. These methods modify the list <em>in place</em> \u2014 they change the original list rather than creating a new one.</p>
<p>One of the most common operations is iterating over a list with a for loop. Since lists are sequences, you can write <code>for item in my_list:</code> to process each element. You can also check if an item exists with <code>in</code>: <code>if "apple" in fruits:</code>. Lists are arguably the most important data structure in Python \u2014 you will use them in virtually every program.</p>`,
          examples: [
            {
              title: "Creating and Accessing Lists",
              code: `# Creating lists
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [42, "hello", True, 3.14]  # Can mix types
empty = []

# Indexing (same as strings)
print(fruits[0])    # apple
print(fruits[-1])   # cherry

# Slicing
print(numbers[1:4])   # [2, 3, 4]
print(numbers[:3])    # [1, 2, 3]
print(numbers[::-1])  # [5, 4, 3, 2, 1]

# Length and membership
print(len(fruits))            # 3
print("banana" in fruits)     # True
print("mango" not in fruits)  # True`,
              explanation: "Lists use square brackets and support the same indexing and slicing as strings. Unlike strings, lists can hold any data type and even mix types (though mixing is uncommon in practice). len() gives the count of items, and 'in' checks for membership."
            },
            {
              title: "Modifying Lists",
              code: `colors = ["red", "green", "blue"]

# Change an item
colors[0] = "crimson"
print(colors)  # ['crimson', 'green', 'blue']

# Append (add to end)
colors.append("yellow")
print(colors)  # ['crimson', 'green', 'blue', 'yellow']

# Insert (add at specific index)
colors.insert(1, "orange")
print(colors)  # ['crimson', 'orange', 'green', 'blue', 'yellow']

# Remove (by value - removes first occurrence)
colors.remove("green")
print(colors)  # ['crimson', 'orange', 'blue', 'yellow']

# Pop (by index - returns the removed item)
removed = colors.pop(1)
print(f"Removed: {removed}")  # orange
print(colors)  # ['crimson', 'blue', 'yellow']

# Extend (add multiple items)
colors.extend(["purple", "pink"])
print(colors)  # ['crimson', 'blue', 'yellow', 'purple', 'pink']`,
              explanation: "Lists are mutable, meaning you can modify them after creation. append() adds one item to the end. insert() adds at a specific position. remove() deletes the first matching value. pop() removes by index and returns what was removed. extend() adds all items from another list."
            },
            {
              title: "Sorting, Reversing & Useful Functions",
              code: `numbers = [64, 25, 12, 22, 11]

# sort() modifies the list in place
numbers.sort()
print(numbers)  # [11, 12, 22, 25, 64]

numbers.sort(reverse=True)
print(numbers)  # [64, 25, 22, 12, 11]

# sorted() returns a NEW sorted list (original unchanged)
original = [3, 1, 4, 1, 5]
new_sorted = sorted(original)
print(original)    # [3, 1, 4, 1, 5] (unchanged)
print(new_sorted)  # [1, 1, 3, 4, 5]

# Useful built-in functions
nums = [10, 20, 30, 40, 50]
print(f"Sum: {sum(nums)}")     # 150
print(f"Min: {min(nums)}")     # 10
print(f"Max: {max(nums)}")     # 50
print(f"Count: {len(nums)}")   # 5

# Reverse
nums.reverse()
print(nums)  # [50, 40, 30, 20, 10]`,
              explanation: "sort() modifies the list permanently. sorted() creates a new sorted list, leaving the original intact. Use sort() when you no longer need the original order; use sorted() when you do. sum(), min(), max() are built-in functions that work with any iterable of numbers."
            },
            {
              title: "Iterating Over Lists",
              code: `students = ["Alice", "Bob", "Charlie", "Diana"]

# Basic iteration
for student in students:
    print(f"Hello, {student}!")

# With index using enumerate
for i, student in enumerate(students, start=1):
    print(f"{i}. {student}")

# Building a new list from an existing one
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = []
for num in numbers:
    if num % 2 == 0:
        evens.append(num)
print(f"Even numbers: {evens}")  # [2, 4, 6, 8, 10]

# Iterating over multiple lists with zip()
names = ["Alice", "Bob", "Charlie"]
scores = [95, 87, 92]
for name, score in zip(names, scores):
    print(f"{name}: {score}")`,
              explanation: "For loops are the natural way to process lists. enumerate() gives you an index alongside each value (start parameter changes the starting number). zip() pairs up elements from multiple lists, allowing you to iterate over them in parallel \u2014 it stops at the shortest list."
            }
          ],
          keyConcepts: [
            "Lists are ordered, mutable collections created with []",
            "Indexing and slicing work the same as strings",
            ".append() adds to end, .insert(i, item) adds at position i",
            ".remove(value) deletes first match, .pop(index) removes and returns",
            ".sort() modifies in place, sorted() returns a new list",
            "sum(), min(), max(), len() are useful built-in functions for lists",
            "enumerate() provides index + value, zip() pairs multiple lists",
            "Lists can contain any data type, including other lists"
          ],
          commonMistakes: [
            "Confusing .append() and .extend(): append([1,2]) adds [1,2] as a single nested element. extend([1,2]) adds 1 and 2 separately.",
            "Forgetting that .sort() returns None: sorted_list = my_list.sort() sets sorted_list to None. Use sorted() instead.",
            ".remove() only removes the FIRST occurrence. If you need to remove all, use a loop or list comprehension.",
            "Modifying a list while iterating over it causes unpredictable behavior. Iterate over a copy instead."
          ],
          funFact: "Python lists are actually implemented as dynamic arrays under the hood, not linked lists as the name might suggest. When you append to a list, Python over-allocates memory so that future appends are very fast \u2014 an O(1) amortized operation. This clever trick is why Python lists are so efficient for most use cases!"
        },
        {
          title: "Tuples & Sets",
          content: `<p>Python has two more collection types that you should know: <strong>tuples</strong> and <strong>sets</strong>. Each has specific strengths that make it the right choice for certain situations. A tuple is like a list but <strong>immutable</strong> \u2014 once created, you cannot change it. A set is an <strong>unordered collection of unique items</strong> \u2014 no duplicates allowed. Choosing the right collection type is an important skill in programming.</p>
<p>Tuples are created with parentheses <code>()</code> or even just commas: <code>coordinates = (10, 20)</code> or <code>coordinates = 10, 20</code>. Use tuples for data that should not change: GPS coordinates, RGB colors, database records, or function return values. Because tuples are immutable, Python can optimize them for speed and memory, and they can be used as dictionary keys (unlike lists). Think of tuples as read-only lists.</p>
<p>Sets are created with curly braces <code>{}</code> or <code>set()</code>. They automatically eliminate duplicates and have no defined order, so you cannot access items by index. Sets excel at membership testing (checking if an item exists is extremely fast), removing duplicates from a list, and performing mathematical set operations like union, intersection, and difference. Think of sets like a bag of unique marbles: you can check if a specific marble is in the bag, add or remove marbles, but there is no first or last position.</p>
<p>The choice between lists, tuples, and sets depends on your needs: use a <strong>list</strong> when you need an ordered, changeable collection; use a <strong>tuple</strong> when you need an ordered, unchangeable collection; use a <strong>set</strong> when you need unique items and fast lookups, and order does not matter.</p>`,
          examples: [
            {
              title: "Tuples: Immutable Sequences",
              code: `# Creating tuples
coordinates = (10, 20)
rgb_color = (255, 128, 0)
single = (42,)  # Note: single-element tuple needs a trailing comma
not_a_tuple = (42)  # This is just the integer 42!

# Indexing and slicing work like lists
print(coordinates[0])    # 10
print(rgb_color[-1])     # 0
print(rgb_color[0:2])    # (255, 128)

# Tuple unpacking
x, y = coordinates
print(f"x={x}, y={y}")  # x=10, y=20

r, g, b = rgb_color
print(f"RGB: {r}, {g}, {b}")

# Swapping variables (tuple unpacking trick)
a = 1
b = 2
a, b = b, a
print(f"a={a}, b={b}")  # a=2, b=1

# Tuples are immutable
# coordinates[0] = 99  # TypeError!`,
              explanation: "Tuples support indexing and slicing like lists, but cannot be modified. Tuple unpacking lets you extract values into separate variables in one line. The variable swap trick (a, b = b, a) is a famous Python idiom that uses tuple unpacking behind the scenes. A single-element tuple requires a trailing comma."
            },
            {
              title: "Sets: Unique Collections",
              code: `# Creating sets
fruits = {"apple", "banana", "cherry"}
numbers = {1, 2, 3, 4, 5}
empty_set = set()  # Note: {} creates an empty DICT, not a set!

# Duplicates are automatically removed
colors = {"red", "blue", "red", "green", "blue"}
print(colors)  # {'red', 'blue', 'green'} (no duplicates, order may vary)

# Remove duplicates from a list
names = ["Alice", "Bob", "Alice", "Charlie", "Bob"]
unique_names = list(set(names))
print(unique_names)  # ['Alice', 'Bob', 'Charlie'] (order may vary)

# Adding and removing
fruits.add("mango")
fruits.discard("banana")  # Safe remove (no error if missing)
print(fruits)

# Fast membership testing
big_set = set(range(1000000))
print(999999 in big_set)  # True (nearly instant!)`,
              explanation: "Sets automatically enforce uniqueness. Converting a list to a set and back is the fastest way to remove duplicates. Use .add() to insert and .discard() to remove (discard is safe: it does not error if the item is missing, unlike .remove()). Membership testing with 'in' is extremely fast for sets."
            },
            {
              title: "Set Operations",
              code: `python_devs = {"Alice", "Bob", "Charlie", "Diana"}
java_devs = {"Charlie", "Diana", "Eve", "Frank"}

# Union: everyone (in either set)
all_devs = python_devs | java_devs  # or python_devs.union(java_devs)
print(f"All: {all_devs}")

# Intersection: in BOTH sets
both = python_devs & java_devs  # or .intersection()
print(f"Both: {both}")  # {'Charlie', 'Diana'}

# Difference: in first but NOT second
only_python = python_devs - java_devs  # or .difference()
print(f"Only Python: {only_python}")  # {'Alice', 'Bob'}

# Symmetric difference: in one but NOT both
exclusive = python_devs ^ java_devs  # or .symmetric_difference()
print(f"Exclusive: {exclusive}")  # {'Alice', 'Bob', 'Eve', 'Frank'}

# Subset and superset checks
small = {1, 2}
big = {1, 2, 3, 4, 5}
print(small.issubset(big))    # True
print(big.issuperset(small))  # True`,
              explanation: "Set operations correspond to mathematical set theory. Union (|) combines all unique elements. Intersection (&) finds common elements. Difference (-) finds elements in one set but not the other. These operations are incredibly useful for data analysis and filtering."
            },
            {
              title: "Choosing the Right Collection",
              code: `# LIST: ordered, mutable, allows duplicates
shopping_list = ["milk", "eggs", "milk", "bread"]
shopping_list.append("cheese")
shopping_list[0] = "almond milk"
print(f"Shopping: {shopping_list}")

# TUPLE: ordered, immutable, allows duplicates
gps_location = (40.7128, -74.0060)  # Should never change
http_response = (200, "OK")
# gps_location[0] = 0  # Would fail!

# SET: unordered, mutable, NO duplicates
tags = {"python", "coding", "tutorial"}
tags.add("beginner")
# tags[0]  # Would fail! No indexing in sets

# Converting between types
my_list = [1, 2, 2, 3, 3, 3]
my_set = set(my_list)     # {1, 2, 3}
my_tuple = tuple(my_set)  # (1, 2, 3)
back_to_list = list(my_tuple)  # [1, 2, 3]
print(f"List: {my_list}")
print(f"Set: {my_set}")
print(f"Tuple: {my_tuple}")`,
              explanation: "Choose lists for ordered, changeable data. Choose tuples for ordered, fixed data (coordinates, config values, function return values). Choose sets for unique-only data and fast lookups. You can freely convert between all three types using list(), tuple(), and set()."
            }
          ],
          keyConcepts: [
            "Tuples are immutable ordered sequences created with ()",
            "A single-element tuple requires a trailing comma: (42,)",
            "Tuple unpacking assigns elements to variables: x, y = (1, 2)",
            "Sets are unordered collections of unique elements created with {} or set()",
            "Sets automatically remove duplicates",
            "Set operations: | (union), & (intersection), - (difference), ^ (symmetric difference)",
            "Sets have O(1) membership testing \u2014 much faster than lists for 'in' checks",
            "Choose list for ordered+mutable, tuple for ordered+immutable, set for unique+fast lookup"
          ],
          commonMistakes: [
            "Creating an empty set with {} gives you an empty dictionary, not a set. Use set() for an empty set.",
            "Forgetting the comma in a single-element tuple: (42) is just 42, but (42,) is a tuple.",
            "Trying to access set elements by index: sets have no order, so my_set[0] fails.",
            "Assuming set order is consistent: the order of elements in a set can vary between runs."
          ],
          funFact: "Python sets are implemented using hash tables, the same data structure used for dictionaries. This is why membership testing (x in my_set) is O(1) \u2014 nearly instant regardless of set size. A list with a million items needs to check each one; a set with a million items checks just once using a mathematical hash function!"
        }
      ]
    },

    // ==================== MODULE 7 ====================
    {
      id: 7,
      title: "Dictionaries",
      subtitle: "Key-Value Pairs for Structured Data",
      icon: "\ud83d\udcd6",
      lessons: [
        {
          title: "Creating & Accessing Dictionaries",
          content: `<p>Imagine looking up a word in a real dictionary: you search for the <strong>word</strong> (the key) and find its <strong>definition</strong> (the value). Python dictionaries work the same way \u2014 they store data as <strong>key-value pairs</strong>. Instead of accessing items by a numeric index like lists, you access them by a meaningful key. For example, instead of remembering that index 0 is the name and index 1 is the age, you can use <code>person["name"]</code> and <code>person["age"]</code>.</p>
<p>Dictionaries are created with curly braces <code>{}</code> and colons separating keys from values: <code>person = {"name": "Alice", "age": 30, "city": "New York"}</code>. Keys must be <strong>immutable</strong> types (strings, numbers, or tuples), and each key must be unique within the dictionary. Values can be anything: strings, numbers, lists, even other dictionaries. This makes dictionaries incredibly flexible for representing structured, real-world data.</p>
<p>Dictionaries are <strong>mutable</strong> \u2014 you can add, change, and remove key-value pairs after creation. To add or update a value, simply assign to a key: <code>person["email"] = "alice@email.com"</code>. If the key exists, the value is updated; if it does not, a new pair is created. This makes dictionaries very dynamic and easy to work with.</p>
<p>As of Python 3.7+, dictionaries maintain <strong>insertion order</strong> \u2014 items stay in the order they were added. This was not always the case in older Python versions. Dictionaries are one of the most important and heavily used data structures in Python. They are the backbone of JSON data, configuration files, APIs, databases, and countless other applications.</p>`,
          examples: [
            {
              title: "Creating and Accessing Dictionaries",
              code: `# Creating a dictionary
student = {
    "name": "Alice",
    "age": 20,
    "major": "Computer Science",
    "gpa": 3.8
}

# Accessing values by key
print(student["name"])   # Alice
print(student["gpa"])    # 3.8

# Using .get() (safe access - no error if key missing)
print(student.get("name"))       # Alice
print(student.get("phone"))      # None (no error!)
print(student.get("phone", "N/A"))  # N/A (custom default)

# Check if key exists
print("name" in student)    # True
print("phone" in student)   # False

# Length
print(len(student))  # 4`,
              explanation: "Square bracket access raises a KeyError if the key does not exist. The .get() method is safer: it returns None (or a default you specify) when the key is missing. Use 'in' to check if a key exists before accessing it. Always prefer .get() when you are not sure if a key is present."
            },
            {
              title: "Modifying Dictionaries",
              code: `car = {"brand": "Toyota", "model": "Camry", "year": 2020}

# Add new key-value pair
car["color"] = "blue"
print(car)

# Update existing value
car["year"] = 2024
print(car)

# Remove a key-value pair
del car["color"]
print(car)

# pop() removes and returns the value
model = car.pop("model")
print(f"Removed: {model}")
print(car)

# update() merges another dictionary
car.update({"model": "Corolla", "price": 25000})
print(car)

# Clear all items
# car.clear()  # Would empty the dictionary`,
              explanation: "Dictionaries are mutable. Assign to a key to add/update. Use del to remove a key-value pair. pop() removes and returns the value (useful when you need the value before removing it). update() merges another dictionary into the current one, overwriting any overlapping keys."
            },
            {
              title: "Iterating Over Dictionaries",
              code: `scores = {"Alice": 95, "Bob": 87, "Charlie": 92, "Diana": 78}

# Iterate over keys (default)
for name in scores:
    print(name)

# Iterate over values
for score in scores.values():
    print(score)

# Iterate over both keys and values
for name, score in scores.items():
    grade = "A" if score >= 90 else "B" if score >= 80 else "C"
    print(f"{name}: {score} ({grade})")

# Get all keys and values as lists
print(list(scores.keys()))    # ['Alice', 'Bob', 'Charlie', 'Diana']
print(list(scores.values()))  # [95, 87, 92, 78]

# Find highest score
best_student = max(scores, key=scores.get)
print(f"Best: {best_student} with {scores[best_student]}")`,
              explanation: "Iterating over a dictionary directly loops over its keys. Use .values() for just values, .items() for both keys and values as tuples. The .keys(), .values(), and .items() methods return view objects that can be converted to lists. The max() trick with key=scores.get finds the key with the highest value."
            },
            {
              title: "Nested Dictionaries & Practical Use",
              code: `# Nested dictionary (dictionary of dictionaries)
school = {
    "Alice": {"age": 20, "grade": "A", "courses": ["Math", "CS"]},
    "Bob": {"age": 21, "grade": "B", "courses": ["English", "History"]},
    "Charlie": {"age": 19, "grade": "A", "courses": ["CS", "Physics"]}
}

# Access nested values
print(school["Alice"]["grade"])       # A
print(school["Bob"]["courses"][0])    # English

# Add a new student
school["Diana"] = {"age": 22, "grade": "A", "courses": ["Math"]}

# Loop through nested data
for student, info in school.items():
    courses = ", ".join(info["courses"])
    print(f"{student} (age {info['age']}): Grade {info['grade']}, Courses: {courses}")

# Building a dictionary from user input
contacts = {}
for i in range(2):
    name = input("Name: ")
    phone = input("Phone: ")
    contacts[name] = phone
print(f"Contacts: {contacts}")`,
              explanation: "Dictionaries can contain other dictionaries, creating nested structures perfect for complex data. Access nested values by chaining keys: school['Alice']['courses'][0]. This pattern is very similar to how JSON data (used in web APIs and config files) is structured."
            }
          ],
          keyConcepts: [
            "Dictionaries store key-value pairs using {key: value} syntax",
            "Keys must be immutable (strings, numbers, tuples); values can be anything",
            "Access values with dict[key] or dict.get(key, default)",
            ".get() is safer than [] because it does not raise errors for missing keys",
            "'in' checks if a key exists in the dictionary",
            ".items() returns key-value pairs for iteration",
            ".keys() and .values() return keys and values separately",
            "Dictionaries are mutable and maintain insertion order (Python 3.7+)",
            "Dictionaries can be nested for complex data structures"
          ],
          commonMistakes: [
            "Using dict[key] for a missing key raises KeyError. Use dict.get(key) for safe access.",
            "Using a mutable type (like a list) as a dictionary key: {[1,2]: 'value'} fails. Use a tuple instead.",
            "Forgetting that 'in' checks KEYS, not values: 3 in {'a': 3} is False because 3 is a value, not a key.",
            "Accidentally overwriting a key: if you assign to an existing key, the old value is silently replaced."
          ],
          funFact: "Python dictionaries are implemented using hash tables, making key lookups nearly instant regardless of dictionary size. Looking up a value in a dictionary with 10 million entries takes the same time as looking up one with 10 entries! This O(1) performance is why dictionaries are used so heavily in Python's own internals."
        }
      ]
    },

    // ==================== MODULE 8 ====================
    {
      id: 8,
      title: "Functions",
      subtitle: "Building Reusable Blocks of Code",
      icon: "\u2699\ufe0f",
      lessons: [
        {
          title: "Defining & Calling Functions",
          content: `<p>As your programs grow, you will notice yourself writing the same code multiple times. <strong>Functions</strong> solve this by letting you wrap a block of code in a named, reusable package. Think of a function like a recipe: you define it once ("here is how to make pancakes"), and then you can use it whenever you want ("make pancakes!") without rewriting all the steps. Functions are one of the most fundamental concepts in programming.</p>
<p>You define a function using the <code>def</code> keyword, followed by the function name, parentheses, and a colon. The function body is indented, just like with if statements and loops. To use (or "call") the function, you write its name followed by parentheses: <code>greet()</code>. Functions can accept <strong>parameters</strong> \u2014 input values that customize what the function does \u2014 and return results using the <code>return</code> statement.</p>
<p>The difference between <strong>parameters</strong> and <strong>arguments</strong> trips up many beginners. Parameters are the variable names in the function definition (like placeholders). Arguments are the actual values you pass when calling the function. Think of it this way: a vending machine has a slot labeled "coin" (parameter), and you insert a quarter (argument). In practice, many programmers use these terms interchangeably.</p>
<p>Good functions follow the <strong>single responsibility principle</strong>: each function should do one thing and do it well. A function named <code>calculate_tax</code> should calculate tax and nothing else. Functions should also be reasonably short. If a function grows beyond 20-30 lines, it is usually a sign that it should be split into smaller functions. Well-designed functions make your code organized, reusable, and much easier to debug.</p>`,
          examples: [
            {
              title: "Basic Function Definition & Calling",
              code: `# Define a function
def greet():
    print("Hello! Welcome to Python!")
    print("Let's learn functions today.")

# Call the function (nothing happens until you call it!)
greet()
greet()  # Can call as many times as you want

# Function with parameters
def greet_person(name):
    print(f"Hello, {name}! Nice to meet you!")

greet_person("Alice")
greet_person("Bob")

# Function with multiple parameters
def introduce(name, age, city):
    print(f"My name is {name}, I'm {age}, from {city}.")

introduce("Alice", 25, "New York")`,
              explanation: "def defines a function but does not run it. The code inside only runs when you call the function by name. Parameters are like blanks to fill in \u2014 they make the function flexible. Each call can pass different arguments."
            },
            {
              title: "Return Values",
              code: `# Function that returns a value
def add(a, b):
    return a + b

result = add(3, 5)
print(f"3 + 5 = {result}")  # 8

# Using return value directly
print(f"10 + 20 = {add(10, 20)}")

# Function with conditional return
def get_letter_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    return "F"

grade = get_letter_grade(85)
print(f"Grade: {grade}")  # B

# Returning multiple values (as a tuple)
def get_min_max(numbers):
    return min(numbers), max(numbers)

lowest, highest = get_min_max([4, 1, 7, 2, 9])
print(f"Min: {lowest}, Max: {highest}")`,
              explanation: "return sends a value back to whoever called the function. Without return, a function returns None by default. A function can have multiple return statements (like in the grade example) \u2014 the first one reached executes and exits the function immediately. You can return multiple values as a tuple."
            },
            {
              title: "Default Parameters & Keyword Arguments",
              code: `# Default parameter values
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # Hello, Alice!
greet("Bob", "Good morning") # Good morning, Bob!

# Keyword arguments (named arguments)
def create_profile(name, age, city="Unknown", job="Student"):
    print(f"{name}, {age}, {city}, {job}")

create_profile("Alice", 25)
create_profile("Bob", 30, job="Engineer")  # Skip city, set job
create_profile(age=28, name="Charlie", city="London")  # Any order

# Mixing positional and keyword arguments
def order_drink(size, drink, extras="none"):
    print(f"{size} {drink} with {extras}")

order_drink("Large", "Coffee")
order_drink("Small", "Tea", extras="honey")`,
              explanation: "Default parameters have a value that is used when no argument is provided. Keyword arguments let you specify which parameter you are setting by name, allowing you to skip optional parameters or pass them in any order. Positional arguments must always come before keyword arguments."
            },
            {
              title: "Practical: Building a Mini Application",
              code: `def calculate_tip(bill_amount, tip_percentage=18):
    """Calculate tip and total for a restaurant bill."""
    tip = bill_amount * (tip_percentage / 100)
    total = bill_amount + tip
    return tip, total

def format_currency(amount):
    """Format a number as USD currency."""
    return f"\${amount:,.2f}"

def display_receipt(bill, tip_pct=18):
    """Display a formatted restaurant receipt."""
    tip, total = calculate_tip(bill, tip_pct)
    print("=" * 30)
    print("    RESTAURANT RECEIPT")
    print("=" * 30)
    print(f"  Bill:    {format_currency(bill)}")
    print(f"  Tip({tip_pct}%): {format_currency(tip)}")
    print(f"  Total:   {format_currency(total)}")
    print("=" * 30)

# Use the functions
display_receipt(85.50)
print()
display_receipt(120.00, tip_pct=20)`,
              explanation: "This example shows how functions work together. calculate_tip handles the math, format_currency handles formatting, and display_receipt orchestrates everything. Each function has a single, clear responsibility. The triple-quoted strings are docstrings \u2014 documentation that describes what each function does."
            }
          ],
          keyConcepts: [
            "def keyword defines a function; calling it by name executes it",
            "Parameters are placeholders in the definition; arguments are values passed in calls",
            "return sends a value back to the caller; without it, functions return None",
            "Functions can return multiple values as a tuple",
            "Default parameters provide fallback values: def f(x, y=10)",
            "Keyword arguments allow passing by name: f(y=5, x=3)",
            "Docstrings (triple-quoted strings) document what a function does",
            "Functions should follow the single responsibility principle"
          ],
          commonMistakes: [
            "Forgetting to call the function: writing greet instead of greet() just references the function object without running it.",
            "Mutable default arguments: def f(items=[]) shares the same list across calls. Use def f(items=None): items = items or [] instead.",
            "Forgetting to capture the return value: add(3, 5) calculates 8 but throws it away if you don't assign result = add(3, 5).",
            "Placing default parameters before non-default: def f(x=1, y) is invalid. Default params must come after positional ones."
          ],
          funFact: "In Python, functions are 'first-class objects' \u2014 meaning you can assign them to variables, store them in lists, and pass them as arguments to other functions. You can write my_func = print and then call my_func('hello'). This concept enables powerful patterns like callbacks and higher-order functions!"
        },
        {
          title: "Scope, Lambda & Advanced Function Concepts",
          content: `<p><strong>Scope</strong> refers to where a variable can be seen and used. When you create a variable inside a function, it is a <strong>local variable</strong> \u2014 it only exists inside that function and is destroyed when the function finishes. Variables created outside all functions are <strong>global variables</strong> \u2014 they can be read from anywhere. Think of scope like rooms in a house: a lamp in the bedroom (local) is only in the bedroom, but the sun shining through all windows (global) lights every room.</p>
<p>This separation is actually very helpful. It means you can use the same variable name in different functions without them interfering with each other. Each function is its own self-contained world. If you need to modify a global variable from inside a function, you can use the <code>global</code> keyword, but this is generally discouraged \u2014 it is better to pass values as parameters and return results.</p>
<p><strong>Lambda functions</strong> are tiny, anonymous (nameless) functions defined in a single line. They follow the syntax: <code>lambda parameters: expression</code>. They can only contain a single expression (not statements like if blocks or loops). Lambdas are most useful when you need a short throwaway function, often as an argument to functions like <code>sorted()</code>, <code>map()</code>, or <code>filter()</code>.</p>
<p>Python also supports <code>*args</code> and <code>**kwargs</code> for functions that need to accept a variable number of arguments. <code>*args</code> collects extra positional arguments into a tuple, and <code>**kwargs</code> collects extra keyword arguments into a dictionary. These are commonly used in functions that need to be flexible or that wrap other functions.</p>`,
          examples: [
            {
              title: "Variable Scope",
              code: `x = "I am global"

def my_function():
    y = "I am local"
    print(x)  # Can READ global variables
    print(y)  # Can access local variables

my_function()
print(x)    # Works: x is global
# print(y)  # ERROR: y is local to my_function

# Same name, different scopes
name = "Global Alice"

def change_name():
    name = "Local Bob"  # Creates a NEW local variable
    print(f"Inside: {name}")  # Local Bob

change_name()
print(f"Outside: {name}")  # Global Alice (unchanged!)

# Using global keyword (generally avoid this)
counter = 0

def increment():
    global counter
    counter += 1

increment()
increment()
print(f"Counter: {counter}")  # 2`,
              explanation: "Local variables exist only inside their function. If a local variable has the same name as a global one, the local version takes priority inside the function (this is called 'shadowing'). The global keyword lets you modify a global variable from inside a function, but it is usually better to use return values instead."
            },
            {
              title: "*args and **kwargs",
              code: `# *args: accept any number of positional arguments
def add_all(*args):
    print(f"Arguments received: {args}")  # It's a tuple!
    return sum(args)

print(add_all(1, 2, 3))        # 6
print(add_all(10, 20, 30, 40)) # 100

# **kwargs: accept any number of keyword arguments
def print_info(**kwargs):
    print(f"Info received: {kwargs}")  # It's a dictionary!
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

print_info(name="Alice", age=25, city="NYC")

# Combining regular params, *args, and **kwargs
def flexible(required, *args, **kwargs):
    print(f"Required: {required}")
    print(f"Extra positional: {args}")
    print(f"Extra keyword: {kwargs}")

flexible("hello", 1, 2, 3, color="blue", size="large")`,
              explanation: "*args collects extra positional arguments into a tuple. **kwargs collects extra keyword arguments into a dictionary. The names 'args' and 'kwargs' are conventions \u2014 the * and ** are what matter. When combining all three, the order must be: regular params, *args, **kwargs."
            },
            {
              title: "Lambda Functions",
              code: `# Regular function
def double(x):
    return x * 2

# Same thing as a lambda
double_lambda = lambda x: x * 2

print(double(5))         # 10
print(double_lambda(5))  # 10

# Lambdas shine as arguments to other functions
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# Sort by absolute difference from 5
sorted_nums = sorted(numbers, key=lambda x: abs(x - 5))
print(sorted_nums)  # [5, 4, 6, 3, 2, 9, 1, 1]

# Sort list of tuples by second element
students = [("Alice", 90), ("Bob", 75), ("Charlie", 95)]
by_score = sorted(students, key=lambda s: s[1], reverse=True)
print(by_score)  # [('Charlie', 95), ('Alice', 90), ('Bob', 75)]

# Filter with lambda
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6, 8, 10]

# Map with lambda
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]`,
              explanation: "Lambda functions are one-line, anonymous functions. They are most useful as quick arguments to functions like sorted(), filter(), and map(). The key parameter in sorted() takes a function that determines the sort order. filter() keeps items where the function returns True. map() applies the function to every item."
            },
            {
              title: "Functions as First-Class Objects",
              code: `# Assigning functions to variables
def shout(text):
    return text.upper() + "!!!"

def whisper(text):
    return text.lower() + "..."

# Choose function based on condition
mood = "happy"
speak = shout if mood == "happy" else whisper
print(speak("hello"))  # HELLO!!!

# Storing functions in a list
operations = [
    ("Add", lambda a, b: a + b),
    ("Subtract", lambda a, b: a - b),
    ("Multiply", lambda a, b: a * b),
]

x, y = 10, 3
for name, func in operations:
    print(f"{name}: {func(x, y)}")

# Function that returns a function
def create_multiplier(factor):
    def multiplier(number):
        return number * factor
    return multiplier

double = create_multiplier(2)
triple = create_multiplier(3)
print(double(5))   # 10
print(triple(5))   # 15`,
              explanation: "In Python, functions are objects like any other value. You can assign them to variables, store them in collections, and even return them from other functions. create_multiplier is a 'function factory' \u2014 it creates and returns customized functions. This pattern is called a closure and is a powerful concept in programming."
            }
          ],
          keyConcepts: [
            "Local variables exist only inside their function; global variables are accessible everywhere",
            "The global keyword allows modifying global variables inside functions (but avoid it when possible)",
            "*args collects extra positional arguments as a tuple",
            "**kwargs collects extra keyword arguments as a dictionary",
            "Lambda: lambda params: expression creates a small anonymous function",
            "Lambdas are commonly used with sorted(), map(), and filter()",
            "Functions are first-class objects \u2014 they can be assigned, stored, and passed around",
            "Closures: inner functions can remember variables from their enclosing scope"
          ],
          commonMistakes: [
            "Trying to modify a global variable without the global keyword: Python creates a local variable instead, which can lead to confusion.",
            "Overusing lambda: if a lambda is complex enough to be hard to read, use a regular def function instead.",
            "Confusing *args (tuple of positional args) with **kwargs (dict of keyword args).",
            "Assuming local and global variables with the same name are connected: they are completely independent."
          ],
          funFact: "The term 'lambda' comes from lambda calculus, a mathematical system invented by Alonzo Church in the 1930s. Lambda calculus is the theoretical foundation of functional programming and proves that any computation can be expressed using only anonymous functions. Python's lambda is a simplified version of this powerful concept!"
        }
      ]
    },

    // ==================== MODULE 9 ====================
    {
      id: 9,
      title: "File I/O & Error Handling",
      subtitle: "Working with Files and Handling Exceptions",
      icon: "\ud83d\udcc1",
      lessons: [
        {
          title: "Reading & Writing Files",
          content: `<p>So far, all the data in our programs disappears when the program ends. <strong>File I/O</strong> (Input/Output) lets your programs save data permanently and read data from files. This is how real applications work: a text editor reads and writes documents, a game saves and loads progress, and a web app stores data in database files. Learning file I/O is a major step toward building practical applications.</p>
<p>Python uses the <code>open()</code> function to work with files. It takes a filename and a <strong>mode</strong>: <code>"r"</code> for reading (default), <code>"w"</code> for writing (creates new or overwrites existing), <code>"a"</code> for appending (adds to the end), and <code>"x"</code> for exclusive creation (fails if the file already exists). After opening a file, you must remember to close it with <code>.close()</code> to free up system resources.</p>
<p>The best practice for file handling is using the <code>with</code> statement (called a <strong>context manager</strong>). When you write <code>with open("file.txt") as f:</code>, Python automatically closes the file when the indented block ends, even if an error occurs. This prevents resource leaks and is the recommended way to work with files. Think of it like checking out a library book: the <code>with</code> statement guarantees you return it when you are done.</p>
<p>When reading files, you have several options: <code>.read()</code> reads the entire file as one string, <code>.readline()</code> reads one line at a time, and <code>.readlines()</code> reads all lines into a list. For large files, iterating line by line with a for loop is the most memory-efficient approach because it processes one line at a time instead of loading the entire file into memory.</p>`,
          examples: [
            {
              title: "Writing to Files",
              code: `# Writing with 'with' statement (recommended)
with open("greeting.txt", "w") as file:
    file.write("Hello, World!\\n")
    file.write("Welcome to Python file I/O.\\n")
    file.write("This is line 3.\\n")

# Appending to an existing file
with open("greeting.txt", "a") as file:
    file.write("This line was appended!\\n")

# Writing multiple lines at once
lines = ["Line A\\n", "Line B\\n", "Line C\\n"]
with open("output.txt", "w") as file:
    file.writelines(lines)

# Writing formatted data
students = [("Alice", 95), ("Bob", 87), ("Charlie", 92)]
with open("scores.txt", "w") as file:
    file.write("Student Scores\\n")
    file.write("=" * 20 + "\\n")
    for name, score in students:
        file.write(f"{name}: {score}\\n")

print("Files written successfully!")`,
              explanation: "Mode 'w' creates a new file or overwrites an existing one (be careful \u2014 existing content is erased!). Mode 'a' appends to the end without erasing. The 'with' statement ensures the file is properly closed when done. Always add \\n for newlines since write() does not add them automatically (unlike print())."
            },
            {
              title: "Reading from Files",
              code: `# Read entire file as one string
with open("greeting.txt", "r") as file:
    content = file.read()
    print(content)

# Read all lines into a list
with open("greeting.txt", "r") as file:
    lines = file.readlines()
    print(lines)  # ['Hello, World!\\n', 'Welcome...\\n', ...]

# Read line by line (best for large files)
with open("greeting.txt", "r") as file:
    for line in file:
        print(line.strip())  # strip() removes trailing \\n

# Read first N lines only
with open("greeting.txt", "r") as file:
    for i, line in enumerate(file):
        if i >= 2:
            break
        print(f"Line {i+1}: {line.strip()}")`,
              explanation: "read() loads everything at once (fine for small files). readlines() gives a list where each element is a line (including the \\n). The for loop approach is best for large files because it reads one line at a time, using minimal memory. Use .strip() to remove the trailing newline character from each line."
            },
            {
              title: "Working with CSV-style Data",
              code: `# Create a simple CSV file
with open("students.csv", "w") as file:
    file.write("name,age,grade\\n")
    file.write("Alice,20,A\\n")
    file.write("Bob,21,B\\n")
    file.write("Charlie,19,A\\n")

# Read and parse CSV data
students = []
with open("students.csv", "r") as file:
    header = file.readline().strip().split(",")
    print(f"Columns: {header}")

    for line in file:
        name, age, grade = line.strip().split(",")
        students.append({
            "name": name,
            "age": int(age),
            "grade": grade
        })

# Use the parsed data
for student in students:
    print(f"{student['name']} (age {student['age']}): Grade {student['grade']}")

# Calculate average age
avg_age = sum(s["age"] for s in students) / len(students)
print(f"\\nAverage age: {avg_age:.1f}")`,
              explanation: "This demonstrates a real-world pattern: reading structured data from a file, parsing each line by splitting on a delimiter (comma), converting types as needed, and building a list of dictionaries for easy data access. For production code, Python's built-in csv module handles edge cases better."
            }
          ],
          keyConcepts: [
            "open(filename, mode) opens a file; modes: 'r' (read), 'w' (write), 'a' (append)",
            "'with open(...) as f:' automatically closes the file when done",
            ".write() writes text; .writelines() writes a list of strings",
            ".read() reads all content; .readline() reads one line; .readlines() reads all lines as a list",
            "Iterating over a file with 'for line in file:' is memory-efficient",
            "Mode 'w' overwrites existing content; mode 'a' preserves it and appends",
            "Use .strip() when reading lines to remove trailing newline characters",
            "Always use the 'with' statement for file operations"
          ],
          commonMistakes: [
            "Forgetting to close a file: always use the 'with' statement to prevent this.",
            "Using mode 'w' when you meant 'a': 'w' erases the entire file before writing. Use 'a' to add to existing content.",
            "Forgetting \\n at the end of each line when writing: write() does not add newlines automatically.",
            "Trying to read a file that does not exist: causes FileNotFoundError. Check with os.path.exists() first."
          ],
          funFact: "The 'with' statement was introduced in Python 2.5 (2006) through PEP 343. It is actually a general-purpose context manager pattern that works with many resources beyond files \u2014 database connections, network sockets, thread locks, and more. Any object that implements __enter__ and __exit__ methods can be used with 'with'!"
        },
        {
          title: "Error Handling with try/except",
          content: `<p>Errors are inevitable in programming. Users type letters when you expect numbers, files go missing, networks disconnect, and calculations divide by zero. Instead of letting your program crash, Python lets you <strong>handle errors gracefully</strong> using <code>try</code> and <code>except</code> blocks. Think of it like a safety net for a tightrope walker \u2014 if something goes wrong, the program catches the error and responds sensibly instead of crashing.</p>
<p>The basic pattern is: put risky code in a <code>try</code> block, and put error-handling code in an <code>except</code> block. If an error occurs in the try block, Python immediately jumps to the matching except block instead of crashing. You can catch specific error types (like <code>ValueError</code>, <code>FileNotFoundError</code>, <code>ZeroDivisionError</code>) or use a general <code>except</code> as a catch-all. Catching specific errors is better because it lets you provide meaningful error messages.</p>
<p>Python also provides <code>else</code> and <code>finally</code> clauses for try blocks. The <code>else</code> block runs only if NO error occurred in the try block \u2014 it is a good place for code that should only run on success. The <code>finally</code> block runs NO MATTER WHAT, whether an error occurred or not. It is typically used for cleanup tasks like closing files or database connections. The full pattern is: try \u2192 except (if error) OR else (if no error) \u2192 finally (always).</p>
<p>Good error handling follows a principle: <strong>be specific about what you catch</strong>. Catching every possible error with a bare <code>except:</code> is bad practice because it can hide bugs. If you expect a ValueError from user input, catch ValueError specifically. Let unexpected errors crash the program so you can find and fix them. Error handling should make your program more robust, not mask problems.</p>`,
          examples: [
            {
              title: "Basic try/except",
              code: `# Without error handling (crashes!)
# number = int(input("Enter a number: "))  # Crashes if user types "abc"

# With error handling (graceful!)
try:
    number = int(input("Enter a number: "))
    print(f"Your number is {number}")
except ValueError:
    print("That's not a valid number!")

# Catching multiple specific errors
try:
    x = int(input("Enter numerator: "))
    y = int(input("Enter denominator: "))
    result = x / y
    print(f"Result: {result}")
except ValueError:
    print("Please enter valid numbers!")
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catching multiple errors in one line
try:
    value = int("hello")
except (ValueError, TypeError) as e:
    print(f"Error occurred: {e}")`,
              explanation: "try/except prevents crashes from expected errors. Always catch specific exception types so you can provide helpful error messages. The 'as e' syntax captures the error object, letting you print the actual error message. Multiple except blocks handle different errors differently."
            },
            {
              title: "else and finally",
              code: `# Full try/except/else/finally
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: Division by zero!")
        return None
    except TypeError:
        print("Error: Invalid types for division!")
        return None
    else:
        # Only runs if NO exception occurred
        print(f"Division successful: {a}/{b} = {result}")
        return result
    finally:
        # ALWAYS runs, no matter what
        print("Division operation complete.\\n")

divide(10, 3)    # Success path
divide(10, 0)    # ZeroDivisionError path
divide("a", 2)   # TypeError path`,
              explanation: "else runs only on success (no error). finally runs no matter what \u2014 even if a return statement is reached or an unhandled exception occurs. Use else for success-only logic and finally for mandatory cleanup. The flow is: try -> except (on error) OR else (on success) -> finally (always)."
            },
            {
              title: "Input Validation Loop with Error Handling",
              code: `# Robust input with retry
def get_integer(prompt, min_val=None, max_val=None):
    """Keep asking until user enters a valid integer."""
    while True:
        try:
            value = int(input(prompt))
            if min_val is not None and value < min_val:
                print(f"Must be at least {min_val}.")
                continue
            if max_val is not None and value > max_val:
                print(f"Must be at most {max_val}.")
                continue
            return value
        except ValueError:
            print("Please enter a valid whole number.")

# Use it
age = get_integer("Enter your age: ", min_val=0, max_val=150)
print(f"Your age: {age}")

score = get_integer("Enter score (0-100): ", 0, 100)
print(f"Your score: {score}")`,
              explanation: "This reusable function combines a while loop with try/except to keep asking until the user provides valid input. It handles both non-numeric input (ValueError) and out-of-range values. This is a pattern you will use constantly in interactive programs."
            },
            {
              title: "File Error Handling & Raising Exceptions",
              code: `import os

# Safe file reading
def read_file_safe(filename):
    """Safely read a file, handling common errors."""
    try:
        with open(filename, "r") as file:
            return file.read()
    except FileNotFoundError:
        print(f"Error: '{filename}' not found.")
        return None
    except PermissionError:
        print(f"Error: No permission to read '{filename}'.")
        return None

content = read_file_safe("greeting.txt")
if content:
    print(content)

content = read_file_safe("nonexistent.txt")  # Handles gracefully

# Raising your own exceptions
def set_age(age):
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    if age < 0 or age > 150:
        raise ValueError(f"Age must be 0-150, got {age}")
    return age

try:
    set_age(25)    # Works fine
    set_age(-5)    # Raises ValueError
except ValueError as e:
    print(f"Invalid age: {e}")`,
              explanation: "Real-world file operations should always include error handling. The 'raise' keyword lets you create your own errors when invalid conditions are detected. This is how you enforce rules in your functions \u2014 if someone passes bad data, raise a clear exception explaining what went wrong."
            }
          ],
          keyConcepts: [
            "try/except catches errors and prevents program crashes",
            "Catch specific exceptions (ValueError, TypeError, etc.) rather than bare except",
            "'as e' captures the exception object for inspection",
            "else runs only when no exception occurred in try",
            "finally ALWAYS runs, regardless of exceptions (useful for cleanup)",
            "raise creates custom exceptions to enforce validation rules",
            "Combine while loops with try/except for robust input validation",
            "Common exceptions: ValueError, TypeError, ZeroDivisionError, FileNotFoundError, KeyError, IndexError"
          ],
          commonMistakes: [
            "Using bare 'except:' without specifying the error type: this catches ALL errors, including KeyboardInterrupt and SystemExit, which makes debugging very difficult.",
            "Putting too much code in the try block: only put the specific risky operation inside try, not your entire program.",
            "Silently swallowing errors: 'except: pass' hides problems. At minimum, log the error.",
            "Raising generic Exception instead of specific types: raise ValueError('bad input') is better than raise Exception('bad input')."
          ],
          funFact: "Python's exception hierarchy has over 60 built-in exception types organized in a class hierarchy. At the top is BaseException, which has four children: SystemExit, KeyboardInterrupt, GeneratorExit, and Exception. All the errors you typically catch (ValueError, TypeError, etc.) inherit from Exception. This is why catching Exception is safer than catching BaseException!"
        }
      ]
    },

    // ==================== MODULE 10 ====================
    {
      id: 10,
      title: "Object-Oriented Programming",
      subtitle: "Classes, Objects, Inheritance & Polymorphism",
      icon: "\ud83c\udfed",
      lessons: [
        {
          title: "Classes & Objects: The Basics",
          content: `<p><strong>Object-Oriented Programming (OOP)</strong> is a way of organizing code around "objects" \u2014 things that have both data (attributes) and behaviors (methods). You have actually been using objects all along: strings have data (the text) and methods (.upper(), .split()); lists have data (the items) and methods (.append(), .sort()). Now you will learn to create your own custom objects.</p>
<p>A <strong>class</strong> is a blueprint or template for creating objects, like an architectural plan for a house. The plan itself is not a house, but you can use it to build many houses (objects), each with different specifics (colors, sizes). When you create an object from a class, it is called <strong>instantiation</strong>, and the object is an <strong>instance</strong> of that class. For example, <code>Dog</code> is a class (blueprint), but <code>my_dog = Dog("Buddy", 3)</code> creates an instance (a specific dog).</p>
<p>The <code>__init__</code> method (pronounced "dunder init") is a special method that runs automatically when a new object is created. It sets up the object's initial state by defining its <strong>attributes</strong>. The first parameter of every method in a class is <code>self</code>, which refers to the specific instance the method is being called on. When you write <code>self.name = name</code>, you are storing data on that particular object.</p>
<p>Think of classes like cookie cutters and objects like cookies. The cookie cutter (class) defines the shape, but each cookie (object) can have different decorations (attribute values). All cookies from the same cutter share the same structure but are independent \u2014 adding frosting to one cookie does not affect the others.</p>`,
          examples: [
            {
              title: "Defining a Class & Creating Objects",
              code: `class Dog:
    # __init__ runs when creating a new Dog
    def __init__(self, name, age, breed):
        self.name = name      # Instance attribute
        self.age = age
        self.breed = breed

    # Method (function belonging to the class)
    def bark(self):
        print(f"{self.name} says: Woof!")

    def describe(self):
        print(f"{self.name} is a {self.age}-year-old {self.breed}.")

    def birthday(self):
        self.age += 1
        print(f"Happy birthday, {self.name}! Now {self.age} years old.")

# Create instances (objects)
dog1 = Dog("Buddy", 3, "Golden Retriever")
dog2 = Dog("Max", 1, "Poodle")

# Use methods
dog1.bark()        # Buddy says: Woof!
dog2.describe()    # Max is a 1-year-old Poodle.
dog1.birthday()    # Happy birthday, Buddy! Now 4 years old.

# Access attributes directly
print(f"{dog1.name} is {dog1.age}")  # Buddy is 4`,
              explanation: "__init__ is the constructor \u2014 it runs automatically when you write Dog(...). 'self' refers to the specific object being created or used. Each instance has its own copy of the attributes, so changing dog1's age does not affect dog2's age. Methods are functions defined inside the class that operate on the object's data."
            },
            {
              title: "Class vs Instance Attributes & __str__",
              code: `class Student:
    # Class attribute (shared by ALL instances)
    school = "Python Academy"
    student_count = 0

    def __init__(self, name, grade):
        self.name = name          # Instance attribute (unique per object)
        self.grade = grade
        Student.student_count += 1

    def __str__(self):
        """Controls what print() displays for this object."""
        return f"Student({self.name}, Grade: {self.grade})"

    def __repr__(self):
        """Controls technical representation."""
        return f"Student('{self.name}', '{self.grade}')"

    def is_passing(self):
        return self.grade >= 60

# Create students
s1 = Student("Alice", 92)
s2 = Student("Bob", 55)
s3 = Student("Charlie", 78)

# __str__ controls print output
print(s1)  # Student(Alice, Grade: 92)

# Class attribute shared by all
print(f"School: {s1.school}")  # Python Academy
print(f"Total students: {Student.student_count}")  # 3

# Instance method
print(f"{s1.name} passing: {s1.is_passing()}")  # True
print(f"{s2.name} passing: {s2.is_passing()}")  # False`,
              explanation: "Class attributes are defined outside __init__ and are shared by all instances (like a school name). Instance attributes are defined in __init__ with self and are unique to each object. __str__ defines how print() displays your object. Without it, print(s1) would show something unhelpful like '<__main__.Student object at 0x...>'."
            },
            {
              title: "Encapsulation: Controlling Access",
              code: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance  # Convention: _ means "treat as private"

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive!")
            return
        self._balance += amount
        print(f"Deposited \${amount:.2f}. New balance: \${self._balance:.2f}")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive!")
            return
        if amount > self._balance:
            print(f"Insufficient funds! Balance: \${self._balance:.2f}")
            return
        self._balance -= amount
        print(f"Withdrew \${amount:.2f}. New balance: \${self._balance:.2f}")

    def get_balance(self):
        return self._balance

    def __str__(self):
        return f"Account({self.owner}: \${self._balance:.2f})"

# Usage
account = BankAccount("Alice", 1000)
print(account)            # Account(Alice: $1000.00)
account.deposit(500)      # Deposited $500.00. New balance: $1500.00
account.withdraw(200)     # Withdrew $200.00. New balance: $1300.00
account.withdraw(2000)    # Insufficient funds! Balance: $1300.00
account.deposit(-50)      # Deposit amount must be positive!`,
              explanation: "Encapsulation means protecting data by controlling how it is accessed and modified. The underscore prefix (_balance) signals that the attribute should not be accessed directly from outside the class. Instead, users interact through methods (deposit, withdraw) that include validation logic. This prevents invalid states like negative balances."
            }
          ],
          keyConcepts: [
            "A class is a blueprint; an object (instance) is created from that blueprint",
            "__init__ is the constructor that initializes object attributes",
            "'self' refers to the current instance of the class",
            "Instance attributes (self.x) are unique to each object",
            "Class attributes are shared by all instances",
            "Methods are functions defined inside a class",
            "__str__ controls how print() displays the object",
            "Encapsulation: use methods to control access to data, prefix private attributes with _"
          ],
          commonMistakes: [
            "Forgetting 'self' as the first parameter: def bark(): should be def bark(self):. Without it, Python cannot access the object's attributes.",
            "Forgetting 'self.' when accessing attributes: writing name instead of self.name inside a method refers to a local variable, not the object's attribute.",
            "Modifying class attributes through instances: self.class_attr = x creates a new instance attribute instead of modifying the class attribute. Use ClassName.class_attr = x.",
            "Not defining __str__: without it, print(object) shows an unhelpful memory address."
          ],
          funFact: "Everything in Python is an object \u2014 literally everything. Numbers, strings, functions, classes, modules, even None. When you type 5, Python creates an integer object. You can verify this: type(5) returns <class 'int'>, and 5 has methods like (5).bit_length(). Python's motto could be 'objects all the way down'!"
        },
        {
          title: "Inheritance & Polymorphism",
          content: `<p><strong>Inheritance</strong> lets one class (the <strong>child</strong> or subclass) inherit attributes and methods from another class (the <strong>parent</strong> or superclass). This is like how children inherit traits from their parents \u2014 they share common characteristics but can also have their own unique features. Inheritance promotes code reuse: instead of copying the same code into multiple classes, you define it once in a parent class and let children inherit it.</p>
<p>In Python, you specify inheritance by putting the parent class in parentheses: <code>class Dog(Animal):</code>. The child class automatically gets all the methods and attributes of the parent. It can also <strong>override</strong> (replace) parent methods with its own versions, and add entirely new methods and attributes. The <code>super()</code> function lets a child call the parent's methods, which is commonly used in <code>__init__</code> to initialize inherited attributes.</p>
<p><strong>Polymorphism</strong> means "many forms" \u2014 it allows different classes to be used through the same interface. If both <code>Dog</code> and <code>Cat</code> have a <code>speak()</code> method, you can call <code>speak()</code> on any animal without knowing its specific type. The correct version runs automatically based on what type of object it is. This lets you write flexible code that works with any object that has the expected methods.</p>
<p>Together, inheritance and polymorphism enable you to build organized hierarchies of related classes. A <code>Vehicle</code> base class might have <code>Car</code>, <code>Truck</code>, and <code>Motorcycle</code> subclasses. They all share common vehicle behavior (start, stop) but each has unique characteristics (trunk capacity, payload, lean angle). This mirrors how we naturally categorize things in the real world.</p>`,
          examples: [
            {
              title: "Basic Inheritance",
              code: `class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species

    def __str__(self):
        return f"{self.name} ({self.species})"

    def make_sound(self):
        print(f"{self.name} makes a sound.")

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "Canine")  # Call parent's __init__
        self.breed = breed

    def make_sound(self):  # Override parent method
        print(f"{self.name} says: Woof!")

    def fetch(self):  # New method (only for Dogs)
        print(f"{self.name} fetches the ball!")

class Cat(Animal):
    def __init__(self, name, indoor=True):
        super().__init__(name, "Feline")
        self.indoor = indoor

    def make_sound(self):
        print(f"{self.name} says: Meow!")

# Usage
dog = Dog("Buddy", "Golden Retriever")
cat = Cat("Whiskers", indoor=False)

print(dog)           # Buddy (Canine) - inherited __str__
dog.make_sound()     # Buddy says: Woof! - overridden method
dog.fetch()          # Buddy fetches the ball! - Dog-only method
cat.make_sound()     # Whiskers says: Meow!

# isinstance checks
print(isinstance(dog, Dog))    # True
print(isinstance(dog, Animal)) # True (Dog IS an Animal)`,
              explanation: "Dog and Cat inherit from Animal, gaining its __init__ and __str__. super().__init__() calls the parent's constructor to set up inherited attributes. Each child overrides make_sound() with its own version. Dog adds a new method (fetch) that only dogs have. isinstance() confirms that a Dog is both a Dog and an Animal."
            },
            {
              title: "Polymorphism in Action",
              code: `class Shape:
    def area(self):
        raise NotImplementedError("Subclasses must implement area()")

    def describe(self):
        print(f"{self.__class__.__name__}: area = {self.area():.2f}")

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height

# Polymorphism: treating different shapes the same way
shapes = [Circle(5), Rectangle(4, 6), Triangle(3, 8)]

total_area = 0
for shape in shapes:
    shape.describe()  # Each calls its OWN area() method
    total_area += shape.area()

print(f"\\nTotal area: {total_area:.2f}")`,
              explanation: "Polymorphism means each shape has its own area() method, but we can call it the same way on any shape. The loop does not need to know whether it is processing a Circle, Rectangle, or Triangle \u2014 it just calls .area() and the correct version runs automatically. This makes the code extensible: adding a new shape type requires no changes to the loop."
            },
            {
              title: "Practical OOP: Building a Todo App",
              code: `class Task:
    def __init__(self, title, priority="medium"):
        self.title = title
        self.priority = priority
        self.completed = False

    def complete(self):
        self.completed = True

    def __str__(self):
        status = "x" if self.completed else " "
        return f"[{status}] {self.title} ({self.priority})"

class TodoList:
    def __init__(self, name):
        self.name = name
        self.tasks = []

    def add_task(self, title, priority="medium"):
        task = Task(title, priority)
        self.tasks.append(task)
        print(f"Added: {task.title}")

    def complete_task(self, index):
        if 0 <= index < len(self.tasks):
            self.tasks[index].complete()
            print(f"Completed: {self.tasks[index].title}")
        else:
            print("Invalid task number.")

    def show(self):
        print(f"\\n=== {self.name} ===")
        if not self.tasks:
            print("  No tasks yet!")
            return
        for i, task in enumerate(self.tasks):
            print(f"  {i+1}. {task}")
        done = sum(1 for t in self.tasks if t.completed)
        print(f"\\n  Progress: {done}/{len(self.tasks)} complete")

# Use the Todo app
my_list = TodoList("My Weekly Tasks")
my_list.add_task("Learn Python OOP", "high")
my_list.add_task("Buy groceries", "medium")
my_list.add_task("Clean the house", "low")
my_list.show()

my_list.complete_task(0)
my_list.show()`,
              explanation: "This practical example uses two classes: Task (individual items) and TodoList (manages a collection of tasks). TodoList creates and manages Task objects, demonstrating how classes work together. This pattern of one class managing a collection of other class instances is called composition and is extremely common in real software."
            }
          ],
          keyConcepts: [
            "Inheritance: class Child(Parent) inherits attributes and methods",
            "super().__init__() calls the parent class constructor",
            "Method overriding: child classes can replace parent methods",
            "Polymorphism: different classes respond to the same method call differently",
            "isinstance(obj, Class) checks if an object is an instance of a class",
            "NotImplementedError signals that subclasses must implement a method",
            "Composition: one class uses instances of other classes as attributes",
            "Design classes to mirror real-world relationships"
          ],
          commonMistakes: [
            "Forgetting super().__init__() in child class: parent attributes will not be initialized, leading to AttributeError.",
            "Overriding a method but changing its parameter signature: child methods should accept the same parameters as the parent to maintain compatibility.",
            "Creating overly deep inheritance hierarchies: more than 2-3 levels deep becomes hard to maintain. Prefer composition over deep inheritance.",
            "Confusing class attributes and instance attributes in inheritance: class attributes are shared across the entire hierarchy."
          ],
          funFact: "Python supports multiple inheritance \u2014 a class can inherit from more than one parent: class FlyingFish(Fish, Bird). This is rare in programming languages (Java and C# do not allow it). Python resolves conflicts using the 'Method Resolution Order' (MRO), following an algorithm called C3 linearization. You can see it with ClassName.__mro__."
        }
      ]
    },

    // ==================== MODULE 11 ====================
    {
      id: 11,
      title: "Modules, Packages & Standard Library",
      subtitle: "Importing, Organizing Code & Using Built-in Tools",
      icon: "📦",
      lessons: [
        {
          title: "Importing Modules",
          content: `<p>As your programs grow larger, putting all your code into a single file becomes messy and hard to manage — like trying to fit an entire library of books onto one shelf. <strong>Modules</strong> solve this problem by letting you split code into separate files that you can <strong>import</strong> and reuse wherever you need them. A module is simply a <code>.py</code> file containing Python code — functions, classes, variables, or any runnable statements.</p>
<p>Python provides several ways to import modules. The simplest is <code>import module_name</code>, which brings in the entire module. You then access its contents with dot notation: <code>module_name.function()</code>. If you only need specific items, you can use <code>from module_name import item</code>, which lets you use the item directly without the module prefix. You can also rename imports with <strong>aliases</strong> using the <code>as</code> keyword: <code>import numpy as np</code> is a classic example you will see in almost every data science project.</p>
<p>When Python encounters an <code>import</code> statement, it searches for the module in a specific order: first the current directory, then the built-in modules, and finally the directories listed in <code>sys.path</code>. This search order is important to understand because if you accidentally name your file the same as a built-in module (like <code>math.py</code> or <code>random.py</code>), Python will import your file instead of the built-in one — a very common source of confusion for beginners.</p>
<p>The special variable <code>__name__</code> plays a crucial role in Python modules. When a file is run directly (like <code>python my_script.py</code>), Python sets <code>__name__</code> to <code>"__main__"</code>. But when that same file is imported as a module, <code>__name__</code> is set to the module's name instead. This is why you see the pattern <code>if __name__ == "__main__":</code> at the bottom of many Python files — it lets code run only when the file is executed directly, not when it is imported. Think of it as a "do this only if I am the main program" guard.</p>
<p>Understanding imports is fundamental because virtually every real Python project relies on external code — whether from the standard library, third-party packages, or your own modules. Mastering imports means you can stand on the shoulders of giants, reusing millions of lines of tested, optimized code written by the Python community instead of reinventing the wheel.</p>`,
          examples: [
            {
              title: "Basic Import Styles",
              code: `# Style 1: Import the entire module
import math

print(math.pi)          # 3.141592653589793
print(math.sqrt(16))    # 4.0
print(math.ceil(3.2))   # 4

# Style 2: Import specific items
from math import pi, sqrt

print(pi)               # 3.141592653589793 (no prefix needed)
print(sqrt(25))         # 5.0

# Style 3: Import with an alias
import math as m

print(m.pi)             # 3.141592653589793
print(m.factorial(5))   # 120

# Style 4: Import a specific item with an alias
from math import factorial as fact

print(fact(6))          # 720`,
              explanation: "Style 1 keeps the namespace clean — you always know where 'pi' comes from because you write 'math.pi'. Style 2 is convenient when you use specific items frequently. Style 3 saves typing for modules with long names. Style 4 is useful when an imported name is long or conflicts with your own variable names."
            },
            {
              title: "The __name__ == '__main__' Pattern",
              code: `# File: greetings.py

def say_hello(name):
    """Return a greeting string."""
    return f"Hello, {name}! Welcome aboard."

def say_goodbye(name):
    """Return a farewell string."""
    return f"Goodbye, {name}! See you next time."

# This block only runs when greetings.py is executed directly
if __name__ == "__main__":
    # Test our functions
    print(say_hello("Alice"))    # Hello, Alice! Welcome aboard.
    print(say_goodbye("Bob"))    # Goodbye, Bob! See you next time.
    print("All tests passed!")

# ----- In another file: main.py -----
# import greetings
# print(greetings.say_hello("Charlie"))
# The "All tests passed!" line does NOT run when imported`,
              explanation: "When you run 'python greetings.py' directly, __name__ is '__main__', so the test code runs. When another file does 'import greetings', __name__ is 'greetings', so the test block is skipped. This pattern lets a file serve as both a reusable module AND a standalone script."
            },
            {
              title: "Import Pitfalls: Naming Conflicts",
              code: `# BAD: Don't name your file "random.py" or "math.py"!
# If you have a file called random.py in your project folder,
# "import random" will import YOUR file, not Python's built-in.

# BAD: Wildcard imports (avoid this!)
# from math import *   # Imports EVERYTHING — clutters namespace
# Now you don't know where 'pi' or 'sqrt' came from!

# GOOD: Be explicit about what you import
from random import randint, choice

roll = randint(1, 6)
color = choice(["red", "blue", "green"])
print(f"You rolled a {roll} and picked {color}")

# GOOD: Check where Python finds a module
import math
print(math.__file__)  # Shows the file path Python loaded

import sys
print(sys.path)  # Shows all directories Python searches`,
              explanation: "Wildcard imports (from x import *) are tempting but dangerous — they dump everything into your namespace, causing hard-to-debug naming conflicts. Always be explicit about what you import. And never name your files after built-in modules!"
            },
            {
              title: "Importing from Subdirectories (Packages Preview)",
              code: `# You can import from modules in packages (folders)
# Assume this folder structure:
#   my_project/
#       main.py
#       utils/
#           __init__.py
#           helpers.py
#           formatting.py

# In main.py:
from utils.helpers import clean_text
from utils.formatting import bold, italic

# Or import the submodule
import utils.helpers
result = utils.helpers.clean_text("  messy string  ")

# You can also use relative imports INSIDE a package
# In utils/formatting.py:
# from .helpers import clean_text   # '.' means current package`,
              explanation: "The dot notation (utils.helpers) lets you navigate folder structures. The __init__.py file (which can be empty) tells Python that a folder is a package. Relative imports with dots (from .helpers) are used within packages to import sibling modules."
            },
            {
              title: "Reloading Modules & Useful Import Tricks",
              code: `# Modules are cached after first import
# Importing again does NOT re-run the module code
import math
import math  # This does nothing — already cached

# To force a reload (useful during development):
import importlib
import my_module
# ... make changes to my_module.py ...
importlib.reload(my_module)  # Now picks up changes

# Conditional imports (for optional dependencies)
try:
    import numpy as np
    HAS_NUMPY = True
except ImportError:
    HAS_NUMPY = False
    print("NumPy not installed. Some features unavailable.")

# Checking what a module offers
import math
print(dir(math))      # Lists all names defined in math
help(math.sqrt)       # Shows documentation for sqrt`,
              explanation: "Python caches imported modules so they only load once per session. Use importlib.reload() during development if you edit a module and want to pick up changes without restarting Python. The try/except pattern is used in professional code to handle optional dependencies gracefully."
            }
          ],
          keyConcepts: [
            "import module_name brings in the entire module; access items with dot notation",
            "from module import item lets you use the item directly without a prefix",
            "import module as alias creates a shorthand name for the module",
            "__name__ == '__main__' guards code that should only run when the file is executed directly",
            "Python searches the current directory, then built-ins, then sys.path for modules",
            "Never name your files after built-in modules (e.g., math.py, random.py)"
          ],
          commonMistakes: [
            "Naming your file the same as a built-in module (random.py, math.py): Python imports your file instead of the standard library module, causing mysterious errors.",
            "Using wildcard imports (from module import *): clutters your namespace and makes it impossible to tell where names come from. Always import specific items.",
            "Circular imports — module A imports module B, and module B imports module A: causes ImportError. Restructure your code to break the cycle.",
            "Forgetting that modules are cached: editing a module file and re-importing it will NOT pick up changes. Use importlib.reload() during development."
          ],
          funFact: "Python's import system is so flexible that you can even import modules from zip files! If you add a .zip file to sys.path, Python will look inside it for modules. This feature, called 'zipimport', is how some Python applications are distributed as single .pyz files. In fact, on Windows, you can rename a .zip file to .pyz and run it directly with 'python app.pyz'!"
        },
        {
          title: "The Standard Library",
          content: `<p>One of Python's greatest strengths is its <strong>standard library</strong> — a vast collection of modules that come pre-installed with every Python installation. Guido van Rossum (Python's creator) championed the philosophy of "batteries included," meaning Python should come with everything you need for common tasks right out of the box. No downloading, no installing — just import and go.</p>
<p>The <code>math</code> module provides mathematical functions beyond basic arithmetic: trigonometry (<code>sin</code>, <code>cos</code>), logarithms (<code>log</code>, <code>log10</code>), constants (<code>pi</code>, <code>e</code>), and more. The <code>os</code> module lets you interact with the operating system — reading directories, manipulating file paths, checking environment variables, and creating folders. These two alone cover a huge range of common programming needs.</p>
<p>The <code>datetime</code> module handles dates and times — one of the trickiest areas in programming. It lets you create, manipulate, and format dates and times, calculate differences between dates, and handle time zones. Whether you need to know what day it is, how many days until a deadline, or format a timestamp for a log file, <code>datetime</code> has you covered.</p>
<p>The <code>collections</code> module provides specialized container types that go beyond basic lists and dictionaries. <code>Counter</code> counts occurrences of items, <code>defaultdict</code> provides default values for missing keys, <code>namedtuple</code> creates lightweight objects with named fields, and <code>deque</code> (double-ended queue) allows efficient appending and popping from both ends. These tools let you write cleaner, more efficient code for common data-handling patterns.</p>
<p>The <code>itertools</code> module is a toolkit for working with iterables efficiently. It provides functions for creating combinations, permutations, infinite counters, and chain multiple iterables together. While you may not need <code>itertools</code> every day, when you do need it, it saves enormous amounts of code and runs much faster than hand-written loops. The standard library has hundreds more modules — <code>json</code>, <code>csv</code>, <code>re</code> (regular expressions), <code>sqlite3</code>, <code>urllib</code> — each one a powerful tool waiting to be imported.</p>`,
          examples: [
            {
              title: "The math Module",
              code: `import math

# Constants
print(math.pi)       # 3.141592653589793
print(math.e)        # 2.718281828459045
print(math.inf)      # inf (infinity)

# Rounding
print(math.ceil(3.2))    # 4 (round up)
print(math.floor(3.8))   # 3 (round down)

# Powers and roots
print(math.sqrt(144))    # 12.0
print(math.pow(2, 10))   # 1024.0

# Logarithms
print(math.log(100, 10))  # 2.0 (log base 10 of 100)
print(math.log2(256))     # 8.0 (log base 2)

# Trigonometry (uses radians)
angle = math.radians(45)       # Convert 45° to radians
print(math.sin(angle))         # 0.7071... (sin of 45°)

# Useful: Greatest common divisor
print(math.gcd(48, 18))   # 6
print(math.factorial(6))  # 720 (6! = 6*5*4*3*2*1)`,
              explanation: "The math module handles all mathematical operations beyond basic +, -, *, /. Note that trigonometric functions use radians, not degrees — use math.radians() to convert. math.gcd() and math.factorial() are handy for number theory and combinatorics."
            },
            {
              title: "The os Module: Working with Files & Directories",
              code: `import os

# Get the current working directory
print(os.getcwd())    # e.g., /home/user/projects

# List files in a directory
files = os.listdir(".")       # Current directory
print(files)                   # ['main.py', 'data', 'README.md']

# Check if a file or directory exists
print(os.path.exists("main.py"))     # True
print(os.path.isfile("main.py"))     # True
print(os.path.isdir("data"))         # True

# Join paths safely (works on any OS)
path = os.path.join("data", "users", "report.csv")
print(path)    # data/users/report.csv (or data\\users\\report.csv on Windows)

# Get file info
size = os.path.getsize("main.py")    # File size in bytes
name = os.path.basename("/home/user/main.py")   # "main.py"
folder = os.path.dirname("/home/user/main.py")   # "/home/user"

# Create directories
os.makedirs("output/reports", exist_ok=True)  # Creates nested dirs

# Environment variables
home = os.environ.get("HOME", "Not set")
print(f"Home directory: {home}")`,
              explanation: "os.path.join() is essential because it uses the correct separator for the operating system (/ on Mac/Linux, \\\\ on Windows). Always use it instead of string concatenation for file paths. The exist_ok=True flag prevents errors if the directory already exists."
            },
            {
              title: "The datetime Module",
              code: `from datetime import datetime, date, timedelta

# Current date and time
now = datetime.now()
print(now)                    # 2026-02-23 14:30:45.123456
print(now.year, now.month)    # 2026 2

# Create specific dates
birthday = date(2000, 6, 15)
print(birthday)               # 2000-06-15

# Format dates as strings
print(now.strftime("%B %d, %Y"))       # February 23, 2026
print(now.strftime("%I:%M %p"))        # 02:30 PM
print(now.strftime("%Y-%m-%d %H:%M"))  # 2026-02-23 14:30

# Parse strings into dates
date_str = "2026-12-25"
christmas = datetime.strptime(date_str, "%Y-%m-%d")
print(christmas)   # 2026-12-25 00:00:00

# Date arithmetic with timedelta
today = date.today()
one_week = timedelta(weeks=1)
next_week = today + one_week
print(f"One week from today: {next_week}")

# Difference between dates
diff = date(2026, 12, 31) - today
print(f"Days until end of year: {diff.days}")`,
              explanation: "strftime() formats a datetime into a string (the 'f' stands for 'format'). strptime() parses a string into a datetime (the 'p' stands for 'parse'). timedelta represents a duration — you can add or subtract it from dates. The format codes (%Y, %m, %d, etc.) follow a standard pattern."
            },
            {
              title: "The collections Module",
              code: `from collections import Counter, defaultdict, namedtuple, deque

# Counter: count occurrences
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
count = Counter(words)
print(count)                    # Counter({'apple': 3, 'banana': 2, 'cherry': 1})
print(count.most_common(2))     # [('apple', 3), ('banana', 2)]

# Count characters in a string
print(Counter("mississippi"))   # Counter({'s': 4, 'i': 4, 'p': 2, 'm': 1})

# defaultdict: dict with default values for missing keys
word_lengths = defaultdict(list)
for word in ["hi", "hey", "hello", "ok", "bye"]:
    word_lengths[len(word)].append(word)
print(dict(word_lengths))
# {2: ['hi', 'ok'], 3: ['hey', 'bye'], 5: ['hello']}

# namedtuple: lightweight, readable data containers
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)       # 3 4 (access by name!)
print(p[0], p[1])     # 3 4 (also works by index)

# deque: fast appends/pops from both ends
queue = deque(["first", "second", "third"])
queue.appendleft("new_first")  # Add to the front — O(1)!
queue.pop()                     # Remove from the end
print(queue)   # deque(['new_first', 'first', 'second'])`,
              explanation: "Counter saves you from writing manual counting loops. defaultdict eliminates the need for 'if key not in dict' checks. namedtuple is like a lightweight class — great for simple data structures. deque (pronounced 'deck') is much faster than a list when you need to add/remove from the front."
            },
            {
              title: "The itertools Module",
              code: `import itertools

# count: infinite counter
counter = itertools.count(start=10, step=3)
print(next(counter))  # 10
print(next(counter))  # 13
print(next(counter))  # 16

# cycle: repeat a sequence forever
colors = itertools.cycle(["red", "green", "blue"])
for i in range(5):
    print(next(colors), end=" ")
# red green blue red green

print()

# chain: combine multiple iterables
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list(itertools.chain(list1, list2))
print(combined)  # [1, 2, 3, 4, 5, 6]

# combinations and permutations
letters = ["A", "B", "C"]
combos = list(itertools.combinations(letters, 2))
print(combos)  # [('A', 'B'), ('A', 'C'), ('B', 'C')]

perms = list(itertools.permutations(letters, 2))
print(perms)   # [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]

# product: cartesian product (all possible pairs)
sizes = ["S", "M", "L"]
colors = ["Red", "Blue"]
combos = list(itertools.product(sizes, colors))
print(combos)  # [('S', 'Red'), ('S', 'Blue'), ('M', 'Red'), ...]`,
              explanation: "itertools functions return iterators (lazy evaluation), which means they are memory-efficient even with huge datasets. combinations gives unique groups where order does not matter; permutations gives all orderings. product is useful for generating all combinations of multiple options, like sizes and colors for a store."
            }
          ],
          keyConcepts: [
            "Python's standard library ('batteries included') provides hundreds of pre-built modules",
            "math provides advanced math: sqrt, pi, ceil, floor, factorial, gcd, trig functions",
            "os handles file system operations: paths, directories, environment variables",
            "datetime manages dates, times, formatting (strftime), parsing (strptime), and arithmetic (timedelta)",
            "collections provides specialized containers: Counter, defaultdict, namedtuple, deque",
            "itertools provides efficient tools for iterables: combinations, permutations, chain, cycle"
          ],
          commonMistakes: [
            "Using string concatenation for file paths ('folder' + '/' + 'file.txt') instead of os.path.join(): breaks on different operating systems.",
            "Confusing strftime (datetime to string) with strptime (string to datetime): remember 'f' for format, 'p' for parse.",
            "Using a regular dict where defaultdict would be cleaner: if you find yourself writing 'if key not in dict: dict[key] = []', switch to defaultdict(list).",
            "Calling list() on infinite itertools iterators (like count() or cycle()): this will hang your program or crash with a MemoryError. Always use next() or limit with islice()."
          ],
          funFact: "Python's standard library is so extensive that it has been called the language's 'secret weapon.' It contains over 200 modules covering everything from email handling to audio processing to XML parsing. The 'antigravity' module is a famous easter egg — importing it opens a web comic about Python. Try 'import this' to see 'The Zen of Python,' the guiding philosophy behind the language's design!"
        },
        {
          title: "Creating Your Own Modules & Packages",
          content: `<p>While Python's standard library and third-party packages are incredibly useful, you will eventually want to organize your own code into reusable <strong>modules</strong> and <strong>packages</strong>. A module is simply any <code>.py</code> file. A package is a folder containing multiple modules along with a special <code>__init__.py</code> file. Think of modules as individual chapters and packages as entire books.</p>
<p>Creating a module is as simple as saving functions, classes, or variables in a <code>.py</code> file. If you write a file called <code>helpers.py</code> with useful functions, any other Python file in the same directory can do <code>import helpers</code> or <code>from helpers import my_function</code>. This is exactly how professional Python projects are structured — code is split into logical modules based on responsibility (database code in one module, user interface in another, utilities in another).</p>
<p>A <strong>package</strong> adds another layer of organization by grouping related modules into a directory. The key ingredient is the <code>__init__.py</code> file — it can be completely empty, but its presence tells Python "this folder is a package, not just a random directory." You can also use <code>__init__.py</code> to control what gets exported when someone imports your package, initialize package-level variables, or provide a convenient public API.</p>
<p>Good module design follows the principle of <strong>separation of concerns</strong>: each module should have a clear, focused purpose. A module named <code>validation.py</code> should only contain validation functions, not database queries and email sending too. This makes code easier to understand, test, and reuse. It is like organizing a kitchen — knives in one drawer, spoons in another, pots in a cabinet. Everything has its place, and you know exactly where to find what you need.</p>
<p>As your projects grow, you will also want to understand <strong>relative vs absolute imports</strong>. Absolute imports specify the full path from the project root: <code>from mypackage.utils import clean</code>. Relative imports use dots to navigate from the current module's location: <code>from .utils import clean</code> (one dot means the current package, two dots mean the parent package). Both styles work, but absolute imports are generally preferred for clarity.</p>`,
          examples: [
            {
              title: "Creating a Simple Module",
              code: `# File: string_utils.py
"""Utility functions for working with strings."""

def capitalize_words(text):
    """Capitalize the first letter of each word."""
    return " ".join(word.capitalize() for word in text.split())

def count_vowels(text):
    """Count the number of vowels in a string."""
    return sum(1 for char in text.lower() if char in "aeiou")

def reverse_string(text):
    """Reverse a string."""
    return text[::-1]

def is_palindrome(text):
    """Check if a string is a palindrome (ignoring case/spaces)."""
    cleaned = text.lower().replace(" ", "")
    return cleaned == cleaned[::-1]

# ----- Using the module in another file -----
# File: main.py
import string_utils

print(string_utils.capitalize_words("hello world"))   # Hello World
print(string_utils.count_vowels("beautiful"))          # 5
print(string_utils.is_palindrome("racecar"))           # True

# Or import specific functions
from string_utils import is_palindrome, reverse_string
print(is_palindrome("A man a plan a canal Panama"))  # True
print(reverse_string("Python"))                       # nohtyP`,
              explanation: "Any .py file is automatically a module. Adding a docstring at the top of the file describes the module's purpose. Each function also has a docstring. When you import string_utils, all functions become available via dot notation. This is exactly how real projects organize reusable utility code."
            },
            {
              title: "Creating a Package (Folder of Modules)",
              code: `# Folder structure:
# my_project/
#   main.py
#   calculator/
#       __init__.py
#       basic.py
#       advanced.py

# ----- calculator/__init__.py -----
"""Calculator package for math operations."""
# This can be empty, or you can expose key functions:
from .basic import add, subtract, multiply, divide
from .advanced import power, square_root

# ----- calculator/basic.py -----
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# ----- calculator/advanced.py -----
import math

def power(base, exp):
    return base ** exp

def square_root(n):
    if n < 0:
        raise ValueError("Cannot take square root of negative number")
    return math.sqrt(n)

# ----- main.py -----
# Thanks to __init__.py imports, you can do:
from calculator import add, square_root
print(add(10, 5))          # 15
print(square_root(144))    # 12.0

# Or import the whole package
import calculator
print(calculator.multiply(6, 7))  # 42`,
              explanation: "The __init__.py file is the magic ingredient that turns a folder into a package. By importing functions in __init__.py, you create a clean public API — users can import directly from 'calculator' without knowing the internal file structure. This is how professional Python packages like requests and flask are organized."
            },
            {
              title: "Module-Level Variables & Configuration",
              code: `# File: config.py
"""Application configuration module."""

# Module-level constants
APP_NAME = "My Awesome App"
VERSION = "2.1.0"
DEBUG = False
MAX_RETRIES = 3

# Configuration dictionary
DATABASE = {
    "host": "localhost",
    "port": 5432,
    "name": "myapp_db"
}

# Allowed file types
ALLOWED_EXTENSIONS = {".jpg", ".png", ".gif", ".pdf"}

def is_debug():
    """Check if debug mode is on."""
    return DEBUG

# ----- In another file -----
# File: app.py
import config

print(f"Starting {config.APP_NAME} v{config.VERSION}")
# Starting My Awesome App v2.1.0

if config.DEBUG:
    print("Debug mode is ON")

print(f"Connecting to {config.DATABASE['host']}:{config.DATABASE['port']}")
# Connecting to localhost:5432

# Check file extension
filename = "photo.jpg"
ext = "." + filename.split(".")[-1]
if ext in config.ALLOWED_EXTENSIONS:
    print("File type accepted!")`,
              explanation: "Using a config module is a clean way to store settings — much better than scattering magic numbers and strings throughout your code. If you need to change a setting, you update it in one place. Constants are conventionally written in ALL_CAPS to signal they should not be changed."
            },
            {
              title: "The __all__ Variable: Controlling Exports",
              code: `# File: mymodule.py
"""Module demonstrating __all__ for export control."""

# __all__ defines what gets exported with 'from mymodule import *'
__all__ = ["public_function", "PublicClass"]

def public_function():
    """This function IS exported."""
    return "I am public!"

def _private_helper():
    """Convention: leading underscore means 'private'.
    This is NOT in __all__, so it won't be star-imported."""
    return "I am a helper"

def another_function():
    """This is NOT in __all__, but can still be imported explicitly."""
    return "I am accessible but not advertised"

class PublicClass:
    """This class IS exported."""
    pass

class _InternalClass:
    """Convention: private class, not meant for external use."""
    pass

# ----- Usage -----
# from mymodule import *
# Only imports: public_function, PublicClass

# But explicit imports still work:
# from mymodule import another_function  # This works fine!
# from mymodule import _private_helper   # This works too (but don't)`,
              explanation: "__all__ is a list of names that should be exported when someone uses 'from module import *'. It acts as the module's public API. The underscore convention (_private_helper) signals that a function is intended for internal use only. Python does not enforce privacy — it is an honor system — but following these conventions makes code clearer."
            },
            {
              title: "Practical Project Structure",
              code: `# Real-world project structure:
# todo_app/
#   main.py              (entry point)
#   models/
#       __init__.py
#       task.py           (Task class)
#       user.py           (User class)
#   services/
#       __init__.py
#       task_service.py   (business logic)
#       auth_service.py   (authentication)
#   utils/
#       __init__.py
#       validators.py     (input validation)
#       formatters.py     (output formatting)

# ----- utils/validators.py -----
def validate_email(email):
    """Basic email validation."""
    return "@" in email and "." in email.split("@")[-1]

def validate_task_title(title):
    """Ensure task title is not empty and not too long."""
    if not title or not title.strip():
        raise ValueError("Task title cannot be empty")
    if len(title) > 200:
        raise ValueError("Task title too long (max 200 chars)")
    return title.strip()

# ----- models/task.py -----
from datetime import datetime

class Task:
    def __init__(self, title, description=""):
        self.title = title
        self.description = description
        self.created_at = datetime.now()
        self.completed = False

    def complete(self):
        self.completed = True

    def __repr__(self):
        status = "Done" if self.completed else "Pending"
        return f"Task('{self.title}', {status})"

# ----- main.py -----
from models.task import Task
from utils.validators import validate_task_title

title = validate_task_title("  Buy groceries  ")
task = Task(title)
print(task)   # Task('Buy groceries', Pending)
task.complete()
print(task)   # Task('Buy groceries', Done)`,
              explanation: "This is a common structure for medium-sized Python projects. Code is grouped by responsibility: models hold data structures, services contain business logic, and utils provide helper functions. The main.py file ties everything together. This separation makes it easy to find, test, and modify code."
            }
          ],
          keyConcepts: [
            "A module is any .py file; a package is a folder with an __init__.py file",
            "__init__.py marks a directory as a package and can define the package's public API",
            "Separate code by responsibility: each module should have one clear purpose",
            "__all__ controls what gets exported with wildcard imports (from module import *)",
            "Leading underscore (_name) is a convention for private/internal items",
            "Absolute imports (from package.module import name) are preferred over relative imports for clarity"
          ],
          commonMistakes: [
            "Forgetting __init__.py in a package directory: Python will not recognize the folder as a package and imports will fail.",
            "Creating circular dependencies: module A imports from module B, and module B imports from module A. Restructure by moving shared code into a third module.",
            "Putting too much code in __init__.py: keep it minimal — use it for convenient re-exports, not heavy logic.",
            "Not using if __name__ == '__main__': when a module has test/demo code: that code will run every time the module is imported, which is usually not what you want."
          ],
          funFact: "The name 'package' was inspired by Java's package system, but Python's implementation is much simpler. In 2012, Python 3.3 introduced 'namespace packages' — packages that do not even need an __init__.py file! They allow a single package to be spread across multiple directories, which is useful for very large frameworks where different teams maintain different parts of the same package."
        }
      ]
    },

    // ==================== MODULE 12 ====================
    {
      id: 12,
      title: "Intermediate Topics",
      subtitle: "Comprehensions, Decorators & Context Managers",
      icon: "🚀",
      lessons: [
        {
          title: "List Comprehensions & Generator Expressions",
          content: `<p><strong>List comprehensions</strong> are one of Python's most beloved features — a concise, readable way to create new lists by transforming or filtering existing data. Instead of writing a multi-line for loop with <code>.append()</code>, you express the entire operation in a single, elegant line. Once you learn them, you will wonder how you ever coded without them. They are Python's way of saying "give me a list of X for each item in Y."</p>
<p>The basic syntax is <code>[expression for item in iterable]</code>. You can add a condition with <code>[expression for item in iterable if condition]</code>. Think of it like an assembly line in a factory: items come in (the iterable), get transformed (the expression), and optionally pass through quality control (the if condition). Only the items that pass all stages end up in the final list.</p>
<p>You can also create <strong>dictionary comprehensions</strong> (<code>{key: value for item in iterable}</code>) and <strong>set comprehensions</strong> (<code>{expression for item in iterable}</code>), following the same pattern. Nested comprehensions are possible too — you can have multiple <code>for</code> clauses — but be careful: once a comprehension needs more than two levels of nesting or becomes hard to read, switch back to a regular for loop. Readability trumps cleverness.</p>
<p><strong>Generator expressions</strong> look almost identical to list comprehensions, but use parentheses instead of square brackets: <code>(expression for item in iterable)</code>. The critical difference is that generators produce items <strong>one at a time, on demand</strong> (lazy evaluation), while list comprehensions create the entire list in memory at once. If you need to iterate through a million items but only look at one at a time, a generator expression uses almost no memory, while a list comprehension would store all million items.</p>
<p>Think of the difference like this: a list comprehension is like printing out every page of a book and stacking them on your desk. A generator expression is like reading one page at a time on an e-reader — you only ever have one page loaded, so it uses far less "desk space" (memory). Use generators when you are processing large datasets or when you only need to iterate once, and list comprehensions when you need to access items multiple times or need the full list.</p>`,
          examples: [
            {
              title: "Basic List Comprehensions",
              code: `# Without comprehension (verbose)
squares = []
for n in range(1, 6):
    squares.append(n ** 2)
print(squares)  # [1, 4, 9, 16, 25]

# With list comprehension (concise)
squares = [n ** 2 for n in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]

# Transform strings
names = ["alice", "bob", "charlie"]
upper_names = [name.upper() for name in names]
print(upper_names)  # ['ALICE', 'BOB', 'CHARLIE']

# Get lengths
lengths = [len(name) for name in names]
print(lengths)  # [5, 3, 7]

# Convert types
str_numbers = ["10", "20", "30", "40"]
numbers = [int(x) for x in str_numbers]
print(numbers)  # [10, 20, 30, 40]

# Call functions
import math
roots = [math.sqrt(x) for x in [4, 9, 16, 25, 36]]
print(roots)  # [2.0, 3.0, 4.0, 5.0, 6.0]`,
              explanation: "The pattern is [what_you_want for item in source]. The 'what_you_want' part can be any expression — mathematical operations, method calls, function calls, or even complex expressions. The result is always a new list."
            },
            {
              title: "Filtering with Conditions",
              code: `# Filter: keep only even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [n for n in numbers if n % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10]

# Filter AND transform
even_squares = [n ** 2 for n in numbers if n % 2 == 0]
print(even_squares)  # [4, 16, 36, 64, 100]

# Filter strings
words = ["hello", "hi", "hey", "howdy", "greetings", "hola"]
h_words = [w for w in words if w.startswith("h")]
print(h_words)  # ['hello', 'hi', 'hey', 'howdy', 'hola']

long_words = [w for w in words if len(w) > 3]
print(long_words)  # ['hello', 'howdy', 'greetings', 'hola']

# if-else in the expression (NOT the filter)
labels = ["even" if n % 2 == 0 else "odd" for n in range(1, 6)]
print(labels)  # ['odd', 'even', 'odd', 'even', 'odd']

# Note the position difference:
# [expr for x in list if condition]      <- filter (end)
# [A if condition else B for x in list]  <- transform (beginning)`,
              explanation: "There are two places to put 'if' in a comprehension. At the END, it filters: only items passing the test are included. At the BEGINNING (with else), it transforms: every item is included but the expression changes based on the condition. This is a common source of confusion — pay attention to the position!"
            },
            {
              title: "Dictionary & Set Comprehensions",
              code: `# Dictionary comprehension: {key: value for item in iterable}
names = ["Alice", "Bob", "Charlie"]
name_lengths = {name: len(name) for name in names}
print(name_lengths)  # {'Alice': 5, 'Bob': 3, 'Charlie': 7}

# Invert a dictionary (swap keys and values)
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}

# Filter a dictionary
scores = {"Alice": 92, "Bob": 67, "Charlie": 85, "Diana": 73}
passed = {name: score for name, score in scores.items() if score >= 75}
print(passed)  # {'Alice': 92, 'Charlie': 85}

# Set comprehension (unique values only)
words = ["hello", "HELLO", "Hello", "world", "WORLD"]
unique_lower = {w.lower() for w in words}
print(unique_lower)  # {'hello', 'world'}

# Create a lookup set from data
valid_ids = {user["id"] for user in [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
    {"id": 3, "name": "Charlie"}
]}
print(valid_ids)  # {1, 2, 3}
print(2 in valid_ids)  # True (fast lookup!)`,
              explanation: "Dictionary comprehensions use curly braces with a key:value pair. Set comprehensions also use curly braces but with just a single value (like a list comprehension but with {} instead of []). Both support the same filtering syntax with 'if'."
            },
            {
              title: "Nested Comprehensions",
              code: `# Flatten a 2D list (list of lists) into a single list
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# The above is equivalent to:
# flat = []
# for row in matrix:
#     for num in row:
#         flat.append(num)

# Create a multiplication table
table = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(table)  # [[1, 2, 3], [2, 4, 6], [3, 6, 9]]

# All pairs from two lists
colors = ["red", "blue"]
sizes = ["S", "M", "L"]
combos = [(c, s) for c in colors for s in sizes]
print(combos)
# [('red', 'S'), ('red', 'M'), ('red', 'L'),
#  ('blue', 'S'), ('blue', 'M'), ('blue', 'L')]

# WHEN TO STOP: If it's hard to read, use a regular loop!
# BAD: Too complex
# result = [x for x in [y for y in range(100) if y % 3 == 0] if x % 5 == 0]
# GOOD: Break it into steps
multiples_of_3 = [y for y in range(100) if y % 3 == 0]
multiples_of_3_and_5 = [x for x in multiples_of_3 if x % 5 == 0]`,
              explanation: "In nested comprehensions, the order of 'for' clauses matches the order of equivalent nested for loops. However, deeply nested comprehensions become unreadable fast. The Python community follows the rule: if a comprehension does not fit on one line or is hard to understand at a glance, use a regular for loop instead."
            },
            {
              title: "Generator Expressions: Memory-Efficient Processing",
              code: `# List comprehension: creates entire list in memory
sum_list = sum([x ** 2 for x in range(1000000)])  # Stores 1M items!

# Generator expression: computes one item at a time
sum_gen = sum(x ** 2 for x in range(1000000))     # Nearly zero memory!

# Both give the same result, but the generator is far more efficient
print(sum_list == sum_gen)  # True

# You can iterate over a generator (but only ONCE)
evens = (n for n in range(10) if n % 2 == 0)
print(type(evens))  # <class 'generator'>

for num in evens:
    print(num, end=" ")  # 0 2 4 6 8
print()

# Second iteration produces nothing — generators are exhausted!
for num in evens:
    print(num)  # Nothing prints!

# Practical use: process large files line by line
# lines = (line.strip() for line in open("huge_file.txt"))
# errors = (line for line in lines if "ERROR" in line)
# for error_line in errors:
#     print(error_line)  # Processes file without loading it all

# Convert generator to list when needed
first_10_squares = (x ** 2 for x in range(1, 11))
squares_list = list(first_10_squares)
print(squares_list)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]`,
              explanation: "Generator expressions look like list comprehensions but with parentheses. The key advantage is memory efficiency — they produce values one at a time instead of building the entire collection. Use generators for large data, one-time iteration, or when piping data through multiple processing steps. Use lists when you need random access or multiple iterations."
            }
          ],
          keyConcepts: [
            "[expression for item in iterable] creates a new list by transforming each item",
            "[expression for item in iterable if condition] filters items before transforming",
            "Dictionary comprehensions: {key: value for item in iterable}",
            "Set comprehensions: {expression for item in iterable} (unique values)",
            "Generator expressions (parentheses) produce items lazily — memory efficient for large data",
            "Generators can only be iterated once; list comprehensions create reusable lists"
          ],
          commonMistakes: [
            "Confusing the position of if in comprehensions: 'if' at the end is a filter; 'if...else' at the beginning is a conditional expression. [x for x in list if cond] vs [A if cond else B for x in list].",
            "Making comprehensions too complex: if you need more than 2 for-clauses or the line is hard to read, use a regular for loop. Readability counts!",
            "Using a list comprehension when you only need to iterate once: [x for x in huge_data] wastes memory. Use a generator expression (x for x in huge_data) instead.",
            "Trying to iterate over a generator twice: generators are exhausted after one pass. If you need multiple passes, convert to a list first or recreate the generator."
          ],
          funFact: "List comprehensions were inspired by set-builder notation in mathematics (like {x^2 | x in N, x < 10}) and borrowed from the Haskell programming language. Guido van Rossum added them to Python 2.0 in the year 2000. They became so popular that dictionary and set comprehensions were added in Python 2.7/3.0. Generator expressions came in Python 2.4, inspired by the concept of 'lazy evaluation' from functional programming."
        },
        {
          title: "Decorators & Closures",
          content: `<p>To understand <strong>decorators</strong>, you first need to understand a remarkable fact about Python: <strong>functions are objects</strong>. Just like integers, strings, and lists, functions can be assigned to variables, stored in data structures, passed as arguments to other functions, and returned from functions. This "functions as first-class objects" concept is the foundation that makes decorators possible.</p>
<p>A <strong>closure</strong> is a function that "remembers" the variables from its enclosing scope, even after that scope has finished executing. When you define a function inside another function and the inner function references variables from the outer function, Python creates a closure — the inner function "closes over" those variables and keeps them alive. Closures are like backpacks: the inner function carries the outer function's variables with it wherever it goes.</p>
<p>A <strong>decorator</strong> is a function that takes another function as input, wraps it with additional behavior, and returns the enhanced version. The <code>@decorator_name</code> syntax placed above a function definition is just syntactic sugar — a convenient shorthand. Writing <code>@my_decorator</code> above <code>def my_function():</code> is exactly equivalent to writing <code>my_function = my_decorator(my_function)</code> after the function definition.</p>
<p>Think of decorators like gift wrapping. You have a present (the original function), and the decorator wraps it in decorative paper (extra behavior) without changing the present itself. Common real-world uses include: logging when functions are called, measuring execution time, checking user permissions before allowing access, caching results to avoid repeated calculations, and validating input parameters.</p>
<p>Decorators are everywhere in professional Python code. Web frameworks like Flask and Django use them extensively (<code>@app.route("/home")</code> maps a URL to a function). Python's built-in <code>@property</code>, <code>@staticmethod</code>, and <code>@classmethod</code> are decorators. The <code>functools</code> module provides <code>@lru_cache</code> for automatic memoization. Understanding decorators unlocks a powerful pattern for writing clean, DRY (Don't Repeat Yourself) code.</p>`,
          examples: [
            {
              title: "Functions as Objects & Higher-Order Functions",
              code: `# Functions are objects — you can assign them to variables
def greet(name):
    return f"Hello, {name}!"

say_hi = greet                # Assign function to a variable
print(say_hi("Alice"))        # Hello, Alice!
print(type(say_hi))           # <class 'function'>

# Functions can be passed as arguments
def apply_twice(func, value):
    """Apply a function twice to a value."""
    return func(func(value))

def add_exclamation(text):
    return text + "!"

result = apply_twice(add_exclamation, "wow")
print(result)  # wow!!

# Functions can be stored in data structures
operations = {
    "double": lambda x: x * 2,
    "square": lambda x: x ** 2,
    "negate": lambda x: -x
}

for name, func in operations.items():
    print(f"{name}(5) = {func(5)}")
# double(5) = 10
# square(5) = 25
# negate(5) = -5`,
              explanation: "Functions being 'first-class objects' means they can be treated like any other value — assigned, passed, stored. This is NOT the case in all languages. The apply_twice example shows a 'higher-order function' — a function that takes another function as an argument. This concept is the building block for decorators."
            },
            {
              title: "Closures: Functions That Remember",
              code: `# A closure: inner function remembers outer function's variables
def make_multiplier(factor):
    """Return a function that multiplies by factor."""
    def multiplier(number):
        return number * factor  # 'factor' is remembered!
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))    # 10
print(triple(5))    # 15
print(double(100))  # 200

# The outer function has finished, but 'factor' lives on!
# 'double' remembers factor=2, 'triple' remembers factor=3

# Another closure example: a counter
def make_counter(start=0):
    """Return a function that counts up from start."""
    count = [start]   # Use a list so we can modify it
    def counter():
        count[0] += 1
        return count[0]
    return counter

counter_a = make_counter(0)
counter_b = make_counter(100)

print(counter_a())   # 1
print(counter_a())   # 2
print(counter_a())   # 3
print(counter_b())   # 101 (independent counter!)`,
              explanation: "When make_multiplier(2) is called, it creates a local variable factor=2, then returns the inner function multiplier. Even though make_multiplier has finished running, the returned function 'remembers' that factor is 2. Each call to make_multiplier creates a separate closure with its own remembered variables."
            },
            {
              title: "Your First Decorator",
              code: `import time

# A decorator is a function that wraps another function
def timer(func):
    """Decorator that measures how long a function takes."""
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)      # Call the original function
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result                        # Return the original result
    return wrapper

# Apply the decorator with @ syntax
@timer
def slow_function():
    """Simulate a slow operation."""
    time.sleep(1)
    return "Done!"

@timer
def add_numbers(a, b):
    return a + b

# When we call these, the timer wrapper runs automatically
result = slow_function()
# slow_function took 1.0012 seconds
print(result)  # Done!

result = add_numbers(3, 4)
# add_numbers took 0.0000 seconds
print(result)  # 7

# @timer above 'def slow_function' is the same as:
# slow_function = timer(slow_function)`,
              explanation: "The decorator 'timer' takes a function, creates a wrapper that adds timing behavior around the original call, and returns the wrapper. *args and **kwargs let the wrapper accept any arguments and pass them through to the original function. The @timer syntax is just a shortcut for reassigning the function name to the wrapped version."
            },
            {
              title: "Practical Decorators",
              code: `import functools

# Decorator that logs function calls
def log_calls(func):
    @functools.wraps(func)  # Preserves original function's name/docstring
    def wrapper(*args, **kwargs):
        args_str = ", ".join(repr(a) for a in args)
        print(f"Calling {func.__name__}({args_str})")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result!r}")
        return result
    return wrapper

@log_calls
def calculate_area(length, width):
    """Calculate the area of a rectangle."""
    return length * width

area = calculate_area(5, 3)
# Calling calculate_area(5, 3)
# calculate_area returned 15
print(area)  # 15

# Decorator that validates input
def require_positive(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        for arg in args:
            if isinstance(arg, (int, float)) and arg < 0:
                raise ValueError(f"All arguments must be positive, got {arg}")
        return func(*args, **kwargs)
    return wrapper

@require_positive
def calculate_price(quantity, unit_price):
    return quantity * unit_price

print(calculate_price(5, 9.99))   # 49.95
# calculate_price(-1, 9.99)       # ValueError!

# Decorator with retry logic
def retry(max_attempts=3):
    """Decorator factory — returns a decorator."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"Attempt {attempt} failed: {e}")
                    if attempt == max_attempts:
                        raise
        return wrapper
    return decorator

@retry(max_attempts=3)
def unreliable_api_call():
    import random
    if random.random() < 0.7:
        raise ConnectionError("Server unavailable")
    return "Success!"`,
              explanation: "@functools.wraps(func) is important — it copies the original function's name and docstring to the wrapper, so debugging tools and help() still work correctly. The retry decorator is a 'decorator factory' — it takes arguments (max_attempts) and returns the actual decorator. This is the pattern for decorators that accept parameters."
            },
            {
              title: "Built-in & Common Decorators",
              code: `import functools

# @property — makes a method behave like an attribute
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self):
        import math
        return math.pi * self._radius ** 2

c = Circle(5)
print(c.radius)    # 5 (looks like an attribute, but it's a method!)
print(c.area)      # 78.54 (calculated on the fly)
c.radius = 10      # Uses the setter
# c.radius = -1    # ValueError!

# @staticmethod — method that doesn't need self
class MathUtils:
    @staticmethod
    def is_even(n):
        return n % 2 == 0

print(MathUtils.is_even(4))  # True (no instance needed)

# @functools.lru_cache — automatic memoization (caching)
@functools.lru_cache(maxsize=128)
def fibonacci(n):
    """Calculate the nth Fibonacci number (with caching!)."""
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Without cache: fibonacci(35) takes seconds
# With cache: fibonacci(35) is instant!
print(fibonacci(35))   # 9227465 (calculated instantly)
print(fibonacci.cache_info())  # Shows hits, misses, etc.`,
              explanation: "@property turns a method into a readable attribute — you write 'c.area' not 'c.area()'. @staticmethod is for utility methods that belong to a class but do not need access to instance data. @lru_cache automatically remembers previous results, which is a game-changer for recursive functions like Fibonacci — turning exponential time complexity into linear."
            }
          ],
          keyConcepts: [
            "Functions are first-class objects: they can be assigned to variables, passed as arguments, and returned from other functions",
            "A closure is an inner function that remembers variables from its enclosing scope",
            "A decorator wraps a function with extra behavior: @decorator above def is syntactic sugar for func = decorator(func)",
            "Use *args and **kwargs in wrapper functions to accept and pass through any arguments",
            "@functools.wraps(func) preserves the original function's name and docstring on the wrapper",
            "Decorator factories (decorators with arguments) use three levels of nesting: factory -> decorator -> wrapper"
          ],
          commonMistakes: [
            "Forgetting to call the original function inside the wrapper: the decorator replaces the function, so if the wrapper never calls func(*args, **kwargs), the original code never runs.",
            "Forgetting to return the result from the wrapper: if the original function returns a value and the wrapper does not return it, the decorated function will always return None.",
            "Forgetting @functools.wraps(func): without it, the decorated function loses its original __name__ and __doc__, making debugging and introspection confusing.",
            "Confusing decorator (no parentheses: @log_calls) with decorator factory (with parentheses: @retry(max_attempts=3)): they have different structures. A factory needs an extra level of nesting."
          ],
          funFact: "The @ decorator syntax was added in Python 2.4 (2004) after a long, heated debate in the Python community. Over a dozen alternative syntaxes were proposed, including using vertical bars (|decorator|), angle brackets (<decorator>), and even placing the decorator after the function body. Guido van Rossum personally chose the @ symbol, partly inspired by Java's annotations. The debate was so intense that it is sometimes called the 'decorator wars' in Python history!"
        },
        {
          title: "Context Managers (with Statement)",
          content: `<p>A <strong>context manager</strong> is an object that defines setup and cleanup actions that should happen automatically before and after a block of code. You have likely already used one without knowing it: <code>with open("file.txt") as f:</code> is a context manager in action. The <code>with</code> statement ensures that the file is properly closed when you are done, even if an error occurs — no need to remember <code>f.close()</code>.</p>
<p>Think of context managers like checking into and out of a hotel. When you "check in" (enter the <code>with</code> block), certain things happen automatically — you get your room key, the lights turn on. When you "check out" (exit the <code>with</code> block), cleanup happens automatically — the room is cleaned, the key is deactivated. You do not have to manage these details yourself; the hotel (context manager) handles it.</p>
<p>Without context managers, you would need try/finally blocks to guarantee cleanup. Forgetting to close files, release locks, close database connections, or restore settings after temporary changes are all common sources of bugs and resource leaks. Context managers eliminate these problems by binding the cleanup action directly to the code block, making it impossible to forget.</p>
<p>Python provides two ways to create your own context managers. The <strong>class-based approach</strong> uses the special methods <code>__enter__</code> (setup, called when entering the <code>with</code> block) and <code>__exit__</code> (cleanup, called when leaving). The <strong>function-based approach</strong> uses the <code>@contextmanager</code> decorator from the <code>contextlib</code> module, which lets you write a generator function with a <code>yield</code> — code before the yield is setup, code after is cleanup.</p>
<p>Context managers are used extensively in professional Python code: managing file I/O, database transactions (commit on success, rollback on error), acquiring and releasing locks in multithreaded code, temporarily changing settings, measuring execution time, and even suppressing specific exceptions. Learning to write and use them is a key step toward writing robust, professional Python code.</p>`,
          examples: [
            {
              title: "The with Statement: Files & Why It Matters",
              code: `# WITHOUT context manager — risky!
f = open("data.txt", "w")
f.write("Hello, World!")
# If an error happens here, the file is never closed!
f.close()

# WITH context manager — safe!
with open("data.txt", "w") as f:
    f.write("Hello, World!")
    f.write("\\nThis is safe.")
# File is AUTOMATICALLY closed here, even if an error occurred!

# You can verify the file is closed
with open("data.txt", "r") as f:
    content = f.read()
    print(f.closed)    # False (still inside 'with')
print(f.closed)        # True (automatically closed!)

# Multiple context managers
with open("input.txt", "r") as source, open("output.txt", "w") as dest:
    for line in source:
        dest.write(line.upper())
# Both files are closed automatically

# Real danger of not using 'with':
# In a loop creating many files without closing them,
# you can hit the OS limit on open file descriptors!`,
              explanation: "The 'with' statement guarantees cleanup even when exceptions occur. When the block ends (normally or via an error), Python automatically calls the __exit__ method, which for files means closing them. This is safer than try/finally and much cleaner to read."
            },
            {
              title: "Class-Based Context Manager",
              code: `import time

class Timer:
    """Context manager that measures execution time."""
    def __enter__(self):
        self.start = time.time()
        print("Timer started...")
        return self   # This becomes the 'as' variable

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.time() - self.start
        print(f"Timer stopped: {self.elapsed:.4f} seconds")
        return False  # Don't suppress exceptions

# Usage
with Timer() as t:
    # Simulate some work
    total = sum(range(1_000_000))
    print(f"Sum: {total}")
# Timer started...
# Sum: 499999500000
# Timer stopped: 0.0312 seconds

print(f"That took {t.elapsed:.4f}s")  # Can access elapsed after!

class IndentPrinter:
    """Context manager for indented printing."""
    level = 0

    def __enter__(self):
        IndentPrinter.level += 1
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        IndentPrinter.level -= 1
        return False

    @staticmethod
    def print(text):
        indent = "  " * IndentPrinter.level
        print(f"{indent}{text}")

IndentPrinter.print("Top level")
with IndentPrinter():
    IndentPrinter.print("Level 1")
    with IndentPrinter():
        IndentPrinter.print("Level 2")
    IndentPrinter.print("Back to Level 1")
IndentPrinter.print("Back to top")`,
              explanation: "__enter__ runs when entering the 'with' block and its return value is assigned to the 'as' variable. __exit__ runs when leaving the block and receives exception info (all None if no error occurred). Returning False (or None) from __exit__ lets exceptions propagate normally; returning True would suppress them."
            },
            {
              title: "Function-Based Context Manager with @contextmanager",
              code: `from contextlib import contextmanager
import time

@contextmanager
def timer(label="Block"):
    """Measure execution time of a code block."""
    start = time.time()
    print(f"{label}: started")
    yield   # Everything before yield = setup, after = cleanup
    elapsed = time.time() - start
    print(f"{label}: finished in {elapsed:.4f}s")

with timer("Data processing"):
    total = sum(x ** 2 for x in range(1_000_000))
# Data processing: started
# Data processing: finished in 0.1234s

@contextmanager
def temporary_value(obj, attr, new_value):
    """Temporarily change an attribute, then restore it."""
    old_value = getattr(obj, attr)
    setattr(obj, attr, new_value)
    print(f"Changed {attr}: {old_value!r} -> {new_value!r}")
    try:
        yield
    finally:
        setattr(obj, attr, old_value)
        print(f"Restored {attr}: {new_value!r} -> {old_value!r}")

class Settings:
    debug = False
    verbose = True

s = Settings()
print(f"Debug: {s.debug}")        # Debug: False
with temporary_value(s, "debug", True):
    print(f"Debug: {s.debug}")    # Debug: True
print(f"Debug: {s.debug}")        # Debug: False (restored!)`,
              explanation: "The @contextmanager decorator turns a generator function into a context manager. Code before 'yield' is the setup (__enter__), and code after 'yield' is the cleanup (__exit__). The try/finally ensures cleanup runs even if an error occurs inside the 'with' block. This is often simpler than writing a full class."
            },
            {
              title: "Exception Handling in Context Managers",
              code: `from contextlib import contextmanager

class SafeDatabase:
    """Context manager that handles transactions safely."""
    def __init__(self, name):
        self.name = name
        self.connected = False
        self.data = {}

    def __enter__(self):
        print(f"Connecting to {self.name}...")
        self.connected = True
        self._backup = dict(self.data)  # Backup for rollback
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            # An error occurred — rollback!
            print(f"Error: {exc_val}. Rolling back changes.")
            self.data = self._backup
        else:
            print("Success! Changes committed.")
        self.connected = False
        print(f"Disconnected from {self.name}.")
        return False  # Let the exception propagate

db = SafeDatabase("mydb")
db.data = {"users": 100}

# Successful transaction
with db:
    db.data["users"] = 150
    db.data["orders"] = 50
print(db.data)  # {'users': 150, 'orders': 50} — committed!

# Failed transaction
try:
    with db:
        db.data["users"] = 999
        raise ValueError("Something went wrong!")
except ValueError:
    pass
print(db.data)  # {'users': 150, 'orders': 50} — rolled back!

# Using contextlib.suppress to ignore specific exceptions
from contextlib import suppress

with suppress(FileNotFoundError):
    with open("nonexistent.txt") as f:
        data = f.read()
# No crash! The FileNotFoundError was silently suppressed`,
              explanation: "__exit__ receives three arguments about any exception that occurred: exc_type (the exception class), exc_val (the exception instance), and exc_tb (the traceback). If no error occurred, all three are None. This lets you implement transaction-like behavior: commit on success, rollback on failure. contextlib.suppress is a convenient built-in context manager for ignoring specific exceptions."
            },
            {
              title: "Real-World Context Manager Patterns",
              code: `from contextlib import contextmanager
import os

@contextmanager
def working_directory(path):
    """Temporarily change the working directory."""
    old_dir = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(old_dir)

# Usage:
# with working_directory("/tmp"):
#     print(os.getcwd())  # /tmp
# print(os.getcwd())  # back to original

@contextmanager
def html_tag(tag):
    """Generate HTML tags around content."""
    print(f"<{tag}>", end="")
    yield
    print(f"</{tag}>")

with html_tag("h1"):
    print("Welcome", end="")
# <h1>Welcome</h1>

# Combining multiple context managers
@contextmanager
def log_block(name):
    print(f"=== START {name} ===")
    yield
    print(f"=== END {name} ===")

@contextmanager
def error_handler():
    try:
        yield
    except Exception as e:
        print(f"Caught error: {e}")

with log_block("Main Process"):
    with error_handler():
        print("Doing work...")
        result = 10 / 2
        print(f"Result: {result}")
# === START Main Process ===
# Doing work...
# Result: 5.0
# === END Main Process ===`,
              explanation: "Context managers shine when you need to ensure cleanup or restoration. The working_directory example temporarily changes directories — essential for build scripts. The patterns can be nested and composed. In real projects, you will see context managers for database connections, HTTP sessions, temporary files, and thread locks."
            }
          ],
          keyConcepts: [
            "The 'with' statement ensures automatic setup and cleanup of resources",
            "Class-based: implement __enter__ (setup) and __exit__ (cleanup) methods",
            "Function-based: use @contextmanager with a generator — code before yield is setup, after is cleanup",
            "__exit__ receives exception info (exc_type, exc_val, exc_tb) — all None if no error occurred",
            "Returning True from __exit__ suppresses the exception; False (default) lets it propagate",
            "contextlib provides utilities: suppress (ignore exceptions), closing, redirect_stdout"
          ],
          commonMistakes: [
            "Forgetting the try/finally in @contextmanager functions: without it, cleanup code after yield will not run if an exception occurs inside the 'with' block.",
            "Returning True from __exit__ by accident: this suppresses ALL exceptions, which hides bugs. Only return True if you intentionally want to silence errors.",
            "Not using 'with' for file operations: every open() should be inside a 'with' block. Forgetting to close files can cause data loss and resource leaks.",
            "Putting too much logic in __enter__/__exit__: keep setup and cleanup focused. If you need complex logic, factor it into separate methods."
          ],
          funFact: "Context managers were introduced in Python 2.5 (2006) via PEP 343, written by Guido van Rossum himself. The 'with' statement was so anticipated that it required a special import ('from __future__ import with_statement') before becoming a full keyword. The contextlib module has grown steadily — Python 3.7 added 'nullcontext()' (a do-nothing context manager), and Python 3.10 added parenthesized context managers, letting you write 'with (open(f1) as a, open(f2) as b):' with cleaner formatting for multiple managers."
        }
      ]
    }
  ]
};
