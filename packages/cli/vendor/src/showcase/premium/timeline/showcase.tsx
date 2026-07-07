import * as React from "react"

import { Badge, Button, Timeline } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

const items = [
  { key: "workspace", title: "Workspace created", description: "Initial billing and member sync finished.", time: "09:12", tone: "success" as const },
  { key: "review", title: "Compliance review", description: "Policy verification is in progress.", time: "09:30", tone: "info" as const },
  { key: "deploy", title: "Deployment scheduled", description: "Promotion waits for final approval.", time: "10:00", tone: "warning" as const },
]

export function TimelineShowcase({ mode }: ComponentDemoProps) {
  const [horizontal, setHorizontal] = React.useState(false)

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Sequence view</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Timeline should make process history legible at a glance</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              If order matters, timeline is stronger than generic cards. Users should see what happened, what is pending, and what comes next.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Vertical</Badge>
            <Badge variant="outline" className="rounded-full">Horizontal</Badge>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <Timeline items={items} orientation={horizontal ? "horizontal" : "vertical"} pending pendingLabel="Approval pending" />
      </section>

      {mode === "playground" ? (
        <section className={panelClass}>
          <Button size="sm" variant="outline" onClick={() => setHorizontal((current) => !current)}>
            Toggle orientation
          </Button>
        </section>
      ) : null}
    </div>
  )
}
