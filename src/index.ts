#!/usr/bin/env node

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import {
  build,
  startNodeRed,
  startWatcher,
  startListener,
  loadConfig,
} from "@allanoricil/nrg-core";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PackageJson {
  name: string;
  version: string;
  description?: string;
  main?: string;
  scripts?: { [key: string]: string };
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
  [key: string]: any;
}

const packageJsonPath = path.resolve(__dirname, "../package.json");
const packageJson: PackageJson = JSON.parse(
  fs.readFileSync(packageJsonPath, "utf-8")
);
const version = packageJson.version;

yargs(hideBin(process.argv))
  .version(version)
  .alias("v", "version")
  .command<{
    environment: "dev" | "prod";
  }>(
    "build",
    "Build an nrg project",
    (yargs) => {
      yargs.option("environment", {
        alias: "e",
        type: "string",
        choices: ["dev", "prod"],
        default: "prod",
        description: "Build environment",
      });
    },
    async (argv) => {
      const { config } = await loadConfig();
      config.build.environment = argv.environment;
      await build(config);
    }
  )
  .command<{
    environment: "dev" | "prod";
    watch: boolean;
    debug: boolean;
    open: boolean;
  }>(
    "dev",
    "Start the development server",
    (yargs) => {
      yargs
        .option("environment", {
          alias: "e",
          type: "string",
          choices: ["dev", "prod"],
          default: "dev",
          description: "Build environment",
        })
        .option("watch", {
          alias: "w",
          type: "boolean",
          description: "Enable watch mode",
        })
        .option("debug", {
          alias: "d",
          type: "boolean",
          description: "Enable debug mode",
        })
        .option("open", {
          alias: "o",
          type: "boolean",
          description: "Open the browser",
        });
    },
    async (argv) => {
      const { config, filepath } = await loadConfig();
      const { port, listener } = await startListener(config);

      config.build.environment = argv.environment;
      config.dev.debug = argv.debug;
      config.dev.open = argv.open;
      config.dev.port = port;

      if (argv.watch) {
        await startWatcher(config, filepath);
      }

      await build(config);
      await startNodeRed(config, listener);
    }
  )
  .demandCommand(1, "You need at least one command before moving on")
  .help()
  .alias("h", "help").argv;
