import * as React from "react"

import { Badge, Input, Kbd } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

const sourceRows = [
  "Acme Growth workspace",
  "Invoice 2048 approval",
  "Northwind billing route",
  "Customer retention dashboard",
  "Workspace member access",
  "Export usage report",
]

export function SearchInputShowcase({ mode }: ComponentDemoProps) {
  const [value, setValue] = React.useState("")
  const [debouncedValue, setDebouncedValue] = React.useState("")

  const filtered = React.useMemo(() => {
    const normalized = debouncedValue.trim().toLowerCase()
    if (!normalized) return sourceRows
    return sourceRows.filter((row) => row.toLowerCase().includes(normalized))
  }, [debouncedValue])

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Search control</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">SearchInput should shorten finding, not add interface noise</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              A good search field exposes intent clearly: what can be searched, how many matches remain, and whether the query is still being processed.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Debounced</Badge>
            <Badge variant="outline" className="rounded-full">Shortcut aware</Badge>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <Input
          kind="search"
          value={value}
          onValueChange={setValue}
          onDebouncedValueChange={setDebouncedValue}
          placeholder="Search customers, invoices, or routes..."
          resultCount={filtered.length}
          shortcut={<Kbd>Ctrl+K</Kbd>}
          debounceMs={250}
        />
      </section>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Resolved query</p>
          <p className="mt-3 text-base font-medium aui-text-strong">{debouncedValue || "No active query"}</p>
          <p className="mt-2 text-sm leading-6 aui-text-muted">The debounced value represents what should usually drive remote or expensive filters.</p>
        </section>
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Preview results</p>
          <div className="mt-4 space-y-2 text-sm">
            {filtered.map((row) => (
              <div key={row} className="rounded-2xl border border-[color:var(--aui-divider)] px-3 py-2 aui-text-muted">
                {row}
              </div>
            ))}
          </div>
        </section>
      </div>

      {mode === "playground" ? (
        <section className={panelClass}>
          <p className="text-sm aui-text-muted">Try searching for `invoice`, `workspace`, or `billing`.</p>
        </section>
      ) : null}
    </div>
  )
}
