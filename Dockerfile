FROM node:16-alpine as client

WORKDIR /app/client

COPY client/package.json /app/client

RUN node --max-old-space-size=4096./node_modules/@angular/cli/bin/ng

RUN npm install

COPY client /app/client

RUN npm run build


FROM node:16-alpine as server

WORKDIR /app

COPY server/package.json /app

RUN npm install

COPY server /app

COPY --from=client /app/client/build /app/client

EXPOSE 8080

CMD [ "npm", "run", "serve" ]