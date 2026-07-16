import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/data-table/data-table"
import { Badge } from "@/components/ui/badge"
import { componentRows, type ComponentRow } from "@/showcase/data/registry"

const columns: ColumnDef<ComponentRow>[] = [
  { accessorKey: "component", header: "Component" },
  { accessorKey: "category", header: "Category" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge
          status={status === "Ready" ? "success" : status === "Testing" ? "info" : "warning"}
          label={status}
          variant="soft"
        />
      )
    },
  },
  { accessorKey: "props", header: "Props shown" },
]

export function DataTableSection() {
  return (
    <DataTable
      columns={columns}
      data={componentRows}
      title="Component audit"
      description="DataTable with search, column visibility, row actions, refresh, export and pagination features."
      features={{ search: true, columnVisibility: true, rowActions: true, refresh: true, export: true }}
      search={{ placeholder: "Search table", clearable: true }}
      pagination={{ pageIndex: 0, pageSize: 5, rowCount: componentRows.length, showPageSize: true }}
      rowActions={() => [
        { key: "inspect", label: "Inspect", onSelect: () => undefined },
        { key: "mark-ready", label: "Mark ready", onSelect: () => undefined },
      ]}
      onRefresh={() => undefined}
      onExport={() => undefined}
    />
  )
}
