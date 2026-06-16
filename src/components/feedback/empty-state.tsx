import * as React from "react"
import { InboxIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type EmptyStateProps = React.ComponentProps<"div"> & {
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  actionLabel?: React.ReactNode
  onAction?: () => void
}

function EmptyState({
  className,
  icon,
  title = "No data",
  description,
  action,
  actionLabel,
  onAction,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex min-h-48 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-8 text-center",
        className
      )}
      {...props}
    >
      <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
        {icon ?? <InboxIcon className="size-5" />}
      </div>

      <div className="grid gap-1">
        {title && <h3 className="text-sm font-medium text-foreground">{title}</h3>}
        {description && (
          <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {action ??
        (actionLabel && onAction ? (
          <Button type="button" variant="outline" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null)}
    </div>
  )
}

export { EmptyState }
