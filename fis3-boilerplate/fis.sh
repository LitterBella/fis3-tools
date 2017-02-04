#!/bin/sh
export PS1="\[\e[37;44m\]"

# const
export CONFIG_FILE=fis-conf.js
export SOURCE_FOLDER=source
export SERVER_TYPE=node # java,php,node,jello...
export SERVER_PORT=1983
export RELEASE_FOLDER=release
export DIST_FOLDER=dist
export DIST_FILETYPE=zip # zip,tar.gz  ; tar.gz do NOT support chinese filename
export LOG_FILE=release.log
export TEMP_RESOURCE_FOLDER=\$\$\$TEMP_RESOURCE\$\$\$
export NODE_ENV=dev

function main() {
  echo "==============================================================================="
  echo "                       fis3 debug & distribute script"
  echo "                            see http://fis.baidu.com"
  echo "                      by fisker Cheung lionkay@gmail.com"
  echo "==============================================================================="
  echo -e "\n"
  echo -e "\n"
  echo "                  1. debug (default)"
  echo -e "\n"
  echo "                  2. distribute"
  echo -e "\n"
  echo "                  3. distribute & archive"
  echo -e "\n"
  echo "                  Q. quit"
  echo -e "\n"
  echo -e "\n"

  # chose operation
  read -p "input your choice and press ENTER:" choice
  case "$choice" in
    2) release;;
    3) release;;
    q|Q) quit;;
    *) debug;;
  esac
}

function release() {
  export NODE_ENV=production
  clear

  # remove release file and log file
  if [ -d "./$RELEASE_FOLDER" ]; then
    rm -r "./$RELEASE_FOLDER"
  fi
  if [ -f "./$LOG_FILE" ]; then
    rm "./$LOG_FILE"
  fi

  # release file
  echo "..............................................................................."
  echo "releasing files"
  fis3 release $NODE_ENV --dest release --lint --unique --root "./$SOURCE_FOLDER" --file "./$CONFIG_FILE" --verbose --no-color > "./$LOG_FILE" || error

  if [ -d "./$RELEASE_FOLDER/$TEMP_RESOURCE_FOLDER" ]; then
    rm -r "./$RELEASE_FOLDER/$TEMP_RESOURCE_FOLDER"
  fi

  echo "..........................................................................done."
  echo -e "\n"

  if [ "$choice" = "3" ]; then
    archive
  fi

  end
}

# archive
function archive() {
      echo "archive"
  # make distribute folder ready
  if [ ! -d "./$DIST_FOLDER" ]; then
    mkdir "./$DIST_FOLDER"
  fi

  # set distribute file name
  DATE=`date "+%y%m%d-%H%M%S"`
  FOLDER=`basename ~+`
  DIST_FILENAME="$FOLDER.$DATE"

  # archive files to distribute folder
  echo "..............................................................................."
  echo "packing files"
  if [ "$DIST_FILETYPE" = "tar.gz" ]; then
    targz -l 9 -m 9 -c "./$RELEASE_FOLDER" "./$DIST_FOLDER/$DIST_FILENAME.tar.gz" || pause
  else
    winzip zip "./$RELEASE_FOLDER" "./$DIST_FOLDER/$DIST_FILENAME" || pause
  fi

  echo "..........................................................................done."
  echo.

  end
}


#debug
function debug() {
  export NODE_ENV=dev
  clear

  # check java server
  SERVER_TYPE=$(echo $SERVER_TYPE | tr '[A-Z]' '[a-z]')
  if [ "$SERVER_TYPE" = "java" ]; then
    command -v java >/dev/null 2>&1 || {
      SERVER_TYPE=node
    }
  fi

  # check php server
  if [ "$SERVER_TYPE" = "php" ]; then
    command -v php >/dev/null 2>&1 || {
      SERVER_TYPE=node
    }
  fi

  # stop server
  echo "..............................................................................."
  echo "stop server"
  fis3 server stop || pause
  # if errorlevel 1 ( pause )
  echo "..........................................................................done."
  echo -e "\n"

  # clean up
  echo "..............................................................................."
  echo "clean up server folder"
  fis3 server clean || pause
  # if errorlevel 1 ( pause )
  echo "..........................................................................done."
  echo -e "\n"

  # release
  echo "..............................................................................."
  echo "release files"
  fis3 release $NODE_ENV --root "./$SOURCE_FOLDER" --verbose --no-color > "./$LOG_FILE" || error
  rm "./$LOG_FILE"
  echo "..........................................................................done."
  echo -e "\n"

  # start server
  echo "..............................................................................."
  echo "start server"
  fis3 server start --type $SERVER_TYPE || pause
  echo "..........................................................................done."
  echo -e "\n"

  # start livereload
  echo "..............................................................................."
  echo "watching files"
  fis3 release $NODE_ENV --root "./$SOURCE_FOLDER" --watch --live --verbose
  pause
}

function pause() {
  echo "press any key to continue."
  read -n 1
}

function error() {
  echo "..............................................................................."
  echo "                                error occurred"
  echo "..............................................................................."
  echo -e "\n"
  cat "./$LOG_FILE"
  # open "./$LOG_FILE"
  pause
  end
}

function end() {
  echo "exit in 5 seconds"
  sleep 5
  exit
}

# reset config file if another config files exists in sourcefolder
if [ -f "./$SOURCE_FOLDER/fis-conf.js" ]; then
  CONFIG_FILE=$SOURCE_FOLDER/fis-conf.js
fi

main

