import inquirer from "inquirer";
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
      message: "Database user:",
      default: "postgres",
      when: (answers) => answers.createPgContainer,
    },
    {
      type: "password",
      name: "dbPassword",
      message: "Database password:",
      when: (answers) => answers.createPgContainer,
    },
    {
      type: "input",
      name: "dbName",
      message: "Database name:",
      default: "medusa",
      when: (answers) => answers.createPgContainer,
    },
    {
      type: "input",
      name: "dbHost",
      message: "Database host:",
      default: "postgres",
      when: (answers) => answers.createPgContainer,
    },
    {
      type: "input",
      name: "dbUrl",
      message: "Database URL:",
      default: "postgres://postgres:postgres@postgres:5432/medusa",
      when: (answers) => !answers.createPgContainer,
    },
  ];

  const answers = await inquirer.prompt(questions);

  medusaConfig.createPgContainer = answers.createPgContainer;

  // Build the database URL
  if (answers.createPgContainer) {
    medusaConfig.dbUser = answers.dbUser;
    medusaConfig.dbPassword =
      answers.dbPassword || randomBytes(16).toString("hex");
    medusaConfig.dbName = answers.dbName;
    medusaConfig.dbHost = answers.dbHost;
    medusaConfig.dbUrl = `postgres://${medusaConfig.dbUser}:${medusaConfig.dbPassword}@${medusaConfig.dbHost}:5432/${medusaConfig.dbName}`;
  } else {
    medusaConfig.dbUrl = answers.dbUrl;
  }
}
