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
  meta?: React.ReactNode
  badge?: React.ReactNode
  unread?: boolean
  hidden?: boolean
  interactive?: boolean
  href?: string
  target?: React.ComponentProps<"a">["target"]
  rel?: React.ComponentProps<"a">["rel"]
  onSelect?: () => void
  className?: string
}

export type ActivityFeedProps = React.ComponentProps<typeof Card> & {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  items: ActivityFeedItem[]
  empty?: React.ReactNode
  compact?: boolean
  density?: "comfortable" | "compact"
  showConnector?: boolean
  connectorClassName?: string
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
  density,
  showConnector = true,
  connectorClassName,
  contentClassName,
  itemClassName,
  ...props
}: ActivityFeedProps) {
  const visibleItems = items.filter((item) => !item.hidden)
  const hasHeader = Boolean(title || description || actions)
  const isCompact = density ? density === "compact" : compact

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
          visibleItems.map((item, index) => {
            const isInteractive = item.interactive ?? Boolean(item.href || item.onSelect)
            const content = (
              <>
                <div className={cn(
                  "relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border bg-background",
                  item.unread && "border-primary/45 bg-primary/8 shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary),transparent_88%)]"
                )}>
                  {item.icon ?? <span className={cn("size-2 rounded-full", toneDotClassName[item.tone ?? "default"])} />}
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex min-w-0 items-start justify-between gap-2">
                    <div className="min-w-0 space-y-1">
                      <div className="min-w-0 text-sm font-medium leading-5 text-foreground">{item.title}</div>
                      {item.meta && <div className="text-xs text-muted-foreground">{item.meta}</div>}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {item.badge}
                      {item.time && <div className="text-xs text-muted-foreground">{item.time}</div>}
                    </div>
                  </div>
                  {item.description && <div className="text-sm leading-5 text-muted-foreground">{item.description}</div>}
                  {item.actions && <div className="pt-1">{item.actions}</div>}
                </div>
              </>
            )

            return (
            <div
              key={item.id}
              data-slot="activity-feed-item"
              className={cn("relative flex gap-3 pb-4 last:pb-0", isCompact && "gap-2 pb-3", itemClassName, item.className)}
            >
              {showConnector && index < visibleItems.length - 1 && (
                <div data-slot="activity-feed-connector" className={cn("absolute left-5 top-8 h-[calc(100%-2rem)] w-px bg-border", connectorClassName)} />
              )}
              {item.href ? (
                <a
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  className={cn(
                    "flex min-w-0 flex-1 gap-3 rounded-[var(--radius-lg)] px-2 py-1.5 transition-[background-color,border-color,box-shadow]",
                    isInteractive && "hover:bg-muted/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                  )}
                >
                  {content}
                </a>
              ) : isInteractive ? (
                <button
                  type="button"
                  className="flex min-w-0 flex-1 gap-3 rounded-[var(--radius-lg)] px-2 py-1.5 text-left transition-[background-color,border-color,box-shadow] hover:bg-muted/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                  onClick={item.onSelect}
                >
                  {content}
                </button>
              ) : (
                <div className="flex min-w-0 flex-1 gap-3 px-2 py-1.5">
                  {content}
                </div>
              )}
            </div>
          )})
        )}
      </CardContent>
    </Card>
  )
}

export { ActivityFeed }
