import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  addMonths,
  getMonthDays,
  getMonthLabel,
  getWeekdayLabels,
  isAfterDate,
  isBeforeDate,
  isSameMonth,
  isWithinRange,
  parseDateKey,
  startOfMonth,
  toDateKey,
} from "./date-utils"

export type CalendarDateRange = {
  from?: string | null
  to?: string | null
}

export type CalendarLabels = {
  previousMonth?: string
  nextMonth?: string
  selectDate?: (date: string) => string
}

export type CalendarProps = React.ComponentProps<"div"> & {
  value?: string | null
  range?: CalendarDateRange
  onValueChange?: (value: string) => void
  onRangeChange?: (range: CalendarDateRange) => void
  mode?: "single" | "range"
  month?: Date
  defaultMonth?: Date | string | null
  onMonthChange?: (month: Date) => void
  min?: string
  max?: string
  disabledDates?: string[]
  locale?: string
  weekStartsOn?: 0 | 1
  labels?: CalendarLabels
}

function getInitialMonth(defaultMonth?: Date | string | null, value?: string | null, range?: CalendarDateRange) {
  if (defaultMonth instanceof Date) return startOfMonth(defaultMonth)

  const fromDefault = parseDateKey(defaultMonth)
  if (fromDefault) return startOfMonth(fromDefault)

  const fromValue = parseDateKey(value)
  if (fromValue) return startOfMonth(fromValue)

  const fromRange = parseDateKey(range?.from ?? range?.to)
  if (fromRange) return startOfMonth(fromRange)

  return startOfMonth(new Date())
}

function Calendar({
  className,
  value,
  range,
  onValueChange,
  onRangeChange,
  mode = "single",
  month,
  defaultMonth,
  onMonthChange,
  min,
  max,
  disabledDates,
  locale = "en-US",
  weekStartsOn = 1,
  labels,
  ...props
}: CalendarProps) {
  const [internalMonth, setInternalMonth] = React.useState(() => getInitialMonth(defaultMonth, value, range))
  const currentMonth = month ?? internalMonth
  const todayKey = toDateKey(new Date())
  const disabledSet = React.useMemo(() => new Set(disabledDates ?? []), [disabledDates])
  const monthDays = React.useMemo(() => getMonthDays(currentMonth, weekStartsOn), [currentMonth, weekStartsOn])
  const weekdayLabels = React.useMemo(() => getWeekdayLabels(locale, weekStartsOn), [locale, weekStartsOn])

  const setMonth = (nextMonth: Date) => {
    const next = startOfMonth(nextMonth)
    setInternalMonth(next)
    onMonthChange?.(next)
  }

  const handleDateSelect = (dateKey: string) => {
    if (mode === "single") {
      onValueChange?.(dateKey)
      return
    }

    const from = range?.from ?? null
    const to = range?.to ?? null

    if (!from || (from && to) || dateKey < from) {
      onRangeChange?.({ from: dateKey, to: null })
      return
    }

    onRangeChange?.({ from, to: dateKey })
  }

  return (
    <div data-slot="calendar" className={cn("w-72 rounded-lg bg-popover p-2 text-popover-foreground", className)} {...props}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <Button type="button" variant="ghost" size="icon-sm" aria-label={labels?.previousMonth ?? "Previous month"} onClick={() => setMonth(addMonths(currentMonth, -1))}>
          <ChevronLeftIcon />
        </Button>
        <div className="text-sm font-medium capitalize">{getMonthLabel(currentMonth, locale)}</div>
        <Button type="button" variant="ghost" size="icon-sm" aria-label={labels?.nextMonth ?? "Next month"} onClick={() => setMonth(addMonths(currentMonth, 1))}>
          <ChevronRightIcon />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
        {weekdayLabels.map((weekday) => (
          <div key={weekday} className="py-1">
            {weekday}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {monthDays.map((date) => {
          const dateKey = toDateKey(date)
          const outside = !isSameMonth(date, currentMonth)
          const selected = mode === "single" ? value === dateKey : dateKey === range?.from || dateKey === range?.to
          const inRange = mode === "range" && isWithinRange(dateKey, range?.from, range?.to)
          const disabled = disabledSet.has(dateKey) || isBeforeDate(dateKey, min) || isAfterDate(dateKey, max)

          return (
            <button
              key={dateKey}
              type="button"
              disabled={disabled}
              aria-label={labels?.selectDate?.(dateKey) ?? dateKey}
              data-selected={selected || undefined}
              data-today={dateKey === todayKey || undefined}
              data-outside={outside || undefined}
              data-in-range={inRange || undefined}
              className={cn(
                "flex h-8 items-center justify-center rounded-md text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40",
                outside && "text-muted-foreground/55",
                dateKey === todayKey && "ring-1 ring-ring/35",
                inRange && "bg-accent/60 text-accent-foreground",
                selected && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              )}
              onClick={() => handleDateSelect(dateKey)}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { Calendar }
