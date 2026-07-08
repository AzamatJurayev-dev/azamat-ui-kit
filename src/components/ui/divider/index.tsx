import * as React from "react"

import { cn } from "@/lib/utils"

export type DividerProps = React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
  dashed?: boolean
  label?: React.ReactNode
  labelPosition?: "start" | "center" | "end"
}

function Divider({ orientation = "horizontal", dashed = false, label, labelPosition = "center", className, ...props }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        data-slot="divider"
        role="separator"
        aria-orientation="vertical"
        className={cn("mx-2 h-auto self-stretch border-l", dashed && "border-dashed", className)}
        {...props}
      />
    )
  }

  if (!label) {
    return (
      <div
        data-slot="divider"
        role="separator"
        aria-orientation="horizontal"
        className={cn("my-4 border-t", dashed && "border-dashed", className)}
        {...props}
      />
    )
  }

  return (
    <div data-slot="divider" role="separator" aria-orientation="horizontal" className={cn("my-4 flex items-center gap-3 text-xs text-muted-foreground", className)} {...props}>
      <div className={cn("border-t", dashed && "border-dashed", labelPosition !== "start" && "flex-1", labelPosition === "start" && "w-8")} />
      <span className="shrink-0">{label}</span>
      <div className={cn("border-t", dashed && "border-dashed", labelPosition !== "end" && "flex-1", labelPosition === "end" && "w-8")} />
    </div>
  )
}

export { Divider }
