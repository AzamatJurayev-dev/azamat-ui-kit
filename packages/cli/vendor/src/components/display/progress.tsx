import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type ProgressTone = "default" | "success" | "info" | "warning" | "danger" | "muted"
export type ProgressSize = "sm" | "default" | "lg"

export type ProgressProps = Omit<React.ComponentProps<"div">, "children"> & {
  value?: number | null
  max?: number
  min?: number
  label?: React.ReactNode
  description?: React.ReactNode
  showValue?: boolean
  valueFormatter?: (value: number, percent: number) => React.ReactNode
  tone?: ProgressTone
  size?: ProgressSize
  indeterminate?: boolean
  trackClassName?: string
  indicatorClassName?: string
}

export type ProgressCardProps = React.ComponentProps<typeof Card> & {
  title?: React.ReactNode
  description?: React.ReactNode
  value?: number | null
  max?: number
  min?: number
  tone?: ProgressTone
  size?: ProgressSize
  showValue?: boolean
  valueFormatter?: ProgressProps["valueFormatter"]
  footer?: React.ReactNode
  progressClassName?: string
}

const toneClassName: Record<ProgressTone, string> = {
  default: "bg-primary",
  success: "bg-emerald-500",
  info: "bg-blue-500",
  warning: "bg-amber-500",
  danger: "bg-destructive",
  muted: "bg-muted-foreground",
}

const sizeClassName: Record<ProgressSize, string> = {
  sm: "h-1.5",
  default: "h-2",
  lg: "h-3",
}

function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getProgressPercent(value: number | null | undefined, min: number, max: number) {
  if (value === null || value === undefined || !Number.isFinite(value)) return 0
  if (max <= min) return 0

  return ((clampValue(value, min, max) - min) / (max - min)) * 100
}

function Progress({
  value = 0,
  min = 0,
  max = 100,
  label,
  description,
  showValue = false,
  valueFormatter,
  tone = "default",
  size = "default",
  indeterminate = false,
  className,
  trackClassName,
  indicatorClassName,
  ...props
}: ProgressProps) {
  const percent = getProgressPercent(value, min, max)
  const resolvedValue = value ?? min

  return (
    <div data-slot="progress" className={cn("grid gap-1.5", className)} {...props}>
      {(label || description || showValue) && (
        <div className="flex min-w-0 items-start justify-between gap-3 text-sm">
          <div className="min-w-0 space-y-0.5">
            {label && <div className="font-medium leading-none">{label}</div>}
            {description && <div className="text-xs text-muted-foreground">{description}</div>}
          </div>
          {showValue && (
            <div className="shrink-0 text-xs font-medium text-muted-foreground">
              {valueFormatter ? valueFormatter(resolvedValue, percent) : `${Math.round(percent)}%`}
            </div>
          )}
        </div>
      )}
      <div
        data-slot="progress-track"
        className={cn("w-full overflow-hidden rounded-full bg-muted", sizeClassName[size], trackClassName)}
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : resolvedValue}
        aria-label={typeof label === "string" ? label : undefined}
      >
        <div
          data-slot="progress-indicator"
          data-indeterminate={indeterminate || undefined}
          className={cn(
            "h-full rounded-full transition-all data-[indeterminate=true]:w-1/3 data-[indeterminate=true]:animate-pulse",
            toneClassName[tone],
            indicatorClassName
          )}
          style={indeterminate ? undefined : { width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

function ProgressCard({
  title,
  description,
  value,
  min,
  max,
  tone,
  size,
  showValue = true,
  valueFormatter,
  footer,
  progressClassName,
  className,
  ...props
}: ProgressCardProps) {
  return (
    <Card data-slot="progress-card" className={cn("min-w-0", className)} {...props}>
      <CardHeader>
        <div className="min-w-0 space-y-1">
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress
          value={value}
          min={min}
          max={max}
          tone={tone}
          size={size}
          showValue={showValue}
          valueFormatter={valueFormatter}
          className={progressClassName}
        />
        {footer}
      </CardContent>
    </Card>
  )
}

export { Progress, ProgressCard, getProgressPercent }
