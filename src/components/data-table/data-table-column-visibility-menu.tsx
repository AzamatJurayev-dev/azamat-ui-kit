import * as React from "react"
import { Columns3Icon } from "lucide-react"
import type { Table as TanStackTable } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export type DataTableColumnVisibilityMenuProps<TData> = {
  table: TanStackTable<TData>
  label?: React.ReactNode
  triggerLabel?: React.ReactNode
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  triggerClassName?: string
  contentClassName?: string
  emptyLabel?: React.ReactNode
  showCount?: boolean
  triggerAriaLabel?: string
  getColumnLabel?: (columnId: string) => React.ReactNode
}

function defaultColumnLabel(columnId: string) {
  return columnId
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function DataTableColumnVisibilityMenu<TData>({
  table,
  label = "Columns",
  triggerLabel,
  align = "end",
  side = "bottom",
  triggerClassName,
  contentClassName,
  emptyLabel = "No hideable columns",
  showCount = true,
  triggerAriaLabel,
  getColumnLabel = defaultColumnLabel,
}: DataTableColumnVisibilityMenuProps<TData>) {
  const columns = table
    .getAllLeafColumns()
    .filter((column) => column.getCanHide())
  const visibleCount = columns.filter((column) => column.getIsVisible()).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label={triggerAriaLabel ?? "Choose visible columns"}
            className={cn(
              "min-w-0 border-border/80 bg-background/94 px-2.5 shadow-[0_1px_0_rgba(255,255,255,0.06)] hover:border-border hover:bg-accent/70",
              triggerClassName
            )}
          />
        }
      >
        <Columns3Icon data-icon="inline-start" className="size-4 shrink-0" />
        <span className="truncate">{triggerLabel ?? label}</span>
        {showCount && columns.length > 0 ? (
          <span className="ml-0.5 rounded-[var(--radius-sm)] bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            {visibleCount}/{columns.length}
          </span>
        ) : null}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        className={cn(
          "max-h-[min(24rem,var(--radix-dropdown-menu-content-available-height,24rem))] min-w-56 overflow-y-auto rounded-[var(--radius-lg)] border-border/80 bg-popover/98 p-1 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur",
          contentClassName
        )}
      >
        <DropdownMenuLabel className="flex items-center justify-between gap-3">
          <span>{label}</span>
          {showCount ? <span className="text-xs font-normal text-muted-foreground">{visibleCount} visible</span> : null}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.length === 0 ? (
          <DropdownMenuLabel className="py-3 text-sm font-normal text-muted-foreground">{emptyLabel}</DropdownMenuLabel>
        ) : null}
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(Boolean(value))}
          >
            {getColumnLabel(column.id)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { DataTableColumnVisibilityMenu }
