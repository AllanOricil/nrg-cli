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
import nodePlop from "node-plop";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const plopfilePath = path.resolve(
  __dirname,
  "../node_modules/@allanoricil/nrg-generator/plopfile.js",
);

interface PackageJson {
  name: string;
  version: string;
  description?: string;
  main?: string;
  scripts?: { [key: string]: string };
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
  [key: string]: unknown;
}

const packageJsonPath = path.resolve(__dirname, "../package.json");
const packageJsonString = fs.readFileSync(packageJsonPath, "utf-8");
const packageJson: PackageJson = JSON.parse(packageJsonString);
const version = packageJson.version;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
    },
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
    },
  )
  .command<{
    type: "" | "node";
    projectName: "string";
    nodeName: "string";
    nodeCategory: "string";
    nodeColor: "string";
    nodeInputs: "number";
    nodeOutputs: "number";
  }>(
    "create [type]",
    "Create a new nrg project or node.",
    (yargs) => {
      yargs
        .positional("type", {
          describe:
            "Specify the type of item to create. If left empty, a project will be created.",
          choices: ["node"],
        })
        .option("project-name", {
          type: "string",
          description: "What would you like to name your project?",
        })
        .option("node-name", {
          type: "string",
          description: "What would you like to name your node?",
        })
        .option("node-category", {
          type: "string",
          description: "Which category should your node belong to?",
        })
        .option("node-color", {
          type: "string",
          description: "What color should represent your node? (e.g. #FFFFFF)",
        })
        .option("node-inputs", {
          type: "number",
          description: "How many inputs should your node have? (e.g. 1)",
        })
        .option("node-outputs", {
          type: "number",
          description: "How many outputs should your node have? (e.g. 1)",
        })
        .check((argv) => {
          const type = argv.type;
          if (type === "node" && !argv["node-name"]) {
            throw new Error(
              'The --node-name option is required when type is "node".',
            );
          }
          if (type !== "node" && !argv["project-name"]) {
            throw new Error(
              "The --project-name option is required when type is undefined",
            );
          }
          return true;
        })
        .example(
          "nrg create --project-name nrg-project",
          "Creates a new project.",
        )
        .example(
          "nrg create node --node-name node-1",
          "Creates a new node named node-1.",
        );
    },
    async (argv) => {
      const {
        type,
        projectName,
        nodeName,
        nodeCategory,
        nodeColor,
        nodeInputs,
        nodeOutputs,
      } = argv;

      const plop = await nodePlop(plopfilePath);
      if (!type) {
        const generator = plop.getGenerator("create");
        const cliAnswers = [
          projectName || "_",
          nodeName || "_",
          nodeCategory || "_",
          nodeColor || "_",
          nodeInputs || "_",
          nodeOutputs || "_",
        ];
        const promptAnswers = await generator.runPrompts(cliAnswers);
        await generator.runActions(promptAnswers);

        console.log(
          chalk.green(`\n🎉 Your project has been created successfully! 🎉`),
        );
        console.log(
          chalk.green(`\nLet’s get started with a couple of quick steps:`),
        );
        console.log(chalk.green(`1. Navigate into your project directory:`));
        console.log(
          chalk.green(`   cd ${projectName || promptAnswers.projectName}`),
        );
        console.log(
          chalk.green(
            `2. Install the dependencies using your favorite package manager.`,
          ),
        );
        console.log(
          chalk.green(`\nHappy coding! If you need help, just ask! 🚀\n`),
        );
      } else if (type === "node") {
        const generator = plop.getGenerator("create:node");
        const cliAnswers = [
          nodeName || "_",
          nodeCategory || "_",
          nodeColor || "_",
          nodeInputs || "_",
          nodeOutputs || "_",
        ];
        const promptAnswers = await generator.runPrompts(cliAnswers);
        await generator.runActions(promptAnswers);

        console.log(
          chalk.green(`\n🎉 Your node has been created successfully! 🎉`),
        );
      }
    },
  )
  .demandCommand(1, "You need at least one command before moving on")
  .help()
  .alias("h", "help").argv;
