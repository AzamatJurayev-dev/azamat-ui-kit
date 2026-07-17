import * as React from "react"
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  InfoIcon,
  Loader2Icon,
  SearchXIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type StateViewStatus = "idle" | "loading" | "empty" | "error" | "success" | "info"
export type StateViewTone = "default" | "muted" | "success" | "warning" | "danger" | "info"
export type StateViewVariant = "card" | "plain" | "inline"
export type StateViewSize = "compact" | "default" | "page"

export type StateViewProps = Omit<React.ComponentProps<"div">, "title"> & {
  status?: StateViewStatus
  tone?: StateViewTone
  variant?: StateViewVariant
  size?: StateViewSize
  align?: "start" | "center"
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  badge?: React.ReactNode
  actions?: React.ReactNode
  footer?: React.ReactNode
  query?: React.ReactNode
  retryLabel?: React.ReactNode
  onRetry?: () => void
  clearLabel?: React.ReactNode
  onClear?: () => void
  loadingVariant?: "spinner" | "skeleton" | "progress"
  progress?: number
  slot?: string
}

const defaults: Record<StateViewStatus, { title: string; description: string; icon: React.ReactNode }> = {
  idle: { title: "Ready", description: "No action has started yet.", icon: <CheckCircle2Icon /> },
  loading: { title: "Loading", description: "Please wait while data is being prepared.", icon: <Loader2Icon className="animate-spin" /> },
  empty: { title: "No data", description: "There is nothing to show yet.", icon: <SearchXIcon /> },
  error: { title: "Something went wrong", description: "Try again or check the request.", icon: <AlertTriangleIcon /> },
  success: { title: "Ready", description: "Data loaded successfully.", icon: <CheckCircle2Icon /> },
  info: { title: "Information", description: "Review the information below.", icon: <InfoIcon /> },
}

const toneClassName: Record<StateViewTone, string> = {
  default: "text-muted-foreground",
  muted: "text-muted-foreground",
  success: "text-[color:var(--aui-success,var(--primary))]",
  warning: "text-[color:var(--aui-warning,var(--primary))]",
  danger: "text-destructive",
  info: "text-[color:var(--aui-info,var(--primary))]",
}

function StateView({
  status = "empty",
  tone,
  variant = "card",
  size = "default",
  align = "center",
  title,
  description,
  icon,
  badge,
  actions,
  footer,
  query,
  retryLabel = "Retry",
  onRetry,
  clearLabel = "Clear",
  onClear,
  loadingVariant = "spinner",
  progress,
  slot = "state-view",
  className,
  children,
  ...props
}: StateViewProps) {
  const content = defaults[status]
  const resolvedTone = tone ?? (status === "error" ? "danger" : status === "success" ? "success" : status === "info" ? "info" : "default")
  const compact = size === "compact" || variant === "inline"
  const page = size === "page"
  const skeleton = status === "loading" && loadingVariant === "skeleton"
  const resolvedProgress = typeof progress === "number" ? Math.min(Math.max(progress, 0), 100) : undefined

  return (
    <div
      data-slot={slot}
      data-status={status}
      data-tone={resolvedTone}
      data-variant={variant}
      data-size={size}
      role={status === "error" ? "alert" : "status"}
      aria-live={status === "error" ? "assertive" : "polite"}
      aria-busy={status === "loading" || undefined}
      className={cn(
        "flex min-w-0 flex-col justify-center",
        align === "center" ? "items-center text-center" : "items-start text-left",
        variant === "card" && "rounded-[var(--aui-card-radius,var(--radius-lg))] border border-[color:var(--aui-card-border,var(--border))] bg-card text-card-foreground shadow-[var(--aui-card-shadow,var(--aui-shadow-xs))]",
        variant === "inline" && "rounded-[var(--radius-md)] border border-border/70 bg-muted/20",
        compact ? "gap-2 p-4" : page ? "min-h-72 gap-4 p-10" : "min-h-52 gap-3 p-8",
        className
      )}
      {...props}
    >
      {skeleton ? (
        <div data-slot="state-view-skeleton" className="grid w-full max-w-sm gap-3" aria-hidden="true">
          <div className="h-4 w-2/5 animate-pulse rounded bg-muted" />
          <div className="h-20 w-full animate-pulse rounded-[var(--radius-lg)] bg-muted/70" />
        </div>
      ) : (
        <div
          data-slot="state-view-icon"
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full border border-border/70 bg-muted/45 [&_svg]:size-5",
            toneClassName[resolvedTone],
            compact ? "size-9" : "size-12"
          )}
        >
          {icon ?? content.icon}
        </div>
      )}

      <div data-slot="state-view-content" className="grid max-w-md gap-1">
        <div className={cn("flex flex-wrap items-center gap-2", align === "center" && "justify-center")}>
          {(title ?? content.title) ? <div data-slot="state-view-title" className={cn("font-semibold tracking-tight text-foreground", compact ? "text-sm" : "text-base")}>{title ?? content.title}</div> : null}
          {badge}
        </div>
        {(description ?? content.description) ? <p data-slot="state-view-description" className="text-sm leading-6 text-muted-foreground">{description ?? content.description}</p> : null}
      </div>

      {query ? <div data-slot="state-view-query" className="max-w-full rounded-md border border-border/70 bg-muted/45 px-2.5 py-1 text-sm text-muted-foreground">{query}</div> : null}
      {children ? <div data-slot="state-view-body" className="w-full">{children}</div> : null}

      {status === "loading" && loadingVariant === "progress" && resolvedProgress !== undefined ? (
        <div data-slot="state-view-progress" className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-muted/80" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={resolvedProgress}>
          <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${resolvedProgress}%` }} />
        </div>
      ) : null}

      {(actions || onRetry || onClear) ? (
        <div data-slot="state-view-actions" className={cn("flex flex-wrap gap-2", align === "center" && "justify-center")}>
          {onRetry ? <Button type="button" size="sm" variant={status === "error" ? "default" : "outline"} onClick={onRetry}>{retryLabel}</Button> : null}
          {onClear ? <Button type="button" size="sm" variant="ghost" onClick={onClear}><XIcon data-icon="inline-start" />{clearLabel}</Button> : null}
          {actions}
        </div>
      ) : null}
      {footer ? <div data-slot="state-view-footer" className="w-full">{footer}</div> : null}
    </div>
  )
}

export { StateView }
