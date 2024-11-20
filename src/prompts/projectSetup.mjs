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
      type: "input",
      name: "adminEmail",
      message: "Admin email:",
      default: medusaConfig.adminEmail,
    },
    {
      type: "password",
      name: "adminPassword",
      message: "Admin password:",
    },
    {
      type: "input",
      name: "baseRepository",
      message: "Default starter:",
      default: medusaConfig.baseRepository,
    },
    {
      type: "password",
      name: "jwtSecret",
      message: "JWT secret:",
    },
    {
      type: "password",
      name: "cookieSecret",
      message: "Cookie secret:",
    },
    {
      type: "input",
      name: "adminCors",
      message: "Admin CORS:",
      default:
        "http://localhost:5173,http://localhost:9000,https://docs.medusajs.com",
    },
    {
      type: "input",
      name: "authCors",
      message: "Auth CORS:",
      default:
        "http://localhost:5173,http://localhost:9000,https://docs.medusajs.com",
    },
    {
      type: "input",
      name: "storeCors",
      message: "Store CORS:",
      default: "http://localhost:8000,https://docs.medusajs.com",
    },
    {
      type: "confirm",
      name: "createStorefront",
      message: "Create storefront?",
      default: true,
    },
  ];
  try {
    const answers = await inquirer.prompt(questions);

    medusaConfig.projectName = answers.projectName;
    medusaConfig.adminEmail = answers.adminEmail;
    medusaConfig.adminPassword = answers.adminPassword || "supersecret";
    medusaConfig.baseRepository = answers.baseRepository;
    medusaConfig.jwtSecret =
      answers.jwtSecret || randomBytes(32).toString("base64");
    medusaConfig.cookieSecret =
      answers.cookieSecret || randomBytes(32).toString("base64");
    medusaConfig.adminCors = answers.adminCors;
    medusaConfig.authCors = answers.authCors;
    medusaConfig.postStartCommand = `npx medusa user -e ${
      answers.adminEmail || "admin@example.com"
    } -p ${answers.adminPassword || "supersecret"}`;
    medusaConfig.storeCors = answers.storeCors;
    medusaConfig.createStorefront = answers.createStorefront;
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
