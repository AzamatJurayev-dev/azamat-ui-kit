import type { ComponentDemoMock } from "../types"

export const alertDialogMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { AlertDialog, Button } from "@azamatjurayevdev/azix-ui"

export function Example() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>Delete workspace</Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete workspace?"
        description="This removes active billing rules and member access."
        actionLabel="Delete"
      />
    </>
  )
}`,
  highlights: ["Destructive confirmation flow", "Async-ready action state", "Strong title + consequence copy", "Built on the same dialog primitives as the rest of the system"],
  scenarios: [
    { title: "Delete resource", description: "Require explicit confirmation before destructive irreversible actions." },
    { title: "Reset configuration", description: "Warn users when policies, tokens, or routes will be cleared." },
    { title: "High-risk approval", description: "Pause sensitive admin actions until the user confirms consequences." },
  ],
  capabilityNotes: [
    "Use alert-dialog only for genuinely high-risk actions.",
    "The description should explain consequence, not restate the title.",
    "If the action is recoverable or low-risk, a regular dialog is often enough.",
  ],
}
