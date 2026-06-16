import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type Row,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"

import { DataTablePagination, type DataTablePaginationProps } from "@/components/data-table/data-table-pagination"
import { DataTableToolbar, type DataTableToolbarProps } from "@/components/data-table/data-table-toolbar"
import { EmptyState, type EmptyStateProps } from "@/components/feedback/empty-state"
import { LoadingState, type LoadingStateProps } from "@/components/feedback/loading-state"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export type DataTablePaginationConfig = Pick<
  DataTablePaginationProps,
  | "pageIndex"
  | "pageSize"
  | "pageCount"
  | "rowCount"
  | "pageSizeOptions"
  | "labels"
  | "showPageSize"
> & {
  manual?: boolean
  hidden?: boolean
  onPageChange?: (pageIndex: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

export type DataTableProps<TData, TValue = unknown> = Omit<
  React.ComponentProps<"div">,
  "children"
> & {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string
  isLoading?: boolean
  isError?: boolean
  emptyState?: EmptyStateProps
  errorState?: EmptyStateProps
  loadingState?: LoadingStateProps
  toolbar?: React.ReactNode
  toolbarProps?: DataTableToolbarProps
  pagination?: DataTablePaginationConfig | false
  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
  columnVisibility?: VisibilityState
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>
  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean)
  renderMobileCard?: (row: Row<TData>) => React.ReactNode
  onRowClick?: (row: Row<TData>) => void
  tableClassName?: string
  tableWrapperClassName?: string
  rowClassName?: string | ((row: Row<TData>) => string)
}

function getRowClassName<TData>(
  row: Row<TData>,
  rowClassName?: string | ((row: Row<TData>) => string)
) {
  return typeof rowClassName === "function" ? rowClassName(row) : rowClassName
}

function DataTable<TData, TValue = unknown>({
  className,
  columns,
  data,
  getRowId,
  isLoading = false,
  isError = false,
  emptyState,
  errorState,
  loadingState,
  toolbar,
  toolbarProps,
  pagination,
  sorting,
  onSortingChange,
  columnVisibility,
  onColumnVisibilityChange,
  rowSelection,
  onRowSelectionChange,
  enableRowSelection,
  renderMobileCard,
  onRowClick,
  tableClassName,
  tableWrapperClassName,
  rowClassName,
  ...props
}: DataTableProps<TData, TValue>) {
  const paginationConfig = pagination === false ? undefined : pagination
  const controlledPagination = paginationConfig
    ? {
        pageIndex: paginationConfig.pageIndex,
        pageSize: paginationConfig.pageSize,
      }
    : undefined
  const manualPagination = Boolean(paginationConfig && paginationConfig.manual !== false)
  const selectedRowCount = rowSelection ? Object.keys(rowSelection).length : 0

  const table = useReactTable({
    data,
    columns,
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: paginationConfig && !manualPagination ? getPaginationRowModel() : undefined,
    manualPagination,
    pageCount: paginationConfig?.pageCount,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination: controlledPagination,
    },
    onSortingChange,
    onColumnVisibilityChange,
    onRowSelectionChange,
    enableRowSelection,
  })

  const rows = table.getRowModel().rows
  const visibleColumnCount = Math.max(table.getVisibleLeafColumns().length, 1)
  const hasToolbar = Boolean(toolbar || toolbarProps)
  const showPagination = Boolean(paginationConfig && !paginationConfig.hidden)

  const renderStateRow = (children: React.ReactNode) => (
    <TableRow>
      <TableCell colSpan={visibleColumnCount} className="p-0">
        {children}
      </TableCell>
    </TableRow>
  )

  const stateContent = isLoading ? (
    <LoadingState label="Loading data..." {...loadingState} />
  ) : isError ? (
    <EmptyState title="Could not load data" description="Please try again." {...errorState} />
  ) : rows.length === 0 ? (
    <EmptyState {...emptyState} />
  ) : null

  return (
    <div data-slot="data-table" className={cn("grid gap-3", className)} {...props}>
      {hasToolbar &&
        (toolbar ?? (
          <DataTableToolbar
            selectedCount={selectedRowCount}
            totalCount={paginationConfig ? paginationConfig.rowCount ?? data.length : data.length}
            {...toolbarProps}
          />
        ))}

      {renderMobileCard && (
        <div className="grid gap-3 md:hidden">
          {stateContent ?? rows.map((row) => <React.Fragment key={row.id}>{renderMobileCard(row)}</React.Fragment>)}
        </div>
      )}

      <div
        data-slot="data-table-wrapper"
        className={cn(
          "overflow-hidden rounded-lg border bg-background",
          renderMobileCard && "hidden md:block",
          tableWrapperClassName
        )}
      >
        <Table className={tableClassName}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} style={{ width: header.getSize() }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {stateContent
              ? renderStateRow(stateContent)
              : rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                    className={cn(onRowClick && "cursor-pointer", getRowClassName(row, rowClassName))}
                    onClick={() => onRowClick?.(row)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        {showPagination && paginationConfig && (
          <DataTablePagination
            pageIndex={paginationConfig.pageIndex}
            pageSize={paginationConfig.pageSize}
            pageCount={paginationConfig.pageCount}
            rowCount={paginationConfig.rowCount}
            pageSizeOptions={paginationConfig.pageSizeOptions}
            showPageSize={paginationConfig.showPageSize}
            labels={paginationConfig.labels}
            disabled={isLoading}
            onPageChange={paginationConfig.onPageChange}
            onPageSizeChange={paginationConfig.onPageSizeChange}
          />
        )}
      </div>
    </div>
  )
}

export { DataTable }
