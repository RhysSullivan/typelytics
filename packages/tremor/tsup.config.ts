import { defineConfig } from "tsup";

export default defineConfig((opts) => ({
  entry: ['src/index.ts'],
  format: ["cjs", "esm"],
  clean: !opts.watch,
  dts: true,
  outDir: "dist",
  target: "es2017",
  treeshake: true,
  sourcemap: 'inline',
  minify: true,
  splitting: false,
  external: ['react'],
  injectStyle: false,
}));
