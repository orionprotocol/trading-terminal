#!/bin/bash

IMAGE_NAME=bet_soft_backend
IMAGE_PATH=.
PORT=80

sudo docker build -t $IMAGE_NAME $IMAGE_PATH
sudo docker run -d -e JPDA_ADDRESS=8000 -e JPDA_TRANSPORT=dt_socket -p $PORT:$PORT -p 9000:8000 $IMAGE_NAME