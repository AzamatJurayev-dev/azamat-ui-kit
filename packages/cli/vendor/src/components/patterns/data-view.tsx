import * as React from "react"

import { DataTable, type DataTableProps } from "@/components/data-table/data-table"
import { EmptyState } from "@/components/patterns/empty-state"
import { PageToolbar } from "@/components/patterns/page-toolbar"
import { cn } from "@/lib/utils"

export type DataViewProps<TData, TValue = unknown> = Omit<React.ComponentProps<"div">, "children"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  toolbar?: React.ComponentProps<typeof PageToolbar>
  table?: DataTableProps<TData, TValue>
  count?: number
  loading?: boolean
  error?: React.ReactNode
  emptyTitle?: React.ReactNode
  emptyDescription?: React.ReactNode
  children?: React.ReactNode
}

function DataView<TData, TValue = unknown>({
  className,
  title,
  description,
  toolbar,
  table,
  count,
  loading = false,
  error,
  emptyTitle = "No results",
  emptyDescription = "Try adjusting filters or create a new item.",
  children,
  ...props
}: DataViewProps<TData, TValue>) {
  const hasHeader = Boolean(title || description)
  const hasToolbar = Boolean(toolbar)
  const hasData = count === undefined ? Boolean(children || table) : count > 0

  return (
    <div data-slot="data-view" className={cn("grid min-w-0 gap-4", className)} {...props}>
      {hasHeader && (
        <div data-slot="data-view-header" className="grid gap-1">
          {title && <h2 className="text-xl font-semibold tracking-tight">{title}</h2>}
          {description && <p className="text-sm leading-6 text-muted-foreground">{description}</p>}
        </div>
      )}
      {hasToolbar && <PageToolbar {...toolbar} />}
      {error ? (
        <EmptyState tone="error" title="Something went wrong" description={error} />
      ) : loading ? (
        <EmptyState tone="info" title="Loading data" description="Please wait while the latest data is prepared." />
      ) : hasData ? (
        <div data-slot="data-view-content" className="min-w-0">
          {children}
          {table && <DataTable {...table} />}
        </div>
      ) : (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      )}
    </div>
  )
}

export { DataView }
