FROM node:16.3.0-alpine as build

WORKDIR /app
COPY package.json /app
COPY ./package-lock.json /app/package-lock.json

RUN npm install
COPY . /app
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html