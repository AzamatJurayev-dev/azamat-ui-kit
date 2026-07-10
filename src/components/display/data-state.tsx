import * as React from "react"
import { AlertTriangleIcon, CheckCircle2Icon, Loader2Icon, SearchXIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type DataStateStatus = "idle" | "loading" | "empty" | "error" | "success"
export type DataStateVariant = "card" | "plain" | "inline"
export type DataStateTone = "default" | "muted" | "success" | "warning" | "danger" | "info"

export type DataStateProps = Omit<React.ComponentProps<typeof Card>, "content" | "title" | "description" | "variant" | "tone"> & {
  status: DataStateStatus
  title?: React.ReactNode
  description?: React.ReactNode
  badge?: React.ReactNode
  actions?: React.ReactNode
  footer?: React.ReactNode
  icon?: React.ReactNode
  tone?: DataStateTone
  variant?: DataStateVariant
  compact?: boolean
  align?: "start" | "center"
  query?: React.ReactNode
  children?: React.ReactNode
  retryLabel?: React.ReactNode
  onRetry?: () => void
  clearLabel?: React.ReactNode
  onClear?: () => void
}

const defaultContent: Record<DataStateStatus, { title: string; description: string; icon: React.ReactNode }> = {
  idle: { title: "Ready", description: "No action has started yet.", icon: <CheckCircle2Icon /> },
  loading: { title: "Loading", description: "Please wait while data is being prepared.", icon: <Loader2Icon className="animate-spin" /> },
  empty: { title: "No data", description: "There is nothing to show yet.", icon: <SearchXIcon /> },
  error: { title: "Something went wrong", description: "Try again or check the request.", icon: <AlertTriangleIcon /> },
  success: { title: "Ready", description: "Data loaded successfully.", icon: <CheckCircle2Icon /> },
}

const toneClassName: Record<DataStateTone, string> = {
  default: "text-muted-foreground",
  muted: "text-muted-foreground",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  danger: "text-destructive",
  info: "text-blue-600 dark:text-blue-400",
}

function DataState({
  status,
  title,
  description,
  badge,
  actions,
  footer,
  icon,
  tone,
  variant = "card",
  compact = false,
  align = "center",
  query,
  children,
  retryLabel = "Retry",
  onRetry,
  clearLabel = "Clear",
  onClear,
  className,
  ...props
}: DataStateProps) {
  const content = defaultContent[status]
  const resolvedTone = tone ?? (status === "error" ? "danger" : status === "success" ? "success" : "default")
  const isPlain = variant === "plain" || variant === "inline"
  const body = (
    <div
      className={cn(
        "flex flex-col justify-center",
        align === "center" ? "items-center text-center" : "items-start text-left",
        compact || variant === "inline" ? "p-4" : "min-h-52 p-8"
      )}
    >
      <div
        className={cn(
          "mb-3 flex items-center justify-center rounded-full border border-border/70 bg-muted/45 shadow-[0_1px_0_rgba(255,255,255,0.05)] [&_svg]:size-5",
          toneClassName[resolvedTone],
          compact || variant === "inline" ? "size-9" : "size-12"
        )}
      >
        {icon ?? content.icon}
      </div>
      <div className={cn("flex flex-wrap items-center gap-2", align === "center" ? "justify-center" : "justify-start")}>
        <div className={cn("font-semibold tracking-tight text-foreground", compact ? "text-sm" : "text-base")}>{title ?? content.title}</div>
        {badge}
      </div>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">{description ?? content.description}</p>
      {query && (
        <div className="mt-3 max-w-full rounded-md border border-border/70 bg-muted/45 px-2.5 py-1 text-sm text-muted-foreground">
          {query}
        </div>
      )}
      {children && <div className="mt-4 w-full">{children}</div>}
      {(actions || onRetry || onClear) && (
        <div className={cn("mt-4 flex flex-wrap gap-2", align === "center" ? "justify-center" : "justify-start")}>
          {onRetry && <Button size="sm" variant={status === "error" ? "default" : "outline"} onClick={onRetry}>{retryLabel}</Button>}
          {onClear && (
            <Button size="sm" variant="ghost" onClick={onClear}>
              <XIcon data-icon="inline-start" />
              {clearLabel}
            </Button>
          )}
          {actions}
        </div>
      )}
      {footer ? <div className="mt-4 w-full">{footer}</div> : null}
    </div>
  )

  if (isPlain) {
    return (
      <div
        data-slot="data-state"
        data-status={status}
        data-variant={variant}
        className={cn(variant === "inline" ? "rounded-lg border border-border/70 bg-muted/20" : "min-w-0", className)}
        {...props}
      >
        {body}
      </div>
    )
  }

  return (
    <Card
      data-slot="data-state"
      data-status={status}
      data-variant={variant}
      className={cn("min-w-0 border-border/75 bg-card/96 shadow-sm ring-1 ring-foreground/4", className)}
      {...props}
    >
      <CardContent className="p-0">{body}</CardContent>
    </Card>
  )
}

export { DataState }
