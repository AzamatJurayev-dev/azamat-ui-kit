import * as React from "react"

import { cn } from "@/lib/utils"

export type CalendarSchedulerEvent = {
  id: string
  title: React.ReactNode
  date: string
  time?: string
  tone?: "default" | "success" | "warning" | "danger"
}

export type CalendarSchedulerProps = React.ComponentProps<"div"> & {
  events: CalendarSchedulerEvent[]
  days?: string[]
}

const toneClassName = {
  default: "border-border bg-muted",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
  warning: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  danger: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
}

function CalendarScheduler({ events, days, className, ...props }: CalendarSchedulerProps) {
  const visibleDays = days ?? Array.from(new Set(events.map((event) => event.date)))

  return (
    <div data-slot="calendar-scheduler" className={cn("grid gap-3", className)} {...props}>
      {visibleDays.map((day) => (
        <section key={day} className="rounded-xl border bg-card p-3">
          <div className="mb-2 text-sm font-semibold">{day}</div>
          <div className="grid gap-2">
            {events.filter((event) => event.date === day).map((event) => (
              <div key={event.id} className={cn("rounded-md border px-3 py-2 text-sm", toneClassName[event.tone ?? "default"])}>
                <div className="font-medium">{event.title}</div>
                {event.time && <div className="text-xs opacity-70">{event.time}</div>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export { CalendarScheduler }
