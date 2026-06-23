import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Calendar, type CalendarProps } from "@/components/calendar/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { parseDateKey } from "./date-utils"

export type DatePickerLabels = CalendarProps["labels"] & {
  placeholder?: string
}

export type DatePickerProps = Omit<
  CalendarProps,
  "mode" | "range" | "onRangeChange" | "labels"
> & {
  placeholder?: string
  labels?: DatePickerLabels
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

function DatePicker({
  value,
  onValueChange,
  placeholder,
  labels,
  disabled = false,
  formatValue = defaultFormatValue,
  triggerClassName,
  contentClassName,
  className,
  ...calendarProps
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const hasValue = Boolean(value)

  const handleSelect = (nextValue: string) => {
    onValueChange?.(nextValue)
    setOpen(false)
  }

  return (
    <div data-slot="date-picker" className={cn("w-full", className)}>
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
          <span className="min-w-0 flex-1 truncate">
            {hasValue ? formatValue(String(value)) : placeholder ?? labels?.placeholder ?? "Select date"}
          </span>
        </PopoverTrigger>
        <PopoverContent align="start" className={cn("w-auto p-0", contentClassName)}>
          <Calendar value={value} onValueChange={handleSelect} labels={labels} {...calendarProps} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { DatePicker }
