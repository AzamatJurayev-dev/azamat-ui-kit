import * as React from "react"

import { SimpleSelect } from "@/components/inputs/simple-select"
import { Pagination, type PaginationLabels } from "@/components/navigation/pagination"
import { cn } from "@/lib/utils"

export type DataTablePaginationLabels = PaginationLabels & {
  rowsPerPage?: React.ReactNode
  pageInfo?: (page: number, pageCount: number, rowCount?: number) => React.ReactNode
}

export type DataTablePaginationProps = React.ComponentProps<"div"> & {
  pageIndex: number
  pageSize: number
  pageCount?: number
  rowCount?: number
  pageSizeOptions?: number[]
  disabled?: boolean
  showPageSize?: boolean
  labels?: DataTablePaginationLabels
  onPageChange?: (pageIndex: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

function getDataTablePageCount(pageSize: number, pageCount?: number, rowCount?: number) {
  if (typeof pageCount === "number") return Math.max(pageCount, 1)
  if (typeof rowCount === "number") return Math.max(Math.ceil(rowCount / pageSize), 1)
  return 1
}

function DataTablePagination({
  className,
  pageIndex,
  pageSize,
  pageCount,
  rowCount,
  pageSizeOptions = [10, 20, 30, 50, 100],
  disabled = false,
  showPageSize = true,
  labels,
  onPageChange,
  onPageSizeChange,
  ...props
}: DataTablePaginationProps) {
  const resolvedPageCount = getDataTablePageCount(pageSize, pageCount, rowCount)
  const currentPage = Math.min(Math.max(pageIndex + 1, 1), resolvedPageCount)

  return (
    <div
      data-slot="data-table-pagination"
      className={cn(
        "flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      <div className="text-sm font-medium text-muted-foreground">
        {labels?.pageInfo?.(currentPage, resolvedPageCount, rowCount) ??
          `Page ${currentPage} of ${resolvedPageCount}`}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {showPageSize && onPageSizeChange && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{labels?.rowsPerPage ?? "Rows per page"}</span>
            <SimpleSelect
              value={String(pageSize)}
              onValueChange={(value) => onPageSizeChange(Number(value))}
              options={pageSizeOptions.map((option) => ({
                label: String(option),
                value: String(option),
              }))}
              disabled={disabled}
              triggerClassName="h-9 w-20 rounded-full border-border/70 bg-background/80 shadow-none"
            />
          </div>
        )}

        <Pagination
          page={currentPage}
          pageCount={resolvedPageCount}
          disabled={disabled}
          labels={labels}
          onPageChange={(nextPage) => onPageChange?.(nextPage - 1)}
        />
      </div>
    </div>
  )
}

export { DataTablePagination, getDataTablePageCount }
