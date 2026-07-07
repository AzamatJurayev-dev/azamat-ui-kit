import * as React from "react"

import { Badge, Button, Skeleton, SkeletonCard, SkeletonText } from "@/index"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function SkeletonShowcase() {
  const [loading, setLoading] = React.useState(true)

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Installed primitive</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Skeleton preserves shape before real data arrives</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 aui-text-muted">
          Use skeletons only when the destination layout is already known. Otherwise prefer a simpler loading state.
        </p>
      </section>

      <section className={panelClass}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-lg font-semibold aui-text-strong">Dashboard summary loading</p>
            <p className="mt-2 text-sm leading-6 aui-text-muted">Toggle the preview to compare loading shape and resolved content.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setLoading((value) => !value)}>
            {loading ? "Show resolved state" : "Show loading state"}
          </Button>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="rounded-xl border border-[color:var(--aui-divider)] p-4">
              {loading ? (
                <>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-4 h-9 w-32" />
                  <Skeleton className="mt-4 h-3 w-20" />
                </>
              ) : (
                <>
                  <p className="text-sm aui-text-muted">Metric {index + 1}</p>
                  <p className="mt-4 text-3xl font-semibold aui-text-strong">{["24.8k", "91.4%", "128"][index]}</p>
                  <Badge className="mt-4" variant="secondary">Live</Badge>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-lg font-semibold aui-text-strong">Text and card presets</p>
            <p className="mt-2 max-w-xl text-sm leading-6 aui-text-muted">
              Use the base primitive for custom shapes, then reach for `SkeletonText` or `SkeletonCard` when the pattern repeats often.
            </p>
            <div className="mt-5 space-y-4">
              <SkeletonText rows={4} />
              <SkeletonCard avatar rows={4} />
            </div>
          </div>

          <div className="rounded-xl border border-[color:var(--aui-divider)] p-4">
            <p className="text-sm font-semibold aui-text-strong">Guidance</p>
            <div className="mt-3 space-y-3 text-sm leading-6 aui-text-muted">
              <p>Do not animate huge full-page skeleton walls if a calmer page-level loading state would do the job.</p>
              <p>Keep placeholder geometry close to the final layout. A misleading shape is worse than no skeleton at all.</p>
              <p>When the loading state is long or uncertain, switch to a clearer status surface with explanation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
