import * as React from "react"
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type DeltaBadgeProps = React.ComponentProps<"span"> & {
  value: React.ReactNode
  trend?: "up" | "down" | "neutral"
  size?: "sm" | "default"
  icon?: boolean
}

function DeltaBadge({
  value,
  trend = "neutral",
  size = "default",
  icon = true,
  className,
  ...props
}: DeltaBadgeProps) {
  const TrendIcon = trend === "up" ? ArrowUpIcon : trend === "down" ? ArrowDownIcon : MinusIcon

  return (
    <span
      data-slot="delta-badge"
      className={cn(
        "inline-flex items-center justify-center font-medium",
        size === "sm" ? "gap-0.5 rounded px-1 py-0.5 text-[10px]" : "gap-1 rounded-full px-1.5 py-0.5 text-xs",
        trend === "up" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        trend === "down" && "bg-destructive/10 text-destructive",
        trend === "neutral" && "bg-muted text-muted-foreground",
        className
      )}
      {...props}
    >
      {icon && <TrendIcon className={cn("shrink-0", size === "sm" ? "size-2.5" : "size-3")} />}
      {value}
    </span>
  )
}

export { DeltaBadge }
