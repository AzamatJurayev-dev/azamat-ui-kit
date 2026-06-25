import fs from "node:fs"
import path from "node:path"
import process from "node:process"

const root = process.cwd()
const sources = [
  {
    name: "root package",
    path: path.join(root, "package.json"),
    getVersion: (content) => {
      const parsed = JSON.parse(content)
      return parsed.version
    },
  },
  {
    name: "CLI package",
    path: path.join(root, "packages", "cli", "package.json"),
    getVersion: (content) => {
      const parsed = JSON.parse(content)
      return parsed.version
    },
  },
  {
    name: "registry",
    path: path.join(root, "registry.json"),
    getVersion: (content) => {
      const parsed = JSON.parse(content)
      return parsed.version
    },
  },
  {
    name: "CLI runtime",
    path: path.join(root, "cli", "index.ts"),
    getVersion: (content) => {
      const match = content.match(/\.version\(["']([^"']+)["']\)/)
      return match?.[1] ?? ""
    },
  },
]

const failures = []
const versions = new Map()

for (const source of sources) {
  if (!fs.existsSync(source.path)) {
    failures.push(`${source.name}: file not found (${source.path})`)
    continue
  }

  const content = fs.readFileSync(source.path, "utf8")
  const version = source.getVersion(content)

  if (!version) {
    failures.push(`${source.name}: version could not be determined`)
    continue
  }

  versions.set(source.name, version)
}

const uniqueVersions = new Set(versions.values())
if (uniqueVersions.size > 1) {
  for (const [name, version] of versions) {
    failures.push(`${name} reports version ${version}`)
  }
}

if (failures.length > 0) {
  console.error("Version sync check failed:")
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log(`Version sync check passed. Published version: ${versions.get("root package")}`)
