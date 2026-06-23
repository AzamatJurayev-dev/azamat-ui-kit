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

export type CalendarDisabledReason = "disabled" | "min" | "max" | "range"

export type CalendarLabels = {
  previousMonth?: string
  nextMonth?: string
  selectDate?: (date: string) => string
  disabledDate?: (date: string, reason: CalendarDisabledReason) => string
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

function addDays(date: Date, amount: number) {
  const next = new Date(date)
  next.setDate(date.getDate() + amount)
  return next
}

function getDateAtSameDayInMonth(date: Date, month: Date) {
  const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  return new Date(month.getFullYear(), month.getMonth(), Math.min(date.getDate(), lastDay))
}

function getDateKeysBetween(from: string, to: string) {
  const start = parseDateKey(from)
  const end = parseDateKey(to)

  if (!start || !end || to < from) return []

  const keys: string[] = []
  const cursor = new Date(start)

  while (toDateKey(cursor) <= to) {
    keys.push(toDateKey(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }

  return keys
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
  const buttonRefs = React.useRef(new Map<string, HTMLButtonElement>())
  const [focusedDateKey, setFocusedDateKey] = React.useState(() => value ?? range?.from ?? todayKey)

  const getDisabledReason = React.useCallback(
    (dateKey: string): CalendarDisabledReason | undefined => {
      if (disabledSet.has(dateKey)) return "disabled"
      if (isBeforeDate(dateKey, min)) return "min"
      if (isAfterDate(dateKey, max)) return "max"
      return undefined
    },
    [disabledSet, max, min]
  )

  const isDateDisabled = React.useCallback((dateKey: string) => Boolean(getDisabledReason(dateKey)), [getDisabledReason])

  const visibleEnabledKeys = React.useMemo(
    () => monthDays.map(toDateKey).filter((dateKey) => !isDateDisabled(dateKey)),
    [isDateDisabled, monthDays]
  )

  const tabbableDateKey = React.useMemo(() => {
    const preferred = value ?? range?.from ?? todayKey
    if (visibleEnabledKeys.includes(focusedDateKey)) return focusedDateKey
    if (visibleEnabledKeys.includes(preferred)) return preferred
    return visibleEnabledKeys[0]
  }, [focusedDateKey, range?.from, todayKey, value, visibleEnabledKeys])

  React.useEffect(() => {
    if (!focusedDateKey) return
    buttonRefs.current.get(focusedDateKey)?.focus()
  }, [focusedDateKey])

  const setMonth = (nextMonth: Date) => {
    const next = startOfMonth(nextMonth)
    setInternalMonth(next)
    onMonthChange?.(next)
  }

  const moveFocus = (date: Date) => {
    let nextDate = date
    let nextKey = toDateKey(nextDate)
    let guard = 0

    while (isDateDisabled(nextKey) && guard < 370) {
      nextDate = addDays(nextDate, nextDate < date ? -1 : 1)
      nextKey = toDateKey(nextDate)
      guard += 1
    }

    setFocusedDateKey(nextKey)

    if (!isSameMonth(nextDate, currentMonth)) {
      setMonth(startOfMonth(nextDate))
    }
  }

  const handleDateSelect = (dateKey: string) => {
    if (isDateDisabled(dateKey)) return

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

    const rangeHasDisabledDate = getDateKeysBetween(from, dateKey).some((key) => isDateDisabled(key))

    if (rangeHasDisabledDate) {
      onRangeChange?.({ from: dateKey, to: null })
      return
    }

    onRangeChange?.({ from, to: dateKey })
  }

  const handleDateKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, date: Date) => {
    const columnIndex = monthDays.findIndex((item) => toDateKey(item) === toDateKey(date)) % 7

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault()
        moveFocus(addDays(date, 1))
        break
      case "ArrowLeft":
        event.preventDefault()
        moveFocus(addDays(date, -1))
        break
      case "ArrowDown":
        event.preventDefault()
        moveFocus(addDays(date, 7))
        break
      case "ArrowUp":
        event.preventDefault()
        moveFocus(addDays(date, -7))
        break
      case "Home":
        event.preventDefault()
        moveFocus(addDays(date, -columnIndex))
        break
      case "End":
        event.preventDefault()
        moveFocus(addDays(date, 6 - columnIndex))
        break
      case "PageUp":
        event.preventDefault()
        moveFocus(getDateAtSameDayInMonth(date, addMonths(date, -1)))
        break
      case "PageDown":
        event.preventDefault()
        moveFocus(getDateAtSameDayInMonth(date, addMonths(date, 1)))
        break
    }
  }

  return (
    <div
      data-slot="calendar"
      className={cn(
        "w-72 rounded-[calc(var(--radius-2xl)+4px)] border border-border/80 bg-popover/98 p-3.5 text-popover-foreground shadow-[0_24px_70px_rgba(15,23,42,0.16)] ring-1 ring-foreground/6 backdrop-blur",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="rounded-full border-border/90 bg-background/88 text-foreground shadow-[0_1px_0_rgba(255,255,255,0.08)] hover:border-ring/30 hover:bg-accent hover:text-accent-foreground"
          aria-label={labels?.previousMonth ?? "Previous month"}
          onClick={() => setMonth(addMonths(currentMonth, -1))}
        >
          <ChevronLeftIcon />
        </Button>
        <div className="flex flex-1 flex-col items-center text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Calendar</span>
          <div className="text-base font-semibold capitalize tracking-tight text-foreground">{getMonthLabel(currentMonth, locale)}</div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="rounded-full border-border/90 bg-background/88 text-foreground shadow-[0_1px_0_rgba(255,255,255,0.08)] hover:border-ring/30 hover:bg-accent hover:text-accent-foreground"
          aria-label={labels?.nextMonth ?? "Next month"}
          onClick={() => setMonth(addMonths(currentMonth, 1))}
        >
          <ChevronRightIcon />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {weekdayLabels.map((weekday) => (
          <div key={weekday} className="py-1.5">
            {weekday}
          </div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1.5">
        {monthDays.map((date) => {
          const dateKey = toDateKey(date)
          const outside = !isSameMonth(date, currentMonth)
          const selected = mode === "single" ? value === dateKey : dateKey === range?.from || dateKey === range?.to
          const inRange = mode === "range" && isWithinRange(dateKey, range?.from, range?.to)
          const disabledReason = getDisabledReason(dateKey)
          const disabled = Boolean(disabledReason)
          const disabledLabel = disabledReason ? labels?.disabledDate?.(dateKey, disabledReason) : undefined

          return (
            <button
              key={dateKey}
              ref={(node) => {
                if (node) buttonRefs.current.set(dateKey, node)
                else buttonRefs.current.delete(dateKey)
              }}
              type="button"
              disabled={disabled}
              aria-label={disabledLabel ?? labels?.selectDate?.(dateKey) ?? dateKey}
              aria-current={dateKey === todayKey ? "date" : undefined}
              tabIndex={dateKey === tabbableDateKey ? 0 : -1}
              title={disabledLabel}
              data-selected={selected || undefined}
              data-today={dateKey === todayKey || undefined}
              data-outside={outside || undefined}
              data-in-range={inRange || undefined}
              data-disabled-reason={disabledReason}
              className={cn(
                "flex h-10 items-center justify-center rounded-[min(var(--radius-xl),16px)] border border-transparent text-sm font-medium outline-none transition-[background-color,color,border-color,box-shadow,transform] hover:border-border/70 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-35",
                outside && "text-muted-foreground/42",
                dateKey === todayKey && "border-primary/25 bg-accent/42 text-foreground",
                inRange && "border-primary/12 bg-primary/10 text-foreground",
                selected && "border-primary/85 bg-primary text-primary-foreground shadow-[0_10px_24px_color-mix(in_oklch,var(--primary),transparent_76%)] hover:bg-primary/92 hover:text-primary-foreground"
              )}
              onFocus={() => setFocusedDateKey(dateKey)}
              onKeyDown={(event) => handleDateKeyDown(event, date)}
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
