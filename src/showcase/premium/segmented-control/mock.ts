import type { ComponentDemoMock } from "../types"

export const segmentedControlMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { LayoutGridIcon, Rows3Icon, Table2Icon } from "lucide-react"
import { SegmentedControl } from "@/index"

const options = [
  { value: "board", label: "Board", icon: <LayoutGridIcon className="size-4" /> },
  { value: "list", label: "List", icon: <Rows3Icon className="size-4" /> },
  { value: "table", label: "Table", icon: <Table2Icon className="size-4" /> },
]

export function Example() {
  const [value, setValue] = React.useState("board")

  return <SegmentedControl value={value} onValueChange={setValue} options={options} />
}`,
  htmlCode: `<div data-slot="segmented-control">
  <button role="radio" aria-checked="true">Board</button>
  <button role="radio" aria-checked="false">List</button>
</div>`,
  cliCommand: "npx azix add segmented-control",
  highlights: [
    "Controlled or uncontrolled value handling",
    "Icon + label segments with size tokens",
    "Good for view switching, density, and mode changes",
  ],
  scenarios: [
    { title: "View mode", description: "Switch between board, list, and table without opening a menu." },
    { title: "Density", description: "Let users change compactness inline inside the header." },
    { title: "Filter mode", description: "Keep small mutually-exclusive states visible at a glance." },
  ],
}
