FROM node:12-alpine

WORKDIR /app
COPY . .

RUN apk add --no-cache bash
RUN yarn
RUN yarn build
RUN yarn global add serve
RUN chmod 755 scripts/*

EXPOSE 80

ENTRYPOINT ./scripts/run.sh