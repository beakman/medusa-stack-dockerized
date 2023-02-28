#!/bin/bash
docker compose \
-f docker-compose.medusa.yml \
-f docker-compose.minio.yml \
-f docker-compose.search.yml \
-f docker-compose.traefik.yml \
up -d
