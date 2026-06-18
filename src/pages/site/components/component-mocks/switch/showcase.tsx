import { Switch } from "@/index"

import type { ComponentDemoProps } from "../types"

import { switchDemoRows } from "./data"

export function SwitchShowcase({ state, setState }: ComponentDemoProps) {
  return (
    <div className="space-y-3">
      {switchDemoRows.map((row, index) => (
        <div key={row.title} className="flex items-center justify-between rounded-2xl border border-zinc-200 p-4">
          <div>
            <p className="font-medium text-zinc-950">{row.title}</p>
            <p className="text-sm text-zinc-500">{row.description}</p>
          </div>
          <Switch checked={index === 0 ? state.switchOn : row.defaultChecked} onCheckedChange={index === 0 ? (switchOn) => setState({ switchOn }) : undefined} defaultChecked={index > 0 ? row.defaultChecked : undefined} />
        </div>
      ))}
    </div>
  )
}
