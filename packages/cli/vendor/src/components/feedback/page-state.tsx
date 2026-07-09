import * as React from "react"
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, Loader2Icon, SearchXIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type PageStateTone = "empty" | "loading" | "error" | "success" | "info"

export type PageStateProps = Omit<React.ComponentProps<"div">, "title"> & {
  tone?: PageStateTone
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  action?: React.ReactNode
  extra?: React.ReactNode
  compact?: boolean
}

function defaultPageStateIcon(tone: PageStateTone) {
  switch (tone) {
    case "loading":
      return <Loader2Icon className="size-8 animate-spin" />
    case "error":
      return <AlertCircleIcon className="size-8" />
    case "success":
      return <CheckCircle2Icon className="size-8" />
    case "info":
      return <InfoIcon className="size-8" />
    default:
      return <SearchXIcon className="size-8" />
  }
}

function PageState({ tone = "empty", title, description, icon, action, extra, compact = false, className, ...props }: PageStateProps) {
  return (
    <div
      data-slot="page-state"
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex flex-col items-center justify-center rounded-[var(--radius-3xl)] border border-border/75 bg-card/96 text-center shadow-sm ring-1 ring-foreground/4",
        compact ? "gap-2 p-6" : "min-h-72 gap-4 p-10",
        className
      )}
      {...props}
    >
      <div className="flex size-14 items-center justify-center rounded-full border border-border/70 bg-muted/45 text-muted-foreground shadow-[0_1px_0_rgba(255,255,255,0.05)]">
        {icon ?? defaultPageStateIcon(tone)}
      </div>
      <div className="grid gap-1">
        {title && <div className="text-base font-semibold tracking-tight text-foreground">{title}</div>}
        {description && <div className="max-w-md text-sm leading-6 text-muted-foreground">{description}</div>}
      </div>
      {(action || extra) ? <div className="flex flex-wrap items-center justify-center gap-2">{action}{extra}</div> : null}
    </div>
  )
}

export type InlineStateProps = Omit<PageStateProps, "compact"> & {
  retryLabel?: React.ReactNode
  onRetry?: () => void
}

function InlineState({ retryLabel = "Retry", onRetry, action, className, ...props }: InlineStateProps) {
  return (
    <PageState
      compact
      className={cn("min-h-0", className)}
      action={action ?? (onRetry ? <Button type="button" variant="outline" size="sm" onClick={onRetry}>{retryLabel}</Button> : undefined)}
      {...props}
    />
  )
}

export { InlineState, PageState }
