import type { FamilyDemoMock } from "../types"

export const displayFamilyMock: FamilyDemoMock = {
  code: `import { MetricGrid, Timeline, ActivityFeed, Avatar } from "@azamat/ui"\n\nexport function Example() {\n  return <MetricGrid />\n}`,
  highlights: ["Metric grids", "Timelines", "Activity feeds", "Status legends"],
  scenarios: [
    { title: "KPI dashboards", description: "Present summary metrics with clear information hierarchy." },
    { title: "Audit trails", description: "Track updates and system events in timeline form." },
    { title: "Context cards", description: "Pair avatar, status and description surfaces together." },
  ],
  metrics: [
    { label: "Exports", value: "10" },
    { label: "Display types", value: "5+" },
    { label: "Status", value: "Stable" },
  ],
}

