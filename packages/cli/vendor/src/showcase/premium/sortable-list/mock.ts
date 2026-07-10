import type { ComponentDemoMock } from "../types"

export const sortableListMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { SortableList } from "tembro"

const initialItems = [
  { id: "brief", label: "Product brief" },
  { id: "design", label: "Design review" },
  { id: "release", label: "Release checklist" },
]

export function Example() {
  const [items, setItems] = React.useState(initialItems)

  return (
    <SortableList
      items={items}
      getItemId={(item) => item.id}
      getItemLabel={(item) => item.label}
      renderItem={(item) => item.label}
      onItemsChange={setItems}
    />
  )
}`,
  cliCommand: "npx tembro add sortable-list",
  highlights: [
    "Pointer, touch and keyboard sorting",
    "Controlled and uncontrolled state",
    "Drag overlay and screen-reader instructions",
  ],
  scenarios: [
    { title: "Priority queue", description: "Reorder work while keeping the resulting array in application state." },
    { title: "Form sections", description: "Let users arrange configurable fields with an explicit drag handle." },
  ],
}
