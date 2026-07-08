import type { ComponentDemoMock } from "../types"

export const treeViewMock: ComponentDemoMock = {
  code: `import { TreeView } from "@/index"

export function Example() {
  return (
    <TreeView
      items={[
        {
          key: "ui",
          label: "UI",
          children: [
            { key: "buttons", label: "Buttons" },
            { key: "inputs", label: "Inputs" },
          ],
        },
      ]}
      defaultExpandedKeys={["ui"]}
    />
  )
}`,
  cliCommand: "npx tembro add tree-view",
  highlights: [
    "Tree data model with nested children",
    "Controlled and uncontrolled expand state support",
    "Selectable nodes with active visual states",
  ],
  scenarios: [
    { title: "Navigation map", description: "Use for quick nested navigation structures." },
    { title: "Docs sections", description: "Represent nested headings and details." },
  ],
}

