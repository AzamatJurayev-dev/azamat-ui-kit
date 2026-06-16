import * as React from "react"

import { cn } from "@/lib/utils"

export type DataTableToolbarProps = React.ComponentProps<"div"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  search?: React.ReactNode
  filters?: React.ReactNode
  actions?: React.ReactNode
  selectionActions?: React.ReactNode
  selectedCount?: number
  totalCount?: number
  selectedLabel?: (selectedCount: number, totalCount?: number) => React.ReactNode
}

function DataTableToolbar({
  className,
  title,
  description,
  search,
  filters,
  actions,
  selectionActions,
  selectedCount = 0,
  totalCount,
  selectedLabel = (selected, total) =>
    total === undefined ? `${selected} selected` : `${selected} of ${total} selected`,
  children,
  ...props
}: DataTableToolbarProps) {
  const hasHeading = Boolean(title || description)
  const hasSelection = selectedCount > 0 && Boolean(selectionActions)

  return (
    <div
      data-slot="data-table-toolbar"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    >
      {(hasHeading || actions) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          {hasHeading && (
            <div className="grid gap-1">
              {title && <h2 className="text-base font-semibold tracking-tight">{title}</h2>}
              {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
          )}

          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}

      {(search || filters || hasSelection || children) && (
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            {search}
            {filters}
            {children}
          </div>

          {hasSelection && (
            <div className="flex shrink-0 items-center gap-2 rounded-lg border bg-muted/40 px-2 py-1.5 text-sm">
              <span className="text-muted-foreground">
                {selectedLabel(selectedCount, totalCount)}
              </span>
              {selectionActions}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { DataTableToolbar }
