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
        "flex min-h-52 flex-col items-center justify-center gap-4 rounded-[var(--radius-3xl)] border border-dashed border-border/80 bg-muted/25 p-10 text-center shadow-sm ring-1 ring-foreground/4",
        className
      )}
      {...props}
    >
      <div className="flex size-12 items-center justify-center rounded-full border border-border/70 bg-background/92 text-muted-foreground shadow-[0_1px_0_rgba(255,255,255,0.08)]">
        {icon ?? <InboxIcon className="size-5" />}
      </div>

      <div className="grid gap-1.5">
        {title && <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>}
        {description && (
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>
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
