import inquirer from "inquirer";
import { select } from "@inquirer/prompts";
import { medusaConfig, medusaModules } from "../constants.mjs";

async function selectCacheModules() {
  const choices = [
    { name: "None", value: "" },
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
    message: "Cache module:",
    choices,
  });

  answer && medusaConfig.configuredModules.push(medusaModules[answer]);
}

async function selectEventBusModules() {
  const choices = [
    { name: "None", value: "" },
    {
      name: "Local",
      value: "@medusajs/medusa/event-bus-local",
    },
  ];
  if (medusaConfig.useRedis) {
    choices.push({
      name: "Redis",
      value: "@medusajs/medusa/event-bus-redis",
    });
  }
  const answer = await select({
    message: "Event bus module:",
    choices,
  });

  answer && medusaConfig.configuredModules.push(medusaModules[answer]);
}

async function selectFileStorageModule() {
  const { fileStorageModule } = await inquirer.prompt([
    {
      type: "list",
      name: "fileStorageModule",
      message: "File storage module:",
      choices: [
        { name: "None", value: "" },
        { name: "Local", value: "@medusajs/medusa/file-storage-local" },
        { name: "S3", value: "@medusajs/medusa/file-storage-s3" },
      ],
    },
  ]);

  if (fileStorageModule === "@medusajs/medusa/file-storage-s3") {
    await askS3FileStorageConfigs();
  }
  if (fileStorageModule) {
    medusaConfig.configuredModules.push(medusaModules[fileStorageModule]);
  }
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
  const { paymentModule } = await inquirer.prompt([
    {
      type: "list",
      name: "paymentModule",
      message: "Payment module:",
      choices: [
        { name: "None", value: "" },
        { name: "Stripe", value: "@medusajs/medusa/payment-stripe" },
      ],
    },
  ]);

  if (paymentModule === "@medusajs/medusa/payment-stripe") {
    medusaConfig.configuredModules.push(medusaModules[paymentModule]);
    await askStripePaymentConfigs();
  }
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

  medusaConfig.stripeApiKey = answers.stripeApiKey;
}

export async function askModulesSetup() {
  if (medusaConfig.useRedis) {
    await selectCacheModules();
    await selectEventBusModules();
  }
  await selectFileStorageModule();
  await selectPaymentModules();
}
