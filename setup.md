# Digitok Backend APIs

### Pre-requisites
 - Docker
 - Node.js
 - Redis

### Components
 - Lightstreamer
 - Redis
 - Node.js
 - MySQL (runs on RDS)
 - Lambda (Optional)
 - SQS (runs on AWS)

### Steps to setup APIs on local

 - Ensure lightstreamer is up and running locally (setup steps below).
 - Ensure redis is up and running locally
 - Do `npm install`
 - Do `npm run start:dev`

### Steps to build and run lightstreamer on local machine

##### First time Setup:
 - Make sure you have docker demon up and running in your machine
 - run  `cd lightstreamer`
 - Do `docker build --tag="lightstreamer:iqo" ./`

##### Start Lightstreamer Docker image:
 - `docker run --name ls-server --restart=unless-stopped -d -p 4000:4000 -p 4001:4001 -p 4002:4002 -p 4003:4003 -p 8080:8080 lightstreamer:iqo`

##### Stop Lightstreamer Docker image:
 - `docker stop ls-server`

