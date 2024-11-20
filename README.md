# medusa-stack-dockerized v2.0

This is a tool to help you create a Medusa stack with Docker and Docker Compose.

## Getting Started

Just run:

```bash
npx medusa-stack-dockerized
```

This will create a new directory with your project's name and the required files to run your Medusa stack.

## Run the project

Once Dockerfiles and docker-compose.yml are created, you can run the project with:

```bash
docker-compose up -d
```

Once the stack is up and running, you may want to run some of these commands to finish your setup:

Apply the database migrations:

```bash
docker compose exec -it medusa_server npx medusa db:migrate
```

Seed your project with some demo data:

```bash
docker compose exec -it medusa_server npx medusa exec ./src/scripts/seed.ts
```

Create a new user:

```bash
docker compose exec -it medusa_server npx medusa user -e admin@example.com -p supersecret
```

## Configuration

You fine tune the project's configuration by editing the `medusa-config.ts` file.

## Storefront

The storefront will run in development mode by default. To build the storefront for production, you will need:

- The Dockerfile.storefront.prod
- A publishable api key, generated from the admin.
