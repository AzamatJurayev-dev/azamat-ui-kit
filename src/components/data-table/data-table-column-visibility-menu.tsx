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
  getColumnLabel = defaultColumnLabel,
}: DataTableColumnVisibilityMenuProps<TData>) {
  const columns = table
    .getAllLeafColumns()
    .filter((column) => column.getCanHide())

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button type="button" variant="outline" size="sm" className={triggerClassName} />
        }
      >
        <Columns3Icon data-icon="inline-start" />
        {triggerLabel ?? label}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        className={cn("min-w-48", contentClassName)}
      >
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
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
