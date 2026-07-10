import * as React from "react"
import { cn } from "@/lib/utils"

export type CommandBarProps = React.ComponentProps<"div"> & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  position?: "bottom" | "top"
  grouped?: boolean
  label?: React.ReactNode
}

function CommandBar({
  open = true,
  position = "bottom",
  grouped = false,
  label,
  children,
  className,
  ...props
}: CommandBarProps) {
  if (!open) return null

  return (
    <div
      data-slot="command-bar"
      className={cn(
        "fixed left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border bg-background/95 px-4 py-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60",
        position === "bottom" ? "bottom-6" : "top-6",
        grouped && "gap-3 rounded-[28px] px-3 py-2.5",
        className
      )}
      {...props}
    >
      {label ? <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</span> : null}
      {children}
    </div>
  )
}

export { CommandBar }
