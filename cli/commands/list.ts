import { registry, registryNames } from "../registry"
import { getRegistryStatus } from "../registry-status"
import { getRegistryDistribution } from "../registry-distribution"
import { getCliNpxCommand } from "../utils/cli-metadata"

export function listCommand() {
  const grouped = registryNames
    .filter((name) => registry[name].category !== "lib")
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
