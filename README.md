# nrg - Node-RED Generator

**nrg** (pronounced "energy") is a CLI tool designed to empower Node-RED developers with speed and efficiency. The name **nrg** stands for **Node-RED Generator**, but it's pronounced like "energy" to symbolize the power and momentum it brings to your workflow. Just as energy drives systems forward, **nrg** accelerates your development process, helping you quickly generate, build, and manage Node-RED nodes and plugins. Whether you're building simple automations or complex integrations, **nrg** ensures that you can focus your energy on writing meaningful code, while it takes care of the setup and scaffolding.

## Current Features

### `nrg build`

The `nrg build` command compiles and packages your Node-RED nodes or plugins, ensuring everything is bundled and ready for deployment.

```bash
nrg build
```

Use this when you're ready to build your project for production.

### `nrg dev`

The nrg dev command starts a development environment for your Node-RED project. This allows you to iterate quickly, testing changes in real-time as you build.

```bash
nrg dev
```

Use this command to work interactively on your custom nodes or plugins, making development faster and smoother.

## Upcomming Features

Here’s a sneak peek at what's coming, once the aforementioned commands are stable.

### `nrg create`

This will be a powerful scaffold generator for Node-RED projects. You’ll soon be able to quickly set up new projects with ease.

```bash
nrg create <project-name>
```

### `nrg create node`

Generate boilerplate code for new Node-RED nodes, with customizable options like inputs, outputs, and categories.

```bash
nrg create node <node-name>
```

### `nrg create plugin`

For more complex use cases, this command will generate a plugin structure for Node-RED, setting up everything you need to build advanced functionality.

```bash
nrg create plugin <plugin-name>
```

## Installation

To get started with nrg, install it as a dev dependency on your `nrg` project, using npm:

```bash
npm install @allanoricil/nrg-cli -D
```

## Usage

```bash
nrg build
nrg dev --watch --debug --open
```

Stay tuned for the upcoming nrg create commands to make project setup even faster.

## Contributing

I welcome contributions! If you'd like to help improve nrg, feel free to open issues or submit pull requests. Your feedback is appreciated.

## License

This project is licensed under the [MIT License](https://github.com/AllanOricil/nrg-cli/blob/main/LICENSE).
