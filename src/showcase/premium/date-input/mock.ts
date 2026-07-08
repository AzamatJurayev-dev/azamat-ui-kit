import type { ComponentDemoMock } from "../types"

export const dateInputMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { DateInput } from "tembro"

export function Example() {
  const [value, setValue] = useState("2026-06-19")

  return (
    <DateInput
      value={value}
      onValueChange={setValue}
      min="2026-06-01"
      max="2026-12-31"
      placeholder="YYYY-MM-DD"
    />
  )
}`,
  htmlCode: '<label for="date">Date</label><input id="date" type="text" value="2026-06-19" placeholder="YYYY-MM-DD" />',
  cliCommand: "npx tembro add date-input",
  highlights: ["ISO-like string format assumptions", "min/max constraints", "Controlled editing", "Clear disabled behavior"],
  relatedBlockSlugs: ["dashboard-starter", "crm-dashboard", "settings-form"],
  scenarios: [
    { title: "Birth date", description: "Enforce a valid date window with min/max." },
    { title: "Report filter", description: "Use as single date boundary for dashboards." },
    { title: "Default timezone", description: "Keep string values and normalize at API boundary." },
    { title: "Locked fields", description: "Disable editing during restricted status windows." },
  ],
  capabilityNotes: [
    "Store normalized date string outside the component for stable API integration.",
    "Show explicit range with helper text when min/max are enforced.",
    "Validate parsed date and format on submit as an app-level safety layer.",
    "Align placeholder format with your backend contract (ISO/locale).",
  ],
}
