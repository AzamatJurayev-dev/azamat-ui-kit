import * as React from "react"

import { cn } from "@/lib/utils"

export type ProgressCircleProps = React.ComponentProps<"svg"> & {
  value?: number
  max?: number
  size?: number
  strokeWidth?: number
  label?: React.ReactNode
  description?: React.ReactNode
  tone?: "default" | "success" | "warning" | "danger"
  loading?: boolean
}

const toneClassName = {
  default: "stroke-primary",
  success: "stroke-[color:var(--aui-success,var(--primary))]",
  warning: "stroke-[color:var(--aui-warning,var(--primary))]",
  danger: "stroke-destructive",
}

function ProgressCircle({
  value,
  max = 100,
  size = 120,
  strokeWidth = 10,
  label,
  description,
  tone = "default",
  loading = false,
  className,
  ...props
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const percentage = typeof value === "number" ? Math.min(Math.max(value / max, 0), 1) : 0
  const offset = circumference - percentage * circumference
  const progressLabel = label ?? (typeof value === "number" ? `${Math.round(percentage * 100)}%` : undefined)

  return (
    <svg
      data-slot="progress-circle"
      viewBox={`0 0 ${size} ${size}`}
      className={cn("h-auto w-full max-w-32", className)}
      role="img"
      {...props}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        className="stroke-muted"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={loading ? circumference * 0.28 : offset}
        className={cn("origin-center -rotate-90 transition-[stroke-dashoffset]", toneClassName[tone], loading && "animate-pulse")}
      />
      {progressLabel ? (
        <text x="50%" y={description ? "46%" : "52%"} textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-lg font-semibold">
          {progressLabel}
        </text>
      ) : null}
      {description ? (
        <text x="50%" y="62%" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-[10px]">
          {description}
        </text>
      ) : null}
    </svg>
  )
}

export { ProgressCircle }
