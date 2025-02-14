@echo off
:: Check if Node is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit
)

:: Navigate to the project directory
cd /d %~d0\AutoRunProject

:: Install dependencies (if not installed)
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

:: Start the server
echo Starting the server...
start cmd /k "node server.js"
