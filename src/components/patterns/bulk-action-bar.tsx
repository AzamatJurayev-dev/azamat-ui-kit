import * as React from "react"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type BulkActionBarProps = React.ComponentProps<"div"> & {
  selectedCount: number
  selectedLabel?: (count: number) => React.ReactNode
  actions?: React.ReactNode
  clearLabel?: React.ReactNode
  onClear?: () => void
}

function BulkActionBar({
  className,
  selectedCount,
  selectedLabel = (count) => `${count} selected`,
  actions,
  clearLabel = "Clear",
  onClear,
  children,
  ...props
}: BulkActionBarProps) {
  if (selectedCount <= 0) return null

  return (
    <div
      data-slot="bulk-action-bar"
      className={cn(
        "flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      <div data-slot="bulk-action-bar-count" className="text-sm font-medium">
        {selectedLabel(selectedCount)}
      </div>
      <div data-slot="bulk-action-bar-actions" className="flex flex-wrap items-center gap-2">
        {children}
        {actions}
        {onClear && (
          <Button type="button" variant="ghost" size="sm" onClick={onClear}>
            <XIcon data-icon="inline-start" />
            {clearLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export { BulkActionBar }
