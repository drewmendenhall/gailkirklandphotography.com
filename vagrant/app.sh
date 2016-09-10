#!/bin/sh

cd $APP_DIR

docker pull
docker-compose up -d

apt-get install -y nginx-extras

cd /etc/nginx
rm sites-*/default

cd sites-available
mv gailkirklandphotography.com.conf $HOSTNAME.conf
sed -i "s|gailkirklandphotography.localhost|$HOSTNAME|" $HOSTNAME.conf

cd ../sites-enabled
ln -s -fn ../sites-available/$HOSTNAME.conf

service nginx reload
