import { readdirSync, readFileSync, writeFileSync } from "fs";

const format = () => {
  if (!process.env.GENERATED_DIR)
    throw new Error("GENERATED_DIR env variable is required");
  if (!process.env.COMPOSITE_DIR)
    throw new Error("COMPOSITE_DIR env variable is required");
  if (!process.env.DEFINITION_DIR)
    throw new Error("DEFINITION_DIR env variable is required");

  const { GENERATED_DIR, COMPOSITE_DIR, DEFINITION_DIR } = process.env;

  const modelsList = [];
  let definitionsHeader = ``;
  let definitionsExport = ``;

  // List all file from directory
  const files = readdirSync(COMPOSITE_DIR);

  // Loop through all files
  for (const file of files) {
    // Read file content
    const content = readFileSync(`${COMPOSITE_DIR}/${file}`, "utf8");
    const modelName = file.split(".")[0];

    modelsList.push({
      modelName,
      modelId: Object.keys(JSON.parse(content).models)[0],
    });
    definitionsHeader += `import ${modelName} from "./${modelName}";\n`;
    definitionsExport += `  ${modelName},\n`;

    // Save file content with formatted JSON
    writeFileSync(
      `${COMPOSITE_DIR}/${file}`,
      JSON.stringify(JSON.parse(content), null, 2)
    );
  }

  // Save models list
  writeFileSync(
    `${GENERATED_DIR}/models-list.json`,
    JSON.stringify(modelsList, null, 2)
  );
  console.log(
    "\x1b[32m",
    `List of models saved at ${GENERATED_DIR}/models-list.json 💾`,
    "\x1b[0m"
  );

  console.log(
    "\x1b[32m",
    `Main JS definition build at ${DEFINITION_DIR}/index.js 💾`,
    "\x1b[0m"
  );

  // Build a text file with all modelsIds
  const modelsIds = modelsList.map((model) => model.modelId).join(" ");
  writeFileSync(`${GENERATED_DIR}/models-ids.txt`, modelsIds);
};

format();
