import * as React from "react"
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, ShieldAlertIcon, TriangleAlertIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ResultStatus = "success" | "error" | "warning" | "info" | "not-found" | "forbidden" | "server-error"

export type ResultProps = React.ComponentProps<"div"> & {
  status?: ResultStatus
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  extra?: React.ReactNode
  compact?: boolean
  iconClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

const statusIcon: Record<ResultStatus, React.ReactNode> = {
  success: <CheckCircle2Icon className="size-8" />,
  error: <AlertCircleIcon className="size-8" />,
  warning: <TriangleAlertIcon className="size-8" />,
  info: <InfoIcon className="size-8" />,
  "not-found": <InfoIcon className="size-8" />,
  forbidden: <ShieldAlertIcon className="size-8" />,
  "server-error": <AlertCircleIcon className="size-8" />,
}

const statusClassName: Record<ResultStatus, string> = {
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  error: "bg-destructive/10 text-destructive",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  info: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "not-found": "bg-muted text-muted-foreground",
  forbidden: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "server-error": "bg-destructive/10 text-destructive",
}

const defaultTitle: Record<ResultStatus, React.ReactNode> = {
  success: "Success",
  error: "Something went wrong",
  warning: "Check this action",
  info: "Information",
  "not-found": "Page not found",
  forbidden: "Access forbidden",
  "server-error": "Server error",
}

function Result({
  status = "info",
  icon,
  title,
  description,
  actions,
  extra,
  compact = false,
  iconClassName,
  titleClassName,
  descriptionClassName,
  className,
  ...props
}: ResultProps) {
  return (
    <div
      data-slot="result"
      data-status={status}
      className={cn("flex flex-col items-center justify-center text-center", compact ? "gap-3 p-4" : "gap-4 p-8", className)}
      {...props}
    >
      <div className={cn("flex items-center justify-center rounded-full", compact ? "size-12" : "size-16", statusClassName[status], iconClassName)}>
        {icon ?? statusIcon[status]}
      </div>
      <div className="max-w-lg space-y-2">
        <h3 className={cn("font-semibold tracking-tight", compact ? "text-base" : "text-2xl", titleClassName)}>{title ?? defaultTitle[status]}</h3>
        {description && <p className={cn("text-sm leading-6 text-muted-foreground", descriptionClassName)}>{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap justify-center gap-2">{actions}</div>}
      {extra && <div className="w-full max-w-2xl">{extra}</div>}
    </div>
  )
}

function ResultAction({ className, ...props }: React.ComponentProps<typeof Button>) {
  return <Button className={cn("min-w-28", className)} {...props} />
}

export { Result, ResultAction }
