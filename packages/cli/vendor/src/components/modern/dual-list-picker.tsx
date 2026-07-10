import * as React from "react"

import { cn } from "@/lib/utils"

export type DualListItem = {
  label: React.ReactNode
  value: string
  disabled?: boolean
}

export type DualListPickerProps = React.ComponentProps<"div"> & {
  items: DualListItem[]
  picked?: string[]
  defaultPicked?: string[]
  onPickedChange?: (value: string[]) => void
  availableTitle?: React.ReactNode
  pickedTitle?: React.ReactNode
}

function DualListPicker({ items, picked, defaultPicked = [], onPickedChange, availableTitle = "Available", pickedTitle = "Selected", className, ...props }: DualListPickerProps) {
  const [internalPicked, setInternalPicked] = React.useState(defaultPicked)
  const currentPicked = picked ?? internalPicked
  const pickedSet = new Set(currentPicked)
  const availableItems = items.filter((item) => !pickedSet.has(item.value))
  const pickedItems = items.filter((item) => pickedSet.has(item.value))

  function toggle(value: string) {
    const next = pickedSet.has(value) ? currentPicked.filter((item) => item !== value) : [...currentPicked, value]
    if (picked === undefined) setInternalPicked(next)
    onPickedChange?.(next)
  }

  const renderColumn = (title: React.ReactNode, columnItems: DualListItem[]) => (
    <div className="min-h-48 rounded-lg border bg-card">
      <div className="border-b px-3 py-2 text-sm font-medium">{title}</div>
      <div className="grid gap-1 p-2">
        {columnItems.map((item) => (
          <button key={item.value} type="button" disabled={item.disabled} aria-pressed={pickedSet.has(item.value)} className="flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted disabled:opacity-50" onClick={() => toggle(item.value)}>
            <span>{item.label}</span>
            <span className="text-muted-foreground">{pickedSet.has(item.value) ? "−" : "+"}</span>
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div data-slot="dual-list-picker" className={cn("grid gap-3 md:grid-cols-2", className)} {...props}>
      {renderColumn(availableTitle, availableItems)}
      {renderColumn(pickedTitle, pickedItems)}
    </div>
  )
}

export { DualListPicker }
