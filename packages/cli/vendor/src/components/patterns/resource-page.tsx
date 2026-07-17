import * as React from "react"

import { DataTable, type DataTableProps } from "@/components/data-table/data-table"
import { PageHeader, type PageHeaderProps } from "@/components/layout/page-header"
import { Section, type SectionProps } from "@/components/layout/section"
import { cn } from "@/lib/utils"

export type ResourcePageDensity = "default" | "compact" | "comfortable"

export type ResourcePageSectionProps = Omit<SectionProps, "variant">

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
    <Section
      data-slot="resource-page-section"
      variant="panel"
      title={title}
      description={description}
      actions={actions}
      headerClassName={headerClassName}
      bodyClassName={bodyClassName}
      className={className}
      {...props}
    >
      {children}
    </Section>
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
  asideWidth?: React.CSSProperties["width"]
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
  asideWidth = "20rem",
  style,
  ...props
}: ResourcePageProps<TData, TValue>) {
  const hasHeader = Boolean(title || description || eyebrow || actions)
  const hasToolbar = Boolean(filters || tabs)
  const hasMainContent = Boolean(children || table)

  return (
    <div
      data-slot="resource-page"
      data-density={density}
      className={cn("grid min-w-0", densityClassName[density], className)}
      style={{ "--resource-aside-width": asideWidth, ...style } as React.CSSProperties}
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
          className={cn("grid min-w-0 gap-4", aside && "xl:grid-cols-[minmax(0,1fr)_var(--resource-aside-width)]", contentClassName)}
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
