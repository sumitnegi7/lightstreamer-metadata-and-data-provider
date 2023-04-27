#!/bin/bash
cd lightstreamer
docker build --tag="lightstreamer:iqo" ./
docker run --name ls-server --restart=unless-stopped -d -p 4000:4000 -p 4001:4001 -p 4002:4002 -p 4003:4003 -p 8080:8080 lightstreamer:iqo
