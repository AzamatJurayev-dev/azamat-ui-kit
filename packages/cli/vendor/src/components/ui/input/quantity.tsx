import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"

import { InputChrome } from "./chrome"
import { getInputValue } from "./value"
import { clampNumericValue, parseDecimalInput } from "./numeric-value"
import { Button } from "@/components/ui/button"
import { InputPrimitive } from "./primitive"
import { cn } from "@/lib/utils"

export type QuantityInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange" | "type"
> & {
  value?: number | null
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onValueChange?: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  showControls?: boolean
  wrapperClassName?: string
  inputClassName?: string
}

function clampQuantity(value: number, min?: number, max?: number) {
  return clampNumericValue(value, min, max)
}

function QuantityInput({
  value,
  onChange,
  onValueChange,
  min,
  max,
  step = 1,
  showControls = true,
  wrapperClassName,
  inputClassName,
  className,
  inputMode = "decimal",
  ...props
}: QuantityInputProps) {
  const canDecrease = typeof value !== "number" || typeof min !== "number" || value > min
  const canIncrease = typeof value !== "number" || typeof max !== "number" || value < max

  const setNextValue = (nextValue: number | null) => {
    onValueChange?.(nextValue)
  }

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      onChange?.(event)

      const parsed = parseDecimalInput(event.target.value)
      if (parsed == null) {
        setNextValue(null)
        return
      }

      setNextValue(clampQuantity(parsed, min, max))
    }

  const handleStep = (direction: 1 | -1) => {
    const baseValue = typeof value === "number" ? value : min ?? 0
    setNextValue(clampQuantity(baseValue + step * direction, min, max))
  }

  return (
    <InputChrome
      data-slot="quantity-input"
      className={cn("overflow-hidden", wrapperClassName)}
      start={
        showControls ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="h-full rounded-none"
            disabled={!canDecrease || props.disabled || props.readOnly}
            onClick={() => handleStep(-1)}
          >
            <MinusIcon />
          </Button>
        ) : null
      }
      end={
        showControls ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="h-full rounded-none"
            disabled={!canIncrease || props.disabled || props.readOnly}
            onClick={() => handleStep(1)}
          >
            <PlusIcon />
          </Button>
        ) : null
      }
    >
      <InputPrimitive
        value={getInputValue(value)}
        onChange={handleInputChange}
        inputMode={inputMode}
        className={cn(
          "h-full border-0 bg-transparent text-center shadow-none focus-visible:border-0 focus-visible:ring-0",
          inputClassName,
          className
        )}
        {...props}
      />
    </InputChrome>
  )
}

export { QuantityInput, clampQuantity }
