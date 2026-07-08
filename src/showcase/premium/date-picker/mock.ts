import type { ComponentDemoMock } from "../types"

export const datePickerMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { DatePicker } from "@/index"

export function Example() {
  const [value, setValue] = useState("2026-06-19")

  return (
    <DatePicker
      value={value}
      onValueChange={setValue}
      min="2026-06-01"
      max="2026-12-31"
      disabledDates={["2026-06-21"]}
    />
  )
}`,
  htmlCode: '<label for="date-picker">Date</label><input id="date-picker" type="text" value="2026-06-19" />',
  cliCommand: "npx tembro add date-picker",
  highlights: ["Popover selection", "Range guard rails", "disabledDates support", "Min and max windows"],
  relatedBlockSlugs: ["crm-dashboard", "users-table", "settings-form"],
  scenarios: [
    { title: "Booking date", description: "Select a single day from constrained calendar options." },
    { title: "Campaign date", description: "Pick start date for campaign planning." },
    { title: "Holiday exclusions", description: "Block specific dates by disabledDates list." },
    { title: "Read-only windows", description: "Disable picker when record is locked." },
  ],
  capabilityNotes: [
    "Use a locale- and timezone-aware normalization layer in the app, not inside UI callback." ,
    "Keep disabledDates in the same format as your data source." ,
    "Persist as canonical string while rendering localized view." ,
    "Validate with server side checks for closed periods and blackout dates." ,
  ],
}
