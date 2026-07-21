import type { ComponentDemoMock } from "../types"

export const spreadsheetMock: ComponentDemoMock = {
  code: `import { Spreadsheet } from "tembro"

const columns = [
  { key: "sku", label: "SKU", width: 140 },
  { key: "forecast", label: "Forecast", align: "right" },
]

export function Example() {
  return (
    <Spreadsheet
      columns={columns}
      defaultRows={[
        { key: "row-1", cells: { sku: "TM-100", forecast: "1280" } },
      ]}
    />
  )
}`,
  cliCommand: "npx tembro add spreadsheet",
  highlights: [
    "Editable grid cells with controlled and uncontrolled row state",
    "Column widths, alignment, read-only rows and custom formatters",
    "Selection callbacks for formulas, details panels, or validation",
  ],
  scenarios: [
    { title: "Pricing matrix", description: "Edit dense product pricing or discounts without a full BI grid." },
    { title: "Forecast planning", description: "Capture weekly pipeline numbers and validate cells inline." },
  ],
}
