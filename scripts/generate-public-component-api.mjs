import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

import { publicComponentApiDocs } from "./public-api-docs-data.mjs"

const root = process.cwd()
const packageJsonPath = path.join(root, "package.json")
const outputPath = path.join(root, "PUBLIC_COMPONENT_API.md")

function readPackageVersion() {
  const content = fs.readFileSync(packageJsonPath, "utf8")
  return JSON.parse(content).version
}

function renderTable(rows) {
  const lines = [
    "| Prop | Type | Notes |",
    "| --- | --- | --- |",
  ]

  for (const [name, type, notes] of rows) {
    lines.push(`| \`${name}\` | \`${type}\` | ${notes} |`)
  }

  return lines.join("\n")
}

function renderDoc(doc) {
  return [
    `## ${doc.title}`,
    "",
    `- Canonical route: \`${doc.route}\``,
    `- Summary: ${doc.summary}`,
    "",
    "### Use When",
    "",
    ...doc.useWhen.map((item) => `- ${item}`),
    "",
    "### Related Helpers",
    "",
    doc.related.map((item) => `\`${item}\``).join(", "),
    "",
    "### Prop Highlights",
    "",
    renderTable(doc.props),
    "",
  ].join("\n")
}

export function buildPublicComponentApiMarkdown() {
  const version = readPackageVersion()

  return [
    "# Public Component API",
    "",
    `Generated from \`scripts/public-api-docs-data.mjs\` for package version \`${version}\`.`,
    "",
    "This file tracks the canonical public docs entries that should lead the product mental model.",
    "Related helpers can stay public, but they should be introduced from the canonical surface detail page instead of being taught as separate first-level names.",
    "",
    ...publicComponentApiDocs.map((doc) => renderDoc(doc)),
  ].join("\n")
}

function writePublicComponentApiMarkdown() {
  const markdown = buildPublicComponentApiMarkdown()
  fs.writeFileSync(outputPath, `${markdown}\n`, "utf8")
  console.log(`Wrote ${path.relative(root, outputPath)}`)
}

const currentFilePath = fileURLToPath(import.meta.url)

if (process.argv[1] && path.resolve(process.argv[1]) === currentFilePath) {
  writePublicComponentApiMarkdown()
}
