#!/bin/bash

yarn -f --disable-progress
yarn build --disable-progress
make build-prod
docker-compose up -d