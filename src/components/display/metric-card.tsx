import * as React from "react"

import { StatCard } from "@/components/layout/stat-card"

export type MetricCardProps = Omit<
  React.ComponentProps<typeof StatCard>,
  "title" | "value" | "description" | "trend" | "icon"
> & {
  title: React.ReactNode
  value: React.ReactNode
  description?: React.ReactNode
  trend?: React.ReactNode
  icon?: React.ReactNode
}

type MetricStatCardProps = Omit<MetricCardProps, "trend"> & {
  "data-slot"?: string
  trend?: { value: React.ReactNode }
}

const MetricStatCard = StatCard as React.ComponentType<MetricStatCardProps>

/**
 * MetricCard is the display-facing compatibility name for StatCard.
 * Prefer `StatCard` or `CardFamily.Stat` in new dashboard layouts.
 */
function MetricCard({ title, value, description, trend, icon, ...props }: MetricCardProps) {
  return (
    <MetricStatCard
      data-slot="metric-card"
      title={title}
      value={value}
      description={description}
      trend={trend ? { value: trend } : undefined}
      icon={icon}
      {...props}
    />
  )
}

export { MetricCard }
