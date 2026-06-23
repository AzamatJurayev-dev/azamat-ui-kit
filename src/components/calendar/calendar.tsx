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
  numberOfMonths?: number
  showMonthHeaders?: boolean
  pagedNavigation?: boolean
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
  numberOfMonths = 1,
  showMonthHeaders,
  pagedNavigation = false,
  labels,
  ...props
}: CalendarProps) {
  const [internalMonth, setInternalMonth] = React.useState(() => getInitialMonth(defaultMonth, value, range))
  const currentMonth = month ?? internalMonth
  const resolvedNumberOfMonths = Math.max(numberOfMonths, 1)
  const shouldShowMonthHeaders = showMonthHeaders ?? resolvedNumberOfMonths > 1
  const navigationStep = pagedNavigation ? resolvedNumberOfMonths : 1
  const todayKey = toDateKey(new Date())
  const disabledSet = React.useMemo(() => new Set(disabledDates ?? []), [disabledDates])
  const weekdayLabels = React.useMemo(() => getWeekdayLabels(locale, weekStartsOn), [locale, weekStartsOn])
  const buttonRefs = React.useRef(new Map<string, HTMLButtonElement>())
  const [focusedDateKey, setFocusedDateKey] = React.useState(() => value ?? range?.from ?? todayKey)
  const visibleMonths = React.useMemo(
    () => Array.from({ length: resolvedNumberOfMonths }, (_, index) => addMonths(currentMonth, index)),
    [currentMonth, resolvedNumberOfMonths]
  )
  const monthDaysByMonth = React.useMemo(
    () =>
      visibleMonths.map((visibleMonth) => ({
        month: visibleMonth,
        days: getMonthDays(visibleMonth, weekStartsOn),
      })),
    [visibleMonths, weekStartsOn]
  )
  const allMonthDays = React.useMemo(
    () => monthDaysByMonth.flatMap((entry) => entry.days),
    [monthDaysByMonth]
  )

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
    () => allMonthDays.map(toDateKey).filter((dateKey) => !isDateDisabled(dateKey)),
    [allMonthDays, isDateDisabled]
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

    const isVisibleInCurrentViewport = visibleMonths.some((visibleMonth) => isSameMonth(nextDate, visibleMonth))

    if (!isVisibleInCurrentViewport) {
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
    const visibleMonthEntry = monthDaysByMonth.find((entry) => isSameMonth(date, entry.month))
    const columnIndex =
      ((visibleMonthEntry?.days.findIndex((item) => toDateKey(item) === toDateKey(date)) ?? 0) + 7) % 7

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
      data-months={resolvedNumberOfMonths}
      className={cn(
        "w-fit rounded-[calc(var(--radius-2xl)+2px)] border border-border/80 bg-popover/98 p-3 text-popover-foreground shadow-[0_24px_70px_rgba(15,23,42,0.16)] ring-1 ring-foreground/6 backdrop-blur",
        className
      )}
      {...props}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="rounded-full border-border/90 bg-background/88 text-foreground shadow-[0_1px_0_rgba(255,255,255,0.08)] hover:border-ring/30 hover:bg-accent hover:text-accent-foreground"
          aria-label={labels?.previousMonth ?? "Previous month"}
          onClick={() => setMonth(addMonths(currentMonth, -navigationStep))}
        >
          <ChevronLeftIcon />
        </Button>
        <div className="text-base font-semibold capitalize tracking-tight text-foreground">{getMonthLabel(currentMonth, locale)}</div>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="rounded-full border-border/90 bg-background/88 text-foreground shadow-[0_1px_0_rgba(255,255,255,0.08)] hover:border-ring/30 hover:bg-accent hover:text-accent-foreground"
          aria-label={labels?.nextMonth ?? "Next month"}
          onClick={() => setMonth(addMonths(currentMonth, navigationStep))}
        >
          <ChevronRightIcon />
        </Button>
      </div>

      <div
        className={cn("grid gap-3", resolvedNumberOfMonths > 1 && "sm:grid-cols-2")}
        style={
          resolvedNumberOfMonths > 2
            ? { gridTemplateColumns: `repeat(${resolvedNumberOfMonths}, minmax(0, 1fr))` }
            : undefined
        }
      >
        {monthDaysByMonth.map(({ month: visibleMonth, days }) => (
          <div key={toDateKey(visibleMonth)} className="min-w-[17rem]">
            {shouldShowMonthHeaders && (
              <div className="mb-2 text-center text-sm font-semibold capitalize tracking-tight text-foreground">
                {getMonthLabel(visibleMonth, locale)}
              </div>
            )}

            <div className="grid grid-cols-7 gap-1 text-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {weekdayLabels.map((weekday) => (
                <div key={`${toDateKey(visibleMonth)}-${weekday}`} className="py-1.5">
                  {weekday}
                </div>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-1.5">
              {days.map((date) => {
                const dateKey = toDateKey(date)
                const outside = !isSameMonth(date, visibleMonth)
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
                      "flex h-9 items-center justify-center rounded-xl border border-transparent text-sm font-medium outline-none transition-[background-color,color,border-color,box-shadow] hover:border-border/70 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-35",
                      outside && "text-muted-foreground/45",
                      dateKey === todayKey && "border-primary/35 bg-accent/30 text-foreground",
                      inRange && "border-accent/70 bg-accent/85 text-accent-foreground",
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
        ))}
      </div>
    </div>
  )
}

export { Calendar }
