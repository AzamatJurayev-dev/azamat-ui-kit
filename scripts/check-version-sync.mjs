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
    name: "showcase registry",
    path: path.join(root, "src", "showcase", "tembro-registry.json"),
    getVersion: (content) => {
      const parsed = JSON.parse(content)
      return parsed.version
    },
  },
  {
    name: "showcase package metadata",
    path: path.join(root, "src", "showcase", "package-meta.ts"),
    getVersion: (content) => {
      const match = content.match(/PACKAGE_LATEST_VERSION\s*=\s*["']([^"']+)["']/)
      return match?.[1] ?? ""
    },
  },
  {
    name: "CLI vendor showcase registry",
    path: path.join(root, "packages", "cli", "vendor", "src", "showcase", "tembro-registry.json"),
    getVersion: (content) => {
      const parsed = JSON.parse(content)
      return parsed.version
    },
    optional: true,
  },
  {
    name: "CLI vendor showcase package metadata",
    path: path.join(root, "packages", "cli", "vendor", "src", "showcase", "package-meta.ts"),
    getVersion: (content) => {
      const match = content.match(/PACKAGE_LATEST_VERSION\s*=\s*["']([^"']+)["']/)
      return match?.[1] ?? ""
    },
    optional: true,
  },
  {
    name: "public docs dependency",
    path: path.join(root, "..", "azamat-ui", "package.json"),
    getVersion: (content) => {
      const parsed = JSON.parse(content)
      return parsed.dependencies?.tembro?.replace(/^[~^]/, "") ?? ""
    },
    optional: true,
  },
  {
    name: "package lock",
    path: path.join(root, "package-lock.json"),
    getVersion: (content) => {
      const parsed = JSON.parse(content)
      return parsed.packages?.[""]?.version ?? parsed.version
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
    if (source.optional) {
      continue
    }

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
