import type { ComponentDemoMock } from "../types"

export const floatButtonMock: ComponentDemoMock = {
  code: `import { FloatButton } from "@/index"
import { Plus } from "lucide-react"

export function Example() {
  return (
    <FloatButton placement="bottom-right">
      <Plus className="size-4" />
    </FloatButton>
  )
}`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add float-button",
  highlights: [
    "Fixed-position shortcut button",
    "Placement variants across corners",
  ],
  scenarios: [
    { title: "Quick action", description: "Keep add/create action always reachable." },
    { title: "Chat widgets", description: "Mount floating controls without complex absolute layout." },
  ],
}

