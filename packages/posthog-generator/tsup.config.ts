import { defineConfig } from "tsup";

export default defineConfig((opts) => ({
  entryPoints: ["src/bin.ts"],
  format: ["cjs", "esm"],
  clean: !opts.watch,
  dts: true,
  outDir: "dist",
  target: "es2017",
}));
