@echo off
title TrafficPulse GitHub Auto Sync
color 0B

echo ========================================================
echo         LandDNA - Auto GitHub Push Engine
echo ========================================================
echo.

:sync_process
echo [%time%] Checking for local changes...

:: Check if any file was modified/added/deleted
git status --porcelain > temp_status.txt

:: Check if temp_status.txt has content (size > 0)
for %%I in (temp_status.txt) do (
    if %%~zI gtr 0 (
        set HAS_CHANGES=1
    ) else (
        set HAS_CHANGES=0
    )
)
del temp_status.txt

if "%HAS_CHANGES%"=="1" (
    echo [%time%] New changes detected!
    echo Uploading to GitHub...
    
    :: Add all files
    git add .
    
    :: Commit with timestamp
    git commit -m "Auto sync update: %date% %time%"
    
    :: Push to GitHub
    git push origin main
    
    if %errorlevel% neq 0 (
        echo [WARNING] Normal push failed! Pulling latest changes first...
        git pull --rebase origin main
        git push origin main
    )
    
    if %errorlevel% equ 0 (
        echo.
        echo [%time%] SUCCESS: Code successfully pushed to GitHub!
        echo ========================================================
    ) else (
        echo.
        echo [%time%] ERROR: Failed to push to GitHub. Check your network or conflicts!
        echo ========================================================
    )
) else (
    echo [%time%] No new changes found. Everything is up to date!
)

echo.
echo Next auto-check in 30 seconds...
echo (You can minimize this window or close it whenever done)
echo.

:: Wait for 30 seconds
timeout /t 30 /nobreak >nul

:: Loop back to sync
goto sync_process