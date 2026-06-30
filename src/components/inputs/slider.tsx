import * as React from "react"
import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getProgressPercent(value: number, min: number, max: number) {
  if (max <= min) return 0
  return ((value - min) / (max - min)) * 100
}

function getSliderTrackStyle(value: number, min: number, max: number): CSSProperties {
  const progress = getProgressPercent(clampValue(value, min, max), min, max)

  return {
    background: `linear-gradient(90deg, var(--aui-brand-strong) 0%, var(--aui-brand-strong) ${progress}%, var(--aui-control-bg) ${progress}%, var(--aui-control-bg) 100%)`,
  }
}

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
        style={getSliderTrackStyle(currentValue, min, max)}
        className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-[color:var(--aui-control-bg)] shadow-[inset_0_1px_2px_rgba(15,23,42,0.08)] outline-none transition disabled:cursor-not-allowed disabled:opacity-50 [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[color:var(--aui-page-bg)] [&::-moz-range-thumb]:bg-[color:var(--aui-brand-strong)] [&::-moz-range-thumb]:shadow-[0_6px_18px_rgba(16,185,129,0.28)] [&::-moz-range-thumb]:transition [&::-moz-range-track]:h-2.5 [&::-moz-range-track]:rounded-full [&::-webkit-slider-runnable-track]:h-2.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[color:var(--aui-page-bg)] [&::-webkit-slider-thumb]:bg-[color:var(--aui-brand-strong)] [&::-webkit-slider-thumb]:shadow-[0_6px_18px_rgba(16,185,129,0.28)]"
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

function getRangeFillStyle(value: RangeSliderValue, min: number, max: number): CSSProperties {
  const start = getProgressPercent(clampValue(value[0], min, max), min, max)
  const end = getProgressPercent(clampValue(value[1], min, max), min, max)

  return {
    left: `${start}%`,
    width: `${Math.max(end - start, 0)}%`,
  }
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
  ...props
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
        <div className="relative h-6">
          <div className="absolute top-1/2 h-2.5 w-full -translate-y-1/2 rounded-full bg-[color:var(--aui-control-bg)] shadow-[inset_0_1px_2px_rgba(15,23,42,0.08)]" />
          <div
            className="absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full bg-[color:var(--aui-brand-strong)] shadow-[0_6px_18px_rgba(16,185,129,0.18)]"
            style={getRangeFillStyle(currentValue, min, max)}
          />
        </div>
        <div className="relative -mt-8 h-6">
        <input
          type="range"
          value={currentValue[0]}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="pointer-events-none absolute inset-0 h-6 w-full cursor-pointer appearance-none bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[color:var(--aui-page-bg)] [&::-moz-range-thumb]:bg-[color:var(--aui-brand-strong)] [&::-moz-range-thumb]:shadow-[0_6px_18px_rgba(16,185,129,0.28)] [&::-moz-range-track]:h-2.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-2.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[color:var(--aui-page-bg)] [&::-webkit-slider-thumb]:bg-[color:var(--aui-brand-strong)] [&::-webkit-slider-thumb]:shadow-[0_6px_18px_rgba(16,185,129,0.28)]"
          onChange={(event) => updateValue(0, event.currentTarget.valueAsNumber)}
          {...props}
        />
        <input
          type="range"
          value={currentValue[1]}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="pointer-events-none absolute inset-0 h-6 w-full cursor-pointer appearance-none bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[color:var(--aui-page-bg)] [&::-moz-range-thumb]:bg-[color:var(--aui-brand-strong)] [&::-moz-range-thumb]:shadow-[0_6px_18px_rgba(16,185,129,0.28)] [&::-moz-range-track]:h-2.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-2.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[color:var(--aui-page-bg)] [&::-webkit-slider-thumb]:bg-[color:var(--aui-brand-strong)] [&::-webkit-slider-thumb]:shadow-[0_6px_18px_rgba(16,185,129,0.28)]"
          onChange={(event) => updateValue(1, event.currentTarget.valueAsNumber)}
          {...props}
        />
        </div>
      </div>
    </div>
  )
}

export { RangeSlider, Slider }
