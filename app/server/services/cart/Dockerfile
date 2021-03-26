FROM node:15-alpine as build

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app

USER node

COPY --chown=node:node . .

RUN --mount=type=secret,id=githubnpm,target=/root/.npmrc yarn install --production --silent

CMD [ "yarn", "start" ]