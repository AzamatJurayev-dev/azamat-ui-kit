import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const root = process.cwd()
const inventoryPath = path.join(root, "PUBLIC_API_INVENTORY.md")
const publicApiPath = path.join(root, "PUBLIC_COMPONENT_API.md")
const distIndexPath = path.join(root, "dist", "index.d.ts")

const sectionTitle = "## Canonical Root Surface"
const headingTitle = "## Hidden From First-Level Docs"

function readFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required file: ${filePath}`)
  }
  return fs.readFileSync(filePath, "utf8")
}

function extractSection(text, title) {
  const lines = text.split(/\r?\n/)
  const start = lines.findIndex((line) => line.trim() === title)
  if (start < 0) return ""
  const end = lines.slice(start + 1).findIndex((line) => /^##\s/.test(line))
  return lines.slice(start + 1, end < 0 ? lines.length : start + 1 + end).join("\n")
}

function parseBacktickNames(text) {
  const names = new Set()
  for (const match of text.matchAll(/`([A-Za-z_$][A-Za-z0-9_$]*)`/g)) {
    names.add(match[1])
  }
  return names
}

function resolveDtsModule(baseDir, specifier) {
  const normalized = specifier.startsWith(".")
    ? path.resolve(baseDir, specifier)
    : path.resolve(root, specifier)

  const candidates = [
    `${normalized}.d.ts`,
    `${normalized}.d.mts`,
    `${normalized}.d.cts`,
    path.join(normalized, "index.d.ts"),
  ]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate
    }
  }

  throw new Error(`Cannot resolve declaration module: ${specifier} from ${baseDir}`)
}

function collectExportedNames(filePath, seen = new Set(), exports = new Set()) {
  const resolvedPath = path.resolve(filePath)
  if (seen.has(resolvedPath)) return exports
  seen.add(resolvedPath)

  const fileDir = path.dirname(resolvedPath)
  const text = fs.readFileSync(resolvedPath, "utf8")

  const namedExportFromPattern = /export\s*\{\s*([^}]+)\s*\}\s*from\s+['"](.+?)['"]/g
  for (const match of text.matchAll(namedExportFromPattern)) {
    const names = match[1]
    for (const segment of names.split(",")) {
      const entry = segment.trim()
      if (!entry) continue
      const asMatch = entry.match(/^(?:type\s+)?([A-Za-z_$][A-Za-z0-9_$]*)(?:\s+as\s+([A-Za-z_$][A-Za-z0-9_$]*))?$/)
      if (!asMatch) continue
      exports.add(asMatch[2] ?? asMatch[1])
    }
  }

  const namedExportPattern = /export\s*\{\s*([^}]+)\s*\}\s*;/g
  for (const match of text.matchAll(namedExportPattern)) {
    const names = match[1]
    for (const segment of names.split(",")) {
      const entry = segment.trim()
      if (!entry) continue
      const asMatch = entry.match(/^(?:type\s+)?([A-Za-z_$][A-Za-z0-9_$]*)(?:\s+as\s+([A-Za-z_$][A-Za-z0-9_$]*))?$/)
      if (!asMatch) continue
      exports.add(asMatch[2] ?? asMatch[1])
    }
  }

  const starExportPattern = /export\s+\*\s+from\s+['"](.+?)['"]/g
  for (const match of text.matchAll(starExportPattern)) {
    const child = resolveDtsModule(fileDir, match[1])
    collectExportedNames(child, seen, exports)
  }

  const declarationExportPattern = /export\s+(?:type|interface|const|let|var|function|class|enum)\s+([A-Za-z_$][A-Za-z0-9_$]*)/g
  for (const match of text.matchAll(declarationExportPattern)) {
    exports.add(match[1])
  }

  return exports
}

function extractComponentApiHeadings(text) {
  const names = new Set()
  for (const match of text.matchAll(/^##\s+([A-Za-z_$][A-Za-z0-9_$]*)/gm)) {
    if (match[1] !== "Public" && match[1] !== "Component" && match[1] !== "API") {
      names.add(match[1])
    }
  }
  return names
}

function main() {
  if (!fs.existsSync(distIndexPath)) {
    throw new Error("dist/index.d.ts not found. Run `npm run build:lib` before inventory checks.")
  }

  const inventoryText = readFile(inventoryPath)
  const publicApiText = readFile(publicApiPath)
  const canonicalText = extractSection(inventoryText, sectionTitle)
  const hiddenText = extractSection(inventoryText, headingTitle)

  const canonicalNames = parseBacktickNames(canonicalText)
  const hiddenNames = parseBacktickNames(hiddenText)
  const publicApiNames = extractComponentApiHeadings(publicApiText)

  const rootExports = collectExportedNames(distIndexPath)

  const missingCanonical = [...canonicalNames].filter((name) => !rootExports.has(name))
  if (missingCanonical.length > 0) {
    console.error("PUBLIC_API_INVENTORY mismatch: Canonical Root Surface has names not in root exports")
    for (const name of missingCanonical) {
      console.error(`- Missing from dist/index.d.ts: ${name}`)
    }
    process.exit(1)
  }

  const undocumented = [...publicApiNames].filter((name) => !canonicalNames.has(name))
  if (undocumented.length > 0) {
    console.error("PUBLIC_API_INVENTORY mismatch: PUBLIC_COMPONENT_API contains names not in Canonical Root Surface")
    for (const name of undocumented) {
      console.error(`- Extra docs entry: ${name}`)
    }
    process.exit(1)
  }

  const extraCanonical = [...hiddenNames].filter((name) => canonicalNames.has(name))
  if (extraCanonical.length > 0) {
    console.error("PUBLIC_API_INVENTORY mismatch: Hidden section must not contain canonical root names")
    for (const name of extraCanonical) {
      console.error(`- Also listed as hidden: ${name}`)
    }
    process.exit(1)
  }

  console.log("PUBLIC_API_INVENTORY alignment check passed.")
}

const currentFile = fileURLToPath(import.meta.url)

if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  main()
}
