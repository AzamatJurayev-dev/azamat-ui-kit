import type { DataTableDemoRow, DataTableDemoToolbarAction } from "./types"

export const dataTableDemoRows: DataTableDemoRow[] = [
  { invoice: "INV-001", customer: "Acme Inc.", status: "Paid", amount: "$2,400" },
  { invoice: "INV-002", customer: "Larana", status: "Review", amount: "$1,280" },
  { invoice: "INV-003", customer: "ShipFast", status: "Draft", amount: "$980" },
  { invoice: "INV-004", customer: "Toolpad", status: "Paid", amount: "$4,120" }
]

export const dataTableToolbarActions: DataTableDemoToolbarAction[] = [
  { label: "Columns", variant: "outline" },
  { label: "Bulk actions", variant: "outline" },
  { label: "Export CSV", variant: "default" }
]
