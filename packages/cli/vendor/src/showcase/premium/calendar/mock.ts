import type { ComponentDemoMock } from "../types"

export const calendarMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { Calendar } from "azix"

export function Example() {
  const [range, setRange] = React.useState({ from: "2026-07-10", to: "2026-07-15" })

  return (
    <Calendar
      mode="range"
      range={range}
      onRangeChange={setRange}
      numberOfMonths={2}
      min="2026-07-01"
      max="2026-08-31"
      disabledDates={["2026-07-18", "2026-07-19"]}
    />
  )
}`,
  highlights: ["Single and range selection", "Multiple month viewport", "Disabled, min, and max date rules", "Keyboard-friendly navigation"],
  scenarios: [
    { title: "Booking window", description: "Pick an available range while blocked dates stay non-interactive." },
    { title: "Reporting period", description: "Show two months at once for dashboard and export filters." },
    { title: "Approval deadline", description: "Constrain selection to operational dates with min/max bounds." },
  ],
  capabilityNotes: [
    "Use `numberOfMonths={2}` when the user compares short windows across month boundaries.",
    "Prefer disabled dates for business rules like blackout periods and full-capacity days.",
    "Keep range mode close to the workflow that depends on it.",
  ],
}
