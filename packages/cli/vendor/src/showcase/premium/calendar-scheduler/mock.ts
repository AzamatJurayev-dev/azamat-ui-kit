import type { ComponentDemoMock } from "../types"

export const calendarSchedulerMock: ComponentDemoMock = {
  code: `import { CalendarScheduler } from "@/index"

export function Example() {
  return (
    <CalendarScheduler
      days={["Mon, Jul 6", "Tue, Jul 7"]}
      events={[
        { id: "1", title: "Design review", date: "Mon, Jul 6", time: "10:00", tone: "warning" },
        { id: "2", title: "Release freeze", date: "Tue, Jul 7", time: "14:00", tone: "danger" },
      ]}
    />
  )
}`,
  cliCommand: "npx tembro add calendar-scheduler",
  highlights: [
    "Compact scheduler timeline by day",
    "Tone variants for different event priorities",
    "Works with custom day labels",
  ],
  scenarios: [
    { title: "Ops dashboard", description: "Show day tasks by lane without heavy calendar widgets." },
    { title: "Sprint board", description: "Keep event density low and readable." },
  ],
}

