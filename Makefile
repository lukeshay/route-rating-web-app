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
	docker build -f Dockerfile.prod -t web-app:${TAG} .

#test:
	#docker run web-app:${TAG} || exit 1

#coverage:
	#docker run --entrypoint ./scripts/coverage.sh web-app:${TAG} || exit 1

run:
	docker-compose up -d || exit 1
