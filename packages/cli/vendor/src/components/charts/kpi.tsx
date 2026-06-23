import * as React from "react"

import { Sparkline } from "@/components/charts/charts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type KpiTone = "neutral" | "success" | "warning" | "danger"

export type KpiCardProps = React.ComponentProps<typeof Card> & {
  label: React.ReactNode
  value: React.ReactNode
  description?: React.ReactNode
  change?: React.ReactNode
  tone?: KpiTone
  values?: number[]
  icon?: React.ReactNode
}

const toneClassName: Record<KpiTone, string> = {
  neutral: "bg-muted text-muted-foreground",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  danger: "bg-destructive/10 text-destructive",
}

function KpiCard({ label, value, description, change, tone = "neutral", values, icon, className, ...props }: KpiCardProps) {
  return (
    <Card data-slot="kpi-card" className={cn("overflow-hidden", className)} {...props}>
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-end justify-between gap-3">
          <div className="grid gap-1">
            <div className="text-2xl font-semibold tracking-tight text-foreground">{value}</div>
            {description && <div className="text-xs text-muted-foreground">{description}</div>}
          </div>
          {change && <div className={cn("rounded-full px-2 py-1 text-xs font-medium", toneClassName[tone])}>{change}</div>}
        </div>
        {values && <Sparkline values={values} positive={tone !== "danger"} />}
      </CardContent>
    </Card>
  )
}

export type KpiGridProps = React.ComponentProps<"div"> & {
  columns?: 1 | 2 | 3 | 4
}

function KpiGrid({ columns = 4, className, ...props }: KpiGridProps) {
  return (
    <div
      data-slot="kpi-grid"
      className={cn(
        "grid gap-4",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
        columns === 4 && "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
        className
      )}
      {...props}
    />
  )
}

export { KpiCard, KpiGrid }
