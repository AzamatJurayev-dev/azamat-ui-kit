import * as React from "react"

import { Badge, ButtonGroup } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function ButtonGroupShowcase({ mode }: ComponentDemoProps) {
  const [view, setView] = React.useState<"list" | "board" | "timeline">("list")

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Grouped control</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">ButtonGroup should make adjacent choices feel like one control set</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Use it for closely related toggles like view mode or density. It should reduce toolbar noise, not create another visual cluster.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">View switching</Badge>
            <Badge variant="outline" className="rounded-full">Toolbar compactness</Badge>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className={panelClass}>
          <ButtonGroup
            items={[
              { key: "list", label: "List", variant: view === "list" ? "default" : "outline", onClick: () => setView("list") },
              { key: "board", label: "Board", variant: view === "board" ? "default" : "outline", onClick: () => setView("board") },
              { key: "timeline", label: "Timeline", variant: view === "timeline" ? "default" : "outline", onClick: () => setView("timeline") },
            ]}
          />
        </section>
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Selected view</p>
          <p className="mt-3 text-base font-medium aui-text-strong">{view}</p>
        </section>
      </div>

      {mode === "playground" ? (
        <section className={panelClass}>
          <p className="text-sm aui-text-muted">ButtonGroup list/board/timeline kabi yaqin tanlovlar uchun yaxshi ishlaydi.</p>
        </section>
      ) : null}
    </div>
  )
}
