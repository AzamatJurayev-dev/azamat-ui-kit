import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isSiteBuild = mode === "site";

  return {
    plugins: [
      react(),
      tailwindcss(),
      ...(isSiteBuild
        ? []
        : [
            dts({
              insertTypesEntry: true,
            }),
          ]),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: isSiteBuild
      ? {
          outDir: "dist-site",
        }
      : {
          lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "AzamatUiKit",
            formats: ["es", "cjs"],
            fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
          },
          rollupOptions: {
            external: [
              "react",
              "react-dom",
              "react/jsx-runtime",
              "react-hook-form"
            ],
            output: {
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
                "react/jsx-runtime": "jsxRuntime",
                "react-hook-form": "ReactHookForm"
              },
            },
          },
        },
  };
});
