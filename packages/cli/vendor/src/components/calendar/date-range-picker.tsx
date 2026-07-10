"use client"

import * as React from "react"
import { CalendarIcon, XIcon } from "lucide-react"

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
  start?: string
  end?: string
}

export type DateRangePickerPreset = {
  label: React.ReactNode
  value: DateRangePickerValue
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
  clearable?: boolean
  formatValue?: (value: string) => React.ReactNode
  closeOnSelect?: boolean
  closeOnPresetSelect?: boolean
  showFooter?: boolean
  presets?: DateRangePickerPreset[]
  triggerClassName?: string
  contentClassName?: string
  months?: number
}

function defaultFormatValue(value: string) {
  const date = parseDateKey(value)
  if (!date) return value
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date)
}

function getTextLabel(value: React.ReactNode, fallback: string) {
  return typeof value === "string" ? value : fallback
}

function DateRangePicker({
  className,
  value,
  onValueChange,
  labels,
  placeholder,
  disabled = false,
  clearable = true,
  formatValue = defaultFormatValue,
  closeOnSelect = false,
  closeOnPresetSelect = false,
  showFooter = true,
  presets,
  triggerClassName,
  contentClassName,
  months,
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
  const resolvedNumberOfMonths = months ?? numberOfMonths

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

  const resetValue = () => {
    const nextValue = {}
    setDraftValue(nextValue)
    onValueChange?.(nextValue)
  }

  const clearValue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    resetValue()
  }

  const selectPreset = (presetValue: DateRangePickerValue) => {
    if (showFooter) {
      setDraftValue(presetValue)
      if (closeOnPresetSelect) {
        onValueChange?.(presetValue)
        setOpen(false)
      }
      return
    }

    onValueChange?.(presetValue)
    if ((closeOnSelect || closeOnPresetSelect) && presetValue.from && presetValue.to) {
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
              className={cn(
                "group min-h-11 w-full justify-start gap-3 rounded-[var(--aui-control-radius,var(--radius-md))] border-border/80 bg-background/96 px-3 text-left font-normal shadow-[var(--aui-control-shadow,0_1px_2px_rgba(15,23,42,0.04))]",
                !hasValue && "text-muted-foreground",
                triggerClassName
              )}
            />
          }
        >
          <CalendarIcon data-icon="inline-start" className={cn(hasValue && "text-primary")} />
          {hasValue ? (
            <span className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
              <span className="grid min-w-0 gap-0.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{labels?.start ?? "Start"}</span>
                <span className="truncate text-sm font-semibold text-foreground">{from ? formatValue(from) : "..."}</span>
              </span>
              <span className="text-muted-foreground">-</span>
              <span className="grid min-w-0 gap-0.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{labels?.end ?? "End"}</span>
                <span className="truncate text-sm font-semibold text-foreground">{to ? formatValue(to) : "..."}</span>
              </span>
            </span>
          ) : (
            <span className="grid min-w-0 flex-1 gap-0.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Range</span>
              <span className="truncate text-sm">{label}</span>
            </span>
          )}
          {clearable && hasValue ? (
            <span
              role="button"
              tabIndex={0}
              aria-label={getTextLabel(labels?.clear, "Clear date range")}
              className="ml-auto inline-flex size-7 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground opacity-80 transition hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              onClick={clearValue}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  resetValue()
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
          {presets?.length ? (
            <div className="flex flex-wrap gap-2 border-b border-border/70 bg-muted/20 px-3 py-3">
              {presets.map((preset, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 rounded-full px-3 text-xs"
                  onClick={() => selectPreset(preset.value)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          ) : null}
          <Calendar
            mode="range"
            range={activeValue}
            onRangeChange={handleRangeChange}
            labels={labels}
            renderSelectionSummary={({ range }) => {
              const fromValue = range?.from ? formatValue(range.from) : null
              const toValue = range?.to ? formatValue(range.to) : null

              if (fromValue && toValue) return `${fromValue} -> ${toValue}`
              if (fromValue) return `${fromValue} -> ...`
              return "No range selected"
            }}
            numberOfMonths={resolvedNumberOfMonths}
            pagedNavigation={pagedNavigation}
            showClearShortcut={!showFooter && clearable}
            showSelectionSummary
            {...calendarProps}
          />
          {showFooter && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 bg-muted/24 px-4 py-3">
              <div className="min-w-0 text-sm text-muted-foreground">
                <span className="block truncate">{draftLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={clearDraftValue}>
                  {labels?.clear ?? "Clear"}
                </Button>
                <Button
                  type="button"
                  size="sm"
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
