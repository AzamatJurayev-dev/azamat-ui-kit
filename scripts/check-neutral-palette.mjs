import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"

const root = process.cwd()
const sourceRoot = path.join(root, "src", "components")

const hardcodedClassRegex =
  /\b(?:bg|text|border|ring|outline|placeholder|decoration|fill|stroke|from|via|to)-[a-z0-9-]*(?:white|black|neutral|slate|zinc|stone)(?:\/[0-9.]+%?)?\b/gi

const allowedContexts = [
  /rgba\(255,255,255,/,
  /rgba\(0,0,0,/,
  /color-mix\(in_oklch,var\(--(background|primary|secondary|destructive|muted|card|popover|foreground|border|input|ring|accent|chart-[1-5]),/,
  /color-mix\(in_oklch,var\(--chart-/,
  /bg-(?:blue|amber|emerald|red|yellow|green|orange|purple|sky|teal|rose|cyan|indigo|violet|pink)-\d{3,4}[^"]*text-white/,
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
    if (!line.includes("white") && !line.includes("black") && !line.includes("zinc") && !line.includes("slate") && !line.includes("neutral") && !line.includes("stone")) {
      return
    }

    if (isAllowed(line)) return

    const matches = line.match(hardcodedClassRegex)
    if (matches?.length) {
      findings.push(`${path.relative(root, file)}:${index + 1} -> ${line.trim()}`)
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
