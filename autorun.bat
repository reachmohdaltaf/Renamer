@echo off
cd /d %~d0\AutoRunProject
start cmd /k "node server.js"
