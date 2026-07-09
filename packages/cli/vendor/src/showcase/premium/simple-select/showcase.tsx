import { useState } from "react"

import { Badge, Button, Select } from "@/index"
import { routeSimpleSelectOptions } from "@/showcase/component-route-data"

import type { ComponentDemoProps } from "../types"

export function SimpleSelectShowcase({ mode }: ComponentDemoProps) {
  const [value, setValue] = useState<string | undefined>("private")
  const [uncontrolledKey, setUncontrolledKey] = useState(0)
  const options = routeSimpleSelectOptions
  const activeOption = options.find((item) => item.value === value)

  return (
    <div className="space-y-4">
      <div className="rounded-[20px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
        <p className="text-sm font-medium aui-text-strong">SimpleSelect is the lightweight static member</p>
        <p className="mt-2 text-sm leading-6 aui-text-muted">
          Use it only when you want a thinner wrapper around the main Select surface for static option lists.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="outline">Static options</Badge>
          <Badge variant="outline">Searchable</Badge>
          <Badge variant="outline">Clearable</Badge>
        </div>
      </div>
      <Select
        value={value}
        onValueChange={(nextValue) => setValue(nextValue)}
        options={options}
        placeholder="Visibility"
        searchable
        clearable
        showSelectedDescription
      />
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Current value</p>
          <p className="mt-2 aui-text-muted">{activeOption?.label ?? "Nothing selected"}</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Behavior</p>
          <p className="mt-2 aui-text-muted">Clear icon and disabled items behave inside the same trigger model.</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">When to use</p>
          <p className="mt-2 aui-text-muted">Choose this for local option lists before moving to AsyncSelect.</p>
        </div>
      </div>
      <Select key={uncontrolledKey} defaultValue="public" options={options} showSelectedDescription />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => setValue(undefined)}>
          Clear controlled
        </Button>
        <Button variant="outline" size="sm" onClick={() => setUncontrolledKey((prev) => prev + 1)}>
          Reset uncontrolled sample
        </Button>
      </div>
      {mode === "playground" ? (
        <p className="aui-text-muted rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          Controlled selection can power filter states, while uncontrolled default usage is fine for one-off static forms. If the list becomes remote, move back to the Select family and choose AsyncSelect.
        </p>
      ) : null}
    </div>
  )
}
