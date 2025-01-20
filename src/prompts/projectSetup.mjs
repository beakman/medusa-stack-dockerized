import inquirer from "inquirer";
import { randomBytes } from "crypto";
import { medusaConfig } from "../constants.mjs";

export async function askProjectSetup() {
  const questions = [
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: medusaConfig.projectName,
    },
    {
      type: "list",
      name: "nodeEnvironment",
      message: "Node environment:",
      choices: ["development", "production"],
      default: "production",
    },
    {
      type: "confirm",
      name: "useDefaultSettings",
      message: "Proceed with default settings and modules?",
      default: true,
    },
    {
      type: "input",
      name: "adminEmail",
      message: "Admin email:",
      default: medusaConfig.adminEmail,
      when: (answers) => !answers.useDefaultSettings,
    },
    {
      type: "password",
      name: "adminPassword",
      message: "Admin password:",
      default: medusaConfig.adminPassword,
      when: (answers) => !answers.useDefaultSettings,
    },
    {
      type: "input",
      name: "baseRepository",
      message: "Default starter:",
      default: medusaConfig.baseRepository,
      when: (answers) => !answers.useDefaultSettings,
    },
    {
      type: "password",
      name: "jwtSecret",
      message: "JWT secret:",
      when: (answers) => !answers.useDefaultSettings,
    },
    {
      type: "password",
      name: "cookieSecret",
      message: "Cookie secret:",
      when: (answers) => !answers.useDefaultSettings,
    },
    {
      type: "input",
      name: "adminCors",
      message: "Admin CORS:",
      default:
        "http://localhost:5173,http://localhost:9000,https://docs.medusajs.com",
      when: (answers) => !answers.useDefaultSettings,
    },
    {
      type: "input",
      name: "authCors",
      message: "Auth CORS:",
      default:
        "http://localhost:5173,http://localhost:9000,https://docs.medusajs.com",
      when: (answers) => !answers.useDefaultSettings,
    },
    {
      type: "input",
      name: "storeCors",
      message: "Store CORS:",
      default: "http://localhost:8000,https://docs.medusajs.com",
      when: (answers) => !answers.useDefaultSettings,
    },
    {
      type: "confirm",
      name: "createStorefront",
      message: "Create storefront?",
      default: true,
      when: (answers) => !answers.useDefaultSettings,
    },
  ];
  try {
    const answers = await inquirer.prompt(questions);

    medusaConfig.projectName = answers.projectName;
    medusaConfig.useDefaultSettings = answers.useDefaultSettings;

    if (!answers.useDefaultSettings) {
      medusaConfig.adminEmail = answers.adminEmail;
      medusaConfig.adminPassword = answers.adminPassword;
      medusaConfig.baseRepository = answers.baseRepository;
      medusaConfig.jwtSecret =
        answers.jwtSecret || randomBytes(32).toString("base64");
      medusaConfig.cookieSecret =
        answers.cookieSecret || randomBytes(32).toString("base64");
      medusaConfig.adminCors = answers.adminCors;
      medusaConfig.authCors = answers.authCors;
      medusaConfig.postStartCommand = `npx medusa user -e ${answers.adminEmail} -p ${answers.adminPassword}`;
      medusaConfig.storeCors = answers.storeCors;
      medusaConfig.createStorefront = answers.createStorefront;
    }
  } catch (err) {
    if (err.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment.");
    } else {
      console.log(`
      *｡*.。*∧,,,∧
        ヾ(⌒(_=•ω•)_  process interrupted... bye!
      `);
    }
    process.exit(0);
  }
}

export async function askSeedDemoData() {
  const questions = [
    {
      type: "confirm",
      name: "seedDemoData",
      message: "Do you want to seed demo data? (recommended)",
      default: true,
    },
  ];

  try {
    const answers = await inquirer.prompt(questions);
    medusaConfig.seedDemoData = answers.seedDemoData;
  } catch (err) {
    if (err.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment.");
    } else {
      console.log(`
      *｡*.。*∧,,,∧
        ヾ(⌒(_=•ω•)_  process interrupted... bye!
      `);
    }
    process.exit(0);
  }
}
