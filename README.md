# PyLearn — Python Learning Environment

A comprehensive, interactive Python learning platform built as a standalone desktop app. Features a full curriculum of 12 modules covering beginner to advanced topics, all powered by [Pyodide](https://pyodide.org/) (Python running in WebAssembly) — no Python installation required.

![Electron](https://img.shields.io/badge/Electron-33-47848F?logo=electron&logoColor=white)
![Python](https://img.shields.io/badge/Python-via%20Pyodide-3776AB?logo=python&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?logo=windows&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

### Learning
- **12-module curriculum** — from variables and data types to file I/O and final projects
- **Interactive lessons** with embedded code examples you can run instantly
- **Coding challenges** with automated answer checking and hints
- **Guided projects** with step-by-step instructions
- **Quiz mode** with per-module assessments and explanations

### Code Editor
- Syntax highlighting with a transparent overlay
- Auto-indent after colons (`:`)
- Configurable tab size (2/4/8 spaces)
- Code history — view and restore up to 10 previous versions per lesson/challenge

### Progress & Gamification
- Progress tracking across lessons, challenges, and projects
- 17 achievement badges (First Steps, Speed Demon, Perfectionist, etc.)
- GitHub-style activity heatmap and streak tracking
- Difficulty ratings for challenges
- Export/print progress reports as styled HTML

### Productivity
- **Search** (Ctrl+K) — command palette to quickly find lessons, challenges, examples, and projects
- **Bookmarks** — save and organize favorite lessons
- **Notes** — per-lesson notepad with auto-save
- **Code Snippets** — personal snippet library with tags
- **Keyboard shortcuts** — press `?` to view all shortcuts

### Customization
- 6 themes: Midnight Ocean, Solar Flare, Forest Canopy, Arctic Frost, Sakura Bloom, Cyberpunk Neon
- Adjustable font size and tab size
- Dockable output panel (bottom or right)
- All settings persist across sessions

### Accessibility
- ARIA landmarks and live regions
- Skip-to-content link
- Focus trapping in modals
- Responsive layout (desktop, tablet, mobile)
- Keyboard-navigable throughout

## Getting Started

### Option 1: Download the .exe (easiest)

Download `PyLearn.exe` from the [Releases](../../releases) page and double-click to run. No installation needed — it's a portable executable.

### Option 2: Windows Installer (Setup Wizard)

Download `PyLearn-Setup.exe` from the [Releases](../../releases) page. This is a standard Windows installer that provides:
- Install location selection
- Start Menu & desktop shortcuts
- Add/Remove Programs entry
- Clean uninstaller

> To build the installer yourself, open [`installer/PyLearn-Setup.iss`](installer/PyLearn-Setup.iss) in [Inno Setup 6+](https://jrsoftware.org/isinfo.php) and compile.

### Option 3: PowerShell Web Installer

Run the one-line command below — it downloads the latest release from GitHub and sets everything up for you:

```powershell
powershell -ExecutionPolicy Bypass -File Install-PyLearn.ps1
```

Or right-click [`installer/Install-PyLearn.ps1`](installer/Install-PyLearn.ps1) > **Run with PowerShell**.

Features: choice of install location, optional shortcuts, download progress, and a generated uninstaller.

### Option 4: Run from source

```bash
git clone https://github.com/opus1causaranodev/python-learning-environment.git
cd python-learning-environment

npm install
npm start
```

### Option 5: Open in browser

Open `index.html` directly in a modern browser. Pyodide will load from the local `pyodide/` folder (or fall back to CDN if files aren't present).

## Building the .exe

```bash
npm run build
```

The portable executable will be created at `dist/PyLearn.exe`.

## Curriculum

| Module | Topic |
|--------|-------|
| 1 | Variables & Data Types |
| 2 | Operators & Expressions |
| 3 | Control Flow — Conditionals |
| 4 | Control Flow — Loops |
| 5 | Functions |
| 6 | Data Structures — Lists & Tuples |
| 7 | Data Structures — Dictionaries & Sets |
| 8 | String Methods & Formatting |
| 9 | File Input/Output |
| 10 | Error Handling |
| 11 | Modules & Libraries |
| 12 | Final Projects |

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (vanilla — no frameworks)
- **Python Runtime:** [Pyodide](https://pyodide.org/) v0.27.2 (WebAssembly)
- **Desktop Shell:** [Electron](https://www.electronjs.org/) 33
- **Packaging:** [electron-builder](https://www.electron.build/) (Windows portable)
- **Fonts:** [Inter](https://rsms.me/inter/), [JetBrains Mono](https://www.jetbrains.com/lp/mono/)

## Project Structure

```
├── index.html              # Main app shell
├── styles.css              # Core styles + 6 themes
├── main.js                 # Electron main process
├── package.json            # Electron + build config
├── css/
│   └── responsive.css      # Tablet/mobile responsive styles
├── js/
│   ├── app.js              # Core application logic & routing
│   ├── pyodide-runner.js   # Python execution engine
│   ├── progress-tracker.js # Progress persistence
│   ├── challenges.js       # Challenge runner & answer checker
│   ├── answer-checker.js   # Automated code validation
│   ├── editor-enhance.js   # Syntax highlighting & code history
│   ├── search.js           # Command palette search
│   ├── user-content.js     # Bookmarks, notes & snippets
│   ├── gamification.js     # Achievements, heatmap & streaks
│   ├── quiz.js             # Quiz system
│   ├── export.js           # Progress report export
│   └── shortcuts.js        # Keyboard shortcuts & accessibility
├── fonts/                  # Bundled web fonts
├── pyodide/                # Bundled Pyodide runtime (~14 MB)
├── installer/
│   ├── PyLearn-Setup.iss   # Inno Setup installer script (standard wizard)
│   └── Install-PyLearn.ps1 # PowerShell web installer (alternative)
├── curriculum.js           # Lesson content for all 12 modules
├── examples.js             # Runnable code examples
├── activities_*.js         # Challenge definitions
└── projects_*.js           # Guided project definitions
```

## License

MIT
