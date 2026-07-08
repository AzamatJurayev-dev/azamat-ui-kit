import type { FamilyDemoMock } from "../types"

export const commandFamilyMock: FamilyDemoMock = {
  code: `import { CommandPalette } from "azix"\n\nexport function Example() {\n  return <CommandPalette />\n}`,
  highlights: ["Keyboard navigation", "Quick search", "Shortcut-driven discovery", "Global command access"],
  scenarios: [
    { title: "Jump anywhere", description: "Navigate docs, blocks and playgrounds from one entry point." },
    { title: "Find components", description: "Search by name, family or scenario quickly." },
    { title: "Open actions", description: "Expose hidden product operations to power users." },
  ],
  metrics: [
    { label: "Exports", value: "1" },
    { label: "Shortcuts", value: "⌘K" },
    { label: "Status", value: "Preview" },
  ],
}


