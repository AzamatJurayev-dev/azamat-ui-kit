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
  const [pageSize, setPageSize] = React.useState(10)

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

  const selectedRows = React.useMemo(() => visibleRows.filter((_, index) => rowSelection[index]), [rowSelection, visibleRows])
  const activeRow = visibleRows.find((row) => row.invoice === activeInvoice) ?? visibleRows[0]

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
      <div className="grid gap-4 rounded-[22px] border border-zinc-200 bg-white p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <FilterBar
            search={
              <SearchInput
                value={state.search}
                onValueChange={(value) => setState({ search: value })}
                placeholder="Search invoice, owner, channel..."
              />
            }
            activeCount={(state.search ? 1 : 0) + (view !== "all" ? 1 : 0)}
            onReset={() => {
              setState({ search: "" })
              setView("all")
              setRowSelection({})
            }}
          />
          <div className="flex flex-wrap gap-3">
            {dataTableToolbarActions.map((action) => (
              <Button key={action.label} variant={action.variant}>{action.label}</Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <DataTableViewPresets
            value={view}
            onValueChange={(value) => setView((value as typeof view | undefined) ?? "all")}
            presets={dataTableDemoPresets}
            size="sm"
          />
          <Button variant={state.density === "compact" ? "default" : "outline"} size="sm" onClick={() => setState({ density: "compact" })}>Compact</Button>
          <Button variant={state.density === "comfortable" ? "default" : "outline"} size="sm" onClick={() => setState({ density: "comfortable" })}>Comfortable</Button>
          <Button variant={loading ? "default" : "outline"} size="sm" onClick={() => setLoading((current) => !current)}>Loading</Button>
          <Button variant={error ? "default" : "outline"} size="sm" onClick={() => setError((current) => !current)}>Error</Button>
          <Button variant={empty ? "default" : "outline"} size="sm" onClick={() => setEmpty((current) => !current)}>Empty</Button>
          <Button variant={pageSize === 20 ? "default" : "outline"} size="sm" onClick={() => setPageSize((current) => (current === 10 ? 20 : 10))}>Page size {pageSize}</Button>
        </div>
      </div>

      <div className="rounded-[22px] border border-zinc-200 bg-white p-4">
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="outline">{selectedRows.length} selected</Badge>
          <Badge variant="outline">Row actions ready</Badge>
          <Badge variant="outline">Bulk actions ready</Badge>
          <Badge variant="outline">Column visibility</Badge>
          <Badge variant="outline">Mobile cards supported</Badge>
        </div>

        <DataTable
          columns={columns}
          data={visibleRows}
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
          toolbarProps={(table) => ({
            title: "Invoices",
            description: "Primary reusable data-table API for finance, ops and admin surfaces.",
            search: (
              <FilterBar
                search={<SearchInput value={state.search} onValueChange={(value) => setState({ search: value })} placeholder="Search table..." />}
                activeCount={(state.search ? 1 : 0) + (view !== "all" ? 1 : 0)}
                onReset={() => {
                  setState({ search: "" })
                  setView("all")
                }}
              />
            ),
            actions: <DataTableColumnVisibilityMenu table={table} />,
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
          pagination={{ pageIndex: 0, pageSize, rowCount: visibleRows.length, pageCount: 1 }}
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
          <p className="text-sm text-zinc-500">Reusable strategy</p>
          <p className="mt-2 text-lg font-semibold text-zinc-950">One API, many states</p>
          <p className="mt-2 text-sm text-zinc-600">Search, density, row actions, selection, error, empty and pagination live in one component.</p>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-[22px] border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
        <span>{visibleRows.length} rows visible</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setPageSize(10)}>10</Button>
          <Button size="sm" onClick={() => setPageSize(20)}>20</Button>
        </div>
      </div>
    </div>
  )
}
