import type { ComponentDemoMock } from "../types"

export const pageStateMock: ComponentDemoMock = {
  code: `import { Button, InlineState, PageState } from "tembro"

export function Example() {
  return (
    <>
      <PageState
        tone="error"
        title="Connection failed"
        description="We could not sync workspace usage. Retry after restoring the API token."
        action={<Button variant="outline">Retry sync</Button>}
      />
      <InlineState tone="empty" title="No comments" onRetry={() => refetch()} />
    </>
  )
}`,
  highlights: ["Full-page and compact inline surfaces", "Empty, loading, success, info, and error flows", "Retry and custom action support", "Accessible status and alert roles"],
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
