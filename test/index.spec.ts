import { describe, it, expect, vi } from "vitest";
import * as fs from "fs";
import {
  build,
  startNodeRed,
  startWatcher,
  startListener,
  loadConfig,
} from "@allanoricil/nrg-core";

vi.mock("@allanoricil/nrg-core", () => ({
  build: vi.fn(),
  startNodeRed: vi.fn(),
  startWatcher: vi.fn(),
  startListener: vi.fn(),
  loadConfig: vi.fn(),
}));

vi.mock("fs");

describe("cli", () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();

    (fs.readFileSync as vi.Mock).mockReturnValue(
      JSON.stringify({ version: "0.0.0" }),
    );
    process.argv = originalArgv;
  });

  it("should run the build command with prod environment as default", async () => {
    const mockConfig = { build: { environment: "" } };
    (loadConfig as vi.Mock).mockResolvedValueOnce({ config: mockConfig });

    await runCommand("build");

    expect(loadConfig).toHaveBeenCalled();
    expect(build).toHaveBeenCalledWith(mockConfig);
    expect(mockConfig.build.environment).toBe("prod");
  });

  it("should run the build command with prod environment when using --environment", async () => {
    const mockConfig = { build: { environment: "" } };
    (loadConfig as vi.Mock).mockResolvedValueOnce({ config: mockConfig });

    await runCommand("build", "--environment", "prod");

    expect(loadConfig).toHaveBeenCalled();
    expect(build).toHaveBeenCalledWith(mockConfig);
    expect(mockConfig.build.environment).toBe("prod");
  });

  it("should run the build command with prod environment when using -e", async () => {
    const mockConfig = { build: { environment: "" } };
    (loadConfig as vi.Mock).mockResolvedValueOnce({ config: mockConfig });

    await runCommand("build", "-e", "prod");

    expect(loadConfig).toHaveBeenCalled();
    expect(build).toHaveBeenCalledWith(mockConfig);
    expect(mockConfig.build.environment).toBe("prod");
  });

  it("should run the build command with dev environment when using --environment", async () => {
    const mockConfig = { build: { environment: "" } };
    (loadConfig as vi.Mock).mockResolvedValueOnce({ config: mockConfig });

    await runCommand("build", "--environment", "dev");

    expect(loadConfig).toHaveBeenCalled();
    expect(build).toHaveBeenCalledWith(mockConfig);
    expect(mockConfig.build.environment).toBe("dev");
  });

  it("should run the build command with dev environment when using -e", async () => {
    const mockConfig = { build: { environment: "" } };
    (loadConfig as vi.Mock).mockResolvedValueOnce({ config: mockConfig });

    await runCommand("build", "-e", "dev");

    expect(loadConfig).toHaveBeenCalled();
    expect(build).toHaveBeenCalledWith(mockConfig);
    expect(mockConfig.build.environment).toBe("dev");
  });

  it("should run the dev command without a watcher when watch mode is enabled", async () => {
    const mockConfig = { build: {}, dev: {} };
    const mockFilepath = "path/to/config/file";
    (loadConfig as vi.Mock).mockResolvedValueOnce({
      config: mockConfig,
      filepath: mockFilepath,
    });
    (startListener as vi.Mock).mockResolvedValueOnce({
      port: 3000,
      listener: {},
    });

    await runCommand("dev");

    expect(loadConfig).toHaveBeenCalledWith();
    expect(startListener).toHaveBeenCalledWith(mockConfig);
    expect(startWatcher).not.toHaveBeenCalled();
    expect(build).toHaveBeenCalledWith(mockConfig);
    expect(startNodeRed).toHaveBeenCalledWith(mockConfig, {});
  });

  it("should run the dev command with a watcher when watch mode is enabled and using --watch", async () => {
    const mockConfig = { build: {}, dev: {} };
    const mockFilepath = "path/to/config/file";
    (loadConfig as vi.Mock).mockResolvedValueOnce({
      config: mockConfig,
      filepath: mockFilepath,
    });
    (startListener as vi.Mock).mockResolvedValueOnce({
      port: 3000,
      listener: {},
    });

    await runCommand("dev", "--watch");

    expect(loadConfig).toHaveBeenCalledWith();
    expect(startListener).toHaveBeenCalledWith(mockConfig);
    expect(startWatcher).toHaveBeenCalledWith(mockConfig, mockFilepath);
    expect(build).toHaveBeenCalledWith(mockConfig);
    expect(startNodeRed).toHaveBeenCalledWith(mockConfig, {});
    expect(mockConfig.dev.port).toBe(3000);
  });

  it("should run the dev command with a watcher when watch mode is enabled and using -w", async () => {
    const mockConfig = { build: {}, dev: {} };
    const mockFilepath = "path/to/config/file";
    (loadConfig as vi.Mock).mockResolvedValueOnce({
      config: mockConfig,
      filepath: mockFilepath,
    });
    (startListener as vi.Mock).mockResolvedValueOnce({
      port: 3000,
      listener: {},
    });

    await runCommand("dev", "-w");

    expect(loadConfig).toHaveBeenCalledWith();
    expect(startListener).toHaveBeenCalledWith(mockConfig);
    expect(startWatcher).toHaveBeenCalledWith(mockConfig, mockFilepath);
    expect(build).toHaveBeenCalledWith(mockConfig);
    expect(startNodeRed).toHaveBeenCalledWith(mockConfig, {});
    expect(mockConfig.dev.port).toBe(3000);
  });

  it("should run the dev command with debug mode enabled when using --debug", async () => {
    const mockConfig = { build: {}, dev: {} };
    const mockFilepath = "path/to/config/file";
    (loadConfig as vi.Mock).mockResolvedValueOnce({
      config: mockConfig,
      filepath: mockFilepath,
    });
    (startListener as vi.Mock).mockResolvedValueOnce({
      port: 3000,
      listener: {},
    });

    await runCommand("dev", "--debug");

    expect(loadConfig).toHaveBeenCalledWith();
    expect(startListener).toHaveBeenCalledWith(mockConfig);
    expect(startWatcher).not.toHaveBeenCalled();
    expect(build).toHaveBeenCalledWith(mockConfig);
    expect(startNodeRed).toHaveBeenCalledWith(mockConfig, {});
    expect(mockConfig.dev.debug).toBe(true);
  });

  it("should run the dev command with debug mode enabled when using -d", async () => {
    const mockConfig = { build: {}, dev: {} };
    const mockFilepath = "path/to/config/file";
    (loadConfig as vi.Mock).mockResolvedValueOnce({
      config: mockConfig,
      filepath: mockFilepath,
    });
    (startListener as vi.Mock).mockResolvedValueOnce({
      port: 3000,
      listener: {},
    });

    await runCommand("dev", "-d");

    expect(loadConfig).toHaveBeenCalledWith();
    expect(startListener).toHaveBeenCalledWith(mockConfig);
    expect(startWatcher).not.toHaveBeenCalled();
    expect(build).toHaveBeenCalledWith(mockConfig);
    expect(startNodeRed).toHaveBeenCalledWith(mockConfig, {});
    expect(mockConfig.dev.debug).toBe(true);
  });

  it("should run the dev command with open enabled when using --open", async () => {
    const mockConfig = { build: {}, dev: {} };
    const mockFilepath = "path/to/config/file";
    (loadConfig as vi.Mock).mockResolvedValueOnce({
      config: mockConfig,
      filepath: mockFilepath,
    });
    (startListener as vi.Mock).mockResolvedValueOnce({
      port: 3000,
      listener: {},
    });

    await runCommand("dev", "--open");

    expect(loadConfig).toHaveBeenCalledWith();
    expect(startListener).toHaveBeenCalledWith(mockConfig);
    expect(startWatcher).not.toHaveBeenCalled();
    expect(build).toHaveBeenCalledWith(mockConfig);
    expect(startNodeRed).toHaveBeenCalledWith(mockConfig, {});
    expect(mockConfig.dev.open).toBe(true);
  });

  it("should run the dev command with open enabled when using -o", async () => {
    const mockConfig = { build: {}, dev: {} };
    const mockFilepath = "path/to/config/file";
    (loadConfig as vi.Mock).mockResolvedValueOnce({
      config: mockConfig,
      filepath: mockFilepath,
    });
    (startListener as vi.Mock).mockResolvedValueOnce({
      port: 3000,
      listener: {},
    });

    await runCommand("dev", "-o");

    expect(loadConfig).toHaveBeenCalledWith();
    expect(startListener).toHaveBeenCalledWith(mockConfig);
    expect(startWatcher).not.toHaveBeenCalled();
    expect(build).toHaveBeenCalledWith(mockConfig);
    expect(startNodeRed).toHaveBeenCalledWith(mockConfig, {});
    expect(mockConfig.dev.open).toBe(true);
  });
});

async function runCommand(...args) {
  process.argv = ["node", "cli.js", ...args];
  return await import(`../src/index?timestamp=${Date.now()}`);
}
