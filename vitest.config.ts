import path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["tests/render/**/*.test.ts", "tests/render/**/*.test.tsx"],
    restoreMocks: true,
    clearMocks: true,
    mockReset: true,
  },
})
