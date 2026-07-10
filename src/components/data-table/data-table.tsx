"use client"

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
  type ExpandedState,
  type ColumnPinningState,
  getExpandedRowModel,
} from "@tanstack/react-table"
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual"

import { createDataTableActionsColumn } from "@/components/data-table/data-table-actions-column"
import { DataTableBulkActions, type DataTableBulkAction } from "@/components/data-table/data-table-bulk-actions"
import { DataTableColumnVisibilityMenu } from "@/components/data-table/data-table-column-visibility-menu"
import { DataTablePagination, type DataTablePaginationProps } from "@/components/data-table/data-table-pagination"
import { type DataTableRowAction } from "@/components/data-table/data-table-row-actions"
import { DataTableToolbar, type DataTableToolbarProps } from "@/components/data-table/data-table-toolbar"
import { DataState, type DataStateProps } from "@/components/display/data-state"
import { LoadingState, type LoadingStateProps } from "@/components/feedback/loading-state"
import { Button } from "@/components/ui/button"
import { Input, type InputSearchProps } from "@/components/ui/input"
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

export type DataTableVirtualizationRange = {
  startIndex: number
  endIndex: number
}

export type DataTableVirtualizationConfig = {
  enabled?: boolean
  height?: number | string
  estimateRowHeight?: number
  overscan?: number
  measureRows?: boolean
  onRangeChange?: (range: DataTableVirtualizationRange) => void
}

export type DataTableFeatureConfig = {
  search?: boolean
  columnVisibility?: boolean
  rowActions?: boolean
  bulkActions?: boolean
  refresh?: boolean
  export?: boolean
}

export type DataTableSearchConfig = Pick<
  InputSearchProps,
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
  filters?: React.ReactNode | ((context: DataTableActionContext<TData>) => React.ReactNode)
  summary?: React.ReactNode | ((context: DataTableActionContext<TData>) => React.ReactNode)
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
  emptyState?: Omit<DataStateProps, "status">
  errorState?: Omit<DataStateProps, "status">
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
  renderExpandedRow?: (row: Row<TData>) => React.ReactNode
  expanded?: ExpandedState
  onExpandedChange?: OnChangeFn<ExpandedState>
  getRowCanExpand?: (row: Row<TData>) => boolean
  columnPinning?: ColumnPinningState
  onColumnPinningChange?: OnChangeFn<ColumnPinningState>
  virtualization?: DataTableVirtualizationConfig | false
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
  filters,
  summary,
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
  renderExpandedRow,
  expanded,
  onExpandedChange,
  getRowCanExpand,
  columnPinning,
  onColumnPinningChange,
  virtualization,
  ...props
}: DataTableProps<TData, TValue>) {
  const resolvedColumns = React.useMemo<ColumnDef<TData, unknown>[]>(() => {
    const baseColumns = columns as ColumnDef<TData, unknown>[]
    if (!rowActions || features?.rowActions === false) return baseColumns

    return [
      ...baseColumns,
      createDataTableActionsColumn<TData>({
        getActions: rowActions,
      }) as ColumnDef<TData, unknown>,
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
  const resolvedRowSelection = rowSelection ?? {}

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
      rowSelection: resolvedRowSelection,
      pagination: controlledPagination,
      expanded,
      ...(columnPinning ? { columnPinning } : {}),
    },
    onSortingChange,
    onColumnVisibilityChange,
    onRowSelectionChange,
    onExpandedChange,
    onColumnPinningChange,
    enableRowSelection,
    getRowCanExpand,
    getExpandedRowModel: getExpandedRowModel(),
  })

  const rows = table.getRowModel().rows
  const tableScrollRef = React.useRef<HTMLDivElement>(null)
  const virtualizationConfig = virtualization === false ? undefined : virtualization
  const virtualizationEnabled = Boolean(
    virtualizationConfig && virtualizationConfig.enabled !== false && rows.length > 0
  )
  const virtualizationHeight = virtualizationConfig?.height ?? 480
  const onVirtualRangeChange = virtualizationConfig?.onRangeChange
  const rowVirtualizer = useVirtualizer({
    count: virtualizationEnabled ? rows.length : 0,
    getScrollElement: () => tableScrollRef.current,
    estimateSize: () => virtualizationConfig?.estimateRowHeight ?? 48,
    getItemKey: (index) => rows[index]?.id ?? index,
    overscan: virtualizationConfig?.overscan ?? 8,
    initialRect: {
      width: 0,
      height: typeof virtualizationHeight === "number" ? virtualizationHeight : 480,
    },
    onChange(instance) {
      if (!onVirtualRangeChange) return
      const virtualItems = instance.getVirtualItems()
      onVirtualRangeChange({
        startIndex: virtualItems[0]?.index ?? -1,
        endIndex: virtualItems.at(-1)?.index ?? -1,
      })
    },
  })
  const virtualRows = virtualizationEnabled ? rowVirtualizer.getVirtualItems() : []
  const estimatedRowHeight = virtualizationConfig?.estimateRowHeight ?? 48
  const initialVirtualRowCount = virtualizationEnabled
    ? Math.min(
        rows.length,
        Math.ceil(
          (typeof virtualizationHeight === "number" ? virtualizationHeight : 480) /
            estimatedRowHeight
        ) + (virtualizationConfig?.overscan ?? 8)
      )
    : 0
  const renderedVirtualRows = virtualRows.length > 0
    ? virtualRows
    : Array.from({ length: initialVirtualRowCount }, (_, index): VirtualItem => ({
        key: rows[index]?.id ?? index,
        index,
        start: index * estimatedRowHeight,
        end: (index + 1) * estimatedRowHeight,
        size: estimatedRowHeight,
        lane: 0,
      }))
  const virtualPaddingTop = renderedVirtualRows[0]?.start ?? 0
  const virtualPaddingBottom = renderedVirtualRows.length
    ? Math.max(
        rowVirtualizer.getTotalSize() - renderedVirtualRows[renderedVirtualRows.length - 1].end,
        0
      )
    : 0
  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original)
  const selectedRowCount = selectedRows.length
  const actionContext = React.useMemo<DataTableActionContext<TData>>(
    () => ({ table, data, selectedRows }),
    [data, selectedRows, table]
  )
  const visibleColumns = table.getVisibleLeafColumns()
  const visibleColumnCount = Math.max(visibleColumns.length, 1)
  const resolvedToolbar = typeof toolbar === "function" ? toolbar(table) : toolbar
  const resolvedToolbarProps = typeof toolbarProps === "function" ? toolbarProps(table) : toolbarProps
  const resolvedFilters = typeof filters === "function" ? filters(actionContext) : filters
  const resolvedSummary = typeof summary === "function" ? summary(actionContext) : summary
  const shouldShowSearch = Boolean(search && features?.search !== false)
  const shouldShowColumnVisibility = Boolean(features?.columnVisibility && table.getAllLeafColumns().some((column) => column.getCanHide()))
  const shouldShowRefresh = Boolean(features?.refresh && onRefresh)
  const shouldShowExport = Boolean(features?.export && onExport)
  const shouldShowBulkActions = Boolean(features?.bulkActions !== false && bulkActions?.length)
  const hasPrimaryToolbarContent = Boolean(
    title ||
      description ||
      search ||
      resolvedFilters ||
      resolvedSummary ||
      toolbarActions ||
      shouldShowRefresh ||
      shouldShowExport
  )
  const shouldShowColumnVisibilityInToolbar = shouldShowColumnVisibility && hasPrimaryToolbarContent
  const defaultSearch = shouldShowSearch && search ? (
    <Input
      type="search"
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
      {shouldShowColumnVisibilityInToolbar && <DataTableColumnVisibilityMenu table={table} />}
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
      selectedLabel={() => "Actions"}
      clearLabel={null} // Toolbar often has its own clear or we don't need double clear
      onClearSelection={() => table.resetRowSelection()}
      hideWhenEmpty={false}
    />
  ) : undefined
  const hasDefaultToolbarContent = Boolean(
    title ||
      description ||
      defaultSearch ||
      resolvedFilters ||
      resolvedSummary ||
      toolbarActions ||
      shouldShowColumnVisibilityInToolbar ||
      shouldShowRefresh ||
      shouldShowExport ||
      defaultSelectionActions
  )
  const hasToolbar = Boolean(resolvedToolbar || resolvedToolbarProps || hasDefaultToolbarContent)
  const showPagination = Boolean(paginationConfig && !paginationConfig.hidden)
  const shouldRenderSkeleton = isLoading && loadingVariant === "skeleton"

  const renderVirtualSpacer = (key: string, height: number) =>
    height > 0 ? (
      <TableRow key={key} aria-hidden="true" className="pointer-events-none border-0 hover:bg-transparent">
        <TableCell
          colSpan={visibleColumnCount}
          className="border-0 p-0"
          style={{ height }}
        />
      </TableRow>
    ) : null

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
    <DataState status="error" title="Could not load data" description="Please try again." variant="plain" {...errorState} />
  ) : rows.length === 0 ? (
    <DataState status="empty" variant="plain" {...emptyState} />
  ) : null

  const renderDataRow = (row: Row<TData>, rowIndex: number, virtualRow?: VirtualItem) => {
    const rowDisabled = getRowDisabled?.(row) ?? false

    return (
      <React.Fragment key={row.id}>
        <TableRow
          ref={
            virtualRow && virtualizationConfig?.measureRows !== false
              ? rowVirtualizer.measureElement
              : undefined
          }
          data-index={virtualRow?.index}
          data-state={row.getIsSelected() ? "selected" : undefined}
          data-striped={striped && rowIndex % 2 === 1 ? "true" : undefined}
          data-disabled={rowDisabled || undefined}
          className={cn(
            onRowClick && !rowDisabled && "cursor-pointer",
            !rowDisabled && "transition-colors hover:bg-[color:color-mix(in_oklch,var(--primary),transparent_96%)] data-[state=selected]:bg-[color:color-mix(in_oklch,var(--primary),transparent_90%)]",
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
                style={{
                  ...(cell.column.getIsPinned() === "left"
                    ? { left: `${cell.column.getStart("left")}px`, position: "sticky", zIndex: 10 }
                    : {}),
                  ...(cell.column.getIsPinned() === "right"
                    ? { right: `${cell.column.getAfter("right")}px`, position: "sticky", zIndex: 10 }
                    : {}),
                }}
                className={cn(
                  densityCellClassName[density],
                  cell.column.getIsPinned() && "bg-card shadow-[1px_0_0_var(--border)]",
                  bordered && "border-r last:border-r-0",
                  getCellClassName(cell, cellClassName)
                )}
              >
                {isEmptyCellContent(renderedCell) ? cellFallback : renderedCell}
              </TableCell>
            )
          })}
        </TableRow>
        {row.getIsExpanded() && renderExpandedRow ? (
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableCell colSpan={row.getVisibleCells().length}>
              {renderExpandedRow(row)}
            </TableCell>
          </TableRow>
        ) : null}
      </React.Fragment>
    )
  }

  return (
    <div data-slot="data-table" className={cn("grid gap-3", className)} {...props}>
      {hasToolbar &&
        (resolvedToolbar ?? (
          <DataTableToolbar
            title={title}
            description={description}
            search={defaultSearch}
            filters={resolvedFilters}
            summary={resolvedSummary}
            actions={defaultActions}
            selectionActions={defaultSelectionActions}
            selectedCount={selectedRowCount}
            totalCount={paginationConfig ? paginationConfig.rowCount ?? data.length : data.length}
            variant="plain"
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
        data-virtualized={virtualizationEnabled || undefined}
        className={cn(
          "overflow-hidden rounded-[var(--aui-card-radius,var(--radius-lg))] border border-[color:var(--aui-card-border,var(--border))] bg-card shadow-[var(--aui-card-shadow,0_10px_24px_rgba(15,23,42,0.07))] backdrop-blur",
          renderMobileCard && "hidden md:block",
          tableWrapperClassName
        )}
      >
        <Table
          containerRef={tableScrollRef}
          containerStyle={
            virtualizationEnabled
              ? { height: virtualizationHeight, overscrollBehavior: "contain" }
              : undefined
          }
          containerClassName={cn(
            "rounded-none border-0 bg-transparent shadow-none ring-0",
            virtualizationEnabled && "overflow-auto"
          )}
          className={cn("text-[0.95rem]", tableClassName)}
          aria-rowcount={rows.length}
        >
          <TableHeader
            className={cn(
              (stickyHeader || virtualizationEnabled) && "sticky top-0 z-10 shadow-sm backdrop-blur"
            )}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      ...(header.column.getIsPinned() === "left"
                        ? { left: `${header.column.getStart("left")}px`, position: "sticky", zIndex: stickyHeader ? 20 : 11 }
                        : {}),
                      ...(header.column.getIsPinned() === "right"
                        ? { right: `${header.column.getAfter("right")}px`, position: "sticky", zIndex: stickyHeader ? 20 : 11 }
                        : {}),
                    }}
                      className={cn(
                        densityHeadClassName[density],
                        "bg-[color:color-mix(in_oklch,var(--card),var(--background)_10%)] text-muted-foreground",
                        (stickyHeader || virtualizationEnabled) && "bg-[color:color-mix(in_oklch,var(--card),transparent_12%)] backdrop-blur",
                        header.column.getIsPinned() && "bg-card shadow-[1px_0_0_var(--border)]",
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
                : virtualizationEnabled
                  ? [
                      renderVirtualSpacer("virtual-top", virtualPaddingTop),
                      ...renderedVirtualRows.map((virtualRow) =>
                        renderDataRow(rows[virtualRow.index], virtualRow.index, virtualRow)
                      ),
                      renderVirtualSpacer("virtual-bottom", virtualPaddingBottom),
                    ]
                  : rows.map((row, rowIndex) => renderDataRow(row, rowIndex))}
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
