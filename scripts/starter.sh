#!/bin/sh

if [ $(ps -e -o uid,cmd | grep $UID | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
  export NVM_DIR="~/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
  cd /etc/nginx/sites-available/gailkirklandphotography.com
  NODE_ENV=production npm start >> /var/log/node/gailkirklandphotography.com/log 2>&1
fi
