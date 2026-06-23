import * as React from "react"

import { InlineState } from "@/components/feedback/page-state"
import { cn } from "@/lib/utils"

export type DataViewState = "idle" | "loading" | "error" | "empty"

export type DataViewLabels = {
  loadingTitle?: React.ReactNode
  loadingDescription?: React.ReactNode
  errorTitle?: React.ReactNode
  emptyTitle?: React.ReactNode
  emptyDescription?: React.ReactNode
}

export type DataViewProps<TItem = unknown> = React.ComponentProps<"div"> & {
  data: TItem[]
  loading?: boolean
  error?: unknown
  view?: string
  labels?: DataViewLabels
  toolbar?: React.ReactNode
  filters?: React.ReactNode
  selectionBar?: React.ReactNode
  pagination?: React.ReactNode
  actions?: React.ReactNode
  empty?: React.ReactNode
  loadingState?: React.ReactNode
  errorState?: React.ReactNode
  getState?: (args: { data: TItem[]; loading: boolean; error: unknown }) => DataViewState
  renderContent?: (data: TItem[], meta: { view?: string; state: DataViewState }) => React.ReactNode
  renderItem?: (item: TItem, index: number) => React.ReactNode
  contentClassName?: string
  toolbarClassName?: string
  filtersClassName?: string
}

function DataView<TItem = unknown>({
  data,
  loading = false,
  error,
  view,
  labels,
  toolbar,
  filters,
  selectionBar,
  pagination,
  actions,
  empty,
  loadingState,
  errorState,
  getState,
  renderContent,
  renderItem,
  contentClassName,
  toolbarClassName,
  filtersClassName,
  className,
  ...props
}: DataViewProps<TItem>) {
  const state = getState?.({ data, loading, error }) ?? (loading ? "loading" : error ? "error" : data.length === 0 ? "empty" : "idle")

  return (
    <div data-slot="data-view" data-state={state} className={cn("grid gap-4", className)} {...props}>
      {(toolbar || actions) && (
        <div data-slot="data-view-toolbar" className={cn("flex flex-wrap items-center justify-between gap-3", toolbarClassName)}>
          <div className="min-w-0 flex-1">{toolbar}</div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      {filters && <div data-slot="data-view-filters" className={filtersClassName}>{filters}</div>}
      {selectionBar}
      <div data-slot="data-view-content" className={contentClassName}>
        {state === "loading" ? loadingState ?? <InlineState tone="loading" title={labels?.loadingTitle ?? "Loading"} description={labels?.loadingDescription} /> : null}
        {state === "error" ? errorState ?? <InlineState tone="error" title={labels?.errorTitle ?? "Something went wrong"} /> : null}
        {state === "empty" ? empty ?? <InlineState tone="empty" title={labels?.emptyTitle ?? "No data"} description={labels?.emptyDescription} /> : null}
        {state === "idle" ? renderContent?.(data, { view, state }) ?? <div className="grid gap-3">{data.map((item, index) => renderItem?.(item, index) ?? <pre key={index} className="rounded-lg border bg-card p-3 text-xs">{JSON.stringify(item, null, 2)}</pre>)}</div> : null}
      </div>
      {pagination && <div data-slot="data-view-pagination">{pagination}</div>}
    </div>
  )
}

export { DataView }
