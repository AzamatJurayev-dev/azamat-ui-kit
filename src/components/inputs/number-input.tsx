import * as React from "react"

import { Input } from "@/components/ui/input"

export type NumberInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "value" | "onChange" | "min" | "max" | "step"
> & {
  value?: number | string | null
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onValueChange?: (value: string) => void
  onNumberChange?: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  allowEmpty?: boolean
}

function parseNumberInput(value: string) {
  if (!value.trim()) return null

  const parsed = Number(value.replace(/,/g, "."))
  return Number.isFinite(parsed) ? parsed : null
}

function clampNumber(value: number, min?: number, max?: number) {
  let nextValue = value

  if (typeof min === "number") nextValue = Math.max(nextValue, min)
  if (typeof max === "number") nextValue = Math.min(nextValue, max)

  return nextValue
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      onChange,
      onValueChange,
      onNumberChange,
      min,
      max,
      step,
      allowEmpty = true,
      inputMode = "decimal",
      onBlur,
      ...props
    },
    ref
  ) => {
    const stringValue = value == null ? "" : String(value)

    const emitValue = (rawValue: string) => {
      const parsed = parseNumberInput(rawValue)
      const clamped = parsed == null ? null : clampNumber(parsed, min, max)

      onValueChange?.(rawValue)
      onNumberChange?.(clamped)
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      onChange?.(event)
      emitValue(event.target.value)
    }

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
      if (!allowEmpty && !event.target.value.trim()) {
        emitValue(String(min ?? 0))
      }

      onBlur?.(event)
    }

    return (
      <Input
        ref={ref}
        type="text"
        value={stringValue}
        inputMode={inputMode}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput, parseNumberInput, clampNumber }
