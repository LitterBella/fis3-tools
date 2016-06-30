@echo off

:: nodejs v4 v5 ���ڼ��������⣬��ʹ�� v0.12.x
set NODE_VERSION=v0.12.15


:: init window
title fis3 ��װ�ű�
color 37
mode con cols=56

echo ========================================================
echo                     fis3 ��װ�ű�
echo                 see http://fis.baidu.com
echo             fisker Cheung lionkay@gmail.com
echo ========================================================

goto main


:main
echo .......................................................
echo ��� node.js
call node -v
if errorlevel 1 goto install-node
echo ........................................node.js �Ѱ�װ.
echo.

:: ��� npm
echo .......................................................
echo ��� npm
call npm -v
if errorlevel 1 goto install-npm
call npm config set registry https://registry.npm.taobao.org
echo .......................................npm ��������ʹ��.
echo.

echo ��� fis3
echo .......................................................
call fis3 -v
if errorlevel 1 goto install-fis3
echo ...........................................fis3 �Ѱ�װ.
echo.


echo fis3 �Ѱ�װ
echo .......................................................
echo ��װ���ò��
call npm i -g tar.gz
call npm i -g winzip
call npm i -g node-wget
call npm i -g fis3-server-php
call npm i -g fis3-server-node
call npm i -g fis-optimizer-uglify-js
call npm i -g fis-optimizer-clean-css-2x
call npm i -g fis-optimizer-png-compressor
call npm i -g fis-optimizer-jpeg-compressor
call npm i -g fis-postprocessor-autoprefixer
call npm i -g fis3-hook-relative
call npm i -g fis-parser-less-2.x
REM call npm i -g fis-parser-sass
call npm i -g fis-parser-node-sass
call npm i -g fis-parser-stylus2
call npm i -g fis-parser-coffee-script
REM call npm i -g fis-parser-es6-babel
call npm i -g fis-parser-babel-5.x
call npm i -g fis-parser-babel-6.x
call npm i -g fis3-parser-typescript
call npm i -g fis-lint-csslint
call npm i -g fis-lint-jshint
call npm i -g fis-lint-jscs
call npm i -g fis-lint-eslint
call npm i -g fis-preprocessor-cssgrace
REM call npm i -g fis-postpackager-replace
REM call npm i -g fis-packager-autopack 
call npm i -g fis-spriter-csssprites
REM call npm i -g fis-postpackager-loader
REM call npm i -g fi3-deploy-replace
REM call npm i -g fi3-deploy-tar
REM call npm i -g fi3-deploy-zip
REM call npm i -g fis-parser-jade
call npm i -g fis-parser-jade-to-html
call npm i -g fi3-deploy-local-deliver
echo ..................................................done.
goto end


:install-fis3
echo .......................................................
echo installing fis3
call npm install -g fis3
echo ..................................................done.
goto main

:: ��װ npm һ�㲻��Ҫ
:install-npm
start https://www.npmjs.com/
goto end

:: ��װ node
:install-node
echo .......................................................
echo installing node.js
set BIN_NODE_INSTALLER=https://npm.taobao.org/mirrors/node/%NODE_VERSION%/x64/node-%NODE_VERSION%-x64.msi
if "%PROCESSOR_ARCHITECTURE%"=="x86" (
    set BIN_NODE_INSTALLER=https://npm.taobao.org/mirrors/node/%NODE_VERSION%/node-%NODE_VERSION%-x86.msi
)
start %BIN_NODE_INSTALLER%
echo ..................................................done.
goto main

:end
echo ��װ���
pause
