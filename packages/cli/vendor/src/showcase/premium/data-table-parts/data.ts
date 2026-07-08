export type DataTableDemoRow = {
  invoice: string
  order: string
  customer: string
  owner: string
  channel: string
  status: "Paid" | "Review" | "Draft" | "Overdue"
  stock: number
  items: number
  amount: string
  amountValue: number
  trend: "up" | "down" | "steady"
  updatedAt: string
}

export type DataTableDemoToolbarAction = {
  label: string
  variant: "default" | "outline"
}

export type DataTableDemoPreset = {
  value: "all" | "finance" | "at-risk"
  label: string
  description: string
}

const customers = ["Acme Inc.", "Larana", "ShipFast", "Toolpad", "Pixels UI", "Northstar"] as const
const owners = ["Azamat", "Malika", "Sardor", "Nodira", "Asadbek", "Kamola"] as const
const channels = ["Direct", "Partner", "Direct", "Marketplace", "Marketplace", "Direct"] as const
const statuses = ["Paid", "Review", "Draft", "Paid", "Overdue", "Paid"] as const
const amounts = ["$2,400", "$1,280", "$980", "$4,120", "$860", "$3,620"] as const
const amountValues = [2400, 1280, 980, 4120, 860, 3620] as const
const updatedLabels = ["2h ago", "4h ago", "Today", "1d ago", "1d ago", "2d ago"] as const
const stocks = [48, 16, 8, 63, 4, 28] as const
const items = [12, 5, 3, 18, 2, 9] as const
const trends = ["up", "steady", "down", "up", "down", "up"] as const

export const dataTableDemoRows: DataTableDemoRow[] = customers.map((customer, index) => ({
  invoice: `INV-00${index + 1}`,
  order: `#448${index + 2}`,
  customer,
  owner: owners[index],
  channel: channels[index],
  status: statuses[index],
  stock: stocks[index],
  items: items[index],
  amount: amounts[index],
  amountValue: amountValues[index],
  trend: trends[index],
  updatedAt: updatedLabels[index],
}))

export function buildDataTableDemoRows(rowCount: number): DataTableDemoRow[] {
  const safeRowCount = Math.max(1, Math.min(120, Math.floor(rowCount)))

  return Array.from({ length: safeRowCount }, (_, index) => {
    const base = dataTableDemoRows[index % dataTableDemoRows.length]
    const cycle = Math.floor(index / dataTableDemoRows.length)
    const invoiceNumber = String(index + 1).padStart(3, "0")
    const orderNumber = 4482 + index
    const amountValue = base.amountValue + cycle * 175
    const amount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amountValue)

    return {
      ...base,
      invoice: `INV-${invoiceNumber}`,
      order: `#${orderNumber}`,
      amount,
      amountValue,
      stock: base.stock + cycle * 2,
      items: base.items + (index % 3 === 0 ? cycle : 0),
      updatedAt: cycle === 0 ? base.updatedAt : `${cycle + 1}d ago`,
    }
  })
}

export const dataTableToolbarActions: DataTableDemoToolbarAction[] = ["Export CSV", "Sync"].map((label) => ({
  label,
  variant: label === "Export CSV" ? "default" : "outline",
}))

export const dataTableDemoPresets: DataTableDemoPreset[] = [
  { value: "all", label: "All invoices", description: "All rows." },
  { value: "finance", label: "Finance review", description: "Paid + review." },
  { value: "at-risk", label: "At risk", description: "Draft + overdue." },
]
