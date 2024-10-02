import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import replace from "@rollup/plugin-replace";

export default [
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.js", format: "es", sourcemap: true }],
    plugins: [
      typescript(),
      replace({
        preventAssignment: true,
        "process.env.RELEASE_TAG": JSON.stringify(process.env.RELEASE_TAG),
      }),
    ],
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
