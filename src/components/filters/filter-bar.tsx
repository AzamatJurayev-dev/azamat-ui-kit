import * as React from "react"
import { SlidersHorizontalIcon, XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn, stopInteractivePropagation } from "@/lib/utils"

export type FilterBarChip = {
  key: string
  label: React.ReactNode
  value?: React.ReactNode
  tone?: "default" | "success" | "warning" | "danger" | "info" | "muted"
  disabled?: boolean
  hidden?: boolean
}

export type FilterBarProps = React.ComponentProps<"div"> & {
  search?: React.ReactNode
  filters?: React.ReactNode
  actions?: React.ReactNode
  chips?: FilterBarChip[]
  activeCount?: number
  activeLabel?: (count: number) => React.ReactNode
  resetLabel?: React.ReactNode
  clearChipLabel?: React.ReactNode
  onReset?: () => void
  onRemoveChip?: (key: string) => void
  collapsible?: boolean
  defaultExpanded?: boolean
  emptyChips?: React.ReactNode
  chipLimit?: number
  chipOverflowLabel?: (hiddenCount: number) => React.ReactNode
}

const chipVariant: Record<NonNullable<FilterBarChip["tone"]>, React.ComponentProps<typeof Badge>["variant"]> = {
  default: "secondary",
  success: "secondary",
  warning: "outline",
  danger: "destructive",
  info: "outline",
  muted: "outline",
}

function FilterBar({
  className,
  search,
  filters,
  actions,
  chips,
  activeCount,
  activeLabel = (count) => `${count} active`,
  resetLabel = "Reset",
  clearChipLabel,
  onReset,
  onRemoveChip,
  collapsible = false,
  defaultExpanded = false,
  emptyChips,
  chipLimit,
  chipOverflowLabel = (hiddenCount) => `+${hiddenCount} more`,
  children,
  ...props
}: FilterBarProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)
  const visibleChips = chips?.filter((chip) => !chip.hidden) ?? []
  const renderedChips = chipLimit && chipLimit > 0 ? visibleChips.slice(0, chipLimit) : visibleChips
  const hiddenChipCount = Math.max(visibleChips.length - renderedChips.length, 0)
  const resolvedActiveCount = activeCount ?? visibleChips.length
  const hasFilters = Boolean(filters || children)
  const hasChips = Boolean(chips)
  const shouldShowFilters = !collapsible || expanded
  const shouldShowChipRow = visibleChips.length > 0 || (hasChips && emptyChips)

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
              {resolvedActiveCount > 0 && (
                <span className="ml-1 rounded-full bg-background px-1.5 text-xs">
                  {resolvedActiveCount}
                </span>
              )}
            </Button>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {resolvedActiveCount > 0 && (
            <span className="text-sm text-muted-foreground">{activeLabel(resolvedActiveCount)}</span>
          )}
          {resolvedActiveCount > 0 && onReset && (
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

      {shouldShowChipRow && (
        <div data-slot="filter-bar-chips" className="flex flex-wrap items-center gap-2">
          {visibleChips.length > 0 ? (
            <>
              {renderedChips.map((chip) => (
              <Badge key={chip.key} variant={chipVariant[chip.tone ?? "default"]} className={cn("gap-1.5", chip.disabled && "opacity-60")}>
                <span>{chip.label}</span>
                {chip.value !== undefined && <span className="text-muted-foreground">{chip.value}</span>}
                {onRemoveChip && !chip.disabled && (
                  <button
                    type="button"
                    aria-label={typeof clearChipLabel === "string" ? clearChipLabel : "Remove filter"}
                    className="rounded-full p-0.5 hover:bg-muted"
                    onClick={(event) => {
                      stopInteractivePropagation(event)
                      onRemoveChip(chip.key)
                    }}
                    onMouseDown={stopInteractivePropagation}
                    onDoubleClick={stopInteractivePropagation}
                  >
                    <XIcon className="size-3" />
                  </button>
                )}
              </Badge>
              ))}
              {hiddenChipCount > 0 ? (
                <Badge variant="outline">{chipOverflowLabel(hiddenChipCount)}</Badge>
              ) : null}
            </>
          ) : (
            <span className="text-sm text-muted-foreground">{emptyChips}</span>
          )}
        </div>
      )}
    </div>
  )
}

export { FilterBar }
