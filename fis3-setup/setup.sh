#!/bin/sh
export PS1="\[\e[37;44m\]"

NODE_VERSION=v0.12.15

echo "================================================================================"
echo "                                fis3 安装脚本"
echo "                            see http://fis.baidu.com"
echo "                        fisker Cheung lionkay@gmail.com"
echo "================================================================================"

# main
function main() {
  checknode
  checknpm
  checkfis3
  installplugins
  end
}


# check node
function checknode() {
  echo -e "\n"
  echo "................................................................................"
  command -v node >/dev/null 2>&1 || installnode;
  echo ".................................................................node.js 已安装."
}

# install node
function installnode() {
  echo -e "\n"
  echo "................................................................................"
  echo "installing node.js"
  set BIN_NODE_INSTALLER=https://npm.taobao.org/mirrors/node/%NODE_VERSION%/
  start "%BIN_NODE_INSTALLER%"
  echo "...........................................................................done."
  end
}

# check npm
function checknpm() {
  echo -e "\n"
  echo "................................................................................"
  command -v npm >/dev/null 2>&1 || installnpm;
  npm config set registry https://registry.npm.taobao.org
  npm config set NVM_NODEJS_ORG_MIRROR http://npm.taobao.org/mirrors/node
  npm config set NVM_IOJS_ORG_MIRROR http://npm.taobao.org/mirrors/iojs
  npm config set NVMW_NODEJS_ORG_MIRROR http://npm.taobao.org/mirrors/node
  npm config set NVMW_IOJS_ORG_MIRROR http://npm.taobao.org/mirrors/iojs
  npm config set NVMW_NPM_MIRROR http://npm.taobao.org/mirrors/npm
  npm config set PHANTOMJS_CDNURL http://npm.taobao.org/mirrors/phantomjs
  npm config set CHROMEDRIVER_CDNURL http://npm.taobao.org/mirrors/chromedriver
  npm config set OPERADRIVER_CDNURL http://npm.taobao.org/mirrors/operadriver
  npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
  npm config set SASS_BINARY_SITE http://npm.taobao.org/mirrors/node-sass
  npm config set SQLITE3_BINARY_SITE http://npm.taobao.org/mirrors/sqlite3
  nvm node_mirror http://npm.taobao.org/mirrors/node/
  nvm npm_mirror http://npm.taobao.org/mirrors/npm/
  echo ".......................................npm 可以正常使用."
}

# install npm
function installnpm() {
  start https://www.npmjs.com/
  end
}

#check fis3
function checkfis3() {
  echo -e "\n"
  echo "................................................................................"
  command -v fis3 >/dev/null 2>&1 || installfis;
  echo "....................................................................fis3 已安装."
}

function installfis3() {
  npm i -g fis3
}

function installplugins() {
  echo "................................................................................"
  echo "安装常用插件"
  npm i -g tar.gz
  npm i -g winzip
  npm i -g node-wget
  npm i -g node-gyp
  # npm i -g node-sass
  npm i -g fis3-server-php
  # npm i -g fis3-server-node
  # npm i -g fis-optimizer-uglify-js
  npm i -g fis-optimizer-clean-css-2x
  npm i -g fis3-optimizer-imagemin
  npm i -g fis3-postprocessor-autoprefixer-latest
  npm i -g fis3-hook-relative
  npm i -g fis-parser-less-2.x
  # npm i -g fis-parser-sass
  npm i -g fis-parser-node-sass
  npm i -g fis-parser-stylus2
  npm i -g fis-parser-coffee-script
  # npm i -g fis-parser-es6-babel
  npm i -g fis-parser-babel-5.x
  npm i -g fis-parser-babel-6.x
  npm i -g fis3-parser-typescript
  npm i -g fis3-lint-htmlhint
  npm i -g fis3-lint-eslint-noisy
  npm i -g fis3-lint-stylelint
  npm i -g fis-lint-csslint
  npm i -g fis-lint-jshint
  npm i -g fis-lint-jscs
  npm i -g fis-lint-eslint
  npm i -g fis-preprocessor-cssgrace
  npm i -g fis3-postprocessor-stylefmt
  npm i -g fis3-postprocessor-html
  # npm i -g fis-postpackager-replace
  # npm i -g fis-packager-autopack
  # npm i -g fis-spriter-csssprites
  # npm i -g fis-postpackager-loader
  # npm i -g fi3-deploy-replace
  # npm i -g fi3-deploy-tar
  # npm i -g fi3-deploy-zip
  npm i -g fis-parser-jade
  npm i -g fis-parser-jade-to-html
  npm i -g fis3-deploy-local-deliver
  echo "...........................................................................done."
}

function end() {
  echo "exit in 5 seconds"
  sleep 5
  exit
}

main
