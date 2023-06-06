FROM node:18.16.0-alpine

WORKDIR /app/medusa

COPY medusa-starter-default/package.json .
COPY medusa-starter-default/yarn.lock .
COPY develop.sh .
COPY deploy.sh .

RUN apk update

RUN yarn --network-timeout 1000000

RUN yarn global add @medusajs/medusa-cli@latest

# Add the remaining files
COPY medusa-starter-default/ ./

# Install plugins
RUN yarn add @medusajs/admin --network-timeout 1000000

RUN yarn add medusa-payment-stripe --network-timeout 1000000

RUN yarn add medusa-file-minio --network-timeout 1000000

RUN yarn add medusa-plugin-sendgrid --network-timeout 1000000

RUN yarn add medusa-plugin-meilisearch --network-timeout 1000000

# Add the custom config, including additional plugins
COPY medusa-config.js .

# Build admin
RUN yarn build:admin

ENTRYPOINT ["sh", "./deploy.sh"]
