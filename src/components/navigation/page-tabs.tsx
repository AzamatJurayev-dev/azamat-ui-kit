import * as React from "react"

import { Badge } from "@/components/ui/badge"
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

  return (
    <div
      data-slot="page-tabs"
      data-variant={variant}
      className={cn(
        "flex min-w-0 flex-wrap gap-1.5 border-b border-border/70",
        variant === "pills" && "rounded-full border border-border/75 bg-muted/22 p-1 shadow-[0_1px_0_rgba(255,255,255,0.04)]",
        variant === "cards" && "gap-2 border-b-0",
        variant !== "underline" && "border-b-0",
        className
      )}
      {...props}
    >
      {visibleItems.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            type="button"
            disabled={item.disabled}
            data-slot="page-tab"
            data-active={active || undefined}
            className={cn(
              "inline-flex min-w-0 items-center gap-2 rounded-full px-3 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
              size === "sm" ? "h-8" : "h-10",
              variant === "underline" && "rounded-none border-b-2 border-transparent px-1 text-muted-foreground hover:text-foreground",
              variant === "underline" && active && "border-primary text-foreground",
              variant === "pills" && "text-muted-foreground hover:bg-background/72 hover:text-foreground",
              variant === "pills" && active && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
              variant === "cards" && "rounded-[var(--radius-2xl)] border border-border/75 bg-card/96 text-muted-foreground shadow-sm ring-1 ring-foreground/4 hover:border-primary/28 hover:text-foreground",
              variant === "cards" && active && "border-primary/50 bg-primary/7 text-foreground"
            )}
            onClick={() => onValueChange?.(item.value, item)}
          >
            {item.icon}
            <span className="truncate">{item.label}</span>
            {item.badge !== undefined && (
              <Badge variant={active && variant === "pills" ? "secondary" : "outline"} className="rounded-full">
                {item.badge}
              </Badge>
            )}
          </button>
        )
      })}
    </div>
  )
}

export { PageTabs }
