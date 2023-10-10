FROM node:16-alpine as client

WORKDIR /app/client

COPY client/package.json /app/client

RUN apk add --update --no-cache curl

RUN curl -o- -L https://yarnpkg.com/install.sh | sh

RUN yarn install

COPY client /app/client

RUN yarn run build


FROM node:16-alpine as server

WORKDIR /app

COPY server/package.json /app

RUN yarn install

COPY server /app

COPY --from=client /app/client/build /app/client

EXPOSE 8080

CMD [ "yarn", "run", "serve" ]