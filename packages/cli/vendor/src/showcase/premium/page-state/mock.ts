import type { ComponentDemoMock } from "../types"

export const pageStateMock: ComponentDemoMock = {
  code: `import { Button, PageState } from "@azamatjurayevdev/azix-ui"

export function Example() {
  return (
    <PageState
      tone="error"
      title="Connection failed"
      description="We could not sync workspace usage. Retry after restoring the API token."
      action={<Button variant="outline">Retry sync</Button>}
    />
  )
}`,
  highlights: ["Full-page status surface", "Built for empty, loading, success, info, and error flows", "Single decisive CTA", "Works as route-level fallback or section state"],
  scenarios: [
    { title: "No data yet", description: "Guide the first useful action when a route has no content." },
    { title: "Load failed", description: "Keep retry and explanation visible without dropping the user into confusion." },
    { title: "Completed workflow", description: "Confirm a decisive outcome after setup or publish flows." },
  ],
  capabilityNotes: [
    "Use page-state for route-level outcomes, not inline warnings.",
    "Keep one primary next step visible.",
    "Choose tone by outcome, not by brand color preference.",
  ],
}
