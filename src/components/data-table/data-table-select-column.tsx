import type { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export type DataTableSelectColumnProps<TData> = {
  id?: string
  size?: number
  headerClassName?: string
  cellClassName?: string
  ariaLabel?: {
    selectAll?: string
    selectRow?: (row: TData) => string
  }
}

export type DataTableSelectColumn = <TData>(
  props?: DataTableSelectColumnProps<TData>
) => ColumnDef<TData>

function createDataTableSelectColumn<TData>({
  id = "select",
  size = 40,
  headerClassName,
  cellClassName,
  ariaLabel,
}: DataTableSelectColumnProps<TData> = {}): ColumnDef<TData> {
  return {
    id,
    size,
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <div className={cn("flex items-center justify-center", headerClassName)}>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
                ? "indeterminate"
                : false
          }
          aria-label={ariaLabel?.selectAll ?? "Select all rows"}
          onClick={(event) => event.stopPropagation()}
          onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className={cn("flex items-center justify-center", cellClassName)}>
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          aria-label={ariaLabel?.selectRow?.(row.original) ?? "Select row"}
          onClick={(event) => event.stopPropagation()}
          onCheckedChange={(checked) => row.toggleSelected(checked)}
        />
      </div>
    ),
  }
}

export { createDataTableSelectColumn }
