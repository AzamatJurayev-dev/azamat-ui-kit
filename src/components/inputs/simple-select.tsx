import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type SimpleSelectOption = {
  label: React.ReactNode
  value: string
  disabled?: boolean
  description?: React.ReactNode
}

export type SimpleSelectProps = Omit<
  React.ComponentProps<typeof Select>,
  "value" | "onValueChange"
> & {
  value?: string
  onValueChange?: (value: string) => void
  options: SimpleSelectOption[]
  placeholder?: string
  size?: "sm" | "default"
  triggerClassName?: string
  contentClassName?: string
  itemClassName?: string
}

function SimpleSelect({
  value,
  onValueChange,
  options,
  placeholder = "Select",
  size = "default",
  triggerClassName,
  contentClassName,
  itemClassName,
  ...props
}: SimpleSelectProps) {
  return (
    <Select value={value} onValueChange={(val) => onValueChange?.(val as string)} {...props}>
      <SelectTrigger size={size} className={cn("w-full", triggerClassName)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={contentClassName}>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={itemClassName}
          >
            <span className="flex min-w-0 flex-col">
              <span className="truncate">{option.label}</span>
              {option.description && (
                <span className="truncate text-xs text-muted-foreground">
                  {option.description}
                </span>
              )}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { SimpleSelect }
