FROM node:15-alpine as build

WORKDIR /usr/src/app

ARG NPM_TOKEN

RUN chown -R node:node /usr/src/app

USER node

COPY --chown=node:node . .

RUN printf '@anass-nadir:registry=https://npm.pkg.github.com/\n//npm.pkg.github.com/:_authToken=%s' '${NPM_TOKEN}' >> .npmrc

RUN npm install --production --silent

FROM node:15-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app /usr/src/app

CMD [ "npm", "start" ]