import * as React from "react"
import type { ColumnDef, RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table"

import {
  Badge,
  Button,
  DataTable,
  DataTableBulkActions,
  DataTableColumnVisibilityMenu,
  DataTableSortableHeader,
  DataTableViewPresets,
  SheetShell,
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
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [activeInvoice, setActiveInvoice] = React.useState<string>(dataTableDemoRows[0]?.invoice ?? "")
  const [detailOpen, setDetailOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [empty, setEmpty] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [view, setView] = React.useState<"all" | "finance" | "at-risk">("all")
  const [loadingVariant, setLoadingVariant] = React.useState<"skeleton" | "state">("skeleton")
  const [serverMode, setServerMode] = React.useState<"client" | "server">("client")
  const [serverLoading, setServerLoading] = React.useState(false)
  const [resolvedRows, setResolvedRows] = React.useState(dataTableDemoRows)
  const [pageSize, setPageSize] = React.useState(3)
  const [pageIndex, setPageIndex] = React.useState(0)

  const queryRows = React.useMemo(() => {
    const search = state.search.trim().toLowerCase()
    let rows = dataTableDemoRows

    if (view === "finance") rows = rows.filter((row) => row.status === "Paid" || row.status === "Review")
    if (view === "at-risk") rows = rows.filter((row) => row.status === "Draft" || row.status === "Overdue")

    if (empty) return []
    if (!search) return rows

    return rows.filter((row) =>
      [row.invoice, row.order, row.customer, row.owner, row.channel, row.status, row.amount, row.items].join(" ").toLowerCase().includes(search)
    )
  }, [empty, state.search, view])

  React.useEffect(() => {
    if (serverMode === "client") {
      setResolvedRows(queryRows)
      setServerLoading(false)
      return
    }

    setServerLoading(true)
    const timeout = window.setTimeout(() => {
      setResolvedRows(queryRows)
      setServerLoading(false)
    }, 420)

    return () => window.clearTimeout(timeout)
  }, [queryRows, serverMode])

  const visibleRows = serverMode === "server" ? resolvedRows : queryRows
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
  const paidAmount = visibleRows.filter((row) => row.status === "Paid").reduce((total, row) => total + row.amountValue, 0)
  const isBusy = loading || serverLoading

  const columns = React.useMemo<ColumnDef<DataTableDemoRow>[]>(
    () => [
      createDataTableSelectColumn<DataTableDemoRow>(),
      {
        accessorKey: "invoice",
        header: ({ column }) => <DataTableSortableHeader column={column}>Invoice</DataTableSortableHeader>,
        cell: ({ row }) => (
          <div className="min-w-[132px]">
            <p className="font-medium text-zinc-950">{row.original.invoice}</p>
            <p className="mt-1 text-xs text-zinc-500">{row.original.order}</p>
          </div>
        ),
      },
      {
        accessorKey: "customer",
        header: ({ column }) => <DataTableSortableHeader column={column}>Customer</DataTableSortableHeader>,
        cell: ({ row }) => (
          <div className="min-w-[180px]">
            <p className="font-medium text-zinc-950">{row.original.customer}</p>
            <p className="mt-1 text-xs text-zinc-500">{row.original.owner} • {row.original.channel}</p>
          </div>
        ),
      },
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
        accessorKey: "items",
        header: ({ column }) => <DataTableSortableHeader column={column}>Items</DataTableSortableHeader>,
        cell: ({ row }) => <span className="font-medium text-zinc-950">{row.original.items}</span>,
      },
      {
        accessorKey: "stock",
        header: ({ column }) => <DataTableSortableHeader column={column}>Stock</DataTableSortableHeader>,
      },
      {
        accessorKey: "amount",
        header: ({ column }) => <DataTableSortableHeader column={column}>Amount</DataTableSortableHeader>,
        cell: ({ row }) => (
          <div className="min-w-[116px]">
            <p className="font-medium text-zinc-950">{row.original.amount}</p>
            <p className={`mt-1 text-xs ${row.original.trend === "up" ? "text-emerald-600" : row.original.trend === "down" ? "text-rose-600" : "text-zinc-500"}`}>
              {row.original.trend === "up" ? "Trending up" : row.original.trend === "down" ? "Needs attention" : "Stable"}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated",
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-zinc-950">{row.original.updatedAt}</p>
            <p className="mt-1 text-xs text-zinc-500">{row.original.status === "Draft" ? "Editing locked" : "Live sync"}</p>
          </div>
        ),
      },
      createDataTableActionsColumn<DataTableDemoRow>({
        getActions: (_row, original) => [
          {
            key: "view",
            label: "Open detail",
            onSelect: () => {
              setActiveInvoice(original.invoice)
              setDetailOpen(true)
            },
          },
          { key: "follow-up", label: "Create follow-up", onSelect: () => setState({ notes: `Follow-up prepared for ${original.customer}` }) },
          { key: "archive", label: "Archive", destructive: true, onSelect: () => setState({ notes: `${original.invoice} marked for archive review` }) },
        ],
      }),
    ],
    [setState]
  )

  return (
    <div className="space-y-4">
      <div className="rounded-[22px] border border-zinc-200 bg-white p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{selectedRows.length} selected</Badge>
              <Badge variant="outline">{view === "all" ? "All invoices" : view === "finance" ? "Finance review" : "At risk"}</Badge>
              <Badge variant="outline">{visibleRows.length} rows</Badge>
              <Badge variant="outline">{loadingVariant}</Badge>
              <Badge variant="outline">{serverMode === "server" ? "Manual server-state" : "Client state"}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-950">Reusable DataTable flow</p>
              <p className="mt-1 text-sm leading-6 text-zinc-500">Selection, column visibility, mobile cards, manual server-state, detail sheet, disabled rows and pagination in one compact surface.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant={serverMode === "client" ? "default" : "outline"} size="sm" onClick={() => setServerMode("client")}>Client</Button>
            <Button variant={serverMode === "server" ? "default" : "outline"} size="sm" onClick={() => setServerMode("server")}>Server</Button>
            <Button variant={state.density === "compact" ? "default" : "outline"} size="sm" onClick={() => setState({ density: "compact" })}>Compact</Button>
            <Button variant={state.density === "comfortable" ? "default" : "outline"} size="sm" onClick={() => setState({ density: "comfortable" })}>Comfortable</Button>
            <Button variant={loadingVariant === "skeleton" ? "default" : "outline"} size="sm" onClick={() => setLoadingVariant((current) => current === "skeleton" ? "state" : "skeleton")}>
              {loadingVariant === "skeleton" ? "Skeleton" : "State"}
            </Button>
            <Button variant={loading ? "default" : "outline"} size="sm" onClick={() => setLoading((current) => !current)}>Loading</Button>
            <Button variant={error ? "default" : "outline"} size="sm" onClick={() => setError((current) => !current)}>Error</Button>
            <Button variant={empty ? "default" : "outline"} size="sm" onClick={() => setEmpty((current) => !current)}>Empty</Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setState({ search: "" })
                setView("all")
                setLoading(false)
                setError(false)
                setEmpty(false)
                setLoadingVariant("skeleton")
                setServerMode("client")
                setPageIndex(0)
                setRowSelection({})
                setColumnVisibility({})
                setDetailOpen(false)
              }}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <DataTableViewPresets
            value={view}
            onValueChange={(value) => {
              setView((value as typeof view | undefined) ?? "all")
              setPageIndex(0)
            }}
            presets={dataTableDemoPresets}
            size="sm"
          />
          <div className="w-full max-w-[320px]">
            <SearchInput value={state.search} onValueChange={(value) => setState({ search: value })} placeholder="Search invoice, customer, owner..." />
          </div>
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
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
          enableRowSelection
          density={state.density === "comfortable" ? "comfortable" : "compact"}
          striped
          bordered
          stickyHeader
          isLoading={isBusy}
          isError={error}
          loadingVariant={loadingVariant}
          loadingState={{
            label: serverMode === "server" ? "Fetching invoices" : "Loading invoices",
            description: serverMode === "server" ? "Manual mode simulates server-side filtering, sorting and pagination." : "Reusable DataTable loading state.",
          }}
          errorState={{ title: "Invoice table failed", description: "Force error state to inspect resilient UI." }}
          emptyState={{ title: "No rows found", description: "Current view or search does not match any invoice." }}
          getRowDisabled={(row) => row.original.status === "Draft"}
          onRowClick={(row) => setActiveInvoice(row.original.invoice)}
          onRowDoubleClick={(row) => {
            setActiveInvoice(row.original.invoice)
            setDetailOpen(true)
            setState({ notes: `${row.original.invoice} opened from double click` })
          }}
          renderMobileCard={(row) => (
            <button
              key={row.id}
              type="button"
              onClick={() => {
                setActiveInvoice(row.original.invoice)
                setDetailOpen(true)
              }}
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
                <div>
                  <p className={activeInvoice === row.original.invoice ? "text-white/60" : "text-zinc-400"}>Items</p>
                  <p className="mt-1 font-semibold">{row.original.items}</p>
                </div>
                <div>
                  <p className={activeInvoice === row.original.invoice ? "text-white/60" : "text-zinc-400"}>Channel</p>
                  <p className="mt-1 font-semibold">{row.original.channel}</p>
                </div>
              </div>
            </button>
          )}
          toolbarProps={(table) => ({
            title: "Invoices",
            description: "Primary reusable data-table API for finance, ops and admin surfaces.",
            search: (
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{view === "all" ? "All" : view === "finance" ? "Finance" : "At risk"}</Badge>
                {(state.search || view !== "all") ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setState({ search: "" })
                      setView("all")
                      setPageIndex(0)
                    }}
                  >
                    Clear filters
                  </Button>
                ) : null}
              </div>
            ),
            actions: (
              <div className="flex items-center gap-2">
                <DataTableColumnVisibilityMenu table={table} />
                {dataTableToolbarActions.map((action) => (
                  <Button
                    key={action.label}
                    variant={action.variant}
                    size="sm"
                    onClick={() => setState({ notes: `${action.label} prepared for ${visibleRows.length} visible rows` })}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            ),
            selectionActions: (
              <div className="flex flex-wrap items-center gap-2">
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
              </div>
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

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Focused row</p>
          <p className="mt-2 text-lg font-semibold text-zinc-950">{activeRow?.invoice ?? "No row"}</p>
          <p className="mt-2 text-sm text-zinc-600">{activeRow ? `${activeRow.customer} • ${activeRow.owner} • ${activeRow.channel}` : "Select a row to inspect actions."}</p>
        </div>
        <div className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Selection</p>
          <p className="mt-2 text-lg font-semibold text-zinc-950">{selectedRows.length} rows active</p>
          <p className="mt-2 text-sm text-zinc-600">Bulk export and archive stay attached to the real selected rows.</p>
        </div>
        <div className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Finance signal</p>
          <p className="mt-2 text-lg font-semibold text-zinc-950">${paidAmount.toLocaleString()}</p>
          <p className="mt-2 text-sm text-zinc-600">Paid invoices total in the current filtered view.</p>
        </div>
        <div className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Data mode</p>
          <p className="mt-2 text-lg font-semibold text-zinc-950">{serverMode === "server" ? "Manual server" : "Client only"}</p>
          <p className="mt-2 text-sm text-zinc-600">{serverMode === "server" ? "Query changes pass through simulated fetch state." : "Filters resolve immediately in memory."}</p>
        </div>
      </div>

      <SheetShell
        open={detailOpen}
        onOpenChange={setDetailOpen}
        side="right"
        title={activeRow ? `${activeRow.invoice} detail` : "Invoice detail"}
        description="Row click, double click and action menu all converge into one reusable detail surface."
        contentClassName="sm:max-w-xl"
        bodyClassName="space-y-6"
        footer={
          <>
            <Button variant="outline" onClick={() => setDetailOpen(false)}>Close</Button>
            <Button onClick={() => setState({ notes: `${activeRow?.invoice ?? "Invoice"} sent to finance review` })}>Send to review</Button>
          </>
        }
      >
        {activeRow ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-sm text-zinc-500">Customer</p>
                <p className="mt-2 text-lg font-semibold text-zinc-950">{activeRow.customer}</p>
                <p className="mt-1 text-sm text-zinc-600">{activeRow.owner} • {activeRow.channel}</p>
              </div>
              <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-sm text-zinc-500">Order value</p>
                <p className="mt-2 text-lg font-semibold text-zinc-950">{activeRow.amount}</p>
                <p className={`mt-1 text-sm ${activeRow.trend === "up" ? "text-emerald-600" : activeRow.trend === "down" ? "text-rose-600" : "text-zinc-500"}`}>
                  {activeRow.trend === "up" ? "Revenue is climbing" : activeRow.trend === "down" ? "Revenue trend needs attention" : "Revenue is stable"}
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              {[
                ["Status", activeRow.status],
                ["Items", String(activeRow.items)],
                ["Stock", String(activeRow.stock)],
                ["Updated", activeRow.updatedAt],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-[18px] border border-zinc-200 px-4 py-3">
                  <span className="text-sm text-zinc-500">{label}</span>
                  <span className="text-sm font-medium text-zinc-950">{value}</span>
                </div>
              ))}
            </div>

            <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm text-zinc-500">Interaction coverage</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="outline">Row click</Badge>
                <Badge variant="outline">Double click</Badge>
                <Badge variant="outline">Action menu</Badge>
                <Badge variant="outline">Mobile card</Badge>
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Shu sheet bitta row detail pattern bo‘lib turibdi. DataTable reusable qoladi, detail esa tashqaridan ulangan flow bilan ishlaydi.
              </p>
            </div>
          </>
        ) : null}
      </SheetShell>
    </div>
  )
}
