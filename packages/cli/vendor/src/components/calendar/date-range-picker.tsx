import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Calendar, type CalendarDateRange, type CalendarProps } from "@/components/calendar/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { parseDateKey } from "./date-utils"

export type DateRangePickerValue = CalendarDateRange

export type DateRangePickerLabels = CalendarProps["labels"] & {
  placeholder?: string
  apply?: React.ReactNode
  clear?: React.ReactNode
}

export type DateRangePickerProps = Omit<
  CalendarProps,
  "mode" | "value" | "onValueChange" | "range" | "onRangeChange" | "labels"
> & {
  value?: DateRangePickerValue
  onValueChange?: (value: DateRangePickerValue) => void
  labels?: DateRangePickerLabels
  placeholder?: string
  disabled?: boolean
  formatValue?: (value: string) => React.ReactNode
  closeOnSelect?: boolean
  showFooter?: boolean
  triggerClassName?: string
  contentClassName?: string
}

function defaultFormatValue(value: string) {
  const date = parseDateKey(value)
  if (!date) return value
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date)
}

function DateRangePicker({
  className,
  value,
  onValueChange,
  labels,
  placeholder,
  disabled = false,
  formatValue = defaultFormatValue,
  closeOnSelect = true,
  showFooter = false,
  triggerClassName,
  contentClassName,
  numberOfMonths = 2,
  pagedNavigation = true,
  ...calendarProps
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [draftValue, setDraftValue] = React.useState<DateRangePickerValue>(value ?? {})
  const from = value?.from ?? ""
  const to = value?.to ?? ""
  const hasValue = Boolean(from || to)
  const activeValue = showFooter ? draftValue : value
  const activeFrom = activeValue?.from ?? ""
  const activeTo = activeValue?.to ?? ""
  const hasDraftValue = Boolean(activeFrom || activeTo)

  const label = from && to
    ? `${formatValue(from)} - ${formatValue(to)}`
    : from
      ? `${formatValue(from)} - ...`
      : placeholder ?? labels?.placeholder ?? "Select date range"

  const draftLabel = activeFrom && activeTo
    ? `${formatValue(activeFrom)} - ${formatValue(activeTo)}`
    : activeFrom
      ? `${formatValue(activeFrom)} - ...`
      : labels?.placeholder ?? "Select date range"

  React.useEffect(() => {
    if (open && showFooter) {
      setDraftValue(value ?? {})
    }
  }, [open, showFooter, value])

  const handleRangeChange = (nextValue: DateRangePickerValue) => {
    if (showFooter) {
      setDraftValue(nextValue)
      return
    }

    onValueChange?.(nextValue)
    if (closeOnSelect && nextValue.from && nextValue.to) {
      setOpen(false)
    }
  }

  const applyDraftValue = () => {
    onValueChange?.(draftValue)
    setOpen(false)
  }

  const clearDraftValue = () => {
    const nextValue = {}

    if (showFooter) {
      setDraftValue(nextValue)
      return
    }

    onValueChange?.(nextValue)
  }

  return (
    <div data-slot="date-range-picker" className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              className={cn(
                "min-h-11 w-full justify-start rounded-[min(var(--radius-xl),16px)] border-border/80 bg-background/96 text-left font-normal shadow-[0_1px_0_rgba(255,255,255,0.06)]",
                !hasValue && "text-muted-foreground",
                triggerClassName
              )}
            />
          }
        >
          <CalendarIcon data-icon="inline-start" />
          <span className="min-w-0 flex-1 truncate">{label}</span>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className={cn(
            "w-auto rounded-[var(--radius-2xl)] border-border/80 bg-popover/98 p-0 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur",
            contentClassName
          )}
        >
          <Calendar
            mode="range"
            range={activeValue}
            onRangeChange={handleRangeChange}
            labels={labels}
            numberOfMonths={numberOfMonths}
            pagedNavigation={pagedNavigation}
            {...calendarProps}
          />
          {showFooter && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 bg-muted/18 px-4 py-3">
              <div className="min-w-0 text-sm text-muted-foreground">
                <span className="block truncate">{draftLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="sm" className="rounded-full" onClick={clearDraftValue}>
                  {labels?.clear ?? "Clear"}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="rounded-full"
                  disabled={!hasDraftValue}
                  onClick={applyDraftValue}
                >
                  {labels?.apply ?? "Apply"}
                </Button>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { DateRangePicker }
