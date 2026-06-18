import type { TableDemoRow, TableDemoStat } from "./types"

export const tableDemoRows: TableDemoRow[] = [
  { id: "tbl-001", name: "Acme Dashboard", status: "Live", revenue: "$24,780", owner: "Azamat", device: "Desktop" },
  { id: "tbl-002", name: "CRM Workspace", status: "Review", revenue: "$12,420", owner: "Nodira", device: "Tablet" },
  { id: "tbl-003", name: "Store Command", status: "Draft", revenue: "$8,190", owner: "Sardor", device: "Mobile" },
  { id: "tbl-004", name: "Finance Dock", status: "Live", revenue: "$31,040", owner: "Malika", device: "Desktop" },
]

export const tableDemoStats: TableDemoStat[] = [
  { label: "Desktop layout", value: "6 columns", note: "Dense reporting view with aligned numbers." },
  { label: "Tablet strategy", value: "2 priority cuts", note: "Secondary columns can collapse below the primary row." },
  { label: "Mobile fallback", value: "Stacked cells", note: "Key labels remain visible when width is constrained." },
]
