import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))

const files = [
  "cli/templates/theme-css.ts",
  "templates/styles/globals.css",
  "packages/cli/vendor/templates/styles/globals.css",
]

const requiredTokens = [
  "--aui-radius-control",
  "--aui-control-height-md",
  "--aui-control-surface",
  "--aui-control-border-strong",
  "--aui-card-radius",
  "--aui-overlay-surface",
  "--aui-overlay-footer-bg",
  "--aui-sidebar-item-active-bg",
  "--aui-sidebar-nav-item-active-bg",
  "--aui-table-toolbar-bg",
  "--aui-table-row-selected-bg",
]

const requiredSelectors = [
  '[data-slot="button"]',
  '[data-slot="input"]',
  '[data-slot="select-trigger"]',
  '[data-slot="dialog-content"]',
  '[data-slot="dialog-footer"]',
  '[data-slot="data-table-wrapper"]',
  '[data-slot="data-table-toolbar"]',
  '[data-slot="app-sidebar-item"]',
  '[data-slot="sidebar-nav-item"]',
]

const failures = []

for (const file of files) {
  const source = readFileSync(join(rootDir, file), "utf8")

  for (const token of requiredTokens) {
    if (!source.includes(token)) {
      failures.push(`${file}: missing token ${token}`)
    }
  }

  for (const selector of requiredSelectors) {
    if (!source.includes(selector)) {
      failures.push(`${file}: missing selector ${selector}`)
    }
  }
}

if (failures.length > 0) {
  console.error("Theme contract check failed:")
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log("Theme contract check passed")
