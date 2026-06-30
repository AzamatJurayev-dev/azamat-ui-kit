import * as React from "react"
import { cn } from "@/lib/utils"

export type CommandBarProps = React.ComponentProps<"div"> & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  position?: "bottom" | "top"
}

function CommandBar({
  open = true,
  position = "bottom",
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
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { CommandBar }
