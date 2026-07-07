import * as React from "react"

import { Button, Tag } from "@/index"

export function TagShowcase() {
  const all = [
    { key: "team", label: "Team", tone: "info" as const },
    { key: "ready", label: "Ready", tone: "success" as const },
    { key: "warn", label: "Warn", tone: "warning" as const },
    { key: "block", label: "Blocked", tone: "danger" as const },
  ]
  const [items, setItems] = React.useState(all)

  const remove = (key: string) => setItems((current) => current.filter((item) => item.key !== key))
  const reset = () => setItems(all)

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-foreground">Filter tags</p>
          <Button size="sm" variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Tag key={item.key} tone={item.tone} removable onRemove={() => remove(item.key)}>
              {item.label}
            </Tag>
          ))}
          {items.length === 0 ? <span className="text-sm text-muted-foreground">No filters</span> : null}
        </div>
      </div>
    </div>
  )
}
