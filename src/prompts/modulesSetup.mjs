import inquirer from "inquirer";
import chalk from "chalk";
import { select } from "@inquirer/prompts";
import { medusaConfig, medusaModules } from "../constants.mjs";

async function selectCacheModules() {
  const choices = [
    {
      name: "In-memory",
      value: "@medusajs/medusa/cache-inmemory",
      description: "In-memory cache",
    },
  ];
  if (medusaConfig.useRedis) {
    choices.push({
      name: "Redis",
      value: "@medusajs/medusa/cache-redis",
      description: "Redis cache",
    });
  }
  const answer = await select({
    message: "Select a cache module:",
    choices,
  });
  medusaConfig.cacheModule = medusaModules[answer.value];
}

async function selectEventBusModules() {
  const choices = [
    {
      name: "Local",
      value: "@medusajs/medusa/event-bus-local",
      description: "Local event bus",
    },
  ];
  if (medusaConfig.useRedis) {
    choices.push({
      name: "Redis",
      value: "@medusajs/medusa/event-bus-redis",
      description: "Redis event bus",
    });
  }
  const answer = await select({
    message: "Select an event bus module:",
    choices,
  });

  medusaConfig.eventBusModule = medusaModules[answer.value];
}

async function selectFileStorageModule() {
  const answer = await select({
    message: "Use a file storage module?",
    choices: [
      { name: "No", value: "", description: "No file storage" },
      {
        name: "Local",
        value: "@medusajs/medusa/file-storage-local",
        description: "Local file storage",
      },
      {
        name: "S3",
        value: "@medusajs/medusa/file-storage-s3",
        description: "S3 file storage",
      },
    ],
  }).then((answer) => {
    if (answer.value == "@medusajs/medusa/file-storage-s3") {
      return askS3FileStorageConfigs();
    }
    if (answer.value) {
      medusaConfig.fileStorageModule = medusaModules[answer.value];
    }
  });
}

async function askS3FileStorageConfigs() {
  const questions = [
    {
      type: "input",
      name: "s3FileUrl",
      message: "S3 file URL:",
      default: "https://s3.amazonaws.com",
    },
    {
      type: "input",
      name: "s3AccessKeyId",
      message: "S3 access key ID:",
      default: "AKIAIOSFODNN7EXAMPLE",
    },
    {
      type: "input",
      name: "s3SecretAccessKey",
      message: "S3 secret access key:",
      default: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    },
    {
      type: "input",
      name: "s3Region",
      message: "S3 region:",
      default: "us-east-1",
    },
    {
      type: "input",
      name: "s3Bucket",
      message: "S3 bucket:",
      default: "my-bucket",
    },
    {
      type: "input",
      name: "s3Endpoint",
      message: "S3 endpoint:",
      default: "https://s3.us-east-2.amazonaws.com",
    },
  ];

  const answers = await inquirer.prompt(questions);

  medusaConfig.s3FileUrl = answers.s3FileUrl;
  medusaConfig.s3AccessKeyId = answers.s3AccessKeyId;
  medusaConfig.s3SecretAccessKey = answers.s3SecretAccessKey;
  medusaConfig.s3Region = answers.s3Region;
  medusaConfig.s3Bucket = answers.s3Bucket;
  medusaConfig.s3Endpoint = answers.s3Endpoint;
}

async function selectPaymentModules() {
  const answer = await select({
    message: "Select a payment module:",
    choices: [
      {
        name: "Stripe",
        value: "@medusajs/medusa/payment-stripe",
        description: "Stripe payment",
      },
    ],
  });

  if (answer.value == "@medusajs/medusa/payment-stripe") {
    await askStripePaymentConfigs();
  }

  medusaConfig["paymentModules"] = medusaModules[answer.value];
}

async function askStripePaymentConfigs() {
  const questions = [
    {
      type: "input",
      name: "stripeApiKey",
      message: "Stripe API key:",
      default: "sk_test_51Iel5o0i6i5x5p6x7y8z9",
    },
  ];

  const answers = await inquirer.prompt(questions);

  medusaConfig["stripeApiKey"] = answers.stripeApiKey;
}

export async function askModulesSetup() {
  if (medusaConfig.useRedis) {
    await selectCacheModules();
    await selectEventBusModules();
  }
  await selectFileStorageModule();
  await selectPaymentModules();
}
