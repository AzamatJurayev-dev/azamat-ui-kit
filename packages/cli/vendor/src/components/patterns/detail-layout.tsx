import * as React from "react"

import { cn } from "@/lib/utils"

export type DetailLayoutProps = React.ComponentProps<"div"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  eyebrow?: React.ReactNode
  actions?: React.ReactNode
  breadcrumbs?: React.ReactNode
  summary?: React.ReactNode
  aside?: React.ReactNode
  footer?: React.ReactNode
  headerClassName?: string
  contentClassName?: string
  asideClassName?: string
}

function DetailLayout({
  className,
  title,
  description,
  eyebrow,
  actions,
  breadcrumbs,
  summary,
  aside,
  footer,
  headerClassName,
  contentClassName,
  asideClassName,
  children,
  ...props
}: DetailLayoutProps) {
  const hasHeader = Boolean(title || description || eyebrow || actions)
  const hasContent = Boolean(children || aside)

  return (
    <div data-slot="detail-layout" className={cn("grid min-w-0 gap-4", className)} {...props}>
      {breadcrumbs && <div data-slot="detail-layout-breadcrumbs">{breadcrumbs}</div>}
      {hasHeader && (
        <div
          data-slot="detail-layout-header"
          className={cn("flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", headerClassName)}
        >
          <div className="grid min-w-0 gap-1">
            {eyebrow && <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{eyebrow}</div>}
            {title && <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>}
            {description && <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
        </div>
      )}
      {summary && <div data-slot="detail-layout-summary">{summary}</div>}
      {hasContent && (
        <div
          data-slot="detail-layout-content"
          className={cn("grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]", contentClassName)}
        >
          <main data-slot="detail-layout-main" className="min-w-0">
            {children}
          </main>
          {aside && (
            <aside data-slot="detail-layout-aside" className={cn("min-w-0", asideClassName)}>
              {aside}
            </aside>
          )}
        </div>
      )}
      {footer && <div data-slot="detail-layout-footer">{footer}</div>}
    </div>
  )
}

export { DetailLayout }
