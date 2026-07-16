import * as React from "react"
import { type CalendarSchedulerEvent } from "@/components/modern/calendar-scheduler"

import { CalendarScheduler } from "@/index"

const defaultDays = ["Mon, Jul 6", "Tue, Jul 7", "Wed, Jul 8"]

export function CalendarSchedulerShowcase() {
  const [showWarning, setShowWarning] = React.useState(true)
  const [variant, setVariant] = React.useState<"board" | "agenda">("agenda")

  const events = React.useMemo(
    () => ([
      { id: "1", title: "Design review", description: "Component API and release readiness", meta: "Product room", badge: <span className="rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-800">Review</span>, date: "Mon, Jul 6", time: "10:00", tone: "warning" },
      { id: "2", title: "Release freeze", description: "Production deployment checkpoint", meta: "Platform team", badge: <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-800">Required</span>, date: "Tue, Jul 7", time: "14:00", tone: "danger" },
      { id: "3", title: "Daily standup", description: "Owners, blockers and delivery status", date: "Wed, Jul 8", time: "09:30", tone: "default" },
      ...(showWarning ? [{ id: "4", title: "Priority follow-up", description: "Customer escalation review", date: "Mon, Jul 6", time: "16:00", tone: "warning" as const }] : []),
    ] as CalendarSchedulerEvent[]),
    [showWarning]
  )

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button type="button" className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm" onClick={() => setVariant((value) => value === "agenda" ? "board" : "agenda")}>Use {variant === "agenda" ? "board" : "agenda"}</button>
        <button
          type="button"
          className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm"
          onClick={() => setShowWarning((value) => !value)}
        >
          {showWarning ? "Hide warning" : "Show warning"}
        </button>
      </div>
      <CalendarScheduler title="Delivery schedule" description="Production agenda with rich event metadata and selection." variant={variant} density="compact" days={defaultDays} events={events} defaultSelectedEventId="1" />
    </div>
  )
}
