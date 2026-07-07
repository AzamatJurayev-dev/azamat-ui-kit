import * as React from "react"
import { type CalendarSchedulerEvent } from "@/components/modern/calendar-scheduler"

import { CalendarScheduler } from "@/index"

const defaultDays = ["Mon, Jul 6", "Tue, Jul 7", "Wed, Jul 8"]

export function CalendarSchedulerShowcase() {
  const [showWarning, setShowWarning] = React.useState(true)

  const events = React.useMemo(
    () => ([
      { id: "1", title: "Design review", date: "Mon, Jul 6", time: "10:00", tone: "warning" },
      { id: "2", title: "Release freeze", date: "Tue, Jul 7", time: "14:00", tone: "danger" },
      { id: "3", title: "Daily standup", date: "Wed, Jul 8", time: "09:30", tone: "default" },
      ...(showWarning ? [{ id: "4", title: "Priority follow-up", date: "Mon, Jul 6", time: "16:00", tone: "warning" }] : []),
    ] as CalendarSchedulerEvent[]),
    [showWarning]
  )

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          type="button"
          className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm"
          onClick={() => setShowWarning((value) => !value)}
        >
          {showWarning ? "Hide warning" : "Show warning"}
        </button>
      </div>
      <CalendarScheduler days={defaultDays} events={events} />
    </div>
  )
}
