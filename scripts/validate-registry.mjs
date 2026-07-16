import fs from "node:fs"
import path from "node:path"
import process from "node:process"

const root = process.cwd()
const packageJsonPath = path.join(root, "package.json")
const registryJsonPath = path.join(root, "registry.json")
const registryTsPath = path.join(root, "cli/registry.ts")
const registryStatusTsPath = path.join(root, "cli/registry-status.ts")
const presetComponentsTsPath = path.join(root, "cli/preset-files.ts")
const publicComponentSurfaceTsPath = path.join(root, "src/public-component-surface.ts")
const showcaseRegistryJsonPath = path.join(root, "src/showcase/tembro-registry.json")
const vendorShowcaseRegistryJsonPath = path.join(root, "packages/cli/vendor/src/showcase/tembro-registry.json")

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

function extractRegistryAliases(registryTs) {
  return new Map(
    Array.from(
      registryTs.matchAll(/name:\s*"([^"]+)"[^}\n]*migrationAliasFor:\s*"([^"]+)"/g),
      (match) => [match[1], match[2]],
    ),
  )
}

function extractRegistryStatuses(registryStatusTs) {
  return new Map(
    Array.from(registryStatusTs.matchAll(/["']([a-z0-9-]+)["']\s*:\s*["'](stable|preview|experimental|internal)["']/g)).map((match) => [
      match[1],
      match[2],
    ]),
  )
}

function extractPresetComponents(source) {
  return Array.from(source.matchAll(/(?:minimal|dashboard):\s*\[([\s\S]*?)\]/g))
    .flatMap((match) => Array.from(match[1].matchAll(/"([^"]+)"/g), (item) => item[1]))
}

function extractPublicSurfaceEntries(source, constName) {
  const blockMatch = source.match(new RegExp(`export const ${constName}: readonly PublicComponentSurfaceEntry\\[] = \\[([\\s\\S]*?)\\] as const`))
  if (!blockMatch) return []

  return Array.from(
    blockMatch[1].matchAll(/\{\s*slug:\s*"([^"]+)",\s*registryName:\s*"([^"]+)",\s*surface:\s*"([^"]+)"\s*\}/g),
  ).map((match) => ({
    slug: match[1],
    registryName: match[2],
    surface: match[3],
  }))
}

const packageJson = readJson(packageJsonPath)
const registryJson = readJson(registryJsonPath)
const registryTs = readText(registryTsPath)
const registryStatusTs = readText(registryStatusTsPath)
const presetComponentsTs = readText(presetComponentsTsPath)
const extractedUnionNames = extractComponentNameUnion(registryTs)
const registryNames = extractRegistryObjectNames(registryTs)
const dependencyMap = extractRegistryDependencies(registryTs)
const registryFiles = extractRegistryFiles(registryTs)
const registryAliases = extractRegistryAliases(registryTs)
const registryStatuses = extractRegistryStatuses(registryStatusTs)
const presetComponents = extractPresetComponents(presetComponentsTs)
const publicComponentSurfaceTs = readText(publicComponentSurfaceTsPath)
const showcaseRegistryJson = readJson(showcaseRegistryJsonPath)
const vendorShowcaseRegistryJson = readJson(vendorShowcaseRegistryJsonPath)
const unionNames = extractedUnionNames.length > 0 ? extractedUnionNames : registryNames
const unionSet = new Set(unionNames)
const registrySet = new Set(registryNames)

if (packageJson && registryJson && packageJson.version !== registryJson.version) {
  failures.push(`registry.json version ${registryJson.version} does not match package.json version ${packageJson.version}`)
}

if (registryJson) {
  const recommendedByMode = registryJson.recommendedByMode ?? {}
  const documentedSurfaceEntries = extractPublicSurfaceEntries(publicComponentSurfaceTs, "documentedPublicComponentSurfaces")
  const standaloneSurfaceEntries = extractPublicSurfaceEntries(publicComponentSurfaceTs, "standalonePublicComponentSurfaces")
  const expectedPublicSurface = {
    documented: documentedSurfaceEntries.map((entry) => entry.registryName),
    standalone: standaloneSurfaceEntries.map((entry) => entry.registryName),
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

  for (const [group, names] of Object.entries(registryJson.groups ?? {})) {
    for (const name of names) {
      if (!registrySet.has(name)) {
        failures.push(`registry.json groups.${group} includes '${name}', but cli registry does not define it`)
      }
    }
  }

  for (const [alias, canonicalName] of Object.entries(registryJson.migrationAliases ?? {})) {
    const cliAliasTarget = registryAliases.get(alias)

    if (!cliAliasTarget) {
      failures.push(`registry.json migration alias '${alias}' is missing from cli registry`)
      continue
    }

    if (cliAliasTarget !== canonicalName) {
      failures.push(`registry.json migration alias '${alias}' does not match cli target '${cliAliasTarget}'`)
    }

    if (!registrySet.has(canonicalName)) {
      failures.push(`registry.json migration alias '${alias}' targets missing component '${canonicalName}'`)
    }
  }

  const actualPublicSurface = registryJson.publicSurface ?? {}
  for (const key of ["documented", "standalone"]) {
    const expected = expectedPublicSurface[key] ?? []
    const actual = actualPublicSurface[key] ?? []

    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      failures.push(`registry.json publicSurface.${key} does not match src/public-component-surface.ts`)
    }
  }
}

if (registryJson && showcaseRegistryJson) {
  const registrySnapshot = JSON.stringify(registryJson)
  const showcaseRegistrySnapshot = JSON.stringify(showcaseRegistryJson)

  if (showcaseRegistrySnapshot !== registrySnapshot) {
    failures.push("src/showcase/tembro-registry.json does not match registry.json")
  }
}

if (registryJson && vendorShowcaseRegistryJson) {
  const registrySnapshot = JSON.stringify(registryJson)
  const vendorShowcaseRegistrySnapshot = JSON.stringify(vendorShowcaseRegistryJson)

  if (vendorShowcaseRegistrySnapshot !== registrySnapshot) {
    failures.push("packages/cli/vendor/src/showcase/tembro-registry.json does not match registry.json")
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

for (const name of presetComponents) {
  if (!registrySet.has(name)) {
    failures.push(`cli preset references '${name}', but cli registry does not define it`)
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
