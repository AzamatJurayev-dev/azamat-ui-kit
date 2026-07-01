import * as React from "react"

import { cn } from "@/lib/utils"

export type TimePickerProps = Omit<React.ComponentProps<"input">, "type"> & {
  label?: React.ReactNode
}

export type DateTimePickerProps = Omit<React.ComponentProps<"input">, "type"> & {
  label?: React.ReactNode
}

export type TimeRangePickerProps = React.ComponentProps<"div"> & {
  from?: string
  to?: string
  onFromChange?: (value: string) => void
  onToChange?: (value: string) => void
  disabled?: boolean
}

function FieldShell({ label, className, children }: { label?: React.ReactNode; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("grid gap-1.5 text-sm", className)}>
      {label && <span className="font-medium">{label}</span>}
      {children}
    </label>
  )
}

function TimePicker({ label, className, ...props }: TimePickerProps) {
  return (
    <FieldShell label={label}>
      <input type="time" className={cn("h-10 rounded-md border bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring", className)} {...props} />
    </FieldShell>
  )
}

function DateTimePicker({ label, className, ...props }: DateTimePickerProps) {
  return (
    <FieldShell label={label}>
      <input type="datetime-local" className={cn("h-10 rounded-md border bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring", className)} {...props} />
    </FieldShell>
  )
}

function TimeRangePicker({ from, to, onFromChange, onToChange, disabled, className, ...props }: TimeRangePickerProps) {
  return (
    <div data-slot="time-range-picker" className={cn("grid gap-2 sm:grid-cols-2", className)} {...props}>
      <TimePicker value={from} disabled={disabled} onChange={(event) => onFromChange?.(event.target.value)} />
      <TimePicker value={to} disabled={disabled} onChange={(event) => onToChange?.(event.target.value)} />
    </div>
  )
}

export { DateTimePicker, TimePicker, TimeRangePicker }
