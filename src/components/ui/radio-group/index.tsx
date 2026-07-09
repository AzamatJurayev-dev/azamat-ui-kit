"use client"

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
  invalid?: boolean
  disabled?: boolean
  itemClassName?: string
  itemLabelClassName?: string
  itemDescriptionClassName?: string
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
  invalid = false,
  disabled = false,
  className,
  itemClassName,
  itemLabelClassName,
  itemDescriptionClassName,
  ...props
}: RadioGroupProps) {
  const generatedName = React.useId()
  const resolvedName = name ?? generatedName
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue
  const itemRefs = React.useRef<Array<HTMLInputElement | null>>([])
  const enabledOptions = options.filter((option) => !option.disabled && !disabled)

  const setValue = (nextValue: string) => {
    if (!isControlled) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  const focusOption = (nextIndex: number) => {
    const option = enabledOptions[nextIndex]
    if (!option) return
    const optionIndex = options.findIndex((item) => item.value === option.value)
    itemRefs.current[optionIndex]?.focus()
    setValue(option.value)
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) return
    if (enabledOptions.length === 0) return

    event.preventDefault()
    const currentEnabledIndex = Math.max(
      0,
      enabledOptions.findIndex((option) => option.value === currentValue)
    )
    if (event.key === "Home") {
      focusOption(0)
      return
    }
    if (event.key === "End") {
      focusOption(enabledOptions.length - 1)
      return
    }
    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1
    focusOption((currentEnabledIndex + direction + enabledOptions.length) % enabledOptions.length)
  }

  return (
    <div
      role="radiogroup"
      aria-invalid={invalid || undefined}
      aria-disabled={disabled || undefined}
      data-slot="radio-group"
      data-orientation={orientation}
      data-invalid={invalid || undefined}
      className={cn("grid gap-2", orientation === "horizontal" && "sm:flex sm:flex-wrap sm:items-center", className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {options.map((option, index) => {
        const checked = option.value === currentValue
        const optionDisabled = disabled || option.disabled
        return (
          <label
            key={option.value}
            data-slot="radio-group-item"
            data-checked={checked || undefined}
            data-disabled={optionDisabled || undefined}
            data-invalid={invalid || undefined}
            className={cn(
              "group flex cursor-pointer items-start gap-3 rounded-[min(var(--radius-xl),16px)] border border-border/80 bg-background/88 px-3 py-2.5 text-sm transition hover:border-ring/35 hover:bg-accent/60 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 data-[checked=true]:border-primary/35 data-[checked=true]:bg-primary/8 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-55 data-[invalid=true]:border-destructive/70 data-[invalid=true]:ring-3 data-[invalid=true]:ring-destructive/15",
              itemClassName
            )}
          >
            <input
              ref={(node) => {
                itemRefs.current[index] = node
              }}
              type="radio"
              name={resolvedName}
              value={option.value}
              checked={checked}
              disabled={optionDisabled}
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
              <span className={cn("block font-medium text-foreground", itemLabelClassName)}>{option.label}</span>
              {option.description ? <span className={cn("mt-1 block text-sm leading-6 text-muted-foreground", itemDescriptionClassName)}>{option.description}</span> : null}
            </span>
          </label>
        )
      })}
    </div>
  )
}

export { RadioGroup }
