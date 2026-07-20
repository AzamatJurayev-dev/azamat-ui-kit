import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./tests/visual",
  timeout: 30_000,
  fullyParallel: true,
  reporter: "line",
  use: {
    baseURL: process.env.TEMBRO_VISUAL_URL ?? "http://127.0.0.1:5173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop-light", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 }, colorScheme: "light" } },
    { name: "desktop-dark", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 }, colorScheme: "dark" } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
})
