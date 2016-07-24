@echo off

set NODE_VERSION=v6.3.0


:: init window
title fis3 安装脚本
color 37
mode con cols=80 lines=25

echo ================================================================================
echo                                 fis3 安装脚本
echo                             see http://fis.baidu.com
echo                         fisker Cheung lionkay@gmail.com
echo ================================================================================

goto main


:main
echo ................................................................................
echo 检查 node.js
call node -v
if errorlevel 1 goto install-node
echo .................................................................node.js 已安装.
echo.

:: 检查 npm
echo ................................................................................
echo 检查 npm
call npm -v
if errorlevel 1 goto install-npm
call npm config set registry https://registry.npm.taobao.org
call npm config set NVM_NODEJS_ORG_MIRROR http://npm.taobao.org/mirrors/node
call npm config set NVM_IOJS_ORG_MIRROR http://npm.taobao.org/mirrors/iojs
call npm config set NVMW_NODEJS_ORG_MIRROR http://npm.taobao.org/mirrors/node
call npm config set NVMW_IOJS_ORG_MIRROR http://npm.taobao.org/mirrors/iojs
call npm config set NVMW_NPM_MIRROR http://npm.taobao.org/mirrors/npm
call npm config set PHANTOMJS_CDNURL http://npm.taobao.org/mirrors/phantomjs
call npm config set CHROMEDRIVER_CDNURL http://npm.taobao.org/mirrors/chromedriver
call npm config set OPERADRIVER_CDNURL http://npm.taobao.org/mirrors/operadriver
call npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
call npm config set SASS_BINARY_SITE http://npm.taobao.org/mirrors/node-sass
call npm config set SQLITE3_BINARY_SITE http://npm.taobao.org/mirrors/sqlite3
echo .......................................npm 可以正常使用.
echo.

echo 检查 fis3
echo ................................................................................
call fis3 -v
if errorlevel 1 goto install-fis3
echo ....................................................................fis3 已安装.
echo.


echo fis3 已安装
echo ................................................................................
echo 安装常用插件
call npm i -g tar.gz
call npm i -g winzip
call npm i -g node-wget
call npm i -g node-gyp
REM call npm i -g node-sass
call npm i -g fis3-server-php
REM call npm i -g fis3-server-node
REM call npm i -g fis-optimizer-uglify-js
call npm i -g fis-optimizer-clean-css-2x
REM call npm i -g fis-optimizer-jpeg-compressor
call npm i -g fis3-optimizer-imagemin
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
call npm i -g fis3-lint-htmlhint
call npm i -g fis3-lint-eslint-noisy
call npm i -g fis3-lint-stylelint
call npm i -g fis-lint-csslint
call npm i -g fis-lint-jshint
call npm i -g fis-lint-jscs
call npm i -g fis-lint-eslint
call npm i -g fis-preprocessor-cssgrace
REM call npm i -g fis-postpackager-replace
REM call npm i -g fis-packager-autopack
REM call npm i -g fis-spriter-csssprites
REM call npm i -g fis-postpackager-loader
REM call npm i -g fi3-deploy-replace
REM call npm i -g fi3-deploy-tar
REM call npm i -g fi3-deploy-zip
call npm i -g fis-parser-jade
call npm i -g fis-parser-jade-to-html
call npm i -g fis3-deploy-local-deliver
echo ...........................................................................done.
goto end


:install-fis3
echo ................................................................................
echo installing fis3
call npm install -g fis3
echo ...........................................................................done.
goto main

:: 安装 npm 一般不需要
:install-npm
start https://www.npmjs.com/
goto end

:: 安装 node
:install-node
echo ................................................................................
echo installing node.js
set BIN_NODE_INSTALLER=https://npm.taobao.org/mirrors/node/%NODE_VERSION%/x64/node-%NODE_VERSION%-x64.msi
if "%PROCESSOR_ARCHITECTURE%"=="x86" (
    set BIN_NODE_INSTALLER=https://npm.taobao.org/mirrors/node/%NODE_VERSION%/node-%NODE_VERSION%-x86.msi
)
start %BIN_NODE_INSTALLER%
echo ...........................................................................done.
goto main

:end
echo 安装完成
pause
