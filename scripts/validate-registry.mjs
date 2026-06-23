import fs from "node:fs"
import path from "node:path"
import process from "node:process"

const root = process.cwd()
const packageJsonPath = path.join(root, "package.json")
const registryJsonPath = path.join(root, "registry.json")
const registryTsPath = path.join(root, "cli/registry.ts")
const registryStatusTsPath = path.join(root, "cli/registry-status.ts")

const failures = []

function readText(filePath) {
  if (!fs.existsSync(filePath)) {
    failures.push(`${path.relative(root, filePath)}: file not found`)
    return ""
  }

  return fs.readFileSync(filePath, "utf8")
}

function readJson(filePath) {
  try {
    return JSON.parse(readText(filePath))
  } catch (error) {
    failures.push(`${path.relative(root, filePath)}: invalid JSON - ${error.message}`)
    return null
  }
}

function extractComponentNameUnion(registryTs) {
  const match = registryTs.match(/export type ComponentName =([\s\S]*?);/)
  if (!match) return []

  return Array.from(match[1].matchAll(/"([^"]+)"/g)).map((item) => item[1])
}

function extractRegistryObjectNames(registryTs) {
  return Array.from(registryTs.matchAll(/name:\s*"([^"]+)"/g)).map((item) => item[1])
}

function extractRegistryDependencies(registryTs) {
  const dependencies = new Map()
  const entryRegex = /(?:^|\n)\s*"?([a-z0-9-]+)"?:\s*\{([\s\S]*?)(?=\n\s*"?[a-z0-9-]+"?:\s*\{|\n\};)/g

  for (const match of registryTs.matchAll(entryRegex)) {
    const name = match[1]
    const body = match[2]
    const dependencyMatch = body.match(/registryDependencies:\s*\[([^\]]*)\]/)

    if (!dependencyMatch) {
      dependencies.set(name, [])
      continue
    }

    const names = Array.from(dependencyMatch[1].matchAll(/"([^"]+)"/g)).map((item) => item[1])
    dependencies.set(name, names)
  }

  return dependencies
}

function extractRegistryFiles(registryTs) {
  return Array.from(registryTs.matchAll(/file\("([^"]+)",\s*"([^"]+)"\)/g)).map((match) => ({
    source: match[1],
    target: match[2],
  }))
}

function extractRegistryStatuses(registryStatusTs) {
  return new Map(
    Array.from(registryStatusTs.matchAll(/["']([a-z0-9-]+)["']\s*:\s*["'](stable|preview|experimental|internal)["']/g)).map((match) => [
      match[1],
      match[2],
    ]),
  )
}

const packageJson = readJson(packageJsonPath)
const registryJson = readJson(registryJsonPath)
const registryTs = readText(registryTsPath)
const registryStatusTs = readText(registryStatusTsPath)
const unionNames = extractComponentNameUnion(registryTs)
const registryNames = extractRegistryObjectNames(registryTs)
const dependencyMap = extractRegistryDependencies(registryTs)
const registryFiles = extractRegistryFiles(registryTs)
const registryStatuses = extractRegistryStatuses(registryStatusTs)
const unionSet = new Set(unionNames)
const registrySet = new Set(registryNames)

if (packageJson && registryJson && packageJson.version !== registryJson.version) {
  failures.push(`registry.json version ${registryJson.version} does not match package.json version ${packageJson.version}`)
}

if (registryJson) {
  const recommendedByMode = registryJson.recommendedByMode ?? {}
  const manifestNames = new Set([
    ...Object.values(registryJson.groups ?? {}).flat(),
    ...(registryJson.recommended ?? []),
    ...Object.values(recommendedByMode).flat(),
  ])

  for (const name of manifestNames) {
    if (!unionSet.has(name)) {
      failures.push(`registry.json references '${name}', but ComponentName does not include it`)
    }

    if (!registrySet.has(name)) {
      failures.push(`registry.json references '${name}', but cli registry object does not define it`)
    }
  }

  for (const name of registryJson.recommended ?? []) {
    const status = registryStatuses.get(name)

    if (status === "experimental" || status === "internal") {
      failures.push(`registry.json recommended includes '${name}', but cli registry status marks it as '${status}'`)
    }
  }

  for (const [mode, names] of Object.entries(recommendedByMode)) {
    for (const name of names) {
      const status = registryStatuses.get(name)

      if (status === "experimental" || status === "internal") {
        failures.push(`registry.json recommendedByMode.${mode} includes '${name}', but cli registry status marks it as '${status}'`)
      }
    }
  }
}

for (const name of registryNames) {
  if (!unionSet.has(name)) {
    failures.push(`cli registry defines '${name}', but ComponentName union does not include it`)
  }
}

for (const [name, dependencies] of dependencyMap.entries()) {
  const seen = new Set()

  for (const dependency of dependencies) {
    if (!registrySet.has(dependency)) {
      failures.push(`${name}: registry dependency '${dependency}' is not defined`)
    }

    if (seen.has(dependency)) {
      failures.push(`${name}: duplicate registry dependency '${dependency}'`)
    }

    seen.add(dependency)
  }
}

for (const file of registryFiles) {
  if (!fs.existsSync(path.join(root, file.source))) {
    failures.push(`missing registry source file: ${file.source} -> ${file.target}`)
  }
}

const duplicateNames = unionNames.filter((name, index) => unionNames.indexOf(name) !== index)
for (const name of new Set(duplicateNames)) {
  failures.push(`ComponentName contains duplicate '${name}'`)
}

if (failures.length > 0) {
  console.error("Registry validation failed:\n")
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log(`Registry validation passed (${registryNames.length} entries, ${registryFiles.length} files).`)
