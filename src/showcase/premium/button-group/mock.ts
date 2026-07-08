import type { ComponentDemoMock } from "../types"

export const buttonGroupMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { ButtonGroup } from "tembro"

export function Example() {
  const [view, setView] = React.useState("list")

  return (
    <ButtonGroup
      items={[
        { key: "list", label: "List", variant: view === "list" ? "default" : "outline", onClick: () => setView("list") },
        { key: "board", label: "Board", variant: view === "board" ? "default" : "outline", onClick: () => setView("board") },
        { key: "timeline", label: "Timeline", variant: view === "timeline" ? "default" : "outline", onClick: () => setView("timeline") },
      ]}
    />
  )
}`,
  highlights: ["Attached or separated button layouts", "Good for view switching", "Compact grouped controls", "Uses the same button API as the rest of the system"],
  scenarios: [
    { title: "View switcher", description: "Toggle list, board, and timeline modes with a compact control." },
    { title: "Segmented admin actions", description: "Group related operations without building a custom segmented component." },
    { title: "Toolbar compactness", description: "Save horizontal space in filter and table toolbars." },
  ],
  capabilityNotes: [
    "ButtonGroup works best when options are closely related and mutually understandable together.",
    "Active state should remain obvious without overwhelming the rest of the toolbar.",
    "If the choices represent route navigation, tabs may be a better semantic fit.",
  ],
}
