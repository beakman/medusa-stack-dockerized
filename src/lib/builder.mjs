import Handlebars from "handlebars";
import fs from "fs";
import { sleep } from "./utils.mjs";
import slugify from "slugify";

// Read the template file
const dockerfileBackendTemplate = fs.readFileSync(
  "./src/templates/Dockerfile.backend.hbs",
  "utf8"
);

const dockerfileStorefrontTemplate = fs.readFileSync(
  "./src/templates/Dockerfile.storefront.dev.hbs",
  "utf8"
);

const dockerfileStorefrontProdTemplate = fs.readFileSync(
  "./src/templates/Dockerfile.storefront.prod.hbs",
  "utf8"
);

const dockerComposeTemplate = fs.readFileSync(
  "./src/templates/docker-compose-template.hbs",
  "utf8"
);

const medusaConfigTemplate = fs.readFileSync(
  "./src/templates/medusa-config.ts.hbs",
  "utf8"
);

const envTemplate = fs.readFileSync("./src/templates/env.hbs", "utf8");

const readmeTemplate = fs.readFileSync("./src/templates/README.md.hbs", "utf8");

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
const compiledEnvTemplate = Handlebars.compile(envTemplate);
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
  const envContent = compiledEnvTemplate(medusaConfig);
  const readmeContent = compiledReadmeTemplate(medusaConfig);

  // Assume projectName is defined and contains your project name.
  const slugifiedName = slugify(medusaConfig.projectName, { lower: true });
  const outputDir = `output/${slugifiedName}`;
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
    `${outputDir}/Dockerfile.storefront.dev`,
    dockerfileStorefrontContent
  );
  console.log("✅ Dockerfile.storefront.dev created successfully.");
  sleep(500);

  fs.writeFileSync(
    `${outputDir}/Dockerfile.storefront.prod`,
    dockerfileStorefrontContent
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

  return true;
};
