import * as React from "react"

import { cn } from "@/lib/utils"

export type StickyFooterBarProps = React.ComponentProps<"div"> & {
  start?: React.ReactNode
  end?: React.ReactNode
}

function StickyFooterBar({ start, end, className, children, ...props }: StickyFooterBarProps) {
  return (
    <div
      data-slot="sticky-footer-bar"
      className={cn("sticky bottom-0 z-30 flex flex-wrap items-center justify-between gap-3 border-t bg-background px-4 py-3 shadow-lg", className)}
      {...props}
    >
      <div className="min-w-0 flex-1">{start ?? children}</div>
      {end && <div className="flex shrink-0 items-center gap-2">{end}</div>}
    </div>
  )
}

export { StickyFooterBar }
