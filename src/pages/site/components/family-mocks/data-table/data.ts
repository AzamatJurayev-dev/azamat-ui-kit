import type { DataTableDemoPreset, DataTableDemoRow, DataTableDemoToolbarAction } from "./types"

export const dataTableDemoRows: DataTableDemoRow[] = [
  { invoice: "INV-001", order: "#4482", customer: "Acme Inc.", owner: "Azamat", channel: "Direct", status: "Paid", stock: 48, amount: "$2,400", updatedAt: "2h ago" },
  { invoice: "INV-002", order: "#4483", customer: "Larana", owner: "Malika", channel: "Partner", status: "Review", stock: 16, amount: "$1,280", updatedAt: "4h ago" },
  { invoice: "INV-003", order: "#4484", customer: "ShipFast", owner: "Sardor", channel: "Direct", status: "Draft", stock: 8, amount: "$980", updatedAt: "Today" },
  { invoice: "INV-004", order: "#4485", customer: "Toolpad", owner: "Nodira", channel: "Marketplace", status: "Paid", stock: 63, amount: "$4,120", updatedAt: "1d ago" },
  { invoice: "INV-005", order: "#4486", customer: "Pixels UI", owner: "Asadbek", channel: "Marketplace", status: "Overdue", stock: 4, amount: "$860", updatedAt: "1d ago" },
  { invoice: "INV-006", order: "#4487", customer: "Northstar", owner: "Kamola", channel: "Direct", status: "Paid", stock: 28, amount: "$3,620", updatedAt: "2d ago" },
]

export const dataTableToolbarActions: DataTableDemoToolbarAction[] = [
  { label: "Columns", variant: "outline" },
  { label: "Presets", variant: "outline" },
  { label: "Bulk actions", variant: "outline" },
  { label: "Export CSV", variant: "default" }
]

export const dataTableDemoPresets: DataTableDemoPreset[] = [
  { value: "all", label: "All invoices", description: "Default finance overview with every row visible." },
  { value: "finance", label: "Finance review", description: "Only review and paid rows for end-of-day accounting." },
  { value: "at-risk", label: "At risk", description: "Rows that need quick action because they are draft or overdue." },
]
