import type { ComponentDemoMock } from "../types"

export const notificationCenterMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { NotificationCenter } from "azix"

export function Example() {
  const [items, setItems] = React.useState([
    { id: "1", title: "Invoice paid", description: "Acme Growth settled invoice #2048.", time: "2m ago", read: false },
    { id: "2", title: "Deployment ready", description: "Release candidate passed checks.", time: "12m ago", read: true },
  ])

  return (
    <NotificationCenter
      notifications={items}
      onMarkAllRead={() => setItems((current) => current.map((item) => ({ ...item, read: true })))}
    />
  )
}`,
  highlights: ["Unread count badge", "Mark all read action", "Popover-based notification list", "Compact header action surface"],
  scenarios: [
    { title: "Workspace updates", description: "Show billing, deployment, or access events in one compact center." },
    { title: "Admin dashboard", description: "Expose unread tasks without forcing a full dedicated route." },
    { title: "Operational alerts", description: "Let users clear or inspect events directly from the header." },
  ],
  capabilityNotes: [
    "Notification center is best for short, recent events that require optional follow-up.",
    "Unread count should reflect genuinely actionable items.",
    "Avoid treating this as a dumping ground for every system message.",
  ],
}
