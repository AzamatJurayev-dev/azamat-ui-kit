import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeltaBadge } from "@/components/display/delta-badge"
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
  // Simple SVG sparkline generator
  const renderSparkline = () => {
    if (!sparkline || sparkline.length < 2) return null

    const min = Math.min(...sparkline)
    const max = Math.max(...sparkline)
    const range = max - min || 1
    
    const points = sparkline.map((val, i) => {
      const x = (i / (sparkline.length - 1)) * 100
      const y = 100 - ((val - min) / range) * 100
      return `${x},${y}`
    }).join(" ")

    const strokeColor =
      trend === "up"
        ? "var(--aui-success,var(--primary))"
        : trend === "down"
          ? "var(--destructive)"
          : "var(--muted-foreground)"

    return (
      <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full stroke-2">
          <polyline
            points={points}
            fill="none"
            stroke={strokeColor}
            vectorEffect="non-scaling-stroke"
          />
          <polygon
            points={`0,100 ${points} 100,100`}
            fill={`color-mix(in srgb, ${strokeColor} 20%, transparent)`}
          />
        </svg>
      </div>
    )
  }

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
      {renderSparkline()}
    </Card>
  )
}

export { TrendCard }
