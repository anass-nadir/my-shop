FROM node:14-alpine as build

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app 

USER node

COPY package*.json ./

RUN npm install --production --silent

COPY --chown=node:node . .

RUN npm run build


FROM nginx:latest

COPY --from=build /usr/src/app/build /var/www/html
COPY nginx/ /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]