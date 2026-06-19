import * as React from "react"

import { cn } from "@/lib/utils"

export type AnchorNavItem = {
  key: string
  label: React.ReactNode
  href: string
  active?: boolean
  disabled?: boolean
}

export type AnchorNavProps = React.ComponentProps<"nav"> & {
  items: AnchorNavItem[]
  orientation?: "vertical" | "horizontal"
  title?: React.ReactNode
}

function AnchorNav({ items, orientation = "vertical", title, className, ...props }: AnchorNavProps) {
  return (
    <nav data-slot="anchor-nav" className={cn("grid gap-2 text-sm", orientation === "horizontal" && "flex flex-wrap", className)} {...props}>
      {title && <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</div>}
      <div className={cn("grid gap-1", orientation === "horizontal" && "flex flex-wrap")}> 
        {items.map((item) => (
          <a
            key={item.key}
            href={item.disabled ? undefined : item.href}
            aria-current={item.active ? "location" : undefined}
            aria-disabled={item.disabled || undefined}
            className={cn(
              "rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              item.active && "bg-muted text-foreground",
              item.disabled && "pointer-events-none opacity-50"
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export { AnchorNav }
