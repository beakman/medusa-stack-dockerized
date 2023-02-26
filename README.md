# Dockerized - Medusa Server Stack with PostgreSQL, Minio, MeiliSearch, and Stripe Payment Gateway

A dockerized version of Medusa Server Stack with Traefik, PostgreSQL, Minio, MeiliSearch, and Stripe Payment Gateway.

This repository contains the necessary files to deploy a complete dockerized Medusa server stack with PostgreSQL, Minio, MeiliSearch, and Stripe Payment Gateway. This stack have been tested in a [6$/Mo Digital Ocean's droplet] (https://m.do.co/c/78ed3831d01e) with 1GB RAM and 25GB storage space.

The stack is deployed using Docker Compose, which makes it easy to deploy and manage. The stack also includes Traefik as a reverse proxy to handle HTTPS and load balancing.

## Required

- [docker](http://docs.docker.com/compose/install/#install-docker) and
- [docker-compose)](http://docs.docker.com/compose/install/#install-compose)

## Stack Components
The Medusa server stack consists of the following components:

* PostgreSQL: A powerful and open-source relational database system.
* Minio: An open-source object storage server compatible with Amazon S3 APIs.
* MeiliSearch: A fast and easy-to-use search engine.
* Stripe Payment Gateway: A payment gateway that allows you to accept payments securely and easily.

## Deployment
To deploy the Medusa server stack on your VPS, follow these steps:

Clone the repository to your VPS.

```bash
git clone https://github.com/your-github-username/medusa-stack-dockerized.git
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

Update the environment variables accordingly.


Start the stack.

```bash
docker-compose -f traefik/docker-compose.traefik.yml \
               -f medusa/docker-compose.medusa.yml \
               -f medusa/docker-compose.minio.yml \
               -f medusa/docker-compose.search.yml \               
               up -d
```

This command will start all the services in the stack in the background.

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%203.svg)](https://www.digitalocean.com/?refcode=78ed3831d01e&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)


