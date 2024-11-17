#!/usr/bin/env node

//   _ __ ___   ___  __| |_   _ ___  __ _   ___| |_ __ _  ___| | __
//  | '_ ` _ \ / _ \/ _` | | | / __|/ _` | / __| __/ _` |/ __| |/ /
//  | | | | | |  __/ (_| | |_| \__ \ (_| | \__ \ || (_| | (__|   <
//  |_| |_| |_|\___|\__,_|\__,_|___/\__,_| |___/\__\__,_|\___|_|\_\
//       _            _             _             _   ____    ___
//    __| | ___   ___| | _____ _ __(_)_______  __| | |___ \  / _ \
//   / _` |/ _ \ / __| |/ / _ \ '__| |_  / _ \/ _` |   __) || | | |
//  | (_| | (_) | (__|   <  __/ |  | |/ /  __/ (_| |  / __/ | |_| |
//   \__,_|\___/ \___|_|\_\___|_|  |_/___\___|\__,_| |_____(_)___/

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

const DEFAULT_REPO = "https://github.com/medusajs/medusa-starter-default";
const BRANCH = "master";

let medusaConfig = {};

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "medusa-stack-dockerized v2.0 \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO USE IT?")} 
    This wizard will guide you through the process 
    
    At the end of the process you will get a ready-to-use docker-compose file
    with all modules and additional services you choose.

  `);
}

// npx create-medusa-app@latest --help
// Usage: create-medusa-app [options]

// Create a new Medusa project

// Options:
//   --repo-url <url>         URL of repository to use to setup project.
//   --seed                   Seed the created database with demo data.
//   --skip-db                Skips creating the database, running migrations, and seeding, and subsequently skips opening
//                           the browser. (default: false)
//   --db-url <url>           Skips database creation and sets the database URL to the provided URL. Throws an error if can't
//                           connect to the database. Will still run migrations and open the admin after project creation.
//   --no-migrations          Skips running migrations, creating admin user, and seeding. If used, it's expected that you
//                           pass the --db-url option with a url of a database that has all necessary migrations. Otherwise,
//                           unexpected errors will occur.
//   --no-browser             Disables opening the browser at the end of the project creation and only shows success message.
//   --directory-path <path>  Specify the directory path to install the project in.
//   --with-nextjs-starter    Install the Next.js starter along with the Medusa backend (default: false)
//   --verbose                Show all logs of underlying commands. Useful for debugging. (default: false)
//   -h, --help               display help for command

// Script flow:
// ---------------
// Welcome to medusa-stack-dockerized v2.0!
// This wizard will guide you through the process of creating a dockerized stack
// for your new MdusaJS project.
// At the end of the process you will get a ready-to-use docker-compose file
// with all modules and additional services you choose.

// 1. What is your project name? This will be also the name of the directory
//    where the backend code will be stored.
// 2. WHat is the base repository URL? By default we'll be using the
//    medusa-starter-default repository, but you can change it if you want.
//    We could provide here some options, like the official marketplace
//    or a custom repository.
// 3. Do you want to seed the database with demo data? This will create a
//    user with the email admin@example.com and the password supersecret.
// 4. Do you want to install the Next.js starter? This will install the
//    Next.js starter along with the Medusa backend.
// 5. Select additional modules you want to use/install: This will adjust the medusa-config.js file.
//    - Cache Modules:
//      - In-memory: "@medusajs/medusa/cache-inmemory"
//      - Redis: "@medusajs/medusa/cache-redis"
//    - Event Bus Modules: Local and Redis:
//      - Local: "@medusajs/medusa/event-bus-local"
//      - Redis: "@medusajs/medusa/event-bus-redis"
//    - File Storage Modules: Local and S3
//      - Local: "@medusajs/medusa/file-storage-local"
//      - S3: "@medusajs/medusa/file-storage-s3"
//  Here we ask if we want to create a Minio S3 storage for the file storage.
// and/or just provide the required configs for the storage module configuration:
// which is:
//              file_url: process.env.S3_FILE_URL,
//              access_key_id: process.env.S3_ACCESS_KEY_ID,
//              secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
//              region: process.env.S3_REGION,
//              bucket: process.env.S3_BUCKET,
//              endpoint: process.env.S3_ENDPOINT,
//  - Notification providers modules:
//    - Local: "@medusajs/medusa/notification-provider-local"
//    - SendGrid: "@medusajs/medusa/notification-sendgrid"
// - Workflow Engine Modules:
//   - Local: "@medusajs/medusa/workflow-engine-inmemory"
//   - Redis: "@medusajs/medusa/workflow-engine-redis"
// - Payment Providers:
//   - Stripe: "@medusajs/medusa/payment-provider-stripe"
//  If we choose to install the Stripe provider, we'll ask for the API key:
//  - STRIPE_API_KEY.
// If we previously select the option of installing the Next.js starter, we'll
// also ask for the NEXT_PUBLIC_STRIPE_PK key and install the required npm packages
// in the Dockerfile.fronted: npm install @stripe/react-stripe-js @stripe/stripe-js 
// 6. We'll create a Dockerfile for you, based on the Node.js 20 Alpine image.
//    This will be the image that will be used to run your backend.

async function askDbUser() {
  const questions = [
    {
      type: "input",
      name: "dbUser",
      message: "PostgreSQL user:",
      default: "postgres",
    },
  ];

  console.log("medusaConfig", medusaConfig);
  const answers = await inquirer.prompt(questions);

  medusaConfig["dbUser"] = answers.dbUser;
}

async function askDbPassword() {
  const questions = [
    {
      type: "password",
      name: "dbPassword",
      message: "PostgreSQL password:",
      default: "postgres",
    },
  ];

  const answers = await inquirer.prompt(questions);

  medusaConfig["dbPassword"] = answers.dbPassword;
}

async function askSeed() {
  const questions = [
    {
      type: "confirm",
      name: "seed",
      message: "🌱 Do you want to seed the database with demo data?",
      default: false,
    },
  ];

  const answers = await inquirer.prompt(questions);

  medusaConfig["seed"] = answers.seed;
}

async function askNextjsStarter() {
  const questions = [
    {
      type: "confirm",
      name: "nextjsStarter",
      message: "Do you want to install the Next.js starter?",
      default: false,
    },
  ];

  const answers = await inquirer.prompt(questions);

  medusaConfig["nextjsStarter"] = answers.nextjsStarter;
}

async function selectCacheModules() {
  const questions = [
    {
      type: "checkbox",
      name: "modules",
      message: "Select Cache Modules:",
      choices: [
        { name: "In-memory", value: "@medusajs/medusa/cache-inmemory" },
        { name: "Redis", value: "@medusajs/medusa/cache-redis" },
      ],
    },
  ];
  const answers = await inquirer.prompt(questions);
  medusaConfig["cacheModules"] = answers.modules;
}

async function selectEventBusModules() {
  const questions = [
    {
      type: "checkbox",
      name: "modules",
      message: "Select Event Bus Modules:",
      choices: [
        { name: "Local", value: "@medusajs/medusa/event-bus-local" },
        { name: "Redis", value: "@medusajs/medusa/event-bus-redis" },
      ],
    },
  ];
  const answers = await inquirer.prompt(questions);
  medusaConfig["eventBusModules"] = answers.modules;
}

async function selectFileStorageModules() {
  const questions = [
    {
      type: "checkbox",
      name: "modules",
      message: "Select File Storage Modules:",
      choices: [
        { name: "Local", value: "@medusajs/medusa/file-storage-local" },
        { name: "S3", value: "@medusajs/medusa/file-storage-s3" },
      ],
    },
  ];
  const answers = await inquirer.prompt(questions);
  medusaConfig["fileStorageModules"] = answers.modules;
}

async function createDockerfile() {
  const dockerfile = `
      FROM node:20-alpine
      WORKDIR /app
      COPY . .
      RUN apk update && \
          apk upgrade && \
          apk add git postgresql-client
      RUN npx create-medusa-app@latest ${
        medusaConfig.nextjsStarter ? "--with-nextjs-starter" : ""
      } ${medusaConfig.seed ? "--seed" : ""} ${
    medusaConfig.dbUrl ? "--db-url" + medusaConfig.dbUrl : ""
  }
      
      CMD ["npm", "start"]
      `;

  const spinner = createSpinner("Creating Dockerfile...").start();

  await sleep();
  spinner.stop();

  console.log(`\n${chalk.bgBlue("DOCKERFILE CREATED")}`);
}

// Run it with top-level await
console.clear();
await welcome();
await askDbUser();
await askDbPassword();
await askSeed();
await askNextjsStarter();
await selectCacheModules();
await selectEventBusModules();
await selectFileStorageModules();

console.log(`${chalk.bgBlue("RESULTS")}`);
console.log(medusaConfig);
