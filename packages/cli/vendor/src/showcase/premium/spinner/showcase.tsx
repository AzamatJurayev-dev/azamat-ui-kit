import * as React from "react"

import { Badge, Button, LoadingOverlay, Spinner } from "@/index"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function SpinnerShowcase() {
  const [saving, setSaving] = React.useState(false)

  const runSave = () => {
    setSaving(true)
    window.setTimeout(() => setSaving(false), 1200)
  }

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Installed primitive</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Spinner covers short async feedback</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 aui-text-muted">
          Use it for quick inline or section-level pending states. If the wait grows, move up to a fuller loading state.
        </p>
      </section>

      <section className={panelClass}>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 rounded-xl border border-[color:var(--aui-divider)] px-4 py-3">
            <Spinner size="xs" label="Syncing" />
            <span className="text-sm aui-text-muted">Syncing tokens</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-[color:var(--aui-divider)] px-4 py-3">
            <Spinner size="sm" label="Refreshing" />
            <span className="text-sm aui-text-muted">Refreshing routes</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-[color:var(--aui-divider)] px-4 py-3">
            <Spinner size="lg" label="Publishing" />
            <Badge variant="outline">Publishing</Badge>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <LoadingOverlay loading={saving} label="Saving configuration">
            <div className="rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold aui-text-strong">Billing configuration</p>
                  <p className="mt-2 text-sm leading-6 aui-text-muted">Overlay mode blocks edits briefly while keeping the context visible.</p>
                </div>
                <Button onClick={runSave}>{saving ? "Saving..." : "Save changes"}</Button>
              </div>
            </div>
          </LoadingOverlay>

          <div className="rounded-xl border border-[color:var(--aui-divider)] p-4">
            <p className="text-sm font-semibold aui-text-strong">Guidance</p>
            <div className="mt-3 space-y-3 text-sm leading-6 aui-text-muted">
              <p>Inline spinners are best when the user already knows what action was triggered.</p>
              <p>Overlay mode is safer for short locked saves than replacing the whole section with placeholders.</p>
              <p>Do not leave a spinner alone for long-running uncertain work. Add progress or explanatory copy.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
