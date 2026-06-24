import * as React from "react"

import { cn } from "@/lib/utils"

export type ProgressCircleProps = React.ComponentProps<"div"> & {
  value?: number
  max?: number
  label?: React.ReactNode
}

function ProgressCircle({ value = 0, max = 100, label, className, ...props }: ProgressCircleProps) {
  const percent = max > 0 ? Math.max(0, Math.min(100, Math.round((value / max) * 100))) : 0

  return (
    <div data-slot="progress-circle" className={cn("inline-flex items-center gap-3", className)} {...props}>
      <span className="inline-flex size-14 items-center justify-center rounded-full border-4 border-muted bg-background text-xs font-semibold text-foreground">
        {percent}%
      </span>
      {label ? <span className="text-sm text-muted-foreground">{label}</span> : null}
    </div>
  )
}

export { ProgressCircle }
