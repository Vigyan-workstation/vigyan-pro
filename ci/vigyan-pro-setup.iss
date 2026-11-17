; ==============================================================================
; Vigyan Pro Workstation - Inno Setup 6 Installer Script
; Production Grade • 100% Offline Edge Intelligence Workstation
; Zero Administrator Privileges Required (Installs to {localappdata}\Programs\Vigyan Pro)
; ==============================================================================

#define MyAppName "Vigyan Pro Workstation"
#define MyAppShortName "Vigyan Pro"
#define MyAppVersion "5.0.7"
#define MyAppPublisher "ExperimentLab AI"
#define MyAppURL "https://experimentlab.in"
#define MyAppExeName "Vigyan-Pro.bat"
#define MyAppCliExeName "Vigyan-CLI.bat"

[Setup]
; Basic Application Info
AppId={{D37E84B0-4A9B-4BF2-9C8E-32E1D2D56A1F}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName} v{#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}/issues
AppUpdatesURL={#MyAppURL}/releases

; Non-Admin Installation Target
DefaultDirName={localappdata}\Programs\Vigyan Pro
DefaultGroupName={#MyAppName}
DisableProgramGroupPage=yes
PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=dialog

; Output Settings
OutputDir=..\dist
OutputBaseFilename=vigyan-pro-setup-v{#MyAppVersion}
Compression=lzma2/max
SolidCompression=yes
ArchitecturesInstallIn64BitMode=x64compatible
ArchitecturesAllowed=x64compatible

; Visuals & Icon
SetupIconFile=..\assets\icons\vigyan-pro.ico
UninstallDisplayIcon={app}\assets\icons\vigyan-pro.ico
UninstallDisplayName={#MyAppName} v{#MyAppVersion}
WizardStyle=modern

; Uninstaller Configuration
CreateUninstallRegKey=yes

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"
Name: "addtopath"; Description: "Add Vigyan CLI to User PATH (Command Prompt & PowerShell)"; GroupDescription: "Command Line Integration:"; Flags: unchecked

[Files]
; Root scripts and documents
Source: "..\Vigyan-Pro.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\Vigyan-CLI.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\README.md"; DestDir: "{app}"; Flags: ignoreversion isreadme
Source: "..\LICENSE"; DestDir: "{app}"; Flags: ignoreversion

; Assets (icons, images)
Source: "..\assets\*"; DestDir: "{app}\assets"; Flags: ignoreversion recursesubdirs createallsubdirs

; Source code tree
Source: "..\src\*"; DestDir: "{app}\src"; Flags: ignoreversion recursesubdirs createallsubdirs

; Optional pre-bundled binaries if present in bin/
Source: "..\bin\*"; DestDir: "{app}\bin"; Flags: ignoreversion recursesubdirs createallsubdirs; Check: DirExists(ExpandConstant('{src}\..\bin'))

[Icons]
; Start Menu shortcuts
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\assets\icons\vigyan-pro.ico"; Comment: "Vigyan Pro Sovereign Edge Intelligence Studio"
Name: "{autoprograms}\{#MyAppName} CLI"; Filename: "{app}\{#MyAppCliExeName}"; IconFilename: "{app}\assets\icons\vigyan-pro.ico"; Comment: "Vigyan Pro Sovereign Command Line Interface"
Name: "{autoprograms}\Uninstall {#MyAppName}"; Filename: "{uninstallexe}"; IconFilename: "{app}\assets\icons\vigyan-pro.ico"

; Optional Desktop shortcut
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\assets\icons\vigyan-pro.ico"; Comment: "Vigyan Pro Sovereign Edge Intelligence Studio"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: shellexec postinstall nowait skipifsilent

[Registry]
; Register App Paths for Windows Run Dialog (Win+R)
Root: HKCU; Subkey: "Software\Microsoft\Windows\CurrentVersion\App Paths\{#MyAppExeName}"; ValueType: string; ValueName: ""; ValueData: "{app}\{#MyAppExeName}"; Flags: uninsdeletekey
Root: HKCU; Subkey: "Software\Microsoft\Windows\CurrentVersion\App Paths\{#MyAppExeName}"; ValueType: string; ValueName: "Path"; ValueData: "{app}"; Flags: uninsdeletekey
Root: HKCU; Subkey: "Software\Microsoft\Windows\CurrentVersion\App Paths\vigyan.exe"; ValueType: string; ValueName: ""; ValueData: "{app}\{#MyAppCliExeName}"; Flags: uninsdeletekey
Root: HKCU; Subkey: "Software\Microsoft\Windows\CurrentVersion\App Paths\vigyan.exe"; ValueType: string; ValueName: "Path"; ValueData: "{app}"; Flags: uninsdeletekey

[Code]
// Helper function to check directory existence
function DirExists(Dir: string): Boolean;
begin
  Result := DirExists(Dir);
end;

// Helper procedure to add a folder to User PATH in registry
procedure AddPathToEnv(PathToAdd: string);
var
  CurrentPath: string;
begin
  if not RegQueryStringValue(HKEY_CURRENT_USER, 'Environment', 'Path', CurrentPath) then
    CurrentPath := '';

  if Pos(';' + PathToAdd + ';', ';' + CurrentPath + ';') = 0 then
  begin
    if (CurrentPath <> '') and (CurrentPath[Length(CurrentPath)] <> ';') then
      CurrentPath := CurrentPath + ';';
    CurrentPath := CurrentPath + PathToAdd;
    RegWriteStringValue(HKEY_CURRENT_USER, 'Environment', 'Path', CurrentPath);
  end;
end;

// Helper procedure to remove a folder from User PATH in registry on uninstall
procedure RemovePathFromEnv(PathToRemove: string);
var
  CurrentPath: string;
  P: Integer;
begin
  if RegQueryStringValue(HKEY_CURRENT_USER, 'Environment', 'Path', CurrentPath) then
  begin
    // Check if path exists surrounded by delimiters
    P := Pos(';' + Uppercase(PathToRemove) + ';', ';' + Uppercase(CurrentPath) + ';');
    if P > 0 then
    begin
      CurrentPath := ';' + CurrentPath + ';';
      StringChangeEx(CurrentPath, ';' + PathToRemove + ';', ';', True);
      if (Length(CurrentPath) > 0) and (CurrentPath[1] = ';') then
        Delete(CurrentPath, 1, 1);
      if (Length(CurrentPath) > 0) and (CurrentPath[Length(CurrentPath)] = ';') then
        Delete(CurrentPath, Length(CurrentPath), 1);
      RegWriteStringValue(HKEY_CURRENT_USER, 'Environment', 'Path', CurrentPath);
    end;
  end;
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then
  begin
    if IsTaskSelected('addtopath') then
    begin
      AddPathToEnv(ExpandConstant('{app}'));
    end;
  end;
end;

procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
begin
  if CurUninstallStep = usPostUninstall then
  begin
    RemovePathFromEnv(ExpandConstant('{app}'));
  end;
end;
