import * as React from "react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type StatCardTrend = {
  value: React.ReactNode
  tone?: "success" | "warning" | "danger" | "muted" | "default"
}

export type StatCardProps = React.ComponentProps<typeof Card> & {
  title?: React.ReactNode
  value?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  action?: React.ReactNode
  trend?: StatCardTrend
  footer?: React.ReactNode
  contentClassName?: string
}

const trendClassName: Record<NonNullable<StatCardTrend["tone"]>, string> = {
  default: "text-foreground",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  danger: "text-destructive",
  muted: "text-muted-foreground",
}

function StatCard({
  className,
  title,
  value,
  description,
  icon,
  action,
  trend,
  footer,
  contentClassName,
  ...props
}: StatCardProps) {
  return (
    <Card data-slot="stat-card" className={cn("min-w-0", className)} {...props}>
      <CardHeader>
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            {title && <CardDescription className="truncate">{title}</CardDescription>}
            {value && <CardTitle className="truncate text-2xl">{value}</CardTitle>}
          </div>
          {(icon || action) && (
            <CardAction>
              {action ?? (
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {icon}
                </div>
              )}
            </CardAction>
          )}
        </div>
      </CardHeader>

      {(description || trend || footer) && (
        <CardContent className={cn("space-y-2", contentClassName)}>
          {(description || trend) && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {trend && (
                <span className={cn("font-medium", trendClassName[trend.tone ?? "default"])}>
                  {trend.value}
                </span>
              )}
              {description && <span className="text-muted-foreground">{description}</span>}
            </div>
          )}
          {footer}
        </CardContent>
      )}
    </Card>
  )
}

export { StatCard }
