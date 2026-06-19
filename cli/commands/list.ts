import { registry, registryNames } from "../registry"
import { getRegistryStatus } from "../registry-status"

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
      const deps = item.registryDependencies?.length
        ? ` -> ${item.registryDependencies.join(", ")}`
        : ""
      console.log(`  ${name} [${status}]${deps}`)
    })
  }

  console.log("\nStatus:")
  console.log("  stable = safe public API")
  console.log("  preview = usable but API may change")
  console.log("  experimental = not ready for stable app contracts")
  console.log("  internal = helper metadata")
  console.log("\nUsage:")
  console.log("  npx azamat-ui-kit add button input data-table")
  console.log("  npx azamat-ui-kit add form --overwrite")
}
