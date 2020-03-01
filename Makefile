TAG=$(shell git rev-parse --short HEAD)

.PHONY: default clean tag prebuild build build-prod test coverage run

default: build

clean:
	docker rmi web-app:${TAG} -f

tag:
	docker tag web-app:${TAG} web-app:latest

prebuild:
	yarn -f --disable-progress
	yarn build --disable-progress

build: prebuild
	docker build -t web-app:${TAG} . || exit 1

build-prod:
	docker build -f Dockerfile.hub -t web-app:${TAG} .

run:
	docker-compose up -d || exit 1
