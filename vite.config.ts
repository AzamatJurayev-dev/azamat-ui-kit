import fs from "node:fs";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const externalPackages = [
  "react",
  "react-dom",
  "react-dom/client",
  "react/jsx-runtime",
  "react-hook-form",
  "@base-ui/react",
  "@base-ui/react/button",
  "@base-ui/react/menu",
  "@base-ui/react/use-render",
  "@base-ui/react/merge-props",
  "@tanstack/react-table",
  "class-variance-authority",
  "clsx",
  "cmdk",
  "lucide-react",
  "tailwind-merge",
];

const isExternal = (id: string) => externalPackages.some((dependency) => id === dependency || id.startsWith(`${dependency}/`));

function collectBuildEntries(directory: string): string[] {
  const entries: string[] = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      entries.push(...collectBuildEntries(fullPath));
      continue;
    }

    const isSourceFile = fullPath.endsWith(".ts") || fullPath.endsWith(".tsx");
    const isIgnoredFile =
      fullPath.endsWith(".test.ts") ||
      fullPath.endsWith(".test.tsx") ||
      fullPath.endsWith(".stories.tsx") ||
      fullPath.endsWith(".d.ts");

    if (isSourceFile && !isIgnoredFile) {
      entries.push(fullPath);
    }
  }

  return entries;
}

const sourceEntries = collectBuildEntries(path.resolve(__dirname, "src"));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: false,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "AzamatUiKit",
      formats: ["es", "cjs"],
      fileName: (format, entryName) => `${entryName}.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      input: sourceEntries,
      external: isExternal,
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        exports: "named",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-dom/client": "ReactDOMClient",
          "react/jsx-runtime": "jsxRuntime",
          "react-hook-form": "ReactHookForm",
        },
      },
    },
  },
});
