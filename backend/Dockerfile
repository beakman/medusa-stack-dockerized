FROM node:17.1.0-alpine

WORKDIR /app/medusa

COPY medusa-starter-default/package.json .
COPY develop.sh .
COPY medusa-config.js .
COPY yarn.* .

RUN apk update

RUN yarn --network-timeout 1000000

RUN yarn global add @medusajs/medusa-cli@latest

RUN yarn add @medusajs/admin

RUN yarn add medusa-payment-stripe

RUN yarn add medusa-file-minio

RUN yarn add medusa-plugin-sendgrid

RUN yarn add medusa-plugin-meilisearch

# Add the remaining files
COPY . .

ENTRYPOINT ["sh", "./develop.sh"]
