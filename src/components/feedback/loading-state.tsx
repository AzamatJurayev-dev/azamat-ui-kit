import * as React from "react"
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

export type LoadingStateProps = React.ComponentProps<"div"> & {
  label?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
}

function LoadingState({
  className,
  label = "Loading...",
  description,
  icon,
  ...props
}: LoadingStateProps) {
  return (
    <div
      data-slot="loading-state"
      className={cn(
        "flex min-h-48 flex-col items-center justify-center gap-3 rounded-lg p-8 text-center text-muted-foreground",
        className
      )}
      {...props}
    >
      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
        {icon ?? <Loader2Icon className="size-5 animate-spin" />}
      </div>
      <div className="grid gap-1">
        {label && <div className="text-sm font-medium text-foreground">{label}</div>}
        {description && <p className="max-w-sm text-sm">{description}</p>}
      </div>
    </div>
  )
}

export { LoadingState }
