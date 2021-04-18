FROM node:15-alpine

WORKDIR /usr/src/app

ARG Service

RUN chown -R node:node /usr/src/app

USER node

COPY --chown=node:node server/services/${Service}/build build
COPY --chown=node:node server/services/${Service}/package.json .

COPY --chown=node:node server/packages/common/build packages/common/build
COPY --chown=node:node server/packages/common/package.json packages/common/package.json


RUN  yarn --production --frozen-lockfile

CMD [ "yarn", "start" ]