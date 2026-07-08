import * as React from "react"

import { StatCard } from "@/components/layout/stat-card"

export type ComparisonCardItem = {
  label: React.ReactNode
  value: React.ReactNode
  change?: React.ReactNode
  trend?: "up" | "down" | "neutral"
}

export type ComparisonCardProps = Omit<React.ComponentProps<typeof StatCard>, "comparisonItems" | "comparisonColumns"> & {
  title?: React.ReactNode
  items: ComparisonCardItem[]
  columns?: 2 | 3 | 4
}

function ComparisonCard({ title, items, columns = 2, ...props }: ComparisonCardProps) {
  return (
    <StatCard
      data-slot="comparison-card"
      title={title}
      comparisonColumns={columns}
      comparisonItems={items.map((item) => ({
        label: item.label,
        value: item.value,
        change: item.change,
        trend: item.trend === "up" ? "success" : item.trend === "down" ? "danger" : "neutral",
      }))}
      {...props}
    />
  )
}

export { ComparisonCard }
