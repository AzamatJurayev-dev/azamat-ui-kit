import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"

import {
  Badge,
  Button,
  DataTable,
  DataTableBulkActions,
  DataTableColumnVisibilityMenu,
  DataTableSortableHeader,
  SearchInput,
  SimpleSelect,
} from "@/index"
import { createDataTableActionsColumn } from "@/components/data-table/data-table-actions-column"
import { createDataTableSelectColumn } from "@/components/data-table/data-table-select-column"

type DataTableDemoRow = {
  invoice: string
  customer: string
  owner: string
  amount: string
  status: "Paid" | "Review" | "Draft"
  updatedAt: string
}

const rows: DataTableDemoRow[] = [
  { invoice: "INV-4821", customer: "Acme Studio", owner: "Azamat", amount: "$12,420", status: "Paid", updatedAt: "2m ago" },
  { invoice: "INV-4822", customer: "Northwind", owner: "Madina", amount: "$8,120", status: "Review", updatedAt: "10m ago" },
  { invoice: "INV-4823", customer: "Globex", owner: "Jasur", amount: "$4,880", status: "Draft", updatedAt: "22m ago" },
  { invoice: "INV-4824", customer: "Pixel Union", owner: "Azamat", amount: "$17,300", status: "Paid", updatedAt: "44m ago" },
  { invoice: "INV-4825", customer: "Meridian Labs", owner: "Madina", amount: "$2,180", status: "Review", updatedAt: "1h ago" },
  { invoice: "INV-4826", customer: "Orbit Cloud", owner: "Jasur", amount: "$9,040", status: "Draft", updatedAt: "3h ago" },
]

export function DataTableShowcase() {
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [ownerFilter, setOwnerFilter] = React.useState("all")
  const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({})

  const filteredRows = rows.filter((row) => {
    const normalized = search.trim().toLowerCase()
    const matchesSearch = !normalized || `${row.invoice} ${row.customer} ${row.owner} ${row.amount}`.toLowerCase().includes(normalized)
    const matchesStatus = statusFilter === "all" || row.status === statusFilter
    const matchesOwner = ownerFilter === "all" || row.owner === ownerFilter
    return matchesSearch && matchesStatus && matchesOwner
  })
  const selectedCount = Object.values(rowSelection).filter(Boolean).length

  const columns = React.useMemo<ColumnDef<DataTableDemoRow>[]>(
    () => [
      createDataTableSelectColumn<DataTableDemoRow>(),
      {
        accessorKey: "invoice",
        header: ({ column }) => <DataTableSortableHeader column={column}>Invoice</DataTableSortableHeader>,
      },
      {
        accessorKey: "customer",
        header: ({ column }) => <DataTableSortableHeader column={column}>Customer</DataTableSortableHeader>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={row.original.status === "Paid" ? "secondary" : row.original.status === "Review" ? "outline" : "destructive"}>
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }) => <DataTableSortableHeader column={column}>Amount</DataTableSortableHeader>,
      },
      {
        accessorKey: "updatedAt",
        header: "Updated",
      },
      createDataTableActionsColumn<DataTableDemoRow>({
        getActions: () => [
          { key: "open", label: "Open detail", onSelect: () => undefined },
          { key: "archive", label: "Archive", destructive: true, onSelect: () => undefined },
        ],
      }),
    ],
    []
  )

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Operational table</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Search, selection and actions in one table</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Rows</p>
            <p className="mt-2 text-lg font-semibold aui-text-strong">{filteredRows.length}</p>
          </div>
          <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Selected</p>
            <p className="mt-2 text-lg font-semibold aui-text-strong">{selectedCount}</p>
          </div>
          <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">State</p>
            <p className="mt-2 text-lg font-semibold aui-text-strong">{search || statusFilter !== "all" || ownerFilter !== "all" ? "Filtered" : "Live"}</p>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredRows}
        getRowId={(row) => row.invoice}
        enableRowSelection
        rowSelection={rowSelection}
        toolbarProps={(table) => ({
          title: "Invoices",
          description: "Search, filter, column controls, bulk actions and row actions should work together in one predictable surface.",
          search: <SearchInput value={search} onValueChange={setSearch} placeholder="Search invoice, customer..." />,
          filters: (
            <div className="flex min-w-0 flex-col gap-2 lg:flex-row lg:flex-wrap">
              <SimpleSelect
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value ?? "all")}
                options={[
                  { value: "all", label: "All statuses" },
                  { value: "Paid", label: "Paid" },
                  { value: "Review", label: "Review" },
                  { value: "Draft", label: "Draft" },
                ]}
                triggerClassName="min-w-40"
              />
              <SimpleSelect
                value={ownerFilter}
                onValueChange={(value) => setOwnerFilter(value ?? "all")}
                options={[
                  { value: "all", label: "All owners" },
                  { value: "Azamat", label: "Azamat" },
                  { value: "Madina", label: "Madina" },
                  { value: "Jasur", label: "Jasur" },
                ]}
                triggerClassName="min-w-36"
              />
            </div>
          ),
          actions: (
            <div className="flex items-center gap-2">
              <DataTableColumnVisibilityMenu table={table} />
              <DataTableBulkActions
                rows={table.getSelectedRowModel().rows.map((row) => row.original)}
                actions={[{ key: "export", label: "Export selected", onSelect: () => undefined }]}
                onClearSelection={() => setRowSelection({})}
              />
            </div>
          ),
        })}
        onRowSelectionChange={(selection) => {
          setRowSelection((current) => (typeof selection === "function" ? selection(current) : selection))
        }}
        onRowClick={() => undefined}
        renderMobileCard={(row) => (
          <div className="rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-semibold aui-text-strong">{row.original.invoice}</p>
                <p className="mt-1 text-sm aui-text-muted">{row.original.customer}</p>
              </div>
              <Badge variant="outline">{row.original.status}</Badge>
            </div>
          </div>
        )}
        pagination={{
          pageIndex: 0,
          pageSize: 5,
          rowCount: filteredRows.length,
          pageCount: Math.max(Math.ceil(filteredRows.length / 5), 1),
          pageSizeOptions: [5, 10],
          onPageChange: () => undefined,
          onPageSizeChange: () => undefined,
        }}
      />

      <div className="flex flex-wrap gap-3">
        <Button size="sm">Export</Button>
        <Button size="sm" variant="outline">Refresh</Button>
      </div>
    </div>
  )
}
