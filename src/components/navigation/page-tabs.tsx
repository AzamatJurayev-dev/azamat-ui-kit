import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export type PageTabItem<TValue extends string = string> = {
  value: TValue
  label: React.ReactNode
  icon?: React.ReactNode
  badge?: React.ReactNode
  disabled?: boolean
  hidden?: boolean
}

export type PageTabsProps<TValue extends string = string> = React.ComponentProps<"div"> & {
  value?: TValue
  items: PageTabItem<TValue>[]
  onValueChange?: (value: TValue, item: PageTabItem<TValue>) => void
  variant?: "underline" | "pills" | "cards"
  size?: "sm" | "default"
}

function PageTabs<TValue extends string = string>({
  value,
  items,
  onValueChange,
  variant = "underline",
  size = "default",
  className,
  ...props
}: PageTabsProps<TValue>) {
  const visibleItems = items.filter((item) => !item.hidden)
  const handleValueChange = (nextValue: unknown) => {
    const nextItem = visibleItems.find((item) => item.value === nextValue)
    if (nextItem) {
      onValueChange?.(nextItem.value, nextItem)
    }
  }

  return (
    <Tabs
      value={value}
      onValueChange={handleValueChange}
      data-slot="page-tabs"
      data-variant={variant}
      className={cn(
        "min-w-0",
        className
      )}
      {...props}
    >
      <TabsList
        data-slot="page-tabs-list"
        variant={variant === "underline" ? "underline" : "pills"}
        overflow="scroll"
        className={cn(
          "w-full",
          variant === "cards" && "gap-2 border-0 bg-transparent p-0 shadow-none"
        )}
      >
      {visibleItems.map((item) => {
        const active = item.value === value
        return (
          <TabsTrigger
            key={item.value}
            disabled={item.disabled}
            value={item.value}
            data-slot="page-tab"
            data-active={active || undefined}
            className={cn(
              "min-w-0 px-3 disabled:pointer-events-none disabled:opacity-50",
              size === "sm" ? "h-8" : "h-10",
              variant === "underline" && "px-1",
              variant === "cards" && "rounded-[var(--radius-2xl)] border border-border/75 bg-card/96 text-muted-foreground shadow-sm ring-1 ring-foreground/4 hover:border-primary/28 hover:text-foreground",
              variant === "cards" && active && "border-primary/50 bg-primary/7 text-foreground"
            )}
          >
            {item.icon}
            <span className="truncate">{item.label}</span>
            {item.badge !== undefined && (
              <Badge variant={active && variant === "pills" ? "secondary" : "outline"} className="rounded-full">
                {item.badge}
              </Badge>
            )}
          </TabsTrigger>
        )
      })}
      </TabsList>
    </Tabs>
  )
}

export { PageTabs }
