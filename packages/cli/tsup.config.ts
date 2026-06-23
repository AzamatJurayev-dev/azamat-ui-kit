import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["../../cli/index.ts"],
  format: ["esm"],
  target: "node18",
  clean: true,
  dts: false,
  sourcemap: false,
  splitting: false,
  minify: true,
  treeshake: true,
  noExternal: ["commander", "prompts", "fs-extra", "execa", "kolorist"],
  outDir: "dist",
  banner: {
    js: "#!/usr/bin/env node"
  }
});
