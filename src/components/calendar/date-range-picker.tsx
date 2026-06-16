import * as React from "react"

import { DatePicker } from "@/components/calendar/date-picker"
import { cn } from "@/lib/utils"

export type DateRangePickerValue = { from?: string; to?: string }

export type DateRangePickerProps = React.ComponentProps<"div"> & {
  value?: DateRangePickerValue
  onValueChange?: (value: DateRangePickerValue) => void
  disabled?: boolean
}

function DateRangePicker({ className, value, onValueChange, disabled, ...props }: DateRangePickerProps) {
  return (
    <div data-slot="date-range-picker" className={cn("grid gap-2 sm:grid-cols-2", className)} {...props}>
      <DatePicker value={value?.from ?? ""} disabled={disabled} onValueChange={(from) => onValueChange?.({ ...value, from })} />
      <DatePicker value={value?.to ?? ""} disabled={disabled} onValueChange={(to) => onValueChange?.({ ...value, to })} />
    </div>
  )
}

export { DateRangePicker }
