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
  onPickedChange?: (value: string[]) => void
  availableTitle?: React.ReactNode
  pickedTitle?: React.ReactNode
  searchPlaceholder?: string
  emptyMessage?: React.ReactNode
  maxPicked?: number
  transferAll?: boolean
}

function DualListPicker({
  items,
  picked = [],
  onPickedChange,
  availableTitle = "Available",
  pickedTitle = "Selected",
  searchPlaceholder = "Search items...",
  emptyMessage = "No items.",
  maxPicked,
  transferAll = true,
  className,
  ...props
}: DualListPickerProps) {
  const [query, setQuery] = React.useState("")
  const pickedSet = new Set(picked)
  const normalizedQuery = query.trim().toLowerCase()
  const matchesQuery = (item: DualListItem) => {
    if (!normalizedQuery) return true
    return String(item.label).toLowerCase().includes(normalizedQuery) || item.value.toLowerCase().includes(normalizedQuery)
  }
  const availableItems = items.filter((item) => !pickedSet.has(item.value) && matchesQuery(item))
  const pickedItems = items.filter((item) => pickedSet.has(item.value) && matchesQuery(item))
  const maxReached = maxPicked !== undefined && picked.length >= maxPicked

  function toggle(value: string) {
    const isPicked = pickedSet.has(value)
    if (!isPicked && maxReached) return
    const next = isPicked ? picked.filter((item) => item !== value) : [...picked, value]
    onPickedChange?.(next)
  }

  function addAll() {
    const next = [...picked]
    for (const item of items) {
      if (item.disabled || pickedSet.has(item.value)) continue
      if (maxPicked !== undefined && next.length >= maxPicked) break
      next.push(item.value)
    }
    onPickedChange?.(next)
  }

  function removeAll() {
    onPickedChange?.([])
  }

  const renderColumn = (title: React.ReactNode, columnItems: DualListItem[], mode: "available" | "picked") => (
    <div className="min-h-48 rounded-lg border bg-card">
      <div className="flex items-center justify-between gap-2 border-b px-3 py-2 text-sm font-medium">
        <span>{title}</span>
        <span className="text-xs font-normal text-muted-foreground">{columnItems.length}</span>
      </div>
      <div className="grid gap-1 p-2">
        {columnItems.length === 0 ? (
          <div className="rounded-md border border-dashed px-3 py-6 text-center text-sm text-muted-foreground">{emptyMessage}</div>
        ) : columnItems.map((item) => (
          <button
            key={item.value}
            type="button"
            disabled={item.disabled || (mode === "available" && maxReached)}
            className="flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50"
            aria-pressed={pickedSet.has(item.value)}
            onClick={() => toggle(item.value)}
          >
            <span>{item.label}</span>
            <span className="text-muted-foreground">{pickedSet.has(item.value) ? "−" : "+"}</span>
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div data-slot="dual-list-picker" className={cn("grid gap-3", className)} {...props}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          placeholder={searchPlaceholder}
          className="h-9 min-w-0 rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:max-w-xs"
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
        {transferAll && (
          <div className="flex gap-2">
            <button type="button" className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50" disabled={maxReached} onClick={addAll}>Add all</button>
            <button type="button" className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50" disabled={picked.length === 0} onClick={removeAll}>Remove all</button>
          </div>
        )}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {renderColumn(availableTitle, availableItems, "available")}
        {renderColumn(pickedTitle, pickedItems, "picked")}
      </div>
      {maxPicked !== undefined && <div className="text-xs text-muted-foreground">{picked.length} / {maxPicked} selected</div>}
    </div>
  )
}

export { DualListPicker }
