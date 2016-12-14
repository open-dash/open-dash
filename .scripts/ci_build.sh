#!/bin/bash

# load up cached image if there is one
if [[ -e ~/docker/image.tar ]]; then
  docker load -i ~/docker/image.tar
fi

# build new image
docker build -t jshimko/homedash:latest .

# if successful, save in cache
mkdir -p ~/docker
docker save jshimko/homedash:latest > ~/docker/image.tar

# run the container and wait for it to boot
docker-compose up -d
sleep 15
