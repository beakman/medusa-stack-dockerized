import inquirer from "inquirer";
import chalk from "chalk";
import { select } from "@inquirer/prompts";
import { randomBytes } from "crypto";
import { medusaConfig } from "../constants.mjs";

async function askProjectName() {
  const questions = [
    {
      type: "input",
      name: "projectName",
      message: `${chalk.yellow("What is your project name?")}`,
      default: medusaConfig.projectName,
    },
    {
      type: "input",
      name: "adminEmail",
      message: `${chalk.yellow("What is the admin's email?")}`,
      default: medusaConfig.adminEmail,
    },
    {
      type: "input",
      name: "adminPassword",
      message: `${chalk.yellow("What is the admin's password?")}`,
      default: medusaConfig.adminPassword,
    },
  ];

  const answers = await inquirer.prompt(questions);

  medusaConfig.projectName = answers.projectName;
}

async function askBaseRepository() {
  const answer = await select({
    message: `${chalk.yellow("Select a default starter:\n")}`,
    choices: [
      {
        name: "https://github.com/medusajs/medusa-starter-default",
        value: "https://github.com/medusajs/medusa-starter-default.git",
        description: "The default MedusaJS starter",
      },
      {
        name: "https://github.com/medusajs/medusa-marketplace-starter",
        value: "https://github.com/medusajs/medusa-marketplace-starter.git",
        description: "A marketplace starter",
      },
    ],
  });

  medusaConfig.baseRepository = answer;
}

async function askForSecrets() {
  const questions = [
    {
      type: "input",
      name: "jwtSecret",
      message: "JWT secret:",
      default: randomBytes(32).toString("base64"),
    },
    {
      type: "input",
      name: "cookieSecret",
      message: "Cookie secret:",
      default: randomBytes(32).toString("base64"),
    },
  ];

  const answers = await inquirer.prompt(questions);

  medusaConfig.jwtSecret = answers.jwtSecret;
  medusaConfig.cookieSecret = answers.cookieSecret;
}

export async function askProjectSetup() {
  await askProjectName();
  await askBaseRepository();
  await askForSecrets();
}
