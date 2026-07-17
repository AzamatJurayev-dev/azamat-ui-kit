import * as React from "react"

import { cn } from "@/lib/utils"

export type SectionProps = React.ComponentProps<"section"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  padded?: boolean
  bordered?: boolean
  variant?: "plain" | "panel"
  density?: "compact" | "default" | "comfortable"
  headerClassName?: string
  bodyClassName?: string
}

const sectionDensityClassName = {
  compact: "gap-2",
  default: "gap-4",
  comfortable: "gap-6",
}

const sectionPaddingClassName = {
  compact: "p-3",
  default: "p-4",
  comfortable: "p-6",
}

function Section({
  title,
  description,
  actions,
  padded = true,
  bordered = false,
  variant = bordered ? "panel" : "plain",
  density = "default",
  headerClassName,
  bodyClassName,
  className,
  children,
  ...props
}: SectionProps) {
  const panel = variant === "panel"
  return (
    <section
      data-slot="section"
      data-variant={variant}
      data-density={density}
      className={cn(
        "grid min-w-0",
        sectionDensityClassName[density],
        panel && "rounded-[var(--aui-card-radius,var(--radius-lg))] border border-[color:var(--aui-card-border,var(--border))] bg-card text-card-foreground shadow-[var(--aui-card-shadow,var(--aui-shadow-xs))]",
        padded && panel && sectionPaddingClassName[density],
        className
      )}
      {...props}
    >
      {(title || description || actions) && (
        <div data-slot="section-header" className={cn("flex flex-wrap items-start justify-between gap-3", headerClassName)}>
          <div className="grid gap-1">
            {title && <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      <div data-slot="section-content" className={bodyClassName}>{children}</div>
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
  asideWidth?: React.CSSProperties["width"]
}

function SplitLayout({ aside, asidePosition = "end", asideClassName, contentClassName, asideWidth = "20rem", className, children, style, ...props }: SplitLayoutProps) {
  const asideNode = <aside data-slot="split-layout-aside" className={cn("min-w-0", asideClassName)}>{aside}</aside>
  const contentNode = <main data-slot="split-layout-content" className={cn("min-w-0", contentClassName)}>{children}</main>

  return (
    <div
      data-slot="split-layout"
      className={cn(
        "grid gap-4 lg:grid-cols-[minmax(0,1fr)_var(--split-aside-width)]",
        asidePosition === "start" && "lg:grid-cols-[var(--split-aside-width)_minmax(0,1fr)]",
        className
      )}
      style={{ "--split-aside-width": asideWidth, ...style } as React.CSSProperties}
      {...props}
    >
      {asidePosition === "start" ? asideNode : contentNode}
      {asidePosition === "start" ? contentNode : asideNode}
    </div>
  )
}

export { Section, SplitLayout, Toolbar }
