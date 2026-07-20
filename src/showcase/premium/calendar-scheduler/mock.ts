import type { ComponentDemoMock } from "../types"

export const calendarSchedulerMock: ComponentDemoMock = {
  code: `import { CalendarScheduler } from "tembro"

export function Example() {
  return (
    <CalendarScheduler
      variant="agenda"
      density="compact"
      title="Delivery schedule"
      defaultSelectedEventId="1"
      days={["Mon, Jul 6"]}
      events={[
        { id: "1", title: "Design review", description: "API review", date: "Mon, Jul 6", time: "10:00" },
        { id: "2", title: "Release freeze", description: "Production gate", date: "Mon, Jul 6", time: "14:00" },
      ]}
    />
  )
}`,
  cliCommand: "npx tembro add calendar-scheduler",
  highlights: [
    "Board and agenda variants with compact or comfortable density",
    "Rich metadata, badges, hidden and disabled event states",
    "Controlled or uncontrolled selection and custom event rendering",
  ],
  scenarios: [
    { title: "Ops dashboard", description: "Show day tasks by lane without heavy calendar widgets." },
    { title: "Sprint board", description: "Keep event density low and readable." },
  ],
}
