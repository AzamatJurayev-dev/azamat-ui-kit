import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import {
  ActionMenu,
  type ActionMenuItem,
  type ActionMenuProps,
} from "@/components/actions/action-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type DataTableBulkAction<TData> = Omit<ActionMenuItem, "onSelect"> & {
  onSelect?: (rows: TData[]) => void | Promise<void>
}

export type DataTableBulkActionsProps<TData> = Omit<
  ActionMenuProps,
  "actions" | "trigger"
> & {
  rows: TData[]
  actions: DataTableBulkAction<TData>[]
  label?: React.ReactNode
  selectedLabel?: (count: number) => React.ReactNode
  clearLabel?: React.ReactNode
  onClearSelection?: () => void
  hideWhenEmpty?: boolean
  triggerClassName?: string
}

function DataTableBulkActions<TData>({
  rows,
  actions,
  label = "Bulk actions",
  selectedLabel = (count) => `${count} selected`,
  clearLabel = "Clear",
  onClearSelection,
  hideWhenEmpty = true,
  triggerClassName,
  disabled,
  ...props
}: DataTableBulkActionsProps<TData>) {
  const count = rows.length

  if (hideWhenEmpty && count === 0) {
    return null
  }

  const resolvedActions: ActionMenuItem[] = actions.map((action) => ({
    ...action,
    disabled: action.disabled || count === 0,
    onSelect: action.onSelect ? () => action.onSelect?.(rows) : undefined,
  }))

  return (
    <div data-slot="data-table-bulk-actions" className="flex items-center gap-2">
      <ActionMenu
        label={label}
        actions={resolvedActions}
        disabled={disabled || count === 0}
        trigger={
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled || count === 0}
            className={cn(
              "gap-1.5 border-border/80 bg-background/94 shadow-[0_1px_0_rgba(255,255,255,0.06)]",
              triggerClassName
            )}
          >
            {selectedLabel(count)}
            <ChevronDownIcon className="size-3.5" />
          </Button>
        }
        {...props}
      />

      {onClearSelection && count > 0 && (
        <Button type="button" variant="ghost" size="sm" className="rounded-full" onClick={onClearSelection}>
          {clearLabel}
        </Button>
      )}
    </div>
  )
}

export { DataTableBulkActions }
