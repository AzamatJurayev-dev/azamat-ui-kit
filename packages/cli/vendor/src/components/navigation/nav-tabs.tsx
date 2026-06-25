import * as React from "react"

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
    <div data-slot="nav-tabs" className={cn("inline-flex rounded-[var(--radius-xl)] border border-border/80 bg-muted/45 p-1", fullWidth && "w-full", className)} {...props}>
      {items.map((item) => {
        const active = item.value === value
        const content = (
          <>
            {item.icon ? <span className="[&_svg]:size-4">{item.icon}</span> : null}
            <span className="truncate">{item.label}</span>
          </>
        )

        const itemClassName = cn(
          "inline-flex items-center justify-center gap-2 rounded-[calc(var(--radius-xl)-4px)] font-medium text-muted-foreground transition hover:text-foreground disabled:pointer-events-none disabled:opacity-50",
          sizeClassName[size],
          fullWidth && "flex-1",
          active && "bg-background text-foreground shadow-sm"
        )

        return item.href ? (
          <a key={item.value} href={item.href} aria-current={active ? "page" : undefined} className={itemClassName}>
            {content}
          </a>
        ) : (
          <button key={item.value} type="button" disabled={item.disabled} className={itemClassName} onClick={() => onValueChange?.(item.value)}>
            {content}
          </button>
        )
      })}
    </div>
  )
}

export { NavTabs }
