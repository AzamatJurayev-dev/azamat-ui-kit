import * as React from "react"
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, TriangleAlertIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type AlertTone = "info" | "success" | "warning" | "destructive" | "muted"

export type AlertProps = React.ComponentProps<"div"> & {
  tone?: AlertTone
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  action?: React.ReactNode
}

const alertToneClassName: Record<AlertTone, string> = {
  info: "border-primary/25 bg-primary/5 text-foreground",
  success: "border-emerald-500/25 bg-emerald-500/10 text-foreground",
  warning: "border-amber-500/30 bg-amber-500/10 text-foreground",
  destructive: "border-destructive/30 bg-destructive/10 text-foreground",
  muted: "border-border bg-muted/50 text-foreground",
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

function Alert({ tone = "info", title, description, icon, action, className, children, ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      role={tone === "destructive" || tone === "warning" ? "alert" : "status"}
      className={cn(
        "flex gap-3 rounded-[var(--radius-2xl)] border p-4 text-sm shadow-[0_1px_0_rgba(255,255,255,0.05)]",
        alertToneClassName[tone],
        className
      )}
      {...props}
    >
      <div
        data-slot="alert-icon"
        className={cn(
          "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-current/10 bg-background/55",
          alertIconClassName[tone]
        )}
      >
        {icon ?? defaultIcon(tone)}
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        {title && <div data-slot="alert-title" className="font-medium leading-none">{title}</div>}
        {(description || children) && (
          <div data-slot="alert-description" className="text-muted-foreground">
            {description ?? children}
          </div>
        )}
      </div>
      {action && <div data-slot="alert-action" className="shrink-0">{action}</div>}
    </div>
  )
}

export { Alert }
