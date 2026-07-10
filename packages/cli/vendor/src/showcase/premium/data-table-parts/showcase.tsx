import * as React from "react"
import type { ColumnDef, Row, RowSelectionState } from "@tanstack/react-table"

import {
  Badge,
  Button,
  DataTable,
  DataTableBulkActions,
  DataTableColumnVisibilityMenu,
  DataTableSortableHeader,
  DataTableViewPresets,
  SearchInput,
} from "@/index"
import { createDataTableActionsColumn } from "@/components/data-table/data-table-actions-column"
import { DataTableSavedFilters } from "@/components/data-table/data-table-saved-filters"
import { createDataTableSelectColumn } from "@/components/data-table/data-table-select-column"

import { buildDataTableDemoRows, dataTableDemoPresets, type DataTableDemoRow } from "./data"

import type { ComponentDemoProps } from "../types"

export type DataTablePartSlug =
  | "data-table-pagination"
  | "data-table-toolbar"
  | "data-table-row-actions"
  | "data-table-actions-column"
  | "data-table-select-column"
  | "data-table-saved-filters"

const rows = buildDataTableDemoRows(6)

function buildColumns(setNotes: (value: string) => void): ColumnDef<DataTableDemoRow>[] {
  return [
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
    createDataTableActionsColumn<DataTableDemoRow>({
      getActions: (_row: Row<DataTableDemoRow>, original: DataTableDemoRow) => [
        { key: "open", label: "Open detail", onSelect: () => setNotes(`${original.invoice} opened from row action`) },
        { key: "archive", label: "Archive", destructive: true, onSelect: () => setNotes(`${original.invoice} sent to archive`) },
      ],
    }),
  ]
}

export function DataTablePartShowcase({
  slug,
}: ComponentDemoProps & {
  slug: DataTablePartSlug
}) {
  const [search, setSearch] = React.useState("")
  const [view, setView] = React.useState<"all" | "finance" | "at-risk">("all")
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [notes, setNotes] = React.useState("Ready")
  const [pageIndex, setPageIndex] = React.useState(0)

  const filteredRows = React.useMemo(() => {
    const query = search.trim().toLowerCase()
    let nextRows = rows

    if (view === "finance") nextRows = nextRows.filter((row) => row.status === "Paid" || row.status === "Review")
    if (view === "at-risk") nextRows = nextRows.filter((row) => row.status === "Draft" || row.status === "Overdue")
    if (!query) return nextRows

    return nextRows.filter((row) =>
      [row.invoice, row.customer, row.owner, row.channel, row.amount].join(" ").toLowerCase().includes(query)
    )
  }, [search, view])

  const selectedRows = React.useMemo(() => filteredRows.filter((_, index) => rowSelection[index]), [filteredRows, rowSelection])
  const columns = React.useMemo(() => buildColumns(setNotes), [])

  const titleMap: Record<DataTablePartSlug, string> = {
    "data-table-pagination": "Pagination route",
    "data-table-toolbar": "Toolbar route",
    "data-table-row-actions": "Row actions route",
    "data-table-actions-column": "Actions column route",
    "data-table-select-column": "Select column route",
    "data-table-saved-filters": "Saved filters route",
  }

  const descriptionMap: Record<DataTablePartSlug, string> = {
    "data-table-pagination": "Pagination should be readable in isolation, but still feel like part of a production table shell.",
    "data-table-toolbar": "Toolbar route should prove search, visibility and action layout without needing the whole docs page around it.",
    "data-table-row-actions": "Row action interactions should stay isolated from row click and selection behavior.",
    "data-table-actions-column": "Actions column should show how the helper sits inside a real DataTable definition.",
    "data-table-select-column": "Select column route should prove bulk selection and row state separation.",
    "data-table-saved-filters": "Saved filters should restore named views and stay aligned with other table controls.",
  }

  return (
    <div className="space-y-4">
      <div className="rounded-[20px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{titleMap[slug]}</Badge>
          <Badge variant="outline">{filteredRows.length} rows</Badge>
          <Badge variant="outline">{selectedRows.length} selected</Badge>
        </div>
        <p className="mt-3 text-sm font-medium aui-text-strong">{titleMap[slug]}</p>
        <p className="mt-2 text-sm leading-6 aui-text-muted">{descriptionMap[slug]}</p>
      </div>

      {slug === "data-table-saved-filters" ? (
        <div className="rounded-[20px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-4">
          <DataTableSavedFilters
            savedFilters={[
              { id: "all", name: "All invoices", filters: {} },
              { id: "finance", name: "Finance review", filters: {} },
              { id: "risk", name: "At risk", filters: {} },
            ]}
            activeFilterId={view === "all" ? "all" : view === "finance" ? "finance" : "risk"}
            onSelectFilter={(id: string) => setView(id === "finance" ? "finance" : id === "risk" ? "at-risk" : "all")}
            onSaveFilter={(name: string) => setNotes(`Saved filter created: ${name}`)}
            onDeleteFilter={(id: string) => setNotes(`Saved filter deleted: ${id}`)}
            onClearFilters={() => setView("all")}
          />
        </div>
      ) : null}

      {slug === "data-table-toolbar" ? (
        <div className="rounded-[20px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-4">
          <div className="flex flex-wrap gap-2">
            <DataTableViewPresets
              value={view}
              onValueChange={(value) => setView((value as typeof view | undefined) ?? "all")}
              presets={dataTableDemoPresets}
              size="sm"
            />
            <div className="w-full max-w-[320px]">
              <SearchInput value={search} onValueChange={setSearch} placeholder="Search invoice, customer..." />
            </div>
          </div>
        </div>
      ) : null}

      <DataTable
        columns={columns}
        data={filteredRows}
        getRowId={(row) => row.invoice}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
        enableRowSelection
        striped
        bordered
        stickyHeader
        toolbarProps={(table) => ({
          title: "Invoices",
          description: "Premium subroute preview for reusable DataTable parts.",
          search: <SearchInput value={search} onValueChange={setSearch} placeholder="Search rows..." />,
          actions: (
            <div className="flex items-center gap-2">
              <DataTableColumnVisibilityMenu table={table} />
              <Button size="sm" variant="outline" onClick={() => setNotes("Toolbar export prepared")}>
                Export
              </Button>
            </div>
          ),
          selectionActions: (
            <DataTableBulkActions
              rows={table.getSelectedRowModel().rows.map((row) => row.original)}
              actions={[
                { key: "export", label: "Export selected", onSelect: (items) => setNotes(`${items.length} rows exported`) },
              ]}
              onClearSelection={() => setRowSelection({})}
            />
          ),
        })}
        pagination={{
          manual: true,
          pageIndex,
          pageSize: 5,
          rowCount: filteredRows.length,
          pageCount: Math.max(Math.ceil(filteredRows.length / 5), 1),
          pageSizeOptions: [5, 10],
          onPageChange: setPageIndex,
          onPageSizeChange: () => undefined,
        }}
      />

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Focused feature</p>
          <p className="mt-2 aui-text-muted">{titleMap[slug]}</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Interaction proof</p>
          <p className="mt-2 aui-text-muted">{notes}</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Selection</p>
          <p className="mt-2 aui-text-muted">{selectedRows.length} active rows</p>
        </div>
      </div>
    </div>
  )
}
