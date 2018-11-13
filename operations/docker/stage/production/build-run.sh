#!/bin/bash

IMAGE_NAME=bet_soft_backend
IMAGE_PATH=.
PORT=80

sudo docker build -t $IMAGE_NAME $IMAGE_PATH
sudo docker run -d -p $PORT:$PORT $IMAGE_NAME