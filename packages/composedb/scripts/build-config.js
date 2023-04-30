import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";

// Basic configuration for Ceramic node
const config = {
  anchor: {},
  "http-api": {
    "cors-allowed-origins": [".*"],
    "admin-dids": [process.env.COMPOSEDB_ADMIN_DID],
  },
  ipfs: {
    mode: "bundled",
  },
  network: {
    name: "inmemory",
  },
  node: {},
  "state-store": {
    mode: "fs",
    "local-directory": ".ceramic/statestore/",
  },
  indexing: {
    db: "sqlite:.ceramic/indexing-inmemory.sqlite",
    "allow-queries-before-historical-sync": true,
  },
};

const build = () => {
  // Sanity check
  if (!process.env.GENERATED_DIR)
    throw new Error("GENERATED_DIR env variable is required");
  if (!process.env.COMPOSEDB_ADMIN_DID)
    throw new Error("COMPOSEDB_ADMIN_DID env variable is required");

  const { GENERATED_DIR } = process.env;

  const CONFIG_FILE = `${GENERATED_DIR}/ceramic-config.json`;

  // Create directory if not exists
  if (!existsSync(GENERATED_DIR)) mkdirSync(GENERATED_DIR);
  // Remove file if exists
  if (existsSync(CONFIG_FILE)) rmSync(CONFIG_FILE);

  // Write config file
  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
};

build();
