"use client"

import * as React from "react"

import { DatePicker, type DatePickerProps } from "@/components/calendar/date-picker"
import { TimePicker } from "@/components/inputs/time-picker"
import { cn } from "@/lib/utils"

export type DateTimeValue = {
  date?: string
  time?: string
}

export type CalendarDateTimePickerProps = Omit<React.ComponentProps<"div">, "value" | "onChange"> & {
  value?: DateTimeValue
  onValueChange?: (value: DateTimeValue) => void
  datePickerProps?: Omit<DatePickerProps, "value" | "onValueChange">
  timeLabel?: React.ReactNode
  disabled?: boolean
}

function CalendarDateTimePicker({
  value,
  onValueChange,
  datePickerProps,
  timeLabel = "Time",
  disabled,
  className,
  ...props
}: CalendarDateTimePickerProps) {
  const current = value ?? {}

  return (
    <div data-slot="date-time-picker" className={cn("grid gap-3 sm:grid-cols-2", className)} {...props}>
      <DatePicker
        {...datePickerProps}
        value={current.date}
        disabled={disabled || datePickerProps?.disabled}
        onValueChange={(date) => onValueChange?.({ ...current, date })}
      />
      <label className="grid gap-1.5 text-sm font-medium">
        <span>{timeLabel}</span>
        <TimePicker
          value={current.time ?? ""}
          onChange={(event) => onValueChange?.({ ...current, time: event.currentTarget.value })}
          disabled={disabled}
        />
      </label>
    </div>
  )
}

export { CalendarDateTimePicker }
