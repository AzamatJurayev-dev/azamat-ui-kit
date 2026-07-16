import * as React from "react"

import { cn } from "@/lib/utils"

export type PageToolbarProps = React.ComponentProps<"div"> & {
  search?: React.ReactNode
  filters?: React.ReactNode
  viewOptions?: React.ReactNode
  actions?: React.ReactNode
  summary?: React.ReactNode
  sticky?: boolean
}

function PageToolbar({
  className,
  search,
  filters,
  viewOptions,
  actions,
  summary,
  sticky = false,
  children,
  ...props
}: PageToolbarProps) {
  const hasPrimary = Boolean(search || filters || children)
  const hasSecondary = Boolean(summary || viewOptions || actions)

  if (!hasPrimary && !hasSecondary) return null

  return (
    <div
      data-slot="page-toolbar"
      data-sticky={sticky || undefined}
      className={cn(
        "flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-sm",
        sticky && "sticky top-0 z-10",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {hasPrimary && (
          <div data-slot="page-toolbar-primary" className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            {search && <div className="min-w-0 flex-1">{search}</div>}
            {filters}
            {children}
          </div>
        )}
        {hasSecondary && (
          <div data-slot="page-toolbar-secondary" className="flex shrink-0 flex-wrap items-center gap-2">
            {summary && <div className="text-sm text-muted-foreground">{summary}</div>}
            {viewOptions}
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

export { PageToolbar }
