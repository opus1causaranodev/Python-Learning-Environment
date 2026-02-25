# ============================================================================
# PyLearn — Python Learning Environment
# PowerShell Web Installer (Alternative Installer)
# ============================================================================
#
# Usage:
#   Right-click > "Run with PowerShell"
#   — or —
#   powershell -ExecutionPolicy Bypass -File Install-PyLearn.ps1
#
# This script downloads the latest PyLearn release from GitHub and sets it up
# on your machine — no build tools or Node.js required.
# ============================================================================

#Requires -Version 5.1
$ErrorActionPreference = "Stop"

# ── Configuration ────────────────────────────────────────────────────────────

$AppName        = "PyLearn"
$RepoOwner      = "opus1causaranodev"
$RepoName       = "python-learning-environment"
$AssetName      = "PyLearn.exe"
$GitHubAPI      = "https://api.github.com/repos/$RepoOwner/$RepoName/releases/latest"

# ── Helper Functions ─────────────────────────────────────────────────────────

function Write-Banner {
    Clear-Host
    Write-Host ""
    Write-Host "  ╔══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "  ║                                                      ║" -ForegroundColor Cyan
    Write-Host "  ║           PyLearn — Python Learning Environment       ║" -ForegroundColor Cyan
    Write-Host "  ║                    Web Installer                      ║" -ForegroundColor Cyan
    Write-Host "  ║                                                      ║" -ForegroundColor Cyan
    Write-Host "  ╚══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
}

function Write-Step {
    param([string]$Message)
    Write-Host "  [*] " -NoNewline -ForegroundColor Green
    Write-Host $Message
}

function Write-Info {
    param([string]$Message)
    Write-Host "      $Message" -ForegroundColor Gray
}

function Write-Error-Msg {
    param([string]$Message)
    Write-Host "  [!] $Message" -ForegroundColor Red
}

function Write-Success {
    param([string]$Message)
    Write-Host "  [✓] " -NoNewline -ForegroundColor Green
    Write-Host $Message -ForegroundColor White
}

function Get-UserChoice {
    param(
        [string]$Prompt,
        [string[]]$Options,
        [int]$Default = 0
    )

    Write-Host ""
    Write-Host "  $Prompt" -ForegroundColor Yellow
    Write-Host ""

    for ($i = 0; $i -lt $Options.Length; $i++) {
        $marker = if ($i -eq $Default) { ">" } else { " " }
        $color  = if ($i -eq $Default) { "White" } else { "Gray" }
        Write-Host "    $marker [$($i + 1)] $($Options[$i])" -ForegroundColor $color
    }

    Write-Host ""
    $choice = Read-Host "  Enter choice (1-$($Options.Length), default=$($Default + 1))"

    if ([string]::IsNullOrWhiteSpace($choice)) {
        return $Default
    }

    $parsed = 0
    if ([int]::TryParse($choice, [ref]$parsed) -and $parsed -ge 1 -and $parsed -le $Options.Length) {
        return $parsed - 1
    }

    return $Default
}

# ── Main Installer Logic ────────────────────────────────────────────────────

Write-Banner

# --- Step 1: Choose install location ---

$locationChoice = Get-UserChoice `
    -Prompt "Where would you like to install PyLearn?" `
    -Options @(
        "Program Files  ($env:LOCALAPPDATA\Programs\$AppName)",
        "Desktop        ($env:USERPROFILE\Desktop\$AppName)",
        "Custom location"
    ) `
    -Default 0

switch ($locationChoice) {
    0 { $InstallDir = Join-Path $env:LOCALAPPDATA "Programs\$AppName" }
    1 { $InstallDir = Join-Path $env:USERPROFILE "Desktop\$AppName" }
    2 {
        Write-Host ""
        $customPath = Read-Host "  Enter install path"
        if ([string]::IsNullOrWhiteSpace($customPath)) {
            Write-Error-Msg "No path entered. Exiting."
            exit 1
        }
        $InstallDir = $customPath
    }
}

Write-Host ""
Write-Info "Install directory: $InstallDir"

# --- Step 2: Choose shortcut options ---

$shortcutChoice = Get-UserChoice `
    -Prompt "Create shortcuts?" `
    -Options @(
        "Desktop shortcut + Start Menu entry",
        "Desktop shortcut only",
        "Start Menu entry only",
        "No shortcuts"
    ) `
    -Default 0

$createDesktopShortcut = $shortcutChoice -eq 0 -or $shortcutChoice -eq 1
$createStartMenuEntry  = $shortcutChoice -eq 0 -or $shortcutChoice -eq 2

# --- Step 3: Confirm ---

Write-Host ""
Write-Host "  ──────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "  Install Summary:" -ForegroundColor Yellow
Write-Info "  Location:         $InstallDir"
Write-Info "  Desktop shortcut: $(if ($createDesktopShortcut) { 'Yes' } else { 'No' })"
Write-Info "  Start Menu entry: $(if ($createStartMenuEntry)  { 'Yes' } else { 'No' })"
Write-Host "  ──────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host ""

$confirm = Read-Host "  Proceed with installation? (Y/n)"
if ($confirm -match '^[Nn]') {
    Write-Host ""
    Write-Info "Installation cancelled."
    exit 0
}

Write-Host ""

# --- Step 4: Fetch latest release ---

Write-Step "Fetching latest release info from GitHub..."

try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $release = Invoke-RestMethod -Uri $GitHubAPI -Headers @{ "User-Agent" = "PyLearn-Installer" }
    $asset   = $release.assets | Where-Object { $_.name -eq $AssetName } | Select-Object -First 1

    if (-not $asset) {
        Write-Error-Msg "Could not find '$AssetName' in the latest release."
        Write-Info "Available assets: $($release.assets.name -join ', ')"
        Write-Host ""
        Read-Host "  Press Enter to exit"
        exit 1
    }

    $downloadUrl = $asset.browser_download_url
    $version     = $release.tag_name
    $fileSize    = [math]::Round($asset.size / 1MB, 1)

    Write-Info "Version: $version"
    Write-Info "File size: ${fileSize} MB"
} catch {
    Write-Error-Msg "Failed to reach GitHub API."
    Write-Info $_.Exception.Message
    Write-Host ""
    Write-Host "  If you already have PyLearn.exe, you can place it manually in:" -ForegroundColor Yellow
    Write-Info "  $InstallDir"
    Write-Host ""
    Read-Host "  Press Enter to exit"
    exit 1
}

# --- Step 5: Create install directory ---

Write-Step "Creating install directory..."

if (-not (Test-Path $InstallDir)) {
    New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
    Write-Info "Created: $InstallDir"
} else {
    Write-Info "Directory already exists, will overwrite."
}

# --- Step 6: Download ---

$downloadPath = Join-Path $InstallDir $AssetName

Write-Step "Downloading PyLearn ($fileSize MB)..."
Write-Info "This may take a minute depending on your connection."
Write-Host ""

try {
    $webClient = New-Object System.Net.WebClient
    $webClient.Headers.Add("User-Agent", "PyLearn-Installer")

    # Progress tracking
    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    $lastPercent = -1

    Register-ObjectEvent -InputObject $webClient -EventName DownloadProgressChanged -Action {
        $pct = $EventArgs.ProgressPercentage
        if ($pct -ne $script:lastPercent -and ($pct % 5 -eq 0)) {
            $script:lastPercent = $pct
            $elapsed = $script:stopwatch.Elapsed.TotalSeconds
            $mbDone  = [math]::Round($EventArgs.BytesReceived / 1MB, 1)
            $bar     = ("█" * [math]::Floor($pct / 5)) + ("░" * (20 - [math]::Floor($pct / 5)))
            Write-Host "`r      [$bar] ${pct}%  (${mbDone} MB)" -NoNewline
        }
    } | Out-Null

    $webClient.DownloadFileTaskAsync($downloadUrl, $downloadPath).GetAwaiter().GetResult()

    Write-Host ""
    Write-Host ""
    Write-Success "Download complete!"
} catch {
    Write-Host ""
    Write-Error-Msg "Download failed: $($_.Exception.Message)"
    Write-Host ""
    Read-Host "  Press Enter to exit"
    exit 1
} finally {
    if ($webClient) { $webClient.Dispose() }
    Get-EventSubscriber | Where-Object { $_.SourceObject -is [System.Net.WebClient] } | Unregister-Event -ErrorAction SilentlyContinue
}

# --- Step 7: Create shortcuts ---

function New-Shortcut {
    param(
        [string]$ShortcutPath,
        [string]$TargetPath,
        [string]$Description
    )
    $shell    = New-Object -ComObject WScript.Shell
    $shortcut = $shell.CreateShortcut($ShortcutPath)
    $shortcut.TargetPath       = $TargetPath
    $shortcut.WorkingDirectory = Split-Path $TargetPath
    $shortcut.Description      = $Description
    $shortcut.Save()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($shell) | Out-Null
}

if ($createDesktopShortcut) {
    Write-Step "Creating desktop shortcut..."
    $desktopLink = Join-Path ([Environment]::GetFolderPath("Desktop")) "$AppName.lnk"
    New-Shortcut -ShortcutPath $desktopLink -TargetPath $downloadPath -Description "PyLearn — Python Learning Environment"
    Write-Info "Created: $desktopLink"
}

if ($createStartMenuEntry) {
    Write-Step "Creating Start Menu entry..."
    $startMenuDir = Join-Path ([Environment]::GetFolderPath("Programs")) $AppName
    if (-not (Test-Path $startMenuDir)) {
        New-Item -ItemType Directory -Path $startMenuDir -Force | Out-Null
    }
    $startMenuLink = Join-Path $startMenuDir "$AppName.lnk"
    New-Shortcut -ShortcutPath $startMenuLink -TargetPath $downloadPath -Description "PyLearn — Python Learning Environment"
    Write-Info "Created: $startMenuLink"
}

# --- Step 8: Create uninstaller script ---

Write-Step "Creating uninstaller..."

$uninstallScript = Join-Path $InstallDir "Uninstall-PyLearn.ps1"

$uninstallContent = @"
# PyLearn Uninstaller
`$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "  PyLearn Uninstaller" -ForegroundColor Cyan
Write-Host ""

`$confirm = Read-Host "  Remove PyLearn and all its files? (y/N)"
if (`$confirm -notmatch '^[Yy]') {
    Write-Host "  Cancelled." -ForegroundColor Gray
    exit 0
}

# Remove shortcuts
`$desktopLink = Join-Path ([Environment]::GetFolderPath("Desktop")) "$AppName.lnk"
if (Test-Path `$desktopLink) {
    Remove-Item `$desktopLink -Force
    Write-Host "  Removed desktop shortcut." -ForegroundColor Green
}

`$startMenuDir = Join-Path ([Environment]::GetFolderPath("Programs")) "$AppName"
if (Test-Path `$startMenuDir) {
    Remove-Item `$startMenuDir -Recurse -Force
    Write-Host "  Removed Start Menu entry." -ForegroundColor Green
}

# Remove install directory
`$installDir = "$InstallDir"
if (Test-Path `$installDir) {
    Remove-Item `$installDir -Recurse -Force
    Write-Host "  Removed install directory." -ForegroundColor Green
}

Write-Host ""
Write-Host "  PyLearn has been uninstalled." -ForegroundColor Green
Write-Host ""
Read-Host "  Press Enter to close"
"@

Set-Content -Path $uninstallScript -Value $uninstallContent -Encoding UTF8

Write-Info "Created: $uninstallScript"

# --- Done! ---

Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "  ║                                                      ║" -ForegroundColor Green
Write-Host "  ║            Installation Complete!                    ║" -ForegroundColor Green
Write-Host "  ║                                                      ║" -ForegroundColor Green
Write-Host "  ╚══════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Info "Installed to: $InstallDir"
Write-Info "To uninstall: run Uninstall-PyLearn.ps1 in the install folder"
Write-Host ""

$launch = Read-Host "  Launch PyLearn now? (Y/n)"
if ($launch -notmatch '^[Nn]') {
    Start-Process $downloadPath
}
