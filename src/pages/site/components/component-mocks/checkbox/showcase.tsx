import { Checkbox } from "@/index"

import type { ComponentDemoProps } from "../types"

import { checkboxDemoItems } from "./data"

export function CheckboxShowcase({ state, setState, mode }: ComponentDemoProps) {
  return (
    <div className="space-y-3">
      {checkboxDemoItems.map((item, index) => (
        <div key={item.label} className="flex items-start gap-3 rounded-2xl border border-zinc-200 p-4">
          <Checkbox
            checked={index === 0 ? state.checked : item.checked}
            disabled={item.disabled}
            onCheckedChange={index === 0 ? (checked) => setState({ checked: Boolean(checked) }) : undefined}
            defaultChecked={index > 0 ? item.checked : undefined}
          />
          <div>
            <p className="text-sm font-medium text-zinc-700">{item.label}</p>
            <p className="mt-1 text-sm text-zinc-500">{mode === "playground" ? item.description : item.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
