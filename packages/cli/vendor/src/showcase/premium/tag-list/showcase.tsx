import * as React from "react"

import { TagList } from "@/index"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

const initialItems = [
  { key: "react", label: "React" },
  { key: "typescript", label: "TypeScript" },
  { key: "dashboard", label: "Dashboard" },
  { key: "design-system", label: "Design system" },
  { key: "release", label: "Release" },
]

export function TagListShowcase() {
  const [items, setItems] = React.useState(initialItems)

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Installed display primitive</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">TagList shows existing labels, not text entry</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 aui-text-muted">
          Use TagList to display or lightly edit known labels. If the user must type new values, move to TagInput instead.
        </p>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div>
            <p className="text-lg font-semibold aui-text-strong">Editable metadata chips</p>
            <p className="mt-2 max-w-xl text-sm leading-6 aui-text-muted">
              Remove actions should stay small and secondary so the tags remain readable as content first.
            </p>
            <div className="mt-5 rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
              <TagList
                items={items}
                removable
                onRemove={(item) => setItems((current) => current.filter((entry) => entry.key !== item.key))}
              />
            </div>
          </div>

          <div className="rounded-xl border border-[color:var(--aui-divider)] p-4">
            <p className="text-sm font-semibold aui-text-strong">Guidance</p>
            <div className="mt-3 space-y-3 text-sm leading-6 aui-text-muted">
              <p>TagList is display-first. It should not impersonate a full input when creation is not available.</p>
              <p>Use `max` when pages need a condensed summary and overflow should collapse into a count chip.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
