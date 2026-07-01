import * as React from "react"

import { ActivityFeed } from "@/index"

import type { ComponentDemoProps } from "../types"

const items = [
  { id: "i-1", title: "Team invited", description: "New designer joined the workspace.", time: "2 min ago", tone: "info" as const },
  { id: "i-2", title: "Deployment succeeded", description: "Staging deployment passed smoke checks.", time: "12 min ago", tone: "success" as const },
  { id: "i-3", title: "Invoice warning", description: "Payment sync delayed in queue, retrying soon.", time: "34 min ago", tone: "warning" as const },
  { id: "i-4", title: "Critical alert", description: "Webhook failed for production billing endpoint.", time: "1h ago", tone: "danger" as const },
]

const toneFilters = ["all", "success", "warning", "info", "danger"] as const

type ToneFilter = (typeof toneFilters)[number]

export function ActivityFeedShowcase({ mode }: ComponentDemoProps) {
  const [compact, setCompact] = React.useState(mode === "playground")
  const [filter, setFilter] = React.useState<ToneFilter>("all")

  const visibleItems = React.useMemo(() => {
    if (filter === "all") {
      return items
    }

    return items.filter((item) => item.tone === filter)
  }, [filter])

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <div className="aui-text-muted text-sm">Density: {compact ? "Compact" : "Spacious"}</div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] px-3 py-2 text-sm"
            onClick={() => setCompact((value) => !value)}
          >
            {compact ? "Use spacious" : "Use compact"}
          </button>
          {toneFilters.map((entry) => (
            <button
              key={entry}
              type="button"
              className={`rounded-lg border px-3 py-2 text-sm ${filter === entry ? "aui-surface-strong border-[color:var(--aui-surface-strong)]" : "border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)]"}`}
              onClick={() => setFilter(entry)}
            >
              {entry}
            </button>
          ))}
        </div>
      </div>

      <ActivityFeed
        title="Recent activity"
        description="System and team events are grouped into one lightweight feed."
        items={visibleItems}
        compact={compact}
        empty={<span className="aui-text-muted text-sm">No matching activity for selected tone.</span>}
      />
    </div>
  )
}

