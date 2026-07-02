import * as React from "react"
import { XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn, stopInteractivePropagation } from "@/lib/utils"

export type FilterChip = {
  key: string
  label: React.ReactNode
  value?: React.ReactNode
  tone?: "default" | "success" | "warning" | "danger" | "info" | "muted"
  disabled?: boolean
  hidden?: boolean
}

export type FilterChipsProps = React.ComponentProps<"div"> & {
  chips: FilterChip[]
  clearLabel?: React.ReactNode
  empty?: React.ReactNode
  onRemove?: (key: string) => void
  onClear?: () => void
}

const chipVariant: Record<NonNullable<FilterChip["tone"]>, React.ComponentProps<typeof Badge>["variant"]> = {
  default: "secondary",
  success: "secondary",
  warning: "outline",
  danger: "destructive",
  info: "outline",
  muted: "outline",
}

function FilterChips({
  chips,
  clearLabel = "Clear all",
  empty = "No active filters",
  onRemove,
  onClear,
  className,
  ...props
}: FilterChipsProps) {
  const visibleChips = chips.filter((chip) => !chip.hidden)
  if (!visibleChips.length) {
    return <div data-slot="filter-chips-empty" className={cn("text-sm text-muted-foreground", className)} {...props}>{empty}</div>
  }

  return (
    <div data-slot="filter-chips" className={cn("flex flex-wrap items-center gap-2", className)} {...props}>
      {visibleChips.map((chip) => (
        <Badge key={chip.key} variant={chipVariant[chip.tone ?? "default"]} className={cn("gap-1.5", chip.disabled && "opacity-60")}>
          <span>{chip.label}</span>
          {chip.value !== undefined && <span className="text-muted-foreground">{chip.value}</span>}
          {onRemove && !chip.disabled && (
            <button
              type="button"
              className="rounded-full p-0.5 hover:bg-muted"
              onClick={(event) => {
                stopInteractivePropagation(event)
                onRemove(chip.key)
              }}
              onMouseDown={stopInteractivePropagation}
              onDoubleClick={stopInteractivePropagation}
            >
              <XIcon className="size-3" />
            </button>
          )}
        </Badge>
      ))}
      {onClear && (
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={(event) => {
            stopInteractivePropagation(event)
            onClear()
          }}
          onMouseDown={stopInteractivePropagation}
          onDoubleClick={stopInteractivePropagation}
        >
          {clearLabel}
        </Button>
      )}
    </div>
  )
}

export { FilterChips }
