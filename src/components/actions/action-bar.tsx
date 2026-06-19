import * as React from "react"

import { cn } from "@/lib/utils"

export type ActionBarProps = React.ComponentProps<"div"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  start?: React.ReactNode
  end?: React.ReactNode
  sticky?: boolean
}

function ActionBar({ title, description, start, end, sticky = false, className, children, ...props }: ActionBarProps) {
  return (
    <div
      data-slot="action-bar"
      className={cn("flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-3", sticky && "sticky bottom-4 z-20 shadow-lg", className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {start}
        {(title || description) && (
          <div className="grid min-w-0 gap-0.5">
            {title && <div className="truncate text-sm font-medium text-foreground">{title}</div>}
            {description && <div className="truncate text-xs text-muted-foreground">{description}</div>}
          </div>
        )}
        {children}
      </div>
      {end && <div className="flex shrink-0 items-center gap-2">{end}</div>}
    </div>
  )
}

export { ActionBar }
