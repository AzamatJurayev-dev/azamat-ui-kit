import type { ComponentDemoMock } from "../types"

export const actionMenuMock: ComponentDemoMock = {
  code: `import { ActionMenu } from "@azamatjurayevdev/azix-ui"

export function Example() {
  return (
    <ActionMenu
      label="Row actions"
      actions={[
        { key: "open", label: "Open" },
        { key: "duplicate", label: "Duplicate" },
        { key: "archive", label: "Archive", destructive: true },
      ]}
    />
  )
}`,
  highlights: ["Compact row actions", "Async action loading state", "Destructive item styling", "Works well inside tables and cards"],
  scenarios: [
    { title: "Table row actions", description: "Collapse inspect, duplicate, and archive operations into one compact surface." },
    { title: "Card menu", description: "Attach contextual actions to summary cards without visual clutter." },
    { title: "Dense admin tools", description: "Preserve space while keeping operational actions discoverable." },
  ],
  capabilityNotes: [
    "ActionMenu is strongest when actions are secondary to the main content.",
    "Use clear verb labels and reserve destructive styling for genuinely destructive operations.",
    "If every action is primary, a visible button row may be better than a menu.",
  ],
}
