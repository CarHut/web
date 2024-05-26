FROM node:16.3.0-alpine as build

WORKDIR /app
COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/
COPY ./package-lock.json /app/package-lock.json

RUN npm install

CMD ["npm", "run", "start", "HOST=192.168.1.13:3000"]