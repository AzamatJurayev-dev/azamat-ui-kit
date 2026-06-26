import * as React from "react"

import { cn } from "@/lib/utils"

export type HoverCardProps = Omit<React.ComponentProps<"div">, "content"> & {
  trigger: React.ReactNode
  content: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  contentClassName?: string
}

const sideClassName = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
  bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
}

function HoverCard({
  trigger,
  content,
  side = "bottom",
  contentClassName,
  className,
  children,
  ...props
}: HoverCardProps) {
  return (
    <div data-slot="hover-card" className={cn("group/hover-card relative inline-flex", className)} {...props}>
      <span data-slot="hover-card-trigger" className="inline-flex">
        {trigger}
      </span>
      <div
        data-slot="hover-card-content"
        className={cn(
          "pointer-events-none absolute z-50 min-w-56 rounded-[var(--radius-2xl)] border border-border/80 bg-popover p-4 text-sm text-popover-foreground opacity-0 shadow-xl ring-1 ring-foreground/8 transition group-hover/hover-card:pointer-events-auto group-hover/hover-card:opacity-100 group-focus-within/hover-card:pointer-events-auto group-focus-within/hover-card:opacity-100",
          sideClassName[side],
          contentClassName
        )}
      >
        {content}
      </div>
      {children}
    </div>
  )
}

export { HoverCard }
