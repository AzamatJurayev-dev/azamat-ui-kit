import type { ComponentDemoMock } from "../types"

export const dataStateMock: ComponentDemoMock = {
  code: `import { DataState } from "@/index"

export function Example() {
  return (
    <DataState
      status="error"
      title="Unable to load rows"
      description="Try again after refreshing the request."
      onRetry={() => {}}
    />
  )
}`,
  cliCommand: "npx azix add data-state",
  highlights: [
    "Idle, loading, empty, error and success state surface",
    "Optional retry action and custom content area",
    "Useful for panels or data-heavy cards that need clearer fallback than a spinner alone",
  ],
  scenarios: [
    { title: "Error panel", description: "Show failed request recovery without replacing the whole page." },
    { title: "Empty data", description: "Clarify that the query worked but returned nothing." },
    { title: "Loading panel", description: "Reserve the panel shell while async work completes." },
  ],
}
