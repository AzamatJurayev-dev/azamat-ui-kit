import * as React from "react"

import { Badge, SavedFilterSelect } from "@/index"
import { routeSavedViews } from "@/showcase/component-route-data"

export function SavedFilterSelectShowcase() {
  const [value, setValue] = React.useState<string | undefined>("billing")

  return (
    <div className="space-y-4">
      <div className="rounded-[20px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Saved views</Badge>
          <Badge variant="outline">Delete action</Badge>
          <Badge variant="outline">Toolbar-ready</Badge>
        </div>
        <p className="mt-3 text-sm font-medium aui-text-strong">SavedFilterSelect is the named-view control</p>
        <p className="mt-2 text-sm leading-6 aui-text-muted">
          Use it when operators need to restore common table states quickly instead of rebuilding every filter combination manually.
        </p>
      </div>

      <SavedFilterSelect
        value={value}
        onValueChange={setValue}
        filters={routeSavedViews}
        onSave={() => undefined}
        onDelete={() => undefined}
      />

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Active view</p>
          <p className="mt-2 aui-text-muted">{routeSavedViews.find((item) => item.value === value)?.label ?? "No saved view"}</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Interaction model</p>
          <p className="mt-2 aui-text-muted">Delete actions stay isolated from the parent list item selection.</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Use case</p>
          <p className="mt-2 aui-text-muted">Operational tables, finance queues and admin list views.</p>
        </div>
      </div>
    </div>
  )
}
