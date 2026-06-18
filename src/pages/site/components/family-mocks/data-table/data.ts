import type { DataTableDemoPreset, DataTableDemoRow, DataTableDemoToolbarAction } from "./types"

const customers = ["Acme Inc.", "Larana", "ShipFast", "Toolpad", "Pixels UI", "Northstar"] as const
const owners = ["Azamat", "Malika", "Sardor", "Nodira", "Asadbek", "Kamola"] as const
const channels = ["Direct", "Partner", "Direct", "Marketplace", "Marketplace", "Direct"] as const
const statuses = ["Paid", "Review", "Draft", "Paid", "Overdue", "Paid"] as const
const amounts = ["$2,400", "$1,280", "$980", "$4,120", "$860", "$3,620"] as const
const updatedLabels = ["2h ago", "4h ago", "Today", "1d ago", "1d ago", "2d ago"] as const
const stocks = [48, 16, 8, 63, 4, 28] as const

export const dataTableDemoRows: DataTableDemoRow[] = customers.map((customer, index) => ({
  invoice: `INV-00${index + 1}`,
  order: `#448${index + 2}`,
  customer,
  owner: owners[index],
  channel: channels[index],
  status: statuses[index],
  stock: stocks[index],
  amount: amounts[index],
  updatedAt: updatedLabels[index],
}))

export const dataTableToolbarActions: DataTableDemoToolbarAction[] = ["Columns", "Export CSV"].map((label) => ({
  label,
  variant: label === "Export CSV" ? "default" : "outline",
}))

export const dataTableDemoPresets: DataTableDemoPreset[] = [
  { value: "all", label: "All invoices", description: "All rows." },
  { value: "finance", label: "Finance review", description: "Paid + review." },
  { value: "at-risk", label: "At risk", description: "Draft + overdue." },
]
