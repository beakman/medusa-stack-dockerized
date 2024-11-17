export const modules = {
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
