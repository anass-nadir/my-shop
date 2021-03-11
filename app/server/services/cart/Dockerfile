FROM node:15-alpine

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app

USER node

COPY package.json ./package.json

COPY .npmrc ./.npmrc

COPY npm-shrinkwrap.json ./npm-shrinkwrap.json

RUN npm install --production --silent

COPY . .

CMD [ "npm", "start" ]