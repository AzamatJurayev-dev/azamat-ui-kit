import type { ComponentDemoMock } from "../types"

export const progressMock: ComponentDemoMock = {
  code: `import { Progress, ProgressCard } from "@azamatjurayevdev/azix-ui"

export function Example() {
  return (
    <div className="space-y-4">
      <Progress label="Migration status" value={72} showValue />
      <ProgressCard
        title="Workspace import"
        description="Current completion state"
        value={58}
        tone="info"
      />
    </div>
  )
}`,
  highlights: ["Linear progress with contextual label", "Value formatting", "Tone support for risk and success states", "Card wrapper for dashboard surfaces"],
  scenarios: [
    { title: "Import flow", description: "Show users how much data sync or onboarding remains." },
    { title: "Release readiness", description: "Track operational completion state in dashboards." },
    { title: "Background jobs", description: "Expose live or indeterminate processing in a compact way." },
  ],
  capabilityNotes: [
    "Progress is strongest when tied to a real milestone or measurable completion state.",
    "Use indeterminate only when precise completion cannot be known yet.",
    "Label the meaning of the progress, not just the percent.",
  ],
}
