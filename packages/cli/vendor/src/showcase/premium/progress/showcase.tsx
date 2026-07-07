import * as React from "react"

import { Badge, Button, Progress, ProgressCard } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function ProgressShowcase({ mode }: ComponentDemoProps) {
  const [value, setValue] = React.useState(58)
  const [indeterminate, setIndeterminate] = React.useState(false)

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Completion signal</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Progress should explain movement, not just paint a bar</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              A useful progress surface ties completion to a concrete workflow like sync, rollout, approval, or onboarding.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Deterministic</Badge>
            <Badge variant="outline" className="rounded-full">Indeterminate</Badge>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className={panelClass}>
          <Progress
            label="Workspace import"
            description="Records indexed and validated"
            value={value}
            tone="info"
            showValue
            indeterminate={indeterminate}
          />
        </section>
        <ProgressCard
          title="Release readiness"
          description="Checks passed before public rollout"
          value={value}
          tone={value >= 80 ? "success" : value >= 50 ? "info" : "warning"}
          footer={<p className="text-xs aui-text-muted">Promote only when all gates are green.</p>}
        />
      </div>

      {mode === "playground" ? (
        <section className={panelClass}>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => setValue((current) => Math.max(0, current - 10))}>-10</Button>
            <Button size="sm" variant="outline" onClick={() => setValue((current) => Math.min(100, current + 10))}>+10</Button>
            <Button size="sm" variant="outline" onClick={() => setIndeterminate((current) => !current)}>
              Toggle indeterminate
            </Button>
          </div>
        </section>
      ) : null}
    </div>
  )
}
