import type { ComponentDemoMock } from "../types"

export const timelineMock: ComponentDemoMock = {
  code: `import { Timeline } from "@azamatjurayevdev/azix-ui"

export function Example() {
  return (
    <Timeline
      items={[
        { key: "1", title: "Workspace created", time: "09:12", tone: "success" },
        { key: "2", title: "Billing approved", time: "09:30", tone: "info" },
        { key: "3", title: "Deployment scheduled", time: "10:00", tone: "warning" },
      ]}
    />
  )
}`,
  highlights: ["Vertical and horizontal modes", "Tone-aware event dots", "Time, description, and action support", "Good for workflow history and release tracking"],
  scenarios: [
    { title: "Approval history", description: "Explain what happened, in which order, and who needs to act next." },
    { title: "Deployment events", description: "Track release milestones and pending steps clearly." },
    { title: "Support resolution", description: "Show a readable event stream instead of scattered comments." },
  ],
  capabilityNotes: [
    "Timelines work best when the sequence matters to the user decision.",
    "Use tone to communicate event state, not decoration.",
    "Horizontal mode is better for short, high-level milestone sets.",
  ],
}
