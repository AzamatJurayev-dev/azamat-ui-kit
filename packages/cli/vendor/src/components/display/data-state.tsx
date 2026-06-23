import * as React from "react"
import { AlertTriangleIcon, CheckCircle2Icon, Loader2Icon, SearchXIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type DataStateStatus = "idle" | "loading" | "empty" | "error" | "success"

export type DataStateProps = React.ComponentProps<typeof Card> & {
  status: DataStateStatus
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  icon?: React.ReactNode
  compact?: boolean
  children?: React.ReactNode
  retryLabel?: React.ReactNode
  onRetry?: () => void
}

const defaultContent: Record<DataStateStatus, { title: string; description: string; icon: React.ReactNode }> = {
  idle: { title: "Ready", description: "No action has started yet.", icon: <CheckCircle2Icon /> },
  loading: { title: "Loading", description: "Please wait while data is being prepared.", icon: <Loader2Icon className="animate-spin" /> },
  empty: { title: "No data", description: "There is nothing to show yet.", icon: <SearchXIcon /> },
  error: { title: "Something went wrong", description: "Try again or check the request.", icon: <AlertTriangleIcon /> },
  success: { title: "Ready", description: "Data loaded successfully.", icon: <CheckCircle2Icon /> },
}

function DataState({
  status,
  title,
  description,
  actions,
  icon,
  compact = false,
  children,
  retryLabel = "Retry",
  onRetry,
  className,
  ...props
}: DataStateProps) {
  const content = defaultContent[status]

  return (
    <Card data-slot="data-state" data-status={status} className={cn("min-w-0", className)} {...props}>
      <CardContent className={cn("flex flex-col items-center justify-center text-center", compact ? "p-4" : "min-h-52 p-8")}>
        <div className={cn("mb-3 flex items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-5", compact ? "size-9" : "size-12")}>{icon ?? content.icon}</div>
        <div className={cn("font-semibold", compact ? "text-sm" : "text-base")}>{title ?? content.title}</div>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">{description ?? content.description}</p>
        {children && <div className="mt-4 w-full">{children}</div>}
        {(actions || onRetry) && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {onRetry && <Button size="sm" variant={status === "error" ? "default" : "outline"} onClick={onRetry}>{retryLabel}</Button>}
            {actions}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { DataState }
