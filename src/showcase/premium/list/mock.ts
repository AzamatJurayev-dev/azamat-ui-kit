import type { ComponentDemoMock } from "../types"

export const listMock: ComponentDemoMock = {
  code: `import { Avatar, Badge, List } from "@/index"

export function Example() {
  return (
    <List
      items={[
        {
          key: "invoice",
          title: "Invoice review",
          description: "Pending finance approval",
          avatar: <Avatar name="Finance" size="sm" />,
          extra: <Badge variant="outline">Pending</Badge>,
        },
      ]}
    />
  )
}`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add list",
  highlights: [
    "Compact title/description rows with optional avatar and extra slot",
    "Clickable row pattern without building a table",
    "Useful for inboxes, activity queues, and settings menus",
  ],
  scenarios: [
    { title: "Queue", description: "Show work items in a compact operational stack." },
    { title: "Settings list", description: "Present navigable options without a heavy sidebar." },
    { title: "Recent activity", description: "Render quick summaries with status and person context." },
  ],
}
