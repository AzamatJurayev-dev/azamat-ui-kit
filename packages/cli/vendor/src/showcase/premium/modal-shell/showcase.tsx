import * as React from "react"

import { Badge, Button, Input, ModalShell } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function ModalShellShowcase({ mode }: ComponentDemoProps) {
  const [open, setOpen] = React.useState(false)
  const [infoOpen, setInfoOpen] = React.useState(false)

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Modal shell</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Frame the modal, not the business logic</h3>
            <p className="mt-3 text-sm leading-6 aui-text-muted">Use `ModalShell` when the route owns data and actions but needs one reusable modal frame.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[360px] xl:max-w-[420px]">
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Modes</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">2</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Use for</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">Short forms</p>
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
          <Button onClick={() => setOpen(true)}>Create workspace</Button>
          <Button variant="outline" onClick={() => setInfoOpen(true)}>Open info modal</Button>
          <Badge variant="outline">Controlled shell</Badge>
        </div>
      </section>

      <section className={panelClass}>
        <div className="border-y border-[color:var(--aui-divider)]">
          {[
            "Keep mutations and side effects outside the shell component.",
            "Use small, single-purpose content inside the modal body.",
            "If the screen owns multiple steps, use a bigger route pattern instead.",
          ].map((item) => (
            <div key={item} className="border-b border-[color:var(--aui-divider)] py-3 text-sm leading-6 aui-text-muted last:border-b-0">
              {item}
            </div>
          ))}
        </div>
      </section>

      <ModalShell
        open={open}
        onOpenChange={setOpen}
        title="Create workspace"
        description="Keep this action scoped, controlled, and recoverable."
        size="md"
        footer={
          <div className="flex w-full justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Create</Button>
          </div>
        }
      >
        <label className="space-y-2 text-sm aui-text-strong">
          <span>Workspace name</span>
          <Input defaultValue="Acme workspace" />
        </label>
      </ModalShell>

      <ModalShell
        open={infoOpen}
        onOpenChange={setInfoOpen}
        title="Read-only details"
        description="Good for status, policy notes, and compact confirmation text."
        size="sm"
        footer={<Button className="w-full" onClick={() => setInfoOpen(false)}>Done</Button>}
      >
        <p className="text-sm aui-text-muted">Use a shell modal for small, single-purpose interactions with clear scope.</p>
      </ModalShell>
    </div>
  )
}
