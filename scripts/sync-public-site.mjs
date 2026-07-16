import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const siteRoot = path.resolve(process.env.TEMBRO_SITE_DIR ?? path.join(root, "..", "azamat-ui"))

const copyTrees = [
  ["src/components", "src/components"],
  ["src/hooks", "src/hooks"],
  ["src/lib", "src/lib"],
  ["src/showcase/demo-snippets", "src/showcase/demo-snippets"],
  ["src/showcase/premium", "src/showcase/premium"],
]

const copyFiles = [
  "registry.json",
  "src/index.ts",
  "src/public-component-surface.ts",
  "src/showcase/component-api-schema.ts",
  "src/showcase/component-route-data.ts",
  "src/showcase/create-demo.tsx",
  "src/showcase/fallback.tsx",
  "src/showcase/index.ts",
  "src/showcase/package-meta.ts",
  "src/showcase/preview-catalog.tsx",
  "src/showcase/preview-compositions.tsx",
  "src/showcase/preview-registry.tsx",
  "src/showcase/registry-quality.ts",
  "src/showcase/registry-specific.tsx",
  "src/showcase/render-registry-preview.tsx",
  "src/showcase/search-utils.ts",
  "src/showcase/site-data.tsx",
  "src/showcase/supplemental.tsx",
  "src/showcase/tembro-registry.json",
  "src/showcase/types.ts",
]

const copyFileTargets = [
  ["src/showcase/package-meta.ts", "src/showcase/site/package-meta.ts"],
  ["src/showcase/tembro-registry.json", "src/showcase/site/tembro-registry.json"],
]

async function assertDirectory(directory, label) {
  const stat = await fs.stat(directory).catch(() => null)
  if (!stat?.isDirectory()) {
    throw new Error(`${label} directory not found: ${directory}`)
  }
}

async function copyTree(sourceRelative, targetRelative) {
  const source = path.join(root, sourceRelative)
  const target = path.join(siteRoot, targetRelative)
  await assertDirectory(source, sourceRelative)
  await fs.mkdir(path.dirname(target), { recursive: true })
  await fs.cp(source, target, { recursive: true })
}

async function copyFile(relativePath) {
  const source = path.join(root, relativePath)
  const target = path.join(siteRoot, relativePath)
  await fs.mkdir(path.dirname(target), { recursive: true })
  await fs.copyFile(source, target)
}

async function copyFileTo(sourceRelativePath, targetRelativePath) {
  const source = path.join(root, sourceRelativePath)
  const target = path.join(siteRoot, targetRelativePath)
  await fs.mkdir(path.dirname(target), { recursive: true })
  await fs.copyFile(source, target)
}

await assertDirectory(siteRoot, "public site")

for (const [source, target] of copyTrees) {
  await copyTree(source, target)
}

for (const file of copyFiles) {
  await copyFile(file)
}

for (const [source, target] of copyFileTargets) {
  await copyFileTo(source, target)
}

console.log(`Public site synced: ${siteRoot}`)
