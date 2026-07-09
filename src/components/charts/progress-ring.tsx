import * as React from "react"

import { cn } from "@/lib/utils"

export type ProgressRingProps = React.ComponentProps<"svg"> & {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  label?: React.ReactNode
  description?: React.ReactNode
  tone?: "default" | "success" | "warning" | "danger"
  loading?: boolean
}

function ProgressRing({ value, max = 100, size = 120, strokeWidth = 10, label, description, tone = "default", loading = false, className, ...props }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const ratio = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0
  const offset = circumference - ratio * circumference
  const stroke =
    tone === "success"
      ? "var(--color-chart-3, var(--primary))"
      : tone === "warning"
        ? "var(--color-chart-4, var(--primary))"
        : tone === "danger"
          ? "var(--destructive)"
          : "var(--primary)"

  return (
    <svg data-slot="progress-ring" viewBox={`0 0 ${size} ${size}`} className={cn("h-auto w-full max-w-32", className)} role="img" {...props}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--muted)" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={loading ? circumference * 0.45 : offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className={loading ? "animate-pulse" : undefined}
      />
      {(label || description) && (
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="var(--foreground)">
          {label && <tspan x="50%" dy={description ? "-0.15em" : "0"} className="text-base font-semibold">{label}</tspan>}
          {description && <tspan x="50%" dy="1.25em" className="text-xs fill-muted-foreground">{description}</tspan>}
        </text>
      )}
    </svg>
  )
}

export { ProgressRing }
