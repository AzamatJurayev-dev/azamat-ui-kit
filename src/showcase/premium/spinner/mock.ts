import type { ComponentDemoMock } from "../types"

export const spinnerMock: ComponentDemoMock = {
  code: `import { LoadingOverlay, Spinner } from "tembro"

export function Example() {
  return (
    <div className="space-y-4">
      <Spinner size="sm" label="Refreshing" />

      <LoadingOverlay loading label="Saving changes">
        <div className="rounded-xl border p-6">Content under save</div>
      </LoadingOverlay>
    </div>
  )
}`,
  cliCommand: "npx tembro add spinner",
  highlights: [
    "Inline spinner plus overlay mode from the same export",
    "Size tokens for dense buttons, cards, and page sections",
    "Useful for short-lived async work",
  ],
  scenarios: [
    { title: "Inline refresh", description: "Show immediate feedback inside a compact action row." },
    { title: "Section save", description: "Temporarily lock a panel while preserving its layout." },
    { title: "Background fetch", description: "Signal progress without replacing the whole route." },
  ],
}
