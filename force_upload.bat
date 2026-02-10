@echo off
setlocal
echo [Phuket Platform] Force Upload Tool
echo ===================================

:: 1. Auto-detect Git
set GIT_PATH=git
where git >nul 2>nul
if %errorlevel% equ 0 goto found_git

if exist "C:\Program Files\Git\cmd\git.exe" (
    set GIT_PATH="C:\Program Files\Git\cmd\git.exe"
    goto found_git
)
if exist "C:\Program Files\Git\bin\git.exe" (
    set GIT_PATH="C:\Program Files\Git\bin\git.exe"
    goto found_git
)
if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" (
    set GIT_PATH="%LOCALAPPDATA%\Programs\Git\cmd\git.exe"
    goto found_git
)

echo [WARNING] proper 'git' command not found in standard paths.
echo We will try using 'git' anyway, but if it fails, please install Git.
echo.

:found_git
echo [INFO] Using Git at: %GIT_PATH%

:: 2. Initialize and Safety Check
if not exist .git (
    echo [INFO] Initializing repository...
    %GIT_PATH% init
    %GIT_PATH% branch -M main
)

:: 3. Force Add All Files
echo [INFO] Adding all files to staging...
%GIT_PATH% add .

:: 4. Commit
echo [INFO] Committing changes...
%GIT_PATH% commit -m "Complete Project Upload (Force Push)"

:: 5. Set Remote (Defaulting to maxphuket3 based on your input)
set USERNAME=maxphuket3
echo.
echo Target Repository: https://github.com/%USERNAME%/maxphuket.git
echo (If this username is wrong, close this window and edit the file or run it again)
echo.

%GIT_PATH% remote remove origin 2>nul
%GIT_PATH% remote add origin https://github.com/%USERNAME%/maxphuket.git

:: 6. Push
echo [INFO] Pushing to GitHub (main branch)...
echo.
%GIT_PATH% push -u origin main --force

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Upload failed!
    echo Reasons could be:
    echo 1. The repository 'maxphuket' does not exist on your GitHub (Create it first!).
    echo 2. Permission denied (Check your login).
    echo 3. 'maxphuket3' is not the correct username.
) else (
    echo.
    echo [SUCCESS] All files uploaded successfully!
    echo Go to Vercel and click 'Deploy' again.
)

pause
