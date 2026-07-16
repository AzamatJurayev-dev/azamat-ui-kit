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
    <div data-slot="statistic" data-loading={loading || undefined} data-trend={trend} aria-busy={loading || undefined} className={cn("grid gap-1", className)} {...props}>
      <div data-slot="statistic-label" className="text-sm text-muted-foreground">{label}</div>
      <div data-slot="statistic-value-row" className="flex flex-wrap items-baseline gap-1.5">
        {loading ? (
          <div data-slot="statistic-skeleton" className="h-8 w-28 animate-pulse rounded-md bg-muted" />
        ) : (
          <>
            {prefix && <span data-slot="statistic-prefix" className="text-base text-muted-foreground">{prefix}</span>}
            <span data-slot="statistic-value" className="text-2xl font-semibold tracking-tight">{value}</span>
            {suffix && <span data-slot="statistic-suffix" className="text-sm text-muted-foreground">{suffix}</span>}
          </>
        )}
      </div>
      {(description || change) && (
        <div data-slot="statistic-meta" className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {change && (
            <span
              data-slot="statistic-change"
              data-trend={trend}
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
          {description && <span data-slot="statistic-description">{description}</span>}
        </div>
      )}
    </div>
  )
}

export type StatisticCardProps = React.ComponentProps<typeof Card> & StatisticProps & {
  action?: React.ReactNode
  density?: "compact" | "default"
}

function StatisticCard({ action, density = "default", label, value, prefix, suffix, description, trend, change, loading, className, ...props }: StatisticCardProps) {
  return (
    <Card data-slot="statistic-card" data-density={density} className={className} {...props}>
      <CardHeader data-slot="statistic-card-header" className={cn("flex flex-row items-center justify-between gap-3 pb-2", density === "compact" && "px-4 pt-4 pb-1")}>
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        {action ? <div data-slot="statistic-card-action">{action}</div> : null}
      </CardHeader>
      <CardContent className={cn(density === "compact" && "px-4 pb-4")}>
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
  gap?: "sm" | "default" | "lg"
}

function StatisticGrid({ columns = 4, gap = "default", className, ...props }: StatisticGridProps) {
  return (
    <div
      data-slot="statistic-grid"
      className={cn(
        "grid",
        gap === "sm" && "gap-3",
        gap === "default" && "gap-4",
        gap === "lg" && "gap-6",
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
