// ============================================================
// ACTIVITIES: Modules 9-12
// M9: File I/O concepts, try/except error handling
// M10: Classes, objects, inheritance
// M11: Importing modules, using standard library
// M12: List comprehensions, generators, decorators
// ============================================================

const activitiesM9M12 = [

    // ========================================================
    // MODULE 9: File I/O Concepts, Try/Except Error Handling
    // ========================================================
    {
        id: "m9_a1",
        moduleId: 9,
        title: "Basic Try/Except",
        difficulty: "easy",
        xpReward: 10,
        description: "Handle errors gracefully using try/except blocks.",
        instructions: [
            "Use a try/except block to handle dividing 10 by 0.",
            "In the try block, attempt: result = 10 / 0",
            "In the except block, catch ZeroDivisionError and print 'Cannot divide by zero!'",
            "After the try/except, print 'Program continues.'"
        ],
        starterCode: `# Basic try/except\n\n# Try to divide 10 by 0\n# Catch the ZeroDivisionError\n\n# Print 'Program continues.' after the try/except\n`,
        testCases: [
            { input: "", expectedOutput: "Cannot divide by zero!\nProgram continues.", description: "Should catch the error and continue", hidden: false },
        ],
        hints: [
            "Syntax: try: ... except ErrorType: ...",
            "The specific error type is ZeroDivisionError.",
            "Code after the try/except block runs regardless."
        ],
        solutionCode: `# Basic try/except\n\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero!')\n\nprint('Program continues.')`,
        requiredConstructs: ["try_except", "print_function"],
        commonErrors: [
            { pattern: "except:", feedback: "Be specific! Catch ZeroDivisionError, not all exceptions." },
            { pattern: "catch", feedback: "Python uses 'except', not 'catch'." }
        ],
        tags: ["error-handling", "try-except", "exceptions"]
    },
    {
        id: "m9_a2",
        moduleId: 9,
        title: "Multiple Exception Types",
        difficulty: "easy",
        xpReward: 15,
        description: "Handle different types of errors with multiple except blocks.",
        instructions: [
            "Create a list: numbers = [10, 0, 'five', 20]",
            "Try to compute 100 / numbers[1]. Catch ZeroDivisionError, print 'Division by zero!'",
            "Try to compute 100 + numbers[2]. Catch TypeError, print 'Type error: cannot add string and int!'",
            "Try to access numbers[10]. Catch IndexError, print 'Index out of range!'"
        ],
        starterCode: `# Multiple exception types\n\nnumbers = [10, 0, 'five', 20]\n\n# Try 100 / numbers[1] - catch ZeroDivisionError\n\n# Try 100 + numbers[2] - catch TypeError\n\n# Try numbers[10] - catch IndexError\n`,
        testCases: [
            { input: "", expectedOutput: "Division by zero!\nType error: cannot add string and int!\nIndex out of range!", description: "Should catch each error type", hidden: false },
        ],
        hints: [
            "Each operation needs its own try/except block.",
            "ZeroDivisionError for dividing by zero.",
            "TypeError when mixing incompatible types.",
            "IndexError when accessing an index that doesn't exist."
        ],
        solutionCode: `# Multiple exception types\n\nnumbers = [10, 0, 'five', 20]\n\n# Try 100 / numbers[1] - catch ZeroDivisionError\ntry:\n    result = 100 / numbers[1]\nexcept ZeroDivisionError:\n    print('Division by zero!')\n\n# Try 100 + numbers[2] - catch TypeError\ntry:\n    result = 100 + numbers[2]\nexcept TypeError:\n    print('Type error: cannot add string and int!')\n\n# Try numbers[10] - catch IndexError\ntry:\n    result = numbers[10]\nexcept IndexError:\n    print('Index out of range!')`,
        requiredConstructs: ["try_except", "print_function"],
        commonErrors: [
            { pattern: "except Exception", feedback: "Use specific exception types for each error case." }
        ],
        tags: ["error-handling", "multiple-exceptions", "try-except"]
    },
    {
        id: "m9_a3",
        moduleId: 9,
        title: "Try/Except/Else/Finally",
        difficulty: "medium",
        xpReward: 20,
        description: "Use the full try/except/else/finally pattern.",
        instructions: [
            "Define a function 'safe_divide(a, b)' that:",
            "  - Tries to return a / b.",
            "  - Catches ZeroDivisionError, prints 'Error: division by zero' and returns None.",
            "  - In the else block, prints 'Division successful!'",
            "  - In the finally block, prints 'Operation complete.'",
            "Call safe_divide(10, 2) and print the result.",
            "Call safe_divide(10, 0) and print the result."
        ],
        starterCode: `# Try/except/else/finally\n\ndef safe_divide(a, b):\n    # Use try/except/else/finally\n    pass\n\n# Call with 10, 2\nresult1 = safe_divide(10, 2)\nprint(result1)\n\n# Call with 10, 0\nresult2 = safe_divide(10, 0)\nprint(result2)\n`,
        testCases: [
            { input: "", expectedOutput: "Division successful!\nOperation complete.\n5.0\nError: division by zero\nOperation complete.\nNone", description: "Should demonstrate full try/except pattern", hidden: false },
        ],
        hints: [
            "The 'else' block runs only if no exception occurred.",
            "The 'finally' block runs no matter what.",
            "Return the result inside the try block."
        ],
        solutionCode: `# Try/except/else/finally\n\ndef safe_divide(a, b):\n    try:\n        result = a / b\n    except ZeroDivisionError:\n        print('Error: division by zero')\n        return None\n    else:\n        print('Division successful!')\n        return result\n    finally:\n        print('Operation complete.')\n\n# Call with 10, 2\nresult1 = safe_divide(10, 2)\nprint(result1)\n\n# Call with 10, 0\nresult2 = safe_divide(10, 0)\nprint(result2)`,
        requiredConstructs: ["function_def", "try_except", "return_statement", "print_function"],
        commonErrors: [
            { pattern: "except.*else.*except", feedback: "'else' comes after all 'except' blocks, before 'finally'." }
        ],
        tags: ["error-handling", "try-except-else-finally", "functions"]
    },
    {
        id: "m9_a4",
        moduleId: 9,
        title: "Input Validation",
        difficulty: "medium",
        xpReward: 25,
        description: "Validate user input using try/except and while loops.",
        instructions: [
            "Define a function 'validate_age(input_str)' that:",
            "  - Tries to convert the string to an integer.",
            "  - If it's not a valid number, raise ValueError with 'Not a number'.",
            "  - If the age is negative, raise ValueError with 'Age cannot be negative'.",
            "  - If age > 150, raise ValueError with 'Age seems unrealistic'.",
            "  - Otherwise, return the age.",
            "Test with inputs: '25', 'abc', '-5', '200'. Print results or error messages."
        ],
        starterCode: `# Input validation\n\ndef validate_age(input_str):\n    # Convert, validate, and return\n    pass\n\n# Test cases\ntest_inputs = ['25', 'abc', '-5', '200']\nfor test in test_inputs:\n    try:\n        age = validate_age(test)\n        print(f"Valid age: {age}")\n    except ValueError as e:\n        print(f"Invalid: {e}")\n`,
        testCases: [
            { input: "", expectedOutput: "Valid age: 25\nInvalid: Not a number\nInvalid: Age cannot be negative\nInvalid: Age seems unrealistic", description: "Should validate each input", hidden: false },
        ],
        hints: [
            "Use try/except inside the function to catch int() conversion failure.",
            "Use 'raise ValueError(message)' for custom validation errors.",
            "The caller catches the ValueError and prints the message."
        ],
        solutionCode: `# Input validation\n\ndef validate_age(input_str):\n    try:\n        age = int(input_str)\n    except ValueError:\n        raise ValueError('Not a number')\n    if age < 0:\n        raise ValueError('Age cannot be negative')\n    if age > 150:\n        raise ValueError('Age seems unrealistic')\n    return age\n\n# Test cases\ntest_inputs = ['25', 'abc', '-5', '200']\nfor test in test_inputs:\n    try:\n        age = validate_age(test)\n        print(f"Valid age: {age}")\n    except ValueError as e:\n        print(f"Invalid: {e}")`,
        requiredConstructs: ["function_def", "try_except", "if_statement", "for_loop", "print_function"],
        commonErrors: [
            { pattern: "return 'Invalid'", feedback: "Raise a ValueError instead of returning a string. The caller will catch it." }
        ],
        tags: ["error-handling", "validation", "raise", "ValueError"]
    },
    {
        id: "m9_a5",
        moduleId: 9,
        title: "Simulated File Operations",
        difficulty: "hard",
        xpReward: 35,
        description: "Simulate file I/O operations using strings and error handling (since we're in a browser).",
        instructions: [
            "Create a simulated 'file system' using a dictionary: files = {}",
            "Define 'write_file(files, name, content)' that stores content in the dict.",
            "Define 'read_file(files, name)' that returns content or raises FileNotFoundError.",
            "Define 'append_file(files, name, content)' that appends to existing content.",
            "Write 'hello.txt' with 'Hello, World!', then append ' Goodbye!', then read and print it.",
            "Try to read 'missing.txt' and handle the error."
        ],
        starterCode: `# Simulated file operations\n\nfiles = {}\n\ndef write_file(files, name, content):\n    pass\n\ndef read_file(files, name):\n    pass\n\ndef append_file(files, name, content):\n    pass\n\n# Write hello.txt\n\n# Append to hello.txt\n\n# Read and print hello.txt\n\n# Try to read missing.txt\n`,
        testCases: [
            { input: "", expectedOutput: "Hello, World! Goodbye!\nError: File 'missing.txt' not found", description: "Should simulate file operations", hidden: false },
        ],
        hints: [
            "write_file: simply assign files[name] = content",
            "read_file: check if name in files, raise FileNotFoundError if not.",
            "append_file: files[name] = files.get(name, '') + content"
        ],
        solutionCode: `# Simulated file operations\n\nfiles = {}\n\ndef write_file(files, name, content):\n    files[name] = content\n\ndef read_file(files, name):\n    if name not in files:\n        raise FileNotFoundError(f"File '{name}' not found")\n    return files[name]\n\ndef append_file(files, name, content):\n    files[name] = files.get(name, '') + content\n\n# Write hello.txt\nwrite_file(files, 'hello.txt', 'Hello, World!')\n\n# Append to hello.txt\nappend_file(files, 'hello.txt', ' Goodbye!')\n\n# Read and print hello.txt\nprint(read_file(files, 'hello.txt'))\n\n# Try to read missing.txt\ntry:\n    print(read_file(files, 'missing.txt'))\nexcept FileNotFoundError as e:\n    print(f"Error: {e}")`,
        requiredConstructs: ["function_def", "if_statement", "try_except", "print_function"],
        commonErrors: [
            { pattern: "open\\(", feedback: "We're simulating files with dictionaries since we're in a browser. No actual file I/O needed." }
        ],
        tags: ["file-io", "simulation", "error-handling", "dictionaries"]
    },
    {
        id: "m9_a6",
        moduleId: 9,
        title: "Custom Exceptions",
        difficulty: "hard",
        xpReward: 40,
        description: "Define and use custom exception classes for domain-specific error handling.",
        instructions: [
            "Define a custom exception 'InsufficientFundsError' that inherits from Exception.",
            "Its __init__ should accept 'balance' and 'amount' and set a descriptive message.",
            "Define a 'BankAccount' class with a 'balance' attribute and a 'withdraw' method.",
            "The withdraw method raises InsufficientFundsError if amount > balance.",
            "Create an account with balance 100. Withdraw 30, print balance.",
            "Try to withdraw 200, catch the custom error and print the message."
        ],
        starterCode: `# Custom exceptions\n\n# Define InsufficientFundsError\n\n# Define BankAccount class\n\n# Create account with balance 100\n\n# Withdraw 30 and print balance\n\n# Try to withdraw 200\n`,
        testCases: [
            { input: "", expectedOutput: "70\nError: Cannot withdraw $200. Current balance: $70", description: "Should use custom exception", hidden: false },
        ],
        hints: [
            "Custom exceptions inherit from Exception: class InsufficientFundsError(Exception):",
            "In __init__, call super().__init__(message) with a formatted message.",
            "The withdraw method checks if amount > self.balance before subtracting."
        ],
        solutionCode: `# Custom exceptions\n\nclass InsufficientFundsError(Exception):\n    def __init__(self, balance, amount):\n        self.balance = balance\n        self.amount = amount\n        super().__init__(f"Cannot withdraw \${amount}. Current balance: \${balance}")\n\nclass BankAccount:\n    def __init__(self, balance):\n        self.balance = balance\n    \n    def withdraw(self, amount):\n        if amount > self.balance:\n            raise InsufficientFundsError(self.balance, amount)\n        self.balance -= amount\n\n# Create account with balance 100\naccount = BankAccount(100)\n\n# Withdraw 30 and print balance\naccount.withdraw(30)\nprint(account.balance)\n\n# Try to withdraw 200\ntry:\n    account.withdraw(200)\nexcept InsufficientFundsError as e:\n    print(f"Error: {e}")`,
        requiredConstructs: ["class_def", "function_def", "try_except", "if_statement", "print_function"],
        commonErrors: [
            { pattern: "class InsufficientFundsError:", feedback: "Custom exceptions should inherit from Exception: class InsufficientFundsError(Exception):" }
        ],
        tags: ["custom-exceptions", "classes", "error-handling", "OOP"]
    },

    // ========================================================
    // MODULE 10: Classes, Objects, Inheritance
    // ========================================================
    {
        id: "m10_a1",
        moduleId: 10,
        title: "Your First Class",
        difficulty: "easy",
        xpReward: 10,
        description: "Define a simple class with an __init__ method and an instance method.",
        instructions: [
            "Define a class 'Dog' with an __init__ that takes 'name' and 'breed'.",
            "Add a method 'bark' that prints '{name} says Woof!'",
            "Create a dog: buddy = Dog('Buddy', 'Golden Retriever').",
            "Print buddy's name and breed.",
            "Call buddy.bark()."
        ],
        starterCode: `# Define a Dog class\n\n# Create buddy\n\n# Print name and breed\n\n# Call bark()\n`,
        testCases: [
            { input: "", expectedOutput: "Buddy\nGolden Retriever\nBuddy says Woof!", description: "Should create and use a Dog object", hidden: false },
        ],
        hints: [
            "class Dog: ... def __init__(self, name, breed):",
            "Store attributes with self.name = name, self.breed = breed.",
            "Methods take 'self' as the first parameter."
        ],
        solutionCode: `# Define a Dog class\nclass Dog:\n    def __init__(self, name, breed):\n        self.name = name\n        self.breed = breed\n    \n    def bark(self):\n        print(f"{self.name} says Woof!")\n\n# Create buddy\nbuddy = Dog('Buddy', 'Golden Retriever')\n\n# Print name and breed\nprint(buddy.name)\nprint(buddy.breed)\n\n# Call bark()\nbuddy.bark()`,
        requiredConstructs: ["class_def", "function_def", "print_function"],
        commonErrors: [
            { pattern: "def __init__\\(name", feedback: "The first parameter of all methods must be 'self': def __init__(self, name, breed):" },
            { pattern: "def bark\\(\\)", feedback: "Methods need 'self' as the first parameter: def bark(self):" }
        ],
        tags: ["classes", "OOP", "init", "methods"]
    },
    {
        id: "m10_a2",
        moduleId: 10,
        title: "Class with Methods",
        difficulty: "easy",
        xpReward: 15,
        description: "Create a class with multiple methods that interact with instance data.",
        instructions: [
            "Define a 'Rectangle' class with __init__(self, width, height).",
            "Add a method 'area()' that returns width * height.",
            "Add a method 'perimeter()' that returns 2 * (width + height).",
            "Add a method 'describe()' that prints 'Rectangle: WxH, Area: A, Perimeter: P'.",
            "Create a rectangle (5, 3) and call describe()."
        ],
        starterCode: `# Rectangle class\n\n# Define the class with area, perimeter, and describe methods\n\n# Create a rectangle 5x3\n\n# Call describe()\n`,
        testCases: [
            { input: "", expectedOutput: "Rectangle: 5x3, Area: 15, Perimeter: 16", description: "Should describe the rectangle", hidden: false },
        ],
        hints: [
            "Store width and height in __init__ with self.width, self.height.",
            "Methods can call other methods: self.area() inside describe().",
            "Use f-strings in describe for formatted output."
        ],
        solutionCode: `# Rectangle class\n\nclass Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    \n    def area(self):\n        return self.width * self.height\n    \n    def perimeter(self):\n        return 2 * (self.width + self.height)\n    \n    def describe(self):\n        print(f"Rectangle: {self.width}x{self.height}, Area: {self.area()}, Perimeter: {self.perimeter()}")\n\n# Create a rectangle 5x3\nrect = Rectangle(5, 3)\n\n# Call describe()\nrect.describe()`,
        requiredConstructs: ["class_def", "function_def", "return_statement", "print_function"],
        commonErrors: [
            { pattern: "self.area", feedback: "Call the method with parentheses: self.area(), not self.area" }
        ],
        tags: ["classes", "methods", "OOP", "geometry"]
    },
    {
        id: "m10_a3",
        moduleId: 10,
        title: "String Representation",
        difficulty: "medium",
        xpReward: 20,
        description: "Implement __str__ and __repr__ for readable object representations.",
        instructions: [
            "Define a 'Book' class with __init__(self, title, author, pages).",
            "Implement __str__ to return: 'Title by Author (P pages)'.",
            "Implement __repr__ to return: \"Book('Title', 'Author', P)\".",
            "Create a book: 'The Great Gatsby' by 'F. Scott Fitzgerald', 180 pages.",
            "Print the book (triggers __str__).",
            "Print repr(book) (triggers __repr__)."
        ],
        starterCode: `# Book class with __str__ and __repr__\n\n# Define the Book class\n\n# Create a book\n\n# Print the book (uses __str__)\n\n# Print repr (uses __repr__)\n`,
        testCases: [
            { input: "", expectedOutput: "The Great Gatsby by F. Scott Fitzgerald (180 pages)\nBook('The Great Gatsby', 'F. Scott Fitzgerald', 180)", description: "Should show both representations", hidden: false },
        ],
        hints: [
            "__str__ is called by print() and str().",
            "__repr__ is called by repr() and in the interactive shell.",
            "Both should return strings, not print them."
        ],
        solutionCode: `# Book class with __str__ and __repr__\n\nclass Book:\n    def __init__(self, title, author, pages):\n        self.title = title\n        self.author = author\n        self.pages = pages\n    \n    def __str__(self):\n        return f"{self.title} by {self.author} ({self.pages} pages)"\n    \n    def __repr__(self):\n        return f"Book('{self.title}', '{self.author}', {self.pages})"\n\n# Create a book\nbook = Book('The Great Gatsby', 'F. Scott Fitzgerald', 180)\n\n# Print the book (uses __str__)\nprint(book)\n\n# Print repr (uses __repr__)\nprint(repr(book))`,
        requiredConstructs: ["class_def", "function_def", "return_statement", "print_function"],
        commonErrors: [
            { pattern: "print\\(.*__str__", feedback: "__str__ is called automatically by print(). Just do: print(book)" }
        ],
        tags: ["classes", "dunder-methods", "__str__", "__repr__"]
    },
    {
        id: "m10_a4",
        moduleId: 10,
        title: "Inheritance Basics",
        difficulty: "medium",
        xpReward: 25,
        description: "Create a parent class and child classes that inherit and extend behavior.",
        instructions: [
            "Define a 'Vehicle' class with __init__(self, make, model, year) and a method 'info()' that returns '{year} {make} {model}'.",
            "Define a 'Car' class inheriting from Vehicle. Add a 'doors' attribute (default 4). Override info() to include doors.",
            "Define a 'Motorcycle' class inheriting from Vehicle. Override info() to add '(Motorcycle)'.",
            "Create a Car('Toyota', 'Camry', 2023) and a Motorcycle('Harley', 'Street 750', 2022).",
            "Print the info for each."
        ],
        starterCode: `# Inheritance\n\n# Define Vehicle class\n\n# Define Car class (inherits Vehicle)\n\n# Define Motorcycle class (inherits Vehicle)\n\n# Create car and motorcycle\n\n# Print info for each\n`,
        testCases: [
            { input: "", expectedOutput: "2023 Toyota Camry (4 doors)\n2022 Harley Street 750 (Motorcycle)", description: "Should show inherited behavior", hidden: false },
        ],
        hints: [
            "Inherit with: class Car(Vehicle):",
            "Call parent __init__ with: super().__init__(make, model, year)",
            "Override info() in the child class to customize the output."
        ],
        solutionCode: `# Inheritance\n\nclass Vehicle:\n    def __init__(self, make, model, year):\n        self.make = make\n        self.model = model\n        self.year = year\n    \n    def info(self):\n        return f"{self.year} {self.make} {self.model}"\n\nclass Car(Vehicle):\n    def __init__(self, make, model, year, doors=4):\n        super().__init__(make, model, year)\n        self.doors = doors\n    \n    def info(self):\n        return f"{super().info()} ({self.doors} doors)"\n\nclass Motorcycle(Vehicle):\n    def info(self):\n        return f"{super().info()} (Motorcycle)"\n\n# Create car and motorcycle\ncar = Car('Toyota', 'Camry', 2023)\nmotorcycle = Motorcycle('Harley', 'Street 750', 2022)\n\n# Print info for each\nprint(car.info())\nprint(motorcycle.info())`,
        requiredConstructs: ["class_def", "function_def", "return_statement", "print_function"],
        commonErrors: [
            { pattern: "Vehicle.__init__\\(self", feedback: "Use super().__init__() instead of Vehicle.__init__(self, ...)." }
        ],
        tags: ["classes", "inheritance", "super", "OOP"]
    },
    {
        id: "m10_a5",
        moduleId: 10,
        title: "Shopping Cart Class",
        difficulty: "hard",
        xpReward: 35,
        description: "Build a ShoppingCart class with add, remove, and total functionality.",
        instructions: [
            "Define a 'ShoppingCart' class with an empty list 'items' in __init__.",
            "Each item is a dict: {'name': str, 'price': float, 'quantity': int}.",
            "Add method 'add_item(name, price, quantity=1)' to add items.",
            "Add method 'total()' that returns the sum of price * quantity for all items.",
            "Add method 'display()' that prints each item and the total.",
            "Add: 'Apple' ($1.50, qty 3), 'Bread' ($2.99, qty 1), 'Milk' ($3.49, qty 2).",
            "Call display()."
        ],
        starterCode: `# Shopping Cart class\n\nclass ShoppingCart:\n    def __init__(self):\n        pass\n    \n    def add_item(self, name, price, quantity=1):\n        pass\n    \n    def total(self):\n        pass\n    \n    def display(self):\n        pass\n\n# Create cart and add items\ncart = ShoppingCart()\ncart.add_item('Apple', 1.50, 3)\ncart.add_item('Bread', 2.99, 1)\ncart.add_item('Milk', 3.49, 2)\ncart.display()\n`,
        testCases: [
            { input: "", expectedOutput: "Apple x3 - $4.50\nBread x1 - $2.99\nMilk x2 - $6.98\nTotal: $14.47", description: "Should display cart with correct totals", hidden: false },
        ],
        hints: [
            "Store items as dicts: self.items.append({'name': name, 'price': price, 'quantity': quantity})",
            "total: sum(item['price'] * item['quantity'] for item in self.items)",
            "Format prices to 2 decimals: f'${value:.2f}'"
        ],
        solutionCode: `# Shopping Cart class\n\nclass ShoppingCart:\n    def __init__(self):\n        self.items = []\n    \n    def add_item(self, name, price, quantity=1):\n        self.items.append({'name': name, 'price': price, 'quantity': quantity})\n    \n    def total(self):\n        return sum(item['price'] * item['quantity'] for item in self.items)\n    \n    def display(self):\n        for item in self.items:\n            line_total = item['price'] * item['quantity']\n            print(f"{item['name']} x{item['quantity']} - \${line_total:.2f}")\n        print(f"Total: \${self.total():.2f}")\n\n# Create cart and add items\ncart = ShoppingCart()\ncart.add_item('Apple', 1.50, 3)\ncart.add_item('Bread', 2.99, 1)\ncart.add_item('Milk', 3.49, 2)\ncart.display()`,
        requiredConstructs: ["class_def", "function_def", "for_loop", "print_function"],
        commonErrors: [
            { pattern: "self.items = \\[\\].*def __init__", feedback: "Define self.items inside __init__, not at the class level." }
        ],
        tags: ["classes", "OOP", "shopping-cart", "methods"]
    },
    {
        id: "m10_a6",
        moduleId: 10,
        title: "Polymorphism with Shapes",
        difficulty: "hard",
        xpReward: 40,
        description: "Demonstrate polymorphism with a Shape base class and multiple shape implementations.",
        instructions: [
            "Define an abstract-style base class 'Shape' with methods 'area()' and 'name()' that raise NotImplementedError.",
            "Define 'Circle(Shape)' with radius. area = 3.14159 * r^2.",
            "Define 'Square(Shape)' with side. area = side^2.",
            "Define 'Triangle(Shape)' with base and height. area = 0.5 * base * height.",
            "Create a list of shapes. Loop through and print each shape's name and area (2 decimals)."
        ],
        starterCode: `# Polymorphism with shapes\n\nimport math\n\n# Define Shape base class\n\n# Define Circle, Square, Triangle\n\n# Create a list of shapes\nshapes = [\n    # Circle with radius 5\n    # Square with side 4\n    # Triangle with base 6, height 3\n]\n\n# Loop and print name and area for each\n`,
        testCases: [
            { input: "", expectedOutput: "Circle: area = 78.54\nSquare: area = 16.00\nTriangle: area = 9.00", description: "Should show polymorphic behavior", hidden: false },
        ],
        hints: [
            "The base Shape class defines the interface with methods that raise NotImplementedError.",
            "Each child class overrides area() and name() with their own implementation.",
            "Use math.pi or 3.14159 for pi. Format with :.2f"
        ],
        solutionCode: `# Polymorphism with shapes\n\nimport math\n\nclass Shape:\n    def area(self):\n        raise NotImplementedError\n    \n    def name(self):\n        raise NotImplementedError\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n    \n    def area(self):\n        return math.pi * self.radius ** 2\n    \n    def name(self):\n        return 'Circle'\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    \n    def area(self):\n        return self.side ** 2\n    \n    def name(self):\n        return 'Square'\n\nclass Triangle(Shape):\n    def __init__(self, base, height):\n        self.base = base\n        self.height = height\n    \n    def area(self):\n        return 0.5 * self.base * self.height\n    \n    def name(self):\n        return 'Triangle'\n\n# Create a list of shapes\nshapes = [\n    Circle(5),\n    Square(4),\n    Triangle(6, 3)\n]\n\n# Loop and print name and area for each\nfor shape in shapes:\n    print(f"{shape.name()}: area = {shape.area():.2f}")`,
        requiredConstructs: ["class_def", "function_def", "for_loop", "return_statement", "print_function"],
        commonErrors: [
            { pattern: "ABC", feedback: "You don't need ABC for this exercise. Simply raise NotImplementedError in the base class." }
        ],
        tags: ["classes", "polymorphism", "inheritance", "OOP"]
    },

    // ========================================================
    // MODULE 11: Importing Modules, Using Standard Library
    // ========================================================
    {
        id: "m11_a1",
        moduleId: 11,
        title: "Math Module",
        difficulty: "easy",
        xpReward: 10,
        description: "Import and use the math module for mathematical operations.",
        instructions: [
            "Import the math module.",
            "Print the value of pi (math.pi) rounded to 4 decimals.",
            "Print the square root of 144 using math.sqrt().",
            "Print the ceiling of 4.3 using math.ceil().",
            "Print the floor of 4.7 using math.floor().",
            "Print the factorial of 5 using math.factorial()."
        ],
        starterCode: `# Using the math module\n\nimport math\n\n# Print pi rounded to 4 decimals\n\n# Square root of 144\n\n# Ceiling of 4.3\n\n# Floor of 4.7\n\n# Factorial of 5\n`,
        testCases: [
            { input: "", expectedOutput: "3.1416\n12.0\n5\n4\n120", description: "Should use math module functions correctly", hidden: false },
        ],
        hints: [
            "round(math.pi, 4) gives pi to 4 decimal places.",
            "math.sqrt(144) returns 12.0 (a float).",
            "math.ceil rounds up, math.floor rounds down."
        ],
        solutionCode: `# Using the math module\n\nimport math\n\n# Print pi rounded to 4 decimals\nprint(round(math.pi, 4))\n\n# Square root of 144\nprint(math.sqrt(144))\n\n# Ceiling of 4.3\nprint(math.ceil(4.3))\n\n# Floor of 4.7\nprint(math.floor(4.7))\n\n# Factorial of 5\nprint(math.factorial(5))`,
        requiredConstructs: ["import_statement", "print_function"],
        commonErrors: [
            { pattern: "from math import \\*", feedback: "Avoid 'from math import *'. Use 'import math' and access with math.function_name()." }
        ],
        tags: ["modules", "math", "import", "standard-library"]
    },
    {
        id: "m11_a2",
        moduleId: 11,
        title: "Random Module",
        difficulty: "easy",
        xpReward: 15,
        description: "Use the random module with a seed for reproducible results.",
        instructions: [
            "Import random and set the seed to 42: random.seed(42).",
            "Print a random integer between 1 and 10 using random.randint(1, 10).",
            "Print a random float between 0 and 1 using random.random(), rounded to 4 decimals.",
            "Create a list: colors = ['red', 'blue', 'green', 'yellow'].",
            "Print a random choice from colors using random.choice().",
            "Shuffle the colors list and print it."
        ],
        starterCode: `# Using the random module\n\nimport random\nrandom.seed(42)\n\n# Random integer 1-10\n\n# Random float 0-1 (4 decimals)\n\ncolors = ['red', 'blue', 'green', 'yellow']\n\n# Random choice from colors\n\n# Shuffle and print colors\n`,
        testCases: [
            { input: "", expectedOutput: "2\n0.6395\ngreen\n['yellow', 'green', 'red', 'blue']", description: "Should produce seeded random results", hidden: false },
        ],
        hints: [
            "random.seed(42) ensures the same 'random' numbers each time.",
            "random.randint(a, b) includes both endpoints.",
            "random.shuffle() modifies the list in place."
        ],
        solutionCode: `# Using the random module\n\nimport random\nrandom.seed(42)\n\n# Random integer 1-10\nprint(random.randint(1, 10))\n\n# Random float 0-1 (4 decimals)\nprint(round(random.random(), 4))\n\ncolors = ['red', 'blue', 'green', 'yellow']\n\n# Random choice from colors\nprint(random.choice(colors))\n\n# Shuffle and print colors\nrandom.shuffle(colors)\nprint(colors)`,
        requiredConstructs: ["import_statement", "print_function"],
        commonErrors: [
            { pattern: "random.random\\(1, 10\\)", feedback: "random.random() takes no arguments. Use random.randint(1, 10) for a range." }
        ],
        tags: ["modules", "random", "import", "standard-library"]
    },
    {
        id: "m11_a3",
        moduleId: 11,
        title: "Datetime Module",
        difficulty: "medium",
        xpReward: 20,
        description: "Work with dates and times using the datetime module.",
        instructions: [
            "Import datetime from the datetime module.",
            "Create a date: birthday = datetime(1990, 6, 15).",
            "Print the date formatted as 'June 15, 1990' using strftime.",
            "Create another date: today = datetime(2024, 1, 15).",
            "Calculate the difference and print the number of days between them.",
            "Print the day of the week for the birthday (e.g., 'Friday')."
        ],
        starterCode: `# Using the datetime module\n\nfrom datetime import datetime\n\n# Create birthday date\nbirthday = datetime(1990, 6, 15)\n\n# Print formatted: 'June 15, 1990'\n\n# Create today date\ntoday = datetime(2024, 1, 15)\n\n# Print days between\n\n# Print day of week for birthday\n`,
        testCases: [
            { input: "", expectedOutput: "June 15, 1990\n12267\nFriday", description: "Should format dates and calculate differences", hidden: false },
        ],
        hints: [
            "strftime('%B %d, %Y') formats as 'Month Day, Year'.",
            "Subtract dates to get a timedelta: diff = today - birthday.",
            "diff.days gives the number of days.",
            "strftime('%A') gives the full day name."
        ],
        solutionCode: `# Using the datetime module\n\nfrom datetime import datetime\n\n# Create birthday date\nbirthday = datetime(1990, 6, 15)\n\n# Print formatted: 'June 15, 1990'\nprint(birthday.strftime('%B %d, %Y'))\n\n# Create today date\ntoday = datetime(2024, 1, 15)\n\n# Print days between\ndiff = today - birthday\nprint(diff.days)\n\n# Print day of week for birthday\nprint(birthday.strftime('%A'))`,
        requiredConstructs: ["import_statement", "print_function"],
        commonErrors: [
            { pattern: "import datetime\n.*datetime.datetime", feedback: "With 'from datetime import datetime', you use datetime() directly, not datetime.datetime()." }
        ],
        tags: ["modules", "datetime", "formatting", "standard-library"]
    },
    {
        id: "m11_a4",
        moduleId: 11,
        title: "Collections Module",
        difficulty: "medium",
        xpReward: 25,
        description: "Use Counter and defaultdict from the collections module.",
        instructions: [
            "From collections, import Counter and defaultdict.",
            "Count letter frequencies in 'mississippi' using Counter. Print the Counter.",
            "Print the 2 most common letters.",
            "Create a defaultdict(list). Group words by their first letter: ['apple', 'banana', 'avocado', 'blueberry', 'cherry', 'apricot'].",
            "Print the grouped dictionary sorted by keys."
        ],
        starterCode: `# Collections module\n\nfrom collections import Counter, defaultdict\n\n# Count letters in 'mississippi'\n\n# Print 2 most common\n\n# Group words by first letter\nwords = ['apple', 'banana', 'avocado', 'blueberry', 'cherry', 'apricot']\n\n# Print grouped (sorted by key)\n`,
        testCases: [
            { input: "", expectedOutput: "Counter({'s': 4, 'i': 4, 'p': 2, 'm': 1})\n[('s', 4), ('i', 4)]\na: ['apple', 'avocado', 'apricot']\nb: ['banana', 'blueberry']\nc: ['cherry']", description: "Should use Counter and defaultdict", hidden: false },
        ],
        hints: [
            "Counter('mississippi') counts each character.",
            ".most_common(2) returns the top 2.",
            "defaultdict(list) creates a new list for missing keys automatically."
        ],
        solutionCode: `# Collections module\n\nfrom collections import Counter, defaultdict\n\n# Count letters in 'mississippi'\nletter_count = Counter('mississippi')\nprint(letter_count)\n\n# Print 2 most common\nprint(letter_count.most_common(2))\n\n# Group words by first letter\nwords = ['apple', 'banana', 'avocado', 'blueberry', 'cherry', 'apricot']\ngrouped = defaultdict(list)\nfor word in words:\n    grouped[word[0]].append(word)\n\n# Print grouped (sorted by key)\nfor key in sorted(grouped):\n    print(f"{key}: {grouped[key]}")`,
        requiredConstructs: ["import_statement", "for_loop", "print_function"],
        commonErrors: [
            { pattern: "defaultdict\\(\\)", feedback: "Provide a factory: defaultdict(list), not defaultdict()." }
        ],
        tags: ["modules", "collections", "Counter", "defaultdict"]
    },
    {
        id: "m11_a5",
        moduleId: 11,
        title: "String and Itertools",
        difficulty: "hard",
        xpReward: 35,
        description: "Use the string module constants and itertools for combinatorics.",
        instructions: [
            "Import string and itertools.",
            "Print the first 10 ASCII lowercase letters using string.ascii_lowercase.",
            "Print all digits using string.digits.",
            "Use itertools.combinations to find all 2-letter combinations from 'ABCD'. Print as list.",
            "Use itertools.chain to combine [1,2,3] and [4,5,6] into one sequence. Print as list."
        ],
        starterCode: `# String and itertools modules\n\nimport string\nimport itertools\n\n# First 10 lowercase letters\n\n# All digits\n\n# All 2-letter combinations from 'ABCD'\n\n# Chain two lists together\n`,
        testCases: [
            { input: "", expectedOutput: "abcdefghij\n0123456789\n[('A', 'B'), ('A', 'C'), ('A', 'D'), ('B', 'C'), ('B', 'D'), ('C', 'D')]\n[1, 2, 3, 4, 5, 6]", description: "Should use string and itertools modules", hidden: false },
        ],
        hints: [
            "string.ascii_lowercase is 'abcdefghijklmnopqrstuvwxyz'. Slice with [:10].",
            "itertools.combinations('ABCD', 2) gives all 2-element combos.",
            "itertools.chain(list1, list2) merges iterables."
        ],
        solutionCode: `# String and itertools modules\n\nimport string\nimport itertools\n\n# First 10 lowercase letters\nprint(string.ascii_lowercase[:10])\n\n# All digits\nprint(string.digits)\n\n# All 2-letter combinations from 'ABCD'\nprint(list(itertools.combinations('ABCD', 2)))\n\n# Chain two lists together\nprint(list(itertools.chain([1, 2, 3], [4, 5, 6])))`,
        requiredConstructs: ["import_statement", "print_function"],
        commonErrors: [
            { pattern: "combinations\\(", feedback: "Don't forget to wrap in list(): list(itertools.combinations(...))" }
        ],
        tags: ["modules", "string", "itertools", "standard-library"]
    },
    {
        id: "m11_a6",
        moduleId: 11,
        title: "JSON Module",
        difficulty: "hard",
        xpReward: 35,
        description: "Serialize and deserialize data using the json module.",
        instructions: [
            "Import json.",
            "Create a dictionary: data = {'name': 'Alice', 'scores': [95, 87, 92], 'active': True}",
            "Convert to a JSON string with indent=2 and print it.",
            "Parse the JSON string back to a dictionary and print the type.",
            "Print the 'scores' value from the parsed dictionary."
        ],
        starterCode: `# JSON module\n\nimport json\n\ndata = {'name': 'Alice', 'scores': [95, 87, 92], 'active': True}\n\n# Convert to JSON string (indented) and print\n\n# Parse back to dictionary\n\n# Print the type of parsed data\n\n# Print the scores\n`,
        testCases: [
            { input: "", expectedOutput: '{\n  "name": "Alice",\n  "scores": [\n    95,\n    87,\n    92\n  ],\n  "active": true\n}\n<class \'dict\'>\n[95, 87, 92]', description: "Should serialize and deserialize JSON", hidden: false },
        ],
        hints: [
            "json.dumps(data, indent=2) converts dict to formatted JSON string.",
            "json.loads(json_string) parses JSON string back to Python objects.",
            "Python True becomes JSON true, and vice versa."
        ],
        solutionCode: `# JSON module\n\nimport json\n\ndata = {'name': 'Alice', 'scores': [95, 87, 92], 'active': True}\n\n# Convert to JSON string (indented) and print\njson_str = json.dumps(data, indent=2)\nprint(json_str)\n\n# Parse back to dictionary\nparsed = json.loads(json_str)\n\n# Print the type of parsed data\nprint(type(parsed))\n\n# Print the scores\nprint(parsed['scores'])`,
        requiredConstructs: ["import_statement", "variable_assignment", "print_function"],
        commonErrors: [
            { pattern: "json.dump\\(", feedback: "json.dump() writes to a file. Use json.dumps() (with 's') to get a string." }
        ],
        tags: ["modules", "json", "serialization", "standard-library"]
    },

    // ========================================================
    // MODULE 12: List Comprehensions, Generators, Decorators
    // ========================================================
    {
        id: "m12_a1",
        moduleId: 12,
        title: "List Comprehension Basics",
        difficulty: "easy",
        xpReward: 10,
        description: "Create lists using list comprehensions instead of for loops.",
        instructions: [
            "Create a list of squares from 1 to 5 using a list comprehension. Print it.",
            "Create a list of even numbers from 1 to 10 using a comprehension with a condition. Print it.",
            "Create a list of uppercase letters from the word 'hello'. Print it."
        ],
        starterCode: `# List comprehensions\n\n# Squares of 1 to 5: [1, 4, 9, 16, 25]\n\n# Even numbers from 1 to 10: [2, 4, 6, 8, 10]\n\n# Uppercase letters from 'hello': ['H', 'E', 'L', 'L', 'O']\n`,
        testCases: [
            { input: "", expectedOutput: "[1, 4, 9, 16, 25]\n[2, 4, 6, 8, 10]\n['H', 'E', 'L', 'L', 'O']", description: "Should create lists with comprehensions", hidden: false },
        ],
        hints: [
            "Basic syntax: [expression for item in iterable]",
            "With filter: [expression for item in iterable if condition]",
            "Squares: [x**2 for x in range(1, 6)]"
        ],
        solutionCode: `# List comprehensions\n\n# Squares of 1 to 5\nprint([x**2 for x in range(1, 6)])\n\n# Even numbers from 1 to 10\nprint([x for x in range(1, 11) if x % 2 == 0])\n\n# Uppercase letters from 'hello'\nprint([c.upper() for c in 'hello'])`,
        requiredConstructs: ["print_function"],
        commonErrors: [
            { pattern: "for x in range.*\\n.*append", feedback: "Use a list comprehension instead of a loop with append." }
        ],
        tags: ["list-comprehension", "basics"]
    },
    {
        id: "m12_a2",
        moduleId: 12,
        title: "Dictionary and Set Comprehensions",
        difficulty: "easy",
        xpReward: 15,
        description: "Use comprehension syntax for dictionaries and sets.",
        instructions: [
            "Create a dict mapping numbers 1-5 to their squares: {1: 1, 2: 4, ...}. Print it.",
            "From the sentence 'the quick brown fox', create a set of unique word lengths. Print sorted list.",
            "Create a dict from two lists: keys = ['a', 'b', 'c'], values = [1, 2, 3]. Print it."
        ],
        starterCode: `# Dict and set comprehensions\n\n# Number to square mapping for 1-5\n\n# Unique word lengths from 'the quick brown fox'\n\n# Dict from two lists\nkeys = ['a', 'b', 'c']\nvalues = [1, 2, 3]\n`,
        testCases: [
            { input: "", expectedOutput: "{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}\n[3, 5]\n{'a': 1, 'b': 2, 'c': 3}", description: "Should create dicts and sets with comprehensions", hidden: false },
        ],
        hints: [
            "Dict comprehension: {key: value for item in iterable}",
            "Set comprehension: {expression for item in iterable}",
            "Use zip(keys, values) to pair up two lists."
        ],
        solutionCode: `# Dict and set comprehensions\n\n# Number to square mapping for 1-5\nprint({x: x**2 for x in range(1, 6)})\n\n# Unique word lengths from 'the quick brown fox'\nprint(sorted({len(w) for w in 'the quick brown fox'.split()}))\n\n# Dict from two lists\nkeys = ['a', 'b', 'c']\nvalues = [1, 2, 3]\nprint({k: v for k, v in zip(keys, values)})`,
        requiredConstructs: ["print_function"],
        commonErrors: [
            { pattern: "dict\\(zip", feedback: "That works too! But try using a dict comprehension: {k: v for k, v in zip(keys, values)}" }
        ],
        tags: ["dict-comprehension", "set-comprehension", "zip"]
    },
    {
        id: "m12_a3",
        moduleId: 12,
        title: "Nested Comprehensions",
        difficulty: "medium",
        xpReward: 25,
        description: "Use nested list comprehensions for multi-dimensional data.",
        instructions: [
            "Create a 3x3 multiplication table using nested comprehension. Print each row.",
            "Flatten a 2D list: matrix = [[1,2,3],[4,5,6],[7,8,9]]. Print the flat list.",
            "Find all pairs (x, y) where x is from [1,2,3] and y is from [1,2,3] and x != y. Print the pairs."
        ],
        starterCode: `# Nested comprehensions\n\n# 3x3 multiplication table\n# Row 1: [1, 2, 3]\n# Row 2: [2, 4, 6]\n# Row 3: [3, 6, 9]\n\n# Flatten a matrix\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n\n# All pairs where x != y\n`,
        testCases: [
            { input: "", expectedOutput: "[1, 2, 3]\n[2, 4, 6]\n[3, 6, 9]\n[1, 2, 3, 4, 5, 6, 7, 8, 9]\n[(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]", description: "Should use nested comprehensions", hidden: false },
        ],
        hints: [
            "Multiplication table: [[row * col for col in range(1, 4)] for row in range(1, 4)]",
            "Flatten: [item for row in matrix for item in row]",
            "Pairs: [(x, y) for x in range(1,4) for y in range(1,4) if x != y]"
        ],
        solutionCode: `# Nested comprehensions\n\n# 3x3 multiplication table\ntable = [[row * col for col in range(1, 4)] for row in range(1, 4)]\nfor row in table:\n    print(row)\n\n# Flatten a matrix\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nflat = [item for row in matrix for item in row]\nprint(flat)\n\n# All pairs where x != y\npairs = [(x, y) for x in range(1, 4) for y in range(1, 4) if x != y]\nprint(pairs)`,
        requiredConstructs: ["for_loop", "print_function"],
        commonErrors: [
            { pattern: "for item in matrix", feedback: "To flatten, iterate over rows first, then items: [item for row in matrix for item in row]" }
        ],
        tags: ["list-comprehension", "nested", "flatten", "matrix"]
    },
    {
        id: "m12_a4",
        moduleId: 12,
        title: "Generators",
        difficulty: "medium",
        xpReward: 25,
        description: "Create and use generator functions with the yield keyword.",
        instructions: [
            "Define a generator 'countdown(n)' that yields numbers from n down to 1.",
            "Use it to print a countdown from 5.",
            "Define a generator 'fibonacci(limit)' that yields Fibonacci numbers up to 'limit'.",
            "Print all Fibonacci numbers up to 50.",
            "Create a generator expression for squares of 1-5 and print the sum."
        ],
        starterCode: `# Generators\n\n# Define countdown generator\n\n# Print countdown from 5\n\n# Define fibonacci generator\n\n# Print Fibonacci numbers up to 50\n\n# Generator expression: sum of squares 1-5\n`,
        testCases: [
            { input: "", expectedOutput: "5\n4\n3\n2\n1\n1\n1\n2\n3\n5\n8\n13\n21\n34\n55", description: "Should demonstrate generators", hidden: false },
        ],
        hints: [
            "Use 'yield' instead of 'return' in generators.",
            "countdown: while n > 0: yield n; n -= 1",
            "A generator expression looks like a list comprehension with () instead of []."
        ],
        solutionCode: `# Generators\n\n# Define countdown generator\ndef countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\n# Print countdown from 5\nfor num in countdown(5):\n    print(num)\n\n# Define fibonacci generator\ndef fibonacci(limit):\n    a, b = 0, 1\n    while b <= limit:\n        yield b\n        a, b = b, a + b\n\n# Print Fibonacci numbers up to 50\nfor num in fibonacci(50):\n    print(num)\n\n# Generator expression: sum of squares 1-5\nprint(sum(x**2 for x in range(1, 6)))`,
        requiredConstructs: ["function_def", "for_loop", "print_function"],
        commonErrors: [
            { pattern: "return", feedback: "Generators use 'yield', not 'return'. Each yield pauses the function and produces a value." }
        ],
        tags: ["generators", "yield", "fibonacci", "lazy-evaluation"]
    },
    {
        id: "m12_a5",
        moduleId: 12,
        title: "Decorators",
        difficulty: "hard",
        xpReward: 35,
        description: "Create and apply function decorators.",
        instructions: [
            "Define a decorator 'bold' that wraps a function's return value in ** markers: '**result**'.",
            "Define a decorator 'uppercase' that converts a function's return value to uppercase.",
            "Define a function 'greet()' that returns 'hello, world' and apply the bold decorator.",
            "Define a function 'greet2()' that returns 'hello, world' and apply both uppercase then bold.",
            "Print the results of calling each."
        ],
        starterCode: `# Decorators\n\n# Define bold decorator: wraps result in '**...**'\n\n# Define uppercase decorator: converts result to uppercase\n\n# Apply @bold to greet\n\n# Apply @bold then @uppercase to greet2\n\n# Print results\n`,
        testCases: [
            { input: "", expectedOutput: "**hello, world**\n**HELLO, WORLD**", description: "Should apply decorators correctly", hidden: false },
        ],
        hints: [
            "A decorator is a function that takes a function and returns a new function.",
            "Pattern: def decorator(func): def wrapper(*args): result = func(*args); return modified_result; return wrapper",
            "Decorators apply bottom-up: @bold above @uppercase means bold(uppercase(func))."
        ],
        solutionCode: `# Decorators\n\n# Define bold decorator\ndef bold(func):\n    def wrapper(*args, **kwargs):\n        result = func(*args, **kwargs)\n        return f"**{result}**"\n    return wrapper\n\n# Define uppercase decorator\ndef uppercase(func):\n    def wrapper(*args, **kwargs):\n        result = func(*args, **kwargs)\n        return result.upper()\n    return wrapper\n\n# Apply @bold to greet\n@bold\ndef greet():\n    return 'hello, world'\n\n# Apply @bold then @uppercase to greet2\n@bold\n@uppercase\ndef greet2():\n    return 'hello, world'\n\n# Print results\nprint(greet())\nprint(greet2())`,
        requiredConstructs: ["function_def", "return_statement", "print_function"],
        commonErrors: [
            { pattern: "def wrapper\\(\\)", feedback: "Use *args and **kwargs in wrapper to handle any arguments: def wrapper(*args, **kwargs):" }
        ],
        tags: ["decorators", "higher-order-functions", "advanced"]
    },
    {
        id: "m12_a6",
        moduleId: 12,
        title: "Advanced Comprehension Challenge",
        difficulty: "hard",
        xpReward: 40,
        description: "Solve complex data transformation problems using comprehensions, map, filter, and reduce.",
        instructions: [
            "Given students data (list of dicts), use comprehensions to:",
            "1. Extract names of students with grade > 85. Print the list.",
            "2. Create a dict mapping names to pass/fail ('pass' if grade >= 70). Print it.",
            "3. Calculate the class average using a generator expression. Print rounded to 1 decimal.",
            "4. Group students by grade category: 'A' (>=90), 'B' (>=80), 'C' (>=70), 'F' (<70). Print the groups."
        ],
        starterCode: `# Advanced comprehension challenge\n\nstudents = [\n    {'name': 'Alice', 'grade': 95},\n    {'name': 'Bob', 'grade': 82},\n    {'name': 'Charlie', 'grade': 67},\n    {'name': 'Diana', 'grade': 91},\n    {'name': 'Eve', 'grade': 78},\n    {'name': 'Frank', 'grade': 88}\n]\n\n# 1. Names with grade > 85\n\n# 2. Name to pass/fail mapping\n\n# 3. Class average\n\n# 4. Group by grade category\n`,
        testCases: [
            { input: "", expectedOutput: "['Alice', 'Diana', 'Frank']\n{'Alice': 'pass', 'Bob': 'pass', 'Charlie': 'fail', 'Diana': 'pass', 'Eve': 'pass', 'Frank': 'pass'}\n83.5\nA: ['Alice', 'Diana']\nB: ['Bob', 'Frank']\nC: ['Eve']\nF: ['Charlie']", description: "Should solve all comprehension challenges", hidden: false },
        ],
        hints: [
            "Filter: [s['name'] for s in students if s['grade'] > 85]",
            "Map: {s['name']: 'pass' if s['grade'] >= 70 else 'fail' for s in students}",
            "Use a helper function to determine the grade category letter."
        ],
        solutionCode: `# Advanced comprehension challenge\n\nstudents = [\n    {'name': 'Alice', 'grade': 95},\n    {'name': 'Bob', 'grade': 82},\n    {'name': 'Charlie', 'grade': 67},\n    {'name': 'Diana', 'grade': 91},\n    {'name': 'Eve', 'grade': 78},\n    {'name': 'Frank', 'grade': 88}\n]\n\n# 1. Names with grade > 85\nhonor_roll = [s['name'] for s in students if s['grade'] > 85]\nprint(honor_roll)\n\n# 2. Name to pass/fail mapping\npass_fail = {s['name']: 'pass' if s['grade'] >= 70 else 'fail' for s in students}\nprint(pass_fail)\n\n# 3. Class average\naverage = sum(s['grade'] for s in students) / len(students)\nprint(round(average, 1))\n\n# 4. Group by grade category\ndef get_category(grade):\n    if grade >= 90: return 'A'\n    if grade >= 80: return 'B'\n    if grade >= 70: return 'C'\n    return 'F'\n\ncategories = {}\nfor s in students:\n    cat = get_category(s['grade'])\n    if cat not in categories:\n        categories[cat] = []\n    categories[cat].append(s['name'])\n\nfor cat in ['A', 'B', 'C', 'F']:\n    if cat in categories:\n        print(f"{cat}: {categories[cat]}")`,
        requiredConstructs: ["function_def", "for_loop", "if_statement", "print_function"],
        commonErrors: [],
        tags: ["comprehensions", "data-transformation", "advanced", "grouping"]
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { activitiesM9M12 };
}
