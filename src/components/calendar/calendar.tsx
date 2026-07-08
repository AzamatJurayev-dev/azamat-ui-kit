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
  today?: string
  clear?: string
  selectDate?: (date: string) => string
  disabledDate?: (date: string, reason: CalendarDisabledReason) => string
}

export type CalendarSummaryState = {
  mode: "single" | "range"
  value?: string | null
  range?: CalendarDateRange
  locale: string
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
  showOutsideDays?: boolean
  pagedNavigation?: boolean
  showTodayShortcut?: boolean
  showClearShortcut?: boolean
  showSelectionSummary?: boolean
  labels?: CalendarLabels
  renderSelectionSummary?: (state: CalendarSummaryState) => React.ReactNode
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

function formatCalendarSummaryDate(value: string | null | undefined, locale: string) {
  const date = parseDateKey(value)
  if (!date || !value) return null
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(date)
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
  showOutsideDays = true,
  pagedNavigation = false,
  showTodayShortcut = false,
  showClearShortcut = false,
  showSelectionSummary = false,
  labels,
  renderSelectionSummary,
  ...props
}: CalendarProps) {
  const isControlledSingle = value !== undefined
  const isControlledRange = range !== undefined
  const [internalValue, setInternalValue] = React.useState<string | null | undefined>(value ?? null)
  const [internalRange, setInternalRange] = React.useState<CalendarDateRange>(range ?? {})
  const [internalMonth, setInternalMonth] = React.useState(() => getInitialMonth(defaultMonth, value, range))
  const currentValue = isControlledSingle ? value : internalValue
  const currentRange = isControlledRange ? range : internalRange
  const currentMonth = month ?? internalMonth
  const resolvedNumberOfMonths = Math.max(numberOfMonths, 1)
  const shouldShowMonthHeaders = showMonthHeaders ?? resolvedNumberOfMonths > 1
  const navigationStep = pagedNavigation ? resolvedNumberOfMonths : 1
  const todayKey = toDateKey(new Date())
  const disabledSet = React.useMemo(() => new Set(disabledDates ?? []), [disabledDates])
  const weekdayLabels = React.useMemo(() => getWeekdayLabels(locale, weekStartsOn), [locale, weekStartsOn])
  const buttonRefs = React.useRef(new Map<string, HTMLButtonElement>())
  const [focusedDateKey, setFocusedDateKey] = React.useState(() => value ?? range?.from ?? todayKey)
  const [hoveredDateKey, setHoveredDateKey] = React.useState<string | null>(null)
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
    const selectedFrom = currentRange?.from ?? undefined
    const selectedValue = currentValue ?? undefined
    if (visibleEnabledKeys.includes(focusedDateKey)) return focusedDateKey
    if (visibleEnabledKeys.includes(selectedValue ?? selectedFrom ?? preferred)) return selectedValue ?? selectedFrom ?? preferred
    return visibleEnabledKeys[0]
  }, [currentRange?.from, currentValue, focusedDateKey, range?.from, todayKey, value, visibleEnabledKeys])

  React.useEffect(() => {
    if (isControlledSingle) {
      setInternalValue(value ?? null)
    }
  }, [isControlledSingle, value])

  React.useEffect(() => {
    if (isControlledRange && range) {
      setInternalRange(range)
    }
  }, [isControlledRange, range])

  React.useEffect(() => {
    if (!focusedDateKey) return
    buttonRefs.current.get(focusedDateKey)?.focus()
  }, [focusedDateKey])

  React.useEffect(() => {
    if (mode !== "range") setHoveredDateKey(null)
  }, [mode])

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
      if (!isControlledSingle) setInternalValue(dateKey)
      onValueChange?.(dateKey)
      return
    }

    const from = currentRange?.from ?? null
    const to = currentRange?.to ?? null

    if (!from || (from && to) || dateKey < from) {
      const nextRange = { from: dateKey, to: null }
      if (!isControlledRange) setInternalRange(nextRange)
      onRangeChange?.(nextRange)
      return
    }

    const rangeHasDisabledDate = getDateKeysBetween(from, dateKey).some((key) => isDateDisabled(key))

    if (rangeHasDisabledDate) {
      const nextRange = { from: dateKey, to: null }
      if (!isControlledRange) setInternalRange(nextRange)
      onRangeChange?.(nextRange)
      return
    }

    const nextRange = { from, to: dateKey }
    if (!isControlledRange) setInternalRange(nextRange)
    onRangeChange?.(nextRange)
  }

  const previewRange = React.useMemo(() => {
    if (mode !== "range") return null
    if (!currentRange?.from || currentRange?.to || !hoveredDateKey || hoveredDateKey < currentRange.from) return null
    const rangeIncludesDisabledDate = getDateKeysBetween(currentRange.from, hoveredDateKey).some((key) => isDateDisabled(key))
    if (rangeIncludesDisabledDate) return null
    return { from: currentRange.from, to: hoveredDateKey }
  }, [currentRange?.from, currentRange?.to, hoveredDateKey, isDateDisabled, mode])

  const summaryContent = React.useMemo(() => {
    if (!showSelectionSummary && !renderSelectionSummary) return null

    if (renderSelectionSummary) {
      return renderSelectionSummary({
        mode,
        value: currentValue,
        range: currentRange,
        locale,
      })
    }

    if (mode === "range") {
      const formattedFrom = formatCalendarSummaryDate(currentRange?.from, locale)
      const formattedTo = formatCalendarSummaryDate(currentRange?.to, locale)
      if (formattedFrom && formattedTo) return `${formattedFrom} -> ${formattedTo}`
      if (formattedFrom) return `${formattedFrom} -> ...`
      return "No range selected"
    }

    return formatCalendarSummaryDate(currentValue, locale) ?? "No date selected"
  }, [currentRange, currentValue, locale, mode, renderSelectionSummary, showSelectionSummary])

  const clearSelection = () => {
    if (mode === "single") {
      if (!isControlledSingle) setInternalValue(null)
      onValueChange?.("")
      return
    }

    const nextRange = { from: null, to: null }
    if (!isControlledRange) setInternalRange(nextRange)
    onRangeChange?.(nextRange)
  }

  const jumpToToday = () => {
    const today = new Date()
    const todayDateKey = toDateKey(today)
    setMonth(today)
    setFocusedDateKey(todayDateKey)
    if (!isDateDisabled(todayDateKey)) {
      handleDateSelect(todayDateKey)
    }
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
        "w-fit rounded-[var(--aui-card-radius,var(--radius-lg))] border border-[color:var(--aui-card-border,var(--border))] bg-popover p-3 text-popover-foreground shadow-[var(--aui-control-panel-shadow,0_18px_40px_rgba(15,23,42,0.14))]",
        className
      )}
      {...props}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="rounded-[var(--radius-md)] border-border/70 bg-background text-foreground shadow-none hover:border-border hover:bg-accent hover:text-accent-foreground"
          aria-label={labels?.previousMonth ?? "Previous month"}
          onClick={() => setMonth(addMonths(currentMonth, -navigationStep))}
        >
          <ChevronLeftIcon />
        </Button>
        <div className="flex flex-1 flex-col items-center text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/90">Calendar</span>
          <div className="text-base font-semibold capitalize tracking-tight text-foreground">{getMonthLabel(currentMonth, locale)}</div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="rounded-[var(--radius-md)] border-border/70 bg-background text-foreground shadow-none hover:border-border hover:bg-accent hover:text-accent-foreground"
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
          <div key={toDateKey(visibleMonth)} className="min-w-[16.5rem] rounded-[var(--radius-md)] bg-transparent p-1">
            {shouldShowMonthHeaders && (
              <div className="mb-2 text-center text-sm font-semibold capitalize tracking-tight text-foreground">
                {getMonthLabel(visibleMonth, locale)}
              </div>
            )}

            <div className="grid grid-cols-7 gap-1 text-center text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground/90">
              {weekdayLabels.map((weekday) => (
                <div key={`${toDateKey(visibleMonth)}-${weekday}`} className="py-1">
                  {weekday}
                </div>
              ))}
            </div>

            <div className="mt-1.5 grid grid-cols-7 gap-1">
              {days.map((date) => {
                const dateKey = toDateKey(date)
                const outside = !isSameMonth(date, visibleMonth)
                const selected = mode === "single" ? currentValue === dateKey : dateKey === currentRange?.from || dateKey === currentRange?.to
                const inRange = mode === "range" && isWithinRange(dateKey, currentRange?.from, currentRange?.to)
                const inPreviewRange = !inRange && mode === "range" && isWithinRange(dateKey, previewRange?.from, previewRange?.to)
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
                    data-in-preview-range={inPreviewRange || undefined}
                    data-disabled-reason={disabledReason}
                    className={cn(
                      "flex h-9 items-center justify-center rounded-[var(--radius-sm)] border border-transparent text-sm font-medium outline-none transition-[background-color,color,border-color,box-shadow,transform] hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-30",
                      outside && showOutsideDays ? "text-muted-foreground/34" : "text-foreground",
                      outside && !showOutsideDays && "pointer-events-none opacity-0",
                      dateKey === todayKey && "border-border/70 bg-muted/60 text-foreground",
                      inRange && "bg-primary/10 text-foreground",
                      inPreviewRange && "bg-primary/6 text-foreground",
                      selected && "border-primary bg-primary text-primary-foreground shadow-[0_10px_22px_color-mix(in_oklch,var(--primary),transparent_78%)] hover:bg-primary hover:text-primary-foreground"
                    )}
                    onFocus={() => setFocusedDateKey(dateKey)}
                    onMouseEnter={() => setHoveredDateKey(dateKey)}
                    onMouseLeave={() => setHoveredDateKey(null)}
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
      {(showTodayShortcut || showClearShortcut || showSelectionSummary || renderSelectionSummary) ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--aui-card-border,var(--border))] pt-3">
          <div className="text-xs text-muted-foreground">{summaryContent}</div>
          <div className="flex flex-wrap gap-2">
            {showClearShortcut ? (
              <Button type="button" size="sm" variant="ghost" onClick={clearSelection}>
                {labels?.clear ?? "Clear"}
              </Button>
            ) : null}
            {showTodayShortcut ? (
              <Button type="button" size="sm" variant="outline" onClick={jumpToToday}>
                {labels?.today ?? "Today"}
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export { Calendar }
