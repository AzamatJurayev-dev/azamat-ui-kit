import * as React from "react"

import { cn } from "@/lib/utils"

export type TooltipProps = React.ComponentProps<"span"> & {
  content: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
  disabled?: boolean
}

const sideClassName = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
}

function Tooltip({ content, side = "top", disabled = false, className, children, ...props }: TooltipProps) {
  return (
    <span data-slot="tooltip" className={cn("group/tooltip relative inline-flex", className)} {...props}>
      {children}
      {!disabled && (
        <span
          data-slot="tooltip-content"
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 hidden max-w-64 whitespace-nowrap rounded-xl border border-border/75 bg-popover/98 px-2.5 py-1.5 text-[11px] font-medium text-popover-foreground shadow-[0_16px_42px_color-mix(in_oklch,var(--foreground),transparent_86%)] backdrop-blur group-hover/tooltip:block group-focus-within/tooltip:block",
            sideClassName[side]
          )}
        >
          {content}
        </span>
      )}
    </span>
  )
}

export { Tooltip }
