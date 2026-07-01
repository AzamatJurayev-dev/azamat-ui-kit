import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type StatusLegendTone = "default" | "success" | "warning" | "danger" | "info" | "muted"
export type StatusLegendOrientation = "vertical" | "horizontal" | "grid"

export type StatusLegendItem = {
  key: string
  label: React.ReactNode
  description?: React.ReactNode
  count?: React.ReactNode
  tone?: StatusLegendTone
  icon?: React.ReactNode
  hidden?: boolean
  className?: string
}

export type StatusLegendProps = React.ComponentProps<typeof Card> & {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  items: StatusLegendItem[]
  orientation?: StatusLegendOrientation
  compact?: boolean
  showCounts?: boolean
  contentClassName?: string
  itemClassName?: string
}

const dotClassName: Record<StatusLegendTone, string> = {
  default: "bg-primary",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-destructive",
  info: "bg-blue-500",
  muted: "bg-muted-foreground",
}

function StatusLegend({
  title,
  description,
  actions,
  items,
  orientation = "vertical",
  compact = false,
  showCounts = true,
  contentClassName,
  itemClassName,
  className,
  ...props
}: StatusLegendProps) {
  const visibleItems = items.filter((item) => !item.hidden)
  const hasHeader = Boolean(title || description || actions)

  return (
    <Card
      data-slot="status-legend"
      className={cn(
        "min-w-0 border-[color:var(--aui-surface-border)] bg-[color:color-mix(in_srgb,var(--aui-page-bg)_92%,white_8%)] shadow-sm dark:bg-[color:color-mix(in_srgb,var(--aui-page-bg)_96%,black_4%)]",
        className
      )}
      {...props}
    >
      {hasHeader && (
        <CardHeader className={cn("pb-3", compact && "p-4 pb-2")}>
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0 space-y-1">
              {title && <CardTitle className="text-base tracking-tight">{title}</CardTitle>}
              {description && <CardDescription className="leading-6">{description}</CardDescription>}
            </div>
            {actions && <div className="shrink-0">{actions}</div>}
          </div>
        </CardHeader>
      )}

      <CardContent
        className={cn(
          "gap-3",
          orientation === "vertical" && "grid",
          orientation === "horizontal" && "flex flex-wrap",
          orientation === "grid" && "grid sm:grid-cols-2",
          compact ? "p-4 pt-2" : "pt-0",
          contentClassName
        )}
      >
        {visibleItems.map((item) => (
          <div
            key={item.key}
            data-slot="status-legend-item"
            data-tone={item.tone ?? "default"}
            className={cn(
              "flex min-w-0 items-start justify-between gap-3 rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-control-bg)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition hover:border-[color:color-mix(in_srgb,var(--aui-brand-strong)_26%,var(--aui-surface-border))]",
              compact && "p-2.5",
              itemClassName,
              item.className
            )}
          >
            <div className="flex min-w-0 items-start gap-2">
              {item.icon ? (
                <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-[color:var(--aui-page-bg)] text-muted-foreground [&_svg]:size-4">{item.icon}</span>
              ) : (
                <span className={cn("mt-1.5 size-2.5 shrink-0 rounded-full shadow-[0_0_0_4px_color-mix(in_srgb,var(--aui-page-bg)_72%,transparent)]", dotClassName[item.tone ?? "default"])} />
              )}
              <div className="min-w-0 space-y-0.5">
                <div className="truncate text-sm font-medium text-foreground">{item.label}</div>
                {item.description && <div className="text-xs leading-5 text-muted-foreground">{item.description}</div>}
              </div>
            </div>
            {showCounts && item.count !== undefined && (
              <Badge variant="secondary" className="shrink-0 rounded-full border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg)] px-2.5 py-1 shadow-sm">
                {item.count}
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export { StatusLegend }
