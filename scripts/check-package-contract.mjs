import fs from "node:fs"
import path from "node:path"
import process from "node:process"

const root = process.cwd()
const failures = []

function readJson(relativePath) {
  const filePath = path.join(root, relativePath)
  if (!fs.existsSync(filePath)) {
    failures.push(`${relativePath}: file not found`)
    return null
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"))
  } catch (error) {
    failures.push(`${relativePath}: invalid JSON - ${error.message}`)
    return null
  }
}

function readText(relativePath) {
  const filePath = path.join(root, relativePath)
  if (!fs.existsSync(filePath)) {
    failures.push(`${relativePath}: file not found`)
    return ""
  }

  return fs.readFileSync(filePath, "utf8")
}

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function pathExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath))
}

const packageJson = readJson("package.json")
const registryJson = readJson("registry.json")
const readme = readText("README.md")
const license = readText("LICENSE")
const rootIndex = readText("src/index.ts")

if (packageJson) {
  assert(packageJson.name === "tembro", "package.json name must be 'tembro'")
  assert(packageJson.private !== true, "package.json must not be private for public publishing")
  assert(packageJson.license === "MIT", "package.json license must be MIT")
  assert(packageJson.publishConfig?.access === "public", "package.json publishConfig.access must be public")
  assert(packageJson.type === "module", "package.json type must be module")
  assert(packageJson.engines?.node === ">=18", "package.json engines.node must be >=18")

  for (const field of ["description", "homepage", "repository", "bugs", "author", "bin", "main", "module", "types", "exports", "files", "peerDependencies"]) {
    assert(packageJson[field], `package.json missing required public package field '${field}'`)
  }

  for (const peer of ["react", "react-dom", "react-hook-form"]) {
    assert(packageJson.peerDependencies?.[peer], `package.json peerDependencies missing '${peer}'`)
  }

  for (const fileEntry of ["bin", "dist", "packages/cli/dist", "packages/cli/vendor", "registry.json", "README.md", "CHANGELOG.md", "LICENSE"]) {
    assert(packageJson.files?.includes(fileEntry), `package.json files must include '${fileEntry}'`)
  }

  const requiredExports = [
    ".",
    "./ui/*",
    "./actions/*",
    "./patterns/*",
    "./display/*",
    "./form/*",
    "./layout/*",
    "./inputs/*",
    "./charts/*",
    "./data-table/*",
    "./dnd/*",
    "./public-component-surface",
    "./registry.json",
    "./package.json",
  ]

  for (const exportPath of requiredExports) {
    assert(packageJson.exports?.[exportPath], `package.json exports missing '${exportPath}'`)
  }

  const requiredScripts = [
    "build",
    "build:all",
    "test:run",
    "test:cli",
    "test:fixtures",
    "test:registry",
    "test:root-exports",
    "check-version-sync",
    "check:api-schema",
    "check:fallback-coverage",
    "check:theme-contract",
    "release:quick",
    "release:gate",
    "pack:dry-run",
  ]

  for (const script of requiredScripts) {
    assert(packageJson.scripts?.[script], `package.json scripts missing '${script}'`)
  }

  assert(packageJson.scripts?.prepublishOnly === "npm run release:gate", "prepublishOnly must run release:gate")
}

if (packageJson && registryJson) {
  assert(packageJson.version === registryJson.version, "package.json version must match registry.json version")
  assert(registryJson.name === packageJson.name, "registry.json name must match package.json name")
}

for (const requiredFile of ["README.md", "CHANGELOG.md", "LICENSE", "registry.json", "bin/tembro.cjs", "cli/commands/init.ts", "cli/commands/add.ts"]) {
  assert(pathExists(requiredFile), `required published/source file missing: ${requiredFile}`)
}

for (const phrase of [
  "source-copy-first",
  "npx tembro init",
  "npx tembro add",
  "Production readiness",
  "Release gates",
  "Public API",
  "Theme tokens",
]) {
  assert(readme.includes(phrase), `README.md must document '${phrase}'`)
}

assert(license.includes("MIT"), "LICENSE must contain MIT license text")
assert(!/Azamat UI Kit|Azamat UI(?! Pro)/.test(readme), "README.md must not use old Azamat UI package branding")
assert(rootIndex.includes("./components/data-table/public"), "src/index.ts must expose canonical data-table public barrel")
assert(rootIndex.includes("./components/patterns/public"), "src/index.ts must expose canonical patterns public barrel")

if (failures.length > 0) {
  console.error("Package contract check failed:")
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log("Package contract check passed")
