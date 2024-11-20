import inquirer from "inquirer";
import { medusaConfig } from "../constants.mjs";

export async function askRedisSetup() {
  const questions = [
    {
      type: "confirm",
      name: "useRedis",
      message: "Use Redis for caching?",
      default: true,
    },
    {
      type: "confirm",
      name: "createRedisContainer",
      message: "Create a Redis container?",
      default: true,
      when: (answers) => answers.useRedis,
    },
    {
      type: "input",
      name: "redisUrl",
      message: "Redis server URL:",
      default: "redis://redis:6379",
      when: (answers) => answers.useRedis,
    },
  ];

  const answers = await inquirer.prompt(questions);

  medusaConfig.createRedisContainer = answers.createRedisContainer;
  medusaConfig.useRedis = answers.useRedis;
  if (answers.useRedis) {
    medusaConfig.redisUrl = answers.redisUrl;
  }
}
