import type { ComponentDemoMock } from "../types"

export const resultMock: ComponentDemoMock = {
  code: `import { Result } from "tembro"

export function Example() {
  return (
    <Result
      status="success"
      title="Project created"
      description="Your new workspace is ready and all checks passed."
      compact
    />
  )
}`,
  highlights: ["Semantic statuses", "Inline action block", "Compact and full variants", "Reusable result states for non-page flows"],
  scenarios: [
    { title: "Create success", description: "Use after successful create/update actions." },
    { title: "Error outcome", description: "Show clear recovery action and short guidance." },
    { title: "Not found state", description: "Use for invalid entity pages and missing route scenarios." },
  ],
  capabilityNotes: [
    "Align status text with backend outcomes.",
    "Pair each state with primary and optional secondary actions.",
    "Keep `description` short and specific to user intent.",
  ],
}

