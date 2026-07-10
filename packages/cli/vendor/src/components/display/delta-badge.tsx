import * as React from "react"
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react"

import { Badge, type BadgeProps } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type DeltaBadgeProps = Omit<BadgeProps, "children" | "label" | "tone" | "status" | "leftIcon" | "variant" | "size"> & {
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
  const tone = trend === "up" ? "success" : trend === "down" ? "danger" : "muted"

  return (
    <Badge
      data-slot="delta-badge"
      variant="soft"
      tone={tone}
      size={size}
      leftIcon={icon ? <TrendIcon className={cn("shrink-0", size === "sm" ? "size-2.5" : "size-3")} /> : undefined}
      label={value}
      className={cn(
        size === "sm" && "min-h-5 px-1.5 text-[10px]",
        className
      )}
      {...props}
    />
  )
}

export { DeltaBadge }
