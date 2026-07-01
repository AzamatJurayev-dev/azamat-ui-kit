import * as React from "react"

import { Badge, Button, ConfirmDialog } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function ConfirmDialogShowcase({ mode }: ComponentDemoProps) {
  const [open, setOpen] = React.useState(false)
  const [readonlyOpen, setReadonlyOpen] = React.useState(false)
  const [busy, setBusy] = React.useState(false)

  async function handleConfirm() {
    setBusy(true)
    await new Promise((resolve) => setTimeout(resolve, 700))
    setBusy(false)
    setOpen(false)
  }

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Confirm dialog</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Use it only for explicit checkpoints</h3>
            <p className="mt-3 text-sm leading-6 aui-text-muted">Deletion, archive, publish, or save confirmation should require one clear yes or no.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[360px] xl:max-w-[420px]">
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">State</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{busy ? "Busy" : "Idle"}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Risk</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">High</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Route</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{mode === "playground" ? "Interactive" : "Docs"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setOpen(true)}>Open destructive confirm</Button>
          <Button variant="outline" onClick={() => setReadonlyOpen(true)}>Open save confirm</Button>
          <Badge variant="outline">{busy ? "Waiting for confirm" : "Ready"}</Badge>
        </div>
      </section>

      <section className={panelClass}>
        <div className="border-y border-[color:var(--aui-divider)]">
          {[
            "Keep the action label outcome-specific.",
            "Do not use confirm dialog for long forms or multi-step review.",
            "Mutation state should stay controlled from the page.",
          ].map((item) => (
            <div key={item} className="border-b border-[color:var(--aui-divider)] py-3 text-sm leading-6 aui-text-muted last:border-b-0">
              {item}
            </div>
          ))}
        </div>
      </section>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete resource?"
        description="You are about to remove a production resource. This action is irreversible."
        confirmText="Delete"
        confirmVariant="destructive"
        isLoading={busy}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
      />

      <ConfirmDialog
        open={readonlyOpen}
        onOpenChange={setReadonlyOpen}
        title="Save profile changes"
        description="Keep existing values if this is a draft state."
        confirmText="Save changes"
        onCancel={() => setReadonlyOpen(false)}
        onConfirm={() => setReadonlyOpen(false)}
      />
    </div>
  )
}
