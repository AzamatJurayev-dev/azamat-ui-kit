import type { ChangeEvent } from "react"

import { Badge, Button, Input } from "@/index"

import type { FamilyDemoProps } from "../types"

export function ActionsFamilyShowcase({ state, setState }: FamilyDemoProps) {
  const actions = ["Create invoice", "Duplicate template", "Copy code", "Assign owner", "Export CSV", "Open route"]
  const visibleActions = actions.filter((item) => item.toLowerCase().includes(state.search.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4 md:flex-row md:items-center md:justify-between">
        <Input value={state.search} onChange={(event: ChangeEvent<HTMLInputElement>) => setState({ search: event.target.value })} placeholder="Search actions..." className="w-full md:max-w-xs" />
        <div className="flex gap-3">
          <Button variant="outline">Copy all</Button>
          <Button>New action</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {visibleActions.map((action, index) => (
          <button key={action} className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4 text-left transition hover:bg-[color:var(--aui-surface-muted)]">
            <div className="flex items-center justify-between">
              <p className="aui-text-strong font-medium">{action}</p>
              <Badge variant={index % 2 === 0 ? "secondary" : "outline"}>{index % 2 === 0 ? "Ready" : "Quick"}</Badge>
            </div>
            <p className="aui-text-muted mt-2 text-sm leading-6">Reference action surface with direct click behavior and clear context placement.</p>
          </button>
        ))}
      </div>
    </div>
  )
}



