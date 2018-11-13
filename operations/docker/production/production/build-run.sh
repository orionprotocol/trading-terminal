#!/bin/bash

IMAGE_NAME=amocrm_flower
IMAGE_PATH=.
PORT=80
SSH_PORT=443

sudo docker build -t $IMAGE_NAME $IMAGE_PATH
sudo docker run -d -p $PORT:$PORT -p $SSH_PORT:$SSH_PORT $IMAGE_NAME