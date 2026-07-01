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
              className={cn(
                "min-h-11 w-full justify-start rounded-[min(var(--radius-xl),16px)] border-border/80 bg-background/96 text-left font-normal shadow-[0_1px_0_rgba(255,255,255,0.06)]",
                !hasValue && "text-muted-foreground",
                triggerClassName
              )}
            />
          }
        >
          <CalendarIcon data-icon="inline-start" />
          <span className="min-w-0 flex-1 truncate">
            {hasValue ? formatValue(String(value)) : placeholder ?? labels?.placeholder ?? "Select date"}
          </span>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className={cn(
            "w-auto overflow-hidden rounded-[calc(var(--radius-2xl)+2px)] border-border/70 bg-popover p-0 shadow-[0_22px_56px_rgba(15,23,42,0.2)] backdrop-blur",
            contentClassName
          )}
        >
          <Calendar value={value} onValueChange={handleSelect} labels={labels} {...calendarProps} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { DatePicker }
