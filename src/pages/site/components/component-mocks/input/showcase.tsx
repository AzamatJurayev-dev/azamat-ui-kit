import { SearchIcon } from "lucide-react"

import { Input } from "@/index"

import type { ComponentDemoProps } from "../types"

import { inputDemoFields } from "./data"

export function InputShowcase({ state, setState, mode }: ComponentDemoProps) {
  const searchField = inputDemoFields[0]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 px-4 py-3">
        <SearchIcon className="size-4 text-zinc-500" />
        <Input value={state.textValue} onChange={(event) => setState({ textValue: event.target.value })} placeholder={searchField.placeholder} className="border-0 px-0 shadow-none ring-0 focus-visible:ring-0" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input defaultValue={inputDemoFields[1].defaultValue} type="email" />
        <Input value={inputDemoFields[2].defaultValue} disabled />
      </div>
      {mode === "playground" ? <Input placeholder={inputDemoFields[3].placeholder} /> : null}
    </div>
  )
}
