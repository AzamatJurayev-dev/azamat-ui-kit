import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeltaBadge } from "@/components/display/delta-badge"
import { cn } from "@/lib/utils"

export type ComparisonCardItem = {
  label: React.ReactNode
  value: React.ReactNode
  change?: React.ReactNode
  trend?: "up" | "down" | "neutral"
}

export type ComparisonCardProps = React.ComponentProps<typeof Card> & {
  title?: React.ReactNode
  items: ComparisonCardItem[]
  columns?: 2 | 3 | 4
}

function ComparisonCard({
  title,
  items,
  columns = 2,
  className,
  ...props
}: ComparisonCardProps) {
  return (
    <Card data-slot="comparison-card" className={className} {...props}>
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(title ? "pt-0" : "")}>
        <div
          className={cn(
            "grid gap-4",
            columns === 2 && "grid-cols-2",
            columns === 3 && "grid-cols-3",
            columns === 4 && "grid-cols-2 sm:grid-cols-4",
            !title && "pt-6"
          )}
        >
          {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-semibold leading-none">{item.value}</span>
                {item.change && (
                  <DeltaBadge size="sm" value={item.change} trend={item.trend} />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export { ComparisonCard }
