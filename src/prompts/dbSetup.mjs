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
      default: medusaConfig.dbUser,
      when: (answers) => answers.createPgContainer,
    },
    {
      type: "password",
      name: "dbPassword",
      message: "Database password:",
      default: medusaConfig.dbPassword,
      when: (answers) => answers.createPgContainer,
    },
    {
      type: "input",
      name: "dbName",
      message: "Database name:",
      default: medusaConfig.dbName,
      when: (answers) => answers.createPgContainer,
    },
    {
      type: "input",
      name: "dbHost",
      message: "Database host:",
      default: medusaConfig.dbHost,
      when: (answers) => answers.createPgContainer,
    },
    {
      type: "input",
      name: "dbPort",
      message: "Database port:",
      default: medusaConfig.dbPort,
      when: (answers) => answers.createPgContainer,
    },
  ];

  const answers = await inquirer.prompt(questions);

  medusaConfig.createPgContainer = answers.createPgContainer;

  medusaConfig.dbUser = answers.dbUser;
  medusaConfig.dbPassword = answers.dbPassword;
  medusaConfig.dbName = answers.dbName;
  medusaConfig.dbHost = answers.dbHost;
  medusaConfig.dbPort = answers.dbPort;
}
