import * as React from "react"
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react"
import type { Column } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type DataTableSortableHeaderProps<TData, TValue> = React.ComponentProps<"div"> & {
  column: Column<TData, TValue>
  children?: React.ReactNode
  label?: React.ReactNode
  disabled?: boolean
  buttonClassName?: string
}

function DataTableSortableHeader<TData, TValue>({
  className,
  column,
  children,
  label,
  disabled,
  buttonClassName,
  ...props
}: DataTableSortableHeaderProps<TData, TValue>) {
  const sorted = column.getIsSorted()
  const Icon = sorted === "asc" ? ArrowUpIcon : sorted === "desc" ? ArrowDownIcon : ArrowUpDownIcon

  return (
    <div className={cn("flex items-center", className)} {...props}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn("-ml-2 h-8 px-2 font-medium", buttonClassName)}
        disabled={disabled || !column.getCanSort()}
        onClick={() => column.toggleSorting(sorted === "asc")}
      >
        <span>{children ?? label}</span>
        <Icon className="ml-1 size-3.5" />
      </Button>
    </div>
  )
}

export { DataTableSortableHeader }
