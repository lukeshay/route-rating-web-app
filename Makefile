TAG=$(shell git rev-parse --short HEAD)$(shell git diff --quiet || echo ".uncommitted")
IMAGE_NAME=lukeshaydocker/$(shell basename `git rev-parse --show-toplevel`)
SHELL = /bin/bash -o pipefail

.DEFAULT_GOAL := help
.PHONY: help clean tag build run push-latest tag-latest prebuild

## Prints help messages for all targets. This is the default target.
help:
	@awk '/^##.*$$/,/^[~\/\.a-zA-Z_-]+:/' $(MAKEFILE_LIST) | awk '!(NR%2){print $$0p}{p=$$0}' | awk 'BEGIN {FS = ":.*?##"}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' | sort

## Cleans all docker images not being ran.
clean:
	docker images | awk 'NR != 1 && $1 == "${IMAGE_NAME}" { print $3 }' | xargs docker rmi -f

## Pushes your docker image to DockerHub.
push:
	docker push ${IMAGE_NAME}:${TAG}

## Pushes your docker image to DockerHub if there is one with the tag'latest'. This can be very dangerous.
push-latest:
	docker tag ${IMAGE_NAME}:${TAG} ${IMAGE_NAME}:latest
	docker push ${IMAGE_NAME}:latest

## Tags your docker image with 'latest'.
tag-latest:
	docker tag ${IMAGE_NAME}:${TAG} ${IMAGE_NAME}:latest

## Installs dependencies and builds the project.
prebuild:
	yarn -f --disable-progress
	yarn build --disable-progress

## Builds the docker image.
build:
	docker build -t ${IMAGE_NAME}:${TAG} -f deploy/Dockerfile . || exit 1

## Runs the image with the tag 'latest' using docker-compose.
run:
	docker-compose -f deploy/docker-compose.yml up -d || exit 1
