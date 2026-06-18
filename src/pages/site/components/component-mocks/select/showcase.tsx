import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/index"

import type { ComponentDemoProps } from "../types"

import { selectDemoGroups } from "./data"

export function SelectShowcase({ state, setState }: ComponentDemoProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Select value={state.selectValue ?? undefined} onValueChange={(value) => setState({ selectValue: value ?? "starter" })}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {selectDemoGroups[0].options.map((option) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select defaultValue={selectDemoGroups[1].options[0].value}>
        <SelectTrigger size="sm" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {selectDemoGroups[1].options.map((option) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
