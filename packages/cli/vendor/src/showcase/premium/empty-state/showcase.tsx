import * as React from "react"

import { Badge, Button, EmptyState } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function EmptyStateShowcase({ mode }: ComponentDemoProps) {
  const [actionCount, setActionCount] = React.useState(0)
  const [showEmptyFeedback, setShowEmptyFeedback] = React.useState(true)

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">No-content state</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Empty state should unblock the next step</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              The preview should show a clear title, short explanation, and one meaningful next action. Empty state is not decorative whitespace.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">No data</Badge>
            <Badge variant="outline" className="rounded-full">One next action</Badge>
          </div>
        </div>
      </section>

      {showEmptyFeedback ? (
        <EmptyState
          title="No results found"
          description="There is nothing to show yet. Create one item to continue."
          actionLabel="Create first item"
          onAction={() => setActionCount((value) => value + 1)}
        />
      ) : (
        <EmptyState title="Empty state intentionally hidden" description="Use a custom fallback only when needed." />
      )}

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Interaction count</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">{actionCount}</p>
          <p className="mt-2 text-sm leading-6 aui-text-muted">Use the primary CTA only for the most direct recovery path.</p>
        </section>
        {mode === "playground" ? (
          <section className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Preview controls</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant={showEmptyFeedback ? "default" : "outline"} onClick={() => setShowEmptyFeedback((value) => !value)}>
                Toggle feedback
              </Button>
              <Button size="sm" variant="outline" onClick={() => setActionCount(0)}>
                Reset actions
              </Button>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}
