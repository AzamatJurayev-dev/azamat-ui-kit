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
  empty?: React.ReactNode
}

const toneClassName = {
  default: "border-border bg-muted",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
  warning: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  danger: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
}

function CalendarScheduler({ events, days, empty = "No events scheduled.", className, ...props }: CalendarSchedulerProps) {
  const eventsByDate = new Map<string, CalendarSchedulerEvent[]>()

  for (const event of events) {
    const dayEvents = eventsByDate.get(event.date)
    if (dayEvents) {
      dayEvents.push(event)
    } else {
      eventsByDate.set(event.date, [event])
    }
  }

  const visibleDays = days ?? Array.from(eventsByDate.keys())

  if (visibleDays.length === 0) {
    return (
      <div
        data-slot="calendar-scheduler"
        data-empty="true"
        className={cn("rounded-[var(--aui-card-radius,var(--radius-xl))] border border-dashed border-[color:var(--aui-card-border,var(--border))] bg-card px-4 py-8 text-center text-sm text-muted-foreground", className)}
        {...props}
      >
        {empty}
      </div>
    )
  }

  return (
    <div data-slot="calendar-scheduler" className={cn("grid gap-3", className)} {...props}>
      {visibleDays.map((day) => {
        const dayEvents = eventsByDate.get(day) ?? []

        return (
          <section key={day} className="rounded-[var(--aui-card-radius,var(--radius-xl))] border border-[color:var(--aui-card-border,var(--border))] bg-card p-4 shadow-[var(--aui-card-shadow,var(--aui-control-shadow,none))]">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-foreground">{day}</div>
            <div className="text-xs text-muted-foreground">{dayEvents.length} items</div>
          </div>
          <div className="grid gap-2">
            {dayEvents.length === 0 ? (
              <div className="rounded-[var(--radius-md)] border border-dashed border-[color:var(--aui-card-border,var(--border))] px-3 py-4 text-sm text-muted-foreground">
                {empty}
              </div>
            ) : (
              dayEvents.map((event) => (
                <div key={event.id} className={cn("rounded-[var(--radius-md)] border px-3 py-2.5 text-sm shadow-sm", toneClassName[event.tone ?? "default"])}>
                  <div className="font-medium">{event.title}</div>
                  {event.time && <div className="mt-1 text-xs opacity-70">{event.time}</div>}
                </div>
              ))
            )}
          </div>
        </section>
        )
      })}
    </div>
  )
}

export { CalendarScheduler }
