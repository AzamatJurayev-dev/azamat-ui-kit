import type { ChangeEvent } from "react"

import { Badge, Button, Input } from "@/index"

import type { FamilyDemoProps } from "../types"

export function LayoutFamilyShowcase({ state, setState }: FamilyDemoProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-[0.24fr_1fr]">
      <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] p-4">
        {["Overview", "Analytics", "Customers", "Orders", "Settings"].map((item, index) => (
          <div key={item} className={`mb-2 rounded-xl px-3 py-2.5 text-sm ${index === 0 ? "aui-surface-strong" : "bg-[color:var(--aui-surface)] aui-text-muted"}`}>
            {item}
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-2xl font-semibold tracking-tight">Revenue overview</p>
            <p className="aui-text-muted text-sm">Structured layout with reusable surface hierarchy.</p>
          </div>
          <div className="flex gap-3">
            <Input value={state.search} onChange={(event: ChangeEvent<HTMLInputElement>) => setState({ search: event.target.value })} placeholder="Search workspace..." className="w-48" />
            <Button>New report</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Revenue", "$24,780"],
            ["Active users", "18,390"],
            ["Conversion", "6.3%"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
              <p className="aui-text-muted text-sm">{label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
              <Badge className="mt-3 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Live</Badge>
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_0.38fr]">
          <div className="h-48 rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[linear-gradient(180deg,rgba(59,130,246,0.12),transparent),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.18),transparent_40%)]" />
          <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
            <p className="font-medium">Recent updates</p>
            <div className="aui-text-muted mt-4 space-y-3 text-sm">
              <div>Dashboard tokens synced</div>
              <div>Sidebar nav refreshed</div>
              <div>Header metrics updated</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


