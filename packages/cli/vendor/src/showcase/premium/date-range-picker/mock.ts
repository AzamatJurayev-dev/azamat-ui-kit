import type { ComponentDemoMock } from "../types"

export const dateRangePickerMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { DateRangePicker } from "@/index"

export function Example() {
  const [value, setValue] = useState({ from: "2026-06-01", to: "2026-06-07" })

  return (
    <DateRangePicker
      value={value}
      onValueChange={(nextValue) => setValue({ from: nextValue.from ?? "", to: nextValue.to ?? "" })}
      min="2026-06-01"
      max="2026-12-31"
      disabledDates={["2026-06-21", "2026-06-22"]}
    />
  )
}`,
  htmlCode: '<label for="date-range-picker">Date range</label><input id="date-range-picker" type="text" value="2026-06-01 to 2026-06-07" />',
  cliCommand: "npx @azamatjurayevdev/azix-ui add date-range-picker",
  highlights: ["Range popover behavior", "disabledDates support", "from/to object format", "min/max constraints"],
  relatedBlockSlugs: ["crm-dashboard", "users-table", "pricing-section"],
  scenarios: [
    { title: "Reporting window", description: "Select a period for period-based reports." },
    { title: "Campaign sprint", description: "Keep campaign launch and end dates linked as a single value." },
    { title: "Blocked windows", description: "Exclude blackout dates with disabledDates list." },
    { title: "Read-only mode", description: "Disable pickers for locked records and history editing." },
  ],
  capabilityNotes: [
    "Validate that `from` is before `to` before submit." ,
    "Use partial range guards and avoid fetching until both bounds are selected." ,
    "Normalize to server timezone to avoid midnight and boundary drift." ,
    "Store disabled periods in one source and share with all date controls." ,
  ],
}
