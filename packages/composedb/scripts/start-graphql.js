import { serveEncodedDefinition } from "@composedb/devtools-node";
import { exec } from "child_process";

const build = async () => {
  // Sanity check
  if (!process.env.CERAMIC_URL)
    throw new Error("CERAMIC_URL env variable is required");
  if (!process.env.COMPOSITE_DIR)
    throw new Error("COMPOSITE_DIR env variable is required");
  if (!process.env.GRAPHQL_PORT)
    throw new Error("GRAPHQL_PORT env variable is required");

  const { CERAMIC_URL, COMPOSITE_DIR, COMPOSITE_PATH, GRAPHQL_PORT } =
    process.env;

  try {
    const server = await serveEncodedDefinition({
      ceramicURL: CERAMIC_URL,
      graphiql: true,
      path: `${COMPOSITE_DIR}/allModels.json`,
      port: Number(GRAPHQL_PORT),
    });

    process.on("SIGTERM", () => {
      server.stop();
      console.log("Server stopped");
    });

    const url = `http://localhost:${GRAPHQL_PORT}/graphql`;

    console.log("\x1b[32m", `Server started on ${url} 🚀`, "\x1b[0m");
    const start =
      process.platform == "darwin"
        ? "open"
        : process.platform == "win32"
        ? "start"
        : "xdg-open";

    exec(start + " " + url);
  } catch (error) {
    console.log({ gqlServerErr: error });
  }
};

build();
