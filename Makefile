TAG=$(shell git rev-parse --short HEAD)
IMAGE_NAME=lukeshaydocker/route-rating-web-app

.PHONY: default clean tag build run push-latest tag-latest prebuild

default: build

clean:
	docker images | awk 'NR != 1 && $1 == "${IMAGE_NAME}" { print $3 }' | xargs docker rmi -f

push:
	docker push ${IMAGE_NAME}:${TAG}

push-latest: tag-latest
	docker tag ${IMAGE_NAME}:${TAG} ${IMAGE_NAME}:latest
	docker push ${IMAGE_NAME}:latest

tag-latest:
	docker tag ${IMAGE_NAME}:${TAG} ${IMAGE_NAME}:latest

prebuild:
	yarn -f --disable-progress
	yarn build --disable-progress

build: prebuild
	docker build -t ${IMAGE_NAME}:${TAG} . || exit 1

run:
	docker-compose -f deploy/docker-compose.yml up -d || exit 1
