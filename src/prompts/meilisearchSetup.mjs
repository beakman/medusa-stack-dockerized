import inquirer from "inquirer";
import { randomBytes } from "crypto";
import { medusaConfig } from "../constants.mjs";

export async function askMeilisearchSetup() {
  const questions = [
    {
      type: "confirm",
      name: "useMeilisearch",
      message: "Use Meilisearch for searching?",
      default: true,
    },
    {
      type: "confirm",
      name: "createMeilisearchContainer",
      message: "Create a Meilisearch container?",
      default: true,
      when: (answers) => answers.useMeilisearch,
    },
    {
      type: "password",
      name: "meilisearchMasterKey",
      message: "Meilisearch master key:",
      when: (answers) => answers.useMeilisearch,
    },
  ];

  const answers = await inquirer.prompt(questions);

  medusaConfig.createMeilisearchContainer = answers.createMeilisearchContainer;
  medusaConfig.useMeilisearch = answers.useMeilisearch;
  if (answers.useMeilisearch) {
    medusaConfig.meilisearchMasterKey =
      answers.meilisearchMasterKey || randomBytes(32).toString("base64");
  }
}
