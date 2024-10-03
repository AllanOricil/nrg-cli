import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.js", format: "es", sourcemap: true }],
    plugins: [typescript()],
    external: ["./node_modules/node-machine-id"],
  },
  {
    input: "src/index.ts",
    output: { file: "dist/index.d.ts", format: "es" },
    plugins: [dts()],
  },
  {
    input: "src/postinstall.ts",
    output: [{ file: "dist/postinstall.js", format: "es" }],
    plugins: [typescript()],
  },
];
