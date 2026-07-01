import type { ComponentDemoMock } from "../types"

export const metricGridMock: ComponentDemoMock = {
  code: `import { MetricGrid } from "azamat-ui-kit"

const items = [
  { key: "users", label: "Users", value: "2,410", description: "Last 30 days" },
  { key: "revenue", label: "Revenue", value: "$132k", description: "Compared with last month" },
  { key: "errors", label: "Errors", value: "3", description: "Attention required" },
]

export function Example() {
  return <MetricGrid items={items} columns={3} />
}`,
  highlights: ["Dashboard-ready KPI tiles", "Tone-based urgency states", "Compact mode", "Composable label and trend"],
  relatedBlockSlugs: ["dashboard-starter", "crm-dashboard", "users-table"],
  scenarios: [
    { title: "Overview dashboards", description: "Show high-level metrics above charts and tables." },
    { title: "Loading states", description: "Replace values with placeholders while fetching real data." },
    { title: "Empty states", description: "Render no metrics with layout preserved and user messaging outside." },
  ],
  capabilityNotes: [
    "Use meaningful `description` for quick interpretation and trend context.",
    "Keep the number of columns tied to viewport width and readability.",
    "Use `compact` for dense cards in dense dashboard toolbars.",
  ],
}
