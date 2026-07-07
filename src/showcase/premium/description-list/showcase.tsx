import { Badge, Button, DescriptionList } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function DescriptionListShowcase({ mode }: ComponentDemoProps) {
  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Facts surface</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">DescriptionList should turn raw metadata into readable facts</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              This surface is strongest when the user needs to inspect concrete fields quickly, not interpret a dense freeform card.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Structured</Badge>
            <Badge variant="outline" className="rounded-full">Operational metadata</Badge>
          </div>
        </div>
      </section>

      <DescriptionList
        title="Invoice details"
        description="Stable operational metadata for support and billing teams."
        columns={2}
        actions={<Button size="sm" variant="outline">Edit</Button>}
        items={[
          { key: "customer", label: "Customer", value: "Acme Growth" },
          { key: "status", label: "Status", value: "Paid" },
          { key: "owner", label: "Owner", value: "A. Jurayev" },
          { key: "amount", label: "Total", value: "$4,280" },
          { key: "method", label: "Payment method", value: "Corporate card" },
          { key: "notes", label: "Notes", value: "Requires monthly reconciliation with finance.", span: 2 },
        ]}
      />

      {mode === "playground" ? (
        <section className={panelClass}>
          <p className="text-sm aui-text-muted">Bu component invoice, profile, workspace yoki customer detail kabi factual sahifalarda foydali.</p>
        </section>
      ) : null}
    </div>
  )
}
