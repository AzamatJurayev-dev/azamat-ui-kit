import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"

const root = process.cwd()
const sourceRoot = path.join(root, "src", "components")
const forbidden = [
  "zinc",
  "slate",
  "neutral",
  "stone",
  "white",
  "black",
]

const allowedContexts = [
  /dark:disabled:bg-white\/8/,
  /dark:border-white\/12/,
  /dark:bg-white\/6/,
  /dark:bg-white\/8/,
  /dark:text-white\//,
  /text-white/,
  /bg-white/,
  /border-white/,
  /bg-black\/30/,
  /rgba\(255,255,255/,
  /color-mix\(in_oklch,var\(--background\),white_/,
  /color-mix\(in_oklch,var\(--primary\),white_/,
  /color-mix\(in_oklch,var\(--secondary\),white_/,
  /color-mix\(in_oklch,var\(--destructive\),white_/,
]

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)))
      continue
    }

    if (/\.(tsx?|jsx?)$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }

  return files
}

function isAllowed(line) {
  return allowedContexts.some((pattern) => pattern.test(line))
}

const findings = []
const files = await walk(sourceRoot)

for (const file of files) {
  const content = await fs.readFile(file, "utf8")
  const lines = content.split(/\r?\n/)

  lines.forEach((line, index) => {
    if (line.includes("white") || line.includes("black") || line.includes("zinc") || line.includes("slate") || line.includes("neutral") || line.includes("stone")) {
      if (isAllowed(line)) return

      for (const token of forbidden) {
        if (line.includes(token)) {
          findings.push(`${path.relative(root, file)}:${index + 1} -> ${token}`)
          break
        }
      }
    }
  })
}

if (findings.length > 0) {
  console.error("Hardcoded neutral palette usage found in source components:")
  for (const finding of findings) {
    console.error(`- ${finding}`)
  }
  process.exit(1)
}

console.log("No hardcoded neutral palette usage found in source components.")
