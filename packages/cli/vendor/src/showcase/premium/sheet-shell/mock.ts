import type { ComponentDemoMock } from "../types"

export const sheetShellMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { Button, SheetShell } from "tembro"

export function Example() {
  const [openRight, setOpenRight] = useState(false)
  const [openBottom, setOpenBottom] = useState(false)

  return (
    <div className="space-y-3">
      <Button onClick={() => setOpenRight(true)}>Open right sheet</Button>
      <Button variant="outline" onClick={() => setOpenBottom(true)}>Open bottom sheet</Button>
      <SheetShell
        open={openRight}
        onOpenChange={setOpenRight}
        side="right"
        title="Workspace editor"
        description="Use a sheet for dense action rows without taking full screen."
        footer={<Button onClick={() => setOpenRight(false)}>Done</Button>}
      >
        <p className="text-sm aui-text-muted">Compact editor surface stays close to the source context.</p>
      </SheetShell>
      <SheetShell
        open={openBottom}
        onOpenChange={setOpenBottom}
        side="bottom"
        title="Mobile actions"
        description="Use mobile-friendly sheet for quick row actions."
        footer={<Button variant="outline" onClick={() => setOpenBottom(false)}>Close</Button>}
      >
        <p className="text-sm aui-text-muted">Bottom sheets fit long lists and quick actions on narrow viewports.</p>
      </SheetShell>
    </div>
  )
}`,
  htmlCode: `<button data-slot="sheet-shell-trigger">Open sheet</button>`,
  cliCommand: "npx tembro add sheet-shell",
  highlights: [
    "Side-based drawer behavior",
    "Right and bottom anchors",
    "Footer action slot",
    "Contextual edit pattern",
  ],
  relatedBlockSlugs: ["dashboard-starter", "users-table", "settings-form"],
  scenarios: [
    { title: "Desktop quick editor", description: "Keep row-level actions next to data without leaving page context." },
    { title: "Mobile action panel", description: "Use bottom sheets for compact action drawers on small screens." },
    { title: "Controlled sheet", description: "Parent owns open state and navigation-related side effects." },
    { title: "Action footer", description: "Include explicit Done/Submit for consistent close behavior." },
  ],
  capabilityNotes: [
    "SheetShell should replace full modals when interaction is contextual and task-scoped.",
    "Use side controls based on flow density (right for editors, bottom for mobile actions).",
    "Keep state/validation outside the sheet to prevent focus and mount side effects.",
    "Avoid loading-heavy forms directly in sheets unless the sheet is intentionally a workflow container.",
  ],
}
