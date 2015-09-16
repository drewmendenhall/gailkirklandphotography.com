#!/bin/sh

if [ $(ps -e -o uid,cmd | grep $UID | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
  GIT_WORK_TREE=/etc/nginx/sites-available/gailkirklandphotography.com git checkout -f
  export NODE_ENV=production
  export NVM_DIR="/root/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
  cd /etc/nginx/sites-available/gailkirklandphotography.com
  npm i
  npm start >> /var/log/node/gailkirklandphotography.com/log 2>&1
fi
