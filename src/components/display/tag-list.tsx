import * as React from "react"
import { XIcon } from "lucide-react"

import { Badge, type BadgeProps } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type TagListItem = {
  key: string
  label: React.ReactNode
  tone?: BadgeProps["tone"]
  variant?: BadgeProps["variant"]
  disabled?: boolean
}

export type TagListProps = React.ComponentProps<"div"> & {
  items: TagListItem[]
  max?: number
  removable?: boolean
  onRemove?: (item: TagListItem) => void
  overflowLabel?: (count: number) => React.ReactNode
}

function TagList({ items, max, removable = false, onRemove, overflowLabel = (count) => `+${count}`, className, ...props }: TagListProps) {
  const visibleItems = typeof max === "number" ? items.slice(0, max) : items
  const overflowCount = typeof max === "number" ? Math.max(items.length - max, 0) : 0

  return (
    <div data-slot="tag-list" className={cn("flex flex-wrap items-center gap-1.5", className)} {...props}>
      {visibleItems.map((item) => (
        <Badge
          key={item.key}
          tone={item.tone}
          variant={item.variant}
          className={cn("gap-1", item.disabled && "opacity-55")}
        >
          <span>{item.label}</span>
          {removable && !item.disabled && (
            <button
              type="button"
              aria-label="Remove tag"
              className="rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => onRemove?.(item)}
            >
              <XIcon className="size-3" />
            </button>
          )}
        </Badge>
      ))}
      {overflowCount > 0 && <Badge variant="outline">{overflowLabel(overflowCount)}</Badge>}
    </div>
  )
}

export { TagList }
