import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type ActivityFeedItem = {
  id: string
  title: React.ReactNode
  description?: React.ReactNode
  time?: React.ReactNode
  icon?: React.ReactNode
  tone?: "default" | "success" | "warning" | "danger" | "info" | "muted"
  actions?: React.ReactNode
  hidden?: boolean
  className?: string
}

export type ActivityFeedProps = React.ComponentProps<typeof Card> & {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  items: ActivityFeedItem[]
  empty?: React.ReactNode
  compact?: boolean
  contentClassName?: string
  itemClassName?: string
}

const toneDotClassName: Record<NonNullable<ActivityFeedItem["tone"]>, string> = {
  default: "bg-primary",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-destructive",
  info: "bg-blue-500",
  muted: "bg-muted-foreground",
}

function ActivityFeed({
  className,
  title,
  description,
  actions,
  items,
  empty = "No activity yet.",
  compact = false,
  contentClassName,
  itemClassName,
  ...props
}: ActivityFeedProps) {
  const visibleItems = items.filter((item) => !item.hidden)
  const hasHeader = Boolean(title || description || actions)

  return (
    <Card data-slot="activity-feed" className={cn("min-w-0", className)} {...props}>
      {hasHeader && (
        <CardHeader>
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0 space-y-1">
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            {actions && <div className="shrink-0">{actions}</div>}
          </div>
        </CardHeader>
      )}

      <CardContent className={cn("grid gap-0", contentClassName)}>
        {visibleItems.length === 0 ? (
          <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">{empty}</div>
        ) : (
          visibleItems.map((item, index) => (
            <div
              key={item.id}
              data-slot="activity-feed-item"
              className={cn("relative flex gap-3 pb-4 last:pb-0", compact && "gap-2 pb-3", itemClassName, item.className)}
            >
              {index < visibleItems.length - 1 && <div className="absolute left-3 top-7 h-[calc(100%-1.75rem)] w-px bg-border" />}
              <div className="relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border bg-background">
                {item.icon ?? <span className={cn("size-2 rounded-full", toneDotClassName[item.tone ?? "default"])} />}
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex min-w-0 items-start justify-between gap-2">
                  <div className="min-w-0 text-sm font-medium leading-5 text-foreground">{item.title}</div>
                  {item.time && <div className="shrink-0 text-xs text-muted-foreground">{item.time}</div>}
                </div>
                {item.description && <div className="text-sm leading-5 text-muted-foreground">{item.description}</div>}
                {item.actions && <div className="pt-1">{item.actions}</div>}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

export { ActivityFeed }
