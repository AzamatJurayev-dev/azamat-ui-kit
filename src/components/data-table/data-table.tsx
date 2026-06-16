import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type Cell,
  type ColumnDef,
  type Header,
  type OnChangeFn,
  type Row,
  type RowSelectionState,
  type SortingState,
  type Table as TanStackTable,
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

export type DataTableDensity = "compact" | "default" | "comfortable"
export type DataTableLoadingVariant = "skeleton" | "state"

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
  loadingVariant?: DataTableLoadingVariant
  toolbar?: React.ReactNode | ((table: TanStackTable<TData>) => React.ReactNode)
  toolbarProps?: DataTableToolbarProps | ((table: TanStackTable<TData>) => DataTableToolbarProps)
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
  onRowDoubleClick?: (row: Row<TData>) => void
  getRowDisabled?: (row: Row<TData>) => boolean
  density?: DataTableDensity
  striped?: boolean
  bordered?: boolean
  stickyHeader?: boolean
  skeletonRows?: number
  skeletonCellClassName?: string
  cellFallback?: React.ReactNode
  tableClassName?: string
  tableWrapperClassName?: string
  headerCellClassName?: string | ((header: Header<TData, unknown>) => string)
  cellClassName?: string | ((cell: Cell<TData, unknown>) => string)
  rowClassName?: string | ((row: Row<TData>) => string)
}

const densityHeadClassName: Record<DataTableDensity, string> = {
  compact: "h-8 px-2 py-1.5",
  default: "h-10 px-2 py-2",
  comfortable: "h-12 px-3 py-3",
}

const densityCellClassName: Record<DataTableDensity, string> = {
  compact: "px-2 py-1.5",
  default: "p-2",
  comfortable: "px-3 py-3",
}

function getRowClassName<TData>(
  row: Row<TData>,
  rowClassName?: string | ((row: Row<TData>) => string)
) {
  return typeof rowClassName === "function" ? rowClassName(row) : rowClassName
}

function getHeaderCellClassName<TData>(
  header: Header<TData, unknown>,
  headerCellClassName?: string | ((header: Header<TData, unknown>) => string)
) {
  return typeof headerCellClassName === "function"
    ? headerCellClassName(header)
    : headerCellClassName
}

function getCellClassName<TData>(
  cell: Cell<TData, unknown>,
  cellClassName?: string | ((cell: Cell<TData, unknown>) => string)
) {
  return typeof cellClassName === "function" ? cellClassName(cell) : cellClassName
}

function isEmptyCellContent(content: React.ReactNode) {
  return content === null || content === undefined || content === ""
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
  loadingVariant = "skeleton",
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
  onRowDoubleClick,
  getRowDisabled,
  density = "default",
  striped = false,
  bordered = false,
  stickyHeader = false,
  skeletonRows = 6,
  skeletonCellClassName,
  cellFallback = "-",
  tableClassName,
  tableWrapperClassName,
  headerCellClassName,
  cellClassName,
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
  const visibleColumns = table.getVisibleLeafColumns()
  const visibleColumnCount = Math.max(visibleColumns.length, 1)
  const resolvedToolbar = typeof toolbar === "function" ? toolbar(table) : toolbar
  const resolvedToolbarProps = typeof toolbarProps === "function" ? toolbarProps(table) : toolbarProps
  const hasToolbar = Boolean(resolvedToolbar || resolvedToolbarProps)
  const showPagination = Boolean(paginationConfig && !paginationConfig.hidden)
  const shouldRenderSkeleton = isLoading && loadingVariant === "skeleton"

  const renderStateRow = (children: React.ReactNode) => (
    <TableRow>
      <TableCell colSpan={visibleColumnCount} className="p-0">
        {children}
      </TableCell>
    </TableRow>
  )

  const renderSkeletonRows = () =>
    Array.from({ length: Math.max(skeletonRows, 1) }, (_, rowIndex) => (
      <TableRow key={`skeleton-${rowIndex}`} aria-hidden="true">
        {visibleColumns.map((column) => (
          <TableCell
            key={`${column.id}-${rowIndex}`}
            className={cn(
              densityCellClassName[density],
              bordered && "border-r last:border-r-0"
            )}
          >
            <div
              className={cn(
                "h-4 w-full max-w-40 animate-pulse rounded-md bg-muted",
                rowIndex % 3 === 1 && "max-w-24",
                rowIndex % 3 === 2 && "max-w-32",
                skeletonCellClassName
              )}
            />
          </TableCell>
        ))}
      </TableRow>
    ))

  const stateContent = shouldRenderSkeleton ? null : isLoading ? (
    <LoadingState label="Loading data..." {...loadingState} />
  ) : isError ? (
    <EmptyState title="Could not load data" description="Please try again." {...errorState} />
  ) : rows.length === 0 ? (
    <EmptyState {...emptyState} />
  ) : null

  return (
    <div data-slot="data-table" className={cn("grid gap-3", className)} {...props}>
      {hasToolbar &&
        (resolvedToolbar ?? (
          <DataTableToolbar
            selectedCount={selectedRowCount}
            totalCount={paginationConfig ? paginationConfig.rowCount ?? data.length : data.length}
            {...resolvedToolbarProps}
          />
        ))}

      {renderMobileCard && (
        <div className="grid gap-3 md:hidden">
          {stateContent ??
            (shouldRenderSkeleton ? (
              <LoadingState label="Loading data..." {...loadingState} />
            ) : (
              rows.map((row) => <React.Fragment key={row.id}>{renderMobileCard(row)}</React.Fragment>)
            ))}
        </div>
      )}

      <div
        data-slot="data-table-wrapper"
        data-density={density}
        data-striped={striped || undefined}
        data-bordered={bordered || undefined}
        className={cn(
          "overflow-auto rounded-lg border bg-background",
          !bordered && "border-border",
          renderMobileCard && "hidden md:block",
          tableWrapperClassName
        )}
      >
        <Table className={tableClassName}>
          <TableHeader className={cn(stickyHeader && "sticky top-0 z-10 bg-background shadow-sm")}> 
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className={cn(
                      densityHeadClassName[density],
                      stickyHeader && "bg-background",
                      bordered && "border-r last:border-r-0",
                      getHeaderCellClassName(header, headerCellClassName)
                    )}
                  >
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
              : shouldRenderSkeleton
                ? renderSkeletonRows()
                : rows.map((row, rowIndex) => {
                    const rowDisabled = getRowDisabled?.(row) ?? false

                    return (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() ? "selected" : undefined}
                        data-disabled={rowDisabled || undefined}
                        className={cn(
                          onRowClick && !rowDisabled && "cursor-pointer",
                          striped && rowIndex % 2 === 1 && "bg-muted/30",
                          rowDisabled && "pointer-events-none opacity-55",
                          getRowClassName(row, rowClassName)
                        )}
                        onClick={() => {
                          if (!rowDisabled) onRowClick?.(row)
                        }}
                        onDoubleClick={() => {
                          if (!rowDisabled) onRowDoubleClick?.(row)
                        }}
                      >
                        {row.getVisibleCells().map((cell) => {
                          const renderedCell = flexRender(cell.column.columnDef.cell, cell.getContext())

                          return (
                            <TableCell
                              key={cell.id}
                              className={cn(
                                densityCellClassName[density],
                                bordered && "border-r last:border-r-0",
                                getCellClassName(cell, cellClassName)
                              )}
                            >
                              {isEmptyCellContent(renderedCell) ? cellFallback : renderedCell}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
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
