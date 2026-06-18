import { Badge, Input } from "@/index"

import type { FamilyDemoProps } from "../types"

const commands = ["Open Button docs", "Open Data table playground", "Create template", "Copy install command", "Search blocks"]

export function CommandFamilyShowcase({ state, setState }: FamilyDemoProps) {
  const visible = commands.filter((item) => item.toLowerCase().includes(state.search.toLowerCase()))

  return (
    <div className="rounded-[22px] border border-zinc-200 bg-white p-4">
      <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 px-4 py-3">
        <Input value={state.search} onChange={(event) => setState({ search: event.target.value })} placeholder="Type a command..." className="border-0 px-0 shadow-none ring-0 focus-visible:ring-0" />
        <Badge variant="outline">⌘K</Badge>
      </div>
      <div className="mt-4 space-y-3">
        {visible.map((item) => (
          <div key={item} className="flex items-center justify-between rounded-2xl border border-zinc-100 px-4 py-3 text-sm text-zinc-700">
            <span>{item}</span>
            <Badge variant="secondary">Command</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

