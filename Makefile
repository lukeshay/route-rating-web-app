TAG=$(shell git rev-parse --short HEAD)

default: build

clean:
	docker rmi web-app:${TAG} -f

full-clean: clean
	rm -rf node_modules coverage dist

tag:
	docker tag web-app:${TAG} web-app:latest

build:
	docker build -t web-app:${TAG} . || exit 1

build-prod:
	docker build -f Dockerfile.prod -t web-app:${TAG} . || exit 1

test:
	docker run --entrypoint ./scripts/test.sh web-app:${TAG} || exit 1

coverage:
	docker run --entrypoint ./scripts/coverage.sh web-app:${TAG} || exit 1

run:
	docker-compose up -d || exit 1

lint:
	docker run --entrypoint ./scripts/lint.sh web-app:${TAG} || exit 1
