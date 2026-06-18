import { Badge, Button, Input, Textarea } from "@/index"

import type { FamilyDemoProps } from "../types"

import { formDemoActions, formDemoFields } from "./data"

export function FormFamilyShowcase({ state, setState }: FamilyDemoProps) {
  return (
    <div className="space-y-4 rounded-[22px] border border-zinc-200 bg-white p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-zinc-700">{formDemoFields[0].label}</p>
          <Input value={state.search} onChange={(event) => setState({ search: event.target.value })} placeholder="Azamat UI Workspace" />
          <p className="mt-2 text-sm text-zinc-500">{formDemoFields[0].helper}</p>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-zinc-700">{formDemoFields[1].label}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Active</Badge>
            <Badge variant="outline">Pro</Badge>
          </div>
          <p className="mt-2 text-sm text-zinc-500">{formDemoFields[1].helper}</p>
        </div>
        <div className="md:col-span-2">
          <p className="mb-2 text-sm font-medium text-zinc-700">{formDemoFields[2].label}</p>
          <Textarea value={state.notes} onChange={(event) => setState({ notes: event.target.value })} className="min-h-24" />
          <p className="mt-2 text-sm text-zinc-500">{formDemoFields[2].helper}</p>
        </div>
      </div>
      <div className="flex gap-3">
        {formDemoActions.map((action) => (
          <Button key={action.label} variant={action.variant}>{action.label}</Button>
        ))}
      </div>
    </div>
  )
}
