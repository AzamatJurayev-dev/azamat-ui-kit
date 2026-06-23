import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type MetricTone = "default" | "success" | "warning" | "danger" | "info" | "muted"
export type MetricGridColumn = 1 | 2 | 3 | 4

export type MetricItem = {
  key: string
  label: React.ReactNode
  value: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  trend?: React.ReactNode
  tone?: MetricTone
  hidden?: boolean
  className?: string
}

export type MetricGridProps = React.ComponentProps<"div"> & {
  items: MetricItem[]
  columns?: MetricGridColumn
  compact?: boolean
  itemClassName?: string
}

const columnsClassName: Record<MetricGridColumn, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
}

const toneClassName: Record<MetricTone, string> = {
  default: "",
  success: "border-emerald-500/20 bg-emerald-500/5",
  warning: "border-amber-500/20 bg-amber-500/5",
  danger: "border-destructive/20 bg-destructive/5",
  info: "border-blue-500/20 bg-blue-500/5",
  muted: "bg-muted/40",
}

function MetricGrid({
  className,
  items,
  columns = 4,
  compact = false,
  itemClassName,
  ...props
}: MetricGridProps) {
  const visibleItems = items.filter((item) => !item.hidden)

  return (
    <div
      data-slot="metric-grid"
      className={cn("grid gap-3", columnsClassName[columns], className)}
      {...props}
    >
      {visibleItems.map((item) => (
        <Card
          key={item.key}
          data-slot="metric-card"
          data-tone={item.tone ?? "default"}
          className={cn("min-w-0 overflow-hidden", toneClassName[item.tone ?? "default"], itemClassName, item.className)}
        >
          <CardHeader className={cn("flex flex-row items-start justify-between gap-3 space-y-0", compact ? "p-3 pb-1" : "pb-2")}>
            <div className="min-w-0 space-y-1">
              <CardDescription className="truncate">{item.label}</CardDescription>
              <CardTitle className={cn("truncate", compact ? "text-xl" : "text-2xl")}>{item.value}</CardTitle>
            </div>
            {item.icon && <div className="shrink-0 rounded-lg bg-muted p-2 text-muted-foreground [&_svg]:size-4">{item.icon}</div>}
          </CardHeader>
          {(item.description || item.trend) && (
            <CardContent className={cn("flex min-w-0 items-center justify-between gap-2", compact ? "p-3 pt-1" : "pt-0")}>
              {item.description && <div className="min-w-0 truncate text-xs text-muted-foreground">{item.description}</div>}
              {item.trend && <div className="shrink-0 text-xs font-medium">{item.trend}</div>}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

export { MetricGrid }
