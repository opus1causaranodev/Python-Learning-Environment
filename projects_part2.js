// ============================================================
// PROJECTS: Part 2 (Projects 5-8)
// 5. Text Adventure Game
// 6. Student Grade Manager
// 7. Password Strength Checker
// 8. Mini Data Analyzer
// ============================================================

const projectsPart2 = [

    // ========================================================
    // PROJECT 5: Text Adventure Game
    // ========================================================
    {
        id: "proj_5",
        title: "Text Adventure Game",
        description: "Build a simple dungeon exploration game with rooms, items, and choices. You'll practice classes, conditionals, game loops, and dictionaries to create an interactive text adventure.",
        difficulty: "intermediate",
        estimatedTime: "45-60 min",
        skills: ["classes", "conditionals", "game-loops", "dictionaries"],
        icon: "🏰",
        steps: [
            {
                stepNumber: 1,
                title: "Create the Room Class",
                description: "Define a Room class that holds a name, description, items, and exits to other rooms.",
                instructions: "Create a Room class with attributes for name, description, items list, and exits dictionary. Add methods to describe the room and pick up items.",
                starterCode: `# Text Adventure Game - Step 1: Room Class

class Room:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.items = []
        self.exits = {}  # {'north': room_obj, 'south': room_obj}

    def add_exit(self, direction, room):
        """Add an exit in a given direction to another room."""
        pass

    def add_item(self, item):
        """Add an item to this room."""
        pass

    def remove_item(self, item):
        """Remove and return an item from this room."""
        pass

    def describe(self):
        """Print full description of the room."""
        pass

# Create some rooms and test
hall = Room("Great Hall", "A vast hall with torches on the walls.")
hall.add_item("rusty key")
hall.add_item("torch")
hall.describe()
`,
                solutionCode: `# Text Adventure Game - Step 1: Room Class

class Room:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.items = []
        self.exits = {}

    def add_exit(self, direction, room):
        self.exits[direction] = room

    def add_item(self, item):
        self.items.append(item)

    def remove_item(self, item):
        if item in self.items:
            self.items.remove(item)
            return item
        return None

    def describe(self):
        print(f"--- {self.name} ---")
        print(self.description)
        if self.items:
            print(f"Items here: {', '.join(self.items)}")
        if self.exits:
            print(f"Exits: {', '.join(self.exits.keys())}")

hall = Room("Great Hall", "A vast hall with torches on the walls.")
hall.add_item("rusty key")
hall.add_item("torch")
hall.describe()`,
                hints: ["Store exits as a dictionary mapping direction strings to Room objects.", "Use ', '.join(list) to display items and exits nicely."],
                testCases: [{ input: "", expectedOutput: "--- Great Hall ---\nA vast hall with torches on the walls.\nItems here: rusty key, torch", description: "Should describe room with items" }],
                concepts: ["classes", "dictionaries", "methods"]
            },
            {
                stepNumber: 2,
                title: "Create the Player Class",
                description: "Define a Player class that tracks location, inventory, and health.",
                instructions: "Create a Player class with inventory management, movement between rooms, and status display.",
                starterCode: `# Text Adventure Game - Step 2: Player Class

class Room:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.items = []
        self.exits = {}

    def add_exit(self, direction, room):
        self.exits[direction] = room

    def add_item(self, item):
        self.items.append(item)

    def remove_item(self, item):
        if item in self.items:
            self.items.remove(item)
            return item
        return None

    def describe(self):
        print(f"--- {self.name} ---")
        print(self.description)
        if self.items:
            print(f"Items here: {', '.join(self.items)}")
        if self.exits:
            print(f"Exits: {', '.join(self.exits.keys())}")

class Player:
    def __init__(self, name, starting_room):
        self.name = name
        self.current_room = starting_room
        self.inventory = []
        self.health = 100

    def move(self, direction):
        """Move to room in given direction if exit exists."""
        pass

    def pick_up(self, item_name):
        """Pick up an item from the current room."""
        pass

    def show_status(self):
        """Display player status."""
        pass

# Build rooms
hall = Room("Great Hall", "A vast hall with torches on the walls.")
armory = Room("Armory", "Weapons line the walls.")
hall.add_item("rusty key")
armory.add_item("sword")
hall.add_exit("north", armory)
armory.add_exit("south", hall)

# Test player
player = Player("Hero", hall)
player.show_status()
player.current_room.describe()
player.pick_up("rusty key")
player.move("north")
player.current_room.describe()
player.show_status()
`,
                solutionCode: `# Text Adventure Game - Step 2: Player Class

class Room:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.items = []
        self.exits = {}

    def add_exit(self, direction, room):
        self.exits[direction] = room

    def add_item(self, item):
        self.items.append(item)

    def remove_item(self, item):
        if item in self.items:
            self.items.remove(item)
            return item
        return None

    def describe(self):
        print(f"--- {self.name} ---")
        print(self.description)
        if self.items:
            print(f"Items here: {', '.join(self.items)}")
        if self.exits:
            print(f"Exits: {', '.join(self.exits.keys())}")

class Player:
    def __init__(self, name, starting_room):
        self.name = name
        self.current_room = starting_room
        self.inventory = []
        self.health = 100

    def move(self, direction):
        if direction in self.current_room.exits:
            self.current_room = self.current_room.exits[direction]
            print(f"You move {direction}.")
            self.current_room.describe()
        else:
            print(f"You can't go {direction}.")

    def pick_up(self, item_name):
        item = self.current_room.remove_item(item_name)
        if item:
            self.inventory.append(item)
            print(f"Picked up: {item}")
        else:
            print(f"No '{item_name}' here.")

    def show_status(self):
        print(f"Player: {self.name} | HP: {self.health}")
        print(f"Location: {self.current_room.name}")
        print(f"Inventory: {', '.join(self.inventory) if self.inventory else 'empty'}")

hall = Room("Great Hall", "A vast hall with torches on the walls.")
armory = Room("Armory", "Weapons line the walls.")
hall.add_item("rusty key")
armory.add_item("sword")
hall.add_exit("north", armory)
armory.add_exit("south", hall)

player = Player("Hero", hall)
player.show_status()
player.current_room.describe()
player.pick_up("rusty key")
player.move("north")
player.show_status()`,
                hints: ["Check if direction exists in current_room.exits before moving.", "Use remove_item on the room and append to player inventory."],
                testCases: [{ input: "", expectedOutput: "Player: Hero | HP: 100\nLocation: Great Hall\nInventory: empty", description: "Should show initial player status" }],
                concepts: ["classes", "object-interaction", "inventory"]
            },
            {
                stepNumber: 3,
                title: "Game Engine",
                description: "Build a game engine that processes commands and runs the game loop with simulated input.",
                instructions: "Create a Game class that sets up the dungeon, processes text commands, and runs a sequence of actions.",
                starterCode: `# Text Adventure Game - Step 3: Game Engine

class Room:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.items = []
        self.exits = {}
    def add_exit(self, direction, room):
        self.exits[direction] = room
    def add_item(self, item):
        self.items.append(item)
    def remove_item(self, item):
        if item in self.items:
            self.items.remove(item)
            return item
        return None
    def describe(self):
        print(f"--- {self.name} ---")
        print(self.description)
        if self.items:
            print(f"Items here: {', '.join(self.items)}")
        if self.exits:
            print(f"Exits: {', '.join(self.exits.keys())}")

class Player:
    def __init__(self, name, starting_room):
        self.name = name
        self.current_room = starting_room
        self.inventory = []
        self.health = 100
    def move(self, direction):
        if direction in self.current_room.exits:
            self.current_room = self.current_room.exits[direction]
            print(f"You move {direction}.")
            self.current_room.describe()
        else:
            print(f"You can't go {direction}.")
    def pick_up(self, item_name):
        item = self.current_room.remove_item(item_name)
        if item:
            self.inventory.append(item)
            print(f"Picked up: {item}")
        else:
            print(f"No '{item_name}' here.")
    def show_status(self):
        print(f"Player: {self.name} | HP: {self.health}")
        print(f"Location: {self.current_room.name}")
        print(f"Inventory: {', '.join(self.inventory) if self.inventory else 'empty'}")

class Game:
    def __init__(self):
        self.rooms = {}
        self.player = None
        self.running = True

    def setup(self):
        """Create the dungeon map."""
        pass

    def process_command(self, command):
        """Parse and execute a command string."""
        pass

    def run(self, commands):
        """Run game with a list of commands."""
        pass

# Test the game engine
game = Game()
game.setup()
commands = ["look", "take rusty key", "go north", "take sword", "inventory", "quit"]
game.run(commands)
`,
                solutionCode: `# Text Adventure Game - Step 3: Game Engine

class Room:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.items = []
        self.exits = {}
    def add_exit(self, direction, room):
        self.exits[direction] = room
    def add_item(self, item):
        self.items.append(item)
    def remove_item(self, item):
        if item in self.items:
            self.items.remove(item)
            return item
        return None
    def describe(self):
        print(f"--- {self.name} ---")
        print(self.description)
        if self.items:
            print(f"Items here: {', '.join(self.items)}")
        if self.exits:
            print(f"Exits: {', '.join(self.exits.keys())}")

class Player:
    def __init__(self, name, starting_room):
        self.name = name
        self.current_room = starting_room
        self.inventory = []
        self.health = 100
    def move(self, direction):
        if direction in self.current_room.exits:
            self.current_room = self.current_room.exits[direction]
            print(f"You move {direction}.")
            self.current_room.describe()
        else:
            print(f"You can't go {direction}.")
    def pick_up(self, item_name):
        item = self.current_room.remove_item(item_name)
        if item:
            self.inventory.append(item)
            print(f"Picked up: {item}")
        else:
            print(f"No '{item_name}' here.")
    def show_status(self):
        print(f"Player: {self.name} | HP: {self.health}")
        print(f"Location: {self.current_room.name}")
        print(f"Inventory: {', '.join(self.inventory) if self.inventory else 'empty'}")

class Game:
    def __init__(self):
        self.rooms = {}
        self.player = None
        self.running = True

    def setup(self):
        hall = Room("Great Hall", "A vast hall with torches on the walls.")
        armory = Room("Armory", "Weapons line the walls.")
        dungeon = Room("Dungeon", "A dark, damp cell. You hear rats.")
        hall.add_item("rusty key")
        armory.add_item("sword")
        dungeon.add_item("gold coin")
        hall.add_exit("north", armory)
        hall.add_exit("east", dungeon)
        armory.add_exit("south", hall)
        dungeon.add_exit("west", hall)
        self.rooms = {"hall": hall, "armory": armory, "dungeon": dungeon}
        self.player = Player("Hero", hall)

    def process_command(self, command):
        parts = command.lower().split(maxsplit=1)
        action = parts[0]
        arg = parts[1] if len(parts) > 1 else ""

        if action == "look":
            self.player.current_room.describe()
        elif action == "go":
            self.player.move(arg)
        elif action == "take":
            self.player.pick_up(arg)
        elif action in ("inventory", "inv"):
            self.player.show_status()
        elif action == "quit":
            print("Thanks for playing!")
            self.running = False
        else:
            print(f"Unknown command: {action}")

    def run(self, commands):
        print("=== TEXT ADVENTURE ===")
        self.player.current_room.describe()
        print()
        for cmd in commands:
            if not self.running:
                break
            print(f"> {cmd}")
            self.process_command(cmd)
            print()

game = Game()
game.setup()
commands = ["look", "take rusty key", "go north", "take sword", "inventory", "quit"]
game.run(commands)`,
                hints: ["Use split(maxsplit=1) to separate action from argument.", "Process commands like 'go north', 'take sword', 'look', 'inventory'."],
                testCases: [{ input: "", expectedOutput: "=== TEXT ADVENTURE ===", description: "Should start the text adventure" }],
                concepts: ["command-parsing", "game-loop", "string-splitting"]
            },
            {
                stepNumber: 4,
                title: "Complete Adventure with Puzzles",
                description: "Add locked doors, a win condition, and puzzle mechanics to complete the game.",
                instructions: "Add locked doors that require items, a treasure room with a win condition, and a complete dungeon layout.",
                starterCode: `# Text Adventure Game - Step 4: Complete Adventure

# Add locked doors and win conditions to the game engine
# A locked door requires a specific item in inventory to pass
# The game ends when the player reaches the treasure room

# Extend the Room class with a locked_exits dict
# Extend Game with check_win and use_item methods
`,
                solutionCode: `# Text Adventure Game - Step 4: Complete Adventure

class Room:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.items = []
        self.exits = {}
        self.locked_exits = {}
    def add_exit(self, direction, room, required_item=None):
        self.exits[direction] = room
        if required_item:
            self.locked_exits[direction] = required_item
    def add_item(self, item):
        self.items.append(item)
    def remove_item(self, item):
        if item in self.items:
            self.items.remove(item)
            return item
        return None
    def describe(self):
        print(f"--- {self.name} ---")
        print(self.description)
        if self.items:
            print(f"Items here: {', '.join(self.items)}")
        exits_info = []
        for d in self.exits:
            if d in self.locked_exits:
                exits_info.append(f"{d} (locked)")
            else:
                exits_info.append(d)
        if exits_info:
            print(f"Exits: {', '.join(exits_info)}")

class Player:
    def __init__(self, name, starting_room):
        self.name = name
        self.current_room = starting_room
        self.inventory = []
        self.health = 100
    def move(self, direction):
        room = self.current_room
        if direction not in room.exits:
            print(f"You can't go {direction}.")
            return False
        if direction in room.locked_exits:
            needed = room.locked_exits[direction]
            if needed not in self.inventory:
                print(f"The way {direction} is locked. You need: {needed}")
                return False
            print(f"You use the {needed} to unlock the way {direction}.")
            del room.locked_exits[direction]
        self.current_room = room.exits[direction]
        print(f"You move {direction}.")
        self.current_room.describe()
        return True
    def pick_up(self, item_name):
        item = self.current_room.remove_item(item_name)
        if item:
            self.inventory.append(item)
            print(f"Picked up: {item}")
        else:
            print(f"No '{item_name}' here.")
    def show_status(self):
        print(f"Player: {self.name} | HP: {self.health}")
        print(f"Location: {self.current_room.name}")
        print(f"Inventory: {', '.join(self.inventory) if self.inventory else 'empty'}")

class Game:
    def __init__(self):
        self.rooms = {}
        self.player = None
        self.running = True
        self.won = False

    def setup(self):
        hall = Room("Great Hall", "A vast hall with torches on the walls.")
        armory = Room("Armory", "Weapons and shields line the walls.")
        dungeon = Room("Dungeon", "A dark, damp cell. Something glints in the corner.")
        treasury = Room("Treasury", "Mountains of gold! You found the treasure!")
        hall.add_item("torch")
        armory.add_item("rusty key")
        dungeon.add_item("gold coin")
        hall.add_exit("north", armory)
        hall.add_exit("east", dungeon)
        armory.add_exit("south", hall)
        armory.add_exit("east", treasury, required_item="rusty key")
        dungeon.add_exit("west", hall)
        self.rooms = {"hall": hall, "armory": armory, "dungeon": dungeon, "treasury": treasury}
        self.player = Player("Hero", hall)

    def check_win(self):
        if self.player.current_room.name == "Treasury":
            print("*** CONGRATULATIONS! You found the treasure! You win! ***")
            self.won = True
            self.running = False

    def process_command(self, command):
        parts = command.lower().split(maxsplit=1)
        action = parts[0]
        arg = parts[1] if len(parts) > 1 else ""
        if action == "look":
            self.player.current_room.describe()
        elif action == "go":
            self.player.move(arg)
            self.check_win()
        elif action == "take":
            self.player.pick_up(arg)
        elif action in ("inventory", "inv"):
            self.player.show_status()
        elif action == "quit":
            print("Thanks for playing!")
            self.running = False
        else:
            print(f"Unknown command: {action}")

    def run(self, commands):
        print("=== TEXT ADVENTURE ===")
        print("Find the treasure to win!")
        self.player.current_room.describe()
        print()
        for cmd in commands:
            if not self.running:
                break
            print(f"> {cmd}")
            self.process_command(cmd)
            print()
        if self.won:
            print("=== GAME OVER: VICTORY! ===")
        elif not self.running:
            print("=== GAME OVER ===")

game = Game()
game.setup()
commands = [
    "look",
    "take torch",
    "go north",
    "take rusty key",
    "go east",
    "inventory"
]
game.run(commands)`,
                hints: ["Add a locked_exits dict to Room mapping direction to required item.", "Check the player's inventory before allowing passage through locked exits."],
                testCases: [{ input: "", expectedOutput: "=== TEXT ADVENTURE ===\nFind the treasure to win!", description: "Should start the adventure game" }],
                concepts: ["game-design", "locked-doors", "win-conditions"]
            }
        ],
        finalSolutionCode: `# Complete Text Adventure Game

class Room:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.items = []
        self.exits = {}
        self.locked_exits = {}

    def add_exit(self, direction, room, required_item=None):
        self.exits[direction] = room
        if required_item:
            self.locked_exits[direction] = required_item

    def add_item(self, item):
        self.items.append(item)

    def remove_item(self, item):
        if item in self.items:
            self.items.remove(item)
            return item
        return None

    def describe(self):
        print(f"--- {self.name} ---")
        print(self.description)
        if self.items:
            print(f"Items here: {', '.join(self.items)}")
        exits_info = []
        for d in self.exits:
            if d in self.locked_exits:
                exits_info.append(f"{d} (locked)")
            else:
                exits_info.append(d)
        if exits_info:
            print(f"Exits: {', '.join(exits_info)}")

class Player:
    def __init__(self, name, starting_room):
        self.name = name
        self.current_room = starting_room
        self.inventory = []
        self.health = 100

    def move(self, direction):
        room = self.current_room
        if direction not in room.exits:
            print(f"You can't go {direction}.")
            return False
        if direction in room.locked_exits:
            needed = room.locked_exits[direction]
            if needed not in self.inventory:
                print(f"The way {direction} is locked. You need: {needed}")
                return False
            print(f"You use the {needed} to unlock the way {direction}.")
            del room.locked_exits[direction]
        self.current_room = room.exits[direction]
        print(f"You move {direction}.")
        self.current_room.describe()
        return True

    def pick_up(self, item_name):
        item = self.current_room.remove_item(item_name)
        if item:
            self.inventory.append(item)
            print(f"Picked up: {item}")
        else:
            print(f"No '{item_name}' here.")

    def show_status(self):
        print(f"Player: {self.name} | HP: {self.health}")
        print(f"Location: {self.current_room.name}")
        print(f"Inventory: {', '.join(self.inventory) if self.inventory else 'empty'}")

class Game:
    def __init__(self):
        self.rooms = {}
        self.player = None
        self.running = True
        self.won = False

    def setup(self):
        hall = Room("Great Hall", "A vast hall with torches on the walls.")
        armory = Room("Armory", "Weapons and shields line the walls.")
        dungeon = Room("Dungeon", "A dark, damp cell. Something glints in the corner.")
        library = Room("Library", "Dusty bookshelves stretch to the ceiling.")
        treasury = Room("Treasury", "Mountains of gold! You found the treasure!")
        hall.add_item("torch")
        armory.add_item("rusty key")
        dungeon.add_item("gold coin")
        library.add_item("map")
        hall.add_exit("north", armory)
        hall.add_exit("east", dungeon)
        hall.add_exit("west", library)
        armory.add_exit("south", hall)
        armory.add_exit("east", treasury, required_item="rusty key")
        dungeon.add_exit("west", hall)
        library.add_exit("east", hall)
        self.rooms = {"hall": hall, "armory": armory, "dungeon": dungeon, "library": library, "treasury": treasury}
        self.player = Player("Hero", hall)

    def check_win(self):
        if self.player.current_room.name == "Treasury":
            print("*** CONGRATULATIONS! You found the treasure! You win! ***")
            self.won = True
            self.running = False

    def process_command(self, command):
        parts = command.lower().split(maxsplit=1)
        action = parts[0]
        arg = parts[1] if len(parts) > 1 else ""
        if action == "look":
            self.player.current_room.describe()
        elif action == "go":
            self.player.move(arg)
            self.check_win()
        elif action == "take":
            self.player.pick_up(arg)
        elif action in ("inventory", "inv"):
            self.player.show_status()
        elif action == "quit":
            print("Thanks for playing!")
            self.running = False
        else:
            print(f"Unknown command: {action}")

    def run(self, commands):
        print("=== TEXT ADVENTURE ===")
        print("Explore the dungeon and find the treasure!")
        print()
        self.player.current_room.describe()
        print()
        for cmd in commands:
            if not self.running:
                break
            print(f"> {cmd}")
            self.process_command(cmd)
            print()
        if self.won:
            print("=== GAME OVER: VICTORY! ===")
        elif not self.running:
            print("=== GAME OVER ===")

game = Game()
game.setup()
commands = [
    "look",
    "take torch",
    "go west",
    "take map",
    "go east",
    "go north",
    "take rusty key",
    "go east"
]
game.run(commands)`,
        extensions: [
            "Add enemies with a simple combat system using health and attack stats.",
            "Add a save/load system that serializes game state to a dictionary.",
            "Create a larger dungeon with multiple paths and secrets.",
            "Add an NPC that gives hints or trades items."
        ]
    },

    // ========================================================
    // PROJECT 6: Student Grade Manager
    // ========================================================
    {
        id: "proj_6",
        title: "Student Grade Manager",
        description: "Build a grade management system to add students, record grades, calculate averages, and generate formatted reports. Practice OOP, dictionaries, statistics, and string formatting.",
        difficulty: "intermediate",
        estimatedTime: "45-60 min",
        skills: ["OOP", "dictionaries", "statistics", "formatting"],
        icon: "📊",
        steps: [
            {
                stepNumber: 1,
                title: "Student Class",
                description: "Create a Student class that stores a student's name, ID, and their grades by subject.",
                instructions: "Build a Student class with methods to add grades, get the average, and display student info.",
                starterCode: `# Student Grade Manager - Step 1: Student Class

class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = {}  # {'Math': [90, 85], 'English': [78]}

    def add_grade(self, subject, grade):
        """Add a grade for a subject."""
        pass

    def get_average(self, subject=None):
        """Get average for a subject, or overall average if no subject given."""
        pass

    def display(self):
        """Display student info and grades."""
        pass

# Test
s = Student("Alice Johnson", "S001")
s.add_grade("Math", 90)
s.add_grade("Math", 85)
s.add_grade("Math", 92)
s.add_grade("English", 78)
s.add_grade("English", 88)
s.display()
`,
                solutionCode: `# Student Grade Manager - Step 1: Student Class

class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = {}

    def add_grade(self, subject, grade):
        if subject not in self.grades:
            self.grades[subject] = []
        self.grades[subject].append(grade)

    def get_average(self, subject=None):
        if subject:
            if subject in self.grades and self.grades[subject]:
                return sum(self.grades[subject]) / len(self.grades[subject])
            return 0.0
        all_grades = []
        for g_list in self.grades.values():
            all_grades.extend(g_list)
        return sum(all_grades) / len(all_grades) if all_grades else 0.0

    def display(self):
        print(f"Student: {self.name} ({self.student_id})")
        for subject, grades in self.grades.items():
            avg = self.get_average(subject)
            print(f"  {subject}: {grades} -> Avg: {avg:.1f}")
        print(f"  Overall Average: {self.get_average():.1f}")

s = Student("Alice Johnson", "S001")
s.add_grade("Math", 90)
s.add_grade("Math", 85)
s.add_grade("Math", 92)
s.add_grade("English", 78)
s.add_grade("English", 88)
s.display()`,
                hints: ["Use a dictionary with subject as key and list of grades as value.", "For overall average, flatten all grade lists into one and compute the mean."],
                testCases: [{ input: "", expectedOutput: "Student: Alice Johnson (S001)\n  Math: [90, 85, 92] -> Avg: 89.0\n  English: [78, 88] -> Avg: 83.0\n  Overall Average: 86.6", description: "Should display student with grades and averages" }],
                concepts: ["classes", "dictionaries", "averages"]
            },
            {
                stepNumber: 2,
                title: "GradeBook Class",
                description: "Create a GradeBook class that manages multiple students.",
                instructions: "Build a GradeBook that can add students, add grades by student ID, look up students, and list all students.",
                starterCode: `# Student Grade Manager - Step 2: GradeBook Class

class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = {}
    def add_grade(self, subject, grade):
        if subject not in self.grades:
            self.grades[subject] = []
        self.grades[subject].append(grade)
    def get_average(self, subject=None):
        if subject:
            if subject in self.grades and self.grades[subject]:
                return sum(self.grades[subject]) / len(self.grades[subject])
            return 0.0
        all_grades = []
        for g_list in self.grades.values():
            all_grades.extend(g_list)
        return sum(all_grades) / len(all_grades) if all_grades else 0.0

class GradeBook:
    def __init__(self):
        self.students = {}  # {student_id: Student}

    def add_student(self, name, student_id):
        """Add a new student to the grade book."""
        pass

    def add_grade(self, student_id, subject, grade):
        """Add a grade for a student."""
        pass

    def find_student(self, student_id):
        """Find and return a student by ID."""
        pass

    def list_students(self):
        """List all students with their averages."""
        pass

# Test
gb = GradeBook()
gb.add_student("Alice Johnson", "S001")
gb.add_student("Bob Smith", "S002")
gb.add_student("Charlie Brown", "S003")
gb.add_grade("S001", "Math", 90)
gb.add_grade("S001", "Math", 85)
gb.add_grade("S001", "English", 78)
gb.add_grade("S002", "Math", 72)
gb.add_grade("S002", "English", 95)
gb.add_grade("S003", "Math", 88)
gb.add_grade("S003", "English", 82)
gb.list_students()
`,
                solutionCode: `# Student Grade Manager - Step 2: GradeBook Class

class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = {}
    def add_grade(self, subject, grade):
        if subject not in self.grades:
            self.grades[subject] = []
        self.grades[subject].append(grade)
    def get_average(self, subject=None):
        if subject:
            if subject in self.grades and self.grades[subject]:
                return sum(self.grades[subject]) / len(self.grades[subject])
            return 0.0
        all_grades = []
        for g_list in self.grades.values():
            all_grades.extend(g_list)
        return sum(all_grades) / len(all_grades) if all_grades else 0.0

class GradeBook:
    def __init__(self):
        self.students = {}

    def add_student(self, name, student_id):
        if student_id in self.students:
            print(f"Student {student_id} already exists.")
            return
        self.students[student_id] = Student(name, student_id)
        print(f"Added student: {name} ({student_id})")

    def add_grade(self, student_id, subject, grade):
        if student_id not in self.students:
            print(f"Student {student_id} not found.")
            return
        self.students[student_id].add_grade(subject, grade)

    def find_student(self, student_id):
        return self.students.get(student_id, None)

    def list_students(self):
        print(f"\\n{'ID':<8} {'Name':<20} {'Average':<10}")
        print("-" * 38)
        for sid in sorted(self.students.keys()):
            s = self.students[sid]
            avg = s.get_average()
            print(f"{s.student_id:<8} {s.name:<20} {avg:<10.1f}")
        print(f"\\nTotal students: {len(self.students)}")

gb = GradeBook()
gb.add_student("Alice Johnson", "S001")
gb.add_student("Bob Smith", "S002")
gb.add_student("Charlie Brown", "S003")
gb.add_grade("S001", "Math", 90)
gb.add_grade("S001", "Math", 85)
gb.add_grade("S001", "English", 78)
gb.add_grade("S002", "Math", 72)
gb.add_grade("S002", "English", 95)
gb.add_grade("S003", "Math", 88)
gb.add_grade("S003", "English", 82)
gb.list_students()`,
                hints: ["Store students in a dictionary with student_id as the key.", "Use .get() to safely look up students that may not exist."],
                testCases: [{ input: "", expectedOutput: "Added student: Alice Johnson (S001)\nAdded student: Bob Smith (S002)\nAdded student: Charlie Brown (S003)", description: "Should add students to grade book" }],
                concepts: ["composition", "dictionaries", "formatted-output"]
            },
            {
                stepNumber: 3,
                title: "Statistics Methods",
                description: "Add statistical analysis methods to the GradeBook: class averages, top students, and subject rankings.",
                instructions: "Add methods for class average, top N students, subject averages, and letter grade conversion.",
                starterCode: `# Student Grade Manager - Step 3: Statistics

class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = {}
    def add_grade(self, subject, grade):
        if subject not in self.grades:
            self.grades[subject] = []
        self.grades[subject].append(grade)
    def get_average(self, subject=None):
        if subject:
            if subject in self.grades and self.grades[subject]:
                return sum(self.grades[subject]) / len(self.grades[subject])
            return 0.0
        all_grades = []
        for g_list in self.grades.values():
            all_grades.extend(g_list)
        return sum(all_grades) / len(all_grades) if all_grades else 0.0

class GradeBook:
    def __init__(self):
        self.students = {}
    def add_student(self, name, student_id):
        self.students[student_id] = Student(name, student_id)
    def add_grade(self, student_id, subject, grade):
        if student_id in self.students:
            self.students[student_id].add_grade(subject, grade)

    def get_letter_grade(self, average):
        """Convert numeric average to letter grade."""
        pass

    def class_average(self):
        """Calculate the overall class average."""
        pass

    def top_students(self, n=3):
        """Return the top N students by overall average."""
        pass

    def subject_averages(self):
        """Calculate average for each subject across all students."""
        pass

# Build and test
gb = GradeBook()
gb.add_student("Alice Johnson", "S001")
gb.add_student("Bob Smith", "S002")
gb.add_student("Charlie Brown", "S003")
gb.add_student("Diana Prince", "S004")
gb.add_grade("S001", "Math", 90)
gb.add_grade("S001", "Math", 92)
gb.add_grade("S001", "English", 88)
gb.add_grade("S002", "Math", 72)
gb.add_grade("S002", "English", 95)
gb.add_grade("S003", "Math", 85)
gb.add_grade("S003", "English", 80)
gb.add_grade("S004", "Math", 96)
gb.add_grade("S004", "English", 91)
`,
                solutionCode: `# Student Grade Manager - Step 3: Statistics

class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = {}
    def add_grade(self, subject, grade):
        if subject not in self.grades:
            self.grades[subject] = []
        self.grades[subject].append(grade)
    def get_average(self, subject=None):
        if subject:
            if subject in self.grades and self.grades[subject]:
                return sum(self.grades[subject]) / len(self.grades[subject])
            return 0.0
        all_grades = []
        for g_list in self.grades.values():
            all_grades.extend(g_list)
        return sum(all_grades) / len(all_grades) if all_grades else 0.0

class GradeBook:
    def __init__(self):
        self.students = {}
    def add_student(self, name, student_id):
        self.students[student_id] = Student(name, student_id)
    def add_grade(self, student_id, subject, grade):
        if student_id in self.students:
            self.students[student_id].add_grade(subject, grade)

    def get_letter_grade(self, average):
        if average >= 90: return "A"
        if average >= 80: return "B"
        if average >= 70: return "C"
        if average >= 60: return "D"
        return "F"

    def class_average(self):
        if not self.students:
            return 0.0
        total = sum(s.get_average() for s in self.students.values())
        return total / len(self.students)

    def top_students(self, n=3):
        ranked = sorted(self.students.values(), key=lambda s: s.get_average(), reverse=True)
        return ranked[:n]

    def subject_averages(self):
        subject_grades = {}
        for s in self.students.values():
            for subj, grades in s.grades.items():
                if subj not in subject_grades:
                    subject_grades[subj] = []
                subject_grades[subj].extend(grades)
        result = {}
        for subj, grades in subject_grades.items():
            result[subj] = sum(grades) / len(grades)
        return result

gb = GradeBook()
gb.add_student("Alice Johnson", "S001")
gb.add_student("Bob Smith", "S002")
gb.add_student("Charlie Brown", "S003")
gb.add_student("Diana Prince", "S004")
gb.add_grade("S001", "Math", 90)
gb.add_grade("S001", "Math", 92)
gb.add_grade("S001", "English", 88)
gb.add_grade("S002", "Math", 72)
gb.add_grade("S002", "English", 95)
gb.add_grade("S003", "Math", 85)
gb.add_grade("S003", "English", 80)
gb.add_grade("S004", "Math", 96)
gb.add_grade("S004", "English", 91)

print(f"Class Average: {gb.class_average():.1f}")
print(f"\\nTop 3 Students:")
for i, s in enumerate(gb.top_students(3), 1):
    avg = s.get_average()
    print(f"  {i}. {s.name}: {avg:.1f} ({gb.get_letter_grade(avg)})")
print(f"\\nSubject Averages:")
for subj, avg in sorted(gb.subject_averages().items()):
    print(f"  {subj}: {avg:.1f}")`,
                hints: ["Use sorted() with a key function to rank students.", "Collect all grades per subject across all students for subject averages."],
                testCases: [{ input: "", expectedOutput: "Class Average: 87.6\n\nTop 3 Students:\n  1. Diana Prince: 93.5 (A)\n  2. Alice Johnson: 90.0 (A)\n  3. Charlie Brown: 82.5 (B)\n\nSubject Averages:\n  English: 88.5\n  Math: 87.0", description: "Should compute correct statistics" }],
                concepts: ["sorting", "lambda", "statistics"]
            },
            {
                stepNumber: 4,
                title: "Formatted Report Generation",
                description: "Generate a complete formatted grade report for the entire class.",
                instructions: "Create a method that produces a full report card with student details, grades, letter grades, and class statistics.",
                starterCode: `# Student Grade Manager - Step 4: Report Generation

# Add a generate_report() method to GradeBook
# that prints a complete formatted report
`,
                solutionCode: `# Student Grade Manager - Step 4: Report Generation

class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = {}
    def add_grade(self, subject, grade):
        if subject not in self.grades:
            self.grades[subject] = []
        self.grades[subject].append(grade)
    def get_average(self, subject=None):
        if subject:
            if subject in self.grades and self.grades[subject]:
                return sum(self.grades[subject]) / len(self.grades[subject])
            return 0.0
        all_grades = []
        for g_list in self.grades.values():
            all_grades.extend(g_list)
        return sum(all_grades) / len(all_grades) if all_grades else 0.0

class GradeBook:
    def __init__(self):
        self.students = {}
    def add_student(self, name, student_id):
        self.students[student_id] = Student(name, student_id)
    def add_grade(self, student_id, subject, grade):
        if student_id in self.students:
            self.students[student_id].add_grade(subject, grade)
    def get_letter_grade(self, average):
        if average >= 90: return "A"
        if average >= 80: return "B"
        if average >= 70: return "C"
        if average >= 60: return "D"
        return "F"
    def class_average(self):
        if not self.students:
            return 0.0
        total = sum(s.get_average() for s in self.students.values())
        return total / len(self.students)
    def top_students(self, n=3):
        ranked = sorted(self.students.values(), key=lambda s: s.get_average(), reverse=True)
        return ranked[:n]
    def subject_averages(self):
        subject_grades = {}
        for s in self.students.values():
            for subj, grades in s.grades.items():
                if subj not in subject_grades:
                    subject_grades[subj] = []
                subject_grades[subj].extend(grades)
        result = {}
        for subj, grades in subject_grades.items():
            result[subj] = sum(grades) / len(grades)
        return result

    def generate_report(self):
        print("=" * 55)
        print("          STUDENT GRADE REPORT")
        print("=" * 55)
        for sid in sorted(self.students.keys()):
            s = self.students[sid]
            avg = s.get_average()
            letter = self.get_letter_grade(avg)
            print(f"\\n{s.name} ({s.student_id})")
            print(f"  {'Subject':<15} {'Grades':<20} {'Avg':<8} {'Grade'}")
            print(f"  {'-'*50}")
            for subj in sorted(s.grades.keys()):
                subj_avg = s.get_average(subj)
                grades_str = ", ".join(str(g) for g in s.grades[subj])
                print(f"  {subj:<15} {grades_str:<20} {subj_avg:<8.1f} {self.get_letter_grade(subj_avg)}")
            print(f"  {'Overall':<15} {'':<20} {avg:<8.1f} {letter}")
        print(f"\\n{'=' * 55}")
        print(f"CLASS SUMMARY")
        print(f"{'=' * 55}")
        print(f"Total Students: {len(self.students)}")
        print(f"Class Average: {self.class_average():.1f} ({self.get_letter_grade(self.class_average())})")
        print(f"\\nTop Students:")
        for i, s in enumerate(self.top_students(3), 1):
            print(f"  {i}. {s.name}: {s.get_average():.1f}")
        print(f"\\nSubject Averages:")
        for subj, avg in sorted(self.subject_averages().items()):
            print(f"  {subj}: {avg:.1f} ({self.get_letter_grade(avg)})")

gb = GradeBook()
gb.add_student("Alice Johnson", "S001")
gb.add_student("Bob Smith", "S002")
gb.add_student("Charlie Brown", "S003")
gb.add_student("Diana Prince", "S004")
gb.add_grade("S001", "Math", 90)
gb.add_grade("S001", "Math", 92)
gb.add_grade("S001", "English", 88)
gb.add_grade("S002", "Math", 72)
gb.add_grade("S002", "English", 95)
gb.add_grade("S003", "Math", 85)
gb.add_grade("S003", "English", 80)
gb.add_grade("S004", "Math", 96)
gb.add_grade("S004", "English", 91)
gb.generate_report()`,
                hints: ["Use f-string alignment for clean columns.", "Sort students by ID and subjects alphabetically for consistent output."],
                testCases: [{ input: "", expectedOutput: "          STUDENT GRADE REPORT", description: "Should generate formatted report" }],
                concepts: ["formatted-output", "report-generation", "string-alignment"]
            }
        ],
        finalSolutionCode: `# Complete Student Grade Manager

class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = {}

    def add_grade(self, subject, grade):
        if subject not in self.grades:
            self.grades[subject] = []
        self.grades[subject].append(grade)

    def get_average(self, subject=None):
        if subject:
            if subject in self.grades and self.grades[subject]:
                return sum(self.grades[subject]) / len(self.grades[subject])
            return 0.0
        all_grades = []
        for g_list in self.grades.values():
            all_grades.extend(g_list)
        return sum(all_grades) / len(all_grades) if all_grades else 0.0

class GradeBook:
    def __init__(self):
        self.students = {}

    def add_student(self, name, student_id):
        self.students[student_id] = Student(name, student_id)

    def add_grade(self, student_id, subject, grade):
        if student_id in self.students:
            self.students[student_id].add_grade(subject, grade)

    def get_letter_grade(self, average):
        if average >= 90: return "A"
        if average >= 80: return "B"
        if average >= 70: return "C"
        if average >= 60: return "D"
        return "F"

    def class_average(self):
        if not self.students:
            return 0.0
        total = sum(s.get_average() for s in self.students.values())
        return total / len(self.students)

    def top_students(self, n=3):
        ranked = sorted(self.students.values(), key=lambda s: s.get_average(), reverse=True)
        return ranked[:n]

    def subject_averages(self):
        subject_grades = {}
        for s in self.students.values():
            for subj, grades in s.grades.items():
                if subj not in subject_grades:
                    subject_grades[subj] = []
                subject_grades[subj].extend(grades)
        return {subj: sum(g) / len(g) for subj, g in subject_grades.items()}

    def generate_report(self):
        print("=" * 55)
        print("          STUDENT GRADE REPORT")
        print("=" * 55)
        for sid in sorted(self.students.keys()):
            s = self.students[sid]
            avg = s.get_average()
            letter = self.get_letter_grade(avg)
            print(f"\\n{s.name} ({s.student_id})")
            print(f"  {'Subject':<15} {'Grades':<20} {'Avg':<8} {'Grade'}")
            print(f"  {'-'*50}")
            for subj in sorted(s.grades.keys()):
                subj_avg = s.get_average(subj)
                grades_str = ", ".join(str(g) for g in s.grades[subj])
                print(f"  {subj:<15} {grades_str:<20} {subj_avg:<8.1f} {self.get_letter_grade(subj_avg)}")
            print(f"  {'Overall':<15} {'':<20} {avg:<8.1f} {letter}")
        print(f"\\n{'=' * 55}")
        print(f"CLASS SUMMARY")
        print(f"{'=' * 55}")
        print(f"Total Students: {len(self.students)}")
        print(f"Class Average: {self.class_average():.1f} ({self.get_letter_grade(self.class_average())})")
        print(f"\\nTop Students:")
        for i, s in enumerate(self.top_students(3), 1):
            print(f"  {i}. {s.name}: {s.get_average():.1f}")
        print(f"\\nSubject Averages:")
        for subj, avg in sorted(self.subject_averages().items()):
            print(f"  {subj}: {avg:.1f} ({self.get_letter_grade(avg)})")

gb = GradeBook()
gb.add_student("Alice Johnson", "S001")
gb.add_student("Bob Smith", "S002")
gb.add_student("Charlie Brown", "S003")
gb.add_student("Diana Prince", "S004")
gb.add_grade("S001", "Math", 90)
gb.add_grade("S001", "Math", 92)
gb.add_grade("S001", "English", 88)
gb.add_grade("S001", "Science", 95)
gb.add_grade("S002", "Math", 72)
gb.add_grade("S002", "English", 95)
gb.add_grade("S002", "Science", 80)
gb.add_grade("S003", "Math", 85)
gb.add_grade("S003", "English", 80)
gb.add_grade("S003", "Science", 78)
gb.add_grade("S004", "Math", 96)
gb.add_grade("S004", "English", 91)
gb.add_grade("S004", "Science", 94)
gb.generate_report()`,
        extensions: [
            "Add weighted grades where different assignments count more (exams vs homework).",
            "Implement grade curves that adjust scores based on class distribution.",
            "Add the ability to remove or edit previously entered grades.",
            "Generate individual report cards that can be exported as text files."
        ]
    },

    // ========================================================
    // PROJECT 7: Password Strength Checker
    // ========================================================
    {
        id: "proj_7",
        title: "Password Strength Checker",
        description: "Build a password analyzer that checks length, complexity, common patterns, and gives detailed feedback with a strength score. Practice string analysis, functions, and scoring systems.",
        difficulty: "intermediate",
        estimatedTime: "45-60 min",
        skills: ["string-analysis", "functions", "regex-concepts", "scoring"],
        icon: "🔒",
        steps: [
            {
                stepNumber: 1,
                title: "Length and Character Checks",
                description: "Create functions to check password length and the types of characters it contains.",
                instructions: "Write functions to check if a password has uppercase, lowercase, digits, and special characters, and evaluate its length.",
                starterCode: `# Password Strength Checker - Step 1: Basic Checks

def check_length(password):
    """Return a score and feedback based on password length."""
    pass

def check_characters(password):
    """Check for uppercase, lowercase, digits, special chars."""
    pass

# Test
test_passwords = ["hi", "hello123", "Hello123!", "MyP@ssw0rd!2024"]
for pwd in test_passwords:
    print(f"Password: '{pwd}'")
    print(f"  Length: {check_length(pwd)}")
    print(f"  Characters: {check_characters(pwd)}")
    print()
`,
                solutionCode: `# Password Strength Checker - Step 1: Basic Checks

def check_length(password):
    length = len(password)
    if length < 6:
        return {"score": 0, "feedback": "Too short (min 6 characters)"}
    elif length < 8:
        return {"score": 1, "feedback": "Short - consider 8+ characters"}
    elif length < 12:
        return {"score": 2, "feedback": "Good length"}
    else:
        return {"score": 3, "feedback": "Excellent length"}

def check_characters(password):
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    has_special = any(not c.isalnum() for c in password)
    score = sum([has_upper, has_lower, has_digit, has_special])
    types = []
    if has_upper: types.append("uppercase")
    if has_lower: types.append("lowercase")
    if has_digit: types.append("digits")
    if has_special: types.append("special")
    missing = []
    if not has_upper: missing.append("uppercase")
    if not has_lower: missing.append("lowercase")
    if not has_digit: missing.append("digits")
    if not has_special: missing.append("special characters")
    return {"score": score, "has": types, "missing": missing}

test_passwords = ["hi", "hello123", "Hello123!", "MyP@ssw0rd!2024"]
for pwd in test_passwords:
    print(f"Password: '{pwd}'")
    length_result = check_length(pwd)
    char_result = check_characters(pwd)
    print(f"  Length: {length_result['feedback']} (score: {length_result['score']})")
    print(f"  Characters: {', '.join(char_result['has'])} (score: {char_result['score']}/4)")
    if char_result['missing']:
        print(f"  Missing: {', '.join(char_result['missing'])}")
    print()`,
                hints: ["Use any() with a generator expression to check character types.", "Use str.isupper(), str.islower(), str.isdigit(), str.isalnum() for checks."],
                testCases: [{ input: "", expectedOutput: "Password: 'hi'\n  Length: Too short (min 6 characters) (score: 0)\n  Characters: lowercase (score: 1/4)\n  Missing: uppercase, digits, special characters", description: "Should analyze password characters and length" }],
                concepts: ["string-methods", "any-all", "dictionaries"]
            },
            {
                stepNumber: 2,
                title: "Pattern Detection",
                description: "Detect common weak patterns like sequential characters, repeated characters, and common passwords.",
                instructions: "Write functions to detect sequential runs, repeated characters, and check against a common password list.",
                starterCode: `# Password Strength Checker - Step 2: Pattern Detection

COMMON_PASSWORDS = [
    "password", "123456", "qwerty", "abc123", "letmein",
    "admin", "welcome", "monkey", "dragon", "master",
    "password1", "123456789", "football", "shadow", "iloveyou"
]

def check_common(password):
    """Check if password is a common password."""
    pass

def check_sequential(password):
    """Check for sequential characters (abc, 123)."""
    pass

def check_repeated(password):
    """Check for repeated characters (aaa, 111)."""
    pass

# Test
test_passwords = ["password", "abc123", "aaa111", "Xy9!mK2$"]
for pwd in test_passwords:
    print(f"Password: '{pwd}'")
    print(f"  Common: {check_common(pwd)}")
    print(f"  Sequential: {check_sequential(pwd)}")
    print(f"  Repeated: {check_repeated(pwd)}")
    print()
`,
                solutionCode: `# Password Strength Checker - Step 2: Pattern Detection

COMMON_PASSWORDS = [
    "password", "123456", "qwerty", "abc123", "letmein",
    "admin", "welcome", "monkey", "dragon", "master",
    "password1", "123456789", "football", "shadow", "iloveyou"
]

def check_common(password):
    if password.lower() in COMMON_PASSWORDS:
        return {"penalty": 3, "feedback": "This is a commonly used password!"}
    return {"penalty": 0, "feedback": "Not a common password"}

def check_sequential(password):
    seq_count = 0
    for i in range(len(password) - 2):
        a, b, c = ord(password[i]), ord(password[i+1]), ord(password[i+2])
        if b == a + 1 and c == b + 1:
            seq_count += 1
        elif b == a - 1 and c == b - 1:
            seq_count += 1
    if seq_count >= 2:
        return {"penalty": 2, "feedback": f"Contains {seq_count} sequential patterns"}
    elif seq_count == 1:
        return {"penalty": 1, "feedback": "Contains a sequential pattern"}
    return {"penalty": 0, "feedback": "No sequential patterns"}

def check_repeated(password):
    rep_count = 0
    for i in range(len(password) - 2):
        if password[i] == password[i+1] == password[i+2]:
            rep_count += 1
    if rep_count > 0:
        return {"penalty": rep_count, "feedback": f"Contains {rep_count} repeated character run(s)"}
    return {"penalty": 0, "feedback": "No repeated characters"}

test_passwords = ["password", "abc123", "aaa111", "Xy9!mK2$"]
for pwd in test_passwords:
    print(f"Password: '{pwd}'")
    print(f"  Common: {check_common(pwd)['feedback']}")
    print(f"  Sequential: {check_sequential(pwd)['feedback']}")
    print(f"  Repeated: {check_repeated(pwd)['feedback']}")
    print()`,
                hints: ["Use ord() to get the numeric value of characters for sequence detection.", "Check if three consecutive characters differ by exactly 1 using ord()."],
                testCases: [{ input: "", expectedOutput: "Password: 'password'\n  Common: This is a commonly used password!\n  Sequential: No sequential patterns\n  Repeated: No repeated characters", description: "Should detect common passwords and patterns" }],
                concepts: ["ord-function", "pattern-detection", "string-iteration"]
            },
            {
                stepNumber: 3,
                title: "Scoring System",
                description: "Combine all checks into a scoring system that produces an overall strength rating.",
                instructions: "Create a function that runs all checks, tallies scores and penalties, and returns an overall strength rating.",
                starterCode: `# Password Strength Checker - Step 3: Scoring System

# Combine all checks into one scoring function
# Score ranges: 0-2 Weak, 3-4 Fair, 5-6 Strong, 7+ Very Strong

def calculate_strength(password):
    """Run all checks and return overall strength."""
    pass

# Test
test_passwords = ["hi", "password", "Hello123", "MyP@ssw0rd!", "X9$kL2!mNq#7"]
for pwd in test_passwords:
    result = calculate_strength(pwd)
    print(f"'{pwd}' -> {result}")
`,
                solutionCode: `# Password Strength Checker - Step 3: Scoring System

COMMON_PASSWORDS = [
    "password", "123456", "qwerty", "abc123", "letmein",
    "admin", "welcome", "monkey", "dragon", "master",
    "password1", "123456789", "football", "shadow", "iloveyou"
]

def check_length(password):
    length = len(password)
    if length < 6: return {"score": 0, "feedback": "Too short"}
    elif length < 8: return {"score": 1, "feedback": "Short"}
    elif length < 12: return {"score": 2, "feedback": "Good length"}
    else: return {"score": 3, "feedback": "Excellent length"}

def check_characters(password):
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    has_special = any(not c.isalnum() for c in password)
    return sum([has_upper, has_lower, has_digit, has_special])

def check_common(password):
    return 3 if password.lower() in COMMON_PASSWORDS else 0

def check_sequential(password):
    count = 0
    for i in range(len(password) - 2):
        a, b, c = ord(password[i]), ord(password[i+1]), ord(password[i+2])
        if (b == a + 1 and c == b + 1) or (b == a - 1 and c == b - 1):
            count += 1
    return min(count, 2)

def check_repeated(password):
    count = 0
    for i in range(len(password) - 2):
        if password[i] == password[i+1] == password[i+2]:
            count += 1
    return min(count, 2)

def calculate_strength(password):
    score = 0
    score += check_length(password)["score"]
    score += check_characters(password)
    penalty = check_common(password) + check_sequential(password) + check_repeated(password)
    score = max(score - penalty, 0)
    if score <= 2: rating = "Weak"
    elif score <= 4: rating = "Fair"
    elif score <= 6: rating = "Strong"
    else: rating = "Very Strong"
    return {"score": score, "rating": rating}

test_passwords = ["hi", "password", "Hello123", "MyP@ssw0rd!", "X9$kL2!mNq#7"]
for pwd in test_passwords:
    result = calculate_strength(pwd)
    print(f"'{pwd}' -> Score: {result['score']}, Rating: {result['rating']}")`,
                hints: ["Sum up positive scores from length and character checks.", "Subtract penalties for common passwords, sequences, and repeats."],
                testCases: [{ input: "", expectedOutput: "'hi' -> Score: 0, Rating: Weak\n'password' -> Score: 0, Rating: Weak\n'Hello123' -> Score: 4, Rating: Fair\n'MyP@ssw0rd!' -> Score: 6, Rating: Strong\n'X9$kL2!mNq#7' -> Score: 7, Rating: Very Strong", description: "Should rate passwords correctly" }],
                concepts: ["scoring-systems", "combining-functions", "thresholds"]
            },
            {
                stepNumber: 4,
                title: "Full Analyzer with Detailed Feedback",
                description: "Create a complete password analyzer that gives a visual strength meter and detailed improvement suggestions.",
                instructions: "Build the final analyzer with a visual strength bar, detailed breakdown, and specific improvement tips.",
                starterCode: `# Password Strength Checker - Step 4: Full Analyzer

# Create an analyze_password function that returns:
# - Visual strength meter
# - Score breakdown
# - Specific suggestions for improvement
`,
                solutionCode: `# Password Strength Checker - Step 4: Full Analyzer

COMMON_PASSWORDS = [
    "password", "123456", "qwerty", "abc123", "letmein",
    "admin", "welcome", "monkey", "dragon", "master",
    "password1", "123456789", "football", "shadow", "iloveyou"
]

def analyze_password(password):
    print(f"\\n{'=' * 45}")
    print(f"  PASSWORD ANALYSIS")
    print(f"  Password: {'*' * len(password)} ({len(password)} chars)")
    print(f"{'=' * 45}")

    feedback = []
    score = 0

    # Length check
    length = len(password)
    if length < 6:
        length_score = 0
        feedback.append("- Add more characters (minimum 6, recommend 12+)")
    elif length < 8:
        length_score = 1
        feedback.append("- Consider making it longer (8+ characters)")
    elif length < 12:
        length_score = 2
    else:
        length_score = 3
    score += length_score

    # Character variety
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    has_special = any(not c.isalnum() for c in password)
    char_score = sum([has_upper, has_lower, has_digit, has_special])
    score += char_score
    if not has_upper: feedback.append("- Add uppercase letters (A-Z)")
    if not has_lower: feedback.append("- Add lowercase letters (a-z)")
    if not has_digit: feedback.append("- Add numbers (0-9)")
    if not has_special: feedback.append("- Add special characters (!@#$%)")

    # Common password check
    if password.lower() in COMMON_PASSWORDS:
        score = max(score - 3, 0)
        feedback.append("- This is a very common password - change it!")

    # Sequential check
    seq_count = 0
    for i in range(len(password) - 2):
        a, b, c = ord(password[i]), ord(password[i+1]), ord(password[i+2])
        if (b == a + 1 and c == b + 1) or (b == a - 1 and c == b - 1):
            seq_count += 1
    if seq_count > 0:
        score = max(score - min(seq_count, 2), 0)
        feedback.append(f"- Avoid sequential patterns (found {seq_count})")

    # Repeated check
    rep_count = 0
    for i in range(len(password) - 2):
        if password[i] == password[i+1] == password[i+2]:
            rep_count += 1
    if rep_count > 0:
        score = max(score - min(rep_count, 2), 0)
        feedback.append(f"- Avoid repeated characters (found {rep_count} run(s))")

    # Rating
    if score <= 2: rating = "WEAK"
    elif score <= 4: rating = "FAIR"
    elif score <= 6: rating = "STRONG"
    else: rating = "VERY STRONG"

    # Visual meter
    filled = min(score, 7)
    meter = "[" + "#" * filled + "-" * (7 - filled) + "]"

    print(f"\\n  Strength: {meter} {rating}")
    print(f"  Score: {score}/7")
    print(f"\\n  Breakdown:")
    print(f"    Length:     {'*' * length_score}{'.' * (3 - length_score)} ({length_score}/3)")
    print(f"    Variety:    {'*' * char_score}{'.' * (4 - char_score)} ({char_score}/4)")

    if feedback:
        print(f"\\n  Suggestions:")
        for f in feedback:
            print(f"    {f}")
    else:
        print(f"\\n  Great password! No suggestions.")

    print(f"{'=' * 45}")
    return {"score": score, "rating": rating}

passwords = ["hi", "password", "Hello123", "MyP@ssw0rd!", "X9$kL2!mNq#7"]
for pwd in passwords:
    analyze_password(pwd)`,
                hints: ["Build the visual meter using string multiplication: '#' * score.", "Collect all feedback messages in a list and print them at the end."],
                testCases: [{ input: "", expectedOutput: "  PASSWORD ANALYSIS", description: "Should display password analysis" }],
                concepts: ["visual-feedback", "comprehensive-analysis", "string-multiplication"]
            }
        ],
        finalSolutionCode: `# Complete Password Strength Checker

COMMON_PASSWORDS = [
    "password", "123456", "qwerty", "abc123", "letmein",
    "admin", "welcome", "monkey", "dragon", "master",
    "password1", "123456789", "football", "shadow", "iloveyou"
]

def analyze_password(password):
    print(f"\\n{'=' * 45}")
    print(f"  PASSWORD ANALYSIS")
    print(f"  Password: {'*' * len(password)} ({len(password)} chars)")
    print(f"{'=' * 45}")

    feedback = []
    score = 0

    # Length check
    length = len(password)
    if length < 6:
        length_score = 0
        feedback.append("- Add more characters (minimum 6, recommend 12+)")
    elif length < 8:
        length_score = 1
        feedback.append("- Consider making it longer (8+ characters)")
    elif length < 12:
        length_score = 2
    else:
        length_score = 3
    score += length_score

    # Character variety
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    has_special = any(not c.isalnum() for c in password)
    char_score = sum([has_upper, has_lower, has_digit, has_special])
    score += char_score
    if not has_upper: feedback.append("- Add uppercase letters (A-Z)")
    if not has_lower: feedback.append("- Add lowercase letters (a-z)")
    if not has_digit: feedback.append("- Add numbers (0-9)")
    if not has_special: feedback.append("- Add special characters (!@#$%)")

    # Common password check
    if password.lower() in COMMON_PASSWORDS:
        score = max(score - 3, 0)
        feedback.append("- This is a very common password - change it!")

    # Sequential check
    seq_count = 0
    for i in range(len(password) - 2):
        a, b, c = ord(password[i]), ord(password[i+1]), ord(password[i+2])
        if (b == a + 1 and c == b + 1) or (b == a - 1 and c == b - 1):
            seq_count += 1
    if seq_count > 0:
        score = max(score - min(seq_count, 2), 0)
        feedback.append(f"- Avoid sequential patterns (found {seq_count})")

    # Repeated check
    rep_count = 0
    for i in range(len(password) - 2):
        if password[i] == password[i+1] == password[i+2]:
            rep_count += 1
    if rep_count > 0:
        score = max(score - min(rep_count, 2), 0)
        feedback.append(f"- Avoid repeated characters (found {rep_count} run(s))")

    # Rating
    if score <= 2: rating = "WEAK"
    elif score <= 4: rating = "FAIR"
    elif score <= 6: rating = "STRONG"
    else: rating = "VERY STRONG"

    # Visual meter
    filled = min(score, 7)
    meter = "[" + "#" * filled + "-" * (7 - filled) + "]"

    print(f"\\n  Strength: {meter} {rating}")
    print(f"  Score: {score}/7")
    print(f"\\n  Breakdown:")
    print(f"    Length:     {'*' * length_score}{'.' * (3 - length_score)} ({length_score}/3)")
    print(f"    Variety:    {'*' * char_score}{'.' * (4 - char_score)} ({char_score}/4)")

    if feedback:
        print(f"\\n  Suggestions:")
        for f in feedback:
            print(f"    {f}")
    else:
        print(f"\\n  Great password! No suggestions.")

    print(f"{'=' * 45}")
    return {"score": score, "rating": rating}

print("=== PASSWORD STRENGTH CHECKER ===")
passwords = ["hi", "password", "Hello123", "MyP@ssw0rd!", "X9$kL2!mNq#7"]
for pwd in passwords:
    analyze_password(pwd)`,
        extensions: [
            "Add a password generator that creates strong passwords of configurable length.",
            "Check against a larger dictionary of common passwords loaded from a list.",
            "Add detection of keyboard patterns (qwerty, asdf, zxcv).",
            "Estimate crack time based on password entropy and display it."
        ]
    },

    // ========================================================
    // PROJECT 8: Mini Data Analyzer
    // ========================================================
    {
        id: "proj_8",
        title: "Mini Data Analyzer",
        description: "Analyze a dataset of sales records to produce summary statistics, filter data, group by categories, and generate formatted reports. Practice lists, comprehensions, statistics, and string formatting.",
        difficulty: "intermediate",
        estimatedTime: "45-60 min",
        skills: ["lists", "comprehensions", "statistics", "string-formatting"],
        icon: "📈",
        steps: [
            {
                stepNumber: 1,
                title: "Data Loading",
                description: "Create a sales dataset and build functions to load and display the data.",
                instructions: "Define a list of sales record dictionaries and create functions to display and summarize the raw data.",
                starterCode: `# Mini Data Analyzer - Step 1: Data Loading

# Sales records: each record is a dict with date, product, category, quantity, price
sales_data = [
    {"date": "2024-01-15", "product": "Laptop", "category": "Electronics", "quantity": 2, "price": 999.99},
    {"date": "2024-01-16", "product": "Mouse", "category": "Electronics", "quantity": 10, "price": 29.99},
    {"date": "2024-01-16", "product": "Desk Chair", "category": "Furniture", "quantity": 3, "price": 249.99},
    {"date": "2024-01-17", "product": "Keyboard", "category": "Electronics", "quantity": 7, "price": 79.99},
    {"date": "2024-01-17", "product": "Monitor", "category": "Electronics", "quantity": 4, "price": 349.99},
    {"date": "2024-01-18", "product": "Bookshelf", "category": "Furniture", "quantity": 2, "price": 189.99},
    {"date": "2024-01-18", "product": "Headphones", "category": "Electronics", "quantity": 8, "price": 59.99},
    {"date": "2024-01-19", "product": "Desk Lamp", "category": "Furniture", "quantity": 5, "price": 44.99},
    {"date": "2024-01-19", "product": "USB Hub", "category": "Electronics", "quantity": 12, "price": 24.99},
    {"date": "2024-01-20", "product": "Standing Desk", "category": "Furniture", "quantity": 1, "price": 599.99},
]

def display_data(data):
    """Display the sales data in a formatted table."""
    pass

def summary(data):
    """Show basic summary: record count, date range, categories."""
    pass

display_data(sales_data)
summary(sales_data)
`,
                solutionCode: `# Mini Data Analyzer - Step 1: Data Loading

sales_data = [
    {"date": "2024-01-15", "product": "Laptop", "category": "Electronics", "quantity": 2, "price": 999.99},
    {"date": "2024-01-16", "product": "Mouse", "category": "Electronics", "quantity": 10, "price": 29.99},
    {"date": "2024-01-16", "product": "Desk Chair", "category": "Furniture", "quantity": 3, "price": 249.99},
    {"date": "2024-01-17", "product": "Keyboard", "category": "Electronics", "quantity": 7, "price": 79.99},
    {"date": "2024-01-17", "product": "Monitor", "category": "Electronics", "quantity": 4, "price": 349.99},
    {"date": "2024-01-18", "product": "Bookshelf", "category": "Furniture", "quantity": 2, "price": 189.99},
    {"date": "2024-01-18", "product": "Headphones", "category": "Electronics", "quantity": 8, "price": 59.99},
    {"date": "2024-01-19", "product": "Desk Lamp", "category": "Furniture", "quantity": 5, "price": 44.99},
    {"date": "2024-01-19", "product": "USB Hub", "category": "Electronics", "quantity": 12, "price": 24.99},
    {"date": "2024-01-20", "product": "Standing Desk", "category": "Furniture", "quantity": 1, "price": 599.99},
]

def display_data(data):
    print(f"{'Date':<12} {'Product':<15} {'Category':<12} {'Qty':<5} {'Price':<10} {'Total':<10}")
    print("-" * 64)
    for r in data:
        total = r["quantity"] * r["price"]
        price_str = f"{r['price']:<9.2f}"
        total_str = f"{total:<9.2f}"
        print(f"{r['date']:<12} {r['product']:<15} {r['category']:<12} {r['quantity']:<5} {'$'}{price_str} {'$'}{total_str}")

def summary(data):
    dates = [r["date"] for r in data]
    categories = list(set(r["category"] for r in data))
    print(f"\\nData Summary:")
    print(f"  Records: {len(data)}")
    print(f"  Date range: {min(dates)} to {max(dates)}")
    print(f"  Categories: {', '.join(sorted(categories))}")

display_data(sales_data)
summary(sales_data)`,
                hints: ["Use f-string alignment for clean table formatting.", "Use set() to find unique categories from the data."],
                testCases: [{ input: "", expectedOutput: "Data Summary:\n  Records: 10\n  Date range: 2024-01-15 to 2024-01-20\n  Categories: Electronics, Furniture", description: "Should display data summary" }],
                concepts: ["list-of-dicts", "formatted-tables", "set-operations"]
            },
            {
                stepNumber: 2,
                title: "Statistical Calculations",
                description: "Calculate key statistics: total revenue, average order value, min/max sales, and more.",
                instructions: "Write functions to compute total revenue, average sale, highest and lowest revenue items, and total quantity sold.",
                starterCode: `# Mini Data Analyzer - Step 2: Statistics

sales_data = [
    {"date": "2024-01-15", "product": "Laptop", "category": "Electronics", "quantity": 2, "price": 999.99},
    {"date": "2024-01-16", "product": "Mouse", "category": "Electronics", "quantity": 10, "price": 29.99},
    {"date": "2024-01-16", "product": "Desk Chair", "category": "Furniture", "quantity": 3, "price": 249.99},
    {"date": "2024-01-17", "product": "Keyboard", "category": "Electronics", "quantity": 7, "price": 79.99},
    {"date": "2024-01-17", "product": "Monitor", "category": "Electronics", "quantity": 4, "price": 349.99},
    {"date": "2024-01-18", "product": "Bookshelf", "category": "Furniture", "quantity": 2, "price": 189.99},
    {"date": "2024-01-18", "product": "Headphones", "category": "Electronics", "quantity": 8, "price": 59.99},
    {"date": "2024-01-19", "product": "Desk Lamp", "category": "Furniture", "quantity": 5, "price": 44.99},
    {"date": "2024-01-19", "product": "USB Hub", "category": "Electronics", "quantity": 12, "price": 24.99},
    {"date": "2024-01-20", "product": "Standing Desk", "category": "Furniture", "quantity": 1, "price": 599.99},
]

def calculate_stats(data):
    """Calculate and return key statistics."""
    pass

stats = calculate_stats(sales_data)
print(stats)
`,
                solutionCode: `# Mini Data Analyzer - Step 2: Statistics

sales_data = [
    {"date": "2024-01-15", "product": "Laptop", "category": "Electronics", "quantity": 2, "price": 999.99},
    {"date": "2024-01-16", "product": "Mouse", "category": "Electronics", "quantity": 10, "price": 29.99},
    {"date": "2024-01-16", "product": "Desk Chair", "category": "Furniture", "quantity": 3, "price": 249.99},
    {"date": "2024-01-17", "product": "Keyboard", "category": "Electronics", "quantity": 7, "price": 79.99},
    {"date": "2024-01-17", "product": "Monitor", "category": "Electronics", "quantity": 4, "price": 349.99},
    {"date": "2024-01-18", "product": "Bookshelf", "category": "Furniture", "quantity": 2, "price": 189.99},
    {"date": "2024-01-18", "product": "Headphones", "category": "Electronics", "quantity": 8, "price": 59.99},
    {"date": "2024-01-19", "product": "Desk Lamp", "category": "Furniture", "quantity": 5, "price": 44.99},
    {"date": "2024-01-19", "product": "USB Hub", "category": "Electronics", "quantity": 12, "price": 24.99},
    {"date": "2024-01-20", "product": "Standing Desk", "category": "Furniture", "quantity": 1, "price": 599.99},
]

def calculate_stats(data):
    revenues = [r["quantity"] * r["price"] for r in data]
    total_revenue = sum(revenues)
    total_quantity = sum(r["quantity"] for r in data)
    avg_revenue = total_revenue / len(data)

    max_idx = revenues.index(max(revenues))
    min_idx = revenues.index(min(revenues))

    return {
        "total_revenue": total_revenue,
        "total_quantity": total_quantity,
        "avg_revenue_per_sale": avg_revenue,
        "num_transactions": len(data),
        "highest_revenue": {"product": data[max_idx]["product"], "revenue": revenues[max_idx]},
        "lowest_revenue": {"product": data[min_idx]["product"], "revenue": revenues[min_idx]},
    }

stats = calculate_stats(sales_data)
print("=== SALES STATISTICS ===")
print("Total Revenue:     $" + f"{stats['total_revenue']:.2f}")
print(f"Total Items Sold:  {stats['total_quantity']}")
print(f"Transactions:      {stats['num_transactions']}")
print("Avg per Sale:      $" + f"{stats['avg_revenue_per_sale']:.2f}")
print("Highest Revenue:   " + stats['highest_revenue']['product'] + " ($" + f"{stats['highest_revenue']['revenue']:.2f})")
print("Lowest Revenue:    " + stats['lowest_revenue']['product'] + " ($" + f"{stats['lowest_revenue']['revenue']:.2f})")`,
                hints: ["Use list comprehensions to compute revenue for each record.", "Use index() with max()/min() to find which record has the highest/lowest revenue."],
                testCases: [{ input: "", expectedOutput: "=== SALES STATISTICS ===\nTotal Revenue:     $6,049.25", description: "Should calculate correct total revenue" }],
                concepts: ["list-comprehensions", "aggregation", "min-max"]
            },
            {
                stepNumber: 3,
                title: "Filtering and Grouping",
                description: "Add filtering by category and date, plus group-by functionality to aggregate data.",
                instructions: "Create functions to filter records and group data by category with subtotals.",
                starterCode: `# Mini Data Analyzer - Step 3: Filtering & Grouping

sales_data = [
    {"date": "2024-01-15", "product": "Laptop", "category": "Electronics", "quantity": 2, "price": 999.99},
    {"date": "2024-01-16", "product": "Mouse", "category": "Electronics", "quantity": 10, "price": 29.99},
    {"date": "2024-01-16", "product": "Desk Chair", "category": "Furniture", "quantity": 3, "price": 249.99},
    {"date": "2024-01-17", "product": "Keyboard", "category": "Electronics", "quantity": 7, "price": 79.99},
    {"date": "2024-01-17", "product": "Monitor", "category": "Electronics", "quantity": 4, "price": 349.99},
    {"date": "2024-01-18", "product": "Bookshelf", "category": "Furniture", "quantity": 2, "price": 189.99},
    {"date": "2024-01-18", "product": "Headphones", "category": "Electronics", "quantity": 8, "price": 59.99},
    {"date": "2024-01-19", "product": "Desk Lamp", "category": "Furniture", "quantity": 5, "price": 44.99},
    {"date": "2024-01-19", "product": "USB Hub", "category": "Electronics", "quantity": 12, "price": 24.99},
    {"date": "2024-01-20", "product": "Standing Desk", "category": "Furniture", "quantity": 1, "price": 599.99},
]

def filter_by_category(data, category):
    """Filter records by category."""
    pass

def filter_by_date_range(data, start_date, end_date):
    """Filter records within a date range (inclusive)."""
    pass

def group_by_category(data):
    """Group data by category and calculate subtotals."""
    pass

# Test filtering and grouping
`,
                solutionCode: `# Mini Data Analyzer - Step 3: Filtering & Grouping

sales_data = [
    {"date": "2024-01-15", "product": "Laptop", "category": "Electronics", "quantity": 2, "price": 999.99},
    {"date": "2024-01-16", "product": "Mouse", "category": "Electronics", "quantity": 10, "price": 29.99},
    {"date": "2024-01-16", "product": "Desk Chair", "category": "Furniture", "quantity": 3, "price": 249.99},
    {"date": "2024-01-17", "product": "Keyboard", "category": "Electronics", "quantity": 7, "price": 79.99},
    {"date": "2024-01-17", "product": "Monitor", "category": "Electronics", "quantity": 4, "price": 349.99},
    {"date": "2024-01-18", "product": "Bookshelf", "category": "Furniture", "quantity": 2, "price": 189.99},
    {"date": "2024-01-18", "product": "Headphones", "category": "Electronics", "quantity": 8, "price": 59.99},
    {"date": "2024-01-19", "product": "Desk Lamp", "category": "Furniture", "quantity": 5, "price": 44.99},
    {"date": "2024-01-19", "product": "USB Hub", "category": "Electronics", "quantity": 12, "price": 24.99},
    {"date": "2024-01-20", "product": "Standing Desk", "category": "Furniture", "quantity": 1, "price": 599.99},
]

def filter_by_category(data, category):
    return [r for r in data if r["category"] == category]

def filter_by_date_range(data, start_date, end_date):
    return [r for r in data if start_date <= r["date"] <= end_date]

def group_by_category(data):
    groups = {}
    for r in data:
        cat = r["category"]
        if cat not in groups:
            groups[cat] = {"items": 0, "quantity": 0, "revenue": 0.0}
        groups[cat]["items"] += 1
        groups[cat]["quantity"] += r["quantity"]
        groups[cat]["revenue"] += r["quantity"] * r["price"]
    return groups

# Test filtering
electronics = filter_by_category(sales_data, "Electronics")
print(f"Electronics: {len(electronics)} records")
for r in electronics:
    print("  " + r['product'] + ": " + str(r['quantity']) + " x $" + f"{r['price']:.2f}")

print()
jan_17_18 = filter_by_date_range(sales_data, "2024-01-17", "2024-01-18")
print(f"Jan 17-18: {len(jan_17_18)} records")
for r in jan_17_18:
    print(f"  {r['date']} - {r['product']}")

print()
groups = group_by_category(sales_data)
print("Revenue by Category:")
for cat in sorted(groups.keys()):
    g = groups[cat]
    print(f"  {cat}: {g['items']} items, {g['quantity']} units, $" + f"{g['revenue']:.2f}")`,
                hints: ["Use list comprehensions to filter records.", "Build a groups dictionary with running totals for each category."],
                testCases: [{ input: "", expectedOutput: "Electronics: 6 records", description: "Should filter by category correctly" }],
                concepts: ["filtering", "grouping", "aggregation"]
            },
            {
                stepNumber: 4,
                title: "Formatted Report",
                description: "Generate a complete formatted sales report combining all analysis into a professional output.",
                instructions: "Create a generate_report function that produces a full sales analysis report with sections for overview, category breakdown, top products, and daily totals.",
                starterCode: `# Mini Data Analyzer - Step 4: Formatted Report

# Create a complete generate_report(data) function
# that outputs a professional sales analysis report
`,
                solutionCode: `# Mini Data Analyzer - Step 4: Formatted Report

sales_data = [
    {"date": "2024-01-15", "product": "Laptop", "category": "Electronics", "quantity": 2, "price": 999.99},
    {"date": "2024-01-16", "product": "Mouse", "category": "Electronics", "quantity": 10, "price": 29.99},
    {"date": "2024-01-16", "product": "Desk Chair", "category": "Furniture", "quantity": 3, "price": 249.99},
    {"date": "2024-01-17", "product": "Keyboard", "category": "Electronics", "quantity": 7, "price": 79.99},
    {"date": "2024-01-17", "product": "Monitor", "category": "Electronics", "quantity": 4, "price": 349.99},
    {"date": "2024-01-18", "product": "Bookshelf", "category": "Furniture", "quantity": 2, "price": 189.99},
    {"date": "2024-01-18", "product": "Headphones", "category": "Electronics", "quantity": 8, "price": 59.99},
    {"date": "2024-01-19", "product": "Desk Lamp", "category": "Furniture", "quantity": 5, "price": 44.99},
    {"date": "2024-01-19", "product": "USB Hub", "category": "Electronics", "quantity": 12, "price": 24.99},
    {"date": "2024-01-20", "product": "Standing Desk", "category": "Furniture", "quantity": 1, "price": 599.99},
]

def generate_report(data):
    w = 55
    print("=" * w)
    print("          SALES ANALYSIS REPORT")
    print("=" * w)

    # Overview
    revenues = [r["quantity"] * r["price"] for r in data]
    total_rev = sum(revenues)
    total_qty = sum(r["quantity"] for r in data)
    dates = sorted(set(r["date"] for r in data))

    print(f"\\n--- OVERVIEW ---")
    print(f"  Period:       {dates[0]} to {dates[-1]}")
    print(f"  Transactions: {len(data)}")
    print(f"  Items Sold:   {total_qty}")
    print("  Total Revenue: $" + f"{total_rev:,.2f}")
    print("  Avg per Sale:  $" + f"{total_rev / len(data):,.2f}")

    # Category breakdown
    groups = {}
    for r in data:
        cat = r["category"]
        if cat not in groups:
            groups[cat] = {"count": 0, "quantity": 0, "revenue": 0.0}
        groups[cat]["count"] += 1
        groups[cat]["quantity"] += r["quantity"]
        groups[cat]["revenue"] += r["quantity"] * r["price"]

    print(f"\\n--- BY CATEGORY ---")
    print(f"  {'Category':<15} {'Sales':<8} {'Units':<8} {'Revenue':<12} {'% Rev'}")
    print(f"  {'-'*50}")
    for cat in sorted(groups.keys()):
        g = groups[cat]
        pct = g["revenue"] / total_rev * 100
        rev_str = f"{g['revenue']:<11,.2f}"
        print(f"  {cat:<15} {g['count']:<8} {g['quantity']:<8} {'$'}{rev_str} {pct:.1f}%")

    # Top products by revenue
    product_rev = []
    for r in data:
        product_rev.append({"product": r["product"], "revenue": r["quantity"] * r["price"]})
    product_rev.sort(key=lambda x: x["revenue"], reverse=True)

    print(f"\\n--- TOP 5 PRODUCTS ---")
    for i, p in enumerate(product_rev[:5], 1):
        bar = "#" * int(p["revenue"] / total_rev * 30)
        rev_str = f"{p['revenue']:>9,.2f}"
        print(f"  {i}. {p['product']:<15} {'$'}{rev_str} {bar}")

    # Daily totals
    daily = {}
    for r in data:
        d = r["date"]
        if d not in daily:
            daily[d] = 0.0
        daily[d] += r["quantity"] * r["price"]

    print(f"\\n--- DAILY REVENUE ---")
    for d in sorted(daily.keys()):
        bar = "#" * int(daily[d] / max(daily.values()) * 20)
        day_str = f"{daily[d]:>9,.2f}"
        print(f"  {d}: {'$'}{day_str} {bar}")

    print(f"\\n{'=' * w}")
    print(f"  Report generated successfully.")
    print(f"{'=' * w}")

generate_report(sales_data)`,
                hints: ["Calculate percentages by dividing category revenue by total revenue.", "Use sorted() on daily totals to show them in chronological order."],
                testCases: [{ input: "", expectedOutput: "          SALES ANALYSIS REPORT", description: "Should generate complete sales report" }],
                concepts: ["report-generation", "data-visualization", "percentage-calculations"]
            }
        ],
        finalSolutionCode: `# Complete Mini Data Analyzer

sales_data = [
    {"date": "2024-01-15", "product": "Laptop", "category": "Electronics", "quantity": 2, "price": 999.99},
    {"date": "2024-01-16", "product": "Mouse", "category": "Electronics", "quantity": 10, "price": 29.99},
    {"date": "2024-01-16", "product": "Desk Chair", "category": "Furniture", "quantity": 3, "price": 249.99},
    {"date": "2024-01-17", "product": "Keyboard", "category": "Electronics", "quantity": 7, "price": 79.99},
    {"date": "2024-01-17", "product": "Monitor", "category": "Electronics", "quantity": 4, "price": 349.99},
    {"date": "2024-01-18", "product": "Bookshelf", "category": "Furniture", "quantity": 2, "price": 189.99},
    {"date": "2024-01-18", "product": "Headphones", "category": "Electronics", "quantity": 8, "price": 59.99},
    {"date": "2024-01-19", "product": "Desk Lamp", "category": "Furniture", "quantity": 5, "price": 44.99},
    {"date": "2024-01-19", "product": "USB Hub", "category": "Electronics", "quantity": 12, "price": 24.99},
    {"date": "2024-01-20", "product": "Standing Desk", "category": "Furniture", "quantity": 1, "price": 599.99},
]

def filter_by_category(data, category):
    return [r for r in data if r["category"] == category]

def filter_by_date_range(data, start_date, end_date):
    return [r for r in data if start_date <= r["date"] <= end_date]

def group_by_category(data):
    groups = {}
    for r in data:
        cat = r["category"]
        if cat not in groups:
            groups[cat] = {"count": 0, "quantity": 0, "revenue": 0.0}
        groups[cat]["count"] += 1
        groups[cat]["quantity"] += r["quantity"]
        groups[cat]["revenue"] += r["quantity"] * r["price"]
    return groups

def group_by_date(data):
    daily = {}
    for r in data:
        d = r["date"]
        if d not in daily:
            daily[d] = 0.0
        daily[d] += r["quantity"] * r["price"]
    return daily

def top_products(data, n=5):
    product_rev = [{"product": r["product"], "revenue": r["quantity"] * r["price"]} for r in data]
    product_rev.sort(key=lambda x: x["revenue"], reverse=True)
    return product_rev[:n]

def generate_report(data):
    w = 55
    print("=" * w)
    print("          SALES ANALYSIS REPORT")
    print("=" * w)

    revenues = [r["quantity"] * r["price"] for r in data]
    total_rev = sum(revenues)
    total_qty = sum(r["quantity"] for r in data)
    dates = sorted(set(r["date"] for r in data))

    print(f"\\n--- OVERVIEW ---")
    print(f"  Period:        {dates[0]} to {dates[-1]}")
    print(f"  Transactions:  {len(data)}")
    print(f"  Items Sold:    {total_qty}")
    print("  Total Revenue: $" + f"{total_rev:,.2f}")
    print("  Avg per Sale:  $" + f"{total_rev / len(data):,.2f}")

    groups = group_by_category(data)
    print(f"\\n--- BY CATEGORY ---")
    print(f"  {'Category':<15} {'Sales':<8} {'Units':<8} {'Revenue':<12} {'% Rev'}")
    print(f"  {'-'*50}")
    for cat in sorted(groups.keys()):
        g = groups[cat]
        pct = g["revenue"] / total_rev * 100
        rev_str = f"{g['revenue']:<11,.2f}"
        print(f"  {cat:<15} {g['count']:<8} {g['quantity']:<8} {'$'}{rev_str} {pct:.1f}%")

    top = top_products(data, 5)
    print(f"\\n--- TOP 5 PRODUCTS ---")
    for i, p in enumerate(top, 1):
        bar = "#" * int(p["revenue"] / total_rev * 30)
        rev_str = f"{p['revenue']:>9,.2f}"
        print(f"  {i}. {p['product']:<15} {'$'}{rev_str} {bar}")

    daily = group_by_date(data)
    print(f"\\n--- DAILY REVENUE ---")
    max_daily = max(daily.values())
    for d in sorted(daily.keys()):
        bar = "#" * int(daily[d] / max_daily * 20)
        day_str = f"{daily[d]:>9,.2f}"
        print(f"  {d}: {'$'}{day_str} {bar}")

    print(f"\\n{'=' * w}")
    print(f"  Report generated successfully.")
    print(f"{'=' * w}")

# Run the full analysis
generate_report(sales_data)

# Demonstrate filtering
print("\\n--- ELECTRONICS ONLY ---")
electronics = filter_by_category(sales_data, "Electronics")
for r in electronics:
    rev = r["quantity"] * r["price"]
    print(f"  {r['product']:<15} {r['quantity']} x $" + f"{r['price']:.2f} = $" + f"{rev:.2f}")`,
        extensions: [
            "Add support for reading data from a CSV-formatted string.",
            "Implement sorting by any field (date, revenue, quantity).",
            "Add month-over-month comparison if given multi-month data.",
            "Create a simple bar chart visualization using text characters."
        ]
    }
];

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projectsPart2 };
}
