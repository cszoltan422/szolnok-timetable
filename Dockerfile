FROM mhart/alpine-node

MAINTAINER Zoltan Csenyi <cszoltan422@gmail.com>

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install -g typescript@3.2.2
RUN npm install
COPY . .
RUN npm run build:compile

EXPOSE 8080
CMD [ "npm", "run", "start" ]