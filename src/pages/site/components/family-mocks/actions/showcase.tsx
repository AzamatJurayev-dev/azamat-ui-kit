import { Badge, Button, Input } from "@/index"

import type { FamilyDemoProps } from "../types"

export function ActionsFamilyShowcase({ state, setState }: FamilyDemoProps) {
  const actions = ["Create invoice", "Duplicate template", "Copy code", "Assign owner", "Export CSV", "Open preview"]
  const visibleActions = actions.filter((item) => item.toLowerCase().includes(state.search.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-[22px] border border-zinc-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
        <Input value={state.search} onChange={(event) => setState({ search: event.target.value })} placeholder="Search actions..." className="w-full md:max-w-xs" />
        <div className="flex gap-3">
          <Button variant="outline">Copy all</Button>
          <Button>New action</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {visibleActions.map((action, index) => (
          <button key={action} className="rounded-[22px] border border-zinc-200 bg-white p-4 text-left transition hover:bg-zinc-50">
            <div className="flex items-center justify-between">
              <p className="font-medium text-zinc-950">{action}</p>
              <Badge variant={index % 2 === 0 ? "secondary" : "outline"}>{index % 2 === 0 ? "Ready" : "Quick"}</Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-500">Mock action surface with direct click behavior and clear context placement.</p>
          </button>
        ))}
      </div>
    </div>
  )
}

