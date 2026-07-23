export type CliCommandOption = {
  flags: string
  description: string
}

export type CliCommandManifestItem = {
  name: string
  description: string
  argument?: { syntax: string; description: string }
  options: CliCommandOption[]
  examples: string[]
}

export const cliCommandManifest: CliCommandManifestItem[] = [
  {
    name: "init",
    description: "Initialize local Tembro source files, theme paths, and AI agent instructions.",
    options: [
      { flags: "--template <template>", description: "Project defaults: vite or next" },
      { flags: "--skip-install", description: "Do not install base dependencies" },
      { flags: "--showcase", description: "Add every component and write a local Tembro workbench" },
      { flags: "-y, --defaults", description: "Use template defaults without interactive prompts" },
      { flags: "--skip-agents", description: "Do not generate AGENTS.md and focused skill files" },
      { flags: "--overwrite-agents", description: "Replace existing generated agent files" },
    ],
    examples: [
      "npx tembro init --defaults",
      "npx tembro init --template next --defaults",
      "npx tembro init --showcase --defaults",
    ],
  },
  {
    name: "add",
    description: "Copy one or more registry components into the configured project paths.",
    argument: { syntax: "[components...]", description: "component names to copy" },
    options: [
      { flags: "-o, --overwrite", description: "overwrite existing files" },
      { flags: "--dry-run", description: "show files without writing" },
      { flags: "--plan", description: "print machine-readable copy plan without writing" },
      { flags: "--skip-install", description: "do not install package dependencies" },
    ],
    examples: ["npx tembro add button input", "npx tembro add spreadsheet --overwrite"],
  },
  {
    name: "list",
    description: "List available registry components and maturity metadata.",
    options: [
      { flags: "--category <category>", description: "filter by registry category" },
      { flags: "--status <status>", description: "filter by stable, preview, experimental, or internal" },
      { flags: "--json", description: "print machine-readable JSON" },
    ],
    examples: ["npx tembro list", "npx tembro list --status stable --json"],
  },
  {
    name: "doctor",
    description: "Audit project paths, theme, copied components, dependencies, and AI agent setup.",
    options: [{ flags: "--json", description: "print machine-readable JSON" }],
    examples: ["npx tembro doctor", "npx tembro doctor --json"],
  },
  {
    name: "theme",
    description: "Write or update Tembro theme CSS in the configured global CSS file.",
    argument: { syntax: "[cssPath]", description: "global CSS path; defaults to tembro.json" },
    options: [],
    examples: ["npx tembro theme", "npx tembro theme src/index.css"],
  },
  {
    name: "preset",
    description: "Install an opinionated source-copy preset.",
    argument: { syntax: "<name>", description: "minimal or dashboard" },
    options: [
      { flags: "-o, --overwrite", description: "overwrite existing files" },
      { flags: "--dry-run", description: "show files without writing" },
      { flags: "--skip-install", description: "do not install package dependencies" },
    ],
    examples: ["npx tembro preset minimal", "npx tembro preset dashboard --overwrite"],
  },
  {
    name: "agents",
    description: "Create or refresh AGENTS.md and focused .agents/skills playbooks.",
    options: [
      { flags: "-o, --overwrite", description: "replace existing generated files" },
      { flags: "--dry-run", description: "show planned files without writing" },
    ],
    examples: ["npx tembro agents", "npx tembro agents --dry-run", "npx tembro agents --overwrite"],
  },
  {
    name: "showcase",
    description: "Add every component and write a local Tembro workbench.",
    options: [
      { flags: "-o, --overwrite", description: "overwrite existing files" },
      { flags: "--dry-run", description: "show files without writing" },
      { flags: "--skip-install", description: "do not install package dependencies" },
    ],
    examples: ["npx tembro showcase", "npx tembro showcase --overwrite --skip-install"],
  },
]

export function getCliCommandManifest(name: string) {
  return cliCommandManifest.find((command) => command.name === name)
}
