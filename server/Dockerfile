FROM node:14-alpine

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app

USER node

COPY package*.json ./

RUN npm install --production --silent

COPY . .

EXPOSE 3002
CMD [ "npm", "start" ]