FROM node:17.1.0

WORKDIR /app/medusa

COPY medusa-starter-default/package.json .
COPY develop.sh .
COPY medusa-config.js .
COPY yarn.* .

RUN apt-get update

RUN apt-get install -y python

RUN npm install -g npm@8.1.2

RUN npm install -g @medusajs/medusa-cli@latest

RUN npm install

RUN npm install medusa-payment-stripe

RUN npm install medusa-file-minio

RUN npm install medusa-plugin-sendgrid

RUN npm install medusa-plugin-meilisearch

COPY . .

ENTRYPOINT ["./develop.sh"]
