import fs from "node:fs"
import path from "node:path"
import process from "node:process"

import { buildPublicComponentApiMarkdown } from "./generate-public-component-api.mjs"

const root = process.cwd()
const outputPath = path.join(root, "PUBLIC_COMPONENT_API.md")

if (!fs.existsSync(outputPath)) {
  console.error("Public API docs check failed:")
  console.error("- PUBLIC_COMPONENT_API.md is missing")
  process.exit(1)
}

const actual = fs.readFileSync(outputPath, "utf8")
const expected = `${buildPublicComponentApiMarkdown()}\n`

if (actual !== expected) {
  console.error("Public API docs check failed:")
  console.error("- PUBLIC_COMPONENT_API.md is out of date")
  console.error("- Run: npm run docs:public-api")
  process.exit(1)
}

console.log("Public API docs check passed.")

