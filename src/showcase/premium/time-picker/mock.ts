import type { ComponentDemoMock } from "../types"

export const timePickerMock: ComponentDemoMock = {
  code: `import { DateTimePicker, TimePicker, TimeRangePicker } from "@/index"

export function Example() {
  return (
    <div className="space-y-2">
      <TimePicker label="Start" value="08:30" />
      <DateTimePicker label="Planned at" value="2026-07-07T08:30" />
      <TimeRangePicker from="09:00" to="17:00" />
    </div>
  )
}`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add time-picker",
  highlights: ["Time, datetime, and range pickers in one family", "Native input controls with consistent style"],
  scenarios: [
    { title: "Planning UI", description: "Define working hours and event time." },
    { title: "Appointment form", description: "Capture precise temporal inputs for calendars and logs." },
  ],
}

