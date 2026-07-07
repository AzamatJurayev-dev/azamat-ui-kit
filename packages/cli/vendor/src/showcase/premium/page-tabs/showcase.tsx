import * as React from "react"

import { Badge, PageTabs } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function PageTabsShowcase({ mode }: ComponentDemoProps) {
  const [tab, setTab] = React.useState<"overview" | "billing" | "activity">("overview")
  const [variant, setVariant] = React.useState<"underline" | "pills" | "cards">("underline")

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Page navigation</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">PageTabs should structure major sections, not minor control state</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              This surface is for broad route or detail-page navigation where the user needs clear top-level section switching.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Route scale</Badge>
            <Badge variant="outline" className="rounded-full">Badge support</Badge>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <PageTabs
          value={tab}
          variant={variant}
          onValueChange={(nextValue) => setTab(nextValue as typeof tab)}
          items={[
            { value: "overview", label: "Overview" },
            { value: "billing", label: "Billing", badge: 2 },
            { value: "activity", label: "Activity" },
          ]}
        />
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Active tab</p>
          <p className="mt-3 text-base font-medium aui-text-strong">{tab}</p>
        </section>
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Variant</p>
          <p className="mt-3 text-base font-medium aui-text-strong">{variant}</p>
        </section>
      </div>

      {mode === "playground" ? (
        <section className={panelClass}>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="rounded-full border border-[color:var(--aui-divider)] px-3 py-2 text-sm" onClick={() => setVariant("underline")}>Underline</button>
            <button type="button" className="rounded-full border border-[color:var(--aui-divider)] px-3 py-2 text-sm" onClick={() => setVariant("pills")}>Pills</button>
            <button type="button" className="rounded-full border border-[color:var(--aui-divider)] px-3 py-2 text-sm" onClick={() => setVariant("cards")}>Cards</button>
          </div>
        </section>
      ) : null}
    </div>
  )
}
