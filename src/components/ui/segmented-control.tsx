import * as React from "react"

import { cn } from "@/lib/utils"

export type SegmentedControlOption<TValue extends string = string> = {
  value: TValue
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export type SegmentedControlProps<TValue extends string = string> = Omit<React.ComponentProps<"div">, "onChange"> & {
  value?: TValue
  defaultValue?: TValue
  onValueChange?: (value: TValue) => void
  options: SegmentedControlOption<TValue>[]
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
}

const sizeClassName = {
  sm: "h-8 px-2 text-xs",
  md: "h-9 px-3 text-sm",
  lg: "h-10 px-4 text-sm",
}

function SegmentedControl<TValue extends string = string>({
  value,
  defaultValue,
  onValueChange,
  options,
  size = "md",
  fullWidth = false,
  className,
  ...props
}: SegmentedControlProps<TValue>) {
  const [internalValue, setInternalValue] = React.useState<TValue | undefined>(defaultValue ?? options[0]?.value)
  const currentValue = value ?? internalValue

  const selectValue = (nextValue: TValue) => {
    if (value === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  return (
    <div
      data-slot="segmented-control"
      role="radiogroup"
      className={cn("inline-flex rounded-lg border bg-muted p-1", fullWidth && "flex w-full", className)}
      {...props}
    >
      {options.map((option) => {
        const selected = option.value === currentValue
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={option.disabled}
            data-selected={selected || undefined}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-md font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[selected=true]:bg-background data-[selected=true]:text-foreground data-[selected=true]:shadow-sm",
              sizeClassName[size],
              fullWidth && "flex-1"
            )}
            onClick={() => selectValue(option.value)}
          >
            {option.icon}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export { SegmentedControl }
