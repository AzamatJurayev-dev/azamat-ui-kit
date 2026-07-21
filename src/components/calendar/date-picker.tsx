"use client"

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
  triggerVariant?: "default" | "compact"
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
  triggerVariant = "default",
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

  const clearValue = () => {
    onValueChange?.("")
    setOpen(false)
  }

  const handleClear = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    clearValue()
  }

  return (
    <div data-slot="date-picker" data-trigger-variant={triggerVariant} className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              labelClassName="flex-1"
              className={cn(
                "group w-full justify-start rounded-[var(--aui-control-radius,var(--radius-md))] border-border/80 bg-background/96 text-left font-normal shadow-[var(--aui-control-shadow,0_1px_2px_rgba(15,23,42,0.04))]",
                triggerVariant === "default" ? "min-h-11 gap-3 px-3" : "min-h-9 gap-2 px-2.5",
                !hasValue && "text-muted-foreground",
                triggerClassName
              )}
            />
          }
        >
          <CalendarIcon data-icon="inline-start" className={cn("size-4", hasValue && "text-primary")} />
          <span className="grid min-w-0 flex-1">
            <span className={cn("truncate text-sm", hasValue && "font-semibold text-foreground")}>
              {hasValue ? formatValue(String(value)) : placeholder ?? labels?.placeholder ?? "Select date"}
            </span>
          </span>
          {clearable && hasValue ? (
            <span
              role="button"
              tabIndex={0}
              aria-label={labels?.clear ?? "Clear date"}
              className={cn("ml-auto inline-flex shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground opacity-80 transition hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring", triggerVariant === "default" ? "size-7" : "size-6")}
              onClick={handleClear}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  clearValue()
                }
              }}
            >
              <XIcon className="size-3.5" />
            </span>
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
