import * as React from "react"

import { BarChart, Button, ChartFrame, ChartLegend, DonutChart, MetricGrid } from "@/index"

import type { ComponentDemoProps } from "../types"

const items = [
  { key: "users", label: "Users", value: "2,410", description: "Last 30 days", tone: "success" as const, trend: "+12%" },
  { key: "revenue", label: "Revenue", value: "$132k", description: "Compared with last month", tone: "info" as const, trend: "+8.4%" },
  { key: "errors", label: "Errors", value: "3", description: "Immediate follow up", tone: "danger" as const },
  { key: "churn", label: "Churn", value: "1.8%", description: "Within target", tone: "warning" as const },
]

const columns = [2, 3, 4] as const

export function MetricGridShowcase({ mode }: ComponentDemoProps) {
  const [compact, setCompact] = React.useState(false)
  const [columnCount, setColumnCount] = React.useState<(2 | 3 | 4)>(3)

  return (
    <div className="space-y-4">
      {mode === "playground" ? (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant={compact ? "outline" : "default"} onClick={() => setCompact((value) => !value)}>
            {compact ? "Use spacious" : "Use compact"}
          </Button>
          {columns.map((size) => (
            <Button key={size} size="sm" variant={columnCount === size ? "default" : "outline"} onClick={() => setColumnCount(size)}>
              {size} cols
            </Button>
          ))}
        </div>
      ) : null}

      <MetricGrid items={items} columns={columnCount} compact={compact} />
      <div className="grid gap-4 xl:grid-cols-2">
        <ChartFrame title="Category performance" description="Bar chart shares the same token palette.">
          <BarChart
            data={[
              { label: "CRM", value: 42 },
              { label: "Finance", value: 31 },
              { label: "Auth", value: -8 },
              { label: "Forms", value: 26 },
            ]}
          />
        </ChartFrame>
        <ChartFrame title="Traffic split" description="Donut, legend and KPI blocks stay visually aligned.">
          <div className="grid justify-items-center gap-4">
            <DonutChart
              centerValue="68%"
              centerLabel="Usage"
              data={[
                { label: "Dashboard", value: 42 },
                { label: "Forms", value: 18 },
                { label: "Reports", value: 8 },
              ]}
            />
            <ChartLegend
              data={[
                { label: "Dashboard", value: 42 },
                { label: "Forms", value: 18 },
                { label: "Reports", value: 8 },
              ]}
            />
          </div>
        </ChartFrame>
      </div>
    </div>
  )
}
