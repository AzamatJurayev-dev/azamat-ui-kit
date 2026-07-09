import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeltaBadge } from "@/components/display/delta-badge"
import { Sparkline } from "@/components/charts/charts"
import { cn } from "@/lib/utils"

export type TrendCardProps = React.ComponentProps<typeof Card> & {
  title: React.ReactNode
  value: React.ReactNode
  change?: React.ReactNode
  trend?: "up" | "down" | "neutral"
  description?: React.ReactNode
  icon?: React.ReactNode
  sparkline?: number[]
}

function TrendCard({
  title,
  value,
  change,
  trend,
  description,
  icon,
  sparkline,
  className,
  ...props
}: TrendCardProps) {
  return (
    <Card data-slot="trend-card" className={cn("relative overflow-hidden", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold">{value}</div>
          {change && (
            <DeltaBadge value={change} trend={trend} />
          )}
        </div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
      {sparkline && sparkline.length > 1 ? (
        <div className="px-6 pb-4">
          <Sparkline values={sparkline} positive={trend !== "down"} />
        </div>
      ) : null}
    </Card>
  )
}

export { TrendCard }
