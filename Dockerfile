FROM node:13-alpine

WORKDIR /app
COPY . .

EXPOSE 80

RUN apk add --no-cache bash
RUN chmod 755 scripts/*

RUN yarn global add node-pre-gyp serve --disable-progress
RUN yarn --disable-progress
RUN yarn build --disable-progress

ENTRYPOINT ./scripts/run.sh