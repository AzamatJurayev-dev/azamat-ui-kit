import type { ComponentDemoMock } from "../types"

export const dualListPickerMock: ComponentDemoMock = {
  code: `import { DualListPicker } from "@/index"

const items = [
  { label: "Analytics", value: "analytics" },
  { label: "Reports", value: "reports" },
]

export function Example() {
  const [picked, setPicked] = useState(["analytics"])

  return (
    <DualListPicker
      items={items}
      picked={picked}
      onPickedChange={setPicked}
      availableTitle="Available"
      pickedTitle="Selected"
    />
  )
}`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add dual-list-picker",
  highlights: [
    "Move items between available/selected lists",
    "Supports disabled choices",
    "Simple controlled value pattern",
  ],
  scenarios: [
    { title: "Role permissions", description: "Select which modules are available for a user role." },
    { title: "Feature toggles", description: "Move capabilities between disabled and enabled buckets." },
  ],
}

