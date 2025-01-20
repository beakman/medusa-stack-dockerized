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
import chalkAnimation from "chalk-animation";
import slugify from "slugify";
import { createSpinner } from "nanospinner";
import { heading } from "./src/lib/utils.mjs";
import { sleep } from "./src/lib/utils.mjs";
import { createFiles } from "./src/lib/builder.mjs";
import { askDbSetup } from "./src/prompts/dbSetup.mjs";
import { medusaConfig } from "./src/constants.mjs";
import {
  askProjectSetup,
  askSeedDemoData,
} from "./src/prompts/projectSetup.mjs";
import { askRedisSetup } from "./src/prompts/redisSetup.mjs";
import { askMinioSetup } from "./src/prompts/minioSetup.mjs";
import { askMeilisearchSetup } from "./src/prompts/meilisearchSetup.mjs";
import { askModulesSetup } from "./src/prompts/modulesSetup.mjs";

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(`    
    ハ____ハ   ｡ﾟﾟ･｡･ﾟﾟ｡
   ꒰ ⬩ ω ⬩ ꒱   ˚｡ ｡˚
   | つ ~ Welcome to medusa-stack-dockerized v2.0 ﾟ ･｡･ﾟ
    `);
  await sleep(2000);
  rainbowTitle.stop();
}

async function confirmProccess() {
  const questions = [
    {
      type: "confirm",
      name: "confirm",
      message: "Proceed with these settings?",
      default: true,
    },
  ];

  try {
    const answers = await inquirer.prompt(questions);

    if (!answers.confirm) {
      console.log("Aborting...");
      process.exit(0);
    }
  } catch (err) {
    if (err.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment.");
    } else {
      console.log(`
      *｡*.。*∧,,,∧
        ヾ(⌒(_=•ω•)_  bye!
`);
    }
    process.exit(0);
  }

  // use loader to show the spinner
  console.log("");
  const loader = new createSpinner("Creating docker files ...");
  loader.start();
  await sleep();
  loader.stop();
  console.log("");
  await createFiles(medusaConfig);
}

function finished() {
  console.log("");
  console.log(
    `\n${chalk.blueBright(
      "🎉 Process finished! Please check your files in the 'output' folder."
    )}`
  );
  heading(" Next steps ");
  const slugifiedName = slugify(medusaConfig.projectName, { lower: true });
  const outputDir = `output/${slugifiedName}`;
  console.log(`  
👉 0. Go to your project directory: ${chalk.blueBright(`cd ${outputDir}`)}
👉 1. Start the backend with: ${chalk.blueBright(
    "docker compose up postgres redis medusa_server medusa_worker"
  )}
👉 2. Create your admin user with ${chalk.blueBright(
    "docker compose exec -it medusa_server " + medusaConfig.postStartCommand
  )}
👉 3. Generate a publishable api key for the storefront: ${chalk.blueBright(
    "http://localhost:9000/app/settings/publishable-api-keys"
  )}
👉 4. Fill the other enviroment variables for the storefront in the generated: ${chalk.blueBright(
    ".env file"
  )}
👉 5. Start the storefront: ${chalk.blueBright(
    "docker compose up storefront -d"
  )} 

🎉 Visit you brand new storefront at ${chalk.blueBright(
    "http://localhost:8000"
  )} 
    `);
}

// Run it with top-level await
console.clear();
await welcome();
heading(" Project Setup ");
await askProjectSetup();

if (medusaConfig.useDefaultSettings) {
  console.log(chalk.green("\n\n"));
  console.log(chalk.green("🌈  Going with default settings ..."));
  console.log(chalk.green("\n\n"));
} else {
  heading(" Database Setup ");
  await askDbSetup();
  heading(" Redis Setup ");
  await askRedisSetup();
  heading(" Minio Setup ");
  await askMinioSetup();
  heading(" Meilisearch Setup ");
  await askMeilisearchSetup();
  heading(" Modules Setup ");
  await askModulesSetup();
}

heading(" Summary ");
console.log(chalk.green("\n\n"));
console.log(medusaConfig);
console.log(chalk.green("\n\n"));

await askSeedDemoData();
await confirmProccess();
finished();
