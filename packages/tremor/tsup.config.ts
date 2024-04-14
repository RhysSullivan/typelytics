import { defineConfig } from "tsup";

export default defineConfig((opts) => ({
  format: ["cjs", "esm"],
  clean: !opts.watch,
  dts: true,
  outDir: "dist",
  target: "es2017",
  splitting: true,
  sourcemap: true,
  minify: true,
  entry: ["src/index.ts"],
}));
