import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  let nextValue = value

  if (typeof min === "number") nextValue = Math.max(nextValue, min)
  if (typeof max === "number") nextValue = Math.min(nextValue, max)

  return nextValue
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

    const rawValue = event.target.value
    if (!rawValue) {
      setNextValue(null)
      return
    }

    const parsed = Number(rawValue)
    setNextValue(Number.isFinite(parsed) ? clampQuantity(parsed, min, max) : null)
  }

  const handleStep = (direction: 1 | -1) => {
    const baseValue = typeof value === "number" ? value : min ?? 0
    setNextValue(clampQuantity(baseValue + step * direction, min, max))
  }

  return (
    <div
      data-slot="quantity-input"
      className={cn(
        "flex h-8 w-full min-w-0 items-center overflow-hidden rounded-lg border border-input bg-transparent focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        wrapperClassName
      )}
    >
      {showControls && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="h-full rounded-none"
          disabled={!canDecrease || props.disabled}
          onClick={() => handleStep(-1)}
        >
          <MinusIcon />
        </Button>
      )}
      <Input
        value={value ?? ""}
        onChange={handleInputChange}
        inputMode={inputMode}
        className={cn(
          "h-full border-0 bg-transparent text-center shadow-none focus-visible:border-0 focus-visible:ring-0",
          inputClassName,
          className
        )}
        {...props}
      />
      {showControls && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="h-full rounded-none"
          disabled={!canIncrease || props.disabled}
          onClick={() => handleStep(1)}
        >
          <PlusIcon />
        </Button>
      )}
    </div>
  )
}

export { QuantityInput, clampQuantity }
