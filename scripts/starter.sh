#!/bin/sh

if [ $(ps -e -o uid,cmd | grep $UID | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
  export PATH=/usr/local/bin:$PATH
  # forever start --sourceDir /etc/nginx/sites-availaable/gailkirklandphotography.com server.js >> /path/to/log.txt 2>&1
  cd /etc/nginx/sites-available/gailkirklandphotography.com
  npm start
fi
