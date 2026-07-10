import * as React from "react"

import { InputChrome } from "./chrome"
import { getInputValue } from "./value"
import { parseMoneyLikeInput } from "./numeric-value"
import { InputPrimitive } from "@/components/ui/input-primitive"
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
  return parseMoneyLikeInput(value)
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
    <InputChrome
      data-slot="money-input"
      className={cn("text-sm", wrapperClassName)}
      start={
        prefix ? (
          <span className="pl-2.5 text-xs font-medium text-muted-foreground">{prefix}</span>
        ) : null
      }
      end={
        suffix ? (
          <span className="pr-2.5 text-xs font-medium text-muted-foreground">{suffix}</span>
        ) : null
      }
    >
      <InputPrimitive
        value={getInputValue(value)}
        onChange={handleChange}
        inputMode={inputMode}
        className={cn(
          "h-full border-0 bg-transparent px-2.5 shadow-none focus-visible:border-0 focus-visible:ring-0",
          inputClassName,
          className
        )}
        {...props}
      />
    </InputChrome>
  )
}

export { MoneyInput, parseMoneyInput }
