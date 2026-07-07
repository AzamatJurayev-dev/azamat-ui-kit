import type { ComponentDemoMock } from "../types"

export const dateRangeInputMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { DateRangeInput } from "@/index"

export function Example() {
  const [value, setValue] = useState({ from: "2026-06-01", to: "2026-06-30" })

  return (
    <DateRangeInput
      value={value}
      onValueChange={(nextValue) => setValue({ from: nextValue.from ?? "", to: nextValue.to ?? "" })}
      fromInputProps={{ min: "2026-06-01" }}
      toInputProps={{ max: "2026-12-31" }}
      required
    />
  )
}`,
  htmlCode: '<label for="date-range">Date range</label><input id="date-range" type="text" value="2026-06-01 to 2026-06-30" />',
  cliCommand: "npx @azamatjurayevdev/azix-ui add date-range-input",
  highlights: ["from/to object contract", "range behavior", "min/max boundaries", "single source of truth formatting"],
  relatedBlockSlugs: ["dashboard-starter", "crm-dashboard", "users-table"],
  scenarios: [
    { title: "Billing period", description: "Keep report windows with explicit start/end boundaries." },
    { title: "Dashboard filters", description: "Use range to fetch metrics for a period." },
    { title: "Date lock", description: "Enforce required bounds while user is in restricted flow." },
    { title: "Export window", description: "Share range object to backend for date-interval export." },
  ],
  capabilityNotes: [
    "Treat partial ranges as invalid until both ends are present.",
    "Validate from <= to at app layer to avoid inverted ranges.",
    "Normalize all range values to canonical storage format.",
    "Show user hint text for format and required bounds.",
  ],
}
