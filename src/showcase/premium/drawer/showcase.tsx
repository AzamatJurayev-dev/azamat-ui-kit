import * as React from "react"

import { Badge, Button, Drawer, DrawerCloseButton } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function DrawerShowcase({ mode }: ComponentDemoProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Context panel</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Drawer should extend context, not replace routing without reason</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              This surface is for inspection and short tasks when the user should keep their place in the current dashboard or table.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Context preserving</Badge>
            <Badge variant="outline" className="rounded-full">Secondary task</Badge>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium aui-text-muted">Live drawer</p>
            <p className="mt-2 text-sm leading-6 aui-text-muted">Open the drawer to inspect workspace details without leaving the current surface.</p>
          </div>
          <Button onClick={() => setOpen(true)}>Open drawer</Button>
        </div>
      </section>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Workspace details"
        description="Context panel for billing, members, and operational notes."
        footer={<DrawerCloseButton>Close panel</DrawerCloseButton>}
      >
        <div className="space-y-4">
          <div className="rounded-2xl border border-[color:var(--aui-divider)] p-4">
            <p className="text-sm font-medium aui-text-strong">Billing owner</p>
            <p className="mt-2 text-sm aui-text-muted">Azamat Jurayev</p>
          </div>
          <div className="rounded-2xl border border-[color:var(--aui-divider)] p-4">
            <p className="text-sm font-medium aui-text-strong">Current note</p>
            <p className="mt-2 text-sm aui-text-muted">This workspace is waiting for compliance verification before release.</p>
          </div>
        </div>
      </Drawer>

      {mode === "playground" ? (
        <section className={panelClass}>
          <p className="text-sm aui-text-muted">Drawer route o‘rnini bosmasligi kerak. U ko‘proq side inspection yoki qisqa edit uchun yaxshi.</p>
        </section>
      ) : null}
    </div>
  )
}
