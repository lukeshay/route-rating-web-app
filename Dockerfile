FROM node:12-alpine

WORKDIR /app
COPY . .

RUN apk add --no-cache bash
RUN yarn --disable-progress
RUN yarn build --disable-progress
RUN yarn global add serve --disable-progress
RUN chmod 755 scripts/*

EXPOSE 80

ENTRYPOINT ./scripts/run.sh