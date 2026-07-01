import type { ComponentDemoMock } from "../types"

export const infoCardMock: ComponentDemoMock = {
  code: `import { InfoCard } from "azamat-ui-kit"

export function Example() {
  return (
    <InfoCard
      title="Team"
      description="Active workspace members and billing snapshot."
      eyebrow="KPI context"
      compact
    >
      Keep status, metadata and helper actions in one reusable card.
    </InfoCard>
  )
}`,
  highlights: ["Compact and standard card modes", "Supports header, body and footer slots", "Good for metadata blocks", "Reusable on dashboard and forms"],
  scenarios: [
    { title: "Context blocks", description: "Display metadata near complex forms or tables." },
    { title: "Action cards", description: "Add CTA area and media when quick guidance is needed." },
    { title: "Dashboard cards", description: "Compose many cards for module summaries." },
  ],
  capabilityNotes: [
    "Use `eyebrow` for micro-headings and quick context.",
    "Use `media` to place avatars or charts next to text.",
    "Switch to `compact` in dense lists; keep default for detailed descriptions.",
  ],
}
