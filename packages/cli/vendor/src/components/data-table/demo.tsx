import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const dataTableShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("data-table-pagination", "DataTablePagination", "data-table", "Pagination control used by DataTable pages."),
  component("data-table-toolbar", "DataTableToolbar", "data-table", "Toolbar surface for DataTable search, filters and actions."),
  component("data-table-column-visibility-menu", "DataTableColumnVisibilityMenu", "data-table", "Column visibility menu pattern for table views."),
  component("data-table-select-column", "DataTableSelectColumn", "data-table", "Selection column pattern for bulk table workflows."),
  component("data-table-sortable-header", "DataTableSortableHeader", "data-table", "Sortable header trigger with clear visual state."),
  component("data-table-row-actions", "DataTableRowActions", "data-table", "Row action menu for inspect, duplicate and archive operations."),
  component("data-table-actions-column", "DataTableActionsColumn", "data-table", "Reusable actions column for DataTable definitions."),
  component("data-table-bulk-actions", "DataTableBulkActions", "data-table", "Bulk action bar for selected rows."),
  component("data-table-view-presets", "DataTableViewPresets", "data-table", "Saved table view presets for operational dashboards."),
])
