import * as React from "react"
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, TriangleAlertIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type AlertTone = "info" | "success" | "warning" | "destructive" | "muted"

export type AlertProps = React.ComponentProps<"div"> & {
  tone?: AlertTone
  variant?: "soft" | "outline" | "solid"
  size?: "sm" | "md"
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  action?: React.ReactNode
  dismissible?: boolean
  dismissLabel?: string
  onDismiss?: () => void
  actionsAlign?: "start" | "end"
}

const alertToneClassName: Record<AlertTone, Record<NonNullable<AlertProps["variant"]>, string>> = {
  info: {
    soft: "border-primary/25 bg-primary/5 text-foreground",
    outline: "border-primary/35 bg-background text-foreground",
    solid: "border-primary bg-primary text-primary-foreground",
  },
  success: {
    soft: "border-emerald-500/25 bg-emerald-500/10 text-foreground",
    outline: "border-emerald-500/35 bg-background text-foreground",
    solid: "border-emerald-600 bg-emerald-600 text-white",
  },
  warning: {
    soft: "border-amber-500/30 bg-amber-500/10 text-foreground",
    outline: "border-amber-500/35 bg-background text-foreground",
    solid: "border-amber-500 bg-amber-500 text-amber-950",
  },
  destructive: {
    soft: "border-destructive/30 bg-destructive/10 text-foreground",
    outline: "border-destructive/35 bg-background text-foreground",
    solid: "border-destructive bg-destructive text-destructive-foreground",
  },
  muted: {
    soft: "border-border bg-muted/50 text-foreground",
    outline: "border-border bg-background text-foreground",
    solid: "border-border bg-foreground text-background",
  },
}

const alertIconClassName: Record<AlertTone, string> = {
  info: "text-primary",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  destructive: "text-destructive",
  muted: "text-muted-foreground",
}

function defaultIcon(tone: AlertTone) {
  switch (tone) {
    case "success":
      return <CheckCircle2Icon className="size-4" />
    case "warning":
      return <TriangleAlertIcon className="size-4" />
    case "destructive":
      return <AlertCircleIcon className="size-4" />
    default:
      return <InfoIcon className="size-4" />
  }
}

function Alert({
  tone = "info",
  variant = "soft",
  size = "md",
  title,
  description,
  icon,
  action,
  dismissible = false,
  dismissLabel = "Dismiss alert",
  onDismiss,
  actionsAlign = "end",
  className,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      data-slot="alert"
      data-size={size}
      role={tone === "destructive" || tone === "warning" ? "alert" : "status"}
      className={cn(
        "flex min-w-0 gap-3 rounded-[var(--aui-card-radius,var(--radius-xl))] border p-4 text-sm shadow-[var(--aui-card-shadow,var(--aui-control-shadow,0_1px_0_rgba(255,255,255,0.05)))] data-[size=sm]:p-3",
        alertToneClassName[tone][variant],
        className
      )}
      {...props}
    >
      <div
        data-slot="alert-icon"
        className={cn(
          "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-current/10 bg-background/55",
          variant === "solid" && "bg-white/12 text-current",
          alertIconClassName[tone]
        )}
      >
        {icon ?? defaultIcon(tone)}
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        {title && <div data-slot="alert-title" className="max-w-full break-words font-medium leading-snug">{title}</div>}
        {(description || children) && (
          <div data-slot="alert-description" className={cn("max-w-full break-words leading-snug text-muted-foreground", variant === "solid" && "text-current/88")}>
            {description ?? children}
          </div>
        )}
      </div>
      {(action || dismissible) ? (
        <div data-slot="alert-action" className={cn("flex shrink-0 items-start gap-2", actionsAlign === "start" && "order-[-1] mr-2")}>
          {action}
          {dismissible ? (
            <button
              type="button"
              aria-label={dismissLabel}
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-full border border-current/10 bg-background/45 text-current transition-opacity hover:opacity-90",
                variant === "solid" && "bg-white/12"
              )}
              onClick={onDismiss}
            >
              <span aria-hidden="true">×</span>
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export { Alert }
