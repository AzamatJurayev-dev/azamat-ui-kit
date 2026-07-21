import * as React from "react"

import { Badge, Spreadsheet, type SpreadsheetColumn, type SpreadsheetRow } from "@/index"

const columns: SpreadsheetColumn[] = [
  { key: "account", label: "Account", width: 190 },
  { key: "jan", label: "Jan", align: "right" },
  { key: "feb", label: "Feb", align: "right" },
  { key: "mar", label: "Mar", align: "right" },
  {
    key: "status",
    label: "Status",
    width: 130,
    readOnly: true,
    formatter: (value) => <Badge size="sm" tone={value === "Locked" ? "warning" : "success"} showDot>{value}</Badge>,
  },
]

const initialRows: SpreadsheetRow[] = [
  { key: "atlas", cells: { account: "Atlas Retail", jan: "42000", feb: "43800", mar: "45100", status: "Open" } },
  { key: "nova", cells: { account: "Nova Logistics", jan: "18700", feb: "19500", mar: "20100", status: "Open" } },
  { key: "orion", cells: { account: "Orion Bank", jan: "65000", feb: "65000", mar: "65000", status: "Locked" }, readOnly: false },
]

export function SpreadsheetShowcase() {
  const [rows, setRows] = React.useState(initialRows)

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">Quarter forecast grid</h3>
          <p className="mt-1 text-xs text-muted-foreground">Edit cells, add rows, and keep row state controlled.</p>
        </div>
        <Badge variant="outline" tone="muted">{rows.length} rows</Badge>
      </div>
      <Spreadsheet columns={columns} rows={rows} onRowsChange={setRows} />
    </div>
  )
}
