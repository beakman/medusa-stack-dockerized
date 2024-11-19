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
import { createSpinner } from "nanospinner";
import { createFiles } from "./src/createFiles.mjs";
import { askDbSetup } from "./src/prompts/dbSetup.mjs";
import { medusaConfig } from "./src/constants.mjs";
import { askProjectSetup } from "./src/prompts/projectSetup.mjs";
import { askRedisSetup } from "./src/prompts/redisSetup.mjs";
import { askModulesSetup } from "./src/prompts/modulesSetup.mjs";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const printHeading = (title) => {
  console.log("");
  console.log(`\n${chalk.bgCyan(title)}`);
  console.log("");
};

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "medusa-stack-dockerized v2.0 \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgCyan("What is this?")} 
    
    This wizard will guide you through the process of creating a dockerized stack
    for your new MedusaJS project.
  `);
}

async function afterQuestions() {
  console.log("");
  console.log(`\n${chalk.bgCyan("Confirm your answers")}`);
  console.log("");
  console.log(chalk.blueBright(JSON.stringify(medusaConfig, null, 2)));
  console.log(``);
  const questions = [
    {
      type: "confirm",
      name: "confirm",
      message: "Proceed with these settings?",
      default: true,
    },
  ];

  const answers = await inquirer.prompt(questions);

  if (!answers.confirm) {
    console.log("Aborting...");
    process.exit(0);
  }

  // use loader to show the spinner
  const loader = new createSpinner("Creating docker files ...");
  loader.start();
  await createFiles(medusaConfig);
  loader.stop();

  console.log(`${chalk.blueBright("🎉 Docker files created successfully!")}`);
}

// Run it with top-level await
console.clear();
await welcome();

printHeading("Project Setup");
await askProjectSetup();

printHeading("Database Setup");
await askDbSetup();

printHeading("Redis Setup");
await askRedisSetup();

printHeading("Modules Setup");
await askModulesSetup();

printHeading("Summary");
await afterQuestions();
