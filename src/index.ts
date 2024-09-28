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
import nodePlop from "node-plop";
import chalk from "chalk";
import { getPlopfileFilepath, getCLIInfo } from "./utils";

const version = getCLIInfo();

// NOTE: version is disabled to avoid processing -v | --version flags during the first parse call, which would cause the version output to be displayed twice
// NOTE: help is disabled to avoid processing the default --help flag during the first parse call, which would cause the help output to be displayed twice
// NOTE: exitProcess is disabled because we don't want to kill the process after calling the first parse
const y = yargs(hideBin(process.argv))
  .version(false)
  .help(false)
  .exitProcess(false);

// NOTE: it is parsed here to retrieve the subcommand information, which is used to change the create command
const argv = await y.parse();

y.version(version)
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
    subcommand: "" | "node";
    projectName: "string";
    nodeName: "string";
    nodeCategory: "string";
    nodeColor: "string";
    nodeInputs: "number";
    nodeOutputs: "number";
  }>(
    "create [subcommand]",
    "Create a new nrg project or node",
    (yargs) => {
      const subcommand = argv._[1];

      const builder = yargs
        .positional("subcommand", {
          describe:
            "Specify what you want to create. If left empty, a project will be created",
          choices: ["node"],
        })
        .option("project-name", {
          alias: "n",
          type: "string",
          description: "What would you like to name your project?",
          hidden: subcommand === "node",
        })
        .option("node-name", {
          alias: subcommand === "node" ? "n" : undefined,
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
          const subcommand = argv.subcommand;
          if (subcommand === "node" && !argv["node-name"]) {
            throw new Error(
              'The --node-name option is required when subcommand is "node".',
            );
          }
          if (subcommand !== "node" && !argv["project-name"]) {
            throw new Error(
              "The --project-name option is required when subcommand is undefined",
            );
          }
          return true;
        });

      if (subcommand === "node") {
        builder
          .example("nrg create node --node-name node-1", "Creates a new node")
          .example(
            "nrg create node -n node-1 --node-category my-category",
            "Creates a new node with name an category",
          );
      } else {
        builder
          .example(
            "nrg create --project-name nrg-project",
            "Creates a new project called nrg-project",
          )
          .example(
            "nrg create -n nrg-project --node-name node-1",
            "Creates a new project and a node",
          );
      }

      return builder;
    },
    async (argv) => {
      const {
        subcommand,
        projectName,
        nodeName,
        nodeCategory,
        nodeColor,
        nodeInputs,
        nodeOutputs,
      } = argv;
      const plopfilePath = getPlopfileFilepath();
      const plop = await nodePlop(plopfilePath);
      if (!subcommand) {
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
      } else if (subcommand === "node") {
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
  .alias("h", "help");

y.parse();