// ============================================================
// PROJECTS: Part 1 (Projects 1-4)
// 1. Mad Libs Generator
// 2. Number Guessing Game
// 3. Contact Book
// 4. Quiz Game Engine
// ============================================================

const projectsPart1 = [

    // ========================================================
    // PROJECT 1: Mad Libs Generator
    // ========================================================
    {
        id: "proj_1",
        title: "Mad Libs Generator",
        description: "Build a fun Mad Libs word game that creates hilarious stories by plugging in random or user-chosen words. You'll practice string formatting, variables, and working with lists.",
        difficulty: "beginner",
        estimatedTime: "30 min",
        skills: ["variables", "strings", "f-strings", "lists", "random"],
        icon: "📝",
        steps: [
            {
                stepNumber: 1,
                title: "Create the Story Template",
                description: "First, we'll create a story template with placeholders. The template is a string with spots where we'll insert words later.",
                instructions: "Create a story template string using placeholders. Define the template with numbered blanks that we'll fill in later.",
                starterCode: `# Mad Libs Generator - Step 1: Story Template\n\n# Create a story template with blanks\n# Use {0}, {1}, etc. as placeholders\n\nstory_template = """Once upon a time, a {adjective} {noun} went to the {place}.\nIt decided to {verb} very {adverb}.\nSuddenly, a {adjective2} {animal} appeared and said "{exclamation}!"\nThey became best friends and {verb2} happily ever after."""\n\nprint("Story template created!")\nprint(story_template)\n`,
                solutionCode: `# Mad Libs Generator - Step 1: Story Template\n\nstory_template = """Once upon a time, a {adjective} {noun} went to the {place}.\nIt decided to {verb} very {adverb}.\nSuddenly, a {adjective2} {animal} appeared and said "{exclamation}!"\nThey became best friends and {verb2} happily ever after."""\n\nprint("Story template created!")\nprint(story_template)`,
                hints: ["Triple quotes (\"\"\" or ''') let you write multi-line strings.", "Use descriptive placeholder names inside curly braces."],
                testCases: [{ input: "", expectedOutput: "Story template created!", description: "Should print confirmation message" }],
                concepts: ["strings", "multi-line-strings", "templates"]
            },
            {
                stepNumber: 2,
                title: "Define Word Lists",
                description: "Create lists of words for each category. This lets us randomly select words to fill in the blanks.",
                instructions: "Create lists of words for each category: adjectives, nouns, places, verbs, adverbs, animals, and exclamations.",
                starterCode: `# Mad Libs Generator - Step 2: Word Lists\n\n# Create word lists for each category\nadjectives = ['silly', 'enormous', 'tiny', 'sparkly', 'grumpy']\nnouns = ['wizard', 'potato', 'unicorn', 'robot', 'ninja']\nplaces = ['moon', 'supermarket', 'volcano', 'library', 'jungle']\nverbs = ['dance', 'sneeze', 'juggle', 'sing', 'cartwheel']\nadverbs = ['loudly', 'gracefully', 'frantically', 'slowly', 'dramatically']\nanimals = ['penguin', 'dragon', 'sloth', 'octopus', 'flamingo']\nexclamations = ['Wow', 'Bazinga', 'Yikes', 'Holy guacamole', 'Great Scott']\n\nprint(f"Adjectives: {adjectives}")\nprint(f"Total word categories: 7")\nprint(f"Words per category: {len(adjectives)}")\n`,
                solutionCode: `# Mad Libs Generator - Step 2: Word Lists\n\nadjectives = ['silly', 'enormous', 'tiny', 'sparkly', 'grumpy']\nnouns = ['wizard', 'potato', 'unicorn', 'robot', 'ninja']\nplaces = ['moon', 'supermarket', 'volcano', 'library', 'jungle']\nverbs = ['dance', 'sneeze', 'juggle', 'sing', 'cartwheel']\nadverbs = ['loudly', 'gracefully', 'frantically', 'slowly', 'dramatically']\nanimals = ['penguin', 'dragon', 'sloth', 'octopus', 'flamingo']\nexclamations = ['Wow', 'Bazinga', 'Yikes', 'Holy guacamole', 'Great Scott']\n\nprint(f"Adjectives: {adjectives}")\nprint(f"Total word categories: 7")\nprint(f"Words per category: {len(adjectives)}")`,
                hints: ["Lists are defined with square brackets.", "Include at least 5 words per category for variety."],
                testCases: [{ input: "", expectedOutput: "Total word categories: 7\nWords per category: 5", description: "Should show category info" }],
                concepts: ["lists", "variables"]
            },
            {
                stepNumber: 3,
                title: "Random Word Selection",
                description: "Use the random module to pick words from each list and fill in the story template.",
                instructions: "Import random, set a seed for reproducibility, select random words, and generate the story.",
                starterCode: `# Mad Libs Generator - Step 3: Generate the Story\n\nimport random\nrandom.seed(42)  # For consistent output\n\n# Word lists\nadjectives = ['silly', 'enormous', 'tiny', 'sparkly', 'grumpy']\nnouns = ['wizard', 'potato', 'unicorn', 'robot', 'ninja']\nplaces = ['moon', 'supermarket', 'volcano', 'library', 'jungle']\nverbs = ['dance', 'sneeze', 'juggle', 'sing', 'cartwheel']\nadverbs = ['loudly', 'gracefully', 'frantically', 'slowly', 'dramatically']\nanimals = ['penguin', 'dragon', 'sloth', 'octopus', 'flamingo']\nexclamations = ['Wow', 'Bazinga', 'Yikes', 'Holy guacamole', 'Great Scott']\n\n# Story template\nstory_template = """Once upon a time, a {adjective} {noun} went to the {place}.\nIt decided to {verb} very {adverb}.\nSuddenly, a {adjective2} {animal} appeared and said "{exclamation}!"\nThey became best friends and {verb2} happily ever after."""\n\n# Select random words and fill in the story\n# Use random.choice() for each category\n`,
                solutionCode: `# Mad Libs Generator - Step 3: Generate the Story\n\nimport random\nrandom.seed(42)\n\nadjectives = ['silly', 'enormous', 'tiny', 'sparkly', 'grumpy']\nnouns = ['wizard', 'potato', 'unicorn', 'robot', 'ninja']\nplaces = ['moon', 'supermarket', 'volcano', 'library', 'jungle']\nverbs = ['dance', 'sneeze', 'juggle', 'sing', 'cartwheel']\nadverbs = ['loudly', 'gracefully', 'frantically', 'slowly', 'dramatically']\nanimals = ['penguin', 'dragon', 'sloth', 'octopus', 'flamingo']\nexclamations = ['Wow', 'Bazinga', 'Yikes', 'Holy guacamole', 'Great Scott']\n\nstory_template = """Once upon a time, a {adjective} {noun} went to the {place}.\nIt decided to {verb} very {adverb}.\nSuddenly, a {adjective2} {animal} appeared and said "{exclamation}!"\nThey became best friends and {verb2} happily ever after."""\n\nstory = story_template.format(\n    adjective=random.choice(adjectives),\n    noun=random.choice(nouns),\n    place=random.choice(places),\n    verb=random.choice(verbs),\n    adverb=random.choice(adverbs),\n    adjective2=random.choice(adjectives),\n    animal=random.choice(animals),\n    exclamation=random.choice(exclamations),\n    verb2=random.choice(verbs)\n)\n\nprint("=== Your Mad Libs Story ===")\nprint(story)`,
                hints: ["random.choice(list) picks a random element.", "Use .format() with named parameters to fill the template."],
                testCases: [{ input: "", expectedOutput: "=== Your Mad Libs Story ===", description: "Should display the story header" }],
                concepts: ["random", "string-format", "functions"]
            },
            {
                stepNumber: 4,
                title: "Multiple Stories Function",
                description: "Wrap everything in a reusable function and generate multiple unique stories.",
                instructions: "Create a generate_story() function that returns a random story each time. Generate and print 2 different stories.",
                starterCode: `# Mad Libs Generator - Step 4: Reusable Function\n\nimport random\nrandom.seed(42)\n\n# Define a function that generates a random story\ndef generate_story():\n    # Word lists (could also be passed as parameters)\n    adjectives = ['silly', 'enormous', 'tiny', 'sparkly', 'grumpy']\n    nouns = ['wizard', 'potato', 'unicorn', 'robot', 'ninja']\n    places = ['moon', 'supermarket', 'volcano', 'library', 'jungle']\n    verbs = ['dance', 'sneeze', 'juggle', 'sing', 'cartwheel']\n    adverbs = ['loudly', 'gracefully', 'frantically', 'slowly', 'dramatically']\n    animals = ['penguin', 'dragon', 'sloth', 'octopus', 'flamingo']\n    exclamations = ['Wow', 'Bazinga', 'Yikes', 'Holy guacamole', 'Great Scott']\n    \n    template = """Once upon a time, a {adjective} {noun} went to the {place}.\nIt decided to {verb} very {adverb}.\nSuddenly, a {adjective2} {animal} appeared and said "{exclamation}!"\nThey became best friends and {verb2} happily ever after."""\n    \n    # Fill in template and return\n    pass\n\n# Generate 2 stories\n`,
                solutionCode: `# Mad Libs Generator - Step 4: Reusable Function\n\nimport random\nrandom.seed(42)\n\ndef generate_story():\n    adjectives = ['silly', 'enormous', 'tiny', 'sparkly', 'grumpy']\n    nouns = ['wizard', 'potato', 'unicorn', 'robot', 'ninja']\n    places = ['moon', 'supermarket', 'volcano', 'library', 'jungle']\n    verbs = ['dance', 'sneeze', 'juggle', 'sing', 'cartwheel']\n    adverbs = ['loudly', 'gracefully', 'frantically', 'slowly', 'dramatically']\n    animals = ['penguin', 'dragon', 'sloth', 'octopus', 'flamingo']\n    exclamations = ['Wow', 'Bazinga', 'Yikes', 'Holy guacamole', 'Great Scott']\n    \n    template = """Once upon a time, a {adjective} {noun} went to the {place}.\nIt decided to {verb} very {adverb}.\nSuddenly, a {adjective2} {animal} appeared and said "{exclamation}!"\nThey became best friends and {verb2} happily ever after."""\n    \n    return template.format(\n        adjective=random.choice(adjectives),\n        noun=random.choice(nouns),\n        place=random.choice(places),\n        verb=random.choice(verbs),\n        adverb=random.choice(adverbs),\n        adjective2=random.choice(adjectives),\n        animal=random.choice(animals),\n        exclamation=random.choice(exclamations),\n        verb2=random.choice(verbs)\n    )\n\nfor i in range(2):\n    print(f"=== Story {i + 1} ===")\n    print(generate_story())\n    print()`,
                hints: ["Return the formatted string from the function.", "Use a for loop to generate multiple stories."],
                testCases: [{ input: "", expectedOutput: "=== Story 1 ===", description: "Should generate numbered stories" }],
                concepts: ["functions", "return", "loops"]
            }
        ],
        finalSolutionCode: `# Complete Mad Libs Generator\n\nimport random\n\ndef generate_story(seed=None):\n    if seed is not None:\n        random.seed(seed)\n    \n    adjectives = ['silly', 'enormous', 'tiny', 'sparkly', 'grumpy']\n    nouns = ['wizard', 'potato', 'unicorn', 'robot', 'ninja']\n    places = ['moon', 'supermarket', 'volcano', 'library', 'jungle']\n    verbs = ['dance', 'sneeze', 'juggle', 'sing', 'cartwheel']\n    adverbs = ['loudly', 'gracefully', 'frantically', 'slowly', 'dramatically']\n    animals = ['penguin', 'dragon', 'sloth', 'octopus', 'flamingo']\n    exclamations = ['Wow', 'Bazinga', 'Yikes', 'Holy guacamole', 'Great Scott']\n    \n    template = """Once upon a time, a {adjective} {noun} went to the {place}.\nIt decided to {verb} very {adverb}.\nSuddenly, a {adjective2} {animal} appeared and said "{exclamation}!"\nThey became best friends and {verb2} happily ever after."""\n    \n    return template.format(\n        adjective=random.choice(adjectives),\n        noun=random.choice(nouns),\n        place=random.choice(places),\n        verb=random.choice(verbs),\n        adverb=random.choice(adverbs),\n        adjective2=random.choice(adjectives),\n        animal=random.choice(animals),\n        exclamation=random.choice(exclamations),\n        verb2=random.choice(verbs)\n    )\n\nprint("=== MAD LIBS GENERATOR ===")\nprint()\nfor i in range(3):\n    print(f"--- Story {i + 1} ---")\n    print(generate_story())\n    print()`,
        extensions: [
            "Add more story templates and randomly choose between them.",
            "Allow the user to add their own words to the word lists.",
            "Create themed Mad Libs (sci-fi, horror, romance).",
            "Add a word count and reading difficulty score."
        ]
    },

    // ========================================================
    // PROJECT 2: Number Guessing Game
    // ========================================================
    {
        id: "proj_2",
        title: "Number Guessing Game",
        description: "Build an interactive number guessing game with difficulty levels, scoring, and replay. Learn loops, conditionals, and the random module.",
        difficulty: "beginner",
        estimatedTime: "40 min",
        skills: ["loops", "conditionals", "random", "functions", "input-validation"],
        icon: "🎯",
        steps: [
            {
                stepNumber: 1,
                title: "Generate a Secret Number",
                description: "Set up the game by generating a random secret number and creating the basic game loop.",
                instructions: "Import random, generate a number between 1 and 100, and create a simple loop that checks guesses.",
                starterCode: `# Number Guessing Game - Step 1: Basic Setup\n\nimport random\nrandom.seed(42)  # For testing consistency\n\n# Generate a secret number between 1 and 100\nsecret = random.randint(1, 100)\n\n# Simulate a series of guesses\nguesses = [50, 75, 60, 65, 64]\n\nfor guess in guesses:\n    if guess < secret:\n        print(f"Guess {guess}: Too low!")\n    elif guess > secret:\n        print(f"Guess {guess}: Too high!")\n    else:\n        print(f"Guess {guess}: Correct!")\n        break\n`,
                solutionCode: `# Number Guessing Game - Step 1: Basic Setup\n\nimport random\nrandom.seed(42)\n\nsecret = random.randint(1, 100)\n\nguesses = [50, 75, 60, 65, 64]\n\nfor guess in guesses:\n    if guess < secret:\n        print(f"Guess {guess}: Too low!")\n    elif guess > secret:\n        print(f"Guess {guess}: Too high!")\n    else:\n        print(f"Guess {guess}: Correct!")\n        break`,
                hints: ["random.randint(1, 100) includes both 1 and 100.", "Use < and > to compare the guess to the secret."],
                testCases: [{ input: "", expectedOutput: "Guess 50: Too low!\nGuess 75: Too high!\nGuess 60: Too low!\nGuess 65: Too high!\nGuess 64: Too high!", description: "Should give directional hints for each guess" }],
                concepts: ["random", "conditionals", "loops"]
            },
            {
                stepNumber: 2,
                title: "Add Attempt Tracking",
                description: "Track the number of attempts and give the player a score based on how quickly they guess.",
                instructions: "Add attempt counting, track all guesses made, and calculate a score at the end.",
                starterCode: `# Number Guessing Game - Step 2: Attempt Tracking\n\nimport random\nrandom.seed(42)\n\nsecret = random.randint(1, 100)\nmax_attempts = 7\nattempts = 0\nguess_history = []\n\n# Simulated guesses\nplayer_guesses = [50, 75, 60, 65, 62, 81, 64]\n\nfor guess in player_guesses:\n    attempts += 1\n    guess_history.append(guess)\n    \n    if guess == secret:\n        # Calculate score\n        pass\n    elif guess < secret:\n        print(f"Attempt {attempts}/{max_attempts}: {guess} is too low!")\n    else:\n        print(f"Attempt {attempts}/{max_attempts}: {guess} is too high!")\n    \n    if attempts >= max_attempts:\n        print(f"Out of attempts! The number was {secret}.")\n        break\n\nprint(f"Guesses made: {guess_history}")\n`,
                solutionCode: `# Number Guessing Game - Step 2: Attempt Tracking\n\nimport random\nrandom.seed(42)\n\nsecret = random.randint(1, 100)\nmax_attempts = 7\nattempts = 0\nguess_history = []\nwon = False\n\nplayer_guesses = [50, 75, 60, 65, 62, 81, 64]\n\nfor guess in player_guesses:\n    attempts += 1\n    guess_history.append(guess)\n    \n    if guess == secret:\n        score = max(100 - (attempts - 1) * 15, 10)\n        print(f"Attempt {attempts}/{max_attempts}: {guess} is correct!")\n        print(f"Score: {score} points")\n        won = True\n        break\n    elif guess < secret:\n        print(f"Attempt {attempts}/{max_attempts}: {guess} is too low!")\n    else:\n        print(f"Attempt {attempts}/{max_attempts}: {guess} is too high!")\n    \n    if attempts >= max_attempts:\n        print(f"Out of attempts! The number was {secret}.")\n        break\n\nprint(f"Guesses made: {guess_history}")`,
                hints: ["Use a counter variable that increments each loop.", "Append each guess to the history list."],
                testCases: [{ input: "", expectedOutput: "Attempt 1/7: 50 is too low!", description: "Should track attempts" }],
                concepts: ["counters", "lists", "scoring"]
            },
            {
                stepNumber: 3,
                title: "Difficulty Levels",
                description: "Add difficulty levels that change the number range and maximum attempts.",
                instructions: "Create a function that sets up the game based on difficulty (easy, medium, hard) and runs a full game.",
                starterCode: `# Number Guessing Game - Step 3: Difficulty Levels\n\nimport random\nrandom.seed(42)\n\ndef setup_game(difficulty):\n    \"\"\"Return (max_number, max_attempts) based on difficulty.\"\"\"\n    # Easy: 1-50, 10 attempts\n    # Medium: 1-100, 7 attempts\n    # Hard: 1-200, 5 attempts\n    pass\n\ndef play_game(difficulty, guesses):\n    \"\"\"Play a game with simulated guesses.\"\"\"\n    max_number, max_attempts = setup_game(difficulty)\n    secret = random.randint(1, max_number)\n    \n    print(f"Difficulty: {difficulty.upper()}")\n    print(f"Guess a number between 1 and {max_number} ({max_attempts} attempts)")\n    # Play through the guesses\n    pass\n\n# Test each difficulty\n`,
                solutionCode: `# Number Guessing Game - Step 3: Difficulty Levels\n\nimport random\nrandom.seed(42)\n\ndef setup_game(difficulty):\n    settings = {\n        'easy': (50, 10),\n        'medium': (100, 7),\n        'hard': (200, 5)\n    }\n    return settings.get(difficulty, (100, 7))\n\ndef play_game(difficulty, guesses):\n    max_number, max_attempts = setup_game(difficulty)\n    secret = random.randint(1, max_number)\n    \n    print(f"Difficulty: {difficulty.upper()}")\n    print(f"Guess between 1 and {max_number} ({max_attempts} attempts)")\n    print(f"Secret number: {secret}")\n    \n    for i, guess in enumerate(guesses[:max_attempts], 1):\n        if guess == secret:\n            print(f"  Attempt {i}: {guess} - Correct!")\n            return True\n        elif guess < secret:\n            print(f"  Attempt {i}: {guess} - Too low!")\n        else:\n            print(f"  Attempt {i}: {guess} - Too high!")\n    \n    print(f"  Out of attempts! Answer was {secret}.")\n    return False\n\nplay_game('easy', [25, 37, 31, 34, 32, 33])\nprint()\nplay_game('medium', [50, 75, 63, 69, 66, 64, 65])\nprint()\nplay_game('hard', [100, 150, 125, 137, 131])`,
                hints: ["Use a dictionary to map difficulty to settings.", "enumerate(list, 1) starts counting from 1."],
                testCases: [{ input: "", expectedOutput: "Difficulty: EASY", description: "Should display difficulty level" }],
                concepts: ["functions", "dictionaries", "enumerate"]
            },
            {
                stepNumber: 4,
                title: "Score Tracking and Game Stats",
                description: "Add a scoring system and display game statistics at the end.",
                instructions: "Create a complete game manager that tracks scores across multiple rounds and displays stats.",
                starterCode: `# Number Guessing Game - Step 4: Score Tracking\n\nimport random\nrandom.seed(42)\n\nclass GuessingGame:\n    def __init__(self):\n        self.total_score = 0\n        self.games_played = 0\n        self.games_won = 0\n    \n    def calculate_score(self, attempts, max_attempts):\n        # More points for fewer attempts\n        pass\n    \n    def play_round(self, difficulty, guesses):\n        # Run one round and track results\n        pass\n    \n    def show_stats(self):\n        # Display overall statistics\n        pass\n\n# Play multiple rounds and show stats\n`,
                solutionCode: `# Number Guessing Game - Step 4: Score Tracking\n\nimport random\nrandom.seed(42)\n\nclass GuessingGame:\n    def __init__(self):\n        self.total_score = 0\n        self.games_played = 0\n        self.games_won = 0\n    \n    def calculate_score(self, attempts, max_attempts):\n        base = 100\n        penalty = (attempts - 1) * (base // max_attempts)\n        return max(base - penalty, 10)\n    \n    def play_round(self, difficulty, guesses):\n        settings = {'easy': (50, 10), 'medium': (100, 7), 'hard': (200, 5)}\n        max_num, max_att = settings.get(difficulty, (100, 7))\n        secret = random.randint(1, max_num)\n        self.games_played += 1\n        \n        print(f"Round {self.games_played} ({difficulty}) - Guess 1-{max_num}")\n        \n        for i, guess in enumerate(guesses[:max_att], 1):\n            if guess == secret:\n                score = self.calculate_score(i, max_att)\n                self.total_score += score\n                self.games_won += 1\n                print(f"  Correct in {i} attempts! +{score} pts")\n                return\n            hint = "low" if guess < secret else "high"\n            print(f"  Attempt {i}: {guess} too {hint}")\n        \n        print(f"  Failed! Answer: {secret}")\n    \n    def show_stats(self):\n        print("\\n=== GAME STATISTICS ===")\n        print(f"Games played: {self.games_played}")\n        print(f"Games won: {self.games_won}")\n        win_rate = (self.games_won / self.games_played * 100) if self.games_played > 0 else 0\n        print(f"Win rate: {win_rate:.0f}%")\n        print(f"Total score: {self.total_score}")\n\ngame = GuessingGame()\ngame.play_round('easy', [25, 12, 18, 15, 17, 16])\ngame.play_round('medium', [50, 75, 62, 68, 65])\ngame.play_round('hard', [100, 50, 75, 62, 56])\ngame.show_stats()`,
                hints: ["Use a class to group game state and methods.", "Track wins, losses, and scores as instance variables."],
                testCases: [{ input: "", expectedOutput: "=== GAME STATISTICS ===", description: "Should show game statistics" }],
                concepts: ["classes", "methods", "scoring"]
            }
        ],
        finalSolutionCode: `# Complete Number Guessing Game\n\nimport random\n\nclass GuessingGame:\n    def __init__(self):\n        self.total_score = 0\n        self.games_played = 0\n        self.games_won = 0\n        self.history = []\n    \n    def get_settings(self, difficulty):\n        return {'easy': (50, 10), 'medium': (100, 7), 'hard': (200, 5)}.get(difficulty, (100, 7))\n    \n    def calculate_score(self, attempts, max_attempts):\n        return max(100 - (attempts - 1) * (100 // max_attempts), 10)\n    \n    def play_round(self, difficulty, guesses):\n        max_num, max_att = self.get_settings(difficulty)\n        secret = random.randint(1, max_num)\n        self.games_played += 1\n        \n        print(f"\\nRound {self.games_played} [{difficulty.upper()}] - Guess 1-{max_num} ({max_att} tries)")\n        \n        for i, guess in enumerate(guesses[:max_att], 1):\n            if guess == secret:\n                score = self.calculate_score(i, max_att)\n                self.total_score += score\n                self.games_won += 1\n                self.history.append({'round': self.games_played, 'won': True, 'attempts': i, 'score': score})\n                print(f"  {guess} is CORRECT in {i} attempts! +{score} pts")\n                return\n            hint = "Too low" if guess < secret else "Too high"\n            remaining = max_att - i\n            print(f"  {guess}: {hint} ({remaining} left)")\n        \n        self.history.append({'round': self.games_played, 'won': False, 'attempts': max_att, 'score': 0})\n        print(f"  Out of attempts! The number was {secret}.")\n    \n    def show_stats(self):\n        print("\\n" + "=" * 30)\n        print("   GAME STATISTICS")\n        print("=" * 30)\n        print(f"Games played: {self.games_played}")\n        print(f"Games won:    {self.games_won}")\n        wr = (self.games_won / self.games_played * 100) if self.games_played else 0\n        print(f"Win rate:     {wr:.0f}%")\n        print(f"Total score:  {self.total_score}")\n        if self.games_played > 0:\n            print(f"Avg score:    {self.total_score / self.games_played:.1f}")\n\nrandom.seed(42)\ngame = GuessingGame()\ngame.play_round('easy', [25, 12, 18, 15, 17, 16])\ngame.play_round('medium', [50, 75, 62, 68, 65])\ngame.play_round('hard', [100, 50, 75, 62, 56])\ngame.show_stats()`,
        extensions: [
            "Add a 'hot/cold' hint system based on distance from the answer.",
            "Implement a high score leaderboard.",
            "Add a binary search solver that always wins in optimal attempts.",
            "Create themed number games (guess the year, guess the temperature)."
        ]
    },

    // ========================================================
    // PROJECT 3: Contact Book
    // ========================================================
    {
        id: "proj_3",
        title: "Contact Book",
        description: "Build a fully functional contact book application that lets you add, search, update, and delete contacts. Practice dictionaries, functions, and data management.",
        difficulty: "beginner-intermediate",
        estimatedTime: "45 min",
        skills: ["dictionaries", "functions", "loops", "string-methods", "data-management"],
        icon: "📇",
        steps: [
            {
                stepNumber: 1,
                title: "Data Structure Setup",
                description: "Design the data structure for storing contacts and create a function to add contacts.",
                instructions: "Create a contacts dictionary and an add_contact function that stores name, phone, and email.",
                starterCode: `# Contact Book - Step 1: Data Structure\n\n# Store contacts as a dict of dicts: {name: {phone, email}}\ncontacts = {}\n\ndef add_contact(name, phone, email):\n    \"\"\"Add a new contact to the book.\"\"\"\n    # Add the contact\n    pass\n\n# Add some contacts\nadd_contact('Alice Johnson', '555-0101', 'alice@email.com')\nadd_contact('Bob Smith', '555-0202', 'bob@email.com')\nadd_contact('Charlie Brown', '555-0303', 'charlie@email.com')\n\nprint(f"Total contacts: {len(contacts)}")\nfor name, info in contacts.items():\n    print(f"  {name}: {info['phone']}, {info['email']}")\n`,
                solutionCode: `# Contact Book - Step 1: Data Structure\n\ncontacts = {}\n\ndef add_contact(name, phone, email):\n    contacts[name] = {'phone': phone, 'email': email}\n    print(f"Added: {name}")\n\nadd_contact('Alice Johnson', '555-0101', 'alice@email.com')\nadd_contact('Bob Smith', '555-0202', 'bob@email.com')\nadd_contact('Charlie Brown', '555-0303', 'charlie@email.com')\n\nprint(f"\\nTotal contacts: {len(contacts)}")\nfor name, info in contacts.items():\n    print(f"  {name}: {info['phone']}, {info['email']}")`,
                hints: ["Store each contact as: contacts[name] = {'phone': phone, 'email': email}", "Use dict.items() to loop through key-value pairs."],
                testCases: [{ input: "", expectedOutput: "Added: Alice Johnson\nAdded: Bob Smith\nAdded: Charlie Brown\n\nTotal contacts: 3", description: "Should add 3 contacts" }],
                concepts: ["dictionaries", "functions", "nested-dicts"]
            },
            {
                stepNumber: 2,
                title: "Search and Lookup",
                description: "Add functions to search for contacts by name (exact or partial match).",
                instructions: "Create find_contact (exact match) and search_contacts (partial match) functions.",
                starterCode: `# Contact Book - Step 2: Search\n\ncontacts = {\n    'Alice Johnson': {'phone': '555-0101', 'email': 'alice@email.com'},\n    'Bob Smith': {'phone': '555-0202', 'email': 'bob@email.com'},\n    'Charlie Brown': {'phone': '555-0303', 'charlie@email.com': 'charlie@email.com'},\n    'Alice Williams': {'phone': '555-0404', 'email': 'awilliams@email.com'}\n}\n\ndef find_contact(name):\n    \"\"\"Find a contact by exact name.\"\"\"\n    pass\n\ndef search_contacts(query):\n    \"\"\"Search contacts by partial name match (case-insensitive).\"\"\"\n    pass\n\n# Test exact lookup\nprint(find_contact('Bob Smith'))\n\n# Test search\nprint(search_contacts('alice'))\n`,
                solutionCode: `# Contact Book - Step 2: Search\n\ncontacts = {\n    'Alice Johnson': {'phone': '555-0101', 'email': 'alice@email.com'},\n    'Bob Smith': {'phone': '555-0202', 'email': 'bob@email.com'},\n    'Charlie Brown': {'phone': '555-0303', 'email': 'charlie@email.com'},\n    'Alice Williams': {'phone': '555-0404', 'email': 'awilliams@email.com'}\n}\n\ndef find_contact(name):\n    if name in contacts:\n        info = contacts[name]\n        return f"{name}: {info['phone']}, {info['email']}"\n    return f"Contact '{name}' not found."\n\ndef search_contacts(query):\n    results = []\n    for name in contacts:\n        if query.lower() in name.lower():\n            results.append(name)\n    return results\n\nprint(find_contact('Bob Smith'))\nprint(search_contacts('alice'))`,
                hints: ["Use 'in' to check if a key exists in a dict.", "Use .lower() on both strings for case-insensitive search."],
                testCases: [{ input: "", expectedOutput: "Bob Smith: 555-0202, bob@email.com\n['Alice Johnson', 'Alice Williams']", description: "Should find and search contacts" }],
                concepts: ["string-methods", "case-insensitive-search", "list-building"]
            },
            {
                stepNumber: 3,
                title: "Update and Delete",
                description: "Add the ability to update existing contacts and delete contacts from the book.",
                instructions: "Create update_contact and delete_contact functions with proper error handling.",
                starterCode: `# Contact Book - Step 3: Update and Delete\n\ncontacts = {\n    'Alice Johnson': {'phone': '555-0101', 'email': 'alice@email.com'},\n    'Bob Smith': {'phone': '555-0202', 'email': 'bob@email.com'},\n    'Charlie Brown': {'phone': '555-0303', 'email': 'charlie@email.com'}\n}\n\ndef update_contact(name, phone=None, email=None):\n    \"\"\"Update a contact's phone and/or email.\"\"\"\n    pass\n\ndef delete_contact(name):\n    \"\"\"Delete a contact by name.\"\"\"\n    pass\n\n# Update Alice's phone\nupdate_contact('Alice Johnson', phone='555-9999')\n\n# Delete Bob\ndelete_contact('Bob Smith')\n\n# Try to delete nonexistent\ndelete_contact('David')\n\n# Show remaining\nprint(f"\\nRemaining contacts: {len(contacts)}")\nfor name in contacts:\n    print(f"  {name}: {contacts[name]}")\n`,
                solutionCode: `# Contact Book - Step 3: Update and Delete\n\ncontacts = {\n    'Alice Johnson': {'phone': '555-0101', 'email': 'alice@email.com'},\n    'Bob Smith': {'phone': '555-0202', 'email': 'bob@email.com'},\n    'Charlie Brown': {'phone': '555-0303', 'email': 'charlie@email.com'}\n}\n\ndef update_contact(name, phone=None, email=None):\n    if name not in contacts:\n        print(f"Contact '{name}' not found.")\n        return\n    if phone:\n        contacts[name]['phone'] = phone\n    if email:\n        contacts[name]['email'] = email\n    print(f"Updated: {name}")\n\ndef delete_contact(name):\n    if name in contacts:\n        del contacts[name]\n        print(f"Deleted: {name}")\n    else:\n        print(f"Contact '{name}' not found.")\n\nupdate_contact('Alice Johnson', phone='555-9999')\ndelete_contact('Bob Smith')\ndelete_contact('David')\n\nprint(f"\\nRemaining contacts: {len(contacts)}")\nfor name in contacts:\n    print(f"  {name}: {contacts[name]}")`,
                hints: ["Check if the contact exists before updating or deleting.", "Use 'del dict[key]' to remove an entry."],
                testCases: [{ input: "", expectedOutput: "Updated: Alice Johnson\nDeleted: Bob Smith\nContact 'David' not found.\n\nRemaining contacts: 2", description: "Should update and delete contacts" }],
                concepts: ["dict-modification", "error-handling", "default-parameters"]
            },
            {
                stepNumber: 4,
                title: "Display and Export",
                description: "Create formatted display functions and export contacts as a formatted string.",
                instructions: "Create a display_all function with formatted output and an export function.",
                starterCode: `# Contact Book - Step 4: Display and Export\n\ncontacts = {\n    'Alice Johnson': {'phone': '555-0101', 'email': 'alice@email.com'},\n    'Bob Smith': {'phone': '555-0202', 'email': 'bob@email.com'},\n    'Charlie Brown': {'phone': '555-0303', 'email': 'charlie@email.com'}\n}\n\ndef display_all():\n    \"\"\"Display all contacts in a formatted table.\"\"\"\n    pass\n\ndef export_contacts():\n    \"\"\"Export contacts as CSV string.\"\"\"\n    pass\n\ndisplay_all()\nprint()\nprint(export_contacts())\n`,
                solutionCode: `# Contact Book - Step 4: Display and Export\n\ncontacts = {\n    'Alice Johnson': {'phone': '555-0101', 'email': 'alice@email.com'},\n    'Bob Smith': {'phone': '555-0202', 'email': 'bob@email.com'},\n    'Charlie Brown': {'phone': '555-0303', 'email': 'charlie@email.com'}\n}\n\ndef display_all():\n    print("=" * 55)\n    print(f"{'Name':<20} {'Phone':<15} {'Email':<20}")\n    print("-" * 55)\n    for name in sorted(contacts.keys()):\n        info = contacts[name]\n        print(f"{name:<20} {info['phone']:<15} {info['email']:<20}")\n    print("=" * 55)\n    print(f"Total: {len(contacts)} contacts")\n\ndef export_contacts():\n    lines = ['Name,Phone,Email']\n    for name in sorted(contacts.keys()):\n        info = contacts[name]\n        lines.append(f"{name},{info['phone']},{info['email']}")\n    return '\\n'.join(lines)\n\ndisplay_all()\nprint()\nprint(export_contacts())`,
                hints: ["Use f-string alignment: f'{value:<20}' for left-align in 20 chars.", "Build CSV lines and join with newlines."],
                testCases: [{ input: "", expectedOutput: "Name,Phone,Email", description: "Should export as CSV" }],
                concepts: ["f-string-formatting", "sorting", "csv-export"]
            }
        ],
        finalSolutionCode: `# Complete Contact Book\n\nclass ContactBook:\n    def __init__(self):\n        self.contacts = {}\n    \n    def add(self, name, phone, email):\n        self.contacts[name] = {'phone': phone, 'email': email}\n        print(f"Added: {name}")\n    \n    def find(self, name):\n        if name in self.contacts:\n            info = self.contacts[name]\n            return f"{name}: {info['phone']}, {info['email']}"\n        return f"'{name}' not found."\n    \n    def search(self, query):\n        return [n for n in self.contacts if query.lower() in n.lower()]\n    \n    def update(self, name, phone=None, email=None):\n        if name not in self.contacts:\n            print(f"'{name}' not found.")\n            return\n        if phone: self.contacts[name]['phone'] = phone\n        if email: self.contacts[name]['email'] = email\n        print(f"Updated: {name}")\n    \n    def delete(self, name):\n        if name in self.contacts:\n            del self.contacts[name]\n            print(f"Deleted: {name}")\n        else:\n            print(f"'{name}' not found.")\n    \n    def display(self):\n        print("=" * 55)\n        print(f"{'Name':<20} {'Phone':<15} {'Email':<20}")\n        print("-" * 55)\n        for name in sorted(self.contacts):\n            info = self.contacts[name]\n            print(f"{name:<20} {info['phone']:<15} {info['email']:<20}")\n        print("=" * 55)\n        print(f"Total: {len(self.contacts)} contacts")\n\nbook = ContactBook()\nbook.add('Alice Johnson', '555-0101', 'alice@email.com')\nbook.add('Bob Smith', '555-0202', 'bob@email.com')\nbook.add('Charlie Brown', '555-0303', 'charlie@email.com')\nprint()\nbook.display()\nprint(f"\\nSearch 'alice': {book.search('alice')}")\nbook.update('Alice Johnson', phone='555-9999')\nbook.delete('Bob Smith')\nprint()\nbook.display()`,
        extensions: [
            "Add groups/tags to categorize contacts (work, family, friends).",
            "Add birthday tracking and upcoming birthday notifications.",
            "Implement undo functionality for deletions.",
            "Add import from CSV string functionality."
        ]
    },

    // ========================================================
    // PROJECT 4: Quiz Game Engine
    // ========================================================
    {
        id: "proj_4",
        title: "Quiz Game Engine",
        description: "Build a complete quiz game with multiple-choice questions, scoring, timers, and performance tracking. Learn data structures, functions, and game logic.",
        difficulty: "intermediate",
        estimatedTime: "50 min",
        skills: ["data-structures", "functions", "classes", "loops", "scoring-logic"],
        icon: "❓",
        steps: [
            {
                stepNumber: 1,
                title: "Question Data Structure",
                description: "Design the data structure for quiz questions and create a question bank.",
                instructions: "Create a list of question dictionaries with question text, choices, correct answer, and difficulty.",
                starterCode: `# Quiz Game - Step 1: Question Bank\n\n# Each question has: text, choices, answer (index), difficulty, category\nquestions = [\n    {\n        'text': 'What is the capital of France?',\n        'choices': ['London', 'Berlin', 'Paris', 'Madrid'],\n        'answer': 2,\n        'difficulty': 'easy',\n        'category': 'Geography'\n    },\n    # Add more questions...\n]\n\n# Display the first question\nq = questions[0]\nprint(f"Q: {q['text']}")\nfor i, choice in enumerate(q['choices'], 1):\n    print(f"  {i}. {choice}")\nprint(f"Answer: {q['choices'][q['answer']]}")\n`,
                solutionCode: `# Quiz Game - Step 1: Question Bank\n\nquestions = [\n    {\n        'text': 'What is the capital of France?',\n        'choices': ['London', 'Berlin', 'Paris', 'Madrid'],\n        'answer': 2,\n        'difficulty': 'easy',\n        'category': 'Geography'\n    },\n    {\n        'text': 'Which planet is known as the Red Planet?',\n        'choices': ['Venus', 'Mars', 'Jupiter', 'Saturn'],\n        'answer': 1,\n        'difficulty': 'easy',\n        'category': 'Science'\n    },\n    {\n        'text': 'What is 2^10?',\n        'choices': ['512', '1000', '1024', '2048'],\n        'answer': 2,\n        'difficulty': 'medium',\n        'category': 'Math'\n    },\n    {\n        'text': 'Who wrote "Romeo and Juliet"?',\n        'choices': ['Dickens', 'Shakespeare', 'Austen', 'Twain'],\n        'answer': 1,\n        'difficulty': 'easy',\n        'category': 'Literature'\n    },\n    {\n        'text': 'What is the chemical symbol for gold?',\n        'choices': ['Go', 'Gd', 'Au', 'Ag'],\n        'answer': 2,\n        'difficulty': 'medium',\n        'category': 'Science'\n    }\n]\n\nprint(f"Question bank loaded: {len(questions)} questions")\nfor q in questions:\n    print(f"  [{q['difficulty']}] {q['category']}: {q['text'][:40]}...")`,
                hints: ["Use a list of dictionaries for flexible question storage.", "Store the answer as the index of the correct choice."],
                testCases: [{ input: "", expectedOutput: "Question bank loaded: 5 questions", description: "Should load all questions" }],
                concepts: ["dictionaries", "lists", "data-modeling"]
            },
            {
                stepNumber: 2,
                title: "Quiz Logic",
                description: "Create the core quiz function that presents questions and checks answers.",
                instructions: "Build a function that runs through questions, accepts answers, and tracks score.",
                starterCode: `# Quiz Game - Step 2: Quiz Logic\n\nquestions = [\n    {'text': 'What is the capital of France?', 'choices': ['London', 'Berlin', 'Paris', 'Madrid'], 'answer': 2, 'difficulty': 'easy', 'category': 'Geography'},\n    {'text': 'Which planet is the Red Planet?', 'choices': ['Venus', 'Mars', 'Jupiter', 'Saturn'], 'answer': 1, 'difficulty': 'easy', 'category': 'Science'},\n    {'text': 'What is 2^10?', 'choices': ['512', '1000', '1024', '2048'], 'answer': 2, 'difficulty': 'medium', 'category': 'Math'},\n    {'text': 'Who wrote Romeo and Juliet?', 'choices': ['Dickens', 'Shakespeare', 'Austen', 'Twain'], 'answer': 1, 'difficulty': 'easy', 'category': 'Literature'},\n    {'text': 'Chemical symbol for gold?', 'choices': ['Go', 'Gd', 'Au', 'Ag'], 'answer': 2, 'difficulty': 'medium', 'category': 'Science'}\n]\n\ndef run_quiz(questions, player_answers):\n    \"\"\"Run the quiz with pre-set answers. Return score and details.\"\"\"\n    score = 0\n    results = []\n    \n    for i, q in enumerate(questions):\n        answer = player_answers[i]\n        # Check if correct and track results\n        pass\n    \n    return score, results\n\n# Simulate a player's answers (0-indexed)\nplayer_answers = [2, 1, 0, 1, 2]  # Paris, Mars, 512(wrong), Shakespeare, Au\n`,
                solutionCode: `# Quiz Game - Step 2: Quiz Logic\n\nquestions = [\n    {'text': 'What is the capital of France?', 'choices': ['London', 'Berlin', 'Paris', 'Madrid'], 'answer': 2, 'difficulty': 'easy', 'category': 'Geography'},\n    {'text': 'Which planet is the Red Planet?', 'choices': ['Venus', 'Mars', 'Jupiter', 'Saturn'], 'answer': 1, 'difficulty': 'easy', 'category': 'Science'},\n    {'text': 'What is 2^10?', 'choices': ['512', '1000', '1024', '2048'], 'answer': 2, 'difficulty': 'medium', 'category': 'Math'},\n    {'text': 'Who wrote Romeo and Juliet?', 'choices': ['Dickens', 'Shakespeare', 'Austen', 'Twain'], 'answer': 1, 'difficulty': 'easy', 'category': 'Literature'},\n    {'text': 'Chemical symbol for gold?', 'choices': ['Go', 'Gd', 'Au', 'Ag'], 'answer': 2, 'difficulty': 'medium', 'category': 'Science'}\n]\n\ndef run_quiz(questions, player_answers):\n    score = 0\n    results = []\n    \n    for i, q in enumerate(questions):\n        answer = player_answers[i]\n        correct = answer == q['answer']\n        if correct:\n            score += 1\n        \n        results.append({\n            'question': q['text'],\n            'your_answer': q['choices'][answer],\n            'correct_answer': q['choices'][q['answer']],\n            'correct': correct\n        })\n        \n        status = 'Correct!' if correct else f"Wrong! Answer: {q['choices'][q['answer']]}"\n        print(f"Q{i+1}: {q['text']}")\n        print(f"  Your answer: {q['choices'][answer]} - {status}")\n    \n    return score, results\n\nplayer_answers = [2, 1, 0, 1, 2]\nscore, results = run_quiz(questions, player_answers)\nprint(f"\\nScore: {score}/{len(questions)}")`,
                hints: ["Compare the player's answer index to q['answer'].", "Build a results list to track each answer."],
                testCases: [{ input: "", expectedOutput: "Score: 4/5", description: "Should calculate correct score" }],
                concepts: ["functions", "enumerate", "conditionals"]
            },
            {
                stepNumber: 3,
                title: "Scoring System",
                description: "Add a weighted scoring system based on difficulty and calculate detailed statistics.",
                instructions: "Award more points for harder questions and generate a detailed score breakdown.",
                starterCode: `# Quiz Game - Step 3: Scoring System\n\ndef calculate_points(difficulty, correct):\n    \"\"\"Return points based on difficulty. Easy=10, Medium=20, Hard=30.\"\"\"\n    pass\n\ndef generate_report(questions, player_answers):\n    \"\"\"Generate a detailed score report.\"\"\"\n    pass\n\n# Test with sample data\n`,
                solutionCode: `# Quiz Game - Step 3: Scoring System\n\nquestions = [\n    {'text': 'Capital of France?', 'choices': ['London', 'Berlin', 'Paris', 'Madrid'], 'answer': 2, 'difficulty': 'easy', 'category': 'Geography'},\n    {'text': 'Red Planet?', 'choices': ['Venus', 'Mars', 'Jupiter', 'Saturn'], 'answer': 1, 'difficulty': 'easy', 'category': 'Science'},\n    {'text': 'What is 2^10?', 'choices': ['512', '1000', '1024', '2048'], 'answer': 2, 'difficulty': 'medium', 'category': 'Math'},\n    {'text': 'Romeo and Juliet author?', 'choices': ['Dickens', 'Shakespeare', 'Austen', 'Twain'], 'answer': 1, 'difficulty': 'easy', 'category': 'Literature'},\n    {'text': 'Symbol for gold?', 'choices': ['Go', 'Gd', 'Au', 'Ag'], 'answer': 2, 'difficulty': 'medium', 'category': 'Science'}\n]\n\ndef calculate_points(difficulty, correct):\n    points = {'easy': 10, 'medium': 20, 'hard': 30}\n    return points.get(difficulty, 10) if correct else 0\n\ndef generate_report(questions, player_answers):\n    total_points = 0\n    max_points = 0\n    correct_count = 0\n    category_scores = {}\n    \n    for i, q in enumerate(questions):\n        correct = player_answers[i] == q['answer']\n        pts = calculate_points(q['difficulty'], correct)\n        max_pts = calculate_points(q['difficulty'], True)\n        total_points += pts\n        max_points += max_pts\n        if correct:\n            correct_count += 1\n        \n        cat = q['category']\n        if cat not in category_scores:\n            category_scores[cat] = {'correct': 0, 'total': 0}\n        category_scores[cat]['total'] += 1\n        if correct:\n            category_scores[cat]['correct'] += 1\n    \n    print("=== QUIZ REPORT ===")\n    print(f"Score: {correct_count}/{len(questions)} ({correct_count/len(questions)*100:.0f}%)")\n    print(f"Points: {total_points}/{max_points}")\n    print("\\nBy Category:")\n    for cat, data in sorted(category_scores.items()):\n        print(f"  {cat}: {data['correct']}/{data['total']}")\n\nplayer_answers = [2, 1, 0, 1, 2]\ngenerate_report(questions, player_answers)`,
                hints: ["Use a dictionary for point values per difficulty.", "Track scores per category using a nested dictionary."],
                testCases: [{ input: "", expectedOutput: "=== QUIZ REPORT ===", description: "Should display quiz report" }],
                concepts: ["scoring", "dictionaries", "statistics"]
            },
            {
                stepNumber: 4,
                title: "Complete Quiz Engine Class",
                description: "Wrap everything in a QuizEngine class with shuffle, filtering, and replay capabilities.",
                instructions: "Create a QuizEngine class that manages questions, runs quizzes, and tracks history.",
                starterCode: `# Quiz Game - Step 4: Complete Engine\n\nimport random\n\nclass QuizEngine:\n    def __init__(self, questions):\n        self.questions = questions\n        self.history = []\n    \n    def filter_by_category(self, category):\n        pass\n    \n    def filter_by_difficulty(self, difficulty):\n        pass\n    \n    def run(self, selected_questions, answers):\n        pass\n    \n    def show_history(self):\n        pass\n`,
                solutionCode: `# Quiz Game - Step 4: Complete Engine\n\nimport random\nrandom.seed(42)\n\nclass QuizEngine:\n    def __init__(self, questions):\n        self.questions = questions\n        self.history = []\n    \n    def filter_by_category(self, category):\n        return [q for q in self.questions if q['category'] == category]\n    \n    def filter_by_difficulty(self, difficulty):\n        return [q for q in self.questions if q['difficulty'] == difficulty]\n    \n    def run(self, selected_questions, answers):\n        score = 0\n        points = 0\n        point_values = {'easy': 10, 'medium': 20, 'hard': 30}\n        \n        print("\\n=== QUIZ START ===")\n        for i, q in enumerate(selected_questions):\n            correct = answers[i] == q['answer']\n            if correct:\n                score += 1\n                points += point_values.get(q['difficulty'], 10)\n            mark = 'O' if correct else 'X'\n            print(f"  [{mark}] {q['text']}")\n        \n        pct = score / len(selected_questions) * 100\n        print(f"\\nResult: {score}/{len(selected_questions)} ({pct:.0f}%) - {points} pts")\n        \n        self.history.append({'score': score, 'total': len(selected_questions), 'points': points})\n        return score\n    \n    def show_history(self):\n        print("\\n=== QUIZ HISTORY ===")\n        for i, h in enumerate(self.history, 1):\n            print(f"  Quiz {i}: {h['score']}/{h['total']} ({h['points']} pts)")\n        total_pts = sum(h['points'] for h in self.history)\n        print(f"  Total points earned: {total_pts}")\n\nquestions = [\n    {'text': 'Capital of France?', 'choices': ['London', 'Berlin', 'Paris', 'Madrid'], 'answer': 2, 'difficulty': 'easy', 'category': 'Geography'},\n    {'text': 'Red Planet?', 'choices': ['Venus', 'Mars', 'Jupiter', 'Saturn'], 'answer': 1, 'difficulty': 'easy', 'category': 'Science'},\n    {'text': 'What is 2^10?', 'choices': ['512', '1000', '1024', '2048'], 'answer': 2, 'difficulty': 'medium', 'category': 'Math'},\n    {'text': 'Romeo and Juliet author?', 'choices': ['Dickens', 'Shakespeare', 'Austen', 'Twain'], 'answer': 1, 'difficulty': 'easy', 'category': 'Literature'},\n    {'text': 'Symbol for gold?', 'choices': ['Go', 'Gd', 'Au', 'Ag'], 'answer': 2, 'difficulty': 'medium', 'category': 'Science'}\n]\n\nengine = QuizEngine(questions)\n\n# Run full quiz\nengine.run(questions, [2, 1, 2, 1, 2])\n\n# Run science-only quiz\nscience_qs = engine.filter_by_category('Science')\nengine.run(science_qs, [1, 2])\n\nengine.show_history()`,
                hints: ["Use list comprehensions for filtering.", "Track quiz history as a list of result dictionaries."],
                testCases: [{ input: "", expectedOutput: "=== QUIZ HISTORY ===", description: "Should show quiz history" }],
                concepts: ["classes", "filtering", "history-tracking"]
            }
        ],
        finalSolutionCode: `# Complete Quiz Game Engine\n\nimport random\n\nclass QuizEngine:\n    def __init__(self, questions):\n        self.questions = questions\n        self.history = []\n        self.point_values = {'easy': 10, 'medium': 20, 'hard': 30}\n    \n    def filter_by(self, category=None, difficulty=None):\n        filtered = self.questions\n        if category:\n            filtered = [q for q in filtered if q['category'] == category]\n        if difficulty:\n            filtered = [q for q in filtered if q['difficulty'] == difficulty]\n        return filtered\n    \n    def run(self, qs, answers):\n        score = points = 0\n        print("\\n=== QUIZ ===")\n        for i, q in enumerate(qs):\n            correct = answers[i] == q['answer']\n            if correct:\n                score += 1\n                points += self.point_values.get(q['difficulty'], 10)\n            mark = 'O' if correct else 'X'\n            print(f"  [{mark}] {q['text']}")\n            if not correct:\n                print(f"      Correct: {q['choices'][q['answer']]}")\n        \n        pct = score / len(qs) * 100 if qs else 0\n        print(f"\\nResult: {score}/{len(qs)} ({pct:.0f}%) | {points} pts")\n        self.history.append({'score': score, 'total': len(qs), 'points': points, 'pct': pct})\n    \n    def stats(self):\n        if not self.history:\n            print("No quizzes taken yet.")\n            return\n        print("\\n=== STATISTICS ===")\n        for i, h in enumerate(self.history, 1):\n            print(f"  Quiz {i}: {h['score']}/{h['total']} ({h['pct']:.0f}%) - {h['points']} pts")\n        avg = sum(h['pct'] for h in self.history) / len(self.history)\n        print(f"  Average: {avg:.1f}%")\n        print(f"  Total points: {sum(h['points'] for h in self.history)}")\n\nquestions = [\n    {'text': 'Capital of France?', 'choices': ['London', 'Berlin', 'Paris', 'Madrid'], 'answer': 2, 'difficulty': 'easy', 'category': 'Geography'},\n    {'text': 'Red Planet?', 'choices': ['Venus', 'Mars', 'Jupiter', 'Saturn'], 'answer': 1, 'difficulty': 'easy', 'category': 'Science'},\n    {'text': 'What is 2^10?', 'choices': ['512', '1000', '1024', '2048'], 'answer': 2, 'difficulty': 'medium', 'category': 'Math'},\n    {'text': 'Romeo and Juliet?', 'choices': ['Dickens', 'Shakespeare', 'Austen', 'Twain'], 'answer': 1, 'difficulty': 'easy', 'category': 'Literature'},\n    {'text': 'Symbol for gold?', 'choices': ['Go', 'Gd', 'Au', 'Ag'], 'answer': 2, 'difficulty': 'medium', 'category': 'Science'}\n]\n\nengine = QuizEngine(questions)\nengine.run(questions, [2, 1, 2, 1, 2])\nengine.run(engine.filter_by(category='Science'), [1, 2])\nengine.stats()`,
        extensions: [
            "Add timed questions with bonus points for fast answers.",
            "Implement question shuffling and answer randomization.",
            "Add streak bonuses for consecutive correct answers.",
            "Create a question editor to add/modify questions at runtime."
        ]
    }
];

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projectsPart1 };
}
