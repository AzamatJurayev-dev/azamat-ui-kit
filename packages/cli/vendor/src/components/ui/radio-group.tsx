import * as React from "react"

import { cn } from "@/lib/utils"

export type RadioGroupOption = {
  label: React.ReactNode
  value: string
  description?: React.ReactNode
  disabled?: boolean
}

export type RadioGroupProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  name?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  options: RadioGroupOption[]
  orientation?: "vertical" | "horizontal"
  size?: "sm" | "default" | "lg"
  itemClassName?: string
}

const sizeClassName = {
  sm: "size-3.5",
  default: "size-4",
  lg: "size-5",
}

function RadioGroup({
  name,
  value,
  defaultValue,
  onValueChange,
  options,
  orientation = "vertical",
  size = "default",
  className,
  itemClassName,
  ...props
}: RadioGroupProps) {
  const generatedName = React.useId()
  const resolvedName = name ?? generatedName
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const setValue = (nextValue: string) => {
    if (!isControlled) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  return (
    <div
      role="radiogroup"
      data-slot="radio-group"
      data-orientation={orientation}
      className={cn("grid gap-2", orientation === "horizontal" && "sm:flex sm:flex-wrap sm:items-center", className)}
      {...props}
    >
      {options.map((option) => {
        const checked = option.value === currentValue
        return (
          <label
            key={option.value}
            data-slot="radio-group-item"
            data-checked={checked || undefined}
            data-disabled={option.disabled || undefined}
            className={cn(
              "group flex cursor-pointer items-start gap-3 rounded-[min(var(--radius-xl),16px)] border border-border/80 bg-background/88 px-3 py-2.5 text-sm transition hover:border-ring/35 hover:bg-accent/60 data-[checked=true]:border-primary/35 data-[checked=true]:bg-primary/8 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-55",
              itemClassName
            )}
          >
            <input
              type="radio"
              name={resolvedName}
              value={option.value}
              checked={checked}
              disabled={option.disabled}
              className="sr-only"
              onChange={() => setValue(option.value)}
            />
            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 inline-flex shrink-0 items-center justify-center rounded-full border border-input bg-background shadow-sm transition group-data-[checked=true]:border-primary group-data-[checked=true]:bg-primary",
                sizeClassName[size]
              )}
            >
              <span className="size-1.5 rounded-full bg-primary-foreground opacity-0 transition group-data-[checked=true]:opacity-100" />
            </span>
            <span className="min-w-0">
              <span className="block font-medium text-foreground">{option.label}</span>
              {option.description ? <span className="mt-1 block text-sm leading-6 text-muted-foreground">{option.description}</span> : null}
            </span>
          </label>
        )
      })}
    </div>
  )
}

export { RadioGroup }
