import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["cli/index.ts"],
    format: ["esm"],
    target: "node18",
    clean: false,
    dts: false,
    sourcemap: false,
    splitting: false,
    outDir: "dist/cli",
    banner: {
        js: "#!/usr/bin/env node",
    },
});