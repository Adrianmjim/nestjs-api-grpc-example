FROM node:18.16.0-alpine3.16 as build-env

RUN npm -g i pnpm
RUN mkdir /home/node/app

# Uses caching for package.json dependencies see https://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
ADD package.json /tmp/package.json
RUN cd /tmp && pnpm i --ignore-script
RUN cp -a /tmp/node_modules /home/node/app

WORKDIR /home/node/app

COPY . .

RUN pnpm build