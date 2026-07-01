import type { ChangeEvent } from "react"

import { Badge, Input } from "@/index"

import type { FamilyDemoProps } from "../types"

const commands = ["Open Button docs", "Open Data table route", "Create template", "Copy install command", "Search blocks"]

export function CommandFamilyShowcase({ state, setState }: FamilyDemoProps) {
  const visible = commands.filter((item) => item.toLowerCase().includes(state.search.toLowerCase()))

  return (
    <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
      <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3">
        <Input value={state.search} onChange={(event: ChangeEvent<HTMLInputElement>) => setState({ search: event.target.value })} placeholder="Type a command..." className="border-0 px-0 shadow-none ring-0 focus-visible:ring-0" />
        <Badge variant="outline">⌘K</Badge>
      </div>
      <div className="mt-4 space-y-3">
        {visible.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm aui-text-strong"
          >
            <span>{item}</span>
            <Badge variant="secondary">Command</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}


