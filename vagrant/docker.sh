#!/bin/sh

apt-get install -y linux-image-extra-$(uname -r) python-pip

export DISTRO="$(lsb_release -s -c)"

apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
echo "deb https://apt.dockerproject.org/repo ubuntu-$DISTRO main" | sudo tee /etc/apt/sources.list.d/docker.list

apt-get update
apt-get install -y docker-engine
pip install docker-compose

docker login \
  --username=$DOCKER_USERNAME \
  --password=$DOCKER_PASSWORD \
  $DOCKER_REGISTRY