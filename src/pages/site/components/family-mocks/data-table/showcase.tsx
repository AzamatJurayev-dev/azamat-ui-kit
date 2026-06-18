import * as React from "react"
import type { ColumnDef, RowSelectionState, SortingState } from "@tanstack/react-table"

import {
  Badge,
  Button,
  DataTable,
  DataTableBulkActions,
  DataTableColumnVisibilityMenu,
  DataTableSortableHeader,
  DataTableViewPresets,
  FilterBar,
  SearchInput,
  createDataTableActionsColumn,
  createDataTableSelectColumn,
} from "@/index"

import type { FamilyDemoProps } from "../types"

import { dataTableDemoPresets, dataTableDemoRows, dataTableToolbarActions } from "./data"
import type { DataTableDemoRow } from "./types"

export function DataTableFamilyShowcase({ state, setState }: FamilyDemoProps) {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [activeInvoice, setActiveInvoice] = React.useState<string>(dataTableDemoRows[0]?.invoice ?? "")
  const [loading, setLoading] = React.useState(false)
  const [empty, setEmpty] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [view, setView] = React.useState<"all" | "finance" | "at-risk">("all")
  const [pageSize, setPageSize] = React.useState(3)
  const [pageIndex, setPageIndex] = React.useState(0)

  const visibleRows = React.useMemo(() => {
    const search = state.search.trim().toLowerCase()
    let rows = dataTableDemoRows

    if (view === "finance") rows = rows.filter((row) => row.status === "Paid" || row.status === "Review")
    if (view === "at-risk") rows = rows.filter((row) => row.status === "Draft" || row.status === "Overdue")

    if (empty) return []
    if (!search) return rows

    return rows.filter((row) =>
      [row.invoice, row.order, row.customer, row.owner, row.channel, row.status, row.amount].join(" ").toLowerCase().includes(search)
    )
  }, [empty, state.search, view])
  const pageCount = Math.max(Math.ceil(visibleRows.length / pageSize), 1)
  const safePageIndex = Math.min(pageIndex, Math.max(pageCount - 1, 0))
  const pagedRows = React.useMemo(
    () => visibleRows.slice(safePageIndex * pageSize, safePageIndex * pageSize + pageSize),
    [pageSize, safePageIndex, visibleRows]
  )

  React.useEffect(() => {
    setPageIndex((current) => Math.min(current, Math.max(pageCount - 1, 0)))
  }, [pageCount])

  const selectedRows = React.useMemo(() => dataTableDemoRows.filter((_, index) => rowSelection[index]), [rowSelection])
  const activeRow = dataTableDemoRows.find((row) => row.invoice === activeInvoice) ?? pagedRows[0]

  const columns = React.useMemo<ColumnDef<DataTableDemoRow>[]>(
    () => [
      createDataTableSelectColumn<DataTableDemoRow>(),
      {
        accessorKey: "invoice",
        header: ({ column }) => <DataTableSortableHeader column={column}>Invoice</DataTableSortableHeader>,
      },
      { accessorKey: "order", header: "Order" },
      {
        accessorKey: "customer",
        header: ({ column }) => <DataTableSortableHeader column={column}>Customer</DataTableSortableHeader>,
      },
      { accessorKey: "owner", header: "Owner" },
      { accessorKey: "channel", header: "Channel" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.status === "Paid"
                ? "secondary"
                : row.original.status === "Review"
                  ? "outline"
                  : "destructive"
            }
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "stock",
        header: ({ column }) => <DataTableSortableHeader column={column}>Stock</DataTableSortableHeader>,
      },
      { accessorKey: "amount", header: "Amount" },
      { accessorKey: "updatedAt", header: "Updated" },
      createDataTableActionsColumn<DataTableDemoRow>({
        getActions: (_row, original) => [
          { key: "view", label: "View row", onSelect: () => setActiveInvoice(original.invoice) },
          { key: "follow-up", label: "Create follow-up", onSelect: () => setState({ notes: `Follow-up prepared for ${original.customer}` }) },
          { key: "archive", label: "Archive", destructive: true, onSelect: () => setState({ notes: `${original.invoice} marked for archive review` }) },
        ],
      }),
    ],
    [setState]
  )

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-[22px] border border-zinc-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{selectedRows.length} selected</Badge>
          <Badge variant="outline">{view === "all" ? "All invoices" : view === "finance" ? "Finance review" : "At risk"}</Badge>
          <Badge variant="outline">{state.density}</Badge>
        </div>
        <p className="text-sm leading-6 text-zinc-500">Search, sort, row actions, bulk actions, view presets and pagination all work in one reusable `DataTable`.</p>
        <div className="flex flex-wrap gap-3">
          <DataTableViewPresets
            value={view}
            onValueChange={(value) => {
              setView((value as typeof view | undefined) ?? "all")
              setPageIndex(0)
            }}
            presets={dataTableDemoPresets}
            size="sm"
          />
          <Button variant={state.density === "compact" ? "default" : "outline"} size="sm" onClick={() => setState({ density: "compact" })}>Compact</Button>
          <Button variant={state.density === "comfortable" ? "default" : "outline"} size="sm" onClick={() => setState({ density: "comfortable" })}>Comfortable</Button>
          <Button variant={loading ? "default" : "outline"} size="sm" onClick={() => setLoading((current) => !current)}>Loading</Button>
          <Button variant={error ? "default" : "outline"} size="sm" onClick={() => setError((current) => !current)}>Error</Button>
          <Button variant={empty ? "default" : "outline"} size="sm" onClick={() => setEmpty((current) => !current)}>Empty</Button>
          <Button variant="outline" size="sm" onClick={() => {
            setState({ search: "" })
            setView("all")
            setLoading(false)
            setError(false)
            setEmpty(false)
            setPageIndex(0)
            setRowSelection({})
          }}>Reset</Button>
        </div>
      </div>

      <div className="rounded-[22px] border border-zinc-200 bg-white p-4">
        <DataTable
          columns={columns}
          data={pagedRows}
          getRowId={(row) => row.invoice}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          sorting={sorting}
          onSortingChange={setSorting}
          enableRowSelection
          density={state.density === "comfortable" ? "comfortable" : "compact"}
          striped
          bordered
          stickyHeader
          isLoading={loading}
          isError={error}
          loadingVariant="skeleton"
          loadingState={{ label: "Loading invoices", description: "Reusable DataTable loading state." }}
          errorState={{ title: "Invoice table failed", description: "Force error state to inspect resilient UI." }}
          emptyState={{ title: "No rows found", description: "Current view or search does not match any invoice." }}
          onRowClick={(row) => setActiveInvoice(row.original.invoice)}
          renderMobileCard={(row) => (
            <button
              key={row.id}
              type="button"
              onClick={() => setActiveInvoice(row.original.invoice)}
              className={activeInvoice === row.original.invoice ? "rounded-[20px] border border-zinc-950 bg-zinc-950 p-4 text-left text-white" : "rounded-[20px] border border-zinc-200 bg-zinc-50 p-4 text-left"}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{row.original.invoice}</p>
                  <p className={activeInvoice === row.original.invoice ? "mt-1 text-sm text-white/70" : "mt-1 text-sm text-zinc-500"}>{row.original.customer} • {row.original.owner}</p>
                </div>
                <Badge variant={row.original.status === "Paid" ? "secondary" : row.original.status === "Review" ? "outline" : "destructive"}>{row.original.status}</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className={activeInvoice === row.original.invoice ? "text-white/60" : "text-zinc-400"}>Amount</p>
                  <p className="mt-1 font-semibold">{row.original.amount}</p>
                </div>
                <div>
                  <p className={activeInvoice === row.original.invoice ? "text-white/60" : "text-zinc-400"}>Updated</p>
                  <p className="mt-1 font-semibold">{row.original.updatedAt}</p>
                </div>
              </div>
            </button>
          )}
          toolbarProps={(table) => ({
            title: "Invoices",
            description: "Compact product-grade reusable table surface.",
            search: (
              <FilterBar
                search={<SearchInput value={state.search} onValueChange={(value) => setState({ search: value })} placeholder="Search table..." />}
                activeCount={(state.search ? 1 : 0) + (view !== "all" ? 1 : 0)}
                onReset={() => {
                  setState({ search: "" })
                  setView("all")
                  setPageIndex(0)
                }}
              />
            ),
            actions: (
              <div className="flex items-center gap-2">
                <DataTableColumnVisibilityMenu table={table} />
                {dataTableToolbarActions.map((action) => (
                  <Button key={action.label} variant={action.variant} size="sm">{action.label}</Button>
                ))}
              </div>
            ),
            selectionActions: (
              <DataTableBulkActions
                rows={table.getSelectedRowModel().rows.map((row) => row.original)}
                actions={[
                  {
                    key: "export",
                    label: "Export selected",
                    onSelect: (rows) => setState({ notes: `${rows.length} rows prepared for export` }),
                  },
                  {
                    key: "archive",
                    label: "Archive selected",
                    destructive: true,
                    onSelect: (rows) => setState({ notes: `${rows.length} rows sent to archive flow` }),
                  },
                ]}
                onClearSelection={() => setRowSelection({})}
              />
            ),
          })}
          pagination={{
            manual: true,
            pageIndex: safePageIndex,
            pageSize,
            rowCount: visibleRows.length,
            pageCount,
            pageSizeOptions: [3, 5, 10],
            onPageChange: setPageIndex,
            onPageSizeChange: (nextPageSize) => {
              setPageSize(nextPageSize)
              setPageIndex(0)
            },
          }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Active row</p>
          <p className="mt-2 text-lg font-semibold text-zinc-950">{activeRow?.invoice ?? "No row"}</p>
          <p className="mt-2 text-sm text-zinc-600">{activeRow ? `${activeRow.customer} • ${activeRow.owner}` : "Select a row"}</p>
        </div>
        <div className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Selection mode</p>
          <p className="mt-2 text-lg font-semibold text-zinc-950">Bulk actions</p>
          <p className="mt-2 text-sm text-zinc-600">{selectedRows.length} invoices can be exported or archived together.</p>
        </div>
        <div className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Pagination</p>
          <p className="mt-2 text-lg font-semibold text-zinc-950">Working</p>
          <p className="mt-2 text-sm text-zinc-600">{visibleRows.length} total rows, page {safePageIndex + 1} of {pageCount}, {pageSize} per page.</p>
        </div>
      </div>
    </div>
  )
}
