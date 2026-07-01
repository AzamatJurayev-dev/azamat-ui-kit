import * as React from "react"

import { Badge, Button, Collapse, CollapseContent, CollapseGroup, CollapseTrigger } from "@/index"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

const collapseItems = [
  {
    key: "permissions",
    title: "Permissions",
    description: "Who can publish, archive, and rename library surfaces.",
    content: "Owners can publish. Editors can update docs. Reviewers can inspect previews and comment on API shape.",
  },
  {
    key: "release",
    title: "Release notes",
    description: "What changed in the current package cycle.",
    content: "This release opened more public docs coverage for interactive form and overlay surfaces.",
  },
  {
    key: "handoff",
    title: "Handoff checklist",
    description: "What must be checked before a public release.",
    content: "Typecheck, lint, build, smoke routes, verify copy feedback, and confirm component docs route integrity.",
  },
] as const

export function CollapseShowcase() {
  const [open, setOpen] = React.useState(false)
  const [groupValue, setGroupValue] = React.useState<string | string[]>("permissions")

  const normalizedGroupValue = Array.isArray(groupValue) ? groupValue.join(", ") || "none" : groupValue || "none"

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Progressive disclosure</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Collapse should reduce page noise first</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Keep the default surface compact, then reveal secondary information only when the user chooses to inspect it.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Single item</Badge>
            <Badge variant="outline" className="rounded-full">Grouped items</Badge>
            <Badge variant="outline" className="rounded-full">Controlled state</Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <div className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Single disclosure</p>
            <div className="mt-3">
              <Collapse open={open} onOpenChange={setOpen}>
                <CollapseTrigger>Publish access rules</CollapseTrigger>
                <CollapseContent>
                  Owners can publish releases. Editors can update docs content. Reviewers can inspect previews without changing package state.
                </CollapseContent>
              </Collapse>
            </div>
          </div>

          <div className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Grouped disclosure</p>
            <div className="mt-3">
              <CollapseGroup
                items={collapseItems.map((item) => ({ ...item }))}
                type="single"
                value={groupValue}
                onValueChange={setGroupValue}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Live state</p>
            <h4 className="mt-2 text-lg font-semibold aui-text-strong">
              Single item: {open ? "open" : "closed"} | Group: {normalizedGroupValue}
            </h4>
            <p className="mt-2 text-sm leading-6 aui-text-muted">
              Use quick actions to verify controlled open state without relying only on the disclosure click target.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" onClick={() => setOpen(true)}>
              Open single
            </Button>
            <Button type="button" size="sm" variant="secondary" onClick={() => setOpen(false)}>
              Close single
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={() => setGroupValue("release")}>
              Open release
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
