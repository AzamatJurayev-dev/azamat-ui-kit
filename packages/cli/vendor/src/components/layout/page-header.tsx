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
        "flex flex-col gap-4 border-b border-border/70 pb-5",
        sticky && "sticky top-0 z-30 bg-background/92 pt-4 backdrop-blur supports-[backdrop-filter]:bg-background/78",
        className
      )}
      {...props}
    >
      {breadcrumbs && <div className="text-sm text-muted-foreground/95">{breadcrumbs}</div>}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          {eyebrow && (
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {eyebrow}
            </div>
          )}
          {title && <h1 className="truncate text-3xl font-semibold tracking-[-0.03em] text-foreground">{title}</h1>}
          {description && <p className="max-w-3xl text-sm leading-7 text-muted-foreground">{description}</p>}
          {meta && <div className="pt-1 text-sm text-muted-foreground">{meta}</div>}
        </div>

        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2.5">{actions}</div>}
      </div>

      {children}
    </div>
  )
}

export { PageHeader }
