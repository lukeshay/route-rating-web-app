TAG=$(shell git rev-parse --short HEAD)

default: build

clean:
	rm -rf coverage
	docker rmi web-app:${TAG} -f

full-clean: clean
	rm -rf node_modules

tag:
	docker tag web-app:${TAG} web-app:latest

build:
	docker build -t web-app:${TAG} .

test:
	docker run --entrypoint ./scripts/test.sh web-app:${TAG}

coverage:
	docker run --entrypoint ./scripts/coverage.sh web-app:${TAG}

run:
	docker run -p 3000:80 -d web-app:latest

lint:
	docker run --entrypoint ./scripts/lint.sh web-app:${TAG}
