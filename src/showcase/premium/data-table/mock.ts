import type { ComponentDemoMock } from "../types"

export const dataTableMock: ComponentDemoMock = {
  code: `import {
  DataTable,
  DataTableBulkActions,
  DataTableColumnVisibilityMenu,
  DataTableSortableHeader,
  createDataTableActionsColumn,
  createDataTableSelectColumn,
} from "tembro"

export function Example() {
  return (
    <DataTable
      columns={columns}
      data={rows}
      enableRowSelection
      density="comfortable"
      striped
      bordered
      stickyHeader
      rowActions={(row) => getActions(row.original)}
      bulkActions={bulkActions}
    />
  )
}`,
  highlights: ["Toolbar actions", "Bulk actions", "Row click", "Visibility menu", "Density", "Preset-driven views", "Mobile strategy", "Pagination"],
  scenarios: [
    { title: "Finance operations", description: "Filter, sort and paginate transactional rows with export-ready actions." },
    { title: "Mobile fallback", description: "Collapse rows into cards while preserving click and selection behaviors." },
    { title: "Preset views", description: "Switch between all rows, finance-only and at-risk tables without rebuilding columns." },
    { title: "Bulk handling", description: "Run row group actions with selection state and clear behavior." },
  ],
}


