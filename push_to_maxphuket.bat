@echo off
echo [INFO] Organizing file status (git add)...
git add .

echo [INFO] Saving changes (git commit)...
git commit -m "Final Update: Mobile Layout & Prices"

echo [INFO] Sending to server (git push)...
echo Please wait...
git push origin main

if %errorlevel% neq 0 (
    echo [ERROR] Push failed. Check your internet or login.
    pause
) else (
    echo [SUCCESS] Upload complete!
    timeout /t 5
)
