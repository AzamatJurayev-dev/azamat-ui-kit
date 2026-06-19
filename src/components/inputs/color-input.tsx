import * as React from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type ColorInputProps = Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  label?: React.ReactNode
  description?: React.ReactNode
  swatchClassName?: string
}

function ColorInput({ value, defaultValue = "#000000", onValueChange, label, description, swatchClassName, className, disabled, ...props }: ColorInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = value ?? internalValue

  const updateValue = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  return (
    <div data-slot="color-input" className={cn("grid gap-2", className)}>
      {(label || description) && (
        <div className="grid gap-0.5">
          {label && <label className="text-sm font-medium text-foreground">{label}</label>}
          {description && <div className="text-xs text-muted-foreground">{description}</div>}
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={currentValue}
          disabled={disabled}
          className={cn("size-9 cursor-pointer rounded-md border bg-background p-1 disabled:cursor-not-allowed disabled:opacity-50", swatchClassName)}
          onChange={(event) => updateValue(event.currentTarget.value)}
          {...props}
        />
        <Input value={currentValue} disabled={disabled} onChange={(event) => updateValue(event.currentTarget.value)} className="font-mono" />
      </div>
    </div>
  )
}

export { ColorInput }
