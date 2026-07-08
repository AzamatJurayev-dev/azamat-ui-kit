import * as React from "react"
import { CalendarIcon, XIcon } from "lucide-react"

import { Calendar, type CalendarProps } from "@/components/calendar/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { parseDateKey } from "./date-utils"

export type DatePickerLabels = CalendarProps["labels"] & {
  placeholder?: string
  selected?: string
}

export type DatePickerProps = Omit<
  CalendarProps,
  "mode" | "range" | "onRangeChange" | "labels"
> & {
  placeholder?: string
  labels?: DatePickerLabels
  disabled?: boolean
  clearable?: boolean
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
  clearable = true,
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

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onValueChange?.("")
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
                "group min-h-11 w-full justify-start gap-3 rounded-[var(--aui-control-radius,var(--radius-md))] border-border/80 bg-background/96 px-3 text-left font-normal shadow-[var(--aui-control-shadow,0_1px_2px_rgba(15,23,42,0.04))]",
                !hasValue && "text-muted-foreground",
                triggerClassName
              )}
            />
          }
        >
          <CalendarIcon data-icon="inline-start" className={cn(hasValue && "text-primary")} />
          <span className="grid min-w-0 flex-1 gap-0.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {labels?.selected ?? "Date"}
            </span>
            <span className={cn("truncate text-sm", hasValue && "font-semibold text-foreground")}>
              {hasValue ? formatValue(String(value)) : placeholder ?? labels?.placeholder ?? "Select date"}
            </span>
          </span>
          {clearable && hasValue ? (
            <button
              type="button"
              aria-label={labels?.clear ?? "Clear date"}
              className="ml-auto inline-flex size-7 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground opacity-80 transition hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              onClick={handleClear}
            >
              <XIcon className="size-3.5" />
            </button>
          ) : null}
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className={cn(
            "w-auto overflow-hidden rounded-[var(--aui-card-radius,var(--radius-lg))] border-border/70 bg-popover p-0 shadow-[var(--aui-control-panel-shadow,0_18px_40px_rgba(15,23,42,0.14))] backdrop-blur",
            contentClassName
          )}
        >
          <Calendar
            value={value}
            onValueChange={handleSelect}
            labels={labels}
            showTodayShortcut
            showClearShortcut={clearable}
            showSelectionSummary
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { DatePicker }
