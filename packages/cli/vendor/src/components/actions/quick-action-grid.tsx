import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type QuickActionGridColumn = 1 | 2 | 3 | 4

export type QuickActionGridItem = {
  key: string
  label: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  badge?: React.ReactNode
  disabled?: boolean
  hidden?: boolean
  href?: string
  external?: boolean
  onSelect?: () => void
  className?: string
}

export type QuickActionGridProps = React.ComponentProps<"div"> & {
  items: QuickActionGridItem[]
  columns?: QuickActionGridColumn
  compact?: boolean
  itemClassName?: string
  renderLink?: (props: React.ComponentProps<"a"> & { item: QuickActionGridItem; [key: `data-${string}`]: string | boolean | undefined }) => React.ReactNode
}

const columnsClassName: Record<QuickActionGridColumn, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
}

function QuickActionGrid({
  items,
  columns = 3,
  compact = false,
  itemClassName,
  renderLink,
  className,
  ...props
}: QuickActionGridProps) {
  const visibleItems = items.filter((item) => !item.hidden)

  return (
    <div data-slot="quick-action-grid" className={cn("grid gap-3", columnsClassName[columns], className)} {...props}>
      {visibleItems.map((item) => {
        const content = (
          <>
            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                {item.icon && <span className="mt-0.5 shrink-0 rounded-lg bg-muted p-2 text-muted-foreground [&_svg]:size-4">{item.icon}</span>}
                <div className="min-w-0 space-y-1">
                  <div className="truncate text-sm font-medium text-foreground">{item.label}</div>
                  {item.description && <div className="line-clamp-2 text-xs leading-5 text-muted-foreground">{item.description}</div>}
                </div>
              </div>
              {item.badge && <Badge variant="outline" className="shrink-0 text-[10px]">{item.badge}</Badge>}
            </div>
          </>
        )

        const commonClassName = cn(
          "min-w-0 rounded-xl border bg-card text-left text-card-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-muted/20",
          compact ? "p-3" : "p-4",
          item.disabled && "pointer-events-none opacity-55",
          itemClassName,
          item.className
        )

        const isInternalLink = item.href?.startsWith("/")

        if (item.href && isInternalLink) {
          return (
            renderLink ? (
              <React.Fragment key={item.key}>
                {renderLink({
                  item,
                  href: item.href,
                  "data-slot": "quick-action-grid-item",
                  "aria-disabled": item.disabled || undefined,
                  className: commonClassName,
                  onClick: (event) => {
                    if (item.disabled) {
                      event.preventDefault()
                      return
                    }
                    item.onSelect?.()
                  },
                  children: content,
                })}
              </React.Fragment>
            ) : (
              <a
                key={item.key}
                data-slot="quick-action-grid-item"
                href={item.href}
                aria-disabled={item.disabled || undefined}
                className={commonClassName}
                onClick={(event) => {
                  if (item.disabled) {
                    event.preventDefault()
                    return
                  }
                  item.onSelect?.()
                }}
              >
                {content}
              </a>
            )
          )
        }

        if (item.href) {
          return (
            <button
              key={item.key}
              data-slot="quick-action-grid-item"
              type="button"
              aria-disabled={item.disabled || undefined}
              className={commonClassName}
              onClick={() => {
                if (item.disabled) return
                item.onSelect?.()

                const href = item.href
                if (!href) return

                if (item.external) {
                  window.open(href, "_blank", "noopener,noreferrer")
                  return
                }

                window.location.assign(href)
              }}
            >
              {content}
            </button>
          )
        }

        return (
          <button
            key={item.key}
            data-slot="quick-action-grid-item"
            type="button"
            disabled={item.disabled}
            className={commonClassName}
            onClick={item.onSelect}
          >
            {content}
          </button>
        )
      })}
    </div>
  )
}

export { QuickActionGrid }
