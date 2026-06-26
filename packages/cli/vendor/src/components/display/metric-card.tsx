import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type MetricCardProps = Omit<React.ComponentProps<typeof Card>, "title"> & {
  title: React.ReactNode
  value: React.ReactNode
  description?: React.ReactNode
  trend?: React.ReactNode
  icon?: React.ReactNode
}

function MetricCard({ title, value, description, trend, icon, className, ...props }: MetricCardProps) {
  return (
    <Card data-slot="metric-card" className={cn("p-5", className)} {...props}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="text-3xl font-semibold tracking-[-0.04em] text-foreground">{value}</div>
        </div>
        {icon ? <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-muted text-muted-foreground [&_svg]:size-5">{icon}</div> : null}
      </div>
      {(description || trend) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {trend ? <Badge variant="secondary">{trend}</Badge> : null}
          {description ? <span className="text-sm text-muted-foreground">{description}</span> : null}
        </div>
      )}
    </Card>
  )
}

export { MetricCard }
