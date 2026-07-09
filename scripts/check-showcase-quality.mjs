import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))

const requiredDemoSlugs = [
  "button",
  "input",
  "select",
  "dialog",
  "data-table",
  "date-picker",
]

const requiredApiSlugs = [
  "button",
  "input",
  "select",
  "dialog",
  "data-table",
  "date-picker",
]

const requiredButtonTerms = [
  "loading",
  "loadingLabel",
  "leftIcon",
  "rightIcon",
  "warning",
  "aria-label",
]

function readProjectFile(path) {
  return readFileSync(join(rootDir, path), "utf8")
}

function assertIncludes(source, value, label) {
  if (!source.includes(value)) {
    throw new Error(`${label} is missing ${value}`)
  }
}

function run() {
  const demoRegistry = readProjectFile("src/showcase/registry-quality.ts")
  const apiSchema = readProjectFile("src/showcase/component-api-schema.ts")
  const failures = []

  for (const slug of requiredDemoSlugs) {
    try {
      assertIncludes(demoRegistry, `component("${slug}"`, "registry-quality demo coverage")
    } catch (error) {
      failures.push(error.message)
    }
  }

  for (const slug of requiredApiSlugs) {
    try {
      assertIncludes(apiSchema, `slug: "${slug}"`, "component API schema coverage")
    } catch (error) {
      failures.push(error.message)
    }
  }

  for (const term of requiredButtonTerms) {
    try {
      assertIncludes(apiSchema, term, "button API state metadata")
    } catch (error) {
      failures.push(error.message)
    }
  }

  if (failures.length) {
    console.error("Showcase quality gate failed:")
    failures.forEach((failure) => console.error(`- ${failure}`))
    process.exit(1)
  }

  console.log("Showcase quality gate passed")
}

run()
