import inquirer from "inquirer";
import chalk from "chalk";
import { randomBytes } from "crypto";
import { medusaConfig } from "../constants.mjs";

export async function askDbSetup() {
  const questions = [
    {
      type: "confirm",
      name: "createPgContainer",
      message: "Create a PostgreSQL container?",
      default: true,
    },
    {
      type: "input",
      name: "dbUser",
      message: "Enter the database user:",
      default: "postgres",
      when: (answers) => answers.createPgContainer,
    },
    {
      type: "password",
      name: "dbPassword",
      message: "Enter the database password:",
      default: randomBytes(16).toString("base64"),
      when: (answers) => answers.createPgContainer,
    },
    {
      type: "input",
      name: "dbName",
      message: "Enter the database name:",
      default: "medusa",
      when: (answers) => answers.createPgContainer,
    },
    {
      type: "input",
      name: "dbHost",
      message: "Enter the database host:",
      default: "postgres",
      when: (answers) => answers.createPgContainer,
    },
    {
      type: "input",
      name: "dbUrl",
      message: "Enter the database URL:",
      default: "postgres://postgres:postgres@postgres:5432/medusa",
      when: (answers) => !answers.createPgContainer,
    },
  ];

  const answers = await inquirer.prompt(questions);

  medusaConfig.createPgContainer = answers.createPgContainer;
  if (answers.createPgContainer) {
    medusaConfig.dbUser = answers.dbUser;
    medusaConfig.dbPassword = answers.dbPassword;
    medusaConfig.dbName = answers.dbName;
    medusaConfig.dbHost = answers.dbHost;
    medusaConfig.dbUrl = `postgres://${answers.dbUser}:${answers.dbPassword}@${answers.dbHost}:5432/${answers.dbName}`;
  } else {
    medusaConfig.dbUrl = answers.dbUrl;
  }
}
