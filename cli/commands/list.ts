import { registry, registryNames } from "../registry"
import { getRegistryStatus } from "../registry-status"
import { getRegistryDistribution } from "../registry-distribution"
import { getCliNpxCommand } from "../utils/cli-metadata"
import {
  documentedPublicRegistrySurfaceNames,
  standalonePublicRegistrySurfaceNames,
} from "../../src/public-component-surface"

const internalRegistryNames = new Set([
  "data-table-actions-column",
  "data-table-bulk-actions",
  "data-table-column-visibility-menu",
  "data-table-pagination",
  "data-table-row-actions",
  "data-table-saved-filters",
  "data-table-select-column",
  "data-table-sortable-header",
  "data-table-toolbar",
  "data-table-view-presets",
  "table-export-menu",
  "table-import-button",
])

function printRegistryListSection(title: string, names: string[]) {
  console.log(`\n${title}`)
  names.forEach((name) => {
    const item = registry[name]
    const status = getRegistryStatus(name)
    const distribution = getRegistryDistribution(name, item.category)
    const deps = item.registryDependencies?.length
      ? ` -> ${item.registryDependencies.join(", ")}`
      : ""
    console.log(`  ${name} [${status}/${distribution}]${deps}`)
  })
}

export function listCommand() {
  const canonicalSurfaceNames = documentedPublicRegistrySurfaceNames
    .filter((name, index, list) => list.indexOf(name) === index)
    .filter((name) => registry[name] && registry[name].category !== "lib")

  const standaloneSurfaceNames = standalonePublicRegistrySurfaceNames
    .filter((name, index, list) => list.indexOf(name) === index)
    .filter((name) => registry[name] && registry[name].category !== "lib")

  printRegistryListSection("Canonical surfaces", canonicalSurfaceNames)
  printRegistryListSection("Standalone surfaces", standaloneSurfaceNames)

  const surfacedNames = new Set([...canonicalSurfaceNames, ...standaloneSurfaceNames])

  const grouped = registryNames
    .filter((name) => registry[name].category !== "lib")
    .filter((name) => !surfacedNames.has(name))
    .filter((name) => !internalRegistryNames.has(name))
    .filter((name) => !registry[name].migrationAliasFor)
    .reduce<Record<string, string[]>>((acc, name) => {
      const category = registry[name].category
      acc[category] ??= []
      acc[category].push(name)
      return acc
    }, {})

  for (const [category, names] of Object.entries(grouped)) {
    console.log(`\n${category}`)
    names.sort().forEach((name) => {
      const item = registry[name]
      const status = getRegistryStatus(name)
      const distribution = getRegistryDistribution(name, item.category)
      const deps = item.registryDependencies?.length
        ? ` -> ${item.registryDependencies.join(", ")}`
        : ""
      console.log(`  ${name} [${status}/${distribution}]${deps}`)
    })
  }

  console.log("\nStatus:")
  console.log("  stable = safe public API")
  console.log("  preview = usable but API may change")
  console.log("  experimental = not ready for stable app contracts")
  console.log("  internal = helper metadata")
  console.log("\nDistribution:")
  console.log("  foundation = small runtime-safe primitives, hooks, and helpers")
  console.log("  source-copy = copy into app source with init/add and edit locally")
  console.log("  system = larger product surfaces, kits, and patterns; prefer source-copy only")
  console.log("\nUsage:")
  console.log(`  ${getCliNpxCommand("add button input data-table")}`)
  console.log(`  ${getCliNpxCommand("add form --overwrite")}`)
}
