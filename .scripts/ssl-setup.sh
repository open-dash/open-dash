#!/bin/bash

# Nginx proxy
docker run -d -p 80:80 -p 443:443 \
  --name nginx-proxy \
  -v /opt/certs:/etc/nginx/certs:ro \
  -v /etc/nginx/vhost.d \
  -v /usr/share/nginx/html \
  -v /var/run/docker.sock:/tmp/docker.sock:ro \
  jwilder/nginx-proxy:latest

# Let's Encrypt agent
docker run -d \
  -v /opt/certs:/etc/nginx/certs:rw \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  --volumes-from nginx-proxy \
  jrcs/letsencrypt-nginx-proxy-companion:latest
