import * as React from "react"

import { cn } from "@/lib/utils"

export type SliderProps = Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange"> & {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: React.ReactNode
  description?: React.ReactNode
  showValue?: boolean
  formatValue?: (value: number) => React.ReactNode
}

function Slider({
  value,
  defaultValue = 0,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  description,
  showValue = false,
  formatValue,
  className,
  disabled,
  ...props
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = value ?? internalValue

  const updateValue = (nextValue: number) => {
    if (value === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  return (
    <div data-slot="slider" className={cn("grid gap-2", className)}>
      {(label || description || showValue) && (
        <div className="flex items-start justify-between gap-3">
          <div className="grid gap-0.5">
            {label && <label className="text-sm font-medium text-foreground">{label}</label>}
            {description && <div className="text-xs text-muted-foreground">{description}</div>}
          </div>
          {showValue && (
            <div className="text-sm font-medium text-muted-foreground">
              {formatValue?.(currentValue) ?? currentValue}
            </div>
          )}
        </div>
      )}
      <input
        data-slot="slider-input"
        type="range"
        value={currentValue}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary disabled:cursor-not-allowed disabled:opacity-50"
        onChange={(event) => updateValue(event.currentTarget.valueAsNumber)}
        {...props}
      />
    </div>
  )
}

export type RangeSliderValue = [number, number]

export type RangeSliderProps = Omit<SliderProps, "value" | "defaultValue" | "onValueChange" | "showValue" | "formatValue"> & {
  value?: RangeSliderValue
  defaultValue?: RangeSliderValue
  onValueChange?: (value: RangeSliderValue) => void
  showValue?: boolean
  formatValue?: (value: RangeSliderValue) => React.ReactNode
}

function RangeSlider({
  value,
  defaultValue = [0, 100],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  description,
  showValue = false,
  formatValue,
  className,
  disabled,
}: RangeSliderProps) {
  const [internalValue, setInternalValue] = React.useState<RangeSliderValue>(defaultValue)
  const currentValue = value ?? internalValue

  const updateValue = (index: 0 | 1, nextPart: number) => {
    const nextValue: RangeSliderValue = index === 0
      ? [Math.min(nextPart, currentValue[1]), currentValue[1]]
      : [currentValue[0], Math.max(nextPart, currentValue[0])]

    if (value === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  return (
    <div data-slot="range-slider" className={cn("grid gap-2", className)}>
      {(label || description || showValue) && (
        <div className="flex items-start justify-between gap-3">
          <div className="grid gap-0.5">
            {label && <label className="text-sm font-medium text-foreground">{label}</label>}
            {description && <div className="text-xs text-muted-foreground">{description}</div>}
          </div>
          {showValue && (
            <div className="text-sm font-medium text-muted-foreground">
              {formatValue?.(currentValue) ?? `${currentValue[0]} - ${currentValue[1]}`}
            </div>
          )}
        </div>
      )}
      <div className="grid gap-2">
        <input
          type="range"
          value={currentValue[0]}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary disabled:cursor-not-allowed disabled:opacity-50"
          onChange={(event) => updateValue(0, event.currentTarget.valueAsNumber)}
        />
        <input
          type="range"
          value={currentValue[1]}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary disabled:cursor-not-allowed disabled:opacity-50"
          onChange={(event) => updateValue(1, event.currentTarget.valueAsNumber)}
        />
      </div>
    </div>
  )
}

export { RangeSlider, Slider }
