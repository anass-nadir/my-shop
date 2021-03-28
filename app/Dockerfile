FROM node:15-alpine as build

WORKDIR /usr/src/app

ARG Service

RUN chown -R node:node /usr/src/app

USER node

COPY --chown=node:node tsconfig.build.json .
COPY --chown=node:node server/services/${Service}/ .
COPY --chown=node:node server/packages/common packages/common

RUN yarn --frozen-lockfile
RUN yarn clean
RUN yarn build


FROM node:15-alpine
WORKDIR /app

COPY --from=build /usr/src/app/build build
COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/packages/common/build packages/common/build
COPY --from=build /usr/src/app/packages/common/package.json packages/common/package.json

RUN  yarn --production --frozen-lockfile

CMD [ "yarn", "start" ]