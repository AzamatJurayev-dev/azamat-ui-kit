import * as React from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type MoneyInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange" | "type"
> & {
  value?: number | string | null
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onValueChange?: (value: number | null, rawValue: string) => void
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  wrapperClassName?: string
  inputClassName?: string
}

function parseMoneyInput(value: string) {
  const normalized = value
    .replace(/\s/g, "")
    .replace(/,/g, ".")
    .replace(/[^0-9.-]/g, "")

  if (!normalized || normalized === "-" || normalized === "." || normalized === "-.") {
    return null
  }

  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : null
}

function MoneyInput({
  value,
  onChange,
  onValueChange,
  prefix,
  suffix,
  wrapperClassName,
  inputClassName,
  className,
  inputMode = "decimal",
  ...props
}: MoneyInputProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event)
    onValueChange?.(parseMoneyInput(event.target.value), event.target.value)
  }

  return (
    <div
      data-slot="money-input"
      className={cn(
        "flex h-8 w-full min-w-0 items-center rounded-lg border border-input bg-transparent text-sm transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        wrapperClassName
      )}
    >
      {prefix && (
        <span className="shrink-0 pl-2.5 text-xs font-medium text-muted-foreground">
          {prefix}
        </span>
      )}
      <Input
        value={value ?? ""}
        onChange={handleChange}
        inputMode={inputMode}
        className={cn(
          "h-full border-0 bg-transparent px-2.5 shadow-none focus-visible:border-0 focus-visible:ring-0",
          inputClassName,
          className
        )}
        {...props}
      />
      {suffix && (
        <span className="shrink-0 pr-2.5 text-xs font-medium text-muted-foreground">
          {suffix}
        </span>
      )}
    </div>
  )
}

export { MoneyInput, parseMoneyInput }
