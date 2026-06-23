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
        "flex min-h-52 flex-col items-center justify-center gap-4 rounded-[var(--radius-3xl)] border border-border/70 bg-muted/25 p-10 text-center text-muted-foreground shadow-sm",
        className
      )}
      {...props}
    >
      <div className="flex size-12 items-center justify-center rounded-full border border-border/70 bg-background/90 shadow-sm">
        {icon ?? <Loader2Icon className="size-5 animate-spin" />}
      </div>
      <div className="grid gap-1.5">
        {label && <div className="text-base font-semibold tracking-tight text-foreground">{label}</div>}
        {description && <p className="max-w-sm text-sm leading-6">{description}</p>}
      </div>
    </div>
  )
}

export { LoadingState }
