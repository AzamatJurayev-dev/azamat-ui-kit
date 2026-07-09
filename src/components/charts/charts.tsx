import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type ChartDatum = {
  label: React.ReactNode
  value: number
  description?: React.ReactNode
  color?: string
}

export type ChartSeries = {
  key: string
  label: React.ReactNode
  data: number[]
  color?: string
}

export type ChartAxisLabel = string | number | React.ReactNode

export type ChartSize = "sm" | "md" | "lg"
export type ChartState = "ready" | "loading" | "empty"

const chartHeightBySize: Record<ChartSize, number> = {
  sm: 120,
  md: 180,
  lg: 260,
}

function safeMax(values: number[], fallback = 1) {
  return Math.max(...values, fallback)
}

function normalizeValue(value: number, max: number) {
  if (!Number.isFinite(value) || max <= 0) return 0
  return Math.max(0, Math.min(value / max, 1))
}

function getChartColor(index: number, custom?: string) {
  return custom ?? `var(--color-chart-${(index % 5) + 1}, var(--primary))`
}

function polarToCartesian(cx: number, cy: number, radius: number, angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  }
}

function describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, radius, endAngle)
  const end = polarToCartesian(cx, cy, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

  return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ")
}

function buildLinePath(values: number[], width: number, height: number, padding = 12) {
  const max = safeMax(values)
  const usableWidth = Math.max(width - padding * 2, 1)
  const usableHeight = Math.max(height - padding * 2, 1)

  if (values.length === 0) return ""

  return values
    .map((value, index) => {
      const x = padding + (values.length === 1 ? usableWidth / 2 : (index / (values.length - 1)) * usableWidth)
      const y = padding + (1 - normalizeValue(value, max)) * usableHeight
      return `${index === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")
}

function buildAreaPath(values: number[], width: number, height: number, padding = 12) {
  const line = buildLinePath(values, width, height, padding)
  if (!line) return ""

  const baseline = height - padding
  const lastX = values.length === 1 ? width / 2 : width - padding
  const firstX = values.length === 1 ? width / 2 : padding

  return `${line} L ${lastX} ${baseline} L ${firstX} ${baseline} Z`
}

export type ChartFrameProps = React.ComponentProps<typeof Card> & {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  state?: ChartState
  emptyLabel?: React.ReactNode
}

function ChartFrame({ title, description, action, state = "ready", emptyLabel = "No data available.", className, children, ...props }: ChartFrameProps) {
  return (
    <Card
      data-slot="chart-frame"
      className={cn("border-border/75 bg-card/96 shadow-sm ring-1 ring-foreground/4", className)}
      {...props}
    >
      {(title || description || action) && (
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <div className="grid gap-1">
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {action}
        </CardHeader>
      )}
      <CardContent>
        {state === "loading" ? <div className="grid gap-3"><div className="h-4 w-24 animate-pulse rounded bg-muted" /><div className="h-36 animate-pulse rounded-[min(var(--radius-xl),16px)] bg-muted/70" /></div> : null}
        {state === "empty" ? <div className="rounded-[min(var(--radius-xl),16px)] border border-dashed border-border/70 px-4 py-10 text-center text-sm text-muted-foreground">{emptyLabel}</div> : null}
        {state === "ready" ? children : null}
      </CardContent>
    </Card>
  )
}

export type BarChartProps = React.ComponentProps<"div"> & {
  data: ChartDatum[]
  size?: ChartSize
  max?: number
  showLabels?: boolean
  showValues?: boolean
  barClassName?: string
  state?: ChartState
  emptyLabel?: React.ReactNode
}

function BarChart({ data, size = "md", max, showLabels = true, showValues = true, state = "ready", emptyLabel = "No chart data.", className, barClassName, ...props }: BarChartProps) {
  const values = data.map((item) => item.value)
  const absoluteMax = max ?? safeMax(values.map((value) => Math.abs(value)))
  const height = chartHeightBySize[size]

  if (state === "loading") {
    return <div data-slot="bar-chart" className={cn("grid gap-3", className)} {...props}><div className="h-40 animate-pulse rounded-[min(var(--radius-xl),16px)] bg-muted/70" /></div>
  }

  if (state === "empty" || data.length === 0) {
    return <div data-slot="bar-chart" className={cn("rounded-[min(var(--radius-xl),16px)] border border-dashed border-border/70 px-4 py-10 text-center text-sm text-muted-foreground", className)} {...props}>{emptyLabel}</div>
  }

  return (
    <div data-slot="bar-chart" className={cn("grid gap-3", className)} {...props}>
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((item, index) => {
          const ratio = normalizeValue(Math.abs(item.value), absoluteMax)
          const negative = item.value < 0
          return (
            <div key={index} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              {showValues && <div className="text-xs text-muted-foreground">{item.value}</div>}
              <div className="flex w-full flex-1 items-end rounded-[min(var(--radius-xl),16px)] border border-border/60 bg-muted/38 p-1">
                <div
                  className={cn("w-full rounded-[min(var(--radius-lg),12px)] bg-primary transition-all", barClassName)}
                  style={{ height: `${Math.max(ratio * 100, Math.abs(item.value) > 0 ? 3 : 0)}%`, background: getChartColor(index, item.color), opacity: negative ? 0.72 : 1 }}
                />
              </div>
              {showLabels && <div className="max-w-full truncate text-xs text-muted-foreground">{item.label}</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export type LineChartProps = Omit<React.ComponentProps<"svg">, "values"> & {
  values: number[]
  size?: ChartSize
  width?: number
  showArea?: boolean
  stroke?: string
  state?: ChartState
  emptyLabel?: React.ReactNode
}

function LineChart({ values, size = "md", width = 560, showArea = false, stroke = "var(--primary)", state = "ready", emptyLabel = "No line data.", className, ...props }: LineChartProps) {
  const height = chartHeightBySize[size]
  const linePath = buildLinePath(values, width, height)
  const areaPath = buildAreaPath(values, width, height)

  if (state === "loading") {
    return <div className={cn("h-36 animate-pulse rounded-[min(var(--radius-xl),16px)] bg-muted/70", className)} />
  }

  if (state === "empty" || values.length === 0) {
    return <div className={cn("rounded-[min(var(--radius-xl),16px)] border border-dashed border-border/70 px-4 py-10 text-center text-sm text-muted-foreground", className)}>{emptyLabel}</div>
  }

  return (
    <svg data-slot="line-chart" viewBox={`0 0 ${width} ${height}`} className={cn("h-auto w-full overflow-visible", className)} role="img" {...props}>
      {showArea && <path d={areaPath} fill="var(--primary)" opacity="0.12" />}
      <path d={linePath} fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {values.map((value, index) => {
        const max = safeMax(values)
        const x = 12 + (values.length === 1 ? (width - 24) / 2 : (index / (values.length - 1)) * (width - 24))
        const y = 12 + (1 - normalizeValue(value, max)) * (height - 24)
        return <circle key={index} cx={x} cy={y} r="3" fill={stroke} />
      })}
    </svg>
  )
}

export type SparklineProps = Omit<LineChartProps, "size" | "showArea"> & {
  values: number[]
  positive?: boolean
}

function Sparkline({ values, positive = true, stroke, className, ...props }: SparklineProps) {
  return (
    <LineChart
      values={values}
      width={180}
      size="sm"
      stroke={stroke ?? (positive ? "var(--primary)" : "var(--destructive)")}
      className={cn("max-w-44", className)}
      aria-label="Sparkline"
      {...props}
    />
  )
}

export type DonutChartProps = React.ComponentProps<"svg"> & {
  data: ChartDatum[]
  size?: number
  strokeWidth?: number
  centerLabel?: React.ReactNode
  centerValue?: React.ReactNode
  state?: ChartState
  emptyLabel?: React.ReactNode
}

function DonutChart({ data, size = 180, strokeWidth = 18, centerLabel, centerValue, state = "ready", emptyLabel = "No distribution data.", className, ...props }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + Math.max(item.value, 0), 0)
  const radius = size / 2 - strokeWidth
  const segments = data.map((item, index) => {
    const value = Math.max(item.value, 0)
    const start = data.slice(0, index).reduce((sum, previous) => sum + Math.max(previous.value, 0), 0)
    const end = total > 0 ? start + (value / total) * 360 : start

    return { item, start, end }
  })

  if (state === "loading") {
    return <div className={cn("h-44 w-full max-w-48 animate-pulse rounded-full bg-muted/70", className)} />
  }

  if (state === "empty" || data.length === 0 || total <= 0) {
    return <div className={cn("flex h-44 w-full max-w-48 items-center justify-center rounded-full border border-dashed border-border/70 px-4 text-center text-sm text-muted-foreground", className)}>{emptyLabel}</div>
  }

  return (
    <svg data-slot="donut-chart" viewBox={`0 0 ${size} ${size}`} className={cn("h-auto w-full max-w-48", className)} role="img" {...props}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--muted)" strokeWidth={strokeWidth} />
      {segments.map(({ item, start, end }, index) => {
        return (
          <path
            key={index}
            d={describeArc(size / 2, size / 2, radius, start, end)}
            fill="none"
            stroke={getChartColor(index, item.color)}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        )
      })}
      {(centerValue || centerLabel) && (
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="var(--foreground)">
          {centerValue && <tspan x="50%" dy={centerLabel ? "-0.2em" : "0"} className="text-lg font-semibold">{centerValue}</tspan>}
          {centerLabel && <tspan x="50%" dy="1.3em" className="text-xs fill-muted-foreground">{centerLabel}</tspan>}
        </text>
      )}
    </svg>
  )
}

export type ChartLegendProps = React.ComponentProps<"div"> & {
  data: ChartDatum[]
}

function ChartLegend({ data, className, ...props }: ChartLegendProps) {
  return (
    <div data-slot="chart-legend" className={cn("flex flex-wrap gap-3 text-xs text-muted-foreground", className)} {...props}>
      {data.map((item, index) => (
        <div key={index} className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-primary" style={{ background: getChartColor(index, item.color) }} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export type MetricTrendProps = React.ComponentProps<"div"> & {
  label: React.ReactNode
  value: React.ReactNode
  change?: React.ReactNode
  positive?: boolean
  values?: number[]
}

function MetricTrend({ label, value, change, positive = true, values, className, ...props }: MetricTrendProps) {
  return (
    <div
      data-slot="metric-trend"
      className={cn(
        "grid gap-3 rounded-[var(--radius-2xl)] border border-border/75 bg-card/96 p-4 shadow-sm ring-1 ring-foreground/4",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="grid gap-1">
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className="text-2xl font-semibold tracking-tight">{value}</div>
        </div>
        {change && (
          <div className={cn("rounded-full px-2 py-1 text-xs font-medium", positive ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive")}>
            {change}
          </div>
        )}
      </div>
      {values && <Sparkline values={values} positive={positive} />}
    </div>
  )
}

export { BarChart, ChartFrame, ChartLegend, DonutChart, LineChart, MetricTrend, Sparkline }
