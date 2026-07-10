import fs from "node:fs"
import path from "node:path"
import process from "node:process"

const root = process.cwd()
const distDir = path.join(root, "dist")
const srcDistDir = path.join(distDir, "src")

if (!fs.existsSync(srcDistDir)) {
  console.log("No nested dist/src output detected.")
  process.exit(0)
}

function wrapJavaScript(sourcePath, targetPath, kind) {
  const rawRelativeSource = path.relative(path.dirname(targetPath), sourcePath).split(path.sep).join("/")
  const relativeSource = rawRelativeSource.startsWith(".") ? rawRelativeSource : `./${rawRelativeSource}`
  const content =
    kind === "cjs"
      ? `module.exports = require("${relativeSource}")\n`
      : `export * from "${relativeSource}"\n`

  fs.mkdirSync(path.dirname(targetPath), { recursive: true })
  fs.writeFileSync(targetPath, content)
}

function copyDeclarations(sourcePath, targetPath) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true })
  fs.copyFileSync(sourcePath, targetPath)
}

function walk(sourceDir, relativeDir = "") {
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name)
    const nextRelativeDir = path.join(relativeDir, entry.name)

    if (entry.isDirectory()) {
      walk(sourcePath, nextRelativeDir)
      continue
    }

    if (entry.name.endsWith(".js")) {
      wrapJavaScript(sourcePath, path.join(distDir, nextRelativeDir), "esm")
      continue
    }

    if (entry.name.endsWith(".cjs")) {
      wrapJavaScript(sourcePath, path.join(distDir, nextRelativeDir), "cjs")
      continue
    }

    if (entry.name.endsWith(".d.ts")) {
      copyDeclarations(sourcePath, path.join(distDir, nextRelativeDir))
    }
  }
}

walk(srcDistDir)

console.log("Generated dist/* wrappers that forward to dist/src/*.")
