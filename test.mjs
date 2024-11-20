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
import { heading } from "./src/lib/utils.mjs";
import { sleep } from "./src/lib/utils.mjs";
import { createFiles } from "./src/lib/builder.mjs";
import { askDbSetup } from "./src/prompts/dbSetup.mjs";
import { medusaConfig, medusaModules } from "./src/constants.mjs";
import { askProjectSetup } from "./src/prompts/projectSetup.mjs";
import { askRedisSetup } from "./src/prompts/redisSetup.mjs";
import { askModulesSetup } from "./src/prompts/modulesSetup.mjs";

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "🔥 Testing medusa-stack-dockerized v2.0! \n"
  );
  await sleep(500);
  rainbowTitle.stop();

  console.log(chalk.green("\n\n"));
  console.log(chalk.green("👋  This will go to the medusa-config.ts"));
  console.log(
    chalk.green(`
      ${JSON.stringify(
        medusaModules["@medusajs/medusa/cache-inmemory"],
        null,
        2
      )}
`)
  );
  console.log(chalk.green("\n\n"));

  const questions = [
    {
      type: "confirm",
      name: "continue",
      message: "Do you want to continue?",
      default: false,
    },
  ];
}

await welcome();
