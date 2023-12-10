import { defineConfig } from "tsup";

export default defineConfig((opts) => ({
  entryPoints: ["src/index.ts"],
  format: ["cjs", "esm"],
  clean: !opts.watch,
  dts: true,
  outDir: "dist",
  target: "es2017",
}));
