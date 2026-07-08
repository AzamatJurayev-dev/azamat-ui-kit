import type { ComponentDemoMock } from "../types"

export const alertMock: ComponentDemoMock = {
  code: `import { Alert, Button } from "azix"

export function Example() {
  return (
    <Alert
      tone="warning"
      title="Review needed"
      description="Billing rules changed and one approval is pending."
      action={<Button size="sm">Open review</Button>}
    />
  )
}`,
  highlights: ["Inline feedback with action slot", "Tone-based severity states", "Works for info, success, warning, and destructive messaging", "Compact enough for forms, settings, and dashboards"],
  scenarios: [
    { title: "Pending approval", description: "Warn the user before a release or billing action moves forward." },
    { title: "Success confirmation", description: "Show a short post-save confirmation without forcing a toast." },
    { title: "Inline form issue", description: "Attach next-step guidance directly where attention is needed." },
  ],
  capabilityNotes: [
    "Use alerts for actionable inline status, not for decorative emphasis.",
    "Pair warning and destructive tones with a specific next action.",
    "Keep the title decisive and the description operational.",
  ],
}
