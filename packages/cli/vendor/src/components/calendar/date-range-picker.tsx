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
  triggerClassName,
  contentClassName,
  ...calendarProps
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const from = value?.from ?? ""
  const to = value?.to ?? ""
  const hasValue = Boolean(from || to)

  const label = from && to
    ? `${formatValue(from)} - ${formatValue(to)}`
    : from
      ? `${formatValue(from)} - ...`
      : placeholder ?? labels?.placeholder ?? "Select date range"

  const handleRangeChange = (nextValue: DateRangePickerValue) => {
    onValueChange?.(nextValue)
    if (nextValue.from && nextValue.to) {
      setOpen(false)
    }
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
              className={cn("w-full justify-start text-left font-normal", !hasValue && "text-muted-foreground", triggerClassName)}
            />
          }
        >
          <CalendarIcon data-icon="inline-start" />
          <span className="min-w-0 flex-1 truncate">{label}</span>
        </PopoverTrigger>
        <PopoverContent align="start" className={cn("w-auto p-0", contentClassName)}>
          <Calendar
            mode="range"
            range={value}
            onRangeChange={handleRangeChange}
            labels={labels}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { DateRangePicker }
