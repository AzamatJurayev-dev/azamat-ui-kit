import type { ComponentDemoMock } from "../types"

export const tagMock: ComponentDemoMock = {
  code: `import { Tag } from "@/index"

export function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag tone="success">Online</Tag>
      <Tag tone="warning">Review</Tag>
      <Tag tone="danger" removable>
        Remove me
      </Tag>
    </div>
  )
}`,
  cliCommand: "npx tembro add tag",
  highlights: [
    "Semantic tones for state and status information",
    "Selectable and removable tags",
    "Works in compact metadata strips",
  ],
  scenarios: [
    { title: "Statuses", description: "Represent task lifecycle with tone variants." },
    { title: "Filters", description: "Display and clear active filters quickly." },
    { title: "Topics", description: "Render labels without overloading metadata cards." },
  ],
}
