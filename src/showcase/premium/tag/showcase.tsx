import * as React from "react"

import { Button } from "@/index"
import { Tag } from "@/components/display/tag"

export function TagShowcase() {
  const all = [
    { key: "team", label: "Design team", tone: "info" as const },
    { key: "ready", label: "Ready", tone: "success" as const },
    { key: "warn", label: "Needs review", tone: "warning" as const },
    { key: "block", label: "Blocked", tone: "danger" as const },
  ]
  const [items, setItems] = React.useState(all)

  const remove = (key: string) => setItems((current) => current.filter((item) => item.key !== key))
  const reset = () => setItems(all)

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Metadata</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Tags should stay compact and removable</h3>
            <p className="mt-3 text-sm leading-6 aui-text-muted">
              Use tags for filters, topics, and lightweight status metadata where the user may need to remove a single token.
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {items.map((item) => (
            <Tag key={item.key} tone={item.tone} removable onRemove={() => remove(item.key)}>
              {item.label}
            </Tag>
          ))}
          {items.length === 0 ? <span className="text-sm aui-text-muted">No filters</span> : null}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Sizes</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Tag size="sm">Small</Tag>
            <Tag>Default</Tag>
            <Tag size="lg">Large</Tag>
            <Tag selected>Selected</Tag>
          </div>
        </div>

        <div className="rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Tones</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Tag tone="neutral">Neutral</Tag>
            <Tag tone="info">Info</Tag>
            <Tag tone="success">Success</Tag>
            <Tag tone="warning">Warning</Tag>
            <Tag tone="danger">Danger</Tag>
          </div>
        </div>
      </section>
    </div>
  )
}
