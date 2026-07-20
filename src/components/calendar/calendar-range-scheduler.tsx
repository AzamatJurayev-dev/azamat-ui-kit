"use client"

import * as React from "react"
import { CalendarDaysIcon } from "lucide-react"

import { DateRangePicker, type DateRangePickerValue } from "@/components/calendar/date-range-picker"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type CalendarRangeSchedulerEvent = {
  id: string
  title: React.ReactNode
  range: DateRangePickerValue
  tone?: "default" | "info" | "success" | "warning" | "danger"
  meta?: React.ReactNode
}

export type CalendarRangeSchedulerProps = Omit<React.ComponentProps<typeof Card>, "onSelect"> & {
  value?: DateRangePickerValue
  onValueChange?: (range: DateRangePickerValue) => void
  events?: CalendarRangeSchedulerEvent[]
  onEventSelect?: (event: CalendarRangeSchedulerEvent) => void
  title?: React.ReactNode
  action?: React.ReactNode
}

function CalendarRangeScheduler({
  value,
  onValueChange,
  events = [],
  onEventSelect,
  title = "Schedule range",
  action,
  className,
  ...props
}: CalendarRangeSchedulerProps) {
  return (
    <Card data-slot="calendar-range-scheduler" className={cn("min-w-0", className)} {...props}>
      <CardHeader className="flex-row items-center justify-between gap-3">
        <CardTitle className="flex items-center gap-2"><CalendarDaysIcon className="size-4" />{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <DateRangePicker value={value} onValueChange={onValueChange} />
        <div className="grid content-start gap-2">
          {events.length ? events.map((event) => (
            <button
              key={event.id}
              type="button"
              className="grid gap-1 rounded-lg border bg-background p-3 text-left transition hover:border-primary/45 hover:bg-muted/40"
              onClick={() => onEventSelect?.(event)}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="font-medium">{event.title}</span>
                <Badge label={event.tone ?? "scheduled"} status={event.tone === "danger" ? "danger" : event.tone === "warning" ? "warning" : event.tone === "success" ? "success" : "info"} variant="soft" />
              </span>
              <span className="text-xs text-muted-foreground">{event.range.from || "Start"} - {event.range.to || "End"}</span>
              {event.meta ? <span className="text-xs text-muted-foreground">{event.meta}</span> : null}
            </button>
          )) : (
            <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">No scheduled ranges.</div>
          )}
          <Button type="button" variant="outline" onClick={() => onValueChange?.({ from: "", to: "" })}>Clear range</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { CalendarRangeScheduler }
