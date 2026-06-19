import * as React from "react"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type StatisticTrend = "up" | "down" | "neutral"

export type StatisticProps = React.ComponentProps<"div"> & {
  label: React.ReactNode
  value: React.ReactNode
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  description?: React.ReactNode
  trend?: StatisticTrend
  change?: React.ReactNode
  loading?: boolean
}

function Statistic({ label, value, prefix, suffix, description, trend = "neutral", change, loading = false, className, ...props }: StatisticProps) {
  const trendIcon = trend === "up" ? <ArrowUpIcon className="size-3" /> : trend === "down" ? <ArrowDownIcon className="size-3" /> : null

  return (
    <div data-slot="statistic" className={cn("grid gap-1", className)} {...props}>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="flex flex-wrap items-baseline gap-1.5">
        {loading ? (
          <div className="h-8 w-28 animate-pulse rounded-md bg-muted" />
        ) : (
          <>
            {prefix && <span className="text-base text-muted-foreground">{prefix}</span>}
            <span className="text-2xl font-semibold tracking-tight">{value}</span>
            {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
          </>
        )}
      </div>
      {(description || change) && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {change && (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-medium",
                trend === "up" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                trend === "down" && "bg-destructive/10 text-destructive",
                trend === "neutral" && "bg-muted text-muted-foreground"
              )}
            >
              {trendIcon}
              {change}
            </span>
          )}
          {description && <span>{description}</span>}
        </div>
      )}
    </div>
  )
}

export type StatisticCardProps = React.ComponentProps<typeof Card> & StatisticProps & {
  action?: React.ReactNode
}

function StatisticCard({ action, label, value, prefix, suffix, description, trend, change, loading, className, ...props }: StatisticCardProps) {
  return (
    <Card data-slot="statistic-card" className={className} {...props}>
      <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        {action}
      </CardHeader>
      <CardContent>
        <Statistic
          label={<span className="sr-only">{label}</span>}
          value={value}
          prefix={prefix}
          suffix={suffix}
          description={description}
          trend={trend}
          change={change}
          loading={loading}
        />
      </CardContent>
    </Card>
  )
}

export type StatisticGridProps = React.ComponentProps<"div"> & {
  columns?: 1 | 2 | 3 | 4
}

function StatisticGrid({ columns = 4, className, ...props }: StatisticGridProps) {
  return (
    <div
      data-slot="statistic-grid"
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

export { Statistic, StatisticCard, StatisticGrid }
