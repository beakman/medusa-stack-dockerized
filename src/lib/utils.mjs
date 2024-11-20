import chalk from "chalk";

export const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

export const heading = (title) => {
  console.log("");
  console.log(`\n${chalk.bgCyan(title)}`);
  console.log("");
};
