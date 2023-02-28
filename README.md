# Dockerized - Medusa Server Stack with PostgreSQL, Minio, MeiliSearch, and Stripe Payment Gateway

A dockerized version of Medusa Server Stack with Traefik, PostgreSQL, Minio, MeiliSearch, and Stripe Payment Gateway.

This repository contains the necessary files to deploy a complete dockerized Medusa server stack with PostgreSQL, Minio, MeiliSearch, and Stripe Payment Gateway. This stack have been tested in a [6$/Mo Digital Ocean's droplet] (https://m.do.co/c/78ed3831d01e) with 1GB RAM and 25GB storage space.

The stack is deployed using Docker Compose, which makes it easy to deploy and manage. The stack also includes Traefik as a reverse proxy to handle HTTPS and load balancing.

## Required

- [docker](http://docs.docker.com/compose/install/#install-docker) and
- [docker-compose)](http://docs.docker.com/compose/install/#install-compose)

## Stack Components
The Medusa server stack consists of the following components:

* Traefik + Dashboard: A popular reverse proxy and load balancer.
* PostgreSQL: A powerful and open-source relational database system.
* Minio: An open-source object storage server compatible with Amazon S3 APIs.
* MeiliSearch: A fast and easy-to-use search engine.
* Stripe Payment Gateway: A payment gateway that allows you to accept payments securely and easily.

## Setup
To deploy the Medusa server stack on your VPS, follow these steps:

Clone the repository to your VPS.

```bash
git clone git@github.com:beakman/medusa-stack-dockerized.git
```

Navigate to the medusa-stack-dockerized directory.
```bash
cd medusa-stack-dockerized
```

Create a .env file from the .env.example file and set your environment variables.
```bash
cp .env.example .env
vim .env
```

### Environment variables

MEDUSA_DOMAIN=example.com
MINIO_DOMAIN=minio.example.com
MINIO_CONSOLE_DOMAIN=minio-console.example.com
MEILI_DOMAIN=search.example.com
TRAEFIK_DOMAIN=traefik.example.com
EMAIL=user@example.com
CERT_RESOLVER=letsencrypt
CLOUDFLARE_EMAIL=
CLOUDFLARE_API_KEY=
CLOUDFLARE_DNS_API_TOKEN=

Refer to https://dash.cloudflare.com/profile/api-tokens to get your CloudFlare tokens.

Start the stack.

```bash
sh start.sh
```

This command will start all the services in the stack in the background.

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%203.svg)](https://www.digitalocean.com/?refcode=78ed3831d01e&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)


