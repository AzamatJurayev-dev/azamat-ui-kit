import {
  createDataTableActionsColumn,
  createDataTableSelectColumn,
  DataTable,
  DataTableBulkActions,
  DataTableColumnVisibilityMenu,
  DataTablePagination,
  DataTableRowActions,
  DataTableSortableHeader,
  DataTableToolbar,
  DataTableViewPresets,
} from "@/components/data-table"
import { TableExportMenu } from "@/components/data-table/table-export-menu"
import { TableImportButton } from "@/components/data-table/table-import-button"

const DataTableFamily = {
  Root: DataTable,
  Toolbar: DataTableToolbar,
  Pagination: DataTablePagination,
  ColumnVisibilityMenu: DataTableColumnVisibilityMenu,
  SortableHeader: DataTableSortableHeader,
  RowActions: DataTableRowActions,
  BulkActions: DataTableBulkActions,
  ViewPresets: DataTableViewPresets,
  ExportMenu: TableExportMenu,
  ImportButton: TableImportButton,
  createSelectColumn: createDataTableSelectColumn,
  createActionsColumn: createDataTableActionsColumn,
} as const

export { DataTableFamily }
