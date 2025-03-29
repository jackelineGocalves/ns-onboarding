#!/usr/bin/env bash

IMAGE_NAME=$1
IMAGE_VERSION=$2
PATH_DOCKERFILE=$3

if [ "$1" = "" ]
then
  echo "Missing paramter 1: IMAGE_NAME"
fi

if [ "$2" = "" ]
then
  echo "Missing paramter 2: IMAGE_VERSION"
fi

if [ "$3" = "" ]
then
  echo "Missing paramter 2: PATH_DOCKERFILE"
fi

echo "Start..."
echo "#1. AWS Login to send a new container tag version to ECR"
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 636467442182.dkr.ecr.eu-west-1.amazonaws.com

echo "#2. To activate docker buildx"
docker buildx create --use

echo "#3 Create new multi-platform container and send to AWS"
docker buildx build --push --platform linux/amd64,linux/arm64 -t 636467442182.dkr.ecr.eu-west-1.amazonaws.com/${IMAGE_NAME}:${IMAGE_VERSION} -f ${PATH_DOCKERFILE}/Dockerfile .

echo "Image create with Success."
