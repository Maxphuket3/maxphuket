@echo off
setlocal

echo [Phuket Platform] - Deploy to GitHub (maxphuket)
echo =================================================

:: Check for Git
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git command not found.
    echo attempting to execute anyway in case it's in user path...
)

:: Git Initialization
if not exist .git (
    echo [INFO] Initializing Git...
    git init
    git branch -M main
)

:: Add All Files
echo [INFO] Adding files...
git add .

:: Commit
echo [INFO] Committing code...
git commit -m "Initial commit for maxphuket"

:: Remote Setup
set /p USERNAME="Enter your GitHub Username: "
set REPO_URL=https://github.com/%USERNAME%/maxphuket.git

echo [INFO] Setting remote to: %REPO_URL%
git remote remove origin 2>nul
git remote add origin %REPO_URL%

:: Push
echo [INFO] Pushing to GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed. 
    echo 1. Check if the repository 'maxphuket' exists on your GitHub.
    echo 2. Check your internet connection.
    echo 3. You might need to authenticate (sign in via browser popup).
    pause
) else (
    echo.
    echo [SUCCESS] Code pushed to 'maxphuket/main'!
    echo Now go to Vercel and import this repository.
    pause
)
