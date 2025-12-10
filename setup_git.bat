@echo off
echo Initializing Git Repository...
git init
if %errorlevel% neq 0 (
    echo Error: Git is not installed or not in PATH. Please install Git and try again.
    rem pause
    exit /b
)

echo Adding files...
git add .

echo Committing...
git commit -m "Initial deployment commit"

echo Renaming branch to main...
git branch -M main

echo Adding remote origin (https://github.com/althuzz/law-quiz-app.git)...
git remote add origin https://github.com/althuzz/law-quiz-app.git

echo.
echo ========================================================
echo Repository initialized successfully!
echo.
echo To upload your code, run this command:
echo    git push -u origin main
echo.
echo (You may be asked to sign in to GitHub)
echo ========================================================
rem pause
