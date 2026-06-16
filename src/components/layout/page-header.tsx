import * as React from "react"

import { cn } from "@/lib/utils"

export type PageHeaderProps = React.ComponentProps<"div"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  eyebrow?: React.ReactNode
  breadcrumbs?: React.ReactNode
  actions?: React.ReactNode
  meta?: React.ReactNode
  sticky?: boolean
}

function PageHeader({
  className,
  title,
  description,
  eyebrow,
  breadcrumbs,
  actions,
  meta,
  sticky = false,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <div
      data-slot="page-header"
      data-sticky={sticky || undefined}
      className={cn(
        "flex flex-col gap-3 border-b pb-4",
        sticky && "sticky top-0 z-30 bg-background/95 pt-4 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        className
      )}
      {...props}
    >
      {breadcrumbs && <div className="text-sm text-muted-foreground">{breadcrumbs}</div>}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          {eyebrow && (
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {eyebrow}
            </div>
          )}
          {title && <h1 className="truncate text-2xl font-semibold tracking-tight">{title}</h1>}
          {description && <p className="max-w-3xl text-sm text-muted-foreground">{description}</p>}
          {meta && <div className="pt-1 text-sm text-muted-foreground">{meta}</div>}
        </div>

        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>

      {children}
    </div>
  )
}

export { PageHeader }
