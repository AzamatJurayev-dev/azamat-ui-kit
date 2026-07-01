import type { ComponentDemoMock } from "../types"

export const dialogMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/index"

export function Example() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button>Publish</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish update</DialogTitle>
          <DialogDescription>
            Confirm that these notes are final before moving to production.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
  htmlCode: `<button data-slot="dialog-trigger">Open dialog</button>`,
  cliCommand: "npx azamat-ui-kit-cli add dialog",
  highlights: [
    "Controlled open state",
    "Title and description requirement",
    "Destructive confirm flow",
    "Close + confirm action pattern",
  ],
  relatedBlockSlugs: ["auth-sign-in", "settings-form", "crm-dashboard"],
  scenarios: [
    { title: "Controlled modal", description: "Use open/onOpenChange when external logic must gate workflow." },
    { title: "Publish confirmation", description: "Protect irreversible actions with explicit confirm/cancel controls." },
    { title: "Destructive confirm", description: "Use tone and labeling that communicates permanence." },
    { title: "Form dialog", description: "Render focused forms and validation inside a constrained modal shell." },
  ],
  capabilityNotes: [
    "Use Dialog for focused single-purpose user tasks; avoid replacing entire workflow in an overlay.",
    "Title and description should clearly explain context and impact.",
    "Controlled props are important when submitting calls backend APIs or opening from global state.",
    "For destructive actions, prefer explicit wording and secondary cancel path.",
  ],
}
