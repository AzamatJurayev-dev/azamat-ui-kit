import * as React from "react"

import { cn } from "@/lib/utils"

export type SectionProps = React.ComponentProps<"section"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  padded?: boolean
  bordered?: boolean
}

function Section({ title, description, actions, padded = true, bordered = false, className, children, ...props }: SectionProps) {
  return (
    <section data-slot="section" className={cn("grid gap-4", bordered && "rounded-lg border bg-card", padded && bordered && "p-4", className)} {...props}>
      {(title || description || actions) && (
        <div data-slot="section-header" className="flex flex-wrap items-start justify-between gap-3">
          <div className="grid gap-1">
            {title && <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      <div data-slot="section-content">{children}</div>
    </section>
  )
}

export type ToolbarProps = React.ComponentProps<"div"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  filters?: React.ReactNode
  actions?: React.ReactNode
}

function Toolbar({ title, description, filters, actions, className, children, ...props }: ToolbarProps) {
  return (
    <div data-slot="toolbar" className={cn("flex flex-wrap items-center justify-between gap-3", className)} {...props}>
      {(title || description) && (
        <div className="grid gap-0.5">
          {title && <div className="font-medium text-foreground">{title}</div>}
          {description && <div className="text-sm text-muted-foreground">{description}</div>}
        </div>
      )}
      {children}
      {(filters || actions) && (
        <div className="flex flex-wrap items-center gap-2">
          {filters}
          {actions}
        </div>
      )}
    </div>
  )
}

export type SplitLayoutProps = React.ComponentProps<"div"> & {
  aside: React.ReactNode
  asidePosition?: "start" | "end"
  asideClassName?: string
  contentClassName?: string
}

function SplitLayout({ aside, asidePosition = "end", asideClassName, contentClassName, className, children, ...props }: SplitLayoutProps) {
  const asideNode = <aside data-slot="split-layout-aside" className={cn("min-w-0", asideClassName)}>{aside}</aside>
  const contentNode = <main data-slot="split-layout-content" className={cn("min-w-0", contentClassName)}>{children}</main>

  return (
    <div data-slot="split-layout" className={cn("grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]", asidePosition === "start" && "lg:grid-cols-[320px_minmax(0,1fr)]", className)} {...props}>
      {asidePosition === "start" ? asideNode : contentNode}
      {asidePosition === "start" ? contentNode : asideNode}
    </div>
  )
}

export { Section, SplitLayout, Toolbar }
