import Handlebars from "handlebars";
import fs from "fs";

// Read the template file
const dockerfileTemplate = fs.readFileSync(
  "./src/templates/Dockerfile.backend.hbs",
  "utf8"
);

const dockerComposeTemplate = fs.readFileSync(
  "./src/templates/docker-compose-template.hbs",
  "utf8"
);

// Compile the Handlebars template
const compiledDockerfileTemplate = Handlebars.compile(dockerfileTemplate);
const compiledDockerComposeTemplate = Handlebars.compile(dockerComposeTemplate);

// Now you can write the DockerfileContent to a file or use it as needed
export const createFiles = async (medusaConfig) => {
  // Render the template with the context containing medusaConfig
  const dockerfileContent = compiledDockerfileTemplate(medusaConfig);
  const dockerComposeContent = compiledDockerComposeTemplate(medusaConfig);

  // Write the DockerfileContent to a file in an 'output' directory
  fs.mkdirSync("output", { recursive: true });
  fs.writeFileSync("output/Dockerfile.backend", dockerfileContent);
  console.log("");
  console.log("✅ Dockerfile.backend created successfully.");
  fs.writeFileSync("output/docker-compose.yml", dockerComposeContent);
  console.log("✅ docker-compose.yml created successfully.");

  return true;
};
