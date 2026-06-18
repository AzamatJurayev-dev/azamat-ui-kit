import * as React from "react"

import { DataTable, type DataTableProps } from "@/components/data-table/data-table"
import { PageHeader, type PageHeaderProps } from "@/components/layout/page-header"
import { cn } from "@/lib/utils"

export type ResourcePageDensity = "default" | "compact" | "comfortable"

export type ResourcePageSectionProps = React.ComponentProps<"section"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  headerClassName?: string
  bodyClassName?: string
}

function ResourcePageSection({
  className,
  title,
  description,
  actions,
  headerClassName,
  bodyClassName,
  children,
  ...props
}: ResourcePageSectionProps) {
  return (
    <section
      data-slot="resource-page-section"
      className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    >
      {(title || description || actions) && (
        <div
          data-slot="resource-page-section-header"
          className={cn("flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-start sm:justify-between", headerClassName)}
        >
          <div className="min-w-0 space-y-1">
            {title && <h2 className="text-base font-semibold leading-none tracking-tight">{title}</h2>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
        </div>
      )}

      <div data-slot="resource-page-section-body" className={cn("p-4", bodyClassName)}>
        {children}
      </div>
    </section>
  )
}

export type ResourcePageProps<TData, TValue = unknown> = Omit<React.ComponentProps<"div">, "children"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  eyebrow?: React.ReactNode
  actions?: React.ReactNode
  breadcrumbs?: React.ReactNode
  stats?: React.ReactNode
  filters?: React.ReactNode
  tabs?: React.ReactNode
  table?: DataTableProps<TData, TValue>
  children?: React.ReactNode
  aside?: React.ReactNode
  footer?: React.ReactNode
  headerProps?: Omit<PageHeaderProps, "title" | "description" | "actions" | "eyebrow">
  density?: ResourcePageDensity
  pageHeaderClassName?: string
  toolbarClassName?: string
  contentClassName?: string
  asideClassName?: string
}

const densityClassName: Record<ResourcePageDensity, string> = {
  compact: "gap-3",
  default: "gap-4",
  comfortable: "gap-6",
}

function ResourcePage<TData, TValue = unknown>({
  className,
  title,
  description,
  eyebrow,
  actions,
  breadcrumbs,
  stats,
  filters,
  tabs,
  table,
  children,
  aside,
  footer,
  headerProps,
  density = "default",
  pageHeaderClassName,
  toolbarClassName,
  contentClassName,
  asideClassName,
  ...props
}: ResourcePageProps<TData, TValue>) {
  const hasHeader = Boolean(title || description || eyebrow || actions)
  const hasToolbar = Boolean(breadcrumbs || filters || tabs)
  const hasMainContent = Boolean(children || table)

  return (
    <div
      data-slot="resource-page"
      data-density={density}
      className={cn("grid min-w-0", densityClassName[density], className)}
      {...props}
    >
      {breadcrumbs && <div data-slot="resource-page-breadcrumbs">{breadcrumbs}</div>}

      {hasHeader && (
        <PageHeader
          data-slot="resource-page-header"
          eyebrow={eyebrow}
          title={title}
          description={description}
          actions={actions}
          className={pageHeaderClassName}
          {...headerProps}
        />
      )}

      {stats && <div data-slot="resource-page-stats">{stats}</div>}

      {hasToolbar && (
        <div data-slot="resource-page-toolbar" className={cn("grid gap-3", toolbarClassName)}>
          {tabs && <div data-slot="resource-page-tabs">{tabs}</div>}
          {filters && <div data-slot="resource-page-filters">{filters}</div>}
        </div>
      )}

      {(hasMainContent || aside) && (
        <div
          data-slot="resource-page-content"
          className={cn("grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]", contentClassName)}
        >
          <div data-slot="resource-page-main" className="grid min-w-0 gap-4">
            {children}
            {table && <DataTable {...table} />}
          </div>

          {aside && (
            <aside data-slot="resource-page-aside" className={cn("min-w-0", asideClassName)}>
              {aside}
            </aside>
          )}
        </div>
      )}

      {footer && <div data-slot="resource-page-footer">{footer}</div>}
    </div>
  )
}

export { ResourcePage, ResourcePageSection }
