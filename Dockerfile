FROM node:12

WORKDIR /app
COPY . .

RUN yarn build
RUN yarn global add serve

EXPOSE 80

ENTRYPOINT serve -p 80 -s ./dist