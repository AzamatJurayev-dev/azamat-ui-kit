import * as React from "react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export type NavTabItem = {
  label: React.ReactNode
  value: string
  href?: string
  icon?: React.ReactNode
  disabled?: boolean
}

export type NavTabsProps = React.ComponentProps<"div"> & {
  items: NavTabItem[]
  value?: string
  onValueChange?: (value: string) => void
  size?: "sm" | "default" | "lg"
  fullWidth?: boolean
}

const sizeClassName = {
  sm: "h-8 px-3 text-xs",
  default: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
}

function NavTabs({ items, value, onValueChange, size = "default", fullWidth = false, className, ...props }: NavTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(nextValue) => onValueChange?.(String(nextValue))}
      data-slot="nav-tabs"
      className={cn("min-w-0", fullWidth && "w-full", className)}
      {...props}
    >
      <TabsList data-slot="nav-tabs-list" variant="pills" overflow="scroll" className={cn(fullWidth && "w-full")}>
      {items.map((item) => {
        const active = item.value === value
        const content = (
          <>
            {item.icon ? <span className="[&_svg]:size-4">{item.icon}</span> : null}
            <span className="truncate">{item.label}</span>
          </>
        )

        const itemClassName = cn(
          "min-w-0 disabled:pointer-events-none disabled:opacity-50",
          sizeClassName[size],
          fullWidth && "flex-1",
          active && "bg-background text-foreground shadow-sm"
        )

        return item.href ? (
          <TabsTrigger key={item.value} value={item.value} render={<a href={item.href} aria-current={active ? "page" : undefined} className={itemClassName} />}>
            {content}
          </TabsTrigger>
        ) : (
          <TabsTrigger key={item.value} value={item.value} disabled={item.disabled} className={itemClassName} onClick={() => onValueChange?.(item.value)}>
            {content}
          </TabsTrigger>
        )
      })}
      </TabsList>
    </Tabs>
  )
}

export { NavTabs }
