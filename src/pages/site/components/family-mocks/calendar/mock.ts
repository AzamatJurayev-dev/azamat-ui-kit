import type { FamilyDemoMock } from "../types"

export const calendarFamilyMock: FamilyDemoMock = {
  code: `import { Calendar, DatePicker, DateRangePicker } from "@azamat/ui"\n\nexport function Example() {\n  return <DatePicker />\n}`,
  highlights: ["Date picker", "Range picker", "Scheduling flows", "Reporting windows"],
  scenarios: [
    { title: "Campaign windows", description: "Select precise dates for launches and promotions." },
    { title: "Report filters", description: "Use ranges in dashboards and exported summaries." },
    { title: "Booking flows", description: "Pick availability with clear temporal constraints." },
  ],
  metrics: [
    { label: "Exports", value: "4" },
    { label: "Selection modes", value: "Single + range" },
    { label: "Status", value: "Stable" },
  ],
}

