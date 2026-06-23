import * as React from "react"

import { InputDecorator } from "@/components/inputs/input-decorator"
import { getInputValue } from "@/components/inputs/input-value"
import { clampNumericValue, parseDecimalInput } from "@/components/inputs/numeric-value"

export type NumberInputProps = Omit<
  React.ComponentProps<typeof InputDecorator>,
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
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

function parseNumberInput(value: string) {
  return parseDecimalInput(value)
}

function clampNumber(value: number, min?: number, max?: number) {
  return clampNumericValue(value, min, max)
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
      prefix,
      suffix,
      leading,
      trailing,
      inputMode = "decimal",
      onBlur,
      ...props
    },
    ref
  ) => {
    const stringValue = getInputValue(value)

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
        const fallbackValue = String(min ?? 0)
        event.currentTarget.value = fallbackValue
        emitValue(fallbackValue)
      }

      onBlur?.(event)
    }

    return (
      <InputDecorator
        ref={ref}
        type="text"
        value={stringValue}
        inputMode={inputMode}
        min={min}
        max={max}
        step={step}
        leading={prefix ?? leading}
        trailing={suffix ?? trailing}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput, parseNumberInput, clampNumber }
