import type { ComponentDemoMock } from "../types"

export const modalShellMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { Badge, Button, Input, ModalShell } from "tembro"

export function Example() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create workspace</Button>
      <ModalShell
        open={open}
        onOpenChange={setOpen}
        title="Create workspace"
        description="Collect a name and visibility before generating a share token."
        size="md"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Create</Button>
          </div>
        }
      >
        <label className="space-y-2 text-sm aui-text-subtle">
          <span>Workspace name</span>
          <Input defaultValue="Marketing portal" />
        </label>
      </ModalShell>
    </div>
  )
}`,
  htmlCode: `<button data-slot="modal-shell-trigger">Open modal</button>`,
  cliCommand: "npx tembro add modal-shell",
  highlights: [
    "Controlled modal shell",
    "Reusable form shell layout",
    "Footer actions and close handling",
    "Stable when used for short workflows",
  ],
  relatedBlockSlugs: ["settings-form", "users-table", "crm-dashboard"],
  scenarios: [
    { title: "Workspace creator", description: "Use modal shell for focused create/edit forms." },
    { title: "Info-only overlay", description: "Render readonly summaries without mutating data." },
    { title: "Decision panel", description: "Keep action buttons consistently placed in the footer slot." },
    { title: "Size control", description: "Use `size` to avoid accidental cramped content in compact overlays." },
  ],
  capabilityNotes: [
    "ModalShell is a wrapper for focused interactions that should remain small and explicit.",
    "Prefer controlled open state from parent so route transitions and API calls stay predictable.",
    "Use footer slot for confirm/cancel; avoid embedding form submission in untracked triggers.",
    "Close button behavior should always be deterministic for accessibility and keyboard flows.",
  ],
}
