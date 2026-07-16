import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const dataTableToolbarVariants = cva("flex flex-col", {
  variants: {
    variant: {
      default: "",
      plain: "border-transparent bg-transparent shadow-none",
      soft: "rounded-[var(--aui-card-radius,var(--radius-lg))] border border-[color:var(--aui-card-border,var(--border))] bg-[color:color-mix(in_oklch,var(--card),var(--background)_16%)] shadow-[var(--aui-card-shadow,var(--aui-control-shadow,none))]",
    },
    density: {
      compact: "gap-3 p-3",
      default: "gap-4 p-4 md:p-5",
      comfortable: "gap-5 p-5 md:p-6",
    },
  },
  defaultVariants: {
    variant: "plain",
    density: "default",
  },
})

export type DataTableToolbarProps = React.ComponentProps<"div"> &
  VariantProps<typeof dataTableToolbarVariants> & {
    title?: React.ReactNode
    description?: React.ReactNode
    search?: React.ReactNode
    filters?: React.ReactNode
    summary?: React.ReactNode
    actions?: React.ReactNode
    selectionActions?: React.ReactNode
    selectedCount?: number
    totalCount?: number
    selectedLabel?: (selectedCount: number, totalCount?: number) => React.ReactNode
    titleClassName?: string
    descriptionClassName?: string
    searchClassName?: string
    filtersClassName?: string
    summaryClassName?: string
    actionsClassName?: string
  }

function DataTableToolbar({
  className,
  variant,
  density,
  title,
  description,
  search,
  filters,
  summary,
  actions,
  selectionActions,
  selectedCount = 0,
  totalCount,
  selectedLabel = (selected, total) =>
    total === undefined ? `${selected} selected` : `${selected} of ${total} selected`,
  titleClassName,
  descriptionClassName,
  searchClassName,
  filtersClassName,
  summaryClassName,
  actionsClassName,
  children,
  ...props
}: DataTableToolbarProps) {
  const hasHeading = Boolean(title || description)
  const hasSelection = selectedCount > 0 && Boolean(selectionActions)
  const hasMainControls = Boolean(search || filters || children)

  return (
    <div
      data-slot="data-table-toolbar"
      data-variant={variant ?? "plain"}
      data-density={density ?? "default"}
      className={cn(dataTableToolbarVariants({ variant, density }), className)}
      {...props}
    >
      {(hasHeading || actions) && (
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          {hasHeading && (
            <div className="grid gap-1">
              {title && <h2 className={cn("text-lg font-semibold tracking-tight text-foreground", titleClassName)}>{title}</h2>}
              {description && <p className={cn("text-sm leading-6 text-muted-foreground", descriptionClassName)}>{description}</p>}
            </div>
          )}

          {actions && <div className={cn("flex w-full min-w-0 flex-wrap items-center gap-2 sm:w-auto xl:shrink-0 xl:justify-end", actionsClassName)}>{actions}</div>}
        </div>
      )}

      {(hasMainControls || summary || hasSelection) && (
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {hasMainControls && (
              <div className="grid min-w-0 flex-1 gap-2 lg:grid-cols-[minmax(14rem,24rem)_minmax(0,1fr)] lg:items-start">
                {search ? <div className={cn("min-w-0 max-w-full", searchClassName)}>{search}</div> : null}
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  {filters ? <div className={cn("flex min-w-0 flex-1 flex-wrap items-center gap-2 [&>*]:min-w-0", filtersClassName)}>{filters}</div> : null}
                  {children}
                </div>
              </div>
            )}
            {summary ? (
              <div
                data-slot="data-table-summary"
                className={cn("flex flex-wrap items-center gap-2 text-sm text-muted-foreground", summaryClassName)}
              >
                {summary}
              </div>
            ) : null}
          </div>

          {hasSelection && (
            <div data-slot="data-table-selection-bar" className="flex w-full shrink-0 flex-wrap items-center gap-2 rounded-[var(--radius-md)] border border-[color:var(--aui-control-border-strong,var(--border))] bg-[color:var(--aui-control-surface,var(--background))] px-2.5 py-1.5 text-sm shadow-[var(--aui-control-shadow,none)] backdrop-blur sm:w-auto">
              <span className="text-muted-foreground">{selectedLabel(selectedCount, totalCount)}</span>
              {selectionActions}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { DataTableToolbar, dataTableToolbarVariants }
