import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type StatusTone = "default" | "success" | "warning" | "danger" | "muted"

export type StatusSelectOption<TValue extends string = string> = {
  value: TValue
  label: React.ReactNode
  tone?: StatusTone
  disabled?: boolean
  disabledReason?: React.ReactNode
}

export type StatusSelectProps<TValue extends string = string> = Omit<React.ComponentProps<typeof Select>, "value" | "onValueChange"> & {
  value?: TValue
  options: StatusSelectOption<TValue>[]
  onValueChange?: (value: TValue, option: StatusSelectOption<TValue>) => void
  placeholder?: React.ReactNode
  triggerClassName?: string
  badgeClassName?: string
  renderTrigger?: (option: StatusSelectOption<TValue> | undefined) => React.ReactNode
  renderOption?: (option: StatusSelectOption<TValue>) => React.ReactNode
}

const toneClassName: Record<StatusTone, string> = {
  default: "",
  success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  warning: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  danger: "border-destructive/20 bg-destructive/10 text-destructive",
  muted: "border-border bg-muted text-muted-foreground",
}

function StatusSelect<TValue extends string = string>({ value, options, onValueChange, placeholder = "Select status", triggerClassName, badgeClassName, renderTrigger, renderOption, ...props }: StatusSelectProps<TValue>) {
  const currentOption = options.find((option) => option.value === value)

  return (
    <Select
      value={value}
      onValueChange={(nextValue) => {
        const option = options.find((item) => item.value === nextValue as TValue)
        if (option) onValueChange?.(option.value, option)
      }}
      {...props}
    >
      <SelectTrigger className={triggerClassName}>
        {renderTrigger?.(currentOption) ?? (
          currentOption ? (
            <Badge variant="outline" className={cn(toneClassName[currentOption.tone ?? "default"], badgeClassName)}>{currentOption.label}</Badge>
          ) : (
            <SelectValue placeholder={placeholder} />
          )
        )}
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
            {renderOption?.(option) ?? (
              <span className="flex items-center gap-2">
                <Badge variant="outline" className={cn(toneClassName[option.tone ?? "default"], badgeClassName)}>{option.label}</Badge>
                {option.disabledReason && <span className="text-xs text-muted-foreground">{option.disabledReason}</span>}
              </span>
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { StatusSelect }
