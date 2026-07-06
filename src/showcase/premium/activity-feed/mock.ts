import type { ComponentDemoMock } from "../types"

export const activityFeedMock: ComponentDemoMock = {
  code: `import { ActivityFeed } from "@azamatjurayevdev/azix"

const items = [
  { id: "i-1", title: "Team invited", description: "New designer joined the workspace.", time: "2 min ago", tone: "info" },
  { id: "i-2", title: "Deployment succeeded", description: "Staging deployment passed smoke checks.", time: "12 min ago", tone: "success" },
  { id: "i-3", title: "Payment issue", description: "Invoice sync failed, retry queue enabled.", time: "34 min ago", tone: "warning" },
]

export function Example() {
  return <ActivityFeed title="Recent activity" items={items} compact />
}`,
  highlights: ["Audit feed for admins", "Time-based event rows", "Status tones", "Compact list mode"],
  relatedBlockSlugs: ["dashboard-starter", "crm-dashboard", "users-table"],
  scenarios: [
    { title: "Operation logs", description: "Show timeline-like events in a side panel near detail content." },
    { title: "Approval queue", description: "Keep audit trails visible next to table actions." },
    { title: "System health feeds", description: "Surface important background events without overwhelming layout." },
  ],
  capabilityNotes: [
    "Provide stable `id` values for each item to avoid flicker in updates.",
    "Use meaningful `time` strings and `tone` to communicate action urgency.",
    "Use `compact` for narrow sidebars and dense dashboard sections.",
  ],
}

