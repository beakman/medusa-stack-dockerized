import Handlebars from "handlebars";
import helpers from "handlebars-helpers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { sleep } from "./utils.mjs";
import slugify from "slugify";

// Get the current directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templatePath = path.join(__dirname, '../../src/templates/');

helpers({ handlebars: Handlebars });

// Read the template file
const dockerfileBackendTemplate = fs.readFileSync(
  path.join(templatePath, "Dockerfile.backend.hbs"),
  "utf8"
);

const dockerfileStorefrontTemplate = fs.readFileSync(
  path.join(templatePath, "Dockerfile.storefront.hbs"),
  "utf8"
);

const dockerfileStorefrontProdTemplate = fs.readFileSync(
  path.join(templatePath, "Dockerfile.storefront.prod.hbs"),
  "utf8"
);

const dockerComposeTemplate = fs.readFileSync(
  path.join(templatePath, "docker-compose-template.hbs"),
  "utf8"
);

const medusaConfigTemplate = fs.readFileSync(
  path.join(templatePath, "medusa-config.ts.hbs"),
  "utf8"
);

const storefrontNextConfigTemplate = fs.readFileSync(
  path.join(templatePath, "storefront.next.config.js.hbs"),
  "utf8"
);

const envTemplate = fs.readFileSync(
  path.join(templatePath, "env.hbs"),
  "utf8"
);

const entrypointTemplate = fs.readFileSync(
  path.join(templatePath, "entrypoint.sh.hbs"),
  "utf8"
);

const replaceEnvVarsTemplate = fs.readFileSync(
  path.join(templatePath, "replace-env-vars.sh.hbs"),
  "utf8"
);

const createPublishableKeyTemplate = fs.readFileSync(
  path.join(templatePath, "create-publishable-key.sh.hbs"),
  "utf8"
);

const readmeTemplate = fs.readFileSync(
  path.join(templatePath, "README.md.hbs"),
  "utf8"
);

// Compile the Handlebars template
const compiledDockerfileBackendTemplate = Handlebars.compile(
  dockerfileBackendTemplate
);
const compiledDockerfileStorefrontTemplate = Handlebars.compile(
  dockerfileStorefrontTemplate
);
const compiledDockerfileStorefrontProdTemplate = Handlebars.compile(
  dockerfileStorefrontProdTemplate
);
const compiledDockerComposeTemplate = Handlebars.compile(dockerComposeTemplate);
const compiledMedusaConfigTemplate = Handlebars.compile(medusaConfigTemplate);
const compiledStorefrontNextConfigTemplate = Handlebars.compile(
  storefrontNextConfigTemplate
);
const compiledEnvTemplate = Handlebars.compile(envTemplate);
const compiledEntrypointTemplate = Handlebars.compile(entrypointTemplate);
const compiledReplaceEnvVarsTemplate = Handlebars.compile(
  replaceEnvVarsTemplate
);
const compiledCreatePublishableKeyTemplate = Handlebars.compile(
  createPublishableKeyTemplate
);
const compiledReadmeTemplate = Handlebars.compile(readmeTemplate);

// Now you can write the DockerfileContent to a file or use it as needed
export const createFiles = async (medusaConfig) => {
  // Render the template with the context containing medusaConfig
  const dockerfileContent = compiledDockerfileBackendTemplate(medusaConfig);
  const dockerfileStorefrontContent =
    compiledDockerfileStorefrontTemplate(medusaConfig);
  const dockerfileStorefrontProdContent =
    compiledDockerfileStorefrontProdTemplate(medusaConfig);
  const dockerComposeContent = compiledDockerComposeTemplate(medusaConfig);
  const medusaConfigContent = compiledMedusaConfigTemplate(medusaConfig);
  const storefrontNextConfigContent =
    compiledStorefrontNextConfigTemplate(medusaConfig);
  const envContent = compiledEnvTemplate(medusaConfig);
  const entrypointContent = compiledEntrypointTemplate(medusaConfig);
  const replaceEnvVarsContent = compiledReplaceEnvVarsTemplate(medusaConfig);
  const createPublishableKeyContent =
    compiledCreatePublishableKeyTemplate(medusaConfig);
  const readmeContent = compiledReadmeTemplate(medusaConfig);

  // Assume projectName is defined and contains your project name.
  const slugifiedName = slugify(medusaConfig.projectName, { lower: true });
  const outputDir = `output/${slugifiedName}`;

  // Create directories
  fs.mkdirSync(`${outputDir}`, { recursive: true });

  // Create a basic README.md file
  fs.writeFileSync(`${outputDir}/README.md`, readmeContent);

  // Create the .env file
  fs.writeFileSync(`${outputDir}/.env`, envContent);

  // Write the Dockerfile.backend file
  fs.writeFileSync(`${outputDir}/Dockerfile.backend`, dockerfileContent);
  console.log("✅ Dockerfile.backend created successfully.");
  sleep(500);

  // Write the Dockerfile.storefront file
  fs.writeFileSync(
    `${outputDir}/Dockerfile.storefront`,
    dockerfileStorefrontContent
  );
  console.log("✅ Dockerfile.storefront created successfully.");
  sleep(500);

  fs.writeFileSync(
    `${outputDir}/Dockerfile.storefront.prod`,
    dockerfileStorefrontProdContent
  );
  console.log("✅ Dockerfile.storefront.prod created successfully.");
  sleep(500);

  // Write the docker-compose.yml file
  fs.writeFileSync(`${outputDir}/docker-compose.yml`, dockerComposeContent);
  console.log("✅ docker-compose.yml created successfully.");
  sleep(500);

  // Write the medusa-config.ts file
  fs.writeFileSync(`${outputDir}/medusa-config.ts`, medusaConfigContent);
  console.log("✅ medusa-config.ts created successfully.");
  sleep(500);

  // Write the storefront.next.config.js file
  fs.writeFileSync(
    `${outputDir}/storefront.next.config.js`,
    storefrontNextConfigContent
  );
  console.log("✅ next.config.js created successfully.");
  sleep(500);
  // Write the entrypoint.sh file
  fs.writeFileSync(`${outputDir}/entrypoint.sh`, entrypointContent);
  console.log("✅ entrypoint.sh created successfully.");
  sleep(500);

  // Write the replace-env-vars.sh file
  fs.writeFileSync(`${outputDir}/replace-env-vars.sh`, replaceEnvVarsContent);
  console.log("✅ replace-env-vars.sh created successfully.");
  sleep(500);

  // Write the create-publishable-key.sh file
  fs.writeFileSync(
    `${outputDir}/create-publishable-key.sh`,
    createPublishableKeyContent
  );
  console.log("✅ create-publishable-key.sh created successfully.");
  sleep(500);

  return true;
};
