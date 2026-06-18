import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { createRequire } from "node:module"
import { pathToFileURL } from "node:url"

const root = process.cwd()
const distDir = path.join(root, "dist")
const esmPath = path.join(distDir, "index.js")
const cjsPath = path.join(distDir, "index.cjs")
const dtsPath = path.join(distDir, "index.d.ts")

const failures = []

function readRequired(filePath) {
  if (!fs.existsSync(filePath)) {
    failures.push(`${path.relative(root, filePath)} does not exist`)
    return ""
  }

  return fs.readFileSync(filePath, "utf8")
}

const esm = readRequired(esmPath)
readRequired(cjsPath)
const dts = readRequired(dtsPath)

const forbiddenEsmPatterns = [
  { name: "direct React require", pattern: /require\(["']react["']\)/ },
  { name: "direct React DOM require", pattern: /require\(["']react-dom["']\)/ },
  { name: "direct JSX runtime require", pattern: /require\(["']react\/jsx-runtime["']\)/ },
  { name: "direct React Hook Form require", pattern: /require\(["']react-hook-form["']\)/ },
  { name: "Rolldown commonjs require helper", pattern: /(?:__require|commonjsRequire)\s*\(/ },
  { name: "createRequire fallback", pattern: /createRequire\s*\(/ },
  { name: "runtime require guard", pattern: /typeof\s+require\s*!==?\s*["']undefined["']/ },
  { name: "require.resolve fallback", pattern: /require\.resolve\s*\(/ },
]

for (const { name, pattern } of forbiddenEsmPatterns) {
  if (pattern.test(esm)) {
    failures.push(`dist/index.js contains forbidden ESM browser fallback (${name}): ${pattern}`)
  }
}

if (dts.trim().length < 20) {
  failures.push("dist/index.d.ts is empty or too small")
}

if (failures.length === 0) {
  try {
    await import(pathToFileURL(esmPath).href)
  } catch (error) {
    failures.push(`ESM import smoke failed: ${error instanceof Error ? error.message : String(error)}`)
  }
}

if (failures.length === 0) {
  try {
    const require = createRequire(import.meta.url)
    require(cjsPath)
  } catch (error) {
    failures.push(`CJS require smoke failed: ${error instanceof Error ? error.message : String(error)}`)
  }
}

if (failures.length > 0) {
  console.error("Build output smoke check failed:\n")
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log("Build output smoke check passed.")
