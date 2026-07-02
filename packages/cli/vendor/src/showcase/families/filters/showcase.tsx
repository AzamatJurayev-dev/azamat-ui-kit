import type { ChangeEvent } from "react"
import * as React from "react"

import { Badge, Button, FilterChips, Input, SavedFilterSelect, SimpleSelect } from "@/index"

import type { FamilyDemoProps } from "../types"

import { defaultFilterChips, savedViews, statusOptions } from "./data"

export function FiltersFamilyShowcase({ state, setState }: FamilyDemoProps) {
  const [view, setView] = React.useState<string | undefined>("all-pipeline")
  const [status, setStatus] = React.useState<string | undefined>("active")
  const [chips, setChips] = React.useState(defaultFilterChips)

  return (
    <div className="space-y-4">
      <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">SavedFilterSelect</Badge>
              <Badge variant="outline">FilterChips</Badge>
              <Badge variant="outline">SimpleSelect</Badge>
            </div>
            <div>
              <p className="aui-text-strong text-sm font-medium">Filter composition flow</p>
              <p className="aui-text-muted mt-1 text-sm leading-6">
                Search, saved view switch, field-level filter and removable active chips should read like one coherent toolbar rather than separate widgets.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setState({ search: "" })}>Clear query</Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setView("all-pipeline")
                setStatus("active")
                setChips(defaultFilterChips)
                setState({ search: "", notes: "Filters reset to default operating view." })
              }}
            >
              Reset
            </Button>
            <Button size="sm" onClick={() => setState({ notes: "Current filter composition prepared for save flow." })}>Save view</Button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 xl:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <Input
            value={state.search}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setState({ search: event.target.value })}
            placeholder="Search records..."
            className="w-full"
          />
          <SavedFilterSelect
            value={view}
            onValueChange={(value) => {
              setView(value)
              setState({ notes: `${savedViews.find((item) => item.value === value)?.label ?? "View cleared"} applied to the table toolbar.` })
            }}
            filters={savedViews}
            onSave={(name) => setState({ notes: `Saved filter view requested: ${name}` })}
            onDelete={(value) => setState({ notes: `${savedViews.find((item) => item.value === value)?.label ?? value} requested for deletion.` })}
          />
          <SimpleSelect
            value={status}
            onValueChange={(value) => {
              setStatus(value)
              setState({ notes: `${statusOptions.find((item) => item.value === value)?.label ?? "Status cleared"} filter applied.` })
            }}
            options={statusOptions}
            placeholder="Select status"
            clearable
            searchable
          />
        </div>

        <div className="mt-4 rounded-[20px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] p-4">
          <FilterChips
            chips={chips}
            onRemove={(key) => {
              setChips((current) => current.filter((chip) => chip.key !== key))
              setState({ notes: `${key} filter removed from the active toolbar state.` })
            }}
            onClear={() => {
              setChips([])
              setState({ notes: "All active filter chips cleared." })
            }}
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Step 1: query</Badge>
            <Badge variant="outline">Step 2: saved view</Badge>
            <Badge variant="outline">Step 3: active chips</Badge>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-[18px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
              <p className="aui-text-strong text-sm font-medium">Search narrows result scope</p>
              <p className="aui-text-subtle mt-2 text-sm leading-6">Top-level search stays lightweight and pairs with field filters instead of replacing them.</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
              <p className="aui-text-strong text-sm font-medium">Saved view restores intent</p>
              <p className="aui-text-subtle mt-2 text-sm leading-6">Named views bring back common operating states without manually rebuilding every chip.</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
              <p className="aui-text-strong text-sm font-medium">Chips expose active state</p>
              <p className="aui-text-subtle mt-2 text-sm leading-6">Each chip can be removed independently, and clear-all stays available for quick resets.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
          <div className="grid gap-3">
            <div className="rounded-[18px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
              <p className="aui-text-muted text-sm">Current query</p>
              <p className="aui-text-strong mt-2 text-lg font-semibold">{state.search || "All records"}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
              <p className="aui-text-muted text-sm">Saved view</p>
              <p className="aui-text-strong mt-2 text-lg font-semibold">{savedViews.find((item) => item.value === view)?.label ?? "None"}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
              <p className="aui-text-muted text-sm">Active chips</p>
              <p className="aui-text-strong mt-2 text-lg font-semibold">{chips.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
