; ============================================================================
; PyLearn — Python Learning Environment
; Inno Setup Installer Script (Standard Install Wizard)
; ============================================================================
;
; Prerequisites:
;   1. Build the portable exe first:  npm run build
;   2. Install Inno Setup 6+:         https://jrsoftware.org/isinfo.php
;   3. Open this file in Inno Setup Compiler and click Build > Compile
;
; Output: installer/Output/PyLearn-Setup.exe
; ============================================================================

#define MyAppName "PyLearn"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "PyLearn"
#define MyAppURL "https://github.com/opus1causaranodev/python-learning-environment"
#define MyAppExeName "PyLearn.exe"
#define MyAppDescription "Interactive Python Learning Environment"

[Setup]
AppId={{A3F7B2C1-8D4E-4F6A-9B0C-1E2D3F4A5B6C}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}/issues
AppUpdatesURL={#MyAppURL}/releases
DefaultDirName={autopf}\{#MyAppName}
DefaultGroupName={#MyAppName}
DisableProgramGroupPage=yes
LicenseFile=
InfoBeforeFile=
OutputDir=Output
OutputBaseFilename=PyLearn-Setup
SetupIconFile=
Compression=lzma2/ultra64
SolidCompression=yes
WizardStyle=modern
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
UninstallDisplayIcon={app}\{#MyAppExeName}
UninstallDisplayName={#MyAppName} — {#MyAppDescription}
VersionInfoDescription={#MyAppDescription}
VersionInfoVersion={#MyAppVersion}
VersionInfoProductName={#MyAppName}
PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=dialog

; Wizard appearance
WizardImageFile=compiler:WizModernImage.bmp
WizardSmallImageFile=compiler:WizModernSmallImage.bmp

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "quicklaunchicon"; Description: "Create a &Quick Launch icon"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 6.1; Check: not IsAdminInstallMode

[Files]
; Include the entire unpacked Electron app
Source: "..\dist\win-unpacked\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Comment: "{#MyAppDescription}"
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Comment: "{#MyAppDescription}"; Tasks: desktopicon
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: quicklaunchicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
Type: filesandordirs; Name: "{app}"

[Code]
// ---------------------------------------------------------------------------
// Custom wizard page: display app description before installation
// ---------------------------------------------------------------------------
var
  InfoPage: TOutputMsgWizardPage;

procedure InitializeWizard;
begin
  InfoPage := CreateOutputMsgPage(wpWelcome,
    'About PyLearn',
    'What is PyLearn?',
    'PyLearn is a comprehensive, interactive Python learning platform.' + #13#10 +
    '' + #13#10 +
    'Features:' + #13#10 +
    '  - 12-module curriculum from beginner to advanced' + #13#10 +
    '  - Interactive code editor with syntax highlighting' + #13#10 +
    '  - Run Python code instantly (no Python install needed)' + #13#10 +
    '  - Coding challenges with automated grading' + #13#10 +
    '  - Guided projects with step-by-step instructions' + #13#10 +
    '  - Progress tracking, achievements & streaks' + #13#10 +
    '  - 6 beautiful themes' + #13#10 +
    '' + #13#10 +
    'PyLearn uses Pyodide (Python in WebAssembly) so you can write and' + #13#10 +
    'run real Python code without installing Python on your machine.' + #13#10 +
    '' + #13#10 +
    'Click Next to continue with the installation.');
end;
