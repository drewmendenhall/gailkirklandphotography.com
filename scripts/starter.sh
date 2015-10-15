#!/bin/sh

SITE_ROOT=/var/www/gailkirklandphotography.com

GIT_WORK_TREE=$SITE_ROOT git checkout -f

export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

export NODE_ENV=production
cd $SITE_ROOT
npm i
npm start >> /var/log/node/gailkirklandphotography.com 2>&1
