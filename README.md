# medusa-stack-dockerized v2.0

This is a tool to help you create a Medusa stack with Docker and Docker Compose.

## Getting Started

Just run:

```bash
npx create-dockerized-medusa-app
```

This will create a new directory with your project's name and the required files to run your Medusa stack.

## Run the project

Once Dockerfiles and docker-compose.yml are created, you can run the project with:

```bash
docker compose up postgres redis medusa_server medusa_worker -d && docker compose up storefront -d
```

Please note this configuration requires the medusa_server and medusa_worker services to be running before the storefront to work.

It will apply the migrations and create a new user with the specified credentials when running.

To prevent trying to apply the migrations and creating a new user each time you start the container, 
you can edit the `entrypoint.sh` file and remove corresponding lines.

## Useful commands

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

## Medusa configuration

You can edit the `medusa-config.ts` file to change the configuration of your Medusa stack.

## Storefront

The script will handle the creation of some required variables, like the Publishable API Key, and 
the default region. Please be aware this can change in the future.
