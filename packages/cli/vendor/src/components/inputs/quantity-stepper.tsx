"use client"

import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type QuantityStepperProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

function QuantityStepper({ value, defaultValue = 0, onValueChange, min = 0, max, step = 1, disabled = false, className, ...props }: QuantityStepperProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = value ?? internalValue

  const updateValue = (nextValue: number) => {
    const normalized = Math.max(min, Math.min(max ?? nextValue, Number.isFinite(nextValue) ? nextValue : min))
    if (value === undefined) setInternalValue(normalized)
    onValueChange?.(normalized)
  }

  return (
    <div data-slot="quantity-stepper" className={cn("inline-flex items-center rounded-lg border bg-background", className)} {...props}>
      <Button type="button" variant="ghost" size="icon-sm" disabled={disabled || currentValue <= min} onClick={() => updateValue(currentValue - step)}>
        <MinusIcon />
        <span className="sr-only">Decrease</span>
      </Button>
      <Input
        value={currentValue}
        disabled={disabled}
        inputMode="numeric"
        className="h-8 w-14 border-0 text-center shadow-none focus-visible:ring-0"
        onChange={(event) => updateValue(Number(event.currentTarget.value))}
      />
      <Button type="button" variant="ghost" size="icon-sm" disabled={disabled || (max !== undefined && currentValue >= max)} onClick={() => updateValue(currentValue + step)}>
        <PlusIcon />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  )
}

export { QuantityStepper }
