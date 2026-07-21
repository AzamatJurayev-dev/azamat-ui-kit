import * as React from "react"
import { CalendarClockIcon, ClockIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type TimePickerProps = Omit<React.ComponentProps<"input">, "type"> & {
  label?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
}

export type DateTimePickerProps = Omit<React.ComponentProps<"input">, "type"> & {
  label?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
}

export type TimeRangePickerProps = React.ComponentProps<"div"> & {
  from?: string
  to?: string
  onFromChange?: (value: string) => void
  onToChange?: (value: string) => void
  disabled?: boolean
  labels?: {
    from?: React.ReactNode
    to?: React.ReactNode
  }
}

function FieldShell({ label, className, children }: { label?: React.ReactNode; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("grid gap-1.5 text-sm", className)}>
      {label && <span className="font-medium">{label}</span>}
      {children}
    </label>
  )
}

function clearInput(event: React.MouseEvent<HTMLButtonElement>, onChange: React.ChangeEventHandler<HTMLInputElement> | undefined, onClear: (() => void) | undefined) {
  event.preventDefault()
  event.stopPropagation()
  onChange?.({ target: { value: "" }, currentTarget: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
  onClear?.()
}

function TimePicker({ label, className, clearable = false, onClear, value, defaultValue, disabled, onChange, ...props }: TimePickerProps) {
  const hasValue = value !== undefined ? String(value).length > 0 : defaultValue !== undefined && String(defaultValue).length > 0

  return (
    <FieldShell label={label}>
      <span className="relative grid">
        <ClockIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="time"
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
          className={cn("h-11 rounded-[var(--aui-control-radius,var(--radius-md))] border border-input/82 bg-background px-10 text-sm tabular-nums outline-none transition-[border-color,box-shadow] hover:border-ring/30 focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/16 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground", className)}
          {...props}
        />
        {clearable && hasValue && !disabled ? (
          <button type="button" aria-label="Clear time" className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={(event) => clearInput(event, onChange, onClear)}>
            <XIcon className="size-3.5" />
          </button>
        ) : null}
      </span>
    </FieldShell>
  )
}

function DateTimePicker({ label, className, clearable = false, onClear, value, defaultValue, disabled, onChange, ...props }: DateTimePickerProps) {
  const hasValue = value !== undefined ? String(value).length > 0 : defaultValue !== undefined && String(defaultValue).length > 0

  return (
    <FieldShell label={label}>
      <span className="relative grid">
        <CalendarClockIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="datetime-local"
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
          className={cn("h-11 rounded-[var(--aui-control-radius,var(--radius-md))] border border-input/82 bg-background px-10 text-sm tabular-nums outline-none transition-[border-color,box-shadow] hover:border-ring/30 focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/16 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground", className)}
          {...props}
        />
        {clearable && hasValue && !disabled ? (
          <button type="button" aria-label="Clear date and time" className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={(event) => clearInput(event, onChange, onClear)}>
            <XIcon className="size-3.5" />
          </button>
        ) : null}
      </span>
    </FieldShell>
  )
}

function TimeRangePicker({ from, to, onFromChange, onToChange, disabled, labels, className, ...props }: TimeRangePickerProps) {
  return (
    <div data-slot="time-range-picker" className={cn("grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-end", className)} {...props}>
      <TimePicker label={labels?.from} value={from} clearable disabled={disabled} onChange={(event) => onFromChange?.(event.target.value)} onClear={() => onFromChange?.("")} />
      <span className="hidden h-11 items-center text-sm text-muted-foreground sm:inline-flex">to</span>
      <TimePicker label={labels?.to} value={to} clearable disabled={disabled} onChange={(event) => onToChange?.(event.target.value)} onClear={() => onToChange?.("")} />
    </div>
  )
}

export { DateTimePicker, TimePicker, TimeRangePicker }
