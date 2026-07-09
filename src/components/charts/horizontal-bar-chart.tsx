import * as React from "react"

import { cn } from "@/lib/utils"

export type HorizontalBarDatum = {
  key: string
  label: React.ReactNode
  value: number
  description?: React.ReactNode
  color?: string
}

export type HorizontalBarChartProps = React.ComponentProps<"div"> & {
  data: HorizontalBarDatum[]
  max?: number
  showValue?: boolean
  emptyLabel?: React.ReactNode
  valueFormatter?: (value: number) => React.ReactNode
}

function HorizontalBarChart({ data, max, showValue = true, emptyLabel = "No ranking data.", valueFormatter, className, ...props }: HorizontalBarChartProps) {
  const resolvedMax = max ?? Math.max(...data.map((item) => item.value), 1)

  if (data.length === 0) {
    return (
      <div
        data-slot="horizontal-bar-chart"
        className={cn("rounded-[min(var(--radius-xl),16px)] border border-dashed border-border/70 px-4 py-10 text-center text-sm text-muted-foreground", className)}
        {...props}
      >
        {emptyLabel}
      </div>
    )
  }

  return (
    <div data-slot="horizontal-bar-chart" className={cn("grid gap-3", className)} {...props}>
      {data.map((item) => {
        const width = resolvedMax > 0 ? Math.max(0, Math.min((item.value / resolvedMax) * 100, 100)) : 0

        return (
          <div key={item.key} className="grid gap-1.5">
            <div className="flex items-center justify-between gap-3 text-sm">
              <div className="min-w-0">
                <div className="truncate font-medium text-foreground">{item.label}</div>
                {item.description && <div className="truncate text-xs text-muted-foreground">{item.description}</div>}
              </div>
              {showValue && <div className="text-xs font-medium text-muted-foreground">{valueFormatter ? valueFormatter(item.value) : item.value.toLocaleString()}</div>}
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${width}%`, background: item.color }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { HorizontalBarChart }
