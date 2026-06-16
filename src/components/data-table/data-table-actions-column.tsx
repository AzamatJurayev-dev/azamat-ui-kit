import * as React from "react"
import type { ColumnDef, Row } from "@tanstack/react-table"

import {
  DataTableRowActions,
  type DataTableRowAction,
} from "@/components/data-table/data-table-row-actions"
import { cn } from "@/lib/utils"

export type DataTableActionsColumnOptions<TData> = {
  id?: string
  size?: number
  header?: React.ReactNode
  headerClassName?: string
  cellClassName?: string
  actions?: DataTableRowAction<TData>[]
  getActions?: (row: Row<TData>, original: TData) => DataTableRowAction<TData>[]
  label?: React.ReactNode
  emptyLabel?: React.ReactNode
}

function createDataTableActionsColumn<TData>({
  id = "actions",
  size = 56,
  header,
  headerClassName,
  cellClassName,
  actions,
  getActions,
  label,
  emptyLabel,
}: DataTableActionsColumnOptions<TData>): ColumnDef<TData> {
  return {
    id,
    size,
    enableSorting: false,
    enableHiding: false,
    header: () =>
      header ? (
        <div className={cn("flex items-center justify-end", headerClassName)}>
          {header}
        </div>
      ) : null,
    cell: ({ row }) => (
      <div className={cn("flex items-center justify-end", cellClassName)}>
        <DataTableRowActions
          row={row}
          actions={actions}
          getActions={getActions}
          label={label}
          emptyLabel={emptyLabel}
        />
      </div>
    ),
  }
}

export { createDataTableActionsColumn }
