import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { createHash } from "node:crypto"

const root = process.cwd()
const vendorRoot = path.join(root, "packages", "cli", "vendor")
const failures = []
const sourceRoots = ["src/components", "src/hooks", "src/lib"]

function ignored(relativePath) {
  const name = path.basename(relativePath)
  return name === "demo.tsx" || name.endsWith(".stories.tsx") || name.endsWith(".test.tsx")
}

async function filesUnder(directory, base = directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await filesUnder(target, base))
    else files.push(path.relative(base, target).replaceAll(path.sep, "/"))
  }
  return files
}

async function digest(filePath) {
  return createHash("sha256").update(await fs.readFile(filePath)).digest("hex")
}

for (const sourceRoot of sourceRoots) {
  const sourceDirectory = path.join(root, sourceRoot)
  const vendorDirectory = path.join(vendorRoot, sourceRoot)
  const sourceFiles = (await filesUnder(sourceDirectory)).filter((file) => !ignored(file)).sort()
  const vendorFiles = (await filesUnder(vendorDirectory)).filter((file) => !ignored(file)).sort()

  if (JSON.stringify(sourceFiles) !== JSON.stringify(vendorFiles)) {
    failures.push(`${sourceRoot}: vendor file list differs from source`)
    continue
  }

  for (const file of sourceFiles) {
    if (await digest(path.join(sourceDirectory, file)) !== await digest(path.join(vendorDirectory, file))) {
      failures.push(`${sourceRoot}/${file}: vendor content differs from source`)
    }
  }
}

try {
  await fs.access(path.join(vendorRoot, "src", "showcase"))
  failures.push("vendor/src/showcase must not be published")
} catch {}

if (failures.length) {
  console.error("CLI vendor contract failed:")
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log("CLI vendor contract passed")
