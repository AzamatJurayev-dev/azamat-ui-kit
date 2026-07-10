import * as React from "react"

import { cn } from "@/lib/utils"

export type CalendarSchedulerEvent = {
  id: string
  title: React.ReactNode
  date: string
  time?: string
  tone?: "default" | "success" | "warning" | "danger"
  durationMinutes?: number
}

export type CalendarSchedulerProps = React.ComponentProps<"div"> & {
  events: CalendarSchedulerEvent[]
  days?: string[]
  view?: "day" | "week" | "month"
  empty?: React.ReactNode
  onCreateEvent?: (date: string) => void
  onEventClick?: (event: CalendarSchedulerEvent) => void
}

const toneClassName = {
  default: "border-border bg-muted",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
  warning: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  danger: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
}

function CalendarScheduler({
  events,
  days,
  view = "week",
  empty = "No events scheduled.",
  onCreateEvent,
  onEventClick,
  className,
  ...props
}: CalendarSchedulerProps) {
  const visibleDays = days ?? Array.from(new Set(events.map((event) => event.date)))

  return (
    <div
      data-slot="calendar-scheduler"
      data-view={view}
      className={cn("grid gap-3", view === "month" && "md:grid-cols-2 xl:grid-cols-3", className)}
      {...props}
    >
      {visibleDays.map((day) => {
        const dayEvents = events.filter((event) => event.date === day)

        return (
          <section
            key={day}
            className="rounded-[var(--aui-card-radius,var(--radius-xl))] border border-[color:var(--aui-card-border,var(--border))] bg-card p-4 shadow-[var(--aui-card-shadow,var(--aui-control-shadow,none))]"
          >
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
                  <button
                    key={event.id}
                    type="button"
                    className={cn(
                      "rounded-[var(--radius-md)] border px-3 py-2.5 text-left text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                      toneClassName[event.tone ?? "default"],
                    )}
                    onClick={() => onEventClick?.(event)}
                  >
                    <div className="font-medium">{event.title}</div>
                    {event.time && <div className="mt-1 text-xs opacity-70">{event.time}</div>}
                    {event.durationMinutes && <div className="mt-1 text-xs opacity-70">{event.durationMinutes} min</div>}
                  </button>
                ))
              )}
            </div>
            {onCreateEvent && (
              <button
                type="button"
                className="mt-3 w-full rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground hover:bg-muted/50"
                onClick={() => onCreateEvent(day)}
              >
                Create event
              </button>
            )}
          </section>
        )
      })}
    </div>
  )
}

export { CalendarScheduler }
