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

import { createDataTableActionsColumn } from "@/components/data-table/data-table-actions-column"
import { DataTableBulkActions, type DataTableBulkAction } from "@/components/data-table/data-table-bulk-actions"
import { DataTableColumnVisibilityMenu } from "@/components/data-table/data-table-column-visibility-menu"
import { DataTablePagination, type DataTablePaginationProps } from "@/components/data-table/data-table-pagination"
import { type DataTableRowAction } from "@/components/data-table/data-table-row-actions"
import { DataTableToolbar, type DataTableToolbarProps } from "@/components/data-table/data-table-toolbar"
import { EmptyState, type EmptyStateProps } from "@/components/feedback/empty-state"
import { LoadingState, type LoadingStateProps } from "@/components/feedback/loading-state"
import { SearchInput, type SearchInputProps } from "@/components/inputs/search-input"
import { Button } from "@/components/ui/button"
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

export type DataTableFeatureConfig = {
  search?: boolean
  columnVisibility?: boolean
  rowActions?: boolean
  bulkActions?: boolean
  refresh?: boolean
  export?: boolean
}

export type DataTableSearchConfig = Pick<
  SearchInputProps,
  | "value"
  | "onValueChange"
  | "placeholder"
  | "inputClassName"
  | "disabled"
  | "clearable"
  | "clearLabel"
  | "searchIcon"
> & {
  className?: string
  wrapperClassName?: string
}

export type DataTableActionContext<TData> = {
  table: TanStackTable<TData>
  data: TData[]
  selectedRows: TData[]
}

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
  title?: React.ReactNode
  description?: React.ReactNode
  features?: DataTableFeatureConfig
  search?: DataTableSearchConfig
  toolbarActions?: React.ReactNode | ((context: DataTableActionContext<TData>) => React.ReactNode)
  rowActions?: (row: Row<TData>, original: TData) => DataTableRowAction<TData>[]
  bulkActions?: DataTableBulkAction<TData>[]
  onRefresh?: (context: DataTableActionContext<TData>) => void
  onExport?: (context: DataTableActionContext<TData>) => void
  refreshLabel?: React.ReactNode
  exportLabel?: React.ReactNode
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
  title,
  description,
  features,
  search,
  toolbarActions,
  rowActions,
  bulkActions,
  onRefresh,
  onExport,
  refreshLabel = "Refresh",
  exportLabel = "Export",
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
  const resolvedColumns = React.useMemo<ColumnDef<TData, TValue | unknown>[]>(() => {
    if (!rowActions || features?.rowActions === false) return columns

    return [
      ...columns,
      createDataTableActionsColumn<TData>({
        getActions: rowActions,
      }) as ColumnDef<TData, TValue | unknown>,
    ]
  }, [columns, features?.rowActions, rowActions])

  const paginationConfig = pagination === false ? undefined : pagination
  const controlledPagination = paginationConfig
    ? {
        pageIndex: paginationConfig.pageIndex,
        pageSize: paginationConfig.pageSize,
      }
    : undefined
  const manualPagination = Boolean(paginationConfig && paginationConfig.manual !== false)
  const selectedRowCount = rowSelection ? Object.keys(rowSelection).length : 0

  // TanStack Table returns imperative helpers that React Compiler flags by design.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: resolvedColumns,
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
  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original)
  const actionContext = React.useMemo<DataTableActionContext<TData>>(
    () => ({ table, data, selectedRows }),
    [data, selectedRows, table]
  )
  const visibleColumns = table.getVisibleLeafColumns()
  const visibleColumnCount = Math.max(visibleColumns.length, 1)
  const resolvedToolbar = typeof toolbar === "function" ? toolbar(table) : toolbar
  const resolvedToolbarProps = typeof toolbarProps === "function" ? toolbarProps(table) : toolbarProps
  const shouldShowSearch = Boolean(search && features?.search !== false)
  const shouldShowColumnVisibility = Boolean(features?.columnVisibility && table.getAllLeafColumns().some((column) => column.getCanHide()))
  const shouldShowRefresh = Boolean(features?.refresh && onRefresh)
  const shouldShowExport = Boolean(features?.export && onExport)
  const shouldShowBulkActions = Boolean(features?.bulkActions !== false && bulkActions?.length)
  const defaultSearch = shouldShowSearch && search ? (
    <SearchInput
      value={search.value}
      onValueChange={search.onValueChange}
      placeholder={search.placeholder ?? "Search..."}
      wrapperClassName={search.wrapperClassName ?? search.className}
      inputClassName={search.inputClassName}
      disabled={search.disabled}
      clearable={search.clearable}
      clearLabel={search.clearLabel}
      searchIcon={search.searchIcon}
    />
  ) : undefined
  const defaultActions = (
    <>
      {typeof toolbarActions === "function" ? toolbarActions(actionContext) : toolbarActions}
      {shouldShowColumnVisibility && <DataTableColumnVisibilityMenu table={table} />}
      {shouldShowRefresh && (
        <Button type="button" variant="outline" size="sm" disabled={isLoading} onClick={() => onRefresh?.(actionContext)}>
          {refreshLabel}
        </Button>
      )}
      {shouldShowExport && (
        <Button type="button" variant="outline" size="sm" onClick={() => onExport?.(actionContext)}>
          {exportLabel}
        </Button>
      )}
    </>
  )
  const defaultSelectionActions = shouldShowBulkActions ? (
    <DataTableBulkActions
      rows={selectedRows}
      actions={bulkActions ?? []}
      onClearSelection={() => table.resetRowSelection()}
      hideWhenEmpty={false}
    />
  ) : undefined
  const hasDefaultToolbarContent = Boolean(
    title ||
      description ||
      defaultSearch ||
      toolbarActions ||
      shouldShowColumnVisibility ||
      shouldShowRefresh ||
      shouldShowExport ||
      defaultSelectionActions
  )
  const hasToolbar = Boolean(resolvedToolbar || resolvedToolbarProps || hasDefaultToolbarContent)
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
            title={title}
            description={description}
            search={defaultSearch}
            actions={defaultActions}
            selectionActions={defaultSelectionActions}
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
          "overflow-auto rounded-[var(--radius-2xl)] border bg-[linear-gradient(180deg,color-mix(in_oklch,var(--card),white_10%),var(--card))] shadow-sm ring-1 ring-foreground/5 backdrop-blur",
          !bordered && "border-border",
          renderMobileCard && "hidden md:block",
          tableWrapperClassName
        )}
      >
        <Table className={cn("text-[0.95rem]", tableClassName)}>
          <TableHeader
            className={cn(stickyHeader && "sticky top-0 z-10 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--background),white_10%),var(--background))] shadow-sm backdrop-blur")}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className={cn(
                      densityHeadClassName[density],
                      "text-muted-foreground",
                      stickyHeader && "bg-[linear-gradient(180deg,color-mix(in_oklch,var(--background),white_10%),var(--background))] backdrop-blur",
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
                        data-striped={striped && rowIndex % 2 === 1 ? "true" : undefined}
                        data-disabled={rowDisabled || undefined}
                        className={cn(
                          onRowClick && !rowDisabled && "cursor-pointer",
                          !rowDisabled && "transition-colors",
                          striped && rowIndex % 2 === 1 && "bg-muted/20",
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
