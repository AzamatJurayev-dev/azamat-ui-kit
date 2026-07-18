import * as React from "react"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type TimelineTone = "default" | "success" | "info" | "warning" | "danger" | "muted"
export type TimelineOrientation = "vertical" | "horizontal"

export type TimelineItem = {
  key: string
  title?: React.ReactNode
  description?: React.ReactNode
  time?: React.ReactNode
  icon?: React.ReactNode
  tone?: TimelineTone
  content?: React.ReactNode
  actions?: React.ReactNode
  hidden?: boolean
  className?: string
}

export type TimelineProps = React.ComponentProps<"div"> & {
  items: TimelineItem[]
  orientation?: TimelineOrientation
  pending?: boolean
  pendingLabel?: React.ReactNode
  compact?: boolean
  itemClassName?: string
}

const dotClassName: Record<TimelineTone, string> = {
  default: "border-primary bg-primary text-primary-foreground",
  success: "border-emerald-500 bg-emerald-500 text-white",
  info: "border-blue-500 bg-blue-500 text-white",
  warning: "border-amber-500 bg-amber-500 text-white",
  danger: "border-destructive bg-destructive text-destructive-foreground",
  muted: "border-muted-foreground bg-muted-foreground text-background",
}

function Timeline({
  items,
  orientation = "vertical",
  pending = false,
  pendingLabel = "Pending",
  compact = false,
  itemClassName,
  className,
  ...props
}: TimelineProps) {
  const visibleItems = items.filter((item) => !item.hidden)

  if (orientation === "horizontal") {
    return (
      <div data-slot="timeline" data-orientation="horizontal" className={cn("overflow-x-auto", className)} {...props}>
        <div className="flex min-w-max gap-3 pb-1">
          {visibleItems.map((item) => (
            <TimelineHorizontalItem key={item.key} item={item} compact={compact} className={itemClassName} />
          ))}
          {pending && <TimelineHorizontalItem item={{ key: "pending", title: pendingLabel, tone: "muted" }} compact={compact} className={itemClassName} />}
        </div>
      </div>
    )
  }

  return (
    <div data-slot="timeline" data-orientation="vertical" className={cn("grid gap-0", className)} {...props}>
      {visibleItems.map((item, index) => (
        <TimelineVerticalItem
          key={item.key}
          item={item}
          compact={compact}
          className={itemClassName}
          isLast={index === visibleItems.length - 1 && !pending}
        />
      ))}
      {pending && <TimelineVerticalItem item={{ key: "pending", title: pendingLabel, tone: "muted" }} compact={compact} className={itemClassName} isLast />}
    </div>
  )
}

function TimelineDot({ item }: { item: TimelineItem }) {
  const tone = item.tone ?? "default"

  return (
    <span
      data-slot="timeline-dot"
      data-tone={tone}
      className={cn("relative z-10 grid size-7 shrink-0 place-items-center rounded-full border-2 border-background text-[10px] shadow-[0_0_0_1px_var(--border)]", dotClassName[tone])}
    >
      {item.icon ?? <CircleIcon className="size-2 fill-current" />}
    </span>
  )
}

function TimelineVerticalItem({ item, compact, className, isLast }: { item: TimelineItem; compact: boolean; className?: string; isLast?: boolean }) {
  return (
    <div data-slot="timeline-item" className={cn("relative grid grid-cols-[1.75rem_minmax(0,1fr)] gap-3", className, item.className)}>
      <div className="relative flex justify-center">
        <TimelineDot item={item} />
        {!isLast && <div data-slot="timeline-line" className="absolute left-1/2 top-7 h-[calc(100%_-_1.75rem)] w-px -translate-x-1/2 bg-border" />}
      </div>
      <div className={cn("min-w-0 pb-5 pt-0.5", compact && "pb-3")}>
        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            {item.title && <div className="text-sm font-medium text-foreground">{item.title}</div>}
            {item.description && <div className="text-sm text-muted-foreground">{item.description}</div>}
          </div>
          {item.time && <div className="shrink-0 text-xs text-muted-foreground">{item.time}</div>}
        </div>
        {item.content && <div className="mt-2 text-sm text-muted-foreground">{item.content}</div>}
        {item.actions && <div className="mt-2">{item.actions}</div>}
      </div>
    </div>
  )
}

function TimelineHorizontalItem({ item, compact, className }: { item: TimelineItem; compact: boolean; className?: string }) {
  return (
    <div data-slot="timeline-item" className={cn("min-w-48 rounded-xl border bg-card p-3", compact && "min-w-40 p-2", className, item.className)}>
      <div className="mb-3 flex items-center gap-2">
        <TimelineDot item={item} />
        {item.time && <div className="text-xs text-muted-foreground">{item.time}</div>}
      </div>
      {item.title && <div className="text-sm font-medium">{item.title}</div>}
      {item.description && <div className="mt-1 text-xs text-muted-foreground">{item.description}</div>}
      {item.content && <div className="mt-2 text-sm text-muted-foreground">{item.content}</div>}
      {item.actions && <div className="mt-2">{item.actions}</div>}
    </div>
  )
}

export { Timeline }
