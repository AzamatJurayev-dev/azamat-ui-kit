export type TableDemoRow = {
  id: string
  name: string
  status: "Live" | "Review" | "Draft"
  revenue: string
  owner: string
  device: "Desktop" | "Tablet" | "Mobile"
}

export type TableDemoStat = {
  label: string
  value: string
  note: string
}
