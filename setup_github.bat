@echo off
setlocal

echo [Phuket Luxury Platform] - GitHub Deployment Setup
echo ===================================================

:: Check for Git
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed on this system (Path not found).
    echo Please install Git Desktop or Git CLI from https://git-scm.com/
    pause
    exit /b
)

:: Git Initialization
if not exist .git (
    echo [INFO] Initializing new Git repository...
    git init
    git branch -M main
) else (
    echo [INFO] Updating existing repository...
)

:: Add Files
echo [INFO] Adding project files...
git add .

:: Commit
echo [INFO] Committing changes...
git commit -m "시밀란 수하물 로직 및 AI 타임라인 플래너 구현 완료"

:: Remote Repository Link
echo.
echo Please create a new repository on GitHub named 'phuket-luxury-platform' first.
echo (Do not initialize with README, .gitignore, or license)
echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g., https://github.com/StartUpKorea/phuket-luxury-platform.git): "

if "%REPO_URL%"=="" (
    echo [ERROR] No URL provided. Exiting.
    pause
    exit /b
)

:: Add Remote & Push
echo [INFO] Linking to remote repository...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [INFO] Pushing code to GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo [ERROR] Failed to push to GitHub. 
    echo Please check your internet connection or GitHub permissions.
) else (
    echo.
    echo [SUCCESS] Project uploaded successfully to GitHub!
    echo.
    echo [NEXT STEPS - Vercel Deployment]
    echo 1. Go to https://vercel.com/new
    echo 2. Login with GitHub.
    echo 3. Import your repository: %REPO_URL%
    echo 4. Click 'Deploy' (Vite detected automatically).
    echo 5. Your site will be live at https://phuket-trip-six.vercel.app (once configured).
)

pause
