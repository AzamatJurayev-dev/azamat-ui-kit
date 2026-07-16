import { registry, registryNames } from "../registry"
import { getRegistryStatus } from "../registry-status"
import { getRegistryDistribution } from "../registry-distribution"
import { getCliNpxCommand } from "../utils/cli-metadata"
import {
  documentedPublicRegistrySurfaceNames,
  standalonePublicRegistrySurfaceNames,
} from "../../src/public-component-surface"

const internalRegistryNames = new Set<string>()

type ListCommandOptions = {
  category?: string
  status?: string
  json?: boolean
}

function getVisibleRegistryNames(options: ListCommandOptions) {
  return registryNames
    .filter((name) => registry[name].category !== "lib")
    .filter((name) => !registry[name].migrationAliasFor)
    .filter((name) => !internalRegistryNames.has(name))
    .filter((name) => !options.category || registry[name].category === options.category)
    .filter((name) => !options.status || getRegistryStatus(name) === options.status)
}

function printRegistryListSection(title: string, names: string[], options: ListCommandOptions) {
  const visibleNames = names
    .filter((name) => !options.category || registry[name].category === options.category)
    .filter((name) => !options.status || getRegistryStatus(name) === options.status)

  if (!visibleNames.length) return

  console.log(`\n${title}`)
  visibleNames.forEach((name) => {
    const item = registry[name]
    const status = getRegistryStatus(name)
    const distribution = getRegistryDistribution(name, item.category)
    const deps = item.registryDependencies?.length
      ? ` -> ${item.registryDependencies.join(", ")}`
      : ""
    console.log(`  ${name} [${status}/${distribution}]${deps}`)
  })
}

export function listCommand(options: ListCommandOptions = {}) {
  const visibleRegistryNames = getVisibleRegistryNames(options)

  if (options.json) {
    console.log(
      JSON.stringify(
        visibleRegistryNames.map((name) => {
          const item = registry[name]

          return {
            name,
            category: item.category,
            status: getRegistryStatus(name),
            distribution: getRegistryDistribution(name, item.category),
            description: item.description ?? null,
            dependencies: item.dependencies ?? [],
            registryDependencies: item.registryDependencies ?? [],
            files: item.files ?? [],
          }
        }),
        null,
        2,
      ),
    )
    return
  }

  if (!visibleRegistryNames.length) {
    console.log("No registry components matched the selected filters.")
    console.log(`Try: ${getCliNpxCommand("list")}`)
    return
  }

  const canonicalSurfaceNames = documentedPublicRegistrySurfaceNames
    .filter((name, index, list) => list.indexOf(name) === index)
    .filter((name) => registry[name] && registry[name].category !== "lib")

  const standaloneSurfaceNames = standalonePublicRegistrySurfaceNames
    .filter((name, index, list) => list.indexOf(name) === index)
    .filter((name) => registry[name] && registry[name].category !== "lib")

  printRegistryListSection("Canonical surfaces", canonicalSurfaceNames, options)
  printRegistryListSection("Additional source-copy surfaces", standaloneSurfaceNames, options)

  const surfacedNames = new Set([...canonicalSurfaceNames, ...standaloneSurfaceNames])

  const grouped = visibleRegistryNames
    .filter((name) => registry[name].category !== "lib" && !registry[name].migrationAliasFor)
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
  console.log("  system = larger product surfaces and patterns; prefer source-copy only")
  console.log("\nUsage:")
  console.log(`  ${getCliNpxCommand("add button input data-table")}`)
  console.log(`  ${getCliNpxCommand("add form --overwrite")}`)
  console.log(`  ${getCliNpxCommand("list --category data-table")}`)
  console.log(`  ${getCliNpxCommand("list --json")}`)
}
