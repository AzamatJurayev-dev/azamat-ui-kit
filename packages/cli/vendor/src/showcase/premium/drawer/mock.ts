import type { ComponentDemoMock } from "../types"

export const drawerMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { Button, Drawer, DrawerCloseButton } from "tembro"

export function Example() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Workspace details"
        description="Quick side-panel context"
        footer={<DrawerCloseButton>Close</DrawerCloseButton>}
      >
        Drawer content
      </Drawer>
    </>
  )
}`,
  highlights: ["Contextual side panel", "Multiple side placements", "Scrollable body area", "Footer action support"],
  scenarios: [
    { title: "Inspect record", description: "Open customer, invoice, or task details without losing the current page." },
    { title: "Quick edit", description: "Handle light edits or metadata checks in a side surface." },
    { title: "Context panel", description: "Keep supporting information available next to a dense dashboard." },
  ],
  capabilityNotes: [
    "Use drawer when the user should keep page context while inspecting or editing something secondary.",
    "Right-side drawers fit admin inspection flows well.",
    "If the content becomes a full task, it may deserve its own route instead.",
  ],
}
