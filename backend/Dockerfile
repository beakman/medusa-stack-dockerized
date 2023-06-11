FROM node:18.16.0-alpine

WORKDIR /app/medusa

COPY medusa-starter-default/package.json .
COPY medusa-starter-default/yarn.lock .
COPY develop.sh .
COPY deploy.sh .

RUN apk update

RUN yarn --network-timeout 1000000

RUN yarn global add @medusajs/medusa-cli@latest

RUN yarn add dotenv

RUN yarn add @medusajs/admin

RUN yarn add medusa-file-minio

RUN yarn add medusa-plugin-sendgrid

RUN yarn add medusa-plugin-meilisearch

# Add the remaining files
COPY medusa-starter-default/ ./

# Add the custom config, including additional plugins
COPY medusa-config.js .

# Build admin
RUN yarn build:admin

ENTRYPOINT ["sh", "./deploy.sh"]
