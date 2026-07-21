"use client"

import * as React from "react"
import * as echarts from "echarts"
import type {
  ECharts,
  EChartsOption,
  EChartsType,
  SetOptionOpts,
} from "echarts"

import { cn } from "@/lib/utils"

export type AdvancedChartEventMap = Record<
  string,
  (params: unknown, chart: EChartsType) => void
>

export type AdvancedChartProps = Omit<React.ComponentProps<"div">, "onError"> & {
  option: EChartsOption
  theme?: string | object
  renderer?: "canvas" | "svg"
  devicePixelRatio?: number
  setOptionOptions?: SetOptionOpts
  loading?: boolean
  loadingOptions?: object
  autoResize?: boolean
  events?: AdvancedChartEventMap
  onReady?: (chart: EChartsType) => void
  onError?: (error: Error) => void
  chartClassName?: string
}

function AdvancedChart({
  option,
  theme,
  renderer = "canvas",
  devicePixelRatio,
  setOptionOptions,
  loading = false,
  loadingOptions,
  autoResize = true,
  events,
  onReady,
  onError,
  className,
  chartClassName,
  ...props
}: AdvancedChartProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const chartRef = React.useRef<ECharts | null>(null)
  const callbacksRef = React.useRef({ onReady, onError })

  React.useEffect(() => {
    callbacksRef.current = { onReady, onError }
  }, [onError, onReady])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    try {
      const chart = echarts.init(container, theme, { renderer, devicePixelRatio })
      chartRef.current = chart
      callbacksRef.current.onReady?.(chart)

      const resizeObserver = autoResize
        ? new ResizeObserver(() => chart.resize())
        : null
      resizeObserver?.observe(container)

      return () => {
        resizeObserver?.disconnect()
        chart.dispose()
        chartRef.current = null
      }
    } catch (cause: unknown) {
      const error = cause instanceof Error ? cause : new Error("Chart could not be initialized")
      callbacksRef.current.onError?.(error)
    }
  }, [autoResize, devicePixelRatio, renderer, theme])

  React.useEffect(() => {
    try {
      chartRef.current?.setOption(option, setOptionOptions)
    } catch (cause: unknown) {
      const error = cause instanceof Error ? cause : new Error("Chart option could not be applied")
      callbacksRef.current.onError?.(error)
    }
  }, [option, setOptionOptions])

  React.useEffect(() => {
    const chart = chartRef.current
    if (!chart) return

    if (loading) chart.showLoading("default", loadingOptions)
    else chart.hideLoading()
  }, [loading, loadingOptions])

  React.useEffect(() => {
    const chart = chartRef.current
    if (!chart || !events) return

    const bindings = Object.entries(events).map(([eventName, handler]) => {
      const listener = (params: unknown) => handler(params, chart)
      chart.on(eventName, listener)
      return { eventName, listener }
    })

    return () => {
      for (const binding of bindings) chart.off(binding.eventName, binding.listener)
    }
  }, [events])

  return (
    <div
      data-slot="advanced-chart"
      className={cn("min-h-80 w-full overflow-hidden rounded-lg border bg-background", className)}
      {...props}
    >
      <div
        ref={containerRef}
        data-slot="advanced-chart-canvas"
        className={cn("h-[420px] min-h-80 w-full", chartClassName)}
      />
    </div>
  )
}

export { AdvancedChart }
export type { EChartsOption }
