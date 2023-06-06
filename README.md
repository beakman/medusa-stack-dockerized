# Dockerized - Medusa Server Stack with PostgreSQL, Minio, MeiliSearch, and Stripe Payment Gateway

A dockerized version of Medusa Server Stack with Traefik, PostgreSQL, Minio, MeiliSearch, and Stripe Payment Gateway.

## Required

- [docker](http://docs.docker.com/compose/install/#install-docker) and
- [docker-compose](http://docs.docker.com/compose/install/#install-compose)

## Stack Components

The Medusa server stack consists of the following components:

- Traefik + Dashboard: A popular reverse proxy and load balancer.
- PostgreSQL: A powerful and open-source relational database system.
- Minio: An open-source object storage server compatible with Amazon S3 APIs.
- MeiliSearch: A fast and easy-to-use search engine.
- Stripe Payment Gateway: A payment gateway that allows you to accept payments securely and easily.

## Build image

Medusa admin requires > 1GB RAM to build. So yo have different options here:

1. Build the image with the admin locally and push it to a remote registry.
2. Build the image using Gitlab CI and push it to its registry.
3. Do not build the admin at all.

### Build image using Gitlab CI

1. Import the repository to your [Gitlab](https://gitlab.com) account.
2. Go to your project's settings > CI/CD sections in the sidebar menu.
3. Expand the "Variables" section and fill them as with the required values to build the backend:
   - COOKIE_SECRET=xxxxxxxxxxx
   - JWT_SECRET=xxxxxxxxxxx
   - MEILISEARCH_API_KEY=xxxxxxxxxxx
   - MEILISEARCH_HOST=http://meilisearch:7700
   - MINIO_ACCESS_KEY=xxxxxxxxxxx
   - MINIO_BUCKET=medusa-test
   - MINIO_ENDPOINT=http://storage:9000
   - MINIO_SECRET_KEY=xxxxxxxxxxx
   - REDIS_URL=redis://redis
   - SSH_PRIVATE_KEY=-----BEGIN OPENSSH PRIVATE KEY ...
   - STRIPE_API_KEY=pk_test_xxxxxxxxx
   - STRIPE_WEBHOOK_SECRET=whsec_xxxxxxx
   - TARGET_DIRECTORY=/home/user/medusa-stack-dockerized
   - TARGET_HOST=123.123.123.123
   - TARGET_USER=user

We should generate a key pair locally with `ssh-keygen -t rsa -b 4096` to authenticate the Gitlab runner with our host. SSH_PRIVATE_KEY will be the private key, and the public key will go to the `~/.ssh/authorized_keys` in our host.

## Deploy using Gitlab CI

Gitlab CI will run automatically when pushing to `main` branch. This will build the image, push it to the registry and deploy in the host.

## Build and deploy

To deploy the Medusa server stack on your VPS, follow these steps:

Clone the repository to your VPS.

```bash
git clone git@github.com:beakman/medusa-stack-dockerized.git
```

Navigate to the medusa-stack-dockerized directory.

```bash
cd medusa-stack-dockerized
```

Initialize the git submodule for the medusa-starter.

```bash
git submodule update --init --recursive
```

Create a .env file from the .env.example file and set your environment variables.

```bash
cp .env.example .env
vim .env
```

Refer to https://dash.cloudflare.com/profile/api-tokens to get your CloudFlare tokens.

Start the stack.

```bash
docker compose up -d
```

This command will start all the services in the stack in the background. By default it will try to get the image uploaded to the container registry configured in the `CONTAINER_RELEASE_IMAGE` variable.

Check run logs.

```bash
docker compose logs -f
```

Or service specific:

```bash
docker compose logs -f meilisearch
```

Populate install with sample data:

```bash
docker compose exec -it backend medusa seed -f data/seed.json
```

Cleaning previous installations:

```bash
docker compose down
docker system prune -a -f --volumes
docker volume rm $(docker volume ls -q)
```

# Configuring Minio storage

1. Access https://minio-console.example.com/
2. Create a new bucket and call it as you did in `MINIO_BUCKET` variable.
3. Set its privacy settings to public.
4. Create a new "Access key" pair and copy them to `MINIO_ACCESS_KEY` and `MINIO_SECRET_KEY` variables.

# Update version

```bash
git submodule update --remote
```

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%203.svg)](https://www.digitalocean.com/?refcode=78ed3831d01e&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)
