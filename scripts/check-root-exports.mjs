import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const failures = []

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8")
}

function extractExportSources(sourceText) {
  return Array.from(sourceText.matchAll(/export\s+\*\s+from\s+['"](.+?)['"]/g)).map((match) => match[1])
}

function isNestedUnder(parentSource, childSource) {
  return childSource.startsWith(`${parentSource}/`)
}

const rootIndex = readText("src/index.ts")
const displayIndex = readText("src/components/display/index.ts")
const rootSources = extractExportSources(rootIndex)

for (const source of new Set(rootSources)) {
  const nestedSources = rootSources.filter((candidate) => candidate !== source && isNestedUnder(source, candidate))

  for (const nestedSource of nestedSources) {
    failures.push(`src/index.ts redundantly exports '${nestedSource}' because parent barrel '${source}' is already exported`)
  }
}

if (/export\s+\*\s+from\s+["']\.\/smart-card["']/.test(displayIndex)) {
  failures.push("src/components/display/index.ts should not wildcard-export './smart-card'; use canonical InfoCard alias export instead")
}

if (!/SmartCard\s+as\s+InfoCard/.test(displayIndex)) {
  failures.push("src/components/display/index.ts must expose InfoCard as the canonical smart-card export")
}

if (failures.length > 0) {
  console.error("Root export governance check failed:")
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log("Root export governance check passed.")
