import * as React from "react"

import { DateInput, type DateInputProps } from "./date"
import { cn } from "@/lib/utils"

export type DateRangeValue = {
  from?: string
  to?: string
}

export type DateRangeInputProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  value?: DateRangeValue
  onValueChange?: (value: DateRangeValue) => void
  fromPlaceholder?: string
  toPlaceholder?: string
  fromInputProps?: Omit<DateInputProps, "value" | "onValueChange">
  toInputProps?: Omit<DateInputProps, "value" | "onValueChange">
  separator?: React.ReactNode
  inputClassName?: string
}

function DateRangeInput({
  className,
  value,
  onValueChange,
  fromPlaceholder = "From",
  toPlaceholder = "To",
  fromInputProps,
  toInputProps,
  separator = "—",
  inputClassName,
  ...props
}: DateRangeInputProps) {
  const nextValue = (patch: DateRangeValue) => {
    onValueChange?.({
      from: value?.from ?? "",
      to: value?.to ?? "",
      ...patch,
    })
  }

  return (
    <div
      data-slot="date-range-input"
      className={cn("flex w-full flex-col gap-2 sm:flex-row sm:items-center", className)}
      {...props}
    >
      <DateInput
        value={value?.from ?? ""}
        placeholder={fromPlaceholder}
        className={inputClassName}
        onValueChange={(from: string) => nextValue({ from })}
        {...fromInputProps}
      />
      <span className="hidden text-sm text-muted-foreground sm:inline-flex">{separator}</span>
      <DateInput
        value={value?.to ?? ""}
        placeholder={toPlaceholder}
        className={inputClassName}
        onValueChange={(to: string) => nextValue({ to })}
        {...toInputProps}
      />
    </div>
  )
}

export { DateRangeInput }
