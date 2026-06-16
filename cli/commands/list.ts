import { registry, registryNames } from "../registry";

export function listCommand() {
  const grouped = registryNames
    .filter((name) => registry[name].category !== "lib")
    .reduce<Record<string, string[]>>((acc, name) => {
      const category = registry[name].category;
      acc[category] ??= [];
      acc[category].push(name);
      return acc;
    }, {});

  for (const [category, names] of Object.entries(grouped)) {
    console.log(`\n${category}`);
    names.sort().forEach((name) => {
      const item = registry[name];
      const deps = item.registryDependencies?.length
        ? ` -> ${item.registryDependencies.join(", ")}`
        : "";
      console.log(`  ${name}${deps}`);
    });
  }

  console.log("\nUsage:");
  console.log("  npx azamat-ui-kit add button input data-table");
  console.log("  npx azamat-ui-kit add form --overwrite");
}
