export let medusaConfig = {
  // Medusa Configuration
  projectName: "my-store",
  medusaAdminOnboardingType: "default",
  createPgContainer: true,
  createRedisContainer: true,
  storeCors: "http://localhost:8000,https://docs.medusajs.com",
  adminCors:
    "http://localhost:5173,http://localhost:9000,https://docs.medusajs.com",
  authCors:
    "http://localhost:5173,http://localhost:9000,https://docs.medusajs.com",
  baseRepository: "https://github.com/medusajs/medusa-starter-default.git",
  startCommand:
    "npx medusa db:migrate && npx medusa user -e admin@example.com -p supersecret && yarn start",
  jwtSecret: "supersecret",
  cookieSecret: "supersecret",
  createPgContainer: true,
  createRedisContainer: true,
  redisUrl: "redis://redis:6379",
  cacheModule: "@medusajs/medusa/cache-inmemory",
  eventBusModule: "@medusajs/medusa/event-bus-local",
  fileStorageModule: "@medusajs/medusa/file-storage-local",
  paymentModules: "@medusajs/medusa/payment-stripe",
  stripeApiKey: "sk_test_51Iel5o0i6i5x5p6x7y8z9",
  dbUrl: "postgres://postgres:postgres@postgres:5432/postgres",
  s3FileUrl: "https://s3.amazonaws.com",
  s3AccessKeyId: "AKIAIOSFODNN7EXAMPLE",
  s3SecretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  s3Region: "us-east-1",
  s3Bucket: "my-bucket",
  s3Endpoint: "https://s3.us-east-2.amazonaws.com",
};

export const medusaModules = {
  "@medusajs/medusa/cache-inmemory": {
    resolve: "@medusajs/medusa/cache-inmemory",
    options: {
      // optional options
    },
  },
  "@medusajs/medusa/cache-redis": {
    resolve: "@medusajs/medusa/cache-redis",
    options: {
      redisUrl: process.env.CACHE_REDIS_URL,
    },
  },
  "@medusajs/medusa/event-bus-local": {
    resolve: "@medusajs/medusa/event-bus-local",
  },
  "@medusajs/medusa/event-bus-redis": {
    resolve: "@medusajs/medusa/event-bus-redis",
    options: {
      redisUrl: process.env.EVENTS_REDIS_URL,
    },
  },
  // File Storage Providers
  "@medusajs/medusa/file-storage-local": {
    resolve: "@medusajs/medusa/file",
    options: {
      providers: [
        {
          resolve: "@medusajs/medusa/file-local",
          id: "local",
          options: {
            // provider options...
          },
        },
      ],
    },
  },
  "@medusajs/medusa/file-storage-s3": {
    resolve: "@medusajs/medusa/file",
    options: {
      providers: [
        {
          resolve: "@medusajs/medusa/file-s3",
          id: "s3",
          options: {
            file_url: process.env.S3_FILE_URL,
            access_key_id: process.env.S3_ACCESS_KEY_ID,
            secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
            region: process.env.S3_REGION,
            bucket: process.env.S3_BUCKET,
            endpoint: process.env.S3_ENDPOINT,
            // other options...
          },
        },
      ],
    },
  },
  // Payment Providers
  "@medusajs/medusa/payment-stripe": {
    resolve: "@medusajs/medusa/payment",
    options: {
      providers: [
        {
          resolve: "@medusajs/medusa/payment-stripe",
          id: "stripe",
          options: {
            apiKey: process.env.STRIPE_API_KEY,
          },
        },
      ],
    },
  },
};
