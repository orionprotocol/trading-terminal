#!/bin/bash

IMAGE_NAME=exchange_notifier
IMAGE_PATH=.
PORT=80
SSH_PORT=443
JMX_PORT=9999

sudo docker build -t $IMAGE_NAME $IMAGE_PATH
sudo docker run -d -p $PORT:$PORT -p $SSH_PORT:$SSH_PORT -p $JMX_PORT:$JMX_PORT $IMAGE_NAME