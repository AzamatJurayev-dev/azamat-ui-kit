import type { ComponentDemoMock } from "../types"

export const pageTabsMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { PageTabs } from "tembro"

export function Example() {
  const [tab, setTab] = React.useState("overview")

  return (
    <PageTabs
      value={tab}
      onValueChange={(next) => setTab(next)}
      items={[
        { value: "overview", label: "Overview" },
        { value: "billing", label: "Billing", badge: 2 },
        { value: "activity", label: "Activity" },
      ]}
    />
  )
}`,
  highlights: ["Underline, pills, and cards variants", "Route-sized section switching", "Optional tab badges", "Good semantic fit for page-level navigation"],
  scenarios: [
    { title: "Workspace sections", description: "Switch between overview, billing, and activity at the route surface level." },
    { title: "Settings pages", description: "Organize major groups without building separate side navigation." },
    { title: "Detail hubs", description: "Keep related top-level sections visible across a broad content surface." },
  ],
  capabilityNotes: [
    "Use page-tabs for route-sized or section-sized navigation, not tiny inline toggles.",
    "Choose pills/cards only when the visual context supports a stronger container.",
    "If the options are just view toggles, button-group may be more appropriate.",
  ],
}
