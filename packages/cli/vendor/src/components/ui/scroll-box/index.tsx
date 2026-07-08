import * as React from "react"

import { cn } from "@/lib/utils"

export type ScrollBoxProps = React.ComponentProps<"div"> & {
  maxHeight?: string | number
  axis?: "y" | "x" | "both"
}

function ScrollBox({ className, maxHeight, axis = "y", style, ...props }: ScrollBoxProps) {
  return (
    <div
      data-slot="scroll-box"
      className={cn(
        "min-h-0 overscroll-contain",
        axis === "y" && "overflow-y-auto overflow-x-hidden",
        axis === "x" && "overflow-x-auto overflow-y-hidden",
        axis === "both" && "overflow-auto",
        className
      )}
      style={{ maxHeight, ...style }}
      {...props}
    />
  )
}

export { ScrollBox }
