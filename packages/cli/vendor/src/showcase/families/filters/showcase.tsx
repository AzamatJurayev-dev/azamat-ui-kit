import type { ChangeEvent } from "react"

import { Badge, Button, Input } from "@/index"

import type { FamilyDemoProps } from "../types"

const chips = ["Active", "Enterprise", "This month", "Assigned"]

export function FiltersFamilyShowcase({ state, setState }: FamilyDemoProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4 lg:flex-row lg:items-center lg:justify-between">
        <Input value={state.search} onChange={(event: ChangeEvent<HTMLInputElement>) => setState({ search: event.target.value })} placeholder="Search records..." className="w-full lg:max-w-xs" />
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">Status</Button>
          <Button variant="outline">Owner</Button>
          <Button variant="outline">Period</Button>
          <Button>Save view</Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <Badge key={chip} variant="outline" className="rounded-full px-3 py-1">{chip}</Badge>
        ))}
      </div>
      <div className="aui-text-muted rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] p-4 text-sm">
        Current query: {state.search || "all records"} with 4 active refinement chips.
      </div>
    </div>
  )
}


