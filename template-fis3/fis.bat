@echo off
:: const
set CONFIG_FILE=fis-conf.js
set SOURCE_FOLDER=source
set SERVER_TYPE=node
:: java,php,node,jello...
set SERVER_PORT=8081
set RELEASE_FOLDER=release
set DIST_FOLDER=dist
set DIST_FILETYPE=zip
:: zip,tar.gz  tar.gz NOT support chinese filename
set LOG_FILE=release.log


:: init window
REM chcp 65001
title fis3 debug ^& distribute script
color 37
mode con cols=56 lines=20

:: display info
echo ========================================================
echo             fis3 debug ^& distribute script
echo                 see http://fis.baidu.com
echo             fisker Cheung lionkay@gmail.com
echo ========================================================
echo.
echo.
echo.  [1] debug
echo.  [2] distribute
echo.  [3] distribute ^& archive
echo.  [Q] quit
echo.
echo.
echo.
echo.
echo.
echo.
echo.

:: chose operation
set /p choice=input your choice and press ENTER:
if "%choice%"=="1" ( goto debug )
if "%choice%"=="2" ( goto release )
if "%choice%"=="3" ( goto release )
if /i "%choice%"=="q" ( cls & goto end )
goto debug

:: archive
:archive

:: make distribute folder ready
if not exist %DIST_FOLDER% md %DIST_FOLDER%

:: set distribute file name
for /f "delims=" %%i in ("%cd%") do set FOLDER=%%~ni
set hour=%time:~0,2%
if /i %hour% LSS 10 (set hour=0%time:~1,1%)
set DIST_FILENAME=%FOLDER%.%date:~2,2%%date:~5,2%%date:~8,2%-%hour%%time:~3,2%%time:~6,2%

:: archive files to distribute folder
echo .......................................................
echo packing files
if "%DIST_FILETYPE%"=="tar.gz" ( call targz -l 9 -m 9 -c "%RELEASE_FOLDER%" "%DIST_FOLDER%\%DIST_FILENAME%.tar.gz" ) else ( call winzip zip "%RELEASE_FOLDER%" "%DIST_FOLDER%\%DIST_FILENAME%" )
if errorlevel 1 ( pause )
echo ..................................................done.
echo.

:: quit
goto end

:: relase
:release
cls

:: reset config file if another config files exists in sourcefolder
if exist %SOURCE_FOLDER%\fis-conf.js ( set CONFIG_FILE=%SOURCE_FOLDER%\fis-conf.js )

:: remove release file and log file
echo .......................................................
echo clean release folder
if exist %RELEASE_FOLDER% rd /S /Q %RELEASE_FOLDER%
if exist %LOG_FILE% del /Q %LOG_FILE%
echo ..................................................done.
echo.

:: release file
echo .......................................................
echo releasing files
call fis3 release production --dest release --lint --unique --root ".\%SOURCE_FOLDER%" --file %CONFIG_FILE% --verbose --no-color > %LOG_FILE%
if errorlevel 1 ( goto error )
echo ..................................................done.
echo.

if "%choice%"=="3" ( goto archive )

:: quit
goto end


:: debug
:debug
cls

:: check java server
if /i "%SERVER_TYPE%"=="java" (
  call java -version > nul
  if errorlevel 1 ( set SERVER_TYPE=node )
)

:: check php server
if /i "%SERVER_TYPE%"=="php" (
  call php -v > nul
  if errorlevel 1 ( set SERVER_TYPE=node )
)

:: stop server
echo .......................................................
echo stop server
call fis3 server stop
if errorlevel 1 ( pause )
echo ..................................................done.
echo.

:: clean up
echo .......................................................
echo clean up server folder
call fis3 server clean
if errorlevel 1 ( pause )
echo ..................................................done.
echo.

:: release
echo .......................................................
echo release files
call fis3 release dev --root ".\%SOURCE_FOLDER%" --lint --verbose --no-color > %LOG_FILE%
if errorlevel 1 ( goto error )
del /Q %LOG_FILE%
echo ..................................................done.
echo.

:: start server
echo .......................................................
echo start server
call fis3 server start --port %SERVER_PORT% --type %SERVER_TYPE%
if errorlevel 1 ( pause )
echo ..................................................done.
echo.

:: start livereload
echo .......................................................
echo watching files
call fis3 release dev --root ".\%SOURCE_FOLDER%" --lint --watch --live --verbose --no-color
pause

:: error
:error
REM cls
echo .......................................................
echo                      error occurred
echo .......................................................
echo.
:: type %LOG_FILE%
%LOG_FILE%
pause
goto end

:: quit
:end
echo exit in 5 seconds
ping -n 5 127.0.0.1 > nul
