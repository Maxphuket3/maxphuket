@echo off
echo [INFO] Auto-saving changes...
git add .
git commit -m "Auto Update: %date% %time%"
echo [INFO] Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo [ERROR] Push failed. Check credentials or remote.
    exit /b 1
) else (
    echo [SUCCESS] Changes pushed to GitHub!
    exit /b 0
)
