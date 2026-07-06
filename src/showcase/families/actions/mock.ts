import type { FamilyDemoMock } from "../types"

export const actionsFamilyMock: FamilyDemoMock = {
  code: `import { ActionMenu, CopyButton, QuickActionGrid } from "@azamatjurayevdev/azix"\n\nexport function Example() {\n  return <QuickActionGrid items={[]} />\n}`,
  highlights: ["Quick action grids", "Copy controls", "Context menus", "Dense admin actions"],
  scenarios: [
    { title: "Header shortcuts", description: "Place high-priority actions near page-level metrics and summaries." },
    { title: "Row-level actions", description: "Expose copy, archive and duplicate flows without leaving the table." },
    { title: "Launch panels", description: "Use action grids to surface related product modules quickly." },
  ],
  metrics: [
    { label: "Exports", value: "3" },
    { label: "Actions", value: "12+" },
    { label: "Status", value: "Stable" },
  ],
}


