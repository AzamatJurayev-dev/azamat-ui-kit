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
  sm: "min-h-8 px-2.5 text-xs",
  md: "min-h-9 px-3.5 text-sm",
  lg: "min-h-10 px-4 text-sm",
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
      className={cn(
        "inline-flex gap-1 rounded-[var(--radius-2xl)] border border-border/80 bg-muted/72 p-1 text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_26px_rgba(15,23,42,0.05)] backdrop-blur",
        fullWidth && "flex w-full",
        className
      )}
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
              "inline-flex items-center justify-center gap-1.5 rounded-[calc(var(--radius-xl)-2px)] border border-transparent font-medium text-muted-foreground outline-none transition-[background-color,color,border-color,box-shadow,transform] hover:bg-background/58 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[selected=true]:-translate-y-px data-[selected=true]:border-border/85 data-[selected=true]:bg-background data-[selected=true]:text-foreground data-[selected=true]:shadow-[0_1px_0_rgba(255,255,255,0.24),0_12px_24px_rgba(15,23,42,0.12)]",
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
