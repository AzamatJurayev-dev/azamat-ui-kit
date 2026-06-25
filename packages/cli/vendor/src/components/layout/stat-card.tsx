import * as React from "react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type StatCardTrend = {
  value: React.ReactNode
  tone?: "success" | "warning" | "danger" | "info" | "muted" | "default"
  label?: React.ReactNode
}

export type StatCardProps = React.ComponentProps<typeof Card> & {
  title?: React.ReactNode
  value?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  action?: React.ReactNode
  trend?: StatCardTrend
  footer?: React.ReactNode
  helperText?: React.ReactNode
  loading?: boolean
  valuePrefix?: React.ReactNode
  valueSuffix?: React.ReactNode
  contentClassName?: string
  iconClassName?: string
  valueClassName?: string
}

const trendClassName: Record<NonNullable<StatCardTrend["tone"]>, string> = {
  default: "text-foreground",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  danger: "text-destructive",
  info: "text-blue-600 dark:text-blue-400",
  muted: "text-muted-foreground",
}

function StatSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-4 w-28 animate-pulse rounded-md bg-muted" />
      <div className="h-8 w-36 animate-pulse rounded-md bg-muted" />
      <div className="h-4 w-44 animate-pulse rounded-md bg-muted" />
    </div>
  )
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
  helperText,
  loading = false,
  valuePrefix,
  valueSuffix,
  contentClassName,
  iconClassName,
  valueClassName,
  ...props
}: StatCardProps) {
  return (
    <Card data-slot="stat-card" className={cn("min-w-0", className)} {...props}>
      {loading ? (
        <CardContent>
          <StatSkeleton />
        </CardContent>
      ) : (
        <>
          <CardHeader>
            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                {title && <CardDescription className="truncate">{title}</CardDescription>}
                {value !== undefined && value !== null ? (
                  <CardTitle className={cn("flex items-baseline gap-1 truncate text-2xl", valueClassName)}>
                    {valuePrefix ? <span className="text-base text-muted-foreground">{valuePrefix}</span> : null}
                    <span className="truncate">{value}</span>
                    {valueSuffix ? <span className="text-base text-muted-foreground">{valueSuffix}</span> : null}
                  </CardTitle>
                ) : null}
              </div>
              {(icon || action) && (
                <CardAction>
                  {action ?? <div className={cn("flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground", iconClassName)}>{icon}</div>}
                </CardAction>
              )}
            </div>
          </CardHeader>

          {(description || trend || helperText || footer) && (
            <CardContent className={cn("space-y-2", contentClassName)}>
              {(description || trend) && (
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  {trend && (
                    <Badge variant="ghost" tone={trend.tone === "muted" || trend.tone === "default" ? "neutral" : trend.tone} size="sm" className={cn("font-medium", trendClassName[trend.tone ?? "default"])}>
                      {trend.value}
                    </Badge>
                  )}
                  {trend?.label ? <span className="text-muted-foreground">{trend.label}</span> : null}
                  {description && <span className="text-muted-foreground">{description}</span>}
                </div>
              )}
              {helperText ? <p className="text-xs leading-5 text-muted-foreground">{helperText}</p> : null}
              {footer}
            </CardContent>
          )}
        </>
      )}
    </Card>
  )
}

export { StatCard }
