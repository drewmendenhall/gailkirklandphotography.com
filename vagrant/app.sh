#!/bin/sh

adduser --disabled-password -gecos '' www

cd $APP_DIR
chown -R www:www .

su www -c 'npm install --production'

npm install --global forever

systemctl enable gailkirklandphotography-www
systemctl start gailkirklandphotography-www

apt-get install -y nginx

cd /etc/nginx

rm sites-*/default
sed -i "s|gailkirklandphotography.localhost|$HOSTNAME|" \
  sites-available/gailkirklandphotography.com.conf

ln -s -fn \
  ../sites-available/gailkirklandphotography.com.conf \
  sites-enabled/gailkirklandphotography.com.conf

service nginx restart
