#!/bin/sh

cd $APP_DIR

docker pull
docker-compose up -d

apt-get install -y nginx-extras

cd /etc/nginx

rm sites-*/default
sed -i "s|gailkirklandphotography.localhost|$HOSTNAME|" \
  sites-available/gailkirklandphotography.com.conf

ln -s -fn \
  ../sites-available/gailkirklandphotography.com.conf \
  sites-enabled/gailkirklandphotography.com.conf

service nginx restart
