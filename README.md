<p align="center">
  <img alt="nrg-icon" src="https://gist.githubusercontent.com/AllanOricil/84412df273de46b28c5d6945b391afd4/raw/0c9cdb994c40ab3d7b7ad06dcee162145d77d531/nrg-icon.svg" style="width: 200px"/>
</p>
<br/>
<p align="center">
  <a href="https://www.npmjs.com/package/@allanoricil/nrg-cli"><img src="https://img.shields.io/npm/v/@allanoricil/nrg-cli.svg" alt="npm package"></a>
  <a href="https://github.com/AllanOricil/nrg-cli/actions/workflows/ci.yaml"><img src="https://github.com/AllanOricil/nrg-cli/actions/workflows/ci.yaml/badge.svg?branch=main" alt="build status"></a>
</p>
<p align="center">
  <a href="https://github.com/AllanOricil/nrg-cli/actions/workflows/windows.yaml"><img src="https://github.com/AllanOricil/nrg-cli/actions/workflows/windows.yaml/badge.svg?branch=main" alt="windows integration tests status"></a>
  <a href="https://github.com/AllanOricil/nrg-cli/actions/workflows/ubuntu.yaml"><img src="https://github.com/AllanOricil/nrg-cli/actions/workflows/ubuntu.yaml/badge.svg?branch=main" alt="ubuntu integration tests status"></a>
  <a href="https://github.com/AllanOricil/nrg-cli/actions/workflows/macos.yaml"><img src="https://github.com/AllanOricil/nrg-cli/actions/workflows/macos.yaml/badge.svg?branch=main" alt="macos integration tests status"></a>
</p>

# ⚡️ nrg - Node-RED Generator

**nrg** (pronounced "energy") is a CLI tool designed to empower Node-RED developers with speed and efficiency. The name **nrg** stands for **Node-RED Generator**, but it's pronounced like "energy" to symbolize the power and momentum it brings to your workflow. Just as energy drives systems forward, **nrg** accelerates your development process, helping you quickly generate, build, and manage Node-RED nodes and plugins. Whether you're building simple automations or complex integrations, **nrg** ensures that you can focus your energy on writing meaningful code, while it takes care of the setup and scaffolding.

Clearly, the best model to write nodes for Node-RED.

## 💡 Examples

| Name                          | Repository                                                   |
| ----------------------------- | ------------------------------------------------------------ |
| nrg-template                  | https://github.com/AllanOricil/nrg-template                  |
| node-red-oidc-provider        | https://github.com/AllanOricil/node-red-oidc-provider        |
| node-red-salesforce           | https://github.com/AllanOricil/node-red-salesforce           |
| node-red-spreadsheet-template | https://github.com/AllanOricil/node-red-spreadsheet-template |

## 🛠️ Integrated Toolchain

This CLI comes with a set of embedded tools to streamline your development workflow. These tools are preconfigured to handle common tasks such as bundling, transpiling, and optimizing assets, so you can focus on building your project without manual setup.

- [esbuild](https://github.com/AllanOricil/nrg/blob/e68363270c09a183a26bdfb8580b30fd2e74c7fd/package.json#L58): A fast and highly efficient JavaScript bundler and minifier.
- [postcss](https://github.com/AllanOricil/nrg/blob/e68363270c09a183a26bdfb8580b30fd2e74c7fd/package.json#L67): A powerful tool for transforming CSS with plugins, enabling features like autoprefixing, nesting, and custom properties.
- [html-minifier-terser](https://github.com/AllanOricil/nrg/blob/e68363270c09a183a26bdfb8580b30fd2e74c7fd/package.json#L62): A tool to minify and optimize HTML files, reducing file size for faster loading times.

These integrated tools help ensure your code is optimized and production-ready with minimal configuration.

> [!NOTE]
>
> In the future, [esbuild](https://esbuild.github.io/) will be replaced by [rolldown](https://rolldown.rs/)

## ✨ Commands

> [!WARNING]
>
> [Sentry](https://sentry.io/) is used to collect metrics, traces and errors while running the CLI. Read more about it in the [Telemetry](#-telemetry) section of this document.

### ⬛ `nrg build`

The `nrg build` command compiles and packages your Node-RED nodes or plugins, ensuring everything is bundled and ready for deployment.

```bash
nrg build
```

Use this command when you're ready to build your project for production. The default settings used to bundle your javascript can be found
[here](https://github.com/AllanOricil/nrg/blob/main/defaults/nrg.json). You can override any of those properties for both `prod` and `dev` builds.

### ⬛ `nrg dev`

The nrg dev command starts a development environment for your Node-RED project. This allows you to iterate quickly, testing changes in real-time as you build.

```bash
nrg dev
```

Use this command to work interactively on your custom nodes or plugins, making development faster and smoother. As mentioned before, the default settings used to bundle your javascript can be found [here](https://github.com/AllanOricil/nrg/blob/main/defaults/nrg.json), and you can override any of these properties changing `build.dev.server` or `build.dev.client`.

In order to run a `prod` build locally, use the following command `nrg dev -o -e prod`.

### ⬛ `nrg create`

Use this command to create an nrg project with ease.

```bash
nrg create -n <project-name>
```

### ⬛ `nrg create node`

Use this command to create node-red nodes for an nrg project.

```bash
nrg create node -n <node-name>
```

For more details about `nrg` commands, run

```bash
nrg --help
```

## 🗂️ Base Project Directory Structure

```bash
my-custom-nodes/
├── package.json
├── nrg.config.js
└── src/
    └── nodes/
        └── node-type/
            ├── client/
            │   ├── locales/
            │   │   ├── labels/
            │   │   │   ├── de.json
            │   │   │   └── en-US.json
            │   │   └── docs/
            │   │       ├── de.html
            │   │       └── en-US.html
            │   ├── icons/
            │   │   └── icon-1.png
            │   ├── stylesheet.scss
            │   ├── index.html
            │   └── index.js
            └── server/
                └── index.js
```

| Folder      | Description                                                                                                                                                                                                                                                                                        | Required |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| nodes       | It is where all nodes must be located                                                                                                                                                                                                                                                              | ✅       |
| {node-type} | It is the name used by node-red to uniquely identify the type of your node. It is used in many places by the builder, such as to register your node using `RED.nodes.registerType("{node-type")`, or when generating boilerplate code for docs `<script type="text/html" data-type="{node-type"}>` | ✅       |
| client      | Use this directory to store the assets shown in the editor: locales, icons, stylesheets, html and javascript.                                                                                                                                                                                      | ✅       |
| locales     | Use this directory to store docs and labels.                                                                                                                                                                                                                                                       |          |
| labels      | Use this directory to store your labels as .json files. Labels are scoped by the node's type, and they can be retrieved at runtime with `this._("{node-type}.label")` or `RED._("{node-type}.label")`                                                                                              |          |
| docs        | Use this directory to store your html docs.                                                                                                                                                                                                                                                        |          |
| icons       | Use this directory to store the icons.                                                                                                                                                                                                                                                             |          |
| server      | Use this directory to write the server side javascript of your node.                                                                                                                                                                                                                               | ✅       |

### Client Entrypoint

The client entrypoint must be named as `index.js`, and it must export a default object as follows:

```js
export default {
  category: "custom nodes",
  color: "#FFFFFF",
  defaults: {
    name: { value: "" },
  },
  inputs: 1,
  outputs: 1,
  icon: "icon-3.png",
  align: "left",
  paletteLabel: function () {
    return this.name || this._("node-3.name") || "node-3";
  },
  label: function () {
    return this.name || this._("node-3.name") || "node-3";
  },
  oneditprepare: function () {},
  oneditcancel: function () {},
  oneditdelete: function () {},
};
```

Available properties can be found in this Node-RED [doc](https://nodered.org/docs/creating-nodes/node-html#node-definition).

### Server Entrypoint

The server entrypoint must be named as `index.js`, and it must export a default class as follows:

```js
import { Node } from "@allanoricil/nrg-nodes";

export default class Node1 extends Node {
  // NOTE: executed every time an instance of your node is created
  constructor(config) {
    super(config);
  }

  // NOTE: executed once, when the type is registered
  static init() {}

  // NOTE: use it if your node has settings
  static settings() {}

  // NOTE: use it if your node stores credentials
  static credentials() {}

  // NOTE: it can be async. You don't need to call this.on("input") anymore
  onInput(msg, send, done) {}

  // NOTE: it can be async. You don't need to call this.on("close") anymore
  onClose(removed, done) {}
}
```

All available methods can be found [here](https://github.com/AllanOricil/node-red-node/blob/main/src/node.js).

#### `static settings`

Use this method to configure custom settings for your node. It must return an object as follows:

```js
static settings(){
	return {
		exampleSetting: {
			value: "default",
			exportable: true
		}
	}
}
```

The `exampleSetting` attribute shown above will be accessible in the editor, and server, as `RED.settings.myNodeExampleSetting`, where `my-node` is the Node's type. Read more about it in this Node-RED [doc](https://nodered.org/docs/creating-nodes/node-js#custom-node-settings).

#### `static credentials`

Use this method to configure the credentials available to your node. It must return an object as follows:

```js
static credentials(){
	return {
		username: { type:"text" },
		password: { type:"password" }
	}
}
```

Read more about it in this Node-RED [doc](https://nodered.org/docs/creating-nodes/credentials).

#### Context

Inside the Node's class, you can access context stores as follows:

```js
// NOTE: Node's context
this.context().get("key");
this.context().set("key", value);

// NOTE: Flow context
this.flowContext.get("key");
this.flowContext.set("key", value);

// NOTE: Global context
this.globalContext.get("key");
this.globalContext.set("key", value);
```

Read more aobut it in this Node-RED [doc](https://nodered.org/docs/creating-nodes/context).

## ⚙️ Configuration File

In the root of an `nrg` project, there must exist a config file. This config must be any of the following formats:

```base
.nrgrc.json
.nrgrc.js
.nrgrc.cjs
nrg.config.json
nrg.config.js
nrg.config.cjs
.config/nrgrc
.config/nrg.json
.config/nrg.js
.config/nrg.cjs
```

You can also choose to have an `nrg` object in the root of your `package.json`.

These are all the properties you can configure:

```js
module.exports = {
  version: "0.0.0", // controls the schema version of the config file.
  dev: {
    watch: {
      paths: [], // additional paths that will trigger a rebuild
    },
  },
  build: {
    environment: "prod", // it can be either prod or dev. If absent, it defaults to prod.
    server: {
      // global esbuild settings. Use it to override both prod and dev build settings
    },
    client: {
      // global esbuild settings. Use it to override both prod and dev build settings
    },
    dev: {
      // dev build settings
      server: {
        // esbuild settings used to build the server side javascript of your node
      },
      client: {
        // esbuild settings used to build the client side javascript of your node
      },
    },
    prod: {
      // prod build settings
      server: {
        // esbuild settings used to build the server side javascript of your node
      },
      client: {
        // esbuild settings used to build the client side javascript of your node
      },
    },
  },
  nodeRed: {}, // Node-RED settings properties that are used when node-red is started
};
```

The javascript is processed by `esbuild`. You can use any `esbuild` settings, including plugins. To find a complete list of properties `esbuild` has, read their [doc](https://esbuild.github.io/api/#general-options). To use a plugin, make sure your config file is either `.js` or `.cjs`, and that it exports seetings as shown below. For example, the following `nrg.config.js` is using the `esbuild-vue` plugin to build vue components.

```js
const vuePlugin = require("esbuild-vue");

module.exports = {
  version: "0.0.0",
  build: {
    client: {
      plugins: [
        vuePlugin({
          production: true,
        }),
      ],
    },
  },
};
```

All Node-RED settings that you can use with `nodeRed` can be found in this Node-RED [doc](https://nodered.org/docs/user-guide/runtime/configuration).

## 📦 `package.json`

Below is the bare minimum `package.json` configuration. Attention for the `node-red.nodes.nodes` property. It must be `dist/index.js`, which is the entrypoint of the build that is located in the `dist` folder. In the future you won't need to setup this by hand.

```json
{
  "name": "package-name",
  "version": "0.0.0",
  "description": "Package description",
  "engines": {
    "node": ">=18",
    "npm": ">=10"
  },
  "scripts": {
    "build": "nrg build",
    "build:dev": "nrg build -e dev",
    "watch": "nrg dev -w -o",
    "watch:debug": "nrg dev -w -o -d",
    "start": "nrg dev -o",
    "start:debug": "nrg dev -o -d",
    "start:prod": "nrg dev -o -d -e prod"
  },
  "node-red": {
    "version": ">=3.1",
    "nodes": {
      "nodes": "dist/index.js"
    }
  },
  "dependencies": {},
  "devDependencies": {
    "@allanoricil/nrg-cli": "2.0.0"
  }
}
```

The cli must be added as a dev dependency because it has the following peer dependencies `@allanoricil/node-red-node` and `node-red` , which must be available in the working directory, inside the `node_modules` directory, at the moment of the build.

## 🔮 Upcomming Features

Here’s a sneak peek at what's coming, once the aforementioned commands are stable.

### ⬛ `nrg create plugin`

For more complex use cases, this command will generate a plugin structure for Node-RED, setting up everything you need to build advanced functionality.

```bash
nrg create plugin <plugin-name>
```

### ⬛ `nrg create node --type widget`

This command will generate a node for dashboard 2.0.

```bash
nrg create node --type widget <node-name>
```

## ⬇️ Installation

To get started with nrg, install it as a dev dependency on your `nrg` project, using npm:

```bash
npm install @allanoricil/nrg-cli -D
```

You can also install it globally, using the following command

```bash
npm install @allanoricil/nrg-cli -g
```

## 📊 Telemetry

This project uses [Sentry](https://sentry.io/) to collect anonymous telemetry data to help improve the CLI tool's functionality and user experience. Below is an outline of what data is collected:

### What Data is Collected?

- **Commands Executed**: The specific CLI commands that are run.
- **Command Arguments**: The arguments passed to the CLI commands (excluding sensitive information like passwords, API keys, or other personal data).
- **Errors and Exceptions**: If a command encounters an error or exception, details about the error (such as stack traces) are captured to aid in debugging and improving the tool.

### How is the Data Used?

- **Improving Features**: Understanding which commands and options are used most frequently helps prioritize new features and updates.
- **Debugging**: Error reports assist in identifying bugs and ensuring the tool works smoothly.
- **Performance Monitoring**: Sentry allows us to monitor the performance of the CLI to ensure it is efficient and responsive.

### Data Privacy

- **No Personal Information**: We do not collect any personally identifiable information (PII). Sensitive data like passwords, tokens, or confidential user input is never collected or logged.
- **Anonymized Data**: All telemetry data is anonymous and used only for the purposes outlined above.

### Opting Out

If you prefer not to send telemetry data, you can disable it by setting an environment variable:

```bash
export NRG_DISABLE_TELEMETRY=true
```

Alternatively, you can use the `--no-telemetry` flag with each command to disable telemetry.

## 🤝 Contributing

I welcome contributions! If you'd like to help improve nrg, feel free to open issues or submit pull requests. Your feedback is appreciated.

## 📜 License

This project is licensed under the [MIT License](https://github.com/AllanOricil/nrg-cli/blob/main/LICENSE).

## 💖 Become a Sponsor

If this CLI has made your life easier, consider supporting its development by clicking the button below.

<a href="https://www.buymeacoffee.com/allanoricil" target="_blank">
  <img
      src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
      alt="Buy Me A Coffee"
      style="width: 217px;" />
</a>
