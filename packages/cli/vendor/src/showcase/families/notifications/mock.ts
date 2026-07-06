import type { FamilyDemoMock } from "../types"

export const notificationsFamilyMock: FamilyDemoMock = {
  code: `import { Toast } from "@azamatjurayevdev/azix"\n\nexport function Example() {\n  return <Toast />\n}`,
  highlights: ["Toast messages", "Transient feedback", "Success and warning states", "Async completion"],
  scenarios: [
    { title: "Success feedback", description: "Acknowledge completed actions without interrupting the user." },
    { title: "Warning states", description: "Surface short-lived problems or validation reminders." },
    { title: "Background jobs", description: "Notify users when async tasks finish." },
  ],
  metrics: [
    { label: "Exports", value: "1" },
    { label: "Modes", value: "Success + warning" },
    { label: "Status", value: "Preview" },
  ],
}


