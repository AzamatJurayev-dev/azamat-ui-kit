import type { ComponentDemoMock } from "../types"

export const emptyStateMock: ComponentDemoMock = {
  code: `import { EmptyState } from "azix"

export function Example() {
  return (
    <EmptyState
      title="No results yet"
      description="Create your first item to unlock actions and charts."
      actionLabel="Create item"
      onAction={() => {
        console.log("Create action triggered")
      }}
    />
  )
}`,
  highlights: ["No-content user messaging", "Built-in action callback", "Lightweight onboarding placeholder", "Reusable for any resource list"],
  scenarios: [
    { title: "First launch", description: "Guide users to create first entity in a clean state." },
    { title: "Filtered empty", description: "Tell users what changed filters removed all items." },
    { title: "Error fallback", description: "Use with loading and retry controls when data fetch fails." },
  ],
  capabilityNotes: [
    "Always provide a clear next action to recover from empty state.",
    "Keep titles short and outcome oriented.",
    "Prefer one primary action + short explanation for fastest user decision.",
  ],
}
