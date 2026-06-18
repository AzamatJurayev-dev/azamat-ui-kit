export type DataTableDemoRow = {
  invoice: string
  order: string
  customer: string
  owner: string
  channel: string
  status: "Paid" | "Review" | "Draft" | "Overdue"
  stock: number
  amount: string
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
