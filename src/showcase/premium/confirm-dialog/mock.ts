import type { ComponentDemoMock } from "../types"

export const confirmDialogMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { Button, ConfirmDialog } from "@/index"

export function Example() {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  async function handleConfirm() {
    setBusy(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setBusy(false)
    setOpen(false)
  }

  return (
    <div className="space-y-3">
      <Button onClick={() => setOpen(true)} variant="destructive">
        Delete project
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete project?"
        description="This action cannot be undone. Team members will lose access immediately."
        confirmText="Delete forever"
        confirmVariant="destructive"
        isLoading={busy}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  )
}`,
  htmlCode: `<button data-slot="confirm-trigger">Delete project</button>`,
  cliCommand: "npx tembro add confirm-dialog",
  highlights: [
    "Controlled confirm flow",
    "Destructive tone and explicit labels",
    "Async confirm loading state",
    "Cancel-first safety behavior",
  ],
  relatedBlockSlugs: ["settings-form", "crm-dashboard", "dashboard-starter"],
  scenarios: [
    { title: "Destructive confirm", description: "Use explicit confirm wording for irreversible actions." },
    { title: "Async confirmation", description: "Keep action button loading while server side mutation is running." },
    { title: "Safe cancel", description: "Allow immediate escape via cancel or outside interactions if supported." },
    { title: "Context-rich dialog", description: "Always include title and short description that explain impact." },
  ],
  capabilityNotes: [
    "Use ConfirmDialog where user intent is high-risk and needs explicit language.",
    "Keep confirm labels noun-first (`Delete workspace`) to reduce ambiguity.",
    "Tie `isLoading` to async mutation state and close only on success.",
    "Avoid reusing default labels for destructive flows.",
  ],
}

