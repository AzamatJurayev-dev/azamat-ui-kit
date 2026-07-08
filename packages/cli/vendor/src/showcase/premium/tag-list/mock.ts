import type { ComponentDemoMock } from "../types"

export const tagListMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { TagList } from "@/index"

export function Example() {
  const [items, setItems] = React.useState([
    { key: "react", label: "React" },
    { key: "typescript", label: "TypeScript" },
    { key: "design-system", label: "Design system" },
  ])

  return <TagList items={items} removable onRemove={(item) => setItems((list) => list.filter((entry) => entry.key !== item.key))} />
}`,
  cliCommand: "npx azix add tag-list",
  highlights: [
    "Compact badge-based collection of labels",
    "Optional remove actions for editable taxonomies",
    "Useful for skills, filters, product areas, and metadata chips",
  ],
  scenarios: [
    { title: "Skill chips", description: "Show categorized labels without building a full tag input field." },
    { title: "Selected filters", description: "Summarize active states at the top of a page." },
    { title: "Editable metadata", description: "Allow small remove actions on existing labels." },
  ],
}
