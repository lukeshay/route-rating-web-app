TAG=$(shell git rev-parse --short HEAD)

clean:
	rm -rf coverage

full-clean: clean
	rm -rf node_modules

build:
	docker build -t web-app .

test:
	docker run --entrypoint ./scripts/test.sh web-app:latest

run:
	docker run -p 3000:80 -d web-app:latest

default: clean