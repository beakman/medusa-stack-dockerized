import inquirer from "inquirer";
import { randomBytes } from "crypto";
import { medusaConfig } from "../constants.mjs";

export async function askMinioSetup() {
  try {
    const questions = [
      {
        type: "confirm",
        name: "useMinio",
        message: "Use MinIO for storing files?",
        default: true,
      },
      {
        type: "confirm",
        name: "createMinioContainer",
        message: "Create a MinIO container?",
        default: true,
        when: (answers) => answers.useMinio,
      },
      {
        type: "input",
        name: "minioRootUser",
        message: "MinIO root user:",
        default: "minio",
        when: (answers) => answers.useMinio,
      },
      {
        type: "password",
        name: "minioRootPassword",
        message: "MinIO root password:",
        when: (answers) => answers.useMinio,
      },
    ];
    const answers = await inquirer.prompt(questions);
    medusaConfig.createMinioContainer = answers.createMinioContainer;
    medusaConfig.useMinio = answers.useMinio;
    if (answers.useMinio) {
      medusaConfig.minioRootUser = answers.minioRootUser;
      medusaConfig.minioRootPassword =
        answers.minioRootPassword || randomBytes(32).toString("base64");
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
