export type DataTableDemoRow = {
  invoice: string
  customer: string
  status: "Paid" | "Review" | "Draft"
  amount: string
}

export type DataTableDemoToolbarAction = {
  label: string
  variant: "default" | "outline"
}
