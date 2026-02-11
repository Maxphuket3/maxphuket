@echo off
echo [INFO] Auto-saving changes...
git add .
git commit -m "Auto Update: %date% %time%"
git push origin main
if %errorlevel% neq 0 (
    echo [ERROR] Push failed. 
    pause
) else (
    echo [SUCCESS] Changes pushed to GitHub!
    timeout /t 3
)
