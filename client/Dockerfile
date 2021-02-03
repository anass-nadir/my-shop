FROM node:14-alpine as build

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app 

USER node

COPY package*.json ./

RUN npm install --production --silent

COPY --chown=node:node . .

RUN npm run build


FROM nginx:latest

RUN chmod o+r /etc/resolv.conf && apt-get update && apt-get install software-properties-common openssl -y

RUN openssl req -x509 -nodes -days 365 -subj \
 "/C=CA/ST=QC/O=Company, Inc./CN=my-shop.com" \
  -addext "subjectAltName=DNS:my-shop.com"\
 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key \
 -out /etc/ssl/certs/nginx-selfsigned.crt

COPY --from=build /usr/src/app/build /var/www/html

CMD ["nginx", "-g", "daemon off;"]