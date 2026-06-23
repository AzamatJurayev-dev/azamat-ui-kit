import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type StepperTabItem<TValue extends string = string> = {
  value: TValue
  label: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  completed?: boolean
  disabled?: boolean
  hidden?: boolean
}

export type StepperTabsProps<TValue extends string = string> = React.ComponentProps<"div"> & {
  value?: TValue
  items: StepperTabItem<TValue>[]
  onValueChange?: (value: TValue, item: StepperTabItem<TValue>) => void
  orientation?: "horizontal" | "vertical"
  compact?: boolean
}

function StepperTabs<TValue extends string = string>({
  value,
  items,
  onValueChange,
  orientation = "horizontal",
  compact = false,
  className,
  ...props
}: StepperTabsProps<TValue>) {
  const visibleItems = items.filter((item) => !item.hidden)

  return (
    <div data-slot="stepper-tabs" data-orientation={orientation} className={cn(orientation === "vertical" ? "grid gap-2" : "flex flex-wrap gap-2", className)} {...props}>
      {visibleItems.map((item, index) => {
        const active = item.value === value
        const completed = item.completed
        return (
          <button
            key={item.value}
            type="button"
            disabled={item.disabled}
            data-slot="stepper-tab"
            data-active={active || undefined}
            data-completed={completed || undefined}
            className={cn(
              "group flex min-w-0 items-start gap-3 rounded-xl border bg-card text-left shadow-sm transition-colors hover:border-primary/40 disabled:pointer-events-none disabled:opacity-55",
              compact ? "p-3" : "p-4",
              active && "border-primary/60 bg-primary/5"
            )}
            onClick={() => onValueChange?.(item.value, item)}
          >
            <span className={cn("flex shrink-0 items-center justify-center rounded-full border bg-background text-xs font-semibold", compact ? "size-7" : "size-8", completed && "border-primary bg-primary text-primary-foreground", active && !completed && "border-primary text-primary")}>{completed ? <CheckIcon className="size-4" /> : item.icon ?? index + 1}</span>
            <span className="min-w-0 space-y-0.5">
              <span className="block truncate text-sm font-medium text-foreground">{item.label}</span>
              {item.description && <span className="block text-xs leading-5 text-muted-foreground">{item.description}</span>}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export { StepperTabs }
