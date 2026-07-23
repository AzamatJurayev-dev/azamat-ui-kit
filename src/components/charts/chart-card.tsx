"use client"

import * as React from "react"

import { BarChart, LineChart, DonutChart, type ChartDatum, type ChartSeries, type ChartState } from "@/components/charts/charts"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type ChartCardType = "bar" | "line" | "donut"
export type ChartCardFilter = {
  label: string
  value: string
}

export type ChartCardProps = Omit<React.ComponentProps<typeof Card>, "type"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  type?: ChartCardType
  data?: ChartDatum[]
  series?: ChartSeries[]
  labels?: React.ReactNode[]
  state?: ChartState
  metric?: React.ReactNode
  badge?: React.ReactNode
  filters?: ChartCardFilter[]
  filterValue?: string
  onFilterChange?: (value: string) => void
}

function ChartCard({
  title,
  description,
  type = "bar",
  data = [],
  series,
  labels,
  state,
  metric,
  badge,
  filters,
  filterValue,
  onFilterChange,
  className,
  ...props
}: ChartCardProps) {
  return (
    <Card data-slot="chart-card" className={cn("min-w-0", className)} {...props}>
      <CardHeader className="flex-row items-start justify-between gap-3">
        <div className="grid gap-1">
          {title ? <CardTitle>{title}</CardTitle> : null}
          {description ? <CardDescription>{description}</CardDescription> : null}
          {metric ? <div className="text-3xl font-bold tracking-tight mt-2">{metric}</div> : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {badge ?? <Badge label={type} variant="secondary" />}
          {filters?.length ? (
            <Select
              value={filterValue}
              onValueChange={(value) => value && onFilterChange?.(value)}
              options={filters}
              triggerClassName="h-9 w-36"
            />
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        {type === "line" ? (
          <LineChart series={series} labels={labels} values={data.map((item) => item.value)} state={state} />
        ) : type === "donut" ? (
          <DonutChart data={data} state={state} />
        ) : (
          <BarChart data={data} series={series} labels={labels} state={state} />
        )}
      </CardContent>
    </Card>
  )
}

export { ChartCard }
