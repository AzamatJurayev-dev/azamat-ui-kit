"use client"

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
  searchPlaceholder?: string
  emptyMessage?: React.ReactNode
  maxPicked?: number
  transferAll?: boolean
}

function DualListPicker({
  items,
  picked,
  defaultPicked = [],
  onPickedChange,
  availableTitle = "Available",
  pickedTitle = "Selected",
  searchPlaceholder = "Search items...",
  emptyMessage = "Nothing to show.",
  maxPicked,
  transferAll = true,
  className,
  ...props
}: DualListPickerProps) {
  const [internalPicked, setInternalPicked] = React.useState(defaultPicked)
  const [query, setQuery] = React.useState("")
  const currentPicked = picked ?? internalPicked
  const pickedSet = React.useMemo(() => new Set(currentPicked), [currentPicked])

  const normalizedQuery = query.trim().toLowerCase()
  const matchesQuery = React.useCallback(
    (item: DualListItem) => {
      if (!normalizedQuery) return true
      const label = typeof item.label === "string" ? item.label : String(item.value)
      return label.toLowerCase().includes(normalizedQuery) || item.value.toLowerCase().includes(normalizedQuery)
    },
    [normalizedQuery]
  )

  const availableItems = React.useMemo(
    () => items.filter((item) => !pickedSet.has(item.value) && matchesQuery(item)),
    [items, matchesQuery, pickedSet]
  )
  const pickedItems = React.useMemo(
    () => items.filter((item) => pickedSet.has(item.value) && matchesQuery(item)),
    [items, matchesQuery, pickedSet]
  )
  const maxReached = maxPicked !== undefined && currentPicked.length >= maxPicked

  const setPickedValues = React.useCallback(
    (next: string[]) => {
      if (picked === undefined) {
        setInternalPicked(next)
      }
      onPickedChange?.(next)
    },
    [onPickedChange, picked]
  )

  function toggle(value: string) {
    if (pickedSet.has(value)) {
      setPickedValues(currentPicked.filter((item) => item !== value))
      return
    }

    if (maxReached) return
    setPickedValues([...currentPicked, value])
  }

  function addAll() {
    const next = [...currentPicked]

    for (const item of items) {
      if (item.disabled || pickedSet.has(item.value)) continue
      if (maxPicked !== undefined && next.length >= maxPicked) break
      next.push(item.value)
    }

    setPickedValues(next)
  }

  function removeAll() {
    setPickedValues([])
  }

  const renderColumn = (title: React.ReactNode, columnItems: DualListItem[]) => (
    <div className="min-h-48 rounded-lg border bg-card">
      <div className="flex items-center justify-between gap-2 border-b px-3 py-2 text-sm font-medium">
        <span>{title}</span>
        <span className="text-xs font-normal text-muted-foreground">{columnItems.length}</span>
      </div>
      <div className="grid gap-1 p-2">
        {columnItems.length ? (
          columnItems.map((item) => (
            <button
              key={item.value}
              type="button"
              disabled={item.disabled}
              aria-pressed={pickedSet.has(item.value)}
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted disabled:opacity-50"
              onClick={() => toggle(item.value)}
            >
              <span>{item.label}</span>
              <span className="text-muted-foreground">{pickedSet.has(item.value) ? "−" : "+"}</span>
            </button>
          ))
        ) : (
          <div className="px-2 py-3 text-sm text-muted-foreground">{emptyMessage}</div>
        )}
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
        {transferAll ? (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
              disabled={maxReached}
              onClick={addAll}
            >
              Add all
            </button>
            <button
              type="button"
              className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
              disabled={currentPicked.length === 0}
              onClick={removeAll}
            >
              Remove all
            </button>
          </div>
        ) : null}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {renderColumn(availableTitle, availableItems)}
        {renderColumn(pickedTitle, pickedItems)}
      </div>

      {maxPicked !== undefined ? (
        <div className="text-xs text-muted-foreground">
          {currentPicked.length} / {maxPicked} selected
        </div>
      ) : null}
    </div>
  )
}

export { DualListPicker }
