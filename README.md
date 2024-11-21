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





{
  adminCors: 'http://localhost:5173,http://localhost:9000,https://docs.medusajs.com',
  authCors: 'http://localhost:5173,http://localhost:9000,https://docs.medusajs.com',
  baseRepository: 'https://github.com/medusajs/medusa-starter-default.git',
  cacheModule: '@medusajs/medusa/cache-inmemory',
  configuredModules: [
    '{\n' +
      '    resolve: "@medusajs/medusa/cache-redis",\n' +
      '    options: {\n' +
      '      redisUrl: process.env.REDIS_URL,\n' +
      '    },\n' +
      '  }',
    '{\n' +
      '    resolve: "@medusajs/medusa/event-bus-redis",\n' +
      '    options: {\n' +
      '      redisUrl: process.env.REDIS_URL,\n' +
      '    },\n' +
      '  }',
    '{\n' +
      '    resolve: "@medusajs/medusa/file",\n' +
      '    options: {\n' +
      '      providers: [\n' +
      '        {\n' +
      '          resolve: "@medusajs/medusa/file-s3",\n' +
      '          id: "s3",\n' +
      '          options: {\n' +
      '            file_url: process.env.S3_FILE_URL,\n' +
      '            access_key_id: process.env.S3_ACCESS_KEY_ID,\n' +
      '            secret_access_key: process.env.S3_SECRET_ACCESS_KEY,\n' +
      '            region: process.env.S3_REGION,\n' +
      '            bucket: process.env.S3_BUCKET,\n' +
      '            endpoint: process.env.S3_ENDPOINT,\n' +
      '            // other options...\n' +
      '          },\n' +
      '        },\n' +
      '      ],\n' +
      '    },\n' +
      '  }',
    '{\n' +
      '    resolve: "@medusajs/medusa/payment",\n' +
      '    options: {\n' +
      '      providers: [\n' +
      '        {\n' +
      '          resolve: "@medusajs/medusa/payment-stripe",\n' +
      '          id: "stripe",\n' +
      '          options: {\n' +
      '            apiKey: process.env.STRIPE_API_KEY,\n' +
      '          },\n' +
      '        },\n' +
      '      ],\n' +
      '    },\n' +
      '  }'
  ],
  cookieSecret: 'BrUi6IUr7vrPTAJLWGRuSwfHBQpj2MOtl78X/ca1Fx8=',
  createPgContainer: true,
  createRedisContainer: true,
  createStorefront: true,
  dbUrl: 'postgres://postgres:be0937edd7074b4a943bd4bd9fd654c5@postgres:5432/medusa',
  eventBusModule: '@medusajs/medusa/event-bus-local',
  fileStorageModule: '@medusajs/medusa/file-storage-local',
  jwtSecret: '/rJoxDUDTRpjOas9pc8sj4yAMoa1Dk9PopQia44VZDs=',
  medusaAdminOnboardingType: 'default',
  meilisearchMasterKey: 'vU8HthktUnmDk9NWIHF3o2BS/WmH9NL2FfF8p6gDejw=',
  minioAccessKey: '820507809a8820b5439a4a4cc32353a83229e5906ee757c8be37b687467ddc2f',
  minioBucket: 'medusa-server',
  minioRootPassword: '0foMSEqSBGB0GysM6cyu8zEi9Pfvr28++YkYUGHE/u8=',
  minioRootUser: 'minio',
  minioSecretKey: '9e3f28709476322a747aab9cb59c7d555dc772a400e0347e7a5f71541288cd66',
  paymentModule: '@medusajs/medusa/payment-stripe',
  postStartCommand: 'npx medusa user -e admin@example.com -p supersecret',
  projectName: 'my-store',
  redisUrl: 'redis://redis:6379',
  s3AccessKeyId: 'AKIAIOSFODNN7EXAMPLE',
  s3Bucket: 'my-bucket',
  s3Endpoint: 'https://s3.us-east-2.amazonaws.com',
  s3FileUrl: 'https://s3.amazonaws.com',
  s3Region: 'us-east-1',
  s3SecretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  startCommand: 'npx medusa db:migrate && yarn start',
  storeCors: 'http://localhost:8000,https://docs.medusajs.com',
  stripeApiKey: 'sk_test_51Iel5o0i6i5x5p6x7y8z9',
  adminEmail: '',
  adminPassword: 'supersecret',
  dbUser: 'postgres',
  dbPassword: 'be0937edd7074b4a943bd4bd9fd654c5',
  dbName: 'medusa',
  dbHost: 'postgres',
  useRedis: true,
  createMinioContainer: true,
  useMinio: true,
  createMeilisearchContainer: true,
  useMeilisearch: true
}