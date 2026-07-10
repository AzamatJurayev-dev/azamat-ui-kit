import * as React from "react"
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

export type LoadingStateProps = React.ComponentProps<"div"> & {
  label?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  variant?: "spinner" | "skeleton" | "progress"
  progress?: number
}

function LoadingState({
  className,
  label = "Loading...",
  description,
  icon,
  variant = "spinner",
  progress,
  ...props
}: LoadingStateProps) {
  return (
    <div
      data-slot="loading-state"
      className={cn(
        "flex min-h-52 flex-col items-center justify-center gap-4 rounded-[var(--radius-3xl)] border border-border/75 bg-muted/25 p-10 text-center text-muted-foreground shadow-sm ring-1 ring-foreground/4",
        className
      )}
      {...props}
    >
      {variant === "skeleton" ? (
        <div className="grid gap-3">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="h-24 w-64 animate-pulse rounded-[min(var(--radius-xl),16px)] bg-muted/70" />
        </div>
      ) : (
        <div className="flex size-12 items-center justify-center rounded-full border border-border/70 bg-background/92 shadow-[0_1px_0_rgba(255,255,255,0.08)]">
          {icon ?? <Loader2Icon className="size-5 animate-spin" />}
        </div>
      )}
      <div className="grid gap-1.5">
        {label && <div className="text-base font-semibold tracking-tight text-foreground">{label}</div>}
        {description && <p className="max-w-sm text-sm leading-6">{description}</p>}
        {variant === "progress" && typeof progress === "number" ? (
          <div className="mx-auto mt-2 h-2 w-full max-w-xs overflow-hidden rounded-full bg-muted/80">
            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { LoadingState }
