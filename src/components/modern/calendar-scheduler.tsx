import * as React from "react"

import { cn } from "@/lib/utils"

export type CalendarSchedulerEvent = {
  id: string
  title: React.ReactNode
  date: string
  time?: string
  tone?: "default" | "success" | "warning" | "danger"
  durationMinutes?: number
  description?: React.ReactNode
  meta?: React.ReactNode
  badge?: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  hidden?: boolean
  className?: string
}

export type CalendarSchedulerProps = React.ComponentProps<"div"> & {
  events: CalendarSchedulerEvent[]
  days?: string[]
  view?: "day" | "week" | "month"
  variant?: "board" | "agenda"
  density?: "compact" | "default" | "comfortable"
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  empty?: React.ReactNode
  selectedEventId?: string
  defaultSelectedEventId?: string
  onSelectedEventChange?: (eventId: string, event: CalendarSchedulerEvent) => void
  onCreateEvent?: (date: string) => void
  onEventClick?: (event: CalendarSchedulerEvent) => void
  renderEvent?: (event: CalendarSchedulerEvent, state: { selected: boolean }) => React.ReactNode
  createLabel?: React.ReactNode
  showCount?: boolean
  dayClassName?: string
  eventClassName?: string
  formatDay?: (day: string) => React.ReactNode
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
  variant = "board",
  density = "default",
  title,
  description,
  actions,
  empty = "No events scheduled.",
  selectedEventId,
  defaultSelectedEventId,
  onSelectedEventChange,
  onCreateEvent,
  onEventClick,
  renderEvent,
  createLabel = "Create event",
  showCount = true,
  dayClassName,
  eventClassName,
  formatDay,
  className,
  ...props
}: CalendarSchedulerProps) {
  const [internalSelectedEventId, setInternalSelectedEventId] = React.useState(defaultSelectedEventId)
  const currentSelectedEventId = selectedEventId ?? internalSelectedEventId
  const visibleEvents = events.filter((event) => !event.hidden)
  const visibleDays = days ?? Array.from(new Set(visibleEvents.map((event) => event.date)))

  const selectEvent = (event: CalendarSchedulerEvent) => {
    if (event.disabled) return
    if (selectedEventId === undefined) setInternalSelectedEventId(event.id)
    onSelectedEventChange?.(event.id, event)
    onEventClick?.(event)
  }

  if (visibleDays.length === 0) {
    return (
      <div
        data-slot="calendar-scheduler"
        data-view={view}
        data-variant={variant}
        data-density={density}
        className={cn("rounded-[var(--aui-card-radius,var(--radius-xl))] border border-[color:var(--aui-card-border,var(--border))] bg-card p-5 text-sm text-muted-foreground shadow-[var(--aui-card-shadow,var(--aui-control-shadow,none))]", className)}
        {...props}
      >
        <div className="flex min-h-32 items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[color:var(--aui-card-border,var(--border))] bg-muted/20 px-4 py-6 text-center">
          <div className="space-y-1.5">
            <p data-empty="true" className="text-sm font-medium text-foreground">{empty}</p>
            {onCreateEvent ? <button type="button" className="rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground hover:bg-muted/50" onClick={() => onCreateEvent("today")}>{createLabel}</button> : null}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      data-slot="calendar-scheduler"
      data-view={view}
      data-variant={variant}
      data-density={density}
      className={cn(
        "grid",
        density === "compact" ? "gap-2" : density === "comfortable" ? "gap-5" : "gap-3",
        view === "month" && variant === "board" && "md:grid-cols-2 xl:grid-cols-3",
        variant === "agenda" && "rounded-[var(--aui-card-radius,var(--radius-xl))] border border-[color:var(--aui-card-border,var(--border))] bg-card p-4 shadow-[var(--aui-card-shadow,var(--aui-control-shadow,none))]",
        className
      )}
      {...props}
    >
      {(title || description || actions) ? (
        <div data-slot="calendar-scheduler-header" className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-[min(100%,16rem)] flex-1 space-y-1">
            {title ? <h2 className="text-base font-semibold text-foreground">{title}</h2> : null}
            {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          </div>
          {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}

      {visibleDays.map((day) => {
        const dayEvents = visibleEvents.filter((event) => event.date === day)

        return (
          <section key={day} data-slot="calendar-scheduler-day" className={cn(variant === "board" && "rounded-[var(--aui-card-radius,var(--radius-xl))] border border-[color:var(--aui-card-border,var(--border))] bg-card p-4 shadow-[var(--aui-card-shadow,var(--aui-control-shadow,none))]", dayClassName)}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-foreground">{formatDay?.(day) ?? day}</div>
              {showCount ? <div className="text-xs text-muted-foreground">{dayEvents.length} items</div> : null}
            </div>
            <div className={cn("grid", density === "compact" ? "gap-1.5" : "gap-2")}>
              {dayEvents.length === 0 ? (
                <div className="rounded-[var(--radius-md)] border border-dashed border-[color:var(--aui-card-border,var(--border))] px-3 py-4 text-sm text-muted-foreground">{empty}</div>
              ) : dayEvents.map((event) => {
                const selected = currentSelectedEventId === event.id
                return (
                  <button
                    key={event.id}
                    type="button"
                    disabled={event.disabled}
                    data-slot="calendar-scheduler-event"
                    data-selected={selected || undefined}
                    className={cn(
                      "border text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50",
                      variant === "board" ? "rounded-[var(--radius-md)] px-3 py-2.5 shadow-sm" : "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 rounded-[var(--radius-md)] bg-background px-3 py-3 hover:bg-muted/35 data-[selected=true]:border-primary/40 data-[selected=true]:bg-primary/5",
                      variant === "board" && toneClassName[event.tone ?? "default"], eventClassName, event.className
                    )}
                    onClick={() => selectEvent(event)}
                  >
                    {renderEvent ? renderEvent(event, { selected }) : variant === "agenda" ? (
                      <>
                        <span className="inline-flex min-w-14 items-center gap-1.5 font-medium">{event.icon}{event.time ?? "—"}</span>
                        <span className="min-w-0">
                          <span className="block truncate font-medium text-foreground">{event.title}</span>
                          {event.description ? <span className="mt-0.5 block text-xs text-muted-foreground">{event.description}</span> : null}
                          {event.meta ? <span className="mt-1 block text-xs text-muted-foreground">{event.meta}</span> : null}
                        </span>
                        {event.badge ? <span className="shrink-0">{event.badge}</span> : event.durationMinutes ? <span className="shrink-0 text-xs opacity-70">{event.durationMinutes} min</span> : null}
                      </>
                    ) : (
                      <>
                        <div className="font-medium">{event.title}</div>
                        {event.description ? <div className="mt-1 text-xs opacity-80">{event.description}</div> : null}
                        {event.time ? <div className="mt-1 text-xs opacity-70">{event.time}</div> : null}
                        {event.durationMinutes ? <div className="mt-1 text-xs opacity-70">{event.durationMinutes} min</div> : null}
                        {event.meta ? <div className="mt-1 text-xs opacity-70">{event.meta}</div> : null}
                      </>
                    )}
                  </button>
                )
              })}
            </div>
            {onCreateEvent ? <button type="button" className="mt-3 w-full rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground hover:bg-muted/50" onClick={() => onCreateEvent(day)}>{createLabel}</button> : null}
          </section>
        )
      })}
    </div>
  )
}

export { CalendarScheduler }
