import * as React from "react"

import { cn } from "@/lib/utils"

export type StatusDotTone = "neutral" | "info" | "success" | "warning" | "danger" | "muted"

export type StatusDotProps = React.ComponentProps<"span"> & {
  tone?: StatusDotTone
  pulse?: boolean
  label?: React.ReactNode
  size?: "sm" | "default" | "lg"
}

const toneClassName: Record<StatusDotTone, string> = {
  neutral: "bg-foreground",
  info: "bg-blue-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-destructive",
  muted: "bg-muted-foreground",
}

const sizeClassName = {
  sm: "size-1.5",
  default: "size-2",
  lg: "size-2.5",
}

function StatusDot({ className, tone = "neutral", pulse = false, label, size = "default", ...props }: StatusDotProps) {
  const dot = (
    <span className="relative inline-flex shrink-0 items-center justify-center">
      {pulse ? <span className={cn("absolute inline-flex size-full animate-ping rounded-full opacity-35", toneClassName[tone])} /> : null}
      <span data-slot="status-dot-indicator" className={cn("relative rounded-full", sizeClassName[size], toneClassName[tone])} />
    </span>
  )

  return (
    <span data-slot="status-dot" className={cn("inline-flex items-center gap-2 text-sm text-muted-foreground", className)} {...props}>
      {dot}
      {label ? <span data-slot="status-dot-label">{label}</span> : null}
    </span>
  )
}

export { StatusDot }
