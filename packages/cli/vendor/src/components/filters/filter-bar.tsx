import * as React from "react"
import { SlidersHorizontalIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type FilterBarProps = React.ComponentProps<"div"> & {
  search?: React.ReactNode
  filters?: React.ReactNode
  actions?: React.ReactNode
  activeCount?: number
  activeLabel?: (count: number) => React.ReactNode
  resetLabel?: React.ReactNode
  onReset?: () => void
  collapsible?: boolean
  defaultExpanded?: boolean
}

function FilterBar({
  className,
  search,
  filters,
  actions,
  activeCount = 0,
  activeLabel = (count) => `${count} active`,
  resetLabel = "Reset",
  onReset,
  collapsible = false,
  defaultExpanded = false,
  children,
  ...props
}: FilterBarProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)
  const hasFilters = Boolean(filters || children)
  const shouldShowFilters = !collapsible || expanded

  return (
    <div
      data-slot="filter-bar"
      className={cn("flex flex-col gap-3 rounded-lg border bg-card p-3", className)}
      {...props}
    >
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          {search && <div className="min-w-0 flex-1">{search}</div>}

          {collapsible && hasFilters && (
            <Button
              type="button"
              variant={expanded ? "secondary" : "outline"}
              size="sm"
              onClick={() => setExpanded((value) => !value)}
            >
              <SlidersHorizontalIcon data-icon="inline-start" />
              Filters
              {activeCount > 0 && (
                <span className="ml-1 rounded-full bg-background px-1.5 text-xs">
                  {activeCount}
                </span>
              )}
            </Button>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {activeCount > 0 && (
            <span className="text-sm text-muted-foreground">{activeLabel(activeCount)}</span>
          )}
          {activeCount > 0 && onReset && (
            <Button type="button" variant="ghost" size="sm" onClick={onReset}>
              <XIcon data-icon="inline-start" />
              {resetLabel}
            </Button>
          )}
          {actions}
        </div>
      </div>

      {hasFilters && shouldShowFilters && (
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          {filters}
          {children}
        </div>
      )}
    </div>
  )
}

export { FilterBar }
