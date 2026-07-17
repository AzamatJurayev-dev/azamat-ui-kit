"use client"

import * as React from "react"
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StateView } from "@/components/feedback/state-view"
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
export type ChartDomain = [number | "auto" | "dataMin", number | "auto" | "dataMax"]

const chartHeightBySize: Record<ChartSize, number> = { sm: 120, md: 220, lg: 320 }

function getChartColor(index: number, custom?: string) {
  return custom ?? `var(--color-chart-${(index % 5) + 1}, var(--primary))`
}

function toText(value: React.ReactNode, fallback: string) {
  return typeof value === "string" || typeof value === "number" ? String(value) : fallback
}

function formatChartValue(value: number, formatter?: (value: number) => React.ReactNode) {
  return formatter ? formatter(value) : value.toLocaleString()
}

function ChartStatus({ state, emptyLabel, height }: { state: ChartState; emptyLabel: React.ReactNode; height: number }) {
  if (state === "loading") {
    return <StateView status="loading" loadingVariant="skeleton" variant="plain" size="compact" style={{ minHeight: height }} />
  }
  if (state === "empty") {
    return <StateView status="empty" title={emptyLabel} description={null} variant="plain" size="compact" style={{ minHeight: height }} />
  }
  return null
}

function ChartDataTable({ data, valueFormatter, caption }: { data: ChartDatum[]; valueFormatter?: (value: number) => React.ReactNode; caption: string }) {
  return (
    <div className="sr-only">
      <table>
        <caption>{caption}</caption>
        <thead><tr><th scope="col">Label</th><th scope="col">Value</th><th scope="col">Description</th></tr></thead>
        <tbody>{data.map((item, index) => <tr key={index}><th scope="row">{item.label}</th><td>{formatChartValue(item.value, valueFormatter)}</td><td>{item.description}</td></tr>)}</tbody>
      </table>
    </div>
  )
}

export type ChartTooltipContentProps = {
  active?: boolean
  label?: React.ReactNode
  payload?: ReadonlyArray<{ value?: number | string; color?: string; name?: string; payload?: { description?: React.ReactNode; originalLabel?: React.ReactNode } }>
  valueFormatter?: (value: number) => React.ReactNode
  labelFormatter?: (label: React.ReactNode) => React.ReactNode
}

function ChartTooltipContent({ active, label, payload, valueFormatter, labelFormatter }: ChartTooltipContentProps) {
  if (!active || !payload?.length) return null
  return (
    <div data-slot="chart-tooltip" className="min-w-36 rounded-[var(--radius-md)] border border-border/75 bg-popover/98 p-3 text-popover-foreground shadow-lg backdrop-blur">
      {label !== undefined ? <div className="mb-2 text-xs font-semibold text-muted-foreground">{labelFormatter ? labelFormatter(label) : label}</div> : null}
      <div className="grid gap-1.5">
        {payload.map((entry, index) => {
          const numericValue = typeof entry.value === "number" ? entry.value : Number(entry.value ?? 0)
          return (
            <div key={`${entry.name ?? "value"}-${index}`} className="flex min-w-0 items-center gap-2 text-sm">
              <span className="size-2.5 shrink-0 rounded-sm" style={{ background: entry.color }} />
              <span className="min-w-0 flex-1 truncate">{entry.name ?? "Value"}</span>
              <span className="font-semibold tabular-nums">{formatChartValue(numericValue, valueFormatter)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
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
    <Card data-slot="chart-frame" data-state={state} className={cn("min-w-0", className)} {...props}>
      {(title || description || action) ? (
        <CardHeader className="flex-row items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">{title ? <CardTitle>{title}</CardTitle> : null}{description ? <CardDescription>{description}</CardDescription> : null}</div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </CardHeader>
      ) : null}
      <CardContent>{state === "ready" ? children : <ChartStatus state={state} emptyLabel={emptyLabel} height={180} />}</CardContent>
    </Card>
  )
}

export type BarChartProps = React.ComponentProps<"div"> & {
  data: ChartDatum[]
  size?: ChartSize
  max?: number
  showLabels?: boolean
  showValues?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  valueFormatter?: (value: number) => React.ReactNode
  state?: ChartState
  emptyLabel?: React.ReactNode
  barClassName?: string
  domain?: ChartDomain
  ariaLabel?: string
}

function BarChart({ data, size = "md", max, showLabels = true, showValues = false, showGrid = true, showTooltip = true, valueFormatter, state = "ready", emptyLabel = "No chart data.", barClassName, domain, ariaLabel = "Bar chart", className, ...props }: BarChartProps) {
  const height = chartHeightBySize[size]
  const status = state === "ready" && data.length === 0 ? "empty" : state
  if (status !== "ready") return <ChartStatus state={status} emptyLabel={emptyLabel} height={height} />
  const chartData = data.map((item, index) => ({ name: toText(item.label, `Item ${index + 1}`), value: item.value, fill: getChartColor(index, item.color), originalLabel: item.label, description: item.description }))
  const resolvedDomain: ChartDomain = domain ?? (max !== undefined ? ["auto", max] : ["auto", "auto"])

  return (
    <div data-slot="bar-chart" role="img" aria-label={ariaLabel} className={cn("min-w-0", className)} {...props}>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <RechartsBarChart data={chartData} margin={{ top: showValues ? 20 : 8, right: 8, bottom: showLabels ? 8 : 0, left: 0 }}>
            {showGrid ? <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 6" /> : null}
            <XAxis dataKey="name" hide={!showLabels} axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} interval="preserveStartEnd" />
            <YAxis hide domain={resolvedDomain} />
            {showTooltip ? <RechartsTooltip cursor={{ fill: "var(--muted)", opacity: 0.35 }} content={<ChartTooltipContent valueFormatter={valueFormatter} />} /> : null}
            <Bar dataKey="value" name="Value" radius={[6, 6, 2, 2]} className={barClassName} isAnimationActive={false} label={showValues ? { position: "top", fill: "var(--muted-foreground)", fontSize: 11, formatter: (value: unknown) => String(formatChartValue(Number(value), valueFormatter)) } : false}>
              {chartData.map((item) => <Cell key={item.name} fill={item.fill} />)}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
      <ChartDataTable data={data} valueFormatter={valueFormatter} caption={ariaLabel} />
    </div>
  )
}

export type LineChartProps = Omit<React.ComponentProps<"div">, "children"> & {
  values: number[]
  size?: ChartSize
  width?: number
  height?: number
  showArea?: boolean
  showGrid?: boolean
  showAxis?: boolean
  showTooltip?: boolean
  labels?: ChartAxisLabel[]
  valueFormatter?: (value: number) => React.ReactNode
  stroke?: string
  state?: ChartState
  emptyLabel?: React.ReactNode
  domain?: ChartDomain
  ariaLabel?: string
}

function LineChart({ values, size = "md", width = 560, height: heightProp, showArea = false, showGrid = true, showAxis = false, showTooltip = true, labels, valueFormatter, stroke = "var(--primary)", state = "ready", emptyLabel = "No line data.", domain = ["auto", "auto"], ariaLabel = showArea ? "Area chart" : "Line chart", className, style, ...props }: LineChartProps) {
  const height = heightProp ?? chartHeightBySize[size]
  const status = state === "ready" && values.length === 0 ? "empty" : state
  if (status !== "ready") return <ChartStatus state={status} emptyLabel={emptyLabel} height={height} />
  const data = values.map((value, index) => ({ name: toText(labels?.[index], String(index + 1)), value, originalLabel: labels?.[index] ?? String(index + 1) }))
  const Engine = showArea ? RechartsAreaChart : RechartsLineChart

  return (
    <div data-slot={showArea ? "area-chart" : "line-chart"} role="img" aria-label={ariaLabel} data-chart-width={width} className={cn("min-w-0", className)} style={style} {...props}>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <Engine data={data} margin={{ top: 10, right: 10, bottom: showAxis ? 8 : 0, left: showAxis ? -12 : 0 }}>
            {showGrid ? <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 6" /> : null}
            <XAxis dataKey="name" hide={!showAxis} axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} interval="preserveStartEnd" />
            <YAxis hide={!showAxis} domain={domain} axisLine={false} tickLine={false} width={44} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
            {showTooltip ? <RechartsTooltip content={<ChartTooltipContent valueFormatter={valueFormatter} />} /> : null}
            {showArea ? <Area type="monotone" dataKey="value" name="Value" stroke={stroke} strokeWidth={2.5} fill={stroke} fillOpacity={0.14} activeDot={{ r: 5 }} isAnimationActive={false} /> : <Line type="monotone" dataKey="value" name="Value" stroke={stroke} strokeWidth={2.5} dot={{ r: 3.5, fill: stroke }} activeDot={{ r: 5 }} isAnimationActive={false} />}
          </Engine>
        </ResponsiveContainer>
      </div>
      <ChartDataTable data={values.map((value, index) => ({ label: labels?.[index] ?? index + 1, value }))} valueFormatter={valueFormatter} caption={ariaLabel} />
    </div>
  )
}

function AreaChart(props: Omit<LineChartProps, "showArea">) { return <LineChart showArea {...props} /> }

export type SparklineProps = Omit<LineChartProps, "size" | "showArea" | "showAxis"> & { values: number[]; positive?: boolean }

function Sparkline({ values, positive = true, stroke, className, showTooltip = false, ...props }: SparklineProps) {
  return <LineChart values={values} size="sm" stroke={stroke ?? (positive ? "var(--aui-success,var(--primary))" : "var(--destructive)")} showGrid={false} showAxis={false} showTooltip={showTooltip} className={cn("max-w-44", className)} ariaLabel="Sparkline" {...props} />
}

export type DonutChartProps = Omit<React.ComponentProps<"div">, "children"> & {
  data: ChartDatum[]
  size?: number
  strokeWidth?: number
  centerLabel?: React.ReactNode
  centerValue?: React.ReactNode
  state?: ChartState
  emptyLabel?: React.ReactNode
  showTooltip?: boolean
  valueFormatter?: (value: number) => React.ReactNode
  ariaLabel?: string
}

function DonutChart({ data, size = 180, strokeWidth = 18, centerLabel, centerValue, state = "ready", emptyLabel = "No distribution data.", showTooltip = true, valueFormatter, ariaLabel = "Donut chart", className, style, ...props }: DonutChartProps) {
  const status = state === "ready" && data.length === 0 ? "empty" : state
  if (status !== "ready") return <ChartStatus state={status} emptyLabel={emptyLabel} height={size} />
  const chartData = data.map((item, index) => ({ name: toText(item.label, `Item ${index + 1}`), value: Math.max(0, item.value), fill: getChartColor(index, item.color), description: item.description }))
  const radius = Math.max(8, size / 2 - 8)

  return (
    <div data-slot="donut-chart" role="img" aria-label={ariaLabel} className={cn("relative inline-grid place-items-center", className)} style={{ width: size, height: size, ...style }} {...props}>
      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
        <PieChart>
          {showTooltip ? <RechartsTooltip content={<ChartTooltipContent valueFormatter={valueFormatter} />} /> : null}
          <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={Math.max(0, radius - strokeWidth)} outerRadius={radius} paddingAngle={2} stroke="var(--background)" strokeWidth={2} isAnimationActive={false}>
            {chartData.map((item) => <Cell key={item.name} fill={item.fill} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {(centerValue || centerLabel) ? <div className="pointer-events-none absolute inset-0 grid place-content-center text-center"><div className="text-xl font-semibold tabular-nums">{centerValue}</div><div className="text-xs text-muted-foreground">{centerLabel}</div></div> : null}
      <ChartDataTable data={data} valueFormatter={valueFormatter} caption={ariaLabel} />
    </div>
  )
}

export type ChartLegendProps = React.ComponentProps<"div"> & { data: ChartDatum[] }

function ChartLegend({ data, className, ...props }: ChartLegendProps) {
  return <div data-slot="chart-legend" className={cn("flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground", className)} {...props}>{data.map((item, index) => <div key={index} className="inline-flex min-w-0 items-center gap-2"><span className="size-2.5 shrink-0 rounded-sm" style={{ background: getChartColor(index, item.color) }} /><span className="truncate">{item.label}</span></div>)}</div>
}

export type MetricTrendProps = React.ComponentProps<"div"> & { label: React.ReactNode; value: React.ReactNode; change?: React.ReactNode; positive?: boolean; values?: number[] }

function MetricTrend({ label, value, change, positive = true, values, className, ...props }: MetricTrendProps) {
  return <div data-slot="metric-trend" className={cn("grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-end gap-4", className)} {...props}><div className="min-w-0"><div className="text-sm text-muted-foreground">{label}</div><div className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">{value}</div>{change ? <div className={cn("mt-1 text-xs font-medium", positive ? "text-[color:var(--aui-success,var(--primary))]" : "text-destructive")}>{change}</div> : null}</div>{values?.length ? <Sparkline values={values} positive={positive} /> : null}</div>
}

export { AreaChart, BarChart, ChartFrame, ChartLegend, ChartTooltipContent, DonutChart, LineChart, MetricTrend, Sparkline }
